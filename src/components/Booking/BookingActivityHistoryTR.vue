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
}>()

const { data: patient } = useGetPatientById(props.ba.pasien_id)
const { data: doctor } = useGetDoctorById(props.ba.dokter_id)
</script>

<template>
  <tr class="">
    <td class="text-start">{{ patient?.name }} {{ ba.id }}</td>
    <td class="text-start">{{ ba.patient_type === 'umum' ? 'Umum' : `BPJS (${ba.bpjs_number})` }}</td>
    <td class="text-start">{{ patient?.phone }}</td>
    <td class="text-start">{{ doctor?.name }}</td>
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
    <td>
      <RouterLink class="rounded-md bg-amber-300 px-4 py-1" :to="`/admin/history/${ba.id}`">
        Lihat
      </RouterLink>
    </td>
  </tr>
</template>
