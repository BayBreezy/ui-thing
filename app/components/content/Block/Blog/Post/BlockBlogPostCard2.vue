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
    <Motion as-child class="block" :variants="childVariant">
      <NuxtLink :to="link">
        <img v-if="image" :src="image" :alt="alt" class="mb-5 h-[240px] w-full object-cover" />
      </NuxtLink>
    </Motion>

    <Motion v-if="headline || readTime" as-child :variants="childVariant">
      <UiBadge
        variant="outline"
        class="mb-2 rounded-none border-ring/50 px-3 py-1 text-sm font-medium text-primary"
        >{{ headline }} <span v-if="readTime" class="ml-1">{{ readTime }}</span></UiBadge
      >
    </Motion>
    <Motion as-child :variants="childVariant" class="block">
      <NuxtLink :to="link">
        <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ title }}</p>
      </NuxtLink>
    </Motion>
    <Motion
      v-if="description"
      as="p"
      :variants="childVariant"
      class="mb-4 line-clamp-2 text-ellipsis text-muted-foreground"
    >
      {{ description }}
    </Motion>
    <Motion :variants="childVariant" class="flex items-center">
      <UiAvatar
        v-if="userImage"
        :src="userImage"
        :alt="userName"
        class="mr-3 rounded-none bg-background shadow ring-1 ring-ring/30"
      />
      <div>
        <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
        <p v-if="date" class="text-sm text-muted-foreground">{{ date }}</p>
      </div>
    </Motion>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
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
      userImage?: string;
      userName?: string;
      date?: string;
      readTime?: string;
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
      userImage: "https://i.pravatar.cc/300?img=15",
      userName: "John Doe",
      readTime: "5 min read",
      tags: ["Design", "UX", "UI"],
      link: "#",
    }
  );
</script>
