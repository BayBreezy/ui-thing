<template>
  <!--
    All set success screen
    Features: Animated check that respects reduced motion, short confirmation message with the workspace name, a primary action to go to the dashboard and a secondary link
  -->
  <UiContainer class="py-20 lg:py-32">
    <div class="mx-auto flex max-w-md flex-col items-center text-center" role="status">
      <Motion
        :initial="reduced ? false : { scale: 0.6, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 260, damping: 18 }"
        class="grid size-20 place-items-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400"
      >
        <Icon name="lucide:check" class="size-10" />
      </Motion>
      <h1 class="mt-6 text-3xl font-bold tracking-tight text-balance">You are all set</h1>
      <p class="text-muted-foreground mt-3 text-balance">
        {{ workspace }} is ready. We saved your preferences and sent a confirmation to your inbox.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <UiButton size="lg" @click="useSonner.success('Taking you to your dashboard')">
          Go to dashboard
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
        <UiButton size="lg" variant="outline" @click="useSonner.info('Opening the guide')">
          Read the quick guide
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      workspace?: string;
    }>(),
    { workspace: "Acme Inc." }
  );

  const reduced = usePreferredReducedMotion().value === "reduce";
</script>
