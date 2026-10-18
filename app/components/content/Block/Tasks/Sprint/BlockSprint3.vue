<template>
  <!--
    Sprint review summary
    Features: Completed versus planned points, velocity trend bars for the last sprints, a list of finished stories, carried over stories with a reason and a shareable summary button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
          <p class="text-muted-foreground mt-1 text-sm">{{ dates }}</p>
        </div>
        <UiButton variant="outline" size="sm" @click="copySummary"
          ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />{{
            copied ? "Copied" : "Copy summary"
          }}</UiButton
        >
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardDescription>Completed</UiCardDescription>
            <UiCardTitle class="text-3xl tabular-nums"
              >{{ completedPoints }}
              <span class="text-muted-foreground text-base font-normal"
                >of {{ planned }} pts</span
              ></UiCardTitle
            >
          </UiCardHeader>
          <UiCardContent>
            <UiProgress
              :model-value="(completedPoints / planned) * 100"
              class="h-2"
              aria-label="Completed versus planned"
            />
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader>
            <UiCardDescription>Velocity, last {{ velocity.length }} sprints</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <ul class="flex h-20 items-end gap-3" aria-label="Velocity by sprint">
              <li
                v-for="item in velocity"
                :key="item.name"
                class="flex flex-1 flex-col items-center gap-1"
              >
                <span class="text-muted-foreground text-xs tabular-nums">{{ item.points }}</span>
                <span
                  class="w-full rounded-t"
                  :class="item.current ? 'bg-primary' : 'bg-muted-foreground/30'"
                  :style="{ height: `${(item.points / maxVelocity) * 52}px` }"
                />
                <span class="text-muted-foreground text-[10px]">{{ item.name }}</span>
              </li>
            </ul>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <section aria-labelledby="sp3-done">
          <h2 id="sp3-done" class="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Icon name="lucide:circle-check" class="size-4 text-green-600" />Shipped ({{
              shipped.length
            }})
          </h2>
          <ul class="divide-y rounded-xl border text-sm">
            <li
              v-for="story in shipped"
              :key="story.title"
              class="flex items-center justify-between gap-3 px-3 py-2.5"
            >
              <span>{{ story.title }}</span
              ><UiBadge variant="secondary">{{ story.points }}</UiBadge>
            </li>
          </ul>
        </section>
        <section aria-labelledby="sp3-carry">
          <h2 id="sp3-carry" class="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Icon name="lucide:corner-down-right" class="size-4 text-amber-600" />Carried over ({{
              carried.length
            }})
          </h2>
          <ul class="divide-y rounded-xl border text-sm">
            <li v-for="story in carried" :key="story.title" class="px-3 py-2.5">
              <div class="flex items-center justify-between gap-3">
                <span>{{ story.title }}</span
                ><UiBadge variant="secondary">{{ story.points }}</UiBadge>
              </div>
              <p class="text-muted-foreground mt-0.5 text-xs">{{ story.reason }}</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Done = { title: string; points: number };
  type Carry = Done & { reason: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      dates?: string;
      shipped?: Done[];
      carried?: Carry[];
      velocity?: { name: string; points: number; current?: boolean }[];
    }>(),
    {
      title: "Sprint 24 review",
      dates: "Oct 5 to Oct 16, 2026",
      shipped: () => [
        { title: "Onboarding checklist", points: 8 },
        { title: "Fix double charge on upgrade", points: 3 },
        { title: "Export audit log", points: 5 },
        { title: "Dark mode polish", points: 3 },
        { title: "Keyboard shortcuts help", points: 2 },
      ],
      carried: () => [
        {
          title: "Single sign on with SAML",
          points: 8,
          reason: "Waiting on the identity provider sandbox.",
        },
        { title: "Bulk edit tasks", points: 5, reason: "Scope grew during implementation." },
      ],
      velocity: () => [
        { name: "S21", points: 18 },
        { name: "S22", points: 22 },
        { name: "S23", points: 19 },
        { name: "S24", points: 21, current: true },
      ],
    }
  );

  const completedPoints = computed(() =>
    props.shipped.reduce((sum, story) => sum + story.points, 0)
  );
  const planned = computed(
    () => completedPoints.value + props.carried.reduce((sum, story) => sum + story.points, 0)
  );
  const maxVelocity = computed(() => Math.max(...props.velocity.map((item) => item.points)));

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function copySummary() {
    copy(
      `${props.title}: ${completedPoints.value} of ${planned.value} points done. Shipped ${props.shipped.length} stories, carried over ${props.carried.length}.`
    );
  }
</script>
