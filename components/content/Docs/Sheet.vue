<template>
  <div>
    <Heading
      title="Sheet"
      subtext="Extends the Dialog component to display content that complements the main content of the screen."
      radix-link="https://www.radix-vue.com/components/dialog.html"
    />

    <UISheet v-model="dialog">
      <UISheetTrigger as-child>
        <UIButton variant="outline">Open Sheet</UIButton>
      </UISheetTrigger>

      <UISheetContent
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="name" class="text-right"> Name </UILabel>
              <UIInput id="name" value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="username" class="text-right"> Username </UILabel>
              <UIInput id="username" value="@peduarte" class="col-span-3" />
            </div>
          </div>
        </template>
        <template #footer>
          <UISheetFooter>
            <UIButton @click="dialog = false" variant="outline" type="button" class="mt-2 sm:mt-0"
              >Cancel</UIButton
            >
            <UIButton @click="dialog = false" type="submit">Save</UIButton>
          </UISheetFooter>
        </template>
      </UISheetContent>
    </UISheet>
  </div>
</template>

<script lang="ts" setup>
  const dialog = ref(false);
</script>
