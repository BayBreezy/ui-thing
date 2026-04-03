<template>
  <div
    role="list"
    data-slot="prose-icon-list"
    :class="proseIconListStyles().base({ class: normalizeClass(props.class) || undefined })"
  >
    <div
      v-for="item in slottedItems"
      :key="item.key ?? item.index"
      role="listitem"
      :class="proseIconListStyles().item()"
    >
      <Icon
        v-if="item.meta.icon"
        data-slot="icon"
        :name="item.meta.icon"
        :class="proseIconListStyles().icon({ variant: item.meta.variant })"
      />
      <component :is="item.vnode" />
    </div>
  </div>
</template>

<script lang="ts">
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseIconListProps = {
    /**
     * Additional classes for the list element
     */
    class?: HTMLAttributes["class"];
    /**
     * Default variant for all list items (can be overridden per item)
     */
    variant?: VariantProps<typeof proseIconListStyles>["variant"];
    /**
     * Default icon for all list items (can be overridden per item)
     */
    icon?: string;
  };

  type ListItemMeta = {
    icon: string;
    variant?: VariantProps<typeof proseIconListStyles>["variant"];
  };

  export const proseIconListStyles = tv({
    slots: {
      base: "ml-4 flex list-none flex-col gap-3",
      item: "flex items-start gap-2 *:my-0! *:leading-normal **:[[role=list]]:mt-2 **:[[role=list]]:mb-2 [&>svg]:mt-1! has-[>*_code]:[&>svg]:mt-1!",
      icon: "mt-0.5 inline-block size-4 shrink-0",
    },
    variants: {
      variant: {
        success: {
          icon: "text-emerald-500",
        },
        error: {
          icon: "text-destructive",
        },
        warning: {
          icon: "text-yellow-500",
        },
        info: {
          icon: "text-blue-500",
        },
        default: {
          icon: "text-muted-foreground",
        },
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });
</script>

<script setup lang="ts">
  const props = defineProps<ProseIconListProps>();

  function getDefaultIcon(variant?: ProseIconListProps["variant"]): string {
    if (props.icon) return props.icon;

    switch (variant ?? props.variant) {
      case "success":
        return "lucide:circle-check";
      case "error":
        return "lucide:circle-x";
      case "warning":
        return "lucide:triangle-alert";
      case "info":
        return "lucide:info";
      default:
        return "radix-icons:dot-filled";
    }
  }

  const { items: slottedItems } = useDefaultSlotItems<ListItemMeta>({
    slots: useSlots(),
    mapMeta({ props: itemProps }) {
      // Each li can have its own icon and variant
      const itemVariant = (itemProps.variant as ProseIconListProps["variant"]) ?? props.variant;
      const itemIcon = (itemProps.icon as string) ?? getDefaultIcon(itemVariant);

      return {
        icon: itemIcon,
        variant: itemVariant,
      };
    },
  });
</script>
