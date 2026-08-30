<template>
  <UiDrawer :swipe-direction="isMobile ? 'bottom' : 'right'">
    <UiDrawerTrigger as-child>
      <UiButton variant="outline" :class="props.class">Get Code</UiButton>
    </UiDrawerTrigger>
    <UiDrawerContent :data-mobile="isMobile" class="data-[mobile=true]:max-h-[85svh]">
      <UiDrawerHeader>
        <UiDrawerTitle>Get Code</UiDrawerTitle>
        <UiDrawerDescription>Install typeset with the values you picked.</UiDrawerDescription>
      </UiDrawerHeader>
      <TypesetDocsContent />
      <UiDrawerFooter>
        <UiDrawerClose as-child>
          <UiButton variant="outline">Done</UiButton>
        </UiDrawerClose>
      </UiDrawerFooter>
    </UiDrawerContent>
  </UiDrawer>
</template>

<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    /** Additional classes to apply to the trigger button. */
    class?: HTMLAttributes["class"];
  }>();

  const isMobile = useIsMobile();
</script>
