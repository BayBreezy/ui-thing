<template>
  <UiContainer class="py-12">
    <div class="mx-auto max-w-3xl space-y-4">
      <div class="space-y-2 text-center">
        <h2 class="text-2xl font-bold tracking-tight">Rich Text Editor</h2>
        <p class="text-muted-foreground text-sm">
          A simple Tiptap editor with grouped icon buttons and tooltips
        </p>
      </div>

      <div v-if="editor" class="bg-card rounded-lg border">
        <!-- Toolbar -->
        <div class="bg-muted/30 flex flex-wrap items-center gap-2 border-b p-2">
          <!-- Text Formatting Group -->
          <div class="flex items-center gap-0.5">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('bold')"
                  @click="editor.chain().focus().toggleBold().run()"
                >
                  <Icon name="lucide:bold" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Bold</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('italic')"
                  @click="editor.chain().focus().toggleItalic().run()"
                >
                  <Icon name="lucide:italic" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Italic</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('strike')"
                  @click="editor.chain().focus().toggleStrike().run()"
                >
                  <Icon name="lucide:strikethrough" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Strike</UiTooltipContent>
            </UiTooltip>
          </div>

          <UiSeparator orientation="vertical" class="h-6" />

          <!-- Heading Group -->
          <div class="flex items-center gap-0.5">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('heading', { level: 1 })"
                  @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                >
                  <Icon name="lucide:heading-1" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Heading 1</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('heading', { level: 2 })"
                  @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                >
                  <Icon name="lucide:heading-2" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Heading 2</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('heading', { level: 3 })"
                  @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                >
                  <Icon name="lucide:heading-3" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Heading 3</UiTooltipContent>
            </UiTooltip>
          </div>

          <UiSeparator orientation="vertical" class="h-6" />

          <!-- List Group -->
          <div class="flex items-center gap-0.5">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('bulletList')"
                  @click="editor.chain().focus().toggleBulletList().run()"
                >
                  <Icon name="lucide:list" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Bullet List</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('orderedList')"
                  @click="editor.chain().focus().toggleOrderedList().run()"
                >
                  <Icon name="lucide:list-ordered" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Ordered List</UiTooltipContent>
            </UiTooltip>
          </div>

          <UiSeparator orientation="vertical" class="h-6" />

          <!-- Block Group -->
          <div class="flex items-center gap-0.5">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('codeBlock')"
                  @click="editor.chain().focus().toggleCodeBlock().run()"
                >
                  <Icon name="lucide:code" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Code Block</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('blockquote')"
                  @click="editor.chain().focus().toggleBlockquote().run()"
                >
                  <Icon name="lucide:quote" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Blockquote</UiTooltipContent>
            </UiTooltip>
          </div>

          <UiSeparator orientation="vertical" class="h-6" />

          <!-- Actions Group -->
          <div class="flex items-center gap-0.5">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  size="icon-sm"
                  variant="ghost"
                  :disabled="!editor.can().undo()"
                  @click="editor.chain().focus().undo().run()"
                >
                  <Icon name="lucide:undo" class="size-4" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent>Undo</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  size="icon-sm"
                  variant="ghost"
                  :disabled="!editor.can().redo()"
                  @click="editor.chain().focus().redo().run()"
                >
                  <Icon name="lucide:redo" class="size-4" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent>Redo</UiTooltipContent>
            </UiTooltip>
          </div>
        </div>

        <!-- Editor Content -->
        <EditorContent :editor="editor" class="prose prose-sm max-w-none p-4" />
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Welcome to Tiptap</h2>
      <p>This is a custom editor instance with <strong>grouped icon buttons</strong> and <em>tooltips</em>. Try editing this content!</p>
      <h3>Features:</h3>
      <ul>
        <li>Text formatting (bold, italic, strike)</li>
        <li>Multiple heading levels</li>
        <li>Bullet and ordered lists</li>
        <li>Code blocks and blockquotes</li>
      </ul>
      <blockquote>
        <p>This is a blockquote. Great for highlighting important information.</p>
      </blockquote>
      <pre><code>// This is a code block
console.log('Hello, Tiptap!');</code></pre>
    `,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] focus:outline-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:my-3 prose-ul:my-3 prose-li:my-1",
      },
    },
  });

  onBeforeUnmount(() => {
    editor.value?.destroy();
  });
</script>

<style scoped>
  :deep(.ProseMirror) {
    outline: none;
  }

  :deep(.ProseMirror pre) {
    background: hsl(var(--muted));
    border-radius: 0.5rem;
    color: hsl(var(--foreground));
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
  }

  :deep(.ProseMirror code) {
    background: hsl(var(--muted));
    border-radius: 0.25rem;
    color: hsl(var(--foreground));
    font-size: 0.9rem;
    padding: 0.25em 0.4em;
  }

  :deep(.ProseMirror pre code) {
    background: none;
    color: inherit;
    font-size: inherit;
    padding: 0;
  }

  :deep(.ProseMirror blockquote) {
    border-left: 3px solid hsl(var(--border));
    padding-left: 1rem;
    color: hsl(var(--muted-foreground));
  }
</style>
