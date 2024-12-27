<template>
  <div class="not-prose mt-10 py-10">
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="flex gap-4 rounded-lg border p-5 transition hover:border-primary"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
          <Icon name="lucide:arrow-left" class="h-5 w-5 text-muted-foreground" />
        </div>
        <div class="flex flex-col gap-1">
          <p class="font-semibold lg:text-sm">{{ prev.title }}</p>
          <p class="line-clamp-2 text-ellipsis text-[15px] text-muted-foreground lg:text-sm">
            {{ prev.description }}
          </p>
        </div>
      </NuxtLink>
      <NuxtLink
        v-if="next"
        :to="next.path"
        class="flex justify-between gap-4 rounded-lg border p-5 transition hover:border-primary"
      >
        <div class="flex flex-col gap-1">
          <p class="font-semibold lg:text-sm">{{ next.title }}</p>
          <p class="line-clamp-2 text-ellipsis text-[15px] text-muted-foreground lg:text-sm">
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
  const route = useRoute();
  const { data: surround } = await useAsyncData("surround", () =>
    queryCollectionItemSurroundings("content", route.path, {
      fields: ["title", "description", "path"],
    }).where("path", "NOT LIKE", "%/.navigation")
  );
  const prev = computed(() => surround.value?.[0]);
  const next = computed(() => surround.value?.[1]);
</script>
