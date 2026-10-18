<template>
  <!--
    Sprint board summary with burndown chart
    Features: Sprint header with days remaining, points done and remaining, a burndown chart drawn in SVG with an ideal line and an actual line, a text alternative table and status counts
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
          <p class="text-muted-foreground mt-1 text-sm">
            Day {{ day }} of {{ days }} · {{ days - day }} days left
          </p>
        </div>
        <UiBadge variant="soft" :color="onTrack ? 'green' : 'amber'" shape="pill">{{
          onTrack ? "On track" : "Behind plan"
        }}</UiBadge>
      </div>

      <dl class="mt-6 grid grid-cols-3 gap-3 text-center">
        <div class="rounded-xl border p-3">
          <dt class="text-muted-foreground text-xs">Total</dt>
          <dd class="text-2xl font-bold tabular-nums">{{ total }}</dd>
        </div>
        <div class="rounded-xl border p-3">
          <dt class="text-muted-foreground text-xs">Done</dt>
          <dd class="text-2xl font-bold text-green-600 tabular-nums dark:text-green-400">
            {{ total - remaining }}
          </dd>
        </div>
        <div class="rounded-xl border p-3">
          <dt class="text-muted-foreground text-xs">Remaining</dt>
          <dd class="text-2xl font-bold tabular-nums">{{ remaining }}</dd>
        </div>
      </dl>

      <figure class="mt-6 rounded-xl border p-4">
        <figcaption class="mb-2 flex items-center justify-between text-sm font-medium">
          Burndown
          <span class="text-muted-foreground flex items-center gap-3 text-xs font-normal">
            <span class="flex items-center gap-1.5"
              ><span class="inline-block h-0.5 w-4 bg-slate-400" />Ideal</span
            >
            <span class="flex items-center gap-1.5"
              ><span class="bg-primary inline-block h-0.5 w-4" />Actual</span
            >
          </span>
        </figcaption>
        <svg
          viewBox="0 0 400 180"
          class="h-auto w-full"
          role="img"
          :aria-label="`Burndown chart. ${remaining} of ${total} points remain on day ${day} of ${days}.`"
        >
          <g class="text-muted-foreground" fill="currentColor" font-size="10">
            <template v-for="tick in ticks" :key="tick">
              <line
                :x1="pad"
                :x2="400 - pad"
                :y1="y(tick)"
                :y2="y(tick)"
                stroke="currentColor"
                stroke-opacity="0.15"
              />
              <text :x="pad - 6" :y="y(tick) + 3" text-anchor="end">{{ tick }}</text>
            </template>
            <text
              v-for="d in [0, Math.round(days / 2), days]"
              :key="d"
              :x="x(d)"
              y="172"
              text-anchor="middle"
            >
              D{{ d }}
            </text>
          </g>
          <polyline
            :points="idealPoints"
            fill="none"
            stroke="#94a3b8"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
          <polyline
            :points="actualPoints"
            fill="none"
            stroke="var(--primary)"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <circle :cx="x(day)" :cy="y(actual[day] ?? remaining)" r="4" fill="var(--primary)" />
        </svg>
        <table class="sr-only">
          <caption>
            Remaining points per day
          </caption>
          <thead>
            <tr>
              <th>Day</th>
              <th>Ideal</th>
              <th>Actual</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in actual" :key="index">
              <td>{{ index }}</td>
              <td>{{ ideal(index) }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </figure>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      days?: number;
      total?: number;
      /** Remaining points at the end of each day, starting with day 0. */
      actual?: number[];
    }>(),
    {
      title: "Sprint 24 burndown",
      days: 10,
      total: 40,
      actual: () => [40, 38, 35, 35, 30, 27, 22],
    }
  );

  const pad = 30;
  const day = computed(() => props.actual.length - 1);
  const remaining = computed(() => props.actual[props.actual.length - 1] ?? props.total);
  const ideal = (d: number) => Math.round(props.total - (props.total / props.days) * d);
  const onTrack = computed(() => remaining.value <= ideal(day.value) + 1);

  const ticks = computed(() => [0, Math.round(props.total / 2), props.total]);
  const x = (d: number) => pad + (d / props.days) * (400 - pad * 2);
  const y = (value: number) => 150 - (value / props.total) * 130;

  const idealPoints = computed(() =>
    Array.from({ length: props.days + 1 }, (_, d) => `${x(d)},${y(ideal(d))}`).join(" ")
  );
  const actualPoints = computed(() =>
    props.actual.map((value, d) => `${x(d)},${y(value)}`).join(" ")
  );
</script>
