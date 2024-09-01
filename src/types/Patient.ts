export interface Patient {
  id: number
  name: string
  nik: string
  address: string
  phone: string
  email: string
  birthdate: string | null // Format DATE seperti "YYYY-MM-DD" atau bisa null
  password: string
}
