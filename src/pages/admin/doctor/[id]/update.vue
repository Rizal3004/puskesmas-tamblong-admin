<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetAllPolis } from '@/services/poliService'
import validateInputNumber from '@/utils/validateInputNumber'
import { useGetDoctorById, useUpdateDoctorById } from '@/services/doctorService'

const router = useRouter()
const doctorId = useRoute('/admin/doctor/[id]/update').params.id

const { data: doctor, isSuccess } = useGetDoctorById(Number.parseInt(doctorId))

const { data: allPoli } = useGetAllPolis()
const { mutate: updateDoctorById } = useUpdateDoctorById()

const dokterFormData = reactive<{
  name: string
  poli_id: string
  jam_kerja_start: string
  jam_kerja_end: string
  email: string
  phone: string
  photo: string
  imageFile: null | File
  password: string
}>({
  name: '',
  poli_id: '',
  jam_kerja_start: '',
  jam_kerja_end: '',
  email: '',
  phone: '',
  photo: '',
  imageFile: null,
  password: '',
})

function photoChange(e: Event) {
  dokterFormData.imageFile = (e.target as HTMLInputElement)?.files![0]
}

onMounted(() => {
  watch(() => isSuccess.value, () => {
    if (!doctor.value) return
    dokterFormData.name = doctor.value?.name
    dokterFormData.poli_id = doctor.value?.poli_id.toString()
    dokterFormData.jam_kerja_start = doctor.value?.jam_kerja_start
    dokterFormData.jam_kerja_end = doctor.value?.jam_kerja_end
    dokterFormData.email = doctor.value?.email
    dokterFormData.phone = doctor.value?.phone
    dokterFormData.password = doctor.value?.password
  })
  if (doctor.value) {
    dokterFormData.name = doctor.value.name
    dokterFormData.poli_id = doctor.value.poli_id.toString()
    dokterFormData.jam_kerja_start = doctor.value.jam_kerja_start
    dokterFormData.jam_kerja_end = doctor.value.jam_kerja_end
    dokterFormData.email = doctor.value.email
    dokterFormData.password = doctor.value.password
  }
})

function handleSubmit() {
  const confirmSubmit = confirm('Apakah anda yakin ingin mengubah dokter ini?')
  if (!confirmSubmit) return
  updateDoctorById({
    id: Number.parseInt(doctorId),
    name: dokterFormData.name,
    poli_id: Number.parseInt(dokterFormData.poli_id),
    jam_kerja_start: dokterFormData.jam_kerja_start,
    jam_kerja_end: dokterFormData.jam_kerja_end,
    email: dokterFormData.email,
    phone: dokterFormData.phone,
    password: dokterFormData.password
  }, {
    onSuccess: () => {
      alert('Berhasil mengubah dokter')
      router.go(-1)
    },
    onError: (e) => {
      alert(e.message)
    },
  })
}
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
    Edit Data Dokter
  </h1>
  <div class="">
    <form class="grid grid-cols-2 gap-x-5 gap-y-2" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label>Nama</label>
        <input
          v-model="dokterFormData.name"
          placeholder="Nama Dokter"
          type="text"
          class="rounded-md border px-3 py-1"
        >
      </div>
      <div class="flex flex-col">
        <label>Spesialis</label>
        <select
          v-model="dokterFormData.poli_id"
          placeholder="Pilih Poli"
          label="Poli"
          class="rounded-md border px-3 py-1"
        >
          <option v-for="poli in allPoli" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label>Jam mulai kerja</label>
        <input
          v-model="dokterFormData.jam_kerja_start"
          type="time"
          class="rounded-md border px-3 py-1"
        >
      </div>
      <div class="flex flex-col">
        <label>Jam berakhir kerja</label>
        <input
          v-model="dokterFormData.jam_kerja_end"
          type="time"
          class="rounded-md border px-3 py-1"
        >
      </div>
      <div class="flex flex-col">
        <label>Email</label>
        <input
          v-model="dokterFormData.email"
          type="email"
          class="rounded-md border px-3 py-1"
        >
      </div>
      <div class="flex flex-col">
        <label>No Telp</label>
        <input
          v-model="dokterFormData.phone"
          type="text"
          class="rounded-md border px-3 py-1"
          @keypress="validateInputNumber"
        >
      </div>
      <div class="flex flex-col">
        <label>Password</label>
        <input
          v-model="dokterFormData.password"
          type="text"
          class="rounded-md border px-3 py-1"
        >
      </div>
      <div class="flex flex-col">
        <label>Foto</label>
        <input
          type="file"
          multiple="false"
          accept="image/jpeg, image/jpg, image/png"
          class="rounded-md border px-3 py-1"
          @change="photoChange"
        >
      </div>
      <div class="flex items-end">
        <button type="submit" class="h-10 w-full rounded-md bg-blue-400 text-white">Submit</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
