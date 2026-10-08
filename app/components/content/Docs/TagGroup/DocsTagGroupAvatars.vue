<template>
  <UiTagGroup aria-label="Reviewers" class="mx-auto max-w-md" color="gray" variant="modern">
    <UiTagGroupItem v-for="p in people" :key="p.name" :value="p.name" :avatar="p.avatar" removable>
      {{ p.name }}
    </UiTagGroupItem>
  </UiTagGroup>
</template>

<script lang="ts" setup>
  const people = [
    { name: "Kelly King", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Ryan Author", avatar: "https://i.pravatar.cc/150?img=4" },
    { name: "Mia Chen", avatar: "https://i.pravatar.cc/150?img=5" },
  ];
</script>
