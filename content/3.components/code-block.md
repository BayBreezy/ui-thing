---
title: Code Block
description: Displays code, terminal output and diffs with a header, line numbers, syntax highlighting and a copy button.
label: New
links:
  - title: Shiki
    href: https://shiki.style
    icon: lucide:highlighter
---

## Credits

Shout out to [Shadcn Vue](https://www.shadcn-vue.com/docs/components/code-block) for the original `CodeBlock`. This version adds a `code` + `language` shortcut, themes, line highlight props, automatic diffs, a built-in show more, download and wrap buttons, more languages, and `success` / `warning` variants.

## Source code

Click :SourceCodeLink{component="CodeBlock"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add code-block"}

This installs [Shiki](https://shiki.style) and two helpers next to the component: `useHighlightedCode` (a composable) and `code-highlighter.ts` (a util). `CodeBlock` uses the `scroll-fade` utility, so add it if you have not yet: [Scroll Fade](/utilities/scroll-fade).

## About

`UiCodeBlock` displays code, terminal output, logs and diffs. It has a header with a title and actions, line numbers, wrapping, diff and highlighted lines, and a small size for tool output in a [Trace](/components/trace).

Syntax highlighting is lazy. Shiki and each language load the first time they are used, so a block that only shows plain output stays small.

::prose-show-case

:DocsCodeBlockDemo

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockDemo.vue" code lang="vue" -->

```vue [DocsCodeBlockDemo.vue]
<template>
  <div class="mx-auto w-full max-w-lg">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:file-code" class="size-4" />
          server/api/chat.post.ts
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
            @click="download(code, 'chat.post.ts')"
          >
            <Icon name="lucide:download" class="size-4" />
          </UiButton>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent :wrap="wrap" line-numbers>
        <UiCodeBlockLine
          v-for="(line, index) in lines"
          :key="index"
          :variant="index >= 5 && index <= 9 ? 'highlighted' : 'default'"
        >
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`;

  const [wrap, toggleWrap] = useToggle(false);
  const lines = useHighlightedCode(code, "ts");

  function download(value: string, filename: string) {
    const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>
```

<!-- /automd -->

::

## Usage

Set `code`, `language` and `filename` on the root. The title, content, copy and download parts read them, so you do not repeat them on each part.

::prose-show-case

:DocsCodeBlockQuick

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockQuick.vue" code lang="vue" -->

```vue [DocsCodeBlockQuick.vue]
<template>
  <div class="mx-auto w-full max-w-lg">
    <UiCodeBlock :code="code" language="ts" filename="server/api/chat.post.ts">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle icon="lucide:file-code" />
        <UiCodeBlockActions>
          <UiCodeBlockDownloadButton />
          <UiCodeBlockCopyButton />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  // `code`, `language` and `filename` are set once on the root. The title, content, copy and download
  // parts read them.
  const code = `import { streamText } from "ai";

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  });

  return result.toUIMessageStreamResponse();
});`;
</script>
```

<!-- /automd -->

::

Or put plain text in `UiCodeBlockContent` and pass `value` to the copy button yourself:

```vue
<template>
  <UiCodeBlock>
    <UiCodeBlockHeader>
      <UiCodeBlockTitle>Terminal</UiCodeBlockTitle>
      <UiCodeBlockActions>
        <UiCodeBlockCopyButton :value="output" />
      </UiCodeBlockActions>
    </UiCodeBlockHeader>
    <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
  </UiCodeBlock>
</template>

<script lang="ts" setup>
  const output = `$ pnpm add ai @ai-sdk/vue zod
Done in 2.8s using pnpm v10.18.0`;
</script>
```

## Composition

```sh
UiCodeBlock
├── UiCodeBlockHeader
│   ├── UiCodeBlockTitle
│   └── UiCodeBlockActions
│       ├── UiCodeBlockWrapButton
│       ├── UiCodeBlockDownloadButton
│       └── UiCodeBlockCopyButton
├── UiCodeBlockActions (floating, when there is no header)
├── UiCodeBlockContent
│   └── UiCodeBlockLine
│       └── UiCodeBlockToken
└── UiCodeBlockFooter
    └── UiCodeBlockExpandButton
```

`UiCodeBlockContent` highlights `code` for you, or takes plain text, or a list of `UiCodeBlockLine`. Use lines when you want full control over each line and token.

## Features

- **It streams cheaply.** Plain text in the slot renders as one text node, and the highlighter tokenizes only the new lines as code arrives.
- **It copies cleanly.** Line numbers and diff markers are left out of a selection, and blank lines survive the copy.
- **It reads left to right.** The content is always `dir="ltr"`. The header follows the page direction.
- **It highlights without WASM.** Shiki's JavaScript engine, 30+ languages loaded on first use, ANSI colors for terminal output, and 11 themes. Add more with `registerCodeLanguage` and `registerCodeTheme`.
- **It does the common things for you.** `highlight-lines`, automatic `diff`, `max-lines` with an expand button, a wrap toggle, a download button.
- **It fits where code shows up.** Use it in a message, a Markdown fence, a Trace line, Tabs, a Dialog or a `typeset` container.
- **It scrolls by keyboard.** The content is focusable, and floating actions show on focus as well as on hover.
- **Four tones.** `default`, `destructive`, `success` and `warning`.

## Basic

Put plain text in `UiCodeBlockContent`. It renders as one text node, so it stays cheap while output streams.

::prose-show-case

:DocsCodeBlockBasic

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockBasic.vue" code lang="vue" -->

```vue [DocsCodeBlockBasic.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm build
> nuxt build

 ✔ Client built in 4215ms
 ✔ Server built in 1803ms

Route                      Size  Gzip
┌ ○ /                    1.9 kB  0.9 kB
├ ○ /about               993 B   0.5 kB
└ ƒ /api/chat            141 B   0.1 kB`;
</script>
```

<!-- /automd -->

::

## Header

`UiCodeBlockHeader` holds a `UiCodeBlockTitle` and `UiCodeBlockActions`. `UiCodeBlockCopyButton` copies its `value`.

::prose-show-case

:DocsCodeBlockHeader

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockHeader.vue" code lang="vue" -->

```vue [DocsCodeBlockHeader.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          Terminal
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="command" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const command = "pnpm add ai @ai-sdk/vue zod";

  const output = `$ ${command}
Packages: +14
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`;
</script>
```

<!-- /automd -->

::

A long title truncates. Give the title an `icon` and `text`, or put your own markup in its slot. To link the title to a file, wrap `UiCodeBlockTitle` in an anchor.

```vue
<template>
  <UiCodeBlockHeader>
    <a href="/files/chat.post.ts">
      <UiCodeBlockTitle icon="lucide:file-code" text="server/api/chat.post.ts" />
    </a>
  </UiCodeBlockHeader>
</template>
```

## Actions

`UiCodeBlockActions` holds any number of buttons. Drop in `UiCodeBlockCopyButton`, `UiCodeBlockDownloadButton`, `UiCodeBlockWrapButton`, or your own.

::prose-show-case

:DocsCodeBlockActions

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockActions.vue" code lang="vue" -->

```vue [DocsCodeBlockActions.vue]
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
```

<!-- /automd -->

::

### Wrap, download and copy buttons

The buttons read what they need from the surrounding `UiCodeBlock`. Bind `v-model:wrap` on the root and the wrap button toggles it. The download button saves `code` as `filename`, and the copy button copies `code`.

::prose-show-case

:DocsCodeBlockToolbar

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockToolbar.vue" code lang="vue" -->

```vue [DocsCodeBlockToolbar.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <!-- v-model:wrap is shared with the wrap button and the content -->
    <UiCodeBlock v-model:wrap="wrap" :code="output" filename="install.log">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle icon="lucide:terminal" text="Terminal" />
        <UiCodeBlockActions>
          <UiCodeBlockWrapButton />
          <UiCodeBlockDownloadButton />
          <UiCodeBlockCopyButton />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
      <UiCodeBlockFooter class="text-xs">Wrapping is {{ wrap ? "on" : "off" }}</UiCodeBlockFooter>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const wrap = ref(false);

  const output = `$ pnpm add ai @ai-sdk/vue zod @ai-sdk/anthropic @ai-sdk/openai @ai-sdk/google
Packages: +42
Progress: resolved 128, reused 120, downloaded 8, added 42, done
Done in 2.8s using pnpm v10.18.0`;
</script>
```

<!-- /automd -->

::

## Floating Actions

Without a header, put `UiCodeBlockActions` directly inside `UiCodeBlock`. The actions float at the top end and stay hidden until the block is hovered or focused. They always show on touch screens.

::prose-show-case

:DocsCodeBlockFloatingActions

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockFloatingActions.vue" code lang="vue" -->

```vue [DocsCodeBlockFloatingActions.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockActions>
        <UiCodeBlockCopyButton :value="output" />
      </UiCodeBlockActions>
      <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm add ai @ai-sdk/vue zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/vue 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`;
</script>
```

<!-- /automd -->

::

## Line Numbers

Add `line-numbers` to `UiCodeBlockContent`. Plain text in the slot is split into lines, and the numbers are not copied with a selection.

::prose-show-case

:DocsCodeBlockLineNumbers

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockLineNumbers.vue" code lang="vue" -->

```vue [DocsCodeBlockLineNumbers.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockContent line-numbers>
        {{ code }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build"
  }
}`;
</script>
```

<!-- /automd -->

::

## Start Line

Set `start-line` to number lines from a given line, for a snippet from the middle of a file. The gutter grows to fit the widest number.

::prose-show-case

:DocsCodeBlockStartLine

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockStartLine.vue" code lang="vue" -->

```vue [DocsCodeBlockStartLine.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>server/api/projects.get.ts</UiCodeBlockTitle>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers :start-line="995">
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `  if (!session) {
    throw createError({ statusCode: 401 })
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return projects
})`;

  const lines = useHighlightedCode(code, "ts");
</script>
```

<!-- /automd -->

::

## Wrap

Long lines scroll by default. Add `wrap` to wrap them, which suits tool output and error messages. To let the reader toggle it, see [the wrap button](#wrap-download-and-copy-buttons).

::prose-show-case

:DocsCodeBlockWrap

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockWrap.vue" code lang="vue" -->

```vue [DocsCodeBlockWrap.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <UiCodeBlock>
      <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
    </UiCodeBlock>
    <UiCodeBlock>
      <UiCodeBlockContent wrap>
        {{ output }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `Error: The model "anthropic/claude-sonnet-4.5" returned an error: Request too large. The prompt is 212,431 tokens and the context window is 200,000 tokens. Remove some messages or summarize the conversation and try again.`;
</script>
```

<!-- /automd -->

::

## Highlighted Lines

Pass `highlight-lines` to `UiCodeBlockContent` with numbers or ranges such as `"17-18"`. The numbers are the ones shown in the gutter, so they follow `start-line`.

::prose-show-case

:DocsCodeBlockHighlightProps

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockHighlightProps.vue" code lang="vue" -->

```vue [DocsCodeBlockHighlightProps.vue]
<template>
  <div class="mx-auto w-full max-w-lg">
    <!-- Numbers or ranges, using the line numbers you see (here they start at 12) -->
    <UiCodeBlock :code="code" language="ts">
      <UiCodeBlockContent line-numbers :start-line="12" :highlight-lines="[14, '17-18']" />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `const result = streamText({
  model: "anthropic/claude-sonnet-4.5",
  messages: convertToModelMessages(messages),
  tools: {
    weather: tool({
      description: "Get the weather in a location",
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => getWeather(location),
    }),
  },
});`;
</script>
```

<!-- /automd -->

::

To control each line yourself, render every line as a `UiCodeBlockLine` and set `variant="highlighted"` on the lines to call out.

::prose-show-case

:DocsCodeBlockHighlightedLines

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockHighlightedLines.vue" code lang="vue" -->

```vue [DocsCodeBlockHighlightedLines.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockContent line-numbers>
        <UiCodeBlockLine
          v-for="(line, index) in code.split('\n')"
          :key="index"
          :variant="highlighted.includes(index) ? 'highlighted' : 'default'"
        >
          {{ line }}
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
    typedPages: true,
  },
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
})`;

  const highlighted = [2, 3];
</script>
```

<!-- /automd -->

::

## Diff

With `language="diff"` (or `:diff="true"` for any language) lines that start with `+` are marked as added and lines that start with `-` as removed. The `+` and `-` stay in the text, so a copied selection is still a valid diff.

::prose-show-case

:DocsCodeBlockDiffAuto

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockDiffAuto.vue" code lang="vue" -->

```vue [DocsCodeBlockDiffAuto.vue]
<template>
  <div class="mx-auto w-full max-w-lg">
    <!-- The `diff` language turns on `diff` automatically. Set `:diff="true"` for any other language. -->
    <UiCodeBlock :code="code" language="diff">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="package.json" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `  "dependencies": {
-   "ai": "^4.3.0",
+   "ai": "^5.0.0",
+   "@ai-sdk/vue": "^2.0.0",
    "zod": "^4.0.0"
  }`;
</script>
```

<!-- /automd -->

::

To build the diff yourself, set `variant="added"` or `variant="removed"` on a `UiCodeBlockLine`. Each one adds a `+` or `−` marker.

::prose-show-case

:DocsCodeBlockDiff

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockDiff.vue" code lang="vue" -->

```vue [DocsCodeBlockDiff.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>components/Greeting.vue</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="patch" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent>
        <UiCodeBlockLine
          v-for="(line, index) in patch.split('\n')"
          :key="index"
          :variant="getVariant(line)"
        >
          {{ line.slice(1) }}
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const patch = ` <template>
-  <p>Hello, {{ name }}</p>
+  <p class="text-sm text-muted-foreground">
+    Hello, {{ name }}!
+  </p>
 </template>`;

  function getVariant(line: string) {
    if (line.startsWith("+")) return "added";

    if (line.startsWith("-")) return "removed";

    return "default";
  }
</script>
```

<!-- /automd -->

::

## Height

Cap the height with a `max-h-*` class on `UiCodeBlockContent`. The content scrolls inside the block.

::prose-show-case

:DocsCodeBlockHeight

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockHeight.vue" code lang="vue" -->

```vue [DocsCodeBlockHeight.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>Logs</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="logs" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent class="scroll-fade-y max-h-48">
        {{ logs }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const logs = Array.from(
    { length: 40 },
    (_, index) =>
      `[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`
  ).join("\n");
</script>
```

<!-- /automd -->

::

`UiCodeBlockContent` fades its edges with [`scroll-fade`](/utilities/scroll-fade) as it scrolls: left and right by default, top and bottom when it wraps. Add `scroll-fade-y` to a capped block that does not wrap.

## Show More

Set `max-lines` on the root to show only that many lines until the block is expanded. `UiCodeBlockExpandButton` toggles `v-model:expanded` and only renders when there is something to expand.

::prose-show-case

:DocsCodeBlockExpandable

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockExpandable.vue" code lang="vue" -->

```vue [DocsCodeBlockExpandable.vue]
<template>
  <div class="mx-auto w-full max-w-lg">
    <UiCodeBlock :code="code" language="vue" :max-lines="8">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="components/Chat.vue" />
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers />
      <!-- Only rendered when the code has more lines than `max-lines` -->
      <UiCodeBlockFooter class="justify-center">
        <UiCodeBlockExpandButton />
      </UiCodeBlockFooter>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const code = `<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">
          {{ part.text }}
        </p>
      </template>
    </div>
    <form @submit.prevent="onSubmit">
      <UiInput v-model="input" />
      <UiButton :disabled="chat.status !== 'ready'">Send</UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Chat } from "@ai-sdk/vue";

const input = ref("");
const chat = new Chat({});

function onSubmit() {
  chat.sendMessage({ text: input.value });
  input.value = "";
}
<\/script>`;
</script>
```

<!-- /automd -->

::

### Build it yourself

`UiCodeBlockFooter` is a slot below the content. To control it yourself, cap the content while it is collapsed and put a ghost `xs` button in the footer.

::prose-show-case

:DocsCodeBlockShowMore

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockShowMore.vue" code lang="vue" -->

```vue [DocsCodeBlockShowMore.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>components/Chat.vue</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent
        :id="id"
        line-numbers
        :class="expanded ? undefined : 'scroll-fade-y max-h-64 overflow-y-hidden'"
      >
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
      <UiCodeBlockFooter class="justify-center">
        <UiButton
          variant="ghost"
          size="xs"
          :aria-expanded="expanded"
          :aria-controls="id"
          @click="toggleExpanded()"
        >
          <Icon
            name="lucide:chevron-down"
            class="size-4 transition-transform in-aria-expanded:rotate-180"
          />
          {{ expanded ? "Show less" : "Show more" }}
        </UiButton>
      </UiCodeBlockFooter>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const code = `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"

const input = ref("")
const chat = new Chat({})

function onSubmit() {
  chat.sendMessage({ text: input.value })
  input.value = ""
}
<\/script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">
          {{ part.text }}
        </p>
      </template>
    </div>
    <form @submit.prevent="onSubmit">
      <UiInput v-model="input" />
      <UiButton :disabled="chat.status !== 'ready'">
        Send
      </UiButton>
    </form>
  </div>
</template>`;

  const [expanded, toggleExpanded] = useToggle(false);
  const lines = useHighlightedCode(code, "vue");
  const id = useId();
</script>
```

<!-- /automd -->

::

### Max Height

To keep a long block from taking over the page, raise the cap instead of removing it. The expanded content scrolls, and the edges fade as you scroll.

::prose-show-case

:DocsCodeBlockShowMoreScroll

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockShowMoreScroll.vue" code lang="vue" -->

```vue [DocsCodeBlockShowMoreScroll.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>components/Chat.vue</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent
        :id="id"
        line-numbers
        :class="expanded ? 'scroll-fade-y max-h-96' : 'scroll-fade-y max-h-64 overflow-y-hidden'"
      >
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
      <UiCodeBlockFooter class="justify-center">
        <UiButton
          variant="ghost"
          size="xs"
          :aria-expanded="expanded"
          :aria-controls="id"
          @click="toggleExpanded()"
        >
          <Icon
            name="lucide:chevron-down"
            class="size-4 transition-transform in-aria-expanded:rotate-180"
          />
          {{ expanded ? "Show less" : "Show more" }}
        </UiButton>
      </UiCodeBlockFooter>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const code = `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"

const input = ref("")
const chat = new Chat({})

function onSubmit() {
  chat.sendMessage({ text: input.value })
  input.value = ""
}
<\/script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">
          {{ part.text }}
        </p>
      </template>
    </div>
    <form @submit.prevent="onSubmit">
      <UiInput v-model="input" />
      <UiButton :disabled="chat.status !== 'ready'">
        Send
      </UiButton>
    </form>
  </div>
</template>`;

  const [expanded, toggleExpanded] = useToggle(false);
  const lines = useHighlightedCode(code, "vue");
  const id = useId();
</script>
```

<!-- /automd -->

::

## Size

Use `size="sm"` for tool and [Trace](#trace) output. It has tighter padding and `text-xs` text.

::prose-show-case

:DocsCodeBlockSize

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockSize.vue" code lang="vue" -->

```vue [DocsCodeBlockSize.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          Terminal
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="output" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent wrap>
        {{ output }}
      </UiCodeBlockContent>
    </UiCodeBlock>
    <UiCodeBlock size="sm">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          Terminal
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="output" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent wrap>
        {{ output }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm add ai @ai-sdk/vue zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`;
</script>
```

<!-- /automd -->

::

## Variants

`variant` sets the tone of the block: `default`, `destructive`, `success` and `warning`. Use `destructive` for errors and failed output.

::prose-show-case

:DocsCodeBlockVariants

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockVariants.vue" code lang="vue" -->

```vue [DocsCodeBlockVariants.vue]
<template>
  <div class="mx-auto grid w-full max-w-md gap-3">
    <UiCodeBlock v-for="v in variants" :key="v.variant" :variant="v.variant" size="sm">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle :icon="v.icon" :text="v.title" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent>{{ v.output }}</UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  import type { CodeBlockVariant } from "~/components/Ui/CodeBlock/CodeBlock.vue";

  const variants: { variant: CodeBlockVariant; title: string; icon: string; output: string }[] = [
    { variant: "default", title: "Output", icon: "lucide:terminal", output: "Done in 2.8s" },
    {
      variant: "success",
      title: "Passed",
      icon: "lucide:circle-check",
      output: "Tests  42 passed (42)",
    },
    {
      variant: "warning",
      title: "Warnings",
      icon: "lucide:triangle-alert",
      output: "2 warnings: unused variable `props`",
    },
    {
      variant: "destructive",
      title: "Failed",
      icon: "lucide:circle-alert",
      output: "ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with frozen-lockfile",
    },
  ];
</script>
```

<!-- /automd -->

::

::prose-show-case

:DocsCodeBlockDestructive

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockDestructive.vue" code lang="vue" -->

```vue [DocsCodeBlockDestructive.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock variant="destructive">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>Error</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="error" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent wrap>
        {{ error }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at setup (components/MessageList.vue:18:22)
    at callWithErrorHandling (runtime-core.esm-bundler.js:199:19)`;
</script>
```

<!-- /automd -->

::

## Trace

Put a `UiCodeBlock` with `size="sm"` in `UiTraceCollapsibleContent` for tool and terminal output. Add `wrap` and a `max-h-64` class to `UiCodeBlockContent` so long output wraps and scrolls inside the trace. The block sets its own text color, so `UiTraceCollapsibleContent` does not mute it.

::prose-show-case

:DocsCodeBlockTrace

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockTrace.vue" code lang="vue" -->

```vue [DocsCodeBlockTrace.vue]
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
```

<!-- /automd -->

::

## Tabs

Show several files with [Tabs](/components/tabs), one `UiCodeBlock` in each `UiTabsContent`.

::prose-show-case

:DocsCodeBlockTabs

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockTabs.vue" code lang="vue" -->

```vue [DocsCodeBlockTabs.vue]
<template>
  <UiTabs default-value="route" class="mx-auto w-full max-w-md">
    <UiTabsList>
      <UiTabsTrigger v-for="file in files" :key="file.id" :value="file.id">
        {{ file.title.split("/").at(-1) }}
      </UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent v-for="(file, index) in files" :key="file.id" :value="file.id">
      <UiCodeBlock>
        <UiCodeBlockHeader>
          <UiCodeBlockTitle>{{ file.title }}</UiCodeBlockTitle>
          <UiCodeBlockActions>
            <UiCodeBlockCopyButton :value="file.code" />
          </UiCodeBlockActions>
        </UiCodeBlockHeader>
        <UiCodeBlockContent line-numbers>
          <UiCodeBlockLine v-for="(line, i) in highlighted[index]?.value" :key="i">
            <UiCodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
          </UiCodeBlockLine>
        </UiCodeBlockContent>
      </UiCodeBlock>
    </UiTabsContent>
  </UiTabs>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const files = [
    {
      id: "route",
      title: "server/api/chat.post.ts",
      language: "ts",
      code: `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
})`,
    },
    {
      id: "chat",
      title: "components/Chat.vue",
      language: "vue",
      code: `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"

const chat = new Chat({})
<\/script>

<template>
  <MessageList :messages="chat.messages" />
</template>`,
    },
    {
      id: "env",
      title: ".env",
      language: "bash",
      code: "AI_GATEWAY_API_KEY=your-api-key",
    },
  ];

  const highlighted = files.map((file) => useHighlightedCode(file.code, file.language));
</script>
```

<!-- /automd -->

::

## Message

Put a `UiCodeBlock` between paragraphs inside a [Message](/components/message).

::prose-show-case

:DocsCodeBlockChat

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockChat.vue" code lang="vue" -->

```vue [DocsCodeBlockChat.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble variant="muted">
          <UiBubbleContent>How do I stream a response?</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage>
      <UiMessageContent class="gap-3">
        <p>Create a server route that returns the stream:</p>
        <UiCodeBlock>
          <UiCodeBlockHeader>
            <UiCodeBlockTitle>server/api/chat.post.ts</UiCodeBlockTitle>
            <UiCodeBlockActions>
              <UiCodeBlockCopyButton :value="code" />
            </UiCodeBlockActions>
          </UiCodeBlockHeader>
          <UiCodeBlockContent>
            <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
              <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
            </UiCodeBlockLine>
          </UiCodeBlockContent>
        </UiCodeBlock>
        <p>The client reads it with Chat from @ai-sdk/vue.</p>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup>
  const code = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`;

  const lines = useHighlightedCode(code, "ts");
</script>
```

<!-- /automd -->

::

## Typeset

A `UiCodeBlock` inside a `typeset` container keeps its own styles and gets the same space above as a paragraph.

::prose-show-case

:DocsCodeBlockTypeset

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockTypeset.vue" code lang="vue" -->

```vue [DocsCodeBlockTypeset.vue]
<template>
  <div class="typeset mx-auto w-full max-w-md">
    <h3>Stream a response</h3>
    <p>
      Create a server route that calls <code>streamText</code> and returns the stream to the client.
    </p>
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:file-code" class="size-4" />
          server/api/chat.post.ts
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers>
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
    <p>
      The <code>Chat</code> class from <code>@ai-sdk/vue</code> reads the stream on the client and
      renders the answer while it is written.
    </p>
  </div>
</template>

<script lang="ts" setup>
  const code = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
})`;

  const lines = useHighlightedCode(code, "ts");
</script>
```

<!-- /automd -->

::

## RTL

Code always reads left to right. The header follows the page direction.

::prose-show-case

:DocsCodeBlockRtl

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockRtl.vue" code lang="vue" -->

```vue [DocsCodeBlockRtl.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-3 text-sm" dir="rtl">
    <p>ثبّت الحزم، ثم شغّل خادم التطوير.</p>
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          الطرفية
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers>
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `pnpm add ai @ai-sdk/vue zod
pnpm dev`;

  const lines = useHighlightedCode(code, "bash");
</script>
```

<!-- /automd -->

::

## Syntax Highlighting

Set `language` and `code` and the content highlights itself. For full control, `useHighlightedCode` highlights with [Shiki](https://shiki.style) and returns a computed list of lines. Each line is a list of tokens, which you render with `UiCodeBlockToken` inside a `UiCodeBlockLine`.

::prose-show-case

:DocsCodeBlockHighlighting

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockHighlighting.vue" code lang="vue" -->

```vue [DocsCodeBlockHighlighting.vue]
<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>getWeather output</UiCodeBlockTitle>
      </UiCodeBlockHeader>
      <UiCodeBlockContent>
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `{
  "location": "San Francisco",
  "temperature": 18,
  "unit": "celsius",
  "conditions": ["fog", "wind"]
}`;

  const lines = useHighlightedCode(code, "json");
</script>
```

<!-- /automd -->

::

```vue
<template>
  <UiCodeBlock>
    <UiCodeBlockContent>
      <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
        <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </UiCodeBlockLine>
    </UiCodeBlockContent>
  </UiCodeBlock>
</template>

<script lang="ts" setup>
  const lines = useHighlightedCode(code, "json");
</script>
```

Both arguments accept a plain value, a ref or a getter, so the lines update when the code or the language changes. The optional third argument takes the themes:

```ts
const props = defineProps<{ code: string; language: string }>();

const lines = useHighlightedCode(
  () => props.code,
  () => props.language
);
```

Shiki uses its JavaScript regex engine, so there is no WASM to load.

### Languages

Each language loads the first time it is used. A language that is not registered renders as plain text.

::prose-show-case

:DocsCodeBlockLanguages

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockLanguages.vue" code lang="vue" -->

```vue [DocsCodeBlockLanguages.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <UiCodeBlock v-for="(sample, index) in samples" :key="sample.language">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>{{ sample.title }}</UiCodeBlockTitle>
      </UiCodeBlockHeader>
      <UiCodeBlockContent>
        <UiCodeBlockLine v-for="(line, i) in highlighted[index]?.value" :key="i">
          <UiCodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const samples = [
    {
      language: "css",
      title: "assets/css/main.css",
      code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
    },
    {
      language: "python",
      title: "main.py",
      code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
    },
    {
      language: "text",
      title: "notes.txt",
      code: "A language that is not in the list renders as plain text.",
    },
  ];

  const highlighted = samples.map((sample) => useHighlightedCode(sample.code, sample.language));
</script>
```

<!-- /automd -->

::

The list ships with `astro`, `bash`, `c`, `cpp`, `csharp`, `css`, `dart`, `diff`, `docker`, `go`, `graphql`, `html`, `ini`, `java`, `javascript`, `json`, `jsonc`, `jsx`, `kotlin`, `lua`, `markdown`, `php`, `powershell`, `prisma`, `python`, `ruby`, `rust`, `scss`, `sql`, `svelte`, `swift`, `toml`, `tsx`, `typescript`, `vue`, `xml` and `yaml`, plus aliases such as `ts`, `js`, `sh`, `yml`, `py` and `rs`.

To add another language, register a Shiki language module once, for example in a plugin:

```ts
registerCodeLanguage("zig", () => import("shiki/langs/zig.mjs"));
```

### Themes

Pass `themes` on the root (or on the content) with a light and a dark Shiki theme. The default is `github-light` and `github-dark`. Bundled: `catppuccin-latte`, `catppuccin-mocha`, `dracula`, `github-dark`, `github-light`, `min-dark`, `min-light`, `one-dark-pro`, `tokyo-night`, `vitesse-dark` and `vitesse-light`.

::prose-show-case

:DocsCodeBlockThemes

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockThemes.vue" code lang="vue" -->

```vue [DocsCodeBlockThemes.vue]
<template>
  <div class="mx-auto grid w-full max-w-lg gap-4">
    <UiCodeBlock
      :code="code"
      language="ts"
      :themes="{ light: 'vitesse-light', dark: 'vitesse-dark' }"
    >
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="vitesse" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
    </UiCodeBlock>

    <UiCodeBlock
      :code="code"
      language="ts"
      :themes="{ light: 'catppuccin-latte', dark: 'catppuccin-mocha' }"
    >
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="catppuccin" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value);

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay);
    onCleanup(() => clearTimeout(timeout));
  });

  return debounced;
}`;
</script>
```

<!-- /automd -->

::

Register another theme with `registerCodeTheme("nord", () => import("shiki/themes/nord.mjs"))` and use its name in `themes`.

### Terminal Output

Pass `"ansi"` as the language to render the colors in terminal output. Without it, escape codes show as text.

::prose-show-case

:DocsCodeBlockAnsi

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockAnsi.vue" code lang="vue" -->

```vue [DocsCodeBlockAnsi.vue]
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
```

<!-- /automd -->

::

ANSI colors do not carry from one line to the next.

### Server Rendering

`highlightCode` is async and returns the tokens of each line, or `null` for a language that is not registered. Call it from a server route or with `useAsyncData` so the tokens are part of the server-rendered HTML.

```vue
<template>
  <UiCodeBlock>
    <UiCodeBlockContent line-numbers>
      <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
        <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </UiCodeBlockLine>
    </UiCodeBlockContent>
  </UiCodeBlock>
</template>

<script lang="ts" setup>
  const props = defineProps<{ code: string }>();

  const { data: lines } = await useAsyncData(
    `code-${props.code}`,
    async () =>
      (await highlightCode(props.code, "ts")) ??
      props.code.split("\n").map((line) => (line ? [{ content: line }] : []))
  );
</script>
```

To highlight many snippets in a row, `loadHighlighter` loads a language once and returns a highlighter with a synchronous `highlight(code)` method. It returns `null` for a language that is not registered.

```ts
const highlighter = await loadHighlighter("ts");
const { lines } = highlighter?.highlight(code) ?? { lines: [] };
```

### Streaming

While the code streams, the composable tokenizes only the new lines, starting where the last line left off. Lines that did not change keep the same tokens, so Vue skips them.

::prose-show-case

:DocsCodeBlockStreaming

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockStreaming.vue" code lang="vue" -->

```vue [DocsCodeBlockStreaming.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <template v-for="(item, index) in streamed" :key="item.block.code">
      <UiCodeBlock v-if="length > offsets[index]!">
        <UiCodeBlockHeader v-if="item.block.title">
          <UiCodeBlockTitle>{{ item.block.title }}</UiCodeBlockTitle>
          <UiCodeBlockActions>
            <UiCodeBlockCopyButton
              :value="item.source.value"
              :disabled="item.code.value.length < item.block.code.length"
            />
          </UiCodeBlockActions>
        </UiCodeBlockHeader>
        <UiCodeBlockContent :line-numbers="item.block.lineNumbers">
          <UiCodeBlockLine
            v-for="(line, i) in item.lines.value"
            :key="i"
            :variant="getVariant(item, i)"
          >
            <UiCodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
          </UiCodeBlockLine>
        </UiCodeBlockContent>
      </UiCodeBlock>
    </template>
    <UiButton
      variant="outline"
      size="sm"
      class="self-start"
      :disabled="length < total"
      @click="replay"
    >
      <Icon name="lucide:rotate-ccw" class="size-4" />
      Replay
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const blocks: {
    title?: string;
    language: string;
    code: string;
    lineNumbers?: boolean;
    highlight?: number[];
    diff?: boolean;
  }[] = [
    {
      title: "composables/useDebounce.ts",
      language: "ts",
      lineNumbers: true,
      code: `export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value)

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay)
    onCleanup(() => clearTimeout(timeout))
  })

  return debounced
}`,
    },
    {
      language: "bash",
      code: "bunx ui-thing@latest add code-block",
    },
    {
      title: "components/Search.vue",
      language: "vue",
      lineNumbers: true,
      diff: true,
      code: ` <script setup lang="ts">
 const query = ref("")
-const results = useSearch(query)
+const debounced = useDebounce(query, 300)
+const results = useSearch(debounced)
 <\/script>

 <template>
   <SearchResults :results="results" />
 </template>`,
    },
    {
      title: "server/api/chat.post.ts",
      language: "ts",
      lineNumbers: true,
      highlight: [5, 6, 7, 8],
      code: `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`,
    },
    {
      title: ".env",
      language: "bash",
      code: "AI_GATEWAY_API_KEY=your-api-key",
    },
  ];

  // Where each block starts in the stream.
  const offsets = blocks.map((_, index) =>
    blocks.slice(0, index).reduce((total, block) => total + block.code.length, 0)
  );
  const total = blocks.reduce((sum, block) => sum + block.code.length, 0);

  const length = ref(total);

  const streamed = blocks.map((block, index) => {
    const code = computed(() => block.code.slice(0, Math.max(0, length.value - offsets[index]!)));
    const rows = computed(() => code.value.split("\n"));
    // A diff row starts with +, - or a space. The marker is not part of the code.
    const source = computed(() =>
      block.diff ? rows.value.map((row) => row.slice(1)).join("\n") : code.value
    );
    const lines = useHighlightedCode(source, block.language);

    return { block, code, rows, source, lines };
  });

  function getVariant(item: (typeof streamed)[number], index: number) {
    if (item.block.diff) {
      const row = item.rows.value[index];
      if (row?.startsWith("+")) return "added";
      if (row?.startsWith("-")) return "removed";
      return "default";
    }

    return item.block.highlight?.includes(index) ? "highlighted" : "default";
  }

  const { pause, resume } = useIntervalFn(
    () => {
      length.value += 3;
      if (length.value >= total) pause();
    },
    16,
    { immediate: false }
  );

  function replay() {
    length.value = 0;
    resume();
  }
</script>
```

<!-- /automd -->

::

### Markdown

Fenced code in a Markdown message renders well as a `UiCodeBlock`. Split the text into blocks, render the fences with a `UiCodeBlock` and the rest with your Markdown renderer. While the message streams, the last fence may not be closed yet, so disable the copy button on it.

::prose-show-case

:DocsCodeBlockMarkdown

#code

<!-- automd:file src="../../app/components/content/Docs/CodeBlock/DocsCodeBlockMarkdown.vue" code lang="vue" -->

```vue [DocsCodeBlockMarkdown.vue]
<template>
  <div class="mx-auto flex min-h-112 w-full max-w-md flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ message.text }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent>
          <DocsAiMarkdown :value="message.text" :streaming="busy && message === messages.at(-1)" />
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton v-if="!busy" variant="outline" size="sm" class="mt-auto self-start" @click="replay">
      Replay
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    text: string;
  }

  const question = "How do I debounce a search input in Vue?";

  const response = `Wrap the value in a \`useDebounce\` composable. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`ts
export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value);

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay);
    onCleanup(() => clearTimeout(timeout));
  });

  return debounced;
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`;

  const messages = ref<ChatMessage[]>([
    { id: "question", role: "user", text: question },
    { id: "answer", role: "assistant", text: response },
  ]);

  // Stream the answer a word at a time.
  const chunks = response.split(/(?<=\s)/);
  let index = 0;

  const {
    pause,
    resume,
    isActive: busy,
  } = useIntervalFn(
    () => {
      if (index >= chunks.length) {
        pause();
        return;
      }

      messages.value = [
        messages.value[0]!,
        { id: "answer", role: "assistant", text: chunks.slice(0, ++index).join("") },
      ];
    },
    30,
    { immediate: false }
  );

  function replay() {
    index = 0;
    messages.value = [{ id: "question", role: "user", text: question }];
    resume();
  }
</script>
```

<!-- /automd -->

::

## Accessibility

- `UiCodeBlockContent` is a `pre` with a `code` element and always sets `dir="ltr"`, so code reads left to right on an RTL page.
- `UiCodeBlockContent` has `tabindex="0"`, so keyboard users can focus it and scroll it. Pass `tabindex="-1"` to remove the tab stop.
- Floating actions show when focus is inside the block, not only on hover, so keyboard users can reach them.
- Line numbers are hidden from screen readers.
- Diff lines carry a `+` or `−` marker as well as a tint, so the change does not rely on color.
- `UiCodeBlockCopyButton` is labelled "Copy", and a polite live region announces "Copied" after a successful copy.
- `UiCodeBlockWrapButton` sets `aria-pressed` and `UiCodeBlockExpandButton` sets `aria-expanded`, so their state is announced.
- Every button takes a `label` (or `expand-text` / `collapse-text`) so you can translate the accessible names.

## API Reference

The layout parts (block, header, title, actions, footer) are built on a Reka `Primitive`, so `as` and `as-child` work on them. The buttons accept `as`. Every part accepts `class`.

### UiCodeBlock

The surface that holds the header, the content and the footer. It also shares its `code`, `language`, `filename`, `themes`, `wrap` and `expanded` state with the parts inside it.

| Prop / Model      | Type                                                  | Default     | Description                                                                |
| ----------------- | ----------------------------------------------------- | ----------- | -------------------------------------------------------------------------- |
| `variant`         | `"default" \| "destructive" \| "success" \| "warning"` | `"default"` | The tone of the block.                                                     |
| `size`            | `"default" \| "sm"`                                   | `"default"` | `"sm"` has tighter padding and `text-xs` code, for tool output.            |
| `code`            | `string`                                              | -           | The code. The content, copy and download parts fall back to it.            |
| `language`        | `string`                                              | -           | The language of `code`.                                                    |
| `filename`        | `string`                                              | -           | The name used by the download button.                                      |
| `themes`          | `{ light: string; dark: string }`                     | GitHub      | The Shiki themes for light and dark mode.                                  |
| `max-lines`       | `number`                                              | -           | Show only this many lines until expanded.                                  |
| `v-model:wrap`    | `boolean`                                             | `false`     | Wrap long lines. Shared with the wrap button and the content.              |
| `v-model:expanded`| `boolean`                                             | `false`     | Whether the block is expanded. Shared with the expand button.              |
| `as`              | `string \| Component`                                 | `"div"`     | The element to render.                                                     |
| `class`           | `string`                                              | -           | Additional classes to apply to the block.                                  |

### UiCodeBlockHeader

A row above the content for a title and actions.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the header. |

### UiCodeBlockTitle

A filename or a label, with an optional icon. It truncates.

| Prop    | Type     | Default | Description                                   |
| ------- | -------- | ------- | --------------------------------------------- |
| `text`  | `string` | `filename` | The title. Used when the default slot is empty. Falls back to the `filename` of `UiCodeBlock`. |
| `icon`  | `string` | -       | An Iconify icon shown before the text.        |
| `class` | `string` | -       | Additional classes to apply to the title.     |

### UiCodeBlockActions

Holds buttons at the end of the header. As a direct child of `UiCodeBlock`, it floats.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the actions. |

### UiCodeBlockCopyButton

A ghost icon button that copies `value` to the clipboard. It accepts the props of [`UiButton`](/components/button).

| Prop / Event  | Type                     | Default     | Description                                                         |
| ------------- | ------------------------ | ----------- | ------------------------------------------------------------------- |
| `value`       | `string`                 | `code`      | The text to copy. Falls back to the `code` of `UiCodeBlock`.        |
| `variant`     | `string`                 | `"ghost"`   | The variant of the button.                                          |
| `size`        | `string`                 | `"icon-xs"` | The size of the button.                                             |
| `timeout`     | `number`                 | `2000`      | How long, in milliseconds, the copied state lasts.                  |
| `label`       | `string`                 | `"Copy"`    | The accessible name.                                                |
| `copied-label`| `string`                 | `"Copied"`  | The accessible name and announcement after copying.                 |
| `copy`        | `(text: string) => void` | -           | Emitted after the text was copied.                                  |
| `class`       | `string`                 | -           | Additional classes to apply to the button.                          |

The default slot receives `{ copied }` to replace the icon.

### UiCodeBlockDownloadButton

Saves text as a file. It accepts the props of `UiButton`.

| Prop / Event | Type                         | Default       | Description                                                      |
| ------------ | ---------------------------- | ------------- | ---------------------------------------------------------------- |
| `value`      | `string`                     | `code`        | The text to save. Falls back to the `code` of `UiCodeBlock`.     |
| `filename`   | `string`                     | `filename`    | The file name. Falls back to the `filename` of `UiCodeBlock`.    |
| `variant`    | `string`                     | `"ghost"`     | The variant of the button.                                       |
| `size`       | `string`                     | `"icon-xs"`   | The size of the button.                                          |
| `label`      | `string`                     | `"Download"`  | The accessible name.                                             |
| `download`   | `(filename: string) => void` | -             | Emitted after the download was started.                          |

### UiCodeBlockWrapButton

A toggle for the `wrap` state of the surrounding `UiCodeBlock`. It sets `aria-pressed`.

| Prop      | Type     | Default                    | Description                        |
| --------- | -------- | -------------------------- | ---------------------------------- |
| `variant` | `string` | `"ghost"`                  | The variant of the button.         |
| `size`    | `string` | `"icon-xs"`                | The size of the button.            |
| `label`   | `string` | `"Toggle line wrapping"`   | The accessible name.               |

The default slot receives `{ wrap }`.

### UiCodeBlockExpandButton

Toggles the `expanded` state of the surrounding `UiCodeBlock`. It only renders when the code has more lines than `max-lines`.

| Prop            | Type     | Default       | Description                  |
| --------------- | -------- | ------------- | ---------------------------- |
| `variant`       | `string` | `"ghost"`     | The variant of the button.   |
| `size`          | `string` | `"xs"`        | The size of the button.      |
| `expand-text`   | `string` | `"Show more"` | The text while collapsed.    |
| `collapse-text` | `string` | `"Show less"` | The text while expanded.     |

The default slot receives `{ expanded }`.

### UiCodeBlockContent

The `pre` that scrolls or wraps.

| Prop              | Type                           | Default           | Description                                                                              |
| ----------------- | ------------------------------ | ----------------- | ---------------------------------------------------------------------------------------- |
| default slot      | -                              | -                 | Plain text, or a list of `UiCodeBlockLine`. Used when there is no `code`.                |
| `code`            | `string`                       | root `code`       | The code to render and highlight.                                                        |
| `language`        | `string`                       | root `language`   | The language of the code.                                                                |
| `themes`          | `{ light: string; dark: string }` | root `themes`  | The Shiki themes.                                                                        |
| `wrap`            | `boolean`                      | root `wrap`       | Wrap long lines instead of scrolling.                                                    |
| `line-numbers`    | `boolean`                      | `false`           | Number each line. Plain text in the slot is split into lines.                            |
| `start-line`      | `number`                       | `1`               | The number of the first line.                                                            |
| `highlight-lines` | `(number \| string)[]`         | -                 | Lines to highlight: numbers or ranges such as `"3-5"`, using the displayed line numbers. |
| `diff`            | `boolean`                      | `language === "diff"` | Mark lines that start with `+` as added and `-` as removed.                          |
| `max-lines`       | `number`                       | root `max-lines`  | Show only this many lines until expanded.                                                |
| `tabindex`        | `number`                       | `0`               | Makes the content focusable so it can be scrolled by keyboard.                           |
| `class`           | `string`                       | -                 | Additional classes to apply to the content, such as `max-h-72`.                          |

### UiCodeBlockLine

One line of code.

| Prop      | Type                                                 | Default     | Description                              |
| --------- | ---------------------------------------------------- | ----------- | ---------------------------------------- |
| `variant` | `"default" \| "added" \| "removed" \| "highlighted"` | `"default"` | The state of the line.                   |
| `marker`  | `boolean`                                            | `true`      | Show the `+` / `−` gutter marker on added and removed lines. Turn it off when the text already starts with `+` or `-`. |
| `class`   | `string`                                             | -           | Additional classes to apply to the line. |

### UiCodeBlockToken

One highlighted token from `useHighlightedCode` or `highlightCode`. It renders a `span` with the light and dark theme colors.

| Prop    | Type               | Default | Description          |
| ------- | ------------------ | ------- | -------------------- |
| `token` | `HighlightedToken` | -       | Required. The token. |

### UiCodeBlockFooter

A row below the content, such as for a Show More button.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the footer. |

### useHighlightedCode

```ts
const lines = useHighlightedCode(code, language, themes);
```

Returns a `ComputedRef<HighlightedToken[][]>`, one list of tokens per line. It returns plain lines until the first pass finishes, on the server, and for a language that is not registered.

| Argument   | Type                                               | Description                                                     |
| ---------- | -------------------------------------------------- | --------------------------------------------------------------- |
| `code`     | `MaybeRefOrGetter<string>`                         | The code to highlight. A trailing newline is ignored.           |
| `language` | `MaybeRefOrGetter<string \| undefined>`            | A language or alias, or `"ansi"`.                               |
| `themes`   | `MaybeRefOrGetter<CodeBlockThemes \| undefined>`   | Optional. The light and dark theme names.                       |

### highlightCode

```ts
const lines = await highlightCode(code, language, themes);
```

Returns `Promise<HighlightedToken[][] | null>`, one list of tokens per line, or `null` for a language that is not registered.

### loadHighlighter

```ts
const highlighter = await loadHighlighter(language, themes);
```

Loads a language and its themes, and returns a highlighter for it, or `null` for a language that is not registered. `highlighter.highlight(code, state?)` returns `{ lines, state }`. Pass `state` back to continue tokenizing where the code left off.

### registerCodeLanguage / registerCodeTheme

```ts
registerCodeLanguage("zig", () => import("shiki/langs/zig.mjs"), "zg");
registerCodeTheme("nord", () => import("shiki/themes/nord.mjs"));
```

Make a language (with optional aliases) or a theme available to every block.

### HighlightedToken

```ts
interface HighlightedToken {
  content: string;
  htmlStyle?: Record<string, string>;
}
```
