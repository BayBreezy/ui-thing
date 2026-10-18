<template>
  <!--
    Searchable integrations with categories
    Features: Search, category chips with counts, cards with a logo, a short description and a category tag, a live result count and an empty state with a clear button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <h1 class="text-3xl font-bold tracking-tight">Integrations</h1>
      <p class="text-muted-foreground mt-2">Find the tools that work with Acme.</p>

      <div class="relative mt-6">
        <Icon
          name="lucide:search"
          class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          v-model="query"
          class="pl-9"
          placeholder="Search integrations"
          aria-label="Search integrations"
        />
      </div>
      <div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Category">
        <UiButton
          v-for="item in categories"
          :key="item"
          size="sm"
          class="rounded-full capitalize"
          :variant="category === item ? 'default' : 'outline'"
          :aria-pressed="category === item"
          @click="category = item"
          >{{ item }}<span class="text-xs opacity-70">{{ count(item) }}</span></UiButton
        >
      </div>
      <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
        {{ visible.length }} {{ visible.length === 1 ? "integration" : "integrations" }}
      </p>

      <ul v-if="visible.length" class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="item in visible" :key="item.name" class="bg-card rounded-xl border p-5">
          <div class="flex items-center gap-3">
            <span class="bg-muted grid size-11 place-items-center rounded-lg"
              ><Icon :name="item.icon" class="size-6 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1"
            /></span>
            <div class="min-w-0">
              <p class="font-medium">{{ item.name }}</p>
              <UiBadge variant="soft" shape="pill" class="capitalize">{{ item.category }}</UiBadge>
            </div>
          </div>
          <p class="text-muted-foreground mt-3 text-sm">{{ item.description }}</p>
        </li>
      </ul>
      <div v-else class="mt-4 rounded-xl border border-dashed py-14 text-center" aria-live="polite">
        <Icon name="lucide:search-x" class="text-muted-foreground mx-auto size-6" />
        <p class="mt-2 text-sm font-medium">No integrations found</p>
        <UiButton variant="link" size="sm" @click="clear">Clear search</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { name: string; icon: string; category: string; description: string };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        {
          name: "Slack",
          icon: "logos:slack-icon",
          category: "communication",
          description: "Get alerts and summaries in your channels.",
        },
        {
          name: "Zoom",
          icon: "logos:zoom-icon",
          category: "communication",
          description: "Add a meeting link to every event.",
        },
        {
          name: "GitHub",
          icon: "logos:github-icon",
          category: "development",
          description: "Link pull requests to your tasks.",
        },
        {
          name: "GitLab",
          icon: "logos:gitlab-icon",
          category: "development",
          description: "Sync issues and merge requests.",
        },
        {
          name: "Notion",
          icon: "logos:notion-icon",
          category: "docs",
          description: "Embed live views in your pages.",
        },
        {
          name: "Google Drive",
          icon: "logos:google-drive",
          category: "docs",
          description: "Attach files without leaving Acme.",
        },
        {
          name: "Stripe",
          icon: "logos:stripe",
          category: "payments",
          description: "See payments next to your customers.",
        },
        {
          name: "Shopify",
          icon: "logos:shopify",
          category: "payments",
          description: "Track orders and refunds in one place.",
        },
        {
          name: "HubSpot",
          icon: "logos:hubspot",
          category: "crm",
          description: "Sync contacts and deals both ways.",
        },
        {
          name: "Salesforce",
          icon: "logos:salesforce",
          category: "crm",
          description: "Keep accounts and opportunities up to date.",
        },
        {
          name: "Jira",
          icon: "logos:jira",
          category: "development",
          description: "Create and update issues from a card.",
        },
        {
          name: "Figma",
          icon: "logos:figma",
          category: "docs",
          description: "Preview designs inside a task.",
        },
      ],
    }
  );

  const query = ref("");
  const category = ref("all");

  const categories = computed(() => ["all", ...new Set(props.items.map((item) => item.category))]);
  const count = (value: string) =>
    value === "all"
      ? props.items.length
      : props.items.filter((item) => item.category === value).length;
  const visible = computed(() => {
    const text = query.value.trim().toLowerCase();
    return props.items
      .filter((item) => category.value === "all" || item.category === category.value)
      .filter((item) => !text || `${item.name} ${item.description}`.toLowerCase().includes(text));
  });

  function clear() {
    query.value = "";
    category.value = "all";
  }
</script>
