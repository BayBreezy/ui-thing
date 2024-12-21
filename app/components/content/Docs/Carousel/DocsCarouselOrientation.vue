<template>
  <div class="flex items-center justify-center">
    <UiCarousel
      orientation="vertical"
      class="max-w-xsw-full relative w-full max-w-xs"
      :opts="{ align: 'start' }"
    >
      <UiCarouselContent class="-mt-1 h-[200px]">
        <UiCarouselItem v-for="(_, index) in 5" :key="index" grab-cursor class="p-1 md:basis-1/2">
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex items-center justify-center p-6">
                <span class="text-3xl font-semibold">{{ index + 1 }}</span>
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
