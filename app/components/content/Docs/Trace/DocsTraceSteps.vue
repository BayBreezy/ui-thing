<template>
  <div class="mx-auto w-full max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="running">
          <UiTraceTitle>Looking into the slow deploy</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine>
                <UiTraceIcon>
                  <Icon name="lucide:search" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Searched for the checkout build log</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent class="flex flex-wrap gap-1.5">
              <UiBadge variant="secondary"> vercel.com </UiBadge>
              <UiBadge variant="secondary"> github.com </UiBadge>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
          <a href="#steps">
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:file-text" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>Read the last twelve deploys</UiTraceTitle>
              <UiTraceIcon>
                <Icon name="lucide:chevron-right" class="size-4" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine status="running">
                <UiTraceIcon>
                  <Icon name="lucide:search" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Searching for the cache key</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiCodeBlock size="sm">
                <UiCodeBlockContent wrap class="max-h-64">
                  cache key image optimization
                </UiCodeBlockContent>
              </UiCodeBlock>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </div>
</template>

<script lang="ts" setup></script>
