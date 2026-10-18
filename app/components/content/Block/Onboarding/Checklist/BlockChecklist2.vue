<template>
  <!--
    Setup progress ring with a task list
    Features: Large circular progress with a percentage, task list with status icons, the current task highlighted, mark complete buttons and a reset link
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto grid max-w-3xl items-center gap-10 md:grid-cols-[auto_1fr]">
      <div class="flex flex-col items-center text-center">
        <UiCircularProgress
          :current-step="done"
          :total-steps="tasks.length"
          size="xl"
          :radius="52"
          :stroke-width="8"
          show-value
          aria-label="Setup progress"
        />
        <p class="mt-6 text-lg font-semibold">
          {{ done === tasks.length ? "All set!" : "Almost there" }}
        </p>
        <p class="text-muted-foreground text-sm" aria-live="polite">
          {{ done }} of {{ tasks.length }} steps done
        </p>
        <UiButton variant="link" size="sm" class="mt-2" @click="reset">Reset</UiButton>
      </div>

      <ol class="space-y-3">
        <li
          v-for="(task, index) in tasks"
          :key="task.title"
          class="flex items-center gap-4 rounded-xl border p-4 transition"
          :class="index === currentIndex ? 'border-primary bg-primary/5' : ''"
          :aria-current="index === currentIndex ? 'step' : undefined"
        >
          <span
            class="grid size-8 shrink-0 place-items-center rounded-full"
            :class="task.done ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'"
          >
            <Icon :name="task.done ? 'lucide:check' : task.icon" class="size-4" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-medium" :class="task.done ? 'text-muted-foreground line-through' : ''">
              {{ task.title }}
            </p>
            <p class="text-muted-foreground text-sm">{{ task.hint }}</p>
          </div>
          <UiButton
            v-if="!task.done"
            size="sm"
            :variant="index === currentIndex ? 'default' : 'outline'"
            :aria-label="`Mark done: ${task.title}`"
            @click="task.done = true"
          >
            Mark done
          </UiButton>
        </li>
      </ol>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = { title: string; hint: string; icon: string; done: boolean };

  const props = withDefaults(
    defineProps<{
      items?: Task[];
    }>(),
    {
      items: () => [
        {
          title: "Verify your email",
          hint: "Confirms it is really you.",
          icon: "lucide:mail-check",
          done: true,
        },
        {
          title: "Add a payment method",
          hint: "Only needed when you upgrade.",
          icon: "lucide:credit-card",
          done: false,
        },
        {
          title: "Set up two factor",
          hint: "Keep your account safe.",
          icon: "lucide:shield-check",
          done: false,
        },
        {
          title: "Customize your theme",
          hint: "Pick colors that fit your brand.",
          icon: "lucide:palette",
          done: false,
        },
      ],
    }
  );

  const tasks = ref<Task[]>(props.items.map((item) => ({ ...item })));

  const done = computed(() => tasks.value.filter((task) => task.done).length);
  const currentIndex = computed(() => tasks.value.findIndex((task) => !task.done));

  function reset() {
    tasks.value = props.items.map((item) => ({ ...item }));
  }
</script>
