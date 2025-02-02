---
title: Alert
description: A visually emphasized message that informs the user of an event.
---

## Source code

Click :SourceCodeLink{component="Alert"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add alert
```

## Usage

### Basic

::ShowCase

:DocsAlert

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlert.vue" code lang="vue" -->

```vue [DocsAlert.vue]
<template>
  <div>
    <UiAlert title="Heads up" description="You have 23 new messages" icon="lucide:mail" />
  </div>
</template>
```

<!-- /automd -->

::

### Destructive

::ShowCase

:DocsAlertDestructive

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertDestructive.vue" code lang="vue" -->

```vue [DocsAlertDestructive.vue]
<template>
  <div>
    <UiAlert
      class="mt-5"
      variant="destructive"
      title="Error"
      description="Your session has expired. Please log in again."
      icon="lucide:alert-circle"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Border

::ShowCase

:DocsAlertBorder

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertBorder.vue" code lang="vue" -->

```vue [DocsAlertBorder.vue]
<template>
  <div>
    <UiAlert
      class="border-l-8 border-l-primary"
      title="New users"
      description="Over 25K new users joined today!"
      icon="lucide:users"
    />
  </div>
</template>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/alerts-notifications-banners). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Warning

::ShowCase

:DocsAlertWarning

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertWarning.vue" code lang="vue" -->

```vue [DocsAlertWarning.vue]
<template>
  <div>
    <UiAlert description="Some information is missing!">
      <template #icon>
        <Icon
          name="lucide:triangle-alert"
          class="mt-0.5 size-4 text-amber-500"
          aria-hidden="true"
        />
      </template>
    </UiAlert>
  </div>
</template>
```

<!-- /automd -->

::

### Warning Outline

::ShowCase

:DocsAlertWarningOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertWarningOutline.vue" code lang="vue" -->

```vue [DocsAlertWarningOutline.vue]
<template>
  <UiAlert
    icon="lucide:triangle-alert"
    variant="warning"
    description="Some information is missing!"
    icon-class="mt-0.5"
  />
</template>
```

<!-- /automd -->

::

### Error

::ShowCase

:DocsAlertError

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertError.vue" code lang="vue" -->

```vue [DocsAlertError.vue]
<template>
  <div>
    <UiAlert description="An error occurred!">
      <template #icon>
        <Icon name="lucide:circle-alert" class="mt-0.5 size-4 text-red-500" aria-hidden="true" />
      </template>
    </UiAlert>
  </div>
</template>
```

<!-- /automd -->

::

### Error Outline

::ShowCase

:DocsAlertErrorOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertErrorOutline.vue" code lang="vue" -->

```vue [DocsAlertErrorOutline.vue]
<template>
  <UiAlert
    icon="lucide:circle-alert"
    variant="destructive"
    icon-class="mt-0.5"
    description="An error occurred!"
  />
</template>
```

<!-- /automd -->

::

### Info

::ShowCase

:DocsAlertInfo

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertInfo.vue" code lang="vue" -->

```vue [DocsAlertInfo.vue]
<template>
  <div>
    <UiAlert description="Just a quick note!">
      <template #icon>
        <Icon name="lucide:info" class="mt-0.5 size-4 text-blue-500" aria-hidden="true" />
      </template>
    </UiAlert>
  </div>
</template>
```

<!-- /automd -->

::

### Info Outline

::ShowCase

:DocsAlertInfoOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertInfoOutline.vue" code lang="vue" -->

```vue [DocsAlertInfoOutline.vue]
<template>
  <UiAlert icon="lucide:info" variant="info" description="Just a quick note!" icon-class="mt-0.5" />
</template>
```

<!-- /automd -->

::

### Success

::ShowCase

:DocsAlertSuccess

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertSuccess.vue" code lang="vue" -->

```vue [DocsAlertSuccess.vue]
<template>
  <div>
    <UiAlert description="Completed successfully!">
      <template #icon>
        <Icon
          name="lucide:circle-check"
          class="mt-0.5 size-4 text-emerald-500"
          aria-hidden="true"
        />
      </template>
    </UiAlert>
  </div>
</template>
```

<!-- /automd -->

::

### Success Outline

::ShowCase

:DocsAlertSuccessOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertSuccessOutline.vue" code lang="vue" -->

```vue [DocsAlertSuccessOutline.vue]
<template>
  <UiAlert
    icon="lucide:circle-check"
    variant="success"
    icon-class="mt-0.5"
    description="Some information is missing!"
  />
</template>
```

<!-- /automd -->

::

### End Link

::ShowCase

:DocsAlertEndLink

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertEndLink.vue" code lang="vue" -->

```vue [DocsAlertEndLink.vue]
<template>
  <div>
    <UiAlert
      icon-class="mt-0.5 size-4 text-amber-500"
      icon="lucide:triangle-alert"
      description="Some information is missing!"
    >
      <UiAlertDescription class="flex w-full items-center justify-between">
        Some information is missing!
        <NuxtLink
          href="#"
          class="group flex items-center gap-2 transition-colors hover:text-amber-500"
          >Add it
          <Icon
            name="lucide:arrow-right"
            class="size-4 shrink-0 transform transition-transform group-hover:translate-x-1"
        /></NuxtLink>
      </UiAlertDescription>
    </UiAlert>
  </div>
</template>
```

<!-- /automd -->

::

### Sub Data

::ShowCase

:DocsAlertSubData

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertSubData.vue" code lang="vue" -->

```vue [DocsAlertSubData.vue]
<template>
  <UiAlert
    icon="lucide:circle-alert"
    icon-class="mt-0.5 size-4 shrink-0 text-red-500 opacity-60"
    class="rounded-lg border border-border px-4 py-3"
  >
    <div class="grow space-y-1">
      <p class="text-sm font-medium">Password does not meet requirements:</p>
      <ul class="list-inside list-disc text-sm text-muted-foreground">
        <li>Minimum 8 characters</li>
        <li>Include a special character</li>
      </ul>
    </div>
  </UiAlert>
</template>
```

<!-- /automd -->

::

### Close Button

::ShowCase

:DocsAlertCloseButton

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertCloseButton.vue" code lang="vue" -->

```vue [DocsAlertCloseButton.vue]
<template>
  <TransitionScale :scale="0.98">
    <UiAlert
      v-model="open"
      icon="lucide:circle-alert"
      variant="destructive"
      icon-class="mt-0.5"
      description="An error occurred!"
    >
      <UiAlertDescription class="flex w-full items-center justify-between">
        This is a description of the error that occurred.
        <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
          <Icon name="lucide:x" class="size-3.5" />
        </UiButton>
      </UiAlertDescription>
    </UiAlert>
  </TransitionScale>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

## Notifications

### Close Button w/ Undo

::ShowCase

:DocsAlertNotificationSingleButton

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertNotificationSingleButton.vue" code lang="vue" -->

```vue [DocsAlertNotificationSingleButton.vue]
<template>
  <TransitionScale :scale="0.98">
    <UiAlert
      v-if="open"
      icon="lucide:circle-check"
      class="items-center"
      icon-class="text-emerald-500"
    >
      <UiAlertDescription class="flex items-center justify-between">
        Your profile has been updated!
        <div class="flex items-center gap-3">
          <UiButton class="text-xs" size="xs" @click="useSonner('Changes reverted')">Undo</UiButton>
          <UiButton variant="ghost" size="icon-xs" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </div>
      </UiAlertDescription>
    </UiAlert>
  </TransitionScale>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

### Double Button

::ShowCase

:DocsAlertNotificationDoubleButton

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertNotificationDoubleButton.vue" code lang="vue" -->

```vue [DocsAlertNotificationDoubleButton.vue]
<template>
  <TransitionScale :scale="0.98">
    <UiAlert
      v-if="open"
      icon="lucide:circle-check"
      class="items-center"
      icon-class="text-emerald-500"
    >
      <UiAlertDescription class="flex items-center justify-between">
        Message sent
        <div class="flex items-center gap-1">
          <UiButton variant="link" class="text-sm" size="xs">View</UiButton>
          <span>•</span>
          <UiButton variant="link" class="text-sm" size="xs">Undo</UiButton>
          <UiButton variant="ghost" size="icon-xs" class="ml-2 size-6" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </div>
      </UiAlertDescription>
    </UiAlert>
  </TransitionScale>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

### Success Learn More

::ShowCase

:DocsAlertNotificationSuccessMore

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertNotificationSuccessMore.vue" code lang="vue" -->

```vue [DocsAlertNotificationSuccessMore.vue]
<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open" icon="lucide:circle-check" icon-class="text-emerald-500 mt-0.5">
        <UiAlertDescription class="mb-1 flex items-center justify-between font-medium">
          Your request was completed!
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">
          It demonstrates that the task or request has been processed.
        </p>
        <UiButton class="text-xs" size="xs">Learn more</UiButton>
      </UiAlert>
    </TransitionScale>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

### Privacy

::ShowCase

:DocsAlertNotificationPrivacy

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertNotificationPrivacy.vue" code lang="vue" -->

```vue [DocsAlertNotificationPrivacy.vue]
<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open">
        <UiAlertDescription class="mb-1 flex items-center justify-between font-medium">
          We Value Your Privacy 🍪
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">
          We use cookies to improve your experience, and show personalized content.
        </p>
        <div class="flex items-center gap-2">
          <UiButton class="text-xs" size="xs">Accept</UiButton>
          <UiButton class="text-xs" size="xs" variant="outline">Decline</UiButton>
        </div>
      </UiAlert>
    </TransitionScale>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

### Version Update

::ShowCase

:DocsAlertNotificationVersion

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertNotificationVersion.vue" code lang="vue" -->

```vue [DocsAlertNotificationVersion.vue]
<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open">
        <template #icon>
          <UiFancyIcon size="md" circle>
            <Icon name="lucide:refresh-cw" class="size-4" />
          </UiFancyIcon>
        </template>
        <UiAlertDescription class="mb-1 flex items-center justify-between font-medium">
          Version 1.4 is now available!
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">
          This update contains several bug fixes and performance improvements.
        </p>
        <div class="flex items-center gap-2">
          <UiButton class="text-xs" size="xs">Install</UiButton>
          <UiButton class="text-xs" size="xs" variant="link">Later</UiButton>
        </div>
      </UiAlert>
    </TransitionScale>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

### Mentioned

::ShowCase

:DocsAlertNotificationMention

#code

<!-- automd:file src="../../app/components/content/Docs/Alert/DocsAlertNotificationMention.vue" code lang="vue" -->

```vue [DocsAlertNotificationMention.vue]
<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open">
        <template #icon>
          <UiAvatar class="size-8">
            <UiAvatarFallback>MP</UiAvatarFallback>
            <UiAvatarImage src="https://i.pravatar.cc/300" alt="Mary Palmer" />
          </UiAvatar>
        </template>
        <UiAlertDescription class="mb-1 flex items-start justify-between text-muted-foreground">
          <div>
            <a class="font-medium text-foreground hover:underline" href="#"> Mary Palmer </a>
            mentioned you in
            <a class="font-medium text-foreground hover:underline" href="#">
              project-campaign-02
            </a>
          </div>
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">2 min ago</p>
        <div class="flex items-center gap-2">
          <UiButton class="text-xs" size="xs">Accept</UiButton>
          <UiButton class="text-xs" size="xs" variant="outline">Decline</UiButton>
        </div>
      </UiAlert>
    </TransitionScale>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::
