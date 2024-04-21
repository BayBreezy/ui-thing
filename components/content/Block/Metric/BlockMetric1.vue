<template>
  <UiContainer class="py-10 lg:py-20">
    <h3 class="mb-4 text-center text-3xl font-semibold lg:mb-5 lg:text-4xl">
      Great products, faster than ever
    </h3>
    <p class="mb-10 text-center text-lg text-muted-foreground lg:mb-16 lg:text-xl">
      Everything you need to build modern UI and great products.
    </p>

    <div
      class="grid grid-cols-1 place-items-center gap-y-14 rounded-lg bg-muted py-10 text-center dark:bg-muted/30 lg:grid-cols-3 lg:px-8 lg:py-16"
    >
      <template v-for="(s, i) in stats" :key="i">
        <div>
          <h4 class="mb-2 text-5xl font-bold text-primary lg:mb-3 lg:text-6xl">
            {{ s.value }}
          </h4>
          <p class="text-lg font-medium">
            {{ s.text }}
          </p>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    { text: "Projects completed", value: "230+" },
    { text: "Return on investment", value: "600%" },
    { text: "Global downloads", value: "10K" },
  ];
</script>
