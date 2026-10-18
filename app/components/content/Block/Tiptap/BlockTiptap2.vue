<template>
  <!--
    Minimal Tiptap editor
    Features: A bare editor with a short bar of bold, italic and link buttons, a placeholder when it is empty, a character counter that warns near the limit, a post button that is disabled when the text is empty or too long and a reset after posting
  -->
  <UiContainer class="py-12">
    <div class="mx-auto max-w-xl space-y-3">
      <div class="space-y-1">
        <h2 class="text-xl font-bold tracking-tight">What is on your mind?</h2>
        <p class="text-muted-foreground text-sm">
          A small editor for short posts and status updates.
        </p>
      </div>

      <div
        v-if="editor"
        class="bg-card focus-within:ring-ring/40 rounded-xl border focus-within:ring-[3px]"
      >
        <div class="relative">
          <EditorContent :editor="editor" class="px-4 pt-3" />
          <p
            v-if="empty"
            class="text-muted-foreground pointer-events-none absolute top-3 left-4 text-sm"
            aria-hidden="true"
          >
            {{ placeholder }}
          </p>
        </div>
        <div class="flex items-center gap-1 px-2 pb-2">
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
            aria-label="Link"
            :model-value="editor.isActive('link')"
            @click="toggleLink"
            ><Icon name="lucide:link" class="size-4"
          /></UiToggle>
          <span
            class="ml-auto pr-2 text-xs tabular-nums"
            :class="
              over
                ? 'text-destructive font-medium'
                : remaining <= 20
                  ? 'text-amber-600'
                  : 'text-muted-foreground'
            "
            aria-live="polite"
            >{{ remaining }}</span
          >
          <UiButton size="sm" :disabled="empty || over" @click="post">Post</UiButton>
        </div>
      </div>

      <ul v-if="posts.length" class="space-y-2 pt-2" aria-label="Posted updates">
        <li
          v-for="item in posts"
          :key="item.id"
          class="bg-muted/40 rounded-lg border px-4 py-3 text-sm"
        >
          <!-- The HTML comes from the editor. Sanitize it on the server before you store or show it. -->
          <div class="prose prose-sm dark:prose-invert max-w-none" v-html="item.html" />
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const props = withDefaults(
    defineProps<{
      limit?: number;
      placeholder?: string;
    }>(),
    {
      limit: 280,
      placeholder: "Share a quick update...",
    }
  );

  const length = ref(0);
  const empty = ref(true);
  const posts = ref<{ id: number; html: string }[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        horizontalRule: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-20 focus:outline-none prose prose-sm dark:prose-invert max-w-none",
        "aria-label": "Post content",
        role: "textbox",
        "aria-multiline": "true",
      },
    },
    onUpdate: ({ editor }) => {
      length.value = editor.getText().length;
      empty.value = editor.isEmpty;
    },
  });

  const remaining = computed(() => props.limit - length.value);
  const over = computed(() => remaining.value < 0);

  function toggleLink() {
    if (!editor.value) return;
    if (editor.value.isActive("link")) {
      editor.value.chain().focus().unsetLink().run();
      return;
    }
    const href = window.prompt("Link address", "https://");
    if (href) editor.value.chain().focus().setLink({ href }).run();
  }

  function post() {
    if (!editor.value || empty.value || over.value) return;
    posts.value.unshift({ id: posts.value.length + 1, html: editor.value.getHTML() });
    editor.value.commands.clearContent(true);
    editor.value.commands.unsetAllMarks();
    length.value = 0;
    empty.value = true;
    useSonner.success("Posted");
  }

  onBeforeUnmount(() => editor.value?.destroy());
</script>
