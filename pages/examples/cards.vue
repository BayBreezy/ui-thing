<template>
  <div class="container py-5">
    <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <div
        class="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3"
      >
        <div class="col-span-2 grid items-start gap-6 lg:col-span-1">
          <UICard
            class="w-full"
            title="Create an account"
            description="Enter your email below to create your account"
          >
            <template #content>
              <UICardContent class="grid gap-4">
                <div class="flex items-center gap-4">
                  <UIButton variant="outline" class="w-full"
                    ><Icon class="h-4 w-4" name="lucide:github" /> Github</UIButton
                  >
                  <UIButton variant="outline" class="w-full"
                    ><Icon class="h-4 w-4" name="mdi:google" /> Google</UIButton
                  >
                </div>
                <div class="relative grid grid-cols-3 items-center">
                  <UISeparator />
                  <p class="w-full">or continue with</p>
                  <UISeparator />
                </div>
              </UICardContent>
            </template>
          </UICard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "examples",
  });
</script>
