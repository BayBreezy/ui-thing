<template>
  <li>
    <UiNavigationMenuLink asChild>
      <NuxtLink
        :href="href"
        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{{ title }}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          <slot />
        </p>
      </NuxtLink>
    </UiNavigationMenuLink>
  </li>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title: string;
    href?: string;
  }>();
</script>
