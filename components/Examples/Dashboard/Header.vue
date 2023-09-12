<template>
  <header class="border-b">
    <div class="flex h-16 items-center px-4">
      <UIButton variant="outline" class="w-[200px] justify-between">
        <UIAvatar class="mr-2 h-5 w-5" src="https://avatar.vercel.sh/mary" />
        Mary Davis
        <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </UIButton>

      <nav class="mx-6 flex items-center space-x-4 lg:space-x-6">
        <NuxtLink to="#" class="text-sm font-medium transition-colors hover:text-primary"
          >Overview</NuxtLink
        >
        <NuxtLink
          to="#"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >Customers</NuxtLink
        >
        <NuxtLink
          to="#"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >Products</NuxtLink
        >
        <NuxtLink
          to="#"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >Settings</NuxtLink
        >
      </nav>

      <div class="ml-auto flex items-center space-x-4">
        <UIInput type="search" placeholder="Search..." class="md:w-[100px] lg:w-[300px]" />
        <UIDropdownMenu>
          <UIDropdownMenuTrigger asChild>
            <UIButton variant="ghost" class="relative h-8 w-8 rounded-full">
              <UIAvatar
                class="h-8 w-8"
                src="https://avatar.vercel.sh/shadcn"
                alt="@shadcn"
                fallback="SC"
              />
            </UIButton>
          </UIDropdownMenuTrigger>
          <UIDropdownMenuContent class="w-56" align="end">
            <UIDropdownMenuLabel class="font-normal">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">shadcn</p>
                <p class="text-xs leading-none text-muted-foreground">m@example.com</p>
              </div>
            </UIDropdownMenuLabel>
            <UIDropdownMenuSeparator />
            <UIDropdownMenuGroup>
              <UIDropdownMenuItem title="Profile" shortcut="⇧⌘P" />
              <UIDropdownMenuItem title="Billing" shortcut="⌘B" />
              <UIDropdownMenuItem title="Settings" shortcut="⌘S" />
              <UIDropdownMenuItem title="New Team" shortcut="⌘NT" />
            </UIDropdownMenuGroup>
            <UIDropdownMenuSeparator />
            <UIDropdownMenuItem title="Log out" shortcut="⇧⌘Q" />
          </UIDropdownMenuContent>
        </UIDropdownMenu>
      </div>
    </div>
  </header>
</template>
