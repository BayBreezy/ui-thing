<template>
  <UiCard title="Cookie settings" description="Manage your cookie settings here.">
    <template #content>
      <UiCardContent class="grid gap-6">
        <div class="flex justify-between space-x-2">
          <UiLabel for="necessary" class="flex flex-col items-start gap-1">
            <span>Strictly Necessary</span>
            <span class="text-muted-foreground leading-snug font-normal">
              These cookies are essential in order to use the website and use its features.
            </span>
          </UiLabel>
          <UiSwitch id="necessary" :default-value="true" />
        </div>
        <div class="flex justify-between space-x-2">
          <UiLabel for="functional" class="flex flex-col items-start gap-1">
            <span>Functional Cookies</span>
            <span class="text-muted-foreground leading-snug font-normal">
              These cookies allow the website to provide personalized functionality.
            </span>
          </UiLabel>
          <UiSwitch id="functional" />
        </div>
        <div class="flex justify-between space-x-2">
          <UiLabel for="performance" class="flex flex-col items-start gap-1">
            <span>Performance Cookies</span>
            <span class="text-muted-foreground leading-snug font-normal">
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
