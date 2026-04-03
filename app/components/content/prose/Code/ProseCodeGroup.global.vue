<template>
  <ClientOnly>
    <render />
  </ClientOnly>
</template>

<script setup lang="ts">
  import { normalizeClass } from "vue";
  import type { SetupContext } from "vue";

  import { ProseTabs } from "#components";

  const props = withDefaults(
    defineProps<{
      /**
       * Whether the code group is in a stack layout
       * @default false
       */
      inStack?: boolean;
      /**
       * Sync identifier for syncing with other tab groups
       */
      sync?: string;
      /**
       * Whether to add padding around the tabs
       * @default true
       */
      padded?: boolean;
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
       * Additional classes to add to the wrapper
       */
      class?: string;
    }>(),
    {
      inStack: false,
      padded: true,
      disableSearch: false,
      searchPlaceholder: "Search Tab...",
      searchEmpty: "No tab found.",
      comboBoxFullWidth: false,
    }
  );

  const _slots: SetupContext["slots"] = useSlots();
  const { items: slotItems } = useDefaultSlotItems({
    slots: _slots,
    mapMeta: ({ props, index }) => ({
      id: props.filename ?? `tab-${index}`,
      label: props.label ?? props.filename ?? `Tab ${index + 1}`,
      icon: props.icon,
    }),
  });

  const isMobile = useMediaQuery("(max-width: 640px)", {
    ssrWidth: 639,
  });

  // Determine the variant based on number of tabs and screen size
  // If there are 5 or more tabs, use the combobox variant
  // If on mobile and more than 4 tabs, use the combobox variant
  const variant = computed(() => {
    if (slotItems.value.length >= 5) return "combobox";
    if (isMobile.value && slotItems.value.length > 4) return "combobox";
    return "card";
  });

  function render() {
    return h(
      ProseTabs,
      {
        variant: variant.value,
        inStack: props.inStack,
        sync: props.sync,
        padded: props.padded,
        disableSearch: props.disableSearch,
        searchPlaceholder: props.searchPlaceholder,
        searchEmpty: props.searchEmpty,
        comboBoxFullWidth: props.comboBoxFullWidth,
        class: normalizeClass(props.class) || undefined,
      },
      () => slotItems.value.map(({ vnode }) => vnode)
    );
  }
</script>
