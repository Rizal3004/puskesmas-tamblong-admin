<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVueToPrint } from 'vue-to-print'
import { useGetBookingById } from '@/services/bookingService'
import createReferenceNumber from '@/utils/createReferenceNumber'
import { useGetPatientById } from '@/services/patientService'
import type { Patient } from '@/types/Patient'
import type { Doctor } from '@/types/Doctor'
import LayoutPrintBooking from '@/components/Booking/LayoutPrintBooking.vue'

const id = useRoute('/admin/history/[id]/').params.id
const router = useRouter()

const { data: ba } = useGetBookingById(Number.parseInt(id))
</script>

<template>
  <div>
    <div class="space-y-3 border-t p-4 md:px-36">
      <button
        type="button"
        href="/admin/doctors"
        class="flex w-fit items-center gap-2 rounded-xl px-4 py-1 text-sm transition-all duration-300 hover:bg-slate-100 md:-translate-x-10"
        @click="router.go(-1)"
      >
        <img src="https://api.iconify.design/material-symbols-light:arrow-back-rounded.svg?color=%236e6e6e" alt="">
        Kembali
      </button>
      <LayoutPrintBooking v-if="ba" :ba="ba.bookingActivity" />
    </div>
  </div>
</template>

<style scoped>

</style>
