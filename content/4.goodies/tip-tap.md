---
title: Tiptap
description: Tiptap is an open source headless content editor and real-time collaboration framework to craft exactly the content experience you’d like to have – built for developers.
---

## Getting Started

:::Steps
::Step

### Installation

First wee need to install basic packages that we need. To make a great editor, you will need to install a whole lot more extensions. But for now, we will just install the basic packages.

:prose-pm-install{name="@tiptap/vue-3 @tiptap/pm @tiptap/starter-kit"}

::
::Step

### Create Editor Component

Create the component `Tiptap.vue` in the `components` directory. The component has to be a client only component.

The one used here looks like this. Like I said earlier, you have to install a lot of packages to get the functionality you want.

:prose-code-snippet{file="/components/Ui/Tiptap.vue" language="vue" title="TipTap"}

::
:::

## Usage

### Basic

In this example, we are just passing the model to the editor. We are also customizing the look and feel of this single instance of the editor. Feel free to customize it to your liking.

::ShowCase

:DocsTiptap

#code

<!-- automd:file src="../../app/components/content/Docs/Tiptap/DocsTiptap.vue" code lang="vue" -->

```vue [DocsTiptap.vue]
<template>
  <UiTiptap v-model="model" />
</template>

<script lang="ts" setup>
  const model = ref(`
<div>
  <h1>This is an H1 tag</h1>
  <h2>This is an H2 tag</h2>
  <h3>This is an H3 tag</h3>
  <h4>This is an H4 tag</h4>
  <h5>This is an H5 tag</h5>
  <h6>This is an H6 tag</h6>

  <p>This is a paragraph with some <strong>bold text</strong> and some <em>italic text</em>. Here is some <u>underlined text</u> and some <s>strikethrough text</s>.</p>

  <blockquote>
    This is a blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
  </blockquote>

  <code>This is a code block.</code>

  <pre><code>This is a preformatted text block.</code></pre>

  <ul>
    <li>Unordered list item 1</li>
    <li>Unordered list item 2</li>
    <li>Unordered list item 3</li>
  </ul>

  <ol>
    <li>Ordered list item 1</li>
    <li>Ordered list item 2</li>
    <li>Ordered list item 3</li>
  </ol>

  <table>
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
      </tr>
      <tr>
        <td>Data 4</td>
        <td>Data 5</td>
        <td>Data 6</td>
      </tr>
    </tbody>
  </table>

  <a href="https://www.example.com">This is a link</a>

  <img src="https://via.placeholder.com/150" alt="Placeholder image">

  <hr />

  <p>Here's a <mark>highlighted text</mark> example.</p>

  <p>Here's an example with <sub>subscript</sub> and <sup>superscript</sup> text.</p>
</div>
  `);
</script>

<style scoped>
  @reference "~/assets/css/tailwind.css";

  :deep(.tiptap) {
    :first-child {
      margin-top: 0;
    }
    /* List styles */
    ul,
    ol {
      @apply mx-3 my-5 list-inside px-4 py-0;
      li p {
        @apply my-0 inline-block;
      }
    }
    ul {
      list-style-type: disc;
    }
    ol {
      list-style-type: decimal;
    }

    a {
      @apply cursor-pointer text-violet-500 underline underline-offset-2;
    }

    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply mt-9 leading-tight font-bold text-pretty;
    }

    h1,
    h2 {
      @apply mt-14 mb-6;
    }

    h1 {
      font-size: 1.4rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    h4,
    h5,
    h6 {
      font-size: 1rem;
    }

    /* Code and preformatted text styles */
    code {
      @apply rounded bg-muted px-1 font-mono text-sm font-medium text-foreground;
    }

    pre {
      @apply my-6 rounded-md bg-muted p-4 font-mono text-sm text-foreground;
      code {
        @apply bg-none p-0 text-sm text-inherit;
      }
    }
    blockquote {
      @apply mx-0 my-5 border-l-4 border-border py-2 pl-4;
    }
    hr {
      @apply my-6 border-0 border-t border-border;
    }
    table {
      @apply m-0 w-full table-fixed border-collapse overflow-hidden;

      td,
      th {
        @apply relative box-border min-w-4 border border-border px-3 py-2 align-top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: var(--gray-1);
        font-weight: bold;
        text-align: left;
      }
    }
    mark {
      @apply rounded bg-sky-400/40 box-decoration-clone p-1 text-accent-foreground dark:bg-sky-500/70 dark:text-white;
    }
  }
</style>
```

<!-- /automd -->

::
