<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran git status --short</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ status }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Failed to run pnpm dev</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            Command timed out after 120 seconds.
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Denied rm -rf dist</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="running">
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Running pnpm test</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup>
  const status = ` M server/api/chat.post.ts
 M components/Chat.vue`;
</script>
