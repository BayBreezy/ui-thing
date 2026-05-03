<template>
  <div class="bg-background text-foreground min-h-screen">
    <!-- Invite dialog -->
    <UiDialog v-model:open="inviteOpen" @update:open="onInviteDialogClose">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Invite teammates</UiDialogTitle>
          <UiDialogDescription>
            Add up to 4 email addresses. Invites will be sent immediately.
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="space-y-4 py-1">
          <!-- Email chip input area -->
          <div
            class="border-border/70 bg-muted/20 focus-within:border-primary focus-within:ring-primary min-h-[80px] cursor-text rounded-xl border p-3 transition-colors focus-within:ring-1"
            @click="focusInviteInput"
          >
            <div class="flex flex-wrap gap-2">
              <!-- Email chips -->
              <span
                v-for="email in inviteEmails"
                :key="email"
                class="border-border/70 bg-background text-foreground flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-xs"
              >
                <span
                  class="from-primary to-primary flex size-4 items-center justify-center rounded-full bg-linear-to-br text-[9px] font-bold text-white"
                  >{{ email[0]?.toUpperCase() }}</span
                >
                {{ email }}
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground ml-0.5 rounded-full transition-colors"
                  @click.stop="removeInviteEmail(email)"
                >
                  <Icon name="heroicons:x-mark" class="size-3" />
                </button>
              </span>

              <!-- Input -->
              <input
                v-if="inviteEmails.length < 4"
                ref="inviteInputRef"
                v-model="inviteInputVal"
                type="email"
                placeholder="name@company.com"
                class="text-foreground placeholder:text-muted-foreground min-w-[160px] flex-1 bg-transparent text-sm outline-none"
                @keydown.enter.prevent="addInviteEmail"
                @keydown.tab.prevent="addInviteEmail"
                @keydown.space.prevent="addInviteEmail"
                @keydown.backspace="onInviteBackspace"
                @keydown="
                  (e) => {
                    if (e.key === ',') {
                      e.preventDefault();
                      addInviteEmail();
                    }
                  }
                "
                @paste.prevent="onInvitePaste"
                @blur="addInviteEmail"
              />
            </div>
          </div>

          <!-- Slot counter + validation -->
          <div class="flex items-center justify-between text-xs">
            <p v-if="inviteError" class="text-destructive">{{ inviteError }}</p>
            <p v-else class="text-muted-foreground">
              Press
              <kbd class="border-border/70 bg-muted rounded border px-1 py-0.5 font-mono">Enter</kbd
              >,
              <kbd class="border-border/70 bg-muted rounded border px-1 py-0.5 font-mono">Tab</kbd>,
              or
              <kbd class="border-border/70 bg-muted rounded border px-1 py-0.5 font-mono">,</kbd> to
              add
            </p>
            <p
              class="shrink-0 font-medium tabular-nums"
              :class="
                inviteEmails.length >= 4
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-muted-foreground'
              "
            >
              {{ inviteEmails.length }}/4 added
            </p>
          </div>

          <!-- Suggested teammates -->
          <div v-if="inviteEmails.length < 4" class="space-y-1.5">
            <p class="text-muted-foreground text-xs font-medium">Suggestions</p>
            <div class="space-y-1">
              <button
                v-for="s in inviteSuggestions.filter((s) => !inviteEmails.includes(s.email))"
                :key="s.email"
                type="button"
                class="hover:bg-muted/60 flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors"
                @click="addSuggestedEmail(s.email)"
              >
                <UiAvatar :src="s.avatar" :alt="s.name" :fallback="s.name[0]" class="size-7" />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">{{ s.name }}</p>
                  <p class="text-muted-foreground truncate text-xs">{{ s.email }}</p>
                </div>
                <Icon name="heroicons:plus" class="text-muted-foreground size-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="inviteOpen = false">Cancel</UiButton>
          <UiButton :disabled="inviteEmails.length === 0" class="gap-2" @click="submitInvites">
            <Icon name="heroicons:paper-airplane" class="size-4" />
            Send
            {{
              inviteEmails.length > 0
                ? `${inviteEmails.length} invite${inviteEmails.length > 1 ? "s" : ""}`
                : "invites"
            }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- Generate chart dialog -->
    <UiDialog v-model:open="genChartOpen" @update:open="onGenChartClose">
      <UiDialogContent class="sm:max-w-lg">
        <UiDialogHeader>
          <UiDialogTitle>Generate chart</UiDialogTitle>
          <UiDialogDescription>
            Configure the parameters below and we'll build your chart.
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="space-y-5 py-1">
          <!-- Chart name -->
          <div class="space-y-1.5">
            <label class="text-sm font-medium">Chart name</label>
            <input
              v-model="genChartName"
              type="text"
              placeholder="e.g. Monthly revenue breakdown"
              class="border-border/70 bg-muted/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none focus:ring-1"
            />
          </div>

          <!-- Chart type picker -->
          <div class="space-y-1.5">
            <label id="chart-type-label" class="text-sm font-medium">Chart type</label>
            <UiToggleGroup
              type="single"
              :model-value="genChartType"
              aria-labelledby="chart-type-label"
              class="grid grid-cols-5 gap-2"
              @update:model-value="
                (val) => {
                  if (val) genChartType = val;
                }
              "
            >
              <UiToggleGroupItem
                v-for="ct in genChartTypes"
                :key="ct.value"
                :value="ct.value"
                :aria-label="ct.label"
                class="group border-border/60 bg-muted/30 hover:border-border hover:bg-muted/50 data-[state=on]:bg-card h-auto flex-col gap-1.5 rounded-xl border-2 p-3 data-[state=on]:shadow-sm"
                :style="genChartType === ct.value ? { borderColor: 'var(--color-primary)' } : {}"
              >
                <span
                  class="bg-muted text-muted-foreground group-hover:bg-muted/80 flex size-8 items-center justify-center rounded-lg transition-colors group-data-[state=on]:text-white"
                  :style="
                    genChartType === ct.value ? { backgroundColor: 'var(--color-primary)' } : {}
                  "
                >
                  <Icon :name="ct.icon" class="size-4" />
                </span>
                <span class="text-[11px] leading-none font-medium">{{ ct.label }}</span>
              </UiToggleGroupItem>
            </UiToggleGroup>
          </div>

          <!-- Metric + Date range row -->
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Metric</label>
              <div class="relative">
                <select
                  v-model="genChartMetric"
                  class="border-border/70 bg-muted/20 text-foreground focus:border-primary focus:ring-primary w-full appearance-none rounded-lg border px-3 py-2 pr-8 text-sm transition-colors outline-none focus:ring-1"
                >
                  <option v-for="m in genChartMetrics" :key="m.value" :value="m.value">
                    {{ m.label }}
                  </option>
                </select>
                <Icon
                  name="heroicons:chevron-down"
                  class="text-muted-foreground pointer-events-none absolute top-2.5 right-2.5 size-4"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium">Date range</label>
              <div class="relative">
                <select
                  v-model="genChartRange"
                  class="border-border/70 bg-muted/20 text-foreground focus:border-primary focus:ring-primary w-full appearance-none rounded-lg border px-3 py-2 pr-8 text-sm transition-colors outline-none focus:ring-1"
                >
                  <option v-for="r in genChartRanges" :key="r.value" :value="r.value">
                    {{ r.label }}
                  </option>
                </select>
                <Icon
                  name="heroicons:chevron-down"
                  class="text-muted-foreground pointer-events-none absolute top-2.5 right-2.5 size-4"
                />
              </div>
            </div>
          </div>

          <!-- Compare toggle -->
          <div
            class="border-border/70 bg-muted/20 flex items-center justify-between rounded-lg border px-3 py-2.5"
          >
            <div>
              <p class="text-sm font-medium">Compare to previous period</p>
              <p class="text-muted-foreground text-xs">
                Overlay the prior period as a reference line
              </p>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="genChartCompare"
              class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none"
              :style="{
                backgroundColor: genChartCompare
                  ? 'var(--color-primary)'
                  : 'hsl(var(--muted-foreground) / 0.3)',
              }"
              @click="genChartCompare = !genChartCompare"
            >
              <span
                class="pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-transform"
                :class="genChartCompare ? 'translate-x-4' : 'translate-x-0'"
              />
            </button>
          </div>
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="genChartOpen = false">Cancel</UiButton>
          <UiButton
            :disabled="!genChartName.trim() || !genChartType"
            class="gap-2"
            @click="submitGenChart"
          >
            <Icon name="heroicons:sparkles" class="size-4" />
            Generate chart
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- Export report dialog -->
    <UiDialog v-model:open="exportOpen">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Export report</UiDialogTitle>
          <UiDialogDescription>
            Choose a format. A download link will be sent to your email once ready.
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="grid grid-cols-2 gap-3 py-2">
          <button
            v-for="fmt in exportFormats"
            :key="fmt.value"
            type="button"
            class="group relative flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none"
            :class="
              selectedFormat === fmt.value
                ? 'bg-card shadow-sm'
                : 'border-border/60 bg-muted/30 hover:border-border hover:bg-muted/50'
            "
            :style="selectedFormat === fmt.value ? { borderColor: 'var(--color-primary)' } : {}"
            @click="selectedFormat = fmt.value"
          >
            <!-- Selection indicator -->
            <div
              class="absolute top-3 right-3 flex size-4 items-center justify-center rounded-full border-2 transition-all"
              :style="
                selectedFormat === fmt.value
                  ? { borderColor: 'var(--color-primary)', backgroundColor: 'var(--color-primary)' }
                  : { borderColor: 'hsl(var(--border))' }
              "
            >
              <Icon
                v-if="selectedFormat === fmt.value"
                name="heroicons:check"
                class="size-2.5 text-white"
              />
            </div>

            <!-- Format icon -->
            <div
              class="flex size-9 items-center justify-center rounded-lg transition-colors"
              :class="
                selectedFormat === fmt.value
                  ? 'text-white'
                  : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
              "
              :style="
                selectedFormat === fmt.value ? { backgroundColor: 'var(--color-primary)' } : {}
              "
            >
              <Icon :name="fmt.icon" class="size-5" />
            </div>

            <div>
              <p class="text-sm leading-none font-semibold">{{ fmt.label }}</p>
              <p class="text-muted-foreground mt-1 text-xs">{{ fmt.description }}</p>
            </div>

            <p class="text-muted-foreground/70 text-xs">{{ fmt.size }}</p>
          </button>
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="exportOpen = false">Cancel</UiButton>
          <UiButton :disabled="!selectedFormat" class="gap-2" @click="submitExport">
            <Icon name="heroicons:arrow-down-tray" class="size-4" />
            Export {{ selectedFormat?.toUpperCase() }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- Command search dialog -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search"
      description="Search across your sales data"
    >
      <UiCommandInput placeholder="Search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Quick actions">
          <UiCommandItem value="Export report">
            <Icon name="heroicons:arrow-down-tray" />
            <span>Export report</span>
          </UiCommandItem>
          <UiCommandItem value="Invite team member">
            <Icon name="heroicons:user-plus" />
            <span>Invite team member</span>
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Reports">
          <UiCommandItem value="Sales report">
            <Icon name="heroicons:chart-bar" />
            <span>Sales report</span>
          </UiCommandItem>
          <UiCommandItem value="Store traffic">
            <Icon name="heroicons:arrow-trending-up" />
            <span>Store traffic</span>
          </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
      <div
        class="border-border/70 bg-muted/20 text-muted-foreground flex items-center gap-5 border-t px-4 py-2.5 text-xs"
      >
        <span class="flex items-center gap-1.5"><UiKbd>↵</UiKbd> to select</span>
        <span class="flex items-center gap-1.5"><UiKbd>↑↓</UiKbd> to navigate</span>
        <span class="flex items-center gap-1.5"><UiKbd>ESC</UiKbd> to close</span>
      </div>
    </UiCommandDialog>

    <!-- Sticky header -->
    <Motion
      as="header"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="border-border/70 bg-background/85 sticky top-0 z-10 border-b backdrop-blur-md"
    >
      <UiContainer class="flex min-h-[4rem] items-center justify-between gap-4">
        <!-- Logo + nav -->
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2.5">
            <div
              class="border-border/70 bg-muted flex size-8 items-center justify-center rounded-lg border shadow-xs"
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
              <UiButton variant="ghost" size="icon-sm" class="lg:hidden">
                <Icon name="heroicons:bars-3" class="size-5" />
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
                    ? 'bg-muted text-foreground hover:bg-muted shadow-xs'
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
                  ? 'bg-muted text-foreground hover:bg-muted shadow-xs'
                  : 'text-muted-foreground'
              "
            >
              {{ item.label }}
            </UiButton>
          </nav>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-2">
          <!-- Upgrade now -->
          <UiButton size="sm" class="hidden gap-1.5 sm:flex">
            <Icon name="heroicons:bolt" class="size-4" />
            Upgrade now
          </UiButton>
          <UiButton size="icon-sm" class="sm:hidden">
            <Icon name="heroicons:bolt" class="size-4" />
          </UiButton>

          <div class="flex items-center gap-1">
            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                      <Icon name="heroicons:cog-6-tooth" class="text-muted-foreground size-5" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Settings</p></UiTooltipContent>
                <UiDropdownMenuContent align="end" class="w-52">
                  <UiDropdownMenuLabel>Settings</UiDropdownMenuLabel>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem icon="heroicons:user" title="Account settings" />
                  <UiDropdownMenuItem icon="heroicons:swatch" title="Appearance" />
                  <UiDropdownMenuItem icon="heroicons:bell" title="Notifications" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    variant="destructive"
                    icon="heroicons:arrow-right-on-rectangle"
                    title="Sign out"
                  />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTooltip>

            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                      <Icon name="heroicons:bell" class="text-muted-foreground size-5" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Notifications</p></UiTooltipContent>
                <UiDropdownMenuContent align="end" class="w-96">
                  <UiDropdownMenuLabel class="flex items-center justify-between">
                    <span>Notifications</span>
                    <UiBadge variant="secondary" size="sm">3 new</UiBadge>
                  </UiDropdownMenuLabel>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    icon="heroicons:shopping-bag"
                    title="Demi Wikinson purchased Webflow 101"
                  >
                    <template #shortcut>1m ago</template>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem
                    icon="heroicons:arrow-trending-up"
                    title="Revenue up 10% today"
                  >
                    <template #shortcut>1h ago</template>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem icon="heroicons:users" title="3 new team invites pending">
                    <template #shortcut>3h ago</template>
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTooltip>

            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="rounded-full p-0">
                      <UiAvatar
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Olivia Rhye"
                        fallback="OR"
                        class="size-8 cursor-pointer"
                      />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Account</p></UiTooltipContent>
                <UiDropdownMenuContent align="end" class="w-52">
                  <UiDropdownMenuLabel>
                    <div class="flex flex-col">
                      <p class="text-sm font-medium">Olivia Rhye</p>
                      <p class="text-muted-foreground text-xs">olivia@ui-thing.com</p>
                    </div>
                  </UiDropdownMenuLabel>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                  <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
                  <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing" />
                  <UiDropdownMenuItem icon="heroicons:users" title="Team" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    icon="heroicons:question-mark-circle"
                    title="Help & support"
                  />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    variant="destructive"
                    icon="heroicons:arrow-right-on-rectangle"
                    title="Sign out"
                  />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTooltip>
          </div>
        </div>
      </UiContainer>
    </Motion>

    <!-- Secondary tab nav -->
    <Motion
      :initial="{ opacity: 0, y: -8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, delay: 0.05, ease: 'easeOut' }"
      class="border-border/70 bg-background border-b"
    >
      <UiContainer class="flex items-center justify-between gap-4 py-0">
        <!-- Tabs (desktop) -->
        <div class="hidden items-center gap-0.5 overflow-x-auto sm:flex">
          <button
            v-for="tab in secondaryTabs"
            :key="tab.label"
            class="relative shrink-0 px-3 py-3.5 text-sm font-medium transition-colors"
            :class="
              tab.active
                ? 'text-foreground after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5'
                : 'text-muted-foreground hover:text-foreground'
            "
            @click="setActiveTab(tab.label)"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Mobile tab selector -->
        <UiPopover class="sm:hidden">
          <UiPopoverTrigger as-child>
            <UiButton variant="ghost" size="sm" class="gap-1.5 text-sm font-medium sm:hidden">
              {{ activeTabLabel }}
              <Icon name="heroicons:chevron-down" class="text-muted-foreground size-4" />
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent align="start" class="w-52 p-1">
            <UiButton
              v-for="tab in secondaryTabs"
              :key="tab.label"
              variant="ghost"
              size="sm"
              class="w-full justify-start"
              :class="tab.active ? 'bg-muted font-semibold' : 'text-muted-foreground'"
              @click="setActiveTab(tab.label)"
            >
              {{ tab.label }}
            </UiButton>
          </UiPopoverContent>
        </UiPopover>

        <!-- ⌘K search -->
        <UiButton
          variant="outline"
          size="sm"
          class="text-muted-foreground hidden shrink-0 justify-start gap-2 sm:flex lg:w-60"
          @click="searchOpen = true"
        >
          <Icon name="heroicons:magnifying-glass" class="size-4" />
          <span class="text-sm">Search...</span>
          <UiKbd class="ml-auto">⌘K</UiKbd>
        </UiButton>
      </UiContainer>
    </Motion>

    <!-- Page content -->
    <UiContainer class="space-y-8 py-8">
      <!-- Page header -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
        class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Sales overview</h1>
          <p class="text-muted-foreground mt-1 text-sm">Your current sales summary and activity.</p>
        </div>
        <div class="flex items-center gap-2">
          <UiButton variant="outline" size="sm" class="gap-2" @click="exportOpen = true">
            <Icon name="heroicons:arrow-down-tray" class="size-4" />
            Export report
          </UiButton>
          <UiButton size="sm" class="gap-2" @click="inviteOpen = true">
            <Icon name="heroicons:plus" class="size-4" />
            Invite
          </UiButton>
        </div>
      </Motion>

      <!-- View selector row -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.15, ease: 'easeOut' }"
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- View tabs -->
        <UiButtonGroup>
          <UiButton
            v-for="view in viewTabs"
            :key="view.value"
            variant="outline"
            size="sm"
            :class="activeView === view.value ? 'bg-muted shadow-xs' : 'text-muted-foreground'"
            @click="activeView = view.value"
          >
            <span v-if="view.dot" class="mr-1.5 size-2 rounded-full bg-emerald-500" />
            {{ view.label }}
          </UiButton>
          <UiButton variant="outline" size="sm" class="text-muted-foreground">
            <Icon name="heroicons:plus" class="size-4" />
          </UiButton>
        </UiButtonGroup>

        <!-- Date range + filters -->
        <div class="flex items-center gap-2">
          <UiButton variant="outline" size="sm" class="gap-2 text-sm">
            <Icon name="heroicons:calendar-days" class="text-muted-foreground size-4" />
            Jan 10, 2025 – Jan 16, 2025
          </UiButton>
          <UiButton variant="outline" size="sm" class="gap-2">
            <Icon name="heroicons:adjustments-horizontal" class="size-4" />
            Filters
          </UiButton>
        </div>
      </Motion>

      <!-- Main two-column layout -->
      <div class="grid gap-6 lg:grid-cols-[1fr_280px]">
        <!-- Left: KPI cards + charts -->
        <Motion
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
          class="space-y-5"
        >
          <!-- KPI cards -->
          <div class="grid gap-4 sm:grid-cols-3">
            <div
              v-for="kpi in kpiCards"
              :key="kpi.label"
              class="border-border/70 bg-card rounded-xl border p-5 shadow-xs"
            >
              <div class="flex items-center justify-between">
                <p class="text-muted-foreground text-sm">{{ kpi.label }}</p>
                <UiTooltip>
                  <UiDropdownMenu>
                    <UiTooltipTrigger as-child>
                      <UiDropdownMenuTrigger as-child>
                        <UiButton
                          variant="ghost"
                          size="icon-sm"
                          class="text-muted-foreground -mr-1"
                        >
                          <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                        </UiButton>
                      </UiDropdownMenuTrigger>
                    </UiTooltipTrigger>
                    <UiTooltipContent><p>Options</p></UiTooltipContent>
                    <UiDropdownMenuContent align="end">
                      <UiDropdownMenuItem icon="heroicons:arrow-path" title="Refresh" />
                      <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Export" />
                    </UiDropdownMenuContent>
                  </UiDropdownMenu>
                </UiTooltip>
              </div>

              <div class="mt-3 flex items-end justify-between gap-2">
                <p class="text-2xl font-bold tracking-tight">{{ kpi.value }}</p>
                <span
                  class="mb-0.5 flex shrink-0 items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs font-semibold"
                  :class="
                    kpi.positive
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400'
                      : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400'
                  "
                >
                  <Icon
                    :name="kpi.positive ? 'heroicons:arrow-up' : 'heroicons:arrow-down'"
                    class="size-3"
                  />
                  {{ kpi.trend }}
                </span>
              </div>

              <div class="border-border/60 mt-4 border-t pt-3">
                <button
                  class="text-sm font-medium transition-colors"
                  :style="{ color: 'var(--color-primary)' }"
                >
                  View report
                </button>
              </div>
            </div>
          </div>

          <!-- Sales report card -->
          <div class="border-border/70 bg-card rounded-xl border shadow-xs">
            <div class="flex items-center justify-between px-5 pt-5">
              <h2 class="text-base font-semibold">Sales report</h2>
              <UiButton variant="outline" size="sm">View report</UiButton>
            </div>

            <!-- Time tabs -->
            <div class="flex items-center gap-0 px-5 pt-3">
              <button
                v-for="t in salesTimeTabs"
                :key="t"
                class="relative mr-4 pb-2 text-sm font-medium transition-colors"
                :class="
                  activeSalesTab === t
                    ? 'text-foreground after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5'
                    : 'text-muted-foreground hover:text-foreground'
                "
                @click="activeSalesTab = t"
              >
                {{ t }}
              </button>
            </div>
            <div class="border-border/60 border-t" />

            <UiApexchart type="area" height="220" :series="salesSeries" :options="salesOptions" />
          </div>

          <!-- Store traffic card -->
          <div class="border-border/70 bg-card rounded-xl border shadow-xs">
            <div class="flex items-center justify-between px-5 pt-5">
              <h2 class="text-base font-semibold">Store traffic</h2>
              <UiButton variant="outline" size="sm">View report</UiButton>
            </div>

            <!-- Time tabs -->
            <div class="flex items-center gap-0 px-5 pt-3">
              <button
                v-for="t in trafficTimeTabs"
                :key="t"
                class="relative mr-4 pb-2 text-sm font-medium transition-colors"
                :class="
                  activeTrafficTab === t
                    ? 'text-foreground after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5'
                    : 'text-muted-foreground hover:text-foreground'
                "
                @click="activeTrafficTab = t"
              >
                {{ t }}
              </button>
            </div>
            <div class="border-border/60 border-t" />

            <UiApexchart
              type="bar"
              height="220"
              :series="trafficSeries"
              :options="trafficOptions"
            />
          </div>

          <!-- Add button -->
          <div class="border-border/60 flex justify-center border-t pt-2">
            <UiButton variant="outline" size="sm" class="gap-2" @click="genChartOpen = true">
              <Icon name="heroicons:plus" class="size-4" />
              Add
            </UiButton>
          </div>
        </Motion>

        <!-- Right: Activity feed -->
        <Motion
          :initial="{ opacity: 0, x: 12 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.4, delay: 0.25, ease: 'easeOut' }"
          class="space-y-3"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold">Activity</h2>
            <button
              class="text-sm font-medium transition-colors"
              :style="{ color: 'var(--color-primary)' }"
            >
              View all
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="(item, i) in activityFeed" :key="i" class="flex items-start gap-3">
              <div class="relative shrink-0">
                <UiAvatar
                  :src="item.avatar"
                  :alt="item.name"
                  :fallback="item.name[0]"
                  class="size-8"
                />
                <span
                  v-if="item.online"
                  class="border-background absolute right-0 bottom-0 size-2.5 rounded-full border-2 bg-emerald-500"
                />
              </div>
              <div class="min-w-0 text-sm leading-snug">
                <span class="font-medium">{{ item.name }}</span>
                <span class="text-muted-foreground"> Purchased </span>
                <button
                  class="font-medium transition-colors"
                  :style="{ color: 'var(--color-primary)' }"
                >
                  {{ item.product }}
                </button>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";
  import { Motion } from "motion-v";

  // ─── Navigation ────────────────────────────────────────────────────────────────
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  // ─── Secondary tabs ─────────────────────────────────────────────────────────────
  const secondaryTabs = ref([
    { label: "Overview", active: true },
    { label: "Notifications", active: false },
    { label: "Analytics", active: false },
    { label: "Saved reports", active: false },
    { label: "Scheduled reports", active: false },
    { label: "User reports", active: false },
  ]);

  const activeTabLabel = computed(
    () => secondaryTabs.value.find((t) => t.active)?.label ?? "Overview"
  );

  const setActiveTab = (label: string) => {
    secondaryTabs.value = secondaryTabs.value.map((t) => ({ ...t, active: t.label === label }));
  };

  // ─── Invite dialog ─────────────────────────────────────────────────────────────
  const inviteOpen = ref(false);
  const inviteEmails = ref<string[]>([]);
  const inviteInputVal = ref("");
  const inviteError = ref("");
  const inviteInputRef = ref<HTMLInputElement | null>(null);

  const inviteSuggestions = [
    { name: "Aliah Lane", email: "aliah@ui-thing.com", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Drew Cano", email: "drew@ui-thing.com", avatar: "https://i.pravatar.cc/150?img=8" },
    { name: "Lana Steiner", email: "lana@ui-thing.com", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const focusInviteInput = () => inviteInputRef.value?.focus();

  const addInviteEmail = () => {
    const val = inviteInputVal.value.trim().replace(/,$/, "");
    if (!val) return;
    if (!isValidEmail(val)) {
      inviteError.value = "Please enter a valid email address.";
      return;
    }
    if (inviteEmails.value.includes(val)) {
      inviteError.value = "This email has already been added.";
      return;
    }
    if (inviteEmails.value.length >= 4) {
      inviteError.value = "You can invite up to 4 people at a time.";
      return;
    }
    inviteEmails.value.push(val);
    inviteInputVal.value = "";
    inviteError.value = "";
  };

  const removeInviteEmail = (email: string) => {
    inviteEmails.value = inviteEmails.value.filter((e) => e !== email);
    inviteError.value = "";
  };

  const onInviteBackspace = () => {
    if (!inviteInputVal.value && inviteEmails.value.length > 0) {
      inviteEmails.value.pop();
    }
  };

  const onInvitePaste = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData("text") ?? "";
    const pasted = text.split(/[\s,;]+/).filter(Boolean);
    for (const p of pasted) {
      if (inviteEmails.value.length >= 4) break;
      if (isValidEmail(p) && !inviteEmails.value.includes(p)) {
        inviteEmails.value.push(p);
      }
    }
    inviteInputVal.value = "";
    inviteError.value = "";
  };

  const addSuggestedEmail = (email: string) => {
    if (inviteEmails.value.length >= 4 || inviteEmails.value.includes(email)) return;
    inviteEmails.value.push(email);
    inviteError.value = "";
  };

  const submitInvites = () => {
    if (inviteEmails.value.length === 0) return;
    const count = inviteEmails.value.length;
    inviteOpen.value = false;
    useSonner(`${count} invite${count > 1 ? "s" : ""} sent`, {
      description: `Invitations have been sent to ${inviteEmails.value.join(", ")}.`,
    });
    inviteEmails.value = [];
    inviteInputVal.value = "";
    inviteError.value = "";
  };

  const onInviteDialogClose = (open: boolean) => {
    if (!open) {
      inviteInputVal.value = "";
      inviteError.value = "";
    }
  };

  // ─── Export dialog ─────────────────────────────────────────────────────────────
  const exportOpen = ref(false);
  const selectedFormat = ref<string | null>(null);

  const exportFormats = [
    {
      value: "csv",
      label: "CSV",
      icon: "heroicons:table-cells",
      description: "Spreadsheet-compatible rows",
      size: "~12 KB",
    },
    {
      value: "pdf",
      label: "PDF",
      icon: "heroicons:document-text",
      description: "Formatted, print-ready report",
      size: "~340 KB",
    },
    {
      value: "xlsx",
      label: "Excel",
      icon: "heroicons:document-chart-bar",
      description: "Full workbook with charts",
      size: "~85 KB",
    },
    {
      value: "json",
      label: "JSON",
      icon: "heroicons:code-bracket",
      description: "Raw data for developers",
      size: "~28 KB",
    },
  ];

  const submitExport = () => {
    if (!selectedFormat.value) return;
    exportOpen.value = false;
    useSonner("Export requested", {
      description: `A download link for your ${selectedFormat.value.toUpperCase()} report will be sent to olivia@ui-thing.com.`,
    });
    selectedFormat.value = null;
  };

  // ─── Search dialog ─────────────────────────────────────────────────────────────
  const searchOpen = ref(false);
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") searchOpen.value = false;
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchOpen.value = true;
    }
  };
  onMounted(() => document.addEventListener("keydown", handleKeydown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

  // ─── View selector ──────────────────────────────────────────────────────────────
  const viewTabs = [
    { label: "Default", value: "default", dot: false },
    { label: "Saved view", value: "saved", dot: true },
    { label: "SDR view", value: "sdr", dot: false },
  ];
  const activeView = ref("saved");

  // ─── KPI cards ─────────────────────────────────────────────────────────────────
  const kpiCards = [
    { label: "Today's revenue", value: "$1,280", trend: "10%", positive: true },
    { label: "Today's orders", value: "14", trend: "12%", positive: true },
    { label: "Avg. order value", value: "$91.42", trend: "2%", positive: false },
  ];

  // ─── Sales report chart ────────────────────────────────────────────────────────
  const salesTimeTabs = ["12 months", "30 days", "7 days", "24 hours"];
  const activeSalesTab = ref("12 months");

  const months = [
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
  ];

  const salesSeries = [
    {
      name: "Revenue",
      data: [42, 55, 50, 65, 72, 80, 88, 85, 92, 96, 105, 118],
    },
    {
      name: "Target",
      data: [30, 38, 36, 45, 52, 58, 62, 65, 70, 74, 80, 88],
    },
  ];

  const salesOptions: ApexOptions = {
    chart: {
      type: "area",
      background: "transparent",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ["var(--color-primary)", "color-mix(in oklab, var(--color-primary) 40%, white)"],
    stroke: { width: [2, 2], curve: "smooth" },
    fill: {
      type: ["gradient", "gradient"],
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.12,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    markers: { size: 0, hover: { size: 5 } },
    grid: {
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 8, right: 8 },
    },
    xaxis: {
      categories: months,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    legend: { show: false },
    tooltip: { y: { formatter: (v: number) => `$${v}k` } },
  };

  // ─── Store traffic chart ───────────────────────────────────────────────────────
  const trafficTimeTabs = ["12 months", "30 days", "7 days", "24 hours"];
  const activeTrafficTab = ref("12 months");

  const trafficSeries = [
    {
      name: "Visitors",
      data: [4200, 7800, 3600, 5800, 4900, 6200, 7100, 5400, 6800, 7400, 8200, 6900],
    },
    {
      name: "Target",
      data: [2800, 3200, 2400, 3600, 3200, 4100, 3800, 2900, 4200, 3800, 4600, 3200],
    },
  ];

  const trafficOptions: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      background: "transparent",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ["var(--color-primary)", "#e2e8f0"],
    plotOptions: {
      bar: { borderRadius: 3, columnWidth: "55%", borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    grid: {
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: false } },
      padding: { left: 8, right: 8 },
    },
    legend: { show: false },
    tooltip: { y: { formatter: (v: number) => `${v.toLocaleString()} visitors` } },
  };

  // ─── Activity feed ─────────────────────────────────────────────────────────────
  const activityFeed = [
    {
      name: "Demi Wikinson",
      product: "Webflow 101",
      avatar: "https://i.pravatar.cc/150?img=1",
      online: true,
    },
    {
      name: "Aliah Lane",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=2",
      online: false,
    },
    {
      name: "Lana Steiner",
      product: "Figma Mockups",
      avatar: "https://i.pravatar.cc/150?img=3",
      online: false,
    },
    {
      name: "Candice Wu",
      product: "Webflow 101",
      avatar: "https://i.pravatar.cc/150?img=4",
      online: false,
    },
    {
      name: "Ava Wright",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=5",
      online: false,
    },
    {
      name: "Koray Okumus",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=6",
      online: false,
    },
    {
      name: "Andi Lane",
      product: "The Ultimate Guide to Backlinks",
      avatar: "https://i.pravatar.cc/150?img=7",
      online: false,
    },
    {
      name: "Drew Cano",
      product: "The Figma Dashboard Bundle",
      avatar: "https://i.pravatar.cc/150?img=8",
      online: false,
    },
    {
      name: "Zahir Mays",
      product: "The Figma Dashboard Bundle",
      avatar: "https://i.pravatar.cc/150?img=9",
      online: false,
    },
    {
      name: "Rene Wells",
      product: "The Design Handbook",
      avatar: "https://i.pravatar.cc/150?img=10",
      online: false,
    },
    {
      name: "Joshua Wilson",
      product: "Phone 13 Mockups",
      avatar: "https://i.pravatar.cc/150?img=11",
      online: false,
    },
    {
      name: "Lori Bryson",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=12",
      online: false,
    },
    {
      name: "Loki Bright",
      product: "Figma Mockups",
      avatar: "https://i.pravatar.cc/150?img=13",
      online: false,
    },
    {
      name: "Anita Cruz",
      product: "The Ultimate Guide to Backlinks",
      avatar: "https://i.pravatar.cc/150?img=14",
      online: false,
    },
  ];

  // ─── Generate chart dialog ──────────────────────────────────────────────────
  const genChartOpen = ref(false);
  const genChartName = ref("");
  const genChartType = ref("area");
  const genChartMetric = ref("revenue");
  const genChartRange = ref("30d");
  const genChartCompare = ref(false);

  const genChartTypes = [
    { value: "area", label: "Area", icon: "heroicons:presentation-chart-line" },
    { value: "bar", label: "Bar", icon: "heroicons:chart-bar" },
    { value: "line", label: "Line", icon: "heroicons:arrow-trending-up" },
    { value: "donut", label: "Donut", icon: "heroicons:chart-pie" },
    { value: "scatter", label: "Scatter", icon: "heroicons:squares-2x2" },
  ];

  const genChartMetrics = [
    { value: "revenue", label: "Revenue" },
    { value: "orders", label: "Orders" },
    { value: "aov", label: "Avg. order value" },
    { value: "conversion", label: "Conversion rate" },
    { value: "acquisition", label: "Customer acquisition" },
    { value: "refunds", label: "Refunds" },
  ];

  const genChartRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "12m", label: "Last 12 months" },
    { value: "ytd", label: "Year to date" },
  ];

  const submitGenChart = () => {
    if (!genChartName.value.trim() || !genChartType.value) return;
    const label =
      genChartTypes.find((t) => t.value === genChartType.value)?.label ?? genChartType.value;
    genChartOpen.value = false;
    useSonner("Generating chart…", {
      description: `Your "${genChartName.value.trim()}" ${label.toLowerCase()} chart is being generated.`,
    });
    genChartName.value = "";
    genChartType.value = "area";
    genChartMetric.value = "revenue";
    genChartRange.value = "30d";
    genChartCompare.value = false;
  };

  const onGenChartClose = (open: boolean) => {
    if (!open) {
      genChartName.value = "";
      genChartType.value = "area";
      genChartMetric.value = "revenue";
      genChartRange.value = "30d";
      genChartCompare.value = false;
    }
  };
</script>
