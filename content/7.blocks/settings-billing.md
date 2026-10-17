---
title: Settings - Billing
description: "Billing settings blocks: plan overview with usage, a plan picker, invoice history and saved payment methods."
---

Billing blocks use placeholder data and local state. Wire the actions to your payment provider; none of them talk to a backend.

## Plan Overview

Current plan, renewal date, usage meters, default card and billing email.

:::BlockShowcase{blockPath="Settings/Billing/BlockSettingsBillingOverview" component="BlockSettingsBillingOverview" iframeHeight="900px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Billing/BlockSettingsBillingOverview.vue" language="vue" title="Plan Overview"}

:::

## Plan Picker

Monthly and annual toggle with radio plan cards and a computed summary.

:::BlockShowcase{blockPath="Settings/Billing/BlockSettingsBillingPlanPicker" component="BlockSettingsBillingPlanPicker" iframeHeight="760px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Billing/BlockSettingsBillingPlanPicker.vue" language="vue" title="Plan Picker"}

:::

## Invoice History

Searchable invoice table with status badges, selection and downloads.

:::BlockShowcase{blockPath="Settings/Billing/BlockSettingsBillingInvoices" component="BlockSettingsBillingInvoices" iframeHeight="640px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Billing/BlockSettingsBillingInvoices.vue" language="vue" title="Invoice History"}

:::

## Payment Methods

Saved cards with a default marker and an add card dialog.

:::BlockShowcase{blockPath="Settings/Billing/BlockSettingsBillingPaymentMethods" component="BlockSettingsBillingPaymentMethods" iframeHeight="420px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Billing/BlockSettingsBillingPaymentMethods.vue" language="vue" title="Payment Methods"}

:::
