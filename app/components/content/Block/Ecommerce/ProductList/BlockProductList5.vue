<template>
  <!--
    Shop by collection tiles
    Features: Asymmetric bento grid of image tiles with a gradient scrim, item counts, a hover zoom and an arrow that nudges on hover, each tile is a single focusable link
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
        <p class="text-muted-foreground mt-2 max-w-xl">{{ description }}</p>
      </div>
      <a href="#" class="text-sm font-medium underline-offset-4 hover:underline">
        Browse all collections
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>

    <ul class="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
      <Motion
        v-for="(collection, i) in collections"
        :key="collection.name"
        as="li"
        :class="tileClasses[i]"
        :initial="{ opacity: 0, scale: 0.97 }"
        :while-in-view="{ opacity: 1, scale: 1 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.45, delay: i * 0.07 }"
      >
        <a
          :href="collection.href"
          class="group focus-visible:ring-ring relative block size-full overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <img
            :src="collection.image"
            :alt="collection.name"
            loading="lazy"
            class="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            aria-hidden="true"
          />
          <div
            class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"
          >
            <div>
              <h3 class="text-lg font-semibold">{{ collection.name }}</h3>
              <p class="text-sm text-white/75">{{ collection.count }} items</p>
            </div>
            <span
              class="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-black"
              aria-hidden="true"
            >
              <Icon name="lucide:arrow-right" class="size-4" />
            </span>
          </div>
        </a>
      </Motion>
    </ul>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Collection = {
    name: string;
    count: number;
    image: string;
    href: string;
  };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      collections?: Collection[];
    }>(),
    {
      title: "Shop by collection",
      description: "Start with the category you love and work your way through the edit.",
      collections: () => [
        {
          name: "Footwear",
          count: 24,
          image:
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1000&q=80",
          href: "#",
        },
        {
          name: "Audio",
          count: 12,
          image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
          href: "#",
        },
        {
          name: "Bags",
          count: 18,
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
          href: "#",
        },
        {
          name: "Outerwear",
          count: 16,
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
          href: "#",
        },
        {
          name: "Home",
          count: 31,
          image:
            "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1000&q=80",
          href: "#",
        },
        {
          name: "Accessories",
          count: 27,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
          href: "#",
        },
      ],
    }
  );

  // Bento layout that fills a four column, three row grid with the six default tiles.
  // Extra collections fall back to a single cell.
  const tileClasses = ["col-span-2 row-span-2", "", "", "col-span-2", "col-span-2", "col-span-2"];
</script>
