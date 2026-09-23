<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      v-model="password"
      label="New password"
      name="newPassword"
      placeholder="Password"
      show-strength
      show-requirements
    />
  </div>
</template>

<script lang="ts" setup>
  const password = ref("");
</script>
