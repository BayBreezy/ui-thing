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
          <h2 class="mb-4 text-3xl font-semibold lg:mb-5 lg:text-4xl">Why choose our platform?</h2>
          <p class="text-muted-foreground text-lg lg:text-xl">
            Discover the features that make us the best choice for your business.
          </p>
        </div>
      </Motion>

      <Motion
        as="div"
        class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8"
        :variants="parentVariant"
        initial="initial"
        while-in-view="animate"
        :in-view-options="{ once: true }"
      >
        <Motion
          v-for="(feature, i) in features"
          :key="i"
          class="group bg-card relative overflow-hidden rounded-xl border p-6 hover:shadow-xl lg:p-8"
          :variants="childVariant"
        >
          <div class="relative z-10">
            <div class="mb-4 inline-flex items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-lg transition-all group-hover:scale-110"
                :class="feature.bgClass"
              >
                <Icon :name="feature.icon" class="h-6 w-6" :class="feature.iconClass" />
              </div>
              <UiBadge v-if="feature.badge" variant="secondary">{{ feature.badge }}</UiBadge>
            </div>

            <h3 class="mb-3 text-xl font-semibold lg:text-2xl">{{ feature.title }}</h3>
            <p class="text-muted-foreground mb-6">{{ feature.description }}</p>

            <div class="space-y-3">
              <div
                v-for="(point, j) in feature.points"
                :key="j"
                class="flex items-start gap-2 transition-transform duration-300 hover:translate-x-1"
              >
                <Icon name="heroicons:check-circle" class="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span class="text-sm">{{ point }}</span>
              </div>
            </div>

            <div class="text-primary mt-6 flex items-center gap-2 text-sm font-semibold">
              <span>Explore feature</span>
              <Icon
                name="heroicons:arrow-right"
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>

          <!-- Hover effect -->
          <div
            class="absolute -top-10 -right-10 size-44 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            :class="feature.glowClass"
          />
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
        delayChildren: stagger(0.12),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 30, rotateX: 10 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
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
      icon: "lucide:zap",
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with our optimized infrastructure.",
      badge: "Popular",
      bgClass: "bg-yellow-500/10",
      iconClass: "text-yellow-500",
      glowClass: "bg-yellow-500/30",
      points: [
        "Global CDN distribution",
        "Edge caching for instant delivery",
        "Optimized asset loading",
      ],
    },
    {
      icon: "lucide:shield",
      title: "Enterprise Security",
      description: "Keep your data safe with bank-grade security and compliance.",
      bgClass: "bg-blue-500/10",
      iconClass: "text-blue-500",
      glowClass: "bg-blue-500/30",
      points: ["End-to-end encryption", "SOC 2 Type II certified", "Regular security audits"],
    },
    {
      icon: "lucide:scaling",
      title: "Auto Scaling",
      description: "Handle any traffic spike without breaking a sweat.",
      bgClass: "bg-green-500/10",
      iconClass: "text-green-500",
      glowClass: "bg-green-500/30",
      points: [
        "Automatic resource allocation",
        "Load balancing across regions",
        "Zero-downtime deployments",
      ],
    },
    {
      icon: "lucide:bot",
      title: "AI-Powered",
      description: "Leverage artificial intelligence to automate and optimize.",
      badge: "New",
      bgClass: "bg-purple-500/10",
      iconClass: "text-purple-500",
      glowClass: "bg-purple-500/30",
      points: ["Smart recommendations", "Automated workflows", "Predictive analytics"],
    },
    {
      icon: "lucide:globe",
      title: "Global Reach",
      description: "Deploy to 200+ locations worldwide with a single click.",
      bgClass: "bg-cyan-500/10",
      iconClass: "text-cyan-500",
      glowClass: "bg-cyan-500/30",
      points: ["Multi-region deployment", "Geo-routing optimization", "Local data compliance"],
    },
    {
      icon: "lucide:chart-line",
      title: "Advanced Analytics",
      description: "Make data-driven decisions with comprehensive insights.",
      bgClass: "bg-orange-500/10",
      iconClass: "text-orange-500",
      glowClass: "bg-orange-500/30",
      points: ["Real-time metrics dashboard", "Custom report builder", "API usage tracking"],
    },
  ];
</script>
