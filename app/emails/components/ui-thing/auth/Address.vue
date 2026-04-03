<template>
  <ESection>
    <EText :style="styles.text">
      {{ props?.street }}, {{ props?.city }}, {{ props?.state }} {{ props?.zip }},
      {{ props?.country }} {{ new Date().getFullYear() }}
    </EText>
  </ESection>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from "vue";

  import type { AddressProps } from "@/emails/types/ui-thing/auth";

  const styles = {
    text: {
      color: "#52525b",
      fontSize: "14px",
      lineHeight: "24px",
    },
  } as Record<string, CSSProperties>;

  const props = withDefaults(defineProps<AddressProps>(), {
    street: "123 Main St",
    city: "Mandeville",
    state: "Manchester",
    zip: "JMA 12345",
    country: "Jamaica",
  });
</script>
