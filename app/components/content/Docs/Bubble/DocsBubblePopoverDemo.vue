<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4 py-12">
    <UiBubble align="end">
      <UiBubbleContent>Run the build script.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="destructive">
      <UiBubbleContent>Failed to run the command.</UiBubbleContent>
      <UiBubbleReactions>
        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton
              variant="ghost"
              size="icon-sm"
              aria-label="Show error details"
              class="aria-expanded:text-destructive rounded-full"
            >
              <Icon name="lucide:info" />
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent>
            <div class="flex flex-col gap-1 text-sm">
              <div class="text-sm font-medium">Command failed with exit code 1</div>
              <div class="text-muted-foreground text-sm">
                ENOENT: no such file or directory, open pnpm-lock.yaml
              </div>
            </div>
          </UiPopoverContent>
        </UiPopover>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
