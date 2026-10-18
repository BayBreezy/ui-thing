<template>
  <!--
    Floating footer card
    Features: Rounded muted card inset from the page edges, brand and link columns inside, newsletter pill input, legal row, works on any background
  -->
  <footer class="px-4 pb-4 sm:px-6 sm:pb-6">
    <div class="bg-muted/50 mx-auto max-w-7xl rounded-3xl border p-6 sm:p-10 lg:p-12">
      <div class="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
        <div class="max-w-sm space-y-5">
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
            Product updates, tips and the occasional good link.
          </p>
          <form
            v-if="!done"
            class="bg-background flex items-center rounded-full border p-1 pl-4"
            novalidate
            @submit.prevent="submit"
          >
            <input
              v-model="email"
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              class="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <UiButton type="submit" size="sm" class="rounded-full">Join</UiButton>
          </form>
          <p
            v-else
            class="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
          >
            <Icon name="lucide:circle-check" class="size-5" />
            Welcome aboard.
          </p>
          <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
        </div>

        <nav class="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer">
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
        class="text-muted-foreground mt-10 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.</p>
        <ul class="flex gap-5">
          <li v-for="item in legal" :key="item">
            <NuxtLink to="#" class="hover:text-foreground transition-colors">{{ item }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Resources", links: ["Docs", "Guides", "Blog", "Support"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  ];
  const legal = ["Privacy", "Terms", "Cookies"];

  const email = ref("");
  const error = ref("");
  const done = ref(false);

  function submit() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    done.value = true;
  }
</script>
