<template>
  <div class="flex flex-col items-center gap-10">
    <UiPagination v-model:page="page1" :total :items-per-page class="mx-auto w-full max-w-md">
      <UiPaginationList class="justify-between">
        <UiPaginationPrev as-child>
          <UiButton variant="outline" size="icon-sm">
            <span class="sr-only">Previous</span>
            <Icon name="lucide:chevron-left" class="size-4" />
          </UiButton>
        </UiPaginationPrev>
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page1 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
        <UiPaginationNext as-child>
          <UiButton variant="outline" size="icon-sm">
            <span class="sr-only">Next</span>
            <Icon name="lucide:chevron-right" class="size-4" />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
    <UiPagination v-model:page="page2" :total :items-per-page>
      <UiPaginationList class="justify-between gap-5">
        <UiPaginationPrev as-child>
          <UiButton variant="ghost" size="icon-sm">
            <span class="sr-only">Previous</span>
            <Icon name="lucide:chevron-left" class="size-4" />
          </UiButton>
        </UiPaginationPrev>
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page2 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
        <UiPaginationNext as-child>
          <UiButton variant="ghost" size="icon-sm">
            <span class="sr-only">Next</span>
            <Icon name="lucide:chevron-right" class="size-4" />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(1);
  const page2 = ref(1);
  const total = 100;
  const itemsPerPage = 10;
</script>
