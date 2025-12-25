<template>
  <nav data-slot="breadcrumb" aria-label="breadcrumb" :class="styles({ class: props.class })">
    <template v-for="(item, i) in items" :key="i">
      <slot :name="item.slot || 'default'">
        <div data-slot="breadcrumb-item" class="flex items-center gap-3">
          <div class="group flex items-center gap-2">
            <slot name="crumbIcon" :item="item" :index="i">
              <Icon
                v-if="item.icon"
                data-slot="breadcrumb-icon"
                :name="item.icon"
                class="size-3.5 shrink-0"
                :class="[
                  isNotLastItem(i)
                    ? 'text-muted-foreground group-hover:text-foreground'
                    : 'text-primary',
                ]"
              />
            </slot>
            <slot :item="item" :is-not-last-item="isNotLastItem" :index="i" name="link">
              <NuxtLink
                v-if="item.label"
                :to="!item?.disabled ? item.link : ''"
                data-slot="breadcrumb-label"
                :class="[
                  item.link && !item.disabled && 'underline-offset-2 group-hover:underline',
                  isNotLastItem(i)
                    ? 'text-muted-foreground group-hover:text-foreground'
                    : 'font-medium text-primary',
                ]"
                class="text-sm text-foreground transition-colors"
                @click="item?.click?.()"
                >{{ item.label }}</NuxtLink
              >
            </slot>
          </div>
        </div>
      </slot>
      <slot name="separator" :item="item" :index="i">
        <Icon
          v-if="isNotLastItem(i)"
          data-slot="breadcrumb-separator"
          :name="separator"
          class="h-3 w-3 text-muted-foreground"
        />
      </slot>
    </template>
  </nav>
</template>

<script lang="ts"></script>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue";

  export interface BreadcrumbItem {
    label?: string;
    icon?: string;
    link?: string;
    disabled?: boolean;
    slot?: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    click?: Function;
  }

  const props = withDefaults(
    defineProps<{
      /**
       * The items to display in the breadcrumbs.
       */
      items?: BreadcrumbItem[];
      /**
       * The separator to use between each breadcrumb.
       */
      separator?: string;
      /**
       * Custom class(es) to add to the parent element.
       */
      class?: HTMLAttributes["class"];
    }>(),
    {
      separator: "lucide:chevron-right",
      items: () => [],
    }
  );

  /**
   * Detects if the current item is not the last item in the breadcrumbs.
   * @param index - The index of the current item.
   */
  const isNotLastItem = (index: number) => {
    return index !== props?.items?.length - 1;
  };

  const styles = tv({
    base: "flex w-full flex-wrap items-center gap-1.5 text-sm wrap-break-word sm:gap-2.5",
  });
</script>
