<template>
  <!--
    Now, next and later roadmap
    Features: Three columns that explain what is being built now, what is next and what is later, items with a follow toggle that shows a bell, an introduction for each column and a note that plans can change
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight">What we are working on</h1>
        <p class="text-muted-foreground mx-auto mt-2 max-w-xl">
          Follow an item to get an email when it moves to the next column.
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <section
          v-for="column in columns"
          :key="column.key"
          :aria-label="column.title"
          class="rounded-2xl border p-5"
        >
          <div class="flex items-center gap-2">
            <span class="grid size-8 place-items-center rounded-lg" :class="column.tint"
              ><Icon :name="column.icon" class="size-4"
            /></span>
            <h2 class="text-lg font-semibold">{{ column.title }}</h2>
          </div>
          <p class="text-muted-foreground mt-2 text-sm">{{ column.intro }}</p>
          <ul class="mt-4 space-y-3">
            <li
              v-for="item in column.items"
              :key="item.id"
              class="flex items-start gap-2 rounded-xl border p-3"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium">{{ item.title }}</p>
                <p class="text-muted-foreground mt-0.5 text-xs">{{ item.detail }}</p>
              </div>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="size-7 shrink-0"
                :aria-pressed="following.has(item.id)"
                :aria-label="`${following.has(item.id) ? 'Unfollow' : 'Follow'} ${item.title}`"
                @click="toggle(item)"
                ><Icon
                  :name="following.has(item.id) ? 'lucide:bell-ring' : 'lucide:bell'"
                  class="size-4"
                  :class="following.has(item.id) ? 'text-primary' : ''"
              /></UiButton>
            </li>
          </ul>
        </section>
      </div>
      <p class="text-muted-foreground mt-8 text-center text-sm" aria-live="polite">
        {{
          following.size
            ? `You follow ${following.size} ${following.size === 1 ? "item" : "items"}.`
            : "Plans can change as we learn from you."
        }}
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { id: string; title: string; detail: string; column: "now" | "next" | "later" };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        { id: "n1", title: "Saved views", detail: "Share filters with your team.", column: "now" },
        {
          id: "n2",
          title: "Webhook retries",
          detail: "Retry failed webhooks with backoff.",
          column: "now",
        },
        { id: "x1", title: "Custom roles", detail: "Fine grained permissions.", column: "next" },
        {
          id: "x2",
          title: "Mobile app",
          detail: "Native apps for iOS and Android.",
          column: "next",
        },
        {
          id: "x3",
          title: "Annual billing",
          detail: "Yearly plans with a discount.",
          column: "next",
        },
        { id: "l1", title: "GraphQL API", detail: "A typed API next to REST.", column: "later" },
        {
          id: "l2",
          title: "On premise option",
          detail: "Run Acme in your own cloud.",
          column: "later",
        },
      ],
    }
  );

  const following = ref(new Set<string>(["x2"]));

  const columns = computed(() => [
    {
      key: "now",
      title: "Now",
      icon: "lucide:hammer",
      tint: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
      intro: "In active development. Most of these ship this quarter.",
      items: props.items.filter((item) => item.column === "now"),
    },
    {
      key: "next",
      title: "Next",
      icon: "lucide:calendar-clock",
      tint: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
      intro: "Designed and waiting for the team to be free.",
      items: props.items.filter((item) => item.column === "next"),
    },
    {
      key: "later",
      title: "Later",
      icon: "lucide:telescope",
      tint: "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
      intro: "Ideas we are exploring. No dates yet.",
      items: props.items.filter((item) => item.column === "later"),
    },
  ]);

  function toggle(item: Item) {
    const next = new Set(following.value);
    if (next.has(item.id)) next.delete(item.id);
    else next.add(item.id);
    following.value = next;
    if (next.has(item.id)) useSonner.success(`You will get an email about ${item.title}`);
  }
</script>
