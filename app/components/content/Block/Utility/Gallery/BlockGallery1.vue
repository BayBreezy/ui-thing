<template>
  <!--
    Masonry gallery
    Features: Column based masonry with mixed aspect ratios, category filter chips with live count, captions that appear on hover and keyboard focus
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold lg:text-4xl">Gallery</h2>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl text-lg">
          A few frames from places and projects we loved.
        </p>
      </div>

      <div
        class="mt-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <UiButton
          v-for="item in ['All', ...categories]"
          :key="item"
          size="sm"
          class="rounded-full"
          :variant="category === item ? 'default' : 'outline'"
          :aria-pressed="category === item"
          @click="category = item"
        >
          {{ item }}
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-4 text-center text-sm" role="status">
        {{ visible.length }} {{ visible.length === 1 ? "photo" : "photos" }}
      </p>

      <ul class="mt-6 columns-2 gap-4 md:columns-3">
        <li v-for="photo in visible" :key="photo.src" class="mb-4 break-inside-avoid">
          <figure
            class="group relative overflow-hidden rounded-xl"
            tabindex="0"
            :aria-label="`${photo.title}, ${photo.category}`"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              :class="photo.ratio"
              loading="lazy"
            />
            <figcaption
              class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            >
              <p class="text-sm font-medium">{{ photo.title }}</p>
              <p class="text-xs text-white/80">{{ photo.category }}</p>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Photo = {
    src: string;
    alt: string;
    title: string;
    category: string;
    ratio: string;
  };

  const props = withDefaults(
    defineProps<{
      photos?: Photo[];
    }>(),
    {
      photos: () => [
        {
          src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
          alt: "Sunlit hills with a lone hiker on the ridge",
          title: "Golden ridge",
          category: "Landscapes",
          ratio: "aspect-4/5",
        },
        {
          src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          alt: "Blue valley with pine trees at dawn",
          title: "Valley at dawn",
          category: "Landscapes",
          ratio: "aspect-square",
        },
        {
          src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
          alt: "Glass walled office corridor",
          title: "Glass corridor",
          category: "Interiors",
          ratio: "aspect-3/4",
        },
        {
          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
          alt: "Forest path in warm light",
          title: "Forest path",
          category: "Landscapes",
          ratio: "aspect-3/2",
        },
        {
          src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
          alt: "Bright living room with a grey sofa",
          title: "Living room",
          category: "Interiors",
          ratio: "aspect-square",
        },
        {
          src: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80",
          alt: "Flowing blue and purple abstract shapes",
          title: "Flow",
          category: "Abstract",
          ratio: "aspect-4/5",
        },
        {
          src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
          alt: "Golden Gate Bridge over the bay",
          title: "The bay",
          category: "Landscapes",
          ratio: "aspect-3/2",
        },
        {
          src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
          alt: "Red and blue ink swirling in water",
          title: "Ink",
          category: "Abstract",
          ratio: "aspect-square",
        },
        {
          src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
          alt: "Open plan office with large windows",
          title: "Open plan",
          category: "Interiors",
          ratio: "aspect-3/4",
        },
      ],
    }
  );

  const category = ref("All");
  const categories = computed(() => [...new Set(props.photos.map((photo) => photo.category))]);
  const visible = computed(() =>
    category.value === "All"
      ? props.photos
      : props.photos.filter((photo) => photo.category === category.value)
  );
</script>
