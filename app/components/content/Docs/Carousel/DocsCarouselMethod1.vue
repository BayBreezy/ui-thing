<template>
  <div class="flex flex-col items-center gap-5">
    <UiCarousel class="relative w-full max-w-xs" @init-api="setApi">
      <UiCarouselContent>
        <UiCarouselItem v-for="(_, index) in 5" :key="index" grab-cursor>
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-4xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>

    <div class="py-2 text-center text-sm text-muted-foreground">
      Slide {{ current }} of {{ totalCount }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { CarouselApi } from "~/composables/useCarousel";

  const api = ref<CarouselApi>();
  const totalCount = ref(0);
  const current = ref(0);

  function setApi(val: CarouselApi) {
    api.value = val;
  }

  watchOnce(api, (api) => {
    if (!api) return;

    totalCount.value = api.scrollSnapList().length;
    current.value = api.selectedScrollSnap() + 1;

    api.on("select", () => {
      current.value = api.selectedScrollSnap() + 1;
    });
  });
</script>
