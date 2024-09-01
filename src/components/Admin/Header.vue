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
      >
      <div class="-space-y-1 *:block">
        <span class="font-semibold">Admin</span>
        <span class="text-xs">Puskesmas Tamblong</span>
      </div>
    </div>
    <div class="flex gap-6">
      <RouterLink to="/admin/patient">Data Pasien</RouterLink>
      <RouterLink to="/admin/doctor">Data Dokter</RouterLink>
      <RouterLink to="/admin/history">Riwayat</RouterLink>
      <RouterLink to="/admin/booking">Data Booking</RouterLink>
      <DropdownMenuHeader @logout="logout" />
    </div>
  </header>
</template>
