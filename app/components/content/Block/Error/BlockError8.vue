<template>
  <!-- 
    Dark themed error with stats
    Features: Dark gradient background, error stats cards, terminal-style code
  -->
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1),
        },
      },
    }"
  >
    <div
      class="from-background via-background to-primary/5 relative flex min-h-screen items-center bg-linear-to-br py-16"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,--alpha(var(--color-border)/40%)_1px,transparent_1px),linear-gradient(to_bottom,--alpha(var(--color-border)/40%)_1px,transparent_1px)] bg-size-[80px_80px]"
      />
      <div class="relative z-1 container max-w-4xl">
        <Motion as="div" :variants="childVariant" class="mb-10">
          <UiBadge variant="outline" class="mb-4">Error {{ statusCode }}</UiBadge>
          <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">{{ title }}</h1>
          <p class="text-muted-foreground mt-4 text-lg">
            The server encountered an unexpected condition that prevented it from fulfilling the
            request.
          </p>
        </Motion>

        <Motion as="div" :variants="childVariant" class="mb-8 grid gap-4 sm:grid-cols-3">
          <UiCard>
            <UiCardHeader class="pb-3">
              <UiCardDescription>Status Code</UiCardDescription>
              <UiCardTitle class="text-2xl">{{ statusCode }}</UiCardTitle>
            </UiCardHeader>
          </UiCard>
          <UiCard>
            <UiCardHeader class="pb-3">
              <UiCardDescription>Error Type</UiCardDescription>
              <UiCardTitle class="text-2xl">{{ fatal ? "Fatal" : "Standard" }}</UiCardTitle>
            </UiCardHeader>
          </UiCard>
          <UiCard>
            <UiCardHeader class="pb-3">
              <UiCardDescription>Timestamp</UiCardDescription>
              <UiCardTitle class="text-2xl">{{ timestamp }}</UiCardTitle>
            </UiCardHeader>
          </UiCard>
        </Motion>

        <Motion as-child :variants="childVariant">
          <UiCard class="border-primary/20 bg-primary/5 mb-8">
            <UiCardHeader>
              <UiCardDescription class="font-mono text-xs">Error Details</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <pre
                class="text-muted-foreground overflow-x-auto text-xs"
              ><code>{{ errorDetails }}</code></pre>
            </UiCardContent>
          </UiCard>
        </Motion>

        <Motion as="div" :variants="childVariant" class="flex flex-wrap gap-3">
          <UiButton @click="clearError({ redirect: '#' })">
            <Icon name="lucide:refresh-cw" class="mr-2 h-4 w-4" />
            Retry
          </UiButton>
          <UiButton variant="outline" @click="clearError({ redirect: '#' })">
            <Icon name="lucide:home" class="mr-2 h-4 w-4" />
            Go Home
          </UiButton>
          <UiButton variant="ghost" as="a" href="#">
            <Icon name="lucide:bug" class="mr-2 h-4 w-4" />
            Report Issue
          </UiButton>
        </Motion>
      </div>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const props = withDefaults(
    defineProps<{
      statusCode?: number;
      fatal?: boolean;
      unhandled?: boolean;
      statusMessage?: string;
      message?: string;
      data?: unknown;
      cause?: unknown;
    }>(),
    {
      statusCode: 500,
      fatal: false,
      unhandled: false,
      statusMessage: "",
      message: "Internal Server Error",
      data: undefined,
      cause: undefined,
    }
  );

  const title = computed(() => {
    if (!props.message) return "Error";
    return props.message;
  });

  useSeoMeta({ title });

  const timestamp = computed(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false });
  });

  const errorDetails = computed(() => {
    return `{
  "error": "${props.message}",
  "statusCode": ${props.statusCode},
  "fatal": ${props.fatal},
  "timestamp": "${new Date().toISOString()}",
  "path": "${window.location.pathname}"
}`;
  });
</script>
