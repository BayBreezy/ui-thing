<script setup lang="ts">
  import { breakpointsTailwind } from "@vueuse/core";

  // Create an array of color values
  const allColors: Color[] = [
    "zinc",
    "mauve",
    "olive",
    "mist",
    "taupe",
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
    "nuxt",
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

  const bp = useBreakpoints(breakpointsTailwind);
  const isDesktop = bp.greaterOrEqual("lg");
</script>

<template>
  <UiPopover v-if="isDesktop">
    <UiPopoverTrigger as-child>
      <UiButton variant="ghost" size="icon-sm">
        <Icon name="lucide:palette" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent :side-offset="4" align="end" class="w-96">
      <ThemeCustomizer :all-colors="allColors" />
    </UiPopoverContent>
  </UiPopover>
  <UiDrawer v-else>
    <UiDrawerTrigger as-child>
      <UiButton variant="ghost" size="icon-sm">
        <Icon name="lucide:palette" />
      </UiButton>
    </UiDrawerTrigger>
    <UiDrawerContent class="w-full px-4 pb-6">
      <UiDrawerHeader>
        <UiDrawerTitle class="sr-only">Theme Customizer</UiDrawerTitle>
        <UiDrawerDescription class="sr-only"
          >Pick a style and color for your components.</UiDrawerDescription
        >
      </UiDrawerHeader>
      <ThemeCustomizer :all-colors="allColors" />
    </UiDrawerContent>
  </UiDrawer>
</template>
