<template>
  <!--
    Trust and security badges
    Features: Row of compliance and reliability badges with fancy icons, a short claim under each, and a link to the trust center
  -->
  <UiContainer class="py-16 lg:py-20">
    <div class="bg-muted/40 rounded-3xl border p-8 sm:p-12">
      <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div class="max-w-xl">
          <h2 class="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {{ props.title }}
          </h2>
          <p class="text-muted-foreground mt-2">{{ props.description }}</p>
        </div>
        <UiButton variant="outline">
          Visit trust center
          <Icon name="lucide:arrow-up-right" class="size-4" />
        </UiButton>
      </div>
      <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Motion
          v-for="(badge, i) in props.badges"
          :key="badge.title"
          as="li"
          :initial="{ opacity: 0, y: 14 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.4, delay: i * 0.08 }"
          class="bg-card rounded-2xl border p-5"
        >
          <UiFancyIcon :icon="badge.icon" theme="modern" :color="badge.color" />
          <p class="mt-4 font-semibold">{{ badge.title }}</p>
          <p class="text-muted-foreground mt-1 text-sm">{{ badge.text }}</p>
        </Motion>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Badge = {
    title: string;
    text: string;
    icon: string;
    color: "primary" | "gray" | "error" | "warning" | "success" | "info";
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; badges?: Badge[] }>(),
    {
      title: "Built to be trusted",
      description: "Security and reliability are table stakes. Here is what we hold ourselves to.",
      badges: () => [
        {
          title: "SOC 2 Type II",
          text: "Audited every year by an independent firm.",
          icon: "lucide:shield-check",
          color: "success",
        },
        {
          title: "GDPR ready",
          text: "Data processing agreements and EU hosting.",
          icon: "lucide:lock-keyhole",
          color: "info",
        },
        {
          title: "99.99% uptime",
          text: "Backed by a public status page and SLA.",
          icon: "lucide:activity",
          color: "warning",
        },
        {
          title: "Single sign on",
          text: "SAML, SCIM and audit logs on every plan.",
          icon: "lucide:key-round",
          color: "primary",
        },
      ],
    }
  );
</script>
