<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h3 class="mb-4 text-3xl font-semibold lg:text-4xl">Trusted by teams worldwide</h3>
        <p class="text-muted-foreground mb-12 text-lg lg:mb-16">
          Join thousands of companies using our platform to build better products.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <template v-for="(s, i) in stats" :key="i">
          <div class="bg-card rounded-lg border p-6 text-center shadow-sm">
            <div
              class="from-primary/50 via-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-linear-to-b"
            >
              <Icon :name="s.icon" class="text-primary size-6" />
            </div>
            <h4 class="mb-2 text-4xl font-bold lg:text-5xl">
              {{ s.value }}
            </h4>
            <p class="text-muted-foreground text-base font-medium">
              {{ s.text }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    { text: "Customer satisfaction", value: "98%", icon: "lucide:heart" },
    { text: "Projects delivered", value: "1,200+", icon: "lucide:rocket" },
    { text: "Team members", value: "50+", icon: "lucide:users" },
  ];
</script>
