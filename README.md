# 1Fi Marketplace

A React Native marketplace experience for the 1Fi app. Users can browse products, choose a variant, review no-cost EMI options, and confirm an application through a summary bottom sheet.

## Features

- Three Shop sections: Top Brands, Nearby Stores, and 1Fi Marketplace
- Eight products across laptops, phones, TVs, watches, tablets, headphones, gaming, and cameras
- Multiple variants with variant-specific pricing
- Dynamic price and monthly EMI calculation
- Interactive 3, 6, and 12-month no-cost EMI plans
- Confirmation bottom sheet with product, variant, price, and EMI summary
- Confirm and Apply success feedback
- Remote product images with an offline-friendly fallback state
- Responsive layout for web and mobile
- 1Fi purple visual theme with reusable product card UI

## Tech Stack

- Expo SDK 57
- React 19
- React Native 0.86
- Expo Router
- JavaScript and TypeScript

## Getting Started

### Requirements

- Node.js 22.13 or newer
- npm
- Expo Go, an Android emulator, an iOS simulator, or a web browser

### Install and run

```bash
npm install
npx expo start
```

Use the Expo CLI shortcuts to open the app on Android, iOS, or web.

### Run on web

```bash
npm run web
```

### Validate the production web bundle

```bash
npx expo export --platform web
```

## Project Structure

```text
src/
   app/
      _layout.tsx       # Expo Router layout
      index.tsx         # Shop route
      explore.tsx       # Existing Explore route
   components/
      app-tabs.tsx      # Native tab navigation
      app-tabs.web.tsx  # Web tab navigation
   screens/
      ShopScreen.js     # Marketplace UI, state, modal, and styles
   constants/
      theme.ts          # Shared theme tokens
   hooks/              # Theme and color-scheme hooks
assets/               # App icons and static assets
```

## Marketplace Data and State

Product data is kept in the `MOCK_PRODUCTS` structure inside `ShopScreen.js`, separate from the rendered UI. Each product contains variants, variant prices, and available EMI durations.

The screen maintains selection state per product:

- `variantId` stores the selected variant
- `plan` stores the selected EMI duration
- Monthly payment is calculated from the selected variant price and plan

The mock data can be replaced with an API service later without changing the product card interaction flow.

## User Flow

1. Open the Shop screen.
2. Select the `1Fi Marketplace` tab.
3. Choose a product variant.
4. Select a no-cost EMI duration.
5. Confirm the updated price and monthly payment.
6. Press `Proceed with this plan`.
7. Review the bottom-sheet summary.
8. Press `Confirm & Apply` or close the sheet with `X`.

## Assignment Screenshots

The following screenshots show the implemented marketplace flow:

### Marketplace screen

<img src="docs/screenshots/marketplace.png" alt="1Fi Marketplace" width="280" />

### Dynamic variant and EMI selection

<img src="docs/screenshots/varient.png" alt="Variant and EMI selection" width="280" />

### Confirmation bottom sheet

<img src="docs/screenshots/emi.png" alt="Confirmation bottom sheet" width="280" />

### Success confirmation

<img src="docs/screenshots/final.png" alt="Success confirmation" width="280" />

For ed starter content.

## Validation

The current implementation has been validated with:

```bash
npx expo export --platform web
```

The web bundle completes successfully and the Shop route is available at `/`.
