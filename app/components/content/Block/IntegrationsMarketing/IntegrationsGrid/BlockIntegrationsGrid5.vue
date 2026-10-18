<template>
  <!--
    Logo cloud with copy
    Features: A headline and a short paragraph beside a cloud of logos in a soft grid, a list of reasons with icons, two buttons and logos that fade in with a stagger that is skipped when reduced motion is on
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
      <div>
        <UiBadge variant="soft" color="blue" shape="pill">Integrations</UiBadge>
        <h1 class="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
          One place for all of your tools
        </h1>
        <p class="text-muted-foreground mt-4 text-lg">
          Acme connects to the apps your team already uses, so you stop copying data from one tab to
          another.
        </p>
        <ul class="mt-6 space-y-3">
          <li v-for="reason in reasons" :key="reason.title" class="flex items-start gap-3">
            <span class="bg-muted grid size-9 shrink-0 place-items-center rounded-lg"
              ><Icon :name="reason.icon" class="size-4"
            /></span>
            <div>
              <p class="text-sm font-medium">{{ reason.title }}</p>
              <p class="text-muted-foreground text-sm">{{ reason.body }}</p>
            </div>
          </li>
        </ul>
        <div class="mt-8 flex flex-wrap gap-3">
          <UiButton @click="useSonner.info('Open the integrations directory here')"
            >Browse integrations</UiButton
          >
          <UiButton variant="outline" @click="useSonner.info('Open the API docs here')"
            >Build your own</UiButton
          >
        </div>
      </div>

      <ul class="grid grid-cols-4 gap-3" aria-label="Supported tools">
        <li
          v-for="(logo, index) in logos"
          :key="logo.name"
          class="bg-card motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 grid aspect-square place-items-center rounded-2xl border shadow-xs"
          :style="{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }"
          :class="index % 5 === 2 ? 'translate-y-3' : index % 5 === 4 ? '-translate-y-3' : ''"
        >
          <Icon :name="logo.icon" class="size-8 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1" />
          <span class="sr-only">{{ logo.name }}</span>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      reasons?: { icon: string; title: string; body: string }[];
      logos?: { name: string; icon: string }[];
    }>(),
    {
      reasons: () => [
        {
          icon: "lucide:zap",
          title: "Set up in minutes",
          body: "Connect with OAuth. There is nothing to install.",
        },
        {
          icon: "lucide:refresh-cw",
          title: "Two way sync",
          body: "Changes in either tool show up in the other.",
        },
        {
          icon: "lucide:shield-check",
          title: "You stay in control",
          body: "Choose exactly what each tool can read and write.",
        },
      ],
      logos: () => [
        { name: "Slack", icon: "logos:slack-icon" },
        { name: "GitHub", icon: "logos:github-icon" },
        { name: "Notion", icon: "logos:notion-icon" },
        { name: "Figma", icon: "logos:figma" },
        { name: "Stripe", icon: "logos:stripe" },
        { name: "Jira", icon: "logos:jira" },
        { name: "Zoom", icon: "logos:zoom-icon" },
        { name: "Google Drive", icon: "logos:google-drive" },
        { name: "HubSpot", icon: "logos:hubspot" },
        { name: "Trello", icon: "logos:trello" },
        { name: "Dropbox", icon: "logos:dropbox" },
        { name: "Linear", icon: "logos:linear-icon" },
      ],
    }
  );
</script>
