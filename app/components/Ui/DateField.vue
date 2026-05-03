<template>
  <DateFieldRoot
    v-slot="{ segments }"
    v-bind="props"
    v-model="localModel"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <template v-for="item in segments" :key="item.part">
      <DateFieldInput
        v-if="item.part === 'literal'"
        :part="item.part"
        class="text-muted-foreground inline-flex items-center justify-center"
      >
        <Icon v-if="separatorIcon" :name="separatorIcon" class="text-muted-foreground" />
        <span v-else-if="separator" class="text-muted-foreground mx-1">{{ separator }}</span>
      </DateFieldInput>
      <DateFieldInput
        v-else
        :part="item.part"
        class="focus:ring-ring aria-[valuetext=Empty]:text-muted-foreground inline-flex cursor-text items-center rounded px-1 transition focus:ring-1 focus:outline-none"
      >
        {{ item.value }}
      </DateFieldInput>
    </template>
  </DateFieldRoot>
</template>

<script lang="ts" setup>
  import type { DateValue } from "@internationalized/date";
  import { DateFieldInput, DateFieldRoot } from "reka-ui";
  import type { DateFieldRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      DateFieldRootProps & {
        /** Any additional class that should be added to the date field. */
        class?: HTMLAttributes["class"];
        /**
         * The separator to use between date segments.
         *
         * @default "/"
         */
        separator?: string;
        /** The icon to use as a separator. */
        separatorIcon?: string;
      }
    >(),
    {
      separator: "/",
    }
  );
  const localModel = defineModel<DateValue>();

  const styles = tv({
    base: "border-input bg-background ring-offset-background selection:bg-primary selection:text-primary-foreground file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring data-invalid:border-destructive dark:bg-input/30 h-9 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
  });
</script>
