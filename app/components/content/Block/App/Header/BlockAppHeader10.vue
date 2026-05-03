<template>
  <div>
    <div class="from-primary/10 via-primary/5 to-background border-b bg-linear-to-r">
      <UiContainer class="px-4 py-8 md:px-6">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="flex items-start gap-4">
            <slot name="icon">
              <div
                v-if="props.icon"
                class="flex size-16 items-center justify-center rounded-xl border shadow-sm"
              >
                <Icon :name="props.icon" class="text-primary size-8" />
              </div>
            </slot>
            <div class="flex flex-col gap-0.5">
              <slot name="title">
                <h1 v-if="props.title" class="text-lg font-bold" v-html="props.title" />
              </slot>
              <slot name="description">
                <p
                  v-if="props.description"
                  class="text-muted-foreground text-[15px]"
                  v-html="props.description"
                />
              </slot>
              <slot name="chips">
                <div class="mt-3 flex flex-wrap gap-2">
                  <template v-for="chip in props.chips" :key="chip">
                    <UiBadge variant="outline">{{ chip }}</UiBadge>
                  </template>
                </div>
              </slot>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <slot>
              <UiButton variant="outline" size="sm">
                <Icon name="lucide:bookmark" class="size-4" />
              </UiButton>
              <UiButton variant="outline" size="sm">
                <Icon name="lucide:external-link" class="size-4" />
                Visit site
              </UiButton>
              <UiButton size="sm">
                <Icon name="lucide:settings" class="size-4" />
                Configure
              </UiButton>
            </slot>
          </div>
        </div>
      </UiContainer>
    </div>
    <UiContainer class="mt-4 px-4 md:px-6">
      <slot name="tabs">
        <UiTabs :default-value="props.tabs[0]">
          <UiScrollArea
            type="auto"
            orientation="horizontal"
            class="**:data-[slot=scroll-area-scrollbar]:h-1.5"
          >
            <UiTabsList
              :pill="false"
              class="relative flex w-full justify-start gap-1 rounded-none border-b"
            >
              <UiTabsTrigger v-for="tab in props.tabs" :key="tab" :pill="false" :value="tab">
                {{ tab }}
              </UiTabsTrigger>
              <UiTabsIndicator />
            </UiTabsList>
          </UiScrollArea>
        </UiTabs>
      </slot>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      chips?: string[];
      tabs?: string[];
    }>(),
    {
      title: "E-Commerce Platform",
      description: "Production environment • Version 2.4.1 • Deployed 3 days ago",
      icon: "lucide:store",
      chips: () => ["Next.js", "PostgreSQL", "Vercel"],
      tabs: () => ["Overview", "Deployment", "Monitoring", "Settings", "Logs"],
    }
  );
</script>
