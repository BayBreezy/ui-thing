<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4 py-12">
    <UiBubble variant="secondary">
      <UiBubbleContent>Did you remove the stale route?</UiBubbleContent>
    </UiBubble>
    <UiBubble align="end">
      <UiBubbleContent>Yes, removed it from the registry.</UiBubbleContent>
      <UiBubbleReactions>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="ghost" size="icon-sm" class="rounded-full">
              <Icon name="lucide:check" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>Read on Jan 5, 2026 at 4:32 PM</UiTooltipContent>
        </UiTooltip>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
