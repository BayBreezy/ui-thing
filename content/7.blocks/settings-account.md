---
title: Settings - Account
description: "Profile, company, password, two-factor, sessions, danger zone, theme and language settings for a user account."
---

Personal account settings. The profile and password forms use `vee-validate` with `yup`, so you can copy the schema and swap in your own submit handler.

## Profile

### Profile Form

Avatar upload with validated name, email, username and bio fields.

:::BlockShowcase{blockPath="Settings/Profile/BlockSettingsProfileForm" component="BlockSettingsProfileForm" iframeHeight="820px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Profile/BlockSettingsProfileForm.vue" language="vue" title="Profile Form"}

:::

### Company Profile

Logo upload, company details, brand colour and an about field.

:::BlockShowcase{blockPath="Settings/Profile/BlockSettingsProfileCompany" component="BlockSettingsProfileCompany" iframeHeight="880px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Profile/BlockSettingsProfileCompany.vue" language="vue" title="Company Profile"}

:::

### Inline Editable Rows

Read-only rows that turn into an input when you click edit. No page-level form needed.

:::BlockShowcase{blockPath="Settings/Profile/BlockSettingsProfileEditable" component="BlockSettingsProfileEditable" iframeHeight="480px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Profile/BlockSettingsProfileEditable.vue" language="vue" title="Inline Editable Rows"}

:::

## Security

### Change Password

Password inputs with a live requirements checklist and strength meter.

:::BlockShowcase{blockPath="Settings/Security/BlockSettingsSecurityPassword" component="BlockSettingsSecurityPassword" iframeHeight="780px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Security/BlockSettingsSecurityPassword.vue" language="vue" title="Change Password"}

:::

### Two-Factor Authentication

A master switch and selectable methods: authenticator app, passkey and SMS.

:::BlockShowcase{blockPath="Settings/Security/BlockSettingsSecurityTwoFactor" component="BlockSettingsSecurityTwoFactor" iframeHeight="560px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Security/BlockSettingsSecurityTwoFactor.vue" language="vue" title="Two-Factor Authentication"}

:::

### Active Sessions

Signed-in devices with the current one highlighted and per-session revoke.

:::BlockShowcase{blockPath="Settings/Security/BlockSettingsSecuritySessions" component="BlockSettingsSecuritySessions" iframeHeight="420px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Security/BlockSettingsSecuritySessions.vue" language="vue" title="Active Sessions"}

:::

### Danger Zone

Export, deactivate and delete rows. Deleting requires typing a phrase inside an alert dialog.

:::BlockShowcase{blockPath="Settings/Security/BlockSettingsSecurityDangerZone" component="BlockSettingsSecurityDangerZone" iframeHeight="420px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Security/BlockSettingsSecurityDangerZone.vue" language="vue" title="Danger Zone"}

:::

## Appearance

### Theme

Light, dark and system cards wired to color mode, plus accent swatches and density.

:::BlockShowcase{blockPath="Settings/Appearance/BlockSettingsAppearanceTheme" component="BlockSettingsAppearanceTheme" iframeHeight="820px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Appearance/BlockSettingsAppearanceTheme.vue" language="vue" title="Theme"}

:::

### Language & Region

Language, timezone, date format and clock settings with a live preview.

:::BlockShowcase{blockPath="Settings/Appearance/BlockSettingsAppearancePreferences" component="BlockSettingsAppearancePreferences" iframeHeight="740px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Appearance/BlockSettingsAppearancePreferences.vue" language="vue" title="Language & Region"}

:::
