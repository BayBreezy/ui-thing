<template>
  <!--
    Cookie policy with a cookie table and preferences
    Features: Explains each cookie category with a switch, locks the necessary ones, lists every cookie in a table and saves choices with a toast
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <div>
        <UiBadge variant="secondary">Legal</UiBadge>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-3 text-sm">Last updated {{ props.updated }}</p>
      </div>
      <p class="text-muted-foreground mt-8 text-lg leading-relaxed">
        We use cookies to keep the product working, understand how it is used and, with your
        permission, personalize what you see. Choose what you are comfortable with below.
      </p>

      <ul class="mt-8 divide-y rounded-2xl border">
        <li
          v-for="cat in categories"
          :key="cat.id"
          class="flex items-start justify-between gap-6 p-5"
        >
          <div>
            <p class="font-semibold">{{ cat.title }}</p>
            <p class="text-muted-foreground mt-1 text-sm">{{ cat.text }}</p>
          </div>
          <UiSwitch
            v-model="choices[cat.id]"
            :disabled="cat.locked"
            :aria-label="`${cat.title} cookies`"
          />
        </li>
      </ul>
      <div class="mt-4 flex flex-wrap justify-end gap-3">
        <UiButton variant="outline" @click="setAll(false)">Reject optional</UiButton>
        <UiButton variant="outline" @click="setAll(true)">Accept all</UiButton>
        <UiButton @click="save">Save preferences</UiButton>
      </div>

      <h2 class="mt-14 text-xl font-semibold">Cookies we use</h2>
      <div class="mt-4 overflow-x-auto rounded-2xl border">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Name</UiTableHead>
              <UiTableHead>Category</UiTableHead>
              <UiTableHead>Purpose</UiTableHead>
              <UiTableHead class="text-right">Duration</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="c in cookies" :key="c.name">
              <UiTableCell class="font-mono text-xs">{{ c.name }}</UiTableCell>
              <UiTableCell
                ><UiBadge variant="secondary">{{ c.category }}</UiBadge></UiTableCell
              >
              <UiTableCell class="text-muted-foreground">{{ c.purpose }}</UiTableCell>
              <UiTableCell class="text-muted-foreground text-right">{{ c.duration }}</UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Section = {
    id: string;
    title: string;
    summary: string;
    paragraphs: string[];
    list?: string[];
  };

  const props = withDefaults(
    defineProps<{ title?: string; updated?: string; sections?: Section[] }>(),
    {
      title: "Cookie Policy",
      updated: "September 2, 2026",
      sections: () => [
        {
          id: "what",
          title: "What are cookies",
          summary: "Small files that remember your visit.",
          paragraphs: [
            "Cookies are small text files stored on your device when you visit a website. They help the site remember your actions and preferences over time.",
          ],
        },
        {
          id: "how",
          title: "How we use cookies",
          summary: "To sign you in, remember settings and measure usage.",
          paragraphs: [
            "We use cookies to keep you signed in, remember your preferences, measure how the product is used and, with your consent, show relevant content.",
          ],
        },
        {
          id: "manage",
          title: "Managing cookies",
          summary: "Change your choices at any time.",
          paragraphs: [
            "You can change your cookie preferences at any time from the cookie settings link in the footer, or through your browser. Blocking some cookies may affect how the product works.",
          ],
        },
      ],
    }
  );

  const categories = [
    {
      id: "necessary",
      title: "Strictly necessary",
      text: "Required for sign in, security and basic features. Always on.",
      locked: true,
    },
    {
      id: "preferences",
      title: "Preferences",
      text: "Remember settings like language and theme.",
      locked: false,
    },
    {
      id: "analytics",
      title: "Analytics",
      text: "Help us understand how the product is used so we can improve it.",
      locked: false,
    },
    {
      id: "marketing",
      title: "Marketing",
      text: "Used to measure campaigns and show relevant content.",
      locked: false,
    },
  ];
  const cookies = [
    {
      name: "session_id",
      category: "Necessary",
      purpose: "Keeps you signed in",
      duration: "Session",
    },
    {
      name: "csrf_token",
      category: "Necessary",
      purpose: "Protects forms against forgery",
      duration: "Session",
    },
    {
      name: "theme",
      category: "Preferences",
      purpose: "Remembers light or dark mode",
      duration: "1 year",
    },
    {
      name: "_analytics_id",
      category: "Analytics",
      purpose: "Counts unique visitors",
      duration: "13 months",
    },
    {
      name: "_campaign",
      category: "Marketing",
      purpose: "Attributes sign ups to campaigns",
      duration: "90 days",
    },
  ];

  const choices = reactive<Record<string, boolean>>({
    necessary: true,
    preferences: true,
    analytics: false,
    marketing: false,
  });

  function setAll(value: boolean) {
    for (const key of Object.keys(choices)) choices[key] = key === "necessary" ? true : value;
    useSonner.success(value ? "All cookies accepted" : "Optional cookies rejected");
  }
  function save() {
    useSonner.success("Cookie preferences saved");
  }
</script>
