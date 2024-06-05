---
title: Apex Charts
description: On this page you will find different ways in which you can use charts from Apex charts in your project.
---

## Note

In order to see the full(Desktop) view, please click on the `External View` button ( :icon{name="lucide:square-arrow-out-up-right"} ) at the top of the style.

## Apex Charts

All the charts here are created with the help of apex charts for vue 3. The Documentation can be found here [Apex Charts Vue](https://apexcharts.com/docs/vue-charts/#).

```bash
npm install --save apexcharts
npm install --save vue-apexcharts
```

Then create a plugin called `apex.client.ts` in the `plugins` directory.

```ts
import VueApexCharts from "vue3-apexcharts";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts);
});
```

## Bar Chart

:BlockShowcase{blockPath="Chart/BlockChartBar.client" component="BlockChartBar" }

## Bubble

:BlockShowcase{blockPath="Chart/BlockChartBubble.client" component="BlockChartBubble" }

## Donut

:BlockShowcase{blockPath="Chart/BlockChartDonut.client" component="BlockChartDonut" }

## Line

:BlockShowcase{blockPath="Chart/BlockChartLine.client" component="BlockChartLine" }

## Pie

:BlockShowcase{blockPath="Chart/BlockChartPie.client" component="BlockChartPie" }

## Radar

:BlockShowcase{blockPath="Chart/BlockChartRadar.client" component="BlockChartRadar" }

## Radial Bar

:BlockShowcase{blockPath="Chart/BlockChartRadialBar.client" component="BlockChartRadialBar" }
