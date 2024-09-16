<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import ShowKeluhan from './ShowKeluhan.vue'
import BookingDoneConfirmationDialog from '@/components/Booking/DoneConfirmationDialog.vue'
import BookingDeleteDialog from '@/components/Booking/DeleteDialog.vue'
import type { BookingActivity } from '@/types/BookingActivity'
import { useGetPatientById } from '@/services/patientService'
import { useGetDoctorById } from '@/services/doctorService'
import { useCancelBooking, useGetQueueNumberByBookingId } from '@/services/bookingService'

const props = defineProps<{
  ba: BookingActivity
  searchText: string
  poliId: number | undefined
  date: string | undefined
}>()

const { data: patient } = useGetPatientById(props.ba.pasien_id)
const { data: doctor } = useGetDoctorById(props.ba.dokter_id)
const { data: queue } = useGetQueueNumberByBookingId(props.ba.id)
const { mutate: cancelBooking } = useCancelBooking()

function handleCancelBooking(id: number) {
  const confirmDelete = confirm('Apakah anda yakin ingin membatalkan booking ini?')
  if (!confirmDelete) return
  cancelBooking(id, {
    onSuccess: () => {
      alert('Berhasil membatalkan booking')
    },
    onError: () => {
      alert('Gagal membatalkan booking')
    },
  })
}
</script>

<template>
  <tr v-if="patient?.name.toLowerCase().includes(searchText.toLowerCase()) && (poliId ? doctor?.poli_id === poliId : true) && (date ? ba.date === date : true)">
    <td class="text-start">
      <Icon
        v-if="ba.arrived_at"
        icon="material-symbols:check-rounded"
        class="text-green-400"
      />
      <Icon
        v-else
        icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
        class="text-amber-400"
      />
    </td>
    <td class="text-start">{{ patient?.name }}</td>
    <td class="text-start">{{ ba.patient_type === 'umum' ? 'Umum' : `BPJS (${ba.bpjs_number})` }}</td>
    <td class="text-start">{{ patient?.phone }}</td>
    <td class="text-start">{{ doctor?.name }}</td>
    <td class="text-start">{{ ba.date }}</td>
    <td class="text-start">{{ ba?.starts_at }} - {{ ba?.ends_at }}</td>
    <td class="text-start">{{ queue }}</td>
    <td class="text-start">
      <div class="flex items-center gap-2">
        {{ ba.keluhan }}
        <ShowKeluhan :keluhan="ba.keluhan!" />
      </div>
    </td>
    <td class="text-start">
      <div class="flex items-center gap-2 pl-10">
        <RouterLink :to="`/admin/booking/${ba.id}`">
          <Icon icon="solar:pen-bold" class="text-amber-500" />
        </RouterLink>
        <!-- <BookingDoneConfirmationDialog :bookingActivityId="ba.id" /> -->
        <BookingDeleteDialog :bookingActivityId="ba.id" @delete="id => handleCancelBooking(id)" />
      </div>
    </td>
  </tr>
</template>
