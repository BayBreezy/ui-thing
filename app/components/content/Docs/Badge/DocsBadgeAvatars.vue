<template>
  <div class="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2">
    <UiBadge
      v-for="p in people"
      :key="p.name"
      variant="modern"
      shape="pill"
      size="md"
      :avatar="p.avatar"
    >
      {{ p.name }}
    </UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const people = [
    { name: "Kelly King", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Ryan Author", avatar: "https://i.pravatar.cc/150?img=4" },
    { name: "Mia Chen", avatar: "https://i.pravatar.cc/150?img=5" },
  ];
</script>
