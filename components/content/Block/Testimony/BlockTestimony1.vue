<template>
  <UiContainer class="py-10 lg:py-16">
    <Swiper grab-cursor loop :autoplay="{ delay: 7000 }" :speed="800" :modules="[SwiperAutoplay]">
      <template v-for="n in 5" :key="n">
        <SwiperSlide>
          <div class="py-10 text-center lg:py-16">
            <h3 class="mx-auto mb-8 max-w-[1024px] text-center text-3xl font-semibold lg:text-4xl">
              Love the simplicity of the service and the prompt customer support. We can't imagine
              working without it.
            </h3>
            <div class="flex flex-col items-center justify-center">
              <UiAvatar
                class="h-16 w-16 ring-1"
                src="https://api.dicebear.com/7.x/lorelei/svg?flip=false"
              />
              <p class="mt-4 text-lg font-semibold">Jane Doe</p>
              <p class="mt-1 text-muted-foreground">Head of Design, Layers</p>
              <div class="mt-2">
                <template v-for="s in 5" :key="s">
                  <Icon
                    name="material-symbols:kid-star"
                    class="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                </template>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </template>
    </Swiper>
  </UiContainer>
</template>

<script lang="ts" setup></script>
