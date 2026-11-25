<template>
  <div class="mx-auto w-full max-w-md">
    <UiField>
      <UiFieldTitle>Price Range</UiFieldTitle>
      <UiFieldDescription>
        Set your budget range ($
        <span class="font-medium tabular-nums">{{ value[0] }}</span> -
        <span class="font-medium tabular-nums">{{ value[1] }}</span>).
      </UiFieldDescription>
      <UiSlider
        v-model="value"
        :max="1000"
        :min="0"
        :step="10"
        class="mt-2 w-full"
        aria-label="Price Range"
      />
    </UiField>
  </div>
</template>

<script lang="ts" setup>
  const value = ref<[number, number]>([200, 800]);
</script>
