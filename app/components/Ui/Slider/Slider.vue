<template>
  <SliderRoot
    data-slot="slider"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :props="props">
      <slot name="track" :props="props">
        <UiSliderTrack>
          <slot name="range" :props="props">
            <UiSliderRange />
          </slot>
        </UiSliderTrack>
      </slot>
      <slot name="thumb" :props="props">
        <template v-if="showTooltip">
          <UiTooltipProvider v-for="(_, key) in modelValue?.length" :key="key">
            <UiTooltip :open="showTooltipState">
              <UiTooltipTrigger as-child>
                <UiSliderThumb
                  as="span"
                  class="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] outline-none hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
                  data-slot="slider-thumb"
                  @pointerdown="handlePointerDown"
                />
              </UiTooltipTrigger>
              <UiTooltipContent
                :side-offset="8"
                :side="props.orientation === 'vertical' ? 'right' : 'top'"
                class="px-2 py-1 text-xs"
              >
                {{ modelValue?.[key] }}
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>
        </template>
        <template v-else>
          <UiSliderThumb v-for="(t, i) in modelValue?.length" :key="i" />
        </template>
      </slot>
    </slot>
  </SliderRoot>
</template>

<script lang="ts" setup>
  import { SliderRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { SliderRootEmits, SliderRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      SliderRootProps & {
        /** Custom class(es) to add to parent element */
        class?: HTMLAttributes["class"];
        showTooltip?: boolean;
      }
    >(),
    {
      orientation: "horizontal",
      min: 0,
      step: 1,
      max: 100,
      modelValue: () => [0],
      minStepsBetweenThumbs: 1,
    }
  );

  const emits = defineEmits<SliderRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
  });

  const showTooltipState = ref(false);

  const handlePointerDown = () => {
    if (props.showTooltip) {
      showTooltipState.value = true;
    }
  };

  const handlePointerUp = () => {
    if (props.showTooltip) {
      showTooltipState.value = false;
    }
  };

  onMounted(() => {
    if (props.showTooltip) {
      document.addEventListener("pointerup", handlePointerUp);
    }
  });

  onUnmounted(() => {
    if (props.showTooltip) {
      document.removeEventListener("pointerup", handlePointerUp);
    }
  });
</script>
