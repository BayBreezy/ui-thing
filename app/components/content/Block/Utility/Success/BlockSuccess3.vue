<template>
  <!--
    Account verified
    Features: Verified email confirmation, automatic redirect countdown with cancel and continue now buttons, getting started checklist
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md text-center">
      <span
        class="mx-auto grid size-16 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
      >
        <Icon name="lucide:badge-check" class="size-8" />
      </span>
      <h1 class="mt-6 text-3xl font-bold tracking-tight lg:text-4xl">Email verified</h1>
      <p class="text-muted-foreground mt-3">
        <span class="text-foreground font-medium">{{ email }}</span> is confirmed. Your account is
        ready to use.
      </p>

      <div class="mt-6" role="status" aria-live="polite">
        <p v-if="state === 'counting'" class="text-muted-foreground text-sm">
          Taking you to your {{ destination }} in {{ remaining }}
          {{ remaining === 1 ? "second" : "seconds" }}.
        </p>
        <p v-else-if="state === 'redirecting'" class="text-sm font-medium">
          <Icon name="lucide:loader-circle" class="mr-1 inline size-4 motion-safe:animate-spin" />
          Redirecting to your {{ destination }}.
        </p>
        <p v-else class="text-muted-foreground text-sm">Automatic redirect cancelled.</p>
      </div>
      <UiProgress
        v-if="state === 'counting'"
        :model-value="(remaining / seconds) * 100"
        class="mx-auto mt-3 h-1.5 max-w-xs"
        aria-label="Time until redirect"
      />

      <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <UiButton :disabled="state === 'redirecting'" @click="state = 'redirecting'"
          >Continue now<Icon name="lucide:arrow-right" class="size-4"
        /></UiButton>
        <UiButton v-if="state === 'counting'" variant="outline" @click="state = 'cancelled'"
          >Stay on this page</UiButton
        >
      </div>

      <div class="mt-10 rounded-xl border p-5 text-left">
        <div class="flex items-center justify-between gap-2">
          <p class="text-sm font-medium">Get started</p>
          <p class="text-muted-foreground text-xs tabular-nums">
            {{ done.size }} of {{ tasks.length }}
          </p>
        </div>
        <ul class="mt-3 space-y-3">
          <li v-for="task in tasks" :key="task" class="flex items-center gap-3">
            <UiCheckbox
              :id="`verified-${task}`"
              :model-value="done.has(task)"
              @update:model-value="toggle(task)"
            />
            <UiLabel
              :for="`verified-${task}`"
              class="font-normal"
              :class="done.has(task) ? 'text-muted-foreground line-through' : ''"
              >{{ task }}</UiLabel
            >
          </li>
        </ul>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      email?: string;
      destination?: string;
      seconds?: number;
      tasks?: string[];
    }>(),
    {
      email: "alex@example.com",
      destination: "dashboard",
      seconds: 8,
      tasks: () => ["Add a profile photo", "Invite a teammate", "Create your first project"],
    }
  );

  const state = ref<"counting" | "redirecting" | "cancelled">("counting");
  const done = ref(new Set<string>());

  const started = Date.now();
  const clock = useNow({ interval: 1000 });
  const remaining = computed(() =>
    Math.max(0, props.seconds - Math.floor((clock.value.getTime() - started) / 1000))
  );

  watch(remaining, (value) => {
    if (value === 0 && state.value === "counting") state.value = "redirecting";
  });

  function toggle(task: string) {
    const next = new Set(done.value);
    if (next.has(task)) next.delete(task);
    else next.add(task);
    done.value = next;
  }
</script>
