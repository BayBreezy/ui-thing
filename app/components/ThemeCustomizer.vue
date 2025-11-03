<template>
  <div>
    <DefineBgActive v-slot="{ active }">
      <AnimatePresence>
        <Motion
          v-if="active"
          class="absolute inset-0 bg-linear-to-b from-foreground/10 via-foreground/5"
          :initial="{ opacity: 0, scaleY: 0, transformOrigin: 'top left', scaleX: 0 }"
          :animate="{ opacity: 1, scaleY: 1, scaleX: 1 }"
          :exit="{ opacity: 0, scaleY: 0, scaleX: 0 }"
          :transition="{ duration: 0.2, ease: 'easeOut' }"
        />
      </AnimatePresence>
    </DefineBgActive>
    <div class="grid space-y-1">
      <h1 class="text-base font-semibold text-foreground">Customize</h1>
      <p class="text-sm text-muted-foreground">Pick a style and color for your components.</p>
    </div>
    <div class="space-y-1.5 pt-6">
      <UiLabel for="color" class="text-sm font-semibold"> Color </UiLabel>
      <RovingFocusGroup loop class="grid grid-cols-3 gap-2 py-1.5">
        <template v-for="(color, index) in allColors" :key="index">
          <RovingFocusItem as-child>
            <UiButton
              variant="outline"
              size="sm"
              class="group relative justify-start overflow-hidden bg-transparent px-3 transition-all duration-200"
              :style="{ borderColor: color === theme ? 'var(--primary)' : 'var(--border)' }"
              @click="setTheme(color)"
            >
              <BgActive :active="color === theme" />
              <span class="relative flex items-center gap-2">
                <span
                  class="flex size-5 shrink-0 items-center justify-center rounded-full transition-transform duration-200"
                  :class="color === theme ? 'scale-110' : 'scale-100 group-hover:scale-105'"
                  :style="{ backgroundColor: colors?.[color]?.[7]?.rgb || '' }"
                >
                  <AnimatePresence>
                    <Motion
                      v-if="color === theme"
                      :initial="{ scale: 0, opacity: 0 }"
                      :animate="{ scale: 1, opacity: 1 }"
                      :exit="{ scale: 0, opacity: 0 }"
                      :transition="{ duration: 0.2, delay: 0.1, ease: 'backOut' }"
                    >
                      <Icon name="lucide:check" class="size-3 text-white" />
                    </Motion>
                  </AnimatePresence>
                </span>
                <span class="text-xs capitalize">
                  {{ color }}
                </span>
              </span>
            </UiButton>
          </RovingFocusItem>
        </template>
      </RovingFocusGroup>
    </div>
    <div class="space-y-1.5 pt-4">
      <UiLabel for="radius" class="text-sm font-semibold"> Radius </UiLabel>
      <RovingFocusGroup loop class="grid grid-cols-5 gap-2 py-1.5">
        <template v-for="(r, index) in RADII" :key="index">
          <RovingFocusItem as-child>
            <UiButton
              variant="outline"
              size="sm"
              class="group relative justify-start overflow-hidden bg-transparent px-3 transition-all duration-200"
              :style="{ borderColor: r === radius ? 'var(--primary)' : 'var(--border)' }"
              @click="setRadius(r)"
            >
              <BgActive :active="r === radius" />
              <Motion
                class="relative text-xs"
                :initial="false"
                :animate="{ scale: r === radius ? 1.05 : 1 }"
                :transition="{ duration: 0.2, ease: 'easeOut' }"
              >
                {{ r }}
              </Motion>
            </UiButton>
          </RovingFocusItem>
        </template>
      </RovingFocusGroup>
    </div>
    <div class="space-y-1.5 pt-4">
      <UiLabel for="theme" class="text-sm font-semibold"> Theme </UiLabel>

      <RovingFocusGroup loop class="flex space-x-2 py-1.5">
        <RovingFocusItem as-child>
          <UiButton
            variant="outline"
            size="sm"
            class="group relative justify-start overflow-hidden bg-transparent px-3 transition-all duration-200"
            :style="{
              borderColor: colorMode.value === 'light' ? 'var(--primary)' : 'var(--border)',
            }"
            @click="setColorMode('light')"
          >
            <BgActive :active="!isDark" />
            <span class="relative flex items-center justify-center">
              <Icon name="lucide:sun" class="mr-2 size-4" />
              <span class="text-xs">Light</span>
            </span>
          </UiButton>
        </RovingFocusItem>
        <RovingFocusItem as-child>
          <UiButton
            variant="outline"
            size="sm"
            class="group relative justify-start overflow-hidden bg-transparent px-3 transition-all duration-200"
            :style="{
              borderColor: colorMode.value === 'dark' ? 'var(--primary)' : 'var(--border)',
            }"
            @click="setColorMode('dark')"
          >
            <BgActive :active="isDark" />
            <span class="relative flex items-center justify-center">
              <Icon name="lucide:moon" class="mr-2 size-4" />
              <span class="text-xs">Dark</span>
            </span>
          </UiButton>
        </RovingFocusItem>
      </RovingFocusGroup>
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

  const setColorMode = (mode: "light" | "dark") => {
    colorMode.preference = mode;
  };

  const [DefineBgActive, BgActive] = createReusableTemplate<{
    active: boolean;
  }>({ inheritAttrs: false });
</script>
