<template>
  <Primitive
    data-slot="attachment-media"
    :data-variant="variant"
    v-bind="forwarded"
    :class="attachmentMediaStyles({ variant, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const attachmentMediaStyles = tv({
    base: "bg-muted text-foreground group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  });

  export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaStyles>;

  export type AttachmentMediaProps = PrimitiveProps & {
    /**
     * Whether the media holds an icon or an `<img>`.
     *
     * @default "icon"
     */
    variant?: AttachmentMediaVariants["variant"];
    /** Additional classes to apply to the media slot. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentMediaProps>(), {
    variant: "icon",
  });

  const forwarded = reactiveOmit(props, ["variant", "class"]);
</script>
