<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton variant="secondary"> Save </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[475px]">
      <UiDialogHeader>
        <UiDialogTitle>Save preset</UiDialogTitle>
        <UiDialogDescription>
          This will save the current playground state as a preset which you can access later or
          share with others.
        </UiDialogDescription>
      </UiDialogHeader>
      <div class="grid gap-4 py-4">
        <UiVeeInput name="name" label="Name" />
        <UiVeeInput name="description" label="Description" />
      </div>
      <UiDialogFooter>
        <UiButton type="submit"> Save </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
