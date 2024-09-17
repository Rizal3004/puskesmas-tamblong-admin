<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, watchEffect } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useGetBookingById, useUpdateBooking } from '@/services/bookingService'
import type { Doctor } from '@/types/Doctor'
import SelectDoctorsWithSamePoli from '@/components/Booking/SelectDoctorsWithSamePoli.vue'
import SelectTime from '@/components/BookingForm/SelectTime.vue'

const router = useRouter()
const route = useRoute('/admin/booking/[id]/')
const toast = useToast()

const { data: ba } = useGetBookingById(Number.parseInt(route.params.id))
const { mutate: updateBooking } = useUpdateBooking()

const formBooking = reactive({
  dokter_id: 0,
  date: '',
  starts_at: '',
  ends_at: '',
})

function handleUpdateBooking() {
  updateBooking({
    ...formBooking,
    id: ba?.value?.bookingActivity.id,
  }, {
    onSuccess() {
      toast.open({
        type: 'success',
        message: 'Data booking berhasil diubah',
      })
      router.go(-1)
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
    Edit Data Booking
  </h1>
  <div class="">
    <form class="grid grid-cols-2 gap-x-5 gap-y-2" @submit.prevent="handleUpdateBooking">
      <div class="flex flex-col">
        <label>Dokter</label>
        <SelectDoctorsWithSamePoli v-if="ba?.bookingActivity.dokter_id" v-model="formBooking.dokter_id" :doctorId="ba?.bookingActivity.dokter_id" />
      </div>
      <div class="flex flex-col">
        <label for="tanggal">Tanggal</label>
        <input
          id="tanggal"
          v-model="formBooking.date"
          type="date"
          class="rounded border border-gray-200 px-2 py-1"
          required
        >
      </div>
      <div class="flex flex-col">
        <label for="waktu">Waktu</label>
        <SelectTime v-model:startsAt="formBooking.starts_at" v-model:endsAt="formBooking.ends_at" />
      </div>
      <div class="flex items-end">
        <button type="submit" class="h-fit w-full rounded-md bg-zinc-500 py-1.5 text-white hover:bg-sky-600">
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>
