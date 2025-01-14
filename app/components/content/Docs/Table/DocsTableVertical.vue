<template>
  <div class="mx-auto max-w-lg">
    <div class="overflow-hidden rounded-lg border border-border bg-background">
      <UiTable>
        <UiTableBody>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Name</UiTableCell>
            <UiTableCell class="py-2">David Kim</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Email</UiTableCell>
            <UiTableCell class="py-2">d.kim@company.com</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Location</UiTableCell>
            <UiTableCell class="py-2">Seoul, KR</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Status</UiTableCell>
            <UiTableCell class="py-2">Active</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Balance</UiTableCell>
            <UiTableCell class="py-2">$1,000.00</UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="mt-4 text-center text-sm text-muted-foreground">Vertical table</p>
  </div>
</template>
