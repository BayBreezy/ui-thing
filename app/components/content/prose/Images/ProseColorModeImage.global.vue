<template>
  <div class="not-first:mt-6">
    <div class="dark:hidden">
      <ProseImg v-bind="forwarded" :src="srcLight" />
    </div>
    <div class="hidden dark:block">
      <ProseImg v-bind="forwarded" :src="srcDark" />
    </div>
  </div>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export type ProseColorModeImageProps = {
    /**
     * Source URL for light mode image
     */
    srcLight?: string;
    /**
     * Source URL for dark mode image
     */
    srcDark?: string;
    /**
     * Alt text for the image
     */
    alt?: string;
    /**
     * Width of the image
     */
    width?: string | number;
    /**
     * Height of the image
     */
    height?: string | number;
    /**
     * Whether the image should have a lifted style
     */
    lifted?: boolean;
    /**
     * Whether the image should have zoom effect on hover
     * @default true
     */
    zoom?: boolean;
    /**
     * Additional CSS classes for the image element
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<ProseColorModeImageProps>(), {
    zoom: true,
    lifted: false,
  });
  const forwarded = reactiveOmit(props, "srcLight", "srcDark");
</script>
