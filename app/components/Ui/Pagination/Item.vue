<template>
  <PaginationListItem data-slot="pagination-item" v-bind="props">
    <slot>
      <UiButton
        :variant
        :size
        class="data-[selected=true]:border-transparent! data-[selected=true]:bg-primary! data-[selected=true]:text-primary-foreground!"
      >
        {{ value }}
      </UiButton>
    </slot>
  </PaginationListItem>
</template>

<script lang="ts" setup>
  import { PaginationListItem } from "reka-ui";
  import type { PaginationListItemProps } from "reka-ui";

  import type { ButtonProps } from "~/components/Ui/Button.vue";

  const props = withDefaults(
    defineProps<
      PaginationListItemProps & {
        /** The variant of the button */
        variant?: ButtonProps["variant"];
        /** The size of the button */
        size?: ButtonProps["size"];
      }
    >(),
    {
      variant: "outline",
      size: "icon-sm",
    }
  );
</script>
