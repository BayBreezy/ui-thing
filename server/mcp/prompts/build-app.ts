import { z } from "zod";

export default defineMcpPrompt({
  description:
    "Guide AI to design and build a complete multi-page app with UI Thing: plan, install once, build layouts, then pages and states.",
  inputSchema: {
    description: z.string().describe("What the app is and who it is for."),
    features: z
      .string()
      .optional()
      .describe("Optional comma-separated features, such as 'pricing, settings, ai chat'."),
  },
  handler: async ({ description, features }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Build this app with UI Thing: ${description}${features ? `\nRequired features: ${features}` : ""}

Workflow:
1. Read resource://uithing/design-patterns and resource://uithing/conventions before choosing anything.
2. Call plan-app with the description. Adjust the route map if the product needs something it missed.
3. Call get-project-setup and run the setup commands if the project does not exist yet.
4. Call get-install-plan once with every component and block you will use. Run addNuxtModules, installDependencies and addComponents, register nuxtConfigModules, and apply the notes.
5. Build layouts first (app shell, marketing, auth), using get-block for the exact sidebar, header, navigation and footer source.
6. Build pages in route order. For each page call plan-page for block alternatives, get-block / get-component for exact source, and plan-form for every form.
7. Replace all placeholder copy and links. Add loading, empty and error states, toasts for feedback and confirmation dialogs for destructive actions.
8. Verify in light and dark mode and at 375px width, then run the dev server and fix any console errors.

Return a short summary of routes, layouts, installed components and what still needs real data.`,
          },
        },
      ],
    };
  },
});
