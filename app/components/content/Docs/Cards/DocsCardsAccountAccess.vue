<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Account Access</UiCardTitle>
      <UiCardDescription>Update your credentials or re-authenticate.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <UiFieldGroup>
        <UiField>
          <UiFieldLabel for="email-address">Email Address</UiFieldLabel>
          <UiInput id="email-address" type="email" placeholder="artist@studio.inc" />
        </UiField>
        <UiField>
          <div class="flex items-center justify-between">
            <UiFieldLabel for="current-password">Current Password</UiFieldLabel>
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground text-xs font-medium tracking-wider uppercase"
            >
              Forgot?
            </a>
          </div>
          <UiInput id="current-password" type="password" placeholder="••••••••••••••••••••••••" />
        </UiField>
      </UiFieldGroup>
    </UiCardContent>
    <UiCardFooter class="flex-col gap-4">
      <UiButton class="w-full">
        <Icon name="lucide:lock" />
        Update Security
      </UiButton>
      <UiItem variant="muted" as-child>
        <a href="#">
          <UiItemMedia variant="icon">
            <Icon name="lucide:circle-alert" class="text-destructive" />
          </UiItemMedia>
          <UiItemContent>
            <UiItemTitle>Danger Zone</UiItemTitle>
            <UiItemDescription class="line-clamp-1">
              Archive account and remove catalog
            </UiItemDescription>
          </UiItemContent>
          <Icon name="lucide:chevron-right" class="size-4" />
        </a>
      </UiItem>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup></script>
