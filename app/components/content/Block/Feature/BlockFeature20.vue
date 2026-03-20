<template>
  <div
    class="relative overflow-hidden bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-16 text-white lg:py-24"
  >
    <!-- Animated gradient background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <div
        class="absolute top-0 left-0 h-full w-1/2 bg-linear-to-br from-purple-600/20 to-transparent"
      />
      <div
        class="absolute right-0 bottom-0 h-full w-1/2 bg-linear-to-tl from-pink-600/20 to-transparent"
      />
    </div>

    <!-- Floating particles -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-1/4 left-1/4 h-2 w-2 animate-ping rounded-full bg-purple-400" />
      <div
        class="animation-delay-1000 absolute top-1/3 right-1/4 h-2 w-2 animate-ping rounded-full bg-pink-400"
      />
      <div
        class="animation-delay-2000 absolute bottom-1/4 left-1/3 h-2 w-2 animate-ping rounded-full bg-blue-400"
      />
    </div>

    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer>
        <Motion :variants="childVariant">
          <div class="mx-auto max-w-[800px] text-center">
            <div
              class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
            >
              <div class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"
                />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
              </div>
              <span class="text-sm font-medium">Live Platform</span>
            </div>
            <h2 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-6xl">
              The ultimate platform for
              <span
                class="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              >
                modern development
              </span>
            </h2>
            <p class="text-lg text-purple-200 lg:text-xl">
              Experience glassmorphism design with powerful features that elevate your workflow.
            </p>
          </div>
        </Motion>

        <Motion
          as="div"
          class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-24 lg:gap-8"
          :variants="parentVariant"
          initial="initial"
          while-in-view="animate"
          :in-view-options="{ once: true }"
        >
          <Motion
            v-for="(feature, i) in features"
            :key="i"
            class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-white/20 hover:bg-white/10 hover:shadow-2xl"
            :variants="childVariant"
          >
            <!-- Glass effect shimmer -->
            <div
              class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <div class="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
            </div>

            <!-- Icon with glow -->
            <div class="relative mb-6">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                :class="feature.iconBg"
              >
                <Icon :name="feature.icon" class="h-8 w-8 text-white" />
              </div>
            </div>
            <div
              class="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity group-hover:opacity-20"
              :class="feature.glow"
            />

            <h3 class="mb-3 text-2xl font-bold">{{ feature.title }}</h3>
            <p class="mb-6 text-purple-200">{{ feature.description }}</p>

            <!-- Feature highlights -->
            <div class="space-y-3">
              <Motion
                v-for="(highlight, j) in feature.highlights"
                :key="j"
                :variants="{
                  initial: { opacity: 0, x: -20 },
                  animate: {
                    opacity: 1,
                    x: 0,
                    transition: { type: 'spring', stiffness: 100, damping: 20 },
                  },
                }"
                class="flex items-center gap-3 text-sm text-purple-100"
              >
                <div
                  class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10"
                >
                  <Icon name="heroicons:check" class="h-3 w-3" />
                </div>
                <span>{{ highlight }}</span>
              </Motion>
            </div>

            <!-- Metric -->
            <div class="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p class="text-4xl font-bold" :class="feature.metricColor">{{ feature.metric }}</p>
              <p class="text-sm text-purple-200">{{ feature.metricLabel }}</p>
            </div>

            <!-- Bottom gradient line -->
            <div
              class="absolute right-0 bottom-0 left-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <div class="h-full bg-linear-to-r" :class="feature.gradientLine" />
            </div>
          </Motion>
        </Motion>

        <!-- CTA Section -->
        <Motion :variants="childVariant" class="mt-16 text-center lg:mt-24">
          <div
            class="mx-auto max-w-[600px] rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl lg:p-12"
          >
            <h3 class="mb-4 text-2xl font-bold lg:text-3xl">Ready to get started?</h3>
            <p class="mb-6 text-purple-200">
              Join thousands of developers building the future with our platform.
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <UiButton size="lg" class="group">
                Start Free Trial
                <Icon
                  name="heroicons:arrow-right"
                  class="ml-2 size-5 transition-transform group-hover:translate-x-1"
                />
              </UiButton>
              <UiButton
                size="lg"
                variant="outline"
                class="border-white/20 bg-white/5 hover:bg-white/10"
              >
                View Pricing
              </UiButton>
            </div>
          </div>
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

  const features = [
    {
      icon: "lucide:layers",
      title: "Modular Design",
      description: "Build with reusable components and scale effortlessly as your needs grow.",
      highlights: ["Component library", "Design system", "Customizable themes"],
      metric: "500+",
      metricLabel: "Pre-built components",
      metricColor: "text-purple-400",
      iconBg: "from-purple-500 to-pink-500",
      glow: "bg-purple-500",
      gradientLine: "from-purple-500 via-pink-500 to-purple-500",
    },
    {
      icon: "lucide:cpu",
      title: "Edge Computing",
      description: "Deploy to the edge for lightning-fast performance across the globe.",
      highlights: ["Global distribution", "Edge functions", "Smart routing"],
      metric: "<50ms",
      metricLabel: "Average latency",
      metricColor: "text-blue-400",
      iconBg: "from-blue-500 to-cyan-500",
      glow: "bg-blue-500",
      gradientLine: "from-blue-500 via-cyan-500 to-blue-500",
    },
    {
      icon: "lucide:sparkles",
      title: "AI Integration",
      description: "Leverage cutting-edge AI to automate workflows and gain insights.",
      highlights: ["Natural language processing", "Predictive analytics", "Smart automation"],
      metric: "10x",
      metricLabel: "Productivity boost",
      metricColor: "text-pink-400",
      iconBg: "from-pink-500 to-orange-500",
      glow: "bg-pink-500",
      gradientLine: "from-pink-500 via-orange-500 to-pink-500",
    },
  ];
</script>

<style scoped>
  .animation-delay-1000 {
    animation-delay: 1s;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }
</style>
