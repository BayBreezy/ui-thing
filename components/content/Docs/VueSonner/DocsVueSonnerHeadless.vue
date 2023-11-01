<template>
  <div
    class="relative z-[999] box-border flex w-[360px] gap-4 rounded-md border bg-background p-3 px-5 shadow-lg"
  >
    <UIAvatar
      class="ring-1 ring-border"
      src="https://behonbaker.com/icon.png"
      fallback="BB"
      alt="Behon Baker"
    />
    <div>
      <p>Add user</p>
      <p class="text-sm font-normal text-muted-foreground">
        Would you like to add this user to the list?
      </p>
      <div class="mt-2 flex items-center gap-2">
        <UIButton class="h-7 text-xs" @click="addUser">Yes</UIButton>
        <UIButton @click="cancel" variant="outline" class="h-7 text-xs">No</UIButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emits = defineEmits<{
    closeToast: [];
  }>();

  const addUser = () => {
    useSonner.success("", { description: "User added" });
    emits("closeToast");
  };
  const cancel = () => {
    useSonner.warning("", { description: "User not added" });
    emits("closeToast");
  };
</script>
