<template>
  <UIToastProvider>
    <UIToast
      :variant="toast.variant"
      v-if="toast"
      @update:model-value="useToast().removeToast()"
      v-model="show"
    >
      <div class="flex items-start gap-3">
        <Icon v-if="toast.icon" :name="toast.icon" class="mt-1 h-4 w-4" />
        <div class="grid gap-1">
          <UIToastTitle :title="toast.title" v-if="toast.title" />
          <UIToastDescription :description="toast.description" v-if="toast.description" />
        </div>
      </div>
      <UIToastAction
        @click="toast.action"
        v-if="toast.action"
        :alt-text="toast.altText || toast.actionText"
        >{{ toast.actionText || "Close" }}</UIToastAction
      >
      <UIToastClose />
    </UIToast>
    <UIToastViewport />
  </UIToastProvider>
</template>

<script lang="ts" setup>
  const { toast } = useToast();

  const show = ref(false);

  watch(
    () => toast,
    (v) => {
      if (!!v.value) {
        show.value = true;
      } else {
        show.value = false;
      }
    },
    { deep: true }
  );
</script>
