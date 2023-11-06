import { Command } from "commander";
import { consola } from "consola";
import fse from "fs-extra";
import _ from "lodash";
import prompts from "prompts";

import { createCSS } from "../templates/css";
import { compareUIConfig } from "../utils/compareUIConfig";
import { getUIConfig } from "../utils/config";
import { CSS_THEME_OPTIONS } from "../utils/constants";
import { printFancyBoxMessage } from "../utils/printFancyBoxMessage";

export const theme = new Command()
  .command("theme")
  .name("theme")
  .description("Add a new theme to your project.")
  .action(async () => {
    // Get ui config
    let uiConfig = await getUIConfig();
    let uiConfigIsCorrect = await compareUIConfig();
    if (!uiConfigIsCorrect) {
      uiConfig = await getUIConfig({ force: true });
    }
    if (_.isEmpty(uiConfig)) {
      consola.info("Config file not set. Exiting...");
      process.exit(0);
    }
    const { theme } = await prompts([
      {
        name: "theme",
        type: "autocomplete",
        message: "Which theme do you want to add?",
        choices: CSS_THEME_OPTIONS,
      },
    ]);
    if (!theme) {
      console.log("No theme selected. Exiting...");
      return process.exit(0);
    }
    if (fse.existsSync(uiConfig.tailwindCSSLocation)) {
      const { force } = await prompts([
        {
          name: "force",
          type: "confirm",
          message: "Do you want to overwrite your current css file?",
          initial: true,
        },
      ]);
      if (!force) {
        console.log("Exiting...");
        return process.exit(0);
      }
    }
    fse.writeFileSync(uiConfig.tailwindCSSLocation, createCSS(theme.toUpperCase() as any), "utf-8");

    printFancyBoxMessage(
      `${_.capitalize(theme)}`,
      { title: "New Theme Added" },
      `${_.capitalize(theme)} theme has been added to ${uiConfig.tailwindCSSLocation}`
    );
  });
