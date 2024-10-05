<template>
  <div :class="styles({ class: props.class })">
    <UiChartLegend
      v-if="showLegend"
      v-model:items="legendItems"
      @legend-item-click="handleLegendItemClick"
    />

    <VisXYContainer :data="data" :style="{ height: isMounted ? '100%' : 'auto' }" :margin="margin">
      <UiChartCrosshair
        v-if="showTooltip"
        :colors="colors"
        :items="legendItems"
        :custom-tooltip="customTooltip"
        :index="index"
      />

      <VisBarComponent
        :x="(d: Data, i: number) => i"
        :y="categories.map((category) => (d: Data) => d[category])"
        :color="colors"
        :rounded-corners="roundedCorners"
        :bar-padding="0.05"
        :attributes="{
          [selectorsBar]: {
            opacity: (d: Data, i: number) => {
              const pos = i % categories.length;
              return legendItems[pos]?.inactive ? filterOpacity : 1;
            },
          },
        }"
      />

      <VisAxis
        v-if="showXAxis"
        type="x"
        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"
        :grid-line="false"
        :tick-line="false"
        tick-text-color="hsl(var(--vis-text-color))"
      />
      <VisAxis
        v-if="showYAxis"
        type="y"
        :tick-line="false"
        :tick-format="yFormatter"
        :domain-line="false"
        :grid-line="showGridLine"
        :attributes="{
          [Axis.selectors.grid]: {
            class: 'text-muted',
          },
        }"
        tick-text-color="hsl(var(--vis-text-color))"
      />

      <slot />
    </VisXYContainer>
  </div>
</template>

<script lang="ts">
  import { Axis, GroupedBar, StackedBar } from "@unovis/ts";
  import { VisAxis, VisGroupedBar, VisStackedBar, VisXYContainer } from "@unovis/vue";
  import type { BulletLegendItemInterface, Spacing } from "@unovis/ts";

  type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>;

  export interface BarChartProps<T extends Record<string, any>> {
    /**
     * The source data, in which each entry is a dictionary.
     */
    data: T[];
    /**
     * Select the categories from your data. Used to populate the legend and toolip.
     */
    categories: KeyOf<T>[];
    /**
     * Sets the key to map the data to the axis.
     */
    index: KeyOf<T>;
    /**
     * Change the default colors.
     */
    colors?: string[];
    /**
     * Margin of each the container
     */
    margin?: Spacing;
    /**
     * Change the opacity of the non-selected field
     * @default 0.2
     */
    filterOpacity?: number;
    /**
     * Function to format X label
     */
    xFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;
    /**
     * Function to format Y label
     */
    yFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;
    /**
     * Controls the visibility of the X axis.
     * @default true
     */
    showXAxis?: boolean;
    /**
     * Controls the visibility of the Y axis.
     * @default true
     */
    showYAxis?: boolean;
    /**
     * Controls the visibility of tooltip.
     * @default true
     */
    showTooltip?: boolean;
    /**
     * Controls the visibility of legend.
     * @default true
     */
    showLegend?: boolean;
    /**
     * Controls the visibility of gridline.
     * @default true
     */
    showGridLine?: boolean;
  }
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
  const styles = tv({
    base: "flex h-[400px] w-full flex-col items-end",
  });
  const props = withDefaults(
    defineProps<
      BarChartProps<T> & {
        /**
         * Render custom tooltip component.
         */
        customTooltip?: Component;
        /**
         * Change the type of the chart
         * @default "grouped"
         */
        type?: "stacked" | "grouped";
        /**
         * Rounded bar corners
         * @default 0
         */
        roundedCorners?: number;
        /**
         * Additional class to be added to the container
         */
        class?: any;
      }
    >(),
    {
      type: "grouped",
      margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
      filterOpacity: 0.2,
      roundedCorners: 0,
      showXAxis: true,
      showYAxis: true,
      showTooltip: true,
      showLegend: true,
      showGridLine: true,
    }
  );
  const emits = defineEmits<{
    legendItemClick: [d: BulletLegendItemInterface, i: number];
  }>();

  type KeyOfT = Extract<keyof T, string>;
  type Data = (typeof props.data)[number];

  const index = computed(() => props.index as KeyOfT);
  const colors = computed(() =>
    props.colors?.length ? props.colors : defaultColors(props.categories.length)
  );
  const legendItems = ref<BulletLegendItemInterface[]>(
    props.categories.map((category, i) => ({
      name: category,
      color: colors.value[i],
      inactive: false,
    }))
  );

  const isMounted = useMounted();

  function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
    emits("legendItemClick", d, i);
  }

  const VisBarComponent = computed(() =>
    props.type === "grouped" ? VisGroupedBar : VisStackedBar
  );
  const selectorsBar = computed(() =>
    props.type === "grouped" ? GroupedBar.selectors.bar : StackedBar.selectors.bar
  );
</script>
