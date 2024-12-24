<template>
  <div class="relative flex h-screen items-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
    <div class="container relative z-[1] flex flex-col items-center justify-center text-center">
      <h1 class="mb-2 text-4xl font-bold tracking-tight lg:text-6xl">{{ error?.statusCode }}</h1>
      <p class="font-bold tracking-tight text-primary">{{ error?.message }} error</p>
      <UiButton class="mt-5" @click="clearError({ redirect: '/' })">Take me home</UiButton>

      <div class="mx-auto mt-16 grid max-w-[890px] grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="(item, index) in topComponents"
          :key="index"
          class="group cursor-pointer px-6 py-4 text-left"
          :title="`Click to visit the ${item.title} page`"
          @click="clearError({ redirect: item._path })"
        >
          <h3 class="font-semibold underline-offset-2 group-hover:underline">{{ item.title }}</h3>
          <p class="text-muted-foreground">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { NuxtError } from "#app";

  const props = defineProps({
    error: Object as () => NuxtError,
  });

  const { data: topComponents } = await useAsyncData("first-six", () =>
    queryContent("components").skip(1).limit(6).find()
  );

  const title = computed(() => {
    if (!props.error?.message) return "Error";
    return props.error.message;
  });

  useSeoMeta({ title });
</script>
