<template>
  <PinInputRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <template v-for="(input, k) in inputCount" :key="k">
        <UiPinInputInput :index="k" />
        <template v-if="k < inputCount - 1">
          <span v-if="separator" class="text-muted-foreground">{{ separator }}</span>
        </template>
      </template>
    </slot>
  </PinInputRoot>
</template>

<script lang="ts" setup>
  import { PinInputRoot, useForwardPropsEmits } from "radix-vue";
  import type { PinInputRootEmits, PinInputRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PinInputRootProps & {
        /** Custom class(es) to apply to the parent element. */
        class?: any;
        /** The number of inputs to render.  @default 4 */
        inputCount?: number;
        /** The separator to render between inputs.  @default undefined */
        separator?: string;
      }
    >(),
    {
      inputCount: 4,
    }
  );

  const emits = defineEmits<PinInputRootEmits>();

  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "inputCount", "separator"),
    emits
  );
  const styles = tv({
    base: "flex items-center gap-2",
  });
</script>
