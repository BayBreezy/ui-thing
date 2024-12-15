import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import componentsData from "./components.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputTSPath = path.join(__dirname, "..", "server/utils", "comp.ts");
const folderName = "app/components/Ui";
const folderPath = path.join(__dirname, "..", folderName);

// Define a function to read the content of a file
function readFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// sort the components by value
componentsData.sort((a, b) => a.value.replace("-", "").localeCompare(b.value.replace("-", "")));

// Iterate through the components and create a new JSON object
const newComponentsData = componentsData.map((component) => {
  const newFiles = component.files.map((fileName) => {
    const filePath = path.join(folderPath, fileName);
    const dirPath = folderName;
    const fileContent = readFileContent(filePath);
    return { fileName, dirPath, fileContent };
  });
  // check if utils prop exists and load those files too
  const utilsFiles = component.utils?.map((fileName) => {
    const filePath = path.join(__dirname, "../app/utils", fileName);
    const dirPath = "utils";
    const fileContent = readFileContent(filePath);
    return { fileName, dirPath, fileContent };
  });
  // Check if composables exist and load those files too
  const composablesFiles = component.composables?.map((fileName) => {
    const filePath = path.join(__dirname, "../app/composables", fileName);
    const dirPath = "composables";
    const fileContent = readFileContent(filePath);
    return { fileName, dirPath, fileContent };
  });
  // Check if plugins exist and load those files too
  const pluginsFiles = component.plugins?.map((fileName) => {
    const filePath = path.join(__dirname, "../app/plugins", fileName);
    const dirPath = "plugins";
    const fileContent = readFileContent(filePath);
    return { fileName, dirPath, fileContent };
  });

  return {
    ...component,
    files: newFiles,
    utils: utilsFiles || [],
    composables: composablesFiles || [],
    plugins: pluginsFiles || [],
  };
});

const newDataJSON = JSON.stringify(newComponentsData, null, 2);
// Write data to a new comp.ts file
const newDataTS = `export default ${newDataJSON}`;
fs.writeFileSync(outputTSPath, newDataTS, "utf8");

console.log("Files created successfully!");
