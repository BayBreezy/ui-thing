---
title: One-time password
description: Provides a form for the user to submit a one-time password
links:
  - title: OTP Docs
    href: https://github.com/ejirocodes/vue3-otp-input#readme
    icon: solar:password-minimalistic-input-outline
---

## Source code

Click :SourceCodeLink{component="OTP.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add otp
```

## Usage

### Placeholder

::ShowCase{component="DocsOTP"}

#code

```vue [DocsOTP.vue]
<template>
  <div class="flex items-center justify-center">
    <div class="grid gap-5">
      <div>
        <p class="mb-3 text-sm font-medium">Placeholder</p>
        <UIOTP :placeholder="['0', '0', '0', '0']" />
      </div>
    </div>
  </div>
</template>
```

::

### Separator

::ShowCase{component="DocsOTPSeparator"}

#code

```vue [DocsOTPSeparator.vue]
<template>
  <div class="flex items-center justify-center">
    <div>
      <p class="mb-3 text-sm font-medium">Separator</p>
      <UIOTP separator="-" />
    </div>
  </div>
</template>
```

::

### Disabled

::ShowCase{component="DocsOTPDisabled"}

#code

```vue [DocsOTPDisabled.vue]
<template>
  <div class="flex items-center justify-center">
    <div class="grid gap-5">
      <div>
        <p class="mb-3 text-sm font-medium">Disabled</p>
        <UIOTP disabled />
      </div>
    </div>
  </div>
</template>
```

::

### Event

::ShowCase{component="DocsOTPEvents"}

#code

```vue [DocsOTPEvents.vue]
<template>
  <div class="flex items-center justify-center">
    <div class="grid gap-5">
      <div>
        <p class="mb-3 text-sm font-medium">Events with 6 inputs</p>
        <UIOTP :num-inputs="6" v-model="otp" @complete="handleComplete" @change="handleChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const otp = ref("124");

  const handleComplete = (value: string) => {
    alert(`OTP: ${value}`);
  };

  const handleChange = (value: string) => {
    console.log(`OTP: ${value}`);
  };
</script>
```

::
