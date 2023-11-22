<template>
  <UiToastProvider>
    <template v-for="toast in toasts" :key="toast.id">
      <UiToast v-bind="toast">
        <div class="flex gap-3">
          <Icon
            v-if="toast.icon"
            :name="toast.icon"
            class="h-5 w-5 shrink-0"
            :class="[!!toast.title && !!toast.description && 'mt-0.5']"
          />
          <div class="flex flex-col gap-1">
            <UiToastTitle v-if="toast.title" :title="toast.title" />
            <template v-if="toast.description">
              <UiToastDescription v-if="isVNode(toast.description)">
                <component :is="toast.description" />
              </UiToastDescription>
              <UiToastDescription v-else>
                {{ toast.description }}
              </UiToastDescription>
            </template>
            <UiToastClose />
          </div>
        </div>
        <component :is="toast.action" />
      </UiToast>
    </template>
    <UiToastViewport />
  </UiToastProvider>
</template>

<script lang="ts" setup>
  import { isVNode } from "vue";

  const { toasts } = useToast();
</script>

<style>
  :root {
    --success-bg: hsl(143, 85%, 96%);
    --success-border: hsl(145, 92%, 91%);
    --success-text: hsl(140, 100%, 27%);

    --info-bg: hsl(208, 100%, 97%);
    --info-border: hsl(221, 91%, 91%);
    --info-text: hsl(210, 92%, 45%);

    --warning-bg: hsl(49, 100%, 97%);
    --warning-border: hsl(49, 91%, 91%);
    --warning-text: hsl(31, 92%, 45%);

    --error-bg: hsl(359, 100%, 97%);
    --error-border: hsl(359, 100%, 94%);
    --error-text: hsl(360, 100%, 45%);
  }
  .dark {
    --success-bg: hsl(150, 100%, 6%);
    --success-border: hsl(147, 100%, 12%);
    --success-text: hsl(150, 86%, 65%);

    --info-bg: hsl(215, 100%, 6%);
    --info-border: hsl(223, 100%, 12%);
    --info-text: hsl(216, 87%, 65%);

    --warning-bg: hsl(64, 100%, 6%);
    --warning-border: hsl(60, 100%, 12%);
    --warning-text: hsl(46, 87%, 65%);

    --error-bg: hsl(358, 76%, 10%);
    --error-border: hsl(357, 89%, 16%);
    --error-text: hsl(358, 100%, 81%);
  }
</style>
