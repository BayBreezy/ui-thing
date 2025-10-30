<template>
  <div class="bg-muted/30 py-10 lg:py-20">
    <UiContainer>
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="flex flex-col justify-center">
          <p class="mb-3 font-semibold text-primary">By the numbers</p>
          <h3 class="mb-4 text-3xl font-semibold lg:text-4xl">Making an impact that matters</h3>
          <p class="text-lg text-muted-foreground">
            Our platform helps teams around the world ship better products faster. Here's how we're
            making a difference.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <template v-for="(s, i) in stats" :key="i">
            <div>
              <h4 class="mb-2 text-4xl font-bold text-primary lg:text-5xl">
                {{ s.value }}
              </h4>
              <p class="text-sm font-medium text-muted-foreground">
                {{ s.text }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const stats = [
    { text: "Daily active users", value: "25K+" },
    { text: "API calls per day", value: "2M+" },
    { text: "Average response time", value: "45ms" },
    { text: "Customer retention", value: "94%" },
  ];
</script>
