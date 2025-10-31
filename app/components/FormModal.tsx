"use client"

import { useState, useEffect } from "react"

interface Props<T> {
  title: string
  fields: { key: keyof T; label: string }[]
  item: T | null
  onSave: (data: Partial<T>) => void
  onClose: () => void
}

export default function FormModal<T>({
  title,
  fields,
  item,
  onSave,
  onClose,
}: Props<T>) {
  const [formData, setFormData] = useState<Partial<T>>({})

  useEffect(() => {
    setFormData(item || {})
  }, [item])

  const handleChange = (key: keyof T, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
  <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content border-0 shadow">
      <div className="modal-header bg-warning bg-opacity-25">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        {fields.map((field) => (
          <div className="mb-3" key={String(field.key)}>
            <label className="form-label">{field.label}</label>
            <input
              type="text"
              value={String(formData[field.key] ?? "")}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="form-control"
            />
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Hủy
        </button>
        <button className="btn btn-primary" onClick={() => onSave(formData)}>
          Lưu
        </button>
      </div>
    </div>
  </div>
</div>

  )
}
