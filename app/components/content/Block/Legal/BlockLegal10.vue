<template>
  <!--
    Legal hub with document cards
    Features: Heading and a grid of linked cards for every policy and agreement with an icon, description and last updated date, plus a contact line
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{{ props.title }}</h1>
      <p class="text-muted-foreground mt-4 text-lg text-balance">{{ props.description }}</p>
    </div>
    <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(doc, i) in props.documents"
        :key="doc.title"
        as="li"
        :initial="{ opacity: 0, y: 16 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.4, delay: (i % 3) * 0.08 }"
      >
        <a
          href="#"
          class="bg-card group hover:border-primary/40 flex h-full flex-col rounded-2xl border p-6 transition-all hover:shadow-md"
        >
          <UiFancyIcon :icon="doc.icon" theme="modern" :color="doc.color" />
          <p class="mt-5 flex items-center justify-between font-semibold">
            {{ doc.title }}
            <Icon
              name="lucide:arrow-up-right"
              class="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </p>
          <p class="text-muted-foreground mt-1.5 flex-1 text-sm">{{ doc.text }}</p>
          <p class="text-muted-foreground mt-4 text-xs">Updated {{ doc.updated }}</p>
        </a>
      </Motion>
    </ul>
    <p class="text-muted-foreground mt-10 text-center text-sm">
      Questions about our policies? Email
      <a
        href="mailto:legal@uithing.com"
        class="text-foreground font-medium underline underline-offset-4"
        >legal@uithing.com</a
      >
    </p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Doc = {
    title: string;
    text: string;
    updated: string;
    icon: string;
    color: "primary" | "gray" | "error" | "warning" | "success" | "info";
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; documents?: Doc[] }>(),
    {
      title: "Legal and policies",
      description:
        "Everything about how we handle your data, your account and our service in one place.",
      documents: () => [
        {
          title: "Terms of Service",
          text: "The agreement between you and us when you use the product.",
          updated: "Oct 17, 2026",
          icon: "lucide:file-text",
          color: "primary",
        },
        {
          title: "Privacy Policy",
          text: "What we collect, why, and the choices you have.",
          updated: "Oct 17, 2026",
          icon: "lucide:shield-check",
          color: "success",
        },
        {
          title: "Cookie Policy",
          text: "How we use cookies and how to manage them.",
          updated: "Sep 2, 2026",
          icon: "lucide:cookie",
          color: "warning",
        },
        {
          title: "Data Processing Addendum",
          text: "Terms for customers who process personal data with us.",
          updated: "Aug 11, 2026",
          icon: "lucide:database",
          color: "info",
        },
        {
          title: "Acceptable Use Policy",
          text: "What is and is not allowed on the platform.",
          updated: "Jun 4, 2026",
          icon: "lucide:badge-check",
          color: "gray",
        },
        {
          title: "Security overview",
          text: "How we protect your data, with our certifications.",
          updated: "May 20, 2026",
          icon: "lucide:lock-keyhole",
          color: "error",
        },
      ],
    }
  );
</script>
