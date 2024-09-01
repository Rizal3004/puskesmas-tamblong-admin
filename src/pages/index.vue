<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import apiFetch from '@/lib/ofetch'

const queryClient = useQueryClient()

const newTodo = ref('')

const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const res = await apiFetch('/todos')
    return res
  },
})

const { mutate } = useMutation({
  mutationFn: (newTodo: string) => apiFetch('/todos', {
    method: 'POST',
    body: {
      newTodo,
    },
  }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

function addTodo() {
  mutate(newTodo.value)
  newTodo.value = ''
}
</script>

<template>
  <main>
    halo
    <div class="">
      {{ data }}
    </div>
    <div class="">
      <input v-model="newTodo" type="text" class="border">
      <button @click="addTodo">
        Add Todo
      </button>
    </div>
    <RouterView />
  </main>
</template>
