<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Delete project</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-sm">
        <div class="flex flex-col items-center gap-6">
          <Icon name="lucide:badge-alert" class="size-10 text-muted-foreground opacity-80" />
          <UiDialogHeader class="gap-3">
            <UiDialogTitle class="sm:text-center">Final confirmation</UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              This action cannot be undone. To confirm, please enter the project name
              <span class="text-foreground">Origin UI</span>.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="mt-2 space-y-5">
          <UiVeeInput
            v-model="inputValue"
            label="Project name"
            placeholder="Type Origin UI to confirm"
          />

          <UiDialogFooter>
            <UiDialogClose as-child>
              <UiButton type="button" variant="outline" class="flex-1"> Cancel </UiButton>
            </UiDialogClose>
            <UiDialogClose as-child>
              <UiButton
                type="button"
                class="flex-1"
                :disabled="inputValue !== projectName"
                @click="deleteProject"
              >
                Delete
              </UiButton>
            </UiDialogClose>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const projectName = "Origin UI";
  const inputValue = ref("");

  const deleteProject = () => {
    if (inputValue.value === projectName) {
      useSonner.success("Project deleted successfully", {
        description: "The project has been deleted successfully",
      });
    } else {
      useSonner.error("Project name is incorrect", {
        description: "Please enter the correct project name to delete the project",
      });
    }
  };
</script>
