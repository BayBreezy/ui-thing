<template>
  <UiContainer class="py-10 lg:py-16">
    <swiper-container grab-cursor loop :autoplay="{ delay: 7000 }" :speed="800">
      <template v-for="(item, index) in reviews" :key="index">
        <swiper-slide>
          <div class="py-10 text-center lg:py-16">
            <h3 class="mx-auto mb-8 max-w-[1024px] text-center text-3xl font-semibold lg:text-4xl">
              {{ item.review }}
            </h3>
            <div class="flex flex-col items-center justify-center">
              <UiAvatar
                class="size-16 ring-1"
                src="https://api.dicebear.com/7.x/lorelei/svg?flip=false"
              />
              <p class="mt-4 text-lg font-semibold">{{ item.user.name }}</p>
              <p class="mt-1 text-muted-foreground">
                {{ item.user.position }}, {{ item.user.companyName }}
              </p>
              <div class="mt-2">
                <template v-for="s in item.rating" :key="s">
                  <Icon
                    name="material-symbols:kid-star"
                    class="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                </template>
              </div>
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper-container>
  </UiContainer>
</template>

<script lang="ts" setup>
  const reviews = [
    {
      review: "This library has made implementing our UI so much easier. It's intuitive and fast!",
      rating: 5,
      user: {
        name: "James P.",
        position: "Frontend Developer",
        companyName: "TechLabs",
      },
    },
    {
      review:
        "I was able to reduce development time by 40% thanks to the prebuilt components. Highly recommend!",
      rating: 4,
      user: {
        name: "Sarah T.",
        position: "UI/UX Designer",
        companyName: "Design Studio",
      },
    },
    {
      review:
        "Great library, but I think the documentation could use more examples for advanced use cases.",
      rating: 3,
      user: {
        name: "Tom R.",
        position: "Senior Software Engineer",
        companyName: "CodeWorks",
      },
    },
    {
      review:
        "A perfect tool for quick prototyping. The flexibility and performance are fantastic!",
      rating: 5,
      user: {
        name: "Emily K.",
        position: "Product Manager",
        companyName: "Creative Solutions",
      },
    },
    {
      review:
        "Good library overall. It could benefit from more integrations with other popular frameworks.",
      rating: 4,
      user: {
        name: "Michael B.",
        position: "Full Stack Developer",
        companyName: "Innovative Tech",
      },
    },
  ];
</script>
