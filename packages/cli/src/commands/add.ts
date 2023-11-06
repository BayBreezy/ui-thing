import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import kleur from "kleur";
import _ from "lodash";
import prompts from "prompts";

import allComponents from "../comp";
import { compareUIConfig } from "../utils/compareUIConfig";
import { addModuleToConfig, getNuxtConfig, getUIConfig, updateConfig } from "../utils/config";
import { fileExists } from "../utils/fileExists";
import { installPackages } from "../utils/installPackages";
import { printFancyBoxMessage } from "../utils/printFancyBoxMessage";
import { promptUserForComponents } from "../utils/promptForComponents";
import { writeFile } from "../utils/writeFile";

const currentDirectory = process.cwd();

const findComponent = (name: string) => {
  return allComponents.find((c) => c.value.toLowerCase() === name.toLowerCase());
};

/**
 * Adds a component to your project
 */
export const add = new Command()
  .name("add")
  .command("add")
  .description("Add a list of components to your project.")
  .argument("[componentNames...]", "Components that you want to add.")
  .action(async (components: Array<string>) => {
    // Get nuxt config
    const cfg = await getNuxtConfig();
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

    let componentNames = components;
    // if no components are passed, prompt the user to select components
    if (componentNames.length === 0) {
      const response = await promptUserForComponents();
      if ((response && response.length === 0) || !response) {
        consola.info("No components selected. Exiting...");
        process.exit(0);
      }
      componentNames = response;
    }

    // store the components that are not found
    let notFound: string[] = [];
    componentNames.forEach((c) => {
      if (!findComponent(c)) {
        notFound.push(c);
      }
    });
    if (notFound.length > 0) {
      consola.error(`The following components were not found: ${kleur.bgRed(notFound.join(", "))}`);
    }

    // store the components that are found
    let found: typeof allComponents = [];
    componentNames.forEach((c) => {
      if (findComponent(c)) {
        found.push(findComponent(c)!);
      }
    });
    // check if the found components depends on other components and add them to the list
    for (let i = 0; i < found.length; i++) {
      const component = found[i];
      if (component.components) {
        for (let j = 0; j < component.components.length; j++) {
          const comp = component.components[j];
          if (!found.find((c) => c.value === comp)) {
            found.push(findComponent(comp)!);
          }
        }
      }
    }

    // add the components & files associated with them
    for (let i = 0; i < found.length; i++) {
      const component = found[i];
      loop2: for (let k = 0; k < component.files.length; k++) {
        const file = component.files[k];
        let fileName = file.fileName;
        let dirPath = uiConfig.componentsLocation;
        let filePath = path.join(currentDirectory, dirPath, fileName);
        if (!uiConfig.useDefaultFilename) {
          const res = await prompts({
            type: "text",
            name: "value",
            message: `Where should we add the file`,
            initial: dirPath,
            onRender(kleur) {
              //@ts-ignore
              this.msg =
                kleur.bgCyan(" Location ") +
                ` Where should we add the file ${kleur.cyan(`${fileName}`)} `;
            },
          });
          if (res.value) {
            dirPath = res.value;
            filePath = path.join(currentDirectory, res.value, fileName);
          }
        }
        // Check if the file exists
        const exists = await fileExists(filePath);
        // if it exists & the force option was not passed, ask the user to confirm overwriting the file
        if (exists && !uiConfig.force) {
          const res = await prompts({
            type: "confirm",
            name: "value",
            message: `The file that we are trying to add ${kleur.bold(
              fileName
            )} to is already taken. Overwrite?`,
            initial: false,
          });
          if (!res.value) {
            consola.info(`We will not overwrite the file for ${kleur.cyan(fileName)}`);
            continue loop2;
          }
        }
        await writeFile(filePath, file.fileContent);

        // This is not scalable. We need to find a better way to do this
        if (component.value === "vue-sonner") {
          // Update the nuxt config
          cfg.defaultExport.imports ||= {};
          cfg.defaultExport.build ||= {};
          cfg.defaultExport.imports.imports ||= [];
          cfg.defaultExport.build.transpile ||= [];
          const sonnerExists = cfg.defaultExport.imports.imports.find(
            (i: any) => i.from === "vue-sonner" && i.name === "toast"
          );
          if (!sonnerExists) {
            cfg.defaultExport.imports.imports.push({
              from: "vue-sonner",
              name: "toast",
              as: "useSonner",
            });
          }
          const transpileExists = cfg.defaultExport.build.transpile.find((i: any) => "vue-sonner");
          if (!transpileExists) {
            cfg.defaultExport.build.transpile.push("vue-sonner");
          }
        }

        // add utils attached to the component
        loop3: for (let j = 0; j < component.utils.length; j++) {
          const util = component.utils[j];
          const filePath = path.join(currentDirectory, uiConfig.utilsLocation, util.fileName);
          // Check if the file exists
          const exists = await fileExists(filePath);
          if (exists && !uiConfig.force) {
            const res = await prompts({
              type: "confirm",
              name: "value",
              message: `The utils file that we are trying to add ${kleur.bold(
                util.fileName
              )} already exists. Overwrite?`,
              initial: true,
            });
            if (!res.value) {
              consola.info(`We will not overwrite the file for ${kleur.cyan(util.fileName)}`);
              continue loop3;
            }
          }
          await writeFile(filePath, util.fileContent);
        }
        // add composables attached to the component
        loop4: for (let j = 0; j < component.composables.length; j++) {
          const composable = component.composables[j];
          const filePath = path.join(
            currentDirectory,
            uiConfig.composablesLocation,
            composable.fileName
          );
          // Check if the file exists
          const exists = await fileExists(filePath);
          if (exists && !uiConfig.force) {
            const res = await prompts({
              type: "confirm",
              name: "value",
              message: `The composables file that we are trying to add ${kleur.bold(
                composable.fileName
              )} already exists. Overwrite?`,
              initial: true,
            });
            if (!res.value) {
              consola.info(`We will not overwrite the file for ${kleur.cyan(composable.fileName)}`);
              continue loop4;
            }
          }
          await writeFile(filePath, composable.fileContent);
        }
      }
    }
    // Add modules to nuxt config
    addModuleToConfig(cfg.nuxtConfig, _.uniq(found.map((c) => c.nuxtModules).flat()));
    // Write the changes to the nuxt config
    await updateConfig(cfg.nuxtConfig, "nuxt.config.ts");
    const foundDeps = _.uniq(found.map((c) => c.deps).flat());
    const foundDevDeps = _.uniq(found.map((c) => c.devDeps).flat());
    const { confirmInstall } = await prompts({
      type: "confirm",
      name: "confirmInstall",
      message: `Do you want to install the following packages: ${kleur.cyan(
        foundDeps.join(", ")
      )} ${kleur.cyan(foundDevDeps.join(", "))}`,
      initial: true,
    });
    if (confirmInstall) {
      await installPackages(uiConfig.packageManager, foundDeps, foundDevDeps);
    }

    printFancyBoxMessage(
      "All Done!",
      { title: "Components Added" },
      `Run the ${kleur.cyan("ui-thing@latest --help")} command to learn more.\n`
    );
    const combinedInstructions = found.map((c) => c.instructions).flat();
    // remove undefined from the array
    _.remove(combinedInstructions, (i) => !i);
    if (combinedInstructions.length > 0) {
      console.log(kleur.bgCyan(" Instructions "));
      combinedInstructions.forEach((i) => {
        console.log(`${kleur.cyan("-")} ${i}`);
      });
    }
  });
