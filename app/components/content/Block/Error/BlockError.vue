<template>
  <!-- 
    Simple error page with grid pattern
    Features: Grid background pattern, staggered animations, error code badge
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
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <div class="relative flex min-h-screen items-center py-16">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,--alpha(var(--color-border)/80%)_1px,transparent_1px),linear-gradient(to_bottom,--alpha(var(--color-border)/80%)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_0%,#000_70%,transparent_110%)] bg-size-[60px_60px]"
      />
      <div class="relative z-1 container">
        <Motion as="p" :variants="childVariant" class="text-primary mb-5 font-bold tracking-tight">
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
