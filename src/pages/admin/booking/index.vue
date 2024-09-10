<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import BookingDoneConfirmationDialog from '@/components/Booking/DoneConfirmationDialog.vue'
import BookingDeleteDialog from '@/components/Booking/DeleteDialog.vue'
import ShowKeluhan from '@/components/Booking/ShowKeluhan.vue'
import { useGetBookedBookings } from '@/services/bookingService'
import BookingActivityTR from '@/components/Booking/BookingActivityTR.vue'

const { data: bookings } = useGetBookedBookings()

const searchText = ref('')
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Data Booking</h1>
      <div class="flex items-center gap-8">
        <div class="">
          <label for="search">Cari Pasien:</label>
          <input
            v-model="searchText"
            class="mx-2 rounded-md border px-2 py-0.5"
            type="text"
          >
        </div>
        <!-- <select v-model="poliId" class="rounded-md border px-4 py-1">
          <option :value="undefined">Semua Poli</option>
          <option v-for="poli in poliList" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
        </select> -->
      </div>
    </div>
    <div class="rounded-md border px-2 pb-3">
      <table class="w-full border-separate">
        <thead class="border-b">
          <tr class="h-12">
            <!-- <th class="text-start">ID</th> -->
            <th class="text-start" />
            <th class="text-start">Nama pasien</th>
            <th class="text-start">Jenis pasien</th>
            <th class="text-start">No WA pasien</th>
            <th class="text-start">Nama dokter</th>
            <th class="text-start">Tanggal</th>
            <th class="text-start">Jam</th>
            <th class="text-start">Nomor Antrian</th>
            <!-- <th class="text-start">Status</th> -->
            <th class="text-start">Keluhan</th>
            <th class="text-start" />
          </tr>
        </thead>
        <tbody class="text-sm">
          <!-- <tr class="h-1">
            <td colSpan="9" />
          </tr> -->
          <BookingActivityTR v-for="ba of bookings" :key="ba.id" :ba />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
