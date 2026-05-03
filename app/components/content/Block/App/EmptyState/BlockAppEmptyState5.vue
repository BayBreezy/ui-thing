<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <Motion
      :variants="parentVariant"
      initial="initial"
      animate="animate"
      class="flex w-full max-w-2xl flex-col items-center gap-8 text-center"
    >
      <Motion :variants="gridVariant" class="relative">
        <div
          class="from-primary/20 absolute top-1/2 left-1/2 -z-10 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br to-transparent blur-3xl"
        />
        <div class="grid grid-cols-3 gap-3">
          <Motion
            v-for="i in 9"
            :key="i"
            :variants="boxVariant"
            :custom="i"
            class="bg-muted size-12 rounded-lg"
          />
        </div>
      </Motion>
      <div class="flex flex-col gap-3">
        <slot name="title">
          <Motion
            v-if="title"
            as="h1"
            :variants="childVariant"
            class="text-2xl font-bold tracking-tight"
          >
            <span v-html="title" />
          </Motion>
        </slot>
        <slot name="description">
          <Motion
            v-if="description"
            as="p"
            :variants="childVariant"
            class="text-muted-foreground mx-auto max-w-md"
          >
            <span v-html="description" />
          </Motion>
        </slot>
      </div>
      <Motion :variants="childVariant" class="flex flex-wrap items-center justify-center gap-3">
        <slot name="buttons">
          <UiButton size="lg">
            <Icon :name="primaryIcon" class="size-4" />
            <span v-html="primaryText" />
          </UiButton>
          <UiButton variant="outline" size="lg">
            <Icon :name="secondaryIcon" class="size-4" />
            <span v-html="secondaryText" />
          </UiButton>
        </slot>
      </Motion>
      <slot name="footer">
        <Motion
          v-if="footerText"
          as="p"
          :variants="childVariant"
          class="text-muted-foreground text-xs"
        >
          <span v-html="footerText" />
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
    animate: { opacity: 1, transition: { delayChildren: stagger(0.1) } },
  };

  const gridVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { delayChildren: stagger(0.05) } },
  };

  const boxVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0, backgroundColor: "var(--color-muted)" },
    animate: (i: unknown) => ({
      opacity: 1,
      scale: [1, 1.05, 1],
      backgroundColor: ["#B12A414C", "#1C731C3A", "#6C1A9235"],
      transition: {
        scale: {
          repeat: Infinity,
          repeatDelay: 3,
          delay: Number(i) * 0.05,
        },
        backgroundColor: {
          repeat: Infinity,
          repeatDelay: 3,
          duration: 1.5,
          delay: Number(i) * 0.05 + 0.3,
          times: [0, 0.5, 1],
        },
      },
    }),
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { type: "keyframes", duration: 0.3 } },
  };
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      primaryText?: string;
      primaryIcon?: string;
      secondaryText?: string;
      secondaryIcon?: string;
      footerText?: string;
    }>(),
    {
      title: "Nothing to see here",
      description:
        "Your dashboard is empty. Start by creating your first item or importing data from another source.",
      primaryText: "Get started",
      primaryIcon: "lucide:arrow-right",
      secondaryText: "Learn more",
      secondaryIcon: "lucide:book-open",
      footerText: "Need help? Check out our documentation",
    }
  );
</script>
