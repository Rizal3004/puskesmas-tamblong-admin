<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import ShowKeluhan from './ShowKeluhan.vue'
import BookingDoneConfirmationDialog from '@/components/Booking/DoneConfirmationDialog.vue'
import BookingDeleteDialog from '@/components/Booking/DeleteDialog.vue'
import type { BookingActivity } from '@/types/BookingActivity'
import { useGetPatientById } from '@/services/patientService'
import { useGetDoctorById } from '@/services/doctorService'

const props = defineProps<{
  ba: BookingActivity
  showElementToPrint: boolean
  searchText: string
}>()

const { data: patient } = useGetPatientById(props.ba.pasien_id)
const { data: doctor } = useGetDoctorById(props.ba.dokter_id)
</script>

<template>
  <tr class="h-8" v-if="patient?.name.toLowerCase().includes(searchText.toLowerCase())">
    <td class="text-start">{{ patient?.name }}</td>
    <td class="text-start">{{ doctor?.name }}</td>
    <td class="text-start">{{ ba.patient_type === 'umum' ? 'Umum' : `BPJS (${ba.bpjs_number})` }}</td>
    <td class="text-start">{{ patient?.phone }}</td>
    <td class="text-start">{{ ba.date }}</td>
    <td class="text-start">{{ ba?.starts_at }} - {{ ba?.ends_at }}</td>
    <!-- <td class="text-start">{{ getQueueNumber(ba.id) }}</td> -->
    <td class="text-start">
      <div class="flex items-center gap-2">
        {{ ba.keluhan }}
        <ShowKeluhan :keluhan="ba.keluhan!" />
      </div>
    </td>
    <td class="text-start">{{ ba.penyakit }}</td>
    <td class="text-start">{{ ba.resep?.split('::')[0] }}</td>
    <td class="text-start">{{ ba.resep?.split('::')[1] }}</td>
    <td v-if="!showElementToPrint">
      <RouterLink class="rounded-md bg-slate-300 px-4 py-1 hover:bg-amber-300" :to="`/admin/history/${ba.id}`">
        Lihat
      </RouterLink>
    </td>
  </tr>
</template>
