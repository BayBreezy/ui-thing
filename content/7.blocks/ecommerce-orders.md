---
title: Ecommerce - Orders
description: "Order blocks with a confirmation page and confetti burst, a tracking timeline, a searchable order history table, order history cards with tabs, an order detail page and a return request form."
---

The order blocks take typed props for the order data. Order history blocks take an `orders` array with `id`, `placedOn`, `status`, `total`, `address` and `items`, and the detail, tracking and confirmation blocks take a single `order` object. Search, filters, tabs, sorting and the return form all run on the client, so swap the sample data and the submit handlers for your own API.

The orders and customers are fictional and the photos are placeholders from Unsplash. Status colors come from a small `statuses` map in each block, so rename or add your own states there.

## Style One

Order confirmation with an animated check and a short confetti burst that is skipped for people who prefer reduced motion. Includes the order summary, delivery and payment details and a what happens next row.

:BlockShowcase{blockPath="Ecommerce/Orders/BlockOrders1" component="BlockOrders1" iframeHeight="1000px"}

## Style Two

Tracking page with a vertical timeline for placed, packed, shipped, out for delivery and delivered. Shows the carrier, a copy button for the tracking number, the estimated delivery date and recent carrier scans.

:BlockShowcase{blockPath="Ecommerce/Orders/BlockOrders2" component="BlockOrders2" iframeHeight="1100px"}

## Style Three

Order history table with search by order number or product, a status filter, a sortable date column, stacked product thumbnails, status badges, view and reorder actions and pagination.

:BlockShowcase{blockPath="Ecommerce/Orders/BlockOrders3" component="BlockOrders3" iframeHeight="640px"}

## Style Four

Order history as cards. Tabs filter into all, in progress, delivered and returned or cancelled, and each card shows its items with buy again, track, invoice and return actions.

:BlockShowcase{blockPath="Ecommerce/Orders/BlockOrders4" component="BlockOrders4" iframeHeight="1000px"}

## Style Five

Order detail page with breadcrumbs, a status badge, a delivery progress bar, line items, totals, the shipping address and payment details.

:BlockShowcase{blockPath="Ecommerce/Orders/BlockOrders5" component="BlockOrders5" iframeHeight="920px"}

## Style Six

Return request form. Choose items and quantities, a reason and condition, and a refund method, with a live refund estimate and validation. Submitting shows a confirmation with next steps.

:BlockShowcase{blockPath="Ecommerce/Orders/BlockOrders6" component="BlockOrders6" iframeHeight="1150px"}
