import { useStorage } from "@vueuse/core";

interface Config {
  theme?: Theme["name"];
  radius: number;
}

interface CodeConfig {
  prefix: string;
  componentsPath: string;
  utilsPath: string;
}

/** The open/closed state of the mobile drawer */
export const useMobileNavState = () => useState("mobile_nav_state", () => false);

export const RADII = [0, 0.25, 0.5, 0.75, 1];

export function useConfigStore() {
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");
  const config = useStorage<Config>("config", {
    theme: "zinc",
    radius: 0.5,
  });
  const codeConfig = useStorage<CodeConfig>("code-config", {
    prefix: "",
    componentsPath: "@/components",
    utilsPath: "@/utils",
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

  const themePrimary = computed(() => {
    const t = themes.find((t) => t.name === theme.value);
    return `hsl(${t?.cssVars[isDark ? "dark" : "light"].primary})`;
  });

  const setCodeConfig = (payload: CodeConfig) => {
    codeConfig.value = payload;
  };

  return {
    config,
    theme,
    setTheme,
    radius,
    setRadius,
    themeClass,
    themePrimary,

    codeConfig,
    setCodeConfig,
  };
}
