<template>
  <div
    class="h-full w-full p-20 text-zinc-50"
    style="background-image: linear-gradient(to bottom right, #09090b 0%, #18181b 100%)"
  >
    <div
      class="relative flex h-full w-full flex-col items-center justify-center border border-zinc-900/80 bg-zinc-900/10 p-10"
    >
      <div class="absolute -top-px right-0 h-px w-12 bg-zinc-700" />
      <div class="absolute top-0 -right-px h-12 w-px bg-zinc-700" />
      <div class="absolute right-0 -bottom-px h-px w-12 bg-zinc-700" />
      <div class="absolute -right-px bottom-0 h-12 w-px bg-zinc-700" />

      <div class="absolute -top-px left-0 h-px w-12 bg-zinc-700" />
      <div class="absolute top-0 -left-px h-12 w-px bg-zinc-700" />
      <div class="absolute -bottom-px left-0 h-px w-12 bg-zinc-700" />
      <div class="absolute bottom-0 -left-px h-12 w-px bg-zinc-700" />

      <h1 class="mx-auto text-center text-5xl leading-none tracking-tighter text-pretty">
        {{ title }}
      </h1>
      <p
        class="text-center text-3xl leading-8 text-balance whitespace-pre-line opacity-80"
        v-html="description"
      />

      <div class="absolute right-6 bottom-6">
        <img src="/icon.png" alt="UI Thing Icon" class="h-10 w-10 rounded-md object-contain" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    title?: string;
    description?: string;
  }>();
</script>
