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

```bash
npx ui-thing@latest add vee-select
```

## Usage

### Form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase

:DocsVeeSelect

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Select/DocsVeeSelect.vue" code lang="vue" -->

```vue [DocsVeeSelect.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeSelect label="Country" name="country" hint="Pick the country you want to visit">
        <option disabled value="">Select a country</option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </UiVeeSelect>
      <TransitionSlide>
        <UiVeeSelect
          v-if="values.country"
          label="Attraction"
          name="attraction"
          hint="Pick the attraction you want to visit"
        >
          <option disabled value="">Select an attraction</option>
          <option v-for="spot in spots" :key="spot" :value="spot">
            {{ spot }}
          </option>
        </UiVeeSelect>
      </TransitionSlide>
      <UiButton type="submit"> Book now </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

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

  const schema = z.object({
    country: z.string({ required_error: "Required" }).refine((value) => countries.includes(value)),
    attraction: z.string({ required_error: "Required" }),
  });

  const { handleSubmit, isSubmitting, values } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Booking your trip...",
      success: (_) => `You are going to ${values.attraction} in ${values.country}!`,
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::
