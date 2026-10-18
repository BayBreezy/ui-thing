<template>
  <!--
    Policy changelog timeline
    Features: Vertical timeline of past policy revisions with version badges, dates, what changed as bullet lists and a highlighted latest version
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{{ props.title }}</h1>
      <p class="text-muted-foreground mt-4 text-lg">{{ props.description }}</p>
      <ol class="mt-12 space-y-10 border-l pl-8">
        <Motion
          v-for="(rev, i) in props.revisions"
          :key="rev.version"
          as="li"
          :initial="{ opacity: 0, x: -12 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.4, delay: i * 0.05 }"
          class="relative"
        >
          <span
            class="ring-background absolute top-1 -left-[2.4rem] size-3 rounded-full ring-4"
            :class="i === 0 ? 'bg-primary' : 'bg-muted-foreground/40'"
          />
          <div class="flex flex-wrap items-center gap-2">
            <UiBadge :variant="i === 0 ? 'default' : 'secondary'">v{{ rev.version }}</UiBadge>
            <UiBadge v-if="i === 0" variant="outline">Current</UiBadge>
            <time class="text-muted-foreground text-sm">{{ rev.date }}</time>
          </div>
          <h2 class="mt-2 text-lg font-semibold">{{ rev.title }}</h2>
          <ul class="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
            <li v-for="change in rev.changes" :key="change">{{ change }}</li>
          </ul>
          <a
            href="#"
            class="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            View this version
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </a>
        </Motion>
      </ol>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Revision = { version: string; date: string; title: string; changes: string[] };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; revisions?: Revision[] }>(),
    {
      title: "Policy updates",
      description: "A running history of what changed, so you never have to guess.",
      revisions: () => [
        {
          version: "3.2",
          date: "October 17, 2026",
          title: "Clearer data retention and new regional rights",
          changes: [
            "Added a table of retention periods for each type of data",
            "Added rights for residents of additional US states",
            "Simplified the wording in the sharing section",
          ],
        },
        {
          version: "3.1",
          date: "July 8, 2026",
          title: "New sub-processors",
          changes: [
            "Added two infrastructure sub-processors",
            "Updated our data transfer language",
          ],
        },
        {
          version: "3.0",
          date: "March 2, 2026",
          title: "Full rewrite in plain language",
          changes: [
            "Rewrote every section to be easier to read",
            "Added summaries next to each section",
            "Introduced a self-serve data request form",
          ],
        },
        {
          version: "2.4",
          date: "November 14, 2025",
          title: "Cookie preferences",
          changes: ["Added a cookie preference center", "Documented every cookie we set"],
        },
      ],
    }
  );
</script>
