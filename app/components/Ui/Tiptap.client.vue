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
