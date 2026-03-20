<template>
  <!-- 
    Gradient background CTA with stats
    Features: Full-width gradient, statistics badges, animated blobs
  -->
  <div
    class="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-primary/5 py-20"
  >
    <!-- Animated background blobs -->
    <div class="absolute inset-0 overflow-hidden">
      <Motion
        :variants="{
          initial: { scale: 0.8, opacity: 0.3 },
          animate: {
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.5, 0.3],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }"
        initial="initial"
        animate="animate"
        class="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <Motion
        :variants="{
          initial: { scale: 0.8, opacity: 0.3 },
          animate: {
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.4, 0.3],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            },
          },
        }"
        initial="initial"
        animate="animate"
        class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
      />
    </div>

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
      <UiContainer class="relative z-10 text-center">
        <Motion
          as="h2"
          :variants="childVariant"
          class="mb-4 text-4xl font-bold lg:mb-6 lg:text-5xl"
        >
          Ready to transform your business?
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto mb-10 max-w-[700px] text-lg text-muted-foreground lg:text-xl"
        >
          Join thousands of companies already using {{ COMPANY_NAME }} to accelerate growth.
        </Motion>

        <Motion
          :variants="childVariant"
          class="mb-12 flex flex-wrap items-center justify-center gap-8"
        >
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold text-primary lg:text-4xl">{{ stat.value }}</div>
            <div class="mt-1 text-sm text-muted-foreground">{{ stat.label }}</div>
          </div>
        </Motion>

        <Motion :variants="childVariant" class="flex flex-col justify-center gap-3 md:flex-row">
          <UiButton size="lg" class="w-full md:w-auto">
            Start free trial
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </UiButton>
          <UiButton size="lg" variant="outline" class="w-full md:w-auto"> Schedule demo </UiButton>
        </Motion>
      </UiContainer>
    </Motion>
  </div>
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

  const stats = [
    { value: "50K+", label: "Active users" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User rating" },
    { value: "24/7", label: "Support" },
  ];
</script>
