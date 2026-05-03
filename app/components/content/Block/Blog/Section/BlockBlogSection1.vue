<template>
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
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <UiContainer class="py-16 lg:py-24">
      <div class="flex flex-col md:flex-row md:justify-between">
        <div class="flex flex-col gap-3">
          <Motion as="p" :variants="textVariant" class="text-primary font-semibold"
            >Our blog</Motion
          >
          <Motion as="h3" :variants="textVariant" class="text-3xl font-semibold lg:text-4xl"
            >Our latest blog posts</Motion
          >
          <Motion as="p" :variants="textVariant" class="text-muted-foreground text-lg lg:text-xl">
            Tool and strategies modern teams need to help their companies grow.
          </Motion>
        </div>
        <Motion :variants="textVariant">
          <UiButton class="hidden shrink-0 whitespace-nowrap md:flex">View all posts</UiButton>
        </Motion>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-3">
        <Motion
          v-for="item in 3"
          :key="item"
          :variants="textVariant"
          :transition="{
            delay: item * 0.1,
          }"
        >
          <Motion
            as-child
            :variants="{
              initial: { opacity: 0, y: 10, scale: 0.95 },
              animate: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, ease: 'easeOut' },
              },
            }"
            class="block"
          >
            <NuxtLink :to="link">
              <img
                v-if="image"
                :src="image"
                :alt="alt"
                class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
              />
            </NuxtLink>
          </Motion>
          <Motion
            v-if="headline"
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
            as="p"
            class="text-primary mb-2 text-sm font-semibold"
            >{{ headline }}</Motion
          >
          <NuxtLink :to="link">
            <Motion
              :variants="{
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
              }"
              as="p"
              class="mb-2 text-xl font-semibold lg:text-2xl"
              >{{ title }}</Motion
            >
          </NuxtLink>
          <Motion
            v-if="description"
            as="p"
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
            class="text-muted-foreground mb-5 line-clamp-2 text-ellipsis"
          >
            {{ description }}
          </Motion>
          <div class="flex items-center">
            <Motion
              v-if="userImage"
              :variants="{
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
              }"
              as-child
            >
              <UiAvatar
                :src="userImage"
                :alt="userName"
                class="bg-background ring-ring/30 mr-3 rounded-full shadow ring-1"
              />
            </Motion>
            <div>
              <Motion
                v-if="userName"
                :variants="{
                  initial: { opacity: 0, x: 10 },
                  animate: { opacity: 1, x: 0 },
                }"
                as="p"
                class="text-sm font-semibold"
                >{{ userName }}</Motion
              >
              <Motion
                v-if="date"
                :variants="{
                  initial: { opacity: 0, x: 10 },
                  animate: { opacity: 1, x: 0 },
                }"
                as="p"
                class="text-muted-foreground text-sm"
                >{{ date }}</Motion
              >
            </div>
          </div>
        </Motion>
      </div>
      <Motion as-child :variants="textVariant">
        <UiButton class="mt-10 w-full shrink-0 whitespace-nowrap md:hidden"
          >View all posts</UiButton
        >
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  /** This blog section is using the cards from BlockBlogPostCard1.vue and rendering them in a loop. */
  import { stagger } from "motion-v";

  const textVariant = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.15),
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
      readTime: "5 min read",
      tags: ["Design", "UX", "UI"],
      link: "#",
    }
  );
</script>
