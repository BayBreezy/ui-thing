<template>
  <!--
    Related integrations
    Features: A works well with section for the integration you are viewing, cards with a logo, a short description and an add button that changes to added, a category filter, a count of what you added and a show more button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Works well with {{ name }}</h1>
          <p class="text-muted-foreground mt-1 text-sm" aria-live="polite">
            {{ added.size }} added
          </p>
        </div>
        <UiToggleGroup
          :model-value="category"
          type="single"
          variant="outline"
          size="sm"
          aria-label="Category"
          @update:model-value="(value) => (category = (value as string) || 'all')"
        >
          <UiToggleGroupItem
            v-for="item in categories"
            :key="item"
            :value="item"
            class="capitalize"
            >{{ item }}</UiToggleGroupItem
          >
        </UiToggleGroup>
      </div>

      <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <li v-for="item in shown" :key="item.name">
          <UiCard class="h-full gap-3">
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <span class="bg-muted grid size-11 place-items-center rounded-lg"
                  ><Icon
                    :name="item.icon"
                    class="size-6 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1"
                /></span>
                <div class="min-w-0 flex-1">
                  <UiCardTitle class="text-base">{{ item.name }}</UiCardTitle>
                  <UiBadge variant="soft" shape="pill" class="capitalize">{{
                    item.category
                  }}</UiBadge>
                </div>
              </div>
            </UiCardHeader>
            <UiCardContent class="text-muted-foreground flex-1 text-sm">{{
              item.description
            }}</UiCardContent>
            <UiCardFooter>
              <UiButton
                class="w-full"
                size="sm"
                :variant="added.has(item.name) ? 'secondary' : 'outline'"
                :aria-pressed="added.has(item.name)"
                @click="toggle(item.name)"
              >
                <Icon
                  :name="added.has(item.name) ? 'lucide:check' : 'lucide:plus'"
                  class="size-4"
                />{{ added.has(item.name) ? "Added" : "Add" }}
              </UiButton>
            </UiCardFooter>
          </UiCard>
        </li>
      </ul>
      <p
        v-if="!shown.length"
        class="text-muted-foreground mt-6 rounded-xl border border-dashed py-12 text-center text-sm"
      >
        No related integrations here yet.
      </p>

      <div v-if="hidden > 0" class="mt-6 text-center">
        <UiButton variant="outline" @click="count += 3"
          >Show {{ Math.min(hidden, 3) }} more</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { name: string; icon: string; category: string; description: string };

  const props = withDefaults(
    defineProps<{
      name?: string;
      related?: Item[];
    }>(),
    {
      name: "Slack",
      related: () => [
        {
          name: "Zoom",
          icon: "logos:zoom-icon",
          category: "communication",
          description: "Start a meeting from any thread.",
        },
        {
          name: "Google Calendar",
          icon: "logos:google-calendar",
          category: "productivity",
          description: "Show deadlines on your calendar.",
        },
        {
          name: "GitHub",
          icon: "logos:github-icon",
          category: "development",
          description: "See pull requests inside tasks.",
        },
        {
          name: "Notion",
          icon: "logos:notion-icon",
          category: "productivity",
          description: "Embed live views in your docs.",
        },
        {
          name: "Linear",
          icon: "logos:linear-icon",
          category: "development",
          description: "Keep issues and tasks in sync.",
        },
        {
          name: "Intercom",
          icon: "logos:intercom-icon",
          category: "communication",
          description: "Turn a chat into a task.",
        },
        {
          name: "Trello",
          icon: "logos:trello",
          category: "productivity",
          description: "Import boards and keep them current.",
        },
      ],
    }
  );

  const category = ref("all");
  const count = ref(3);
  const added = ref(new Set<string>());

  const categories = computed(() => [
    "all",
    ...new Set(props.related.map((item) => item.category)),
  ]);
  const filtered = computed(() =>
    props.related.filter((item) => category.value === "all" || item.category === category.value)
  );
  const shown = computed(() => filtered.value.slice(0, count.value));
  const hidden = computed(() => filtered.value.length - shown.value.length);

  watch(category, () => (count.value = 3));

  function toggle(name: string) {
    const next = new Set(added.value);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    added.value = next;
  }
</script>
