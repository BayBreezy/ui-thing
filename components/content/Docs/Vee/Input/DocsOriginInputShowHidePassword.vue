<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Show/hide password input"
      :type="isVisible ? 'text' : 'password'"
      placeholder="••••••••"
    >
      <template #trailingIcon>
        <UiTooltip disable-closing-trigger>
          <UiTooltipTrigger as-child>
            <button
              type="button"
              aria-label="Login password"
              class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              @click="toggleVisibility"
            >
              <Icon :name="isVisible ? 'lucide:eye-off' : 'lucide:eye'" class="size-4" />
            </button>
          </UiTooltipTrigger>
          <UiTooltipContent align="center">
            {{ isVisible ? "Hide" : "Show" }} password
          </UiTooltipContent>
        </UiTooltip>
      </template>
    </UiVeeInput>
  </div>
</template>

<script lang="ts" setup>
  const isVisible = ref(false);
  const toggleVisibility = () => (isVisible.value = !isVisible.value);
</script>
