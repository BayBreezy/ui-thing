---
title: VeeSwitch
description: A switch component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Switch Source
    href: /components/switch
    icon: lucide:toggle-right
---

## Source code

Click :SourceCodeLink{component="Vee/Switch.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-switch"}

## Usage

### Basic example

::ShowCase

:DocsVeeSwitch

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Switch/DocsVeeSwitch.vue" code lang="vue" -->

```vue [DocsVeeSwitch.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeSwitch
        name="productUpdates"
        label="Product updates"
        hint="Receive product announcements and release notes by email."
      />
      <UiButton :loading="isSubmitting" type="submit"> Save preferences </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { boolean, object } from "yup";

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      object({
        productUpdates: boolean().label("Product updates"),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Preferences updated", {
      description: values.productUpdates
        ? "You will receive product updates."
        : "You will not receive product updates.",
    });
  });
</script>
```

<!-- /automd -->

::

### Default value

::ShowCase

:DocsVeeSwitchDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Switch/DocsVeeSwitchDefault.vue" code lang="vue" -->

```vue [DocsVeeSwitchDefault.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md space-y-4">
      <UiVeeSwitch
        v-model="enabled"
        name="notifications"
        label="Push notifications"
        hint="Turn on push notifications for mentions and replies."
      />
      <p class="text-sm text-muted-foreground">
        Notifications are currently
        <span class="font-medium text-foreground">{{ enabled ? "on" : "off" }}</span
        >.
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const enabled = ref(true);
</script>
```

<!-- /automd -->

::

### Settings row

::ShowCase

:DocsVeeSwitchSettings

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Switch/DocsVeeSwitchSettings.vue" code lang="vue" -->

```vue [DocsVeeSwitchSettings.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-lg space-y-4" @submit="onSubmit">
      <div class="rounded-xl border bg-card p-5 shadow-sm">
        <UiVeeSwitch
          name="airplaneMode"
          label="Airplane mode"
          hint="Disable wireless connections while still allowing access to offline content."
          class="justify-between"
        >
          <template #label="{ errorMessage }">
            <div class="grid gap-1 pr-4">
              <UiLabel :class="[errorMessage && 'text-destructive']">Airplane mode</UiLabel>
              <p class="text-sm text-muted-foreground">
                Disable wireless connections while still allowing access to offline content.
              </p>
            </div>
          </template>
          <template #hint />
        </UiVeeSwitch>
      </div>
      <UiButton type="submit">Update settings</UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object } from "yup";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({
        airplaneMode: boolean().label("Airplane mode"),
      })
    ),
    initialValues: {
      airplaneMode: true,
    },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Settings saved", {
      description: `Airplane mode is ${values.airplaneMode ? "on" : "off"}.`,
    });
  });
</script>
```

<!-- /automd -->

::

### Preferences card

::ShowCase

:DocsVeeSwitchPreferencesCard

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Switch/DocsVeeSwitchPreferencesCard.vue" code lang="vue" -->

```vue [DocsVeeSwitchPreferencesCard.vue]
<template>
  <div class="flex justify-center">
    <form class="w-full max-w-xl" @submit="onSubmit">
      <UiCard class="gap-0 overflow-hidden py-0">
        <UiCardHeader class="border-b py-6">
          <UiCardTitle>Notification preferences</UiCardTitle>
          <UiCardDescription>
            Choose which updates you want to receive from your account.
          </UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="px-0">
          <div class="border-b px-6 py-4">
            <UiVeeSwitch id="securityAlerts" name="securityAlerts">
              <template #label="{ errorMessage }">
                <div class="grid gap-1 pr-4">
                  <UiLabel for="securityAlerts" :class="[errorMessage && 'text-destructive']"
                    >Security alerts</UiLabel
                  >
                  <p class="text-sm text-muted-foreground">
                    Get notified about new sign-ins and unusual activity.
                  </p>
                </div>
              </template>
              <template #hint />
            </UiVeeSwitch>
          </div>

          <div class="border-b px-6 py-4">
            <UiVeeSwitch id="sproductUpdates" name="sproductUpdates">
              <template #label="{ errorMessage }">
                <div class="grid gap-1 pr-4">
                  <UiLabel for="sproductUpdates" :class="[errorMessage && 'text-destructive']"
                    >Product updates</UiLabel
                  >
                  <p class="text-sm text-muted-foreground">
                    Receive feature launches, changelogs, and release notes.
                  </p>
                </div>
              </template>
              <template #hint />
            </UiVeeSwitch>
          </div>

          <div class="px-6 py-4">
            <UiVeeSwitch id="weeklyDigest" name="weeklyDigest">
              <template #label="{ errorMessage }">
                <div class="grid gap-1 pr-4">
                  <UiLabel for="weeklyDigest" :class="[errorMessage && 'text-destructive']"
                    >Weekly digest</UiLabel
                  >
                  <p class="text-sm text-muted-foreground">
                    Get a weekly summary of mentions, replies, and pending tasks.
                  </p>
                </div>
              </template>
              <template #hint />
            </UiVeeSwitch>
          </div>
        </UiCardContent>

        <UiCardFooter class="justify-between border-t py-6">
          <p class="text-sm text-muted-foreground">You can update these settings any time.</p>
          <UiButton type="submit">Save changes</UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object } from "yup";

  const { handleSubmit } = useForm({
    name: "notificationPreferences",
    validationSchema: toTypedSchema(
      object({
        securityAlerts: boolean().label("Security alerts"),
        sproductUpdates: boolean().label("Product updates"),
        weeklyDigest: boolean().label("Weekly digest"),
      })
    ),
    initialValues: {
      securityAlerts: true,
      sproductUpdates: false,
      weeklyDigest: true,
    },
  });

  const onSubmit = handleSubmit((values) => {
    const enabledPreferences = [
      values.securityAlerts && "Security alerts",
      values.sproductUpdates && "Product updates",
      values.weeklyDigest && "Weekly digest",
    ].filter(Boolean);

    useSonner.success("Preferences saved", {
      description: enabledPreferences.length
        ? `Enabled: ${enabledPreferences.join(", ")}`
        : "All notification preferences are turned off.",
    });
  });
</script>
```

<!-- /automd -->

::
