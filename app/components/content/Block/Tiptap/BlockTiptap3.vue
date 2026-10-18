<template>
  <!--
    Tiptap editor with a bubble menu
    Features: A clean writing surface with no toolbar, a floating menu that appears when you select text with bold, italic, underline, heading and link buttons, a link field inside the menu, keyboard shortcuts and a hint that explains how to use it
  -->
  <UiContainer class="py-12">
    <div class="mx-auto max-w-3xl space-y-4">
      <div class="space-y-2 text-center">
        <h2 class="text-2xl font-bold tracking-tight">Select text to format it</h2>
        <p class="text-muted-foreground text-sm">
          Highlight a word and a menu appears next to it. You can also use
          <kbd class="bg-muted rounded border px-1.5 text-xs">Ctrl</kbd> +
          <kbd class="bg-muted rounded border px-1.5 text-xs">B</kbd> and
          <kbd class="bg-muted rounded border px-1.5 text-xs">Ctrl</kbd> +
          <kbd class="bg-muted rounded border px-1.5 text-xs">I</kbd>.
        </p>
      </div>

      <div v-if="editor" class="bg-card rounded-xl border p-6">
        <BubbleMenu
          :editor="editor"
          :options="{ placement: 'top' }"
          class="bg-popover text-popover-foreground z-50 flex items-center gap-0.5 rounded-lg border p-1 shadow-md"
          role="toolbar"
          aria-label="Text formatting"
        >
          <template v-if="!linking">
            <UiToggle
              size="sm"
              aria-label="Bold"
              :model-value="editor.isActive('bold')"
              @click="editor.chain().focus().toggleBold().run()"
              ><Icon name="lucide:bold" class="size-4"
            /></UiToggle>
            <UiToggle
              size="sm"
              aria-label="Italic"
              :model-value="editor.isActive('italic')"
              @click="editor.chain().focus().toggleItalic().run()"
              ><Icon name="lucide:italic" class="size-4"
            /></UiToggle>
            <UiToggle
              size="sm"
              aria-label="Underline"
              :model-value="editor.isActive('underline')"
              @click="editor.chain().focus().toggleUnderline().run()"
              ><Icon name="lucide:underline" class="size-4"
            /></UiToggle>
            <UiSeparator orientation="vertical" class="mx-0.5 h-5" />
            <UiToggle
              size="sm"
              aria-label="Heading"
              :model-value="editor.isActive('heading', { level: 2 })"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              ><Icon name="lucide:heading-2" class="size-4"
            /></UiToggle>
            <UiToggle
              size="sm"
              aria-label="Quote"
              :model-value="editor.isActive('blockquote')"
              @click="editor.chain().focus().toggleBlockquote().run()"
              ><Icon name="lucide:quote" class="size-4"
            /></UiToggle>
            <UiSeparator orientation="vertical" class="mx-0.5 h-5" />
            <UiToggle
              size="sm"
              aria-label="Link"
              :model-value="editor.isActive('link')"
              @click="startLink"
              ><Icon name="lucide:link" class="size-4"
            /></UiToggle>
          </template>
          <form v-else class="flex items-center gap-1 p-0.5" @submit.prevent="applyLink">
            <UiInput
              v-model="href"
              class="h-7 w-48 text-sm"
              placeholder="https://example.com"
              aria-label="Link address"
              @keydown.esc.stop="linking = false"
            />
            <UiButton type="submit" size="sm" class="h-7">Apply</UiButton>
            <UiButton
              type="button"
              variant="ghost"
              size="icon-sm"
              class="size-7"
              aria-label="Remove link"
              @click="removeLink"
              ><Icon name="lucide:unlink" class="size-4"
            /></UiButton>
          </form>
        </BubbleMenu>
        <EditorContent :editor="editor" />
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";
  import { BubbleMenu } from "@tiptap/vue-3/menus";

  const linking = ref(false);
  const href = ref("");

  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false } })],
    content: `
      <h2>A quieter editor</h2>
      <p>Most of the time you only want to write. Select any of these words to bold them, turn the line into a heading or add a link.</p>
      <p>The menu stays out of the way until you need it, which keeps the page calm and the text in front.</p>
    `,
    editorProps: {
      attributes: {
        class:
          "min-h-[240px] focus:outline-none prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-blockquote:text-muted-foreground",
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Document",
      },
    },
    onSelectionUpdate: () => {
      linking.value = false;
    },
  });

  function startLink() {
    href.value = editor.value?.getAttributes("link").href ?? "";
    linking.value = true;
  }

  function applyLink() {
    const value = href.value.trim();
    if (!value) return removeLink();
    editor.value
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: /^https?:\/\//.test(value) ? value : `https://${value}` })
      .run();
    linking.value = false;
  }

  function removeLink() {
    editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();
    linking.value = false;
  }

  onBeforeUnmount(() => editor.value?.destroy());
</script>
