<template>
  <div
    ref="containerRef"
    :style="
      {
        '--border-size': `${borderSize}px`,
        '--border-radius': `${borderRadius}px`,
        '--neon-first-color': neonColors.firstColor,
        '--neon-second-color': neonColors.secondColor,
        '--card-width': `${dimensions.width}px`,
        '--card-height': `${dimensions.height}px`,
        '--card-content-radius': `${borderRadius - borderSize}px`,
        '--pseudo-element-background-image': `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
        '--pseudo-element-width': `${dimensions.width + borderSize * 2}px`,
        '--pseudo-element-height': `${dimensions.height + borderSize * 2}px`,
        '--after-blur': `${dimensions.width / 3}px`,
      } as CSSProperties
    "
    :class="neonGradientCardStyles().wrapper({ class: normalizeClass(props.class) || undefined })"
  >
    <div :class="neonGradientCardStyles().inner()">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { CSSProperties, HTMLAttributes } from "vue";

  export interface NeonColorsProps {
    firstColor: string;
    secondColor: string;
  }

  export interface NeonGradientCardProps extends PrimitiveProps {
    /**
     * @default ""
     * @type string
     * @description
     * The className of the card
     */
    class?: HTMLAttributes["class"];

    /**
     * @default 5
     * @type number
     * @description
     * The size of the border in pixels
     * */
    borderSize?: number;

    /**
     * @default 20
     * @type number
     * @description
     * The size of the radius in pixels
     * */
    borderRadius?: number;

    /**
     * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
     * @type string
     * @description
     * The colors of the neon gradient
     * */
    neonColors?: NeonColorsProps;

    [key: string]: any;
  }

  export const neonGradientCardStyles = tv({
    slots: {
      wrapper: "relative z-10 size-full rounded-(--border-radius)",
      inner: [
        "relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-gray-100 p-6",
        "before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block",
        "before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius) before:content-['']",
        "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-size-[100%_200%]",
        "before:animate-background-position-spin",
        "after:absolute after:-top-(--border-size) after:-left-(--border-size) after:-z-10 after:block",
        "after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:blur-(--after-blur) after:content-['']",
        "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-size-[100%_200%] after:opacity-80",
        "after:animate-background-position-spin",
        "dark:bg-neutral-900",
      ],
    },
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<NeonGradientCardProps>(), {
    borderSize: 2,
    borderRadius: 20,
    neonColors: () => ({
      firstColor: "#ff00aa",
      secondColor: "#00FFF1",
    }),
  });

  const containerRef = useTemplateRef("containerRef");
  const dimensions = ref({ width: 0, height: 0 });

  const updateDimensions = () => {
    if (containerRef.value) {
      const { offsetWidth, offsetHeight } = containerRef.value;
      dimensions.value = { width: offsetWidth, height: offsetHeight };
    }
  };

  useEventListener("resize", updateDimensions);

  onMounted(() => {
    updateDimensions();
  });
  watchEffect(updateDimensions);
</script>
