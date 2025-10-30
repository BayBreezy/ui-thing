<template>
  <div class="space-y-6">
    <div>
      <h3 class="mt-0">All Variants</h3>
      <div class="space-y-4">
        <ProseCallout variant="default" title="Default" description="This is a default callout." />
        <ProseCallout variant="info" title="Info" description="This is an info callout." />
        <ProseCallout variant="success" title="Success" description="This is a success callout." />
        <ProseCallout variant="warning" title="Warning" description="This is a warning callout." />
        <ProseCallout variant="error" title="Error" description="This is an error callout." />
        <ProseCallout variant="tip" title="Tip" description="This is a tip callout." />
        <ProseCallout variant="note" title="Note" description="This is a note callout." />
        <ProseCallout variant="example" title="Example" description="This is an example callout." />
      </div>
    </div>

    <div>
      <h3>Filled Style</h3>
      <div class="space-y-4">
        <ProseCallout
          variant="info"
          title="Filled Info"
          description="This uses the filled style."
          filled
        />
        <ProseCallout
          variant="success"
          title="Filled Success"
          description="This uses the filled style."
          filled
        />
        <ProseCallout
          variant="warning"
          title="Filled Warning"
          description="This uses the filled style."
          filled
        />
        <ProseCallout
          variant="error"
          title="Filled Error"
          description="This uses the filled style."
          filled
        />
      </div>
    </div>

    <div>
      <h3>With Slots</h3>
      <ProseCallout variant="tip">
        <template #icon>
          <Icon name="lucide:sparkles" />
        </template>
        <template #title> Custom Slotted Title </template>
        <template #default>
          <p>This callout uses slots for maximum flexibility.</p>
          <ul class="mt-2 list-inside list-disc space-y-1">
            <li>Custom icon slot</li>
            <li>Custom title slot</li>
            <li>Custom content slot</li>
          </ul>
        </template>
      </ProseCallout>
    </div>

    <div>
      <h3>Clickable Callout</h3>
      <ProseCallout
        variant="info"
        title="Learn More"
        description="Click this callout to navigate to the documentation."
        url="/docs"
      />
    </div>

    <div>
      <h3>Custom Icons</h3>
      <div class="space-y-4">
        <ProseCallout
          variant="success"
          icon="lucide:trophy"
          title="Achievement Unlocked"
          description="You've earned a new badge!"
        />
        <ProseCallout
          variant="info"
          icon="lucide:rocket"
          title="Launch Ready"
          description="Your application is ready to deploy."
        />
        <ProseCallout
          variant="tip"
          icon="lucide:zap"
          title="Performance Boost"
          description="Enable caching for better performance."
        />
      </div>
    </div>
  </div>
</template>
