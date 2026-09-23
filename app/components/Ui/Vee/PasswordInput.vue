<template>
  <div class="w-full">
    <UiLabel
      v-if="label"
      :for="inputId"
      :hint="labelHint"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
    >
    <div class="relative">
      <slot name="icon">
        <span v-if="icon" class="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon :name="icon" class="text-muted-foreground/70 size-4" />
        </span>
      </slot>
      <UiInput
        :id="inputId"
        v-model="value"
        :type="isVisible ? 'text' : 'password'"
        :required="required"
        :name="name"
        :disabled="disabled"
        :aria-invalid="ariaInvalid"
        :aria-describedby="hasStrengthInfo ? strengthId : undefined"
        v-bind="$attrs"
        :class="[icon && 'pl-9', showToggle && 'pr-9']"
        :placeholder="placeholder"
        @blur="handleBlur"
      />
      <button
        v-if="showToggle"
        type="button"
        :disabled="disabled"
        :aria-label="isVisible ? 'Hide password' : 'Show password'"
        :aria-pressed="isVisible"
        class="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-ring/30 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent transition-shadow focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        @click="isVisible = !isVisible"
      >
        <slot name="toggle" :visible="isVisible">
          <Icon :name="isVisible ? 'lucide:eye-off' : 'lucide:eye'" class="size-4" />
        </slot>
      </button>
    </div>
    <AnimatePresence multiple as="div" mode="wait">
      <slot name="hint" :error-message="errorMessage" :value>
        <motion.p
          v-if="hint && !errorMessage"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="text-muted-foreground mt-1.5 text-sm"
        >
          {{ hint }}
        </motion.p>
      </slot>
      <slot name="errorMessage" :error-message="errorMessage" :value>
        <motion.p
          v-if="errorMessage"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="text-destructive mt-1.5 text-sm"
        >
          {{ errorMessage }}
        </motion.p>
      </slot>
    </AnimatePresence>

    <div v-if="hasStrengthInfo" :id="strengthId" data-slot="password-strength">
      <div
        v-if="showStrength"
        class="bg-border mt-3 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-label="Password strength"
        :aria-valuenow="score"
        :aria-valuemin="0"
        :aria-valuemax="results.length"
        :aria-valuetext="strengthLabel"
      >
        <div
          :class="['h-full transition-all duration-500 ease-out', strengthColor]"
          :style="{ width: `${ratio * 100}%` }"
        />
      </div>

      <p class="text-foreground mt-3 text-sm font-medium">
        <template v-if="showStrength">{{ strengthLabel }}</template>
        <template v-if="showStrength && showRequirements">. </template>
        <template v-if="showRequirements">Must contain:</template>
      </p>

      <ul v-if="showRequirements" class="mt-2 space-y-1.5" aria-label="Password requirements">
        <li v-for="req in results" :key="req.text" class="flex items-center gap-2">
          <Icon
            :name="req.met ? 'lucide:check' : 'lucide:x'"
            size="16"
            :class="req.met ? 'text-emerald-500' : 'text-muted-foreground/80'"
            aria-hidden="true"
          />
          <span :class="['text-xs', req.met ? 'text-emerald-600' : 'text-muted-foreground']">
            {{ req.text }}
            <span class="sr-only">{{
              req.met ? " - Requirement met" : " - Requirement not met"
            }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { motion } from "motion-v";

  export type PasswordRequirementKey = "length" | "lowercase" | "uppercase" | "number" | "special";

  export interface PasswordRequirement {
    /** Text displayed in the requirements list. */
    text: string;
    /** A regex or a function that returns `true` when the password satisfies the requirement. */
    test: RegExp | ((value: string) => boolean);
  }
</script>

<script lang="ts" setup>
  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  const props = withDefaults(
    defineProps<{
      label?: string;
      labelHint?: string;
      icon?: string;
      hint?: string;
      disabled?: boolean;
      modelValue?: string;
      name?: string;
      id?: string;
      rules?: any;
      validateOnMount?: boolean;
      placeholder?: string;
      required?: boolean;
      /** Show the show/hide password toggle button. */
      showToggle?: boolean;
      /** Show the strength bar and label below the input. */
      showStrength?: boolean;
      /** Show the list of requirements below the input. */
      showRequirements?: boolean;
      /**
       * The criteria to check. Mix built-in keys (`length`, `lowercase`, `uppercase`, `number`,
       * `special`) with custom `{ text, test }` objects. Defaults to all built-in keys.
       */
      requirements?: (PasswordRequirementKey | PasswordRequirement)[];
      /** Minimum length used by the built-in `length` requirement. */
      minLength?: number;
    }>(),
    {
      showToggle: true,
      requirements: () => ["length", "special", "number", "lowercase", "uppercase"],
      minLength: 8,
    }
  );

  defineOptions({ inheritAttrs: false });

  const inputId = props.id || useId();
  const strengthId = `${inputId}-strength`;
  const isVisible = ref(false);

  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });

  const builtIn = computed<Record<PasswordRequirementKey, PasswordRequirement>>(() => ({
    length: {
      text: `At least ${props.minLength} characters`,
      test: (v) => v.length >= props.minLength,
    },
    special: { text: "At least 1 special character", test: /[^A-Za-z0-9]/ },
    number: { text: "At least 1 number", test: /[0-9]/ },
    lowercase: { text: "At least 1 lowercase letter", test: /[a-z]/ },
    uppercase: { text: "At least 1 uppercase letter", test: /[A-Z]/ },
  }));

  const criteria = computed(() =>
    props.requirements.map((r) => (typeof r === "string" ? builtIn.value[r] : r)).filter(Boolean)
  );

  const results = computed(() => {
    const password = value.value ?? "";
    return criteria.value.map((req) => {
      let met: boolean;
      if (typeof req.test === "function") {
        met = req.test(password);
      } else {
        req.test.lastIndex = 0; // guard against global/sticky regexes
        met = req.test.test(password);
      }
      return { text: req.text, met };
    });
  });

  const score = computed(() => results.value.filter((r) => r.met).length);
  const ratio = computed(() => (results.value.length ? score.value / results.value.length : 0));

  const strengthColor = computed(() => {
    if (ratio.value === 0) return "bg-border";
    if (ratio.value <= 0.2) return "bg-red-500";
    if (ratio.value <= 0.6) return "bg-orange-500";
    if (ratio.value < 1) return "bg-amber-500";
    return "bg-emerald-500";
  });

  const strengthLabel = computed(() => {
    if (ratio.value === 0) return "Enter a password";
    if (ratio.value <= 0.6) return "Weak password";
    if (ratio.value < 1) return "Medium password";
    return "Strong password";
  });

  const hasStrengthInfo = computed(
    () => (props.showStrength || props.showRequirements) && results.value.length > 0
  );

  const ariaInvalid = computed(() => (errorMessage.value ? true : undefined));
</script>
