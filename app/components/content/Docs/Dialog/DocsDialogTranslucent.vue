<template>
  <div class="flex w-full items-center justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Open translucent dialog</UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        translucent
        class="sm:max-w-[440px]"
        title="Share workspace"
        description="Invite collaborators without losing the page context underneath."
      >
        <template #content>
          <div class="grid gap-4 py-4">
            <div class="grid gap-2">
              <UiLabel for="email">Email</UiLabel>
              <UiInput id="email" placeholder="team@uithing.dev" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="role">Role</UiLabel>
              <UiSelect>
                <UiSelectTrigger id="role">
                  <UiSelectValue placeholder="Choose a role" />
                </UiSelectTrigger>
                <UiSelectContent translucent>
                  <UiSelectArrow translucent />
                  <UiSelectItem value="viewer">Viewer</UiSelectItem>
                  <UiSelectItem value="editor">Editor</UiSelectItem>
                  <UiSelectItem value="admin">Admin</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>
        </template>
        <template #footer>
          <UiDialogFooter>
            <UiButton variant="outline" @click="open = false">Cancel</UiButton>
            <UiButton @click="open = false">Send invite</UiButton>
          </UiDialogFooter>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(false);
</script>
