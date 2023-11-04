import { $ } from "execa";
import { addDependency, addDevDependency } from "nypm";
import ora from "ora";

export const installPackages = async (
  packageManager: string,
  deps?: string[] | string,
  devDeps?: string | string[]
) => {
  const depsSpinner = ora("Installing dependencies...").start();
  if (typeof deps === "string") {
    deps = [deps];
  }
  if (typeof devDeps === "string") {
    devDeps = [devDeps];
  }

  if (deps && deps.length) {
    for (const dep of deps) {
      await addDependency(dep, {
        cwd: process.cwd(),
        silent: true,
        packageManager: {
          command: packageManager,
          name: packageManager as any,
        },
      });
    }
  }
  depsSpinner.text = "Installing dev dependencies...";
  if (devDeps && devDeps.length) {
    for (const dep of devDeps) {
      await addDevDependency(dep, {
        cwd: process.cwd(),
        silent: true,
        packageManager: {
          command: packageManager,
          name: packageManager as any,
        },
      });
    }
  }
  await $`${packageManager} run postinstall`;

  depsSpinner.succeed("Installed dependencies!");
};
