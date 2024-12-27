<template>
  <div class="relative">
    <div class="absolute right-3.5 top-2">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton
            variant="outline"
            size="icon-xs"
            class="border-transparent bg-transparent hover:bg-muted/20 disabled:opacity-100 dark:hover:bg-white/20"
            :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
            :disabled="copied"
            @click="copy(code || '')"
          >
            <TransitionScale mode="out-in">
              <Icon
                v-if="!copied"
                mode="svg"
                name="lucide:copy"
                size="16"
                aria-hidden="true"
                class="text-white"
              />
              <Icon
                v-else
                mode="svg"
                name="lucide:check"
                size="16"
                aria-hidden="true"
                class="text-emerald-500"
              />
            </TransitionScale>
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent align="center" class="px-2 py-1 text-xs">
          Click to copy
        </UiTooltipContent>
      </UiTooltip>
    </div>
    <pre><slot /></pre>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    code?: string;
    language?: string;
    filename?: string;
    highlights?: Array<number>;
    meta?: string;
  }>();

  const { copied, copy } = useClipboard();
</script>
