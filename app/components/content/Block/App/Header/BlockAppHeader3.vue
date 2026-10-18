<template>
  <!--
    Page header with breadcrumbs and a search field
    Features: Breadcrumbs, large title with description, search input with a keyboard shortcut hint that focuses on slash, primary action
  -->
  <UiContainer class="px-4 py-6 md:px-8">
    <Motion
      class="flex flex-col gap-5"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 180, damping: 22 }"
    >
      <slot name="crumbs">
        <UiBreadcrumbs :items="props.crumbs" />
      </slot>
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <slot name="title">
            <h1 class="text-3xl font-bold tracking-tight">{{ props.title }}</h1>
          </slot>
          <slot name="description">
            <p class="text-muted-foreground mt-1.5 max-w-xl">{{ props.description }}</p>
          </slot>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative w-full lg:w-72">
            <Icon
              name="lucide:search"
              class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <UiInput
              ref="search"
              v-model="query"
              placeholder="Search documents"
              class="pr-10 pl-9"
              aria-label="Search documents"
              @keydown.esc="query = ''"
            />
            <UiKbd class="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">/</UiKbd>
          </div>
          <slot>
            <UiButton class="shrink-0">
              <Icon name="lucide:plus" class="size-4" />
              New document
            </UiButton>
          </slot>
        </div>
      </div>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  import type { BreadcrumbItem } from "@/components/Ui/Breadcrumbs.vue";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      crumbs?: BreadcrumbItem[];
    }>(),
    {
      title: "Documents",
      description: "Browse, search and organise everything your team has written.",
      crumbs: () =>
        [
          { icon: "lucide:home", link: "#" },
          { label: "Workspace", link: "#" },
          { label: "Documents", link: "#" },
        ] as BreadcrumbItem[],
    }
  );

  const query = ref("");
  const search = ref<{ $el?: HTMLElement } | null>(null);

  // Press "/" anywhere outside a field to jump to the search box.
  useEventListener("keydown", (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (
      event.key !== "/" ||
      /INPUT|TEXTAREA|SELECT/.test(target.tagName) ||
      target.isContentEditable
    ) {
      return;
    }
    event.preventDefault();
    search.value?.$el?.focus?.();
  });
</script>
