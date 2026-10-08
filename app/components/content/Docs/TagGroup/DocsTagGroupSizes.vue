<template>
  <div class="mx-auto max-w-md space-y-4">
    <div v-for="s in sizes" :key="s" class="flex items-center gap-3">
      <span class="text-muted-foreground w-6 text-xs font-medium uppercase">{{ s }}</span>
      <UiTagGroup :aria-label="`${s} tags`" :size="s" color="blue">
        <UiTagGroupItem value="design" dot>Design</UiTagGroupItem>
        <UiTagGroupItem value="dev" color="green" dot>Development</UiTagGroupItem>
        <UiTagGroupItem value="qa" color="amber" removable>QA</UiTagGroupItem>
      </UiTagGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
