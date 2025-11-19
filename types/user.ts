export interface User {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  created_at?: string
}
export interface UserAuth extends User {
  password: string
}
