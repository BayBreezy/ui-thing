<template>
  <div className="flex -space-x-[0.6rem] max-sm:hidden">
    <UiAvatar
      v-for="item in data?.results"
      :key="item.email"
      v-tippy.bottom="`Already shared with ${item.name.first}`"
      class="size-8"
    >
      <UiAvatarImage :src="item.picture.thumbnail" :alt="item.name.first" />
    </UiAvatar>
  </div>
</template>

<script lang="ts" setup>
  const { data } = await useAsyncData<{ results: any[]; info?: any }>(
    "schema-visualizer-participants",
    () => $fetch("https://randomuser.me/api/?results=4")
  );
</script>
