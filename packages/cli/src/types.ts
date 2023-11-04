export type UIConfig = {
  theme: string;
  tailwindCSSLocation: string;
  tailwindConfigLocation: string;
  componentsLocation: string;
  composablesLocation: string;
  utilsLocation: string;
  force: boolean;
  useDefaultFilename: boolean;
  packageManager: string;
};

export type InitOptions = { force?: boolean };
