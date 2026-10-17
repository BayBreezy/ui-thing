<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          Terminal
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="plain" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent wrap>
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm test
\x1B[32m✓\x1B[39m src/format.test.ts \x1B[2m(4 tests)\x1B[22m
\x1B[32m✓\x1B[39m src/parse.test.ts \x1B[2m(7 tests)\x1B[22m
\x1B[31m✗\x1B[39m src/stream.test.ts \x1B[2m(3 tests | 1 failed)\x1B[22m

\x1B[31mAssertionError: expected 'hello' to be 'hello world'\x1B[39m

Tests  \x1B[31m1 failed\x1B[39m | \x1B[32m13 passed\x1B[39m (14)`;

  // eslint-disable-next-line no-control-regex
  const plain = output.replace(/\x1B\[[\d;]*m/g, "");

  const lines = useHighlightedCode(output, "ansi");
</script>
