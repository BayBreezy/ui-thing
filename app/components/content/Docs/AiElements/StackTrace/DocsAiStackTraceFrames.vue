<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <Icon name="lucide:circle-x" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Failed: {{ error }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-2">
        <p class="text-destructive font-mono text-xs">
          {{ error }}
        </p>
        <UiTrace>
          <a
            v-for="frame in appFrames"
            :key="frame.line"
            :href="`#${frame.file}:${frame.lineNumber}`"
          >
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:file-code" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ frame.name }} in {{ frame.file }}:{{ frame.lineNumber }}
              </UiTraceTitle>
            </UiTraceLine>
          </a>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine>
                <UiTraceIcon>
                  <Icon name="lucide:layers" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle> {{ internalFrames.length }} framework frames </UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <ol
                class="bg-muted flex flex-col gap-1 overflow-x-auto rounded-md p-3 font-mono text-xs"
              >
                <li v-for="frame in internalFrames" :key="frame.line" class="whitespace-nowrap">
                  {{ frame.line }}
                </li>
              </ol>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const STACK = `TypeError: Cannot read properties of undefined (reading 'total')
    at formatInvoice (app/utils/billing.ts:42:31)
    at setup (app/components/InvoiceRow.vue:18:12)
    at callWithErrorHandling (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:200:19)
    at setupStatefulComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7848:25)
    at setupComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7809:36)
    at mountComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5159:7)`;

  function parseFrame(line: string) {
    const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/);

    return {
      line,
      name: match?.[1],
      file: match?.[2],
      lineNumber: match?.[3],
      internal: line.includes("node_modules"),
    };
  }

  const [error, ...lines] = STACK.split("\n").map((line) => line.trim());
  const frames = lines.map(parseFrame);
  const appFrames = frames.filter((frame) => !frame.internal);
  const internalFrames = frames.filter((frame) => frame.internal);
</script>
