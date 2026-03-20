<template>
  <nav :class="styles({ class: normalizeClass(props.class) || undefined })">
    <template v-for="(l, i) in links" :key="i">
      <div v-if="!l.children" class="relative flex items-center gap-4">
        <NuxtLink
          class="group line-clamp-1 shrink-0 text-base text-ellipsis text-muted-foreground sm:text-sm"
          :class="[
            'before:absolute before:-left-6 before:-mt-[4px] before:size-4 before:rounded-bl-md before:border-b before:border-l before:border-border dark:before:border-accent',
          ]"
          exact-active-class="text-primary"
          :to="l.path"
          :title="l.title"
          :target="l.target ? (l.target as string) : '_self'"
          @click="mobileNavState = false"
        >
          <div class="relative">
            {{ l.title }}
            <div
              class="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-primary to-transparent group-hover:scale-x-100"
              :class="[
                'transition-all duration-300',
                route.path === l.path ? 'scale-x-100' : 'scale-x-0',
              ]"
            ></div>
          </div>
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
        class="flex flex-col"
      >
        <UiCollapsibleTrigger
          class="flex items-center justify-between rounded-md px-3 py-2 transition-all hover:bg-accent/20"
          :class="[
            route.path.startsWith(l.path)
              ? 'bg-accent/50 text-accent-foreground hover:bg-accent/50'
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
              'shrink-0 transform text-muted-foreground/50 transition',
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
  import { normalizeClass } from "vue";
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
