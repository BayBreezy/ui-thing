<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md space-y-4">
      <UiVeeRating
        v-model="rating"
        name="quality"
        label="Product quality"
        hint="Half stars are supported."
        :step="0.5"
        show-value
      />
      <p class="text-muted-foreground text-sm">
        Current value:
        <span class="text-foreground font-medium">{{ rating }}</span>
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const rating = ref(3.5);
</script>
