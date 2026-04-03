<template>
  <ESection>
    <EText :style="styles.text">
      This email was sent to
      <ELink :style="styles.link" :href="`mailto:${email}`" target="_blank">{{ email }}</ELink
      >. If you'd rather not receive this kind of email, you can
      <ELink :style="styles.link" :href="unsubscribeUrl || ''">unsubscribe</ELink> or
      <ELink :style="styles.link" :href="managePreferencesUrl || ''"
        >manage your email preferences</ELink
      >.
    </EText>
  </ESection>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from "vue";

  import type { DisclaimerProps } from "@/emails/types/ui-thing/auth";

  const styles = {
    text: {
      color: "#52525b",
      fontSize: "14px",
      lineHeight: "24px",
    },
    link: {
      color: "#8b5cf6",
      textDecoration: "underline",
    },
  } as Record<string, CSSProperties>;

  defineProps<DisclaimerProps>();
</script>
