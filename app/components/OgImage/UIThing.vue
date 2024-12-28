<template>
  <div
    class="h-full w-full bg-cover bg-center"
    :style="{ backgroundImage: 'url(https://ui-thing.behonbaker.com/cover-blank.png)' }"
  >
    <div class="flex h-full w-full flex-col items-center justify-center">
      <h1 class="text-center text-8xl font-bold capitalize tracking-tight text-white">
        {{ title }}
      </h1>
      <p class="mx-auto max-w-6xl text-center text-4xl leading-relaxed text-white">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  defineProps<{
    title: string;
    description: string;
  }>();
</script>
