/**
 * Every color a badge or a tag can have. `error`, `warning` and `success` are aliases of `red`,
 * `yellow` and `green`.
 */
export const badgeColors = [
  "primary",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "taupe",
  "mauve",
  "mist",
  "olive",
  "error",
  "warning",
  "success",
] as const;

export type BadgeColor = (typeof badgeColors)[number];

export type BadgeColorStyle = {
  /** Tinted background with a matching ring. */
  soft: string;
  /** Filled background. */
  solid: string;
  /** Transparent background with a colored ring. */
  outline: string;
  /** Background of a status dot. */
  dot: string;
};

/**
 * Tailwind can only see complete class names, so every color is written out. The classes only set
 * colors, add `ring-1 ring-inset` (or any other ring width) on the element that uses them.
 */
export const badgeColorClasses: Record<BadgeColor, BadgeColorStyle> = {
  primary: {
    soft: "bg-primary/10 text-primary ring-primary/20 dark:bg-primary/20 dark:ring-primary/40",
    solid: "bg-primary text-primary-foreground ring-primary",
    outline: "bg-transparent text-primary ring-primary/40",
    dot: "bg-primary",
  },
  red: {
    soft: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/50 dark:text-red-300 dark:ring-red-500/40",
    solid: "bg-red-600 text-white ring-red-600 dark:bg-red-500 dark:ring-red-500",
    outline: "bg-transparent text-red-700 ring-red-300 dark:text-red-300 dark:ring-red-500/60",
    dot: "bg-red-500",
  },
  orange: {
    soft: "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:ring-orange-500/40",
    solid: "bg-orange-600 text-white ring-orange-600 dark:bg-orange-500 dark:ring-orange-500",
    outline:
      "bg-transparent text-orange-700 ring-orange-300 dark:text-orange-300 dark:ring-orange-500/60",
    dot: "bg-orange-500",
  },
  amber: {
    soft: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:ring-amber-500/40",
    solid: "bg-amber-400 text-amber-950 ring-amber-400 dark:bg-amber-400 dark:ring-amber-400",
    outline:
      "bg-transparent text-amber-700 ring-amber-300 dark:text-amber-300 dark:ring-amber-500/60",
    dot: "bg-amber-500",
  },
  yellow: {
    soft: "bg-yellow-50 text-yellow-700 ring-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:ring-yellow-500/40",
    solid: "bg-yellow-400 text-yellow-950 ring-yellow-400 dark:bg-yellow-400 dark:ring-yellow-400",
    outline:
      "bg-transparent text-yellow-700 ring-yellow-300 dark:text-yellow-300 dark:ring-yellow-500/60",
    dot: "bg-yellow-500",
  },
  lime: {
    soft: "bg-lime-50 text-lime-700 ring-lime-200 dark:bg-lime-900/50 dark:text-lime-300 dark:ring-lime-500/40",
    solid: "bg-lime-400 text-lime-950 ring-lime-400 dark:bg-lime-400 dark:ring-lime-400",
    outline: "bg-transparent text-lime-700 ring-lime-300 dark:text-lime-300 dark:ring-lime-500/60",
    dot: "bg-lime-500",
  },
  green: {
    soft: "bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/50 dark:text-green-300 dark:ring-green-500/40",
    solid: "bg-green-600 text-white ring-green-600 dark:bg-green-500 dark:ring-green-500",
    outline:
      "bg-transparent text-green-700 ring-green-300 dark:text-green-300 dark:ring-green-500/60",
    dot: "bg-green-500",
  },
  emerald: {
    soft: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:ring-emerald-500/40",
    solid: "bg-emerald-600 text-white ring-emerald-600 dark:bg-emerald-500 dark:ring-emerald-500",
    outline:
      "bg-transparent text-emerald-700 ring-emerald-300 dark:text-emerald-300 dark:ring-emerald-500/60",
    dot: "bg-emerald-500",
  },
  teal: {
    soft: "bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:ring-teal-500/40",
    solid: "bg-teal-600 text-white ring-teal-600 dark:bg-teal-500 dark:ring-teal-500",
    outline: "bg-transparent text-teal-700 ring-teal-300 dark:text-teal-300 dark:ring-teal-500/60",
    dot: "bg-teal-500",
  },
  cyan: {
    soft: "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:ring-cyan-500/40",
    solid: "bg-cyan-600 text-white ring-cyan-600 dark:bg-cyan-500 dark:ring-cyan-500",
    outline: "bg-transparent text-cyan-700 ring-cyan-300 dark:text-cyan-300 dark:ring-cyan-500/60",
    dot: "bg-cyan-500",
  },
  sky: {
    soft: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:ring-sky-500/40",
    solid: "bg-sky-600 text-white ring-sky-600 dark:bg-sky-500 dark:ring-sky-500",
    outline: "bg-transparent text-sky-700 ring-sky-300 dark:text-sky-300 dark:ring-sky-500/60",
    dot: "bg-sky-500",
  },
  blue: {
    soft: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:ring-blue-500/40",
    solid: "bg-blue-600 text-white ring-blue-600 dark:bg-blue-500 dark:ring-blue-500",
    outline: "bg-transparent text-blue-700 ring-blue-300 dark:text-blue-300 dark:ring-blue-500/60",
    dot: "bg-blue-500",
  },
  indigo: {
    soft: "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:ring-indigo-500/40",
    solid: "bg-indigo-600 text-white ring-indigo-600 dark:bg-indigo-500 dark:ring-indigo-500",
    outline:
      "bg-transparent text-indigo-700 ring-indigo-300 dark:text-indigo-300 dark:ring-indigo-500/60",
    dot: "bg-indigo-500",
  },
  violet: {
    soft: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:ring-violet-500/40",
    solid: "bg-violet-600 text-white ring-violet-600 dark:bg-violet-500 dark:ring-violet-500",
    outline:
      "bg-transparent text-violet-700 ring-violet-300 dark:text-violet-300 dark:ring-violet-500/60",
    dot: "bg-violet-500",
  },
  purple: {
    soft: "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:ring-purple-500/40",
    solid: "bg-purple-600 text-white ring-purple-600 dark:bg-purple-500 dark:ring-purple-500",
    outline:
      "bg-transparent text-purple-700 ring-purple-300 dark:text-purple-300 dark:ring-purple-500/60",
    dot: "bg-purple-500",
  },
  fuchsia: {
    soft: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-900/50 dark:text-fuchsia-300 dark:ring-fuchsia-500/40",
    solid: "bg-fuchsia-600 text-white ring-fuchsia-600 dark:bg-fuchsia-500 dark:ring-fuchsia-500",
    outline:
      "bg-transparent text-fuchsia-700 ring-fuchsia-300 dark:text-fuchsia-300 dark:ring-fuchsia-500/60",
    dot: "bg-fuchsia-500",
  },
  pink: {
    soft: "bg-pink-50 text-pink-700 ring-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:ring-pink-500/40",
    solid: "bg-pink-600 text-white ring-pink-600 dark:bg-pink-500 dark:ring-pink-500",
    outline: "bg-transparent text-pink-700 ring-pink-300 dark:text-pink-300 dark:ring-pink-500/60",
    dot: "bg-pink-500",
  },
  rose: {
    soft: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:ring-rose-500/40",
    solid: "bg-rose-600 text-white ring-rose-600 dark:bg-rose-500 dark:ring-rose-500",
    outline: "bg-transparent text-rose-700 ring-rose-300 dark:text-rose-300 dark:ring-rose-500/60",
    dot: "bg-rose-500",
  },
  slate: {
    soft: "bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-900/50 dark:text-slate-300 dark:ring-slate-500/40",
    solid: "bg-slate-600 text-white ring-slate-600 dark:bg-slate-500 dark:ring-slate-500",
    outline:
      "bg-transparent text-slate-700 ring-slate-300 dark:text-slate-300 dark:ring-slate-500/60",
    dot: "bg-slate-500",
  },
  gray: {
    soft: "bg-gray-50 text-gray-700 ring-gray-200 dark:bg-gray-900/50 dark:text-gray-300 dark:ring-gray-500/40",
    solid: "bg-gray-600 text-white ring-gray-600 dark:bg-gray-500 dark:ring-gray-500",
    outline: "bg-transparent text-gray-700 ring-gray-300 dark:text-gray-300 dark:ring-gray-500/60",
    dot: "bg-gray-500",
  },
  zinc: {
    soft: "bg-zinc-50 text-zinc-700 ring-zinc-200 dark:bg-zinc-900/50 dark:text-zinc-300 dark:ring-zinc-500/40",
    solid: "bg-zinc-600 text-white ring-zinc-600 dark:bg-zinc-500 dark:ring-zinc-500",
    outline: "bg-transparent text-zinc-700 ring-zinc-300 dark:text-zinc-300 dark:ring-zinc-500/60",
    dot: "bg-zinc-500",
  },
  neutral: {
    soft: "bg-neutral-50 text-neutral-700 ring-neutral-200 dark:bg-neutral-900/50 dark:text-neutral-300 dark:ring-neutral-500/40",
    solid: "bg-neutral-600 text-white ring-neutral-600 dark:bg-neutral-500 dark:ring-neutral-500",
    outline:
      "bg-transparent text-neutral-700 ring-neutral-300 dark:text-neutral-300 dark:ring-neutral-500/60",
    dot: "bg-neutral-500",
  },
  stone: {
    soft: "bg-stone-50 text-stone-700 ring-stone-200 dark:bg-stone-900/50 dark:text-stone-300 dark:ring-stone-500/40",
    solid: "bg-stone-600 text-white ring-stone-600 dark:bg-stone-500 dark:ring-stone-500",
    outline:
      "bg-transparent text-stone-700 ring-stone-300 dark:text-stone-300 dark:ring-stone-500/60",
    dot: "bg-stone-500",
  },
  taupe: {
    soft: "bg-taupe-50 text-taupe-700 ring-taupe-200 dark:bg-taupe-900/50 dark:text-taupe-300 dark:ring-taupe-500/40",
    solid: "bg-taupe-600 text-white ring-taupe-600 dark:bg-taupe-500 dark:ring-taupe-500",
    outline:
      "bg-transparent text-taupe-700 ring-taupe-300 dark:text-taupe-300 dark:ring-taupe-500/60",
    dot: "bg-taupe-500",
  },
  mauve: {
    soft: "bg-mauve-50 text-mauve-700 ring-mauve-200 dark:bg-mauve-900/50 dark:text-mauve-300 dark:ring-mauve-500/40",
    solid: "bg-mauve-600 text-white ring-mauve-600 dark:bg-mauve-500 dark:ring-mauve-500",
    outline:
      "bg-transparent text-mauve-700 ring-mauve-300 dark:text-mauve-300 dark:ring-mauve-500/60",
    dot: "bg-mauve-500",
  },
  mist: {
    soft: "bg-mist-50 text-mist-700 ring-mist-200 dark:bg-mist-900/50 dark:text-mist-300 dark:ring-mist-500/40",
    solid: "bg-mist-600 text-white ring-mist-600 dark:bg-mist-500 dark:ring-mist-500",
    outline: "bg-transparent text-mist-700 ring-mist-300 dark:text-mist-300 dark:ring-mist-500/60",
    dot: "bg-mist-500",
  },
  olive: {
    soft: "bg-olive-50 text-olive-700 ring-olive-200 dark:bg-olive-900/50 dark:text-olive-300 dark:ring-olive-500/40",
    solid: "bg-olive-600 text-white ring-olive-600 dark:bg-olive-500 dark:ring-olive-500",
    outline:
      "bg-transparent text-olive-700 ring-olive-300 dark:text-olive-300 dark:ring-olive-500/60",
    dot: "bg-olive-500",
  },
  error: {
    soft: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/50 dark:text-red-300 dark:ring-red-500/40",
    solid: "bg-red-600 text-white ring-red-600 dark:bg-red-500 dark:ring-red-500",
    outline: "bg-transparent text-red-700 ring-red-300 dark:text-red-300 dark:ring-red-500/60",
    dot: "bg-red-500",
  },
  warning: {
    soft: "bg-yellow-50 text-yellow-700 ring-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:ring-yellow-500/40",
    solid: "bg-yellow-400 text-yellow-950 ring-yellow-400 dark:bg-yellow-400 dark:ring-yellow-400",
    outline:
      "bg-transparent text-yellow-700 ring-yellow-300 dark:text-yellow-300 dark:ring-yellow-500/60",
    dot: "bg-yellow-500",
  },
  success: {
    soft: "bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/50 dark:text-green-300 dark:ring-green-500/40",
    solid: "bg-green-600 text-white ring-green-600 dark:bg-green-500 dark:ring-green-500",
    outline:
      "bg-transparent text-green-700 ring-green-300 dark:text-green-300 dark:ring-green-500/60",
    dot: "bg-green-500",
  },
};
