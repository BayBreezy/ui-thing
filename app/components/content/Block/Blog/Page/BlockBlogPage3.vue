<template>
  <!-- 
    Blog page with newsletter subscription
    Features: Centered header, inline newsletter form, animated featured post, tag-based cards
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
          Resources and insights
        </Motion>
        <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground lg:text-xl">
          The latest industry news, interviews, technologies, and resources.
        </Motion>
      </div>

      <!-- Subscribe form -->
      <Motion :variants="childVariant" class="mx-auto w-full max-w-sm">
        <form class="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row lg:items-center">
          <div class="w-full">
            <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
          </div>
          <p class="my-2 text-sm text-muted-foreground lg:hidden">
            We care about your data in our privacy policy.
          </p>
          <div>
            <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit"
              >Get started</UiButton
            >
          </div>
        </form>
        <p class="mt-3 hidden text-sm text-muted-foreground lg:block">
          We care about your data in our privacy policy.
        </p>
      </Motion>

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
        class="mt-10 hidden h-60 w-full items-end overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover drop-shadow lg:mt-24 lg:flex lg:h-[720px]"
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
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            :alt="alt"
            class="mb-5 h-[240px] w-full rounded-lg object-cover shadow transition-transform duration-300 hover:scale-[1.02]"
          />
        </NuxtLink>
        <p v-if="headline" class="mb-2 text-sm font-semibold text-primary">
          {{ headline }} <span v-if="date">- {{ date }}</span>
        </p>
        <NuxtLink :to="link">
          <p class="mb-2 text-xl font-semibold transition-colors hover:text-primary lg:text-2xl">
            {{ title }}
          </p>
        </NuxtLink>
        <p v-if="description" class="mb-3 line-clamp-2 text-ellipsis text-muted-foreground">
          {{ description }}
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <template v-for="t in tags" :key="t">
            <UiBadge class="px-3 py-1 text-sm" variant="outline">{{ t }}</UiBadge>
          </template>
        </div>
      </Motion>

      <!-- Articles grid with staggered animations -->
      <section
        class="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
      >
        <Motion
          v-for="n in 9"
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
                class="mb-5 h-[240px] w-full rounded-lg object-cover shadow transition-transform duration-300 hover:scale-[1.02]"
              />
            </NuxtLink>
            <p v-if="headline" class="mb-2 text-sm font-semibold text-primary">
              {{ headline }} <span v-if="date">- {{ date }}</span>
            </p>
            <NuxtLink :to="link">
              <p
                class="mb-2 text-xl font-semibold transition-colors hover:text-primary lg:text-2xl"
              >
                {{ title }}
              </p>
            </NuxtLink>
            <p v-if="description" class="mb-3 line-clamp-2 text-ellipsis text-muted-foreground">
              {{ description }}
            </p>
            <div class="flex flex-wrap items-center gap-2">
              <Motion
                v-for="(t, index) in tags"
                :key="t"
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
                <UiBadge class="px-3 py-1 text-sm" variant="outline">{{ t }}</UiBadge>
              </Motion>
            </div>
          </div>
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

  const headline = "Design";
  const title = "UX review presentations";
  const image =
    "https://images.unsplash.com/photo-1524169220946-12efd782aab4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const alt = "UX review presentations";
  const description =
    "How do you create compelling presentations that wow your colleagues and impress your managers?";
  const date = "30 Jan 2024";
  const tags = ["Design", "UX", "UI"];
  const link = "#";
</script>
