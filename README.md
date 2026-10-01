# SnapShop Mobile App

SnapShop is a simple e-commerce mobile app built with React Native (Expo) and TypeScript. It talks to the SnapShop REST API.

- Download the Android app (APK): https://drive.google.com/file/d/1bOYg3l15nEIshDoBHJ8y5NPhz9WkX3az/view?usp=sharing
- Live backend API: YOUR_BE_URL
- Backend repository: https://github.com/anjeetsingh7155/Snap_Shop_BE.git

The backend runs on a free hosting plan, so the first request after a quiet period (for example the first login) can take a while.

## Features

- Register, login and logout
- Product list, product details, search and category filter
- Cart with add, remove, increase or decrease quantity and total price
- Checkout with Cash on Delivery only, place order and order success screen
- My orders, order details and order status
- Profile screen with logout
- Login token is saved safely on the phone (expo-secure-store)

## Screens

Login, Register, Home, Product Details, Cart, Checkout, Order Success, My Orders, Order Details and Profile.

Flow: Login > Home > Product Details > Cart > Checkout > Order Success > My Orders > Order Details > Profile.

## Tech stack

- React Native 0.86 with Expo SDK 57 and TypeScript
- React Navigation (native stack and bottom tabs)
- Axios for the API calls
- expo-secure-store, react-native-svg, @expo/vector-icons

## Project structure

```
src/
  api/          axios client and API functions (auth, products, cart, orders)
  components/   Button, Input, Logo, AppName, ProductCard, StatusBadge
  context/      AuthContext (login state)
  navigation/   navigators and screen types
  screens/      all app screens
  theme/        colors
  types/        shared types
  App.tsx       app entry
```

## Setup (run the app in development)

Requirements: Node.js (development used version 22) and the Expo Go app on your phone.

1. Clone the repository and install packages:
   ```
   git clone https://github.com/anjeetsingh7155/Snap_Shop_FE.git
   cd Snap_Shop_FE
   npm install
   ```
2. Create a file named `.env` in the project folder with the backend address. The live backend can be used directly:
   ```
   EXPO_PUBLIC_API_URL=YOUR_BE_URL
   ```
   To use a backend running on your own computer, use your computer's Wi-Fi address instead, for example `http://192.168.1.8:5000`. Your phone and computer must be on the same Wi-Fi.
3. Start the app:
   ```
   npx expo start -c
   ```
4. Scan the QR code with Expo Go (Android) or the Camera app (iOS).

After changing `.env`, stop the server and start it again with `npx expo start -c`.

## Build the Android APK

```
npx eas-cli@latest build --profile preview --platform android
```

The `preview` profile in `eas.json` builds an installable APK and sets `EXPO_PUBLIC_API_URL` to the live backend. When the build finishes, EAS gives a download link.

## How to test the app

1. Open the app and tap Register to create an account (name, email and a password of at least 6 characters), then log in.
2. On Home, browse products, search by name and filter by category.
3. Open a product, choose a quantity and tap Add to Cart.
4. Open the Cart tab, change quantities and go to Checkout.
5. Enter the delivery address and phone, then tap Place Order (Cash on Delivery).
6. Open My Orders and tap an order to see its details and status.
7. Use the Profile tab to logout.

## Notes

- Sample products come from the backend seed script (see the backend repository).
- Payment gateway integration is not included. Only Cash on Delivery is supported.
- New orders have the status Pending. The app shows the status but does not change it.
