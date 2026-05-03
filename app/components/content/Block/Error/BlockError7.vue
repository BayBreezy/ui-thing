<template>
  <!-- 
    Minimal error page with illustration
    Features: SVG illustration, clean minimal design, subtle animations
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
          delayChildren: stagger(0.12),
        },
      },
    }"
  >
    <div class="flex min-h-screen items-center">
      <div class="container max-w-2xl text-center">
        <Motion
          :variants="{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 150,
                damping: 15,
              },
            },
          }"
          class="mb-8 inline-block"
        >
          <svg
            class="text-primary/20 h-48 w-48"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2" />
            <path
              d="M70 85 Q70 70 85 70 L115 70 Q130 70 130 85 L130 115 Q130 130 115 130 L85 130 Q70 130 70 115 Z"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
            />
            <circle cx="85" cy="90" r="5" fill="currentColor" />
            <circle cx="115" cy="90" r="5" fill="currentColor" />
            <path
              d="M85 115 Q100 105 115 115"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </Motion>

        <Motion as="h1" :variants="childVariant" class="text-primary mb-3 text-6xl font-bold">
          {{ statusCode }}
        </Motion>
        <Motion
          as="h2"
          :variants="childVariant"
          class="mb-4 text-2xl font-semibold tracking-tight lg:text-3xl"
        >
          {{ title }}
        </Motion>
        <Motion as="p" :variants="childVariant" class="text-muted-foreground mb-8">
          Oops! The page you're looking for seems to have wandered off. Don't worry, it happens to
          the best of us.
        </Motion>

        <Motion
          as="div"
          :variants="childVariant"
          class="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <UiButton @click="clearError({ redirect: '#' })">
            <Icon name="lucide:home" class="mr-2 h-4 w-4" />
            Go Home
          </UiButton>
          <UiButton variant="outline" @click="clearError({ redirect: '#' })">
            <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
            Go Back
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
    initial: { opacity: 0, y: 15 },
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
      statusCode: 404,
      fatal: false,
      unhandled: false,
      statusMessage: "",
      message: "Page Not Found",
      data: undefined,
      cause: undefined,
    }
  );

  const title = computed(() => {
    if (!props.message) return "Error";
    return props.message;
  });

  useSeoMeta({ title });
</script>
