<template>
  <!--
    Appointment details form
    Features: Name, email, phone and notes fields with inline validation, a reminder choice, terms checkbox, a booking summary card beside the form and a success state after you submit
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_18rem]">
      <section v-if="!done">
        <h1 class="text-2xl font-bold tracking-tight">Your details</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          We use these to send your confirmation and any changes.
        </p>
        <form class="mt-6 space-y-5" novalidate @submit.prevent="submit">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <UiLabel for="booking-name">Full name</UiLabel>
              <UiInput
                id="booking-name"
                v-model="form.name"
                autocomplete="name"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'booking-name-error' : undefined"
              />
              <p v-if="errors.name" id="booking-name-error" class="text-destructive text-sm">
                {{ errors.name }}
              </p>
            </div>
            <div class="space-y-2">
              <UiLabel for="booking-phone">Phone (optional)</UiLabel>
              <UiInput id="booking-phone" v-model="form.phone" type="tel" autocomplete="tel" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="booking-email">Email</UiLabel>
            <UiInput
              id="booking-email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'booking-email-error' : undefined"
            />
            <p v-if="errors.email" id="booking-email-error" class="text-destructive text-sm">
              {{ errors.email }}
            </p>
          </div>
          <div class="space-y-2">
            <UiLabel for="booking-notes">Anything we should know?</UiLabel>
            <UiTextarea
              id="booking-notes"
              v-model="form.notes"
              :rows="4"
              placeholder="Allergies, access needs or questions"
            />
          </div>
          <div class="space-y-2">
            <UiLabel for="booking-reminder">Reminder</UiLabel>
            <UiSelect v-model="form.reminder">
              <UiSelectTrigger id="booking-reminder"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="none">No reminder</UiSelectItem>
                <UiSelectItem value="1d">One day before</UiSelectItem>
                <UiSelectItem value="2h">Two hours before</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div>
            <div class="flex items-start gap-2">
              <UiCheckbox id="booking-terms" v-model="form.terms" class="mt-0.5" />
              <UiLabel for="booking-terms" class="font-normal">
                I agree to the cancellation policy. Changes are free up to 24 hours before.
              </UiLabel>
            </div>
            <p v-if="errors.terms" class="text-destructive mt-1.5 text-sm">{{ errors.terms }}</p>
          </div>
          <UiButton type="submit" class="w-full sm:w-auto" :disabled="sending">
            <Icon v-if="sending" name="lucide:loader-circle" class="size-4 animate-spin" />
            {{ sending ? "Booking" : "Confirm booking" }}
          </UiButton>
        </form>
      </section>
      <section v-else class="rounded-xl border p-8 text-center" role="status">
        <span
          class="mx-auto grid size-12 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
          ><Icon name="lucide:check" class="size-6"
        /></span>
        <h1 class="mt-4 text-2xl font-bold tracking-tight">You are booked, {{ firstName }}</h1>
        <p class="text-muted-foreground mt-2 text-sm">
          A confirmation is on its way to {{ form.email }}.
        </p>
        <UiButton variant="outline" class="mt-6" @click="reset">Book another</UiButton>
      </section>

      <aside>
        <UiCard class="gap-4">
          <UiCardHeader><UiCardTitle class="text-base">Summary</UiCardTitle></UiCardHeader>
          <UiCardContent class="space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <Icon name="lucide:scissors" class="text-muted-foreground mt-0.5 size-4" />
              <div>
                <p class="font-medium">{{ summary.service }}</p>
                <p class="text-muted-foreground">{{ summary.minutes }} min, {{ summary.price }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:calendar" class="text-muted-foreground mt-0.5 size-4" />
              <div>
                <p class="font-medium">{{ summary.date }}</p>
                <p class="text-muted-foreground">{{ summary.time }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:user" class="text-muted-foreground mt-0.5 size-4" />
              <p class="font-medium">{{ summary.staff }}</p>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:map-pin" class="text-muted-foreground mt-0.5 size-4" />
              <p class="text-muted-foreground">{{ summary.place }}</p>
            </div>
          </UiCardContent>
        </UiCard>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Summary = {
    service: string;
    minutes: number;
    price: string;
    date: string;
    time: string;
    staff: string;
    place: string;
  };

  withDefaults(
    defineProps<{
      summary?: Summary;
    }>(),
    {
      summary: () => ({
        service: "Haircut and style",
        minutes: 45,
        price: "$55",
        date: "Monday, October 19",
        time: "10:30 AM to 11:15 AM",
        staff: "Maya Patel",
        place: "21 Linden Street, Brooklyn",
      }),
    }
  );

  const form = reactive({
    name: "",
    email: "",
    phone: "",
    notes: "",
    reminder: "1d",
    terms: false as boolean | "indeterminate",
  });
  const errors = reactive({ name: "", email: "", terms: "" });
  const sending = ref(false);
  const done = ref(false);

  const firstName = computed(() => form.name.trim().split(" ")[0] || "friend");

  function validate() {
    errors.name = form.name.trim() ? "" : "Enter your name.";
    errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? "" : "Enter a valid email address.";
    errors.terms = form.terms === true ? "" : "Please accept the policy to continue.";
    return !errors.name && !errors.email && !errors.terms;
  }

  function submit() {
    if (!validate()) return;
    sending.value = true;
    setTimeout(() => {
      sending.value = false;
      done.value = true;
    }, 700);
  }

  function reset() {
    Object.assign(form, {
      name: "",
      email: "",
      phone: "",
      notes: "",
      reminder: "1d",
      terms: false,
    });
    done.value = false;
  }
</script>
