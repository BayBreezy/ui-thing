<template>
  <!--
    Comment and notes editor
    Features: A compact card with the author, an editor that grows with its content, a small toolbar for bold, italic, code, list and link, cancel and comment buttons that are disabled until you type, a thread of earlier comments and new comments that appear at the bottom
  -->
  <UiContainer class="py-12">
    <div class="mx-auto max-w-2xl space-y-6">
      <h2 class="text-xl font-bold tracking-tight">
        Comments
        <span class="text-muted-foreground text-base font-normal">({{ comments.length }})</span>
      </h2>

      <ul class="space-y-5" aria-live="polite">
        <li v-for="comment in comments" :key="comment.id" class="flex gap-3">
          <UiAvatar
            :src="`https://i.pravatar.cc/80?img=${comment.avatar}`"
            :fallback="comment.who.slice(0, 1)"
            class="size-9"
          />
          <div class="bg-muted/40 min-w-0 flex-1 rounded-xl border px-4 py-3">
            <div class="flex items-baseline gap-2">
              <p class="text-sm font-medium">{{ comment.who }}</p>
              <p class="text-muted-foreground text-xs">{{ comment.when }}</p>
            </div>
            <!-- The HTML comes from the editor. Sanitize it on the server before you store or show it. -->
            <div class="prose prose-sm dark:prose-invert mt-1 max-w-none" v-html="comment.html" />
          </div>
        </li>
      </ul>

      <div class="flex gap-3">
        <UiAvatar src="https://i.pravatar.cc/80?img=32" fallback="Y" class="size-9" />
        <div
          v-if="editor"
          class="bg-card focus-within:ring-ring/40 min-w-0 flex-1 rounded-xl border focus-within:ring-[3px]"
        >
          <div class="relative">
            <EditorContent :editor="editor" class="px-4 pt-3" />
            <p
              v-if="empty"
              class="text-muted-foreground pointer-events-none absolute top-3 left-4 text-sm"
              aria-hidden="true"
            >
              Write a comment...
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-1 border-t px-2 py-1.5">
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
              aria-label="Code"
              :model-value="editor.isActive('code')"
              @click="editor.chain().focus().toggleCode().run()"
              ><Icon name="lucide:code" class="size-4"
            /></UiToggle>
            <UiToggle
              size="sm"
              aria-label="Bullet list"
              :model-value="editor.isActive('bulletList')"
              @click="editor.chain().focus().toggleBulletList().run()"
              ><Icon name="lucide:list" class="size-4"
            /></UiToggle>
            <div class="ml-auto flex gap-2">
              <UiButton variant="ghost" size="sm" :disabled="empty" @click="clear">Cancel</UiButton>
              <UiButton size="sm" :disabled="empty" @click="submit">Comment</UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  type Comment = { id: number; who: string; avatar: number; when: string; html: string };

  const props = withDefaults(
    defineProps<{
      initial?: Comment[];
    }>(),
    {
      initial: () => [
        {
          id: 1,
          who: "Maya Patel",
          avatar: 32,
          when: "2 hours ago",
          html: "<p>I pushed the new <strong>hero layout</strong> to staging. Can someone check it on a phone?</p>",
        },
        {
          id: 2,
          who: "Leo Fischer",
          avatar: 12,
          when: "1 hour ago",
          html: '<p>Looks good. Two small things:</p><ul><li>The button wraps at 320px</li><li>The image needs <code>loading="lazy"</code></li></ul>',
        },
      ],
    }
  );

  const comments = ref<Comment[]>(props.initial.map((comment) => ({ ...comment })));
  const empty = ref(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        orderedList: false,
        horizontalRule: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-16 max-h-60 overflow-y-auto focus:outline-none prose prose-sm dark:prose-invert max-w-none pb-2",
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Comment",
      },
    },
    onUpdate: ({ editor }) => {
      empty.value = editor.isEmpty;
    },
  });

  function clear() {
    editor.value?.commands.clearContent(true);
    editor.value?.commands.unsetAllMarks();
    empty.value = true;
  }

  function submit() {
    if (!editor.value || empty.value) return;
    comments.value.push({
      id: comments.value.length + 1,
      who: "You",
      avatar: 32,
      when: "Just now",
      html: editor.value.getHTML(),
    });
    clear();
    useSonner.success("Comment added");
  }

  onBeforeUnmount(() => editor.value?.destroy());
</script>
