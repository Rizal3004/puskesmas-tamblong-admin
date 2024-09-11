<script lang="ts" setup>
import { computed, ref } from 'vue'
import PatientTR from '@/components/Pasien/PatientTR.vue'
import { useGetAllPatients } from '@/services/patientService'

const { data: patients } = useGetAllPatients()

const searchText = ref('')

const patients2 = computed(() => {
  if (!patients.value) return []
  if (!searchText.value) return patients.value
  return patients.value.filter(patient => patient.name.toLowerCase().includes(searchText.value.toLowerCase()))
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex h-10 justify-between">
      <h1 class="text-2xl font-semibold">Data Riwayat Booking</h1>

      <div class="flex items-center gap-2">
        <div class="">
          <label for="search">Cari Pasien:</label>
          <input
            v-model="searchText"
            class="mx-2 rounded-md border px-2 py-0.5"
            type="text"
          >
        </div>
      </div>
    </div>
    <div class="rounded-md border px-2 pb-3">
      <table class="w-full border-separate border-spacing-x-6">
        <thead class="border-b">
          <tr class="h-12">
            <th class="text-start">ID</th>
            <th class="text-start">Nama</th>
            <th class="text-start">NIK</th>
            <th class="text-start">Alamat</th>
            <th class="text-start">No Telp</th>
            <th class="text-start">Email</th>
            <th class="text-start">Tanggal Lahir</th>
            <th class="text-start" />
          </tr>
        </thead>
        <tbody class="text-sm">
          <!-- <tr class="h-1">
            <td colSpan="9" />
          </tr> -->
          <PatientTR v-for="patient of patients2" :key="patient.id" :patient />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
