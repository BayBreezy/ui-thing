<template>
  <!--
    Integrations grid with connect toggles
    Features: Filter by category, search, app cards with connected badge, switch to connect and disconnect, empty state
  -->
  <div class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold" v-html="props.title" />
        <p class="text-muted-foreground text-sm" v-html="props.description" />
      </div>
      <div class="relative w-full sm:w-64">
        <Icon
          name="lucide:search"
          class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput v-model="query" placeholder="Search apps" class="pl-9" />
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <UiButton
        v-for="category in categories"
        :key="category"
        size="sm"
        :variant="active === category ? 'default' : 'outline'"
        @click="active = category"
      >
        {{ category }}
      </UiButton>
    </div>

    <div v-if="filtered.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <UiCard v-for="app in filtered" :key="app.id" class="gap-4">
        <UiCardHeader>
          <div class="flex items-start justify-between gap-3">
            <div class="bg-muted flex size-10 items-center justify-center rounded-lg border">
              <Icon :name="app.icon" class="size-6" />
            </div>
            <UiSwitch
              :model-value="app.connected"
              :aria-label="`Connect ${app.name}`"
              @update:model-value="toggle(app, $event === true)"
            />
          </div>
          <UiCardTitle class="mt-2 flex items-center gap-2">
            {{ app.name }}
            <UiBadge v-if="app.connected" variant="success">Connected</UiBadge>
          </UiCardTitle>
          <UiCardDescription>{{ app.description }}</UiCardDescription>
        </UiCardHeader>
      </UiCard>
    </div>
    <div
      v-else
      class="text-muted-foreground flex h-40 items-center justify-center rounded-lg border border-dashed text-sm"
    >
      No apps match your search.
    </div>
  </div>
</template>

<script lang="ts" setup>
  type App = {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    connected: boolean;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Integrations",
      description: "Connect the tools your team already uses.",
    }
  );

  const apps = reactive<App[]>([
    {
      id: "slack",
      name: "Slack",
      description: "Get notifications and run commands in your channels.",
      icon: "logos:slack-icon",
      category: "Communication",
      connected: true,
    },
    {
      id: "github",
      name: "GitHub",
      description: "Link commits and pull requests to your projects.",
      icon: "mdi:github",
      category: "Developer",
      connected: true,
    },
    {
      id: "figma",
      name: "Figma",
      description: "Embed live designs and keep specs in sync.",
      icon: "logos:figma",
      category: "Design",
      connected: false,
    },
    {
      id: "notion",
      name: "Notion",
      description: "Sync docs and databases with your workspace.",
      icon: "logos:notion-icon",
      category: "Productivity",
      connected: false,
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Show customers and revenue next to your data.",
      icon: "logos:stripe",
      category: "Developer",
      connected: false,
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Start meetings straight from a task or comment.",
      icon: "logos:zoom-icon",
      category: "Communication",
      connected: false,
    },
  ]);

  const query = ref("");
  const active = ref("All");
  const categories = computed(() => ["All", ...new Set(apps.map((app) => app.category))]);

  const filtered = computed(() =>
    apps.filter(
      (app) =>
        (active.value === "All" || app.category === active.value) &&
        `${app.name} ${app.description}`.toLowerCase().includes(query.value.toLowerCase())
    )
  );

  function toggle(app: App, value: boolean) {
    app.connected = value;
    useSonner[value ? "success" : "info"](
      value ? `${app.name} connected` : `${app.name} disconnected`
    );
  }
</script>
