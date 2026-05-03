<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Pie Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="pie" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 4 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 2, colors: ["var(--color-background)"] },
    fill: {
      type: "image",
      opacity: 1,
      image: {
        src: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=50&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=50&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=50&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=50&w=500&auto=format&fit=crop",
        ],
      },
    },
    colors: [
      "var(--color-violet-500)",
      "var(--color-amber-500)",
      "var(--color-blue-500)",
      "var(--color-sky-500)",
    ],
    chart: {
      toolbar: { show: true },
      events: {
        dataPointSelection(e, chart, opts) {
          const images = opts.w.config.fill.image.src;
          const selectedImage = images[opts.dataPointIndex];
          useSonner.info("Open Image", {
            description: "Would you like to view the selected image?",
            icon: h(resolveComponent("Icon"), {
              name: "lucide:image",
              class: "size-4 text-muted-foreground",
            }),
            action: {
              label: "Yes, Open",
              onClick: () => {
                window.open(selectedImage, "_blank");
              },
            },
          });
        },
      },
    },
    labels: ["January", "February", "March", "April"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
