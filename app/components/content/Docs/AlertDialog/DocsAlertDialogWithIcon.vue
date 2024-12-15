<template>
  <div class="flex justify-center">
    <UiAlertDialog>
      <UiAlertDialogTrigger as-child>
        <UiButton variant="outline">Alert dialog with icon</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent>
        <div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Icon name="lucide:circle-alert" class="size-4 opacity-80" />
          </div>
          <UiAlertDialogHeader>
            <UiAlertDialogTitle>Are you sure?</UiAlertDialogTitle>
            <UiAlertDialogDescription>
              Are you sure you want to delete your account? All your data will be removed.
            </UiAlertDialogDescription>
          </UiAlertDialogHeader>
        </div>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
          <UiAlertDialogAction>Confirm</UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>
