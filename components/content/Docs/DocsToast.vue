<template>
  <div>
    <div class="flex flex-wrap items-center gap-2">
      <UiButton variant="outline" class="mr-5" @click="showMessage()">Show Toast</UiButton>
      <UiButton variant="outline" class="mr-5" @click="showMessage('success')"
        >Success Toast</UiButton
      >
      <UiButton variant="outline" class="mr-5" @click="showMessage('info')">Info Toast</UiButton>
      <UiButton variant="outline" class="mr-5" @click="showMessage('warning')"
        >Warning Toast</UiButton
      >
      <UiButton variant="outline" class="mr-5" @click="showMessage('destructive')"
        >Error Toast</UiButton
      >
      <UiButton variant="outline" class="mr-5" @click="showMessage('action')"
        >Action Toast</UiButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (type?: any) => {
    if (!type) {
      return useToast().toast({
        description: "Your message has been sent",
      });
    }
    if (type === "action") {
      return useToast().toast({
        title: "Message Sent",
        icon: "lucide:mail",
        description: "Your message has been sent. Click undo to revert the action",
        action: h(
          resolveComponent("UiToastAction"),
          {
            altText: "Undo",
          },
          {
            default: () => "Undo",
          }
        ),
      });
    }
    return useToast().toast({
      title: "Message Sent",
      description: "Your message has been sent",
      variant: type,
      icon: getToasticon(type),
    });
  };

  const getToasticon = (type: string) => {
    switch (type) {
      case "success":
        return "lucide:badge-check";
      case "info":
        return "lucide:badge-info";
      case "warning":
        return "lucide:badge-alert";
      case "destructive":
        return "lucide:badge-x";
      default:
        return "lucide:badge-check";
    }
  };
</script>
