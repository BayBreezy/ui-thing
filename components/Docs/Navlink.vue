<template>
  <nav :class="styles({ class: props.class })">
    <template v-for="(l, i) in links" :key="i">
      <NuxtLink
        class="line-clamp-1 text-ellipsis text-muted-foreground underline-offset-2 hover:underline"
        exact-active-class="underline underline-offset-2"
        :to="l._path"
        :title="l.title"
        v-if="!l.children"
        >{{ l.title }}</NuxtLink
      >
      <div v-else class="flex flex-col gap-4">
        <div class="flex items-center gap-2.5">
          <Icon v-if="l.icon" :name="l.icon" class="h-4 w-4" />
          <p class="font-medium">{{ l.title }}</p>
        </div>
        <div class="pl-7">
          <DocsNavlink class="gap-4" :links="l.children" />
        </div>
      </div>
    </template>
  </nav>
</template>

<script lang="ts" setup>
  import { tv } from "tailwind-variants";

  type Link = {
    _path: string;
    title: string;
    icon?: string;
    children?: Link[];
  };

  const props = defineProps<{
    links: Link[];
    class?: any;
  }>();

  const styles = tv({
    base: "flex flex-col gap-6 text-sm",
  });
</script>
