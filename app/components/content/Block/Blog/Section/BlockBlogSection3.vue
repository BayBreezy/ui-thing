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
    <UiContainer class="overflow-hidden py-16 lg:py-24">
      <div>
        <Motion
          as="h3"
          :variants="{
            initial: { opacity: 0, y: 10, scale: 1.1 },
            animate: { opacity: 1, y: 0, scale: 1 },
          }"
          class="mb-5 text-center text-3xl font-semibold lg:text-4xl"
          >From the blog</Motion
        >
        <Motion
          as="p"
          :variants="{
            initial: { opacity: 0, y: 10, scale: 1.1 },
            animate: { opacity: 1, y: 0, scale: 1 },
          }"
          class="text-center text-lg text-muted-foreground lg:text-xl"
        >
          Tool and strategies modern teams need to help their companies grow.
        </Motion>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2">
        <Motion
          v-for="item in 4"
          :key="item"
          :variants="childVariant"
          :transition="{
            delay: item * 0.1,
          }"
        >
          <div class="flex flex-col gap-5 md:flex-row">
            <Motion
              v-if="image"
              as-child
              class="block basis-full md:basis-[30%]"
              :variants="{
                initial: { opacity: 0, scale: 1.1 },
                animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
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
            <div class="basis-full md:basis-[60%]">
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
      </div>
    </UiContainer>
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

  const headline = "Design";
  const title = "UX review presentations";
  const image =
    "https://images.unsplash.com/photo-1627637820550-423ab938955c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132";
  const alt = "UX review presentations";
  const description =
    "How do you create compelling presentations that wow your colleagues and impress your managers?";
  const date = "30 Jan 2024";
  const userImage = "https://i.pravatar.cc/300?img=15";
  const userName = "John Doe";
  const link = "#";
</script>
