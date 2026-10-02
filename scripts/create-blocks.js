import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import { startCase } from "lodash-es";

import componentsData from "./components.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocksDir = path.join(__dirname, "..", "app/components/content/Block");
const blockComponentsOutputPath = path.join(__dirname, "..", "app/utils/block-components.ts");
const blocks = [];

function collapseIdentifier(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getComponentTagFromFile(fileName) {
  const parts = fileName
    .replace(/\.vue$/, "")
    .replace(/\.(client|server)$/, "")
    .split(/[\\/]/);
  const baseName = parts.pop();
  const pathPrefix = parts.join("");

  // Nuxt removes a repeated path prefix, e.g. ToggleGroup/ToggleGroupItem.vue becomes
  // UiToggleGroupItem rather than UiToggleGroupToggleGroupItem.
  return baseName.toLowerCase().startsWith(pathPrefix.toLowerCase())
    ? baseName
    : `${pathPrefix}${baseName}`;
}

const componentsByIdentifier = new Map();

for (const component of componentsData) {
  const identifiers = [
    component.value,
    component.name,
    ...component.files.map(getComponentTagFromFile),
  ];

  for (const identifier of identifiers) {
    const normalized = collapseIdentifier(identifier);
    const existing = componentsByIdentifier.get(normalized);

    if (existing && existing.value !== component.value) {
      throw new Error(
        `Component identifier "${identifier}" resolves to both "${existing.value}" and "${component.value}".`
      );
    }

    componentsByIdentifier.set(normalized, component);
  }
}

function resolveComponentTag(tag) {
  const normalized = collapseIdentifier(tag.replace(/^Ui/, ""));

  return componentsByIdentifier.get(normalized);
}

// Extract canonical component registry values from Vue file content.
function extractComponents(content, relativePath) {
  const components = new Set();
  const unresolvedTags = new Set();

  // Match Ui components (e.g., UiButton, UiCard, UiInput, etc.)
  const uiMatches = content.matchAll(/<(Ui[A-Z][a-zA-Z0-9]*)/g);
  for (const match of uiMatches) {
    const component = resolveComponentTag(match[1]);

    if (component) {
      components.add(component.value);
    } else {
      unresolvedTags.add(match[1]);
    }
  }

  if (unresolvedTags.size) {
    throw new Error(
      `Could not resolve UI Thing component tags in ${relativePath}: ${[...unresolvedTags].join(", ")}`
    );
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

      // Get relative path from Block directory
      const relativePath = path.relative(blocksDir, fullPath);

      // Extract components used
      const components = extractComponents(content, relativePath);

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

const blockComponents = Object.fromEntries(
  blocks.map((block) => [block.path.replace(/\.vue$/, ""), block.components.join(" ")])
);

const blockComponentsContent = `/**
 * Canonical UI Thing component requirements keyed by block path.
 * Generated automatically - do not edit manually.
 */
export default ${JSON.stringify(blockComponents, null, 2)} as const;
`;

fs.writeFileSync(blockComponentsOutputPath, blockComponentsContent, "utf8");

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
console.log(`📁 Component map: ${blockComponentsOutputPath}`);
