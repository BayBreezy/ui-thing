export default defineMcpPrompt({
  description: "Guide AI to set up UI Thing in a Nuxt project.",
  handler: async () => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Help the user set up UI Thing in a Nuxt project.

Preferred workflow:
1. Call get-project-setup first.
2. If the user already knows what they want to build, call plan-page or plan-form next.
3. Call get-install-plan before implementation so commands are explicit.
4. Call get-component, get-block, get-prose, or get-documentation-page only after the target items are exact.

Keep the response concise and start with commands.`,
          },
        },
      ],
    };
  },
});
