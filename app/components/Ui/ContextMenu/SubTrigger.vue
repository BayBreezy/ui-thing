<template>
  <ContextMenuSubTrigger
    data-slot="context-menu-sub-trigger"
    :data-inset="inset"
    v-bind="forwarded"
    :class="styles({ inset, class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <Icon class="ml-auto size-4" :name="icon || 'lucide:chevron-right'" />
  </ContextMenuSubTrigger>
</template>

<script lang="ts" setup>
  import { ContextMenuSubTrigger } from "reka-ui";
  import type { ContextMenuSubTriggerProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ContextMenuSubTriggerProps & {
      /**Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
      /** Wether an indentation should be added to the item or not */
      inset?: boolean;
      /** The icon to display */
      icon?: string;
      /** The title for the item */
      title?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title");
  const styles = tv({
    base: "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset=true]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
