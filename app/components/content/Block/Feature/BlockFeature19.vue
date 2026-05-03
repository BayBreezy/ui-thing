<template>
  <div class="relative overflow-hidden py-16 lg:py-24">
    <!-- Gradient mesh background -->
    <div
      class="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    />

    <!-- Animated gradient blobs -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div
        class="animate-blob absolute top-0 -left-20 h-96 w-96 rounded-full bg-linear-to-r from-purple-400 to-pink-400 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-30"
      />
      <div
        class="animation-delay-2000 animate-blob absolute top-0 -right-20 h-96 w-96 rounded-full bg-linear-to-r from-blue-400 to-cyan-400 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-30"
      />
      <div
        class="animation-delay-4000 animate-blob absolute -bottom-20 left-20 h-96 w-96 rounded-full bg-linear-to-r from-green-400 to-yellow-400 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-30"
      />
    </div>

    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer class="relative">
        <Motion :variants="childVariant">
          <div class="mx-auto max-w-[900px] text-center">
            <div
              class="bg-background/50 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-sm backdrop-blur-sm"
            >
              <Icon name="lucide:award" class="text-primary size-4" />
              <span class="text-sm font-medium">Award-Winning Platform</span>
            </div>
            <h2 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-6xl">
              Experience features that
              <br />
              <span class="relative inline-block">
                <span
                  class="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                >
                  redefine excellence
                </span>
                <svg
                  class="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 100 2 150 6C200 10 250 10 298 6"
                    stroke="url(#gradient)"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="300" y2="0">
                      <stop offset="0%" stop-color="#9333EA" />
                      <stop offset="50%" stop-color="#DB2777" />
                      <stop offset="100%" stop-color="#2563EB" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p class="text-muted-foreground text-lg lg:text-xl">
              Discover a new way to work with intelligent automation and seamless integrations.
            </p>
          </div>
        </Motion>

        <!-- Feature cards in masonry-like grid -->
        <Motion
          as="div"
          class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-8"
          :variants="parentVariant"
          initial="initial"
          while-in-view="animate"
          :in-view-options="{ once: true }"
        >
          <Motion :variants="childVariant" class="group relative md:col-span-2">
            <UiCard
              class="hover:border-primary/50 h-full overflow-hidden bg-transparent pt-0 transition-all hover:shadow-2xl"
            >
              <div
                class="relative h-48 overflow-hidden bg-linear-to-br from-purple-500 to-pink-500"
              >
                <div class="absolute inset-0 flex items-center justify-center">
                  <Icon name="lucide:sparkles" class="h-16 w-16 text-white opacity-90" />
                </div>
              </div>
              <UiCardContent>
                <h3 class="mb-3 text-2xl font-bold">AI-First Approach</h3>
                <p class="text-muted-foreground mb-4">
                  Harness the power of artificial intelligence to automate tasks, predict outcomes,
                  and optimize your workflow.
                </p>
                <div class="flex flex-wrap gap-2">
                  <UiBadge>Machine Learning</UiBadge>
                  <UiBadge>Automation</UiBadge>
                  <UiBadge>Predictions</UiBadge>
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>

          <Motion :variants="childVariant" class="group relative">
            <UiCard class="h-full bg-transparent transition-all hover:shadow-xl">
              <UiCardContent class="flex h-full flex-col">
                <div
                  class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-500"
                >
                  <Icon name="lucide:gauge" class="h-7 w-7 text-white" />
                </div>
                <h3 class="mb-2 text-xl font-bold">Lightning Speed</h3>
                <p class="text-muted-foreground mb-4 text-sm">
                  Experience sub-100ms response times globally.
                </p>
                <div class="mt-auto"></div>
                <div class="bg-muted/50 rounded-lg p-4">
                  <p class="text-3xl font-bold text-blue-600">99.9%</p>
                  <p class="text-muted-foreground text-xs">Uptime SLA</p>
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>

          <Motion :variants="childVariant" class="group relative">
            <UiCard class="h-full bg-transparent transition-all hover:shadow-xl">
              <UiCardContent class="flex h-full flex-col">
                <div
                  class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-emerald-500"
                >
                  <Icon name="lucide:shield-check" class="h-7 w-7 text-white" />
                </div>
                <h3 class="mb-2 text-xl font-bold">Secure by Default</h3>
                <p class="text-muted-foreground mb-4 text-sm">
                  Enterprise-grade security built into every layer.
                </p>
                <div class="mt-auto" />
                <ul class="space-y-2 text-sm">
                  <li class="flex items-center gap-2">
                    <Icon name="heroicons:check" class="h-4 w-4 text-green-600" />
                    <span>SOC 2 Certified</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon name="heroicons:check" class="h-4 w-4 text-green-600" />
                    <span>GDPR Compliant</span>
                  </li>
                </ul>
              </UiCardContent>
            </UiCard>
          </Motion>

          <Motion :variants="childVariant" class="group relative md:col-span-2">
            <UiCard class="h-full bg-transparent transition-all hover:shadow-xl">
              <UiCardContent class="flex h-full flex-col">
                <div class="mb-6 flex items-center gap-4">
                  <div
                    class="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-red-500"
                  >
                    <Icon name="lucide:users" class="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold">Team Collaboration</h3>
                    <p class="text-muted-foreground text-sm">Work together seamlessly</p>
                  </div>
                </div>
                <div class="mt-auto" />
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-muted/50 rounded-lg p-4 text-center">
                    <p class="text-2xl font-bold text-orange-600">50+</p>
                    <p class="text-muted-foreground text-xs">Integrations</p>
                  </div>
                  <div class="bg-muted/50 rounded-lg p-4 text-center">
                    <p class="text-2xl font-bold text-orange-600">24/7</p>
                    <p class="text-muted-foreground text-xs">Support</p>
                  </div>
                  <div class="bg-muted/50 rounded-lg p-4 text-center">
                    <p class="text-2xl font-bold text-orange-600">100%</p>
                    <p class="text-muted-foreground text-xs">Satisfaction</p>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>

          <Motion :variants="childVariant" class="group relative">
            <UiCard class="h-full bg-transparent transition-all hover:shadow-xl">
              <UiCardContent class="flex h-full flex-col">
                <div
                  class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-500"
                >
                  <Icon name="lucide:rocket" class="h-7 w-7 text-white" />
                </div>
                <h3 class="mb-2 text-xl font-bold">Deploy Anywhere</h3>
                <p class="text-muted-foreground text-sm">
                  Multi-cloud support with one-click deployment.
                </p>
              </UiCardContent>
            </UiCard>
          </Motion>
        </Motion>
      </UiContainer>
    </Motion>
  </div>
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
        delayChildren: stagger(0.1),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.1),
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>

<style>
  @keyframes blob {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }

  .animate-blob {
    animation: blob 15s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
</style>
