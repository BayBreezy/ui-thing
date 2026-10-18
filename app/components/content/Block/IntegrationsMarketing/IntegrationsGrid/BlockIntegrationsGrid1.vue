<template>
  <!--
    Integration logo grid
    Features: A clean grid of logo tiles with the name below each one, a hover lift that respects reduced motion, tiles that are real links with focus rings and a link to all integrations
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl text-center">
      <h1 class="text-3xl font-bold tracking-tight lg:text-4xl">
        Works with the tools you already use
      </h1>
      <p class="text-muted-foreground mx-auto mt-3 max-w-xl">
        Connect Acme to your stack in a few clicks. No code needed.
      </p>

      <ul class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <li v-for="item in items" :key="item.name">
          <a
            :href="`#${item.name.toLowerCase().replace(/ /g, '-')}`"
            class="bg-card hover:border-primary/40 focus-visible:ring-ring/50 flex flex-col items-center gap-3 rounded-xl border p-5 transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            @click.prevent="useSonner.info(`Open the ${item.name} page here`)"
          >
            <Icon :name="item.icon" class="size-9 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1" />
            <span class="text-sm font-medium">{{ item.name }}</span>
          </a>
        </li>
      </ul>

      <UiButton
        variant="outline"
        class="mt-10"
        @click="useSonner.info('Open all integrations here')"
        >See all {{ total }} integrations<Icon name="lucide:arrow-right" class="size-4"
      /></UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      total?: number;
      items?: { name: string; icon: string }[];
    }>(),
    {
      total: 120,
      items: () => [
        { name: "Slack", icon: "logos:slack-icon" },
        { name: "GitHub", icon: "logos:github-icon" },
        { name: "Google Drive", icon: "logos:google-drive" },
        { name: "Notion", icon: "logos:notion-icon" },
        { name: "Figma", icon: "logos:figma" },
        { name: "Stripe", icon: "logos:stripe" },
        { name: "Zoom", icon: "logos:zoom-icon" },
        { name: "Jira", icon: "logos:jira" },
        { name: "HubSpot", icon: "logos:hubspot" },
        { name: "Trello", icon: "logos:trello" },
        { name: "Dropbox", icon: "logos:dropbox" },
        { name: "Google Calendar", icon: "logos:google-calendar" },
      ],
    }
  );
</script>
