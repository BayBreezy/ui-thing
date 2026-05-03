<template>
  <div>
    <!-- Greeting top section -->
    <div class="mb-10 flex items-start justify-between gap-8 lg:items-center">
      <div class="flex flex-col">
        <h1 class="text-lg font-bold tracking-tight lg:text-2xl">Welcome back!</h1>
        <p class="text-muted-foreground text-sm lg:text-base">
          Below is a list of your most recent tasks
        </p>
      </div>
      <!-- User dropdown menu -->
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" class="ring-muted/50 relative size-9 rounded-full ring-1">
            <UiAvatar class=" ">
              <UiAvatarImage src="https://behonbaker.com/icon.png" alt="Behon Baker" />
              <UiAvatarFallback>BB</UiAvatarFallback>
            </UiAvatar>
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent class="w-52" align="end">
          <UiDropdownMenuLabel class="flex font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm leading-none font-medium">Behon Baker</p>
              <p class="text-muted-foreground text-xs leading-none">behon.baker.com</p>
            </div>
          </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuItem title="Profile" shortcut="⇧⌘P" />
            <UiDropdownMenuItem title="Billing" shortcut="⌘B" />
            <UiDropdownMenuItem title="Settings" shortcut="⌘S" />
            <UiDropdownMenuItem title="New Team" />
          </UiDropdownMenuGroup>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem title="Help" shortcut="?" />
          <UiDropdownMenuItem title="Keyboard Shortcuts" shortcut="⇧?" />
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem title="Log out" shortcut="⇧⌘Q" variant="destructive" />
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>

    <!-- Table -->
    <HomeTasksDataTable :data="localTasks" />
  </div>
</template>

<script lang="ts">
  // Importing the tasks data from a JSON file
  import tasks from "~/assets/json/home-tasks.json";
</script>

<script lang="ts" setup>
  // create local data for tasks
  const localTasks = ref<HomeTask[]>(tasks as unknown as HomeTask[]);
</script>
