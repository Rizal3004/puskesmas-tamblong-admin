<script lang="ts" setup>
import { useId } from 'radix-vue'
import { computed, ref, useTemplateRef } from 'vue'
import { useVueToPrint } from 'vue-to-print'
import BookingActivityHistoryTR from '@/components/Booking/BookingActivityHistoryTR.vue'
import { useGetDoneBookings } from '@/services/bookingService'

const searchByDateId = useId()
const searchDate = ref()
const { data: baHistories } = useGetDoneBookings()
const elementToPrintRef = useTemplateRef('elementToPrintRef')
const showHeader = ref(false)

const baHistories2 = computed(() => {
  if (!baHistories.value) return []
  if (!searchDate.value) return baHistories.value
  return baHistories.value.filter(ba => ba.date === searchDate.value)
})

const { handlePrint } = useVueToPrint({
  content: () => elementToPrintRef.value!,
  documentTitle: 'TIKET ANTRIAN BEROBAT',
})

async function handlePrint2() {
  showHeader.value = true
  setTimeout(() => {
    handlePrint()
    showHeader.value = false
  }, 10)
}
</script>

<template>
  <div>
    <div class="flex h-10 justify-end">
      <div class="flex items-center gap-2">
        <label :for="searchByDateId" class="text-sm">Tanggal:</label>
        <input
          :id="searchByDateId"
          v-model="searchDate"
          type="date"
          :name="searchByDateId"
          class="rounded-md border px-2"
        >
        <button class="rounded-md bg-amber-300 px-2" @click="searchDate = undefined">Reset Filter</button>
        <button class="rounded-md bg-sky-300 px-2" @click="handlePrint2">Print</button>
      </div>
    </div>
    <div ref="elementToPrintRef" class="rounded-md border px-2 pb-3">
      <div v-if="showHeader" class="mb-2 border-b pb-2">
        <h1 class="text-center text-2xl font-bold">
          Laporan Pengobatan Pasien
        </h1>
      </div>
      <table class="w-full border-separate border-spacing-x-6">
        <thead class="border-b">
          <tr class="h-12">
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
          <BookingActivityHistoryTR v-for="ba of baHistories2" :key="ba.id" :ba />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
