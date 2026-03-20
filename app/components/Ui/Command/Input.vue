<template>
  <div
    data-slot="command-input-wrapper"
    class="flex h-9 items-center gap-2 border-b px-3"
    cmdk-input-wrapper
  >
    <Icon name="lucide:search" class="size-4 shrink-0 opacity-50" />
    <ListboxFilter
      v-bind="{ ...forwardedProps, ...$attrs }"
      v-model="filterState.search"
      data-slot="command-input"
      auto-focus
      cmdk-input
      :class="styles({ class: normalizeClass(props.class) || undefined })"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { ListboxFilter, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxFilterProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  import { useCommand } from "./Command.vue";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<
    ListboxFilterProps & {
      /** Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({
    base: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  });

  const forwardedProps = useForwardProps(reactiveOmit(props, "class"));

  const { filterState } = useCommand();
</script>
