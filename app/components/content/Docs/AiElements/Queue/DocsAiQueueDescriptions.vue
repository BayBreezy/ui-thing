<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible
      v-for="section in sections"
      :key="section.id"
      :default-open="section.defaultOpen"
      :unmount-on-hide="false"
    >
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon :name="section.icon" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>{{ section.title }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <template v-for="todo in section.todos" :key="todo.title">
            <UiTraceCollapsible v-if="todo.description">
              <UiTraceCollapsibleTrigger>
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon v-if="todo.done" name="lucide:circle-check" class="size-4" />
                    <Icon v-else name="lucide:circle" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>{{ todo.title }}</UiTraceTitle>
                </UiTraceLine>
              </UiTraceCollapsibleTrigger>
              <UiTraceCollapsibleContent>
                {{ todo.description }}
              </UiTraceCollapsibleContent>
            </UiTraceCollapsible>
            <UiTraceLine v-else>
              <UiTraceIcon>
                <Icon v-if="todo.done" name="lucide:circle-check" class="size-4" />
                <Icon v-else name="lucide:circle" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>{{ todo.title }}</UiTraceTitle>
            </UiTraceLine>
          </template>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const todos: { title: string; description?: string; done: boolean }[] = [
    {
      title: "Write the migration guide",
      description: "Cover the renamed props and the new data attributes.",
      done: true,
    },
    { title: "Add a changeset", done: true },
    {
      title: "Fix the focus ring on the select trigger",
      description: "It is clipped by overflow-hidden on the field.",
      done: false,
    },
    { title: "Update the registry snapshots", done: false },
    {
      title: "Add tests for the combobox",
      description: "Typing, clearing and keyboard selection.",
      done: false,
    },
  ];

  const sections = [
    {
      id: "pending",
      icon: "lucide:list-todo",
      title: `${todos.filter((todo) => !todo.done).length} to do`,
      todos: todos.filter((todo) => !todo.done),
      defaultOpen: true,
    },
    {
      id: "completed",
      icon: "lucide:list-checks",
      title: `${todos.filter((todo) => todo.done).length} completed`,
      todos: todos.filter((todo) => todo.done),
      defaultOpen: false,
    },
  ];
</script>
