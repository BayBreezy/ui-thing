<template>
  <UiNavbar sticky>
    <UiContainer class="flex h-16 items-center justify-between">
      <DocsLogo />
      <DocsHeader />
    </UiContainer>
  </UiNavbar>

  <div class="container">
    <div
      class="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
    >
      <h1
        class="leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter"
      >
        Tailwind Colors in Every Format
      </h1>
      <p class="text-foreground max-w-3xl text-base text-balance sm:text-lg">
        The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to
        copy and paste into your project.
      </p>
    </div>
    <div class="py-6">
      <section id="colors" class="scroll-mt-20">
        <div class="grid gap-8 lg:gap-16 xl:gap-20">
          <ColorPalette v-for="colorPalette in colors" :key="colorPalette.name" :color-palette />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getColors } from "~/utils/registry/colors";

  definePageMeta({ layout: "blank" });
  const route = useRoute();
  const colors = getColors();
  const title = "Tailwind Colors";
  const description =
    "The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project.";

  useSeoMeta({
    title,
    titleTemplate: `%s | ${SITE_NAME}`,
    description,
    keywords: SITE_KEYWORDS.join(", "),
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: "summary_large_image",
    ogUrl: `${SITE_URL}${route.path}`,
  });

  useSeo({
    title,
    description,
    lang: "en",
  });

  defineOgImage("Docs.takumi", {
    title: title,
    description: description,
  });
</script>
