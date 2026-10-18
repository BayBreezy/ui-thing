<template>
  <!--
    Personalised welcome banner with setup progress
    Features: Greeting with avatar and name, circular setup progress, the next recommended step with a call to action, quick links and a dismiss button
  -->
  <UiContainer class="py-12 lg:py-20">
    <section
      v-if="!dismissed"
      class="from-primary/10 via-background to-background relative overflow-hidden rounded-2xl border bg-linear-to-br p-6 sm:p-8"
      aria-labelledby="welcome-heading"
    >
      <UiButton
        variant="ghost"
        size="icon-sm"
        class="absolute top-3 right-3"
        aria-label="Dismiss welcome banner"
        @click="dismissed = true"
      >
        <Icon name="lucide:x" class="size-4" />
      </UiButton>

      <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div class="flex items-start gap-4">
          <UiAvatar :src="avatar" :fallback="name[0]" class="size-14" />
          <div class="pr-8">
            <h1 id="welcome-heading" class="text-2xl font-bold tracking-tight">
              Welcome back, {{ name }}
            </h1>
            <p class="text-muted-foreground mt-1">
              You have finished {{ completed }} of {{ steps.length }} setup steps.
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <UiButton @click="useSonner.info(`Opening: ${next?.title}`)">
                {{ next?.title }}
                <Icon name="lucide:arrow-right" class="size-4" />
              </UiButton>
              <UiButton variant="outline" @click="useSonner.info('Opening the help center')">
                Read the guide
              </UiButton>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <UiCircularProgress
            :current-step="completed"
            :total-steps="steps.length"
            size="lg"
            show-value
            aria-label="Setup progress"
          />
          <div class="text-sm">
            <p class="font-medium">Setup progress</p>
            <p class="text-muted-foreground">Next up: {{ next?.title }}</p>
          </div>
        </div>
      </div>
    </section>
    <div
      v-else
      class="flex items-center justify-between rounded-xl border border-dashed p-4 text-sm"
    >
      <span class="text-muted-foreground">Welcome banner dismissed.</span>
      <UiButton variant="link" class="h-auto p-0" @click="dismissed = false"
        >Show it again</UiButton
      >
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Step = { title: string; done: boolean };

  const props = withDefaults(
    defineProps<{
      name?: string;
      avatar?: string;
      steps?: Step[];
    }>(),
    {
      name: "Maya",
      avatar: "https://i.pravatar.cc/120?img=47",
      steps: () => [
        { title: "Create your account", done: true },
        { title: "Verify your email", done: true },
        { title: "Invite a teammate", done: false },
        { title: "Connect your first integration", done: false },
        { title: "Publish your first project", done: false },
      ],
    }
  );

  const dismissed = ref(false);

  const completed = computed(() => props.steps.filter((step) => step.done).length);
  const next = computed(() => props.steps.find((step) => !step.done));
</script>
