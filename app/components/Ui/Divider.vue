<template>
  <Primitive
    as="div"
    :class="base({ orientation, type, class: normalizeClass(props.class) || undefined })"
  >
    <Separator :orientation="orientation" :class="border({ orientation, type })" />
    <template v-if="label || icon || avatar || $slots.default">
      <div :class="container({ orientation, type })">
        <slot>
          <slot name="label">
            <span v-if="label" :class="labelClass({ orientation, type })">
              {{ label }}
            </span>
          </slot>
          <slot name="icon">
            <Icon v-if="icon" :name="icon" :class="iconClass({ orientation, type })" />
          </slot>
          <slot name="avatar">
            <UiAvatar v-if="avatar" :src="avatar" />
          </slot>
        </slot>
      </div>
    </template>
    <Separator :orientation="orientation" :class="border({ orientation, type })" />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive, Separator } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    /**
     * Custom class for the divider
     */
    class?: HTMLAttributes["class"];
    /**
     * The type of the divider
     * @default "solid"
     */
    type?: VariantProps<typeof style>["type"];
    /**
     * The orientation of the divider
     * @default "horizontal"
     */
    orientation?: VariantProps<typeof style>["orientation"];
    /**
     * The icon to display in the divider
     */
    icon?: string;
    /**
     * The label to display in the divider
     */
    label?: string;
    /**
     * The avatar to display in the divider
     */
    avatar?: string;
  }>();

  const style = tv({
    slots: {
      base: "flex w-full items-center text-center align-middle",
      container: "flex font-medium",
      border: "flex border-border",
      icon: "h-5 w-5 shrink-0",
      label: "text-sm",
    },
    variants: {
      orientation: {
        horizontal: {
          base: "flex-row",
          container: "mx-3 whitespace-nowrap",
          border: "w-full border-t",
        },
        vertical: {
          base: "h-full flex-col",
          container: "my-3",
          border: "h-full border-s",
        },
      },
      type: {
        solid: {
          border: "border-solid",
        },
        dashed: {
          border: "border-dashed",
        },
        dotted: {
          border: "border-dotted",
        },
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      type: "solid",
    },
  });

  const { base, border, container, icon: iconClass, label: labelClass } = style();
</script>
