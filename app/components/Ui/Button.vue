<template>
  <component
    :is="elementType"
    :class="
      buttonStyles({
        hasIcon: !!icon || loading,
        disabled: disabled || loading,
        variant: variant,
        size: size,
        class: props.class,
      })
    "
    :disabled="disabled || loading"
    v-bind="forwarded"
  >
    <div class="flex items-center justify-center gap-2">
      <slot name="iconLeft">
        <Icon
          v-if="loading ? iconPlacement !== 'right' : !!icon && iconPlacement === 'left'"
          :name="loading ? 'line-md:loading-loop' : icon || ''"
          class="size-5"
        />
      </slot>

      <slot>
        <span v-if="text" :class="{ 'opacity-0': loading }">{{ text }}</span>
      </slot>

      <slot name="iconRight">
        <Icon
          v-if="loading ? iconPlacement === 'right' : !!icon && iconPlacement === 'right'"
          :name="loading ? 'line-md:loading-loop' : icon || ''"
          class="size-5"
        />
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { useForwardProps } from "radix-vue";
  import type { NuxtLinkProps } from "#app/components";

  type ButtonProps = VariantProps<typeof buttonStyles>;
  const props = withDefaults(
    defineProps<
      NuxtLinkProps & {
        /** The type for the button */
        type?: "button" | "submit" | "reset";
        /** Whether the button is disabled */
        disabled?: boolean;
        /** Whether the button is loading */
        loading?: boolean;
        /** The action to perform when the button is clicked */
        onClick?: any;
        /** The element to render the button as */
        as?: string;
        /** Custom class(es) to add to parent element */
        class?: any;
        /** The variant of the button */
        variant?: ButtonProps["variant"];
        /** The size of the button */
        size?: ButtonProps["size"];
        /** The text to display in the button */
        text?: string;
        /** Should the icon be displayed on the `left` or the `right`? */
        iconPlacement?: "left" | "right";
        /** The icon to display in the button */
        icon?: string;
      }
    >(),
    {
      type: "button",
      iconPlacement: "left",
      loading: false,
    }
  );

  const elementType = computed(() => {
    if (props.as) return props.as;
    if (props.href || props.to || props.target) return resolveComponent("NuxtLink");
    return "button";
  });

  const forwarded = useForwardProps(
    reactiveOmit(
      props,
      "class",
      "text",
      "icon",
      "iconPlacement",
      "size",
      "variant",
      "as",
      "loading",
      "disabled"
    )
  );
</script>
