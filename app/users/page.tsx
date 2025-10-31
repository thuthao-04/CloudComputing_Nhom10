"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabaseClient"
import { User } from "@/types/user"
import FormTable from "@/app/components/FormTable"
import FormModal from "@/app/components/FormModal"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const fetchUsers = async () => {
    const { data } = await supabase.from("users").select("*").order("id")
    setUsers(data || [])
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSave = async (data: Partial<User>) => {
    if (selectedUser)
      await supabase.from("users").update(data).eq("id", selectedUser.id)
    else
      await supabase.from("users").insert([data])
    setShowModal(false)
    fetchUsers()
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên" },
    { key: "email", label: "Email" },
    { key: "phone", label: "SĐT" },
    { key: "address", label: "Địa chỉ" },
    { key: "created_at", label: "Ngày tạo" , isDate: true},
  ] as const

  const fields = [
    { key: "name", label: "Tên người dùng" },
    { key: "email", label: "Email" },
    { key: "phone", label: "SĐT" },
    { key: "address", label: "Địa chỉ" },
  ] as const

  return (
    <>
      <FormTable
        title="Danh sách người dùng"
        data={users}
        columns={columns}
        onAdd={() => { setSelectedUser(null); setShowModal(true) }}
        onEdit={(u) => { setSelectedUser(u); setShowModal(true) }}
        onDelete={async (id) => {
          await supabase.from("users").delete().eq("id", id)
          fetchUsers()
        }}
      />

      {showModal && (
        <FormModal
          title={selectedUser ? "Sửa người dùng" : "Thêm người dùng"}
          fields={fields}
          item={selectedUser}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
