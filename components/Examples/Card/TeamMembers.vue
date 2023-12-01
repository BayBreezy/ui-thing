<template>
  <UiCard description="Invite your team members to collaborate.">
    <template #title>
      <UiCardTitle class="text-xl"> Team Members </UiCardTitle>
    </template>
    <template #content>
      <UiCardContent class="grid gap-6">
        <div class="flex items-center justify-between space-x-4">
          <div class="flex items-center space-x-4">
            <UiAvatar src="https://avatar.vercel.sh/mary" />
            <div class="text-sm">
              <p class="font-medium leading-none">Mary Davis</p>
              <p class="text-muted-foreground">m@example.com</p>
            </div>
          </div>
          <UiPopover>
            <UiPopoverTrigger as-child>
              <UiButton variant="outline"
                >Owner <Icon name="heroicons:chevron-down" class="h-4 w-4 text-muted-foreground"
              /></UiButton>
              <UiPopoverContent class="p-1" align="end">
                <ul>
                  <template v-for="(m, i) in memberOptions" :key="i">
                    <PopoverClose class="w-full">
                      <li
                        class="flex w-full cursor-pointer flex-col gap-1 rounded-md px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        <p class="font-medium">{{ m.title }}</p>
                        <p class="text-muted-foreground">{{ m.description }}</p>
                      </li>
                    </PopoverClose>
                  </template>
                </ul>
              </UiPopoverContent>
            </UiPopoverTrigger>
          </UiPopover>
        </div>
        <div class="flex items-center justify-between space-x-4">
          <div class="flex items-center space-x-4">
            <UiAvatar src="https://avatar.vercel.sh/jackson" />
            <div class="text-sm">
              <p class="font-medium leading-none">Jackson Lee</p>
              <p class="text-muted-foreground">j@example.com</p>
            </div>
          </div>
          <UiPopover>
            <UiPopoverTrigger as-child>
              <UiButton variant="outline"
                >Member <Icon name="heroicons:chevron-down" class="h-4 w-4 text-muted-foreground"
              /></UiButton>
              <UiPopoverContent class="p-1" align="end">
                <ul>
                  <template v-for="(m, i) in memberOptions" :key="i">
                    <PopoverClose class="w-full">
                      <li
                        class="flex w-full cursor-pointer flex-col gap-1 rounded-md px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        <p class="font-medium">{{ m.title }}</p>
                        <p class="text-muted-foreground">{{ m.description }}</p>
                      </li>
                    </PopoverClose>
                  </template>
                </ul>
              </UiPopoverContent>
            </UiPopoverTrigger>
          </UiPopover>
        </div>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  const memberOptions = [
    {
      title: "Viewer",
      description: "Can view & comment.",
    },
    {
      title: "Developer",
      description: "Can view, comment & edit.",
    },
    {
      title: "Billing",
      description: "Can view, comment & manage billing.",
    },
    {
      title: "Owner",
      description: "Admin-level access to all resources",
    },
  ];
</script>
