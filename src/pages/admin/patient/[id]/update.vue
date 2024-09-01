<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetPatientById, useUpdatePatientById } from '@/services/patientService'

const router = useRouter()
const route = useRoute('/admin/patient/[id]/update')
const { mutate: updatePatientById } = useUpdatePatientById()
const { data: patient, isSuccess } = useGetPatientById(Number.parseInt(route.params.id))

const patientFormData = reactive({
  email: '',
  password: '',
})

function handleSubmit() {
  if (!patient.value) return
  updatePatientById({
    ...patient.value,
    email: patientFormData.email,
    password: patientFormData.password,
  }, {
    onSuccess: () => {
      alert('Berhasil mengedit data pasien')
      router.go(-1)
    },
    onError: () => {
      alert('Gagal mengedit data pasien')
    },
  })
}
onMounted(() => {
  watch(() => isSuccess.value, () => {
    if (!patient.value) return
    patientFormData.email = patient.value?.email
    patientFormData.password = patient.value?.password
  })
  if (patient.value) {
    patientFormData.email = patient.value.email
    patientFormData.password = patient.value.password
  }
})
</script>

<template>
  <button
    type="button"
    href="/admin/doctors"
    class="flex w-fit -translate-x-10 items-center gap-2 rounded-xl px-4 py-1 text-sm transition-all duration-300 hover:bg-slate-100"
    @click="router.go(-1)"
  >
    <img src="https://api.iconify.design/material-symbols-light:arrow-back-rounded.svg?color=%236e6e6e" alt="">
    Kembali
  </button>
  <h1 class="text-2xl font-semibold">
    Edit Data Pasien
  </h1>
  <div class="">
    <form class="grid grid-cols-2 gap-x-5 gap-y-2" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label>Email</label>
        <input
          v-model="patientFormData.email"
          type="email"
          class="rounded-md border px-3 py-1"
        >
      </div>
      <div class="flex flex-col">
        <label>Password</label>
        <input
          v-model="patientFormData.password"
          type="password"
          class="rounded-md border px-3 py-1"
        >
      </div>
      <div class="flex items-end">
        <button type="submit" class="h-10 w-full rounded-md bg-blue-400 text-white"> Edit Pasien </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
