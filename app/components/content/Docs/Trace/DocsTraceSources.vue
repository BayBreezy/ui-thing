<template>
  <div class="mx-auto w-full max-w-sm">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:globe" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Used {{ sources.length }} sources</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <a
            v-for="source in sources"
            :key="source.href"
            :href="source.href"
            target="_blank"
            rel="noreferrer"
          >
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:globe" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ source.title }}
                <span class="sr-only"> (opens in a new tab)</span>
              </UiTraceTitle>
              <UiTraceIcon>
                <Icon name="lucide:arrow-up-right" class="size-4" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </div>
</template>

<script lang="ts" setup>
  const sources = [
    {
      title: "Install Astro | docs.astro.build",
      href: "https://docs.astro.build/en/install-and-setup/",
    },
    {
      title: "create-astro | npmjs.com",
      href: "https://www.npmjs.com/package/create-astro",
    },
    {
      title: "Settings: minimumReleaseAge | pnpm.io",
      href: "https://pnpm.io/settings#minimumreleaseage",
    },
  ];
</script>
