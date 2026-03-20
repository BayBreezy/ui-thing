<template>
  <DefineImg>
    <NuxtImg
      :src="refinedSrc"
      :alt
      :width
      :height
      :class="proseImgStyles({ lifted, zoom, class: normalizeClass(props.class) || undefined })"
    />
  </DefineImg>

  <DialogRoot v-if="zoom">
    <DialogTrigger class="block w-full">
      <ReuseImg />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-background/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed top-1/2 left-1/2 z-50 grid -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-0 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:rounded-lg"
      >
        <DialogTitle class="sr-only">{{ props.alt || "Image Preview" }}</DialogTitle>
        <DialogDescription class="sr-only">{{ props.alt || "Image Preview" }}</DialogDescription>
        <DialogClose>
          <NuxtImg
            :src="refinedSrc"
            :alt
            :width
            :height
            class="max-h-svh max-w-svw cursor-zoom-out md:rounded-lg"
          />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
  <ReuseImg v-else />
</template>

<script lang="ts">
  import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTrigger,
  } from "reka-ui";
  import { joinURL, withLeadingSlash, withTrailingSlash } from "ufo";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseImgProps = {
    /**
     * Image source URL
     */
    src?: string;
    /**
     * Alt text for the image
     */
    alt?: string;
    /**
     * Width of the image
     * @default "100%"
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

  export const proseImgStyles = tv({
    base: "w-full rounded-md object-cover",
    variants: {
      lifted: {
        true: "rounded-lg border bg-card text-card-foreground shadow-xs",
      },
      zoom: {
        true: "cursor-zoom-in",
      },
    },
    defaultVariants: {
      lifted: false,
      zoom: true,
    },
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ProseImgProps>(), {
    lifted: false,
    zoom: true,
    width: "100%",
  });

  const [DefineImg, ReuseImg] = createReusableTemplate();

  const refinedSrc = computed(() => {
    if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
      const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));
      if (_base !== "/" && !props.src.startsWith(_base)) return joinURL(_base, props.src);
    }
    return props.src;
  });
</script>
