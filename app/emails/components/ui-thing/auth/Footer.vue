<template>
  <ESection>
    <!-- Disclaimer -->
    <UiThingEmailDisclaimer :email="props?.email" />
    <!-- Address -->
    <UiThingEmailAddress />
    <ESection :style="styles.section">
      <ERow>
        <EColumn>
          <ELink :href="appUrl" target="_blank" rel="noreferrer" :style="styles.link">
            <ERow>
              <EColumn style="width: 28px; vertical-align: middle">
                <EImg :src="logoUrl" :alt="logoAlt" :style="styles.img" />
              </EColumn>
              <EColumn>
                <EText :style="{ ...styles.text, fontWeight: '700', fontSize: '18px' }">{{
                  brandName
                }}</EText>
              </EColumn>
            </ERow>
          </ELink>
        </EColumn>
        <EColumn align="right" style="vertical-align: middle">
          <ELink :href="contactUrl" :style="styles.text">Contact Us</ELink>
        </EColumn>
      </ERow>
    </ESection>
  </ESection>
</template>

<script setup lang="ts">
  import UiThingEmailAddress from "@/emails/components/ui-thing/auth/Address.vue";
  import UiThingEmailDisclaimer from "@/emails/components/ui-thing/auth/Disclaimer.vue";
  import type { FooterProps } from "@/emails/types/ui-thing/auth";
  import type { CSSProperties } from "vue";

  const props = withDefaults(defineProps<FooterProps>(), {
    brandName: "UI Thing",
    logoUrl: "https://uithing.com/icon.png",
    logoAlt: "UI Thing Logo",
    appUrl: "https://uithing.com",
    contactUrl: "https://uithing.com/contact",
  });

  const styles = {
    img: {
      height: "22px",
      width: "22px",
      verticalAlign: "middle",
      borderRadius: "4px",
    },
    section: {
      paddingTop: "14px",
    },
    link: {
      textDecoration: "none",
    },
    text: {
      textDecoration: "none",
      fontSize: "14px",
      color: "#09090b",
    },
  } as Record<string, CSSProperties>;
</script>
