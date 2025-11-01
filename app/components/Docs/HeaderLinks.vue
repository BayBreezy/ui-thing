<template>
  <UiButtonGroup>
    <UiButton variant="secondary" size="sm" :disabled="copied" @click="copyPage()">
      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
      <span>{{ copied ? "Copied!" : "Copy Page" }}</span>
    </UiButton>
    <UiButtonGroupSeparator />
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="secondary" size="icon-sm">
          <Icon name="lucide:chevron-down" />
          <span class="sr-only">More options for header links </span>
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent align="end" :collision-padding="10" class="w-60">
        <UiDropdownMenuGroup class="flex flex-col gap-0.5">
          <template v-for="(item, i) in items" :key="i">
            <UiDropdownMenuItem
              v-if="item.action"
              :icon="item.icon"
              :title="item.label"
              @select="item.action()"
            />
            <UiDropdownMenuItem v-else-if="item.to" :text-value="item.label" as-child>
              <NuxtLink
                :to="item.to"
                target="_blank"
                class="flex w-full cursor-pointer items-center gap-2"
              >
                <Icon :name="item.icon" />
                <p v-html="item.label" />
                <Icon name="lucide:arrow-up-right" class="ml-auto text-muted-foreground" />
              </NuxtLink>
            </UiDropdownMenuItem>
            <UiDropdownMenuSeparator v-else-if="item.separator" />
          </template>
        </UiDropdownMenuGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </UiButtonGroup>
</template>

<script lang="ts" setup>
  const route = useRoute();

  const { copy, copied } = useClipboard();
  const markdownLink = computed(() => `${window?.location?.origin}/api/md${route.path}`);

  const copyPage = async () => {
    try {
      const response = await $fetch(`/api/md/${route.path}`);
      if (response) {
        copy(response);
        useSonner.success("Markdown Link Copied", {
          description: "The markdown link for this page has been copied to your clipboard.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      useSonner.error("Link Unavailable", {
        description: "This page does not have a markdown link available.",
      });
    }
  };

  const items = [
    {
      label: "Copy Markdown Link",
      icon: "lucide:link",
      action: () => {
        copy(markdownLink.value);
      },
    },
    { separator: true },
    {
      label: "View Markdown Page",
      icon: "simple-icons:markdown",
      to: `/api/md${route.path}`,
    },
    {
      label: "Open in ChatGPT",
      icon: "simple-icons:openai",
      to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`,
    },
    {
      label: "Open in Claude",
      icon: "simple-icons:claude",
      to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`,
    },
    {
      label: "Open in T3",
      icon: "lucide:message-circle",
      to: `https://t3.chat/new?q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`,
    },
    { separator: true },
    {
      label: `View llms.txt File`,
      icon: "lucide:bot",
      to: `/llms.txt`,
    },
    {
      label: `View llms-full.txt File`,
      icon: "lucide:bot",
      to: `/llms-full.txt`,
    },
  ];
</script>
