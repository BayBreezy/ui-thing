---
title: Login
description: Login page layouts for every product, from a simple form to split screens with a quote, product mockup or rotating highlights, plus social and passwordless sign in.
---

Every login block uses `vee-validate` with `yup` and the `UiVeePasswordInput` show and hide toggle. Replace the submit handler with your auth provider and surface server errors with `setErrors`.

## Simple

A minimal form with email and password. The forgot password link sits beside the password field, and a create account link closes the form.

:BlockShowcase{blockPath="Login/BlockLoginSimple" containerClass="h-screen" component="BlockLoginSimple" iframeHeight="600px"}

## Simple w/ Card

The same form inside a card on a soft background, with a logo header and a footer link. A good fit when the login sits on a patterned or tinted page.

:BlockShowcase{blockPath="Login/BlockLoginSimpleCard" containerClass="h-screen" component="BlockLoginSimpleCard" iframeHeight="650px"}

## Remember Me

Logo header with a remember me checkbox and the forgot password link on the same row.

:BlockShowcase{blockPath="Login/BlockLoginSimpleRemember" containerClass="h-screen" component="BlockLoginSimpleRemember" iframeHeight="650px"}

## Minimal Card

A centered card with a circular icon header. Suits admin panels and internal dashboards.

:BlockShowcase{blockPath="Login/BlockLoginMinimal" containerClass="h-screen" component="BlockLoginMinimal" iframeHeight="650px"}

## Social

Email and password first, then Google and GitHub side by side below a divider.

:BlockShowcase{blockPath="Login/BlockLoginSimpleSocial" containerClass="h-screen" component="BlockLoginSimpleSocial" iframeHeight="700px"}

## Centered Social

Social first. Google and GitHub buttons sit above the form, with a logo header and a free trial link.

:BlockShowcase{blockPath="Login/BlockLoginCentered" containerClass="h-screen" component="BlockLoginCentered" iframeHeight="750px"}

## Card w/ Social Row

A card on a grid pattern with three icon-only social buttons in a row, an email divider, and a terms notice below the card.

:BlockShowcase{blockPath="Login/BlockLoginCardSocial" containerClass="h-screen" component="BlockLoginCardSocial" iframeHeight="800px"}

## Header Navigation

A top bar with logo, links and a sign up button above a centered form. Use it when the login page is part of your marketing site.

:BlockShowcase{blockPath="Login/BlockLoginHeaderNav" containerClass="h-screen" component="BlockLoginHeaderNav" iframeHeight="750px"}

## Magic Link

Passwordless sign in. Email only, with a passkey option and a confirmation screen that has a resend cooldown.

:BlockShowcase{blockPath="Login/BlockLoginMagicLink" containerClass="h-screen" component="BlockLoginMagicLink" iframeHeight="650px"}

## Split w/ Image

Form on the left and a full height image with a caption on the right. The image hides on small screens.

:BlockShowcase{blockPath="Login/BlockLoginSimpleSocialImage" containerClass="h-screen" component="BlockLoginSimpleSocialImage" iframeHeight="750px"}

## Split w/ Quote

Form on the left and a brand colored panel on the right with a customer quote, avatar and role.

:BlockShowcase{blockPath="Login/BlockLoginSplitQuote" containerClass="h-screen" component="BlockLoginSplitQuote" iframeHeight="750px"}

## Split w/ Mockup

Form on the left and a partial dashboard preview on the right, built from plain cards and bars so it follows your theme.

:BlockShowcase{blockPath="Login/BlockLoginSplitMockup" containerClass="h-screen" component="BlockLoginSplitMockup" iframeHeight="800px"}

## Split w/ Carousel

Form on the left and a panel that cycles through product highlights every few seconds. It pauses on hover and has clickable dots.

:BlockShowcase{blockPath="Login/BlockLoginSplitCarousel" containerClass="h-screen" component="BlockLoginSplitCarousel" iframeHeight="750px"}
