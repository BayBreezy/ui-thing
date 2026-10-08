<template>
  <TagGroupItem
    v-slot="slotProps"
    data-slot="tag-group-item"
    v-bind="forwarded"
    :class="
      styles.base({
        class: [
          colorClasses[resolved.color][resolved.variant],
          normalizeClass(props.class) || undefined,
        ],
      })
    "
  >
    <slot name="leading" v-bind="slotProps">
      <Icon v-if="slotProps.selected && showCheck" name="lucide:check" :class="styles.icon()" />
      <span
        v-else-if="dot || (resolved.variant === 'modern' && !avatar && !icon)"
        data-slot="tag-group-item-dot"
        :class="styles.dot({ class: colorClasses[resolved.color].dot })"
      />
      <img
        v-else-if="avatar"
        :src="avatar"
        alt=""
        data-slot="tag-group-item-avatar"
        :class="styles.avatar()"
      />
      <Icon v-else-if="icon" :name="icon" :class="styles.icon()" />
    </slot>
    <UiTagGroupItemText>
      <slot v-bind="slotProps">{{ typeof value === "object" ? "" : value }}</slot>
    </UiTagGroupItemText>
    <slot name="trailing" v-bind="slotProps">
      <Icon v-if="trailingIcon" :name="trailingIcon" :class="styles.icon()" />
    </slot>
    <slot v-if="removable" name="delete" v-bind="slotProps">
      <UiTagGroupItemDelete :icon="deleteIcon" />
    </slot>
  </TagGroupItem>
</template>

<script lang="ts">
  import { TagGroupItem, useForwardProps } from "reka-ui";
  import type { TagGroupItemProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { tagGroupInjectionKey } from "./TagGroup.vue";
  import type { TagGroupColor, TagGroupShape, TagGroupSize, TagGroupVariant } from "./TagGroup.vue";

  export const tagGroupItemStyles = tv({
    slots: {
      base: "inline-flex w-max max-w-full shrink-0 items-center font-medium whitespace-nowrap ring-1 transition-[color,background-color,box-shadow] duration-150 outline-none select-none ring-inset focus-visible:ring-2 focus-visible:ring-current/60 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state]:cursor-pointer",
      icon: "shrink-0",
      dot: "shrink-0 rounded-full",
      avatar: "shrink-0 rounded-full object-cover",
    },
    variants: {
      size: {
        sm: {
          base: "gap-1 px-2 py-0.5 text-xs",
          icon: "size-3",
          dot: "size-1.5",
          avatar: "size-3.5",
        },
        md: {
          base: "gap-1.5 px-2.5 py-0.5 text-sm",
          icon: "size-3.5",
          dot: "size-2",
          avatar: "size-4",
        },
        lg: { base: "gap-1.5 px-3 py-1 text-sm", icon: "size-4", dot: "size-2", avatar: "size-5" },
      },
      shape: {
        pill: { base: "rounded-full" },
        rounded: { base: "rounded-md" },
      },
      variant: {
        soft: {},
        solid: {},
        outline: {},
        modern: {
          base: "bg-background text-foreground ring-border dark:bg-input/30 data-[state]:hover:bg-muted shadow-xs",
        },
      },
    },
    defaultVariants: { size: "md", shape: "pill", variant: "soft" },
  });

  // Tailwind can only see complete class names, so every color is written out. `modern` only
  // colors the dot and the checked ring, the rest of that variant is neutral.
  const colorClasses: Record<
    TagGroupColor,
    { soft: string; solid: string; outline: string; modern: string; dot: string }
  > = {
    primary: {
      soft: "bg-primary/10 text-primary ring-primary/20 dark:bg-primary/20 dark:ring-primary/40 data-[state]:hover:bg-primary/15 dark:data-[state]:hover:bg-primary/30 data-[state=checked]:bg-primary/15 data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
      solid:
        "bg-primary text-primary-foreground ring-primary data-[state]:hover:bg-primary/90 data-[state=checked]:ring-2 data-[state=checked]:ring-primary/40",
      outline:
        "bg-transparent text-primary ring-primary/40 data-[state]:hover:bg-primary/10 data-[state=checked]:bg-primary/10 data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
      dot: "bg-primary",
    },
    red: {
      soft: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/50 dark:text-red-300 dark:ring-red-500/40 data-[state]:hover:bg-red-100 dark:data-[state]:hover:bg-red-900 data-[state=checked]:bg-red-100 data-[state=checked]:ring-2 data-[state=checked]:ring-red-500 dark:data-[state=checked]:bg-red-900",
      solid:
        "bg-red-600 text-white ring-red-600 dark:bg-red-500 dark:ring-red-500 data-[state]:hover:bg-red-700 dark:data-[state]:hover:bg-red-600 data-[state=checked]:ring-2 data-[state=checked]:ring-red-900 dark:data-[state=checked]:ring-red-200",
      outline:
        "bg-transparent text-red-700 ring-red-300 dark:text-red-300 dark:ring-red-500/60 data-[state]:hover:bg-red-50 dark:data-[state]:hover:bg-red-900/40 data-[state=checked]:bg-red-50 data-[state=checked]:ring-2 data-[state=checked]:ring-red-500 dark:data-[state=checked]:bg-red-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-red-500",
      dot: "bg-red-500",
    },
    orange: {
      soft: "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:ring-orange-500/40 data-[state]:hover:bg-orange-100 dark:data-[state]:hover:bg-orange-900 data-[state=checked]:bg-orange-100 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-500 dark:data-[state=checked]:bg-orange-900",
      solid:
        "bg-orange-600 text-white ring-orange-600 dark:bg-orange-500 dark:ring-orange-500 data-[state]:hover:bg-orange-700 dark:data-[state]:hover:bg-orange-600 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-900 dark:data-[state=checked]:ring-orange-200",
      outline:
        "bg-transparent text-orange-700 ring-orange-300 dark:text-orange-300 dark:ring-orange-500/60 data-[state]:hover:bg-orange-50 dark:data-[state]:hover:bg-orange-900/40 data-[state=checked]:bg-orange-50 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-500 dark:data-[state=checked]:bg-orange-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-orange-500",
      dot: "bg-orange-500",
    },
    amber: {
      soft: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:ring-amber-500/40 data-[state]:hover:bg-amber-100 dark:data-[state]:hover:bg-amber-900 data-[state=checked]:bg-amber-100 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-500 dark:data-[state=checked]:bg-amber-900",
      solid:
        "bg-amber-400 text-amber-950 ring-amber-400 dark:bg-amber-400 dark:ring-amber-400 data-[state]:hover:bg-amber-500 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-800 dark:data-[state=checked]:ring-amber-100",
      outline:
        "bg-transparent text-amber-700 ring-amber-300 dark:text-amber-300 dark:ring-amber-500/60 data-[state]:hover:bg-amber-50 dark:data-[state]:hover:bg-amber-900/40 data-[state=checked]:bg-amber-50 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-500 dark:data-[state=checked]:bg-amber-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-amber-500",
      dot: "bg-amber-500",
    },
    yellow: {
      soft: "bg-yellow-50 text-yellow-700 ring-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:ring-yellow-500/40 data-[state]:hover:bg-yellow-100 dark:data-[state]:hover:bg-yellow-900 data-[state=checked]:bg-yellow-100 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-500 dark:data-[state=checked]:bg-yellow-900",
      solid:
        "bg-yellow-400 text-yellow-950 ring-yellow-400 dark:bg-yellow-400 dark:ring-yellow-400 data-[state]:hover:bg-yellow-500 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-800 dark:data-[state=checked]:ring-yellow-100",
      outline:
        "bg-transparent text-yellow-700 ring-yellow-300 dark:text-yellow-300 dark:ring-yellow-500/60 data-[state]:hover:bg-yellow-50 dark:data-[state]:hover:bg-yellow-900/40 data-[state=checked]:bg-yellow-50 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-500 dark:data-[state=checked]:bg-yellow-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-500",
      dot: "bg-yellow-500",
    },
    lime: {
      soft: "bg-lime-50 text-lime-700 ring-lime-200 dark:bg-lime-900/50 dark:text-lime-300 dark:ring-lime-500/40 data-[state]:hover:bg-lime-100 dark:data-[state]:hover:bg-lime-900 data-[state=checked]:bg-lime-100 data-[state=checked]:ring-2 data-[state=checked]:ring-lime-500 dark:data-[state=checked]:bg-lime-900",
      solid:
        "bg-lime-400 text-lime-950 ring-lime-400 dark:bg-lime-400 dark:ring-lime-400 data-[state]:hover:bg-lime-500 data-[state=checked]:ring-2 data-[state=checked]:ring-lime-800 dark:data-[state=checked]:ring-lime-100",
      outline:
        "bg-transparent text-lime-700 ring-lime-300 dark:text-lime-300 dark:ring-lime-500/60 data-[state]:hover:bg-lime-50 dark:data-[state]:hover:bg-lime-900/40 data-[state=checked]:bg-lime-50 data-[state=checked]:ring-2 data-[state=checked]:ring-lime-500 dark:data-[state=checked]:bg-lime-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-lime-500",
      dot: "bg-lime-500",
    },
    green: {
      soft: "bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/50 dark:text-green-300 dark:ring-green-500/40 data-[state]:hover:bg-green-100 dark:data-[state]:hover:bg-green-900 data-[state=checked]:bg-green-100 data-[state=checked]:ring-2 data-[state=checked]:ring-green-500 dark:data-[state=checked]:bg-green-900",
      solid:
        "bg-green-600 text-white ring-green-600 dark:bg-green-500 dark:ring-green-500 data-[state]:hover:bg-green-700 dark:data-[state]:hover:bg-green-600 data-[state=checked]:ring-2 data-[state=checked]:ring-green-900 dark:data-[state=checked]:ring-green-200",
      outline:
        "bg-transparent text-green-700 ring-green-300 dark:text-green-300 dark:ring-green-500/60 data-[state]:hover:bg-green-50 dark:data-[state]:hover:bg-green-900/40 data-[state=checked]:bg-green-50 data-[state=checked]:ring-2 data-[state=checked]:ring-green-500 dark:data-[state=checked]:bg-green-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-green-500",
      dot: "bg-green-500",
    },
    emerald: {
      soft: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:ring-emerald-500/40 data-[state]:hover:bg-emerald-100 dark:data-[state]:hover:bg-emerald-900 data-[state=checked]:bg-emerald-100 data-[state=checked]:ring-2 data-[state=checked]:ring-emerald-500 dark:data-[state=checked]:bg-emerald-900",
      solid:
        "bg-emerald-600 text-white ring-emerald-600 dark:bg-emerald-500 dark:ring-emerald-500 data-[state]:hover:bg-emerald-700 dark:data-[state]:hover:bg-emerald-600 data-[state=checked]:ring-2 data-[state=checked]:ring-emerald-900 dark:data-[state=checked]:ring-emerald-200",
      outline:
        "bg-transparent text-emerald-700 ring-emerald-300 dark:text-emerald-300 dark:ring-emerald-500/60 data-[state]:hover:bg-emerald-50 dark:data-[state]:hover:bg-emerald-900/40 data-[state=checked]:bg-emerald-50 data-[state=checked]:ring-2 data-[state=checked]:ring-emerald-500 dark:data-[state=checked]:bg-emerald-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-emerald-500",
      dot: "bg-emerald-500",
    },
    teal: {
      soft: "bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:ring-teal-500/40 data-[state]:hover:bg-teal-100 dark:data-[state]:hover:bg-teal-900 data-[state=checked]:bg-teal-100 data-[state=checked]:ring-2 data-[state=checked]:ring-teal-500 dark:data-[state=checked]:bg-teal-900",
      solid:
        "bg-teal-600 text-white ring-teal-600 dark:bg-teal-500 dark:ring-teal-500 data-[state]:hover:bg-teal-700 dark:data-[state]:hover:bg-teal-600 data-[state=checked]:ring-2 data-[state=checked]:ring-teal-900 dark:data-[state=checked]:ring-teal-200",
      outline:
        "bg-transparent text-teal-700 ring-teal-300 dark:text-teal-300 dark:ring-teal-500/60 data-[state]:hover:bg-teal-50 dark:data-[state]:hover:bg-teal-900/40 data-[state=checked]:bg-teal-50 data-[state=checked]:ring-2 data-[state=checked]:ring-teal-500 dark:data-[state=checked]:bg-teal-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-teal-500",
      dot: "bg-teal-500",
    },
    cyan: {
      soft: "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:ring-cyan-500/40 data-[state]:hover:bg-cyan-100 dark:data-[state]:hover:bg-cyan-900 data-[state=checked]:bg-cyan-100 data-[state=checked]:ring-2 data-[state=checked]:ring-cyan-500 dark:data-[state=checked]:bg-cyan-900",
      solid:
        "bg-cyan-600 text-white ring-cyan-600 dark:bg-cyan-500 dark:ring-cyan-500 data-[state]:hover:bg-cyan-700 dark:data-[state]:hover:bg-cyan-600 data-[state=checked]:ring-2 data-[state=checked]:ring-cyan-900 dark:data-[state=checked]:ring-cyan-200",
      outline:
        "bg-transparent text-cyan-700 ring-cyan-300 dark:text-cyan-300 dark:ring-cyan-500/60 data-[state]:hover:bg-cyan-50 dark:data-[state]:hover:bg-cyan-900/40 data-[state=checked]:bg-cyan-50 data-[state=checked]:ring-2 data-[state=checked]:ring-cyan-500 dark:data-[state=checked]:bg-cyan-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-cyan-500",
      dot: "bg-cyan-500",
    },
    sky: {
      soft: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:ring-sky-500/40 data-[state]:hover:bg-sky-100 dark:data-[state]:hover:bg-sky-900 data-[state=checked]:bg-sky-100 data-[state=checked]:ring-2 data-[state=checked]:ring-sky-500 dark:data-[state=checked]:bg-sky-900",
      solid:
        "bg-sky-600 text-white ring-sky-600 dark:bg-sky-500 dark:ring-sky-500 data-[state]:hover:bg-sky-700 dark:data-[state]:hover:bg-sky-600 data-[state=checked]:ring-2 data-[state=checked]:ring-sky-900 dark:data-[state=checked]:ring-sky-200",
      outline:
        "bg-transparent text-sky-700 ring-sky-300 dark:text-sky-300 dark:ring-sky-500/60 data-[state]:hover:bg-sky-50 dark:data-[state]:hover:bg-sky-900/40 data-[state=checked]:bg-sky-50 data-[state=checked]:ring-2 data-[state=checked]:ring-sky-500 dark:data-[state=checked]:bg-sky-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-sky-500",
      dot: "bg-sky-500",
    },
    blue: {
      soft: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:ring-blue-500/40 data-[state]:hover:bg-blue-100 dark:data-[state]:hover:bg-blue-900 data-[state=checked]:bg-blue-100 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500 dark:data-[state=checked]:bg-blue-900",
      solid:
        "bg-blue-600 text-white ring-blue-600 dark:bg-blue-500 dark:ring-blue-500 data-[state]:hover:bg-blue-700 dark:data-[state]:hover:bg-blue-600 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-900 dark:data-[state=checked]:ring-blue-200",
      outline:
        "bg-transparent text-blue-700 ring-blue-300 dark:text-blue-300 dark:ring-blue-500/60 data-[state]:hover:bg-blue-50 dark:data-[state]:hover:bg-blue-900/40 data-[state=checked]:bg-blue-50 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500 dark:data-[state=checked]:bg-blue-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500",
      dot: "bg-blue-500",
    },
    indigo: {
      soft: "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:ring-indigo-500/40 data-[state]:hover:bg-indigo-100 dark:data-[state]:hover:bg-indigo-900 data-[state=checked]:bg-indigo-100 data-[state=checked]:ring-2 data-[state=checked]:ring-indigo-500 dark:data-[state=checked]:bg-indigo-900",
      solid:
        "bg-indigo-600 text-white ring-indigo-600 dark:bg-indigo-500 dark:ring-indigo-500 data-[state]:hover:bg-indigo-700 dark:data-[state]:hover:bg-indigo-600 data-[state=checked]:ring-2 data-[state=checked]:ring-indigo-900 dark:data-[state=checked]:ring-indigo-200",
      outline:
        "bg-transparent text-indigo-700 ring-indigo-300 dark:text-indigo-300 dark:ring-indigo-500/60 data-[state]:hover:bg-indigo-50 dark:data-[state]:hover:bg-indigo-900/40 data-[state=checked]:bg-indigo-50 data-[state=checked]:ring-2 data-[state=checked]:ring-indigo-500 dark:data-[state=checked]:bg-indigo-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-indigo-500",
      dot: "bg-indigo-500",
    },
    violet: {
      soft: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:ring-violet-500/40 data-[state]:hover:bg-violet-100 dark:data-[state]:hover:bg-violet-900 data-[state=checked]:bg-violet-100 data-[state=checked]:ring-2 data-[state=checked]:ring-violet-500 dark:data-[state=checked]:bg-violet-900",
      solid:
        "bg-violet-600 text-white ring-violet-600 dark:bg-violet-500 dark:ring-violet-500 data-[state]:hover:bg-violet-700 dark:data-[state]:hover:bg-violet-600 data-[state=checked]:ring-2 data-[state=checked]:ring-violet-900 dark:data-[state=checked]:ring-violet-200",
      outline:
        "bg-transparent text-violet-700 ring-violet-300 dark:text-violet-300 dark:ring-violet-500/60 data-[state]:hover:bg-violet-50 dark:data-[state]:hover:bg-violet-900/40 data-[state=checked]:bg-violet-50 data-[state=checked]:ring-2 data-[state=checked]:ring-violet-500 dark:data-[state=checked]:bg-violet-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-violet-500",
      dot: "bg-violet-500",
    },
    purple: {
      soft: "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:ring-purple-500/40 data-[state]:hover:bg-purple-100 dark:data-[state]:hover:bg-purple-900 data-[state=checked]:bg-purple-100 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-500 dark:data-[state=checked]:bg-purple-900",
      solid:
        "bg-purple-600 text-white ring-purple-600 dark:bg-purple-500 dark:ring-purple-500 data-[state]:hover:bg-purple-700 dark:data-[state]:hover:bg-purple-600 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-900 dark:data-[state=checked]:ring-purple-200",
      outline:
        "bg-transparent text-purple-700 ring-purple-300 dark:text-purple-300 dark:ring-purple-500/60 data-[state]:hover:bg-purple-50 dark:data-[state]:hover:bg-purple-900/40 data-[state=checked]:bg-purple-50 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-500 dark:data-[state=checked]:bg-purple-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-purple-500",
      dot: "bg-purple-500",
    },
    fuchsia: {
      soft: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-900/50 dark:text-fuchsia-300 dark:ring-fuchsia-500/40 data-[state]:hover:bg-fuchsia-100 dark:data-[state]:hover:bg-fuchsia-900 data-[state=checked]:bg-fuchsia-100 data-[state=checked]:ring-2 data-[state=checked]:ring-fuchsia-500 dark:data-[state=checked]:bg-fuchsia-900",
      solid:
        "bg-fuchsia-600 text-white ring-fuchsia-600 dark:bg-fuchsia-500 dark:ring-fuchsia-500 data-[state]:hover:bg-fuchsia-700 dark:data-[state]:hover:bg-fuchsia-600 data-[state=checked]:ring-2 data-[state=checked]:ring-fuchsia-900 dark:data-[state=checked]:ring-fuchsia-200",
      outline:
        "bg-transparent text-fuchsia-700 ring-fuchsia-300 dark:text-fuchsia-300 dark:ring-fuchsia-500/60 data-[state]:hover:bg-fuchsia-50 dark:data-[state]:hover:bg-fuchsia-900/40 data-[state=checked]:bg-fuchsia-50 data-[state=checked]:ring-2 data-[state=checked]:ring-fuchsia-500 dark:data-[state=checked]:bg-fuchsia-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-fuchsia-500",
      dot: "bg-fuchsia-500",
    },
    pink: {
      soft: "bg-pink-50 text-pink-700 ring-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:ring-pink-500/40 data-[state]:hover:bg-pink-100 dark:data-[state]:hover:bg-pink-900 data-[state=checked]:bg-pink-100 data-[state=checked]:ring-2 data-[state=checked]:ring-pink-500 dark:data-[state=checked]:bg-pink-900",
      solid:
        "bg-pink-600 text-white ring-pink-600 dark:bg-pink-500 dark:ring-pink-500 data-[state]:hover:bg-pink-700 dark:data-[state]:hover:bg-pink-600 data-[state=checked]:ring-2 data-[state=checked]:ring-pink-900 dark:data-[state=checked]:ring-pink-200",
      outline:
        "bg-transparent text-pink-700 ring-pink-300 dark:text-pink-300 dark:ring-pink-500/60 data-[state]:hover:bg-pink-50 dark:data-[state]:hover:bg-pink-900/40 data-[state=checked]:bg-pink-50 data-[state=checked]:ring-2 data-[state=checked]:ring-pink-500 dark:data-[state=checked]:bg-pink-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-pink-500",
      dot: "bg-pink-500",
    },
    rose: {
      soft: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:ring-rose-500/40 data-[state]:hover:bg-rose-100 dark:data-[state]:hover:bg-rose-900 data-[state=checked]:bg-rose-100 data-[state=checked]:ring-2 data-[state=checked]:ring-rose-500 dark:data-[state=checked]:bg-rose-900",
      solid:
        "bg-rose-600 text-white ring-rose-600 dark:bg-rose-500 dark:ring-rose-500 data-[state]:hover:bg-rose-700 dark:data-[state]:hover:bg-rose-600 data-[state=checked]:ring-2 data-[state=checked]:ring-rose-900 dark:data-[state=checked]:ring-rose-200",
      outline:
        "bg-transparent text-rose-700 ring-rose-300 dark:text-rose-300 dark:ring-rose-500/60 data-[state]:hover:bg-rose-50 dark:data-[state]:hover:bg-rose-900/40 data-[state=checked]:bg-rose-50 data-[state=checked]:ring-2 data-[state=checked]:ring-rose-500 dark:data-[state=checked]:bg-rose-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-rose-500",
      dot: "bg-rose-500",
    },
    slate: {
      soft: "bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-900/50 dark:text-slate-300 dark:ring-slate-500/40 data-[state]:hover:bg-slate-100 dark:data-[state]:hover:bg-slate-900 data-[state=checked]:bg-slate-100 data-[state=checked]:ring-2 data-[state=checked]:ring-slate-500 dark:data-[state=checked]:bg-slate-900",
      solid:
        "bg-slate-600 text-white ring-slate-600 dark:bg-slate-500 dark:ring-slate-500 data-[state]:hover:bg-slate-700 dark:data-[state]:hover:bg-slate-600 data-[state=checked]:ring-2 data-[state=checked]:ring-slate-900 dark:data-[state=checked]:ring-slate-200",
      outline:
        "bg-transparent text-slate-700 ring-slate-300 dark:text-slate-300 dark:ring-slate-500/60 data-[state]:hover:bg-slate-50 dark:data-[state]:hover:bg-slate-900/40 data-[state=checked]:bg-slate-50 data-[state=checked]:ring-2 data-[state=checked]:ring-slate-500 dark:data-[state=checked]:bg-slate-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-slate-500",
      dot: "bg-slate-500",
    },
    gray: {
      soft: "bg-gray-50 text-gray-700 ring-gray-200 dark:bg-gray-900/50 dark:text-gray-300 dark:ring-gray-500/40 data-[state]:hover:bg-gray-100 dark:data-[state]:hover:bg-gray-900 data-[state=checked]:bg-gray-100 data-[state=checked]:ring-2 data-[state=checked]:ring-gray-500 dark:data-[state=checked]:bg-gray-900",
      solid:
        "bg-gray-600 text-white ring-gray-600 dark:bg-gray-500 dark:ring-gray-500 data-[state]:hover:bg-gray-700 dark:data-[state]:hover:bg-gray-600 data-[state=checked]:ring-2 data-[state=checked]:ring-gray-900 dark:data-[state=checked]:ring-gray-200",
      outline:
        "bg-transparent text-gray-700 ring-gray-300 dark:text-gray-300 dark:ring-gray-500/60 data-[state]:hover:bg-gray-50 dark:data-[state]:hover:bg-gray-900/40 data-[state=checked]:bg-gray-50 data-[state=checked]:ring-2 data-[state=checked]:ring-gray-500 dark:data-[state=checked]:bg-gray-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-gray-500",
      dot: "bg-gray-500",
    },
    zinc: {
      soft: "bg-zinc-50 text-zinc-700 ring-zinc-200 dark:bg-zinc-900/50 dark:text-zinc-300 dark:ring-zinc-500/40 data-[state]:hover:bg-zinc-100 dark:data-[state]:hover:bg-zinc-900 data-[state=checked]:bg-zinc-100 data-[state=checked]:ring-2 data-[state=checked]:ring-zinc-500 dark:data-[state=checked]:bg-zinc-900",
      solid:
        "bg-zinc-600 text-white ring-zinc-600 dark:bg-zinc-500 dark:ring-zinc-500 data-[state]:hover:bg-zinc-700 dark:data-[state]:hover:bg-zinc-600 data-[state=checked]:ring-2 data-[state=checked]:ring-zinc-900 dark:data-[state=checked]:ring-zinc-200",
      outline:
        "bg-transparent text-zinc-700 ring-zinc-300 dark:text-zinc-300 dark:ring-zinc-500/60 data-[state]:hover:bg-zinc-50 dark:data-[state]:hover:bg-zinc-900/40 data-[state=checked]:bg-zinc-50 data-[state=checked]:ring-2 data-[state=checked]:ring-zinc-500 dark:data-[state=checked]:bg-zinc-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-zinc-500",
      dot: "bg-zinc-500",
    },
    neutral: {
      soft: "bg-neutral-50 text-neutral-700 ring-neutral-200 dark:bg-neutral-900/50 dark:text-neutral-300 dark:ring-neutral-500/40 data-[state]:hover:bg-neutral-100 dark:data-[state]:hover:bg-neutral-900 data-[state=checked]:bg-neutral-100 data-[state=checked]:ring-2 data-[state=checked]:ring-neutral-500 dark:data-[state=checked]:bg-neutral-900",
      solid:
        "bg-neutral-600 text-white ring-neutral-600 dark:bg-neutral-500 dark:ring-neutral-500 data-[state]:hover:bg-neutral-700 dark:data-[state]:hover:bg-neutral-600 data-[state=checked]:ring-2 data-[state=checked]:ring-neutral-900 dark:data-[state=checked]:ring-neutral-200",
      outline:
        "bg-transparent text-neutral-700 ring-neutral-300 dark:text-neutral-300 dark:ring-neutral-500/60 data-[state]:hover:bg-neutral-50 dark:data-[state]:hover:bg-neutral-900/40 data-[state=checked]:bg-neutral-50 data-[state=checked]:ring-2 data-[state=checked]:ring-neutral-500 dark:data-[state=checked]:bg-neutral-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-neutral-500",
      dot: "bg-neutral-500",
    },
    stone: {
      soft: "bg-stone-50 text-stone-700 ring-stone-200 dark:bg-stone-900/50 dark:text-stone-300 dark:ring-stone-500/40 data-[state]:hover:bg-stone-100 dark:data-[state]:hover:bg-stone-900 data-[state=checked]:bg-stone-100 data-[state=checked]:ring-2 data-[state=checked]:ring-stone-500 dark:data-[state=checked]:bg-stone-900",
      solid:
        "bg-stone-600 text-white ring-stone-600 dark:bg-stone-500 dark:ring-stone-500 data-[state]:hover:bg-stone-700 dark:data-[state]:hover:bg-stone-600 data-[state=checked]:ring-2 data-[state=checked]:ring-stone-900 dark:data-[state=checked]:ring-stone-200",
      outline:
        "bg-transparent text-stone-700 ring-stone-300 dark:text-stone-300 dark:ring-stone-500/60 data-[state]:hover:bg-stone-50 dark:data-[state]:hover:bg-stone-900/40 data-[state=checked]:bg-stone-50 data-[state=checked]:ring-2 data-[state=checked]:ring-stone-500 dark:data-[state=checked]:bg-stone-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-stone-500",
      dot: "bg-stone-500",
    },
    error: {
      soft: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/50 dark:text-red-300 dark:ring-red-500/40 data-[state]:hover:bg-red-100 dark:data-[state]:hover:bg-red-900 data-[state=checked]:bg-red-100 data-[state=checked]:ring-2 data-[state=checked]:ring-red-500 dark:data-[state=checked]:bg-red-900",
      solid:
        "bg-red-600 text-white ring-red-600 dark:bg-red-500 dark:ring-red-500 data-[state]:hover:bg-red-700 dark:data-[state]:hover:bg-red-600 data-[state=checked]:ring-2 data-[state=checked]:ring-red-900 dark:data-[state=checked]:ring-red-200",
      outline:
        "bg-transparent text-red-700 ring-red-300 dark:text-red-300 dark:ring-red-500/60 data-[state]:hover:bg-red-50 dark:data-[state]:hover:bg-red-900/40 data-[state=checked]:bg-red-50 data-[state=checked]:ring-2 data-[state=checked]:ring-red-500 dark:data-[state=checked]:bg-red-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-red-500",
      dot: "bg-red-500",
    },
    warning: {
      soft: "bg-yellow-50 text-yellow-700 ring-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:ring-yellow-500/40 data-[state]:hover:bg-yellow-100 dark:data-[state]:hover:bg-yellow-900 data-[state=checked]:bg-yellow-100 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-500 dark:data-[state=checked]:bg-yellow-900",
      solid:
        "bg-yellow-400 text-yellow-950 ring-yellow-400 dark:bg-yellow-400 dark:ring-yellow-400 data-[state]:hover:bg-yellow-500 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-800 dark:data-[state=checked]:ring-yellow-100",
      outline:
        "bg-transparent text-yellow-700 ring-yellow-300 dark:text-yellow-300 dark:ring-yellow-500/60 data-[state]:hover:bg-yellow-50 dark:data-[state]:hover:bg-yellow-900/40 data-[state=checked]:bg-yellow-50 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-500 dark:data-[state=checked]:bg-yellow-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-500",
      dot: "bg-yellow-500",
    },
    success: {
      soft: "bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/50 dark:text-green-300 dark:ring-green-500/40 data-[state]:hover:bg-green-100 dark:data-[state]:hover:bg-green-900 data-[state=checked]:bg-green-100 data-[state=checked]:ring-2 data-[state=checked]:ring-green-500 dark:data-[state=checked]:bg-green-900",
      solid:
        "bg-green-600 text-white ring-green-600 dark:bg-green-500 dark:ring-green-500 data-[state]:hover:bg-green-700 dark:data-[state]:hover:bg-green-600 data-[state=checked]:ring-2 data-[state=checked]:ring-green-900 dark:data-[state=checked]:ring-green-200",
      outline:
        "bg-transparent text-green-700 ring-green-300 dark:text-green-300 dark:ring-green-500/60 data-[state]:hover:bg-green-50 dark:data-[state]:hover:bg-green-900/40 data-[state=checked]:bg-green-50 data-[state=checked]:ring-2 data-[state=checked]:ring-green-500 dark:data-[state=checked]:bg-green-900/40",
      modern: "data-[state=checked]:ring-2 data-[state=checked]:ring-green-500",
      dot: "bg-green-500",
    },
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<
      TagGroupItemProps & {
        /** Custom class(es) to add to the tag. */
        class?: HTMLAttributes["class"];
        /** Color of the tag. Defaults to the color of the group, then `gray`. */
        color?: TagGroupColor;
        /** Variant of the tag. Defaults to the variant of the group, then `soft`. */
        variant?: TagGroupVariant;
        /** Size of the tag. Defaults to the size of the group, then `md`. */
        size?: TagGroupSize;
        /** Shape of the tag. Defaults to the shape of the group, then `pill`. */
        shape?: TagGroupShape;
        /** Icon shown before the text. */
        icon?: string;
        /** Icon shown after the text. */
        trailingIcon?: string;
        /**
         * Show a colored dot before the text. The `modern` variant shows one unless an icon or
         * avatar is set.
         */
        dot?: boolean;
        /** Image shown before the text. */
        avatar?: string;
        /** Show a button that removes the tag. The group must listen to `@remove`. */
        removable?: boolean;
        /** Icon of the remove button. */
        deleteIcon?: string;
        /** Replace the leading content with a check mark while the tag is selected. */
        showCheck?: boolean;
      }
    >(),
    { showCheck: true, deleteIcon: "lucide:x" }
  );

  const forwarded = useForwardProps(
    reactiveOmit(
      props,
      "class",
      "color",
      "variant",
      "size",
      "shape",
      "icon",
      "trailingIcon",
      "dot",
      "avatar",
      "removable",
      "deleteIcon",
      "showCheck"
    )
  );

  // Props on the tag win, then the group, then the defaults
  const group = inject(tagGroupInjectionKey, null);
  const resolved = computed(() => ({
    color: props.color ?? group?.color.value ?? "gray",
    variant: props.variant ?? group?.variant.value ?? "soft",
    size: props.size ?? group?.size.value ?? "md",
    shape: props.shape ?? group?.shape.value ?? "pill",
  }));

  const styles = computed(() =>
    tagGroupItemStyles({
      size: resolved.value.size,
      shape: resolved.value.shape,
      variant: resolved.value.variant,
    })
  );
</script>
