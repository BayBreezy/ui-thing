<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="project">
        <UiMenubarTrigger class="cursor-pointer">Project</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarItem title="Settings..." icon="lucide:settings" shortcut="⌘," />
          <UiMenubarItem title="Rename..." icon="lucide:pencil" />
          <UiMenubarItem title="Duplicate" icon="lucide:copy" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Archive Project" icon="lucide:archive" />
          <UiMenubarItem
            title="Delete Project"
            icon="lucide:trash-2"
            variant="destructive"
            shortcut="⌘⌫"
          />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="team">
        <UiMenubarTrigger class="cursor-pointer">Team</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarItem title="Invite Members..." icon="lucide:user-plus" />
          <UiMenubarItem title="Manage Roles" icon="lucide:shield" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Leave Team" icon="lucide:log-out" variant="destructive" />
          <UiMenubarItem
            title="Disband Team"
            icon="lucide:users-x"
            variant="destructive"
            disabled
          />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="account">
        <UiMenubarTrigger class="cursor-pointer">Account</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarItem title="Profile" icon="lucide:user" />
          <UiMenubarItem title="Billing" icon="lucide:credit-card" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Sign Out" icon="lucide:log-out" shortcut="⇧⌘Q" />
          <UiMenubarItem
            title="Delete Account"
            icon="lucide:user-x"
            variant="destructive"
            shortcut="⌫"
          />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
