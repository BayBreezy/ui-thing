<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiDialog>
      <UiDialogTrigger as-child>
        <button type="button">
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:globe" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Searched the web for cache keys</UiTraceTitle>
            <UiTraceIcon>
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiTraceIcon>
          </UiTraceLine>
        </button>
      </UiDialogTrigger>
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Searched the web for cache keys</UiDialogTitle>
          <UiDialogDescription> Three results were used in the response. </UiDialogDescription>
        </UiDialogHeader>
        <UiTrace>
          <a
            v-for="result in results"
            :key="result.url"
            :href="result.url"
            target="_blank"
            rel="noreferrer"
          >
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:globe" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ result.title }}
                <span class="sr-only"> (opens in a new tab)</span>
              </UiTraceTitle>
              <UiTraceIcon>
                <Icon name="lucide:arrow-up-right" class="size-4" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
        </UiTrace>
      </UiDialogContent>
    </UiDialog>
  </UiTrace>
</template>

<script lang="ts" setup>
  const results = [
    {
      title: "Caching build outputs",
      url: "https://nextjs.org/docs/app/guides/caching",
    },
    {
      title: "Image optimization reference",
      url: "https://nextjs.org/docs/app/api-reference/components/image",
    },
    {
      title: "Deploy hooks and cache keys",
      url: "https://vercel.com/docs/deploy-hooks",
    },
  ];
</script>
