---
title: Onboarding - Wizard
description: "Multi step wizard blocks: a horizontal stepper, a vertical stepper with descriptions, a sidebar wizard with a progress bar, a validated multi step form, a review and confirm step and a wizard in a dialog."
---

The wizard blocks cover the usual ways to split a long setup into steps. Most of them keep their values in a single `reactive` object, so the state survives going back and forward, and one uses vee-validate with a yup schema per step when you need real validation.

Everything is fictional sample content. Steppers use the Reka stepper under the hood, which handles the keyboard and `aria` attributes, and steps that are still ahead of you are disabled.

## Style One

Horizontal stepper in a card with numbered indicators that turn into check marks, back and continue buttons and a success step at the end.

:BlockShowcase{blockPath="Onboarding/Wizard/BlockWizard1" component="BlockWizard1" iframeHeight="720px"}

## Style Two

Vertical stepper on the left with a title and short description for each step, the form on the right, a progress percentage and a review step at the end.

:BlockShowcase{blockPath="Onboarding/Wizard/BlockWizard2" component="BlockWizard2" iframeHeight="760px"}

## Style Three

Full height wizard with a sidebar that has a brand, a progress bar and a step list, a main area for each step and sticky actions at the bottom. The sidebar stacks above the form on small screens.

:BlockShowcase{blockPath="Onboarding/Wizard/BlockWizard3" component="BlockWizard3" iframeHeight="700px"}

## Style Four

Multi step form with validation. One `useForm` swaps its yup schema per step, errors show under each field, Continue only moves on when the step is valid and values are kept when you go back.

:BlockShowcase{blockPath="Onboarding/Wizard/BlockWizard4" component="BlockWizard4" iframeHeight="640px"}

## Style Five

Review and confirm. Summary cards for each section with an edit link, a terms checkbox that unlocks the confirm button and a success message.

:BlockShowcase{blockPath="Onboarding/Wizard/BlockWizard5" component="BlockWizard5" iframeHeight="780px"}

## Style Six

Wizard in a dialog. A button opens a three step modal with a progress bar, skip for now and a reset when the dialog closes.

:BlockShowcase{blockPath="Onboarding/Wizard/BlockWizard6" component="BlockWizard6" iframeHeight="480px"}
