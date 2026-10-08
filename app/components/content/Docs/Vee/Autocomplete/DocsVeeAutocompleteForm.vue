<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Shipping details</UiCardTitle>
          <UiCardDescription>Where should we send your order?</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeInput name="name" label="Full name" placeholder="Jane Doe" required />
          <UiVeeAutocomplete
            name="email"
            label="Email"
            placeholder="jane@example.com"
            hint="We'll suggest popular providers once you type an @."
            :options="emailSuggestions"
            ignore-filter
            required
          />
          <UiVeeAutocomplete
            name="country"
            label="Country"
            placeholder="Start typing..."
            :options="countries"
            empty-text="No country found"
            show-trigger
            required
          />
        </UiCardContent>

        <UiCardFooter>
          <UiButton type="button" variant="ghost" @click="resetForm()">Reset</UiButton>
          <UiButton :loading="isSubmitting" type="submit">Place order</UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const countries = [
    "Australia",
    "Brazil",
    "Canada",
    "France",
    "Germany",
    "Japan",
    "Mexico",
    "Spain",
    "United Kingdom",
    "United States",
  ];

  const domains = ["gmail.com", "outlook.com", "icloud.com", "yahoo.com", "proton.me"];

  const schema = object({
    name: string().label("Name").required().min(2).trim(),
    email: string().label("Email").required().email(),
    country: string()
      .label("Country")
      .required()
      .oneOf(countries, "Please choose a country from the list"),
  });

  const { handleSubmit, isSubmitting, resetForm, values } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  // Build suggestions from what the user has typed so far
  const emailSuggestions = computed(() => {
    const [local, partial = ""] = (values.email ?? "").split("@");
    if (!local || !values.email?.includes("@")) return [];
    return domains
      .filter((d) => d.startsWith(partial.toLowerCase()) && d !== partial.toLowerCase())
      .map((d) => `${local}@${d}`);
  });

  const onSubmit = handleSubmit(async (vals) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Order placed", {
      description: `Shipping to ${vals.name} in ${vals.country}.`,
    });
    resetForm();
  });
</script>
