<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <Motion
      :variants="parentVariant"
      initial="initial"
      animate="animate"
      class="flex w-full max-w-md flex-col items-center gap-6 text-center"
    >
      <Motion :variants="spinnerVariant" class="relative flex items-center justify-center">
        <div class="animation-duration-[8.5s] animate-spin rounded-full border-2 border-dashed">
          <div class="bg-background relative z-10 animate-none rounded-full p-6">
            <Icon :name="icon" class="text-muted-foreground size-8" />
          </div>
        </div>
      </Motion>
      <Motion :variants="headerVariant" class="flex flex-col gap-2">
        <slot name="title">
          <h1 v-if="title" class="text-lg font-bold">
            <span v-html="title" />
          </h1>
        </slot>
        <slot name="description">
          <p v-if="description" class="text-muted-foreground text-sm">
            <span v-html="description" />
          </p>
        </slot>
      </Motion>
      <Motion :variants="separatorVariant">
        <UiGradientDivider class="my-2" />
      </Motion>
      <Motion :variants="stepsListVariant" class="mx-auto flex w-full max-w-[250px] flex-col gap-3">
        <slot name="steps">
          <Motion
            v-for="(step, index) in steps"
            :key="index"
            :variants="stepVariant"
            :custom="index"
            class="flex items-start gap-3 text-left"
          >
            <div
              class="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
            >
              {{ index + 1 }}
            </div>
            <p class="text-muted-foreground text-sm" v-html="step" />
          </Motion>
        </slot>
      </Motion>
      <Motion :variants="buttonVariant">
        <slot name="button">
          <UiButton class="w-full">
            <Icon :name="buttonIcon" class="size-4" />
            <span v-html="buttonText" />
          </UiButton>
        </slot>
      </Motion>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delayChildren: stagger(0.15) } },
  };

  const spinnerVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  };

  const headerVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { type: "keyframes", duration: 0.3 } },
  };

  const separatorVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scaleX: 0, width: 0 },
    animate: { opacity: 1, scaleX: 1, width: "100%", transition: { duration: 0.3 } },
  };

  const stepsListVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delayChildren: stagger(0.1) } },
  };

  const stepVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: (i: unknown) => ({
      opacity: 1,
      y: 0,
      transition: { type: "keyframes", duration: 0.3, delay: Number(i) * 0.5 },
    }),
  };

  const buttonVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { type: "keyframes", duration: 0.3 } },
  };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      buttonText?: string;
      buttonIcon?: string;
      steps?: string[];
    }>(),
    {
      title: "Let's get you set up",
      description: "Follow these simple steps to complete your setup",
      icon: "lucide:settings",
      buttonText: "Start setup",
      buttonIcon: "lucide:play",
      steps: () => [
        "Connect your account",
        "Configure your preferences",
        "Invite your team members",
      ],
    }
  );
</script>
