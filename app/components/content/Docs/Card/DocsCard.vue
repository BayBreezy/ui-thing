<template>
  <div class="flex items-center justify-center">
    <form>
      <UiCard
        class="w-[360px] max-w-sm"
        title="Create project"
        description="Deploy your new project in one-click."
      >
        <template #content>
          <UiCardContent>
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <UiLabel for="name">Name</UiLabel>
                <UiInput id="name" required placeholder="Name of your project" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <UiLabel for="framework">Framework</UiLabel>
                <UiSelect required>
                  <UiSelectTrigger id="framework" placeholder="Select" />
                  <UiSelectContent>
                    <UiSelectItem value="next">Next.js</UiSelectItem>
                    <UiSelectItem value="sveltekit">SvelteKit</UiSelectItem>
                    <UiSelectItem value="astro">Astro</UiSelectItem>
                    <UiSelectItem value="nuxt">Nuxt.js</UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
            </div>
          </UiCardContent>
        </template>
        <template #footer>
          <UiCardFooter class="flex justify-between">
            <UiButton type="reset" variant="outline">Cancel</UiButton>
            <UiButton type="submit">Deploy</UiButton>
          </UiCardFooter>
        </template>
      </UiCard>
    </form>
  </div>
</template>
