<template>
  <div class="flex items-center justify-center">
    <UiVeeInput v-model="value" label="Input with clear button" placeholder="Enter a value">
      <template #trailingIcon>
        <UiTooltip disable-closing-trigger>
          <TransitionScale>
            <UiTooltipTrigger v-if="value" as-child>
              <button
                type="button"
                aria-label="Clear input"
                class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                @click="value = ''"
              >
                <Icon name="lucide:circle-x" class="size-4" />
              </button>
            </UiTooltipTrigger>
          </TransitionScale>
          <UiTooltipContent align="center"> Clear </UiTooltipContent>
        </UiTooltip>
      </template>
    </UiVeeInput>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("Click to clear");
</script>
