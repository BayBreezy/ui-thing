<template>
  <!-- 
    Testimonial slider CTA with Swiper
    Features: Customer quotes carousel, avatar images, auto-play, rating stars
  -->
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <UiContainer class="py-16 lg:py-24">
      <div class="text-center">
        <Motion
          as="h3"
          :variants="childVariant"
          class="mb-4 text-3xl font-semibold md:mb-5 md:text-4xl"
        >
          Loved by teams worldwide
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="text-muted-foreground mx-auto mb-12 max-w-[700px] text-lg md:text-xl"
        >
          See what our customers have to say about their experience.
        </Motion>
      </div>

      <Motion :variants="childVariant" as-child>
        <div class="mx-auto max-w-[800px]">
          <swiper-container
            :autoplay="{ delay: 5000 }"
            :speed="600"
            loop
            grab-cursor
            :slides-per-view="1"
            :space-between="20"
            class="pb-12"
          >
            <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
              <UiCard class="p-8 text-center">
                <div class="mb-6 flex justify-center">
                  <template v-for="star in 5" :key="star">
                    <Icon
                      name="material-symbols:star"
                      :class="[
                        'h-5 w-5',
                        star <= testimonial.rating ? 'text-yellow-500' : 'text-gray-300',
                      ]"
                    />
                  </template>
                </div>
                <p class="text-muted-foreground mb-6 text-lg italic lg:text-xl">
                  "{{ testimonial.quote }}"
                </p>
                <div class="flex items-center justify-center gap-3">
                  <UiAvatar>
                    <UiAvatarImage :src="testimonial.avatar" :alt="testimonial.name" />
                    <UiAvatarFallback>{{ testimonial.initials }}</UiAvatarFallback>
                  </UiAvatar>
                  <div class="text-left">
                    <p class="font-semibold">{{ testimonial.name }}</p>
                    <p class="text-muted-foreground text-sm">
                      {{ testimonial.role }} at {{ testimonial.company }}
                    </p>
                  </div>
                </div>
              </UiCard>
            </swiper-slide>
          </swiper-container>
        </div>
      </Motion>

      <Motion :variants="childVariant" class="mt-12 flex justify-center">
        <UiButton size="lg">
          Join {{ stats.users }}+ happy customers
          <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
        </UiButton>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const stats = {
    users: "10,000",
  };

  const testimonials = [
    {
      quote:
        "This platform has completely transformed how we work. The efficiency gains are remarkable.",
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechCorp",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "SJ",
    },
    {
      quote: "Best investment we've made this year. The ROI was evident within the first month.",
      name: "Michael Chen",
      role: "CTO",
      company: "InnovateLabs",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=13",
      initials: "MC",
    },
    {
      quote: "Outstanding support team and amazing product features. Couldn't ask for more.",
      name: "Emily Rodriguez",
      role: "Product Manager",
      company: "StartupHub",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      initials: "ER",
    },
  ];
</script>
