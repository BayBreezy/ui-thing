<template>
  <div>
    <UiAutocomplete v-model="selected" :display-value="displaySelected">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Select a car..." />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>Cars</UiAutocompleteLabel>
          <template v-for="(c, i) in cars" :key="i">
            <UiAutocompleteItem :value="c" icon="lucide:check">{{ c.name }}</UiAutocompleteItem>
          </template>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const cars = [
    { name: "Audi", value: "audi" },
    { name: "BMW", value: "bmw" },
    { name: "Chevrolet", value: "chevrolet" },
    { name: "Dodge", value: "dodge" },
    { name: "Ford", value: "ford" },
    { name: "GMC", value: "gmc" },
    { name: "Honda", value: "honda" },
    { name: "Infiniti", value: "infiniti" },
    { name: "Jeep", value: "jeep" },
    { name: "Kia", value: "kia" },
    { name: "Lexus", value: "lexus" },
  ];

  const selected = ref(cars[2]);

  const displaySelected = (car: any) => car.name;
</script>
