---
title: Icon List
description: Display lists with custom icons and variants for each item.
---

## Source code

Click :SourceCodeLink{component="ProseIconList.global.vue" folder="content/prose/Typography/Lists"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Usage

:::ShowCase{prose}

::ProseIconListExample
::

#code

<!-- automd:file src="../../app/components/content/Docs/ProseIconListExample.vue" code lang="vue" -->

```vue [ProseIconListExample.vue]
<template>
  <div class="px-8">
    <h3 class="mt-0">Basic Usage</h3>
    <ProseIconList variant="success">
      <p>Successfully implemented authentication</p>
      <p>Database connection established</p>
      <p>API endpoints configured</p>
    </ProseIconList>

    <h3>Mixed Variants</h3>
    <ProseIconList>
      <ProseLi variant="success">Feature is working correctly</ProseLi>
      <ProseLi variant="warning">Needs further testing</ProseLi>
      <ProseLi variant="error">Bug found in production</ProseLi>
      <ProseLi variant="info">Documentation pending</ProseLi>
    </ProseIconList>

    <h3>Custom Icons</h3>
    <ProseIconList>
      <ProseLi icon="lucide:check-circle-2" variant="success">Completed task</ProseLi>
      <ProseLi icon="lucide:clock" variant="warning">In progress</ProseLi>
      <ProseLi icon="lucide:x-circle" variant="error">Failed step</ProseLi>
      <ProseLi icon="lucide:help-circle" variant="info">Needs clarification</ProseLi>
    </ProseIconList>

    <h3>Default Icon Override</h3>
    <ProseIconList icon="lucide:star" variant="default">
      <ProseLi>Premium feature</ProseLi>
      <ProseLi>Advanced analytics</ProseLi>
      <ProseLi>Priority support</ProseLi>
    </ProseIconList>

    <h3>Advanced Example</h3>
    <ProseIconList>
      <ProseLi icon="lucide:check-circle-2" variant="success">
        <ProseStrong>Installation:</ProseStrong> Run npm <code>install ui-thing</code>
      </ProseLi>
      <ProseLi icon="lucide:settings" variant="info">
        <ProseStrong>Configuration:</ProseStrong> Update your <code>config.json</code> file with
        necessary settings.
      </ProseLi>
      <ProseLi icon="lucide:play-circle" variant="warning">
        <ProseStrong>Usage:</ProseStrong> Start the application using <code>npm start</code> and
        monitor the console for logs.
      </ProseLi>
      <ProseLi icon="lucide:bug" variant="error">
        <ProseStrong>Troubleshooting:</ProseStrong> If you encounter issues, refer to the FAQ or
        open an issue on GitHub.
      </ProseLi>
    </ProseIconList>
  </div>
</template>
```

<!-- /automd -->

:::

### Mixed Variants

Each item can have its own variant:

:::prose-icon-list

::prose-li{variant="success"}
Feature is working correctly
::
::prose-li{variant="warning"}
Needs further testing
::
::prose-li{variant="error"}
Bug found in production
::
::prose-li{variant="info"}
Documentation pending
::
:::

### Custom Icons

Override the default icons with custom ones:

::prose-icon-list{icon="lucide:star"}
Premium feature

Advanced analytics

Priority support
::

### Per-Item Custom Icons

Each item can have its own icon:

:::prose-icon-list
::prose-li{icon="lucide:check-circle-2" variant="success"}
Completed task
::
::prose-li{icon="lucide:clock" variant="warning"}
In progress
::
::prose-li{icon="lucide:x-circle" variant="error"}
Failed step
::
::prose-li{icon="lucide:help-circle" variant="info"}
Needs clarification
::
:::

## Variants

### Success

::prose-icon-list{variant="success"}
User registration completed

Email verification sent

Profile created successfully
::

### Error

::prose-icon-list{variant="error"}
Invalid credentials provided

Connection timeout

File upload failed
::

### Warning

::prose-icon-list{variant="warning"}
API rate limit approaching

Deprecated feature in use

Cache needs clearing
::

### Info

::prose-icon-list{variant="info"}
Server maintenance scheduled

New feature available

Documentation updated
::

### Default

::prose-icon-list
Standard list item

Another item

Final item
::

## Vue Component Usage

You can also use this as a regular Vue component:

```vue
<template>
  <ProseIconList variant="success">
    <ProseLi>Feature completed</ProseLi>
    <ProseLi>Tests passing</ProseLi>
    <ProseLi variant="warning">Review pending</ProseLi>
  </ProseIconList>
</template>
```

## Advanced Example

Combine different features for complex lists:

:::prose-icon-list{icon="lucide:package"}
::prose-li{icon="lucide:download" variant="success"}
**Installation**: Run `npm install ui-thing`
::prose-icon-list{icon="lucide:check" variant="success"}
Download the package

Install the dependencies

Go to the project directory
::
::
::prose-li{icon="lucide:settings" variant="info"}
**Configuration**: Set up your `nuxt.config.ts`
::
::prose-li{icon="lucide:circle-play" variant="warning"}
**Usage**: Import components as needed
::
::prose-li{icon="lucide:rocket" variant="success"}
**Deploy**: Push to production
::
:::
