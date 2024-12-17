<template>
  <div class="mx-auto max-w-[400px]">
    <TransitionScale :scale="0.98">
      <UiAlert v-if="open">
        <template #icon>
          <UiAvatar class="size-8">
            <UiAvatarFallback>MP</UiAvatarFallback>
            <UiAvatarImage src="https://i.pravatar.cc/300" alt="Mary Palmer" />
          </UiAvatar>
        </template>
        <UiAlertDescription class="mb-1 flex items-start justify-between text-muted-foreground">
          <div>
            <a class="font-medium text-foreground hover:underline" href="#"> Mary Palmer </a>
            mentioned you in
            <a class="font-medium text-foreground hover:underline" href="#">
              project-campaign-02
            </a>
          </div>
          <UiButton variant="ghost" size="icon-xs" class="size-5" @click="open = false">
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </UiAlertDescription>
        <p class="mb-3 text-sm text-muted-foreground">2 min ago</p>
        <div class="flex items-center gap-2">
          <UiButton class="text-xs" size="xs">Accept</UiButton>
          <UiButton class="text-xs" size="xs" variant="outline">Decline</UiButton>
        </div>
      </UiAlert>
    </TransitionScale>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
</script>
