<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with start select"
      class="peer ps-28"
      placeholder="192.168.1.1"
      type="text"
    >
      <template #icon>
        <select
          aria-label="Protocol"
          class="form-select absolute inset-y-0 start-0 flex items-center justify-center rounded-s-md border border-input bg-background ps-3 text-sm text-muted-foreground ring-offset-background focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-disabled:opacity-50"
        >
          <option value="https://">https://</option>
          <option value="http://">http://</option>
          <option value="ftp://">ftp://</option>
          <option value="sftp://">sftp://</option>
          <option value="ws://">ws://</option>
          <option value="wss://">wss://</option>
        </select>
      </template>
    </UiVeeInput>
  </div>
</template>
