# Component Composition

## Core Rules

- Use existing `Ui*` component families first.
- Prefer composition over recreating primitives with custom markup.
- Preserve wrapper boundaries and data-slot contracts.
- Keep accessibility and Reka primitive behavior intact.

## Existing UI First

Before writing a styled `div`, check whether UI Thing already has a fitting family:

- overlays: `UiDialog*`, `UiAlertDialog*`, `UiSheet*`, `UiDrawer*`
- menus: `UiDropdownMenu*`, `UiContextMenu*`, `UiMenubar*`
- info overlays: `UiPopover*`, `UiTooltip*`, `UiHoverCard*`
- nav/data display/layout families

If a close family exists, compose it before inventing a new wrapper.

## Full Family Composition

When a family expects structure, preserve it:

- title/description in dialog-like components
- trigger/content families for overlays
- item/group patterns for menus and select-like components
- full card composition when Card is the chosen pattern

## Floating Surfaces

- Preserve portals, overlays, focus behavior, and primitive props.
- Do not strip collision, side, align, or animation behavior during cleanup.
- If a wrapper is just passing through primitive behavior plus styles, keep it that way.

## Source-Copy Mindset

UI Thing components are meant to be copied and edited. Favor readable, direct component structure over over-abstracting small wrappers.
