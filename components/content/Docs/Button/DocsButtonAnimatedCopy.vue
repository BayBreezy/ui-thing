<template>
  <div class="text-center">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton
          variant="outline"
          size="icon"
          class="disabled:opacity-100"
          :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
          :disabled="copied"
          @click="copy('string to copy')"
        >
          <TransitionScale mode="out-in">
            <Icon v-if="!copied" name="lucide:copy" size="16" aria-hidden="true" />
            <Icon
              v-else
              name="lucide:check"
              size="16"
              aria-hidden="true"
              class="text-emerald-500"
            />
          </TransitionScale>
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent align="center" class="px-2 py-1 text-xs"> Click to copy </UiTooltipContent>
    </UiTooltip>
  </div>
</template>

<script lang="ts" setup>
  const { copied, copy } = useClipboard();
</script>
