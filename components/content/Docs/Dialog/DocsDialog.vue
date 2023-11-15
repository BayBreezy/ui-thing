<template>
  <div class="flex w-full items-center justify-center">
    <UIDialog v-model:open="dialog">
      <UIDialogTrigger as-child>
        <UIButton variant="outline">Edit Profile</UIButton>
      </UIDialogTrigger>

      <UIDialogContent
        class="sm:max-w-[425px]"
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="name" class="text-right"> Name </UILabel>
              <UIInput id="name" model-value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="username" class="text-right"> Username </UILabel>
              <UIInput id="username" model-value="@peduarte" class="col-span-3" />
            </div>
          </div>
        </template>
        <template #footer>
          <UIDialogFooter>
            <UIButton
              @click="closeDialog(false)"
              variant="outline"
              type="button"
              class="mt-2 sm:mt-0"
              >Cancel</UIButton
            >
            <UIButton @click="closeDialog(true)" type="submit">Save</UIButton>
          </UIDialogFooter>
        </template>
      </UIDialogContent>
    </UIDialog>
  </div>
</template>

<script lang="ts" setup>
  const dialog = ref(false);

  const closeDialog = (save: boolean) => {
    useToast().toast({
      title: save ? "Profile updated" : "Changes discarded",
      description: `Your changes has been ${save ? "saved" : "discarded"}.`,
      duration: 5000,
      icon: save ? "lucide:check" : "lucide:x",
    });
    dialog.value = false;
  };
</script>
