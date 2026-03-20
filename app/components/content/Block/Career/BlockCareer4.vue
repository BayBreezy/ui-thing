<template>
  <!-- 
    Card-based career listings with department filtering
    Features: Department tabs, card layout with hover effects, salary ranges, benefits
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
      <!-- Header -->
      <div class="mb-12 text-center lg:mb-16">
        <Motion as="p" :variants="childVariant" class="mb-2 font-semibold text-primary">
          Careers
        </Motion>
        <Motion as="h2" :variants="childVariant" class="mb-4 text-4xl font-bold lg:text-5xl">
          Find your next role
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl"
        >
          Join a team of passionate individuals working on cutting-edge products
        </Motion>
      </div>

      <!-- Department filter tabs -->
      <Motion :variants="childVariant" class="mb-12">
        <UiTabs default-value="all" class="w-full">
          <UiTabsList class="mx-auto w-full justify-start overflow-x-auto">
            <UiTabsTrigger value="all">All positions (12)</UiTabsTrigger>
            <UiTabsTrigger value="engineering">Engineering (5)</UiTabsTrigger>
            <UiTabsTrigger value="design">Design (3)</UiTabsTrigger>
            <UiTabsTrigger value="product">Product (2)</UiTabsTrigger>
            <UiTabsTrigger value="marketing">Marketing (2)</UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
      </Motion>

      <!-- Job cards grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Motion
          v-for="n in 6"
          :key="n"
          :variants="childVariant"
          :transition="{
            delay: n * 0.05,
          }"
        >
          <UiCard class="group h-full py-0 transition-all hover:border-primary/50 hover:shadow-lg">
            <UiCardContent class="p-6">
              <div class="mb-4 flex items-start justify-between">
                <UiBadge variant="secondary">Design</UiBadge>
                <UiButton variant="ghost" size="icon" class="h-8 w-8">
                  <Icon name="lucide:bookmark" class="h-4 w-4" />
                </UiButton>
              </div>

              <h3 class="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                Senior Product Designer
              </h3>
              <p class="mb-4 text-sm text-muted-foreground">
                Lead design initiatives for our flagship products and mentor junior designers.
              </p>

              <div class="mb-4 space-y-2 text-sm">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <Icon name="lucide:map-pin" class="h-4 w-4" />
                  Remote · San Francisco, CA
                </div>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <Icon name="lucide:briefcase" class="h-4 w-4" />
                  Full-time · Senior level
                </div>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <Icon name="lucide:dollar-sign" class="h-4 w-4" />
                  $120k - $160k
                </div>
              </div>

              <UiDivider class="my-4" />

              <div class="flex flex-wrap gap-2">
                <UiBadge variant="outline" size="sm">Health insurance</UiBadge>
                <UiBadge variant="outline" size="sm">401(k)</UiBadge>
                <UiBadge variant="outline" size="sm">Remote</UiBadge>
              </div>

              <UiButton class="mt-6 w-full" variant="outline">
                View details
                <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
              </UiButton>
            </UiCardContent>
          </UiCard>
        </Motion>
      </div>

      <!-- Load more -->
      <Motion :variants="childVariant" class="mt-12 text-center">
        <UiButton size="lg" variant="outline">Load more positions</UiButton>
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
</script>
