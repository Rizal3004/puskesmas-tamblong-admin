<script lang="ts" setup>
import PatientTR from '@/components/Pasien/PatientTR.vue'
import { useGetAllPatients } from '@/services/patientService'

const { data: patients } = useGetAllPatients()
</script>

<template>
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
        <tr class="h-1">
          <td colSpan="9" />
        </tr>

        <PatientTR v-for="patient of patients" :key="patient.id" :patient />
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
