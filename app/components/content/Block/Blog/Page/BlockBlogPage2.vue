<template>
  <!-- 
    Blog page with sidebar navigation and search
    Features: Centered header, sticky sidebar, search input, category navigation, responsive layout
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
      <!-- Centered header -->
      <div class="text-center">
        <Motion as="p" :variants="childVariant" class="mb-3 font-semibold text-primary">
          Our blog
        </Motion>
        <Motion
          as="h1"
          :variants="childVariant"
          class="mb-4 text-4xl font-semibold lg:mb-6 lg:text-5xl"
        >
          The latest writings from our team
        </Motion>
        <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground lg:text-xl">
          The latest industry news, interviews, technologies, and resources.
        </Motion>
      </div>

      <!-- Featured blog image - Desktop -->
      <Motion
        :variants="{
          initial: { opacity: 0, y: 30, scale: 0.95 },
          animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 25,
            },
          },
        }"
        title="Blog page on image"
        class="mt-10 hidden h-60 w-full items-end overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover drop-shadow lg:mt-24 lg:flex lg:h-[720px]"
      >
        <div
          class="w-full border-t border-white/10 bg-black/40 p-6 text-white backdrop-blur-2xl md:p-10"
        >
          <NuxtLink to="#">
            <h2
              class="mb-2 text-xl font-semibold transition-colors hover:text-primary/80 md:text-2xl"
            >
              Improve your design skills: Develop an "eye" for design
            </h2>
          </NuxtLink>
          <p class="text-sm md:text-base">
            Tools and trends change, but good design is timeless. Learn how to quickly develop an
            "eye" for design.
          </p>
          <p class="mt-5 text-sm">Written by</p>
          <NuxtLink to="#">
            <div class="mt-2 flex items-center gap-3 transition-opacity hover:opacity-80">
              <UiAvatar
                class="ring-1 ring-white/20"
                src="https://api.dicebear.com/7.x/lorelei/svg?flip=false"
              />
              <span>Jane Doe</span>
            </div>
          </NuxtLink>
          <div class="mt-5 flex flex-wrap items-center gap-2">
            <template v-for="t in ['Design', 'Research', 'Presentation']" :key="t">
              <UiBadge class="border-white px-3 py-1 text-sm text-white" variant="outline">{{
                t
              }}</UiBadge>
            </template>
          </div>
        </div>
      </Motion>

      <!-- Featured blog - Mobile -->
      <Motion :variants="childVariant" class="mt-16 mb-10 lg:hidden">
        <NuxtLink :to="link" class="block">
          <img
            src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            :alt="alt"
            class="mb-5 h-[240px] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </NuxtLink>
        <UiBadge
          v-if="headline || readTime"
          variant="outline"
          class="mb-2 border-ring/50 px-3 py-1 text-sm font-medium text-primary"
          >{{ headline }} <span v-if="readTime" class="ml-1">{{ readTime }}</span></UiBadge
        >
        <NuxtLink :to="link">
          <p class="mb-2 text-xl font-semibold transition-colors hover:text-primary lg:text-2xl">
            {{ title }}
          </p>
        </NuxtLink>
        <p v-if="description" class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground">
          {{ description }}
        </p>
        <div class="flex items-center">
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
        </div>
      </Motion>

      <!-- Articles grid with sidebar -->
      <section class="mt-12 grid grid-cols-1 gap-y-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-8">
        <!-- Sidebar -->
        <Motion :variants="childVariant" class="col-span-full bg-background lg:col-span-4">
          <div class="sticky top-5">
            <UiVeeInput placeholder="Search" icon="lucide:search" />

            <p class="mt-5 font-semibold text-primary md:text-sm">Blog categories</p>
            <ul class="mt-5 flex flex-col gap-5 pl-2 font-medium md:text-sm">
              <Motion
                v-for="(c, index) in categories"
                :key="c"
                :variants="{
                  initial: { opacity: 0, x: -10 },
                  animate: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: index * 0.05,
                    },
                  },
                }"
                as="li"
              >
                <NuxtLink class="transition-colors hover:text-primary" to="#">{{ c }}</NuxtLink>
              </Motion>
            </ul>
          </div>
        </Motion>

        <!-- Articles grid -->
        <div class="col-span-full grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:col-span-8">
          <Motion
            v-for="n in 8"
            :key="n"
            :variants="childVariant"
            :transition="{
              delay: n * 0.05,
            }"
          >
            <div>
              <NuxtLink :to="link" class="block">
                <img
                  v-if="image"
                  :src="image"
                  :alt="alt"
                  class="mb-5 h-[240px] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </NuxtLink>
              <UiBadge
                v-if="headline || readTime"
                variant="outline"
                class="mb-2 border-ring/50 px-3 py-1 text-sm font-medium text-primary"
                >{{ headline }} <span v-if="readTime" class="ml-1">{{ readTime }}</span></UiBadge
              >
              <NuxtLink :to="link">
                <p
                  class="mb-2 text-xl font-semibold transition-colors hover:text-primary lg:text-2xl"
                >
                  {{ title }}
                </p>
              </NuxtLink>
              <p v-if="description" class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground">
                {{ description }}
              </p>
              <div class="flex items-center">
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
              </div>
            </div>
          </Motion>
        </div>
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

  const categories = ["Design", "Research", "Presentation", "Development", "Marketing", "Sales"];

  const headline = "Design";
  const title = "UX review presentations";
  const image =
    "https://images.unsplash.com/photo-1524169220946-12efd782aab4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const alt = "UX review presentations";
  const description =
    "How do you create compelling presentations that wow your colleagues and impress your managers?";
  const date = "30 Jan 2024";
  const userImage = "https://api.dicebear.com/7.x/lorelei/svg?flip=false";
  const userName = "John Doe";
  const readTime = "5 mins";
  const link = "#";
</script>
