<template>
  <div
    class="min-h-screen bg-background text-foreground [--color-primary:var(--color-emerald-500)] [--primary:var(--color-emerald-500)] [--radius:12px] [--ring:var(--color-emerald-500)]"
  >
    <!-- Sticky top header -->
    <Motion
      as="header"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="sticky top-0 z-10 border-b border-border/70 bg-background/85 backdrop-blur-md"
    >
      <UiContainer class="flex min-h-[4rem] items-center justify-between gap-4">
        <!-- Logo + nav -->
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2.5">
            <div
              class="flex size-8 items-center justify-center rounded-lg border border-border/70 bg-muted shadow-xs"
            >
              <div
                class="size-4 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.95),rgba(255,255,255,0.2)_32%,transparent_34%),linear-gradient(135deg,var(--color-primary),color-mix(in_oklab,var(--color-primary)_40%,white))]"
              />
            </div>
            <span class="font-semibold tracking-tight">UI Thing</span>
          </div>

          <!-- Mobile nav popover -->
          <UiPopover class="lg:hidden">
            <UiPopoverTrigger as-child>
              <UiButton class="lg:hidden" variant="ghost" size="icon-sm">
                <Icon name="solar:hamburger-menu-line-duotone" class="size-4" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent align="start" class="w-48 p-1">
              <UiButton
                v-for="item in navItems"
                :key="item.label"
                variant="ghost"
                size="sm"
                class="w-full justify-start"
                :class="
                  item.active
                    ? 'bg-muted text-foreground shadow-xs hover:bg-muted'
                    : 'text-muted-foreground'
                "
              >
                {{ item.label }}
              </UiButton>
            </UiPopoverContent>
          </UiPopover>

          <!-- Desktop nav -->
          <nav class="hidden items-center gap-1 lg:flex">
            <UiButton
              v-for="item in navItems"
              :key="item.label"
              variant="ghost"
              size="sm"
              :class="
                item.active
                  ? 'bg-muted text-foreground shadow-xs hover:bg-muted'
                  : 'text-muted-foreground'
              "
            >
              {{ item.label }}
            </UiButton>
          </nav>
        </div>

        <!-- Right: Settings, Notifications, User -->
        <div class="flex items-center gap-1">
          <!-- Settings dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon" class="rounded-full">
                <Icon name="solar:settings-bold-duotone" class="size-5 text-muted-foreground" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-56">
              <UiDropdownMenuLabel>Settings</UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="solar:user-bold-duotone" title="Account settings" />
              <UiDropdownMenuItem icon="solar:pallete-2-bold-duotone" title="Appearance" />
              <UiDropdownMenuItem icon="solar:bell-bold-duotone" title="Notification preferences" />
              <UiDropdownMenuItem icon="solar:shield-bold-duotone" title="Privacy & security" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuCheckboxItem v-model="compactView" title="Compact view" />
              <UiDropdownMenuCheckboxItem v-model="showAvatars" title="Show member avatars" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                icon="solar:keyboard-bold-duotone"
                title="Keyboard shortcuts"
                shortcut="⌘/"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <!-- Notifications dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon" class="rounded-full">
                <Icon name="solar:bell-bold-duotone" class="size-5 text-muted-foreground" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-80">
              <UiDropdownMenuLabel class="flex items-center justify-between">
                <span>Notifications</span>
                <UiBadge variant="secondary" size="sm">4 new</UiBadge>
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                icon="solar:user-plus-bold-duotone"
                title="Phoenix Baker joined your team"
              >
                <template #shortcut>5m ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                icon="solar:file-text-bold-duotone"
                title="New post by Lana Steiner"
              >
                <template #shortcut>1h ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                icon="solar:mailbox-bold-duotone"
                title="Email open rate exceeded 80%"
              >
                <template #shortcut>3h ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                icon="solar:arrow-right-up-bold-duotone"
                title="MRR milestone: $18k reached"
              >
                <template #shortcut>1d ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                icon="solar:verified-check-bold-duotone"
                title="Mark all as read"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <!-- User dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon"
                class="rounded-full"
                :aria-label="`Open user menu for ${currentUser.name}`"
              >
                <UiAvatar
                  :src="currentUser.avatar"
                  :alt="currentUser.name"
                  :fallback="currentUser.fallback"
                  class="size-8 cursor-pointer"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-52">
              <UiDropdownMenuLabel>
                <div class="flex flex-col">
                  <p class="text-sm font-medium">{{ currentUser.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ currentUser.email }}</p>
                </div>
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem icon="solar:user-bold-duotone" title="Profile" />
                <UiDropdownMenuItem icon="solar:settings-bold-duotone" title="Settings" />
                <UiDropdownMenuItem icon="solar:card-2-bold-duotone" title="Billing" />
                <UiDropdownMenuItem
                  icon="solar:users-group-two-rounded-bold-duotone"
                  title="Team"
                />
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                variant="destructive"
                icon="solar:exit-bold-duotone"
                title="Sign out"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </UiContainer>
    </Motion>

    <!-- Secondary sub-nav -->
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.35, delay: 0.1 }"
      class="border-b border-border/70 bg-background"
    >
      <UiContainer>
        <div class="flex items-center justify-between gap-4">
          <div class="scrollbar-none flex overflow-x-auto">
            <button
              v-for="tab in subNavTabs"
              :key="tab"
              class="shrink-0 border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              :class="
                activeTab === tab
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              "
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>
          <div class="hidden w-[300px] shrink-0 py-2 sm:block">
            <UiVeeInput
              name="search"
              icon="solar:magnifer-bold-duotone"
              placeholder="Search..."
              class="h-8"
            />
          </div>
        </div>
      </UiContainer>
    </Motion>

    <!-- Page content -->
    <UiContainer class="py-8">
      <!-- Welcome heading -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.15, ease: 'easeOut' }"
        class="mb-6"
      >
        <h1 class="text-2xl font-semibold tracking-tight">
          Welcome back, {{ currentUser.firstName }}
        </h1>
      </Motion>

      <!-- Time range + filter row -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
        class="mb-8 flex flex-wrap items-center justify-between gap-3"
      >
        <UiTabs v-model="activeRange">
          <UiTabsList class="border border-border/70 bg-muted/30">
            <UiTabsTrigger v-for="range in timeRanges" :key="range.value" :value="range.value">
              <span class="hidden sm:inline">{{ range.label }}</span>
              <span class="sm:hidden">{{ range.short }}</span>
            </UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
        <div class="flex items-center gap-2">
          <UiButton variant="outline">
            <Icon name="solar:calendar-bold-duotone" class="size-5 text-muted-foreground" />
            <span class="hidden sm:inline">Select dates</span>
          </UiButton>
          <UiButton variant="outline">
            <Icon name="solar:tuning-3-bold-duotone" class="size-5 text-muted-foreground" />
            <span class="hidden sm:inline">Filters</span>
          </UiButton>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.25, ease: 'easeOut' }"
        class="mb-8"
      >
        <UiGradientDivider />
      </Motion>

      <!-- Two-column layout: main + right sidebar -->
      <div class="flex flex-col gap-10 lg:flex-row">
        <!-- Main content column -->
        <div class="min-w-0 flex-1 space-y-10">
          <!-- MRR chart -->
          <Motion
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, delay: 0.28, ease: 'easeOut' }"
          >
            <div>
              <p class="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                MRR
              </p>
              <div class="mt-1.5 flex items-center gap-3">
                <span class="text-4xl font-bold tracking-tight">$18,880</span>
                <span
                  class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                >
                  <Icon name="solar:course-up-bold-duotone" class="size-3" />
                  7.4%
                </span>
              </div>
              <div class="mt-4 h-52">
                <UiApexchart
                  type="line"
                  height="100%"
                  :series="mrrChartSeries"
                  :options="mrrChartOptions"
                />
              </div>
            </div>
          </Motion>

          <!-- Member stats — mobile only (3 columns) -->
          <Motion
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, delay: 0.35, ease: 'easeOut' }"
            class="grid grid-cols-3 gap-4 lg:hidden"
          >
            <div v-for="stat in memberStats" :key="stat.label" class="space-y-1">
              <p class="text-xs text-muted-foreground">{{ stat.label }}</p>
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-xl font-bold tracking-tight">{{ stat.value }}</span>
                <span
                  class="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                >
                  <Icon name="solar:course-up-bold-duotone" class="size-2.5" />
                  {{ stat.change }}
                </span>
              </div>
            </div>
          </Motion>

          <!-- Start creating content -->
          <Motion
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, delay: 0.38, ease: 'easeOut' }"
          >
            <div>
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-base font-semibold">Start creating content</h2>
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm">
                      <Icon
                        name="solar:menu-dots-bold-duotone"
                        class="size-5 rotate-90 text-muted-foreground"
                      />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="end" class="w-44">
                    <UiDropdownMenuItem
                      icon="solar:user-plus-bold-duotone"
                      title="Add content type"
                    />
                    <UiDropdownMenuItem icon="solar:tuning-2-bold-duotone" title="Manage content" />
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem icon="solar:eye-closed-bold-duotone" title="Hide section" />
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </div>
              <UiGradientDivider class="mb-6" />
              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  v-for="action in quickActions"
                  :key="action.title"
                  class="flex cursor-pointer items-center gap-4 rounded-xl border border-border/70 bg-card p-4 transition-colors hover:bg-muted/30"
                >
                  <UiFancyIcon class="rounded-lg" theme="light" :icon="action.icon" />
                  <div>
                    <p class="text-sm font-semibold">{{ action.title }}</p>
                    <p class="text-sm text-muted-foreground">{{ action.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Motion>

          <!-- Recent posts -->
          <Motion
            :initial="{ opacity: 0, y: 16 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, ease: 'easeOut' }"
          >
            <div>
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-base font-semibold">Recent posts</h2>
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm">
                      <Icon
                        name="solar:menu-dots-bold-duotone"
                        class="size-5 rotate-90 text-muted-foreground"
                      />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="end" class="w-44">
                    <UiDropdownMenuItem icon="solar:document-add-bold-duotone" title="New post" />
                    <UiDropdownMenuItem
                      icon="solar:documents-bold-duotone"
                      title="View all posts"
                    />
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem icon="solar:eye-closed-bold-duotone" title="Hide section" />
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </div>
              <UiGradientDivider class="mb-6" />
              <div class="grid gap-5 sm:grid-cols-2">
                <div v-for="post in recentPosts" :key="post.id" class="group cursor-pointer">
                  <div class="relative overflow-hidden rounded-xl">
                    <img
                      :src="post.image"
                      :alt="post.title"
                      class="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"
                    />
                    <div class="absolute right-0 bottom-0 left-0 p-3">
                      <div class="flex items-end justify-between">
                        <div>
                          <p class="text-xs font-semibold text-white">{{ post.author }}</p>
                          <p class="text-xs text-white/75">{{ post.date }}</p>
                        </div>
                        <span
                          class="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                        >
                          {{ post.category }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 space-y-1">
                    <h3 class="leading-snug font-semibold">{{ post.title }}</h3>
                    <p class="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {{ post.excerpt }}
                    </p>
                    <span
                      class="mt-1 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Read post
                      <Icon name="solar:arrow-right-up-bold-duotone" class="size-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Motion>

          <!-- Top members — mobile only -->
          <Motion
            :initial="{ opacity: 0, y: 16 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, ease: 'easeOut' }"
            class="lg:hidden"
          >
            <div>
              <h2 class="mb-4 text-base font-semibold">Top members</h2>
              <div class="max-h-80 space-y-3 overflow-y-auto">
                <div
                  v-for="member in topMembers"
                  :key="member.name"
                  class="flex items-center gap-3"
                >
                  <div class="relative shrink-0">
                    <UiAvatar
                      :src="member.avatar"
                      :alt="member.name"
                      :fallback="member.initials"
                      class="size-9"
                    />
                    <span
                      class="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-emerald-500"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium">{{ member.name }}</p>
                    <p class="truncate text-xs text-muted-foreground">{{ member.since }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>

        <!-- Right sidebar — desktop only -->
        <div class="hidden shrink-0 space-y-8 lg:block lg:w-[260px]">
          <!-- Member stats -->
          <Motion
            :variants="statsContainerVariant"
            initial="initial"
            animate="animate"
            class="space-y-6 border-b border-border/70 pb-8"
          >
            <Motion
              v-for="stat in memberStats"
              :key="stat.label"
              :variants="statItemVariant"
              class="space-y-1.5"
            >
              <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
              <div class="flex items-center gap-2">
                <span class="text-3xl font-bold tracking-tight">{{ stat.value }}</span>
                <span
                  class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                >
                  <Icon name="solar:arrow-right-up-bold-duotone" class="size-3" />
                  {{ stat.change }}
                </span>
              </div>
            </Motion>
          </Motion>

          <!-- Top members (scrollable) -->
          <Motion
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, delay: 0.6, ease: 'easeOut' }"
          >
            <div>
              <h3 class="mb-4 text-sm font-semibold">Top members</h3>
              <div class="space-y-4 overflow-y-auto pr-1">
                <div
                  v-for="member in topMembers"
                  :key="member.name"
                  class="flex items-center gap-3"
                >
                  <div class="relative shrink-0">
                    <UiAvatar
                      :src="member.avatar"
                      :alt="member.name"
                      :fallback="member.initials"
                      class="size-9"
                    />
                    <span
                      class="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-emerald-500"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium">{{ member.name }}</p>
                    <p class="truncate text-xs text-muted-foreground">{{ member.since }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import { Motion } from "motion-v";
  import type { ApexOptions } from "apexcharts";
  import type { MotionProps } from "motion-v";

  // Animation variants
  const statsContainerVariant: MotionProps["variants"] = {
    initial: {},
    animate: { transition: { staggerChildren: 0.12, delayChildren: 0.32 } },
  };

  const statItemVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // User data
  const currentUser = {
    name: "Behon Baker",
    firstName: "Behon",
    email: "behon.baker@yahoo.com",
    avatar: "https://behonbaker.com/icon.png",
    fallback: "BB",
  };

  // Navigation
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  const subNavTabs = [
    "Overview",
    "Notifications",
    "Analytics",
    "Saved reports",
    "Scheduled reports",
    "User reports",
  ];
  const activeTab = ref("Overview");

  // Time range filter
  const timeRanges = [
    { label: "12 months", short: "12m", value: "12months" },
    { label: "30 days", short: "30d", value: "30days" },
    { label: "7 days", short: "7d", value: "7days" },
    { label: "24 hours", short: "24h", value: "24hours" },
  ];
  const activeRange = ref("12months");

  // Settings toggles
  const compactView = ref(false);
  const showAvatars = ref(true);

  // Sidebar stats
  const memberStats = [
    { label: "Total members", value: "4,862", change: "9.2%" },
    { label: "Paid members", value: "2,671", change: "6.6%" },
    { label: "Email open rate", value: "82%", change: "8.1%" },
  ];

  // Quick actions
  const quickActions = [
    {
      icon: "solar:user-plus-bold-duotone",
      title: "Create your first member",
      description: "Add yourself or import from CSV",
    },
    {
      icon: "solar:pen-2-bold-duotone",
      title: "Create a new post",
      description: "Dive into the editor and start creating",
    },
  ];

  // Recent posts
  const recentPosts = [
    {
      id: 1,
      title: "Building your API Stack",
      excerpt:
        "The rise of RESTful APIs has been met with a rise in tools for creating, testing, and managing them.",
      author: "Lana Steiner",
      date: "18 Jan 2025",
      category: "Design",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Collaboration = better designer",
      excerpt: "Collaboration can make our teams stronger, and our individual designs better.",
      author: "Natali Craig",
      date: "14 Jan 2025",
      category: "Design",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    },
  ];

  // Top members
  const topMembers = [
    {
      name: "Phoenix Baker",
      since: "Member since Feb 2025",
      avatar: "https://i.pravatar.cc/40?img=1",
      initials: "PB",
    },
    {
      name: "Lana Steiner",
      since: "Member since Jan 2025",
      avatar: "https://i.pravatar.cc/40?img=5",
      initials: "LS",
    },
    {
      name: "Demi Wikinson",
      since: "Member since Mar 2025",
      avatar: "https://i.pravatar.cc/40?img=10",
      initials: "DW",
    },
    {
      name: "Candice Wu",
      since: "Member since Feb 2025",
      avatar: "https://i.pravatar.cc/40?img=20",
      initials: "CW",
    },
    {
      name: "Natali Craig",
      since: "Member since Mar 2025",
      avatar: "https://i.pravatar.cc/40?img=25",
      initials: "NC",
    },
    {
      name: "Orlando Diggs",
      since: "Member since Apr 2025",
      avatar: "https://i.pravatar.cc/40?img=12",
      initials: "OD",
    },
    {
      name: "Drew Cano",
      since: "Member since Apr 2025",
      avatar: "https://i.pravatar.cc/40?img=15",
      initials: "DC",
    },
    {
      name: "Kate Morrison",
      since: "Member since Jan 2025",
      avatar: "https://i.pravatar.cc/40?img=30",
      initials: "KM",
    },
    {
      name: "Koray Okumus",
      since: "Member since Feb 2025",
      avatar: "https://i.pravatar.cc/40?img=33",
      initials: "KO",
    },
    {
      name: "Ava Wright",
      since: "Member since Mar 2025",
      avatar: "https://i.pravatar.cc/40?img=47",
      initials: "AW",
    },
  ];

  // MRR chart
  const mrrChartSeries = ref<ApexOptions["series"]>([
    {
      name: "Current year",
      data: [14200, 15800, 14900, 16200, 15500, 17100, 16800, 17900, 18200, 17600, 18500, 18880],
    },
    {
      name: "Previous year",
      data: [11000, 12200, 11800, 13100, 12700, 13800, 14100, 14600, 15200, 15800, 16400, 17200],
    },
  ]);

  const mrrChartOptions = ref<ApexOptions>({
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0,
    },
    colors: ["var(--color-emerald-500)", "var(--color-purple-300)"],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: [2.5, 2],
      dashArray: [0, 5],
    },
    markers: {
      size: 0,
      hover: { size: 4 },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    grid: {
      borderColor: "color-mix(in oklab, var(--color-border) 60%, transparent)",
      strokeDashArray: 4,
      padding: { left: 4, right: 4, top: 0, bottom: 0 },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
          fontSize: "11px",
          fontFamily: "inherit",
        },
      },
    },
    yaxis: {
      labels: { show: false },
    },
  });
</script>
