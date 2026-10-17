<template>
  <div class="mx-auto w-full max-w-md">
    <UiTrace>
      <UiTraceCollapsible default-open>
        <UiTraceCollapsibleTrigger>
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:terminal" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Ran node --version</UiTraceTitle>
          </UiTraceLine>
        </UiTraceCollapsibleTrigger>
        <UiTraceCollapsibleContent>
          <UiCodeBlock size="sm">
            <UiCodeBlockContent wrap class="max-h-64">
              {{ output }}
            </UiCodeBlockContent>
          </UiCodeBlock>
        </UiTraceCollapsibleContent>
      </UiTraceCollapsible>
      <UiTraceCollapsible default-open>
        <UiTraceCollapsibleTrigger>
          <UiTraceLine status="error">
            <UiTraceIcon>
              <Icon name="lucide:terminal" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Failed to run pnpm dev</UiTraceTitle>
          </UiTraceLine>
        </UiTraceCollapsibleTrigger>
        <UiTraceCollapsibleContent>
          <UiCodeBlock size="sm" variant="destructive">
            <UiCodeBlockContent wrap class="max-h-64">
              {{ error }}
            </UiCodeBlockContent>
          </UiCodeBlock>
        </UiTraceCollapsibleContent>
      </UiTraceCollapsible>
    </UiTrace>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ node --version
v24.18.0`;

  const error = `$ pnpm dev
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`;
</script>
