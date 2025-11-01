<script setup lang="ts">
  const open = ref(false);
</script>

<template>
  <UiPopover v-model:open="open">
    <UiPopoverTrigger as-child>
      <UiButton variant="secondary"> Share </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent align="end" class="w-(--reka-popover-trigger-width) md:w-[520px]">
      <div class="flex flex-col space-y-2 text-center sm:text-left">
        <h3 class="text-lg font-semibold">Share preset</h3>
        <p class="text-sm text-muted-foreground">
          Anyone who has this link and an OpenAI account will be able to view this.
        </p>
      </div>
      <div class="flex items-center space-x-2 pt-4">
        <div class="grid flex-1 gap-2">
          <UiLabel for="link" class="sr-only"> Link </UiLabel>
          <UiInput
            id="link"
            model-value="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
            readonly
          />
        </div>
        <UiButton type="submit" size="sm" class="px-3" @click="open = false">
          <span class="sr-only">Copy</span>
          <Icon name="lucide:copy" class="h-4 w-4" />
        </UiButton>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
