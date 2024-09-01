import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import apiFetch from '@/lib/ofetch'
import type { Patient } from '@/types/Patient'

export function useGetAllPatients() {
  return useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: async () => {
      return await apiFetch('/patients')
    },
  })
}

export function useGetPatientById(id: number) {
  return useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: async () => {
      return await apiFetch(`/patients/${id}`)
    },
  })
}

export function useUpdatePatientById() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Patient, 'nik'>) => {
      return await apiFetch(`/patients/${data.id}`, {
        method: 'PUT',
        body: data,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  })
}

export function useDeletePatientById() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      return await apiFetch(`/patients/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  })
}
