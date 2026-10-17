<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          Terminal
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiButton
            variant="ghost"
            size="icon-xs"
            aria-label="Wrap lines"
            :aria-pressed="wrap"
            class="aria-pressed:text-foreground"
            @click="toggleWrap()"
          >
            <Icon name="lucide:text-wrap" class="size-4" />
          </UiButton>
          <UiButton
            variant="ghost"
            size="icon-xs"
            aria-label="Download"
            @click="download(output, 'lint.log')"
          >
            <Icon name="lucide:download" class="size-4" />
          </UiButton>
          <UiCodeBlockCopyButton :value="output" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent :wrap="wrap">
        {{ output }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm lint
app/components/MessageList.vue
  18:22  error    'messages' is possibly 'undefined'. Add a guard before calling map  ts/no-unsafe-call
  42:7   warning  'scrollToBottom' is assigned a value but never used  unused-imports/no-unused-vars

✖ 2 problems (1 error, 1 warning)`;

  const [wrap, toggleWrap] = useToggle(true);

  function download(value: string, filename: string) {
    const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>
