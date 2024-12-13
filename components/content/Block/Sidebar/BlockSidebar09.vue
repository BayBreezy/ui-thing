<template>
  <UiSidebarProvider v-slot="{ isMobile, setOpen }" class="[--sidebar-width:350px_!important]">
    <!-- App Sidebar -->
    <UiSidebar collapsible="icon" class="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row">
      <!-- This is the first sidebar  -->
      <!-- We disable collapsible and adjust width to icon.  -->
      <!-- This will make the sidebar appear as icons.  -->
      <UiSidebar collapsible="none" class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r">
        <UiSidebarHeader>
          <UiSidebarMenu>
            <UiSidebarMenuItem>
              <UiSidebarMenuButton size="lg" as-child class="md:h-8 md:p-0">
                <NuxtLink href="#">
                  <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <Icon mode="svg" name="lucide:command" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Acme Inc</span>
                    <span class="truncate text-xs">Enterprise</span>
                  </div>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarHeader>
        <UiSidebarContent>
          <UiSidebarGroup>
            <UiSidebarGroupContent class="px-1.5 md:px-0">
              <UiSidebarMenu>
                <UiSidebarMenuItem v-for="item in data.navMain" :key="item.title">
                  <UiSidebarMenuButton
                    :tooltip="item.title"
                    :is-active="activeItem.title === item.title"
                    class="px-2.5 md:px-2"
                    @click="
                      () => {
                        activeItem = item;
                        const mail = data.mails.sort(() => Math.random() - 0.5);

                        mails = mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1));
                        setOpen(true);
                      }
                    "
                  >
                    <Icon mode="svg" :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </UiSidebarMenuButton>
                </UiSidebarMenuItem>
              </UiSidebarMenu>
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        </UiSidebarContent>
        <!-- minibar footer -->

        <UiSidebarFooter>
          <UiSidebarMenu>
            <UiSidebarMenuItem>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiSidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
                  >
                    <UiAvatar class="h-8 w-8 rounded-lg">
                      <UiAvatarImage :src="data.user.avatar" :alt="data.user.name" />
                      <UiAvatarFallback class="rounded-lg">BB</UiAvatarFallback>
                    </UiAvatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ data.user.name }}</span>
                      <span class="truncate text-xs">{{ data.user.email }}</span>
                    </div>
                    <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                  </UiSidebarMenuButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent
                  class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  :side="isMobile ? 'bottom' : 'right'"
                  :side-offset="4"
                  align="end"
                >
                  <UiDropdownMenuLabel class="p-0 font-normal">
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <UiAvatar class="size-8 rounded-lg">
                        <UiAvatarImage :src="data.user.avatar" :alt="data.user.name" />
                        <UiAvatarFallback class="rounded-lg">BB</UiAvatarFallback>
                      </UiAvatar>
                      <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-semibold">{{ data.user.name }}</span>
                        <span class="truncate text-xs">{{ data.user.email }}</span>
                      </div>
                    </div>
                  </UiDropdownMenuLabel>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuGroup>
                    <UiDropdownMenuItem icon="lucide:sparkles" title="Upgrade to Pro" />
                  </UiDropdownMenuGroup>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuGroup>
                    <UiDropdownMenuItem icon="lucide:badge-check" title="Account" />
                    <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
                    <UiDropdownMenuItem icon="lucide:settings-2" title="Settings" />
                    <UiDropdownMenuItem icon="lucide:bell" title="Notifications" />
                  </UiDropdownMenuGroup>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem icon="lucide:log-out" title="Log out" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarFooter>
      </UiSidebar>
      <!-- This is the second sidebar  -->
      <!-- We disable collapsible and let it fill remaining space  -->
      <UiSidebar collapsible="none" class="hidden flex-1 md:flex">
        <UiSidebarHeader class="gap-3.5 border-b p-4">
          <div class="flex w-full items-center justify-between">
            <div class="text-base font-medium text-foreground">
              {{ activeItem.title }}
            </div>
            <UiLabel class="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <UiSwitch class="shadow-none" />
            </UiLabel>
          </div>
          <UiSidebarInput placeholder="Type to search..." />
        </UiSidebarHeader>
        <UiSidebarContent>
          <UiSidebarGroup class="px-0">
            <UiSidebarGroupContent>
              <NuxtLink
                v-for="mail in mails"
                :key="mail.email"
                href="#"
                class="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div class="flex w-full items-center gap-2">
                  <span>{{ mail.name }}</span>
                  <span class="ml-auto text-xs">{{ mail.date }}</span>
                </div>
                <span class="font-medium">{{ mail.subject }}</span>
                <span class="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                  {{ mail.teaser }}
                </span>
              </NuxtLink>
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        </UiSidebarContent>
      </UiSidebar>
    </UiSidebar>
    <!-- Sidebar main content -->
    <UiSidebarInset>
      <!-- Navbar -->
      <UiNavbar sticky class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <UiBreadcrumbs :items="breadcrumbItems" />
      </UiNavbar>
      <div class="grid auto-rows-min gap-4 p-4 md:grid-cols-3">
        <UiPlaceholder v-for="n in 30" :key="n" class="aspect-video rounded-lg" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  // Breadcrumb items
  const breadcrumbItems = [
    { label: "All Inboxes", link: "#" },
    { label: "Inbox", link: "#" },
  ];
  // This is sample data.
  const data = {
    user: {
      name: "breezy",
      email: "m@example.com",
      avatar: "https://behonbaker.com/icon.png",
    },
    navMain: [
      {
        title: "Inbox",
        url: "#",
        icon: "lucide:inbox",
        isActive: true,
      },
      {
        title: "Drafts",
        url: "#",
        icon: "lucide:file",
        isActive: false,
      },
      {
        title: "Sent",
        url: "#",
        icon: "lucide:send",
        isActive: false,
      },
      {
        title: "Junk",
        url: "#",
        icon: "lucide:archive-x",
        isActive: false,
      },
      {
        title: "Trash",
        url: "#",
        icon: "lucide:trash-2",
        isActive: false,
      },
    ],
    mails: [
      {
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        date: "09:34 AM",
        teaser:
          "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
      },
      {
        name: "Alice Smith",
        email: "alicesmith@example.com",
        subject: "Re: Project Update",
        date: "Yesterday",
        teaser:
          "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
      },
      {
        name: "Bob Johnson",
        email: "bobjohnson@example.com",
        subject: "Weekend Plans",
        date: "2 days ago",
        teaser:
          "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
      },
      {
        name: "Emily Davis",
        email: "emilydavis@example.com",
        subject: "Re: Question about Budget",
        date: "2 days ago",
        teaser:
          "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
      },
      {
        name: "Michael Wilson",
        email: "michaelwilson@example.com",
        subject: "Important Announcement",
        date: "1 week ago",
        teaser:
          "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
      },
      {
        name: "Sarah Brown",
        email: "sarahbrown@example.com",
        subject: "Re: Feedback on Proposal",
        date: "1 week ago",
        teaser:
          "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
      },
      {
        name: "David Lee",
        email: "davidlee@example.com",
        subject: "New Project Idea",
        date: "1 week ago",
        teaser:
          "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
      },
      {
        name: "Olivia Wilson",
        email: "oliviawilson@example.com",
        subject: "Vacation Plans",
        date: "1 week ago",
        teaser:
          "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
      },
      {
        name: "James Martin",
        email: "jamesmartin@example.com",
        subject: "Re: Conference Registration",
        date: "1 week ago",
        teaser:
          "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
      },
      {
        name: "Sophia White",
        email: "sophiawhite@example.com",
        subject: "Team Dinner",
        date: "1 week ago",
        teaser:
          "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
      },
    ],
  };
  const activeItem = ref(data.navMain[0]);
  const mails = ref(data.mails);
  useSeoMeta({ title: "An inset sidebar with secondary navigation." });
</script>
