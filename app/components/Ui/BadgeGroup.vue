<template>
  <div :class="rootClass" data-slot="badge-group">
    <template v-if="align === 'trailing'">
      <span
        v-if="theme === 'modern'"
        class="relative inline-flex shrink-0"
        data-slot="badge-group-dot-wrapper"
      >
        <span v-if="pulse" :class="dotClass" class="absolute animate-ping opacity-75" />
        <span :class="dotClass" data-slot="badge-group-dot" />
      </span>
      <slot />
      <span :class="addonClass" data-slot="badge-group-addon">
        {{ addonText }}
        <Icon v-if="icon" :name="icon" :class="iconClass" data-slot="badge-group-icon" />
      </span>
    </template>
    <template v-else>
      <span :class="addonClass" data-slot="badge-group-addon">
        <span
          v-if="theme === 'modern'"
          class="relative inline-flex shrink-0"
          data-slot="badge-group-dot-wrapper"
        >
          <span v-if="pulse" :class="dotClass" class="absolute animate-ping opacity-75" />
          <span :class="dotClass" data-slot="badge-group-dot" />
        </span>
        {{ addonText }}
      </span>
      <slot />
      <Icon v-if="icon" :name="icon" :class="iconClass" data-slot="badge-group-icon" />
    </template>
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type BadgeGroupSize = "md" | "lg";
  export type BadgeGroupColor =
    | "gray"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "error"
    | "warning"
    | "success";
  export type BadgeGroupTheme = "light" | "modern";
  export type BadgeGroupAlign = "leading" | "trailing";
</script>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /** The text shown in the badge addon pill */
      addonText: string;
      /** Size of the badge group */
      size?: BadgeGroupSize;
      /** Color variant — only applies to the light theme */
      color?: BadgeGroupColor;
      /** Visual theme: pill-style (light) or card-style with dot (modern) */
      theme?: BadgeGroupTheme;
      /** Whether the badge addon appears before or after the main text */
      align?: BadgeGroupAlign;
      /** Icon name passed to `<Icon>`. Set to `false` to hide the icon. */
      icon?: string | false;
      /** Animate the modern theme dot with a ping pulse */
      pulse?: boolean;
      /** Additional classes applied to the root element */
      class?: HTMLAttributes["class"];
    }>(),
    {
      size: "md",
      color: "blue",
      theme: "light",
      align: "leading",
      icon: "lucide:arrow-right",
    }
  );

  const slots = useSlots();

  const hasText = computed(() => {
    const nodes = slots.default?.();
    return !!(nodes && nodes.length > 0);
  });

  const hasIcon = computed(() => !!props.icon);

  // ─── Color maps ──────────────────────────────────────────────────────────────

  const lightRootColors: Record<BadgeGroupColor, string> = {
    gray: "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 ring-gray-200 dark:ring-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700",
    red: "bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-red-200 dark:ring-red-500 hover:bg-red-100 dark:hover:bg-red-900",
    orange:
      "bg-orange-50 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 ring-orange-200 dark:ring-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900",
    amber:
      "bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 ring-amber-200 dark:ring-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900",
    yellow:
      "bg-yellow-50 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 ring-yellow-200 dark:ring-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900",
    lime: "bg-lime-50 dark:bg-lime-900/50 text-lime-700 dark:text-lime-300 ring-lime-200 dark:ring-lime-500 hover:bg-lime-100 dark:hover:bg-lime-900",
    green:
      "bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 ring-green-200 dark:ring-green-500 hover:bg-green-100 dark:hover:bg-green-900",
    emerald:
      "bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 ring-emerald-200 dark:ring-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900",
    teal: "bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 ring-teal-200 dark:ring-teal-500 hover:bg-teal-100 dark:hover:bg-teal-900",
    cyan: "bg-cyan-50 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 ring-cyan-200 dark:ring-cyan-500 hover:bg-cyan-100 dark:hover:bg-cyan-900",
    sky: "bg-sky-50 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 ring-sky-200 dark:ring-sky-500 hover:bg-sky-100 dark:hover:bg-sky-900",
    blue: "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 ring-blue-200 dark:ring-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900",
    indigo:
      "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 ring-indigo-200 dark:ring-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900",
    violet:
      "bg-violet-50 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 ring-violet-200 dark:ring-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900",
    purple:
      "bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 ring-purple-200 dark:ring-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900",
    fuchsia:
      "bg-fuchsia-50 dark:bg-fuchsia-900/50 text-fuchsia-700 dark:text-fuchsia-300 ring-fuchsia-200 dark:ring-fuchsia-500 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900",
    pink: "bg-pink-50 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 ring-pink-200 dark:ring-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900",
    rose: "bg-rose-50 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 ring-rose-200 dark:ring-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900",
    error:
      "bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-red-200 dark:ring-red-500 hover:bg-red-100 dark:hover:bg-red-900",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 ring-yellow-200 dark:ring-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900",
    success:
      "bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 ring-green-200 dark:ring-green-500 hover:bg-green-100 dark:hover:bg-green-900",
  };

  const lightAddonColors: Record<BadgeGroupColor, string> = {
    gray: "bg-background text-current ring-gray-200 dark:ring-gray-500",
    red: "bg-background text-current ring-red-200 dark:ring-red-500",
    orange: "bg-background text-current ring-orange-200 dark:ring-orange-500",
    amber: "bg-background text-current ring-amber-200 dark:ring-amber-500",
    yellow: "bg-background text-current ring-yellow-200 dark:ring-yellow-500",
    lime: "bg-background text-current ring-lime-200 dark:ring-lime-500",
    green: "bg-background text-current ring-green-200 dark:ring-green-500",
    emerald: "bg-background text-current ring-emerald-200 dark:ring-emerald-500",
    teal: "bg-background text-current ring-teal-200 dark:ring-teal-500",
    cyan: "bg-background text-current ring-cyan-200 dark:ring-cyan-500",
    sky: "bg-background text-current ring-sky-200 dark:ring-sky-500",
    blue: "bg-background text-current ring-blue-200 dark:ring-blue-500",
    indigo: "bg-background text-current ring-indigo-200 dark:ring-indigo-500",
    violet: "bg-background text-current ring-violet-200 dark:ring-violet-500",
    purple: "bg-background text-current ring-purple-200 dark:ring-purple-500",
    fuchsia: "bg-background text-current ring-fuchsia-200 dark:ring-fuchsia-500",
    pink: "bg-background text-current ring-pink-200 dark:ring-pink-500",
    rose: "bg-background text-current ring-rose-200 dark:ring-rose-500",
    error: "bg-background text-current ring-red-200 dark:ring-red-500",
    warning: "bg-background text-current ring-yellow-200 dark:ring-yellow-500",
    success: "bg-background text-current ring-green-200 dark:ring-green-500",
  };

  const lightIconColors: Record<BadgeGroupColor, string> = {
    gray: "text-gray-500",
    red: "text-red-500",
    orange: "text-orange-500",
    amber: "text-amber-500",
    yellow: "text-yellow-500",
    lime: "text-lime-500",
    green: "text-green-500",
    emerald: "text-emerald-500",
    teal: "text-teal-500",
    cyan: "text-cyan-500",
    sky: "text-sky-500",
    blue: "text-blue-500",
    indigo: "text-indigo-500",
    violet: "text-violet-500",
    purple: "text-purple-500",
    fuchsia: "text-fuchsia-500",
    pink: "text-pink-500",
    rose: "text-rose-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    success: "text-green-500",
  };

  const modernDotColors: Record<BadgeGroupColor, string> = {
    gray: "bg-gray-500 outline-3 -outline-offset-1 outline-gray-100 dark:outline-gray-600/50",
    red: "bg-red-500 outline-3 -outline-offset-1 outline-red-100 dark:outline-red-600/50",
    orange:
      "bg-orange-500 outline-3 -outline-offset-1 outline-orange-100 dark:outline-orange-600/50",
    amber: "bg-amber-500 outline-3 -outline-offset-1 outline-amber-100 dark:outline-amber-600/50",
    yellow:
      "bg-yellow-500 outline-3 -outline-offset-1 outline-yellow-100 dark:outline-yellow-600/50",
    lime: "bg-lime-500 outline-3 -outline-offset-1 outline-lime-100 dark:outline-lime-600/50",
    green: "bg-green-500 outline-3 -outline-offset-1 outline-green-100 dark:outline-green-600/50",
    emerald:
      "bg-emerald-500 outline-3 -outline-offset-1 outline-emerald-100 dark:outline-emerald-600/50",
    teal: "bg-teal-500 outline-3 -outline-offset-1 outline-teal-100 dark:outline-teal-600/50",
    cyan: "bg-cyan-500 outline-3 -outline-offset-1 outline-cyan-100 dark:outline-cyan-600/50",
    sky: "bg-sky-500 outline-3 -outline-offset-1 outline-sky-100 dark:outline-sky-600/50",
    blue: "bg-blue-500 outline-3 -outline-offset-1 outline-blue-100 dark:outline-blue-600/50",
    indigo:
      "bg-indigo-500 outline-3 -outline-offset-1 outline-indigo-100 dark:outline-indigo-600/50",
    violet:
      "bg-violet-500 outline-3 -outline-offset-1 outline-violet-100 dark:outline-violet-600/50",
    purple:
      "bg-purple-500 outline-3 -outline-offset-1 outline-purple-100 dark:outline-purple-600/50",
    fuchsia:
      "bg-fuchsia-500 outline-3 -outline-offset-1 outline-fuchsia-100 dark:outline-fuchsia-600/50",
    pink: "bg-pink-500 outline-3 -outline-offset-1 outline-pink-100 dark:outline-pink-600/50",
    rose: "bg-rose-500 outline-3 -outline-offset-1 outline-rose-100 dark:outline-rose-600/50",
    error: "bg-red-500 outline-3 -outline-offset-1 outline-red-100 dark:outline-red-600/50",
    warning:
      "bg-yellow-500 outline-3 -outline-offset-1 outline-yellow-100 dark:outline-yellow-600/50",
    success: "bg-green-500 outline-3 -outline-offset-1 outline-green-100 dark:outline-green-600/50",
  };

  // ─── Computed classes ─────────────────────────────────────────────────────────

  const rootClass = computed(() => {
    const base =
      "inline-flex w-max cursor-pointer items-center transition duration-100 ease-linear";

    const themeBase =
      props.theme === "modern"
        ? "rounded-[10px] bg-background text-muted-foreground shadow-xs ring-1 ring-inset ring-border hover:bg-muted"
        : "rounded-full ring-1 ring-inset";

    const colorCls = props.theme === "light" ? lightRootColors[props.color] : "";

    let sizeCls: string;
    if (props.align === "leading") {
      const pr = !hasText.value && !hasIcon.value ? "pr-1" : "pr-2";
      sizeCls =
        props.size === "md"
          ? `py-1 ${pr} pl-1 text-xs font-medium`
          : `py-1 ${pr} pl-1 text-sm font-medium`;
    } else {
      const pl = props.theme === "modern" && props.size === "md" ? "pl-2.5" : "pl-3";
      sizeCls =
        props.size === "md"
          ? `py-1 pr-1 ${pl} text-xs font-medium`
          : `py-1 pr-1 pl-3 text-sm font-medium`;
    }

    return [base, themeBase, colorCls, sizeCls, normalizeClass(props.class) || undefined]
      .filter(Boolean)
      .join(" ");
  });

  const addonClass = computed(() => {
    const themeBase =
      props.theme === "modern"
        ? "inline-flex items-center rounded-md bg-background shadow-xs ring-1 ring-inset ring-border"
        : "inline-flex items-center rounded-full ring-1 ring-inset";

    const colorCls = props.theme === "light" ? lightAddonColors[props.color] : "";

    let sizeCls: string;
    if (props.align === "leading") {
      const margin = hasText.value ? "mr-2" : "";
      sizeCls =
        props.theme === "modern"
          ? props.size === "md"
            ? `gap-1 px-1.5 py-0.5 ${margin}`
            : `gap-1.5 px-2 py-0.5 ${margin}`
          : props.size === "md"
            ? `px-2 py-0.5 ${margin}`
            : `px-2.5 py-0.5 ${margin}`;
    } else {
      const margin = hasText.value ? "ml-2" : "";
      sizeCls =
        props.theme === "modern"
          ? props.size === "md"
            ? `py-0.5 pr-1.5 pl-2 ${margin}`
            : `py-0.5 pr-1.5 pl-2 ${margin}`
          : props.size === "md"
            ? `py-0.5 pr-1.5 pl-2 ${margin}`
            : `py-0.5 pr-2 pl-2.5 ${margin}`;
    }

    return [themeBase, colorCls, sizeCls].filter(Boolean).join(" ");
  });

  const dotClass = computed(() => {
    const base = "inline-block size-2 shrink-0 rounded-full";
    const position = props.align === "trailing" ? (props.size === "md" ? "mr-1.5" : "mr-2") : "";
    return [base, position, modernDotColors[props.color]].filter(Boolean).join(" ");
  });

  const iconClass = computed(() => {
    const colorCls = props.theme === "light" ? lightIconColors[props.color] : "text-gray-500";

    const sizeCls =
      props.align === "leading"
        ? "ml-1 size-4"
        : props.size === "md"
          ? "ml-0.5 size-3 stroke-[3px]"
          : "ml-1 size-3 stroke-[3px]";

    return [colorCls, sizeCls].filter(Boolean).join(" ");
  });
</script>
