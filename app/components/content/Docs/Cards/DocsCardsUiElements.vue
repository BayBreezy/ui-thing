<template>
  <UiCard class="w-full">
    <UiCardContent class="flex flex-col gap-6">
      <div class="grid grid-cols-3 gap-2">
        <UiButton>
          Button
          <Icon name="lucide:arrow-right" />
        </UiButton>
        <UiButton variant="secondary"> Secondary </UiButton>
        <UiButton variant="outline"> Outline </UiButton>
      </div>
      <UiFieldGroup>
        <UiVeeInput placeholder="Name" trailing-icon="lucide:search" />
        <UiField class="flex-1">
          <UiTextarea placeholder="Message" class="resize-none" />
        </UiField>
      </UiFieldGroup>
      <div class="flex items-center gap-2">
        <div class="flex gap-2">
          <UiBadge>Badge</UiBadge>
          <UiBadge variant="secondary"> Secondary </UiBadge>
          <UiBadge variant="outline" class="hidden min-[2200px]:flex"> Outline </UiBadge>
        </div>
        <UiRadioGroup
          default-value="apple"
          class="ml-auto flex w-fit gap-3"
          aria-label="Fruit preference"
          orientation="horizontal"
        >
          <UiRadioGroupItem value="apple" aria-label="Apple" />
          <UiRadioGroupItem value="banana" aria-label="Banana" />
        </UiRadioGroup>
        <div class="flex gap-3">
          <UiCheckbox :default-value="true" aria-label="Enable email alerts" />
          <UiCheckbox class="hidden min-[2200px]:flex" aria-label="Enable push alerts" />
        </div>
        <UiSwitch
          :default-value="true"
          class="flex min-[2200px]:hidden"
          aria-label="Enable compact notifications"
        />
      </div>
      <div class="flex items-center gap-4">
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="outline">Alert Dialog</UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Allow accessory to connect?</UiAlertDialogTitle>
              <UiAlertDialogDescription>
                Do you want to allow the USB accessory to connect to this device and your data?
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Don't allow</UiAlertDialogCancel>
              <UiAlertDialogAction>Allow</UiAlertDialogAction>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
        <UiButtonGroup class="ml-auto">
          <UiButton variant="outline">Button Group</UiButton>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline" size="icon" aria-label="Open quick actions">
                <Icon name="lucide:chevron-up" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" side="top" class="w-40">
              <UiDropdownMenuGroup>
                <UiDropdownMenuLabel>Quick Actions</UiDropdownMenuLabel>
                <UiDropdownMenuItem>Mute Conversation</UiDropdownMenuItem>
                <UiDropdownMenuItem>Mark as Read</UiDropdownMenuItem>
                <UiDropdownMenuItem>Block User</UiDropdownMenuItem>
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem variant="destructive">Delete Conversation</UiDropdownMenuItem>
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </UiButtonGroup>
        <UiSwitch
          default-value
          class="hidden min-[2200px]:flex"
          aria-label="Enable advanced setting"
        />
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup></script>
