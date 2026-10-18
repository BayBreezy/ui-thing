<template>
  <!--
    Changelog with a subscribe card
    Features: A list of recent releases next to a sticky card where people can subscribe by email, with a frequency select, email validation, a thank you state with an undo, an RSS link with a copy button and a note about privacy
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_20rem]">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Changelog</h1>
        <p class="text-muted-foreground mt-2">Everything we have shipped, newest first.</p>
        <ul class="mt-8 space-y-8">
          <li
            v-for="release in releases"
            :key="release.version"
            class="border-b pb-8 last:border-0"
          >
            <div class="flex items-baseline gap-3">
              <h2 class="text-xl font-semibold">v{{ release.version }}</h2>
              <time class="text-muted-foreground text-sm" :datetime="release.date">{{
                format(release.date)
              }}</time>
            </div>
            <p class="mt-2">{{ release.summary }}</p>
            <ul class="text-muted-foreground mt-3 list-disc space-y-1 pl-5 text-sm">
              <li v-for="line in release.items" :key="line">{{ line }}</li>
            </ul>
          </li>
        </ul>
      </div>

      <aside class="lg:sticky lg:top-6 lg:self-start">
        <UiCard class="gap-4">
          <UiCardHeader>
            <UiCardTitle class="text-base">Get updates by email</UiCardTitle>
            <UiCardDescription>New releases, straight to your inbox.</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="!done" class="space-y-4">
              <form class="space-y-3" novalidate @submit.prevent="subscribe">
                <div class="space-y-1.5">
                  <UiLabel for="changelog-email">Email</UiLabel>
                  <UiInput
                    id="changelog-email"
                    v-model="email"
                    type="email"
                    placeholder="you@example.com"
                    autocomplete="email"
                    :aria-invalid="!!error"
                  />
                  <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
                </div>
                <div class="space-y-1.5">
                  <UiLabel for="changelog-frequency">How often</UiLabel>
                  <UiSelect v-model="frequency">
                    <UiSelectTrigger id="changelog-frequency"><UiSelectValue /></UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem value="each">Every release</UiSelectItem>
                      <UiSelectItem value="monthly">Monthly digest</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
                <UiButton type="submit" class="w-full">Subscribe</UiButton>
              </form>
              <p class="text-muted-foreground text-xs">No spam. Unsubscribe with one click.</p>
            </div>
            <div v-else class="space-y-3 text-center" role="status">
              <span
                class="mx-auto grid size-10 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                ><Icon name="lucide:check" class="size-5"
              /></span>
              <p class="text-sm font-medium">You are subscribed</p>
              <p class="text-muted-foreground text-sm">
                We will send {{ frequency === "each" ? "every release" : "a monthly digest" }} to
                {{ email }}.
              </p>
              <UiButton variant="link" size="sm" @click="done = false">Undo</UiButton>
            </div>
          </UiCardContent>
          <UiCardFooter class="border-t">
            <UiButton variant="ghost" size="sm" class="-ml-2" @click="copy(rss)"
              ><Icon :name="copied ? 'lucide:check' : 'lucide:rss'" class="size-4" />{{
                copied ? "Feed link copied" : "Copy RSS link"
              }}</UiButton
            >
          </UiCardFooter>
        </UiCard>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Release = { version: string; date: string; summary: string; items: string[] };

  withDefaults(
    defineProps<{
      releases?: Release[];
      rss?: string;
    }>(),
    {
      rss: "https://example.com/changelog.xml",
      releases: () => [
        {
          version: "2.4.0",
          date: "2026-10-14",
          summary: "Faster reports and saved views.",
          items: [
            "Save filters on the dashboard",
            "Reports load up to 3 times faster",
            "Command menu shortcuts",
          ],
        },
        {
          version: "2.3.0",
          date: "2026-09-18",
          summary: "Team workspaces.",
          items: [
            "Invite teammates with roles",
            "Audit log for admins",
            "Sharing links keep their settings",
          ],
        },
        {
          version: "2.2.0",
          date: "2026-08-21",
          summary: "Import and export.",
          items: ["Import from CSV with column matching", "Export any table as CSV or JSON"],
        },
      ],
    }
  );

  const email = ref("");
  const frequency = ref("each");
  const error = ref("");
  const done = ref(false);
  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function subscribe() {
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    done.value = true;
  }

  const format = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
</script>
