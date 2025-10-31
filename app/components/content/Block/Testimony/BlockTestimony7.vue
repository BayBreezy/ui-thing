<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="rounded-lg border bg-card p-8 lg:p-12">
      <div class="mb-10 text-center lg:mb-12">
        <h2 class="mb-3 text-3xl font-semibold lg:text-4xl">Trusted by industry leaders</h2>
        <p class="text-lg text-muted-foreground">Here's what our customers have to say about us</p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <template v-for="(item, i) in testimonials" :key="i">
          <div class="space-y-4">
            <div class="flex gap-1">
              <template v-for="s in item.rating" :key="s">
                <Icon name="lucide:star" class="size-5 fill-yellow-400 text-yellow-400" />
              </template>
            </div>
            <p class="text-lg font-medium">{{ item.quote }}</p>
            <div class="flex items-center gap-4 pt-4">
              <UiAvatar :src="item.avatar" class="size-14" />
              <div>
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-sm text-muted-foreground">{{ item.title }}</p>
                <p class="text-sm text-muted-foreground">{{ item.company }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const testimonials = [
    {
      quote:
        "Outstanding product with exceptional customer service. Our team productivity has increased significantly since we started using this platform.",
      rating: 5,
      name: "Emily Rodriguez",
      title: "VP of Engineering",
      company: "TechCorp Global",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=emily",
    },
    {
      quote:
        "The ROI we've seen has been incredible. This is hands down the best investment we've made in our tech stack this year.",
      rating: 5,
      name: "James Mitchell",
      title: "Chief Technology Officer",
      company: "Innovation Labs",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=james",
    },
    {
      quote:
        "Intuitive interface and powerful features. Our team was up and running in no time. Highly recommend to any growing company.",
      rating: 5,
      name: "Lisa Anderson",
      title: "Product Director",
      company: "Digital Dynamics",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=lisa",
    },
    {
      quote:
        "Game changer for our workflow. The automation features alone have saved us countless hours every week.",
      rating: 5,
      name: "Robert Taylor",
      title: "Operations Manager",
      company: "Scale Solutions",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=robert",
    },
  ];
</script>
