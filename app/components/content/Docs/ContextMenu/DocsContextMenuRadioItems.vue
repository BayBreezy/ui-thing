<template>
  <UiContextMenu>
    <UiContextMenuTrigger as-child>
      <div
        class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click for radio items context menu
      </div>
    </UiContextMenuTrigger>

    <UiContextMenuContent class="w-48">
      <UiContextMenuLabel label="Tooltip placement" />
      <UiContextMenuSeparator />
      <UiContextMenuRadioGroup v-model="placement">
        <UiContextMenuRadioItem
          v-for="item in placements"
          :key="item"
          :value="item"
          :title="item"
          :text-value="item"
        />
      </UiContextMenuRadioGroup>
    </UiContextMenuContent>
  </UiContextMenu>
</template>

<script lang="ts" setup>
  const placement = ref("top-start");
  const placements = [
    "top-start",
    "top",
    "top-end",
    "right-start",
    "right",
    "right-end",
    "bottom-start",
    "bottom",
    "bottom-end",
    "left-start",
    "left",
    "left-end",
  ];
</script>
