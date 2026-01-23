<template>
  <EHtml lang="en" dir="ltr">
    <EHead>
      <title v-if="title">{{ title }}</title>
      <EPreview v-if="previewText">{{ previewText }}</EPreview>

      <!-- Font import -->
      <EFont
        font-family="Inter"
        :fallback-font-family="fontFamilyFallBack"
        :web-font="{
          url: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
          format: 'truetype',
        }"
      ></EFont>
    </EHead>

    <!-- Outer body -->
    <EBody :style="styles.body">
      <!-- Container that maxes out at 500px -->
      <EContainer :style="styles.container">
        <!-- Heading section with logo and navigation links -->
        <ESection style="padding: 24px 0px">
          <!-- Logo -->
          <UiThingEmailLogo
            :brand-name="props?.brandName"
            :logo-url="props?.logoUrl"
            :app-url="props?.appUrl"
          />

          <ESection style="padding-top: 14px">
            <!-- Navigation links -->
            <UiThingEmailHeaderMenu />
          </ESection>
        </ESection>
        <ESection style="margin-bottom: 20px">
          <EHr />
        </ESection>

        <!-- Main content -->
        <slot />

        <!-- Footer -->
        <UiThingEmailFooter
          :brand-name="props?.brandName"
          :app-url="props?.appUrl"
          :email="props?.email"
        />
      </EContainer>
    </EBody>
  </EHtml>
</template>

<script setup lang="ts">
  import UiThingEmailFooter from "@/emails/components/ui-thing/auth/Footer.vue";
  import UiThingEmailHeaderMenu from "@/emails/components/ui-thing/auth/HeaderMenu.vue";
  import UiThingEmailLogo from "@/emails/components/ui-thing/auth/Logo.vue";
  import { computed } from "vue";
  import type { UIThingAuthWelcomeProps } from "@/emails/types/ui-thing/auth";
  import type { CSSProperties } from "vue";

  const props = withDefaults(defineProps<UIThingAuthWelcomeProps>(), {
    brandName: "UI Thing",
    logoAlt: "UI Thing Logo",
    appUrl: "https://uithing.com",
    logoUrl: "https://uithing.com/icon.png",
    title: "UI Thing",
    fontFamilyFallBack: () => ["Arial", "Helvetica", "sans-serif"],
    email: "sherika@example.com",
  });
  const previewText = computed(
    () => props?.previewText ?? `Welcome to ${props?.brandName}! We happy to have you onboard.`
  );

  const styles = {
    body: {
      fontFamily: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, ${props?.fontFamilyFallBack?.join(", ")}`,
      padding: "32px",
    },
    container: {
      maxWidth: "480px",
      padding: "5px",
    },
  } as Record<string, CSSProperties>;
</script>
