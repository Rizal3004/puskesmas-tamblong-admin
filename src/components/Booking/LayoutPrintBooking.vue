<script lang="ts" setup>
import { ref, useTemplateRef, watchEffect } from 'vue'
import { useVueToPrint } from 'vue-to-print'
import { useGetDoctorById } from '@/services/doctorService'
import { useGetPatientById } from '@/services/patientService'
import { useGetPoliById } from '@/services/poliService'
import type { BookingActivity } from '@/types/BookingActivity'
import createReferenceNumber from '@/utils/createReferenceNumber'
import apiFetch from '@/lib/ofetch'

const props = defineProps<{
  ba: BookingActivity
}>()

const { data: patient } = useGetPatientById(props.ba.pasien_id)
const { data: doctor, isSuccess } = useGetDoctorById(props.ba.dokter_id)
const poli = ref<{
  id: number
  name: string
}>()

watchEffect(async () => {
  if (isSuccess.value) {
    poli.value = await apiFetch<{ id: number, name: string }>(`/poli/${doctor?.value?.poli_id}`)
  }
})

const elementToPrintRef = useTemplateRef('elementToPrintRef')

const { handlePrint } = useVueToPrint({
  content: () => elementToPrintRef.value!,
  documentTitle: 'Laporan Data Catatan Pengobatan Pasien',
})

function handlePrint2() {
  handlePrint()
}
</script>

<template>
  <div ref="elementToPrintRef" class="overflow-x-scroll border px-4 py-6 md:overflow-x-auto md:px-16">
    <div class="mb-8">
      <div class="flex items-center gap-5">
        <div class="aspect-square w-20">
          <img src="/logo_puskesmas-tamblong.png" alt="">
        </div>
        <div class="flex flex-col text-xs">
          <h2 class="text-lg font-semibold">Puskesmas Tamblong</h2>
          <p v-if="ba">No Surat: {{ createReferenceNumber(ba) }}</p>
          <p>Alamat: Jl. Tamblong no. 66, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112</p>
          <p>No Telp. +6289668223131, Email: lkfjasdf, Website: puskesmas-tamblong.vercel.dev</p>
        </div>
      </div>
    </div>
    <h1 class="text-center text-2xl font-semibold">LAPORAN DATA CATATAN PENGOBATAN PASIEN</h1>
    <div class="my-2 border-y py-2">
      <table class="">
        <tbody>
          <tr>
            <td>Nama</td>
            <td>: {{ patient?.name }}</td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>: {{ patient?.nik }}</td>
          </tr>
          <tr>
            <td>Tanggal Lahir</td>
            <td>: {{ patient?.birthdate ?? '-' }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>: {{ patient?.email }}</td>
          </tr>
          <tr>
            <td>Nomor Telepon</td>
            <td>: {{ patient?.phone ?? '-' }}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>: {{ patient?.address ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <table class="w-full border-solid [&>tr>*]:border [&>tr>*]:px-3 [&>tr>*]:text-start">
      <tbody>
        <tr>
          <th>Tanggal</th>
          <th>Dokter</th>
          <th>Poli</th>
          <th>Penyakit</th>
          <th>Resep</th>
        </tr>
        <tr>
          <td>{{ ba?.date }}</td>
          <td>{{ doctor?.name }}</td>
          <td>{{ poli?.name }}</td>
          <td>{{ ba?.penyakit }}</td>
          <td>{{ ba?.resep?.split('::').join(' - ') }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-6 flex justify-end">
      <div class="text-sm">
        <p>Kota Bandung, {{ (new Date().toLocaleDateString()).split('/').join('-') }}</p>
        <p>Penanggung Jawab</p>
        <p class="mt-10">Dr. Neil Jackson</p>
      </div>
    </div>
  </div>
  <div class="mt-8 flex justify-end">
    <button class="rounded-md bg-sky-200 px-4 py-0.5" @click="handlePrint2">Print</button>
  </div>
</template>
