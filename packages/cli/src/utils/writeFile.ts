import fs from "node:fs";
import path from "node:path";

import { fileExists } from "./fileExists";

export const writeFile = async (filePath: string, fileContent: string) => {
  // check if the file exists
  const exists = await fileExists(filePath);
  // if it doesn't, create it
  if (!exists) {
    // if it doesn't, create it
    const folderPath = path.dirname(filePath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }
  fs.writeFileSync(filePath, fileContent);
};
