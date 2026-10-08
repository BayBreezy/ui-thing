<template>
  <div class="mx-auto max-w-md">
    <UiVeeRating
      v-model="rating"
      name="locked"
      label="Your previous rating"
      hint="Ratings can no longer be changed after 30 days."
      disabled
    />
  </div>
</template>

<script lang="ts" setup>
  const rating = ref(4);
</script>
