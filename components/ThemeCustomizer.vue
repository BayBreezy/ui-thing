<template>
  <div class="p-4">
    <div class="grid space-y-1">
      <h1 class="text-md font-semibold text-foreground">Customize</h1>
      <p class="text-xs text-muted-foreground">Pick a style and color for your components.</p>
    </div>
    <div class="space-y-1.5 pt-6">
      <UiLabel for="color" class="text-xs"> Color </UiLabel>
      <div class="grid grid-cols-3 gap-2 py-1.5">
        <UiButton
          v-for="(color, index) in allColors"
          :key="index"
          variant="outline"
          class="h-8 justify-start px-3"
          :class="color === theme ? 'border-2 border-foreground' : ''"
          @click="setTheme(color)"
        >
          <span
            class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            :style="{ backgroundColor: colors[color][7].rgb }"
          >
            <Icon v-if="color === theme" name="lucide:check" class="h-3 w-3 text-white" />
          </span>
          <span class="ml-2 text-xs capitalize">
            {{ color }}
          </span>
        </UiButton>
      </div>
    </div>
    <div class="space-y-1.5 pt-6">
      <UiLabel for="radius" class="text-xs"> Radius </UiLabel>
      <div class="grid grid-cols-5 gap-2 py-1.5">
        <UiButton
          v-for="(r, index) in RADII"
          :key="index"
          variant="outline"
          class="h-8 justify-center px-3"
          :class="r === radius ? 'border-2 border-foreground' : ''"
          @click="setRadius(r)"
        >
          <span class="text-xs">
            {{ r }}
          </span>
        </UiButton>
      </div>
    </div>
    <div class="space-y-1.5 pt-6">
      <UiLabel for="theme" class="text-xs"> Theme </UiLabel>

      <div class="flex space-x-2 py-1.5">
        <UiButton
          class="h-8"
          variant="outline"
          :class="{ 'border-2 border-foreground': !isDark }"
          @click="toggleColorMode"
        >
          <Icon name="lucide:sun" class="mr-2 h-4 w-4" />
          <span class="text-xs">Light</span>
        </UiButton>
        <UiButton
          class="h-8"
          variant="outline"
          :class="{ 'border-2 border-foreground': isDark }"
          @click="toggleColorMode"
        >
          <Icon name="lucide:moon" class="mr-2 h-4 w-4" />
          <span class="text-xs">Dark</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    allColors: Color[];
  }>();

  const { theme, radius, setRadius, setTheme } = useConfigStore();
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");
  const toggleColorMode = () => (colorMode.preference = isDark.value ? "light" : "dark");
</script>
