import { $ } from "execa";
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

  if (deps && deps.length)
    await $`${packageManager} ${packageManager === "yarn" ? "add" : "install"} ${[
      ...(deps || []),
    ]}`;
  depsSpinner.text = "Installing dev dependencies...";
  if (devDeps && devDeps.length)
    await $`${packageManager} ${packageManager === "yarn" ? "add" : "install"} -D ${[
      ...(devDeps || []),
    ]}`;

  await $`${packageManager} run postinstall`;

  depsSpinner.succeed("Installed dependencies!");
};
