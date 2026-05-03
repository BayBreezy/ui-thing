<template>
  <div class="bg-muted/30 py-16 lg:py-24">
    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer>
        <Motion as-child :variants="childVariant">
          <div class="mb-12 text-center">
            <p class="text-primary mb-3 text-sm font-semibold tracking-wider uppercase">
              Testimonials
            </p>
            <h2 class="mb-4 text-3xl font-bold lg:text-4xl">What our customers say</h2>
            <div class="mx-auto flex flex-col items-center justify-center gap-2 md:flex-row">
              <div class="flex">
                <Icon
                  v-for="s in 5"
                  :key="s"
                  name="material-symbols:kid-star"
                  class="size-6 fill-yellow-400 text-yellow-400"
                />
              </div>
              <p class="text-lg font-semibold">4.9 out of 5</p>
              <p class="text-muted-foreground">(2,458 reviews)</p>
            </div>
          </div>
        </Motion>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Motion
            v-for="(testimonial, index) in testimonials"
            :key="index"
            as-child
            :variants="cardVariant"
          >
            <UiCard class="p-6">
              <div class="mb-4 flex">
                <Icon
                  v-for="s in 5"
                  :key="s"
                  name="material-symbols:kid-star"
                  class="size-5 fill-yellow-400 text-yellow-400"
                />
              </div>
              <p class="text-muted-foreground mb-6">{{ testimonial.quote }}</p>
              <div class="flex items-center gap-3">
                <UiAvatar :src="testimonial.avatar" />
                <div>
                  <p class="font-semibold">{{ testimonial.name }}</p>
                  <p class="text-muted-foreground text-sm">{{ testimonial.role }}</p>
                </div>
              </div>
            </UiCard>
          </Motion>
        </div>

        <Motion as-child :variants="logoSectionVariant">
          <div class="mt-16">
            <p class="text-muted-foreground mb-8 text-center text-sm">
              Trusted by leading companies worldwide
            </p>
            <div
              class="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0"
            >
              <Icon v-for="company in companies" :key="company" :name="company" class="h-12 w-12" />
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

  const testimonials = [
    {
      quote:
        "This platform has completely transformed how we work. The features are intuitive and powerful.",
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote: "Best investment we've made this year. Our team productivity has increased by 40%.",
      name: "Michael Chen",
      role: "CTO at StartupHub",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      quote: "Outstanding support and constant innovation. They truly care about their customers.",
      name: "Emily Rodriguez",
      role: "Product Manager at Innovate",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
  ];

  const companies = [
    "logos:100tb",
    "logos:aha",
    "logos:airbnb-icon",
    "logos:akamai",
    "logos:asana-icon",
  ];

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

  const cardVariant: MotionProps["variants"] = {
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

  const logoSectionVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };
</script>
