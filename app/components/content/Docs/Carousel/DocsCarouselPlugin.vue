<template>
  <div class="flex flex-col items-center gap-5">
    <UiCarousel
      class="relative w-full max-w-xs"
      :plugins="[plugin]"
      @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
    >
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
  </div>
</template>

<script lang="ts" setup>
  import Autoplay from "embla-carousel-autoplay";

  const plugin = Autoplay({
    delay: 2000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });
</script>
