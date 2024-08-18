<template>
  <ClientOnly>
    <TabsIndicator v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">
      <slot>
        <div class="h-full w-full rounded-md bg-primary" />
      </slot>
    </TabsIndicator>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { TabsIndicator } from "radix-vue";
  import type { TabsIndicatorProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<
    TabsIndicatorProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "absolute bottom-0 left-0 h-[3px] w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full px-1 transition-[width,transform] duration-300",
  });
</script>
