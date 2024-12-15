<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel class="tabular-nums">
        From {{ formatPrice(value[0] ?? min_price) }} to {{ formatPrice(value[1] ?? max_price) }}
      </UiLabel>
      <div class="flex items-center gap-4">
        <UiSlider
          v-model="value"
          :min="min_price"
          :max="max_price"
          aria-label="Price range slider"
        />
        <UiButton variant="outline">Go</UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const min_price = 5;
  const max_price = 1240;
  const value = ref([min_price, max_price]);

  const formatPrice = (price: number) => {
    return price === max_price ? `$${price.toLocaleString()}+` : `$${price.toLocaleString()}`;
  };
</script>
