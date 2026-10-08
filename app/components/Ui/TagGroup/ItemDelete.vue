<template>
  <TagGroupItemDelete
    data-slot="tag-group-item-delete"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon :name="icon" class="size-full" />
    </slot>
  </TagGroupItemDelete>
</template>

<script lang="ts" setup>
  import { TagGroupItemDelete } from "reka-ui";
  import type { TagGroupItemDeleteProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      TagGroupItemDeleteProps & {
        /** Custom class(es) to add to the button. */
        class?: HTMLAttributes["class"];
        /** Icon shown inside the button. */
        icon?: string;
      }
    >(),
    { icon: "lucide:x" }
  );

  // `aria-label` (to translate "Remove") is passed through as an attribute
  const forwarded = reactiveOmit(props, "class", "icon");

  // The colors come from `currentColor`, so the button works with every tag color
  const styles = tv({
    base: "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full p-0.5 opacity-70 transition outline-none hover:bg-current/15 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current/50 data-disabled:pointer-events-none data-disabled:opacity-40",
  });
</script>
