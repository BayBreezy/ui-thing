<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <UiAttachmentGroup>
      <template v-for="image in images" :key="image.name">
        <UiAttachment orientation="vertical">
          <UiAttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt" />
          </UiAttachmentMedia>
          <UiAttachmentContent>
            <UiAttachmentTitle>{{ image.name }}</UiAttachmentTitle>
            <UiAttachmentDescription>{{ image.meta }}</UiAttachmentDescription>
          </UiAttachmentContent>
        </UiAttachment>
      </template>
    </UiAttachmentGroup>
    <UiAttachment state="uploading" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>sales-dashboard.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Uploading · 64%</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Cancel upload">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-code" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>message-renderer.vue</UiAttachmentTitle>
        <UiAttachmentDescription>TypeScript · 12 KB</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove message-renderer.vue">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
  </div>
</template>

<script lang="ts" setup>
  const images = [
    {
      name: "workspace.png",
      meta: "PNG · 820 KB",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
      alt: "Workspace",
    },
    {
      name: "desk-reference.jpg",
      meta: "JPG · 1.1 MB",
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
      alt: "Desk",
    },
    {
      name: "office-reference.jpg",
      meta: "JPG · 940 KB",
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
      alt: "Office",
    },
  ];
</script>
