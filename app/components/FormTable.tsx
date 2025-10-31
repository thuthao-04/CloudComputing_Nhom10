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
    <div className="card shadow-sm border-0">
      <div className="card-header bg-warning bg-opacity-10 border-0 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold text-dark">
          {title} <span className="badge bg-warning text-dark">({data.length})</span>
        </h5>
        <button onClick={onAdd} className="btn btn-success btn-sm px-3">
          Thêm mới
        </button>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-warning text-secondary text-uppercase small">
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
                        className="btn btn-outline-warning btn-sm me-2"
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
