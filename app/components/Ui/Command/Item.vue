<template>
  <ListboxItem
    v-if="isRender"
    v-bind="forwarded"
    :id="id"
    ref="itemRef"
    :class="styles({ class: props.class })"
    data-slot="command-item"
    cmdk-item
    @select="
      () => {
        filterState.search = '';
      }
    "
  >
    <slot>
      <slot name="icon">
        <Icon v-if="icon" :name="icon" />
      </slot>
      {{ text }}
      <slot name="shortcut">
        <UiCommandShortcut v-if="shortcut" :shortcut="shortcut" />
      </slot>
    </slot>
  </ListboxItem>
</template>

<script setup lang="ts">
  import { reactiveOmit, useCurrentElement } from "@vueuse/core";
  import { ListboxItem, useForwardPropsEmits, useId } from "reka-ui";
  import type { ListboxItemEmits, ListboxItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  import { useCommand, useCommandGroup } from "./Command.vue";

  const props = defineProps<
    ListboxItemProps & {
      /** Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
      /** Icon to render */
      icon?: string;
      /** Text to render */
      text?: string;
      /** Shortcut to render */
      shortcut?: string;
    }
  >();
  const emits = defineEmits<ListboxItemEmits>();

  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "icon", "text", "shortcut"),
    emits
  );

  const id = useId();
  const { filterState, allItems, allGroups } = useCommand();
  const groupContext = useCommandGroup();

  const styles = tv({
    base: "relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
  });

  const isRender = computed(() => {
    if (!filterState.search) {
      return true;
    } else {
      const filteredCurrentItem = filterState.filtered.items.get(id);
      // If the filtered items is undefined means not in the all times map yet
      // Do the first render to add into the map
      if (filteredCurrentItem === undefined) {
        return true;
      }

      // Check with filter
      return filteredCurrentItem > 0;
    }
  });

  const itemRef = ref();
  const currentElement = useCurrentElement(itemRef);
  onMounted(() => {
    if (!(currentElement.value instanceof HTMLElement)) return;

    // textValue to perform filter
    allItems.value.set(id, currentElement.value.textContent ?? props?.value!.toString());

    const groupId = groupContext?.id;
    if (groupId) {
      if (!allGroups.value.has(groupId)) {
        allGroups.value.set(groupId, new Set([id]));
      } else {
        allGroups.value.get(groupId)?.add(id);
      }
    }
  });
  onUnmounted(() => {
    allItems.value.delete(id);
  });
</script>
