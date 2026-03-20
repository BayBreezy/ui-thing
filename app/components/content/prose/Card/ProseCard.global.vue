<template>
  <component
    v-bind="linkProps"
    :is="as"
    :class="proseCardStyles().base({ class: normalizeClass(props.class) || undefined })"
    data-slot="prose-card"
  >
    <slot name="icon" mdc-unwrap="p">
      <ProseSmartIcon v-if="icon" :name="icon" :class="proseCardStyles().icon()" />
    </slot>
    <slot name="title" mdc-unwrap="p">
      <h3 v-if="title" data-slot="prose-card-title" :class="proseCardStyles().title()">
        {{ title }}
      </h3>
    </slot>
    <slot mdc-unwrap="p">
      <p
        v-if="description"
        data-slot="prose-card-description"
        :class="proseCardStyles().description()"
      >
        {{ description }}
      </p>
    </slot>
    <slot name="footer"></slot>
    <div v-if="to || href" class="absolute top-4 right-4">
      <Icon
        name="lucide:arrow-up-right"
        class="size-5 scale-0 opacity-80 transition-all duration-200 group-hover:scale-100"
      />
    </div>
    <ui-border-beam :duration="20" :size="100" class="opacity-0 group-hover:opacity-100" />
  </component>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { NuxtLinkProps } from "#app";
  import type { HTMLAttributes } from "vue";

  export const proseCardStyles = tv({
    slots: {
      base: "group relative flex flex-col gap-2 rounded-lg border border-border/50 bg-card p-6 text-card-foreground no-underline shadow-xs *:my-0!",
      icon: "size-6 text-muted-foreground",
      title: "not-prose text-lg font-semibold tracking-tight text-foreground",
      description: "text-[15px] text-muted-foreground first:mt-0 last:mb-0",
    },
  });

  export type ProseCardProps = NuxtLinkProps & {
    /**
     * Additional classes for the card wrapper
     */
    class?: HTMLAttributes["class"];
    /**
     * Title of the card
     */
    title?: string;
    /**
     * Description/content of the card
     */
    description?: string;
    /**
     * Icon name to display in the card
     */
    icon?: string;
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ProseCardProps>(), {});

  defineSlots<{
    /**
     * Slot for the card title
     */
    title: () => any;
    /**
     * Slot for the card description/content
     */
    default: () => any;
    /**
     * Slot for an icon to display in the card
     */
    icon: () => any;
    /**
     * Slot for the card footer
     */
    footer: () => any;
  }>();

  const linkProps = computed(() => {
    if (!(props.to || props.href)) return {};

    return reactiveOmit(props, ["class", "title", "description", "icon"]);
  });

  const as = computed(() => (props.to || props.href ? resolveComponent("NuxtLink") : "div"));
</script>
