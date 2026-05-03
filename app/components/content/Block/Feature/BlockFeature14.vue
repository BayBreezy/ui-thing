<template>
  <div class="relative overflow-hidden py-16 lg:py-24">
    <!-- Background decoration -->
    <div class="absolute inset-0">
      <div
        class="bg-primary/5 absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl"
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
          <div class="mx-auto max-w-[760px] text-center">
            <UiBadge variant="outline" class="mb-4">Our Services</UiBadge>
            <h2 class="mb-4 text-3xl font-semibold lg:mb-5 lg:text-4xl">
              Professional services tailored to your needs
            </h2>
            <p class="text-muted-foreground text-lg lg:text-xl">
              We offer comprehensive solutions to help your business thrive in the digital age.
            </p>
          </div>
        </Motion>

        <div
          as="div"
          class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
        >
          <Motion
            v-for="(service, i) in services"
            :key="i"
            class="group bg-card hover:border-primary relative overflow-hidden rounded-lg border p-6 hover:shadow-lg lg:p-6"
            :variants="childVariant"
          >
            <div class="relative z-10 flex h-full flex-col">
              <div
                class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg transition-colors"
                :class="service.bgClass"
              >
                <Icon :name="service.icon" class="h-7 w-7" :class="service.iconClass" />
              </div>
              <h3 class="mb-3 text-xl font-semibold lg:text-2xl">{{ service.title }}</h3>
              <p class="text-muted-foreground mb-4">{{ service.description }}</p>
              <ul class="space-y-2">
                <li
                  v-for="(feature, j) in service.features"
                  :key="j"
                  class="flex items-center gap-2 text-sm"
                >
                  <Icon name="heroicons:check" class="text-primary h-4 w-4" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <div class="mt-auto" />
              <UiButton variant="ghost" class="group-hover:bg-primary/10 mt-6 w-full">
                Learn More
                <Icon
                  name="heroicons:arrow-right"
                  class="ml-2 size-4 transition-transform group-hover:translate-x-1"
                />
              </UiButton>
            </div>
            <div
              class="absolute -right-20 -bottom-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
              :class="service.glowClass"
            />
          </Motion>
        </div>
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

  const services = [
    {
      icon: "lucide:palette",
      title: "Design Services",
      description: "Create stunning, user-friendly designs that captivate your audience.",
      features: ["UI/UX Design", "Brand Identity", "Prototyping"],
      bgClass: "bg-blue-500/10",
      iconClass: "text-blue-500",
      glowClass: "bg-blue-500/20",
    },
    {
      icon: "lucide:code",
      title: "Development",
      description: "Build robust, scalable applications with cutting-edge technologies.",
      features: ["Web Development", "Mobile Apps", "API Integration"],
      bgClass: "bg-green-500/10",
      iconClass: "text-green-500",
      glowClass: "bg-green-500/20",
    },
    {
      icon: "lucide:megaphone",
      title: "Marketing",
      description: "Grow your brand with data-driven marketing strategies.",
      features: ["SEO Optimization", "Content Strategy", "Social Media"],
      bgClass: "bg-purple-500/10",
      iconClass: "text-purple-500",
      glowClass: "bg-purple-500/20",
    },
    {
      icon: "lucide:line-chart",
      title: "Analytics",
      description: "Make informed decisions with comprehensive data analysis.",
      features: ["Data Tracking", "Custom Reports", "Insights"],
      bgClass: "bg-orange-500/10",
      iconClass: "text-orange-500",
      glowClass: "bg-orange-500/20",
    },
    {
      icon: "lucide:shield-check",
      title: "Security",
      description: "Protect your business with enterprise-grade security solutions.",
      features: ["Threat Detection", "Compliance", "Monitoring"],
      bgClass: "bg-red-500/10",
      iconClass: "text-red-500",
      glowClass: "bg-red-500/20",
    },
    {
      icon: "lucide:headset",
      title: "Support",
      description: "Get expert help whenever you need it with 24/7 support.",
      features: ["Live Chat", "Phone Support", "Documentation"],
      bgClass: "bg-cyan-500/10",
      iconClass: "text-cyan-500",
      glowClass: "bg-cyan-500/20",
    },
  ];
</script>
