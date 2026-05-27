<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>CPU Usage</UiCardTitle>
        <UiCardDescription>Current processor load</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Usage is within
          <span
            class="font-semibold"
            :class="[
              getStateRangeText === 'high'
                ? 'text-red-500'
                : getStateRangeText === 'elevated'
                  ? 'text-yellow-500'
                  : 'text-emerald-500',
            ]"
            >{{ getStateRangeText }}</span
          >range <Icon name="lucide:cpu" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Monitor for spikes during intensive tasks
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([68]);

  const getColor = () => {
    const value = series.value?.[0];
    if (typeof value === "number") {
      if (value > 80) return "var(--color-red-500)";
      if (value > 50) return "var(--color-yellow-500)";
    }
    return "var(--color-emerald-500)";
  };

  const getStateRangeText = computed(() => {
    const value = series.value?.[0];
    if (typeof value === "number") {
      if (value > 80) return "high";
      if (value > 50) return "elevated";
    }
    return "normal";
  });

  const options = computed<ApexOptions>(() => {
    const color = getColor();
    return {
      labels: ["CPU"],
      colors: [color],
      plotOptions: {
        radialBar: {
          min: 0,
          max: 100,
          shape: "needle",
          bands: [
            { from: 0, to: 50, color: "var(--color-emerald-500)", label: "Normal" },
            { from: 50, to: 80, color: "var(--color-yellow-500)", label: "Elevated" },
            { from: 80, to: 100, color: "var(--color-red-500)", label: "High" },
          ],
          bandsStyle: { strokeWidth: "40%", gap: 2, hideTrackWhenPresent: true, linecap: "round" },
          needle: {
            showValueArc: true,
            color: "var(--color-foreground)",
            length: "70%",
            baseWidth: 8,
            tipWidth: 1,
            animation: { enabled: true, duration: 800, easing: "ease-out" },
          },
          track: { background: "var(--color-muted)", strokeWidth: "100%", margin: 5 },
          dataLabels: {
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--color-muted-foreground)",
              offsetY: 65,
            },
            value: {
              fontSize: "40px",
              fontWeight: "bold",
              color,
              offsetY: 30,
            },
          },
          hollow: { size: "60%" },
        },
      },
      states: { hover: { filter: { type: "none" } } },
    };
  });

  let interval: ReturnType<typeof setInterval>;

  onMounted(() => {
    interval = setInterval(() => {
      series.value = [Math.floor(Math.random() * 101)];
    }, 5000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });
</script>
