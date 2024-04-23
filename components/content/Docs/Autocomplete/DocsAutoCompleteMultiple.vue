<template>
  <div>
    <UiAutocomplete
      v-model="selectedPeople"
      multiple
      :display-value="displaySelected"
      :filter-function="filtered"
    >
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Select people..." />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>People</UiAutocompleteLabel>
          <template v-for="(p, i) in people" :key="i">
            <UiAutocompleteItem :value="p" icon="lucide:check">{{ p.name }}</UiAutocompleteItem>
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

  const displaySelected = (p: any) => {
    console.log(p);
    return p;
  };

  function filtered(list: any[], searchTerm: string) {
    return list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
</script>
