<template>
  <div class="flex items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Translucent menu</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent translucent class="w-56">
        <UiDropdownMenuArrow translucent />
        <UiDropdownMenuLabel label="Workspace" />
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem title="Profile" icon="ph:user" shortcut="⇧⌘P" />
        <UiDropdownMenuItem title="Theme" icon="ph:palette" shortcut="⌘T" />
        <UiDropdownMenuSub>
          <UiDropdownMenuSubTrigger title="Share" icon="ph:share-network" text-value="Share" />
          <UiDropdownMenuSubContent translucent>
            <UiDropdownMenuItem title="Copy link" icon="ph:link" shortcut="⌘C" />
            <UiDropdownMenuItem title="Invite team" icon="ph:users-three" shortcut="⇧⌘I" />
          </UiDropdownMenuSubContent>
        </UiDropdownMenuSub>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem title="Sign out" icon="ph:sign-out" />
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>
