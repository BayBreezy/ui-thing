<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <Motion :variants="childVariant">
        <div class="mx-auto max-w-[760px] text-center">
          <h2 class="mb-4 text-3xl font-semibold lg:mb-5 lg:text-4xl">Feature Comparison</h2>
          <p class="text-lg text-muted-foreground lg:text-xl">
            See how our platform stacks up with comprehensive feature coverage.
          </p>
        </div>
      </Motion>

      <Motion :variants="childVariant" class="mt-12 lg:mt-16">
        <UiCard class="overflow-hidden py-0">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b bg-muted/50">
                  <th class="p-4 text-left font-semibold lg:p-6">Feature</th>
                  <th class="p-4 text-center font-semibold lg:p-6">Starter</th>
                  <th class="p-4 text-center font-semibold lg:p-6">Professional</th>
                  <th class="p-4 text-center font-semibold lg:p-6">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(feature, i) in features"
                  :key="i"
                  class="border-b transition-colors last:border-b-0 hover:bg-muted/50"
                >
                  <td class="p-4 font-medium lg:p-6">
                    <div class="flex items-start gap-4">
                      <Icon :name="feature.icon" class="size-6 text-primary" />
                      <div class="flex flex-col gap-0.5">
                        <p class="leading-none">{{ feature.name }}</p>
                        <p class="text-sm whitespace-nowrap text-muted-foreground">
                          {{ feature.description }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4 text-center lg:p-6">
                    <component
                      :is="getFeatureComponent(feature.starter)"
                      :value="feature.starter"
                    />
                  </td>
                  <td class="p-4 text-center lg:p-6">
                    <component
                      :is="getFeatureComponent(feature.professional)"
                      :value="feature.professional"
                    />
                  </td>
                  <td class="p-4 text-center lg:p-6">
                    <component
                      :is="getFeatureComponent(feature.enterprise)"
                      :value="feature.enterprise"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UiCard>
      </Motion>

      <Motion :variants="childVariant" class="mt-8 text-center">
        <UiButton size="lg">
          Get Started
          <Icon name="heroicons:arrow-right" class="ml-2 size-4" />
        </UiButton>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.15),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const features = [
    {
      name: "Team Members",
      description: "Number of users",
      icon: "lucide:users",
      starter: "5",
      professional: "25",
      enterprise: "Unlimited",
    },
    {
      name: "Storage",
      description: "File storage space",
      icon: "lucide:hard-drive",
      starter: "10 GB",
      professional: "100 GB",
      enterprise: "Unlimited",
    },
    {
      name: "API Access",
      description: "Programmatic access",
      icon: "lucide:code",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Advanced Analytics",
      description: "Detailed insights",
      icon: "lucide:bar-chart",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Custom Integrations",
      description: "Connect your tools",
      icon: "lucide:puzzle",
      starter: false,
      professional: "Limited",
      enterprise: true,
    },
    {
      name: "Priority Support",
      description: "Get help faster",
      icon: "lucide:headphones",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "SLA Guarantee",
      description: "Uptime commitment",
      icon: "lucide:shield-check",
      starter: false,
      professional: false,
      enterprise: "99.9%",
    },
    {
      name: "Dedicated Manager",
      description: "Personal account support",
      icon: "lucide:user-check",
      starter: false,
      professional: false,
      enterprise: true,
    },
  ];

  const getFeatureComponent = (value: boolean | string) => {
    const IconComponent = resolveComponent("Icon");
    if (typeof value === "boolean") {
      return value
        ? h(IconComponent, { name: "heroicons:check", class: "mx-auto size-5 text-green-500" })
        : h(IconComponent, {
            name: "heroicons:x-mark",
            class: "mx-auto size-5 text-muted-foreground/50",
          });
    }
    return h("span", { class: "font-medium" }, value);
  };
</script>
