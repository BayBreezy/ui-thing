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

::ShowCase{component="DocsDialog"}

#code

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
              @click="closeDialog(false)"
              variant="outline"
              type="button"
              class="mt-2 sm:mt-0"
              >Cancel</UiButton
            >
            <UiButton @click="closeDialog(true)" type="submit">Save</UiButton>
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

::

### Custom Close Button

::ShowCase{component="DocsDialogCustomClose"}

#code

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
              <UiInput id="link" model-value="https://ui.shadcn.com/docs/installation" readOnly />
            </div>
            <UiButton @click="copyValue" type="submit" size="icon" class="px-3">
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

::

## Origin UI Dialogs

Here are some of the dialog examples from the [Origin UI](https://originui.com) documentation.

Hats off to the Origin UI team ❤️.

I just made them work with my setup.

### Scrollable (native scrollbar)

::ShowCase{component="DocsDialogScrollNative"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogScrollNative.vue" code lang="vue" -->

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

::ShowCase{component="DocsDialogScrollCustom"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogScrollCustom.vue" code lang="vue" -->

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

::ShowCase{component="DocsDialogScrollStickyHeader"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogScrollStickyHeader.vue" code lang="vue" -->

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

::ShowCase{component="DocsDialogScrollStickyFooter"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogScrollStickyFooter.vue" code lang="vue" -->

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
          <UiDialogClose asChild>
            <UiButton type="button" variant="outline" text="Cancel" />
          </UiDialogClose>
          <UiDialogClose asChild>
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

::ShowCase{component="DocsDialogTermsCondition"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogTermsCondition.vue" code lang="vue" -->

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

::ShowCase{component="DocsDialogNewsletter"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogNewsletter.vue" code lang="vue" -->

```vue [DocsDialogNewsletter.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger asChild>
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

::ShowCase{component="DocsDialogFeedback"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogFeedback.vue" code lang="vue" -->

```vue [DocsDialogFeedback.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger asChild>
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

::ShowCase{component="DocsDialogRating"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogRating.vue" code lang="vue" -->

```vue [DocsDialogRating.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger asChild>
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
                label="Why did you give this rating?"
                id="feedback"
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

::ShowCase{component="DocsDialogOTPCode"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogOTPCode.vue" code lang="vue" -->

```vue [DocsDialogOTPCode.vue]
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
                <UiVeePinInput v-model="value" @complete="checkCode" otp :input-count="4" />
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

::ShowCase{component="DocsDialogSignUp"}

#code

<!-- automd:file src="../../components/content/Docs/Dialog/DocsDialogSignUp.vue" code lang="vue" -->

```vue [DocsDialogSignUp.vue]
<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger asChild>
        <UiButton variant="outline">Sign up</UiButton>
      </UiDialogTrigger>
      <UiDialogContent>
        <div class="flex flex-col items-center gap-2">
          <UiFancyIcon icon="">
            <Icon name="lucide:circle" mode="svg" class="fill-foreground" />
          </UiFancyIcon>
          <UiDialogHeader>
            <UiDialogTitle class="sm:text-center">Sign up Origin UI</UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              We just need a few details to get you started.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="space-y-5">
          <fieldset class="grid grid-cols-1 gap-4">
            <UiVeeInput label="Full name" placeholder="John Doe" required />
            <UiVeeInput label="Email" placeholder="hi@mycompany.com" type="email" required />
            <UiVeeInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              required
            />
          </fieldset>
          <UiButton type="submit" class="w-full"> Sign up </UiButton>
        </form>

        <UiDivider label="or" />

        <UiButton variant="outline"
          ><Icon name="logos:google-icon" /> Continue with Google</UiButton
        >

        <p class="text-center text-xs text-muted-foreground">
          By signing up you agree to our <a class="underline hover:no-underline" href="#">Terms</a>.
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::
