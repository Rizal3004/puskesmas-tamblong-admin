<script lang="ts" setup>
import BookingActivityHistoryTR from '@/components/Booking/BookingActivityHistoryTR.vue'
import { useGetDoneBookings } from '@/services/bookingService'

const { data: baHistories } = useGetDoneBookings()
</script>

<template>
  <div>
    <div class="rounded-md border px-2 pb-3">
      <table class="w-full border-separate border-spacing-x-6">
        <thead class="border-b">
          <tr class="h-12">
            <th class="text-start">ID</th>
            <th class="text-start">Nama pasien</th>
            <th class="text-start">Nama dokter</th>
            <th class="text-start">Poli</th>
            <th class="text-start">Tanggal</th>
            <th class="text-start">Jam mulai</th>
            <th class="text-start">Jam selesai</th>
            <th class="text-start">Keluhan</th>
            <th class="text-start">Penyakit</th>
            <th class="text-start">Resep</th>
            <th class="text-start">Aturan Minum</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr class="h-1">
            <td colSpan="9" />
          </tr>
          <BookingActivityHistoryTR v-for="ba of baHistories" :key="ba.id" :ba />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
