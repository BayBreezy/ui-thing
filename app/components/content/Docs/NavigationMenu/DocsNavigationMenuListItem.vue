<template>
  <li>
    <UiNavigationMenuLink as-child>
      <NuxtLink
        :href="href"
        class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
      >
        <div class="text-sm leading-none font-medium">{{ title }}</div>
        <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
          <slot />
        </p>
      </NuxtLink>
    </UiNavigationMenuLink>
  </li>
</template>

<script lang="ts" setup>
  defineProps<{
    title: string;
    href?: string;
  }>();
</script>
