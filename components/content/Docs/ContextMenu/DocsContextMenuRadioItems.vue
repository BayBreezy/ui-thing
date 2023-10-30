<template>
  <UIContextMenu>
    <UIContextMenuTrigger as-child>
      <div
        class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click for radio items context menu
      </div>
    </UIContextMenuTrigger>

    <UIContextMenuContent class="w-48">
      <UIContextMenuLabel label="Tooltip placement" />
      <UIContextMenuSeparator />
      <UIContextMenuRadioGroup v-model="placement">
        <UIContextMenuRadioItem
          v-for="item in placements"
          :key="item"
          :value="item"
          :title="item"
          :text-value="item"
        />
      </UIContextMenuRadioGroup>
    </UIContextMenuContent>
  </UIContextMenu>
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
