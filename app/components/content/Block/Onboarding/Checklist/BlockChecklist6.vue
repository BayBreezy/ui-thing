<template>
  <!--
    Dismissible setup banner
    Features: Slim banner with progress, the next step as a link style button, a mini progress ring, remind me later and dismiss buttons and a screen reader friendly region
  -->
  <UiContainer class="py-12 lg:py-20">
    <div
      v-if="visible"
      class="bg-primary/5 border-primary/20 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
      role="region"
      aria-label="Finish setting up"
    >
      <UiCircularProgress
        :current-step="done"
        :total-steps="total"
        size="default"
        show-value
        class="shrink-0"
        aria-label="Setup progress"
      />
      <div class="min-w-0 flex-1">
        <p class="font-semibold">Finish setting up your account</p>
        <p class="text-muted-foreground text-sm">
          {{ done }} of {{ total }} steps done. Next:
          <UiButton
            variant="link"
            class="h-auto p-0 align-baseline"
            @click="useSonner.info(`Opening: ${next}`)"
          >
            {{ next }}
          </UiButton>
        </p>
      </div>
      <div class="flex items-center gap-2">
        <UiButton variant="outline" size="sm" @click="snooze">Remind me later</UiButton>
        <UiButton variant="ghost" size="icon-sm" aria-label="Dismiss" @click="visible = false">
          <Icon name="lucide:x" class="size-4" />
        </UiButton>
      </div>
    </div>
    <div
      v-else
      class="text-muted-foreground flex items-center justify-between rounded-xl border border-dashed p-4 text-sm"
    >
      <span>{{ snoozed ? "We will remind you tomorrow." : "Banner dismissed." }}</span>
      <UiButton variant="link" class="h-auto p-0" @click="show">Bring it back</UiButton>
    </div>

    <div class="mt-8 rounded-xl border p-6">
      <h1 class="text-xl font-semibold">Dashboard</h1>
      <p class="text-muted-foreground mt-1 text-sm">Your page content sits below the banner.</p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      done?: number;
      total?: number;
      next?: string;
    }>(),
    { done: 3, total: 5, next: "Invite a teammate" }
  );

  const visible = ref(true);
  const snoozed = ref(false);

  function snooze() {
    snoozed.value = true;
    visible.value = false;
  }

  function show() {
    snoozed.value = false;
    visible.value = true;
  }
</script>
