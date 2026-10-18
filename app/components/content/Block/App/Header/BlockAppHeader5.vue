<template>
  <!--
    Page header with breadcrumbs, actions and tabs
    Features: Breadcrumbs, title and description, export and overflow menu, tabs with count badges and a sliding underline, scrollable on mobile
  -->
  <UiContainer class="px-4 pt-6 md:px-8">
    <Motion
      class="flex flex-col gap-5"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 180, damping: 22 }"
    >
      <slot name="crumbs">
        <UiBreadcrumbs v-if="props.crumbs" :items="props.crumbs" />
      </slot>

      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div class="space-y-1">
          <slot name="title">
            <h1 class="text-2xl font-bold tracking-tight">{{ props.title }}</h1>
          </slot>
          <slot name="description">
            <p class="text-muted-foreground text-sm">{{ props.description }}</p>
          </slot>
        </div>
        <div class="flex items-center gap-2">
          <slot>
            <UiButton variant="outline">
              <Icon name="lucide:download" class="size-4" />
              Export
            </UiButton>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="outline" size="icon" aria-label="More actions">
                  <Icon name="lucide:ellipsis" class="size-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem icon="lucide:pen" title="Rename" />
                <UiDropdownMenuItem icon="lucide:copy" title="Duplicate" />
                <UiDropdownMenuItem icon="lucide:archive" title="Archive" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem variant="destructive" icon="lucide:trash-2" title="Delete" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </slot>
        </div>
      </div>

      <slot name="tabs">
        <UiTabs v-model="tab" class="-mx-1">
          <UiScrollArea orientation="horizontal">
            <UiTabsList :pill="false" class="relative flex w-full justify-start gap-1 border-b">
              <UiTabsTrigger
                v-for="item in props.tabs"
                :key="item.value"
                :pill="false"
                :value="item.value"
                class="gap-2"
              >
                {{ item.label }}
                <span
                  v-if="item.count !== undefined"
                  class="bg-muted text-muted-foreground rounded-full px-1.5 text-xs font-medium tabular-nums"
                >
                  {{ item.count }}
                </span>
              </UiTabsTrigger>
              <UiTabsIndicator />
            </UiTabsList>
          </UiScrollArea>
        </UiTabs>
      </slot>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  import type { BreadcrumbItem } from "@/components/Ui/Breadcrumbs.vue";

  type Tab = { label: string; value: string; count?: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      crumbs?: BreadcrumbItem[];
      tabs?: Tab[];
    }>(),
    {
      title: "Analytics",
      description: "Track traffic, conversions and engagement across your product.",
      crumbs: () =>
        [
          { icon: "lucide:home", link: "#" },
          { label: "Reports", link: "#" },
          { label: "Analytics", link: "#" },
        ] as BreadcrumbItem[],
      tabs: () => [
        { label: "Overview", value: "overview" },
        { label: "Reports", value: "reports", count: 12 },
        { label: "Insights", value: "insights", count: 3 },
        { label: "Segments", value: "segments" },
        { label: "Activity", value: "activity" },
      ],
    }
  );

  const tab = ref(props.tabs[0]?.value);
</script>
