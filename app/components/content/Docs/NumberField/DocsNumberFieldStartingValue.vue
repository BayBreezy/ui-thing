<template>
  <div class="mx-auto max-w-xs space-y-2">
    <UiLabel for="starting-quantity">Quantity</UiLabel>
    <UiNumberField
      id="starting-quantity"
      v-model="quantity"
      :starting-value="10"
      :min="0"
      :max="20"
      :step="2"
    />
  </div>
</template>

<script setup lang="ts">
  const quantity = ref<number>();
</script>
