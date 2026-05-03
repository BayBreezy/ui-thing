<template>
  <UiScrollArea orientation="horizontal" class="rounded-md border whitespace-nowrap">
    <div class="flex w-max gap-4 p-4">
      <figure v-for="artwork in works" :key="artwork.artist" class="shrink-0">
        <div class="overflow-hidden rounded-md">
          <img
            :src="artwork.art"
            :alt="`Photo by ${artwork.artist}`"
            class="aspect-[3/4] h-[400px] w-[300px] object-cover"
            width="300px"
            height="400px"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption class="text-muted-foreground pt-2 text-xs">
          Photo by
          <span class="text-foreground font-semibold">
            {{ artwork.artist }}
          </span>
        </figcaption>
      </figure>
    </div>
  </UiScrollArea>
</template>

<script lang="ts" setup>
  export interface Artwork {
    artist: string;
    art: string;
  }

  const works: Artwork[] = [
    {
      artist: "Ornella Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Tom Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Vladimir Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
  ];
</script>
