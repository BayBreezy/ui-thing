<template>
  <div data-slot="command-input-wrapper" class="p-1 pb-0" cmdk-input-wrapper>
    <UiInputGroup
      class="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!"
    >
      <ListboxFilter
        v-bind="{ ...forwardedProps, ...$attrs }"
        v-model="filterState.search"
        data-slot="command-input"
        auto-focus
        cmdk-input
        :class="styles({ class: normalizeClass(props.class) || undefined })"
      />
      <UiInputGroupAddon>
        <Icon :name="icon" class="size-4 shrink-0 opacity-50" />
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { ListboxFilter, useForwardProps } from "reka-ui";
  import type { ListboxFilterProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { useCommand } from "./Command.vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      ListboxFilterProps & {
        /** Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
        /**
         * The name of the icon to display for the search input.
         *
         * @default "lucide:search"
         */
        icon?: string;
      }
    >(),
    {
      icon: "lucide:search",
    }
  );

  const styles = tv({
    base: "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
  });

  const forwardedProps = useForwardProps(reactiveOmit(props, "class"));

  const { filterState } = useCommand();
</script>
