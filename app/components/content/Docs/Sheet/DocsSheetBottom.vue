<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Bottom Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent side="bottom" title="Filters" description="Refine your search results">
        <template #content>
          <div class="space-y-4">
            <UiGradientDivider class="-mt-3" />
            <div class="space-y-3 px-4">
              <UiLabel for="categories"> Choose Categories </UiLabel>
              <UiToggleGroup id="categories" type="multiple" class="justify-start">
                <UiToggleGroupItem size="sm" value="all" variant="outline">All</UiToggleGroupItem>
                <UiToggleGroupItem size="sm" value="books" variant="outline"
                  >Books</UiToggleGroupItem
                >
                <UiToggleGroupItem size="sm" value="electronics" variant="outline"
                  >Electronics</UiToggleGroupItem
                >
                <UiToggleGroupItem size="sm" value="clothing" variant="outline"
                  >Clothing</UiToggleGroupItem
                >
              </UiToggleGroup>
            </div>
            <UiGradientDivider />
            <div class="max-w-md space-y-5 px-4">
              <UiLabel for="price">Price Range</UiLabel>
              <UiVeeVueFormSlider id="price" />
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter class="sm:flex-row">
            <UiSheetClose as-child>
              <UiButton variant="outline">Reset</UiButton>
            </UiSheetClose>
            <UiSheetClose as-child>
              <UiButton>Apply Filters</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
