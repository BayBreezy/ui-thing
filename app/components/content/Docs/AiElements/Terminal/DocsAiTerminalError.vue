<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Ran pnpm install</UiTraceTitle>
    </UiTraceLine>
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>pnpm lint exited with code 1</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ LINT_OUTPUT }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const LINT_OUTPUT = `> acme-chat@0.1.0 lint
> eslint .

server/api/chat.post.ts
  14:7  error  'model' is assigned a value but never used  no-unused-vars

components/Chat.vue
  42:5  error  'messages' is defined but never used  vue/no-unused-vars

✖ 2 problems (2 errors, 0 warnings)

 ELIFECYCLE  Command failed with exit code 1.`;
</script>
