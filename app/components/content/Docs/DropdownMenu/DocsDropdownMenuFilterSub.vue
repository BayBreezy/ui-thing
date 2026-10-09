<template>
  <div class="flex w-full items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Task options</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-56">
        <UiDropdownMenuLabel label="Task" />
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem title="Edit" icon="ph:pencil-simple" shortcut="⌘E" />
        <UiDropdownMenuSub @update:open="(open) => !open && (search = '')">
          <UiDropdownMenuSubTrigger title="Assign to" icon="ph:user-plus" text-value="Assign to" />
          <UiDropdownMenuSubContent class="w-52">
            <UiDropdownMenuFilter
              v-model="search"
              auto-focus
              aria-label="Filter teammates"
              placeholder="Search teammates…"
            />
            <UiDropdownMenuRadioGroup v-model="assignee">
              <UiDropdownMenuRadioItem
                v-for="person in filteredPeople"
                :key="person.name"
                :value="person.name"
                :text-value="person.name"
              >
                <div class="flex flex-col">
                  <span>{{ person.name }}</span>
                  <span class="text-muted-foreground text-xs">{{ person.role }}</span>
                </div>
              </UiDropdownMenuRadioItem>
            </UiDropdownMenuRadioGroup>
            <p
              v-if="!filteredPeople.length"
              class="text-muted-foreground px-2 py-4 text-center text-sm"
            >
              No teammates found.
            </p>
          </UiDropdownMenuSubContent>
        </UiDropdownMenuSub>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem title="Delete" icon="ph:trash" variant="destructive" />
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
  import { useFilter } from "reka-ui";

  const people = [
    { name: "Ada Lovelace", role: "Engineering" },
    { name: "Grace Hopper", role: "Engineering" },
    { name: "Margaret Hamilton", role: "Platform" },
    { name: "Katherine Johnson", role: "Data" },
    { name: "Linus Torvalds", role: "Infrastructure" },
    { name: "Radia Perlman", role: "Networking" },
  ];

  const search = ref("");
  const assignee = ref("Ada Lovelace");
  const { contains } = useFilter({ sensitivity: "base" });

  const filteredPeople = computed(() =>
    search.value
      ? people.filter(
          (person) => contains(person.name, search.value) || contains(person.role, search.value)
        )
      : people
  );
</script>
