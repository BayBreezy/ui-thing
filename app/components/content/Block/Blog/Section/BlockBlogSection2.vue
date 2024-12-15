<template>
  <UiContainer class="py-16 lg:py-24">
    <div>
      <h3 class="mb-5 text-3xl font-semibold lg:text-4xl">From the blog</h3>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Tool and strategies modern teams need to help their companies grow.
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:mt-16">
      <div v-for="item in 4" :key="item">
        <NuxtLink :to="link">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            v-if="image"
            :src="image"
            :alt="alt"
            class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
          />
        </NuxtLink>
        <p v-if="headline" class="mb-2 text-sm font-semibold text-primary">
          {{ headline }} <span v-if="date">- {{ date }}</span>
        </p>
        <NuxtLink :to="link">
          <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ title }}</p>
        </NuxtLink>
        <p v-if="description" class="mb-3 line-clamp-2 text-ellipsis text-muted-foreground">
          {{ description }}
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <template v-for="t in tags" :key="t">
            <UiBadge class="px-3 py-1 text-sm" variant="outline">{{ t }}</UiBadge>
          </template>
        </div>
      </div>
    </div>
    <UiButton size="lg" class="mt-14 w-full shrink-0 whitespace-nowrap md:w-auto"
      >View all posts</UiButton
    >
  </UiContainer>
</template>

<script lang="ts" setup>
  const headline = "Design";
  const title = "UX review presentations";
  const image =
    "https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const alt = "UX review presentations";
  const description =
    "How do you create compelling presentations that wow your colleagues and impress your managers?";
  const date = "30 Jan 2024";
  const tags = ["Design", "UX", "UI"];
  const link = "#";
</script>
