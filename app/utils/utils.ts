import type { Updater } from "@tanstack/vue-table";

import { Icon } from "#components";

/**
 * Function used to update a ref value with a new value or a function that returns a new value.
 */
export function tanstackValueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === "function" ? updaterOrValue(ref.value) : updaterOrValue;
}

/**
 * Represents a task in the system.
 */
export interface HomeTask {
  id: string;
  title: string;
  status: Status;
  label: Label;
  priority: Priority;
}

enum Label {
  Bug = "bug",
  Documentation = "documentation",
  Feature = "feature",
}

enum Priority {
  High = "high",
  Low = "low",
  Medium = "medium",
}

enum Status {
  Backlog = "backlog",
  Canceled = "canceled",
  Done = "done",
  InProgress = "in progress",
  Todo = "todo",
}

export const homeTasksLabels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
];

export const homeTasksStatuses: Array<{
  value: string;
  label: string;
  icon: ReturnType<typeof h>;
}> = [
  {
    value: "backlog",
    label: "Backlog",
    icon: h(Icon, { name: "lucide:circle-question-mark" }),
  },
  {
    value: "todo",
    label: "Todo",
    icon: h(Icon, { name: "lucide:circle" }),
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: h(Icon, { name: "lucide:timer" }),
  },
  {
    value: "done",
    label: "Done",
    icon: h(Icon, { name: "lucide:circle-check" }),
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: h(Icon, { name: "lucide:circle-x" }),
  },
];

export const homeTasksPriorities: Array<{
  value: string;
  label: string;
  icon: ReturnType<typeof h>;
}> = [
  {
    value: "low",
    label: "Low",
    icon: h(Icon, { name: "lucide:arrow-down" }),
  },
  {
    value: "medium",
    label: "Medium",
    icon: h(Icon, { name: "lucide:arrow-right" }),
  },
  {
    value: "high",
    label: "High",
    icon: h(Icon, { name: "lucide:arrow-up" }),
  },
];
