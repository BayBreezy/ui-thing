<template>
  <UiCard title="Team Members" description="Invite your team members to collaborate.">
    <template #content>
      <UiCardContent class="grid gap-6">
        <div
          v-for="member in teamMembers"
          :key="member.name"
          class="flex items-center justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <UiAvatar class="border">
              <UiAvatarImage :src="member.avatar" :alt="member.name" />
              <UiAvatarFallback>{{ member.name.charAt(0) }}</UiAvatarFallback>
            </UiAvatar>
            <div class="flex flex-col gap-0.5">
              <p class="text-sm leading-none font-medium">
                {{ member.name }}
              </p>
              <p class="text-muted-foreground text-xs">{{ member.email }}</p>
            </div>
          </div>
          <UiPopover>
            <UiPopoverTrigger as-child>
              <UiButton variant="outline" size="sm" class="ml-auto shadow-none">
                {{ member.role }} <Icon name="lucide:chevron-down" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent class="p-0" align="end">
              <UiCommand>
                <UiCommandInput placeholder="Select role..." />
                <UiCommandList>
                  <UiCommandEmpty>No roles found.</UiCommandEmpty>
                  <UiCommandGroup>
                    <UiCommandItem v-for="role in roles" :key="role.name" :value="role.name">
                      <div class="flex flex-col">
                        <p class="text-sm font-medium">{{ role.name }}</p>
                        <p class="text-muted-foreground">
                          {{ role.description }}
                        </p>
                      </div>
                    </UiCommandItem>
                  </UiCommandGroup>
                </UiCommandList>
              </UiCommand>
            </UiPopoverContent>
          </UiPopover>
        </div>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  const teamMembers = [
    {
      name: "Sofia Davis",
      email: "m@example.com",
      avatar: "https://randomuser.me/api/portraits/med/women/5.jpg",
      role: "Owner",
    },
    {
      name: "Jackson Lee",
      email: "p@example.com",
      avatar: "https://randomuser.me/api/portraits/med/men/5.jpg",
      role: "Developer",
    },
    {
      name: "Isabella Nguyen",
      email: "i@example.com",
      avatar: "https://randomuser.me/api/portraits/med/women/50.jpg",
      role: "Billing",
    },
  ];

  const roles = [
    {
      name: "Viewer",
      description: "Can view and comment.",
    },
    {
      name: "Developer",
      description: "Can view, comment and edit.",
    },
    {
      name: "Billing",
      description: "Can view, comment and manage billing.",
    },
    {
      name: "Owner",
      description: "Admin-level access to all resources.",
    },
  ];
</script>
