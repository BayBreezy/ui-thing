import { Command } from "commander";
import figlet from "figlet";
import kleur from "kleur";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const program = new Command();

console.clear();
console.log(kleur.cyan(figlet.textSync("UI Thing")));
console.log();

program
  .name("ui-thing")
  .description("CLI for adding ui-thing components to your Nuxt 3 application")
  .version("0.0.1");

program.parse(process.argv);
