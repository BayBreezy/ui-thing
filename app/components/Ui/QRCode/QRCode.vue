<template>
  <div :class="qrCodeStyles().root({ size, class: normalizeClass(props.class) || undefined })">
    <div ref="qrCodeRef" />

    <slot name="top-left">
      <UiQRCodeFrameHandle class="absolute top-0 left-0" />
    </slot>
    <slot name="top-right">
      <UiQRCodeFrameHandle class="absolute top-0 right-0 rotate-90" />
    </slot>
    <slot name="bottom-right">
      <UiQRCodeFrameHandle class="absolute right-0 bottom-0 rotate-180" />
    </slot>
    <slot name="bottom-left">
      <UiQRCodeFrameHandle class="absolute bottom-0 left-0 -rotate-90" />
    </slot>

    <slot name="overlay" />
  </div>
</template>

<script lang="ts">
  import QRCodeStyling from "qr-code-styling";
  import { normalizeClass } from "vue";
  import type { Options as QRCodeStylingOptions } from "qr-code-styling";

  export const qrCodeStyles = tv({
    slots: {
      root: "relative flex items-center justify-center",
    },
    variants: {
      size: {
        md: { root: "p-2", qr: "size-[96px]" },
        lg: { root: "p-3", qr: "size-[128px]" },
      },
    },
  });

  export type QRCodeProps = {
    /**
     * The value to encode in the QR code.
     */
    value: string;
    /**
     * Additional options to customize the QR code.
     */
    options?: QRCodeStylingOptions;
    /**
     * The size of the QR code.
     *
     * @default "md"
     */
    size?: VariantProps<typeof qrCodeStyles>["size"];
    /**
     * The class name to apply to the QR code.
     */
    class?: string;
  };

  /**
   * QR code size configurations
   */
  export const QR_CODE_SIZES = {
    md: { width: 96, height: 96 },
    lg: { width: 128, height: 128 },
  } as const;
</script>

<script lang="ts" setup>
  const qrCodeRef = useTemplateRef("qrCodeRef");
  const qrCodeInstance = ref<QRCodeStyling | null>(null);
  const props = withDefaults(defineProps<QRCodeProps>(), {
    size: "md",
  });

  onMounted(() => {
    if (!qrCodeRef.value) return;

    const sizeConfig = QR_CODE_SIZES[props.size];

    qrCodeInstance.value = new QRCodeStyling({
      width: sizeConfig.width,
      height: sizeConfig.height,
      data: props.value,
      type: "svg",
      ...props.options,
    });

    qrCodeInstance.value.append(qrCodeRef.value);
  });

  watch(
    () => [props.value, props.options, props.size],
    () => {
      if (!qrCodeInstance.value) return;

      const sizeConfig = QR_CODE_SIZES[props.size];

      qrCodeInstance.value.update({
        data: props.value,
        width: sizeConfig.width,
        height: sizeConfig.height,
        ...props.options,
      });
    },
    { deep: true }
  );

  defineSlots<{
    /**
     * Slot for the top-left frame handle
     */
    "top-left": () => any;
    /**
     * Slot for the top-right frame handle
     */
    "top-right": () => any;
    /**
     * Slot for the bottom-right frame handle
     */
    "bottom-right": () => any;
    /**
     * Slot for the bottom-left frame handle
     */
    "bottom-left": () => any;
    /**
     * Slot for overlay content (like gradient scan)
     */
    overlay: () => any;
  }>();

  defineExpose({
    qrCodeInstance,
  });
</script>
