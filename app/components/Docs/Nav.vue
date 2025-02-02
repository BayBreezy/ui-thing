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
      <UiCollapsible v-else v-slot="{ open }" default-open class="flex flex-col gap-4">
        <UiCollapsibleTrigger
          class="flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent"
          :class="[route.path.startsWith(l.path) ? 'bg-accent' : '']"
        >
          <div class="flex items-center gap-2.5">
            <Icon v-if="l.icon" :name="l.icon" class="h-4 w-4" />
            <p class="text-[17px] font-medium sm:text-sm">{{ l.title }}</p>
            <UiBadge
              v-if="l.label"
              class="rounded-md px-2 py-0 text-xs dark:bg-lime-500 md:rounded-full md:text-[10px]"
              >{{ l.label }}</UiBadge
            >
          </div>
          <Icon
            name="lucide:chevron-down"
            :class="[
              'shrink-0 transform text-muted-foreground transition',
              open ? 'rotate-180' : 'rotate-0',
            ]"
          />
        </UiCollapsibleTrigger>
        <UiCollapsibleContent class="pl-7">
          <DocsNav class="gap-4" :links="l.children" />
        </UiCollapsibleContent>
      </UiCollapsible>
    </template>
  </nav>
</template>

<script lang="ts" setup>
  import { tv } from "tailwind-variants";
  import type { ContentNavigationItem } from "@nuxt/content";

  const route = useRoute();

  type L = ContentNavigationItem & { icon?: string };
  const props = defineProps<{
    links?: L[];
    class?: any;
  }>();

  const styles = tv({
    base: "flex flex-col gap-2 sm:text-sm",
  });

  const mobileNavState = useMobileNavState();
</script>
