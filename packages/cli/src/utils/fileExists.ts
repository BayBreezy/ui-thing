import fs from "node:fs";

export const fileExists = async (path: string) => {
  try {
    await fs.promises.access(path, fs.constants.F_OK || fs.constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
};
