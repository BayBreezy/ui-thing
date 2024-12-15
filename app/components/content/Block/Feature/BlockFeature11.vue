<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-[760px]">
      <div class="text-center">
        <UiBadge variant="outline" class="gap-2 px-3 py-1.5 text-sm font-normal">
          Integrations
        </UiBadge>
      </div>
      <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:mt-7 lg:text-4xl">
        Get more value from your tools
      </h2>
      <p class="mx-auto max-w-[760px] text-center text-lg text-muted-foreground lg:text-xl">
        Connect your tools, connect your teams. With over 100 apps already available in our
        directory, your team's favourite tools are just a click away.
      </p>
    </div>

    <div class="my-12 grid grid-cols-1 gap-y-10 lg:my-24 lg:grid-cols-3 lg:gap-8 lg:gap-y-16">
      <template v-for="(f, i) in features" :key="i">
        <div class="group flex flex-col items-center">
          <div class="flex h-12 w-12 items-center justify-center rounded-md border">
            <Icon
              :name="f.icon"
              class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
            />
          </div>
          <h3 class="mt-4 text-balance text-center text-lg font-semibold lg:mt-5 lg:text-xl">
            {{ f.title }} integration
          </h3>
          <p class="mt-1 max-w-[650px] text-balance text-center text-muted-foreground lg:mt-2">
            Work faster and smarter by integrating directly with {{ f.title }}, right in the app.
          </p>
          <NuxtLink
            class="mt-4 inline-block font-semibold text-primary underline-offset-2 hover:underline lg:mt-5"
            to="#"
            >View integration <Icon name="heroicons:arrow-right" class="h-4 w-4"
          /></NuxtLink>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const features = [
    { icon: "logos:notion-icon", title: "Notion" },
    { icon: "logos:slack-icon", title: "Slack" },
    { icon: "logos:figma", title: "Figma" },
    { icon: "logos:google-analytics", title: "Google Analytics" },
    { icon: "logos:google-drive", title: "Google Drive" },
    { icon: "logos:jira", title: "Jira" },
  ];
</script>
