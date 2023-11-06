import { join } from "path";
import { loadConfig } from "c12";
import fse from "fs-extra";
import kleur from "kleur";
import _ from "lodash";
import { loadFile, ProxifiedModule, writeFile } from "magicast";
import { addNuxtModule, getDefaultExportOptions } from "magicast/helpers";
import prompts from "prompts";

import { InitOptions, UIConfig } from "../types";
import { initPrompts } from "./uiConfigPrompt";

const currentDir = process.cwd();
const uiConfigFilename = "ui-thing.config.ts";

export const getNuxtConfig = async () => {
  if (!fse.existsSync("nuxt.config.ts")) {
    console.log(kleur.red(`No ${kleur.bgWhite(`nuxt.config.ts`)} file found. Exiting...`));
    return process.exit(0);
  }
  const nuxtConfig = await loadFile(join(currentDir, "nuxt.config.ts"));
  const defaultExport = getDefaultExportOptions(nuxtConfig);
  return { nuxtConfig, defaultExport };
};

export const getUIConfig = async (options?: InitOptions) => {
  const configFileExists = fse.existsSync(uiConfigFilename);
  let uiConfig: UIConfig = {} as UIConfig;

  if (!configFileExists || options?.force) {
    uiConfig = await initPrompts();
    await fse.writeFile(uiConfigFilename, `export default ${JSON.stringify(uiConfig, null, 2)}`);
    // Check if user chose pnpm as package manager
    if (uiConfig.packageManager === "pnpm") {
      // check if a .npmrc file exists
      const npmrcExists = fse.existsSync(".npmrc");
      // as the user if they want to create a .npmrc file
      if (npmrcExists) {
        const { confirmCreateNpmrc } = await prompts({
          type: "confirm",
          name: "confirmCreateNpmrc",
          message: "A .npmrc file already exists. Do you want to overwrite it?",
          initial: false,
        });
        if (confirmCreateNpmrc) {
          await fse.writeFile(".npmrc", "shamefully-hoist=true\nstrict-peer-dependencies=false\n");
        }
      } else {
        await fse.writeFile(".npmrc", "shamefully-hoist=true\nstrict-peer-dependencies=false\n");
      }
    }
  } else {
    const data = await loadConfig({
      configFile: uiConfigFilename.replace(".ts", ""),
    });
    uiConfig = data.config as UIConfig;
  }
  if (_.isEmpty(uiConfig)) {
    await getUIConfig({ force: true });
  }
  createConfigPaths(uiConfig);
  return uiConfig;
};

export const createConfigPaths = (uiConfig: UIConfig) => {
  // Esnure files exists
  if (uiConfig.tailwindCSSLocation) fse.ensureFileSync(uiConfig.tailwindConfigLocation);
  if (uiConfig.tailwindConfigLocation) fse.ensureFileSync(uiConfig.tailwindCSSLocation);
  if (uiConfig.componentsLocation) fse.ensureDirSync(uiConfig.componentsLocation);
  if (uiConfig.composablesLocation) fse.ensureDirSync(uiConfig.composablesLocation);
  if (uiConfig.utilsLocation) fse.ensureDirSync(uiConfig.utilsLocation);
};

export const addModuleToConfig = (cfg: ProxifiedModule, modules: string[] | string) => {
  if (typeof modules === "string") {
    modules = [modules];
  }
  modules.forEach((m) => addNuxtModule(cfg, m));
  return cfg;
};

export const updateConfig = async (cfg: ProxifiedModule, fileName = "nuxt.config.ts") => {
  await writeFile(cfg.$ast, fileName);
};
