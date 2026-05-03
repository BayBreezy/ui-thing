<template>
  <div class="relative overflow-hidden py-16 lg:py-24">
    <!-- Gradient background -->
    <div class="from-primary/10 absolute inset-0 bg-linear-to-br via-purple-500/5 to-pink-500/10" />

    <!-- Floating elements -->
    <div class="absolute top-20 left-10 hidden lg:block">
      <div
        class="animate-float from-primary/20 h-64 w-64 rounded-full bg-linear-to-br to-purple-500/20 blur-3xl"
      />
    </div>

    <div class="absolute right-10 bottom-20 hidden lg:block">
      <div
        class="animate-float-delayed h-80 w-80 rounded-full bg-linear-to-br from-pink-500/20 to-orange-500/20 blur-3xl"
      />
    </div>

    <div class="absolute top-1/3 right-1/3 hidden lg:block">
      <div
        class="animate-pulse-slow h-48 w-48 rounded-full bg-linear-to-br from-cyan-500/20 to-blue-500/20 blur-3xl"
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
          <div class="mx-auto max-w-[800px] text-center">
            <UiBadge variant="outline" class="border-primary/50 bg-primary/10 mb-4">
              <Icon name="lucide:sparkles" class="mr-2 size-3" />
              Next-Generation Platform
            </UiBadge>
            <h2 class="mb-4 text-3xl font-bold lg:mb-6 lg:text-5xl">
              Transform your workflow with
              <span
                class="from-primary bg-linear-to-r via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                intelligent features
              </span>
            </h2>
            <p class="text-muted-foreground text-lg lg:text-xl">
              Harness the power of modern technology to streamline your operations and drive growth.
            </p>
          </div>
        </Motion>

        <Motion
          as="div"
          class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-8"
          :variants="parentVariant"
          initial="initial"
          while-in-view="animate"
          :in-view-options="{ once: true }"
        >
          <Motion
            v-for="(feature, i) in features"
            :key="i"
            class="group border-primary/20 bg-card/50 hover:border-primary/40 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm lg:p-8"
            :variants="childVariant"
          >
            <!-- Card gradient -->
            <div
              class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <div class="absolute inset-0 bg-linear-to-br" :class="feature.gradientClass" />
            </div>

            <div class="relative">
              <div
                class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br transition-transform duration-300 group-hover:scale-110"
                :class="feature.iconBgClass"
              >
                <Icon :name="feature.icon" class="h-7 w-7 text-white" />
              </div>

              <h3 class="mb-3 text-xl font-semibold lg:text-2xl">{{ feature.title }}</h3>
              <p class="text-muted-foreground mb-6">{{ feature.description }}</p>

              <div class="flex flex-wrap gap-2">
                <UiBadge
                  v-for="(tag, j) in feature.tags"
                  :key="j"
                  variant="outline"
                  class="text-xs"
                >
                  {{ tag }}
                </UiBadge>
              </div>

              <!-- Animated indicator -->
              <div
                class="text-primary mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100"
              >
                <span>Learn more</span>
                <Icon name="heroicons:arrow-right" class="animate-bounce-horizontal h-4 w-4" />
              </div>
            </div>

            <!-- Glow effect -->
            <div
              class="absolute -inset-px -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 dark:group-hover:opacity-100"
              :class="feature.glowClass"
            />
          </Motion>
        </Motion>

        <Motion :variants="childVariant" class="mt-12 text-center lg:mt-16">
          <UiButton size="lg" class="group">
            Start Building Today
            <Icon
              name="heroicons:rocket-launch"
              class="ml-2 size-5 transition-transform group-hover:translate-x-1"
            />
          </UiButton>
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
      icon: "lucide:brain",
      title: "AI-Powered Insights",
      description: "Leverage machine learning to uncover patterns and predictions in your data.",
      tags: ["ML", "Automation", "Analytics"],
      gradientClass: "from-purple-500/10 to-pink-500/10",
      iconBgClass: "from-purple-500 to-pink-500",
      glowClass: "bg-linear-to-br from-purple-500/50 to-pink-500/50",
    },
    {
      icon: "lucide:rocket",
      title: "Instant Deployment",
      description: "Go from code to production in seconds with our streamlined pipeline.",
      tags: ["CI/CD", "DevOps", "Speed"],
      gradientClass: "from-blue-500/10 to-cyan-500/10",
      iconBgClass: "from-blue-500 to-cyan-500",
      glowClass: "bg-linear-to-br from-blue-500/50 to-cyan-500/50",
    },
    {
      icon: "lucide:layers",
      title: "Modular Architecture",
      description: "Build scalable applications with our flexible component system.",
      tags: ["Flexible", "Scalable", "Modern"],
      gradientClass: "from-green-500/10 to-emerald-500/10",
      iconBgClass: "from-green-500 to-emerald-500",
      glowClass: "bg-linear-to-br from-green-500/50 to-emerald-500/50",
    },
    {
      icon: "lucide:shield-check",
      title: "Advanced Security",
      description: "Enterprise-grade protection with automated threat detection.",
      tags: ["Secure", "Compliant", "Protected"],
      gradientClass: "from-red-500/10 to-orange-500/10",
      iconBgClass: "from-red-500 to-orange-500",
      glowClass: "bg-linear-to-br from-red-500/50 to-orange-500/50",
    },
    {
      icon: "lucide:git-branch",
      title: "Version Control",
      description: "Track changes, collaborate seamlessly, and never lose progress.",
      tags: ["Git", "Collaboration", "History"],
      gradientClass: "from-indigo-500/10 to-violet-500/10",
      iconBgClass: "from-indigo-500 to-violet-500",
      glowClass: "bg-linear-to-br from-indigo-500/50 to-violet-500/50",
    },
    {
      icon: "lucide:gauge",
      title: "Real-time Monitoring",
      description: "Keep track of performance metrics and health with live dashboards.",
      tags: ["Metrics", "Monitoring", "Live"],
      gradientClass: "from-amber-500/10 to-yellow-500/10",
      iconBgClass: "from-amber-500 to-yellow-500",
      glowClass: "bg-linear-to-br from-amber-500/50 to-yellow-500/50",
    },
  ];
</script>

<style>
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes float-delayed {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-30px);
    }
  }

  @keyframes pulse-slow {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }

  @keyframes bounce-horizontal {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(4px);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }

  .animate-bounce-horizontal {
    animation: bounce-horizontal 1s ease-in-out infinite;
  }
</style>
