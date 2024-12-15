<template>
  <div class="mx-auto flex w-full max-w-sm justify-center">
    <div class="grid w-full grid-cols-2 gap-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="relative flex cursor-pointer flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
      >
        <div class="flex justify-between gap-2">
          <UiVeeCheckbox
            :id="item.id"
            :value="item.value"
            :model-value="item.defaultChecked ? item.value : null"
            class="order-1"
          />
          <Icon :name="item.icon" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
        </div>
        <UiLabel class="after:absolute after:inset-0" :for="item.id">{{ item.label }}</UiLabel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: "checkbox-16-c1",
      value: "c1",
      label: "Palette",
      icon: "lucide:swatch-book",
      defaultChecked: true,
    },
    { id: "checkbox-16-c2", value: "c2", label: "Brush", icon: "lucide:brush" },
    { id: "checkbox-16-c3", value: "c3", label: "Eraser", icon: "lucide:eraser" },
    { id: "checkbox-16-c4", value: "c4", label: "Cut", icon: "lucide:scissors" },
  ];
</script>
