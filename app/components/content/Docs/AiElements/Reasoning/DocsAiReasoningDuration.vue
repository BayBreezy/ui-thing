<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:circle-check" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Thought</UiTraceTitle>
          <UiTraceDescription>12s</UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="whitespace-pre-wrap">
        {{ text }}
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const text =
    "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.";
</script>
