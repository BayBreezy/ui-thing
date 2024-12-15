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
      >
        <template #content>
          <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
              <UiLabel for="link" class="sr-only"> Link </UiLabel>
              <UiInput id="link" model-value="https://ui.shadcn.com/docs/installation" read-only />
            </div>
            <UiButton type="submit" size="icon" class="px-3" @click="copyValue">
              <span class="sr-only">Copy</span>
              <Icon name="lucide:copy" class="h-4 w-4" />
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
  const copyValue = () => {
    const { isSupported, copy } = useClipboard({ legacy: true });
    if (isSupported.value) {
      copy("https://ui.shadcn.com/docs/installation");
      useToast().toast({
        title: "Copied",
        description: `The link has been copied to your clipboard.`,
        duration: 5000,
        icon: "lucide:thumbs-up",
      });
      return;
    } else {
      useToast().toast({
        title: "Not supported",
        description: `Your browser does not support copying to clipboard.`,
        duration: 5000,
        icon: "lucide:thumbs-down",
      });
      return;
    }
  };
</script>
