<template>
  <div class="bg-muted/30 py-10 lg:py-20">
    <UiContainer>
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="flex flex-col justify-center">
          <h2 class="mb-4 text-3xl font-semibold lg:text-4xl">Loved by teams worldwide</h2>
          <p class="mb-8 text-lg text-muted-foreground">
            See what our customers have to say about their experience with our platform.
          </p>
          <div class="flex items-center gap-6">
            <div>
              <p class="text-3xl font-bold">4.9/5</p>
              <div class="mt-2 flex gap-1">
                <template v-for="s in 5" :key="s">
                  <Icon name="lucide:star" class="size-4 fill-yellow-400 text-yellow-400" />
                </template>
              </div>
            </div>
            <div class="h-12 w-px bg-border" />
            <div>
              <p class="text-3xl font-bold">2,500+</p>
              <p class="text-sm text-muted-foreground">Happy customers</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <template v-for="(item, i) in testimonials" :key="i">
            <div class="rounded-lg border bg-card p-6">
              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <UiAvatar :src="item.avatar" class="size-10" />
                  <div>
                    <p class="font-semibold">{{ item.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ item.title }}</p>
                  </div>
                </div>
                <div class="flex gap-0.5">
                  <template v-for="s in item.rating" :key="s">
                    <Icon name="lucide:star" class="size-3 fill-yellow-400 text-yellow-400" />
                  </template>
                </div>
              </div>
              <p class="text-sm">{{ item.quote }}</p>
            </div>
          </template>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const testimonials = [
    {
      quote:
        "This tool has transformed how our team works. We're more efficient and collaborative than ever before.",
      rating: 5,
      name: "Sarah Williams",
      title: "Design Lead, Creative Inc",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sarah",
    },
    {
      quote: "Great value for money. The features are comprehensive and easy to use.",
      rating: 5,
      name: "Michael Brown",
      title: "Founder, StartupXYZ",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=michael",
    },
  ];
</script>
