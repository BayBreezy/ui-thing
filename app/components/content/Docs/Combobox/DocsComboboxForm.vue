<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <UiLabel for="role-combobox">Role</UiLabel>
      <!-- `name` adds a hidden input, so the selected value is part of the native form data -->
      <UiCombobox name="role" required>
        <UiComboboxAnchor>
          <UiComboboxInput id="role-combobox" placeholder="Select a role" />
          <UiComboboxTrigger>
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxEmpty class="p-4 text-center text-sm">No role found.</UiComboboxEmpty>
          <UiComboboxItem v-for="r in roles" :key="r" :value="r">
            {{ r }}
          </UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>
    <UiButton type="submit">Submit</UiButton>
    <p v-if="submitted" class="text-muted-foreground text-sm">
      Submitted role: <span class="text-foreground font-medium">{{ submitted }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const submitted = ref("");

  const roles = ["Owner", "Admin", "Editor", "Viewer"];

  const onSubmit = (e: Event) => {
    const data = new FormData(e.target as HTMLFormElement);
    submitted.value = String(data.get("role") ?? "");
  };
</script>
