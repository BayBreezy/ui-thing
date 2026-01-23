<template>
  <ESection>
    <ELink :href="appUrl" target="_blank" rel="noreferrer" :style="styles.link">
      <ERow>
        <EColumn style="width: 6%; vertical-align: middle">
          <EImg :src="logoUrl" :alt="brandName" :style="styles.img" />
        </EColumn>
        <EColumn style="width: 94%; vertical-align: middle">
          <EText :style="styles.text">{{ brandName }}</EText>
        </EColumn>
      </ERow>
    </ELink>
  </ESection>
</template>

<script setup lang="ts">
  import type { LogoProps } from "@/emails/types/ui-thing/auth";
  import type { CSSProperties } from "vue";

  withDefaults(defineProps<LogoProps>(), {
    brandName: "UI Thing",
    logoUrl: "https://uithing.com/icon.png",
    logoAlt: "UI Thing Logo",
    appUrl: "https://uithing.com",
  });

  const styles = {
    link: {
      textDecoration: "none",
    },
    img: {
      height: "28px",
      width: "28px",
      verticalAlign: "middle",
      marginRight: "8px",
      borderRadius: "4px",
    },
    text: {
      fontWeight: "700",
      fontSize: "22px",
      color: "#09090b",
    },
  } as Record<string, CSSProperties>;
</script>
