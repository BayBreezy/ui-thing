<template>
  <PinInputRoot
    data-slot="pin-input"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <template v-for="(input, k) in inputCount" :key="k">
        <UiPinInputInput :aria-invalid :index="k" />
        <template v-if="k < inputCount - 1">
          <span v-if="separator" class="text-muted-foreground">{{ separator }}</span>
        </template>
      </template>
    </slot>
  </PinInputRoot>
</template>

<script lang="ts" setup>
  import { PinInputRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PinInputRootEmits, PinInputRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PinInputRootProps & {
        /** Custom class(es) to apply to the parent element. */
        class?: HTMLAttributes["class"];
        /** The number of inputs to render.  @default 4 */
        inputCount?: number;
        /** The separator to render between inputs.  @default undefined */
        separator?: string;
        /**
         * Whether the input should be marked as invalid for accessibility purposes.
         */
        ariaInvalid?: boolean;
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
