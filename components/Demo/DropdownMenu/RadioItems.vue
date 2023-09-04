<template>
  <UIDropdownMenu>
    <UIDropdownMenuTrigger as-child>
      <UIButton variant="outline">Radio options</UIButton>
    </UIDropdownMenuTrigger>

    <UIDropdownMenuContent class="w-48">
      <UIDropdownMenuLabel label="Tooltip placement" />
      <UIDropdownMenuSeparator />
      <UIDropdownMenuRadioGroup v-model="placement">
        <UIDropdownMenuRadioItem
          v-for="item in placements"
          :key="item"
          :value="item"
          :title="item"
          :text-value="item"
        />
      </UIDropdownMenuRadioGroup>
    </UIDropdownMenuContent>
  </UIDropdownMenu>
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
