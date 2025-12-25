<template>
  <div :class="styles.base()">
    <!-- Name Section -->
    <div v-if="$slots.name || name" :class="styles.name()">
      <slot mdc-unwrap="p" name="name">
        <span v-if="name" :class="styles.nameText()">{{ name }}</span>
      </slot>
      <!-- Tooltip Section -->
      <slot mdc-unwrap="p" name="tip">
        <UiTooltip v-if="tip">
          <UiTooltipTrigger>
            <prose-smart-icon v-if="tipIcon" class="text-muted-foreground" :name="tipIcon" />
          </UiTooltipTrigger>
          <UiTooltipContent>
            <span>{{ tip }}</span>
            <UiTooltipArrow />
          </UiTooltipContent>
        </UiTooltip>
      </slot>
      <code v-if="type" :class="styles.typeBadge()">{{ type }}</code>
      <code v-if="required" :class="styles.requiredBadge()">required</code>
    </div>

    <!-- Default Value Section -->
    <div v-if="$slots['default-value'] || defaultValue" :class="styles.defaultValue()">
      <span :class="styles.defaultLabel()">Default</span>
      <slot mdc-unwrap="p" name="default-value">
        <code :class="styles.defaultCode()">{{ defaultValue }}</code>
      </slot>
    </div>
    <!-- Description Section -->
    <div v-if="$slots.default || description" :class="styles.description()">
      <slot mdc-unwrap="p">
        {{ description }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { tv } from "tailwind-variants";

  /**
   * Field styles configuration using tailwind-variants
   */
  export const fieldStyles = tv({
    slots: {
      base: "flex flex-col gap-2 py-4",
      name: "flex flex-wrap items-center gap-2",
      nameText: "font-semibold text-foreground",
      typeBadge: "rounded-md px-1.5 py-0.5 text-[11px]",
      requiredBadge:
        "rounded-md border-red-500/50 bg-red-500/10! px-1.5 py-0.5 text-[11px] text-red-500",
      description: "max-w-none text-[15px] text-muted-foreground",
      defaultValue: "flex items-center gap-2 text-sm",
      defaultLabel: "font-medium text-muted-foreground",
      defaultCode:
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-[11px] text-foreground",
    },
  });

  /**
   * Field component props type
   */
  export type ProseFieldProps = {
    /**
     * The name/title of the field
     * @example "variant"
     */
    name?: string;

    /**
     * Description of what this field does
     * @example "The variant style of the button"
     */
    description?: string;

    /**
     * The default value for this field
     * @example "default"
     */
    defaultValue?: string | number | boolean | Record<string, any>;

    /**
     * The type of value this field accepts
     * @example "string | number"
     */
    type?: string;

    /**
     * A brief tip or note about this field
     *
     * Will be displayed in a tooltip
     */
    tip?: string;

    /**
     * Icon that will be displayed in the tip tooltip
     * @default 'lucide:circle-question-mark'
     */
    tipIcon?: string;

    /**
     * Whether this field is required
     * @default false
     */
    required?: boolean;
  };
</script>

<script lang="ts" setup>
  withDefaults(defineProps<ProseFieldProps>(), {
    required: false,
    tipIcon: "lucide:circle-question-mark",
  });

  const styles = fieldStyles();
</script>
