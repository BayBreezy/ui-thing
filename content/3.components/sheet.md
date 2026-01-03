---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/dialog.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/dialog.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Sheet"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add sheet"}

## Usage

### Right side sheet (default)

::ShowCase

:DocsSheet

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheet.vue" code lang="vue" -->

```vue [DocsSheet.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        class="sm:max-w-none md:w-[450px]"
        side="right"
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div class="grid gap-4 p-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <UiLabel for="name" class="text-right"> Name </UiLabel>
              <UiInput id="name" model-value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <UiLabel for="username" class="text-right"> Username </UiLabel>
              <UiInput id="username" model-value="@peduarte" class="col-span-3" />
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter>
            <UiSheetClose as-child>
              <UiButton variant="outline" type="button" class="mt-2 sm:mt-0">Cancel</UiButton>
            </UiSheetClose>
            <UiSheetClose as-child>
              <UiButton type="submit">Save</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
```

<!-- /automd -->

::

### Left side sheet

::ShowCase

:DocsSheetLeft

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheetLeft.vue" code lang="vue" -->

```vue [DocsSheetLeft.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Left Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        side="left"
        title="Navigation"
        description="Access additional navigation options"
        class="w-80"
      >
        <template #content>
          <div class="">
            <UiGradientDivider />
            <nav class="mt-4 flex flex-col gap-1 px-3">
              <template v-for="item in links" :key="item.name">
                <UiButton variant="ghost" class="w-full justify-start" :href="item.href">
                  <Icon :name="item.icon" class="size-4 text-muted-foreground/70" />
                  {{ item.name }}
                </UiButton>
              </template>
            </nav>
          </div>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>

<script lang="ts" setup>
  const links = [
    { name: "Home", href: "#", icon: "lucide:home" },
    { name: "Profile", href: "#", icon: "lucide:user" },
    { name: "Settings", href: "#", icon: "lucide:settings" },
    { name: "Help", href: "#", icon: "lucide:life-buoy" },
    { name: "Settings", href: "#", icon: "lucide:settings" },
    { name: "Logout", href: "#", icon: "lucide:log-out" },
  ];
</script>
```

<!-- /automd -->

::

### Bottom sheet

::ShowCase

:DocsSheetBottom

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheetBottom.vue" code lang="vue" -->

```vue [DocsSheetBottom.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Bottom Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent side="bottom" title="Filters" description="Refine your search results">
        <template #content>
          <div class="space-y-4">
            <UiGradientDivider class="-mt-3" />
            <div class="space-y-3 px-4">
              <UiLabel for="categories"> Choose Categories </UiLabel>
              <UiToggleGroup id="categories" type="multiple" class="justify-start">
                <UiToggleGroupItem size="sm" value="all" variant="outline">All</UiToggleGroupItem>
                <UiToggleGroupItem size="sm" value="books" variant="outline"
                  >Books</UiToggleGroupItem
                >
                <UiToggleGroupItem size="sm" value="electronics" variant="outline"
                  >Electronics</UiToggleGroupItem
                >
                <UiToggleGroupItem size="sm" value="clothing" variant="outline"
                  >Clothing</UiToggleGroupItem
                >
              </UiToggleGroup>
            </div>
            <UiGradientDivider />
            <div class="max-w-md space-y-5 px-4">
              <UiLabel for="price">Price Range</UiLabel>
              <UiVeeVueFormSlider id="price" />
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter class="sm:flex-row">
            <UiSheetClose as-child>
              <UiButton variant="outline">Reset</UiButton>
            </UiSheetClose>
            <UiSheetClose as-child>
              <UiButton>Apply Filters</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
```

<!-- /automd -->

::

### Top sheet

::ShowCase

:DocsSheetTop

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheetTop.vue" code lang="vue" -->

```vue [DocsSheetTop.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Top Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        side="top"
        title="Notifications"
        description="Recent notifications and alerts"
      >
        <template #content>
          <UiGradientDivider class="-mt-3" />
          <div class="max-w-3xl space-y-3 p-4">
            <UiAlert
              variant="info"
              icon="lucide:info"
              description="Your subscription will renew in 3 days."
            />
            <UiAlert
              title="Update Available"
              variant="success"
              icon="lucide:circle-check"
              description="A new version is ready to install"
            >
              <template #description>
                <UiAlertDescription class="flex items-center justify-between">
                  Click the update button to get the latest features and improvements.
                  <UiButton variant="ghost" size="xs" class="border border-green-500"
                    >Update Now</UiButton
                  >
                </UiAlertDescription>
              </template>
            </UiAlert>

            <UiAlert
              title="New Message"
              variant="default"
              icon="lucide:mail"
              description="You have a new message from admin"
            />
          </div>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
```

<!-- /automd -->

::

### No blur overlay

::ShowCase

:DocsSheetNoBlur

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheetNoBlur.vue" code lang="vue" -->

```vue [DocsSheetNoBlur.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Without Blur</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        side="right"
        :is-blurred="false"
        title="Clear Overlay"
        description="This sheet has no blur effect on the overlay"
      >
        <template #content>
          <UiGradientDivider class="-my-2" />
          <div class="space-y-4 p-4">
            <p class="text-sm text-muted-foreground">
              Notice how the background content is clearly visible without any blur effect. This can
              be useful for maintaining full context visibility.
            </p>
            <div class="rounded-lg border border-border bg-muted/50 p-3">
              <p class="text-sm font-medium">Background Content Visible</p>
              <p class="text-xs text-muted-foreground">
                You can see the page clearly behind this sheet
              </p>
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter>
            <UiSheetClose as-child>
              <UiButton>Close</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
```

<!-- /automd -->

::

### Floating variant

::ShowCase

:DocsSheetFloating

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheetFloating.vue" code lang="vue" -->

```vue [DocsSheetFloating.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Floating Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        side="right"
        variant="floating"
        title="Floating Sheet"
        description="This sheet floats off the edge with spacing around it"
      >
        <template #content>
          <UiGradientDivider class="-my-2" />
          <div class="space-y-4 p-4">
            <p class="text-sm text-muted-foreground">
              The floating variant adds visual separation from the viewport edges, creating a more
              modern and less intrusive appearance.
            </p>
            <div class="space-y-2">
              <UiLabel for="email">Email</UiLabel>
              <UiInput id="email" type="email" placeholder="Enter your email" />
            </div>
            <div class="space-y-2">
              <UiLabel for="message">Message</UiLabel>
              <UiTextarea id="message" placeholder="Type your message..." :rows="4" />
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter>
            <UiSheetClose as-child>
              <UiButton variant="outline">Cancel</UiButton>
            </UiSheetClose>
            <UiSheetClose as-child>
              <UiButton>Send</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
```

<!-- /automd -->

::

### Interactive playground

::ShowCase

:DocsSheetInteractive

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheetInteractive.vue" code lang="vue" -->

```vue [DocsSheetInteractive.vue]
<template>
  <div>
    <UiCard
      class="mx-auto max-w-md"
      title="Configure Sheet"
      description="Use the controls below to customize the sheet's behavior."
    >
      <template #content>
        <UiCardContent class="grid gap-4">
          <UiVeeSelect v-model="variant" label="Variant">
            <option value="" disabled>Select a variant</option>
            <option v-for="option in variantOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </UiVeeSelect>
          <UiVeeSelect v-model="side" label="Side">
            <option value="" disabled>Select a side</option>
            <option v-for="option in sideOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </UiVeeSelect>

          <div>
            <UiLabel for="blur-switch" class="mb-2 block">Blur Background</UiLabel>
            <UiSwitch id="blur-switch" v-model="isBlurred" />
          </div>
        </UiCardContent>
      </template>
    </UiCard>

    <div class="mt-6 flex w-full justify-center">
      <UiSheet>
        <UiSheetTrigger as-child>
          <UiButton variant="outline">Open Interactive Sheet</UiButton>
        </UiSheetTrigger>

        <UiSheetContent
          :side="side"
          :variant="variant"
          :is-blurred="isBlurred"
          title="Interactive Sheet"
          description="Configure the sheet using the controls above"
        >
          <template #content>
            <UiGradientDivider class="-my-2" />
            <div class="space-y-4 p-4">
              <div class="rounded-lg border border-border bg-muted/30 p-3">
                <h4 class="mb-2 text-sm font-medium">Current Settings</h4>
                <ul class="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <span class="font-medium">Variant:</span>
                    {{ variantOptions.find((opt) => opt.value === variant)?.label || "Default" }}
                  </li>
                  <li>
                    <span class="font-medium">Side:</span>
                    {{ sideOptions.find((opt) => opt.value === side)?.label || "Right" }}
                  </li>
                  <li>
                    <span class="font-medium">Blur:</span>
                    {{ isBlurred ? "Yes" : "No" }}
                  </li>
                </ul>
              </div>
              <p class="text-sm text-muted-foreground">
                Try changing the controls above and reopening the sheet to see the different
                configurations in action.
              </p>
            </div>
          </template>
          <template #footer>
            <UiSheetFooter>
              <UiSheetClose as-child>
                <UiButton>Close</UiButton>
              </UiSheetClose>
            </UiSheetFooter>
          </template>
        </UiSheetContent>
      </UiSheet>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const variant = ref<"default" | "floating">("floating");
  const side = ref<"left" | "right" | "top" | "bottom">("right");
  const isBlurred = ref(true);

  const variantOptions = [
    { label: "Default", value: "default" },
    { label: "Floating", value: "floating" },
  ];

  const sideOptions = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
  ];
</script>
```

<!-- /automd -->

::

### Fullscreen control

::ShowCase

:DocsSheetFullscreen

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheetFullscreen.vue" code lang="vue" -->

```vue [DocsSheetFullscreen.vue]
<template>
  <div class="space-y-4">
    <UiCard
      class="mx-auto max-w-md"
      title="Configure Sheet"
      description="Use the controls below to customize the sheet's behavior."
    >
      <template #content>
        <UiCardContent class="grid gap-4">
          <UiVeeSelect v-model="variant" label="Variant">
            <option value="" disabled>Select a variant</option>
            <option v-for="option in variantOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </UiVeeSelect>
          <UiVeeSelect v-model="side" label="Side">
            <option value="" disabled>Select a side</option>
            <option v-for="option in sideOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </UiVeeSelect>

          <div>
            <UiLabel for="blur-switch" class="mb-2 block">Blur Background</UiLabel>
            <UiSwitch id="blur-switch" v-model="isBlurred" />
          </div>

          <div>
            <UiLabel for="fullscreen-switch" class="mb-2 block">Fullscreen Background</UiLabel>
            <UiSwitch id="fullscreen-switch" v-model="fullscreen" />
          </div>
        </UiCardContent>
      </template>
    </UiCard>

    <div class="flex w-full justify-center gap-3">
      <UiSheet>
        <UiSheetTrigger as-child>
          <UiButton>Open Sheet</UiButton>
        </UiSheetTrigger>

        <UiSheetContent
          :side="side"
          :variant="variant"
          :is-blurred="isBlurred"
          :fullscreen="fullscreen"
          title="Fullscreen Sheet"
          :description="
            variant === 'floating'
              ? 'Floating fullscreen adds margin around edges'
              : 'Default fullscreen sits flush to the viewport'
          "
        >
          <template #content>
            <div class="space-y-4 p-4">
              <p class="text-sm text-muted-foreground">
                Toggle fullscreen to make the sheet occupy the screen. Choose the floating variant
                to keep a margin around the edges when fullscreen is on.
              </p>
              <div class="rounded-lg border border-border bg-muted/40 p-3 text-sm">
                <div class="font-medium">Current settings</div>
                <ul class="space-y-1 text-muted-foreground">
                  <li>Variant: {{ variant }}</li>
                  <li>Side: {{ side }}</li>
                  <li>Blur: {{ isBlurred ? "Yes" : "No" }}</li>
                  <li>Fullscreen: {{ fullscreen ? "Yes" : "No" }}</li>
                </ul>
              </div>
            </div>
          </template>
          <template #footer>
            <UiSheetFooter>
              <UiSheetClose as-child>
                <UiButton>Close</UiButton>
              </UiSheetClose>
            </UiSheetFooter>
          </template>
        </UiSheetContent>
      </UiSheet>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const fullscreen = ref(true);
  const variant = ref<"default" | "floating">("default");
  const side = ref<"left" | "right" | "top" | "bottom">("left");
  const isBlurred = ref(true);

  const variantOptions = [
    { label: "Default", value: "default" },
    { label: "Floating", value: "floating" },
  ];

  const sideOptions = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
  ];
</script>
```

<!-- /automd -->

::
