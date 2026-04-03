<template>
  <render />
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  import { ProseTabsInner } from "#components";

  export type ProseTabsProps = {
    /**
     * The variant of the tabs
     * @default 'separate'
     */
    variant?: "separate" | "card" | "line" | "combobox";
    /**
     * Whether to add padding around the tabs
     * @default true
     */
    padded?: boolean;
    /**
     * Whether the tabs are in a stack (e.g. accordion)
     * @default false
     */
    inStack?: boolean;
    /**
     * Disable the search functionality
     * @default false
     */
    disableSearch?: boolean;
    /**
     * Placeholder text for the search input
     * @default 'Search Tab...'
     */
    searchPlaceholder?: string;
    /**
     * Text to display when no tab is found
     * @default 'No tab found.'
     */
    searchEmpty?: string;
    /**
     * Whether the combobox should take the full width of the container
     * @default false
     */
    comboBoxFullWidth?: boolean;
    /**
     * A scope to sync the active tab state with other tab groups
     */
    sync?: string;
    /**
     * Additional classes to add to the wrapper div
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  const {
    variant = "separate",
    padded = true,
    inStack = false,
    disableSearch = false,
    searchPlaceholder = "Search Tab...",
    searchEmpty = "No tab found.",
    ...rest
  } = defineProps<ProseTabsProps>();

  const _slots = useSlots();
  const { items: slotItems } = useDefaultSlotItems({
    slots: _slots,
    mapMeta: ({ props, index }) => ({
      label: props.label ?? props.filename ?? `Tab ${index + 1}`,
      icon: props?.icon,
    }),
  });

  const slotsData = computed(() =>
    slotItems.value.map(({ index, meta, props }) => ({
      index,
      label: meta.label,
      icon: props.icon || meta.icon,
    }))
  );

  /**
   * Render function to pass slots as props to ProseTabsInner
   */
  function render() {
    return h(
      ProseTabsInner,
      {
        variant,
        padded,
        inStack,
        disableSearch,
        searchEmpty,
        searchPlaceholder,
        slotsData: slotsData.value,
        ...rest,
      },
      () => slotItems.value.map(({ vnode }) => vnode)
    );
  }
</script>
