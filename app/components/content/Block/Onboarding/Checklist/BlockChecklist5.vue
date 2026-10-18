<template>
  <!--
    Tip carousel for new users
    Features: One tip at a time with an icon, previous and next buttons, numbered dots, a keyboard shortcut hint, got it button that removes the tip and an empty state when all tips are read
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-md">
      <UiCard
        v-if="tips.length"
        role="region"
        aria-roledescription="carousel"
        aria-label="Tips and tricks"
      >
        <UiCardHeader>
          <div class="flex items-center gap-2">
            <span class="grid size-8 place-items-center rounded-lg bg-amber-500/15 text-amber-600">
              <Icon name="lucide:lightbulb" class="size-4" />
            </span>
            <UiCardTitle class="text-base">Tip {{ index + 1 }} of {{ tips.length }}</UiCardTitle>
          </div>
        </UiCardHeader>
        <UiCardContent aria-live="polite">
          <h2 class="text-lg font-semibold">{{ tip!.title }}</h2>
          <p class="text-muted-foreground mt-2">{{ tip!.body }}</p>
          <p v-if="tip!.shortcut" class="mt-4 flex items-center gap-2 text-sm">
            Try it:
            <UiKbd v-for="key in tip!.shortcut" :key="key">{{ key }}</UiKbd>
          </p>
        </UiCardContent>
        <UiCardFooter class="justify-between">
          <div class="flex gap-1">
            <UiButton
              variant="outline"
              size="icon-sm"
              aria-label="Previous tip"
              :disabled="tips.length < 2"
              @click="go(-1)"
            >
              <Icon name="lucide:chevron-left" class="size-4" />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon-sm"
              aria-label="Next tip"
              :disabled="tips.length < 2"
              @click="go(1)"
            >
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiButton>
          </div>
          <div class="flex gap-1.5" aria-hidden="true">
            <span
              v-for="(item, i) in tips"
              :key="item.title"
              class="size-1.5 rounded-full transition"
              :class="i === index ? 'bg-primary' : 'bg-muted-foreground/30'"
            />
          </div>
          <UiButton size="sm" @click="dismiss">Got it</UiButton>
        </UiCardFooter>
      </UiCard>
      <div
        v-else
        class="flex flex-col items-center rounded-xl border border-dashed p-10 text-center"
        role="status"
      >
        <Icon name="lucide:graduation-cap" class="text-muted-foreground size-8" />
        <p class="mt-3 font-medium">You have read every tip</p>
        <UiButton class="mt-4" variant="outline" size="sm" @click="restore"
          >Show tips again</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Tip = { title: string; body: string; shortcut?: string[] };

  const props = withDefaults(
    defineProps<{
      items?: Tip[];
    }>(),
    {
      items: () => [
        {
          title: "Jump anywhere",
          body: "Open the command menu to search projects, people and settings from one place.",
          shortcut: ["Ctrl", "K"],
        },
        {
          title: "Create faster",
          body: "Press the shortcut anywhere to add a new task without leaving your page.",
          shortcut: ["C"],
        },
        {
          title: "Use templates",
          body: "Save a project as a template and start your next one in seconds.",
        },
        {
          title: "Collaborate in real time",
          body: "Mention a teammate with the at sign and they will be notified straight away.",
          shortcut: ["@"],
        },
      ],
    }
  );

  const tips = ref<Tip[]>(props.items.map((item) => ({ ...item })));
  const index = ref(0);

  const tip = computed(() => tips.value[index.value]);

  function go(step: number) {
    index.value = (index.value + step + tips.value.length) % tips.value.length;
  }

  function dismiss() {
    tips.value.splice(index.value, 1);
    index.value = Math.min(index.value, Math.max(tips.value.length - 1, 0));
  }

  function restore() {
    tips.value = props.items.map((item) => ({ ...item }));
    index.value = 0;
  }
</script>
