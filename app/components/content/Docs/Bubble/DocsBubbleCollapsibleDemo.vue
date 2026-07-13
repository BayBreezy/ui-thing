<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble variant="muted">
      <UiBubbleContent>How can I help you today?</UiBubbleContent>
    </UiBubble>

    <UiBubble variant="muted" align="end">
      <UiBubbleContent class="whitespace-pre-line">
        <UiCollapsible v-model:open="open">
          <div>{{ open || !isLong ? text : preview }}</div>
          <template v-if="isLong">
            <UiCollapsibleTrigger as-child>
              <UiButton variant="link" class="group/collapsible text-muted-foreground gap-1 p-0">
                {{ open ? "Show less" : "Show more" }}
                <Icon
                  name="lucide:chevron-down"
                  class="size-4 group-data-[state=open]/collapsible:rotate-180"
                />
              </UiButton>
            </UiCollapsibleTrigger>
          </template>
        </UiCollapsible>
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup>
  const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

  const previewLength = 180;
  const open = ref(false);
  const preview = computed(() => `${text.slice(0, previewLength)}...`);
  const isLong = computed(() => text.length > previewLength);
</script>
