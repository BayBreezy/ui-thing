<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <UiAttachment size="default" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>Default attachment</UiAttachmentTitle>
        <UiAttachmentDescription>PDF · 2.4 MB</UiAttachmentDescription>
      </UiAttachmentContent>
    </UiAttachment>
    <UiAttachment size="sm" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>Small attachment</UiAttachmentTitle>
        <UiAttachmentDescription>PDF · 2.4 MB</UiAttachmentDescription>
      </UiAttachmentContent>
    </UiAttachment>
    <UiAttachment size="xs" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>Extra small attachment</UiAttachmentTitle>
      </UiAttachmentContent>
    </UiAttachment>
  </div>
</template>

<script lang="ts" setup></script>
