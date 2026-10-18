---
title: Settings - Workspace
description: "Workspace administration blocks: team members, invitations, role permissions, integrations, API keys, scopes, usage and webhooks."
---

Blocks for the admin side of a SaaS product. Everything runs on local state, so replace the arrays with data from your API.

## Members

### Members Table

Avatar cells, inline role select, status badges, search and a row actions menu.

:::BlockShowcase{blockPath="Settings/Members/BlockSettingsMembersTable" component="BlockSettingsMembersTable" iframeHeight="620px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Members/BlockSettingsMembersTable.vue" language="vue" title="Members Table"}

:::

### Invite Dialog

Email chips, a role select and a copyable invite link inside a dialog.

:::BlockShowcase{blockPath="Settings/Members/BlockSettingsMembersInvite" component="BlockSettingsMembersInvite" iframeHeight="620px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Members/BlockSettingsMembersInvite.vue" language="vue" title="Invite Dialog"}

:::

### Roles & Permissions

A grouped permission matrix with a locked owner column.

:::BlockShowcase{blockPath="Settings/Members/BlockSettingsMembersRoles" component="BlockSettingsMembersRoles" iframeHeight="720px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Members/BlockSettingsMembersRoles.vue" language="vue" title="Roles & Permissions"}

:::

## Integrations

### Integrations Grid

Filterable app cards with a connect switch.

:::BlockShowcase{blockPath="Settings/Integrations/BlockSettingsIntegrationsGrid" component="BlockSettingsIntegrationsGrid" iframeHeight="620px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Integrations/BlockSettingsIntegrationsGrid.vue" language="vue" title="Integrations Grid"}

:::

### Integrations List

Rows with status, last sync time and a confirmed disconnect.

:::BlockShowcase{blockPath="Settings/Integrations/BlockSettingsIntegrationsList" component="BlockSettingsIntegrationsList" iframeHeight="480px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/Integrations/BlockSettingsIntegrationsList.vue" language="vue" title="Integrations List"}

:::

## API Keys

### API Keys

Create a key, copy the secret once, then revoke from a masked table.

:::BlockShowcase{blockPath="Settings/ApiKeys/BlockSettingsApiKeysTable" component="BlockSettingsApiKeysTable" iframeHeight="520px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/ApiKeys/BlockSettingsApiKeysTable.vue" language="vue" title="API Keys"}

:::

### Create Key Flow

A dialog with a name, an environment, an expiry and an IP allow list. The secret is shown once, and the done button stays locked until you confirm you saved it.

:::BlockShowcase{blockPath="Settings/ApiKeys/BlockSettingsApiKeysCreate" component="BlockSettingsApiKeysCreate" iframeHeight="560px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/ApiKeys/BlockSettingsApiKeysCreate.vue" language="vue" title="Create Key Flow"}

:::

### Scopes

Choose none, read or write for each resource, start from a preset and see a warning when a key can change billing.

:::BlockShowcase{blockPath="Settings/ApiKeys/BlockSettingsApiKeysScopes" component="BlockSettingsApiKeysScopes" iframeHeight="700px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/ApiKeys/BlockSettingsApiKeysScopes.vue" language="vue" title="Scopes"}

:::

### Usage

Requests and error rates for each key with a rate limit bar, a time range and sorting. Unused keys are flagged.

:::BlockShowcase{blockPath="Settings/ApiKeys/BlockSettingsApiKeysUsage" component="BlockSettingsApiKeysUsage" iframeHeight="700px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/ApiKeys/BlockSettingsApiKeysUsage.vue" language="vue" title="Usage"}

:::

### Webhooks

Endpoints with their events, an enabled switch, a test button, an add endpoint dialog that shows the signing secret once and a list of recent deliveries.

:::BlockShowcase{blockPath="Settings/ApiKeys/BlockSettingsApiKeysWebhooks" component="BlockSettingsApiKeysWebhooks" iframeHeight="760px" containerClass="max-w-3xl mx-auto" frameClass="p-4 md:p-6"}

:prose-code-snippet{file="/components/content/Block/Settings/ApiKeys/BlockSettingsApiKeysWebhooks.vue" language="vue" title="Webhooks"}

:::
