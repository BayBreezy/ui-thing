export type FloatingSurfaceTone = "background" | "popover";
export type FloatingArrowShape = "square" | "svg";

export function getTranslucentFloatingPanelClasses(tone: FloatingSurfaceTone) {
  if (tone === "background") {
    return [
      "bg-background/68",
      "supports-backdrop-filter:bg-background/42",
      "supports-backdrop-filter:backdrop-blur-2xl",
      "supports-backdrop-filter:backdrop-saturate-150",
      "supports-backdrop-filter:backdrop-brightness-110",
      "border-border/50",
      "shadow-2xl shadow-black/14 dark:shadow-black/42",
    ].join(" ");
  }

  return [
    "bg-popover/68",
    "supports-backdrop-filter:bg-popover/40",
    "supports-backdrop-filter:backdrop-blur-2xl",
    "supports-backdrop-filter:backdrop-saturate-150",
    "supports-backdrop-filter:backdrop-brightness-110",
    "border-border/50",
    "shadow-xl shadow-black/12 dark:shadow-black/36",
  ].join(" ");
}

export function getTranslucentFloatingArrowClasses(
  tone: FloatingSurfaceTone,
  shape: FloatingArrowShape = "svg"
) {
  const fillClass = tone === "background" ? "fill-background" : "fill-popover";

  if (shape === "square") {
    return [
      tone === "background" ? "bg-background/68" : "bg-popover/68",
      tone === "background"
        ? "supports-backdrop-filter:bg-background/42"
        : "supports-backdrop-filter:bg-popover/40",
      "supports-backdrop-filter:backdrop-blur-2xl",
      "supports-backdrop-filter:backdrop-saturate-150",
      "supports-backdrop-filter:backdrop-brightness-110",
      "border-border/50",
      "shadow-lg shadow-black/12 dark:shadow-black/36",
    ].join(" ");
  }

  return [
    `${fillClass}/68`,
    tone === "background"
      ? "supports-backdrop-filter:fill-background/42"
      : "supports-backdrop-filter:fill-popover/40",
    "stroke-border/50 [stroke-width:1px]",
    "drop-shadow-[0_10px_22px_rgb(0_0_0/0.16)] dark:drop-shadow-[0_12px_24px_rgb(0_0_0/0.4)]",
  ].join(" ");
}
