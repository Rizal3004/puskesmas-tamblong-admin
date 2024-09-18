<script setup lang="ts">
import { useRouter } from 'vue-router'
import DropdownMenuHeader from './DropdownMenuHeader.vue'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<template>
  <header class="flex h-16 items-center justify-between px-20">
    <div class="flex gap-2">
      <img
        class="aspect-square w-7 object-contain"
        src="/logo_puskesmas-tamblong.png"
      />
      <div class="-space-y-1 *:block">
        <span class="font-semibold">Admin</span>
        <span class="text-xs">Puskesmas Tamblong</span>
      </div>
    </div>
    <div class="flex gap-6">
      <RouterLink to="/admin/patient" active-class="text-sky-600 font-bold">Data Pasien</RouterLink>
      <RouterLink to="/admin/doctor" active-class="text-sky-600 font-bold">Data Dokter</RouterLink>
      <RouterLink to="/admin/history" active-class="text-sky-600 font-bold">Riwayat</RouterLink>
      <RouterLink to="/admin/booking" active-class="text-sky-600 font-bold">Data Booking</RouterLink>
      <DropdownMenuHeader @logout="logout" />
    </div>
  </header>
</template>

<style scoped>
/* Contoh kelas CSS untuk status aktif */
.text-sky-600 {
  color: #3b82f6; /* Ganti dengan warna yang Anda inginkan */
}

.font-bold {
  font-weight: bold;
}
</style>

