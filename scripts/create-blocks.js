import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { startCase } from "lodash-es";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocksDir = path.join(__dirname, "..", "app/components/content/Block");
const blocks = [];

// Helper function to extract component names from Vue file content
function extractComponents(content) {
  const components = new Set();

  // Match Ui components (e.g., UiButton, UiCard, UiInput, etc.)
  const uiMatches = content.matchAll(/<(Ui[A-Z][a-zA-Z]*)/g);
  for (const match of uiMatches) {
    // remove Ui prefix and lowercase it
    components.add(match[1].replace(/^Ui/, "").toLowerCase());
  }

  return Array.from(components).sort();
}

// Recursively scan directories
function scanDirectory(dir, category = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      scanDirectory(fullPath, entry.name);
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".vue") &&
      entry.name !== "BlockShowcase.vue"
    ) {
      // Read the file content
      const content = fs.readFileSync(fullPath, "utf8");

      // Extract components used
      const components = extractComponents(content);

      // Get relative path from Block directory
      const relativePath = path.relative(blocksDir, fullPath);

      // Create formatted name from filename
      const fileName = entry.name.replace(".vue", "").replace(".client", "");
      const formattedName = startCase(fileName.replace("Block", ""));

      blocks.push({
        name: formattedName,
        fileName: entry.name,
        file: content,
        category: category || "Other",
        path: relativePath,
        components: components,
      });
    }
  }
}

// Start scanning
scanDirectory(blocksDir);

// Sort by category then name
blocks.sort((a, b) => {
  if (a.category !== b.category) {
    return a.category.localeCompare(b.category);
  }
  return a.name.localeCompare(b.name);
});

// Generate the blocks.js file content
const fileContent = `/**
 * List of available blocks with their components and metadata
 * Generated automatically - do not edit manually
 */
export default ${JSON.stringify(blocks, null, 2)};
`;

// Write to blocks.js
const outputPath = path.join(__dirname, "..", "server/utils", "block-examples.ts");
fs.writeFileSync(outputPath, fileContent, "utf8");

console.log(`✅ Generated block-examples.ts with ${blocks.length} blocks`);
console.log(`📦 Categories: ${[...new Set(blocks.map((b) => b.category))].join(", ")}`);
console.log(`📁 Output: ${outputPath}`);
