<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="bg-primary relative overflow-hidden rounded-lg px-8 py-12 lg:px-16 lg:py-20">
      <div class="relative z-10">
        <div class="mb-10 text-center lg:mb-16">
          <h3 class="text-primary-foreground mb-3 text-3xl font-semibold lg:text-4xl">
            Powering innovation worldwide
          </h3>
          <p class="text-primary-foreground/80 text-lg">
            Trusted by leading companies and startups
          </p>
        </div>

        <div
          class="text-primary-foreground grid grid-cols-2 gap-8 text-center md:grid-cols-4 lg:gap-12"
        >
          <template v-for="(s, i) in stats" :key="i">
            <div>
              <h4 class="mb-2 text-4xl font-bold lg:text-5xl">
                {{ s.value }}
              </h4>
              <p class="text-primary-foreground/80 text-sm font-medium">
                {{ s.text }}
              </p>
            </div>
          </template>
        </div>
      </div>

      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[34px_34px]"
      ></div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    { text: "Enterprise clients", value: "500+" },
    { text: "Countries served", value: "120" },
    { text: "Uptime SLA", value: "99.99%" },
    { text: "Monthly transactions", value: "5M+" },
  ];
</script>
