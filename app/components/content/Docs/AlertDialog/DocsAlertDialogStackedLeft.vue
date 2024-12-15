<template>
  <div class="flex justify-center">
    <UiAlertDialog>
      <UiAlertDialogTrigger as-child>
        <UiButton variant="outline">Save Changes</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent class="max-w-[400px]">
        <UiFancyIcon type="light" color="success" circle icon="lucide:check" />
        <UiAlertDialogHeader>
          <UiAlertDialogTitle class="text-left">Save Successfully</UiAlertDialogTitle>
          <UiAlertDialogDescription class="text-left">
            Your changes have been saved successfully. Feel free to continue editing or close this
            dialog.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter class="grid grid-cols-2">
          <UiAlertDialogCancel />
          <UiAlertDialogAction />
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>
