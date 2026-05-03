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
                  <p class="text-muted-foreground text-sm">
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
                  <p class="text-muted-foreground text-sm">
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
                  <p class="text-muted-foreground text-sm">
                    Get a weekly summary of mentions, replies, and pending tasks.
                  </p>
                </div>
              </template>
              <template #hint />
            </UiVeeSwitch>
          </div>
        </UiCardContent>

        <UiCardFooter class="justify-between border-t py-6">
          <p class="text-muted-foreground text-sm">You can update these settings any time.</p>
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
