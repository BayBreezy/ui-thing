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

Remember to add the `<UiToastToaster />` component to your app layout.

```vue
<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UiToastToaster />
  </div>
</template>
```

## Usage

### Full example

::ShowCase

:DocsToast

#code

<!-- automd:file src="../../app/components/content/Docs/Toast/DocsToast.vue" code lang="vue" -->

```vue [DocsToast.vue]
<template>
  <div>
    <div class="flex flex-wrap items-center gap-2">
      <UiButton variant="outline" class="mr-5" @click="showMessage()">Show Toast</UiButton>
      <UiButton variant="outline" class="mr-5" @click="showMessage('success')"
        >Success Toast</UiButton
      >
      <UiButton variant="outline" class="mr-5" @click="showMessage('info')">Info Toast</UiButton>
      <UiButton variant="outline" class="mr-5" @click="showMessage('warning')"
        >Warning Toast</UiButton
      >
      <UiButton variant="outline" class="mr-5" @click="showMessage('destructive')"
        >Error Toast</UiButton
      >
      <UiButton variant="outline" class="mr-5" @click="showMessage('action')"
        >Action Toast</UiButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (type?: any) => {
    if (!type) {
      return useToast().toast({
        description: "Your message has been sent",
      });
    }
    if (type === "action") {
      return useToast().toast({
        title: "Message Sent",
        icon: "lucide:mail",
        description: "Your message has been sent. Click undo to revert the action",
        action: h(
          resolveComponent("UiToastAction"),
          {
            altText: "Undo",
          },
          {
            default: () => "Undo",
          }
        ),
      });
    }
    return useToast().toast({
      title: "Message Sent",
      description: "Your message has been sent",
      variant: type,
      icon: getToasticon(type),
    });
  };

  const getToasticon = (type: string) => {
    switch (type) {
      case "success":
        return "lucide:badge-check";
      case "info":
        return "lucide:badge-info";
      case "warning":
        return "lucide:badge-alert";
      case "destructive":
        return "lucide:badge-x";
      default:
        return "lucide:badge-check";
    }
  };
</script>
```

<!-- /automd -->

::
