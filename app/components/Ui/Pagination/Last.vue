<template>
  <PaginationLast data-slot="pagination-last" aria-label="Go to the last page" v-bind="forwarded">
    <slot>
      <UiButton v-if="icon" :variant :size>
        <span class="sr-only">Last page</span>
        <Icon :name="icon" />
      </UiButton>
    </slot>
  </PaginationLast>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationLast } from "reka-ui";
  import type { PaginationLastProps } from "reka-ui";

  import type { ButtonProps } from "~/components/Ui/Button.vue";

  const props = withDefaults(
    defineProps<
      PaginationLastProps & {
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
