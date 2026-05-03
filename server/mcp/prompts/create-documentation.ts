export default defineMcpPrompt({
  description: "Guide AI to create docs pages for UI Thing components.",
  handler: async () => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create technical documentation for a UI Thing component.

Preferred workflow:
1. Call search-components or list-components to find the component.
2. Call get-component for exact implementation details.
3. Call get-documentation-page to inspect an existing docs page when you need a reference structure.

Default structure:
- overview
- installation
- usage
- API or examples
- related links

Keep the result concise, readable, and Nuxt Content friendly.`,
          },
        },
      ],
    };
  },
});
