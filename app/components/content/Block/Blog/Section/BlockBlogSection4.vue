<template>
  <!-- 
    Featured blog section with gradient header and sidebar layout
    Features: Large featured post, sidebar with recent posts, category chips
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
      <!-- Header with gradient background -->
      <Motion
        :variants="childVariant"
        class="mb-12 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-8 lg:mb-16"
      >
        <h3 class="mb-3 text-3xl font-semibold lg:text-4xl">Latest from our blog</h3>
        <p class="text-lg text-muted-foreground lg:text-xl">
          Insights, stories, and updates from our team
        </p>
      </Motion>

      <!-- Two-column layout: Featured + Sidebar -->
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <!-- Featured post (2 columns) -->
        <Motion :variants="childVariant" class="lg:col-span-2">
          <NuxtLink :to="link" class="group block">
            <div class="relative overflow-hidden rounded-xl">
              <Motion
                as="img"
                :variants="{
                  initial: { scale: 1.1 },
                  animate: { scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
                }"
                :src="image"
                :alt="alt"
                class="h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-background/95 via-background/50 to-transparent"
              ></div>
              <div class="absolute right-0 bottom-0 left-0 z-10 p-6 lg:p-8">
                <UiBadge class="mb-3">{{ headline }}</UiBadge>
                <h4 class="mb-2 text-2xl font-semibold text-foreground lg:text-3xl">
                  {{ title }}
                </h4>
                <p class="mb-4 line-clamp-2">{{ description }}</p>
                <div class="flex items-center gap-3">
                  <UiAvatar
                    :src="userImage"
                    :alt="userName"
                    class="bg-background shadow ring-1 ring-ring/30"
                  />
                  <div>
                    <p class="text-sm font-semibold">{{ userName }}</p>
                    <p class="text-sm text-muted-foreground">{{ date }}</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </Motion>

        <!-- Sidebar with recent posts (1 column) -->
        <div class="space-y-4">
          <Motion :variants="childVariant">
            <h4 class="mb-4 text-lg font-semibold">Recent posts</h4>
          </Motion>

          <Motion
            v-for="item in 3"
            :key="item"
            :variants="childVariant"
            class="flex gap-3 rounded-lg p-1 hover:bg-muted/50"
          >
            <img :src="image" :alt="alt" class="h-20 w-20 shrink-0 rounded-lg object-cover" />
            <div class="min-w-0 flex-1">
              <NuxtLink :to="link" class="block">
                <p class="mb-1 line-clamp-2 font-semibold">{{ title }}</p>
              </NuxtLink>
              <p class="text-xs text-muted-foreground">{{ date }}</p>
            </div>
          </Motion>

          <!-- Categories -->
          <Motion :variants="childVariant" class="pt-4">
            <h5 class="mb-3 text-sm font-semibold">Popular categories</h5>
            <div class="flex flex-wrap gap-2">
              <template v-for="tag in tags" :key="tag">
                <UiBadge variant="outline">{{ tag }}</UiBadge>
              </template>
            </div>
          </Motion>
        </div>
      </div>
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

  const headline = "Featured";
  const title = "The future of design systems in 2024";
  const image =
    "https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=1974&auto=format&fit=crop";
  const alt = "Design systems";
  const description =
    "Explore the latest trends and best practices for building scalable design systems that empower teams.";
  const date = "Jan 15, 2024";
  const userImage = "https://i.pravatar.cc/300?img=20";
  const userName = "Sarah Johnson";
  const link = "#";
  const tags = ["Design", "Development", "UX", "Tools", "Trends"];
</script>
