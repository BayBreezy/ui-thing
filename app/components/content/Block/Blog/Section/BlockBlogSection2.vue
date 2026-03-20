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
      <div class="flex flex-col gap-3">
        <Motion as="h3" :variants="childVariant" class="text-3xl font-semibold lg:text-4xl"
          >From the blog</Motion
        >
        <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground lg:text-xl">
          Tool and strategies modern teams need to help their companies grow.
        </Motion>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:mt-16">
        <Motion v-for="item in 4" :key="item" :variants="childVariant">
          <Motion v-if="image" as-child class="block" :variants="childVariant">
            <NuxtLink :to="link">
              <img
                :src="image"
                :alt="alt"
                class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
              />
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
            <Motion
              as="p"
              :variants="childVariant"
              class="mb-2 text-xl font-semibold lg:text-2xl"
              >{{ title }}</Motion
            >
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
      </div>
      <Motion :variants="childVariant">
        <UiButton size="lg" class="mt-14 w-full shrink-0 whitespace-nowrap md:w-auto"
          >View all posts</UiButton
        >
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  /**
   * This section is using the cards from BlockBlogPostCard3.vue
   */
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

  // suggest default props for demonstration
  const headline = "Automation";
  const title = "How to automate your workflow";
  const image =
    "https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const alt = "Automation";
  const description =
    "Learn how to streamline your tasks and improve efficiency with automation tools.";
  const date = "Mar 16, 2027";
  const tags = ["Productivity", "Tools"];
  const link = "#";
</script>
