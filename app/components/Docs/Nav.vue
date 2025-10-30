<template>
  <nav :class="styles({ class: props.class })">
    <template v-for="(l, i) in links" :key="i">
      <div v-if="!l.children" class="relative flex items-center gap-4">
        <NuxtLink
          class="group line-clamp-1 shrink-0 text-base text-ellipsis text-muted-foreground underline-offset-2 hover:underline sm:text-sm"
          :class="[
            'before:absolute before:-left-6 before:-mt-[5px] before:size-4 before:rounded-bl-md before:border-b before:border-l before:border-border dark:before:border-accent',
          ]"
          exact-active-class="underline underline-offset-2 text-primary"
          :to="l.path"
          :title="l.title"
          @click="mobileNavState = false"
        >
          {{ l.title }}
        </NuxtLink>
        <UiBadge
          v-if="l.label"
          class="rounded-sm text-xs md:text-[10px] dark:bg-lime-600 dark:text-white"
          >{{ l.label }}</UiBadge
        >
      </div>
      <UiCollapsible
        v-if="l.children"
        v-slot="{ open }"
        :default-open="route.path.includes(l.path)"
        class="flex flex-col gap-4"
      >
        <UiCollapsibleTrigger
          class="flex items-center justify-between rounded-sm px-3 py-2 hover:bg-accent"
          :class="[
            route.path.startsWith(l.path)
              ? 'bg-accent text-accent-foreground dark:bg-accent/50'
              : '',
          ]"
        >
          <div class="flex items-center gap-2.5">
            <Icon v-if="l.icon" :name="l.icon" class="size-4 text-muted-foreground" />
            <p class="text-[17px] font-medium sm:text-sm">{{ l.title }}</p>
            <UiBadge
              v-if="l.label"
              class="rounded-md px-2 py-0 text-xs md:text-[10px] dark:bg-lime-500"
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
        <UiCollapsibleContent class="pl-5">
          <div
            class="relative pt-1 pl-6 before:absolute before:left-0 before:h-[calc(100%-23px)] before:w-px before:bg-border dark:before:bg-accent"
          >
            <DocsNav class="gap-4" :links="l.children" />
          </div>
        </UiCollapsibleContent>
      </UiCollapsible>
    </template>
  </nav>
</template>

<script lang="ts" setup>
  import { tv } from "tailwind-variants";
  import type { ContentNavigationItem } from "@nuxt/content";
  import type { HTMLAttributes } from "vue";

  const route = useRoute();

  type L = ContentNavigationItem & { icon?: string };
  const props = defineProps<{
    links?: L[];
    class?: HTMLAttributes["class"];
  }>();

  const styles = tv({
    base: "flex flex-col gap-2 sm:text-sm",
  });

  const mobileNavState = useMobileNavState();
</script>
