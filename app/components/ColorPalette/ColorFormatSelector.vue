<template>
  <UiSelect v-model="currentFormat">
    <UiSelectTrigger
      size="sm"
      class="w-fit border-secondary bg-secondary text-secondary-foreground shadow-none"
      :class="props.class"
    >
      <span class="font-medium">Format: </span>
      <span class="font-mono text-muted-foreground">{{ currentFormat }}</span>
    </UiSelectTrigger>
    <UiSelectContent align="end" class="rounded-xl">
      <UiSelectItem
        v-for="[f, v] in Object.entries(formats)"
        :key="f"
        :value="f"
        class="gap-2 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:gap-2"
      >
        <span class="font-medium">{{ f }}</span>
        <span class="font-mono text-xs text-muted-foreground"> {{ v }} </span>
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>

<script lang="ts" setup>
  import { useStorage } from "@vueuse/core";
  import type { HTMLAttributes } from "vue";

  import { getColorFormat } from "~/utils/registry/colors";
  import type { Color } from "~/utils/registry/colors";

  const props = defineProps<{
    color: Color;
    class?: HTMLAttributes["class"];
  }>();

  const formats = getColorFormat(props.color);
  const currentFormat = useStorage("ui-things-color-format", "hex");
</script>
