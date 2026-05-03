---
title: VeeSelect
description: A select component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Native Select Source
    href: /components/nativeselect
    icon: lucide:arrow-down-square
---

## Source code

Click :SourceCodeLink{component="Vee/Select.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-select"}

## Usage

### Form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::prose-show-case

:DocsVeeSelect

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Select/DocsVeeSelect.vue" code lang="vue" -->

```vue [DocsVeeSelect.vue]
<template>
  <form class="mx-auto max-w-xs" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="grid gap-5">
      <UiVeeSelect label="Country" name="country" hint="Pick the country you want to visit">
        <option disabled value="">Select a country</option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </UiVeeSelect>
      <AnimatePresence>
        <Motion
          v-if="values.country"
          :initial="{ opacity: 0, y: -10 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -10 }"
          :transition="{ type: 'keyframes' }"
        >
          <UiVeeSelect
            label="Attraction"
            name="attraction"
            hint="Pick the attraction you want to visit"
          >
            <option disabled value="">Select an attraction</option>
            <option v-for="spot in spots" :key="spot" :value="spot">
              {{ spot }}
            </option>
          </UiVeeSelect>
        </Motion>
      </AnimatePresence>
      <UiButton :loading="isSubmitting" type="submit"> Book now </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const places = [
    { country: "Jamaica", spots: ["Dunn's River Falls", "Doctor's Cave Beach", "Blue Lagoon"] },
    { country: "Mexico", spots: ["Chichen Itza", "Cancun Beaches", "Tulum Ruins"] },
    { country: "USA", spots: ["Grand Canyon", "Statue of Liberty", "Yellowstone"] },
    { country: "Canada", spots: ["Niagara Falls", "Banff National Park", "CN Tower"] },
    { country: "Italy", spots: ["Colosseum", "Venice Canals", "Leaning Tower of Pisa"] },
    { country: "France", spots: ["Eiffel Tower", "Louvre Museum", "Palace of Versailles"] },
    { country: "Spain", spots: ["Sagrada Familia", "Alhambra", "Ibiza"] },
    { country: "Greece", spots: ["Acropolis of Athens", "Santorini", "Mykonos"] },
    { country: "Germany", spots: ["Neuschwanstein Castle", "Brandenburg Gate", "Berlin Wall"] },
    { country: "UK", spots: ["Big Ben", "Tower of London", "Stonehenge"] },
    { country: "Japan", spots: ["Mount Fuji", "Tokyo Tower", "Hiroshima Peace Memorial"] },
    { country: "China", spots: ["Great Wall of China", "Forbidden City", "Terracotta Army"] },
    { country: "India", spots: ["Taj Mahal", "Red Fort", "Golden Temple"] },
    { country: "Australia", spots: ["Sydney Opera House", "Great Barrier Reef", "Uluru"] },
    { country: "New Zealand", spots: ["Milford Sound", "Bay of Islands", "Franz Josef Glacier"] },
    { country: "Brazil", spots: ["Christ the Redeemer", "Sugarloaf Mountain", "Iguazu Falls"] },
    { country: "Argentina", spots: ["Perito Moreno Glacier", "Iguazu Falls", "Buenos Aires"] },
    { country: "Peru", spots: ["Machu Picchu", "Lake Titicaca", "Nazca Lines"] },
    { country: "Chile", spots: ["Easter Island", "Torres del Paine", "Valle de la Luna"] },
  ];

  const countries = places.map((place) => place.country);
  const spots = computed(
    () => places.find((place) => place.country === values.country)?.spots || []
  );

  const schema = object({
    country: string().label("Country").required().oneOf(countries, "Invalid country selected"),
    attraction: string().label("Attraction").required(),
  });

  const { handleSubmit, isSubmitting, values } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values, ctx) => {
    const id = useSonner.loading("Booking your trip...");
    await promiseTimeout(2000); // Simulate a network request
    useSonner.dismiss(id);
    await nextTick();
    useSonner.success(`Trip to ${values.country} booked!`, {
      description: `You will visit ${values.attraction}. Enjoy your trip!`,
    });
    ctx.resetForm();
  });
</script>
```

<!-- /automd -->

::
