<template>
  <UiSidebarProvider>
    <!-- Main sidebar -->
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Changes" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="(item, index) in data.changes" :key="index">
                <UiSidebarMenuButton>
                  <Icon mode="svg" name="lucide:file" />
                  {{ item.file }}
                </UiSidebarMenuButton>
                <UiSidebarMenuBadge>{{ item.state }}</UiSidebarMenuBadge>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Files" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <!-- This should be a recursive component -->
              <!-- Because this has to be copied as one whole file, you will have to create the other component in a separate .vue file in your codebase -->

              <!-- Inside this template tag is the recursive component -->
              <template v-for="(item, index) in data.tree" :key="index">
                <template v-if="item.length">
                  <UiSidebarMenuButton class="data-[active=true]:bg-transparent">
                    <Icon mode="svg" name="lucide:file" />

                    {{ item[0] }}
                  </UiSidebarMenuButton>
                </template>
                <template v-else>
                  <UiSidebarMenuItem>
                    <UiCollapsible
                      class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                    >
                      <UiCollapsibleTrigger as-child>
                        <UiSidebarMenuButton>
                          <Icon mode="svg" name="lucide:chevron-right" />
                          <Icon mode="svg" name="lucide:folder" />
                          {{ item }}
                        </UiSidebarMenuButton>
                      </UiCollapsibleTrigger>
                      <UiCollapsibleContent>
                        <UiSidebarMenuSub>
                          <!-- This is where you would call back the recursive component and pass the item to it -->
                        </UiSidebarMenuSub>
                      </UiCollapsibleContent>
                    </UiCollapsible>
                  </UiSidebarMenuItem>
                </template>
              </template>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
      <UiSidebarRail />
    </UiSidebar>
    <UiSidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <UiBreadcrumbs :items="breadcrumbItems" />
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <UiPlaceholder class="aspect-video rounded-xl" />
          <UiPlaceholder class="aspect-video rounded-xl" />
          <UiPlaceholder class="aspect-video rounded-xl" />
        </div>
        <UiPlaceholder class="min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const breadcrumbItems = [{ label: "components" }, { label: "ui" }, { label: "button.vue" }];
  useSeoMeta({ title: "A sidebar with a collapsible file tree." });
  const data = {
    changes: [
      { file: "README.md", state: "M" },
      { file: "api/hello/route.ts", state: "U" },
      { file: "app/layout.tsx", state: "M" },
    ],
    tree: [
      ["app", ["api", ["hello", ["route.ts"]], "page.tsx", "layout.tsx", ["blog", ["page.tsx"]]]],
      ["components", ["ui", "button.tsx", "card.tsx"], "header.tsx", "footer.tsx"],
      ["lib", ["util.ts"]],
      ["public", "favicon.ico", "vercel.svg"],
      ".eslintrc.json",
      ".gitignore",
      "next.config.js",
      "tailwind.config.js",
      "package.json",
      "README.md",
    ],
  };
</script>
