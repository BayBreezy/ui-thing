<template>
  <TagGroupItem
    v-slot="slotProps"
    data-slot="tag-group-item"
    v-bind="forwarded"
    :class="
      styles.base({
        class: [colorClass, normalizeClass(props.class) || undefined],
      })
    "
  >
    <slot name="leading" v-bind="slotProps">
      <Icon v-if="slotProps.selected && showCheck" name="lucide:check" :class="styles.icon()" />
      <span
        v-else-if="dot || (resolved.variant === 'modern' && !avatar && !icon)"
        data-slot="tag-group-item-dot"
        :class="styles.dot({ class: badgeColorClasses[resolved.color].dot })"
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

  import { badgeColorClasses } from "~/utils/badge-colors";

  import { tagGroupInjectionKey } from "./TagGroup.vue";
  import type { TagGroupColor, TagGroupShape, TagGroupSize, TagGroupVariant } from "./TagGroup.vue";

  export const tagGroupItemStyles = tv({
    slots: {
      base: "inline-flex w-max max-w-full shrink-0 items-center font-medium whitespace-nowrap ring-1 transition-[color,background-color,box-shadow] duration-150 outline-none select-none ring-inset focus-visible:ring-2 focus-visible:ring-current/60 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state]:cursor-pointer data-[state]:hover:brightness-95 dark:data-[state]:hover:brightness-125",
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
      // The colors come from `badgeColorClasses`. The checked ring uses `ring-current`, so it
      // follows the color of the text and works for every color.
      variant: {
        soft: { base: "data-[state=checked]:ring-2 data-[state=checked]:ring-current" },
        solid: { base: "data-[state=checked]:ring-foreground/50 data-[state=checked]:ring-2" },
        outline: {
          base: "data-[state=checked]:bg-current/10 data-[state=checked]:ring-2 data-[state=checked]:ring-current",
        },
        modern: {
          base: "bg-background text-foreground ring-border dark:bg-input/30 data-[state=checked]:ring-ring shadow-xs data-[state=checked]:ring-2",
        },
      },
    },
    defaultVariants: { size: "md", shape: "pill", variant: "soft" },
  });
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

  // The `modern` variant is neutral, only its dot is colored
  const colorClass = computed(() =>
    resolved.value.variant === "modern"
      ? undefined
      : badgeColorClasses[resolved.value.color][resolved.value.variant]
  );

  const styles = computed(() =>
    tagGroupItemStyles({
      size: resolved.value.size,
      shape: resolved.value.shape,
      variant: resolved.value.variant,
    })
  );
</script>
