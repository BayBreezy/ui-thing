import boxen from "boxen";
import figlet from "figlet";
import type { Options } from "boxen";

export const printFancyBoxMessage = (title: string, boxOptions?: Options, description?: string) => {
  console.log("\n");
  console.log(
    boxen(figlet.textSync(title), {
      borderColor: "greenBright",
      padding: 1,
      borderStyle: "round",
      titleAlignment: "center",
      ...boxOptions,
    })
  );
  if (description) {
    console.log(`\n${description}`);
  }
};
