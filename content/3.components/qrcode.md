---
title: QR Code
description: A component for generating and displaying QR codes with customizable styling and frame handles.
---

## Source code

Click :SourceCodeLink{component="QRCode"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add qrcode"}

## Usage

### Basic

::ShowCase

:DocsQ_RCodeBasic

#code

<!-- automd:file src="../../app/components/content/Docs/QRCode/DocsQRCodeBasic.vue" code lang="vue" -->

```vue [DocsQRCodeBasic.vue]
<template>
  <div class="flex items-center justify-center">
    <UiQRCode value="https://uithing.com" />
  </div>
</template>
```

<!-- /automd -->

::

### Large Size

::ShowCase

:DocsQ_RCodeLarge

#code

<!-- automd:file src="../../app/components/content/Docs/QRCode/DocsQRCodeLarge.vue" code lang="vue" -->

```vue [DocsQRCodeLarge.vue]
<template>
  <div class="flex items-center justify-center">
    <UiQRCode value="https://uithing.com" size="lg" />
  </div>
</template>
```

<!-- /automd -->

::

### Custom Frame Handles

::ShowCase

:DocsQ_RCodeCustomHandles

#code

<!-- automd:file src="../../app/components/content/Docs/QRCode/DocsQRCodeCustomHandles.vue" code lang="vue" -->

```vue [DocsQRCodeCustomHandles.vue]
<template>
  <div class="flex items-center justify-center">
    <UiQRCode value="https://uithing.com" size="lg">
      <template #top-left>
        <UiQRCodeFrameHandle class="absolute top-0 left-0 border-blue-500" />
      </template>
      <template #top-right>
        <UiQRCodeFrameHandle class="absolute top-0 right-0 rotate-90 border-emerald-500" />
      </template>
      <template #bottom-right>
        <UiQRCodeFrameHandle class="absolute right-0 bottom-0 rotate-180 border-red-500" />
      </template>
      <template #bottom-left>
        <UiQRCodeFrameHandle class="absolute bottom-0 left-0 -rotate-90 border-yellow-500" />
      </template>
    </UiQRCode>
  </div>
</template>
```

<!-- /automd -->

::

### With Gradient Scan

::ShowCase

:DocsQ_RCodeGradientScan

#code

<!-- automd:file src="../../app/components/content/Docs/QRCode/DocsQRCodeGradientScan.vue" code lang="vue" -->

```vue [DocsQRCodeGradientScan.vue]
<template>
  <div class="relative mx-auto flex aspect-square w-full max-w-60 items-center justify-center">
    <UiQRCode value="https://uithing.com" size="lg" />
    <UiQRCodeGradientScan />
  </div>
</template>
```

<!-- /automd -->

::

### Dynamic Value Update

::ShowCase

:DocsQ_RCodeDynamic

#code

<!-- automd:file src="../../app/components/content/Docs/QRCode/DocsQRCodeDynamic.vue" code lang="vue" -->

```vue [DocsQRCodeDynamic.vue]
<template>
  <div class="mx-auto flex max-w-100 flex-col items-center gap-8">
    <UiVeeInput v-model="qrValue" label="QR Code Value" placeholder="Enter URL or text" />

    <UiQRCode :value="qrValue" size="lg" />
  </div>
</template>

<script lang="ts" setup>
  const qrValue = ref("https://uithing.com");
</script>
```

<!-- /automd -->

::

### With Custom Options

::ShowCase

:DocsQ_RCodeCustomOptions

#code

<!-- automd:file src="../../app/components/content/Docs/QRCode/DocsQRCodeCustomOptions.vue" code lang="vue" -->

```vue [DocsQRCodeCustomOptions.vue]
<template>
  <div class="flex items-center justify-center">
    <UiQRCode
      value="https://example.com"
      size="lg"
      :options="{
        backgroundOptions: { color: 'var(--color-background)', round: 0.1 },
        image: '/icon.png',
        imageOptions: { margin: 4, hideBackgroundDots: true },
        dotsOptions: {
          color: 'var(--color-indigo-500)',
          type: 'dots',
        },
        cornersSquareOptions: {
          color: 'var(--color-green-500)',
          type: 'dot',
          gradient: {
            type: 'linear',
            rotation: 45,
            colorStops: [
              { offset: 0, color: 'var(--color-purple-500)' },
              { offset: 1, color: 'var(--color-pink-500)' },
            ],
          },
        },
        cornersDotOptions: {
          type: 'dot',
          gradient: {
            type: 'radial',
            colorStops: [
              { offset: 0, color: 'var(--color-cyan-50)' },
              { offset: 1, color: 'var(--color-indigo-500)' },
            ],
          },
        },
      }"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Full Featured

::ShowCase

:DocsQ_RCodeFull

#code

<!-- automd:file src="../../app/components/content/Docs/QRCode/DocsQRCodeFull.vue" code lang="vue" -->

```vue [DocsQRCodeFull.vue]
<template>
  <div class="space-y-6">
    <UiVeeInput v-model="url" label="Enter URL" placeholder="https://..." />

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Medium QR Code -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Medium Size</h3>
        <div class="flex justify-center rounded-lg border border-border p-4">
          <UiQRCode :value="url" size="md" />
        </div>
      </div>

      <!-- Large QR Code with Gradient -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Large with Gradient</h3>
        <div class="relative flex justify-center rounded-lg border border-border p-4">
          <UiQRCode :value="url" size="lg"> </UiQRCode>
          <UiQRCodeGradientScan />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const url = ref("https://example.com");
</script>
```

<!-- /automd -->

::

## Props

| Prop      | Type                   | Default     | Description                                         |
| --------- | ---------------------- | ----------- | --------------------------------------------------- |
| `value`   | `string`               | required    | The value to encode in the QR code                  |
| `size`    | `'md' \| 'lg'`         | `'md'`      | The size of the QR code                             |
| `options` | `QRCodeStylingOptions` | `undefined` | Additional options to customize the QR code styling |
| `class`   | `string`               | `undefined` | Additional CSS classes to apply to the root element |

## Slots

| Slot           | Description                                   |
| -------------- | --------------------------------------------- |
| `top-left`     | Slot for the top-left frame handle            |
| `top-right`    | Slot for the top-right frame handle           |
| `bottom-right` | Slot for the bottom-right frame handle        |
| `bottom-left`  | Slot for the bottom-left frame handle         |
| `overlay`      | Slot for overlay content (like gradient scan) |

## Sub-Components

### Frame Handle

The `UiQRCodeFrameHandle` component is used to display the corner handles of the QR code. It can be customized or hidden using the named slots.

### Gradient Scan

The `UiQRCodeGradientScan` component creates a gradient scanning effect overlay on the QR code, commonly seen in modern QR code designs.

## Notes

- The QR code uses the [qr-code-styling](https://www.npmjs.com/package/qr-code-styling) library for generation and rendering
- QR codes are rendered as SVG for scalability and crisp rendering
- All size variants are responsive and accessible
- The component automatically updates when the `value` prop or `options` change
