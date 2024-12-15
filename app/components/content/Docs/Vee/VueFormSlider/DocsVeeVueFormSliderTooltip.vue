<template>
  <div class="mx-auto flex w-full max-w-xl flex-col gap-y-16">
    <div class="flex w-full flex-col gap-5">
      <p class="text-sm">A slider where the tooltip shows the value in currency format.</p>
      <UiVeeVueFormSlider v-model="value" tooltip-position="bottom" :format="format1" />
    </div>
    <div class="flex w-full flex-col gap-5">
      <p class="text-sm">A slider where the tooltip format is based on the object passed in.</p>
      <UiVeeVueFormSlider
        v-model="value"
        tooltip-position="bottom"
        :format="{
          decimals: 1,
          prefix: '£',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref(20);
  const format1 = (v: number) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
</script>
