<template>
  <UIDialogPortal>
    <UIDialogOverlay />
    <DialogContent :class="styles({ class: props.class })" v-bind="$attrs">
      <slot>
        <slot name="header">
          <UIDialogHeader>
            <slot name="title">
              <UIDialogTitle v-if="title" :title="title" />
            </slot>
            <slot name="description">
              <UIDialogDescription v-if="description" :description="description" />
            </slot>
          </UIDialogHeader>
        </slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </slot>
      <slot name="close">
        <UIDialogClose :icon="icon" />
      </slot>
    </DialogContent>
  </UIDialogPortal>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const styles = tv({
    base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
  });

  const props = defineProps<{
    icon?: string;
    title?: string;
    description?: string;
    class?: any;
  }>();
</script>
