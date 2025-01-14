<template>
  <div class="flex items-center justify-center gap-10">
    <UiChip size="3xl" class="h-auto min-w-fit translate-x-0 bg-background p-0 ring-1">
      <template #content>
        <div class="flex items-center justify-center">
          <Icon name="heroicons:check-badge-solid" class="size-5 text-foreground" />
        </div>
      </template>
      <UiAvatar>
        <UiAvatarImage src="https://i.pravatar.cc/150?img=1" alt="Kelly King" />
        <UiAvatarFallback>KK</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
    <UiChip size="2xl" class="bg-emerald-500 text-white" text="6">
      <UiAvatar class="rounded-lg">
        <UiAvatarImage src="https://i.pravatar.cc/150?img=4" alt="Ryan Author" />
        <UiAvatarFallback>RA</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
  </div>
</template>
