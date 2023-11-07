import kleur from "kleur";
import prompts from "prompts";

import { CSS_THEME_OPTIONS } from "./constants";

export const initPrompts = async () => {
  const response = await prompts([
    {
      name: "theme",
      type: "autocomplete",
      message: "Which theme do you want to start with?",
      choices: CSS_THEME_OPTIONS,
    },
    {
      name: "tailwindCSSLocation",
      type: "text",
      message: "Where is your tailwind.css file located?",
      initial: "assets/css/tailwind.css",
    },
    {
      name: "tailwindConfigLocation",
      type: "text",
      message: "Where is your tailwind.config file located?",
      initial: "tailwind.config.js",
    },
    {
      name: "componentsLocation",
      type: "text",
      message: "Where should your components be stored?",
      initial: "components/UI",
    },
    {
      name: "composablesLocation",
      type: "text",
      message: "Where should your composables be stored?",
      initial: "composables",
    },
    {
      name: "utilsLocation",
      type: "text",
      message: "Where should your utils be stored?",
      initial: "utils",
    },
    {
      name: "force",
      type: "confirm",
      message: "Should we just replace component files if they already exist?",
      initial: true,
    },
    {
      name: "useDefaultFilename",
      type: "confirm",
      message: "Would you like to use the default filename when adding components?",
      initial: true,
    },
    {
      name: "packageManager",
      type: "select",
      message: "Which package manager do you use?",
      choices: [
        { title: "NPM", value: "npm" },
        { title: "Yarn", value: "yarn" },
        { title: "PNPM", value: "pnpm" },
        { title: "Bun", value: "bun" },
      ],
    },
  ]);
  if (!response || Object.keys(response).length < 9) {
    console.log(kleur.red("Incomplete configuration submitted. Exiting..."));
    return process.exit(0);
  }
  return response;
};
