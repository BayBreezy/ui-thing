<template>
  <!--
    Feature voting list
    Features: Ideas sorted by votes or newest, a vote button that toggles with a live count, status badges, search, a form to suggest a new idea that starts with your vote and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">Vote on what we build next</h1>
      <p class="text-muted-foreground mt-2">Upvote the ideas you want. We read every one.</p>

      <form class="mt-6 flex gap-2" novalidate @submit.prevent="suggest">
        <UiInput
          v-model="draft"
          placeholder="Suggest an idea"
          aria-label="Suggest an idea"
          :aria-invalid="!!error"
        />
        <UiButton type="submit">Suggest</UiButton>
      </form>
      <p v-if="error" class="text-destructive mt-1.5 text-sm">{{ error }}</p>

      <div class="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div class="relative">
          <Icon
            name="lucide:search"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            v-model="query"
            class="pl-9"
            placeholder="Search ideas"
            aria-label="Search ideas"
          />
        </div>
        <UiSelect v-model="sort">
          <UiSelectTrigger class="sm:w-40" aria-label="Sort ideas"
            ><UiSelectValue
          /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="votes">Most votes</UiSelectItem>
            <UiSelectItem value="new">Newest</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <ul v-if="visible.length" class="mt-4 divide-y rounded-xl border" aria-live="polite">
        <li v-for="idea in visible" :key="idea.id" class="flex items-start gap-4 px-4 py-4">
          <UiButton
            variant="outline"
            class="h-auto w-14 shrink-0 flex-col gap-0 py-2"
            :class="idea.voted ? 'border-primary bg-primary/5' : ''"
            :aria-pressed="idea.voted"
            :aria-label="`${idea.voted ? 'Remove your vote from' : 'Vote for'} ${idea.title}, ${idea.votes} votes`"
            @click="vote(idea)"
          >
            <Icon name="lucide:chevron-up" class="size-4" />
            <span class="text-sm font-semibold tabular-nums">{{ idea.votes }}</span>
          </UiButton>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <p class="font-medium">{{ idea.title }}</p>
              <UiBadge
                v-if="idea.status"
                variant="soft"
                shape="pill"
                :color="statusColor[idea.status]"
                >{{ idea.status }}</UiBadge
              >
            </div>
            <p class="text-muted-foreground mt-1 text-sm">{{ idea.body }}</p>
          </div>
        </li>
      </ul>
      <div
        v-else
        class="text-muted-foreground mt-4 rounded-xl border border-dashed py-12 text-center text-sm"
        aria-live="polite"
      >
        No ideas match. Be the first to suggest it.
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Planned" | "Under review" | "In progress";
  type Idea = {
    id: string;
    title: string;
    body: string;
    votes: number;
    voted?: boolean;
    status?: Status;
    order: number;
  };

  const props = withDefaults(
    defineProps<{
      ideas?: Idea[];
    }>(),
    {
      ideas: () => [
        {
          id: "v1",
          title: "Dark mode for the mobile site",
          body: "Match the system setting automatically.",
          votes: 412,
          status: "Planned",
          order: 1,
        },
        {
          id: "v2",
          title: "Bulk edit for tables",
          body: "Select rows and change a field for all of them.",
          votes: 286,
          status: "In progress",
          order: 2,
        },
        {
          id: "v3",
          title: "Slack integration",
          body: "Post weekly summaries and alerts to a channel.",
          votes: 241,
          status: "Under review",
          order: 3,
        },
        {
          id: "v4",
          title: "Custom domains for share links",
          body: "Use our own domain for public pages.",
          votes: 175,
          order: 4,
        },
        {
          id: "v5",
          title: "Keyboard navigation in the editor",
          body: "Move between blocks without the mouse.",
          votes: 98,
          order: 5,
        },
      ],
    }
  );

  const statusColor: Record<Status, string> = {
    Planned: "violet",
    "Under review": "gray",
    "In progress": "blue",
  };
  const ideas = ref<Idea[]>(props.ideas.map((idea) => ({ ...idea, voted: idea.voted ?? false })));
  const query = ref("");
  const sort = ref("votes");
  const draft = ref("");
  const error = ref("");

  const visible = computed(() => {
    const text = query.value.trim().toLowerCase();
    return ideas.value
      .filter((idea) => !text || `${idea.title} ${idea.body}`.toLowerCase().includes(text))
      .sort((a, b) => (sort.value === "votes" ? b.votes - a.votes : b.order - a.order));
  });

  function vote(idea: Idea) {
    idea.voted = !idea.voted;
    idea.votes += idea.voted ? 1 : -1;
  }

  function suggest() {
    const title = draft.value.trim();
    if (title.length < 4) {
      error.value = "Describe the idea in at least 4 characters.";
      return;
    }
    if (ideas.value.some((idea) => idea.title.toLowerCase() === title.toLowerCase())) {
      error.value = "Someone already suggested this. Vote for it instead.";
      return;
    }
    error.value = "";
    ideas.value.push({
      id: `new-${ideas.value.length}`,
      title,
      body: "Suggested by you.",
      votes: 1,
      voted: true,
      status: "Under review",
      order: ideas.value.length + 1,
    });
    draft.value = "";
  }
</script>
