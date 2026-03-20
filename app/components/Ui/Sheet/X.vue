<template>
  <DialogClose
    data-slot="sheet-close-x"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>
      <Icon :name="icon" class="size-4" />
      <span class="sr-only">{{ srText }}</span>
    </slot>
  </DialogClose>
</template>

<script lang="ts" setup>
  import { DialogClose } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { DialogCloseProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      DialogCloseProps & {
        /** Custom class(es) to add to parent element */
        class?: HTMLAttributes["class"];
        /** Icon to display */
        icon?: string;
        /** Screen reader text */
        srText?: string;
      }
    >(),
    {
      icon: "lucide:x",
      srText: "Close",
    }
  );
  const forwarded = reactiveOmit(props, "class", "icon", "srText");
  const styles = tv({
    base: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
  });
</script>
