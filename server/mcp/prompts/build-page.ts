import { z } from "zod";

export default defineMcpPrompt({
  description: "Guide AI to build a complete page using UI Thing blocks and components",
  inputSchema: {
    pageType: z
      .enum(["landing", "dashboard", "auth", "docs", "pricing", "about", "contact", "custom"])
      .describe("Type of page to build"),
    sections: z
      .string()
      .optional()
      .describe(
        "Comma-separated list of sections needed (e.g., 'header,hero,features,cta,footer')"
      ),
  },
  handler: async ({ pageType, sections }) => {
    const sectionGuidance = sections
      ? `\n\nRequired sections: ${sections}`
      : `\n\nYou'll need to determine appropriate sections for a ${pageType} page.`;

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are building a ${pageType} page using UI Thing blocks and components.${sectionGuidance}

**Workflow:**

1. **Discover Blocks**: 
   - Use list-blocks tool to see all 100+ available blocks
   - Identify blocks for each section (Header, Hero, Features, CTA, Footer, etc.)

2. **Get Block Details**:
   - Use get-block tool for each selected block
   - Review the components each block requires
   - Note the dependencies

3. **Validate All Dependencies**:
   - Collect ALL block and component names
   - Use validate-dependencies tool with the complete list
   - Get installation commands for everything at once

4. **Page Structure**:
   - Create a new Vue page in pages/ directory
   - Import and use blocks in order
   - Ensure responsive layout
   - Add transitions if appropriate

5. **Styling Consistency**:
   - All blocks use Tailwind CSS
   - Maintain consistent spacing between sections
   - Ensure dark mode works throughout
   - Use UiContainer for width constraints

6. **Best Practices**:
   - Use semantic HTML structure
   - Maintain accessibility standards
   - Optimize images and assets
   - Consider loading states

7. **Create Custom Sections**:
   - If needed sections are not available as blocks, use components to build them
   - Follow similar workflow: get-component, validate-dependencies, implement
   - Ensure custom sections match overall design

**Output**:
- Provide installation commands first
- Then show the complete Vue SFC code for the page
- Include comments for clarity

**Note**:

Start by listing available blocks and suggesting which ones would work best for this ${pageType} page.`,
          },
        },
      ],
    };
  },
});
