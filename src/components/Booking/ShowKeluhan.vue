<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import { Icon } from '@iconify/vue'

defineProps<{
  keluhan: string
}>()
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class=""
    >
      <Icon icon="solar:document-bold-duotone" class="text-zinc-500" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="data-[state=open]:animate-overlayShow fixed inset-0 z-30 bg-blackA9" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      >
        <DialogTitle class="m-0 text-[17px] font-semibold text-mauve12">
          Keluhan Pasien
        </DialogTitle>
        <DialogDescription class="mb-5 mt-[10px] text-[15px] leading-normal text-mauve11">
          <p>{{ keluhan }}</p>
        </DialogDescription>
        <div class="mt-[25px] flex justify-end gap-4">
          <DialogClose asChild>
            <button
              class="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-slate-100 px-[15px] font-semibold leading-none text-slate-600 transition-all duration-300 hover:bg-slate-200 focus:shadow-[0_0_0_2px] focus:shadow-slate-300 focus:outline-none"
            >
              Oke
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
