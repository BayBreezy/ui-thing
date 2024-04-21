<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="mb-4 text-center text-3xl font-semibold md:text-left lg:mb-5 lg:text-4xl">
          Build something great
        </h3>
        <p class="mb-10 text-center text-lg text-muted-foreground md:text-left lg:mb-16 lg:text-xl">
          Everything you need to build modern UI and great products.
        </p>
      </div>
      <div class="hidden items-center gap-3 md:flex">
        <UiButton variant="outline" size="lg">Demo</UiButton>
        <UiButton size="lg">Get Started</UiButton>
      </div>
    </div>
    <div
      class="grid grid-cols-1 place-items-center gap-y-14 border-y py-10 text-center md:grid-cols-2 lg:grid-cols-2 lg:px-8 lg:py-16 lg:text-left xl:grid-cols-4"
    >
      <template v-for="(s, i) in stats" :key="i">
        <div>
          <h4 class="mb-2 text-5xl font-bold text-primary lg:mb-3 lg:text-6xl">
            {{ s.value }}
          </h4>
          <p class="text-lg font-medium">
            {{ s.text }}
          </p>
          <p class="mt-2 line-clamp-2 hidden text-muted-foreground lg:block">
            Lorem ipsum, dolor sit amet consectetur adipisicing e
          </p>
        </div>
      </template>
    </div>
    <div class="mt-10 grid items-center gap-3 md:hidden">
      <UiButton size="lg">Get Started</UiButton>
      <UiButton variant="outline" size="lg">Demo</UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    { text: "Projects completed", value: "230+" },
    { text: "Return on investment", value: "600%" },
    { text: "Global downloads", value: "10K" },
    { text: "5-star reviews", value: "200+" },
  ];
</script>
