<template>
  <!-- 
    Timeline-style blog section with chronological layout
    Features: Date markers, connecting line, slide-in animations
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
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <UiContainer class="py-16 lg:py-24">
      <!-- Header -->
      <div class="mb-12 lg:mb-16">
        <Motion as="p" :variants="childVariant" class="mb-2 font-semibold text-primary">
          Our journey
        </Motion>
        <Motion as="h3" :variants="childVariant" class="mb-3 text-3xl font-semibold lg:text-4xl">
          Recent updates
        </Motion>
        <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground lg:text-xl">
          Follow our latest stories and announcements
        </Motion>
      </div>

      <!-- Timeline -->
      <div class="relative space-y-12">
        <!-- Vertical line (hidden on mobile) -->
        <Motion
          :initial="{ height: 0 }"
          :animate="{
            height: '100%',
            transition: { duration: 1, delay: 0.2 },
          }"
          class="absolute top-0 left-px hidden w-0.5 bg-linear-to-b from-primary via-primary/50 to-transparent md:block"
        ></Motion>

        <!-- Timeline items -->
        <Motion
          v-for="(item, index) in 4"
          :key="item"
          :variants="{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                delay: index * 0.1,
              },
            },
          }"
          class="relative md:pl-12"
        >
          <!-- Timeline dot -->
          <Motion
            :variants="{
              initial: { scale: 0, opacity: 0 },
              animate: {
                scale: [1, 1.3, 1],
                opacity: 1,
                transition: {
                  delay: index * 0.1,
                },
              },
            }"
            class="absolute top-3 left-0 hidden size-4 -translate-x-1.5 rounded-full bg-primary ring-4 ring-background md:block"
          ></Motion>

          <!-- Content card -->
          <UiCard class="group overflow-hidden shadow-xs transition-all hover:shadow-lg">
            <div class="grid grid-cols-1 items-start gap-6 md:grid-cols-5">
              <!-- Date section -->
              <div
                class="flex items-start gap-3 pl-5 md:col-span-1 md:h-full md:flex-col md:items-end md:justify-start md:border-r md:pr-6 md:pl-0"
              >
                <UiBadge variant="outline" class="shrink-0 py-1">
                  <Icon name="lucide:calendar" class="mr-1.5 h-3 w-3" />
                  {{ date }}
                </UiBadge>
                <span class="text-sm text-muted-foreground">5 min read</span>
              </div>

              <!-- Image section -->
              <div class="relative overflow-hidden rounded-md md:col-span-2">
                <img
                  :src="image"
                  :alt="alt"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <!-- Content section -->
              <UiCardContent class="flex flex-col justify-center md:col-span-2">
                <UiBadge class="mb-3 w-fit" variant="secondary">{{ headline }}</UiBadge>
                <NuxtLink :to="link">
                  <h4
                    class="mb-2 text-xl font-semibold transition-colors hover:text-primary lg:text-2xl"
                  >
                    {{ title }}
                  </h4>
                </NuxtLink>
                <p class="mb-4 line-clamp-2 text-muted-foreground">{{ description }}</p>
                <div class="flex items-center gap-3">
                  <UiAvatar :src="userImage" :alt="userName" size="sm" />
                  <div>
                    <p class="text-sm font-medium">{{ userName }}</p>
                    <p class="text-xs text-muted-foreground">Author</p>
                  </div>
                </div>
              </UiCardContent>
            </div>
          </UiCard>
        </Motion>
      </div>

      <!-- View all button -->
      <Motion :variants="childVariant" class="mt-12 text-center">
        <UiButton size="lg" variant="outline">
          View complete timeline
          <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
        </UiButton>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: -30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
  };

  const headline = "Update";
  const title = "Introducing new collaboration features";
  const image =
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop";
  const alt = "Collaboration features";
  const description =
    "We're excited to announce new tools that make team collaboration easier and more productive.";
  const date = "Apr 12, 2024";
  const userImage = "https://i.pravatar.cc/300?img=30";
  const userName = "David Lee";
  const link = "#";
</script>
