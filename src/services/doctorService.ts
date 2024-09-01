import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import apiFetch from '@/lib/ofetch'
import type { Doctor } from '@/types/Doctor'
import jpegToPng from '@/utils/jpegToPng'

export function useGetAllDoctors() {
  return useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: async () => {
      return await apiFetch('/doctors')
    },
  })
}

export function useGetDoctorById(id: number) {
  return useQuery<Doctor>({
    queryKey: ['doctor', id],
    queryFn: async () => {
      return await apiFetch(`/doctors/${id}`)
    },
  })
}

export function useCreateDoctor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<Doctor> & {imageFile?: File}) => {
      const {
        email,
        imageFile,
        jam_kerja_end,
        jam_kerja_start,
        name,
        phone,
        poli_id,
      } = data
      const formData = new FormData()

      formData.append('email', email!)
      formData.append('jam_kerja_end', jam_kerja_end!)
      formData.append('jam_kerja_start', jam_kerja_start!)
      formData.append('name', name!)
      formData.append('phone', phone!)
      formData.append('poli_id', String(poli_id))
  
      const imageFile2 = await jpegToPng(imageFile as File)
  
      formData.append('imageFile', imageFile2)

      return await apiFetch('/doctors', {
        method: 'POST',
        body: formData,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctors'] }),
  })
}

export function useUpdateDoctorById() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Doctor, 'foto' | 'status'>) => {
      return await apiFetch(`/doctors/${data.id}`, {
        method: 'PUT',
        body: data,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctors'] }),
  })
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      return await apiFetch(`/doctors/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
  })
}
