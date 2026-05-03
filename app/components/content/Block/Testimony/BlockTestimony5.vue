<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="mb-4 text-3xl font-semibold lg:text-4xl">What our customers say</h2>
      <p class="text-muted-foreground text-lg">
        Join thousands of satisfied customers who trust our platform.
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-3">
      <template v-for="(item, i) in testimonials" :key="i">
        <div class="bg-card rounded-lg border p-6">
          <div class="mb-4 flex items-center gap-1">
            <template v-for="s in item.rating" :key="s">
              <Icon name="lucide:star" class="size-4 fill-yellow-400 text-yellow-400" />
            </template>
          </div>
          <p class="mb-6 text-lg">{{ item.quote }}</p>
          <div class="flex items-center gap-3">
            <UiAvatar :src="item.avatar" class="size-12" />
            <div>
              <p class="font-semibold">{{ item.name }}</p>
              <p class="text-muted-foreground text-sm">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const testimonials = [
    {
      quote:
        "The best decision we made was switching to this platform. Our productivity has doubled.",
      rating: 5,
      name: "Alex Johnson",
      title: "CEO, TechStart",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=alex",
    },
    {
      quote: "Amazing support team and great features. Couldn't ask for more!",
      rating: 5,
      name: "Maria Garcia",
      title: "Product Manager, InnovateCo",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=maria",
    },
    {
      quote: "Simple, powerful, and reliable. Exactly what we needed for our team.",
      rating: 5,
      name: "David Chen",
      title: "CTO, DevSolutions",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=david",
    },
  ];
</script>
