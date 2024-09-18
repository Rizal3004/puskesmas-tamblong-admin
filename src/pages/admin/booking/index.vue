<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import BookingDoneConfirmationDialog from '@/components/Booking/DoneConfirmationDialog.vue'
import BookingDeleteDialog from '@/components/Booking/DeleteDialog.vue'
import ShowKeluhan from '@/components/Booking/ShowKeluhan.vue'
import { useGetBookedBookings } from '@/services/bookingService'
import BookingActivityTR from '@/components/Booking/BookingActivityTR.vue'
import { useGetAllPolis } from '@/services/poliService'

const { data: bookings } = useGetBookedBookings()
const { data: allPoli } = useGetAllPolis()

const searchText = ref('')
const dateFilter = ref<string>()
const poliId = ref<number>()

function resetFilter() {
  searchText.value = ''
  dateFilter.value = undefined
  poliId.value = undefined
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Data Booking</h1>
      <div class="flex items-center gap-6">
        <div class="">
          <label for="search">Cari Pasien: </label>
          <input
            v-model="searchText"
            class="rounded-md border px-2 py-0.5"
            type="text"
          >
        </div>
        <div class="">
          <label for="search">Tanggal:</label>
          <input
            v-model="dateFilter"
            class="rounded-md border px-2 py-0.5"
            type="date"
          >
        </div>
        <select v-model="poliId" class="rounded-md border px-4 py-1">
          <option :value="undefined">Semua Poli</option>
          <option v-for="poli in allPoli" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
        </select>
        <button class="rounded-md bg-slate-300 px-2 hover:bg-amber-300" @click="resetFilter">
          Reset Filter
        </button>
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
          <BookingActivityTR
            v-for="ba of bookings"
            :key="ba.id"
            :poliId
            :searchText
            :ba
            :date="dateFilter"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
