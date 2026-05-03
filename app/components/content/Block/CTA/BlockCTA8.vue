<template>
  <!-- 
    Card-based CTA with features
    Features: Centered card design, feature grid, icon badges, shadow effects
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
    <UiContainer class="py-16 lg:py-24">
      <Motion as-child :variants="childVariant">
        <UiCard class="mx-auto max-w-[900px] p-8 shadow-xl lg:p-12">
          <div class="text-center">
            <h3 class="mb-4 text-3xl font-semibold lg:mb-6 lg:text-4xl">
              Everything you need to succeed
            </h3>
            <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-lg lg:text-xl">
              All the tools and features you need in one powerful platform.
            </p>
          </div>

          <div class="mb-10 grid gap-6 md:grid-cols-3">
            <Motion
              v-for="feature in features"
              :key="feature.title"
              :variants="childVariant"
              class="group text-center"
            >
              <div
                class="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors"
              >
                <Icon :name="feature.icon" class="text-primary h-6 w-6" />
              </div>
              <h4 class="mb-2 font-semibold">{{ feature.title }}</h4>
              <p class="text-muted-foreground text-sm">{{ feature.description }}</p>
            </Motion>
          </div>

          <div class="flex flex-col justify-center gap-3 md:flex-row">
            <UiButton size="lg" class="w-full md:w-auto">
              Get started free
              <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
            </UiButton>
            <UiButton size="lg" variant="outline" class="w-full md:w-auto"> View pricing </UiButton>
          </div>
        </UiCard>
      </Motion>
    </UiContainer>
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

  const features = [
    {
      title: "Easy Setup",
      description: "Get started in minutes with our simple onboarding",
      icon: "lucide:zap",
    },
    {
      title: "Secure",
      description: "Enterprise-grade security for your peace of mind",
      icon: "lucide:shield-check",
    },
    {
      title: "24/7 Support",
      description: "Our team is here to help whenever you need",
      icon: "lucide:headphones",
    },
  ];
</script>
