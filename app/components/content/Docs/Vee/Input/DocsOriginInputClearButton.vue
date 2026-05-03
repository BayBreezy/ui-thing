<template>
  <div class="flex items-center justify-center">
    <UiVeeInput v-model="value" label="Input with clear button" placeholder="Enter a value">
      <template #trailingIcon>
        <UiTooltip disable-closing-trigger>
          <AnimatePresence>
            <Motion
              v-if="value"
              class="text-muted-foreground hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
              :initial="{ opacity: 0, scale: 0.5 }"
              :animate="{ opacity: 1, scale: 1 }"
              :exit="{ opacity: 0, scale: 0 }"
            >
              <UiTooltipTrigger type="button" aria-label="Clear input" @click="value = ''">
                <Icon name="lucide:circle-x" class="size-4" />
              </UiTooltipTrigger>
            </Motion>
          </AnimatePresence>
          <UiTooltipContent align="center"> Clear </UiTooltipContent>
        </UiTooltip>
      </template>
    </UiVeeInput>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("Click to clear");
</script>
