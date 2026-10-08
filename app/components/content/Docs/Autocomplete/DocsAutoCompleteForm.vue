<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <UiLabel for="city-autocomplete">City</UiLabel>
      <!-- `name` makes the typed text part of the native form data -->
      <UiAutocomplete name="city" required>
        <UiAutocompleteAnchor>
          <UiAutocompleteInput id="city-autocomplete" placeholder="Where do you live?" />
        </UiAutocompleteAnchor>
        <UiAutocompleteContent>
          <UiAutocompleteEmpty class="p-4 text-center text-sm">
            We'll use whatever you typed.
          </UiAutocompleteEmpty>
          <UiAutocompleteItem v-for="c in cities" :key="c" :value="c">
            {{ c }}
          </UiAutocompleteItem>
        </UiAutocompleteContent>
      </UiAutocomplete>
    </div>
    <UiButton type="submit">Submit</UiButton>
    <p v-if="submitted" class="text-muted-foreground text-sm">
      Submitted city: <span class="text-foreground font-medium">{{ submitted }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const submitted = ref("");

  const cities = ["Austin", "Boston", "Chicago", "Denver", "Miami", "Portland", "Seattle"];

  const onSubmit = (e: Event) => {
    const data = new FormData(e.target as HTMLFormElement);
    submitted.value = String(data.get("city") ?? "");
  };
</script>
