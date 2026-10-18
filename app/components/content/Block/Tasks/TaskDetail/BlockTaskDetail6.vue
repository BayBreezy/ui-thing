<template>
  <!--
    Quick add task dialog
    Features: Dialog with a large title field, quick chips for project, assignee, priority and due date, a keyboard shortcut to save, validation message and a task list that shows the new task
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-lg">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold tracking-tight">{{ title }}</h1>
        <UiDialog v-model:open="open">
          <UiDialogTrigger as-child>
            <UiButton><Icon name="lucide:plus" class="size-4" />New task</UiButton>
          </UiDialogTrigger>
          <UiDialogContent
            class="sm:max-w-lg"
            @keydown.meta.enter="save"
            @keydown.ctrl.enter="save"
          >
            <UiDialogHeader>
              <UiDialogTitle>New task</UiDialogTitle>
              <UiDialogDescription>Capture it now, add detail later.</UiDialogDescription>
            </UiDialogHeader>
            <form class="grid gap-4" novalidate @submit.prevent="save">
              <div class="grid gap-1.5">
                <UiLabel for="td6-title" class="sr-only">Task title</UiLabel>
                <UiInput
                  id="td6-title"
                  v-model="form.title"
                  placeholder="What needs to be done?"
                  class="h-11 text-base"
                  :aria-invalid="Boolean(error)"
                  aria-describedby="td6-error"
                  autocomplete="off"
                />
                <p v-if="error" id="td6-error" class="text-destructive text-sm" role="alert">
                  {{ error }}
                </p>
              </div>
              <UiTextarea
                v-model="form.notes"
                :rows="3"
                placeholder="Add notes (optional)"
                aria-label="Notes"
              />
              <div class="flex flex-wrap gap-2">
                <UiNativeSelect
                  v-model="form.project"
                  class="h-8 w-auto text-xs"
                  aria-label="Project"
                  ><option v-for="item in projects" :key="item">{{ item }}</option></UiNativeSelect
                >
                <UiNativeSelect
                  v-model="form.assignee"
                  class="h-8 w-auto text-xs"
                  aria-label="Assignee"
                  ><option v-for="item in people" :key="item">{{ item }}</option></UiNativeSelect
                >
                <UiNativeSelect
                  v-model="form.priority"
                  class="h-8 w-auto text-xs"
                  aria-label="Priority"
                  ><option v-for="item in ['Low', 'Medium', 'High']" :key="item">
                    {{ item }}
                  </option></UiNativeSelect
                >
                <UiInput
                  v-model="form.due"
                  type="date"
                  class="h-8 w-auto text-xs"
                  aria-label="Due date"
                />
              </div>
              <UiDialogFooter class="items-center sm:justify-between">
                <span class="text-muted-foreground hidden text-xs sm:block"
                  ><UiKbd>Ctrl</UiKbd> + <UiKbd>Enter</UiKbd> to save</span
                >
                <div class="flex gap-2">
                  <UiDialogClose as-child
                    ><UiButton type="button" variant="outline">Cancel</UiButton></UiDialogClose
                  >
                  <UiButton type="submit">Create task</UiButton>
                </div>
              </UiDialogFooter>
            </form>
          </UiDialogContent>
        </UiDialog>
      </div>

      <ul class="mt-6 divide-y rounded-xl border" aria-live="polite">
        <li v-for="task in tasks" :key="task.id" class="px-4 py-3">
          <p class="text-sm font-medium">{{ task.title }}</p>
          <p class="text-muted-foreground mt-0.5 text-xs">
            {{ task.project }} · {{ task.assignee }} · {{ task.priority }} priority<template
              v-if="task.due"
            >
              · due {{ task.due }}</template
            >
          </p>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = {
    id: string;
    title: string;
    project: string;
    assignee: string;
    priority: string;
    due: string;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Task[];
    }>(),
    {
      title: "Tasks",
      initial: () => [
        {
          id: "q1",
          title: "Send the weekly update",
          project: "Company",
          assignee: "Maya",
          priority: "Medium",
          due: "",
        },
        {
          id: "q2",
          title: "Review the new icons",
          project: "Design",
          assignee: "Sofia",
          priority: "Low",
          due: "2026-10-25",
        },
      ],
    }
  );

  const projects = ["Company", "Design", "Engineering", "Marketing"];
  const people = ["Maya", "Sofia", "Liam", "Aisha"];

  const tasks = ref<Task[]>(props.initial.map((task) => ({ ...task })));
  const open = ref(false);
  const error = ref("");
  const blank = () => ({
    title: "",
    notes: "",
    project: projects[0]!,
    assignee: people[0]!,
    priority: "Medium",
    due: "",
  });
  const form = reactive(blank());
  let counter = 100;

  function save() {
    if (!form.title.trim()) {
      error.value = "Give the task a title.";
      return;
    }
    tasks.value.unshift({
      id: `n${counter++}`,
      title: form.title.trim(),
      project: form.project,
      assignee: form.assignee,
      priority: form.priority,
      due: form.due,
    });
    Object.assign(form, blank());
    error.value = "";
    open.value = false;
    useSonner.success("Task created");
  }
</script>
