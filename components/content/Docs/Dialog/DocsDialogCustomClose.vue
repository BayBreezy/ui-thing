<template>
  <div class="flex w-full items-center justify-center">
    <UIDialog>
      <UIDialogTrigger as-child>
        <UIButton variant="outline">Share</UIButton>
      </UIDialogTrigger>

      <UIDialogContent
        class="sm:max-w-md"
        title="Share link"
        description="Anyone who has this link will be able to view this."
      >
        <template #content>
          <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
              <UILabel for="link" class="sr-only"> Link </UILabel>
              <UIInput id="link" model-value="https://ui.shadcn.com/docs/installation" readOnly />
            </div>
            <UIButton @click="copyValue" type="submit" size="icon" class="px-3">
              <span class="sr-only">Copy</span>
              <Icon name="lucide:copy" class="h-4 w-4" />
            </UIButton>
          </div>
        </template>
        <template #footer>
          <UIDialogFooter class="sm:justify-start">
            <UIDialogClose as-child>
              <UIButton variant="secondary">Close</UIButton>
            </UIDialogClose>
          </UIDialogFooter>
        </template>
      </UIDialogContent>
    </UIDialog>
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
