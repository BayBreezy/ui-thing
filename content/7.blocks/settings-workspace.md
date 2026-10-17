---
title: Settings - Workspace
description: "Workspace administration blocks: team members, invitations, role permissions, integrations and API keys."
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
