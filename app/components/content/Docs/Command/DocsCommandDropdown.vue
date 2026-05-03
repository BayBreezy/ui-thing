<template>
  <div class="flex items-center justify-center">
    <div
      class="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center"
    >
      <p class="text-sm leading-none font-medium">
        <span class="bg-primary text-primary-foreground mr-2 rounded-lg px-2 py-1 text-xs">
          {{ labelRef }}
        </span>
        <span class="text-muted-foreground">Create a new project</span>
      </p>
      <UiDropdownMenu v-model:open="open">
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" size="icon-sm">
            <Icon name="lucide:more-horizontal" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="w-[200px]">
          <UiDropdownMenuLabel>Actions</UiDropdownMenuLabel>
          <UiDropdownMenuGroup>
            <UiDropdownMenuItem> Assign to... </UiDropdownMenuItem>
            <UiDropdownMenuItem> Set due date... </UiDropdownMenuItem>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuSub>
              <UiDropdownMenuSubTrigger> Apply label </UiDropdownMenuSubTrigger>
              <UiDropdownMenuSubContent class="p-0">
                <UiCommand v-model="labelRef">
                  <UiCommandInput placeholder="Filter label..." auto-focus />
                  <UiCommandList>
                    <UiCommandEmpty>No label found.</UiCommandEmpty>
                    <UiCommandGroup>
                      <UiCommandItem
                        v-for="label in labels"
                        :key="label"
                        :value="label"
                        @select="
                          (ev) => {
                            labelRef = ev.detail.value as string;
                            open = false;
                          }
                        "
                      >
                        {{ label }}
                      </UiCommandItem>
                    </UiCommandGroup>
                  </UiCommandList>
                </UiCommand>
              </UiDropdownMenuSubContent>
            </UiDropdownMenuSub>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem class="text-red-600">
              Delete
              <UiDropdownMenuShortcut>⌘⌫</UiDropdownMenuShortcut>
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
  const labels = [
    "feature",
    "bug",
    "enhancement",
    "documentation",
    "design",
    "question",
    "maintenance",
  ];

  const labelRef = ref("feature");
  const open = ref(false);
</script>
