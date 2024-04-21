<template>
  <UiContainer class="py-10 lg:py-20">
    <div
      class="grid grid-cols-1 place-items-center gap-y-14 border-y py-10 text-center md:grid-cols-2 lg:grid-cols-2 lg:px-8 lg:py-16 xl:grid-cols-4"
    >
      <template v-for="(s, i) in stats" :key="i">
        <div>
          <h4 class="mb-2 text-5xl font-bold lg:mb-3 lg:text-6xl">
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
    { text: "5-star reviews", value: "200+" },
  ];
</script>
