<template>
  <SplitterResizeHandle v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <div
        v-if="withHandle"
        class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"
      >
        <Icon :name="icon" class="h-2.5 w-2.5" />
      </div>
    </slot>
  </SplitterResizeHandle>
</template>

<script lang="ts" setup>
  import { SplitterResizeHandle, useForwardPropsEmits } from "radix-vue";
  import type { SplitterResizeHandleEmits, SplitterResizeHandleProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      SplitterResizeHandleProps & {
        direction?: "horizontal" | "vertical";
        class?: any;
        withHandle?: boolean;
        icon?: string;
      }
    >(),
    {
      direction: "horizontal",
      icon: "lucide:grip-vertical",
    }
  );

  const emit = defineEmits<SplitterResizeHandleEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "withHandle", "icon"), emit);

  const styles = tv({
    base: "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",
  });
</script>
