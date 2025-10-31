<template>
  <div>
    <DefineMentionableIcon v-slot="{ item }">
      <span v-if="item.type == 'page'" class="flex size-4 items-center justify-center">{{
        item.image
      }}</span>
      <UiAvatar v-else class="size-4">
        <UiAvatarImage :src="item.image" />
        <UiAvatarFallback>{{ item.title[0] }}</UiAvatarFallback>
      </UiAvatar>
    </DefineMentionableIcon>

    <form class="[--radius:1.2rem]">
      <UiField>
        <UiFieldLabel for="notion-prompt" class="sr-only"> Prompt </UiFieldLabel>
        <UiInputGroup>
          <UiInputGroupTextarea id="notion-prompt" placeholder="Ask, search, or make anything..." />
          <UiInputGroupAddon align="block-start">
            <UiTooltip>
              <UiPopover v-model:open="mentionPopoverOpen">
                <UiPopoverTrigger as-child>
                  <UiTooltipTrigger as-child>
                    <UiInputGroupButton
                      variant="outline"
                      :size="!hasMentions ? 'sm' : 'icon-sm'"
                      class="rounded-full transition-transform"
                    >
                      <Icon name="lucide:at-sign" />
                      <Motion
                        v-if="!hasMentions"
                        :initial="{ opacity: 0, scale: 0 }"
                        :animate="{ opacity: 1, scale: 1 }"
                        >Add context</Motion
                      >
                    </UiInputGroupButton>
                  </UiTooltipTrigger>
                </UiPopoverTrigger>
                <UiTooltipContent>Mention a person, page, or date</UiTooltipContent>

                <UiPopoverContent class="p-0 [--radius:1.2rem]" align="start">
                  <UiCommand>
                    <UiCommandInput placeholder="Search pages..." />
                    <UiCommandList>
                      <UiCommandEmpty>No pages found</UiCommandEmpty>
                      <UiCommandGroup
                        v-for="[type, items] in Object.entries(grouped)"
                        :key="type"
                        :heading="type === 'page' ? 'Pages' : 'Users'"
                      >
                        <UiCommandItem
                          v-for="item in items"
                          :key="item.title"
                          :value="item.title"
                          @select="
                            (ev) => {
                              mentions.push(item.title);
                              mentionPopoverOpen = false;
                            }
                          "
                        >
                          <MentionableIcon :item="item" />
                          {{ item.title }}
                        </UiCommandItem>
                      </UiCommandGroup>
                    </UiCommandList>
                  </UiCommand>
                </UiPopoverContent>
              </UiPopover>
            </UiTooltip>
            <div v-if="hasMentions" class="-m-1.5 no-scrollbar flex gap-1 overflow-y-auto p-1.5">
              <AnimatePresence>
                <template v-for="mention in mentions" :key="mention">
                  <Motion
                    :initial="{ opacity: 0, scale: 0.8 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :exit="{ opacity: 0, scale: 0.8 }"
                  >
                    <UiInputGroupButton
                      v-if="SAMPLE_DATA.mentionable.find((item) => item.title === mention)"
                      size="sm"
                      variant="secondary"
                      class="rounded-full pl-2!"
                      @click="mentions = mentions.filter((m) => m !== mention)"
                    >
                      <MentionableIcon
                        :item="SAMPLE_DATA.mentionable.find((item) => item.title === mention)!"
                      />
                      {{ mention }}
                      <Icon name="lucide:x" class="size-4" />
                    </UiInputGroupButton>
                  </Motion>
                </template>
              </AnimatePresence>
            </div>
          </UiInputGroupAddon>
          <UiInputGroupAddon align="block-end" class="gap-1">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiInputGroupButton
                  size="icon-sm"
                  class="rounded-full"
                  aria-label="Attach file"
                  @click="openFileDialog()"
                >
                  <Icon name="lucide:paperclip" />
                </UiInputGroupButton>
              </UiTooltipTrigger>
              <UiTooltipContent>Attach file</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiDropdownMenu v-model:open="modelPopoverOpen">
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiInputGroupButton size="sm" class="rounded-full">
                      {{ selectedModel?.name }}
                    </UiInputGroupButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiTooltipContent>Select AI model</UiTooltipContent>
                <UiDropdownMenuContent side="top" align="start" class="[--radius:1rem]">
                  <UiDropdownMenuGroup class="w-42">
                    <UiDropdownMenuLabel class="text-xs text-muted-foreground">
                      Select Agent Mode
                    </UiDropdownMenuLabel>
                    <UiDropdownMenuCheckboxItem
                      v-for="model in SAMPLE_DATA.models"
                      :key="model.name"
                      class="pl-2 *:[span:first-child]:right-2 *:[span:first-child]:left-auto"
                      :model-value="selectedModel?.name == model.name"
                      @update:model-value="
                        (v) => {
                          if (v) {
                            selectedModel = model;
                          }
                        }
                      "
                    >
                      {{ model.name }}
                      <UiBadge
                        v-if="model.badge"
                        variant="secondary"
                        class="h-5 rounded-sm bg-blue-100 px-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      >
                        {{ model.badge }}
                      </UiBadge>
                    </UiDropdownMenuCheckboxItem>
                  </UiDropdownMenuGroup>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTooltip>
            <UiDropdownMenu v-model:open="scopeMenuOpen">
              <UiDropdownMenuTrigger as-child>
                <UiInputGroupButton size="sm" class="rounded-full">
                  <Icon name="lucide:globe" /> All Sources
                </UiInputGroupButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent side="top" align="end" class="[--radius:1rem]">
                <UiDropdownMenuGroup>
                  <UiDropdownMenuItem as-child @select="(e) => e.preventDefault()">
                    <label for="web-search">
                      <Icon name="lucide:globe" /> Web Search
                      <UiSwitch id="web-search" class="ml-auto" :default-value="true" />
                    </label>
                  </UiDropdownMenuItem>
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                  <UiDropdownMenuItem as-child @select="(e) => e.preventDefault()">
                    <label for="apps">
                      <Icon name="lucide:grid-2x2-plus" /> Apps and Integrations
                      <UiSwitch id="apps" class="ml-auto" :default-value="true" />
                    </label>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem>
                    <Icon name="lucide:circle-fading-plus" /> All Sources I can access
                  </UiDropdownMenuItem>
                  <UiDropdownMenuSub>
                    <UiDropdownMenuSubTrigger>
                      <UiAvatar class="size-4">
                        <UiAvatarImage src="https://github.com/baybreezy.png" />
                        <UiAvatarFallback>BB</UiAvatarFallback>
                      </UiAvatar>
                      BayBreezy
                    </UiDropdownMenuSubTrigger>
                    <UiDropdownMenuSubContent class="w-72 p-0 [--radius:1rem]">
                      <UiCommand>
                        <UiCommandInput placeholder="Find or use knowledge in..." auto-focus />
                        <UiCommandList>
                          <UiCommandEmpty>No knowledge found</UiCommandEmpty>
                          <UiCommandGroup>
                            <UiCommandItem
                              v-for="user in SAMPLE_DATA.mentionable.filter(
                                (item) => item.type === 'user'
                              )"
                              :key="user.title"
                              :value="user.title"
                              @select="
                                (e) => {
                                  console.log('Selected user:', user.title);
                                }
                              "
                            >
                              <UiAvatar class="size-4">
                                <UiAvatarImage :src="user.image" />
                                <UiAvatarFallback> {user.title[0]} </UiAvatarFallback>
                              </UiAvatar>
                              {{ user.title }}
                              <span class="text-muted-foreground"> - {{ user.workspace }} </span>
                            </UiCommandItem>
                          </UiCommandGroup>
                        </UiCommandList>
                      </UiCommand>
                    </UiDropdownMenuSubContent>
                  </UiDropdownMenuSub>
                  <UiDropdownMenuItem>
                    <Icon name="lucide:book-open" /> Help Center
                  </UiDropdownMenuItem>
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                  <UiDropdownMenuItem>
                    <Icon name="lucide:plus" /> Connect Apps
                  </UiDropdownMenuItem>
                  <UiDropdownMenuLabel class="text-xs text-muted-foreground">
                    We'll only search in the sources selected here.
                  </UiDropdownMenuLabel>
                </UiDropdownMenuGroup>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
            <UiInputGroupButton
              aria-label="Send"
              class="ml-auto rounded-full"
              variant="default"
              size="icon-sm"
            >
              <Icon name="lucide:send" />
            </UiInputGroupButton>
          </UiInputGroupAddon>
        </UiInputGroup>
      </UiField>
    </form>
  </div>
</template>

<script lang="ts" setup>
  type MentionableItem = {
    type: "page" | "user";
    title: string;
    image: string;
    workspace?: string;
  };

  type ModelItem = {
    name: string;
    badge?: string;
  };

  const SAMPLE_DATA = {
    mentionable: [
      {
        type: "page",
        title: "Meeting Notes",
        image: "📝",
      },
      {
        type: "page",
        title: "Project Dashboard",
        image: "📊",
      },
      {
        type: "page",
        title: "Ideas & Brainstorming",
        image: "💡",
      },
      {
        type: "page",
        title: "Calendar & Events",
        image: "📅",
      },
      {
        type: "page",
        title: "Documentation",
        image: "📚",
      },
      {
        type: "page",
        title: "Goals & Objectives",
        image: "🎯",
      },
      {
        type: "page",
        title: "Budget Planning",
        image: "💰",
      },
      {
        type: "page",
        title: "Team Directory",
        image: "👥",
      },
      {
        type: "page",
        title: "Technical Specs",
        image: "🔧",
      },
      {
        type: "page",
        title: "Analytics Report",
        image: "📈",
      },
      {
        type: "user",
        title: "baybreezy",
        image: "https://github.com/baybreezy.png",
        workspace: "Workspace",
      },
      {
        type: "user",
        title: "mirari",
        image: "https://github.com/mirari.png",
        workspace: "Workspace",
      },
      {
        type: "user",
        title: "arshx86",
        image: "https://github.com/arshx86.png",
        workspace: "Workspace",
      },
    ] as MentionableItem[],
    models: [
      {
        name: "Auto",
      },
      {
        name: "Agent Mode",
        badge: "Beta",
      },
      {
        name: "Plan Mode",
      },
    ] as ModelItem[],
  };

  const [DefineMentionableIcon, MentionableIcon] = createReusableTemplate<{
    item: MentionableItem;
  }>();

  const mentions = ref<string[]>([]);
  const mentionPopoverOpen = ref(false);
  const modelPopoverOpen = ref(false);
  const selectedModel = ref<ModelItem | undefined>(SAMPLE_DATA.models[0]);
  const scopeMenuOpen = ref(false);

  const grouped = computed(() => {
    return SAMPLE_DATA.mentionable.reduce(
      (acc, item) => {
        const isAvailable = !mentions.value.includes(item.title);

        if (isAvailable) {
          if (!acc[item.type]) {
            acc[item.type] = [];
          }
          acc[item.type]!.push(item);
        }
        return acc;
      },
      {} as Record<string, MentionableItem[]>
    );
  });

  const hasMentions = computed(() => mentions.value.length > 0);

  const { open: openFileDialog } = useFileDialog();
</script>
