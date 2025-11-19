"use client"

interface Column<T> {
  key: keyof T
  label: string
  isDate?: boolean
  isImage?: boolean
}

interface Props<T> {
  title: string
  data: T[]
  columns: Column<T>[]
  onAdd: () => void
  onEdit: (item: T) => void
  onDelete: (id: number) => void
}

export default function FormTable<T extends { id: number }>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
}: Props<T>) {
  const formatDate = (value: any) => {
    if (!value) return ""
    const date = new Date(value)
    return date.toLocaleDateString("vi-VN")
  }

  return (
    <div className="card shadow-sm border-0" style={{ backgroundColor: "#E0F7FA" }}>
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#0288D1", color: "#fff" , height: '60px'}}
      >
        <h5 className="mb-0 fw-semibold">
          {title}{" "}
          <span
            className="badge"
            style={{ backgroundColor: "#E0F7FA", color: "#0288D1" }}
          >
            ({data.length})
          </span>
        </h5>
        <button
          onClick={onAdd}
          className="btn btn-light btn-sm px-3 fw-semibold"
          style={{ color: "#0288D1", border: "1px solid #0288D1" }}
        >
          Thêm mới
        </button>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              style={{
                backgroundColor: "#0288D1",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "0.8rem",
              }}
            >
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)}>{col.label}</th>
                ))}
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4 text-muted">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id}>
                    {columns.map((col) => (
                      <td key={String(col.key)}>
                        {col.isDate
                          ? formatDate(item[col.key])
                          : col.isImage
                          ? item[col.key] ? (
                              <img
                                src={String(item[col.key])}
                                alt=""
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  border: "1px solid #ddd",
                                }}
                              />
                            ) : (
                              "Chưa có ảnh"
                            )
                          : String(item[col.key] ?? "")
                        }
                      </td>
                    ))}
                    <td className="text-center">
                      <button
                        onClick={() => onEdit(item)}
                        className="btn btn-outline-light btn-sm me-2"
                        style={{ borderColor: "#151212ff", color: "#1a43d7ff" }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
