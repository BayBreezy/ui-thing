<template>
  <div class="flex flex-col items-center gap-10">
    <UiPagination :total="2" :items-per-page="1" class="mx-auto w-full max-w-md">
      <UiPaginationList class="justify-between">
        <UiPaginationPrev as-child>
          <UiButton variant="outline">
            <span class="sr-only">Previous</span>
            <Icon name="lucide:chevron-left" class="size-4" />
            Previous
          </UiButton>
        </UiPaginationPrev>
        <UiPaginationNext as-child>
          <UiButton variant="outline">
            <span class="sr-only">Next</span>
            Next
            <Icon name="lucide:chevron-right" class="size-4" />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
    <UiPagination :total="2" :items-per-page="1" class="mx-auto w-full max-w-md">
      <UiPaginationList class="justify-between">
        <UiPaginationPrev as-child>
          <UiButton class="group" variant="ghost">
            <span class="sr-only">Previous</span>
            <Icon
              name="lucide:arrow-left"
              class="size-4 transition-transform group-hover:-translate-x-0.5"
            />
            Previous
          </UiButton>
        </UiPaginationPrev>
        <UiPaginationNext as-child>
          <UiButton class="group" variant="ghost">
            <span class="sr-only">Next</span>
            Next
            <Icon
              name="lucide:arrow-right"
              class="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
  </div>
</template>
