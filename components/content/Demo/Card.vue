<template>
  <div>
    <Heading title="Card" subtext="Displays a card with header, content, and footer." />

    <form>
      <UICard
        class="max-w-sm"
        title="Create project"
        description="Deploy your new project in one-click."
      >
        <template #content>
          <UICardContent>
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <UILabel for="name">Name</UILabel>
                <UIInput required id="name" placeholder="Name of your project" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <UILabel for="framework">Framework</UILabel>
                <UISelect required>
                  <UISelectTrigger id="framework" placeholder="Select" />
                  <UISelectContent>
                    <UISelectItem value="next">Next.js</UISelectItem>
                    <UISelectItem value="sveltekit">SvelteKit</UISelectItem>
                    <UISelectItem value="astro">Astro</UISelectItem>
                    <UISelectItem value="nuxt">Nuxt.js</UISelectItem>
                  </UISelectContent>
                </UISelect>
              </div>
            </div>
          </UICardContent>
        </template>
        <template #footer>
          <UICardFooter class="flex justify-between">
            <UIButton type="reset" variant="outline">Cancel</UIButton>
            <UIButton type="submit">Deploy</UIButton>
          </UICardFooter>
        </template>
      </UICard>
    </form>
  </div>
</template>

<script lang="ts" setup></script>
