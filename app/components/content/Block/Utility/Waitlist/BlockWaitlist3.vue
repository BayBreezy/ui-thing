<template>
  <!--
    Early access email capture
    Features: Split card with pitch, name and email fields, interest chips with multiple selection, role select, consent checkbox, validation and success state
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto max-w-4xl gap-0 overflow-hidden py-0 md:grid md:grid-cols-2">
      <div class="bg-muted/50 flex flex-col justify-between gap-8 p-8">
        <div>
          <UiBadge variant="soft" color="primary" shape="pill">Early access</UiBadge>
          <h2 class="mt-4 text-3xl font-bold tracking-tight">{{ title }}</h2>
          <p class="text-muted-foreground mt-3">{{ description }}</p>
        </div>
        <ul class="space-y-3">
          <li v-for="perk in perks" :key="perk.title" class="flex gap-3">
            <Icon :name="perk.icon" class="text-primary mt-0.5 size-5 shrink-0" />
            <span class="text-sm"
              ><span class="font-medium">{{ perk.title }}</span
              ><span class="text-muted-foreground"> {{ perk.text }}</span></span
            >
          </li>
        </ul>
      </div>

      <div class="p-8">
        <div v-if="done" class="grid h-full place-content-center gap-3 text-center" role="status">
          <span
            class="mx-auto grid size-12 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
            ><Icon name="lucide:check" class="size-6"
          /></span>
          <p class="text-xl font-semibold">Thanks, {{ firstName }}</p>
          <p class="text-muted-foreground text-sm">
            We saved {{ chosen.size }} {{ chosen.size === 1 ? "interest" : "interests" }} and will
            email {{ form.email.trim() }} when your invite is ready.
          </p>
          <UiButton variant="outline" size="sm" class="mx-auto" @click="reset">Start over</UiButton>
        </div>

        <form v-else class="grid gap-4" novalidate @submit.prevent="submit">
          <div class="grid gap-2">
            <UiLabel for="early-name">Name</UiLabel>
            <UiInput
              id="early-name"
              v-model="form.name"
              autocomplete="name"
              placeholder="Jordan Lee"
              :aria-invalid="!!errors.name"
            />
            <p v-if="errors.name" class="text-destructive text-sm">{{ errors.name }}</p>
          </div>
          <div class="grid gap-2">
            <UiLabel for="early-email">Work email</UiLabel>
            <UiInput
              id="early-email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="jordan@company.com"
              :aria-invalid="!!errors.email"
            />
            <p v-if="errors.email" class="text-destructive text-sm">{{ errors.email }}</p>
          </div>
          <div class="grid gap-2">
            <UiLabel for="early-role">Your role</UiLabel>
            <UiSelect v-model="form.role">
              <UiSelectTrigger id="early-role" class="w-full"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="role in roles" :key="role" :value="role">{{
                  role
                }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <fieldset class="grid gap-2">
            <legend class="text-sm leading-none font-medium">What interests you?</legend>
            <div class="mt-1 flex flex-wrap gap-2">
              <UiButton
                v-for="item in interests"
                :key="item"
                type="button"
                size="xs"
                class="rounded-full"
                :variant="chosen.has(item) ? 'default' : 'outline'"
                :aria-pressed="chosen.has(item)"
                @click="toggle(item)"
              >
                {{ item }}
              </UiButton>
            </div>
          </fieldset>
          <div class="grid gap-2">
            <div class="flex items-start gap-2">
              <UiCheckbox id="early-consent" v-model="form.consent" class="mt-0.5" />
              <UiLabel for="early-consent" class="leading-snug font-normal"
                >Email me about the launch and occasional product news.</UiLabel
              >
            </div>
            <p v-if="errors.consent" class="text-destructive text-sm">{{ errors.consent }}</p>
          </div>
          <UiButton type="submit" size="lg">Request early access</UiButton>
        </form>
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Perk = { icon: string; title: string; text: string };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      perks?: Perk[];
      roles?: string[];
      interests?: string[];
    }>(),
    {
      title: "Get in before everyone else",
      description: "We are inviting small groups every week. Tell us a little about you.",
      perks: () => [
        {
          icon: "lucide:key-round",
          title: "Priority invite.",
          text: "Skip ahead of the public list.",
        },
        {
          icon: "lucide:badge-percent",
          title: "Founding price.",
          text: "Lock in 40% off for life.",
        },
        {
          icon: "lucide:messages-square",
          title: "Direct line.",
          text: "Shape the roadmap with us.",
        },
      ],
      roles: () => ["Founder", "Product manager", "Engineer", "Designer", "Other"],
      interests: () => ["Planning", "Reporting", "Automation", "Integrations", "Mobile app"],
    }
  );

  const form = reactive({
    name: "",
    email: "",
    role: "Founder",
    consent: false as boolean | "indeterminate",
  });
  const errors = reactive({ name: "", email: "", consent: "" });
  const chosen = ref(new Set<string>());
  const done = ref(false);

  const firstName = computed(() => form.name.trim().split(/\s+/)[0] || "friend");

  function toggle(item: string) {
    const next = new Set(chosen.value);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    chosen.value = next;
  }

  function submit() {
    errors.name = form.name.trim() ? "" : "Enter your name.";
    errors.email = /^\S+@\S+\.\S+$/.test(form.email.trim()) ? "" : "Enter a valid email address.";
    errors.consent = form.consent === true ? "" : "Please accept to continue.";
    if (errors.name || errors.email || errors.consent) return;
    done.value = true;
  }

  function reset() {
    Object.assign(form, { name: "", email: "", role: "Founder", consent: false });
    chosen.value = new Set();
    done.value = false;
  }
</script>
