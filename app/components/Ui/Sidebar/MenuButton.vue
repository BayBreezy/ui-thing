<template>
  <UiSidebarMenuButtonChild v-if="!tooltip" v-bind="{ ...delegatedProps, ...$attrs }">
    <slot />
  </UiSidebarMenuButtonChild>

  <UiTooltip v-else>
    <UiTooltipTrigger as-child>
      <UiSidebarMenuButtonChild v-bind="{ ...delegatedProps, ...$attrs }">
        <slot />
      </UiSidebarMenuButtonChild>
    </UiTooltipTrigger>
    <UiTooltipContent side="right" align="center" :hidden="state !== 'collapsed' || isMobile">
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component :is="tooltip" v-else />
    </UiTooltipContent>
  </UiTooltip>
</template>

<script lang="ts">
  import type { SidebarMenuButtonProps } from "./MenuButtonChild.vue";
  import type { Component } from "vue";
</script>
<script setup lang="ts">
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      SidebarMenuButtonProps & {
        tooltip?: string | Component;
      }
    >(),
    {
      as: "button",
      variant: "default",
      size: "default",
    }
  );

  const { isMobile, state } = useSidebar();

  const delegatedProps = computed(() => {
    const { tooltip, ...delegated } = props;
    return delegated;
  });
</script>
