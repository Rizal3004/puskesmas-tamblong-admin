import { useQuery } from '@tanstack/vue-query'
import apiFetch from '@/lib/ofetch'

export function useGetAllPolis() {
  return useQuery<{
    id: number
    name: string
  }[]>({
    queryKey: ['polis'],
    queryFn: async () => {
      return await apiFetch('/poli')
    },
  })
}

export function useGetPoliById(id: number) {
  return useQuery({
    queryKey: ['poli', id],
    queryFn: async () => {
      return await apiFetch(`/poli/${id}`)
    },
  })
}
