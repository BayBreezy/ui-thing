<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <UiDialog>
      <UiAttachment class="w-full">
        <UiAttachmentMedia>
          <Icon name="lucide:file-search" />
        </UiAttachmentMedia>
        <UiAttachmentContent>
          <UiAttachmentTitle>research-summary.pdf</UiAttachmentTitle>
          <UiAttachmentDescription>Open preview dialog</UiAttachmentDescription>
        </UiAttachmentContent>
        <UiAttachmentActions>
          <UiAttachmentAction aria-label="Copy link">
            <Icon name="lucide:copy" />
          </UiAttachmentAction>
          <UiAttachmentAction aria-label="Remove research-summary.pdf">
            <Icon name="lucide:x" />
          </UiAttachmentAction>
        </UiAttachmentActions>
        <UiDialogTrigger as-child>
          <UiAttachmentTrigger aria-label="Preview research-summary.pdf" />
        </UiDialogTrigger>
      </UiAttachment>

      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>research-summary.pdf</UiDialogTitle>
          <UiDialogDescription>
            The attachment trigger fills the card and opens the dialog, while the actions stay
            independently clickable above it.
          </UiDialogDescription>
        </UiDialogHeader>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup></script>
