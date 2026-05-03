<template>
  <UiContainer class="px-4 py-5 md:px-6">
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <slot name="crumbs">
            <UiBreadcrumbs v-if="props.crumbs" :items="props.crumbs" />
          </slot>
        </div>
        <div class="flex w-full flex-col justify-between gap-3 md:flex-row md:items-start">
          <div class="flex flex-col gap-2">
            <slot name="title">
              <h1 v-if="props.title" class="text-2xl font-bold" v-html="props.title" />
            </slot>
            <slot name="description">
              <p
                v-if="props.description"
                class="text-muted-foreground text-sm"
                v-html="props.description"
              />
            </slot>
          </div>
          <div class="flex flex-wrap gap-2">
            <slot>
              <UiButton variant="outline" size="sm">
                <Icon name="lucide:download" class="size-4" />
                Export
              </UiButton>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="outline" size="sm">
                    <Icon name="lucide:more-horizontal" class="size-4" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem icon="lucide:pen" title="Edit" />
                  <UiDropdownMenuItem icon="lucide:copy" title="Duplicate" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    class="text-destructive"
                    variant="destructive"
                    title="Delete"
                    icon="lucide:trash-2"
                  />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </slot>
          </div>
        </div>

        <slot name="tabs">
          <UiTabs :default-value="props.tabs[0]">
            <UiScrollArea orientation="horizontal">
              <UiTabsList :pill="false" class="relative flex gap-1">
                <UiTabsTrigger v-for="tab in props.tabs" :key="tab" :pill="false" :value="tab">
                  {{ tab }}
                </UiTabsTrigger>
                <UiTabsIndicator />
              </UiTabsList>
            </UiScrollArea>
          </UiTabs>
        </slot>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import type { BreadcrumbItem } from "@/components/Ui/Breadcrumbs.vue";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      crumbs?: BreadcrumbItem[];
      tabs?: string[];
    }>(),
    {
      title: "Analytics Dashboard",
      description: "View detailed analytics and insights for your application",
      crumbs: () =>
        [
          {
            icon: "lucide:home",
          },
          {
            label: "Dashboards",
            link: "#",
          },
          {
            label: "Analytics",
            link: "#",
          },
        ] as BreadcrumbItem[],
      tabs: () => ["Overview", "Reports", "Insights", "Settings", "Activity"],
    }
  );
</script>
