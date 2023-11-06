---
title: Toast
description: A succinct message that is displayed temporarily.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/toast.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/toast.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Toast"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add toast
```

Remember to add the `<UIToastToaster />` component to your app layout.

```vue
<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UIToastToaster />
  </div>
</template>
```

## Usage

### Full example

::ShowCase{component="DocsToast"}

#code

```vue [DocsToast.vue]
<template>
  <div>
    <div class="flex flex-wrap items-center gap-2">
      <UIButton variant="outline" class="mr-5" @click="showMessage()">Show Toast</UIButton>
      <UIButton variant="outline" class="mr-5" @click="showMessage('success')"
        >Success Toast</UIButton
      >
      <UIButton variant="outline" class="mr-5" @click="showMessage('info')">Info Toast</UIButton>
      <UIButton variant="outline" class="mr-5" @click="showMessage('warning')"
        >Warning Toast</UIButton
      >
      <UIButton variant="outline" class="mr-5" @click="showMessage('destructive')"
        >Error Toast</UIButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (type?: any) => {
    useToast().add({
      title: "Message sent successfully!",
      description: "Alex received your message.",
      variant: type,
      action: () => {
        alert("Action button clicked!");
      },
      actionText: "Undo",
      icon: "lucide:check-circle",
    });
  };
</script>
```

::
