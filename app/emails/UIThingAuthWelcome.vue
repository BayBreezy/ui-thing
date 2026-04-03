<template>
  <UiThingAuthEmailLayout v-bind="props" :preview-text>
    <EText :style="styles.text"> Hi {{ props?.recipientName ?? "there" }},</EText>
    <EText :style="styles.text">
      Welcome to {{ props?.brandName }}! We're excited to have you on board. If you have any
      questions or need assistance, feel free to reach out to our support team.
    </EText>
    <EText :style="styles.text"> Thanks,<br />The {{ brandName }} Team </EText>
  </UiThingAuthEmailLayout>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import type { CSSProperties } from "vue";

  import UiThingAuthEmailLayout from "@/emails/layouts/ui-thing/auth/Layout.vue";

  import type { UIThingAuthWelcomeProps } from "./types/ui-thing/auth";

  const props = withDefaults(defineProps<UIThingAuthWelcomeProps>(), {
    brandName: "UI Thing",
    logoAlt: "UI Thing Logo",
    appUrl: "https://uithing.com",
    logoUrl: "https://uithing.com/icon.png",
    title: "UI Thing",
    fontFamilyFallBack: () => ["Arial", "Helvetica", "sans-serif"],
    email: "behon@example.com",
    recipientName: "Behon",
  });

  const previewText = computed(
    () => props?.previewText ?? `Welcome to ${props?.brandName}! We happy to have you onboard.`
  );

  const styles = {
    text: {
      color: "#3f3f46",
      fontSize: "16px",
      lineHeight: "26px",
    },
  } as Record<string, CSSProperties>;
</script>
