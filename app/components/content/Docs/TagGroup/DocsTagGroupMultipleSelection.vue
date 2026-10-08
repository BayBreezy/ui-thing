<template>
  <div class="mx-auto max-w-md space-y-3">
    <!-- `disallow-empty-selection` keeps at least one tag selected -->
    <UiTagGroup v-model="selected" aria-label="Topics" selection-mode="multiple" variant="soft">
      <UiTagGroupItem
        v-for="t in topics"
        :key="t.value"
        :value="t.value"
        :color="t.color"
        :icon="t.icon"
      >
        {{ t.label }}
      </UiTagGroupItem>
    </UiTagGroup>

    <p class="text-muted-foreground text-sm">
      Selected:
      <span class="text-foreground font-medium">{{ selected.join(", ") || "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const topics = [
    { value: "design", label: "Design", color: "pink", icon: "lucide:palette" },
    { value: "code", label: "Code", color: "blue", icon: "lucide:code" },
    { value: "music", label: "Music", color: "violet", icon: "lucide:music" },
    { value: "travel", label: "Travel", color: "emerald", icon: "lucide:plane" },
    { value: "food", label: "Food", color: "orange", icon: "lucide:utensils" },
    { value: "games", label: "Games", color: "red", icon: "lucide:gamepad-2" },
  ] as const;

  const selected = ref<string[]>(["code"]);
</script>
