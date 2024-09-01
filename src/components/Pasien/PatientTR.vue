<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import DeleteDialog from './DeleteDialog.vue'
import type { Patient } from '@/types/Patient'

defineProps<{
  patient: Patient
}>()
</script>

<template>
  <tr>
    <td class="text-start">{{ patient.id }}</td>
    <td class="text-start">{{ patient.name }}</td>
    <td class="text-start">{{ patient.nik }}</td>
    <td class="text-start">{{ patient.address }}</td>
    <td class="text-start">{{ patient.phone }}</td>
    <td class="text-start">{{ patient.email }}</td>
    <td class="text-start">
      {{ patient.birthdate ?? 'Belum diisi' }}
    </td>
    <td class="text-start">
      <div class="flex items-center gap-2 pl-10">
        <RouterLink :to="`/admin/patient/${patient.id}/update`">
          <Icon icon="material-symbols:edit" />
        </RouterLink>
        <abbr title="Hapus Pasien">
          <DeleteDialog :pasienId="patient.id" />
        </abbr>
      </div>
    </td>
  </tr>
</template>

<style scoped>

</style>
