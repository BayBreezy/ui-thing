<template>
  <!--
    Connect your tools grid
    Features: Integration cards with icons and descriptions, connect and disconnect buttons with a loading state, connected badge, category filter tabs and a continue button that counts what is connected
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold tracking-tight">Connect your tools</h1>
      <p class="text-muted-foreground mt-2">
        Bring in the apps you already use. You can add more later.
      </p>

      <UiTabs v-model="category" class="mt-8">
        <div class="overflow-x-auto">
          <UiTabsList>
            <UiTabsTrigger v-for="item in categories" :key="item" :value="item">{{
              item
            }}</UiTabsTrigger>
          </UiTabsList>
        </div>
      </UiTabs>

      <ul class="mt-6 grid gap-4 sm:grid-cols-2">
        <li
          v-for="tool in visible"
          :key="tool.name"
          class="flex items-start gap-4 rounded-xl border p-4"
        >
          <span class="bg-muted grid size-11 shrink-0 place-items-center rounded-lg">
            <Icon :name="tool.icon" class="size-6" />
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <p class="font-medium">{{ tool.name }}</p>
              <UiBadge
                v-if="connected.includes(tool.name)"
                variant="soft"
                color="green"
                shape="pill"
              >
                Connected
              </UiBadge>
            </div>
            <p class="text-muted-foreground mt-1 text-sm">{{ tool.description }}</p>
          </div>
          <UiButton
            size="sm"
            :variant="connected.includes(tool.name) ? 'outline' : 'default'"
            :disabled="pending === tool.name"
            @click="toggle(tool.name)"
          >
            <UiLoader v-if="pending === tool.name" />
            {{ connected.includes(tool.name) ? "Disconnect" : "Connect" }}
            <span class="sr-only">{{ tool.name }}</span>
          </UiButton>
        </li>
      </ul>

      <div class="mt-8 flex items-center justify-between">
        <p class="text-muted-foreground text-sm" aria-live="polite">
          {{ connected.length }} connected
        </p>
        <UiButton @click="useSonner.success('Integrations saved')">
          {{ connected.length ? "Continue" : "Skip for now" }}
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Tool = { name: string; description: string; icon: string; category: string };

  const props = withDefaults(
    defineProps<{
      tools?: Tool[];
    }>(),
    {
      tools: () => [
        {
          name: "Slack",
          description: "Get updates in your channels.",
          icon: "logos:slack-icon",
          category: "Communication",
        },
        {
          name: "Google Calendar",
          description: "Sync deadlines and meetings.",
          icon: "logos:google-calendar",
          category: "Productivity",
        },
        {
          name: "GitHub",
          description: "Link pull requests to tasks.",
          icon: "logos:github-icon",
          category: "Developer",
        },
        {
          name: "Notion",
          description: "Embed docs and databases.",
          icon: "logos:notion-icon",
          category: "Productivity",
        },
        {
          name: "Figma",
          description: "Preview designs in context.",
          icon: "logos:figma",
          category: "Developer",
        },
        {
          name: "Zoom",
          description: "Start calls from any project.",
          icon: "logos:zoom-icon",
          category: "Communication",
        },
      ],
    }
  );

  const category = ref("All");
  const categories = computed(() => ["All", ...new Set(props.tools.map((tool) => tool.category))]);
  const visible = computed(() =>
    category.value === "All"
      ? props.tools
      : props.tools.filter((tool) => tool.category === category.value)
  );

  const connected = ref<string[]>([]);
  const pending = ref("");

  async function toggle(name: string) {
    pending.value = name;
    await new Promise((resolve) => setTimeout(resolve, 500));
    connected.value = connected.value.includes(name)
      ? connected.value.filter((item) => item !== name)
      : [...connected.value, name];
    pending.value = "";
  }
</script>
