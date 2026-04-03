<template>
  <div class="relative overflow-hidden bg-slate-950 py-16 text-slate-50 lg:py-24">
    <!-- Dark gradient background with mesh -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black" />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"
      />
    </div>

    <!-- Floating orbs with GSAP animation -->
    <div ref="orb1" class="absolute top-1/4 left-1/4 hidden lg:block">
      <div
        class="h-96 w-96 rounded-full bg-linear-to-r from-primary/30 to-purple-500/30 blur-3xl"
      />
    </div>
    <div ref="orb2" class="absolute right-1/4 bottom-1/4 hidden lg:block">
      <div
        class="h-96 w-96 rounded-full bg-linear-to-r from-pink-500/30 to-orange-500/30 blur-3xl"
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
        <div class="mx-auto max-w-[800px] text-center">
          <Motion
            :variants="childVariant"
            class="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <div class="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span class="text-sm font-medium">Revolutionary Technology</span>
          </Motion>
          <Motion as="h2" :variants="childVariant" class="mb-6 text-4xl font-bold lg:text-6xl">
            Build the future with
            <span
              class="bg-linear-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              cutting-edge tools
            </span>
          </Motion>
          <Motion as="p" :variants="childVariant" class="text-lg text-slate-400 lg:text-xl">
            Experience the next generation of development with our comprehensive platform.
          </Motion>
        </div>

        <Motion
          as="div"
          class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-24 lg:gap-8"
          :variants="parentVariant"
          initial="initial"
          while-in-view="animate"
          :in-view-options="{ once: true }"
        >
          <Motion
            v-for="(feature, i) in features"
            :key="i"
            class="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm hover:border-primary/50 hover:bg-slate-900/80"
            :variants="childVariant"
          >
            <!-- Gradient border effect -->
            <div
              class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <div class="absolute inset-px rounded-2xl bg-slate-900" />
              <div class="absolute inset-0 bg-linear-to-r" :class="feature.borderGradient" />
            </div>

            <div class="relative">
              <!-- Icon -->
              <div
                class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                :class="feature.iconBg"
              >
                <Icon :name="feature.icon" class="h-8 w-8 text-white" />
              </div>

              <!-- Title and description -->
              <h3 class="mb-3 text-2xl font-bold">{{ feature.title }}</h3>
              <p class="mb-6 text-slate-400">{{ feature.description }}</p>

              <!-- Features list -->
              <ul class="space-y-3">
                <li
                  v-for="(item, j) in feature.items"
                  :key="j"
                  class="flex items-center gap-3 text-sm text-slate-300"
                >
                  <div
                    class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20"
                  >
                    <Icon name="heroicons:check" class="h-3 w-3 text-primary" />
                  </div>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <!-- Stats -->
              <div
                v-if="feature.stat"
                class="mt-6 rounded-lg border border-slate-800 bg-slate-950/50 p-4"
              >
                <p class="text-3xl font-bold" :class="feature.statColor">
                  {{ feature.stat.value }}
                </p>
                <p class="text-sm text-slate-400">{{ feature.stat.label }}</p>
              </div>
            </div>

            <!-- Glow on hover -->
            <div
              class="absolute -inset-0.5 -z-20 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
              :class="feature.glow"
            />
          </Motion>
        </Motion>

        <Motion :variants="childVariant" class="mt-16 text-center">
          <UiButton size="lg" class="group bg-primary hover:bg-primary/90">
            Get Started Now
            <Icon
              name="heroicons:arrow-right"
              class="ml-2 size-5 transition-transform group-hover:translate-x-1"
            />
          </UiButton>
        </Motion>
      </UiContainer>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
  import gsap from "gsap";
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";
  import { onMounted, ref } from "vue";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.12),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 30 },
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

  const orb1 = ref<HTMLElement | null>(null);
  const orb2 = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (orb1.value) {
      gsap.to(orb1.value, {
        x: 100,
        y: -50,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (orb2.value) {
      gsap.to(orb2.value, {
        x: -180,
        y: 160,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });

  const features = [
    {
      icon: "lucide:code-2",
      title: "Developer Experience",
      description:
        "Built with developers in mind, featuring intuitive APIs and comprehensive documentation.",
      items: ["TypeScript support", "Auto-completion", "Live reload"],
      stat: { value: "10x", label: "Faster development", color: "text-blue-400" },
      iconBg: "from-blue-500 to-cyan-500",
      borderGradient: "from-blue-500/50 to-cyan-500/50",
      glow: "bg-linear-to-r from-blue-500/50 to-cyan-500/50",
      statColor: "text-blue-400",
    },
    {
      icon: "lucide:zap",
      title: "Blazing Performance",
      description: "Optimized for speed with edge computing and intelligent caching strategies.",
      items: ["Edge runtime", "Global CDN", "Incremental builds"],
      stat: { value: "99.9%", label: "Uptime guarantee", color: "text-green-400" },
      iconBg: "from-green-500 to-emerald-500",
      borderGradient: "from-green-500/50 to-emerald-500/50",
      glow: "bg-linear-to-r from-green-500/50 to-emerald-500/50",
      statColor: "text-green-400",
    },
    {
      icon: "lucide:shield",
      title: "Enterprise Security",
      description:
        "Bank-level security with automatic threat detection and compliance certifications.",
      items: ["SOC 2 certified", "GDPR compliant", "Encrypted at rest"],
      stat: { value: "0", label: "Security incidents", color: "text-purple-400" },
      iconBg: "from-purple-500 to-pink-500",
      borderGradient: "from-purple-500/50 to-pink-500/50",
      glow: "bg-linear-to-r from-purple-500/50 to-pink-500/50",
      statColor: "text-purple-400",
    },
    {
      icon: "lucide:globe",
      title: "Global Scale",
      description: "Deploy to 200+ edge locations worldwide for lightning-fast global performance.",
      items: ["Multi-region support", "Auto-scaling", "Load balancing"],
      stat: { value: "200+", label: "Edge locations", color: "text-orange-400" },
      iconBg: "from-orange-500 to-red-500",
      borderGradient: "from-orange-500/50 to-red-500/50",
      glow: "bg-linear-to-r from-orange-500/50 to-red-500/50",
      statColor: "text-orange-400",
    },
  ];
</script>
