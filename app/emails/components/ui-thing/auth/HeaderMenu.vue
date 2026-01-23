<template>
  <ESection>
    <template v-for="link in links" :key="link.label">
      <ELink :href="link.url" target="_blank" :style="styles.link">{{ link.label }}</ELink>
    </template>
  </ESection>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from "vue";

  const styles = {
    link: {
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "26px",
      marginRight: "14px",
      color: "#09090b",
      textDecoration: "none !important",
    },
  } as Record<string, CSSProperties>;

  type Link = {
    /**
     * The label of the link to display
     */
    label: string;
    /**
     * The URL the link points to
     */
    url: string;
  };

  withDefaults(
    defineProps<{
      /**
       * The links to display in the header menu
       * @default A set of default links
       */
      links?: Link[];
    }>(),
    {
      links: () => [
        { label: "Home", url: "https://uithing.com" },
        { label: "Features", url: "https://uithing.com/features" },
        { label: "Pricing", url: "https://uithing.com/pricing" },
        { label: "Support", url: "https://uithing.com/support" },
      ],
    }
  );
</script>
