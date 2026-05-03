<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="selectedPeople" multiple>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput :display-value="displaySelected" placeholder="Select people..." />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>People</UiAutocompleteLabel>
          <template v-for="(p, i) in people" :key="i">
            <UiAutocompleteItem class="mb-1 last:mb-0" :value="p" icon="lucide:check">{{
              p.name
            }}</UiAutocompleteItem>
          </template>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
  ];
  const selectedPeople = ref([people[0], people[1]]);

  type Person = (typeof people)[number];

  const displaySelected = (p: any) => {
    if (!p) return;
    if (p && p.length == 1) return p[0]?.name;
    return p.map((i: Person) => i.name).join(", ");
  };
</script>
