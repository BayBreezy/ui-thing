<template>
  <TagGroupRoot
    v-slot="slotProps"
    data-slot="tag-group"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </TagGroupRoot>
</template>

<script lang="ts">
  import { TagGroupRoot, useForwardPropsEmits } from "reka-ui";
  import type { TagGroupRootEmits, TagGroupRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ComputedRef, HTMLAttributes, InjectionKey } from "vue";

  export type TagGroupColor =
    | "primary"
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
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "error"
    | "warning"
    | "success";
  export type TagGroupVariant = "soft" | "solid" | "outline" | "modern";
  export type TagGroupSize = "sm" | "md" | "lg";
  export type TagGroupShape = "pill" | "rounded";

  export type TagGroupContext = {
    color: ComputedRef<TagGroupColor | undefined>;
    variant: ComputedRef<TagGroupVariant | undefined>;
    size: ComputedRef<TagGroupSize | undefined>;
    shape: ComputedRef<TagGroupShape | undefined>;
  };

  /** Used by the items to read the defaults set on the group. */
  export const tagGroupInjectionKey: InjectionKey<TagGroupContext> = Symbol("tag-group");
</script>

<script lang="ts" setup>
  const props = defineProps<
    TagGroupRootProps & {
      /** Custom class(es) to add to the group. */
      class?: HTMLAttributes["class"];
      /** Default color of the tags. Every tag can override it. */
      color?: TagGroupColor;
      /** Default variant of the tags. Every tag can override it. */
      variant?: TagGroupVariant;
      /** Default size of the tags. Every tag can override it. */
      size?: TagGroupSize;
      /** Default shape of the tags. Every tag can override it. */
      shape?: TagGroupShape;
    }
  >();

  const emits = defineEmits<TagGroupRootEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "color", "variant", "size", "shape"),
    emits
  );

  const styles = tv({ base: "flex flex-wrap items-center gap-2" });

  // Refs are provided so that changing a prop on the group updates every tag
  provide(tagGroupInjectionKey, {
    color: computed(() => props.color),
    variant: computed(() => props.variant),
    size: computed(() => props.size),
    shape: computed(() => props.shape),
  });
</script>
