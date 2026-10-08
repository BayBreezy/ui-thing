<template>
  <div class="mx-auto max-w-md">
    <UiTagGroup
      v-model="selected"
      aria-label="Plans"
      selection-mode="single"
      variant="outline"
      shape="rounded"
      size="lg"
    >
      <UiTagGroupItem v-for="p in plans" :key="p.value" :value="p.value" :color="p.color">
        <!-- `leading`, `trailing` and `delete` slots receive `{ selected, disabled }` -->
        <template #leading="{ selected: isSelected }">
          <Icon :name="isSelected ? 'lucide:circle-check-big' : p.icon" class="size-4 shrink-0" />
        </template>

        <span class="font-semibold">{{ p.label }}</span>

        <template #trailing>
          <span class="text-xs opacity-70">{{ p.price }}</span>
        </template>
      </UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>

<script lang="ts" setup>
  const plans = [
    { value: "free", label: "Free", price: "$0", icon: "lucide:leaf", color: "emerald" },
    { value: "pro", label: "Pro", price: "$12", icon: "lucide:rocket", color: "violet" },
    { value: "team", label: "Team", price: "$40", icon: "lucide:users", color: "sky" },
  ] as const;

  const selected = ref<string | undefined>("pro");
</script>
