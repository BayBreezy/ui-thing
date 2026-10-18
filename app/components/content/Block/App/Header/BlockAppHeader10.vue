<template>
  <!--
    Application header with a gradient banner, live status and tabs
    Features: Grid patterned gradient banner, app icon, live status pill with a pulsing dot, version and branch metadata, tech chips, sliding tab underline, entrance animation
  -->
  <div>
    <div
      class="from-muted via-muted/60 to-background relative overflow-hidden border-b bg-linear-to-b"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent)] bg-size-[40px_40px] opacity-60"
      />
      <UiContainer class="relative px-4 pt-8 md:px-8">
        <Motion
          class="flex flex-col gap-6"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ type: 'spring', stiffness: 160, damping: 22 }"
        >
          <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex items-start gap-4">
              <slot name="icon">
                <span
                  class="bg-background flex size-16 shrink-0 items-center justify-center rounded-2xl border shadow-sm"
                >
                  <Icon :name="props.icon" class="size-8" />
                </span>
              </slot>
              <div class="min-w-0 space-y-2">
                <div class="flex flex-wrap items-center gap-3">
                  <slot name="title">
                    <h1 class="text-2xl font-bold tracking-tight">{{ props.title }}</h1>
                  </slot>
                  <span
                    class="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400"
                  >
                    <span class="relative flex size-2">
                      <span
                        class="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75"
                      />
                      <span class="relative inline-flex size-2 rounded-full bg-green-500" />
                    </span>
                    Live
                  </span>
                </div>
                <slot name="description">
                  <ul
                    class="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
                  >
                    <li class="flex items-center gap-1.5">
                      <Icon name="lucide:tag" class="size-4" />
                      v{{ props.version }}
                    </li>
                    <li class="flex items-center gap-1.5">
                      <Icon name="lucide:git-branch" class="size-4" />
                      {{ props.branch }}
                    </li>
                    <li class="flex items-center gap-1.5">
                      <Icon name="lucide:clock" class="size-4" />
                      Deployed {{ props.deployed }}
                    </li>
                  </ul>
                </slot>
                <div class="flex flex-wrap gap-1.5">
                  <UiBadge v-for="item in props.tech" :key="item" variant="secondary">{{
                    item
                  }}</UiBadge>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <slot>
                <UiButton variant="outline" size="icon" aria-label="Bookmark">
                  <Icon name="lucide:bookmark" class="size-4" />
                </UiButton>
                <UiButton variant="outline">
                  <Icon name="lucide:external-link" class="size-4" />
                  Visit site
                </UiButton>
                <UiButton>
                  <Icon name="lucide:settings-2" class="size-4" />
                  Configure
                </UiButton>
              </slot>
            </div>
          </div>

          <slot name="tabs">
            <UiTabs v-model="tab">
              <UiScrollArea orientation="horizontal">
                <UiTabsList :pill="false" class="relative flex w-full justify-start gap-1">
                  <UiTabsTrigger v-for="item in props.tabs" :key="item" :pill="false" :value="item">
                    {{ item }}
                  </UiTabsTrigger>
                  <UiTabsIndicator />
                </UiTabsList>
              </UiScrollArea>
            </UiTabs>
          </slot>
        </Motion>
      </UiContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      icon?: string;
      version?: string;
      branch?: string;
      deployed?: string;
      tech?: string[];
      tabs?: string[];
    }>(),
    {
      title: "Storefront",
      icon: "lucide:store",
      version: "2.4.1",
      branch: "main",
      deployed: "3 days ago",
      tech: () => ["Nuxt", "PostgreSQL", "Vercel"],
      tabs: () => ["Overview", "Deployments", "Monitoring", "Settings", "Logs"],
    }
  );

  const tab = ref(props.tabs[0]);
</script>
