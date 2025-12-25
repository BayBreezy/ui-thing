<template>
  <!-- @vue-ignore -->
  <VueApexCharts v-bind="forwarded" ref="chart" />
</template>

<script lang="ts">
  import { useForwardPropsEmits } from "reka-ui";
  import VueApexCharts from "vue3-apexcharts";
  import type { ApexOptions } from "apexcharts";

  declare global {
    interface Window {
      Apex: ApexOptions;
    }
  }

  /**
   * This is the default configuration for ApexCharts, which can be overridden by the `options` prop.
   *
   * It sets the default styles, colors, and other properties for the charts.
   */
  window.Apex = {
    chart: {
      animations: { enabled: true },
      fontFamily: "var(--font-sans)",
      foreColor: "var(--color-foreground)",
      selection: {
        fill: { color: "var(--color-blue-500)", opacity: 0.1 },
        stroke: { color: "var(--color-blue-500)", width: 1, opacity: 0.5 },
      },
      toolbar: {
        show: false,
        tools: {
          download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"/></svg>`,
          reset: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5m-5 4a9 9 0 0 0 9 9a9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></g></svg>`,
          pan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2m0 4V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2m0 4.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g></svg>`,
          zoom: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21l-4.3-4.3"/></g></svg>`,
          zoomout: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21l-4.35-4.35M8 11h6"/></g></svg>`,
          zoomin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21l-4.35-4.35M11 8v6m-3-3h6"/></g></svg>`,
          selection: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033zM5 3a2 2 0 0 0-2 2m16-2a2 2 0 0 1 2 2M5 21a2 2 0 0 1-2-2M9 3h1M9 21h2m3-18h1M3 9v1m18-1v2M3 14v1"/></svg>`,
        },
      },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth", lineCap: "round" },
    dataLabels: { enabled: false },
    grid: { borderColor: "var(--color-border)" },
    legend: {
      show: false,
      itemMargin: { horizontal: 8 },
      markers: { strokeWidth: 0, size: 6, offsetX: -3 },
    },
    markers: { strokeWidth: 0 },
    yaxis: {
      axisBorder: { color: "var(--color-border)" },
      axisTicks: { color: "var(--color-border)" },
      crosshairs: { stroke: { width: 1, color: "var(--color-border)" } },
      labels: { style: { colors: "var(--color-muted-foreground)", fontSize: "12px" } },
      title: { style: { color: "var(--color-muted-foreground)", fontSize: "12px" } },
    },
    xaxis: {
      axisBorder: { color: "var(--color-border)" },
      axisTicks: { color: "var(--color-border)" },
      crosshairs: { stroke: { width: 1, color: "var(--color-border)" } },
      labels: {
        style: { colors: "var(--color-muted-foreground)", fontSize: "12px" },
        hideOverlappingLabels: true,
        rotateAlways: false,
        rotate: 0,
      },
      title: { style: { color: "var(--color-muted-foreground)", fontSize: "12px" } },
    },
    plotOptions: {
      radialBar: {
        track: { background: "var(--color-muted)" },
        hollow: { size: "30px" },
      },
      polarArea: {
        rings: { strokeColor: "var(--color-border)" },
        spokes: { connectorColors: "var(--color-border)" },
      },
      radar: {
        polygons: {
          strokeColors: "var(--color-border)",
          connectorColors: "var(--color-border)",
        },
      },
    },
    // Hex values are best. If you need to convert your oklch values, use the `culori` package.
    colors: ["#93c5fd", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"],
  };

  export type ApexChartProps = {
    /**
     * All the optional configuration of the chart goes in this property
     *
     * @default {}
     */
    options?: ApexOptions;
    /**
     * The chart type
     *
     * @default line
     */
    type?:
      | "line"
      | "area"
      | "bar"
      | "histogram"
      | "pie"
      | "donut"
      | "radialBar"
      | "rangeBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "candlestick"
      | "radar"
      | "polarArea"
      | "treemap";
    /**
     * The data which you want to display in the chart
     *
     * @default []
     */
    series?: ApexOptions["series"];
    /**
     * Width of the chart
     *
     * @default '100%'
     */
    width?: string | number;
    /**
     * Height of the chart
     *
     * @default '100%'
     */
    height?: string | number;
  };
  export type ChartInstanceMethods = {
    init(): Promise<void>;
    refresh(): Promise<void>;
    destroy(): void;
    updateOptions(
      options: any,
      redrawPaths?: boolean,
      animate?: boolean,
      updateSyncedCharts?: boolean
    ): Promise<void>;
    updateSeries(newSeries: any, animate?: boolean): Promise<void>;
    toggleSeries(seriesName: string): any;
    highlightSeries(seriesName: string): any;
    showSeries(seriesName: string): void;
    hideSeries(seriesName: string): void;
    resetSeries(): void;
    zoomX(min: number, max: number): void;
    toggleDataPointSelection(seriesIndex: number, dataPointIndex?: number): any;
    appendData(newData: any): Promise<void>;
    appendSeries(newSeries: any, animate?: boolean): Promise<void>;
    addXaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
    addYaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
    addPointAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
    removeAnnotation(id: string, options?: any): void;
    clearAnnotations(): void;
    dataURI(options?: { scale?: number; width?: number }): Promise<void>;
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ApexChartProps>(), {
    series: () => [],
    type: "line",
    width: "100%",
    height: "100%",
    options: () => ({}),
  });

  /**
   * The ApexCharts instance.
   *
   * You can use this to call methods on the chart instance, such as `chart.updateOptions()`, `chart.refresh()`, etc.
   */
  const chart = useTemplateRef<ChartInstanceMethods>("chart");

  const emits = defineEmits([
    "animationEnd",
    "beforeMount",
    "mounted",
    "updated",
    "click",
    "mouseMove",
    "mouseLeave",
    "legendClick",
    "markerClick",
    "selection",
    "dataPointSelection",
    "dataPointMouseEnter",
    "dataPointMouseLeave",
    "beforeZoom",
    "beforeResetZoom",
    "zoomed",
    "scrolled",
    "brushScrolled",
  ]);

  const forwarded = useForwardPropsEmits(props, emits);

  defineExpose({ chart });
</script>

<style scoped>
  :deep(.apexcharts-tooltip) {
    border: 1px solid --alpha(var(--color-border) / 50%) !important;
    background: var(--color-background) !important;
    box-shadow: var(--shadow-xl);
    border-radius: var(--radius-lg) !important;

    .apexcharts-tooltip-title {
      padding: 8px 12px !important;
      background: var(--color-popover) !important;
      border-bottom: 1px solid --alpha(var(--color-border) / 50%) !important;
      font-weight: var(--font-weight-semibold);
    }
  }

  :deep(.apexcharts-xaxistooltip),
  :deep(.apexcharts-yaxistooltip) {
    background: var(--color-popover) !important;
    border: 1px solid var(--color-border) !important;
    box-shadow: var(--shadow-xl);
    color: var(--color-popover-foreground) !important;
    border-radius: var(--radius-md);
  }
  :deep(.apexcharts-yaxistooltip-left:before) {
    border-left-color: var(--color-border) !important;
  }
  :deep(.apexcharts-yaxistooltip-left:after) {
    border-left-color: var(--color-popover) !important;
  }
  :deep(.apexcharts-xaxistooltip-bottom:after) {
    border-bottom-color: var(--color-popover) !important;
  }
  :deep(.apexcharts-xaxistooltip-bottom:before) {
    border-bottom-color: var(--color-border) !important;
  }

  :deep(.apexcharts-toolbar) {
    gap: 10px;
    align-items: center;
    max-width: fit-content;

    > [class*="icon"] {
      width: auto;
      height: auto;
      transform: scale(1);
      margin: auto;
      transition: all 0.2s ease-in-out;
      color: var(--color-muted-foreground);
      &:hover {
        color: var(--color-blue-400);
      }

      &.apexcharts-selected {
        color: var(--color-blue-500);
      }

      svg {
        fill: var(--color-muted-foreground);
        width: 16px;
        height: 16px;
        transform: scale(1);
      }
    }

    .apexcharts-menu {
      background: var(--color-popover);
      border: 1px solid --alpha(var(--color-border) / 50%);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      width: auto;
      min-width: 110px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .apexcharts-menu-item {
        color: var(--color-popover-foreground);
        border-radius: var(--radius-sm);
        cursor: pointer;
        padding: 4px;
        font-size: 12px;
        font-weight: var(--font-weight-normal);
        &:hover {
          background: var(--color-muted);
        }
      }
    }
  }
</style>
