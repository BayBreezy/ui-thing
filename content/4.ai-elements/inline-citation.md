---
title: Inline Citation
description: A source in the sentence that opens on hover.
label: New
---

::prose-show-case

:DocsAiInlineCitation

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/InlineCitation/DocsAiInlineCitation.vue" code lang="vue" -->

```vue [DocsAiInlineCitation.vue]
<template>
  <DefineCitation v-slot="{ source }">
    <UiHoverCard :open-delay="10" :close-delay="100">
      <UiHoverCardTrigger as-child>
        <UiButton variant="secondary" size="xs">
          {{ hostname(source.url) }}
        </UiButton>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="flex w-64 flex-col gap-1">
        <div class="font-medium">
          {{ source.title }}
        </div>
        <p class="text-muted-foreground">
          {{ source.description }}
        </p>
        <a
          :href="source.url"
          target="_blank"
          rel="noreferrer"
          class="text-muted-foreground text-xs underline-offset-4 hover:underline"
        >
          {{ hostname(source.url) }}
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
      </UiHoverCardContent>
    </UiHoverCard>
  </DefineCitation>

  <div class="mx-auto flex max-w-sm flex-col gap-3 py-6 text-sm leading-relaxed">
    <p>
      Next.js streams a route in chunks, so the page shows up before every request finishes.
      <Citation :source="sources.streaming" />
    </p>
    <p>
      Wrap a slow part of the page in a Suspense boundary and React sends the fallback first. When
      the data resolves, the finished HTML streams into the same response and replaces the fallback,
      with no extra request from the browser. <Citation :source="sources.suspense" /> Server
      Components help here, because their code never ships to the browser.
      <Citation :source="sources.serverComponents" />
    </p>
    <p>
      A loading.tsx file does the same for a whole route segment.
      <Citation :source="sources.loading" /> It all runs over chunked transfer encoding, so there is
      nothing extra to set up.
      <Citation :source="sources.chunked" />
    </p>
  </div>
</template>

<script lang="ts" setup>
  interface Source {
    url: string;
    title: string;
    description: string;
  }

  const sources = {
    streaming: {
      url: "https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming",
      title: "Linking and Navigating",
      description: "How the App Router streams a route to the browser.",
    },
    suspense: {
      url: "https://react.dev/reference/react/Suspense",
      title: "<Suspense>",
      description: "Display a fallback until its children have finished loading.",
    },
    serverComponents: {
      url: "https://react.dev/reference/rsc/server-components",
      title: "Server Components",
      description: "Components that render ahead of time, on the server.",
    },
    loading: {
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
      title: "loading.js",
      description: "Show an instant loading state for a route segment.",
    },
    chunked: {
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding",
      title: "Transfer-Encoding",
      description: "Send a response as a series of chunks.",
    },
  } satisfies Record<string, Source>;

  function hostname(url: string) {
    return new URL(url).hostname.replace(/^www\./, "");
  }

  const [DefineCitation, Citation] = createReusableTemplate<{ source: Source }>();
</script>
```

<!-- /automd -->

::

Inline Citation is a source that sits in the sentence it supports. It is a [Hover Card](/components/hover-card) on a [Button](/components/button).

To show a list of sources after the reply, use [Sources](/ai-elements/sources).

## Installation

Inline Citation is built with the [Hover Card](/components/hover-card) and [Button](/components/button) components.

:prose-pm-x{command="ui-thing@latest add hover-card button"}

## Usage

```vue
<template>
  <UiHoverCard :open-delay="10" :close-delay="100">
    <UiHoverCardTrigger as-child>
      <UiButton variant="secondary" size="xs">
        {{ hostname }}
      </UiButton>
    </UiHoverCardTrigger>
    <UiHoverCardContent class="flex w-64 flex-col gap-1">
      <div class="font-medium">
        {{ title }}
      </div>
      <a :href="url" target="_blank" rel="noreferrer">
        {{ hostname }}
        <span class="sr-only"> (opens in a new tab)</span>
      </a>
    </UiHoverCardContent>
  </UiHoverCard>
</template>
```

## AI SDK

A `source-url` part is the citation. Set `sendSources: true` on `toUIMessageStreamResponse()`, or write the part yourself.

```ts
writer.write({
  type: "source-url",
  sourceId: "shadcn-vue",
  url: "https://www.shadcn-vue.com",
  title: "shadcn-vue",
});
```

```ts
const sources = computed(() => props.message.parts.filter((part) => part.type === "source-url"));
```

`title` is optional. Fall back to the URL's hostname.

