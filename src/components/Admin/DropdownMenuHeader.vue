<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'

const emit = defineEmits<{
  logout: []
}>()

const toggleState = ref(false)

function handleClick() {
  emit('logout')
}
</script>

<template>
  <DropdownMenuRoot v-model:open="toggleState">
    <DropdownMenuTrigger
      class="inline-flex items-center justify-center rounded-full text-slate-600 outline-none hover:bg-slate-200"
      aria-label="Customise options"
    >
      <Icon icon="radix-icons:hamburger-menu" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
        :sideOffset="5"
      >
        <DropdownMenuItem
          value="New Tab"
          class="group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-red-500 data-[disabled]:text-mauve8 data-[highlighted]:text-white"
          @click="handleClick"
        >
          Logout
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
          >
            <Icon icon="solar:logout-2-linear" />
          </div>
        </DropdownMenuItem>

        <DropdownMenuArrow class="fill-white" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
