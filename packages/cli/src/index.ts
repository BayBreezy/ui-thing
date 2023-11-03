import { Command } from "commander";
import figlet from "figlet";
import kleur from "kleur";

import { add } from "./commands/add";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const program = new Command();

console.clear();
console.log(kleur.bgBlack(kleur.cyan(figlet.textSync(" UI Thing "))));
console.log();

program
  .name("ui-thing")
  .description("CLI for adding ui-thing components to your Nuxt 3 application")
  .version("0.0.1")
  .addCommand(add);

program.parse(process.argv);
