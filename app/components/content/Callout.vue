<script setup lang="ts">
  interface CalloutProps {
    icon?: string;
    title?: string;
  }

  defineProps<CalloutProps>();
</script>

<template>
  <UiAlert class="not-prose">
    <span v-if="icon" class="mr-4 text-2xl">{{ icon }}</span>
    <UiAlertTitle v-if="title">
      {{ title }}
    </UiAlertTitle>
    <UiAlertDescription class="[&_a]:underline">
      <slot />
    </UiAlertDescription>
  </UiAlert>
</template>
