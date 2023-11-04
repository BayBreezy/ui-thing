import { Command } from "commander";
import { defu } from "defu";
import fse from "fs-extra";
import kleur from "kleur";

import { createCSS } from "../templates/css";
import { TAILWIND_CONFIG_JS } from "../templates/tailwind";
import { InitOptions, UIConfig } from "../types";
import { addPrettierConfig } from "../utils/addPrettierConfig";
import { addModuleToConfig, getNuxtConfig, getUIConfig, updateConfig } from "../utils/config";
import { INIT_DEPS, INIT_DEV_DEPS, INIT_MODULES } from "../utils/constants";
import { installPackages } from "../utils/installPackages";
import { printFancyBoxMessage } from "../utils/printFancyBoxMessage";

export const init = new Command()
  .command("init")
  .name("init")
  .description(
    "Initialize UI Thing in your Nuxt3 project. This will: 1. Create a tailwind.config.js file 2. Update your nuxt.config.ts file 3. Add the necessary dependencies 4. Create a ui-thing.config.ts file with the default configuration"
  )
  .option("-f --force", "Overwrite config file if it exists.", false)
  .action(async (options: InitOptions) => {
    // Get nuxt config
    const cfg = await getNuxtConfig();
    // Get ui config
    let uiConfig: UIConfig = await getUIConfig(options);
    // Add tailwindcss
    await fse.writeFile(uiConfig.tailwindConfigLocation, TAILWIND_CONFIG_JS, "utf-8");
    // create css path if it does not exist
    // add css file
    fse.writeFileSync(
      uiConfig.tailwindCSSLocation,
      createCSS(uiConfig.theme.toUpperCase() as any),
      "utf-8"
    );
    // Add init modules ot nuxt cinfig
    addModuleToConfig(cfg.nuxtConfig, INIT_MODULES);
    // Configure modules in nuxt config
    cfg.defaultExport.tailwindcss = defu(cfg.defaultExport.tailwindcss, { exposeConfig: true });
    cfg.defaultExport.colorMode = defu(cfg.defaultExport.colorMode, { classSuffix: "" });
    cfg.defaultExport.typescript = defu(cfg.defaultExport.typescript, { shim: false });
    cfg.defaultExport.imports ||= {};
    cfg.defaultExport.imports.imports ||= [];
    const tvExists = cfg.defaultExport.imports.imports.find(
      (i: any) => i.from === "tailwind-variants" && i.name === "tv"
    );
    if (!tvExists) {
      cfg.defaultExport.imports.imports.push({ from: "tailwind-variants", name: "tv" });
    }
    const variantPropsExists = cfg.defaultExport.imports.imports.find(
      (i: any) => i.from === "tailwind-variants" && i.name === "VariantProps"
    );
    if (!variantPropsExists) {
      cfg.defaultExport.imports.imports.push({
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      });
    }
    // Wriet changes to nuxt config
    await updateConfig(cfg.nuxtConfig, "nuxt.config.ts");
    // instal deps
    await installPackages(uiConfig.packageManager, INIT_DEPS, INIT_DEV_DEPS);
    // Add prettier config
    await addPrettierConfig();

    printFancyBoxMessage(
      "Initialized",
      { title: "Complete" },
      `Feel free to start adding components with the ${kleur.bgWhite(" add ")} command.`
    );
  });
