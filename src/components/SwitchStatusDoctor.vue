<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { ref, watchEffect } from 'vue'

// const props = defineProps<{
//   checked: boolean
// }>()

// const switchState = ref(props.checked)

const switchState = defineModel<boolean>({ required: true })
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- <label
      class="select-none pr-[15px] text-[15px] leading-none text-white"
      for="airplane-mode"
    >
      Airplane mode
    </label> -->
    <SwitchRoot
      id="airplane-mode"
      v-model:checked="switchState"
      class="relative flex h-[16px] w-[32px] cursor-default rounded-full bg-amber-500/50 shadow-sm data-[state=checked]:bg-green-500"
    >
      <SwitchThumb
        class="my-auto block size-[12px] translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </SwitchRoot>
  </div>
</template>
