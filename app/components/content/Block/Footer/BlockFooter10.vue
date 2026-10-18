<template>
  <!--
    Footer whose link columns become an accordion on mobile
    Features: Columns are always open on desktop, collapse into a tappable accordion on small screens with a rotating chevron, brand and social row, copyright
  -->
  <UiContainer as="footer" class="py-12 lg:py-20">
    <div class="grid gap-10 lg:grid-cols-[1.2fr_2.4fr]">
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
        <p class="text-muted-foreground text-sm">
          Resize to a phone width to see the columns fold away.
        </p>
      </div>

      <nav class="divide-y md:grid md:grid-cols-4 md:gap-8 md:divide-y-0" aria-label="Footer">
        <UiCollapsible v-for="column in columns" :key="column.title" v-slot="{ open }">
          <UiCollapsibleTrigger
            class="flex w-full items-center justify-between py-4 text-sm font-semibold md:pointer-events-none md:pt-0"
          >
            {{ column.title }}
            <Icon
              name="lucide:chevron-down"
              class="size-4 transition-transform duration-200 md:hidden"
              :class="open && 'rotate-180'"
            />
          </UiCollapsibleTrigger>
          <UiCollapsibleContent
            force-mount
            class="data-[state=closed]:hidden md:data-[state=closed]:block"
          >
            <ul class="space-y-3 pb-4 md:pb-0">
              <li v-for="link in column.links" :key="link">
                <NuxtLink
                  to="#"
                  class="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {{ link }}
                </NuxtLink>
              </li>
            </ul>
          </UiCollapsibleContent>
        </UiCollapsible>
      </nav>
    </div>

    <div
      class="mt-10 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="text-muted-foreground text-sm">
        &copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.
      </p>
      <ul class="flex gap-1">
        <li v-for="social in socials" :key="social.name">
          <NuxtLink
            to="#"
            :aria-label="social.name"
            class="text-muted-foreground hover:bg-muted hover:text-foreground flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <Icon :name="social.icon" class="size-[18px]" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const columns = [
    { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
    { title: "Resources", links: ["Docs", "Guides", "Blog", "Support"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
  ];
</script>
