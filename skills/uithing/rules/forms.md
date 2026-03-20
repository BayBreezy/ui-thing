# Forms

## Core Rules

- Prefer `app/components/Ui/Vee/**` wrappers for form work.
- Use `vee-validate` patterns already established in the repo.
- Use `app/composables/useFormField.ts` for reusable field state behavior.
- Keep label, hint, error, and disabled semantics consistent with existing wrappers.

## Control Selection

- Use base `Ui*` controls when the task is plain UI composition.
- Use `Ui/Vee/*` wrappers when the task is integrated form validation and field state.

## Validation State

- Keep validation messaging in the existing wrapper structure.
- Do not invent ad hoc error-state markup when a Vee wrapper already exists.

## Conversion Guidance

When converting React forms into UI Thing:

- map form controls to existing `Ui*` or `Ui/Vee/*` components first
- preserve field grouping, labels, descriptions, and messages
- convert React controlled state into Vue refs and `v-model`
