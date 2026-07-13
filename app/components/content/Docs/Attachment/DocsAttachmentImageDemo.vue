<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <UiAttachmentGroup class="w-full">
      <template v-for="image in images" :key="image.name">
        <UiAttachment orientation="vertical">
          <UiAttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt" />
          </UiAttachmentMedia>
          <UiAttachmentContent>
            <UiAttachmentTitle>{{ image.name }}</UiAttachmentTitle>
            <UiAttachmentDescription>{{ image.meta }}</UiAttachmentDescription>
          </UiAttachmentContent>
          <UiAttachmentActions>
            <UiAttachmentAction :aria-label="`Remove ${image.name}`">
              <Icon name="lucide:x" />
            </UiAttachmentAction>
          </UiAttachmentActions>
          <UiAttachmentTrigger as-child>
            <a
              :href="image.src"
              target="_blank"
              rel="noreferrer"
              :aria-label="`Open ${image.name}`"
            />
          </UiAttachmentTrigger>
        </UiAttachment>
      </template>
    </UiAttachmentGroup>
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
