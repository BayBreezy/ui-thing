<template>
  <!--
    Feature request cards
    Features: A grid of request cards with the author, a status, vote and comment counts, an expand button for the full description, a request a feature dialog with validation and a category select, and a new request that appears at the top as under review
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-4xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Feature requests</h1>
          <p class="text-muted-foreground mt-1 text-sm" aria-live="polite">
            {{ requests.length }} requests
          </p>
        </div>
        <UiDialog v-model:open="open">
          <UiDialogTrigger as-child>
            <UiButton><Icon name="lucide:lightbulb" class="size-4" />Request a feature</UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-md">
            <UiDialogHeader>
              <UiDialogTitle>Request a feature</UiDialogTitle>
              <UiDialogDescription
                >Tell us what is missing and why you need it.</UiDialogDescription
              >
            </UiDialogHeader>
            <form class="grid gap-4" novalidate @submit.prevent="submit">
              <div class="grid gap-1.5">
                <UiLabel for="request-title">Title</UiLabel>
                <UiInput id="request-title" v-model="form.title" :aria-invalid="!!errors.title" />
                <p v-if="errors.title" class="text-destructive text-sm">{{ errors.title }}</p>
              </div>
              <div class="grid gap-1.5">
                <UiLabel for="request-category">Category</UiLabel>
                <UiSelect v-model="form.category">
                  <UiSelectTrigger id="request-category"><UiSelectValue /></UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem v-for="name in categories" :key="name" :value="name">{{
                      name
                    }}</UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
              <div class="grid gap-1.5">
                <UiLabel for="request-body">Details</UiLabel>
                <UiTextarea
                  id="request-body"
                  v-model="form.body"
                  :rows="4"
                  :aria-invalid="!!errors.body"
                />
                <p v-if="errors.body" class="text-destructive text-sm">{{ errors.body }}</p>
              </div>
              <UiDialogFooter>
                <UiButton type="button" variant="outline" @click="open = false">Cancel</UiButton>
                <UiButton type="submit">Send request</UiButton>
              </UiDialogFooter>
            </form>
          </UiDialogContent>
        </UiDialog>
      </div>

      <ul class="mt-8 grid items-start gap-4 md:grid-cols-2" aria-live="polite">
        <li v-for="request in requests" :key="request.id">
          <UiCard class="gap-3">
            <UiCardHeader>
              <div class="flex items-start justify-between gap-3">
                <UiCardTitle class="text-base leading-snug">{{ request.title }}</UiCardTitle>
                <UiBadge
                  variant="soft"
                  shape="pill"
                  :color="statusColor[request.status]"
                  class="shrink-0"
                  >{{ request.status }}</UiBadge
                >
              </div>
              <UiCardDescription>{{ request.category }}</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-3">
              <p class="text-sm" :class="expanded.has(request.id) ? '' : 'line-clamp-2'">
                {{ request.body }}
              </p>
              <UiButton
                variant="link"
                size="sm"
                class="h-auto p-0 text-xs"
                :aria-expanded="expanded.has(request.id)"
                @click="toggle(request.id)"
              >
                {{ expanded.has(request.id) ? "Show less" : "Read more" }}
              </UiButton>
            </UiCardContent>
            <UiCardFooter class="justify-between border-t">
              <span class="flex items-center gap-2 text-xs">
                <UiAvatar
                  :src="`https://i.pravatar.cc/80?img=${request.avatar}`"
                  :fallback="request.author.slice(0, 1)"
                  class="size-6"
                />
                {{ request.author }}
              </span>
              <span class="text-muted-foreground flex items-center gap-3 text-xs">
                <button
                  type="button"
                  class="hover:text-foreground flex items-center gap-1"
                  :aria-pressed="request.voted"
                  :aria-label="`${request.voted ? 'Remove vote from' : 'Vote for'} ${request.title}, ${request.votes} votes`"
                  @click="vote(request)"
                >
                  <Icon
                    name="lucide:arrow-big-up"
                    class="size-4"
                    :class="request.voted ? 'fill-current' : ''"
                  />{{ request.votes }}
                </button>
                <span class="flex items-center gap-1"
                  ><Icon name="lucide:message-circle" class="size-4" />{{ request.comments }}</span
                >
              </span>
            </UiCardFooter>
          </UiCard>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Under review" | "Planned" | "In progress";
  type Request = {
    id: string;
    title: string;
    category: string;
    body: string;
    author: string;
    avatar: number;
    votes: number;
    comments: number;
    status: Status;
    voted?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      requests?: Request[];
    }>(),
    {
      requests: () => [
        {
          id: "q1",
          title: "Dark mode for the mobile site",
          category: "Design",
          body: "I use the app at night and the white background is hard on the eyes. It would be great if it followed the system setting, with a manual switch in the profile menu too.",
          author: "Maya Patel",
          avatar: 32,
          votes: 412,
          comments: 31,
          status: "Planned",
        },
        {
          id: "q2",
          title: "Bulk edit for tables",
          category: "Productivity",
          body: "Select a few rows and change a field for all of them at once. Right now I do it one by one for hundreds of records.",
          author: "Leo Fischer",
          avatar: 12,
          votes: 286,
          comments: 18,
          status: "In progress",
        },
        {
          id: "q3",
          title: "Slack integration",
          category: "Integrations",
          body: "Post weekly summaries and alerts to a channel so the team does not need to open the dashboard.",
          author: "Sofia Alvarez",
          avatar: 45,
          votes: 241,
          comments: 9,
          status: "Under review",
        },
        {
          id: "q4",
          title: "Export to PDF",
          category: "Reports",
          body: "Reports should export to a clean PDF with our logo for the board.",
          author: "Noah Kim",
          avatar: 15,
          votes: 120,
          comments: 6,
          status: "Under review",
        },
      ],
    }
  );

  const categories = ["Design", "Productivity", "Integrations", "Reports", "Other"];
  const statusColor: Record<Status, string> = {
    "Under review": "gray",
    Planned: "violet",
    "In progress": "blue",
  };

  const requests = ref<Request[]>(
    props.requests.map((request) => ({ ...request, voted: request.voted ?? false }))
  );
  const expanded = ref(new Set<string>());
  const open = ref(false);
  const form = reactive({ title: "", category: "Other", body: "" });
  const errors = reactive({ title: "", body: "" });

  function toggle(id: string) {
    const next = new Set(expanded.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    expanded.value = next;
  }

  function vote(request: Request) {
    request.voted = !request.voted;
    request.votes += request.voted ? 1 : -1;
  }

  function submit() {
    errors.title =
      form.title.trim().length >= 4 ? "" : "Give the request a title of at least 4 characters.";
    errors.body = form.body.trim().length >= 10 ? "" : "Add a few words about why you need it.";
    if (errors.title || errors.body) return;
    requests.value.unshift({
      id: `new-${requests.value.length}`,
      title: form.title.trim(),
      category: form.category,
      body: form.body.trim(),
      author: "You",
      avatar: 32,
      votes: 1,
      comments: 0,
      status: "Under review",
      voted: true,
    });
    Object.assign(form, { title: "", category: "Other", body: "" });
    open.value = false;
    useSonner.success("Thanks, your request was sent");
  }
</script>
