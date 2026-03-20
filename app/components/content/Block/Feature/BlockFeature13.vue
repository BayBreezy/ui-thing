<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <Motion :variants="childVariant">
        <div class="mx-auto max-w-[760px] text-center">
          <p class="font-semibold text-primary">Everything you need</p>
          <h2 class="mt-3 mb-4 text-3xl font-semibold lg:mb-5 lg:text-4xl">
            Built for modern teams
          </h2>
          <p class="text-lg text-muted-foreground lg:text-xl">
            A comprehensive suite of tools designed to help teams collaborate and succeed.
          </p>
        </div>
      </Motion>

      <Motion
        as="div"
        class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
        :variants="parentVariant"
        initial="initial"
        while-in-view="animate"
        :in-view-options="{ once: true }"
      >
        <!-- Large featured card -->
        <Motion :variants="childVariant" class="group col-span-1 md:col-span-2 lg:row-span-2">
          <UiCard class="h-full overflow-hidden py-0 transition-all hover:shadow-lg">
            <div class="relative h-[300px] overflow-hidden lg:h-full">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                alt="Team collaboration"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <div class="absolute bottom-0 p-6 text-white lg:p-8">
                <div
                  class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm"
                >
                  <Icon name="lucide:users" class="h-6 w-6" />
                </div>
                <h3 class="mb-2 text-2xl font-semibold lg:text-3xl">Team Collaboration</h3>
                <p class="text-white/90 lg:text-lg">
                  Work together seamlessly with real-time collaboration tools and shared workspaces.
                </p>
              </div>
            </div>
          </UiCard>
        </Motion>

        <!-- Small cards -->
        <Motion :variants="childVariant" class="group col-span-1">
          <UiCard class="h-full p-6 transition-all hover:shadow-lg lg:p-8">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:rocket" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-semibold lg:text-2xl">Fast Deployment</h3>
            <p class="text-muted-foreground">
              Deploy in seconds with our streamlined CI/CD pipeline.
            </p>
          </UiCard>
        </Motion>

        <Motion :variants="childVariant" class="group col-span-1">
          <UiCard class="h-full p-6 transition-all hover:shadow-lg lg:p-8">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:code-2" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-semibold lg:text-2xl">Developer Tools</h3>
            <p class="text-muted-foreground">
              Built-in debugging and testing tools for developers.
            </p>
          </UiCard>
        </Motion>

        <Motion :variants="childVariant" class="group col-span-1 md:col-span-2 lg:col-span-1">
          <UiCard class="h-full p-6 transition-all hover:shadow-lg lg:p-8">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:gauge" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-semibold lg:text-2xl">Performance</h3>
            <p class="text-muted-foreground">
              Lightning-fast performance with global CDN and edge caching.
            </p>
          </UiCard>
        </Motion>

        <Motion :variants="childVariant" class="group col-span-1">
          <UiCard class="h-full p-6 transition-all hover:shadow-lg lg:p-8">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:lock" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-semibold lg:text-2xl">Secure</h3>
            <p class="text-muted-foreground">Enterprise-grade security with SOC 2 compliance.</p>
          </UiCard>
        </Motion>

        <Motion :variants="childVariant" class="group col-span-1">
          <UiCard class="h-full p-6 transition-all hover:shadow-lg lg:p-8">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:headphones" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-semibold lg:text-2xl">24/7 Support</h3>
            <p class="text-muted-foreground">Expert support whenever you need it.</p>
          </UiCard>
        </Motion>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.08),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>
