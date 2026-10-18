<template>
  <!--
    Hiring process and perks
    Features: Interactive step list with detail panel and timing, progress indicator, perks grid, closing CTA
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-bold lg:text-4xl">How hiring works</h2>
        <p class="text-muted-foreground mt-3 text-lg">
          Four steps, about three weeks from first chat to offer. You always know where you stand.
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-[18rem_1fr]">
        <ol class="grid gap-2" aria-label="Hiring steps">
          <li v-for="(step, index) in steps" :key="step.title">
            <button
              type="button"
              class="hover:bg-muted/60 focus-visible:ring-ring/50 flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors outline-none focus-visible:ring-[3px]"
              :class="index === current ? 'border-primary bg-muted/60' : ''"
              :aria-current="index === current ? 'step' : undefined"
              @click="current = index"
            >
              <span
                class="grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold"
                :class="
                  index <= current
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                "
                >{{ index + 1 }}</span
              >
              <span class="min-w-0">
                <span class="block font-medium">{{ step.title }}</span>
                <span class="text-muted-foreground block text-xs">{{ step.duration }}</span>
              </span>
            </button>
          </li>
        </ol>

        <UiCard class="gap-4" aria-live="polite">
          <UiCardHeader>
            <p class="text-muted-foreground text-sm">
              Step {{ current + 1 }} of {{ steps.length }}
            </p>
            <UiCardTitle class="text-2xl">{{ steps[current]!.title }}</UiCardTitle>
            <UiCardDescription>{{ steps[current]!.summary }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-5">
            <UiProgress :model-value="((current + 1) / steps.length) * 100" aria-label="Progress" />
            <ul class="space-y-2">
              <li
                v-for="point in steps[current]!.points"
                :key="point"
                class="text-muted-foreground flex gap-3 text-sm"
              >
                <Icon name="lucide:circle-check" class="text-primary mt-0.5 size-4 shrink-0" />
                <span>{{ point }}</span>
              </li>
            </ul>
            <div class="flex flex-wrap gap-2">
              <UiButton
                variant="outline"
                size="sm"
                :disabled="current === 0"
                @click="current = Math.max(0, current - 1)"
              >
                <Icon name="lucide:arrow-left" class="size-4" />Previous step
              </UiButton>
              <UiButton
                size="sm"
                :disabled="current === steps.length - 1"
                @click="current = Math.min(steps.length - 1, current + 1)"
              >
                Next step<Icon name="lucide:arrow-right" class="size-4" />
              </UiButton>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="mt-16">
        <h3 class="text-xl font-semibold">What you get</h3>
        <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="perk in perks" :key="perk.title" class="rounded-xl border p-5">
            <span class="bg-primary/10 text-primary grid size-10 place-items-center rounded-lg"
              ><Icon :name="perk.icon" class="size-5"
            /></span>
            <p class="mt-4 font-medium">{{ perk.title }}</p>
            <p class="text-muted-foreground mt-1 text-sm">{{ perk.description }}</p>
          </li>
        </ul>
      </div>

      <div
        class="bg-muted/50 mt-12 flex flex-col items-start justify-between gap-4 rounded-xl p-6 sm:flex-row sm:items-center"
      >
        <div>
          <p class="text-lg font-semibold">Ready to start?</p>
          <p class="text-muted-foreground text-sm">Browse every open role and apply in minutes.</p>
        </div>
        <UiButton size="lg"
          >See open roles<Icon name="lucide:arrow-right" class="size-4"
        /></UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Step = { title: string; duration: string; summary: string; points: string[] };
  type Perk = { icon: string; title: string; description: string };

  withDefaults(
    defineProps<{
      steps?: Step[];
      perks?: Perk[];
    }>(),
    {
      steps: () => [
        {
          title: "Application review",
          duration: "Within 5 working days",
          summary: "A hiring manager reads every application. No keyword filters.",
          points: [
            "We read your resume, links and cover note",
            "You hear back either way, with a short reason",
            "Portfolios and open source work count as much as titles",
          ],
        },
        {
          title: "Intro conversation",
          duration: "30 minutes",
          summary: "A relaxed video call to talk about you, the role and how we work.",
          points: [
            "Meet the hiring manager",
            "Ask anything about pay, team and process",
            "No trick questions or whiteboard puzzles",
          ],
        },
        {
          title: "Practical exercise",
          duration: "2 to 3 hours, paid",
          summary: "A small piece of real work, paid at our contractor rate.",
          points: [
            "Choose from two briefs close to the real job",
            "Take a week to finish it on your schedule",
            "Walk the team through your thinking in a review call",
          ],
        },
        {
          title: "Team chat and offer",
          duration: "Up to one week",
          summary: "Meet future teammates, then receive a written offer.",
          points: [
            "Two short conversations with people you would work with",
            "Offer includes salary band, equity and start date",
            "Reference checks only after you say yes",
          ],
        },
      ],
      perks: () => [
        {
          icon: "lucide:globe",
          title: "Remote first",
          description: "Work from where you live. We meet in person twice a year.",
        },
        {
          icon: "lucide:heart-pulse",
          title: "Health cover",
          description: "Private health, dental and mental health support.",
        },
        {
          icon: "lucide:graduation-cap",
          title: "Learning budget",
          description: "$1,500 each year for courses, books and conferences.",
        },
        {
          icon: "lucide:baby",
          title: "Family leave",
          description: "20 weeks fully paid for every new parent.",
        },
      ],
    }
  );

  const current = ref(0);
</script>
