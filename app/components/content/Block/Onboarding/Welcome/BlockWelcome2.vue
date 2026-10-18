<template>
  <!--
    Product tour with slides and progress dots
    Features: One slide at a time with icon, title and text, previous and next buttons, clickable progress dots, skip tour link, finish button on the last slide and live region announcements
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-lg">
      <UiCard class="gap-0 overflow-hidden pt-0">
        <div
          class="from-primary/15 to-primary/5 grid h-44 place-items-center bg-linear-to-br"
          aria-hidden="true"
        >
          <span class="bg-background grid size-20 place-items-center rounded-2xl shadow-sm">
            <Icon :name="slide.icon" class="text-primary size-10" />
          </span>
        </div>
        <UiCardContent class="py-6 text-center">
          <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Step {{ index + 1 }} of {{ slides.length }}
          </p>
          <div aria-live="polite">
            <h1 class="mt-2 text-2xl font-bold tracking-tight">{{ slide.title }}</h1>
            <p class="text-muted-foreground mt-2 text-balance">{{ slide.description }}</p>
          </div>

          <div class="mt-6 flex justify-center gap-2" role="tablist" aria-label="Tour progress">
            <button
              v-for="(item, i) in slides"
              :key="item.title"
              type="button"
              role="tab"
              :aria-selected="i === index"
              :aria-label="`Go to step ${i + 1}: ${item.title}`"
              class="focus-visible:ring-ring/50 h-2 rounded-full transition-all outline-none focus-visible:ring-[3px]"
              :class="
                i === index
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
              "
              @click="index = i"
            />
          </div>
        </UiCardContent>
        <UiCardFooter class="justify-between gap-2">
          <UiButton variant="ghost" @click="useSonner.info('Tour skipped')">Skip tour</UiButton>
          <div class="flex gap-2">
            <UiButton v-if="index > 0" variant="outline" @click="index--">Back</UiButton>
            <UiButton v-if="index < slides.length - 1" @click="index++">
              Next
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
            <UiButton v-else @click="useSonner.success('Tour complete')">Get started</UiButton>
          </div>
        </UiCardFooter>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Slide = { title: string; description: string; icon: string };

  const props = withDefaults(
    defineProps<{
      slides?: Slide[];
    }>(),
    {
      slides: () => [
        {
          title: "Everything in one place",
          description: "Projects, tasks and conversations live side by side so nothing gets lost.",
          icon: "lucide:layout-dashboard",
        },
        {
          title: "Work together in real time",
          description:
            "See who is online, leave comments and share updates without leaving the page.",
          icon: "lucide:users-round",
        },
        {
          title: "Automate the busywork",
          description: "Set up rules once and let your workspace handle repeat tasks for you.",
          icon: "lucide:wand-sparkles",
        },
        {
          title: "Track what matters",
          description: "Live dashboards show progress, blockers and trends at a glance.",
          icon: "lucide:chart-no-axes-combined",
        },
      ],
    }
  );

  const index = ref(0);
  const slide = computed(() => props.slides[index.value] ?? props.slides[0]!);
</script>
