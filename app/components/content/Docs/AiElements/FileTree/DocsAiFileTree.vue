<template>
  <DefineNode v-slot="{ node }">
    <UiCollapsible v-if="node.type === 'folder'" default-open>
      <UiCollapsibleTrigger as-child>
        <UiButton
          variant="ghost"
          size="sm"
          class="aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50 w-full justify-start font-normal aria-expanded:bg-transparent"
        >
          <Icon
            name="lucide:chevron-right"
            class="size-4 transition-transform group-data-[state=open]/button:rotate-90"
          />
          <Icon name="lucide:folder" class="size-4" />
          {{ node.name }}
        </UiButton>
      </UiCollapsibleTrigger>
      <UiCollapsibleContent>
        <div class="ml-4 flex flex-col">
          <ReuseNode v-for="child in node.children" :key="child.path" :node="child" />
        </div>
      </UiCollapsibleContent>
    </UiCollapsible>
    <UiButton
      v-else
      variant="ghost"
      size="sm"
      :class="`w-full justify-start font-normal ${selected === node.path ? 'bg-accent text-accent-foreground' : ''}`"
      :aria-current="selected === node.path ? 'true' : undefined"
      @click="selected = node.path"
    >
      <Icon name="lucide:file" class="size-4" />
      {{ node.name }}
    </UiButton>
  </DefineNode>
  <div class="mx-auto flex w-full max-w-xs flex-col py-6 text-sm">
    <ReuseNode v-for="file in files" :key="file.path" :node="file" />
  </div>
</template>

<script lang="ts" setup>
  type FileNode =
    | { type: "file"; name: string; path: string }
    | { type: "folder"; name: string; path: string; children: FileNode[] };

  const files: FileNode[] = [
    {
      type: "folder",
      name: "app",
      path: "app",
      children: [
        { type: "file", name: "app.vue", path: "app/app.vue" },
        { type: "file", name: "error.vue", path: "app/error.vue" },
      ],
    },
    {
      type: "folder",
      name: "components",
      path: "components",
      children: [
        {
          type: "folder",
          name: "ui",
          path: "components/ui",
          children: [
            {
              type: "file",
              name: "Button.vue",
              path: "components/ui/Button.vue",
            },
          ],
        },
        {
          type: "file",
          name: "LoginForm.vue",
          path: "components/LoginForm.vue",
        },
      ],
    },
  ];

  const selected = ref("components/ui/Button.vue");

  // Each node renders its children with the same template.
  const [DefineNode, ReuseNode] = createReusableTemplate<{ node: FileNode }>();
</script>
