<template>
  <div>
    <Heading
      title="Tabs"
      subtext="A set of layered sections of content—known as tab panels—that are displayed one at a time."
      radix-link="https://www.radix-vue.com/components/tabs.html"
    />

    <UITabs class="w-[400px]" default-value="account">
      <UITabsList class="grid w-full grid-cols-2">
        <UITabsTrigger value="account">Account</UITabsTrigger>
        <UITabsTrigger value="password">Password</UITabsTrigger>
      </UITabsList>
      <UITabsContent value="account">
        <UICard
          title="Account"
          description="Make changes to your account here. Click save when you're done."
        >
          <template #content>
            <UICardContent class="space-y-2">
              <div class="space-y-1">
                <UILabel for="name">Name</UILabel>
                <UIInput id="name" value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <UILabel htmlFor="username">Username</UILabel>
                <UIInput id="username" value="@peduarte" />
              </div>
            </UICardContent>
          </template>
          <template #footer>
            <UICardFooter>
              <UIButton>Save changes</UIButton>
            </UICardFooter>
          </template>
        </UICard>
      </UITabsContent>
      <UITabsContent value="password">
        <UICard
          title="Password"
          description="Change your password here. After saving, you'll be logged out."
        >
          <template #content>
            <UICardContent class="space-y-2">
              <div class="space-y-1">
                <UILabel htmlFor="current">Current password</UILabel>
                <UIInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UILabel htmlFor="new">New password</UILabel>
                <UIInput id="new" type="password" />
              </div>
            </UICardContent>
          </template>
          <template #footer>
            <UICardFooter>
              <UIButton>Save password</UIButton>
            </UICardFooter>
          </template>
        </UICard>
      </UITabsContent>
    </UITabs>
  </div>
</template>

<script lang="ts" setup></script>
