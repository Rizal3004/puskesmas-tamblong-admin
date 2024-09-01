import { useMutation, useQuery } from '@tanstack/vue-query'
import apiFetch from '@/lib/ofetch'

export function useLogin() {
  return useMutation<{
    token: string
  }, Error, { username: string, password: string }>({
    mutationFn: async ({ username, password }: { username: string, password: string }) => {
      return await apiFetch('/auth/admin/login', {
        method: 'POST',
        body: {
          username,
          password,
        },
      })
    },
  })
}
