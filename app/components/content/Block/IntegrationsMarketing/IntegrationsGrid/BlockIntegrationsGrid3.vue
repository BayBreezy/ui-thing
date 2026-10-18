<template>
  <!--
    Featured integrations
    Features: A large featured card for the integration you want to promote with a gradient background and a call to action, a row of popular integrations and a grid of the rest with a new badge and a short description
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <h1 class="text-3xl font-bold tracking-tight">Integrations</h1>
      <p class="text-muted-foreground mt-2">Bring your data and your team together.</p>

      <div
        class="from-primary/10 via-muted/40 to-background relative mt-8 overflow-hidden rounded-2xl border bg-linear-to-br p-6 sm:p-10"
      >
        <div class="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <span
            class="bg-background grid size-20 shrink-0 place-items-center rounded-2xl border shadow-xs"
            ><Icon
              :name="featured.icon"
              class="size-12 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1"
          /></span>
          <div class="min-w-0 flex-1">
            <UiBadge variant="soft" color="blue" shape="pill">Featured</UiBadge>
            <h2 class="mt-2 text-2xl font-bold">{{ featured.name }}</h2>
            <p class="text-muted-foreground mt-1 max-w-xl">{{ featured.description }}</p>
            <ul class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <li v-for="point in featured.points" :key="point" class="flex items-center gap-1.5">
                <Icon name="lucide:check" class="size-4 text-green-500" />{{ point }}
              </li>
            </ul>
          </div>
          <UiButton size="lg" @click="useSonner.success(`Connecting ${featured.name}`)"
            >Connect {{ featured.name }}</UiButton
          >
        </div>
      </div>

      <section class="mt-10" aria-label="Popular">
        <h2 class="text-lg font-semibold">Popular</h2>
        <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <li v-for="item in popular" :key="item.name">
            <button
              type="button"
              class="hover:bg-accent/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 rounded-xl border p-3 text-left outline-none focus-visible:ring-[3px]"
              @click="useSonner.info(`Open the ${item.name} page here`)"
            >
              <Icon
                :name="item.icon"
                class="size-7 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1"
              />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </button>
          </li>
        </ul>
      </section>

      <section class="mt-10" aria-label="More integrations">
        <h2 class="text-lg font-semibold">More integrations</h2>
        <ul class="mt-4 grid gap-4 sm:grid-cols-2">
          <li
            v-for="item in more"
            :key="item.name"
            class="flex items-start gap-3 rounded-xl border p-4"
          >
            <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-lg"
              ><Icon :name="item.icon" class="size-5 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1"
            /></span>
            <div class="min-w-0">
              <p class="flex items-center gap-2 text-sm font-medium">
                {{ item.name
                }}<UiBadge v-if="item.isNew" variant="soft" color="green" shape="pill">New</UiBadge>
              </p>
              <p class="text-muted-foreground mt-0.5 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { name: string; icon: string; description: string; isNew?: boolean };

  withDefaults(
    defineProps<{
      featured?: { name: string; icon: string; description: string; points: string[] };
      popular?: Item[];
      more?: Item[];
    }>(),
    {
      featured: () => ({
        name: "Slack",
        icon: "logos:slack-icon",
        description:
          "Get a message in the right channel when something important happens, and reply from Slack without opening Acme.",
        points: ["Real time alerts", "Slash commands", "Daily summaries"],
      }),
      popular: () => [
        { name: "GitHub", icon: "logos:github-icon", description: "" },
        { name: "Notion", icon: "logos:notion-icon", description: "" },
        { name: "Google Drive", icon: "logos:google-drive", description: "" },
        { name: "Zoom", icon: "logos:zoom-icon", description: "" },
      ],
      more: () => [
        {
          name: "Linear",
          icon: "logos:linear-icon",
          description: "Turn a task into an issue and keep both in sync.",
          isNew: true,
        },
        {
          name: "Intercom",
          icon: "logos:intercom-icon",
          description: "See customer chats next to their account.",
        },
        {
          name: "Asana",
          icon: "logos:asana-icon",
          description: "Import projects and keep due dates aligned.",
        },
        {
          name: "Mailchimp",
          icon: "logos:mailchimp-freddie",
          description: "Send campaigns to a saved segment.",
          isNew: true,
        },
      ],
    }
  );
</script>
