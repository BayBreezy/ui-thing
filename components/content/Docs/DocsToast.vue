<template>
  <div>
    <div class="flex flex-wrap items-center gap-2">
      <UIButton variant="outline" class="mr-5" @click="showMessage()">Show Toast</UIButton>
      <UIButton variant="outline" class="mr-5" @click="showMessage('success')"
        >Success Toast</UIButton
      >
      <UIButton variant="outline" class="mr-5" @click="showMessage('info')">Info Toast</UIButton>
      <UIButton variant="outline" class="mr-5" @click="showMessage('warning')"
        >Warning Toast</UIButton
      >
      <UIButton variant="outline" class="mr-5" @click="showMessage('destructive')"
        >Error Toast</UIButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (type?: any) => {
    useToast().add({
      title: "Message sent successfully!",
      description: "Alex received your message.",
      variant: type,
      action: () => {
        alert("Action button clicked!");
      },
      actionText: "Undo",
      icon: "lucide:check-circle",
    });
  };
</script>
