<template>
  <div class="flex w-full justify-center">
    <div class="w-full max-w-md space-y-3 overflow-hidden rounded-lg border border-border">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border bg-muted/50">
            <th class="p-3 text-left">
              <UiSkeleton class="h-4 w-20" />
            </th>
            <th class="p-3 text-left">
              <UiSkeleton class="h-4 w-24" />
            </th>
            <th class="p-3 text-left">
              <UiSkeleton class="h-4 w-16" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 3" :key="i" class="border-b border-border">
            <td class="p-3">
              <UiSkeleton class="h-4 w-20" />
            </td>
            <td class="p-3">
              <UiSkeleton class="h-4 w-24" />
            </td>
            <td class="p-3">
              <UiSkeleton class="h-4 w-16" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
