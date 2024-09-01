export interface Doctor {
  id: number;
  jam_kerja_start: string; // Format TIME seperti "HH:mm"
  jam_kerja_end: string;   // Format TIME seperti "HH:mm"
  name: string;
  phone: string;
  email: string;
  foto: string | null;
  status: string; // Bisa dibuat sebagai union type jika memiliki nilai terbatas seperti "active" | "inactive"
  poli_id: number;
}
