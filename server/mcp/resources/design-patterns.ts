export default defineMcpResource({
  name: "design-patterns",
  title: "UI Thing Design Patterns",
  uri: "resource://uithing/design-patterns",
  description:
    "Short design guidance for composing UI Thing blocks and components in Nuxt projects.",
  cache: "24h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "text/markdown",
          text: `# UI Thing Design Patterns

## Use blocks first

Use blocks when the user needs a full section quickly. They give you a stronger starting point for landing pages, pricing pages, auth pages, and app shells.

## Use components for custom seams

Use components when you need to connect data, validation, or application-specific behavior around the design.

## Preserve the Nuxt-native workflow

UI Thing is built for Nuxt projects where copied files stay editable in the app. Prefer solutions that keep components, composables, plugins, and utilities visible in the consuming project.

## Keep installation explicit

Always build an install plan before implementation so the required components, npm packages, and Nuxt modules are visible up front.

## Default to accessible composition

Prefer existing wrappers over recreating primitives. UI Thing leans on Reka UI and existing wrappers already preserve keyboard, focus, and ARIA behavior.`,
        },
      ],
    };
  },
});
