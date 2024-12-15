<template>
  <div class="mx-auto max-w-md">
    <UiVeeMultiSelect
      searchable
      form-label="Hero"
      value-prop="id"
      label="name"
      placeholder="Search heroes..."
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
  const options = [
    { name: "Batman", id: 1, disabled: true },
    { name: "Robin", id: 2 },
    { name: "Joker", id: 3 },
    { name: "Catwoman", id: 4 },
    { name: "Bane", id: 5 },
    { name: "Scarecrow", id: 6 },
    { name: "Riddler", id: 7 },
    { name: "Two-Face", id: 8 },
    { name: "Penguin", id: 9 },
    { name: "Poison Ivy", id: 10 },
    { name: "Harley Quinn", id: 11 },
  ];
</script>
