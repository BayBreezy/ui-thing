<template>
  <PaginationFirst
    data-slot="pagination-first"
    aria-label="Go to the first page"
    v-bind="forwarded"
  >
    <slot>
      <UiButton v-if="icon" :variant :size>
        <span class="sr-only">First page</span>
        <Icon :name="icon" />
      </UiButton>
    </slot>
  </PaginationFirst>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationFirst } from "reka-ui";
  import type { PaginationFirstProps } from "reka-ui";

  import type { ButtonProps } from "~/components/Ui/Button.vue";

  const props = withDefaults(
    defineProps<
      PaginationFirstProps & {
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
  const forwarded = reactiveOmit(props, "icon", "variant", "size");
</script>
