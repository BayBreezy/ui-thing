<template>
  <!--
    Retrospective board
    Features: Went well, to improve and action items columns, add a note to any column, vote on notes with a limited number of votes, notes sorted by votes and action items you can tick off
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-1 text-sm" aria-live="polite">
          You have {{ votesLeft }} {{ votesLeft === 1 ? "vote" : "votes" }} left.
        </p>
      </div>
      <UiButton variant="outline" size="sm" :disabled="votesLeft === maxVotes" @click="resetVotes"
        >Reset my votes</UiButton
      >
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <section
        v-for="column in columns"
        :key="column.id"
        class="rounded-xl border p-3"
        :class="column.tone"
        :aria-label="column.title"
      >
        <h2 class="mb-3 flex items-center gap-2 px-1 text-sm font-semibold">
          <Icon :name="column.icon" class="size-4" />{{ column.title }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="note in sorted(column)"
            :key="note.id"
            class="bg-card flex items-start gap-2 rounded-lg border p-3 text-sm shadow-xs"
          >
            <UiCheckbox
              v-if="column.id === 'actions'"
              :id="`retro-${note.id}`"
              v-model="note.done"
              class="mt-0.5"
              :aria-label="`Mark done: ${note.text}`"
            />
            <p class="flex-1" :class="note.done ? 'text-muted-foreground line-through' : ''">
              {{ note.text }}
            </p>
            <button
              type="button"
              class="hover:bg-muted focus-visible:ring-ring/50 flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs outline-none focus-visible:ring-[3px]"
              :class="note.mine ? 'border-primary bg-primary/10' : ''"
              :aria-pressed="note.mine"
              :aria-label="`${note.mine ? 'Remove your vote from' : 'Vote for'} ${note.text}`"
              @click="vote(note)"
            >
              <Icon name="lucide:thumbs-up" class="size-3.5" />{{ note.votes }}
            </button>
          </li>
        </ul>
        <form class="mt-3" @submit.prevent="add(column)">
          <UiLabel :for="`retro-new-${column.id}`" class="sr-only"
            >Add a note to {{ column.title }}</UiLabel
          >
          <UiInput
            :id="`retro-new-${column.id}`"
            v-model="drafts[column.id]"
            placeholder="Add a note"
            autocomplete="off"
          />
        </form>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Note = { id: string; text: string; votes: number; mine: boolean; done?: boolean };
  type Column = { id: string; title: string; icon: string; tone: string; notes: Note[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      maxVotes?: number;
      initial?: Column[];
    }>(),
    {
      title: "Sprint 24 retrospective",
      maxVotes: 3,
      initial: () => [
        {
          id: "good",
          title: "Went well",
          icon: "lucide:smile",
          tone: "bg-green-500/5 border-green-500/30",
          notes: [
            { id: "n1", text: "Pairing on the checklist sped things up", votes: 4, mine: false },
            { id: "n2", text: "Demos kept everyone aligned", votes: 2, mine: false },
          ],
        },
        {
          id: "bad",
          title: "To improve",
          icon: "lucide:frown",
          tone: "bg-amber-500/5 border-amber-500/30",
          notes: [
            { id: "n3", text: "Too many surprise requests mid sprint", votes: 5, mine: false },
            { id: "n4", text: "Staging was flaky for two days", votes: 1, mine: false },
          ],
        },
        {
          id: "actions",
          title: "Action items",
          icon: "lucide:list-checks",
          tone: "bg-blue-500/5 border-blue-500/30",
          notes: [
            {
              id: "n5",
              text: "Agree a request intake process",
              votes: 0,
              mine: false,
              done: false,
            },
            { id: "n6", text: "Add a staging health check", votes: 0, mine: false, done: true },
          ],
        },
      ],
    }
  );

  const columns = ref<Column[]>(
    props.initial.map((column) => ({ ...column, notes: column.notes.map((note) => ({ ...note })) }))
  );
  const drafts = reactive<Record<string, string>>({});
  let counter = 100;

  const used = computed(
    () => columns.value.flatMap((column) => column.notes).filter((note) => note.mine).length
  );
  const votesLeft = computed(() => props.maxVotes - used.value);

  const sorted = (column: Column) => [...column.notes].sort((a, b) => b.votes - a.votes);

  function vote(note: Note) {
    if (note.mine) {
      note.mine = false;
      note.votes--;
    } else if (votesLeft.value > 0) {
      note.mine = true;
      note.votes++;
    } else {
      useSonner.info("You are out of votes. Remove one to vote again.");
    }
  }

  function resetVotes() {
    columns.value
      .flatMap((column) => column.notes)
      .forEach((note) => {
        if (note.mine) {
          note.mine = false;
          note.votes--;
        }
      });
  }

  function add(column: Column) {
    const text = drafts[column.id]?.trim();
    if (!text) return;
    column.notes.push({
      id: `n${counter++}`,
      text,
      votes: 0,
      mine: false,
      done: column.id === "actions" ? false : undefined,
    });
    drafts[column.id] = "";
  }
</script>
