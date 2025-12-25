<template>
  <Icon
    v-if="checkIcon(name)"
    v-bind="props"
    :icon="props.name"
    :style="{
      width: handleSize(props.size),
      height: handleSize(props.size),
    }"
  />
  <!-- Emojis -->
  <span
    v-else-if="
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(
        name
      )
    "
    :style="`font-size: ${props.size ? handleSize(props.size) : '16px'};`"
    aria-hidden="true"
    >{{ name }}</span
  >
  <!-- Image -->
  <img
    v-else
    :src="name"
    :style="{
      width: handleSize(props.size),
      height: handleSize(props.size),
    }"
    :class="['not-prose inline', $attrs.class]"
    alt="icon"
  />
</template>

<script lang="ts" setup>
  import { stringToIcon, validateIconName } from "@iconify/utils";
  import { Icon } from "@iconify/vue";
  import type { IconProps } from "@iconify/vue";

  const props = withDefaults(
    defineProps<
      Omit<IconProps, "icon"> & {
        /**
         * The name of the icon to display.
         */
        name: string;
        /**
         * Size of the icon in pixels (default: 16)
         */
        size?: number | string;
      }
    >(),
    {
      size: 16,
    }
  );
  /**
   * Check if the provided name is a valid Iconify icon name
   */
  function checkIcon(name: string): boolean {
    if (name.includes("http") || name.startsWith("data:image/")) return false;
    return validateIconName(stringToIcon(name));
  }

  const handleNumberSize = (size: number) => {
    return `${size}px`;
  };

  const handleSize = (size: number | string | undefined) => {
    if (!size) return "16px";
    if (typeof size === "number") {
      return handleNumberSize(size);
    }
    return size;
  };
</script>
