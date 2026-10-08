<template>
  <div class="mx-auto max-w-md space-y-3">
    <!-- `selection-mode="single"` makes the value a single item. Clicking it again deselects it. -->
    <UiTagGroup
      v-model="size"
      aria-label="Size"
      selection-mode="single"
      color="indigo"
      variant="outline"
    >
      <UiTagGroupItem v-for="s in sizes" :key="s" :value="s">{{ s }}</UiTagGroupItem>
    </UiTagGroup>

    <p class="text-muted-foreground text-sm">
      Selected: <span class="text-foreground font-medium">{{ size ?? "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["XS", "S", "M", "L", "XL"];
  const size = ref<string | undefined>("M");
</script>
