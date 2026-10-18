<template>
  <!--
    Full page task detail
    Features: Breadcrumbs, click to edit title with Editable, description textarea, subtask checklist with progress, properties card with status and priority and a mark complete button that updates the page
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiBreadcrumbs
      :items="[
        { label: 'Projects', link: '#' },
        { label: 'Website relaunch', link: '#' },
        { label: `Task ${task.key}` },
      ]"
      class="mb-6"
    />

    <div class="grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div class="space-y-8">
        <div>
          <UiEditable v-model="task.title" submit-mode="both">
            <UiEditableArea>
              <UiEditablePreview
                class="hover:bg-muted block cursor-text rounded-md px-2 py-1 text-3xl font-bold tracking-tight"
              />
              <UiEditableInput as-child
                ><UiInput class="h-auto text-3xl font-bold tracking-tight" aria-label="Task title"
              /></UiEditableInput>
            </UiEditableArea>
          </UiEditable>
          <p class="text-muted-foreground mt-1 px-2 text-sm">
            Opened by {{ task.author }} on {{ task.opened }}
          </p>
        </div>

        <section aria-labelledby="td2-desc">
          <h2 id="td2-desc" class="mb-2 text-sm font-semibold">Description</h2>
          <UiTextarea v-model="task.description" :rows="5" aria-label="Description" />
        </section>

        <section aria-labelledby="td2-subs">
          <div class="mb-2 flex items-center justify-between">
            <h2 id="td2-subs" class="text-sm font-semibold">Subtasks</h2>
            <span class="text-muted-foreground text-xs tabular-nums"
              >{{ doneCount }}/{{ task.subtasks.length }}</span
            >
          </div>
          <UiProgress
            :model-value="(doneCount / Math.max(task.subtasks.length, 1)) * 100"
            class="mb-3 h-1.5"
            aria-label="Subtask progress"
          />
          <ul class="divide-y rounded-lg border">
            <li
              v-for="sub in task.subtasks"
              :key="sub.id"
              class="flex items-center gap-3 px-3 py-2"
            >
              <UiCheckbox :id="`td2-${sub.id}`" v-model="sub.done" />
              <UiLabel
                :for="`td2-${sub.id}`"
                class="cursor-pointer text-sm font-normal"
                :class="sub.done ? 'text-muted-foreground line-through' : ''"
                >{{ sub.title }}</UiLabel
              >
            </li>
          </ul>
        </section>
      </div>

      <aside class="space-y-4" aria-label="Properties">
        <UiButton
          class="w-full"
          :variant="completed ? 'outline' : 'default'"
          @click="task.status = completed ? 'In progress' : 'Done'"
        >
          <Icon :name="completed ? 'lucide:rotate-ccw' : 'lucide:check'" class="size-4" />
          {{ completed ? "Reopen task" : "Mark complete" }}
        </UiButton>
        <UiCard class="gap-0 py-0">
          <dl class="divide-y text-sm">
            <div class="flex items-center justify-between gap-3 px-4 py-3">
              <dt class="text-muted-foreground">Status</dt>
              <dd>
                <UiBadge variant="soft" :color="completed ? 'green' : 'blue'" shape="pill">{{
                  task.status
                }}</UiBadge>
              </dd>
            </div>
            <div class="flex items-center justify-between gap-3 px-4 py-3">
              <dt class="text-muted-foreground">Priority</dt>
              <dd>
                <UiNativeSelect v-model="task.priority" class="h-8 w-28" aria-label="Priority"
                  ><option v-for="item in ['High', 'Medium', 'Low']" :key="item">
                    {{ item }}
                  </option></UiNativeSelect
                >
              </dd>
            </div>
            <div class="flex items-center justify-between gap-3 px-4 py-3">
              <dt class="text-muted-foreground">Assignee</dt>
              <dd class="flex items-center gap-2">
                <UiAvatar :src="task.avatar" fallback="S" class="size-6" />{{ task.assignee }}
              </dd>
            </div>
            <div class="flex items-center justify-between gap-3 px-4 py-3">
              <dt class="text-muted-foreground">Due</dt>
              <dd class="font-medium">{{ task.due }}</dd>
            </div>
          </dl>
        </UiCard>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Sub = { id: string; title: string; done: boolean };
  type Task = {
    key: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: string;
    avatar: string;
    due: string;
    author: string;
    opened: string;
    subtasks: Sub[];
  };

  const props = withDefaults(
    defineProps<{
      initial?: Task;
    }>(),
    {
      initial: () => ({
        key: "WEB-142",
        title: "Redesign the pricing page",
        description:
          "Show three plans with a monthly and yearly switch, add a comparison table and keep the page fast on mobile.",
        status: "In progress",
        priority: "High",
        assignee: "Sofia Alvarez",
        avatar: "https://i.pravatar.cc/80?img=32",
        due: "Oct 24, 2026",
        author: "Maya Chen",
        opened: "Oct 9",
        subtasks: [
          { id: "s1", title: "Collect competitor examples", done: true },
          { id: "s2", title: "Sketch three layouts", done: true },
          { id: "s3", title: "Build the plan cards", done: false },
          { id: "s4", title: "Add the comparison table", done: false },
        ],
      }),
    }
  );

  const task = reactive<Task>({
    ...props.initial,
    subtasks: props.initial.subtasks.map((sub) => ({ ...sub })),
  });

  const doneCount = computed(() => task.subtasks.filter((sub) => sub.done).length);
  const completed = computed(() => task.status === "Done");
</script>
