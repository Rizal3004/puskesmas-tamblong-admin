<script lang="ts" setup>
import { computed, ref } from 'vue'
import DokterTR from '@/components/Dokter/DokterTR.vue'
import { useGetAllDoctors } from '@/services/doctorService'

const { data: doctors } = useGetAllDoctors()
const searchText = ref('')

const doctors2 = computed(() => {
  if (!doctors.value) return []
  if (!searchText.value) return doctors.value
  return doctors.value.filter(doctor => doctor.name.toLowerCase().includes(searchText.value.toLowerCase()))
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Data Dokter</h1>
      <div class="flex items-center gap-8">
        <div class="">
          <label for="search">Cari Dokter:</label>
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
        <div class="">
          <RouterLink to="/admin/doctor/create" class="rounded-md bg-sky-500 px-6 py-1 text-white">Tambah Dokter</RouterLink>
        </div>
      </div>
    </div>
    <div class="rounded-md border px-2 pb-3">
      <table class="w-full border-separate">
        <thead class="border-b">
          <tr class="h-12">
            <th class="text-start">ID</th>
            <th class="text-start">Nama Dokter</th>
            <th class="text-start">Spesialis</th>
            <th class="text-start">Jam mulai kerja</th>
            <th class="text-start">Jam selesai kerja</th>
            <th class="text-start">No Telp</th>
            <th class="text-start">Email</th>
            <th class="text-start">Foto</th>
            <th class="text-start" />
          </tr>
        </thead>
        <tbody class="text-sm">
          <!-- <tr class="h-1">
            <td colSpan="9" />
          </tr> -->
          <DokterTR v-for="doctor in doctors2" :key="doctor.id" :doctor />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
