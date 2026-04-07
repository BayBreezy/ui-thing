<template>
  <ListboxItem
    v-if="isRender"
    v-bind="forwarded"
    :id="id"
    ref="itemRef"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
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
      <slot name="text">
        {{ text }}
      </slot>
      <slot name="shortcut">
        <UiCommandShortcut v-if="shortcut" :shortcut="shortcut" />
      </slot>
    </slot>
  </ListboxItem>
</template>

<script setup lang="ts">
  import { reactiveOmit, useCurrentElement } from "@vueuse/core";
  import type { ListboxItemEmits, ListboxItemProps } from "reka-ui";
  import { ListboxItem, useForwardPropsEmits, useId } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { normalizeClass } from "vue";

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
    base: "group/command-item relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none in-data-[slot=dialog-content]:rounded-lg! data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[state=checked]:bg-muted data-[state=checked]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
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
