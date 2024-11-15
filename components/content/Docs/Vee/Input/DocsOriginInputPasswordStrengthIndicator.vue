<template>
  <div class="flex flex-col">
    <UiVeeInput
      v-model="password"
      label="Input with password strength indicator"
      class="peer pe-9"
      placeholder="Password"
      :type="isVisible ? 'text' : 'password'"
      :aria-invalid="strengthScore < 4"
      aria-describedby="password-strength"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Subscribe"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          @click="toggleVisibility"
        >
          <Icon :name="isVisible ? 'lucide:eye-off' : 'lucide:eye'" class="size-4" />
        </button>
      </template>
    </UiVeeInput>

    <div
      class="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
      role="progressbar"
      :aria-valuenow="strengthScore"
      :aria-valuemin="0"
      :aria-valuemax="4"
      aria-label="Password strength"
    >
      <div
        :class="[`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`]"
        :style="{ width: `${(strengthScore / 4) * 100}%` }"
      />
    </div>

    <p id="password-strength" class="mb-2 text-sm font-medium text-foreground">
      {{ getStrengthText(strengthScore) }}. Must contain:
    </p>

    <ul class="space-y-1.5" aria-label="Password requirements">
      <li v-for="(req, index) in strength" :key="index" class="flex items-center gap-2">
        <Icon
          v-if="req.met"
          name="lucide:check"
          size="16"
          class="text-emerald-500"
          aria-hidden="true"
        />
        <Icon
          v-else
          name="lucide:x"
          size="16"
          class="text-muted-foreground/80"
          aria-hidden="true"
        />
        <span :class="[`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`]">
          {{ req.text }}
          <span class="sr-only">
            {{ req.met ? " - Requirement met" : " - Requirement not met" }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  const password = ref("");
  const isVisible = ref(false);
  const toggleVisibility = () => (isVisible.value = !isVisible.value);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = computed(() => checkStrength(password.value));
  const strengthScore = computed(() => strength.value.filter((req) => req.met).length);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };
</script>
