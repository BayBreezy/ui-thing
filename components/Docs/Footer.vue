<template>
  <div class="not-prose mt-10 py-10">
    <div class="flex gap-5 md:items-center md:justify-between">
      <NuxtLink
        :to="prev._path"
        class="flex gap-4 rounded-lg border p-5 transition hover:border-primary md:basis-1/2"
        v-if="prev"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
          <Icon name="lucide:arrow-left" class="h-5 w-5 text-muted-foreground" />
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-sm font-semibold">{{ prev.title }}</p>
          <p class="line-clamp-2 text-ellipsis text-sm text-muted-foreground">
            {{ prev.description }}
          </p>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="next._path"
        class="flex gap-4 rounded-lg border p-5 transition hover:border-primary md:basis-1/2"
        v-if="next"
      >
        <div class="flex flex-col gap-1">
          <p class="text-sm font-semibold">{{ next.title }}</p>
          <p class="line-clamp-2 text-ellipsis text-sm text-muted-foreground">
            {{ next.description }}
          </p>
        </div>
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
          <Icon name="lucide:arrow-right" class="h-5 w-5 text-muted-foreground" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { prev, next } = useContent();
</script>
