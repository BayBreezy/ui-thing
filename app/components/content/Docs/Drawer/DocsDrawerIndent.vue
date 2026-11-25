<template>
  <UiDrawerProvider>
    <div class="relative overflow-hidden rounded-lg border">
      <UiDrawerIndentBackground />
      <UiDrawerIndent
        class="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center"
      >
        <p class="text-muted-foreground text-sm">
          This page scales back while the drawer is open and grows again as you swipe it away.
        </p>
        <UiDrawer v-model:open="open">
          <UiDrawerTrigger as-child>
            <UiButton variant="outline">Open drawer</UiButton>
          </UiDrawerTrigger>
          <UiDrawerContent>
            <UiDrawerHeader>
              <UiDrawerTitle>Indented page</UiDrawerTitle>
              <UiDrawerDescription
                >Swipe down to dismiss and watch the page return.</UiDrawerDescription
              >
            </UiDrawerHeader>
            <UiDrawerFooter>
              <UiDrawerClose as-child>
                <UiButton variant="outline">Close</UiButton>
              </UiDrawerClose>
            </UiDrawerFooter>
          </UiDrawerContent>
        </UiDrawer>
      </UiDrawerIndent>
    </div>
  </UiDrawerProvider>
</template>

<script setup lang="ts">
  const open = ref(false);
</script>
