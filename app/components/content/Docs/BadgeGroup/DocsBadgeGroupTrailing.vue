<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c.color"
      :addon-text="c.addonText"
      :color="c.color"
      theme="light"
      align="trailing"
      size="md"
    >
      {{ c.text }}
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    { color: "gray", addonText: "New feature", text: "We've just released a new feature" },
    { color: "blue", addonText: "New feature", text: "We've just released a new feature" },
    { color: "error", addonText: "Error", text: "There was a problem with that action" },
    {
      color: "warning",
      addonText: "Warning",
      text: "Just to let you know this might be a problem",
    },
    { color: "success", addonText: "Success", text: "You've updated your profile and details" },
  ] as const;
</script>
