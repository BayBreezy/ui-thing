<template>
  <!--
    Lightbox grid
    Features: Thumbnail grid that opens a full size lightbox dialog, previous and next buttons with arrow key support, counter and caption, focus returns to the thumbnail
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-2xl font-bold lg:text-3xl">Photo library</h2>
      <p class="text-muted-foreground mt-2">Select a photo to view it full size.</p>

      <ul class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <li v-for="(photo, index) in photos" :key="photo.src">
          <button
            type="button"
            class="group focus-visible:ring-ring/50 block w-full overflow-hidden rounded-lg outline-none focus-visible:ring-[3px]"
            :aria-label="`Open ${photo.title}`"
            @click="show(index)"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
              loading="lazy"
            />
          </button>
        </li>
      </ul>

      <UiDialog v-model:open="open">
        <UiDialogContent class="max-w-4xl gap-3 p-3 sm:max-w-4xl" @keydown="onKey">
          <UiDialogHeader class="px-1 pt-1 text-left">
            <UiDialogTitle>{{ current.title }}</UiDialogTitle>
            <UiDialogDescription>{{ current.caption }}</UiDialogDescription>
          </UiDialogHeader>
          <div class="bg-muted relative overflow-hidden rounded-lg">
            <img
              :src="current.large"
              :alt="current.alt"
              class="max-h-[60vh] w-full object-contain"
            />
            <UiButton
              variant="secondary"
              size="icon"
              class="absolute top-1/2 left-2 -translate-y-1/2"
              aria-label="Previous photo"
              @click="step(-1)"
            >
              <Icon name="lucide:chevron-left" class="size-5" />
            </UiButton>
            <UiButton
              variant="secondary"
              size="icon"
              class="absolute top-1/2 right-2 -translate-y-1/2"
              aria-label="Next photo"
              @click="step(1)"
            >
              <Icon name="lucide:chevron-right" class="size-5" />
            </UiButton>
          </div>
          <p class="text-muted-foreground text-center text-sm tabular-nums" role="status">
            {{ position + 1 }} of {{ photos.length }}
          </p>
        </UiDialogContent>
      </UiDialog>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Photo = { src: string; large: string; alt: string; title: string; caption: string };

  const props = withDefaults(
    defineProps<{
      photos?: Photo[];
    }>(),
    {
      photos: () =>
        [
          {
            id: "hills",
            title: "Golden ridge",
            caption: "Late light over the hills, shot from the trail at 7 pm.",
            alt: "Sunlit hills with a lone hiker on the ridge",
          },
          {
            id: "valley",
            title: "Valley at dawn",
            caption: "Cold air and the first colour in the sky.",
            alt: "Blue valley with pine trees at dawn",
          },
          {
            id: "forest",
            title: "Forest path",
            caption: "A short walk behind the cabin.",
            alt: "Forest path in warm light",
          },
          {
            id: "bay",
            title: "The bay",
            caption: "Crossing the bridge on a clear morning.",
            alt: "Golden Gate Bridge over the bay",
          },
          {
            id: "flowers",
            title: "Snowdrops",
            caption: "The first flowers of the year.",
            alt: "White snowdrop flowers in the forest",
          },
          {
            id: "earth",
            title: "Earth at night",
            caption: "City lights seen from orbit.",
            alt: "Earth at night with glowing city lights",
          },
          {
            id: "flow",
            title: "Flow",
            caption: "An abstract study in blue.",
            alt: "Flowing blue and purple abstract shapes",
          },
          {
            id: "ink",
            title: "Ink",
            caption: "Colour dropped into water.",
            alt: "Red and blue ink swirling in water",
          },
        ].map((item) => {
          const ids: Record<string, string> = {
            hills: "1469474968028-56623f02e42e",
            valley: "1506744038136-46273834b3fb",
            forest: "1441974231531-c6227db76b6e",
            bay: "1501594907352-04cda38ebc29",
            flowers: "1515865404355-ddb5b0910878",
            earth: "1451187580459-43490279c0fa",
            flow: "1620121692029-d088224ddc74",
            ink: "1541701494587-cb58502866ab",
          };
          const base = `https://images.unsplash.com/photo-${ids[item.id]}?auto=format&fit=crop`;
          return {
            src: `${base}&w=500&q=75`,
            large: `${base}&w=1600&q=80`,
            alt: item.alt,
            title: item.title,
            caption: item.caption,
          };
        }),
    }
  );

  const open = ref(false);
  const position = ref(0);
  const current = computed(() => props.photos[position.value]!);

  function show(i: number) {
    position.value = i;
    open.value = true;
  }

  function step(by: number) {
    const total = props.photos.length;
    position.value = (position.value + by + total) % total;
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  }
</script>
