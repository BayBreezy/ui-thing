<template>
  <!--
    Request an integration
    Features: A short grid of current integrations, a request form with the tool name, a link and a reason with validation, a list of requested tools with an upvote button and a thank you message after you send a request
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <h1 class="text-3xl font-bold tracking-tight">Do not see your tool?</h1>
      <p class="text-muted-foreground mt-2">
        Tell us what you need. We build the most requested integrations first.
      </p>

      <ul class="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6" aria-label="Current integrations">
        <li
          v-for="item in current"
          :key="item.name"
          class="bg-card flex flex-col items-center gap-2 rounded-xl border p-3 text-center"
        >
          <Icon
            :name="item.icon"
            class="size-7 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1"
          /><span class="text-xs font-medium">{{ item.name }}</span>
        </li>
      </ul>

      <div class="mt-10 grid items-start gap-8 lg:grid-cols-2">
        <UiCard class="gap-4">
          <UiCardHeader>
            <UiCardTitle class="text-base">Request an integration</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="sent" class="space-y-3 text-center" role="status">
              <span
                class="mx-auto grid size-12 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                ><Icon name="lucide:check" class="size-6"
              /></span>
              <p class="font-medium">Thanks, we got your request</p>
              <p class="text-muted-foreground text-sm">
                {{ sent }} was added to the list. We will email you when we start.
              </p>
              <UiButton variant="outline" size="sm" @click="sent = ''">Request another</UiButton>
            </div>
            <form v-else class="space-y-4" novalidate @submit.prevent="submit">
              <div class="space-y-1.5">
                <UiLabel for="req-name">Tool name</UiLabel>
                <UiInput
                  id="req-name"
                  v-model="form.name"
                  placeholder="For example Airtable"
                  :aria-invalid="!!errors.name"
                />
                <p v-if="errors.name" class="text-destructive text-sm">{{ errors.name }}</p>
              </div>
              <div class="space-y-1.5">
                <UiLabel for="req-link">Website (optional)</UiLabel>
                <UiInput
                  id="req-link"
                  v-model="form.link"
                  type="url"
                  placeholder="https://"
                  :aria-invalid="!!errors.link"
                />
                <p v-if="errors.link" class="text-destructive text-sm">{{ errors.link }}</p>
              </div>
              <div class="space-y-1.5">
                <UiLabel for="req-why">How would you use it?</UiLabel>
                <UiTextarea
                  id="req-why"
                  v-model="form.why"
                  :rows="3"
                  :aria-invalid="!!errors.why"
                />
                <p v-if="errors.why" class="text-destructive text-sm">{{ errors.why }}</p>
              </div>
              <UiButton type="submit" class="w-full">Send request</UiButton>
            </form>
          </UiCardContent>
        </UiCard>

        <section aria-label="Most requested">
          <h2 class="text-base font-semibold">Most requested</h2>
          <ul class="mt-3 divide-y rounded-xl border" aria-live="polite">
            <li
              v-for="request in sorted"
              :key="request.name"
              class="flex items-center gap-3 px-4 py-3"
            >
              <span class="min-w-0 flex-1 truncate text-sm font-medium">{{ request.name }}</span>
              <UiBadge
                v-if="request.status"
                variant="soft"
                shape="pill"
                :color="request.status === 'In progress' ? 'blue' : 'gray'"
                >{{ request.status }}</UiBadge
              >
              <UiButton
                variant="outline"
                size="sm"
                class="tabular-nums"
                :aria-pressed="request.voted"
                :aria-label="`${request.voted ? 'Remove your vote for' : 'Vote for'} ${request.name}, ${request.votes} votes`"
                @click="vote(request)"
                ><Icon name="lucide:chevron-up" class="size-4" />{{ request.votes }}</UiButton
              >
            </li>
          </ul>
        </section>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Request = { name: string; votes: number; voted?: boolean; status?: string };

  const props = withDefaults(
    defineProps<{
      current?: { name: string; icon: string }[];
      requests?: Request[];
    }>(),
    {
      current: () => [
        { name: "Slack", icon: "logos:slack-icon" },
        { name: "GitHub", icon: "logos:github-icon" },
        { name: "Notion", icon: "logos:notion-icon" },
        { name: "Stripe", icon: "logos:stripe" },
        { name: "Jira", icon: "logos:jira" },
        { name: "Zoom", icon: "logos:zoom-icon" },
      ],
      requests: () => [
        { name: "Airtable", votes: 184, status: "In progress" },
        { name: "Microsoft Teams", votes: 152 },
        { name: "Zendesk", votes: 97, status: "Planned" },
        { name: "Salesforce", votes: 64 },
      ],
    }
  );

  const requests = ref<Request[]>(
    props.requests.map((request) => ({ ...request, voted: request.voted ?? false }))
  );
  const form = reactive({ name: "", link: "", why: "" });
  const errors = reactive({ name: "", link: "", why: "" });
  const sent = ref("");

  const sorted = computed(() => [...requests.value].sort((a, b) => b.votes - a.votes));

  function vote(request: Request) {
    request.voted = !request.voted;
    request.votes += request.voted ? 1 : -1;
  }

  function submit() {
    errors.name = form.name.trim() ? "" : "Enter the name of the tool.";
    errors.link =
      !form.link.trim() || /^https?:\/\/\S+\.\S+/.test(form.link.trim())
        ? ""
        : "Enter a link that starts with http or https.";
    errors.why =
      form.why.trim().length >= 10 ? "" : "Tell us a little more, at least 10 characters.";
    if (errors.name || errors.link || errors.why) return;
    const name = form.name.trim();
    const existing = requests.value.find(
      (request) => request.name.toLowerCase() === name.toLowerCase()
    );
    if (existing) {
      if (!existing.voted) vote(existing);
    } else {
      requests.value.push({ name, votes: 1, voted: true });
    }
    sent.value = name;
    Object.assign(form, { name: "", link: "", why: "" });
  }
</script>
