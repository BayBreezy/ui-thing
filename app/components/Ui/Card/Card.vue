<template>
  <Primitive
    data-slot="card"
    :as="as"
    :as-child="asChild"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <slot name="header">
        <UiCardHeader>
          <slot name="title">
            <UiCardTitle v-if="title || $slots.title" :title="title" />
          </slot>
          <slot name="action" />
          <slot name="description">
            <UiCardDescription
              v-if="description || $slots.description"
              :description="description"
            />
          </slot>
        </UiCardHeader>
      </slot>
      <slot v-if="content || $slots.content" name="content">
        <UiCardContent>
          <div v-html="content" />
        </UiCardContent>
      </slot>
      <slot name="footer" />
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

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
        class?: HTMLAttributes["class"];
      }
    >(),
    { as: "div" }
  );

  const styles = tv({
    base: "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
  });
</script>
