<template>
  <div class="typeset" data-slot="docs-ai-markdown">
    <template v-for="(block, i) in blocks" :key="i">
      <UiCodeBlock v-if="block.type === 'code'" size="sm" :code="block.code" :language="block.lang">
        <UiCodeBlockHeader>
          <UiCodeBlockTitle :text="block.lang || 'text'" />
          <UiCodeBlockActions>
            <!-- The closing fence has not arrived yet, so the code is not complete -->
            <UiCodeBlockCopyButton :disabled="block.open" />
          </UiCodeBlockActions>
        </UiCodeBlockHeader>
        <UiCodeBlockContent />
      </UiCodeBlock>

      <ul v-else-if="block.type === 'ul'">
        <li v-for="(item, j) in block.items" :key="j">
          <template v-for="(part, k) in inline(item)" :key="k">
            <code v-if="part.type === 'code'">{{ part.text }}</code>
            <strong v-else-if="part.type === 'bold'">{{ part.text }}</strong>
            <template v-else>{{ part.text }}</template>
          </template>
        </li>
      </ul>

      <p v-else>
        <template v-for="(part, k) in inline(block.text)" :key="k">
          <code v-if="part.type === 'code'">{{ part.text }}</code>
          <strong v-else-if="part.type === 'bold'">{{ part.text }}</strong>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
  type Block =
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "code"; lang: string; code: string; open: boolean };

  const props = defineProps<{
    /** The Markdown. Supports paragraphs, bullet lists, fenced code, `code` and **bold**. */
    value: string;
    /** Set while the message streams, so an unclosed fence is shown as still open. */
    streaming?: boolean;
  }>();

  // A deliberately tiny renderer so the demos do not depend on a Markdown package. In your app,
  // render Markdown with the library you already use (for example `<MDC>` from @nuxtjs/mdc) and
  // map fenced code to a `UiCodeBlock`.
  const blocks = computed<Block[]>(() => {
    const result: Block[] = [];
    const lines = props.value.split("\n");
    let paragraph: string[] = [];
    let list: string[] | null = null;

    const flush = () => {
      if (paragraph.length) result.push({ type: "p", text: paragraph.join(" ") });
      if (list) result.push({ type: "ul", items: list });
      paragraph = [];
      list = null;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const fence = line.match(/^```(\w*)/);

      if (fence) {
        flush();
        const code: string[] = [];
        let closed = false;
        for (i++; i < lines.length; i++) {
          if (lines[i]!.startsWith("```")) {
            closed = true;
            break;
          }
          code.push(lines[i]!);
        }
        result.push({
          type: "code",
          lang: fence[1] ?? "",
          code: code.join("\n"),
          open: !closed && !!props.streaming,
        });
      } else if (/^[-*] /.test(line)) {
        if (paragraph.length) flush();
        (list ??= []).push(line.slice(2));
      } else if (!line.trim()) {
        flush();
      } else {
        if (list) flush();
        paragraph.push(line);
      }
    }
    flush();

    return result;
  });

  function inline(text: string) {
    return text
      .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
      .filter(Boolean)
      .map((part) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          return { type: "code", text: part.slice(1, -1) };
        }
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return { type: "bold", text: part.slice(2, -2) };
        }
        return { type: "text", text: part };
      });
  }
</script>
