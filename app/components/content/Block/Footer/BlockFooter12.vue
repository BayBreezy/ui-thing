<template>
  <!--
    Footer with contact cards above the link columns
    Features: Three contact cards for email, phone and office with icons and hover states, four link columns, legal row with social icons
  -->
  <UiContainer as="footer" class="py-14 lg:py-20">
    <div class="grid gap-4 md:grid-cols-3">
      <NuxtLink
        v-for="item in contacts"
        :key="item.title"
        :to="item.href"
        class="group bg-card hover:border-ring/60 flex items-start gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <UiFancyIcon :icon="item.icon" theme="light" :color="item.color" />
        <div class="min-w-0">
          <p class="font-semibold">{{ item.title }}</p>
          <p class="text-muted-foreground text-sm">{{ item.detail }}</p>
          <p class="mt-2 flex items-center gap-1 text-sm font-medium">
            {{ item.value }}
            <Icon
              name="lucide:arrow-up-right"
              class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </p>
        </div>
      </NuxtLink>
    </div>

    <div class="mt-14 grid gap-10 lg:grid-cols-[1.2fr_2.4fr]">
      <div class="max-w-xs space-y-4">
        <NuxtLink to="#" class="flex items-center gap-2.5 text-lg font-semibold">
          <svg
            class="fill-primary h-7"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            />
          </svg>
          {{ props.name }}
        </NuxtLink>
        <p class="text-muted-foreground text-sm">Support is online weekdays, 9am to 6pm Pacific.</p>
      </div>
      <nav class="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
        <div v-for="column in columns" :key="column.title">
          <p class="text-sm font-semibold">{{ column.title }}</p>
          <ul class="mt-4 space-y-3">
            <li v-for="link in column.links" :key="link">
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {{ link }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div
      class="text-muted-foreground mt-12 flex flex-col gap-4 border-t pt-8 text-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.</p>
      <ul class="flex items-center gap-1">
        <li v-for="social in socials" :key="social.name">
          <NuxtLink
            to="#"
            :aria-label="social.name"
            class="hover:bg-muted hover:text-foreground flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <Icon :name="social.icon" class="size-[18px]" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Color = "primary" | "gray" | "error" | "warning" | "success" | "info";

  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const contacts: {
    title: string;
    detail: string;
    value: string;
    href: string;
    icon: string;
    color: Color;
  }[] = [
    {
      title: "Chat to support",
      detail: "We reply within a few hours.",
      value: "support@uithing.com",
      href: "mailto:support@uithing.com",
      icon: "lucide:mail",
      color: "info",
    },
    {
      title: "Call sales",
      detail: "Mon to Fri, 9am to 6pm.",
      value: "+1 (555) 010-2030",
      href: "tel:+15550102030",
      icon: "lucide:phone",
      color: "success",
    },
    {
      title: "Visit the office",
      detail: "100 Market Street, Suite 400.",
      value: "Get directions",
      href: "#",
      icon: "lucide:map-pin",
      color: "warning",
    },
  ];

  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Resources", links: ["Docs", "Guides", "Blog", "Status"] },
    { title: "Company", links: ["About", "Careers", "Press", "Partners"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
  ];
</script>
