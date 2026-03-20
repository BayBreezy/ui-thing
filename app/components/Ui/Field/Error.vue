<template>
  <Primitive
    :as
    :as-child
    role="alert"
    data-slot="field-error"
    :class="fieldErrorStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <template v-if="errors">
        <template v-if="Array.isArray(errors)">
          <ul class="ml-4 flex list-disc flex-col gap-1">
            <template v-for="(item, i) in errors" :key="i">
              <li>
                {{
                  typeof item === "object" && item !== null && "message" in item
                    ? item.message
                    : item
                }}
              </li>
            </template>
          </ul>
        </template>
        <template v-else>
          <span>{{ errors }}</span>
        </template>
      </template>
    </slot>
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const fieldErrorStyles = tv({
    base: ["text-sm font-normal text-destructive"],
  });
</script>
<script lang="ts" setup>
  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional classes to apply to the element.
       */
      class?: HTMLAttributes["class"];
      /**
       * Error message(s) to display.
       */
      errors?: string | string[] | Array<{ message: string }>;
    }
  >();
</script>
