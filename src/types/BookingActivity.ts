export interface BookingActivity {
  id: number
  date: string // Format DATE seperti "YYYY-MM-DD"
  status: string // Bisa dibuat sebagai union type jika memiliki nilai terbatas seperti "booked" | "canceled" | "done"
  created_at: string // Format TIMESTAMP seperti "YYYY-MM-DD HH:mm:ss"
  dokter_id: number
  pasien_id: number
  patient_type: string // Bisa dibuat sebagai union type jika memiliki nilai terbatas seperti "umum" | "bpjs"
  bpjs_number: string | null
  arrived_at: string | null // Format TIMESTAMP seperti "YYYY-MM-DD HH:mm:ss" atau bisa null
  keluhan: string | null
  penyakit: string | null
  resep: string | null
  starts_at: string // Format TIME seperti "HH:mm:ss"
  ends_at: string // Format TIME seperti "HH:mm:ss"
}
