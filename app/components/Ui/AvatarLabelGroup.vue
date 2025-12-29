<template>
  <figure :class="classes.base({ class: props.class })">
    <slot name="avatar" v-bind="slotProps">
      <UiAvatar v-bind="avatarProps" :class="classes.avatar()" />
    </slot>
    <slot name="figcaption" v-bind="slotProps">
      <figcaption :class="classes.figcaption()">
        <slot name="title" v-bind="slotProps">
          <p v-if="title" :class="classes.title()">{{ title }}</p>
        </slot>
        <slot name="subtitle" v-bind="slotProps">
          <p v-if="subtitle" :class="classes.subtitle()">{{ subtitle }}</p>
        </slot>
      </figcaption>
    </slot>
  </figure>
</template>

<script lang="ts">
  import type { AvatarProps } from "@/components/Ui/Avatar/Avatar.vue";

  export type AvatarLabelGroupProps = AvatarProps & {
    /**
     * Size of the group
     *
     * @default "md"
     */
    size?: VariantProps<typeof avatarLabelGroupStyles>["size"];
    /**
     * Title text to display next to the avatar
     */
    title?: string;
    /**
     * Subtitle text to display below the title
     */
    subtitle?: string;
  };

  export const avatarLabelGroupStyles = tv({
    slots: {
      base: ["group flex min-w-0 flex-1 items-center"],
      figcaption: ["min-w-0 flex-1"],
      title: "text-foreground",
      subtitle: "truncate text-muted-foreground",
      avatar: "",
    },
    variants: {
      size: {
        sm: {
          base: "gap-2",
          title: "text-sm font-semibold",
          subtitle: "text-xs",
          avatar: "size-8",
        },
        md: {
          base: "gap-2",
          title: "text-sm font-semibold",
          subtitle: "text-sm",
          avatar: "size-10",
        },
        lg: {
          base: "gap-3",
          title: "text-md font-semibold",
          subtitle: "text-md",
          avatar: "size-12",
        },
        xl: {
          base: "gap-4",
          title: "text-lg font-semibold",
          subtitle: "text-md",
          avatar: "size-14",
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AvatarLabelGroupProps>(), {
    size: "md",
  });

  const classes = computed(() => {
    return avatarLabelGroupStyles({
      size: props.size,
    });
  });

  const avatarProps = reactiveOmit(props, ["size", "title", "subtitle"]);

  const slotProps = computed(() => ({
    ...props,
  }));
  defineSlots<{
    /**
     * Avatar slot to customize the avatar component
     */
    avatar: (p: typeof slotProps.value) => any;
    /**
     * Figcaption slot to customize the figcaption element
     */
    figcaption: (p: typeof slotProps.value) => any;
    /**
     * Title slot to customize the title element
     */
    title: (p: typeof slotProps.value) => any;
    /**
     * Subtitle slot to customize the subtitle element
     */
    subtitle: (p: typeof slotProps.value) => any;
  }>();
</script>
