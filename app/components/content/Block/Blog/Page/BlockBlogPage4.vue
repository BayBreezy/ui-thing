<template>
  <!-- 
    Minimal blog page with search-focused design
    Features: Large search bar, trending topics chips, minimal two-column grid
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
    <UiContainer class="py-16 lg:py-24">
      <!-- Minimal centered header -->
      <div class="mx-auto max-w-3xl text-center">
        <Motion
          as="h1"
          :variants="childVariant"
          class="mb-4 text-4xl font-bold lg:mb-6 lg:text-6xl"
        >
          Blog
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="mb-8 text-lg text-muted-foreground lg:text-xl"
        >
          Discover stories, thinking, and expertise from writers on any topic
        </Motion>

        <!-- Large search bar -->
        <Motion :variants="childVariant" class="relative mx-auto max-w-md">
          <UiVeeInput placeholder="Search articles..." icon="lucide:search" class="" />
        </Motion>

        <!-- Trending topics -->
        <Motion :variants="childVariant" class="mt-6">
          <p class="mb-6 text-sm font-semibold text-muted-foreground">Trending topics</p>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <Motion
              v-for="(topic, index) in trendingTopics"
              :key="topic"
              :variants="{
                initial: { opacity: 0, scale: 0.8 },
                animate: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: index * 0.05,
                  },
                },
              }"
              as-child
            >
              <UiBadge
                variant="outline"
                class="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {{ topic }}
              </UiBadge>
            </Motion>
          </div>
        </Motion>
      </div>

      <!-- Articles grid - Two column minimal layout -->
      <section class="mx-auto mt-16 max-w-4xl lg:mt-24">
        <Motion :variants="childVariant" class="mb-8 flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Recent articles</h2>
          <UiButton variant="ghost" size="sm">
            View all
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </UiButton>
        </Motion>

        <div class="space-y-8">
          <Motion
            v-for="n in 6"
            :key="n"
            :variants="childVariant"
            :transition="{
              delay: n * 0.05,
            }"
          >
            <UiDivider v-if="n > 1" class="my-8" />
            <div class="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
              <!-- Image -->
              <NuxtLink :to="link" class="group md:col-span-5">
                <img
                  :src="image"
                  :alt="alt"
                  class="h-[200px] w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg md:h-[180px]"
                />
              </NuxtLink>

              <!-- Content -->
              <div class="md:col-span-7">
                <div class="mb-3 flex items-center gap-2">
                  <UiAvatar :src="userImage" :alt="userName" size="xs" />
                  <span class="text-sm font-medium">{{ userName }}</span>
                  <span class="text-sm text-muted-foreground">·</span>
                  <span class="text-sm text-muted-foreground">{{ date }}</span>
                </div>
                <NuxtLink :to="link">
                  <h3
                    class="mb-2 text-xl font-semibold transition-colors hover:text-primary lg:text-2xl"
                  >
                    {{ title }}
                  </h3>
                </NuxtLink>
                <p class="mb-3 line-clamp-2 text-muted-foreground">{{ description }}</p>
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:clock" class="h-4 w-4" />
                    5 min read
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:bookmark" class="h-4 w-4" />
                    Save
                  </span>
                </div>
              </div>
            </div>
          </Motion>
        </div>

        <!-- Load more -->
        <Motion :variants="childVariant" class="mt-12 text-center">
          <UiButton size="lg" variant="outline">Load more articles</UiButton>
        </Motion>
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

  const trendingTopics = [
    "AI & Machine Learning",
    "Web Development",
    "Design Systems",
    "UX Research",
    "Product Management",
  ];

  const title = "The future of web development in 2024";
  const image =
    "https://images.unsplash.com/photo-1524169220946-12efd782aab4?q=80&w=2070&auto=format&fit=crop";
  const alt = "Web development";
  const description =
    "Explore the latest trends and technologies shaping the future of web development.";
  const date = "Mar 15, 2024";
  const userImage = "https://i.pravatar.cc/300?img=20";
  const userName = "Emily Chen";
  const link = "#";
</script>
