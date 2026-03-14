<template>
  <div class="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-12">
    <UiAvatar class="grayscale" :src fallback="BB" :alt />
    <UiAvatar>
      <UiAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <UiAvatarFallback>ER</UiAvatarFallback>
      <UiAvatarBadge class="bg-green-600 dark:bg-green-800" />
    </UiAvatar>
    <UiAvatarGroup class="grayscale">
      <UiAvatar>
        <UiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <UiAvatarFallback>CN</UiAvatarFallback>
      </UiAvatar>
      <UiAvatar>
        <UiAvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <UiAvatarFallback>LR</UiAvatarFallback>
      </UiAvatar>
      <UiAvatar>
        <UiAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <UiAvatarFallback>ER</UiAvatarFallback>
      </UiAvatar>
      <UiAvatarGroupCount>+3</UiAvatarGroupCount>
    </UiAvatarGroup>
  </div>
</template>

<script lang="ts" setup>
  const src = "https://behonbaker.com/icon.png";
  const alt = "Behon Baker";
</script>
