<template>
  <UiCard description="Manage your cookie settings here.">
    <template #title>
      <UiCardTitle class="text-xl">Cookie Settings</UiCardTitle>
    </template>
    <template #content>
      <UiCardContent class="grid gap-6">
        <div class="flex justify-between space-x-2">
          <UiLabel for="necessary" class="flex flex-col space-y-1">
            <span>Strictly Necessary</span>
            <span class="font-normal leading-snug text-muted-foreground">
              These cookies are essential in order to use the website and use its features.
            </span>
          </UiLabel>
          <UiSwitch id="necessary" checked />
        </div>
        <div class="flex justify-between space-x-2">
          <UiLabel for="functional" class="flex flex-col space-y-1">
            <span>Functional Cookies</span>
            <span class="font-normal leading-snug text-muted-foreground">
              These cookies allow the website to provide personalized functionality.
            </span>
          </UiLabel>
          <UiSwitch id="functional" />
        </div>
        <div class="flex justify-between space-x-2">
          <UiLabel for="performance" class="flex flex-col space-y-1">
            <span>Performance Cookies</span>
            <span class="font-normal leading-snug text-muted-foreground">
              These cookies help to improve the performance of the website.
            </span>
          </UiLabel>
          <UiSwitch id="performance" />
        </div>
      </UiCardContent>
    </template>
    <template #footer>
      <UiCardFooter class="justify-between">
        <UiButton variant="outline" class="w-full">Save preferences</UiButton>
      </UiCardFooter>
    </template>
  </UiCard>
</template>
