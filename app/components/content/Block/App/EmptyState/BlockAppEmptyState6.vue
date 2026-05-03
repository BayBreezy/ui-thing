<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <Motion
      :variants="parentVariant"
      initial="initial"
      animate="animate"
      class="flex w-full max-w-md flex-col items-center gap-6 text-center"
    >
      <Motion :variants="iconVariant" class="relative">
        <div
          class="group border-border bg-muted/30 hover:border-primary rounded-2xl border-2 border-dashed p-12 transition-all"
        >
          <Icon
            :name="icon"
            class="text-muted-foreground/50 size-8 transition-all duration-300 group-hover:-translate-y-1"
          />
        </div>
        <Motion
          :variants="badgeVariant"
          class="bg-primary ring-background absolute -top-2 -right-2 rounded-full p-2 shadow-lg ring-4"
        >
          <Icon :name="badgeIcon" class="text-primary-foreground size-4" />
        </Motion>
      </Motion>
      <div class="flex flex-col gap-2">
        <slot name="title">
          <Motion v-if="title" as="h1" :variants="childVariant" class="text-lg font-bold">
            <span v-html="title" />
          </Motion>
        </slot>
        <slot name="description">
          <Motion
            v-if="description"
            as="p"
            :variants="childVariant"
            class="text-muted-foreground text-sm"
          >
            <span v-html="description" />
          </Motion>
        </slot>
      </div>
      <slot name="features">
        <Motion
          v-if="features.length"
          :variants="featureListVariant"
          class="flex w-full flex-col gap-2 text-left"
        >
          <Motion
            v-for="(feature, index) in features"
            :key="index"
            :variants="featureVariant"
            class="flex items-center gap-2 text-sm"
          >
            <Icon name="lucide:check" class="text-primary size-4 shrink-0" />
            <span class="text-muted-foreground" v-html="feature" />
          </Motion>
        </Motion>
      </slot>
      <slot name="button">
        <Motion :variants="childVariant" class="relative w-full rounded-md">
          <UiButton class="w-full" size="lg">
            <Icon :name="buttonIcon" class="size-4" />
            <span v-html="buttonText" />
          </UiButton>
          <UiBorderBeam :duration="15" />
        </Motion>
      </slot>
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

  const iconVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  const badgeVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0, rotate: -45 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 15, delay: 0.3 },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { type: "keyframes", duration: 0.3 } },
  };

  const featureListVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delayChildren: stagger(0.1) } },
  };

  const featureVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { type: "keyframes", duration: 0.3 } },
  };
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      badgeIcon?: string;
      buttonText?: string;
      buttonIcon?: string;
      features?: string[];
    }>(),
    {
      title: "Start your journey",
      description: "Upload your first file to get started with your workspace.",
      icon: "lucide:cloud-upload",
      badgeIcon: "lucide:sparkles",
      buttonText: "Upload file",
      buttonIcon: "lucide:upload",
      features: () => [
        "Support for multiple file formats",
        "Automatic processing and optimization",
        "Secure cloud storage",
      ],
    }
  );
</script>
