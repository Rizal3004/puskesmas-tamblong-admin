<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import createTimeSlots from '@/utils/createTimeSlots'
import getTimeSlotById from '@/utils/getTimeSlotById'
import timeStringToDate from '@/utils/timeStringToDate'

const selectedValue = ref<string>('')

const startAtValue = defineModel<string>('startsAt', { required: true })
const endsAtValue = defineModel<string>('endsAt', { required: true })

watchEffect(() => {
  const timeSlot = getTimeSlotById(selectedValue.value, createTimeSlots())
  if (timeSlot) {
    startAtValue.value = timeSlot.start
    endsAtValue.value = timeSlot.end
  }
})
</script>

<template>
  <SelectRoot v-model="selectedValue" required>
    <SelectTrigger
      class="inline-flex h-[35px] min-w-[160px] items-center justify-between gap-[5px] rounded border bg-white px-[15px] text-[13px] leading-none text-blackA10 outline-none hover:bg-mauve3 data-[placeholder]:text-blackA9"
      aria-label="Customise options"
    >
      <SelectValue placeholder="Pilih waktu" />
      <Icon
        icon="radix-icons/chevron-down"
        class="size-3.5"
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="z-[100] min-w-[160px] rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
        :sideOffset="5"
      >
        <SelectScrollUpButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
          <Icon icon="radix-icons:chevron-up" />
        </SelectScrollUpButton>

        <SelectViewport class="p-[5px]">
          <SelectLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
            Jam Booking
          </SelectLabel>
          <SelectGroup>
            <SelectItem
              v-for="{ id, name } in createTimeSlots()"
              :key="id"
              class="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-blackA9 data-[disabled]:text-mauve8 data-[highlighted]:text-white data-[highlighted]:outline-none"
              :value="id.toString()"
            >
              <SelectItemIndicator class="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <Icon icon="radix-icons/check" />
              </SelectItemIndicator>
              <SelectItemText>
                {{ name }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
          <Icon icon="radix-icons:chevron-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
