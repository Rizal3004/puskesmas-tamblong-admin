<script lang="ts" setup>
import { watch } from 'vue'
import { Icon } from '@iconify/vue'
import DeleteDialog from './DeleteDialog.vue'
import { baseURL } from '@/lib/ofetch'
import { useDeleteDoctor } from '@/services/doctorService'
import { useGetPoliById } from '@/services/poliService'
import type { Doctor } from '@/types/Doctor'

const props = defineProps<{
  doctor: Doctor
}>()

const { data: poli } = useGetPoliById(props.doctor.poli_id)

const { mutate: handleDeleteDoctorById } = useDeleteDoctor()

function handleDelete(id: number) {
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
    <!-- <td class="text-start">
      <img :src="`${baseURL}doctors/image/${doctor.id}`" alt="Foto dokter" class="aspect-video w-16 object-cover">
    </td> -->
    <td class="text-start">
      <div class="flex items-center gap-2 pl-10">
        <RouterLink :to="`/admin/doctor/${doctor.id}/update`">
          <Icon icon="material-symbols:edit" class="text-amber-500" />
        </RouterLink>
        <DeleteDialog :dokterId="doctor.id" @delete="(id) => handleDelete(id)" />
      </div>
    </td>
  </tr>
</template>

<style scoped></style>
