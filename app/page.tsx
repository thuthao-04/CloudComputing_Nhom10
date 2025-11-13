  import Link from "next/link"

  export default function HomePage() {
    return (
      <main className="container mt-5 text-center">
        <h1 className="mb-4">Trang Quản Lý</h1>
        <p>Chọn mục cần quản lý:</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link href="/users" className="btn btn-primary">Quản lý người dùng</Link>
          <Link href="/products" className="btn btn-success">Quản lý sản phẩm</Link>
          
        </div>
      </main>
    )
  }
