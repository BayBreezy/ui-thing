<template>
  <div class="flex w-full justify-center">
    <UiTabs class="w-[400px]" default-value="account">
      <UiTabsList :pill="false" class="relative grid w-full grid-cols-2">
        <UiTabsTrigger :pill="false" value="account">Account</UiTabsTrigger>
        <UiTabsTrigger :pill="false" value="password">Password</UiTabsTrigger>
        <UiTabsIndicator />
      </UiTabsList>
      <UiTabsContent value="account">
        <UiCard
          title="Account"
          description="Make changes to your account here. Click save when you're done."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel for="name">Name</UiLabel>
                <UiInput id="name" model-value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="username">Username</UiLabel>
                <UiInput id="username" model-value="@peduarte" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save changes</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
      <UiTabsContent value="password">
        <UiCard
          title="Password"
          description="Change your password here. After saving, you'll be logged out."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel html-for="current">Current password</UiLabel>
                <UiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="new">New password</UiLabel>
                <UiInput id="new" type="password" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save password</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
