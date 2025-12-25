import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import proseData from "./prose.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputTSPath = path.join(__dirname, "..", "server/utils", "prose.ts");

// Define a function to read the content of a file
function readFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// Sort the prose components by value
proseData.sort((a, b) => a.value.replace("-", "").localeCompare(b.value.replace("-", "")));

// Iterate through the prose components and create a new JSON object
const newProseData = proseData.map((prose) => {
  // Read the main file content
  const mainFilePath = path.join(__dirname, "..", prose.filePath);
  const mainFileContent = readFileContent(mainFilePath);

  // Get the directory path from filePath
  const fileDir = path.dirname(prose.filePath);

  const result = {
    ...prose,
    file: {
      fileName: prose.fileName,
      dirPath: fileDir,
      fileContent: mainFileContent,
    },
  };

  // Check if utils prop exists and load those files too
  if (prose.utils && prose.utils.length > 0) {
    const utilsFiles = prose.utils.map((fileName) => {
      const filePath = path.join(__dirname, "../app/utils", fileName);
      const dirPath = "app/utils";
      const fileContent = readFileContent(filePath);
      return { fileName, dirPath, fileContent };
    });
    result.utils = utilsFiles;
  }

  // Check if composables exist and load those files too
  if (prose.composables && prose.composables.length > 0) {
    const composablesFiles = prose.composables.map((fileName) => {
      const filePath = path.join(__dirname, "../app/composables", `${fileName}.ts`);
      const dirPath = "app/composables";
      const fileContent = readFileContent(filePath);
      return { fileName: `${fileName}.ts`, dirPath, fileContent };
    });
    result.composables = composablesFiles;
  }

  // Check if plugins exist and load those files too
  if (prose.plugins && prose.plugins.length > 0) {
    const pluginsFiles = prose.plugins.map((fileName) => {
      const filePath = path.join(__dirname, "../app/plugins", `${fileName}.ts`);
      const dirPath = "app/plugins";
      const fileContent = readFileContent(filePath);
      return { fileName: `${fileName}.ts`, dirPath, fileContent };
    });
    result.plugins = pluginsFiles;
  }

  return result;
});

const newDataJSON = JSON.stringify(newProseData, null, 2);
// Write data to a new prose.ts file
const newDataTS = `/**
 * List of available prose components with their files, composables, plugins, and dependencies
 */
export default ${newDataJSON}`;
fs.writeFileSync(outputTSPath, newDataTS, "utf8");

console.log("✅ Prose components file created successfully!");
console.log(`📦 Total components: ${newProseData.length}`);
console.log(`📁 Output: ${outputTSPath}`);
