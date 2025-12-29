<template>
  <div class="flex flex-col gap-6">
    <UiAvatarLabelGroup
      v-for="s in sizes"
      :key="s"
      title="Behon Baker"
      subtitle="behon.baker@yahoo.com"
      src="https://behonbaker.com/icon.png"
      :size="s"
    />
  </div>
</template>
<script lang="ts" setup>
  const sizes = ["sm", "md", "lg", "xl"] as const;
</script>
