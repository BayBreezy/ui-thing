<template>
  <div class="@container">
    <div class="flex flex-col divide-y">
      <!-- Row -->
      <div class="flex h-32 w-full items-stretch">
        <!-- Left column -->
        <div class="flex flex-1 items-center justify-center border-r">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton
                size="icon"
                variant="ghost"
                class="rounded-full shadow-none"
                aria-label="Open edit menu"
              >
                <Icon name="lucide:ellipsis" class="size-4" aria-hidden="true" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent>
              <UiDropdownMenuItem v-for="item in 4" :key="item" :title="`Option ${item}`" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <!-- Right column -->
        <div class="flex flex-1 items-center justify-center">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Same width of trigger
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <UiDropdownMenuItem v-for="item in 4" :key="item" :title="`Option ${item}`" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <!-- Row -->
      <div class="flex h-32 w-full items-stretch">
        <!-- Left column -->
        <div class="flex flex-1 items-center justify-center border-r">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Menu with icons
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <UiDropdownMenuItem v-for="item in menuWithIcons" :key="item.title">
                <Icon :name="item.icon" class="size-4 opacity-60" aria-hidden="true" />
                {{ item.title }}
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <!-- Right column -->
        <div class="flex flex-1 items-center justify-center">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Grouped items
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <template v-for="(group, index) in groupedItems" :key="`group-${index}`">
                <UiDropdownMenuGroup v-for="(item, i) in group" :key="i">
                  <UiDropdownMenuItem :variant="item.variant ?? 'default'" :title="item.title">
                    <Icon :name="item.icon" class="size-4 opacity-60" aria-hidden="true" />
                    {{ item.title }}
                  </UiDropdownMenuItem>
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator class="last:hidden" />
              </template>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <!-- Row -->
      <div class="flex h-32 w-full items-stretch">
        <!-- Left column -->
        <div class="flex flex-1 items-center justify-center border-r">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Labeled grouped items
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <UiDropdownMenuLabel>Label</UiDropdownMenuLabel>
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem title="Copy" icon="lucide:copy-plus" />
                <UiDropdownMenuItem title="Edit" icon="lucide:bolt" />
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuLabel>Label</UiDropdownMenuLabel>
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem title="Group" icon="lucide:layers-2" />
                <UiDropdownMenuItem title="Clone" icon="lucide:files" />
                <UiDropdownMenuItem variant="destructive" title="Delete" icon="lucide:trash" />
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <!-- Right column -->
        <div class="flex flex-1 items-center justify-center">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton
                size="icon"
                variant="ghost"
                class="rounded-full shadow-none"
                aria-label="Open edit menu"
              >
                <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="pb-2">
              <UiDropdownMenuLabel>Add block</UiDropdownMenuLabel>
              <UiDropdownMenuItem v-for="(block, i) in blocks" :key="i">
                <div
                  class="bg-accent text-accent-foreground flex size-8 items-center justify-center rounded-md border"
                  aria-hidden="true"
                >
                  <Icon :name="block.icon" size="16" />
                </div>
                <div>
                  <div class="text-sm font-medium">{{ block.title }}</div>
                  <div class="text-muted-foreground text-xs">{{ block.description }}</div>
                </div>
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const menuWithIcons = [
    { title: "Copy", icon: "lucide:copy-plus" },
    { title: "Edit", icon: "lucide:bolt" },
    { title: "Group", icon: "lucide:layers-2" },
    { title: "Clone", icon: "lucide:files" },
  ];
  const groupedItems = [
    [
      { title: "Copy", icon: "lucide:copy-plus" },
      { title: "Edit", icon: "lucide:bolt" },
    ],
    [
      { title: "Group", icon: "lucide:layers-2" },
      { title: "Clone", icon: "lucide:files" },
      { title: "Delete", icon: "lucide:trash", variant: "destructive" },
    ],
  ];

  const blocks = [
    { title: "Text", icon: "lucide:type", description: "Start writing with plain text" },
    { title: "Quote", icon: "lucide:text-quote", description: "Capture a quote" },
    { title: "Divider", icon: "lucide:minus", description: "Visually divide blocks" },
    { title: "Heading 1", icon: "lucide:heading-1", description: "Big section heading" },
    { title: "Heading 2", icon: "lucide:heading-2", description: "Medium section subheading" },
  ];
</script>
