import { join } from "path";
import fse from "fs-extra";
import kleur from "kleur";
import { loadFile, ProxifiedModule, writeFile } from "magicast";
import { addNuxtModule, getDefaultExportOptions } from "magicast/helpers";

import { InitOptions, UIConfig } from "../types";
import { initPrompts } from "./configPrompt";

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
  } else {
    await loadFile<UIConfig>(uiConfigFilename).then((cfg) => {
      uiConfig = getDefaultExportOptions(cfg) as unknown as UIConfig;
    });
  }
  // Esnure files exists
  fse.ensureFileSync(uiConfig.tailwindConfigLocation);
  fse.ensureFileSync(uiConfig.tailwindCSSLocation);
  fse.ensureDirSync(uiConfig.componentsLocation);
  fse.ensureDirSync(uiConfig.composablesLocation);
  fse.ensureDirSync(uiConfig.utilsLocation);

  return uiConfig;
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
