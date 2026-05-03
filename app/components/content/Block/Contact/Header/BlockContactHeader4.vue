<template>
  <!-- 
    Contact information cards with icons
    Features: Three-column info cards, icon badges, staggered animations
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
    <UiContainer class="pb-10">
      <UiContainer class="py-16 text-center">
        <slot name="headline">
          <Motion
            v-if="headline"
            as="p"
            :variants="childVariant"
            class="text-primary font-semibold"
          >
            {{ headline }}
          </Motion>
        </slot>
        <slot name="title">
          <Motion
            as="h2"
            :variants="childVariant"
            class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
          >
            {{ title }}
          </Motion>
        </slot>
        <slot name="description">
          <Motion
            as="p"
            :variants="childVariant"
            class="text-muted-foreground mx-auto max-w-[800px] text-lg lg:text-xl"
          >
            {{ description }}
          </Motion>
        </slot>
      </UiContainer>
      <section class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <template v-for="c in contactInfo" :key="c.title">
          <Motion
            :variants="childVariant"
            class="group border-border bg-card flex flex-col items-center gap-2 rounded-lg border p-6 transition-shadow hover:shadow-lg"
          >
            <div
              class="bg-primary/20 group-hover:bg-primary/30 flex h-12 w-12 items-center justify-center rounded-full transition-colors"
            >
              <Icon :name="c.icon" class="text-primary h-6 w-6" />
            </div>
            <h3 class="mt-4 text-lg font-medium lg:text-xl">{{ c.title }}</h3>
            <p class="text-muted-foreground text-center">
              {{ c.description }}
            </p>
            <a
              :href="c.link"
              target="_blank"
              class="text-primary text-center font-medium hover:underline"
            >
              {{ c.value }}
            </a>
          </Motion>
        </template>
      </section>
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

  const contactInfo = [
    {
      title: "Email",
      description: "Our friendly team is here to help.",
      value: "admin@marketplace.com",
      icon: "heroicons:envelope",
      link: "mailto:admin@marketplace.com",
    },
    {
      title: "Office",
      description: "Come say hello at our office HQ.",
      value: "100 West Road, Cityvale, SomeCountry",
      icon: "heroicons:map-pin",
      link: "#",
    },
    {
      title: "Phone",
      description: "Mon-Fri from 8am to 5pm.",
      value: "1-800-123-4567",
      icon: "heroicons:phone",
      link: "tel:1-800-123-4567",
    },
  ];

  const headline = "Contact us";
  const title = "We'd love to hear from you";
  const description = "Our friendly team is always here to chat.";
</script>
