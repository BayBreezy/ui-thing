<template>
  <div>
    <h1 class="mb-0 text-4xl">{{ page?.title }}</h1>
    <p class="text-lg text-muted-foreground" v-if="page.description">{{ page?.description }}</p>
    <div class="not-prose flex flex-wrap gap-2" v-if="page.links && page.links.length">
      <template v-for="(link, i) in page.links" :key="i">
        <a
          class="inline-flex items-center justify-center gap-2 rounded-md bg-muted px-2 py-1 text-[15px] md:text-sm"
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
  const { page } = useContent();
</script>
