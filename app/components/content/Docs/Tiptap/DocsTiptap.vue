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
      margin-inline: calc(var(--spacing) * 3);
      margin-block: calc(var(--spacing) * 5);
      list-style-position: inside;
      padding-inline: calc(var(--spacing) * 4);
      padding-block: calc(var(--spacing) * 0);

      li p {
        margin-block: calc(var(--spacing) * 0);
        display: inline-block;
      }
    }
    ul {
      list-style-type: disc;
    }
    ol {
      list-style-type: decimal;
    }

    a {
      cursor: pointer;
      color: var(--color-violet-500);
      text-decoration-line: underline;
      text-underline-offset: 2px;
    }

    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: calc(var(--spacing) * 9);
      line-height: 1.25;
      font-weight: var(--font-weight-bold);
      text-wrap: pretty;
    }

    h1,
    h2 {
      margin-top: calc(var(--spacing) * 14);
      margin-bottom: calc(var(--spacing) * 6);
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
      border-radius: var(--radius-sm);
      background-color: var(--color-muted);
      padding-inline: calc(var(--spacing) * 1);
      color: var(--color-foreground);
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      line-height: var(--text-sm--line-height);
      font-weight: var(--font-weight-medium);
    }

    pre {
      margin-block: calc(var(--spacing) * 6);
      border-radius: var(--radius-md);
      background-color: var(--color-muted);
      padding: calc(var(--spacing) * 4);
      color: var(--color-foreground);
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      line-height: var(--text-sm--line-height);

      code {
        background-image: none;
        padding: calc(var(--spacing) * 0);
        font-size: var(--text-sm);
        line-height: var(--text-sm--line-height);
        color: inherit;
      }
    }
    blockquote {
      margin-inline: calc(var(--spacing) * 0);
      margin-block: calc(var(--spacing) * 5);
      border-left-style: solid;
      border-left-width: 4px;
      border-color: var(--color-border);
      padding-block: calc(var(--spacing) * 2);
      padding-left: calc(var(--spacing) * 4);
    }
    hr {
      margin-block: calc(var(--spacing) * 6);
      border-width: 0;
      border-top-style: solid;
      border-top-width: 1px;
      border-color: var(--color-border);
    }
    table {
      margin: calc(var(--spacing) * 0);
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      overflow: hidden;

      td,
      th {
        position: relative;
        box-sizing: border-box;
        min-width: calc(var(--spacing) * 4);
        border-style: solid;
        border-width: 1px;
        border-color: var(--color-border);
        padding-inline: calc(var(--spacing) * 3);
        padding-block: calc(var(--spacing) * 2);
        vertical-align: top;

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
      border-radius: var(--radius-sm);
      background-color: color-mix(in oklab, var(--color-sky-400) 40%, transparent);
      box-decoration-break: clone;
      padding: calc(var(--spacing) * 1);
      color: var(--color-accent-foreground);

      &:is(.dark *) {
        background-color: color-mix(in oklab, var(--color-sky-500) 70%, transparent);
        color: var(--color-white);
      }
    }
  }
</style>
