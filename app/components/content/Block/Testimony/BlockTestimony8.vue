<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="text-center">
      <h2 class="mb-4 text-3xl font-semibold lg:text-4xl">Don't just take our word for it</h2>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        Hear from some of our amazing customers who are building faster.
      </p>
    </div>

    <div class="mt-12 columns-1 gap-8 space-y-8 md:columns-2 lg:mt-16 lg:columns-3">
      <template v-for="(item, i) in testimonials" :key="i">
        <div class="break-inside-avoid rounded-lg border bg-card p-6">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex gap-1">
              <template v-for="s in item.rating" :key="s">
                <Icon name="lucide:star" class="size-4 fill-yellow-400 text-yellow-400" />
              </template>
            </div>
          </div>
          <p class="mb-4 text-sm">{{ item.quote }}</p>
          <div class="flex items-center gap-3 border-t pt-4">
            <UiAvatar :src="item.avatar" class="size-10" />
            <div>
              <p class="text-sm font-semibold">{{ item.name }}</p>
              <p class="text-xs text-muted-foreground">{{ item.title }}</p>
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
      quote: "Best tool we've ever used. The efficiency gains are remarkable!",
      rating: 5,
      name: "Sophie Turner",
      title: "Marketing Director",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sophie",
    },
    {
      quote:
        "Incredible platform that just works. Our team loves it and we've seen immediate results.",
      rating: 5,
      name: "Daniel Kim",
      title: "Startup Founder",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=daniel",
    },
    {
      quote: "The customer support is phenomenal. They go above and beyond every time.",
      rating: 5,
      name: "Rachel Green",
      title: "Customer Success Lead",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=rachel",
    },
    {
      quote: "Simple yet powerful. Exactly what we needed for our growing team.",
      rating: 5,
      name: "Chris Evans",
      title: "Engineering Manager",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=chris",
    },
    {
      quote: "Game-changing features that have transformed our daily operations.",
      rating: 5,
      name: "Amanda Walsh",
      title: "Operations Lead",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=amanda",
    },
    {
      quote: "Worth every penny. The ROI has been exceptional.",
      rating: 5,
      name: "Kevin Hart",
      title: "Business Analyst",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=kevin",
    },
  ];
</script>
