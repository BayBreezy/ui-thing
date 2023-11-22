<template>
  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })">
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
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Title that should be displayed. Passed to the `CardTitle` component */
        title?: string;
        /** Description that should be displayed. Passed to the `CardDescription` component */
        description?: string;
        /** Content that should be displayed. Passed to the `CardContent` component */
        content?: string;
        /** Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      as: "div",
    }
  );

  const styles = tv({
    base: "rounded-lg border bg-card text-card-foreground shadow-sm",
  });
</script>
