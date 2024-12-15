<template>
  <div>
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
</template>

<script lang="ts" setup>
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
      tags?: string[];
      link?: string;
    }>(),
    {
      headline: "Design",
      title: "UX review presentations",
      image:
        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      date: "30 Jan 2024",
      userImage: "https://api.dicebear.com/7.x/lorelei/svg?flip=false",
      userName: "John Doe",
      readTime: "5 min read",
      tags: () => ["Design", "UX", "UI"],
      link: "#",
    }
  );
</script>
