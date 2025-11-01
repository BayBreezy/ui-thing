import { useStorage } from "@vueuse/core";

interface Config {
  theme?: Theme["name"];
  radius: number;
}

/** The open/closed state of the mobile drawer */
export const useMobileNavState = () => useState("mobile_nav_state", () => false);

export const RADII = [0, 0.25, 0.5, 0.625, 0.75, 1];

export function useConfigStore() {
  const config = useStorage<Config>("config", {
    theme: "zinc",
    radius: 0.625,
  });

  const themeClass = computed(() => `theme-${config.value.theme}`);

  const theme = computed(() => config.value.theme);
  const radius = computed(() => config.value.radius);

  function setTheme(themeName: Theme["name"]) {
    config.value.theme = themeName;
  }

  function setRadius(newRadius: number) {
    config.value.radius = newRadius;
  }

  return {
    config,
    theme,
    setTheme,
    radius,
    setRadius,
    themeClass,
  };
}
