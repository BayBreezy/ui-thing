<template>
  <ListboxGroup
    v-bind="forwarded"
    :id="id"
    :class="styles({ class: props.class })"
    data-slot="command-group"
    :hidden="isRender ? undefined : true"
    cmdk-group
  >
    <ListboxGroupLabel
      v-if="heading"
      cmdk-group-heading
      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
    >
      {{ heading }}
    </ListboxGroupLabel>
    <slot />
  </ListboxGroup>
</template>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { ListboxGroup, ListboxGroupLabel } from "reka-ui";
  import type { ListboxGroupProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  import { provideCommandGroupContext, useCommand } from "./Command.vue";

  const props = defineProps<
    ListboxGroupProps & {
      /** Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
      heading?: string;
    }
  >();

  const styles = tv({
    base: "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
  });

  const forwarded = reactiveOmit(props, "class");

  const { allGroups, filterState } = useCommand();
  const id = useId();

  const isRender = computed(() =>
    !filterState.search ? true : filterState.filtered.groups.has(id)
  );

  provideCommandGroupContext({ id });
  onMounted(() => {
    if (!allGroups.value.has(id)) allGroups.value.set(id, new Set());
  });
  onUnmounted(() => {
    allGroups.value.delete(id);
  });
</script>
