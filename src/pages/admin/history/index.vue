<script lang="ts" setup>
import { useId } from 'radix-vue'
import { computed, ref, useTemplateRef } from 'vue'
import { useVueToPrint } from 'vue-to-print'
import BookingActivityHistoryTR from '@/components/Booking/BookingActivityHistoryTR.vue'
import { useGetDoneBookings } from '@/services/bookingService'
import createReferenceNumber from '@/utils/createReferenceNumber'
import createReferenceNumber2 from '@/utils/createReferenceNumber2'

const searchByDateId = useId()
const searchDate = ref()
const { data: baHistories } = useGetDoneBookings()
const elementToPrintRef = useTemplateRef('elementToPrintRef')
const showElementToPrint = ref(false)

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
  showElementToPrint.value = true
  setTimeout(() => {
    handlePrint()
    showElementToPrint.value = false
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
    <div ref="elementToPrintRef" class="">
      <div class="rounded-md border px-2 pb-3" :class="{ 'px-6 py-8': showElementToPrint }">
        <div v-if="showElementToPrint" class="mb-8 px-6">
          <div class="flex items-center gap-5">
            <div class="aspect-square w-20">
              <img src="/logo_puskesmas-tamblong.png" alt="">
            </div>
            <div class="flex flex-col text-xs">
              <h2 class="text-lg font-semibold">Puskesmas Tamblong</h2>
              <p>No Laporan: {{ createReferenceNumber2() }}</p>
              <p>Alamat: Jl. Tamblong no. 66, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112</p>
              <p>No Telp. +6289668223131, Email: lkfjasdf</p>
              <p>Website: puskesmas-tamblong.vercel.dev</p>
            </div>
          </div>
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
      <div v-if="showElementToPrint" class="mt-6 flex justify-end pr-16">
        <div class="text-center text-sm">
          <p>Kota Bandung, {{ (new Date().toLocaleDateString()).split('/').join('-') }}</p>
          <p>Penanggung Jawab</p>
          <p class="mt-10">Dr. Neil Jackson</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
