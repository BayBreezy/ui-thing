<template>
  <PaginationPrev
    data-slot="pagination-previous"
    aria-label="Go to previous page"
    v-bind="forwarded"
  >
    <slot>
      <UiButton v-if="icon" :variant :size>
        <span class="sr-only">Previous page</span>
        <Icon :name="icon" />
      </UiButton>
    </slot>
  </PaginationPrev>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationPrev } from "reka-ui";
  import type { PaginationPrevProps } from "reka-ui";

  import type { ButtonProps } from "~/components/Ui/Button.vue";

  const props = withDefaults(
    defineProps<
      PaginationPrevProps & {
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
