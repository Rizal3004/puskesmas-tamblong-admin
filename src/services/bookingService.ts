import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import apiFetch from '@/lib/ofetch'
import type { BookingActivity } from '@/types/BookingActivity'

export function useGetAllBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      return await apiFetch('/booking-activities')
    },
  })
}

export function useGetBookingById(id: number) {
  return useQuery<{ bookingActivity:BookingActivity}>({
    queryKey: ['booking', id],
    queryFn: async () => {
      return await apiFetch(`/booking-activities/${id}`)
    },
  })
}

export function useGetBookedBookings() {
  return useQuery<BookingActivity[]>({
    queryKey: ['bookings', { status: 'booked' }],
    queryFn: async () => {
      return await apiFetch('/booking-activities?status=booked')
    },
  })
}

export function useGetDoneBookings() {
  return useQuery<BookingActivity[]>({
    queryKey: ['bookings', { status: 'done' }],
    queryFn: async () => {
      return await apiFetch('/booking-activities?status=done')
    },
  })
}

export function useConfirmationCompleteBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, penyakit, resep }: { id: number, penyakit: string, resep: string }) => {
      return await apiFetch(`/booking-activities/${id}/done`, {
        method: 'POST',
        body: { penyakit, resep },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', { status: 'booked' }] })
      queryClient.invalidateQueries({ queryKey: ['bookings', { status: 'done' }] })
    },

  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      return await apiFetch(`/booking-activities/${id}/cancel`, {
        method: 'PATCH',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', { status: 'booked' }] })
      queryClient.invalidateQueries({ queryKey: ['bookings', { status: 'done' }] })
    },
  })
}

export function useGetQueueNumberByBookingId(bookingId: number) {
  return useQuery<number>({
    queryKey: ['queue-number', bookingId],
    queryFn: async () => {
      const { queue } = await apiFetch(`/booking-activities/${bookingId}/queue`)
      return queue
    },
  })
}