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
    <div class="group bg-background relative overflow-hidden rounded-2xl shadow-lg">
      <div
        class="from-primary/30 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />

      <div class="relative">
        <Motion
          as-child
          :variants="{
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
          }"
        >
          <NuxtLink :to="link" class="relative block">
            <img v-if="image" :src="image" :alt="alt" class="h-[220px] w-full object-cover" />
            <div
              class="from-background/90 via-background/30 absolute inset-0 bg-linear-to-t to-transparent"
            />
            <Motion
              :variants="{
                initial: { y: 20, opacity: 0 },
                animate: { y: 0, opacity: 1, transition: { delay: 0.2 } },
              }"
              class="absolute right-4 bottom-4 left-4"
            >
              <UiBadge variant="default" class="mb-2 shadow-lg">
                <Icon name="lucide:star" class="size-3 fill-current" />
                {{ headline }}
              </UiBadge>
            </Motion>
          </NuxtLink>
        </Motion>

        <div class="p-6">
          <div class="text-muted-foreground mb-3 flex items-center gap-2 text-xs">
            <Motion
              :variants="{
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
              }"
              class="flex items-center gap-1"
            >
              <Icon name="lucide:eye" class="size-3.5" />
              <span>{{ views }} views</span>
            </Motion>
            <Motion
              :variants="{
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
              }"
              >•</Motion
            >
            <Motion
              :variants="{
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
              }"
              class="flex items-center gap-1"
            >
              <Icon name="lucide:message-circle" class="size-3.5" />
              <span>{{ comments }} comments</span>
            </Motion>
          </div>

          <Motion as-child :variants="childVariant">
            <NuxtLink :to="link">
              <h3
                class="hover:text-primary mb-3 text-xl leading-tight font-bold transition-colors lg:text-2xl"
              >
                {{ title }}
              </h3>
            </NuxtLink>
          </Motion>

          <Motion
            v-if="description"
            as="p"
            :variants="childVariant"
            class="text-muted-foreground mb-5 line-clamp-2 text-sm"
          >
            {{ description }}
          </Motion>

          <Motion :variants="childVariant" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UiAvatar
                v-if="userImage"
                :src="userImage"
                :alt="userName"
                class="ring-muted size-10 ring-2"
              />
              <div>
                <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
                <p v-if="date" class="text-muted-foreground text-xs">{{ date }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UiButton size="icon-sm" variant="ghost">
                <Icon
                  name="lucide:heart"
                  class="text-muted-foreground size-4 transition-colors hover:fill-red-500 hover:text-red-500"
                />
                <span class="sr-only">Like</span>
              </UiButton>
              <UiButton size="icon-sm" variant="ghost">
                <Icon name="lucide:share-2" class="text-muted-foreground size-4" />
                <span class="sr-only">Share</span>
              </UiButton>
            </div>
          </Motion>
        </div>
      </div>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
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
      views?: string;
      comments?: string;
      link?: string;
    }>(),
    {
      headline: "Trending",
      title: "The Rise of AI in Creative Design",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      alt: "The Rise of AI in Creative Design",
      description:
        "Discover how artificial intelligence is revolutionizing the creative industry and what it means for designers.",
      date: "18 Apr 2024",
      userImage: "https://i.pravatar.cc/300?img=33",
      userName: "David Park",
      views: "2.3K",
      comments: "47",
      link: "#",
    }
  );
</script>
