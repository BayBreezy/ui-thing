<template>
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    v-bind="forwarded"
    :data-inset="inset"
    :class="styles({ inset, class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="size-4" />
      <span v-if="title">{{ title }}</span>
    </slot>
    <Icon
      class="text-muted-foreground ml-auto size-4"
      :name="trailingIcon || 'lucide:chevron-right'"
    />
  </MenubarSubTrigger>
</template>

<script lang="ts" setup>
  import { MenubarSubTrigger } from "reka-ui";
  import type { MenubarSubTriggerProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarSubTriggerProps & {
      class?: HTMLAttributes["class"];
      inset?: boolean;
      icon?: string;
      title?: string;
      trailingIcon?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title", "trailingIcon");
  const styles = tv({
    base: "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset=true]:pl-8",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
