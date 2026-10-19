<template>
  <!--
    Rate limited page
    Features: 429 notice with a countdown ring, usage against the limit, try again button that unlocks when the timer ends, tips and upgrade link
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl text-center">
      <p class="text-primary text-sm font-semibold tracking-wide">429</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">Slow down for a moment</h1>
      <p class="text-muted-foreground mt-3 text-lg">
        You sent more requests than your plan allows. We paused new ones to keep things fast for
        everyone.
      </p>

      <div class="mt-8 flex justify-center">
        <div class="relative grid size-36 place-items-center">
          <UiCircularProgress
            :progress="remaining / Math.max(1, retryAfter)"
            :size="144"
            :radius="64"
            :stroke-width="8"
          />
          <p class="absolute text-center" role="timer" :aria-label="`${remaining} seconds left`">
            <span class="block text-4xl font-bold tabular-nums" aria-hidden="true">{{
              remaining
            }}</span>
            <span class="text-muted-foreground block text-xs" aria-hidden="true">seconds</span>
          </p>
        </div>
      </div>

      <dl class="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 text-sm">
        <div v-for="fact in facts" :key="fact.label" class="rounded-lg border p-3">
          <dt class="text-muted-foreground text-xs">{{ fact.label }}</dt>
          <dd class="mt-1 font-semibold">{{ fact.value }}</dd>
        </div>
      </dl>

      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <UiButton :disabled="remaining > 0" @click="retry">
          <Icon name="lucide:refresh-cw" class="size-4" />{{
            remaining > 0 ? `Try again in ${remaining}s` : "Try again"
          }}
        </UiButton>
        <UiButton variant="outline">Upgrade plan</UiButton>
      </div>
      <p v-if="retried" class="mt-3 text-sm" role="status">
        <Icon name="lucide:circle-check" class="text-primary mr-1 inline size-4" />
        Request sent. Everything is back to normal.
      </p>

      <ul class="text-muted-foreground mx-auto mt-10 max-w-md space-y-2 text-left text-sm">
        <li v-for="tip in tips" :key="tip" class="flex gap-2">
          <Icon name="lucide:lightbulb" class="mt-0.5 size-4 shrink-0" />{{ tip }}
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      retryAfter?: number;
      limit?: number;
      window?: string;
      plan?: string;
      tips?: string[];
    }>(),
    {
      retryAfter: 30,
      limit: 100,
      window: "per minute",
      plan: "Starter",
      tips: () => [
        "Cache responses you request often.",
        "Batch several updates into one request.",
        "Back off and retry after the timer ends.",
      ],
    }
  );

  const started = ref(Date.now());
  const clock = useNow({ interval: 1000 });
  const retried = ref(false);

  const remaining = computed(() =>
    Math.max(0, props.retryAfter - Math.floor((clock.value.getTime() - started.value) / 1000))
  );

  const facts = computed(() => [
    { label: "Limit", value: `${props.limit} ${props.window}` },
    { label: "Used", value: `${props.limit} of ${props.limit}` },
    { label: "Plan", value: props.plan },
  ]);

  function retry() {
    retried.value = true;
  }
</script>
