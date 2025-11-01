<template>
  <!-- 
    Masonry-style blog grid with staggered card heights
    Features: Mixed card sizes, category filters, load more button
  -->
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.12),
        },
      },
    }"
  >
    <UiContainer class="py-16 lg:py-24">
      <!-- Header with filter tabs -->
      <div class="mb-12 flex flex-col gap-6 lg:mb-16">
        <div class="flex flex-col gap-3">
          <Motion as="h3" :variants="childVariant" class="text-3xl font-semibold lg:text-4xl">
            Browse our articles
          </Motion>
          <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground lg:text-xl">
            Discover insights across design, development, and business
          </Motion>
        </div>

        <!-- Category filter tabs -->
        <Motion :variants="childVariant">
          <UiTabs default-value="all" class="w-full">
            <UiTabsList class="w-full overflow-x-auto">
              <UiTabsTrigger value="all">All posts</UiTabsTrigger>
              <UiTabsTrigger value="design">Design</UiTabsTrigger>
              <UiTabsTrigger value="dev">Development</UiTabsTrigger>
              <UiTabsTrigger value="business">Business</UiTabsTrigger>
            </UiTabsList>
          </UiTabs>
        </Motion>
      </div>

      <!-- Masonry grid with varied heights -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Large card (spans 2 rows) -->
        <Motion :variants="childVariant" class="md:row-span-2">
          <UiCard
            class="group overflow-hidden border-0 py-0 shadow-lg transition-shadow hover:shadow-xl"
          >
            <div class="relative overflow-hidden">
              <Motion
                as="img"
                :variants="{
                  initial: { scale: 1 },
                  animate: { scale: 1, transition: { duration: 0.3 } },
                }"
                :src="image"
                :alt="alt"
                class="h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <UiBadge class="absolute top-4 left-4 shadow-md">{{ headline }}</UiBadge>
            </div>
            <UiCardContent class="space-y-3 p-6">
              <NuxtLink :to="link">
                <h4 class="text-xl font-semibold transition-colors hover:text-primary lg:text-2xl">
                  {{ title }}
                </h4>
              </NuxtLink>
              <p class="mt-2 line-clamp-3 text-muted-foreground">{{ description }}</p>
              <div class="flex items-center gap-3 pt-2">
                <UiAvatar :src="userImage" :alt="userName" size="sm" />
                <div>
                  <p class="text-sm font-medium">{{ userName }}</p>
                  <p class="text-xs text-muted-foreground">{{ date }} · 5 min read</p>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </Motion>

        <!-- Regular cards -->
        <Motion v-for="item in 4" :key="item" :variants="childVariant">
          <UiCard
            class="group h-full overflow-hidden border-0 py-0 shadow transition-shadow hover:shadow-lg"
          >
            <div class="relative overflow-hidden">
              <img
                :src="image"
                :alt="alt"
                class="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <UiCardContent class="space-y-2 pb-5">
              <UiBadge variant="outline" size="sm">{{ headline }}</UiBadge>
              <NuxtLink :to="link">
                <h5 class="font-semibold transition-colors hover:text-primary">{{ title }}</h5>
              </NuxtLink>
              <p class="line-clamp-2 text-sm text-muted-foreground">{{ description }}</p>
              <div class="flex items-center gap-2 pt-2">
                <UiAvatar :src="userImage" :alt="userName" size="xs" />
                <p class="text-xs text-muted-foreground">{{ userName }} · {{ date }}</p>
              </div>
            </UiCardContent>
          </UiCard>
        </Motion>
      </div>

      <!-- Load more button -->
      <Motion :variants="childVariant" class="mt-10 text-center">
        <UiButton size="lg" variant="outline">
          Load more articles
          <Icon name="lucide:chevron-down" class="ml-2 h-4 w-4" />
        </UiButton>
      </Motion>
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
        stiffness: 250,
        damping: 25,
      },
    },
  };

  const headline = "Design";
  const title = "Creating accessible design systems";
  const image =
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop";
  const alt = "Design systems";
  const description =
    "Learn how to build design systems that are inclusive and accessible to all users.";
  const date = "Feb 10, 2024";
  const userImage = "https://i.pravatar.cc/300?img=18";
  const userName = "Alex Chen";
  const link = "#";
</script>
