<template>
  <div class="flex flex-col items-center gap-5">
    <UiLoader v-model="showLockedLoader" lock-scroll full-page class="size-14">
      <div class="flex flex-col items-center justify-center gap-3">
        <p>Loading... Press <UiKbd variant="outline">esc</UiKbd> to close</p>
        <UiButton size="sm" variant="outline" @click="showLockedLoader = false">
          Close Loader
        </UiButton>
      </div>
    </UiLoader>
    <UiButton variant="outline" @click="showLockedLoader = !showLockedLoader">
      Display Loader
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const showLockedLoader = ref(false);
</script>
