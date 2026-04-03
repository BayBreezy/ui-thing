<template>
  <PaginationNext data-slot="pagination-next" aria-label="Go to next page" v-bind="forwarded">
    <slot>
      <UiButton v-if="icon" :variant :size>
        <span class="sr-only">Next page</span>
        <Icon :name="icon" />
      </UiButton>
    </slot>
  </PaginationNext>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationNext } from "reka-ui";
  import type { PaginationNextProps } from "reka-ui";

  import type { ButtonProps } from "~/components/Ui/Button.vue";

  const props = withDefaults(
    defineProps<
      PaginationNextProps & {
        /** Icon to show */
        icon?: string;
        /** The variant of the button */
        variant?: ButtonProps["variant"];
        /** The size of the button */
        size?: ButtonProps["size"];
      }
    >(),
    {
      variant: "ghost",
      size: "icon-sm",
    }
  );

  const forwarded = reactiveOmit(props, "icon");
</script>
