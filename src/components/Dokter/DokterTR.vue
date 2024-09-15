<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref, watch, watchEffect } from 'vue'
import { useToast } from 'vue-toast-notification'
import SwitchStatusDoctor from '../SwitchStatusDoctor.vue'
import DeleteDialog from './DeleteDialog.vue'
import { baseURL } from '@/lib/ofetch'
import { useActivateDoctor, useDeactivateDoctor, useDeleteDoctor } from '@/services/doctorService'
import { useGetPoliById } from '@/services/poliService'
import type { Doctor } from '@/types/Doctor'

const props = defineProps<{
  doctor: Doctor
}>()

const $toast = useToast()

const { data: poli } = useGetPoliById(props.doctor.poli_id)

const { mutate: handleDeleteDoctorById } = useDeleteDoctor()
const { mutate: handleDeactivateDoctorById } = useDeactivateDoctor()
const { mutate: handleActivateDoctorById } = useActivateDoctor()

const switchState = ref(props.doctor.status === 'active')

watchEffect(() => {
  if (switchState.value) {
    handleActivateDoctorById(props.doctor.id, {
      onError: () => {
        $toast.error('Gagal mengubah status dokter')
        switchState.value = false
      },
    })
  } else {
    handleDeactivateDoctorById(props.doctor.id, {
      onError: () => {
        $toast.error('Gagal mengubah status dokter')
        switchState.value = true
      },
    })
  }
})

function handleDelete(id: number) {
  // eslint-disable-next-line no-alert
  const confirmDelete = confirm('Apakah anda yakin ingin menghapus dokter ini?')
  if (!confirmDelete) return
  handleDeleteDoctorById(id, {
    onSuccess: () => {
      // eslint-disable-next-line no-alert
      alert('Berhasil menghapus dokter')
    },
    onError: () => {
      // eslint-disable-next-line no-alert
      alert('Gagal menghapus dokter, dokter masih memiliki jadwal praktek')
    },
  })
}
</script>

<template>
  <tr>
    <td class="text-start">{{ doctor.id }}</td>
    <td class="text-start">{{ doctor.name }}</td>
    <td v-if="poli" class="text-start">{{ poli.name }}</td>
    <td class="text-start">{{ doctor.jam_kerja_start }}</td>
    <td class="text-start">{{ doctor.jam_kerja_end }}</td>
    <td class="text-start">{{ doctor.phone }}</td>
    <td class="text-start">{{ doctor.email }}</td>
    <td class="text-start">
      <img :src="`${baseURL}/doctors/image/${doctor.id}`" alt="Foto dokter" class="aspect-video w-16 object-cover">
    </td>
    <td class="text-start">
      <div class="flex items-center gap-2 pl-10">
        <!-- <p>{{ doctor.status }}</p> -->
        <SwitchStatusDoctor
          v-model="switchState"
          :checked="doctor.status === 'active'"
        />
        <RouterLink :to="`/admin/doctor/${doctor.id}/update`">
          <Icon icon="material-symbols:edit" class="text-amber-500" />
        </RouterLink>
        <DeleteDialog :dokterId="doctor.id" @delete="(id) => handleDelete(id)" />
      </div>
    </td>
  </tr>
</template>

<style scoped></style>
