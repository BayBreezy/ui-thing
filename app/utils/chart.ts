export function defaultColors(count: number = 3) {
  const quotient = Math.floor(count / 2);
  const remainder = count % 2;

  const primaryCount = quotient + remainder;
  const secondaryCount = quotient;
  return [
    ...Array.from(Array(primaryCount).keys()).map(
      (i) => `hsl(var(--vis-primary-color) / ${1 - (1 / primaryCount) * i})`
    ),
    ...Array.from(Array(secondaryCount).keys()).map(
      (i) => `hsl(var(--vis-secondary-color) / ${1 - (1 / secondaryCount) * i})`
    ),
  ];
}
