<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useLogin } from '@/services/authService'

const router = useRouter()
const toast = useToast()

// inputan user
const data = reactive({
  username: '',
  password: '',
})

const { mutate: login } = useLogin()

function handleSubmit() {
  login({
    username: data.username,
    password: data.password,
  }, {
    onSuccess: ({ token }) => {
      if (!token) return
      localStorage.setItem('token', token)
      router.push('/admin/booking')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Username atau password salah')
    },
  })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-slate-100">
    <form class="flex flex-col gap-4 rounded-xl bg-white px-10 py-8" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="data.username"
          type="text"
          class="border px-2 py-1"
          required
        >
      </div>
      <div class="flex flex-col">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="data.password"
          type="password"
          class="border px-2 py-1"
          required
        >
      </div>
      <button class="w-full rounded-md bg-sky-500 py-1 text-white">Login</button>
    </form>
  </div>
</template>
