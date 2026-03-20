<template>
  <!-- 
    Multiple locations with map showcase
    Features: Large map embed, location cards below, staggered animations
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
            class="font-semibold text-primary"
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
            class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl"
          >
            {{ description }}
          </Motion>
        </slot>
      </UiContainer>
      <Motion
        :variants="childVariant"
        class="h-[300px] w-full overflow-hidden rounded-lg shadow-lg lg:h-[450px] lg:rounded-xl"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60706.4783868638!2d-76.84185590241378!3d18.01801356612945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3e4e09940847%3A0xbcee137f153b407f!2sMegaMart%20Kingston!5e0!3m2!1sen!2sjm!4v1705346784307!5m2!1sen!2sjm"
          width="800"
          height="800"
          class="h-full w-full"
          style="border: 0"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </Motion>
      <section class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <template v-for="c in contactInfo" :key="c.title">
          <Motion
            :variants="childVariant"
            class="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 transition-colors group-hover:bg-primary/30"
            >
              <Icon :name="c.icon" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mt-4 text-lg font-medium lg:text-xl">{{ c.title }}</h3>
            <p class="text-center text-muted-foreground">
              {{ c.description }}
            </p>
            <a
              :href="c.link"
              target="_blank"
              class="text-center font-medium text-pretty text-primary hover:underline"
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
      title: "Head Office",
      description: "Mon-Sat 9am to 5pm.",
      value: "100 West Road, Cityvale, SomeCountry",
      icon: "heroicons:map-pin",
      link: "#",
    },
    {
      title: "Retail store",
      description: "Mon-Sat 9am to 5pm.",
      value: "13 Coast Road, Cityvale, SomeCountry",
      icon: "heroicons:map-pin",
      link: "#",
    },
    {
      title: "Showroom",
      description: "Mon-Sat 9am to 5pm.",
      value: "Lot 16 Flame Road, Cityvale, SomeCountry",
      icon: "heroicons:map-pin",
      link: "#",
    },
  ];

  const headline = "Contact us";
  const title = "Our Locations";
  const description = "Come visit our friendly team at one of our offices.";
</script>
