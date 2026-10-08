<template>
  <div class="mx-auto max-w-sm">
    <UiVeeCombobox
      v-model="plan"
      name="plan"
      label="Plan"
      hint="Contact support to change your plan."
      :options="['Free', 'Pro', 'Team']"
      disabled
    />
  </div>
</template>

<script lang="ts" setup>
  const plan = ref("Pro");
</script>
