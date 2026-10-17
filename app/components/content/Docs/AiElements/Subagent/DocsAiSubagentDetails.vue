<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:circle-check" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran the research agent</UiTraceTitle>
          <UiTraceDescription>48s</UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-1.5">
          <UiBadge variant="secondary"> anthropic/claude-sonnet-4.5 </UiBadge>
          <UiBadge variant="outline" class="font-mono"> runCommand </UiBadge>
        </div>
        <p>Find out why image optimization reruns on every deploy.</p>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:circle-check" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Ran grep -rn cacheKey scripts</UiTraceTitle>
          </UiTraceLine>
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:circle-check" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle> Ran sed -n 13,15p scripts/optimize-images.ts </UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
        <p>The cache is keyed on the commit SHA.</p>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup></script>
