"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabaseClient"
import { Product } from "@/types/product"
import FormTable from "@/app/components/FormTable"
import FormModal from "@/app/components/FormModal"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("id")
    const formatted = (data || []).map((p) => ({
      ...p,
      created_at: p.created_at || "",
      image_url: p.image_url || "",
    }))
    setProducts(formatted)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSave = async (data: Partial<Product>) => {
    if (selectedProduct)
      await supabase.from("products").update(data).eq("id", selectedProduct.id)
    else
      await supabase.from("products").insert([data])

    setShowModal(false)
    fetchProducts()
  }

  const columns: { key: keyof Product; label: string; isDate?: boolean; isImage?: boolean }[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên sản phẩm" },
    { key: "category", label: "Danh mục" },
    { key: "price", label: "Giá" },
    { key: "created_at", label: "Ngày tạo", isDate: true },
    { key: "image_url", label: "Ảnh", isImage: true },
    { key: "description", label: "Mô tả" },
  ]

  const fields: { key: keyof Product; label: string }[] = [
    { key: "name", label: "Tên sản phẩm" },
    { key: "category", label: "Danh mục" },
    { key: "description", label: "Mô tả" },
    { key: "price", label: "Giá" },
    { key: "image_url", label: "Ảnh (URL)" },
  ]
 
  return (
    <>
      <FormTable
        title="Danh sách sản phẩm"
        data={products}
        columns={columns}
        onAdd={() => { setSelectedProduct(null); setShowModal(true) }}
        onEdit={(p) => { setSelectedProduct(p); setShowModal(true) }}
        onDelete={async (id) => {
          await supabase.from("products").delete().eq("id", id)
          fetchProducts()
        }}
      />

      {showModal && (
        <FormModal
          title={selectedProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          fields={fields}
          item={selectedProduct}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
