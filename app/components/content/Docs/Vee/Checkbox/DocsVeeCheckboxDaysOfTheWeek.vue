<template>
  <div class="flex justify-center">
    <fieldset class="space-y-4">
      <legend class="text-sm font-medium leading-none text-foreground">Days of the week</legend>
      <div class="flex gap-1.5">
        <label
          v-for="item in items"
          :key="item.id"
          class="relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border border-input text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
        >
          <UiVeeCheckbox
            :id="item.id"
            :model-value="item.defaultChecked ? item.value : null"
            :value="item.value"
            class="sr-only"
            name="days"
            :disabled="item.disabled"
          />
          <span aria-hidden="true" class="text-sm font-medium">
            {{ item.label[0] }}
          </span>
          <span class="sr-only">{{ item.label }}</span>
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { id: "checkbox-18-c1", value: "c1", label: "Monday", defaultChecked: true },
    { id: "checkbox-18-c2", value: "c2", label: "Tuesday", defaultChecked: true },
    { id: "checkbox-18-c3", value: "c3", label: "Wednesday" },
    { id: "checkbox-18-c4", value: "c4", label: "Thursday", defaultChecked: true },
    { id: "checkbox-18-c5", value: "c5", label: "Friday", defaultChecked: true },
    { id: "checkbox-18-c6", value: "c6", label: "Saturday" },
    { id: "checkbox-18-c7", value: "c7", label: "Sunday", disabled: true },
  ];
</script>
