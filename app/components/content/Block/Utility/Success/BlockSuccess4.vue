<template>
  <!--
    Action completed with undo
    Features: Completion message, undo window with a shrinking timer, restored and expired states, summary of what changed, links back to the list
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-md text-center">
      <UiCardContent class="space-y-4 py-4">
        <span
          class="mx-auto grid size-14 place-items-center rounded-full"
          :class="
            state === 'restored'
              ? 'bg-primary/10 text-primary'
              : 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300'
          "
        >
          <Icon :name="state === 'restored' ? 'lucide:undo-2' : 'lucide:archive'" class="size-7" />
        </span>

        <div role="status" aria-live="polite">
          <h1 class="text-2xl font-bold tracking-tight">
            {{ state === "restored" ? `${name} restored` : `${name} archived` }}
          </h1>
          <p class="text-muted-foreground mt-2 text-sm">
            {{
              state === "restored"
                ? "Everything is back where it was."
                : state === "expired"
                  ? "The undo window has closed. You can still restore it from the archive."
                  : `It is hidden from your list. ${impact}`
            }}
          </p>
        </div>

        <div v-if="state === 'done'" class="space-y-2">
          <UiButton variant="outline" class="w-full" @click="state = 'restored'">
            <Icon name="lucide:undo-2" class="size-4" />Undo ({{ remaining }}s)
          </UiButton>
          <UiProgress
            :model-value="(remaining / undoSeconds) * 100"
            class="h-1"
            aria-label="Time left to undo"
          />
        </div>

        <dl class="bg-muted/50 grid gap-1 rounded-lg p-3 text-left text-sm">
          <div v-for="fact in facts" :key="fact.label" class="flex justify-between gap-3">
            <dt class="text-muted-foreground">{{ fact.label }}</dt>
            <dd class="font-medium">{{ fact.value }}</dd>
          </div>
        </dl>

        <div class="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <UiButton variant="outline">View archive</UiButton>
          <UiButton>Back to projects</UiButton>
        </div>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Fact = { label: string; value: string };

  const props = withDefaults(
    defineProps<{
      name?: string;
      impact?: string;
      undoSeconds?: number;
      facts?: Fact[];
    }>(),
    {
      name: "Website redesign",
      impact: "Members lose access until it is restored.",
      undoSeconds: 10,
      facts: () => [
        { label: "Tasks kept", value: "48" },
        { label: "Members notified", value: "6" },
        { label: "Deleted permanently", value: "In 30 days" },
      ],
    }
  );

  const state = ref<"done" | "restored" | "expired">("done");
  const started = Date.now();
  const clock = useNow({ interval: 1000 });
  const remaining = computed(() =>
    Math.max(0, props.undoSeconds - Math.floor((clock.value.getTime() - started) / 1000))
  );

  watch(remaining, (value) => {
    if (value === 0 && state.value === "done") state.value = "expired";
  });
</script>
