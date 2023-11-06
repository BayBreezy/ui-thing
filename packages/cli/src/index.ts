#!/usr/bin/env node
import { Command } from "commander";

import { add } from "./commands/add";
import { init } from "./commands/init";
import { addPrettier } from "./commands/prettier";
import { theme } from "./commands/theme";
import { printFancyBoxMessage } from "./utils/printFancyBoxMessage";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
process.on("SIGTSTP", () => process.exit(0));

const program = new Command();

console.clear();

printFancyBoxMessage("UI Thing", { title: "Welcome" });
console.log();

program
  .name("ui-thing")
  .description("CLI for adding ui-thing components to your Nuxt 3 application")
  .version("0.0.1")
  .addCommand(init)
  .addCommand(add)
  .addCommand(theme)
  .addCommand(addPrettier);

program.parse(process.argv);
