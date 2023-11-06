import { UIConfig } from "../types";
import { getUIConfig } from "./config";

/**
 * Compares the UI config with a temporary config to see if any properties are missing
 * @returns {boolean} - Returns true if all properties are present
 */
export const compareUIConfig = async () => {
  // Get ui config
  let userConfig: UIConfig = await getUIConfig();
  const tempConfig: UIConfig = {
    theme: "string",
    tailwindCSSLocation: "string",
    tailwindConfigLocation: "string",
    componentsLocation: "string",
    composablesLocation: "string",
    utilsLocation: "string",
    force: true,
    useDefaultFilename: true,
    packageManager: "string",
  };

  const missingProperties: string[] = [];

  for (const key of Object.keys(tempConfig)) {
    if (userConfig[key as keyof UIConfig] === undefined) {
      missingProperties.push(key);
    }
  }

  if (missingProperties.length > 0) {
    return false;
  }
  return true;
};
