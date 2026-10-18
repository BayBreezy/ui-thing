<template>
  <!--
    Blog post editor
    Features: A large title field, a toolbar with a block type select, bold, italic, underline, link, quote, code block, lists and undo and redo, an edit and preview switch, word count and reading time, a saved indicator that updates a moment after you stop typing and save draft and publish buttons
  -->
  <UiContainer class="py-12">
    <div class="mx-auto max-w-3xl space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-muted-foreground flex items-center gap-1.5 text-sm" aria-live="polite">
          <Icon
            :name="saving ? 'lucide:loader-circle' : 'lucide:check'"
            class="size-4"
            :class="saving ? 'animate-spin motion-reduce:animate-none' : ''"
          />{{ status }}
        </p>
        <div class="flex gap-2">
          <UiButton variant="outline" size="sm" @click="useSonner.success('Draft saved')"
            >Save draft</UiButton
          >
          <UiButton size="sm" :disabled="!title.trim() || words < 20" @click="publish"
            >Publish</UiButton
          >
        </div>
      </div>

      <UiInput
        v-model="title"
        aria-label="Post title"
        placeholder="Post title"
        class="h-auto border-0 px-0 text-3xl font-bold shadow-none focus-visible:ring-0 md:text-3xl"
      />

      <UiTabs v-model="mode">
        <UiTabsList>
          <UiTabsTrigger value="edit">Edit</UiTabsTrigger>
          <UiTabsTrigger value="preview">Preview</UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent value="edit" force-mount :class="mode === 'edit' ? '' : 'hidden'">
          <div v-if="editor" class="bg-card rounded-xl border">
            <div class="bg-muted/30 flex flex-wrap items-center gap-1 border-b p-2">
              <UiSelect
                :model-value="block"
                @update:model-value="(value) => setBlock(String(value))"
              >
                <UiSelectTrigger class="h-8 w-32" aria-label="Block type"
                  ><UiSelectValue
                /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="paragraph">Paragraph</UiSelectItem>
                  <UiSelectItem value="h2">Heading 2</UiSelectItem>
                  <UiSelectItem value="h3">Heading 3</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <UiSeparator orientation="vertical" class="mx-1 h-5" />
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
              <UiToggle
                size="sm"
                aria-label="Link"
                :model-value="editor.isActive('link')"
                @click="toggleLink"
                ><Icon name="lucide:link" class="size-4"
              /></UiToggle>
              <UiSeparator orientation="vertical" class="mx-1 h-5" />
              <UiToggle
                size="sm"
                aria-label="Quote"
                :model-value="editor.isActive('blockquote')"
                @click="editor.chain().focus().toggleBlockquote().run()"
                ><Icon name="lucide:quote" class="size-4"
              /></UiToggle>
              <UiToggle
                size="sm"
                aria-label="Code block"
                :model-value="editor.isActive('codeBlock')"
                @click="editor.chain().focus().toggleCodeBlock().run()"
                ><Icon name="lucide:code" class="size-4"
              /></UiToggle>
              <UiToggle
                size="sm"
                aria-label="Bullet list"
                :model-value="editor.isActive('bulletList')"
                @click="editor.chain().focus().toggleBulletList().run()"
                ><Icon name="lucide:list" class="size-4"
              /></UiToggle>
              <UiToggle
                size="sm"
                aria-label="Numbered list"
                :model-value="editor.isActive('orderedList')"
                @click="editor.chain().focus().toggleOrderedList().run()"
                ><Icon name="lucide:list-ordered" class="size-4"
              /></UiToggle>
              <div class="ml-auto flex">
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Undo"
                  :disabled="!editor.can().undo()"
                  @click="editor.chain().focus().undo().run()"
                  ><Icon name="lucide:undo" class="size-4"
                /></UiButton>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Redo"
                  :disabled="!editor.can().redo()"
                  @click="editor.chain().focus().redo().run()"
                  ><Icon name="lucide:redo" class="size-4"
                /></UiButton>
              </div>
            </div>
            <EditorContent :editor="editor" class="p-5" />
          </div>
        </UiTabsContent>

        <UiTabsContent value="preview">
          <article class="bg-card rounded-xl border p-6">
            <h1 class="text-3xl font-bold tracking-tight">{{ title || "Untitled post" }}</h1>
            <!-- The HTML comes from the editor. Sanitize it on the server before you store or show it. -->
            <div class="prose dark:prose-invert mt-4 max-w-none" v-html="html" />
          </article>
        </UiTabsContent>
      </UiTabs>

      <p class="text-muted-foreground text-sm tabular-nums">
        {{ words }} {{ words === 1 ? "word" : "words" }} · {{ minutes }} min read
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const title = ref("Why we moved our docs to markdown");
  const mode = ref("edit");
  const words = ref(0);
  const html = ref("");
  const block = ref("paragraph");
  const saving = ref(false);
  const status = ref("All changes saved");

  const minutes = computed(() => Math.max(1, Math.ceil(words.value / 200)));

  const markSaved = useDebounceFn(() => {
    saving.value = false;
    status.value = "All changes saved";
  }, 800);

  function touch() {
    saving.value = true;
    status.value = "Saving...";
    markSaved();
  }

  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false } })],
    content: `
      <h2>The problem</h2>
      <p>Our docs lived in three tools. Nobody knew which one was right, and every change needed a designer to touch a layout that nobody wanted to touch.</p>
      <h2>The change</h2>
      <p>We moved everything to plain markdown files next to the code. Writers open a pull request, the preview builds in a minute and the docs ship with the product.</p>
      <ul><li>One source of truth</li><li>Review like code</li><li>Search that actually works</li></ul>
      <blockquote><p>The best docs are the ones that are easy to fix.</p></blockquote>
    `,
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] focus:outline-none prose dark:prose-invert max-w-none prose-headings:font-bold prose-blockquote:text-muted-foreground prose-pre:bg-muted prose-pre:text-foreground",
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Post body",
      },
    },
    onCreate: ({ editor }) => sync(editor),
    onUpdate: ({ editor }) => {
      sync(editor);
      touch();
    },
    onSelectionUpdate: ({ editor }) => {
      block.value = editor.isActive("heading", { level: 2 })
        ? "h2"
        : editor.isActive("heading", { level: 3 })
          ? "h3"
          : "paragraph";
    },
  });

  function sync(instance: NonNullable<typeof editor.value>) {
    const text = instance.getText().trim();
    words.value = text ? text.split(/\s+/).length : 0;
    html.value = instance.getHTML();
  }

  watch(title, touch);

  function setBlock(value: string) {
    const chain = editor.value?.chain().focus();
    if (!chain) return;
    if (value === "paragraph") chain.setParagraph().run();
    else chain.setHeading({ level: value === "h2" ? 2 : 3 }).run();
    block.value = value;
  }

  function toggleLink() {
    if (!editor.value) return;
    if (editor.value.isActive("link")) {
      editor.value.chain().focus().unsetLink().run();
      return;
    }
    const href = window.prompt("Link address", "https://");
    if (href) editor.value.chain().focus().setLink({ href }).run();
  }

  function publish() {
    useSonner.success("Post published", { description: title.value });
  }

  onBeforeUnmount(() => editor.value?.destroy());
</script>
