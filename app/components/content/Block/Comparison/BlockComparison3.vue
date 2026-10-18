<template>
  <!--
    Us versus them comparison
    Features: Two columns that compare your product with an alternative, rows with checks, crosses and notes, a switch to hide the rows where both do the same, a score for each side and a call to action
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight lg:text-4xl">Acme vs Other Tool</h1>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl">
          An honest look at how they compare. We list the places where the other tool is better too.
        </p>
      </div>

      <div class="mt-6 flex items-center justify-center gap-2">
        <UiSwitch id="hide-ties" v-model="hideTies" />
        <UiLabel for="hide-ties" class="text-sm font-normal">Hide features both tools have</UiLabel>
      </div>

      <div class="mt-6 overflow-hidden rounded-xl border">
        <div
          class="bg-muted/50 grid grid-cols-[1fr_6rem_6rem] items-center gap-2 border-b px-4 py-3 text-sm font-semibold sm:grid-cols-[1fr_9rem_9rem]"
        >
          <span class="sr-only">Feature</span><span aria-hidden="true" />
          <span class="text-center">Acme</span>
          <span class="text-muted-foreground text-center">Other Tool</span>
        </div>
        <ul class="divide-y" aria-live="polite">
          <li
            v-for="row in visible"
            :key="row.name"
            class="grid grid-cols-[1fr_6rem_6rem] items-center gap-2 px-4 py-3 text-sm sm:grid-cols-[1fr_9rem_9rem]"
          >
            <div>
              <p class="font-medium">{{ row.name }}</p>
              <p v-if="row.note" class="text-muted-foreground text-xs">{{ row.note }}</p>
            </div>
            <span class="text-center">
              <Icon
                :name="row.us ? 'lucide:circle-check' : 'lucide:circle-x'"
                class="mx-auto size-5"
                :class="row.us ? 'text-green-500' : 'text-red-400'"
              />
              <span class="sr-only">{{ row.us ? "Yes" : "No" }}</span>
            </span>
            <span class="text-center">
              <Icon
                :name="row.them ? 'lucide:circle-check' : 'lucide:circle-x'"
                class="mx-auto size-5"
                :class="row.them ? 'text-green-500' : 'text-red-400'"
              />
              <span class="sr-only">{{ row.them ? "Yes" : "No" }}</span>
            </span>
          </li>
          <li v-if="!visible.length" class="text-muted-foreground px-4 py-8 text-center text-sm">
            No differences to show.
          </li>
        </ul>
        <div
          class="bg-muted/30 grid grid-cols-[1fr_6rem_6rem] gap-2 border-t px-4 py-3 text-sm font-semibold sm:grid-cols-[1fr_9rem_9rem]"
        >
          <span>Features in this list</span>
          <span class="text-center tabular-nums">{{ score("us") }} of {{ rows.length }}</span>
          <span class="text-muted-foreground text-center tabular-nums"
            >{{ score("them") }} of {{ rows.length }}</span
          >
        </div>
      </div>

      <div class="mt-8 text-center">
        <UiButton size="lg" @click="useSonner.success('Starting your free trial')"
          >Try Acme free for 14 days</UiButton
        >
        <p class="text-muted-foreground mt-2 text-xs">No credit card needed.</p>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Row = { name: string; us: boolean; them: boolean; note?: string };

  const props = withDefaults(
    defineProps<{
      rows?: Row[];
    }>(),
    {
      rows: () => [
        {
          name: "Unlimited projects",
          us: true,
          them: false,
          note: "Other Tool caps free accounts at 3.",
        },
        { name: "Real time collaboration", us: true, them: true },
        { name: "Two factor authentication", us: true, them: true },
        { name: "Import from CSV and JSON", us: true, them: false },
        { name: "Public API and webhooks", us: true, them: true },
        { name: "Offline mode", us: false, them: true, note: "On our roadmap for next quarter." },
        { name: "Single sign on on every paid plan", us: true, them: false },
        { name: "Native mobile apps", us: false, them: true },
      ],
    }
  );

  const hideTies = ref(false);
  const visible = computed(() =>
    hideTies.value ? props.rows.filter((row) => row.us !== row.them) : props.rows
  );
  const score = (side: "us" | "them") => props.rows.filter((row) => row[side]).length;
</script>
