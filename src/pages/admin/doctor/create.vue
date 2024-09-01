<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useGetAllPolis } from '@/services/poliService'
import validateInputNumber from '@/utils/validateInputNumber'
import { useCreateDoctor } from '@/services/doctorService'

const router = useRouter()

const { mutate: createDoctor } = useCreateDoctor()

const { data: allPoli } = useGetAllPolis()

const dokterFormData = reactive<{
  email: string
  imageFile?: File
  jam_kerja_end: string
  jam_kerja_start: string
  name: string
  phone: string
  poli_id?: number
}>({
  name: '',
  poli_id: undefined,
  jam_kerja_start: '',
  jam_kerja_end: '',
  email: '',
  phone: '',
  imageFile: undefined,
})

function photoChange(e: Event) {
  dokterFormData.imageFile = (e.target as HTMLInputElement)?.files![0]
}

function handleSubmit() {
  createDoctor(dokterFormData, {
    onSuccess: () => {
      alert('Berhasil menambahkan dokter')
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
