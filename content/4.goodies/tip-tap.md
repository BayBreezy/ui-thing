---
title: Tiptap
description: Tiptap is an open source headless content editor and real-time collaboration framework to craft exactly the content experience you’d like to have – built for developers.
---

## Getting Started

:::Steps
::Step

### Installation

First wee need to install basic packages that we need. To make a great editor, you will need to install a whole lot more extensions. But for now, we will just install the basic packages.

```bash
npm install @tiptap/vue-3 @tiptap/pm @tiptap/starter-kit
```

::
::Step

### Create Editor Component

Create the component `Tiptap.client.vue` in the `components` directory. The component has to be a client only component.

The one used here looks like this. Like I said earlier, you have to install a lot of packages to get the functionality you want.

<!-- automd:file src="../../app/components/Ui/Tiptap.client.vue" code lang="vue" -->

```vue [Tiptap.client.vue]
<template>
  <div v-if="editor">
    <EditorContent :editor="editor" />
    <div
      class="flex flex-wrap items-center gap-1 rounded-bl-md rounded-br-md border border-input bg-transparent p-1"
    >
      <UiButton
        size="sm"
        variant="outline"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        Bold
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        Italic
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        Strike
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        Code
      </UiButton>
      <UiButton size="sm" variant="outline" @click="editor.chain().focus().unsetAllMarks().run()"
        >Clear marks</UiButton
      >
      <UiButton size="sm" variant="outline" @click="editor.chain().focus().clearNodes().run()"
        >Clear nodes</UiButton
      >
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        Paragraph
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        H1
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        H4
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        H5
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        H6
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        Bullet list
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        Ordered list
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        Code block
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{ 'bg-primary text-primary-foreground': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        Blockquote
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        @click="editor.chain().focus().setHorizontalRule().run()"
        >Horizontal rule</UiButton
      >
      <UiButton size="sm" variant="outline" @click="editor.chain().focus().setHardBreak().run()"
        >Hard break</UiButton
      >
      <UiButton
        size="sm"
        variant="outline"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        Undo
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        Redo
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :class="{
          'bg-primary text-primary-foreground': editor.isActive('textStyle', { color: '#6E16B6' }),
        }"
        @click="editor.chain().focus().setColor('#6E16B6').run()"
      >
        Purple
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Color } from "@tiptap/extension-color";
  import Highlight from "@tiptap/extension-highlight";
  import Link from "@tiptap/extension-link";
  import ListItem from "@tiptap/extension-list-item";
  import SubScript from "@tiptap/extension-subscript";
  import Superscript from "@tiptap/extension-superscript";
  import Table from "@tiptap/extension-table";
  import TableCell from "@tiptap/extension-table-cell";
  import TableHeader from "@tiptap/extension-table-header";
  import TableRow from "@tiptap/extension-table-row";
  import TextStyle from "@tiptap/extension-text-style";
  import Typography from "@tiptap/extension-typography";
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const model = defineModel<any>({ default: "" });

  const props = withDefaults(
    defineProps<{
      modelType?: "html" | "json";
      class?: any;
    }>(),
    {
      modelType: "html",
    }
  );

  const editor = useEditor({
    content: model.value,

    editorProps: {
      attributes: {
        class:
          tw`max-h-[250px] min-h-[150px] w-full overflow-auto rounded-md rounded-bl-none rounded-br-none border border-b-0 border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50` as any,
      },
    },
    onUpdate(val) {
      if (props.modelType === "html") {
        model.value = val.editor.getHTML();
      } else if (props.modelType === "json") {
        model.value = JSON.stringify(val.editor.getJSON());
      }
    },
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({}),
      Table.configure({
        resizable: true,
      }),
      Superscript,
      SubScript,
      Link,
      Typography,
      Highlight,
      TableRow,
      TableHeader,
      StarterKit,
      TableCell,
    ],
  });
</script>
```

<!-- /automd -->

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
      @apply mt-9 text-pretty font-bold leading-tight;
    }

    h1,
    h2 {
      @apply mb-6 mt-14;
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
