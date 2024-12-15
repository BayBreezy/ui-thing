<template>
  <div>
    <UiCard class="rounded-none border-t-4 border-t-primary">
      <UiCardContent>
        <div
          class="inline-flex h-14 w-14 items-center justify-center rounded-md border bg-background shadow-sm"
        >
          <Icon name="lucide:mail" class="h-6 w-6" />
        </div>

        <h3 class="mb-2 mt-8 text-2xl font-semibold">Weekly newsletter</h3>
        <p class="mb-8 text-muted-foreground">
          No spam. Just the latest releases and tips, interesting articles, and exclusive interviews
          in your inbox every week.
        </p>
        <form>
          <div class="w-full">
            <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
          </div>
          <p class="my-4 text-sm text-muted-foreground">
            Read about our privacy policy <a href="#" class="text-primary">here</a>.
          </p>
          <div>
            <UiButton size="lg" class="w-full whitespace-nowrap" type="submit">Subscribe</UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup></script>
