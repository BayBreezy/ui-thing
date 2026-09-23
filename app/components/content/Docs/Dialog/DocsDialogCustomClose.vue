<template>
  <div class="flex w-full items-center justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Share</UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        class="sm:max-w-md"
        title="Share link"
        description="Anyone who has this link will be able to view this."
        @interact-outside="
          (event) => {
            const target = event.target as HTMLElement;
            if (target?.closest('[data-sonner-toaster]')) return event.preventDefault();
          }
        "
      >
        <template #content>
          <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
              <UiLabel for="link" class="sr-only"> Link </UiLabel>
              <UiInput id="link" model-value="https://uithing.com/getting-started" readonly />
            </div>
            <UiButton
              :disabled="!isSupported"
              type="submit"
              size="icon"
              class="px-3"
              @click="
                copy('https://uithing.com/getting-started');
                useSonner('Copied', {
                  description: 'The link has been copied to your clipboard.',
                });
              "
            >
              <span class="sr-only">Copy</span>
              <Icon name="lucide:copy" class="size-4" />
            </UiButton>
          </div>
        </template>
        <template #footer>
          <UiDialogFooter class="sm:justify-start">
            <UiDialogClose as-child>
              <UiButton variant="secondary">Close</UiButton>
            </UiDialogClose>
          </UiDialogFooter>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const { isSupported, copy } = useClipboard({ legacy: true });
</script>
