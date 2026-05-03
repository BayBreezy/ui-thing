<template>
  <!-- 
    Image Gallery About Section
    Features: Gallery showcasing office and team culture
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Life at Our Company</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        A glimpse into our workspace, culture, and the people who make it all happen
      </p>
    </div>

    <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        class="group relative aspect-square overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2 sm:aspect-auto"
      >
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1300"
          alt="Modern office space"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div class="absolute bottom-4 left-4 text-white">
          <h3 class="text-xl font-semibold">Our Modern Workspace</h3>
          <p class="mt-1 text-sm opacity-90">Designed for collaboration and creativity</p>
        </div>
      </div>

      <div
        v-for="(image, index) in galleryImages"
        :key="index"
        class="group relative aspect-square overflow-hidden rounded-2xl sm:last:col-span-2 lg:last:col-span-1"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div class="absolute bottom-3 left-3 text-white">
          <h4 class="text-sm font-semibold">{{ image.title }}</h4>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-12 max-w-3xl text-center">
      <p class="text-muted-foreground text-lg">
        We've created an environment where innovation thrives and people love to work. Our offices
        are designed to foster collaboration, creativity, and well-being.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1200",
      alt: "Team collaboration",
      title: "Team Collaboration",
    },
    {
      src: "https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000",
      alt: "Innovation workshop",
      title: "Innovation Workshops",
    },
    {
      src: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000",
      alt: "Team meeting",
      title: "Strategic Planning",
    },
    {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000",
      alt: "Team celebration",
      title: "Team Celebrations",
    },
    {
      src: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000",
      alt: "Casual hangout",
      title: "Casual Hangouts",
    },
  ];
</script>
