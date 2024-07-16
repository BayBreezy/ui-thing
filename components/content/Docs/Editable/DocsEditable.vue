<template>
  <div>
    <div class="w-full">
      <h1 class="text-lg font-semibold">Application</h1>
      <p class="mt-px text-sm text-muted-foreground">
        Below is the information submitted. Click on the values to edit them.
      </p>

      <dl class="mt-7">
        <template v-for="d in details" :key="d.key">
          <div
            class="grid grid-cols-1 gap-y-2 border-b px-2 py-6 text-sm first:border-t md:grid-cols-2 md:px-0"
          >
            <dt class="font-medium">{{ d.key }}</dt>

            <UiEditable v-slot="{ isEditing }" v-model="d.value">
              <UiEditableArea>
                <UiEditablePreview as="dd" class="h-8 cursor-pointer text-muted-foreground">
                  <span class="flex size-full items-center">
                    {{ d.value }}
                  </span>
                </UiEditablePreview>
                <div class="flex items-center gap-2">
                  <div class="shrink-0 grow">
                    <UiEditableInput as-child>
                      <UiInput class="h-8 px-2" />
                    </UiEditableInput>
                  </div>
                  <div v-if="isEditing" class="flex items-center gap-1">
                    <UiEditableSubmit as-child>
                      <UiButton class="size-8" size="icon-sm">
                        <Icon name="lucide:check" class="size-4" />
                      </UiButton>
                    </UiEditableSubmit>
                    <UiEditableCancel as-child>
                      <UiButton variant="outline" class="size-8" size="icon-sm">
                        <Icon name="lucide:x" class="size-4" />
                      </UiButton>
                    </UiEditableCancel>
                  </div>
                </div>
              </UiEditableArea>
            </UiEditable>
          </div>
        </template>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const details = ref([
    { key: "Full name", value: "John Doe" },
    { key: "Email", value: "janedoe@testmail.com" },
    { key: "Phone", value: "123-456-7890" },
    { key: "Address", value: "1234 Elm St" },
    { key: "City", value: "Springfield" },
    { key: "State", value: "IL" },
    { key: "Zip", value: "62701" },
  ]);
</script>
