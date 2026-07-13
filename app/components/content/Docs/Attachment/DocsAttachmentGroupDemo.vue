<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <UiAttachmentGroup class="w-full">
      <template v-for="item in items" :key="item.name">
        <UiAttachment class="w-64">
          <UiAttachmentMedia v-if="item.src" variant="image">
            <img :src="item.src" :alt="item.name" />
          </UiAttachmentMedia>

          <UiAttachmentMedia v-if="item.icon">
            <Icon :name="item.icon" />
          </UiAttachmentMedia>

          <UiAttachmentContent>
            <UiAttachmentTitle>{{ item.name }}</UiAttachmentTitle>
            <UiAttachmentDescription>{{ item.meta }}</UiAttachmentDescription>
          </UiAttachmentContent>
          <UiAttachmentActions>
            <UiAttachmentAction :aria-label="`Remove ${item.name}`">
              <Icon name="lucide:x" />
            </UiAttachmentAction>
          </UiAttachmentActions>
        </UiAttachment>
      </template>
    </UiAttachmentGroup>
  </div>
</template>

<script lang="ts" setup>
  interface Item {
    name: string;
    meta: string;
    icon?: string;
    src?: string;
  }

  const items: Item[] = [
    { name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: "lucide:file-text" },
    {
      name: "workspace.png",
      meta: "PNG · 820 KB",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
    },
    { name: "customers.csv", meta: "CSV · 18 KB", icon: "lucide:table" },
    { name: "renderer.vue", meta: "Vue · 12 KB", icon: "lucide:file-code" },
  ];
</script>
