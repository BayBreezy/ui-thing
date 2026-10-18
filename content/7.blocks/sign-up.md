---
title: Sign Up
description: Sign up page layouts from a simple form to multi-step flows with progress, split screens with a quote, mockup or carousel, and social sign in with a live password strength meter.
---

Every sign up block uses `vee-validate` with `yup` and the `UiVeePasswordInput` show and hide toggle. Replace the submit handler with your auth provider and surface server errors with `setErrors`.

## Background patterns

Some blocks use a CSS background pattern. [bg.ibelick.com](https://bg.ibelick.com/) is a good source for more. Copy them and change them to fit your brand.

## Simple

A minimal form with name, email and password on a soft dotted background.

:BlockShowcase{blockPath="SignUp/BlockSignUp" containerClass="h-screen" component="BlockSignUp" iframeHeight="650px"}

## Card

The same form inside a card, with a logo header, a log in footer and a terms notice below.

:BlockShowcase{blockPath="SignUp/BlockSignUpCard" containerClass="h-screen" component="BlockSignUpCard" iframeHeight="750px"}

## Password Meter

A strength bar and requirements checklist that update as the user types. The yup schema mirrors the checklist so the two never disagree.

:BlockShowcase{blockPath="SignUp/BlockSignUpPasswordMeter" containerClass="h-screen" component="BlockSignUpPasswordMeter" iframeHeight="800px"}

## Minimal Card

A centered card with a circular icon header and a confirm password field.

:BlockShowcase{blockPath="SignUp/BlockSignUpMinimal" containerClass="h-screen" component="BlockSignUpMinimal" iframeHeight="800px"}

## Social

Name, email and password first, then Google and GitHub side by side below a divider, on a faded grid.

:BlockShowcase{blockPath="SignUp/BlockSignUpSocial" containerClass="h-screen" component="BlockSignUpSocial" iframeHeight="800px"}

## Centered Social

Social first. Google and GitHub buttons sit above the form, with a logo header and an optional product updates checkbox.

:BlockShowcase{blockPath="SignUp/BlockSignUpCentered" containerClass="h-screen" component="BlockSignUpCentered" iframeHeight="850px"}

## Header Navigation

A top bar with logo, links and a log in button above a centered form. Use it when sign up is part of your marketing site.

:BlockShowcase{blockPath="SignUp/BlockSignUpHeaderNav" containerClass="h-screen" component="BlockSignUpHeaderNav" iframeHeight="800px"}

## Multi-step with Progress

Three steps with a numbered progress indicator: account, about you, done. Each step validates only its own fields, and values are kept when the user goes back.

:BlockShowcase{blockPath="SignUp/BlockSignUpProgress" containerClass="h-screen" component="BlockSignUpProgress" iframeHeight="800px"}

## Multi-step with Sidebar

A brand sidebar lists every step with its completed state. On small screens it collapses to a progress bar. The steps cover details, workspace and inviting teammates, and the last one can be skipped.

:BlockShowcase{blockPath="SignUp/BlockSignUpSidebarProgress" containerClass="h-screen" component="BlockSignUpSidebarProgress" iframeHeight="800px"}

## Split w/ Image

Form on the left and a full height image with a caption on the right. The image hides on small screens.

:BlockShowcase{blockPath="SignUp/BlockSignUpImage" containerClass="h-screen" component="BlockSignUpImage" iframeHeight="800px"}

## Split w/ Quote

Form on the left and a brand colored panel on the right with a customer quote, rating and avatar. Includes a terms checkbox that must be accepted.

:BlockShowcase{blockPath="SignUp/BlockSignUpSplitQuote" containerClass="h-screen" component="BlockSignUpSplitQuote" iframeHeight="800px"}

## Split w/ Mockup

Form on the left and a partial app preview on the right, built from plain cards and bars so it follows your theme. A benefit list sits above the preview.

:BlockShowcase{blockPath="SignUp/BlockSignUpSplitMockup" containerClass="h-screen" component="BlockSignUpSplitMockup" iframeHeight="850px"}

## Split w/ Carousel

Form on the left and a panel that cycles through customer quotes every few seconds. It pauses on hover and has clickable dots.

:BlockShowcase{blockPath="SignUp/BlockSignUpSplitCarousel" containerClass="h-screen" component="BlockSignUpSplitCarousel" iframeHeight="800px"}
