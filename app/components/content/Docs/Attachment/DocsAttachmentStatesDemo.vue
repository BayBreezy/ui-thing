<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
    <UiAttachment state="idle" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:clock" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>selected-file.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Ready to upload</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove selected-file.pdf">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="uploading" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>design-system.zip</UiAttachmentTitle>
        <UiAttachmentDescription>Uploading · 64%</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Cancel upload">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="processing" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>market-research.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Processing document</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove market-research.pdf">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="error" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-warning" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>financial-model.xlsx</UiAttachmentTitle>
        <UiAttachmentDescription> Upload failed. Try again. </UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Retry upload">
          <Icon name="lucide:refresh-cw" />
        </UiAttachmentAction>
        <UiAttachmentAction aria-label="Remove financial-model.xlsx">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="done" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:check" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>uploaded-report.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Uploaded · 1.8 MB</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove uploaded-report.pdf">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
  </div>
</template>

<script lang="ts" setup></script>
