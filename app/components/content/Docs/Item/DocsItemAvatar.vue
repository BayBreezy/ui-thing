<template>
  <div class="mx-auto flex w-full max-w-lg flex-col gap-6">
    <UiItem variant="outline">
      <UiItemMedia>
        <UiAvatar class="size-10">
          <UiAvatarImage class="bg-muted" src="https://github.com/baybreezy.png" alt="@baybreezy" />
          <UiAvatarFallback>BR</UiAvatarFallback>
        </UiAvatar>
      </UiItemMedia>
      <UiItemContent>
        <UiItemTitle>Behon Baker</UiItemTitle>
        <UiItemDescription>Last seen 5 months ago</UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton size="icon-sm" variant="outline" class="rounded-full" aria-label="Invite">
          <Icon name="lucide:plus" />
        </UiButton>
      </UiItemActions>
    </UiItem>
    <UiItem variant="outline">
      <UiItemMedia>
        <div
          class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
        >
          <UiAvatar class="hidden sm:flex">
            <UiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <UiAvatarFallback>CN</UiAvatarFallback>
          </UiAvatar>
          <UiAvatar class="hidden sm:flex">
            <UiAvatarImage
              class="bg-muted"
              src="https://github.com/baybreezy.png"
              alt="@baybreezy"
            />
            <UiAvatarFallback>BR</UiAvatarFallback>
          </UiAvatar>
          <UiAvatar>
            <UiAvatarImage src="https://github.com/mirari.png" alt="@mirari" />
            <UiAvatarFallback>MI</UiAvatarFallback>
          </UiAvatar>
        </div>
      </UiItemMedia>
      <UiItemContent>
        <UiItemTitle>No Team Members</UiItemTitle>
        <UiItemDescription> Invite your team to collaborate on this project. </UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton size="sm" variant="outline"> Invite </UiButton>
      </UiItemActions>
    </UiItem>
  </div>
</template>

<script lang="ts" setup></script>
