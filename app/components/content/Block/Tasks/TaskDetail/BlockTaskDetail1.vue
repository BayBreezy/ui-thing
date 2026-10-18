<template>
  <!--
    Task detail in a side sheet
    Features: Row list that opens a sheet from the right, editable title and description, status, assignee and due date fields, labels, a save button with feedback and a sheet that closes with escape
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <ul class="mt-6 divide-y rounded-xl border">
        <li v-for="task in tasks" :key="task.id">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
            @click="openTask(task)"
          >
            <Icon
              :name="task.status === 'Done' ? 'lucide:circle-check' : 'lucide:circle'"
              class="size-4"
              :class="task.status === 'Done' ? 'text-green-600' : 'text-muted-foreground'"
            />
            <span
              class="flex-1 text-sm font-medium"
              :class="task.status === 'Done' ? 'text-muted-foreground line-through' : ''"
              >{{ task.title }}</span
            >
            <UiBadge variant="soft" :color="colors[task.status]" shape="pill">{{
              task.status
            }}</UiBadge>
          </button>
        </li>
      </ul>
    </div>

    <UiSheet v-model:open="isOpen">
      <UiSheetContent side="right" class="w-full sm:max-w-md">
        <UiSheetHeader>
          <UiSheetTitle>Task details</UiSheetTitle>
          <UiSheetDescription>Edit the task, then save your changes.</UiSheetDescription>
        </UiSheetHeader>
        <form v-if="draft" class="grid gap-5 overflow-y-auto px-4" @submit.prevent="save">
          <div class="grid gap-2">
            <UiLabel for="td1-title">Title</UiLabel>
            <UiInput id="td1-title" v-model="draft.title" />
          </div>
          <div class="grid gap-2">
            <UiLabel for="td1-desc">Description</UiLabel>
            <UiTextarea id="td1-desc" v-model="draft.description" :rows="4" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <UiLabel for="td1-status">Status</UiLabel>
              <UiNativeSelect id="td1-status" v-model="draft.status">
                <option v-for="status in statuses" :key="status">{{ status }}</option>
              </UiNativeSelect>
            </div>
            <div class="grid gap-2">
              <UiLabel for="td1-assignee">Assignee</UiLabel>
              <UiNativeSelect id="td1-assignee" v-model="draft.assignee">
                <option v-for="person in people" :key="person">{{ person }}</option>
              </UiNativeSelect>
            </div>
          </div>
          <div class="grid gap-2">
            <UiLabel for="td1-due">Due date</UiLabel>
            <UiInput id="td1-due" v-model="draft.due" type="date" />
          </div>
          <div class="grid gap-2">
            <span class="text-sm leading-none font-medium">Labels</span>
            <div class="flex flex-wrap gap-1.5">
              <UiBadge
                v-for="label in draft.labels"
                :key="label"
                variant="secondary"
                class="gap-1 pr-1"
              >
                {{ label }}
                <button
                  type="button"
                  :aria-label="`Remove ${label}`"
                  class="rounded p-0.5"
                  @click="draft.labels = draft.labels.filter((item) => item !== label)"
                >
                  <Icon name="lucide:x" class="size-3" />
                </button>
              </UiBadge>
              <span v-if="!draft.labels.length" class="text-muted-foreground text-sm"
                >No labels</span
              >
            </div>
          </div>
        </form>
        <UiSheetFooter>
          <UiButton @click="save">Save changes</UiButton>
          <UiSheetClose as-child><UiButton variant="outline">Cancel</UiButton></UiSheetClose>
        </UiSheetFooter>
      </UiSheetContent>
    </UiSheet>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "To do" | "In progress" | "Done";
  type Task = {
    id: string;
    title: string;
    description: string;
    status: Status;
    assignee: string;
    due: string;
    labels: string[];
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
          id: "t1",
          title: "Design the new settings page",
          description: "Cover profile, billing and notifications. Share a prototype with the team.",
          status: "In progress",
          assignee: "Sofia",
          due: "2026-10-24",
          labels: ["Design", "Settings"],
        },
        {
          id: "t2",
          title: "Fix flaky checkout test",
          description: "Fails about once in ten runs on CI. Likely a timing issue.",
          status: "To do",
          assignee: "Liam",
          due: "2026-10-21",
          labels: ["Bug"],
        },
        {
          id: "t3",
          title: "Publish the changelog",
          description: "Summarize the last two sprints for customers.",
          status: "Done",
          assignee: "Aisha",
          due: "2026-10-15",
          labels: ["Content"],
        },
      ],
    }
  );

  const statuses: Status[] = ["To do", "In progress", "Done"];
  const people = ["Sofia", "Liam", "Aisha", "Maya", "Noah"];
  const colors = { "To do": "slate", "In progress": "blue", Done: "green" } as const;

  const tasks = ref<Task[]>(props.initial.map((task) => ({ ...task, labels: [...task.labels] })));
  const isOpen = ref(false);
  const draft = ref<Task>();

  function openTask(task: Task) {
    draft.value = { ...task, labels: [...task.labels] };
    isOpen.value = true;
  }

  function save() {
    if (!draft.value) return;
    const index = tasks.value.findIndex((task) => task.id === draft.value!.id);
    if (index > -1) tasks.value[index] = { ...draft.value };
    isOpen.value = false;
    useSonner.success("Task saved");
  }
</script>
