<template>
  <div class="flex w-full items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Radio options</UiButton>
      </UiDropdownMenuTrigger>

      <UiDropdownMenuContent class="w-48">
        <UiDropdownMenuLabel label="Tooltip placement" />
        <UiDropdownMenuSeparator />
        <UiDropdownMenuRadioGroup v-model="placement">
          <UiDropdownMenuRadioItem
            v-for="item in placements"
            :key="item"
            :value="item"
            :title="item"
            :text-value="item"
            @select="(e) => e.preventDefault()"
          />
        </UiDropdownMenuRadioGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
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
