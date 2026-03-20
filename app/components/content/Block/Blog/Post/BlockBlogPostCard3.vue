<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <Motion v-if="image" as-child class="block" :variants="childVariant">
      <NuxtLink :to="link">
        <img :src="image" :alt="alt" class="mb-5 h-[240px] w-full rounded-lg object-cover shadow" />
      </NuxtLink>
    </Motion>
    <Motion
      v-if="headline"
      as="p"
      :variants="childVariant"
      class="mb-2 text-sm font-semibold text-primary"
    >
      {{ headline }} <span v-if="date">- {{ date }}</span>
    </Motion>
    <NuxtLink :to="link">
      <Motion as="p" :variants="childVariant" class="mb-2 text-xl font-semibold lg:text-2xl">{{
        title
      }}</Motion>
    </NuxtLink>
    <Motion
      v-if="description"
      as="p"
      :variants="childVariant"
      class="mb-3 line-clamp-2 text-ellipsis text-muted-foreground"
    >
      {{ description }}
    </Motion>
    <div class="flex flex-wrap items-center gap-2">
      <template v-for="t in tags" :key="t">
        <Motion v-if="headline" as-child :variants="childVariant">
          <UiBadge class="px-2 py-0.5 text-sm" variant="outline">{{ t }}</UiBadge>
        </Motion>
      </template>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "keyframes",
        ease: "easeOut",
        when: "beforeChildren",
        delayChildren: stagger(0.1),
      },
    },
  };

  withDefaults(
    defineProps<{
      image?: string;
      alt?: string;
      headline?: string;
      description?: string;
      title?: string;
      date?: string;
      tags?: string[];
      link?: string;
    }>(),
    {
      headline: "Design",
      title: "UX review presentations",
      image:
        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      date: "30 Jan 2024",
      readTime: "5 min read",
      tags: () => ["Design", "UX", "UI"],
      link: "#",
    }
  );
</script>
