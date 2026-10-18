<template>
  <!--
    Task properties sidebar
    Features: Label and value rows with popover pickers for status, assignee and priority, labels you can add and remove, due date input, estimate stepper and a read only created and updated footer
  -->
  <UiContainer class="py-12 lg:py-20">
    <aside class="mx-auto w-full max-w-xs rounded-xl border" aria-label="Task properties">
      <h1 class="border-b px-4 py-3 text-sm font-semibold">Properties</h1>
      <dl class="divide-y text-sm">
        <div class="flex items-center justify-between gap-3 px-4 py-2.5">
          <dt class="text-muted-foreground">Status</dt>
          <dd>
            <UiPopover v-model:open="menus.status">
              <UiPopoverTrigger as-child>
                <UiButton variant="ghost" size="sm" class="gap-2"
                  ><span class="size-2 rounded-full" :class="statusDot[task.status]" />{{
                    task.status
                  }}</UiButton
                >
              </UiPopoverTrigger>
              <UiPopoverContent align="end" class="w-44 p-1">
                <button
                  v-for="item in statuses"
                  :key="item"
                  type="button"
                  class="hover:bg-accent flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm"
                  @click="pick('status', item)"
                >
                  <span class="size-2 rounded-full" :class="statusDot[item]" />{{ item
                  }}<Icon v-if="task.status === item" name="lucide:check" class="ml-auto size-4" />
                </button>
              </UiPopoverContent>
            </UiPopover>
          </dd>
        </div>
        <div class="flex items-center justify-between gap-3 px-4 py-2.5">
          <dt class="text-muted-foreground">Assignee</dt>
          <dd>
            <UiPopover v-model:open="menus.assignee">
              <UiPopoverTrigger as-child>
                <UiButton variant="ghost" size="sm" class="gap-2"
                  ><UiAvatar
                    :src="person(task.assignee).avatar"
                    :fallback="task.assignee[0]"
                    class="size-5"
                  />{{ task.assignee }}</UiButton
                >
              </UiPopoverTrigger>
              <UiPopoverContent align="end" class="w-48 p-1">
                <button
                  v-for="item in people"
                  :key="item.name"
                  type="button"
                  class="hover:bg-accent flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm"
                  @click="pick('assignee', item.name)"
                >
                  <UiAvatar :src="item.avatar" :fallback="item.name[0]" class="size-5" />{{
                    item.name
                  }}<Icon
                    v-if="task.assignee === item.name"
                    name="lucide:check"
                    class="ml-auto size-4"
                  />
                </button>
              </UiPopoverContent>
            </UiPopover>
          </dd>
        </div>
        <div class="flex items-center justify-between gap-3 px-4 py-2.5">
          <dt class="text-muted-foreground">Priority</dt>
          <dd>
            <UiToggleGroup v-model="task.priority" type="single" size="sm" aria-label="Priority">
              <UiToggleGroupItem
                v-for="item in ['Low', 'Med', 'High']"
                :key="item"
                :value="item"
                class="h-7 px-2 text-xs"
                >{{ item }}</UiToggleGroupItem
              >
            </UiToggleGroup>
          </dd>
        </div>
        <div class="flex items-center justify-between gap-3 px-4 py-2.5">
          <dt class="text-muted-foreground"><label for="td5-due">Due date</label></dt>
          <dd><UiInput id="td5-due" v-model="task.due" type="date" class="h-8 w-36 text-xs" /></dd>
        </div>
        <div class="flex items-center justify-between gap-3 px-4 py-2.5">
          <dt class="text-muted-foreground">Estimate</dt>
          <dd class="flex items-center gap-1">
            <UiButton
              variant="outline"
              size="icon-sm"
              class="size-7"
              aria-label="Decrease estimate"
              :disabled="task.estimate <= 1"
              @click="task.estimate--"
              ><Icon name="lucide:minus" class="size-3.5"
            /></UiButton>
            <span class="w-10 text-center tabular-nums" aria-live="polite"
              >{{ task.estimate }} pt</span
            >
            <UiButton
              variant="outline"
              size="icon-sm"
              class="size-7"
              aria-label="Increase estimate"
              @click="task.estimate++"
              ><Icon name="lucide:plus" class="size-3.5"
            /></UiButton>
          </dd>
        </div>
        <div class="px-4 py-3">
          <dt class="text-muted-foreground mb-2">Labels</dt>
          <dd class="flex flex-wrap gap-1.5">
            <UiBadge
              v-for="label in task.labels"
              :key="label"
              variant="secondary"
              class="gap-1 pr-1"
            >
              {{ label }}
              <button
                type="button"
                :aria-label="`Remove ${label}`"
                class="rounded p-0.5"
                @click="task.labels = task.labels.filter((item) => item !== label)"
              >
                <Icon name="lucide:x" class="size-3" />
              </button>
            </UiBadge>
            <form class="inline-flex" @submit.prevent="addLabel">
              <UiLabel for="td5-label" class="sr-only">Add a label</UiLabel>
              <input
                id="td5-label"
                v-model="newLabel"
                placeholder="+ Add"
                autocomplete="off"
                class="placeholder:text-muted-foreground/70 w-16 rounded bg-transparent px-1 text-xs outline-none"
              />
            </form>
          </dd>
        </div>
      </dl>
      <p class="text-muted-foreground border-t px-4 py-3 text-xs">
        Created Oct 9 by Maya · Updated 2 hours ago
      </p>
    </aside>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = {
    status: string;
    assignee: string;
    priority: string;
    due: string;
    estimate: number;
    labels: string[];
  };

  const props = withDefaults(
    defineProps<{
      initial?: Task;
    }>(),
    {
      initial: () => ({
        status: "In progress",
        assignee: "Sofia",
        priority: "High",
        due: "2026-10-24",
        estimate: 5,
        labels: ["Design", "Pricing"],
      }),
    }
  );

  const statuses = ["To do", "In progress", "In review", "Done"];
  const statusDot: Record<string, string> = {
    "To do": "bg-slate-400",
    "In progress": "bg-blue-500",
    "In review": "bg-amber-500",
    Done: "bg-green-500",
  };
  const people = [
    { name: "Sofia", avatar: "https://i.pravatar.cc/80?img=32" },
    { name: "Liam", avatar: "https://i.pravatar.cc/80?img=12" },
    { name: "Aisha", avatar: "https://i.pravatar.cc/80?img=44" },
  ];

  const task = reactive<Task>({ ...props.initial, labels: [...props.initial.labels] });
  const menus = reactive({ status: false, assignee: false });
  const newLabel = ref("");

  const person = (name: string) => people.find((item) => item.name === name) ?? people[0]!;

  function pick(key: "status" | "assignee", value: string) {
    task[key] = value;
    menus[key] = false;
  }

  function addLabel() {
    const label = newLabel.value.trim();
    if (label && !task.labels.includes(label)) task.labels.push(label);
    newLabel.value = "";
  }
</script>
