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
    <div class="flex flex-col gap-5 md:flex-row">
      <Motion
        v-if="image"
        as-child
        class="block basis-full md:basis-[60%]"
        :variants="{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
        }"
      >
        <NuxtLink :to="link" class="shrink-0">
          <img
            :src="image"
            :alt="alt"
            class="h-[240px] w-full rounded-lg object-cover shadow md:h-[200px]"
          />
        </NuxtLink>
      </Motion>
      <div class="basis-full md:basis-[40%]">
        <Motion
          v-if="headline"
          as="p"
          :variants="childVariant"
          class="mb-2 text-sm font-semibold text-primary"
          >{{ headline }}</Motion
        >
        <Motion as-child :variants="childVariant" class="block">
          <NuxtLink :to="link">
            <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ title }}</p>
          </NuxtLink>
        </Motion>
        <Motion
          v-if="description"
          as="p"
          :variants="childVariant"
          class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground"
        >
          {{ description }}
        </Motion>
        <Motion :variants="childVariant" class="flex items-center">
          <UiAvatar
            v-if="userImage"
            :src="userImage"
            :alt="userName"
            class="mr-3 rounded-full bg-background shadow ring-1 ring-ring/30"
          />
          <div>
            <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
            <p v-if="date" class="text-sm text-muted-foreground">{{ date }}</p>
          </div>
        </Motion>
      </div>
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
      userImage?: string;
      userName?: string;
      date?: string;
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
      link: "#",
    }
  );
</script>
