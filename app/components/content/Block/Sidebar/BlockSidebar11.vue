<template>
  <UiSidebarProvider>
    <!-- Main sidebar -->
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Changes" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="(change, index) in data.changes" :key="index">
                <UiSidebarMenuButton>
                  <Icon mode="svg" name="lucide:file" />
                  {{ change.file }}
                </UiSidebarMenuButton>
                <UiSidebarMenuBadge>{{ change.state }}</UiSidebarMenuBadge>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Files" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <TreeComp v-for="(file, index) in data.tree" :key="index" :item="file" />
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
      <UiSidebarRail />
    </UiSidebar>
    <UiSidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiDivider orientation="vertical" class="mr-2 h-4 w-px" />
        <UiBreadcrumbs :items="breadcrumbItems" />
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <UiPlaceholder class="aspect-video rounded-xl" />
          <UiPlaceholder class="aspect-video rounded-xl" />
          <UiPlaceholder class="aspect-video rounded-xl" />
        </div>
        <UiPlaceholder class="min-h-screen flex-1 rounded-xl md:min-h-min" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  import {
    Icon,
    UiCollapsible,
    UiCollapsibleContent,
    UiCollapsibleTrigger,
    UiSidebarMenuButton,
    UiSidebarMenuItem,
    UiSidebarMenuSub,
  } from "#components";

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

  const TreeComp = defineComponent({
    props: {
      item: {
        type: [String, Array] as PropType<string | any[]>,
        required: true,
      },
    },
    computed: {
      itemData() {
        const [name, ...items] = Array.isArray(this.item) ? this.item : [this.item];
        return { name, items };
      },
    },
    render() {
      const { name, items } = this.itemData;
      if (!items.length) {
        return h(
          UiSidebarMenuButton,
          {
            class: "data-[active=true]:bg-transparent",
          },
          () => [h(Icon, { mode: "svg", name: "lucide:file" }), name]
        );
      }

      return h(
        UiSidebarMenuItem,
        {},
        {
          default: () =>
            h(
              UiCollapsible,
              {
                class: "group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90",
                defaultOpen: name === "components" || name === "ui",
              },
              {
                default: () => [
                  h(UiCollapsibleTrigger, { asChild: true }, () =>
                    h(UiSidebarMenuButton, () => [
                      h(Icon, {
                        mode: "svg",
                        name: "lucide:chevron-right",
                      }),
                      h(Icon, { mode: "svg", name: "lucide:folder" }),
                      name,
                    ])
                  ),
                  h(UiCollapsibleContent, () =>
                    h(
                      UiSidebarMenuSub,
                      {},
                      {
                        default: () =>
                          items.map((child, index) =>
                            h(TreeComp, {
                              key: index,
                              item: child,
                            })
                          ),
                      }
                    )
                  ),
                ],
              }
            ),
        }
      );
    },
  });
</script>
