<template>
  <!-- 
    Centered error page with radial pattern
    Features: Radial dot pattern, centered content, animated entrance
  -->
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <div class="relative flex min-h-screen items-center">
      <div
        class="absolute h-full w-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_50%,#000_60%,transparent_100%)] bg-size-[20px_20px]"
      />
      <div class="relative z-1 container flex flex-col items-center justify-center text-center">
        <Motion as="p" :variants="childVariant" class="mb-5 font-bold tracking-tight text-primary">
          {{ statusCode }} error
        </Motion>
        <Motion
          as="h1"
          :variants="childVariant"
          class="text-4xl font-bold tracking-tight lg:text-5xl"
        >
          {{ title }}
        </Motion>
        <Motion :variants="childVariant">
          <UiButton class="mt-5" @click="clearError({ redirect: '#' })">
            Take me home
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
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
      statusCode: 404,
      fatal: false,
      unhandled: false,
      statusMessage: "",
      message: "We can't find this page",
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
