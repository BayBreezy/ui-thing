<template>
  <!--
    Progress to launch
    Features: Signup counter with progress bar towards a goal, milestones that unlock as the goal grows, join form that adds to the total, confirmation message
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">{{ title }}</h1>
        <p class="text-muted-foreground mt-4 text-lg">{{ description }}</p>

        <div class="mt-8">
          <div class="flex items-end justify-between gap-3">
            <p class="text-3xl font-bold tabular-nums">
              {{ count.toLocaleString("en-US") }}
              <span class="text-muted-foreground text-base font-normal"
                >of {{ goal.toLocaleString("en-US") }} signups</span
              >
            </p>
            <p class="text-sm font-medium tabular-nums">{{ percent }}%</p>
          </div>
          <UiProgress :model-value="percent" class="mt-3" aria-label="Progress to launch goal" />
          <p class="text-muted-foreground mt-2 text-sm" role="status">
            {{
              remaining > 0
                ? `${remaining.toLocaleString("en-US")} more to open the doors`
                : "Goal reached. We are launching!"
            }}
          </p>
        </div>

        <form v-if="!joined" class="mt-6" novalidate @submit.prevent="join">
          <div class="flex flex-col gap-2 sm:flex-row">
            <UiLabel for="goal-email" class="sr-only">Email address</UiLabel>
            <UiInput
              id="goal-email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="h-10 flex-1"
              :aria-invalid="!!error"
            />
            <UiButton type="submit" size="lg">Count me in</UiButton>
          </div>
          <p v-if="error" class="text-destructive mt-2 text-sm">{{ error }}</p>
        </form>
        <p v-else class="mt-6 flex items-center gap-2 text-sm font-medium" role="status">
          <Icon name="lucide:circle-check" class="text-primary size-5" />
          You are number {{ count.toLocaleString("en-US") }}. Thanks for helping us get there.
        </p>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Unlocked at each milestone</UiCardTitle>
          <UiCardDescription>Every signup moves the whole community closer.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <ol class="grid gap-3">
            <li
              v-for="item in milestones"
              :key="item.at"
              class="flex items-start gap-3 rounded-lg border p-3"
              :class="count >= item.at ? 'border-primary/50 bg-primary/5' : ''"
            >
              <Icon
                :name="count >= item.at ? 'lucide:circle-check' : 'lucide:circle-dashed'"
                class="mt-0.5 size-5 shrink-0"
                :class="count >= item.at ? 'text-primary' : 'text-muted-foreground'"
              />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium">{{ item.title }}</p>
                <p class="text-muted-foreground text-xs">
                  {{
                    count >= item.at ? "Unlocked" : `At ${item.at.toLocaleString("en-US")} signups`
                  }}
                </p>
              </div>
            </li>
          </ol>
        </UiCardContent>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Milestone = { at: number; title: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      signups?: number;
      goal?: number;
      milestones?: Milestone[];
    }>(),
    {
      title: "Help us reach launch",
      description:
        "We open the doors as soon as the waitlist hits its goal. Add your name to the count.",
      signups: 7420,
      goal: 10000,
      milestones: () => [
        { at: 2500, title: "Private beta opens to the first 500" },
        { at: 5000, title: "Mobile apps join the beta" },
        { at: 7500, title: "Integrations with Slack and Calendar" },
        { at: 10000, title: "Public launch with a free plan" },
      ],
    }
  );

  const email = ref("");
  const error = ref("");
  const joined = ref(false);
  const added = ref(0);

  const count = computed(() => props.signups + added.value);
  const percent = computed(() => Math.min(100, Math.round((count.value / props.goal) * 100)));
  const remaining = computed(() => Math.max(0, props.goal - count.value));

  function join() {
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    added.value = 1;
    joined.value = true;
  }
</script>
