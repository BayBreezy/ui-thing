<template>
  <div class="mx-auto flex max-w-sm flex-col items-start gap-5">
    <div>
      <UiVeeCheckbox
        id="checkbox-11"
        v-model="open"
        label="Checkbox with expansion"
        aria-controls="checkbox-input-11"
      />
      <p class="text-muted-foreground ml-[30px] text-xs">
        Check the <span class="font-semibold">Checkbox</span> to expand the input field.
      </p>
    </div>
    <AnimatePresence as="div" class="w-full">
      <motion.div
        v-if="open"
        :exit="{ opacity: 0, height: 0 }"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
      >
        <UiInput autofocus class="w-full" placeholder="Enter your text here" />
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
  import { motion } from "motion-v";

  const open = ref(false);
</script>
