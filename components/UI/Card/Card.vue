<template>
  <div :class="styles({ class: props.class })">
    <slot>
      <slot name="header">
        <UICardHeader>
          <slot name="title">
            <UICardTitle v-if="title || $slots.title" :title="title" />
          </slot>
          <slot name="description">
            <UICardDescription
              v-if="description || $slots.description"
              :description="description"
            />
          </slot>
        </UICardHeader>
      </slot>
      <slot name="content" v-if="content || $slots.content">
        <UICardContent>
          <div v-html="content"></div>
        </UICardContent>
      </slot>
      <slot name="footer"></slot>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title?: string;
    description?: string;
    content?: string;
    class?: any;
  }>();

  const styles = tv({
    base: "rounded-lg border bg-card text-card-foreground shadow-sm",
  });
</script>
