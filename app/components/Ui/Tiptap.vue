<template>
  <div
    v-if="editor"
    :class="['flex flex-col', props.controlPosition === 'top' ? 'flex-col-reverse' : '']"
  >
    <EditorContent :editor="editor" />
    <div
      class="border-input flex flex-wrap items-center gap-0.5 rounded-br-md rounded-bl-md border bg-transparent p-1"
    >
      <!-- Text formatting -->
      <UiTooltip v-for="item in formatToggles" :key="item.label">
        <UiTooltipTrigger as-child>
          <UiToggle
            size="sm"
            :pressed="item.isActive"
            :disabled="item.disabled"
            @click="item.action()"
          >
            <Icon :name="item.icon" class="size-4" aria-hidden="true" />
          </UiToggle>
        </UiTooltipTrigger>
        <UiTooltipContent>{{ item.label }}</UiTooltipContent>
      </UiTooltip>

      <span class="bg-border mx-0.5 h-5 w-px" />

      <!-- Clear actions -->
      <UiTooltip v-for="item in clearActions" :key="item.label">
        <UiTooltipTrigger as-child>
          <UiButton variant="ghost" size="sm" class="size-8 p-0" @click="item.action()">
            <Icon :name="item.icon" class="size-4" aria-hidden="true" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>{{ item.label }}</UiTooltipContent>
      </UiTooltip>

      <span class="bg-border mx-0.5 h-5 w-px" />

      <!-- Block type -->
      <UiTooltip v-for="item in blockToggles" :key="item.label">
        <UiTooltipTrigger as-child>
          <UiToggle size="sm" :pressed="item.isActive" @click="item.action()">
            <Icon :name="item.icon" class="size-4" aria-hidden="true" />
          </UiToggle>
        </UiTooltipTrigger>
        <UiTooltipContent>{{ item.label }}</UiTooltipContent>
      </UiTooltip>

      <span class="bg-border mx-0.5 h-5 w-px" />

      <!-- Lists & blocks -->
      <UiTooltip v-for="item in listToggles" :key="item.label">
        <UiTooltipTrigger as-child>
          <UiToggle size="sm" :pressed="item.isActive" @click="item.action()">
            <Icon :name="item.icon" class="size-4" aria-hidden="true" />
          </UiToggle>
        </UiTooltipTrigger>
        <UiTooltipContent>{{ item.label }}</UiTooltipContent>
      </UiTooltip>

      <span class="bg-border mx-0.5 h-5 w-px" />

      <!-- Insert actions -->
      <UiTooltip v-for="item in insertActions" :key="item.label">
        <UiTooltipTrigger as-child>
          <UiButton variant="ghost" size="sm" class="size-8 p-0" @click="item.action()">
            <Icon :name="item.icon" class="size-4" aria-hidden="true" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>{{ item.label }}</UiTooltipContent>
      </UiTooltip>

      <span class="bg-border mx-0.5 h-5 w-px" />

      <!-- History -->
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton
            variant="ghost"
            size="sm"
            class="size-8 p-0"
            :disabled="!state.canUndo"
            @click="editor.chain().focus().undo().run()"
          >
            <Icon name="lucide:undo-2" class="size-4" aria-hidden="true" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>Undo</UiTooltipContent>
      </UiTooltip>

      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton
            variant="ghost"
            size="sm"
            class="size-8 p-0"
            :disabled="!state.canRedo"
            @click="editor.chain().focus().redo().run()"
          >
            <Icon name="lucide:redo-2" class="size-4" aria-hidden="true" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>Redo</UiTooltipContent>
      </UiTooltip>

      <span class="bg-border mx-0.5 h-5 w-px" />

      <!-- Color -->
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiToggle
            size="sm"
            :pressed="state.purple"
            @click="editor.chain().focus().setColor('#6E16B6').run()"
          >
            <Icon name="lucide:palette" class="size-4" aria-hidden="true" />
            <span class="size-2 rounded-full bg-[#6E16B6]" />
          </UiToggle>
        </UiTooltipTrigger>
        <UiTooltipContent>Purple text</UiTooltipContent>
      </UiTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Editor } from "@tiptap/core";
  import { Color } from "@tiptap/extension-color";
  import Highlight from "@tiptap/extension-highlight";
  import ListItem from "@tiptap/extension-list-item";
  import SubScript from "@tiptap/extension-subscript";
  import Superscript from "@tiptap/extension-superscript";
  import { Table } from "@tiptap/extension-table";
  import TableCell from "@tiptap/extension-table-cell";
  import TableHeader from "@tiptap/extension-table-header";
  import TableRow from "@tiptap/extension-table-row";
  import { TextStyle } from "@tiptap/extension-text-style";
  import Typography from "@tiptap/extension-typography";
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";
  import type { HTMLAttributes } from "vue";

  const model = defineModel<string>({ default: "" });

  const props = withDefaults(
    defineProps<{
      modelType?: "html" | "json";
      class?: HTMLAttributes["class"];
      controlPosition?: "top" | "bottom";
    }>(),
    {
      modelType: "html",
      controlPosition: "bottom",
    }
  );

  // Reactive state written on every transaction so toolbar reflects the cursor position.
  // Using a reactive object (not computed) avoids Vue's computed caching — state is always
  // fresh because onTransaction writes properties that Vue's template tracks directly.
  const state = reactive({
    bold: false,
    italic: false,
    strike: false,
    code: false,
    paragraph: false,
    heading1: false,
    heading2: false,
    heading3: false,
    heading4: false,
    heading5: false,
    heading6: false,
    bulletList: false,
    orderedList: false,
    codeBlock: false,
    blockquote: false,
    purple: false,
    canUndo: false,
    canRedo: false,
    canBold: true,
    canItalic: true,
    canStrike: true,
    canCode: true,
  });

  function syncState(ed: Editor) {
    state.bold = ed.isActive("bold");
    state.italic = ed.isActive("italic");
    state.strike = ed.isActive("strike");
    state.code = ed.isActive("code");
    state.paragraph = ed.isActive("paragraph");
    state.heading1 = ed.isActive("heading", { level: 1 });
    state.heading2 = ed.isActive("heading", { level: 2 });
    state.heading3 = ed.isActive("heading", { level: 3 });
    state.heading4 = ed.isActive("heading", { level: 4 });
    state.heading5 = ed.isActive("heading", { level: 5 });
    state.heading6 = ed.isActive("heading", { level: 6 });
    state.bulletList = ed.isActive("bulletList");
    state.orderedList = ed.isActive("orderedList");
    state.codeBlock = ed.isActive("codeBlock");
    state.blockquote = ed.isActive("blockquote");
    state.purple = ed.isActive("textStyle", { color: "#6E16B6" });
    state.canUndo = ed.can().chain().focus().undo().run();
    state.canRedo = ed.can().chain().focus().redo().run();
    state.canBold = ed.can().chain().focus().toggleBold().run();
    state.canItalic = ed.can().chain().focus().toggleItalic().run();
    state.canStrike = ed.can().chain().focus().toggleStrike().run();
    state.canCode = ed.can().chain().focus().toggleCode().run();
  }

  const editor = useEditor({
    content: model.value,
    editorProps: {
      attributes: {
        class:
          tw`border-input ring-offset-background placeholder:text-muted-foreground max-h-[250px] min-h-[150px] w-full overflow-auto rounded-md rounded-br-none rounded-bl-none border border-b-0 bg-transparent px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50` as any,
      },
    },
    onTransaction({ editor: ed }) {
      syncState(ed);
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
      Table.configure({ resizable: true }),
      Superscript,
      SubScript,
      Typography,
      Highlight,
      TableRow,
      TableHeader,
      StarterKit,
      TableCell,
    ],
  });

  // Getter properties ensure the template render effect tracks the reactive state
  // properties directly — re-reads fresh values on every render triggered by state changes.
  const formatToggles = [
    {
      label: "Bold",
      icon: "lucide:bold",
      get isActive() {
        return state.bold;
      },
      get disabled() {
        return !state.canBold;
      },
      action: () => editor.value?.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: "lucide:italic",
      get isActive() {
        return state.italic;
      },
      get disabled() {
        return !state.canItalic;
      },
      action: () => editor.value?.chain().focus().toggleItalic().run(),
    },
    {
      label: "Strikethrough",
      icon: "lucide:strikethrough",
      get isActive() {
        return state.strike;
      },
      get disabled() {
        return !state.canStrike;
      },
      action: () => editor.value?.chain().focus().toggleStrike().run(),
    },
    {
      label: "Inline code",
      icon: "lucide:code",
      get isActive() {
        return state.code;
      },
      get disabled() {
        return !state.canCode;
      },
      action: () => editor.value?.chain().focus().toggleCode().run(),
    },
  ];

  const clearActions = [
    {
      label: "Clear formatting",
      icon: "lucide:remove-formatting",
      action: () => editor.value?.chain().focus().unsetAllMarks().run(),
    },
    {
      label: "Clear nodes",
      icon: "lucide:eraser",
      action: () => editor.value?.chain().focus().clearNodes().run(),
    },
  ];

  const blockToggles = [
    {
      label: "Paragraph",
      icon: "lucide:pilcrow",
      get isActive() {
        return state.paragraph;
      },
      action: () => editor.value?.chain().focus().setParagraph().run(),
    },
    {
      label: "Heading 1",
      icon: "lucide:heading-1",
      get isActive() {
        return state.heading1;
      },
      action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      icon: "lucide:heading-2",
      get isActive() {
        return state.heading2;
      },
      action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      icon: "lucide:heading-3",
      get isActive() {
        return state.heading3;
      },
      action: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Heading 4",
      icon: "lucide:heading-4",
      get isActive() {
        return state.heading4;
      },
      action: () => editor.value?.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      label: "Heading 5",
      icon: "lucide:heading-5",
      get isActive() {
        return state.heading5;
      },
      action: () => editor.value?.chain().focus().toggleHeading({ level: 5 }).run(),
    },
    {
      label: "Heading 6",
      icon: "lucide:heading-6",
      get isActive() {
        return state.heading6;
      },
      action: () => editor.value?.chain().focus().toggleHeading({ level: 6 }).run(),
    },
  ];

  const listToggles = [
    {
      label: "Bullet list",
      icon: "lucide:list",
      get isActive() {
        return state.bulletList;
      },
      action: () => editor.value?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered list",
      icon: "lucide:list-ordered",
      get isActive() {
        return state.orderedList;
      },
      action: () => editor.value?.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Code block",
      icon: "lucide:square-code",
      get isActive() {
        return state.codeBlock;
      },
      action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: "Blockquote",
      icon: "lucide:quote",
      get isActive() {
        return state.blockquote;
      },
      action: () => editor.value?.chain().focus().toggleBlockquote().run(),
    },
  ];

  const insertActions = [
    {
      label: "Horizontal rule",
      icon: "lucide:minus",
      action: () => editor.value?.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Hard break",
      icon: "lucide:corner-down-left",
      action: () => editor.value?.chain().focus().setHardBreak().run(),
    },
  ];
</script>
