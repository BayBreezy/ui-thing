<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Motion as-child :variants="contentVariant">
          <div>
            <h2 class="mb-4 text-3xl font-bold lg:text-4xl">Join thousands of happy customers</h2>
            <p class="mb-6 text-lg text-muted-foreground">
              See why leading companies choose our platform to accelerate their growth and reach
              their goals faster.
            </p>
            <div class="flex flex-col gap-6">
              <div class="flex items-start gap-4">
                <div
                  class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10"
                >
                  <Icon class="size-6 text-primary" name="lucide:users" />
                </div>
                <div>
                  <p class="mb-1 font-semibold">50,000+ Active Users</p>
                  <p class="text-sm text-muted-foreground">
                    Growing community of professionals and teams
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div
                  class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10"
                >
                  <Icon class="size-6 text-primary" name="lucide:star" />
                </div>
                <div>
                  <p class="mb-1 font-semibold">4.9/5 Rating</p>
                  <p class="text-sm text-muted-foreground">Based on 2,000+ verified reviews</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div
                  class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10"
                >
                  <Icon class="size-6 text-primary" name="lucide:award" />
                </div>
                <div>
                  <p class="mb-1 font-semibold">Award Winning</p>
                  <p class="text-sm text-muted-foreground">
                    Recognized by industry leaders worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Motion>

        <Motion as-child :variants="logosVariant">
          <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-2">
            <div
              v-for="company in companies"
              :key="company.text"
              class="flex items-center justify-center rounded-lg bg-muted/50 p-6"
            >
              <span class="sr-only">{{ company.text }}</span>
              <Icon :name="company.icon" class="h-16 w-16" />
            </div>
          </div>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import type { MotionProps } from "motion-v";

  const companies = [
    { text: "Company One", icon: "logos:100tb" },
    { text: "Company Two", icon: "logos:aha" },
    { text: "Company Three", icon: "logos:airbnb-icon" },
    { text: "Company Four", icon: "logos:akamai" },
    { text: "Company Five", icon: "logos:asana-icon" },
    { text: "Company Six", icon: "logos:atlassian" },
  ];

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
      },
    },
  };

  const contentVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const logosVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
  };
</script>
