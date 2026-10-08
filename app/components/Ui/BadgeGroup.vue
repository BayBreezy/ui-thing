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

  import { badgeColorClasses } from "~/utils/badge-colors";
  import type { BadgeColor } from "~/utils/badge-colors";

  export type BadgeGroupSize = "md" | "lg";
  export type BadgeGroupColor = BadgeColor;
  export type BadgeGroupTheme = "light" | "modern";
  export type BadgeGroupAlign = "leading" | "trailing";
</script>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /** The text shown in the badge addon pill. */
      addonText: string;
      /** Size of the badge group. */
      size?: BadgeGroupSize;
      /** Color variant — only applies to the light theme. */
      color?: BadgeGroupColor;
      /** Visual theme: pill-style (light) or card-style with dot (modern) */
      theme?: BadgeGroupTheme;
      /** Whether the badge addon appears before or after the main text. */
      align?: BadgeGroupAlign;
      /** Icon name passed to `<Icon>`. Set to `false` to hide the icon. */
      icon?: string | false;
      /** Animate the modern theme dot with a ping pulse. */
      pulse?: boolean;
      /** Additional classes applied to the root element. */
      class?: HTMLAttributes["class"];
    }>(),
    {
      size: "md",
      color: "primary",
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

  // ─── Computed classes ─────────────────────────────────────────────────────────

  const rootClass = computed(() => {
    const base =
      "inline-flex w-max cursor-pointer items-center transition duration-100 ease-linear";

    const themeBase =
      props.theme === "modern"
        ? "rounded-md bg-background text-muted-foreground shadow-xs ring-1 ring-inset ring-border hover:bg-muted"
        : "rounded-full ring-1 ring-inset";

    const colorCls =
      props.theme === "light"
        ? `${badgeColorClasses[props.color].soft} hover:brightness-95 dark:hover:brightness-125`
        : "";

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

    const colorCls =
      props.theme === "light"
        ? `bg-background text-current ${badgeColorClasses[props.color].ring}`
        : "";

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
    return [
      base,
      position,
      `${badgeColorClasses[props.color].dot} outline-3 -outline-offset-1 ${badgeColorClasses[props.color].dotRing}`,
    ]
      .filter(Boolean)
      .join(" ");
  });

  const iconClass = computed(() => {
    const colorCls =
      props.theme === "light" ? badgeColorClasses[props.color].accent : "text-gray-500";

    const sizeCls =
      props.align === "leading"
        ? "ml-1 size-4"
        : props.size === "md"
          ? "ml-0.5 size-3 stroke-[3px]"
          : "ml-1 size-3 stroke-[3px]";

    return [colorCls, sizeCls].filter(Boolean).join(" ");
  });
</script>
