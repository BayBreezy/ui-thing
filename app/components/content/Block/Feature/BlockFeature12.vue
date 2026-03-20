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
          <h2 class="mb-4 text-3xl font-semibold lg:mb-5 lg:text-4xl">
            Explore our powerful features
          </h2>
          <p class="text-lg text-muted-foreground lg:text-xl">
            Everything you need to build, deploy, and scale your applications with confidence.
          </p>
        </div>
      </Motion>

      <div class="mt-12 lg:mt-16">
        <UiTabs v-model="tab" class="w-full">
          <Motion as-child :variants="childVariant">
            <UiTabsList class="mx-auto grid w-full max-w-lg grid-cols-3">
              <UiTabsTrigger v-for="(item, i) in feats" :key="i" :value="item.value">
                <Icon :name="item.icon" class="mr-2 size-4" />
                <span class="capitalize">{{ item.value }}</span>
              </UiTabsTrigger>
            </UiTabsList>
          </Motion>

          <template v-if="selectedFeat">
            <UiTabsContent :key="tab" :value="selectedFeat?.value" class="mt-8 lg:mt-12">
              <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                <Motion :variants="childVariant">
                  <img
                    :src="selectedFeat?.image"
                    :alt="selectedFeat?.alt"
                    class="h-[300px] w-full rounded-lg object-cover shadow-lg lg:h-[400px]"
                  />
                </Motion>
                <div>
                  <Motion
                    as="h3"
                    :variants="childVariant"
                    class="mb-4 text-2xl font-semibold lg:text-3xl"
                    >{{ selectedFeat?.title }}</Motion
                  >
                  <Motion
                    as="p"
                    :variants="childVariant"
                    class="mb-6 text-muted-foreground lg:text-lg"
                  >
                    {{ selectedFeat?.description }}
                  </Motion>

                  <Motion
                    v-for="(f, i) in selectedFeat?.items"
                    :key="i"
                    class="mb-4 flex gap-3"
                    :variants="{
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 },
                    }"
                  >
                    <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <p class="font-semibold">{{ f.title }}</p>
                      <p class="text-sm text-muted-foreground">{{ f.description }}</p>
                    </div>
                  </Motion>
                </div>
              </div>
            </UiTabsContent>
          </template>
        </UiTabs>
      </div>
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
        delayChildren: stagger(0.12),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.1),
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const tab = ref("analytics");

  const feats = ref([
    {
      title: "Advanced Analytics",
      description:
        "Get deep insights into your data with real-time analytics and customizable dashboards.",
      value: "analytics",
      icon: "lucide:bar-chart-3",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      alt: "Analytics dashboard",
      items: [
        { title: "Real-time Data", description: "Monitor your metrics as they happen" },
        { title: "Custom Dashboards", description: "Build dashboards tailored to your needs" },
        { title: "Export Reports", description: "Generate and share detailed reports" },
      ],
    },
    {
      title: "Enterprise Security",
      description:
        "Protect your data with industry-leading security features and compliance certifications.",
      value: "security",
      icon: "lucide:shield-check",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      alt: "Enterprise security",
      items: [
        {
          title: "End-to-End Encryption",
          description: "Your data is encrypted at rest and in transit",
        },
        {
          title: "SSO Integration",
          description: "Single sign-on with your existing identity provider",
        },
        { title: "Compliance Ready", description: "SOC 2, GDPR, and HIPAA compliant" },
      ],
    },
    {
      title: "Smart Automation",
      description:
        "Automate repetitive tasks and workflows to save time and increase productivity.",
      value: "automation",
      icon: "lucide:zap",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop",
      alt: "Automation workflows",
      items: [
        { title: "Workflow Builder", description: "Create custom workflows with drag-and-drop" },
        { title: "API Integrations", description: "Connect with 1000+ apps and services" },
        { title: "Scheduled Tasks", description: "Run tasks automatically on a schedule" },
      ],
    },
  ]);

  const selectedFeat = computed(() => {
    return feats.value.find((f) => f.value === tab.value);
  });
</script>
