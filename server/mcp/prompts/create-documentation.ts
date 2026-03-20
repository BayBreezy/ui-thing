export default defineMcpPrompt({
  description: "Guide AI to create docs pages with UI Thing prose components.",
  handler: async () => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create technical documentation with UI Thing prose components.

Preferred workflow:
1. Call list-prose or search-components with type="prose" to discover prose components.
2. Call get-prose for exact implementation details.
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
