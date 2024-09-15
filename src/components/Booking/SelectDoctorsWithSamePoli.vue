<script lang="ts" setup>
import { useGetDoctorsWithSamePoliIdByDoctorId } from '@/services/doctorService'

const props = defineProps<{
  doctorId: number
}>()

const model = defineModel({ required: true })

const { data: doctors } = useGetDoctorsWithSamePoliIdByDoctorId(props.doctorId)
</script>

<template>
  <div class="">
    <select v-model="model" class="w-full rounded border border-gray-200 px-2 py-1" required>
      <option
        v-for="doctor in doctors"
        :key="doctor.id"
        :value="doctor.id"
        :selected="doctor.id === doctorId"
      >
        {{ doctor.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>
