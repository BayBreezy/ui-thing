<template>
  <div class="text-center">
    <UiRating v-model="rating" show-value editable clearable />
  </div>
</template>

<script lang="ts" setup>
  const rating = ref(3);
</script>
