import { z } from "zod";

export default defineMcpPrompt({
  description: "Review and improve accessibility of UI Thing implementations",
  inputSchema: {
    scope: z
      .enum(["component", "page", "form", "navigation", "modal"])
      .describe("What to review for accessibility"),
  },
  handler: async ({ scope }) => {
    const guidelines: Record<string, string> = {
      component: `**Component Accessibility:**

1. **Semantic HTML**: Use appropriate elements (button, nav, aside, etc.)
2. **ARIA Attributes**: label, describedby, live regions
3. **Keyboard Navigation**: Tab, Arrow keys, Enter, Escape
4. **Focus Management**: Visible focus indicators, logical tab order
5. **Color Contrast**: WCAG AA minimum (4.5:1 for text)`,

      page: `**Page Accessibility:**

1. **Heading Hierarchy**: Proper h1-h6 structure
2. **Landmark Regions**: header, nav, main, aside, footer
3. **Skip Links**: "Skip to main content" for keyboard users
4. **Page Title**: Descriptive and unique
5. **Language**: Set lang attribute on html element`,

      form: `**Form Accessibility:**

1. **Labels**: Every input has associated label
2. **Error Messages**: aria-describedby links to error text
3. **Required Fields**: Marked visually and with aria-required
4. **Validation**: Clear error messages, focus on first error
5. **Field Groups**: Use fieldset and legend for related fields`,

      navigation: `**Navigation Accessibility:**

1. **Keyboard Support**: Full keyboard navigation
2. **ARIA Roles**: navigation, menu, menuitem, menubar
3. **Current Page**: aria-current="page"
4. **Mobile Menu**: Proper focus trap when open
5. **Breadcrumbs**: aria-label="breadcrumb"`,

      modal: `**Modal Accessibility:**

1. **Focus Trap**: Keep focus within modal
2. **Close Methods**: Escape key, close button, backdrop click
3. **Initial Focus**: Focus first interactive element or close button
4. **Return Focus**: Restore focus to trigger after close
5. **ARIA**: role="dialog", aria-modal="true", aria-labelledby`,
    };

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `You are reviewing ${scope} accessibility following WCAG 2.1 AA standards.

${guidelines[scope]}

**UI Thing Components Already Include:**

✅ Proper ARIA attributes
✅ Keyboard navigation patterns
✅ Focus management
✅ Accessible color contrast
✅ Screen reader support

**Review Checklist:**

1. **Structure**
   - Semantic HTML elements used correctly
   - Heading hierarchy is logical
   - Landmark regions properly defined

2. **Keyboard**
   - All interactive elements reachable via keyboard
   - Logical tab order (top to bottom, left to right)
   - Visible focus indicators
   - No keyboard traps (except intentional modals)

3. **Screen Readers**
   - All content has text alternatives
   - ARIA labels provide context
   - Live regions announce dynamic changes
   - Error messages are announced

4. **Visual**
   - Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
   - Focus indicators visible
   - No reliance on color alone for meaning
   - Sufficient touch target size (44x44px minimum)

5. **Testing Tools**
   - Run axe DevTools
   - Test with keyboard only
   - Test with screen reader (NVDA/JAWS/VoiceOver)
   - Check Lighthouse accessibility score

**Common Issues to Check:**

❌ Missing alt text on images
❌ Form inputs without labels
❌ Buttons without accessible names
❌ Low color contrast
❌ Missing focus indicators
❌ Incorrect heading levels

**UI Thing Tools:**

- \`get-component\` - Review component source for ARIA
- \`get-documentation-page\` - Read accessibility notes
- Components follow Reka UI patterns (fully accessible)

Share the code and I'll review it for accessibility issues and suggest improvements.`,
          },
        },
      ],
    };
  },
});
