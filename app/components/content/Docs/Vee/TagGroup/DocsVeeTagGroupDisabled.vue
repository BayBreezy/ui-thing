<template>
  <div class="mx-auto max-w-md space-y-6">
    <UiVeeTagGroup
      v-model="plans"
      name="plans"
      label="Plans"
      hint="Contact support to change your plans."
      :options="['Free', 'Pro', 'Team']"
      color="sky"
      disabled
    />

    <UiVeeTagGroup
      name="regions"
      label="Regions"
      hint="Some regions are not available yet."
      :options="regions"
      color="emerald"
    />
  </div>
</template>

<script lang="ts" setup>
  const plans = ref(["Pro"]);

  const regions = [
    { value: "us", label: "United States" },
    { value: "eu", label: "Europe" },
    { value: "ap", label: "Asia Pacific", disabled: true },
    { value: "sa", label: "South America", disabled: true },
  ];
</script>
