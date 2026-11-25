<template>
  <UiDrawer :open="open" @update:open="onOpenChange">
    <div class="flex justify-center">
      <UiDrawerTrigger as-child>
        <UiButton variant="outline">Edit display name</UiButton>
      </UiDrawerTrigger>
    </div>
    <UiDrawerVirtualKeyboardProvider>
      <UiDrawerContent viewport>
        <UiDrawerHeader>
          <UiDrawerTitle>Edit display name</UiDrawerTitle>
          <UiDrawerDescription>Save or discard your changes before closing.</UiDrawerDescription>
        </UiDrawerHeader>
        <form class="min-h-0 space-y-4 overflow-y-auto p-4" @submit.prevent="save">
          <div class="space-y-2">
            <UiLabel :for="inputId">Display name</UiLabel>
            <UiInput :id="inputId" v-model="draft" required />
          </div>
          <div class="flex flex-wrap gap-2">
            <UiButton type="submit">Save</UiButton>
            <UiButton type="button" variant="outline" @click="discard">Discard</UiButton>
          </div>
        </form>
      </UiDrawerContent>
    </UiDrawerVirtualKeyboardProvider>
  </UiDrawer>
</template>

<script setup lang="ts">
  import type { DrawerRootEmits } from "reka-ui";

  const inputId = useId();
  const open = ref(false);
  const saved = ref("Taylor");
  const draft = ref(saved.value);

  function onOpenChange(nextOpen: boolean, details: DrawerRootEmits["update:open"][1]) {
    if (!nextOpen && draft.value !== saved.value) {
      details.cancel();
      return;
    }
    open.value = nextOpen;
  }

  function save() {
    saved.value = draft.value;
    open.value = false;
  }

  function discard() {
    draft.value = saved.value;
    open.value = false;
  }
</script>
