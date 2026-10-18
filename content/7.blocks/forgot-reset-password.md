---
title: Forgot & Reset Password
description: Password recovery blocks including forgot password forms, an interactive email flow, success confirmations, reset forms with a live requirements checklist, one time code verification and two-step verification.
---

Recovery blocks use `vee-validate` with `yup`. The reset forms use the `UiVeePasswordInput` strength meter and requirements checklist, and the schema mirrors the checklist so the two never disagree.

## Forgot Password

Email form for password recovery on a grid background, with a key icon and a back to log in link.

:BlockShowcase{blockPath="ForgotPassword/BlockForgotPassword" containerClass="h-screen" component="BlockForgotPassword" iframeHeight="650px"}

## Forgot Password in a Card

A card with an icon badge, an email field with a hint, a divider and a sign in link.

:BlockShowcase{blockPath="ForgotPassword/BlockForgotPassword2" containerClass="h-screen" component="BlockForgotPassword2" iframeHeight="700px"}

## Forgot Password Split

Email form on the left and a panel on the right that explains the three recovery steps. The panel hides on small screens.

:BlockShowcase{blockPath="ForgotPassword/BlockForgotPassword3" containerClass="h-screen" component="BlockForgotPassword3" iframeHeight="750px"}

## Forgot Password Flow

One interactive card. Submitting the email swaps the card to a check your inbox state in place, with a resend cooldown and a use a different email action.

:BlockShowcase{blockPath="ForgotPassword/BlockForgotPasswordFlow" containerClass="h-screen" component="BlockForgotPasswordFlow" iframeHeight="650px"}

## Check Your Inbox

The confirmation page shown after the email is sent. It shows the address, an open email app button, and a resend link with a cooldown.

:BlockShowcase{blockPath="ForgotPassword/BlockForgotPasswordSuccess" containerClass="h-screen" component="BlockForgotPasswordSuccess" iframeHeight="650px"}

## Reset Password

New and confirm password fields with a strength meter and requirements checklist, on a grid background.

:BlockShowcase{blockPath="ResetPassword/BlockResetPassword" containerClass="h-screen" component="BlockResetPassword" iframeHeight="850px"}

## Reset Password in a Card

A card version with a shorter checklist and a back to log in link.

:BlockShowcase{blockPath="ResetPassword/BlockResetPassword2" containerClass="h-screen" component="BlockResetPassword2" iframeHeight="800px"}

## Password Reset Confirmation

Shown after the password is changed. A success icon, a continue to log in button and a contact support link.

:BlockShowcase{blockPath="ResetPassword/BlockResetPasswordSuccess" containerClass="h-screen" component="BlockResetPasswordSuccess" iframeHeight="600px"}

## OTP Verification

Six digit code verification with `UiVeePinInput` on a grid background, with a resend link.

:BlockShowcase{blockPath="OTP/BlockOTPVerification" containerClass="h-screen" component="BlockOTPVerification" iframeHeight="700px"}

## OTP Verification in a Card

A card version with a lock icon, instructions and a resend option below a divider.

:BlockShowcase{blockPath="OTP/BlockOTPVerification2" containerClass="h-screen" component="BlockOTPVerification2" iframeHeight="700px"}

## Two-Step Verification

Let users choose between email and SMS for their verification code. Selectable cards with check indicators reveal the matching field.

:BlockShowcase{blockPath="ForgotPassword/BlockTwoStepVerification" containerClass="h-screen" component="BlockTwoStepVerification" iframeHeight="800px"}
