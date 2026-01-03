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
