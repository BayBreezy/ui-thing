<template>
  <UiSelect v-model="currentFormat">
    <UiSelectTrigger
      size="sm"
      class="border-secondary bg-secondary text-secondary-foreground w-fit shadow-none"
      :class="props.class"
    >
      <span class="font-medium">Format: </span>
      <span class="text-muted-foreground font-mono">{{ currentFormat }}</span>
    </UiSelectTrigger>
    <UiSelectContent align="end" class="rounded-xl">
      <UiSelectItem
        v-for="[f, v] in Object.entries(formats)"
        :key="f"
        :value="f"
        class="gap-2 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:gap-2"
      >
        <span class="font-medium">{{ f }}</span>
        <span class="text-muted-foreground font-mono text-xs"> {{ v }} </span>
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
