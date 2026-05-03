<template>
  <div
    class="bg-background relative z-[999] box-border flex w-full gap-4 rounded-md border p-3 px-5 shadow-lg md:w-[360px]"
  >
    <UiAvatar
      class="ring-border ring-1"
      src="https://behonbaker.com/icon.png"
      fallback="BB"
      alt="Behon Baker"
    />
    <div>
      <p class="text-sm font-semibold">Add user</p>
      <p class="text-muted-foreground text-sm font-normal">
        Would you like to add this user to the list?
      </p>
      <div class="mt-2 flex items-center gap-2">
        <UiButton class="h-7 text-xs" @click="addUser">Yes</UiButton>
        <UiButton variant="outline" class="h-7 text-xs" @click="cancel">No</UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emits = defineEmits<{
    closeToast: [];
  }>();

  const addUser = () => {
    useSonner.success("User Added", {
      description: "User was added successfully",
      richColors: true,
    });
    emits("closeToast");
  };
  const cancel = () => {
    useSonner.warning("", { description: "User not added" });
    emits("closeToast");
  };
</script>
