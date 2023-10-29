<template>
  <div>
    <h1 class="mb-0">{{ title }}</h1>
    <p class="text-muted-foreground lg:text-lg" v-if="description">{{ description }}</p>
    <div class="not-prose flex flex-wrap gap-2" v-if="links && links.length">
      <template v-for="(link, i) in links" :key="i">
        <a
          class="inline-flex items-center justify-center gap-2 rounded-md bg-muted px-2 py-1 text-xs"
          target="_blank"
          :href="link.href"
          ><Icon v-if="link.icon" :name="link.icon" class="h-3.5 w-3.5 text-muted-foreground" />{{
            link.title
          }}</a
        >
        <br />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title: string;
    description?: string;
    links?: { title: string; href: string; icon?: string }[];
  }>();
</script>
