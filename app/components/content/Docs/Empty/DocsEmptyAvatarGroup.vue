<template>
  <div class="flex items-center justify-center">
    <UiEmpty>
      <UiEmptyHeader>
        <UiEmptyMedia>
          <div
            class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
          >
            <UiAvatar>
              <UiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <UiAvatarFallback>CN</UiAvatarFallback>
            </UiAvatar>
            <UiAvatar>
              <UiAvatarImage src="https://github.com/baybreezy.png" alt="@baybreezy" />
              <UiAvatarFallback>BB</UiAvatarFallback>
            </UiAvatar>
            <UiAvatar>
              <UiAvatarImage src="https://github.com/mirari.png" alt="@mirari" />
              <UiAvatarFallback>MI</UiAvatarFallback>
            </UiAvatar>
          </div>
        </UiEmptyMedia>
        <UiEmptyTitle>No Team Members</UiEmptyTitle>
        <UiEmptyDescription> Invite your team to collaborate on this project. </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton size="sm">
          <Icon name="lucide:plus" />
          Invite Members
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>
