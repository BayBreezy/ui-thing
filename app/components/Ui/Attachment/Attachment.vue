<template>
  <Primitive
    data-slot="attachment"
    :data-state="state"
    :data-size="size"
    :data-orientation="orientation"
    v-bind="forwarded"
    :class="
      attachmentStyles({ size, orientation, class: normalizeClass(props.class) || undefined })
    "
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

  export const attachmentStyles = tv({
    base: "group/attachment focus-within:ring-ring/50 bg-card text-card-foreground has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border transition-colors focus-within:ring-1 data-[state=idle]:border-dashed",
    variants: {
      size: {
        default:
          "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
      },
    },
    defaultVariants: {
      size: "default",
      orientation: "horizontal",
    },
  });

  export type AttachmentVariants = VariantProps<typeof attachmentStyles>;

  export type AttachmentProps = PrimitiveProps & {
    /**
     * The upload state of the attachment. Drives the border, media, title, and description styling.
     *
     * @default "done"
     */
    state?: "idle" | "uploading" | "processing" | "error" | "done";
    /**
     * The size of the attachment.
     *
     * @default "default"
     */
    size?: AttachmentVariants["size"];
    /**
     * Lay the media beside or above the content.
     *
     * @default "horizontal"
     */
    orientation?: AttachmentVariants["orientation"];
    /** Additional classes to apply to the root element. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AttachmentProps>(), {
    state: "done",
    size: "default",
    orientation: "horizontal",
  });

  const forwarded = reactiveOmit(props, ["state", "size", "orientation", "class"]);
</script>
