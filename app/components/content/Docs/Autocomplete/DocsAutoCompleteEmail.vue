<template>
  <div class="mx-auto max-w-sm space-y-2">
    <UiLabel for="email-autocomplete">Email</UiLabel>
    <!-- `ignore-filter` because the suggestions are built from the typed text instead of filtered. -->
    <UiAutocomplete v-model="email" ignore-filter>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput id="email-autocomplete" type="email" placeholder="you@example.com" />
      </UiAutocompleteAnchor>

      <UiAutocompleteContent hide-when-empty>
        <UiAutocompleteEmpty />
        <UiAutocompleteItem v-for="s in suggestions" :key="s" :value="s">
          {{ s }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
    <p class="text-muted-foreground text-sm">
      Type a name followed by <kbd class="bg-muted rounded px-1 font-mono text-xs">@</kbd> to see
      domain suggestions.
    </p>
  </div>
</template>

<script lang="ts" setup>
  const email = ref("");

  const domains = ["gmail.com", "outlook.com", "icloud.com", "yahoo.com", "proton.me"];

  const suggestions = computed(() => {
    const [local, partial = ""] = email.value.split("@");
    // Only suggest while the user is typing the domain part of the address
    if (!local || !email.value.includes("@")) return [];
    return domains
      .filter((d) => d.startsWith(partial.toLowerCase()) && d !== partial.toLowerCase())
      .map((d) => `${local}@${d}`);
  });
</script>
