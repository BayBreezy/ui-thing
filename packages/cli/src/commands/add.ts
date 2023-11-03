import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import kleur from "kleur";
import { addDependency, addDevDependency, detectPackageManager } from "nypm";
import ora from "ora";
import prompts from "prompts";

import allComponents from "../comp";
import { fileExists } from "../utils/fileExists";
import { promptUserForComponents } from "../utils/promptUser";
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
  .option("-f --force", "Overwrite files if the component already exists.", false)
  .option("-d --default-filename", "Use the default filename for the component.", false)
  .option(
    "-i --install-deps",
    "Install the dependencies needed for the components being added",
    true
  )
  .argument("[componentNames...]", "Components that you want to add.")
  .action(
    async (components: Array<string>, options: { force?: boolean; defaultFilename?: boolean }) => {
      let componentNames = components;
      // if no components are passed, prompt the user to select components
      if (componentNames.length === 0) {
        const response = await promptUserForComponents();
        if ((response && response.length === 0) || !response) {
          consola.info("No components selected. Exiting.");
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
        consola.error(
          `The following components were not found: ${kleur.bgRed(notFound.join(", "))}`
        );
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
      loop1: for (let i = 0; i < found.length; i++) {
        const component = found[i];
        loop2: for (let k = 0; k < component.files.length; k++) {
          const file = component.files[k];
          let fileName = file.fileName;
          let dirPath = file.dirPath;
          let filePath = path.join(currentDirectory, dirPath, fileName);
          if (!options.defaultFilename) {
            const res = await prompts({
              type: "text",
              name: "value",
              message: `Where should we add the file`,
              initial: file.dirPath,
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
          if (exists && !options.force) {
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
          consola.success(` Added ${kleur.bold(fileName)}`);
          await addComponentDeps(component.deps);
        }
        // add utils attached to the component
        loop3: for (let j = 0; j < component.utils.length; j++) {
          const util = component.utils[j];
          const filePath = path.join(currentDirectory, util.dirPath, util.fileName);
          // Check if the file exists
          const exists = await fileExists(filePath);
          if (exists) {
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
          consola.success(` Added ${kleur.bold(util.fileName)}`);
        }
        // add composables attached to the component
        loop4: for (let j = 0; j < component.composables.length; j++) {
          const composable = component.composables[j];
          const filePath = path.join(currentDirectory, composable.dirPath, composable.fileName);
          // Check if the file exists
          const exists = await fileExists(filePath);
          if (exists) {
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
          consola.success(` Added ${kleur.bold(composable.fileName)}`);
        }
      }
    }
  );

const addComponentDeps = async (deps: string[], devDeps?: string[]) => {
  // install dependencies
  const packageManager = await detectPackageManager(currentDirectory);
  if (packageManager && packageManager.name) {
    const depsSpinner = ora(
      `Installing dependencies with ${kleur.cyan(packageManager?.name)}...`
    ).start();
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      await addDependency(dep, { cwd: currentDirectory });
    }
    if (devDeps) {
      for (let i = 0; i < devDeps.length; i++) {
        const devDep = devDeps[i];
        await addDevDependency(devDep, { cwd: currentDirectory });
      }
    }

    depsSpinner.succeed("Installed dependencies");
  }
};
