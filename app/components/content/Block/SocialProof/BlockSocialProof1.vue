<template>
  <UiContainer class="py-16 lg:py-24">
    <p class="mb-8 text-center text-muted-foreground">Join 4,000+ companies already growing</p>
    <div class="flex flex-wrap items-center justify-center gap-5">
      <template v-for="n in companies" :key="n.text">
        <div>
          <span class="sr-only">{{ n.text }}</span>
          <Icon :name="n.icon" class="h-24 w-24" />
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const companies = [
    { text: "Company One", icon: "logos:100tb" },
    { text: "Company Two", icon: "logos:aha" },
    { text: "Company Three", icon: "logos:airbnb" },
    { text: "Company Four", icon: "logos:akamai" },
  ];
</script>
