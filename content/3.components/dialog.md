---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/dialog.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/dialog.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Dialog"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add dialog
```

## Usage

### Profile Dialog

::ShowCase

:DocsDialog

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialog.vue" code lang="vue" -->

```vue [DocsDialog.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDialog v-model:open="dialog">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Edit Profile</UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        class="sm:max-w-[425px]"
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <UiLabel for="name" class="text-right"> Name </UiLabel>
              <UiInput id="name" model-value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <UiLabel for="username" class="text-right"> Username </UiLabel>
              <UiInput id="username" model-value="@peduarte" class="col-span-3" />
            </div>
          </div>
        </template>
        <template #footer>
          <UiDialogFooter>
            <UiButton
              variant="outline"
              type="button"
              class="mt-2 sm:mt-0"
              @click="closeDialog(false)"
              >Cancel</UiButton
            >
            <UiButton type="submit" @click="closeDialog(true)">Save</UiButton>
          </UiDialogFooter>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const dialog = ref(false);

  const closeDialog = (save: boolean) => {
    useToast().toast({
      title: save ? "Profile updated" : "Changes discarded",
      description: `Your changes has been ${save ? "saved" : "discarded"}.`,
      duration: 5000,
      icon: save ? "lucide:check" : "lucide:x",
    });
    dialog.value = false;
  };
</script>
```

<!-- /automd -->

::

### Custom Close Button

::ShowCase

:DocsDialogCustomClose

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogCustomClose.vue" code lang="vue" -->

```vue [DocsDialogCustomClose.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Share</UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        class="sm:max-w-md"
        title="Share link"
        description="Anyone who has this link will be able to view this."
      >
        <template #content>
          <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
              <UiLabel for="link" class="sr-only"> Link </UiLabel>
              <UiInput id="link" model-value="https://ui.shadcn.com/docs/installation" read-only />
            </div>
            <UiButton type="submit" size="icon" class="px-3" @click="copyValue">
              <span class="sr-only">Copy</span>
              <Icon name="lucide:copy" class="h-4 w-4" />
            </UiButton>
          </div>
        </template>
        <template #footer>
          <UiDialogFooter class="sm:justify-start">
            <UiDialogClose as-child>
              <UiButton variant="secondary">Close</UiButton>
            </UiDialogClose>
          </UiDialogFooter>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const copyValue = () => {
    const { isSupported, copy } = useClipboard({ legacy: true });
    if (isSupported.value) {
      copy("https://ui.shadcn.com/docs/installation");
      useToast().toast({
        title: "Copied",
        description: `The link has been copied to your clipboard.`,
        duration: 5000,
        icon: "lucide:thumbs-up",
      });
      return;
    } else {
      useToast().toast({
        title: "Not supported",
        description: `Your browser does not support copying to clipboard.`,
        duration: 5000,
        icon: "lucide:thumbs-down",
      });
      return;
    }
  };
</script>
```

<!-- /automd -->

::

## Origin UI Dialogs

Here are some of the dialog examples from the [Origin UI](https://originui.com) documentation.

Hats off to the Origin UI team ❤️.

I just made them work with my setup.

### Scrollable (native scrollbar)

::ShowCase

:DocsDialogScrollNative

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogScrollNative.vue" code lang="vue" -->

```vue [DocsDialogScrollNative.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Scrollable (native scrollbar)" />
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden"
      >
        <div class="overflow-y-auto">
          <UiDialogHeader class="contents space-y-0 text-left">
            <UiDialogTitle class="px-6 pt-6">Frequently Asked Questions (FAQ)</UiDialogTitle>
            <UiDialogDescription>
              <div class="p-6">
                <div class="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div class="space-y-1">
                    <p>
                      <strong>Account Management</strong>
                    </p>
                    <p>
                      Navigate to the registration page, provide required information, and verify
                      your email address. You can sign up using your email or through social media
                      platforms.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Password Reset Process</strong>
                    </p>
                    <p>
                      Users can reset their password through the account settings page. Click
                      &quot;Forgot Password&quot; and follow the email verification steps to regain
                      account access quickly and securely.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Service Pricing Tiers</strong>
                    </p>
                    <p>
                      We offer three primary subscription levels designed to meet diverse user
                      needs: Basic (free with limited features), Professional (monthly fee with
                      comprehensive access), and Enterprise (custom pricing with full platform
                      capabilities).
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Technical Support Channels</strong>
                    </p>
                    <p>
                      Customer support is accessible through multiple communication methods
                      including email support, live chat during business hours, an integrated
                      support ticket system, and phone support specifically for enterprise-level
                      customers.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Data Protection Strategies</strong>
                    </p>
                    <p>
                      Our platform implements rigorous security measures including 256-bit SSL
                      encryption, regular comprehensive security audits, strict data access
                      controls, and compliance with international privacy protection standards.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Platform Compatibility</strong>
                    </p>
                    <p>
                      The service supports multiple device and operating system environments,
                      including web browsers like Chrome and Firefox, mobile applications for iOS
                      and Android, and desktop applications compatible with Windows and macOS.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Subscription Management</strong>
                    </p>
                    <p>
                      Subscriptions can be cancelled at any time through account settings, with
                      pro-rated refunds available within 30 days of payment. Both monthly and annual
                      billing options are provided, with special discounts offered for annual
                      commitments.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Payment Method Options</strong>
                    </p>
                    <p>
                      We accept a wide range of payment methods including major credit cards such as
                      Visa, MasterCard, and American Express, digital payment platforms like PayPal,
                      and direct bank transfers. Regional payment options may also be available
                      depending on user location.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Customer Support</strong>
                    </p>
                    <p>
                      Our dedicated customer support team is available 24/7, providing quick and
                      efficient assistance to address any inquiries or issues you may have.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Privacy Policy</strong>
                    </p>
                    <p>
                      Our privacy policy outlines how we collect, use, and protect your personal
                      data, ensuring your privacy is protected at all times.
                    </p>
                  </div>
                </div>
              </div>
            </UiDialogDescription>
          </UiDialogHeader>
          <UiDialogFooter class="px-6 pb-6 sm:justify-start">
            <UiDialogClose as-child>
              <UiButton type="button" variant="outline" text="Cancel" />
            </UiDialogClose>
            <UiDialogClose as-child>
              <UiButton type="button" text="Okay" />
            </UiDialogClose>
          </UiDialogFooter>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Scrollable (custom scrollbar)

::ShowCase

:DocsDialogScrollCustom

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogScrollCustom.vue" code lang="vue" -->

```vue [DocsDialogScrollCustom.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Scrollable (custom scrollbar)" />
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden"
      >
        <UiScrollArea class="flex max-h-full flex-col">
          <UiDialogHeader class="contents space-y-0 text-left">
            <UiDialogTitle class="px-6 pt-6">Frequently Asked Questions (FAQ)</UiDialogTitle>
            <UiDialogDescription>
              <div class="p-6">
                <div class="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div class="space-y-1">
                    <p>
                      <strong>Account Management</strong>
                    </p>
                    <p>
                      Navigate to the registration page, provide required information, and verify
                      your email address. You can sign up using your email or through social media
                      platforms.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Password Reset Process</strong>
                    </p>
                    <p>
                      Users can reset their password through the account settings page. Click
                      &quot;Forgot Password&quot; and follow the email verification steps to regain
                      account access quickly and securely.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Service Pricing Tiers</strong>
                    </p>
                    <p>
                      We offer three primary subscription levels designed to meet diverse user
                      needs: Basic (free with limited features), Professional (monthly fee with
                      comprehensive access), and Enterprise (custom pricing with full platform
                      capabilities).
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Technical Support Channels</strong>
                    </p>
                    <p>
                      Customer support is accessible through multiple communication methods
                      including email support, live chat during business hours, an integrated
                      support ticket system, and phone support specifically for enterprise-level
                      customers.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Data Protection Strategies</strong>
                    </p>
                    <p>
                      Our platform implements rigorous security measures including 256-bit SSL
                      encryption, regular comprehensive security audits, strict data access
                      controls, and compliance with international privacy protection standards.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Platform Compatibility</strong>
                    </p>
                    <p>
                      The service supports multiple device and operating system environments,
                      including web browsers like Chrome and Firefox, mobile applications for iOS
                      and Android, and desktop applications compatible with Windows and macOS.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Subscription Management</strong>
                    </p>
                    <p>
                      Subscriptions can be cancelled at any time through account settings, with
                      pro-rated refunds available within 30 days of payment. Both monthly and annual
                      billing options are provided, with special discounts offered for annual
                      commitments.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Payment Method Options</strong>
                    </p>
                    <p>
                      We accept a wide range of payment methods including major credit cards such as
                      Visa, MasterCard, and American Express, digital payment platforms like PayPal,
                      and direct bank transfers. Regional payment options may also be available
                      depending on user location.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Customer Support</strong>
                    </p>
                    <p>
                      Our dedicated customer support team is available 24/7, providing quick and
                      efficient assistance to address any inquiries or issues you may have.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Privacy Policy</strong>
                    </p>
                    <p>
                      Our privacy policy outlines how we collect, use, and protect your personal
                      data, ensuring your privacy is protected at all times.
                    </p>
                  </div>
                </div>
              </div>
            </UiDialogDescription>
          </UiDialogHeader>
          <UiDialogFooter class="px-6 pb-6 sm:justify-start">
            <UiDialogClose as-child>
              <UiButton type="button" variant="outline"> Cancel </UiButton>
            </UiDialogClose>
            <UiDialogClose as-child>
              <UiButton type="button">Okay</UiButton>
            </UiDialogClose>
          </UiDialogFooter>
        </UiScrollArea>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Scrollable (sticky header)

::ShowCase

:DocsDialogScrollStickyHeader

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogScrollStickyHeader.vue" code lang="vue" -->

```vue [DocsDialogScrollStickyHeader.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Scrollable (sticky header)" />
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle
            class="border-b border-border px-6 py-4 text-base"
            title="Frequently Asked Questions (FAQ)"
          />
          <div class="overflow-y-auto">
            <UiDialogDescription>
              <div class="px-6 py-4">
                <div class="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div class="space-y-1">
                    <p>
                      <strong>Account Management</strong>
                    </p>
                    <p>
                      Navigate to the registration page, provide required information, and verify
                      your email address. You can sign up using your email or through social media
                      platforms.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Password Reset Process</strong>
                    </p>
                    <p>
                      Users can reset their password through the account settings page. Click
                      &quot;Forgot Password&quot; and follow the email verification steps to regain
                      account access quickly and securely.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Service Pricing Tiers</strong>
                    </p>
                    <p>
                      We offer three primary subscription levels designed to meet diverse user
                      needs: Basic (free with limited features), Professional (monthly fee with
                      comprehensive access), and Enterprise (custom pricing with full platform
                      capabilities).
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Technical Support Channels</strong>
                    </p>
                    <p>
                      Customer support is accessible through multiple communication methods
                      including email support, live chat during business hours, an integrated
                      support ticket system, and phone support specifically for enterprise-level
                      customers.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Data Protection Strategies</strong>
                    </p>
                    <p>
                      Our platform implements rigorous security measures including 256-bit SSL
                      encryption, regular comprehensive security audits, strict data access
                      controls, and compliance with international privacy protection standards.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Platform Compatibility</strong>
                    </p>
                    <p>
                      The service supports multiple device and operating system environments,
                      including web browsers like Chrome and Firefox, mobile applications for iOS
                      and Android, and desktop applications compatible with Windows and macOS.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Subscription Management</strong>
                    </p>
                    <p>
                      Subscriptions can be cancelled at any time through account settings, with
                      pro-rated refunds available within 30 days of payment. Both monthly and annual
                      billing options are provided, with special discounts offered for annual
                      commitments.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Payment Method Options</strong>
                    </p>
                    <p>
                      We accept a wide range of payment methods including major credit cards such as
                      Visa, MasterCard, and American Express, digital payment platforms like PayPal,
                      and direct bank transfers. Regional payment options may also be available
                      depending on user location.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Customer Support</strong>
                    </p>
                    <p>
                      Our dedicated customer support team is available 24/7, providing quick and
                      efficient assistance to address any inquiries or issues you may have.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Privacy Policy</strong>
                    </p>
                    <p>
                      Our privacy policy outlines how we collect, use, and protect your personal
                      data, ensuring your privacy is protected at all times.
                    </p>
                  </div>
                </div>
              </div>
            </UiDialogDescription>
            <UiDialogFooter class="px-6 pb-6 sm:justify-start">
              <UiDialogClose as-child>
                <UiButton type="button" text="Okay" />
              </UiDialogClose>
            </UiDialogFooter>
          </div>
        </UiDialogHeader>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Scrollable (sticky footer)

::ShowCase

:DocsDialogScrollStickyFooter

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogScrollStickyFooter.vue" code lang="vue" -->

```vue [DocsDialogScrollStickyFooter.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Scrollable (sticky footer)" />
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden"
      >
        <div class="overflow-y-auto">
          <UiDialogHeader class="contents space-y-0 text-left">
            <UiDialogTitle class="px-6 pt-6 text-base">
              Frequently Asked Questions (FAQ)
            </UiDialogTitle>
            <UiDialogDescription>
              <div class="p-6">
                <div class="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div class="space-y-1">
                    <p>
                      <strong>Account Management</strong>
                    </p>
                    <p>
                      Navigate to the registration page, provide required information, and verify
                      your email address. You can sign up using your email or through social media
                      platforms.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Password Reset Process</strong>
                    </p>
                    <p>
                      Users can reset their password through the account settings page. Click
                      &quot;Forgot Password&quot; and follow the email verification steps to regain
                      account access quickly and securely.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Service Pricing Tiers</strong>
                    </p>
                    <p>
                      We offer three primary subscription levels designed to meet diverse user
                      needs: Basic (free with limited features), Professional (monthly fee with
                      comprehensive access), and Enterprise (custom pricing with full platform
                      capabilities).
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Technical Support Channels</strong>
                    </p>
                    <p>
                      Customer support is accessible through multiple communication methods
                      including email support, live chat during business hours, an integrated
                      support ticket system, and phone support specifically for enterprise-level
                      customers.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Data Protection Strategies</strong>
                    </p>
                    <p>
                      Our platform implements rigorous security measures including 256-bit SSL
                      encryption, regular comprehensive security audits, strict data access
                      controls, and compliance with international privacy protection standards.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Platform Compatibility</strong>
                    </p>
                    <p>
                      The service supports multiple device and operating system environments,
                      including web browsers like Chrome and Firefox, mobile applications for iOS
                      and Android, and desktop applications compatible with Windows and macOS.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Subscription Management</strong>
                    </p>
                    <p>
                      Subscriptions can be cancelled at any time through account settings, with
                      pro-rated refunds available within 30 days of payment. Both monthly and annual
                      billing options are provided, with special discounts offered for annual
                      commitments.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Payment Method Options</strong>
                    </p>
                    <p>
                      We accept a wide range of payment methods including major credit cards such as
                      Visa, MasterCard, and American Express, digital payment platforms like PayPal,
                      and direct bank transfers. Regional payment options may also be available
                      depending on user location.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Customer Support</strong>
                    </p>
                    <p>
                      Our dedicated customer support team is available 24/7, providing quick and
                      efficient assistance to address any inquiries or issues you may have.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p>
                      <strong>Privacy Policy</strong>
                    </p>
                    <p>
                      Our privacy policy outlines how we collect, use, and protect your personal
                      data, ensuring your privacy is protected at all times.
                    </p>
                  </div>
                </div>
              </div>
            </UiDialogDescription>
          </UiDialogHeader>
        </div>
        <UiDialogFooter class="border-t border-border px-6 py-4">
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline" text="Cancel" />
          </UiDialogClose>
          <UiDialogClose as-child>
            <UiButton type="button" text="Okay" />
          </UiDialogClose>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Terms & Condition

::ShowCase

:DocsDialogTermsCondition

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogTermsCondition.vue" code lang="vue" -->

```vue [DocsDialogTermsCondition.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Terms & Conditions" />
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle
            class="border-b border-border px-6 py-4 text-base"
            title="Terms & Conditions"
          />
          <div ref="contentRef" class="overflow-y-auto">
            <UiDialogDescription>
              <div class="px-6 py-4">
                <div class="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div class="space-y-4">
                    <div class="space-y-1">
                      <p>
                        <strong>Acceptance of Terms</strong>
                      </p>
                      <p>
                        By accessing and using this website, users agree to comply with and be bound
                        by these Terms of Service. Users who do not agree with these terms should
                        discontinue use of the website immediately.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>User Account Responsibilities</strong>
                      </p>
                      <p>
                        Users are responsible for maintaining the confidentiality of their account
                        credentials. Any activities occurring under a user&lsquo;s account are the
                        sole responsibility of the account holder. Users must notify the website
                        administrators immediately of any unauthorized account access.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Content Usage and Restrictions</strong>
                      </p>
                      <p>
                        The website and its original content are protected by intellectual property
                        laws. Users may not reproduce, distribute, modify, create derivative works,
                        or commercially exploit any content without explicit written permission from
                        the website owners.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Limitation of Liability</strong>
                      </p>
                      <p>
                        The website provides content &ldquo;as is&ldquo; without any warranties. The
                        website owners shall not be liable for direct, indirect, incidental,
                        consequential, or punitive damages arising from user interactions with the
                        platform.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>User Conduct Guidelines</strong>
                      </p>
                      <ul class="list-disc pl-6">
                        <li>Not upload harmful or malicious content</li>
                        <li>Respect the rights of other users</li>
                        <li>Avoid activities that could disrupt website functionality</li>
                        <li>Comply with applicable local and international laws</li>
                      </ul>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Modifications to Terms</strong>
                      </p>
                      <p>
                        The website reserves the right to modify these terms at any time. Continued
                        use of the website after changes constitutes acceptance of the new terms.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Termination Clause</strong>
                      </p>
                      <p>
                        The website may terminate or suspend user access without prior notice for
                        violations of these terms or for any other reason deemed appropriate by the
                        administration.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Governing Law</strong>
                      </p>
                      <p>
                        These terms are governed by the laws of the jurisdiction where the website
                        is primarily operated, without regard to conflict of law principles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </UiDialogDescription>
          </div>
        </UiDialogHeader>
        <UiDialogFooter class="border-t border-border px-6 py-4 sm:items-center">
          <TransitionSlide appear>
            <span
              v-if="!arrivedState.bottom"
              class="grow text-xs text-muted-foreground max-sm:text-center"
            >
              Read all terms before accepting.
            </span>
          </TransitionSlide>
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline"> Cancel </UiButton>
          </UiDialogClose>
          <UiDialogClose as-child>
            <UiButton type="button" :disabled="!arrivedState.bottom"> I agree </UiButton>
          </UiDialogClose>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const contentRef = ref<HTMLDivElement | null>(null);
  const { arrivedState } = useScroll(contentRef);
</script>
```

<!-- /automd -->

::

### Newsletter

::ShowCase

:DocsDialogNewsletter

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogNewsletter.vue" code lang="vue" -->

```vue [DocsDialogNewsletter.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Newsletter</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[400px]">
        <div class="mb-2 flex flex-col items-center gap-2">
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              class="stroke-foreground"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" class="fill-background" strokeWidth="8" />
            </svg>
          </div>
          <UiDialogHeader>
            <UiDialogTitle class="sm:text-center">Never miss an update</UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              Subscribe to receive news and special offers.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="space-y-5">
          <div class="space-y-2">
            <UiVeeInput
              icon="lucide:mail"
              placeholder="hi@yourcompany.com"
              type="email"
              aria-label="Email"
            />
          </div>
          <UiButton type="button" class="w-full"> Subscribe </UiButton>
        </form>

        <p class="text-center text-xs text-muted-foreground">
          By subscribing you agree to our
          <a class="underline hover:no-underline" href="#"> Privacy Policy </a>
          .
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Feedback

::ShowCase

:DocsDialogFeedback

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogFeedback.vue" code lang="vue" -->

```vue [DocsDialogFeedback.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Feedback</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[430px]">
        <UiDialogHeader>
          <UiDialogTitle>Send us feedback</UiDialogTitle>
          <UiDialogDescription>
            Watch <a class="text-foreground hover:underline" href="#">tutorials</a>, read Origin
            UI's <a class="text-foreground hover:underline" href="#">documentation</a>, or join our
            <a class="text-foreground hover:underline" href="#"> Discord </a> for community help.
          </UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-5">
          <UiTextarea
            id="feedback"
            placeholder="How can we improve Origin UI?"
            aria-label="Send feedback"
          />
          <div class="flex flex-col sm:flex-row sm:justify-end">
            <UiButton type="button">Send feedback</UiButton>
          </div>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Rating

::ShowCase

:DocsDialogRating

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogRating.vue" code lang="vue" -->

```vue [DocsDialogRating.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Rating</UiButton>
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-w-[400px] [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle class="border-b border-border px-6 py-4 text-base">
            Help us improve
          </UiDialogTitle>
          <UiDialogDescription class="sr-only">
            Rate your experience with UI Thing
          </UiDialogDescription>
        </UiDialogHeader>
        <div class="px-6 py-4">
          <form class="space-y-5">
            <div class="space-y-4">
              <div>
                <fieldset class="space-y-4">
                  <legend class="text-lg font-semibold leading-none text-foreground">
                    How hard was it to set up your account?
                  </legend>
                  <UiRadioGroup
                    orientation="horizontal"
                    class="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
                  >
                    <label
                      v-for="number in 8"
                      :key="number"
                      :for="`radio-17-r${number}`"
                      class="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                    >
                      <RadioGroupItem
                        :id="`radio-17-r${number}`"
                        :value="number.toString()"
                        class="sr-only after:absolute after:inset-0"
                      />
                      {{ number }}
                    </label>
                  </UiRadioGroup>
                </fieldset>
                <div class="mt-2 flex justify-between text-xs text-muted-foreground">
                  <p>Very easy</p>
                  <p>Very difficult</p>
                </div>
              </div>

              <UiVeeTextarea
                id="feedback"
                label="Why did you give this rating?"
                placeholder="How can we improve UI Thing?"
                aria-label="Send feedback"
              />
            </div>
            <UiButton type="button" class="w-full"> Send feedback </UiButton>
          </form>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
```

<!-- /automd -->

::

### OTP Code

::ShowCase

:DocsDialogOtpCode

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogOtpCode.vue" code lang="vue" -->

```vue [DocsDialogOtpCode.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">OTP code</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px]">
        <div class="mb-2 flex flex-col items-center gap-2">
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              class="stroke-foreground"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" class="fill-background" strokeWidth="8" />
            </svg>
          </div>
          <UiDialogHeader class="mt-4">
            <UiDialogTitle class="sm:text-center">
              {{ hasGuessed ? "Code verified!" : "Enter confirmation code" }}
            </UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              {{
                hasGuessed
                  ? "Your code has been successfully verified."
                  : `Check your email and enter the code - Try ${CORRECT_CODE}`
              }}
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <TransitionFade mode="out-in">
          <div v-if="hasGuessed" class="text-center">
            <UiDialogClose as-child>
              <UiButton type="button" @click="close"> Close </UiButton>
            </UiDialogClose>
          </div>
          <div v-else class="space-y-4">
            <div class="flex justify-center">
              <div>
                <UiVeePinInput v-model="value" otp :input-count="4" @complete="checkCode" />
              </div>
            </div>

            <TransitionSlide>
              <p
                v-if="hasGuessed === false"
                class="text-center text-xs text-muted-foreground"
                role="alert"
                aria-live="polite"
              >
                Invalid code. Please try again.
              </p>
            </TransitionSlide>

            <p class="text-center text-sm">
              <a class="underline hover:no-underline" href="#"> Resend code </a>
            </p>
          </div>
        </TransitionFade>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const CORRECT_CODE = "6548";
  const value = ref([]);
  const hasGuessed = ref<boolean | undefined>(undefined);
  const checkCode = (code: string[]) => {
    const enteredCode = code.join("");
    if (enteredCode === CORRECT_CODE) {
      hasGuessed.value = true;
      value.value = [];
    } else {
      hasGuessed.value = false;
    }
  };
  const close = () => {
    hasGuessed.value = undefined;
    value.value = [];
  };
</script>
```

<!-- /automd -->

::

### Sign Up

::ShowCase

:DocsDialogSignUp

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogSignUp.vue" code lang="vue" -->

```vue [DocsDialogSignUp.vue]
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Sign up</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px] gap-4">
        <div class="flex flex-col items-center gap-4">
          <UiFancyIcon circle>
            <Icon name="lucide:user" mode="svg" />
          </UiFancyIcon>
          <UiDialogHeader class="mb-6">
            <UiDialogTitle class="sm:text-center">Sign up UI Thing</UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              We just need a few details to get you started.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-4">
            <UiVeeInput label="Full name" placeholder="John Doe" name="fullName" required />
            <UiVeeInput
              label="Email"
              placeholder="hi@mycompany.com"
              name="email"
              type="email"
              required
            />
            <UiVeeInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              required
            />
            <UiButton type="submit" class="w-full"> Sign up </UiButton>
            <UiDivider label="Or" />
            <UiButton variant="outline" type="button" class="w-full"
              ><Icon name="logos:google-icon" /> Continue with Google</UiButton
            >
          </fieldset>
        </form>
        <p class="text-center text-xs text-muted-foreground">
          By signing up you agree to our <a class="underline hover:no-underline" href="#">Terms</a>.
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-sign-up",
    validationSchema: toTypedSchema(
      z.object({
        fullName: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(50),
      })
    ),
  });

  const open = defineModel<boolean>({ default: false });

  const submit = handleSubmit(async (values) => {
    try {
      useSonner.success("You have successfully signed up", {
        description: `Welcome ${values.fullName}`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred while signing up", {
        description: error.message,
      });
    }
  });
</script>
```

<!-- /automd -->

::

### Sign In

::ShowCase

:DocsDialogSignIn

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogSignIn.vue" code lang="vue" -->

```vue [DocsDialogSignIn.vue]
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Sign in</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px] gap-4">
        <div class="flex flex-col items-center gap-4">
          <UiFancyIcon circle>
            <Icon name="lucide:user" mode="svg" />
          </UiFancyIcon>
          <UiDialogHeader class="mb-6">
            <UiDialogTitle class="sm:text-center">Welcome back</UiDialogTitle>
            <UiDialogDescription class="sm:text-center"
              >Enter your credentials to login to your account.</UiDialogDescription
            >
          </UiDialogHeader>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-4">
            <UiVeeInput
              label="Email"
              placeholder="hi@mycompany.com"
              name="email"
              type="email"
              required
            />
            <UiVeeInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              required
            />
            <div class="flex items-center justify-between py-2">
              <UiVeeCheckbox name="rememberMe" label="Remember me" />
              <NuxtLink class="text-sm underline underline-offset-2" to="#"
                >Forgot password?</NuxtLink
              >
            </div>
            <UiButton type="submit" class="w-full" text="Sign in" />
            <UiDivider label="Or" />
            <UiButton variant="outline" type="button" class="w-full"
              ><Icon name="logos:google-icon" /> Sign in with Google</UiButton
            >
          </fieldset>
        </form>
        <p class="text-center text-xs text-muted-foreground">
          By logging in, you agree to our
          <a class="underline hover:no-underline" href="#">Terms</a>.
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-sign-in",
    validationSchema: toTypedSchema(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50),
        rememberMe: z.boolean().optional().default(true),
      })
    ),
  });

  const open = defineModel<boolean>({ default: false });

  const submit = handleSubmit(async () => {
    try {
      useSonner.success("You have successfully signed in", {
        description: `Welcome back!`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred while signing in", {
        description: error.message,
      });
    }
  });
</script>
```

<!-- /automd -->

::

### Invite Members

::ShowCase

:DocsDialogInviteMembers

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogInviteMembers.vue" code lang="vue" -->

```vue [DocsDialogInviteMembers.vue]
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Invite members" />
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px] gap-4">
        <div class="flex flex-col gap-4">
          <UiFancyIcon circle>
            <Icon name="lucide:user-round-plus" mode="svg" />
          </UiFancyIcon>
          <UiDialogHeader class="*:text-left">
            <UiDialogTitle>Invite team members</UiDialogTitle>
            <UiDialogDescription>Invite teammates to earn free components.</UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form @submit="submit">
          <UiLabel>Invite via email</UiLabel>

          <fieldset :disabled="isSubmitting" class="mt-2 grid grid-cols-1 gap-4">
            <UiScrollArea type="auto" class="max-h-[300px] pr-3">
              <TransitionSlide
                :offset="[0, 16]"
                :move-duration="300"
                group
                class="grid grid-cols-1 p-1"
              >
                <template v-for="(field, idx) in fields" :key="field.key">
                  <div class="flex items-center gap-2 pb-4">
                    <UiVeeInput
                      v-model="field.value as string"
                      placeholder="hi@mycompany.com"
                      type="email"
                      required
                    />
                    <UiButton
                      v-if="fields.length > 1"
                      class="shrink-0"
                      size="icon"
                      variant="ghost"
                      @click="remove(idx)"
                    >
                      <span class="sr-only">Delete this record</span>
                      <Icon class="text-muted-foreground" name="lucide:trash-2" size="16" />
                    </UiButton>
                  </div>
                </template>
              </TransitionSlide>
            </UiScrollArea>
            <div>
              <button
                type="button"
                class="text-sm underline underline-offset-2 hover:no-underline"
                @click="prepend('')"
              >
                <span>+ Add another</span>
              </button>
            </div>
            <UiButton type="submit" class="w-full" text="Send invites" />
          </fieldset>
        </form>
        <UiDivider class="mt-2" />
        <UiVeeInput
          label="Invite via magic link"
          readonly
          model-value="https://ui-thing.com/refer/87689"
        >
          <template #trailingIcon>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center justify-center disabled:opacity-100"
                  :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
                  :disabled="copied"
                  @click="copy('https://ui-thing.com/refer/87689')"
                >
                  <TransitionScale mode="out-in">
                    <Icon
                      v-if="!copied"
                      class="text-muted-foreground/60"
                      name="lucide:copy"
                      size="16"
                      aria-hidden="true"
                    />
                    <Icon
                      v-else
                      name="lucide:check"
                      size="16"
                      aria-hidden="true"
                      class="text-emerald-500"
                    />
                  </TransitionScale>
                </button>
              </UiTooltipTrigger>
              <UiTooltipContent align="center" class="px-2 py-1 text-xs">
                Click to copy
              </UiTooltipContent>
            </UiTooltip>
          </template>
        </UiVeeInput>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { copied, copy } = useClipboard();
  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-invite-members",
    initialValues: {
      members: ["", "mur@ha.pw"],
    },
    validationSchema: toTypedSchema(
      z.object({
        members: z.array(z.string().email()).min(1),
      })
    ),
  });

  const { remove, fields, prepend } = useFieldArray("members");
  const open = defineModel<boolean>({ default: false });
  const submit = handleSubmit(async (v) => {
    try {
      useSonner.success("Invitations Sent", {
        description: `${v.members.length} invitations were successfully sent`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred while sending invitations", {
        description: error.message,
      });
    }
  });
</script>
```

<!-- /automd -->

::

### Card Details

This implementation requires the use of [Maska](https://beholdr.github.io/maska/v3/#/install)

::ShowCase

:DocsDialogCardDetails

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogCardDetails.vue" code lang="vue" -->

```vue [DocsDialogCardDetails.vue]
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Card details</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px]">
        <div class="flex flex-col gap-3">
          <UiFancyIcon circle>
            <Icon name="lucide:wallet" class="size-5 opacity-80" />
          </UiFancyIcon>
          <UiDialogHeader>
            <UiDialogTitle class="text-left">Update your card</UiDialogTitle>
            <UiDialogDescription class="text-left">
              Your new card will replace your current card.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>
        <form class="mt-4 space-y-6" @submit="submit">
          <fieldset :disabled="isSubmitting" class="space-y-6 md:space-y-4">
            <UiVeeInput name="nameOnCard" label="Name on card" required />
            <UiVeeInput
              v-maska="'#### #### #### ####'"
              name="cardNumber"
              trailing-icon="lucide:credit-card"
              label="Card number"
              required
            />
            <div class="flex gap-4">
              <div class="flex-1 space-y-2">
                <UiVeeInput
                  v-maska="'##/##'"
                  name="expiryDate"
                  placeholder="MM/YY"
                  label="Expiry date"
                  required
                />
              </div>
              <div class="flex-1 space-y-2">
                <UiVeeInput v-maska="'###'" name="cvc" label="CVC" required />
              </div>
            </div>
          </fieldset>
          <UiVeeCheckbox
            name="saveCard"
            class="text-muted-foreground"
            label="Save card for future payments"
          />
          <UiButton type="submit" class="w-full"> Update card </UiButton>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-card-details",
    validationSchema: toTypedSchema(
      z.object({
        nameOnCard: z.string().min(2).max(50).default("Elijah Baker"),
        cardNumber: z.string().length(19, "Must be 16 digits").default("4242 4242 4242 4242"),
        expiryDate: z.string().length(5, "Invalid").default(dayjs().format("MM/YY")),
        cvc: z.string().length(3, "Invalid").default("123"),
        saveCard: z.boolean().optional().default(true),
      })
    ),
  });
  const open = defineModel<boolean>({ default: false });
  const submit = handleSubmit(async (values) => {
    try {
      useSonner.success("Card updated successfully", {
        description: `Your card ending with ${values.cardNumber.slice(-4)} has been updated successfully.`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("Unable to update card", {
        description: error.message,
      });
    }
  });
</script>
```

<!-- /automd -->

::

### Checkout

This implementation requires the use of [Maska](https://beholdr.github.io/maska/v3/#/install)

::ShowCase

:DocsDialogCheckout

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogCheckout.vue" code lang="vue" -->

```vue [DocsDialogCheckout.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Checkout</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px]">
        <div class="mb-2 flex flex-col gap-2">
          <UiFancyIcon circle class="mb-2">
            <Icon name="lucide:store" class="size-5 opacity-80" />
          </UiFancyIcon>
          <UiDialogHeader>
            <UiDialogTitle class="text-left">Confirm and pay</UiDialogTitle>
            <UiDialogDescription class="text-left">
              Pay securely and cancel any time.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="space-y-5">
          <div class="space-y-6 md:space-y-4">
            <UiRadioGroup orientation="horizontal" class="grid-cols-2" default-value="yearly">
              <label
                v-for="plan in plans"
                :key="plan.id"
                :for="`radio-${plan.id}`"
                class="relative flex cursor-pointer flex-col gap-1 rounded-lg border border-input p-4 shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent/70 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
              >
                <UiRadioGroupItem
                  :id="`radio-${plan.id}`"
                  :value="plan.id"
                  class="sr-only after:absolute after:inset-0"
                />
                <div class="inline-flex items-start justify-between gap-2">
                  <p class="font-medium text-foreground md:text-sm">{{ plan.name }}</p>
                  <UiBadge v-if="plan.popular">Popular</UiBadge>
                </div>
                <p class="text-sm text-muted-foreground">{{ plan.price }}</p>
              </label>
            </UiRadioGroup>

            <UiVeeInput name="nameOnCard" label="Name on card" required />
            <div class="space-y-2">
              <legend class="text-sm font-medium text-foreground">Card Details</legend>
              <div class="rounded-lg shadow-sm shadow-black/5">
                <div class="relative focus-within:z-10">
                  <UiVeeInput
                    v-maska="'#### #### #### ####'"
                    placeholder="Card number"
                    aria-label="Card number"
                    trailing-icon="lucide:credit-card"
                    name="cardNumber"
                    class="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
                  />
                </div>
                <div class="-mt-px flex">
                  <div class="min-w-0 flex-1 focus-within:z-10">
                    <UiVeeInput
                      v-maska="'##/##'"
                      placeholder="MM/YY"
                      aria-label="Expiry date"
                      name="expiryDate"
                      class="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
                    />
                  </div>
                  <div class="-ms-px min-w-0 flex-1 focus-within:z-10">
                    <UiVeeInput
                      v-maska="'###'"
                      placeholder="CVC"
                      aria-label="CVC"
                      name="cvc"
                      class="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              v-if="!showCouponInput"
              type="button"
              class="text-base underline underline-offset-2 hover:no-underline md:text-sm"
              @click="showCouponInput = true"
            >
              + Add coupon
            </button>

            <div v-else>
              <UiVeeInput name="coupon" label="Coupon code" placeholder="Enter your code" />
            </div>
          </div>
          <UiButton type="button" class="w-full"> Subscribe </UiButton>
        </form>

        <p class="text-center text-xs text-muted-foreground">
          Payments are non-refundable. Cancel anytime.
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const showCouponInput = ref(false);
  const plans = [
    { id: "monthly", name: "Monthly", price: "$32/month", popular: false },
    { id: "yearly", name: "Yearly", price: "$320/month", popular: true },
  ];
</script>
```

<!-- /automd -->

::

### Change Plan

::ShowCase

:DocsDialogChangePlan

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogChangePlan.vue" code lang="vue" -->

```vue [DocsDialogChangePlan.vue]
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Change plan" />
      </UiDialogTrigger>

      <UiDialogContent class="max-w-[400px]">
        <div class="mb-2 flex flex-col gap-2">
          <UiFancyIcon circle class="mb-2">
            <Icon name="lucide:refresh-ccw" class="size-5 opacity-80" />
          </UiFancyIcon>
          <UiDialogHeader>
            <UiDialogTitle class="text-left">Change your plan</UiDialogTitle>
            <UiDialogDescription class="text-left">
              Pick one of the following plans.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="space-y-5">
          <UiRadioGroup class="gap-2" default-value="plan-02">
            <div
              v-for="(plan, index) in plans"
              :key="index"
              class="relative flex w-full items-center gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent md:gap-2"
            >
              <UiRadioGroupItem
                :id="plan.value"
                :value="plan.value"
                :aria-labelledby="`${plan.value}-description`"
                class="order-1 after:absolute after:inset-0"
              />
              <div class="grid grow gap-1">
                <UiLabel class="text-base md:text-base" :for="plan.value">{{ plan.name }}</UiLabel>
                <p :id="`${plan.value}-description`" class="text-muted-foreground md:text-sm">
                  {{ plan.price }}
                </p>
              </div>
            </div>
          </UiRadioGroup>

          <div class="space-y-3">
            <p>
              <strong class="font-medium md:text-sm">Features include:</strong>
            </p>
            <ul class="flex flex-col gap-3 text-muted-foreground md:text-sm">
              <li v-for="f in features" :key="f" class="flex gap-2">
                <Icon
                  name="lucide:circle-check"
                  class="mt-0.5 size-6 shrink-0 text-primary md:size-4"
                  aria-hidden="true"
                />
                {{ f }}
              </li>
            </ul>
          </div>

          <div class="grid gap-2">
            <UiButton type="button" class="w-full"> Change plan </UiButton>
            <UiDialogClose as-child>
              <UiButton type="button" variant="ghost" class="w-full"> Cancel </UiButton>
            </UiDialogClose>
          </div>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const plans = [
    { name: "Essential", price: "$4 per member/month", value: "plan-01" },
    { name: "Standard", price: "$19 per member/month", value: "plan-02" },
    { name: "Enterprise", price: "$32 per member/month", value: "plan-03" },
  ];

  const features = [
    "Create unlimited projects.",
    "Remove watermarks.",
    "Add unlimited users and free viewers.",
    "Upload unlimited files.",
    "7-day money back guarantee.",
    "Advanced permissions.",
  ];

  const open = defineModel<boolean>({ default: false });
</script>
```

<!-- /automd -->

::

### Edit Profile

::ShowCase

:DocsDialogEditProfile

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogEditProfile.vue" code lang="vue" -->

```vue [DocsDialogEditProfile.vue]
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Edit profile</UiButton>
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle class="border-b border-border px-6 py-4 text-base">
            Edit profile
          </UiDialogTitle>
        </UiDialogHeader>
        <UiDialogDescription class="sr-only">
          Make changes to your profile here. You can change your photo and set a username.
        </UiDialogDescription>
        <div class="overflow-y-auto">
          <!-- Profile BG -->
          <div class="h-32">
            <div
              class="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted"
            >
              <img
                v-if="currentImage"
                class="h-full w-full object-cover"
                :src="currentImage"
                alt="Profile banner"
                width="512"
                height="96"
              />
              <div class="absolute inset-0 flex items-center justify-center gap-2">
                <button
                  type="button"
                  class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                  :aria-label="currentImage ? 'Change image' : 'Upload image'"
                  @click="handleBannerClick()"
                >
                  <Icon name="lucide:image-plus" class="size-4" aria-hidden="true" />
                </button>
                <button
                  v-if="currentImage"
                  type="button"
                  class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                  aria-label="Remove image"
                  @click="currentImage = defaultBanner"
                >
                  <Icon name="lucide:x" class="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <!-- Avatar -->
          <div class="-mt-10 px-6">
            <div
              class="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10"
            >
              <img
                v-if="currentAvatarImage"
                :src="currentAvatarImage"
                class="h-full w-full object-cover"
                width="80"
                height="80"
                alt="Profile image"
              />

              <button
                type="button"
                class="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                aria-label="Change profile picture"
                @click="handleAvatarClick()"
              >
                <Icon name="lucide:image-plus" class="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="px-6 pb-6 pt-4">
            <form @submit="submit">
              <fieldset class="space-y-4" :disabled="isSubmitting">
                <div class="flex flex-col gap-4 sm:flex-row">
                  <UiVeeInput label="First name" placeholder="James" required name="firstName" />
                  <UiVeeInput label="Last name" placeholder="Bond" required name="lastName" />
                </div>
                <UiVeeInput label="Username" placeholder="agent-007" required name="username">
                  <template #trailingIcon>
                    <div class="absolute inset-y-0 right-3 flex items-center justify-center">
                      <Icon name="lucide:check" class="text-emerald-500" />
                    </div>
                  </template>
                </UiVeeInput>
                <UiVeeInput
                  label="Website"
                  class="peer ps-20"
                  placeholder="your-website.com"
                  type="text"
                  name="website"
                >
                  <template #icon>
                    <span
                      class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center border-r px-3 text-base text-muted-foreground peer-disabled:opacity-50 sm:text-sm"
                    >
                      https://
                    </span>
                  </template>
                </UiVeeInput>
                <div class="space-y-2">
                  <UiVeeTextarea
                    v-model="bio"
                    label="Biography"
                    placeholder="Write a few sentences about yourself"
                    name="bio"
                    :hint="`${characterCount} characters left of ${maxBioLength}`"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <UiDialogFooter class="border-t border-border px-6 py-4">
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline"> Cancel </UiButton>
          </UiDialogClose>
          <UiButton @click="submit()">Save changes</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const defaultBanner =
    "https://images.unsplash.com/photo-1474779751981-5d6bb8cb0a35?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const defaultAvatar =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const bio = ref("The name is Bond, James Bond.");
  const maxBioLength = 200;
  const characterCount = computed(() => maxBioLength - bio.value?.length || 0);
  const open = defineModel<boolean>({ default: false });

  // Image state
  const currentImage = ref<string | null>(defaultBanner);
  const currentAvatarImage = ref<string | null>(defaultAvatar);

  // File dialog
  const { open: handleBannerClick, onChange: onBannerChange } = useFileDialog({
    accept: "image/*",
    multiple: false,
    reset: true,
  });
  const { open: handleAvatarClick, onChange: onAvatarChange } = useFileDialog({
    accept: "image/*",
    multiple: false,
    reset: true,
  });

  // Handle file change for Banner
  onBannerChange(async (files) => {
    if (!files || files.length === 0) {
      currentImage.value = defaultBanner;
      return;
    }
    const file = files[0];
    const { execute } = useBase64(file);
    currentImage.value = await execute();
  });
  // Handle file change for Avatar
  onAvatarChange(async (files) => {
    if (!files || files.length === 0) {
      currentAvatarImage.value = defaultAvatar;
      return;
    }
    const file = files[0];
    const { execute } = useBase64(file);
    currentAvatarImage.value = await execute();
  });

  // Form state
  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-edit-profile",
    validationSchema: toTypedSchema(
      z.object({
        firstName: z
          .string()
          .nonempty("First name too short")
          .max(50, "Too long")
          .default("James")
          .describe("First name"),
        lastName: z.string().nonempty("Last name too short").max(50, "Too long").default("Bond"),
        username: z
          .string()
          .nonempty("Username too short")
          .max(30, "Too long")
          .default("agent-007"),
        website: z
          .string()
          .nonempty("Website invalid")
          .default("www.007.com")
          .refine(
            (v) => {
              // regex to check if a website is valid
              return /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/.test(v);
            },
            { message: "Invalid URL" }
          ),
        bio: z.string().nonempty().max(200).default("The name is Bond, James Bond."),
      })
    ),
  });

  // Submit form
  const submit = handleSubmit(async (values) => {
    try {
      useSonner.success("Profile updated successfully.", {
        description: `Your profile has been updated successfully, ${values.firstName}!`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred. Please try again.", {
        description: error.message,
      });
    }
  });
</script>
```

<!-- /automd -->

::

### Onboarding

::ShowCase

:DocsDialogOnboarding

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogOnboarding.vue" code lang="vue" -->

```vue [DocsDialogOnboarding.vue]
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Onboarding</UiButton>
      </UiDialogTrigger>
      <UiDialogContent
        class="max-w-[450px] gap-0 overflow-x-clip p-0 [&>button:last-child]:text-white"
      >
        <div class="p-2">
          <TransitionFade>
            <img
              v-if="showImage"
              class="h-[282px] w-full rounded-lg object-cover"
              :src="currentImage"
              width="382"
              height="216"
              alt="dialog"
            />
          </TransitionFade>
        </div>
        <div class="space-y-6 overflow-x-hidden px-6 pb-6 pt-3">
          <TransitionFade mode="out-in">
            <UiDialogHeader v-if="showImage">
              <UiDialogTitle>{{ stepContent[step - 1].title }}</UiDialogTitle>
              <UiDialogDescription>{{ stepContent[step - 1].description }}</UiDialogDescription>
            </UiDialogHeader>
          </TransitionFade>
          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div class="flex justify-center space-x-1.5 max-sm:order-1">
              <div
                v-for="(_, index) in Array(totalSteps)"
                :key="index"
                :class="[
                  'h-1.5 w-1.5 rounded-full bg-primary',
                  index + 1 === step ? 'bg-primary' : 'opacity-20',
                ]"
              />
            </div>
            <UiDialogFooter>
              <UiDialogClose as-child>
                <UiButton type="button" variant="ghost"> Skip </UiButton>
              </UiDialogClose>
              <UiButton v-if="step > 1" variant="outline" type="button" @click="goPrev">
                <Icon
                  name="lucide:arrow-left"
                  class="-ms-1 me-2 size-4 opacity-60 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Prev
              </UiButton>
              <UiButton v-if="step < totalSteps" class="group" type="button" @click="goNext">
                Next
                <Icon
                  name="lucide:arrow-right"
                  class="-me-1 ms-2 size-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </UiButton>

              <UiDialogClose v-else as-child>
                <UiButton type="button">Okay</UiButton>
              </UiDialogClose>
            </UiDialogFooter>
          </div>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const stepContent = [
    {
      img: "https://ui-thing.behonbaker.com/cover.png",
      title: "Welcome to UI Thing",
      description:
        "Discover a powerful collection of components designed to enhance your development workflow.",
    },
    {
      img: "https://images.unsplash.com/4/madebyvadim.jpg?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Customizable Components",
      description:
        "Each component is fully customizable and built with modern web standards in mind.",
    },
    {
      img: "https://images.unsplash.com/photo-1517976547714-720226b864c1?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Ready to Start?",
      description: "Begin building amazing interfaces with our comprehensive component library.",
    },
    {
      img: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?q=80&w=3022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Support",
      description:
        "Access our extensive documentation and community resources to make the most of UI Thing.",
    },
  ];
  const step = ref(1);
  const totalSteps = ref(stepContent.length);
  const open = defineModel<boolean>({ default: false });
  const showImage = ref(true);
  const currentImage = computed(() => stepContent[step.value - 1].img);

  watch(step, () => {
    showImage.value = false;
    setTimeout(() => {
      showImage.value = true;
    }, 100);
  });
  const goNext = () => {
    if (step.value < totalSteps.value) {
      step.value += 1;
    }
  };
  const goPrev = () => {
    if (step.value > 1) {
      step.value -= 1;
    }
  };

  watch(open, (value) => {
    if (value) {
      step.value = 1;
    }
  });
</script>
```

<!-- /automd -->

::

### Command Pallette Search

::ShowCase

:DocsDialogSearch

#code

<!-- automd:file src="../../app/components/content/Docs/Dialog/DocsDialogSearch.vue" code lang="vue" -->

```vue [DocsDialogSearch.vue]
<template>
  <div class="mx-auto flex max-w-sm justify-center">
    <UiButton class="w-full" variant="outline" @click="dialog = !dialog">
      <Icon
        name="lucide:search"
        class="size-4 shrink-0 text-muted-foreground/80"
        aria-hidden="true"
      />
      <span class="font-normal text-muted-foreground/70">Search</span>

      <UiKbd class="ml-auto"> ⌘+Shift+K </UiKbd>
    </UiButton>
    <UiCommandDialog v-model:open="dialog">
      <UiDialogTitle class="sr-only">Search commands</UiDialogTitle>
      <UiDialogDescription class="sr-only">
        Use the arrow keys to navigate and press Enter to select a command.
      </UiDialogDescription>
      <UiCommandInput placeholder="Type a UiCommand or search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <template v-for="(group, i) in groups" :key="i">
          <UiCommandGroup class="p-2" :heading="group.heading">
            <UiCommandItem v-for="(child, j) in group.items" :key="j" :value="child.value">
              <Icon :name="child.icon" class="size-4 opacity-60" aria-hidden="true" />
              <span>{{ child.text }}</span>
              <UiCommandShortcut v-if="child.shortcut" class="justify-center">{{
                child.shortcut
              }}</UiCommandShortcut>
            </UiCommandItem>
          </UiCommandGroup>
          <UiCommandSeparator v-if="i < groups.length - 1" />
        </template>
      </UiCommandList>
    </UiCommandDialog>
  </div>
</template>

<script lang="ts" setup>
  const dialog = ref(false);

  useEventListener("keydown", (e) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
      e.preventDefault();
      dialog.value = !dialog.value;
    }
  });

  const groups = [
    {
      heading: "Quick start",
      items: [
        { icon: "lucide:folder-plus", text: "New folder", shortcut: "⌘N", value: "new-folder" },
        {
          icon: "lucide:file-input",
          text: "Import document",
          shortcut: "⌘I",
          value: "import-document",
        },
        {
          icon: "lucide:circle-fading-plus",
          text: "Add block",
          shortcut: "⌘B",
          value: "add-block",
        },
      ],
    },
    {
      heading: "Navigation",
      items: [
        {
          icon: "lucide:arrow-up-right",
          text: "Go to dashboard",
          value: "go-to-dashboard",
          shortcut: "",
        },
        { icon: "lucide:arrow-up-right", text: "Go to apps", value: "go-to-apps", shortcut: "" },
        {
          icon: "lucide:arrow-up-right",
          text: "Go to connections",
          value: "go-to-connections",
          shortcut: "",
        },
      ],
    },
  ];
</script>
```

<!-- /automd -->

::
