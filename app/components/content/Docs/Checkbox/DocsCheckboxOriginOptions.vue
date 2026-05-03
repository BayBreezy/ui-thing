<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="mx-auto flex w-full max-w-[350px] flex-col justify-center gap-10">
    <UiCheckboxGroup class="grid w-full grid-cols-2 gap-3">
      <div
        v-for="item in options"
        :key="`${id}-${item.value}`"
        class="border-input has-data-[state=checked]:border-primary/50 relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none"
      >
        <div class="flex justify-between gap-2">
          <UiCheckbox
            :id="`${id}-${item.value}`"
            :value="item.value"
            class="order-1 after:absolute after:inset-0"
          />
          <Icon :name="item.icon" class="size-4 opacity-60" aria-hidden="true" />
        </div>
        <UiLabel :for="`${id}-${item.value}`">{{ item.label }}</UiLabel>
      </div>
    </UiCheckboxGroup>

    <fieldset class="space-y-4">
      <legend class="text-foreground text-sm leading-none font-medium">Days of the week</legend>
      <UiCheckboxGroup v-model="selectedDays" class="flex gap-1.5">
        <label
          v-for="item in items"
          :key="`${id}-${item.value}`"
          class="border-input has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
        >
          <UiCheckbox
            :id="`${id}-${item.value}`"
            :value="item.value"
            class="sr-only after:absolute after:inset-0"
            :disabled="item.disabled"
          />
          <span aria-hidden="true" class="text-sm font-medium"> {{ item.label[0] }} </span>
          <span class="sr-only">{{ item.label }}</span>
        </label>
      </UiCheckboxGroup>
    </fieldset>

    <div class="space-y-4">
      <legend class="text-foreground text-sm leading-none font-medium">
        Dark mode toggle checkbox
      </legend>
      <div class="flex flex-col justify-center">
        <input
          :id="darkModeId"
          type="checkbox"
          :name="darkModeId"
          class="peer sr-only"
          :checked="colorMode.value == 'dark'"
          @change="colorMode.preference = colorMode.value == 'dark' ? 'light' : 'dark'"
        />
        <label
          class="group border-input bg-background text-foreground peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 hover:bg-accent hover:text-accent-foreground relative inline-flex size-9 cursor-pointer items-center justify-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
          :for="darkModeId"
          :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
        >
          <Icon
            name="lucide:moon"
            class="size-4 shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
            aria-hidden="true"
          />
          <Icon
            name="lucide:sun-medium"
            class="absolute size-4 shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
            aria-hidden="true"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
  const darkModeId = useId();

  const colorMode = useColorMode();

  const options = [
    { label: "Palette", icon: "lucide:swatch-book", value: useId() },
    { label: "Brush", icon: "lucide:brush", value: useId() },
    { label: "Eraser", icon: "lucide:eraser", value: useId() },
    { label: "Cut", icon: "lucide:scissors", value: useId() },
  ];

  const items = [
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
    { value: "7", label: "Sunday", disabled: true },
  ];

  const selectedDays = ref(["1", "2", "4", "5"]);
</script>
