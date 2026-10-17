<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="running">
          <UiTraceIcon>
            <Icon name="lucide:loader-circle" class="size-4 animate-spin" />
          </UiTraceIcon>
          <UiTraceTitle>Running the research agent</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:circle-check" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Ran grep -rn cacheKey scripts</UiTraceTitle>
          </UiTraceLine>
          <UiTraceLine status="running">
            <UiTraceIcon>
              <Icon name="lucide:loader-circle" class="size-4 animate-spin" />
            </UiTraceIcon>
            <UiTraceTitle> Running sed -n 13,15p scripts/optimize-images.ts </UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup></script>
