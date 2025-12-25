export default defineMcpPrompt({
  description: "Guide AI to create documentation pages using UI Thing prose components",
  handler: async () => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are creating technical documentation using UI Thing's 47 prose components.

**Available Prose Components:**

Use \`list-prose\` to see all options, including:

📝 **Content**:
- Headings, paragraphs, lists
- Blockquotes, callouts, alerts
- Tables, description lists

💻 **Code Display**:
- Code blocks with syntax highlighting
- Inline code
- Code groups (tabs)
- Copy button built-in

🎨 **Interactive**:
- Tabs, accordion
- Collapsible sections
- Details/summary

📊 **Diagrams**:
- Mermaid diagrams
- Charts and graphs
- File trees

⚡ **Special**:
- Badges, chips
- Keyboard shortcuts (kbd)
- Video embeds
- Icons

**Documentation Structure:**

\`\`\`markdown
---
title: Component Name
description: Brief description
---

# Component Name

Brief overview paragraph.

## Installation

<prose-code-group>
  <prose-code language="bash" filename="npm">
    npm install package
  </prose-code>
  <prose-code language="bash" filename="pnpm">
    pnpm add package
  </prose-code>
</prose-code-group>

## Usage

<prose-callout type="info">
  Important usage note
</prose-callout>

<prose-code language="vue">
  <!-- Component example -->
</prose-code>

## API

<prose-table>
  <!-- Props, events, slots -->
</prose-table>
\`\`\`

**Best Practices:**

1. **Structure**:
   - Start with clear overview
   - Include installation instructions
   - Show basic usage first
   - Document all props/API
   - Add examples for common use cases

2. **Code Examples**:
   - Use prose-code-group for multiple options
   - Include syntax highlighting
   - Show complete, working examples
   - Add comments for clarity

3. **Visual Aids**:
   - Use callouts for important notes
   - Add diagrams for complex concepts
   - Include screenshots when helpful
   - Use tables for API documentation

4. **Navigation**:
   - Clear heading hierarchy
   - Table of contents
   - Internal links
   - Related pages links

**Getting Started:**

1. List prose components: \`list-prose\`
2. Get specific prose details: \`get-prose({ componentName: "code" })\`
3. View example docs: \`get-documentation-page({ path: "/components/button" })\`

What type of documentation are you creating? I'll help you choose the right prose components and structure.`,
          },
        },
      ],
    };
  },
});
