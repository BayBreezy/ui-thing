export default defineMcpTool({
  description:
    "Returns a comprehensive list of all 60+ accessible UI components built on Reka UI primitives. Includes form controls (inputs, selects, checkboxes, radio groups), navigation (breadcrumbs, tabs, menus, command palettes), data display (tables, cards, badges, avatars), overlays (dialogs, drawers, popovers, tooltips), feedback (alerts, toasts, progress), and specialized components (calendars, date pickers, charts, carousels). Each component includes full TypeScript-enabled Vue SFC source code, composables, plugins, utils, styling with tailwind-variants, accessibility features, dark mode support, and keyboard navigation. Use this first to discover available component names before calling get-component for full details.",

  annotations: {
    readOnlyHint: true, // Safe, no side effects
    destructiveHint: false, // Never modifies anything
    idempotentHint: true, // Always same result
    openWorldHint: false, // Local data only
  },
  cache: "1h", // Cache for 1 hour
  async handler() {
    // Categorize components by type
    const categories = [
      "Form Controls",
      "Navigation",
      "Data Display",
      "Overlays & Modals",
      "Feedback",
      "Layout",
      "Specialized",
    ];

    return jsonResult(
      {
        components: comp,
        totalCount: comp.length,
        categories,
      },
      true
    ); // Pretty print
  },
});
