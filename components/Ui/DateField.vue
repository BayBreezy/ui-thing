<template>
  <DateFieldRoot
    v-slot="{ segments }"
    v-bind="props"
    v-model="localModel"
    :class="styles({ class: props.class })"
  >
    <template v-for="item in segments" :key="item.part">
      <DateFieldInput
        v-if="item.part === 'literal'"
        :part="item.part"
        class="inline-flex items-center justify-center text-muted-foreground"
      >
        <Icon v-if="separatorIcon" :name="separatorIcon" class="text-muted-foreground" />
        <span v-else-if="separator" class="mx-1 text-muted-foreground">{{ separator }}</span>
      </DateFieldInput>
      <DateFieldInput
        v-else
        :part="item.part"
        class="inline-flex cursor-text items-center rounded px-1 transition focus:outline-none focus:ring-1 focus:ring-ring aria-[valuetext=Empty]:text-muted-foreground"
      >
        {{ item.value }}
      </DateFieldInput>
    </template>
  </DateFieldRoot>
</template>

<script lang="ts" setup>
  import { type DateValue } from "@internationalized/date";
  import { DateFieldInput, DateFieldRoot } from "radix-vue";
  import type { DateFieldRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      DateFieldRootProps & {
        class?: any;
        separator?: string;
        separatorIcon?: string;
      }
    >(),
    {
      separator: "/",
    }
  );
  const localModel = defineModel<DateValue>();

  const styles = tv({
    base: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[invalid]:border-destructive data-[disabled]:opacity-50 sm:text-sm",
  });
</script>
