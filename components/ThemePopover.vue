<script setup lang="ts">
  // Create an array of color values
  const allColors: Color[] = [
    "zinc",
    "rose",
    "blue",
    "green",
    "orange",
    "red",
    "slate",
    "stone",
    "gray",
    "neutral",
    "yellow",
    "violet",
  ];
  const { theme, radius } = useConfigStore();

  // Whenever the component is mounted, update the document class list
  onMounted(() => {
    document.documentElement.style.setProperty("--radius", `${radius.value}rem`);
    document.documentElement.classList.add(`theme-${theme.value}`);
  });

  // Whenever the theme value changes, update the document class list
  watch(theme, (theme) => {
    document.documentElement.classList.remove(...allColors.map((color) => `theme-${color}`));
    document.documentElement.classList.add(`theme-${theme}`);
  });

  // Whenever the radius value changes, update the document style
  watch(radius, (radius) => {
    document.documentElement.style.setProperty("--radius", `${radius}rem`);
  });
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton class="h-9 w-9" :variant="'ghost'" :size="'icon'">
        <Icon name="lucide:paintbrush" class="size-4" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent :side-offset="8" align="end" class="w-96">
      <ThemeCustomizer :all-colors="allColors" />
    </UiPopoverContent>
  </UiPopover>
</template>
