---
title: VeeVueFormSlider
description: Displays a slider for the user to pick a value from.
links:
  - title: NPM Package
    href: https://github.com/vueform/slider?tab=readme-ov-file#demo
    icon: lucide:sliders-horizontal
  - title: API Reference
    href: https://github.com/vueform/slider?tab=readme-ov-file#basic-props
    icon: icon-park-solid:api
---

## Source code

Click :SourceCodeLink{component="Vee/VueFormSlider.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-vue-form-slider
```

## Usage

You can visit the [VueForm Slider page](https://github.com/vueform/slider?tab=readme-ov-file#demo) for more information on how to use this component.

### Single Slider

::ShowCase

:DocsVeeVueFormSliderSingle

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/VueFormSlider/DocsVeeVueFormSliderSingle.vue" code lang="vue" -->

```vue [DocsVeeVueFormSliderSingle.vue]
<template>
  <div class="mx-auto max-w-md">
    <UiVeeVueFormSlider v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref(20);
</script>
```

<!-- /automd -->

::

### Multiple Sliders

::ShowCase

:DocsVeeVueFormSliderMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/VueFormSlider/DocsVeeVueFormSliderMultiple.vue" code lang="vue" -->

```vue [DocsVeeVueFormSliderMultiple.vue]
<template>
  <div class="mx-auto max-w-md">
    <UiVeeVueFormSlider v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref([20, 40]);
</script>
```

<!-- /automd -->

::

### Tooltip Formatting

::ShowCase

:DocsVeeVueFormSliderTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/VueFormSlider/DocsVeeVueFormSliderTooltip.vue" code lang="vue" -->

```vue [DocsVeeVueFormSliderTooltip.vue]
<template>
  <div class="mx-auto flex w-full max-w-xl flex-col gap-y-16">
    <div class="flex w-full flex-col gap-5">
      <p class="text-sm">A slider where the tooltip shows the value in currency format.</p>
      <UiVeeVueFormSlider v-model="value" tooltip-position="bottom" :format="format1" />
    </div>
    <div class="flex w-full flex-col gap-5">
      <p class="text-sm">A slider where the tooltip format is based on the object passed in.</p>
      <UiVeeVueFormSlider
        v-model="value"
        tooltip-position="bottom"
        :format="{
          decimals: 1,
          prefix: '£',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref(20);
  const format1 = (v: number) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
</script>
```

<!-- /automd -->

::

### Tooltip Merging

::ShowCase

:DocsVeeVueFormSliderMerging

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/VueFormSlider/DocsVeeVueFormSliderMerging.vue" code lang="vue" -->

```vue [DocsVeeVueFormSliderMerging.vue]
<template>
  <div class="mx-auto max-w-md">
    <UiVeeVueFormSlider v-model="value" :merge="10" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref([20, 30, 40]);
</script>
```

<!-- /automd -->

::

### Vertical Slider

::ShowCase

:DocsVeeVueFormSliderVertical

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/VueFormSlider/DocsVeeVueFormSliderVertical.vue" code lang="vue" -->

```vue [DocsVeeVueFormSliderVertical.vue]
<template>
  <div class="flex justify-center">
    <UiVeeVueFormSlider
      v-model="value"
      :step="5"
      orientation="vertical"
      :format="Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format"
    />
  </div>
</template>

<script lang="ts" setup>
  const value = ref(20);
</script>
```

<!-- /automd -->

::

### Form Validation

::ShowCase

:DocsVeeVueFormSliderValidate

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/VueFormSlider/DocsVeeVueFormSliderValidate.vue" code lang="vue" -->

```vue [DocsVeeVueFormSliderValidate.vue]
<template>
  <form class="mx-auto flex max-w-md flex-col gap-6" @submit="submit">
    <UiLabel for="slider">Age Range</UiLabel>
    <UiVeeVueFormSlider id="slider" v-model="value" show-tooltip="drag" />
    <UiButton type="submit">Set Range</UiButton>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const value = ref([18, 60]);

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        slider: z.array(
          z
            .number({ coerce: true })
            .min(18, "First value must be greater than 18")
            .max(60, "Second value must be less than 60")
        ),
      })
    ),
  });

  const submit = handleSubmit((values) => {
    useSonner.success("Range Set", {
      description: `The age range has been set to ${values.slider[0]}-${values.slider[1]}.`,
    });
  });
</script>
```

<!-- /automd -->

::
