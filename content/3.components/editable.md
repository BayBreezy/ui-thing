---
title: Editable
description: Displays an input field used for editing a single line of text, rendering as static text on load. It transforms into a text input field when the edit interaction is triggered.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/editable.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/editable.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Editable"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add editable
```

## Usage

The `Editable` component is one that will be used differently in different parts of your app.

Since we already have styled buttons and inputs, it kinda makes no sense to force a specific style on the `Editable` component when we can just use the `asChild` prop to pass in the children we want to use.

::ShowCase

:DocsEditable

#code

<!-- automd:file src="../../app/components/content/Docs/Editable/DocsEditable.vue" code lang="vue" -->

```vue [DocsEditable.vue]
<template>
  <div>
    <div class="w-full">
      <h1 class="text-lg font-semibold">Application</h1>
      <p class="mt-px text-sm text-muted-foreground">
        Below is the information submitted. Click on the values to edit them.
      </p>

      <dl class="mt-7">
        <template v-for="d in details" :key="d.key">
          <div
            class="grid grid-cols-1 gap-y-2 border-b px-2 py-6 text-sm first:border-t md:grid-cols-2 md:px-0"
          >
            <dt class="font-medium">{{ d.key }}</dt>

            <UiEditable v-slot="{ isEditing }" v-model="d.value">
              <UiEditableArea>
                <UiEditablePreview as="dd" class="h-8 cursor-pointer text-muted-foreground">
                  <span class="flex size-full items-center">
                    {{ d.value }}
                  </span>
                </UiEditablePreview>
                <div class="flex items-center gap-2">
                  <div class="shrink-0 grow">
                    <UiEditableInput as-child>
                      <UiInput class="h-8 px-2" />
                    </UiEditableInput>
                  </div>
                  <div v-if="isEditing" class="flex items-center gap-1">
                    <UiEditableSubmit as-child>
                      <UiButton class="size-8" size="icon-sm">
                        <Icon name="lucide:check" class="size-4" />
                      </UiButton>
                    </UiEditableSubmit>
                    <UiEditableCancel as-child>
                      <UiButton variant="outline" class="size-8" size="icon-sm">
                        <Icon name="lucide:x" class="size-4" />
                      </UiButton>
                    </UiEditableCancel>
                  </div>
                </div>
              </UiEditableArea>
            </UiEditable>
          </div>
        </template>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const details = ref([
    { key: "Full name", value: "John Doe" },
    { key: "Email", value: "janedoe@testmail.com" },
    { key: "Phone", value: "123-456-7890" },
    { key: "Address", value: "1234 Elm St" },
    { key: "City", value: "Springfield" },
    { key: "State", value: "IL" },
    { key: "Zip", value: "62701" },
  ]);
</script>
```

<!-- /automd -->

::
