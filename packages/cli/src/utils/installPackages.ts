import { execa } from "execa";
import _ from "lodash";
import ora from "ora";

export const installPackages = async (
  packageManager: string,
  deps?: string[] | string,
  devDeps?: string | string[]
) => {
  if (typeof deps === "string") {
    deps = [deps];
  }
  if (typeof devDeps === "string") {
    devDeps = [devDeps];
  }

  const depsSpinner = ora("Installing dependencies...").start();
  if (!_.isUndefined(deps) && !_.isEmpty(deps)) {
    await execa(packageManager, [packageManager === "yarn" ? "add" : "install", ...deps]);
  }
  depsSpinner.text = "Installing dev dependencies...";
  if (!_.isUndefined(devDeps) && !_.isEmpty(devDeps)) {
    await execa(packageManager, [packageManager === "yarn" ? "add" : "install", "-D", ...devDeps]);
  }
  await execa(packageManager, ["run", "postinstall"]);

  depsSpinner.succeed("Installed dependencies!");
};
