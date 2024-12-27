<template>
  <nav :class="styles({ class: props.class })">
    <template v-for="(l, i) in links" :key="i">
      <div v-if="!l.children" class="flex items-center gap-4">
        <NuxtLink
          class="line-clamp-1 shrink-0 text-ellipsis text-base text-muted-foreground underline-offset-2 hover:underline sm:text-sm"
          exact-active-class="underline underline-offset-2 text-primary"
          :to="l.path"
          :title="l.title"
          @click="mobileNavState = false"
        >
          {{ l.title }}
        </NuxtLink>
        <UiBadge
          v-if="l.label"
          class="rounded-md px-2 py-0 text-xs dark:bg-lime-500 md:rounded-full md:text-[10px]"
          >{{ l.label }}</UiBadge
        >
      </div>
      <div v-else class="flex flex-col gap-4">
        <div class="flex items-center gap-2.5">
          <Icon v-if="l.icon" :name="l.icon" class="h-4 w-4" />
          <p class="text-[17px] font-medium sm:text-sm">{{ l.title }}</p>
        </div>
        <div class="pl-7">
          <DocsNav class="gap-4" :links="l.children" />
        </div>
      </div>
    </template>
  </nav>
</template>

<script lang="ts" setup>
  import { tv } from "tailwind-variants";
  import type { ContentNavigationItem } from "@nuxt/content";

  type L = ContentNavigationItem & { icon?: string };
  const props = defineProps<{
    links?: L[];
    class?: any;
  }>();

  const styles = tv({
    base: "flex flex-col gap-6 sm:text-sm",
  });

  const mobileNavState = useMobileNavState();
</script>
