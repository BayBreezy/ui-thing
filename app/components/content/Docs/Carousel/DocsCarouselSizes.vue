<template>
  <div class="flex items-center justify-center">
    <UiCarousel class="relative w-full max-w-sm" :opts="{ align: 'start' }">
      <UiCarouselContent>
        <UiCarouselItem
          v-for="(_, index) in 5"
          :key="index"
          grab-cursor
          class="md:basis-1/2 lg:basis-1/3"
        >
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex aspect-square items-center justify-center p-6">
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
