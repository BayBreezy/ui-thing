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

::ShowCase{component="DocsAlert"}

#code

```vue [DocsAlert.vue]
<template>
  <div>
    <UIAlert title="Heads up" description="You have 23 new messages" icon="lucide:mail" />
    <UIAlert
      class="mt-5"
      variant="destructive"
      title="Error"
      description="Your session has expired. Please log in again."
      icon="lucide:alert-circle"
    />
  </div>
</template>
```

::
