# 🔥 Love n' Grill — Expo React Native App

A complete mobile-first restaurant ordering app.  
Orders via WhatsApp · Call button · Native bottom navigation · Live cart · Animated splash.

---

## 📁 Project Structure

```
LoveNGrill/
├── App.js                          ← Root: navigation + splash screen
├── app.json                        ← Expo config (name, icon, package ID)
├── package.json                    ← Dependencies
├── eas.json                        ← EAS Build profiles (APK / AAB)
├── babel.config.js
├── assets/
│   ├── icon.png                    ← App icon (1024×1024) — replace with real logo
│   ├── adaptive-icon.png           ← Android adaptive icon
│   ├── splash.png                  ← Splash screen image
│   └── favicon.png
└── src/
    ├── data/
    │   └── menu.js                 ← ⭐ All menu items + colors + constants
    ├── utils/
    │   ├── CartContext.js          ← Global cart state (React Context)
    │   └── helpers.js              ← WhatsApp URL builder, call, maps
    ├── screens/
    │   ├── HomeScreen.js           ← Landing: hero, popular, categories
    │   ├── MenuScreen.js           ← Full menu: search, filter, sections
    │   ├── CartScreen.js           ← Cart: bill summary, WhatsApp order
    │   └── InfoScreen.js           ← Hours, location, contact, about
    └── components/
        ├── MenuItemCard.js         ← Reusable menu item with +/- qty
        ├── CartRibbon.js           ← Animated ribbon above bottom nav
        └── FloatingBubbles.js      ← Fixed WhatsApp + Call FABs
```

---

## ⚙️ Step 1 — Prerequisites

Install these on your computer:

| Tool | Download |
|------|----------|
| Node.js (v18+) | https://nodejs.org |
| Git | https://git-scm.com |
| Expo CLI | `npm install -g expo-cli` |
| EAS CLI | `npm install -g eas-cli` |

---

## 🚀 Step 2 — Run the App Locally

```bash
# 1. Enter project folder
cd LoveNGrill

# 2. Install dependencies
npm install

# 3. Start Expo dev server
npx expo start

# 4. Scan the QR code with:
#    Android: Expo Go app (from Play Store)
#    iOS:     Camera app
```

---

## 🔧 Step 3 — Customize Before Building

### 3a. Set your WhatsApp number
Open `src/data/menu.js` and change line 3:
```js
export const WHATSAPP_NUMBER = '919876543210'; // ← your country code + number
```

### 3b. Update restaurant info
In `src/data/menu.js`, update:
```js
export const RESTAURANT_NAME    = "Love n' Grill";
export const RESTAURANT_ADDRESS = 'Sector 14, Gurugram, Haryana – 122001';
export const RESTAURANT_PHONE   = '+919876543210';
```

### 3c. Update menu items
Edit the `MENU` array in `src/data/menu.js`.  
Each item has: `id`, `category`, `name`, `desc`, `price`, `veg`, `popular`, `emoji`.

### 3d. Replace app icons
Replace these files with your actual logo:
- `assets/icon.png` — 1024×1024 px, no transparency, your logo on white/brand bg
- `assets/adaptive-icon.png` — same, used for Android adaptive icons
- `assets/splash.png` — shown on launch, any size (recommended: 1242×2436)

### 3e. Change app package name
In `app.json`, change both:
```json
"bundleIdentifier": "com.yourrestaurant.app",
"package": "com.yourrestaurant.app"
```

---

## 📦 Step 4 — Build APK (for direct install / testing)

### 4a. Create an Expo account (free)
```
https://expo.dev/signup
```

### 4b. Log in via CLI
```bash
eas login
```

### 4c. Configure the project
```bash
eas build:configure
# Choose: Android
# This creates/updates eas.json
```

### 4d. Build the APK
```bash
eas build --platform android --profile preview
```
- This builds in the **cloud** — no Android SDK needed on your machine
- Takes ~5–10 minutes
- You'll get a **download link** for the `.apk` file
- Install it directly on any Android device

---

## 🏪 Step 5 — Build AAB for Play Store

Google Play requires a signed **App Bundle (.aab)**, not a plain APK.

```bash
eas build --platform android --profile production
```

- Builds a `.aab` file
- EAS manages signing automatically (first build creates a keystore)
- **IMPORTANT:** Download and save your keystore from the EAS dashboard — you need it for all future updates

---

## 📤 Step 6 — Upload to Play Store

1. Go to **Google Play Console**: https://play.google.com/console
2. Create a new app → fill in app details
3. Go to **Production** → **Create new release**
4. Upload the `.aab` file from Step 5
5. Fill in release notes
6. **Review and Roll out**

Play Store review takes 1–3 days for a new app.

---

## 🔄 Step 7 — Update Menu Without Rebuilding

To update menu items **without** releasing a new app version:

### Option A — Quick (works now)
Edit `src/data/menu.js` and rebuild with `eas build`.

### Option B — Firebase (recommended for long term)
1. Create a free Firebase project at https://console.firebase.google.com
2. Add Firestore database
3. Install: `npm install @react-native-firebase/app @react-native-firebase/firestore`
4. Move `MENU` array to Firestore collection
5. Fetch on app start — menu updates instantly without a new build

---

## 🐛 Bugs Fixed vs Original Website

| Bug | Fix Applied |
|-----|-------------|
| Cart ribbon stuck / not showing | `Animated.spring` translateY + proper z-index, renders above nav bar |
| WhatsApp bubble hidden | `FloatingBubbles` uses absolute position with `bottomOffset` above tab bar height |
| Call bubble hidden | Same fix as WhatsApp bubble |
| WhatsApp ordering broken | `encodeURIComponent()` on full cart message, opens `wa.me` deep link natively |

---

## 📱 App Features

- **Splash screen** with animated logo pop-in
- **Home**: hero banner, stats (rating/delivery/fee), popular horizontal scroll, category grid
- **Menu**: sticky search bar, horizontal category filter tabs, grouped sections, veg/non-veg badges, bestseller labels, +/- quantity controls
- **Cart**: item list, bill breakdown with 5% tax, special instructions, WhatsApp + Call order buttons
- **Info**: contact buttons, opening hours, location with Maps link, delivery info, about section
- **Floating FABs**: WhatsApp chat + Call buttons, always visible, spring-animated in
- **Cart ribbon**: slides up on Menu screen when cart has items

---

## 🆘 Common Issues

**`npm install` fails:**  
Make sure Node.js ≥ 18 is installed: `node --version`

**Expo Go won't scan:**  
Make sure phone and computer are on the same Wi-Fi network.

**EAS build fails with "not logged in":**  
Run `eas login` again.

**WhatsApp not opening on device:**  
Make sure WhatsApp is installed. The app will show an Alert if it can't open.

**Icons look blurry:**  
Replace placeholder assets with high-res versions (1024×1024 for icon).
