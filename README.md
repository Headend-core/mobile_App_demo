# VIBE (All-in-one hub) Mobile – Interactive HTML Prototype

Front-end-only clickable prototype of the VIBE mobile app (formerly PLAYTOP), with the same onboarding flow as the reference screen recording. Built for a management demo.

**No backend, database, API, OTP or authentication service is used. Every login/registration is simulated in the browser.**

## Run it

Double-click `index.html` (or open it in Chrome / an Android browser). No server or build step is needed.

**Opening animation:** the app starts with the VIBE intro video (`assets/video/vibe-intro.mp4`). Tap **Skip**, or press Esc/Enter, to jump straight in, and use the speaker button to turn sound on. Browsers only autoplay video when it is muted. If the video can't play, an animated VIBE logo is shown instead, and the app then opens on the Customer / LCO screen.

- On desktop, the app is shown inside a phone frame (390 × 844).
- On a phone, it fills the screen. The Android back button works, and so does **Esc** on desktop.
- Fonts load from Google Fonts when online. Offline, the app falls back to the system font and still works.

## Share it online (GitHub Pages)

1. On github.com, click **+ → New repository**. Name it `vibe-demo`, set it to **Public**, and click **Create repository**.
2. Click **uploading an existing file**. Drag in everything **inside** this folder (`index.html`, `css`, `js`, `assets`, `README.md`), not the folder itself. Then click **Commit changes**.
3. Open **Settings → Pages**. Set **Source** to "Deploy from a branch", **Branch** to `main`, and the folder to `/ (root)`. Click **Save**.
4. After 1–2 minutes, the link appears at the top of the Pages settings: `https://<your-username>.github.io/vibe-demo/`.

To update the live demo, upload the changed files again (same steps 1–2 on the existing repo). The site refreshes within a minute or two.

`index.html` loads `css/style.css` and `js/app.js` with a fresh `?v=` on every visit, so phones always get the latest version instead of an old cached copy. GitHub may cache `index.html` itself for about 10 minutes. To see an update immediately, open the link with a new ending, such as `https://<your-username>.github.io/vibe-demo/?v=2`.

## Demo flow (matches the reference video)

```
App opens on ► Choose an option: Customer | LCO | Guest ──► Continue
   ├─ LCO ──────────► Broadband | Cable TV (no "Sign up?") ──► LCO ID ─► Get OTP ─► OTP 123456
   │                    ├─ Cable TV ─► LCO Dashboard
   │                    └─ Broadband ► Broadband LCO Home (Home / Case / Customer / ☰ menu)
   │                    (first time = registered, after that = logged in)
   ├─ Guest ────────► Join as Guest (mobile only: Register first time, Login after) ─► Home
   │                    (playing a channel asks the guest to subscribe or preview)
   └─ Customer ─────► Log in / Register: Broadband | Cable TV ──► Login
                         ├─ Broadband ─► Join as Broadband User (login: mobile + OTP)
                         │                 ├─ Registered number (demo: 9000000000) ─► OTP 123456 ─► Home
                         │                 └─ New number / "New user? Register with User ID" / "Sign up?"
                         │                       └─► Register screen: User ID ─► Get OTP ─► Enter OTP ─► Registered ─► Home
                         ├─ Cable TV ──► Join as Cable User
                         │                 ├─ Registered number ─► Login with mobile only ─► Home
                         │                 └─ New number ───────► VSC field appears ─► Register (VSC + mobile, once) ─► Home
                         └─ "Sign up?" ► Registration form
```

You can go back from any screen before login to change your selection. After login, Home replaces the login screens, so Back does not return to the form.

### How each user type registers and logs in

| User type | First-time registration | After that |
|---|---|---|
| Cable TV | **VSC number** + mobile | Mobile only |
| Broadband | **User ID** + OTP (separate register screen) | Mobile + OTP |
| LCO partner | **LCO ID** + OTP | **LCO ID** + OTP |
| Guest | Mobile only | Mobile only |

**Broadband:**

> **Demo login:** mobile **`9000000000`**, OTP **`123456`**. This number is already registered, so it works straight away, even after **Reset demo registrations**.

- **Login:** the same screen as before (mobile number field). For a registered number, tapping **Login** opens an **OTP** field under the mobile number.
  - Enter `123456`. All 6 digits verify automatically, or tap **Verify & Login**.
  - **Change number** goes back to editing the mobile number.
  - **Resend OTP** is enabled after 30 s.
- **Registering** opens a separate screen that asks only for the **Broadband User ID**, with no mobile field. It opens from "New user? Register with User ID", from "Sign up?", or when Login is tapped with an unregistered number.
  - **Get OTP** "sends" the OTP to the registered mobile, shown masked as `+91 ••••• •0000`.
  - Enter `123456` to register. A wrong OTP shakes the field. **Change User ID** goes back to the first step.
  - Every User ID is linked to the demo mobile **9000000000**. After registering, log in with that number. The success screen and Profile show the most recently registered User ID.
  - "Already registered? Login with mobile number" returns to the login screen.
- No SMS is ever sent. The demo OTP is always `123456`, and it also appears in a toast and under the OTP field.

**LCO partner (LCO ID + OTP, no sign-up):**
- LCO → **Broadband** or **Cable TV** → Login. There is no "Sign up?" option for LCO.
- The next screen asks only for the **LCO ID**, for example `LCO1234` (3 letters + 3–5 digits). There is no mobile field. The chosen service shows under "Partner / LCO Login".
- **Get OTP** sends the OTP to the registered mobile (`+91 ••••• •0000`). Enter `123456`.
- The first time, an LCO ID is registered ("Partner registration successful"). After that, the same ID logs in ("Welcome back, Partner").
- **Continue to Dashboard** opens the **LCO Dashboard** for Cable TV, or the **Broadband LCO Home** for Broadband (both below).

**Cable TV and Guest (mobile):**
- Guests never need a VSC number. The button reads **Register** for a new number and **Login** for one that's already registered.
- The Cable TV login screen asks only for the **mobile number**, with no OTP.
- If the number hasn't been registered for Cable TV, the VSC number field opens, and the user registers once.
- From then on, that number logs in with **mobile only**. The hint says, for example, "✓ Registered Cable TV user – no VSC number needed".
- "New user? Register with …" and "Already registered? Login with mobile number" switch between the two forms.
- Registrations are kept separately per service. A number registered as a Guest still needs a VSC number the first time it's used for Cable TV.
- Registered numbers are saved in this browser (`localStorage`), so they still work after a reload. No server is involved.
- To show the first-time registration again, use **Profile → Reset demo registrations**.

## Broadband LCO Home (LCO → Broadband → LCO ID → OTP)

Layout from the broadband LCO app screenshot, in VIBE colours. All customers, cases, staff names and numbers are **made up for the demo**. The bottom bar has **Home**, **Case**, **Customer** and **Menu (☰)**.

```
Home
 ├─ Header: partner name, LCO ID · Broadband, Notifications (demo), Logout
 ├─ ₹ wallet pill ─► Wallet Top Up        Watch OTT ─► live TV with "Go Back to LCO"
 ├─ Search 'Username' ─► Customer list with the search box focused
 ├─ Active 200 / Inactive 1 / Online 196 / Expired 150 ─► matching Customer list
 ├─ Customer ─► Customer list   Complaints ─► Case Management (All)   Unassigned ─► Case Management (Unassigned)
 ├─ Expiring soon: Day / Week / Month count ─► tap the ring ─► Upcoming Renewal list
 └─ Top Up · Payment (demo) · OTT Commission · Report (demo) · Available Plan · Profile
Case ─► "Case Management": tabs Assigned / Unassigned / Completed / All, "My Case" tick box
 ├─ case card: ticket no, customer, user name (copy), assigned to, category, date, status
 ├─ 👁 ─► case details: Assign to me ─► Start work (Work In Progress) ─► Mark Completed
 └─ + button ─► Customer (─► Customer list) | New Case (pick customer + category ─► goes to Unassigned)
Customer ─► tabs All / Active / Inactive / Suspended, search by User Name, A–Z index on the right
 ├─ card: online dot, user name, status (New - Active / Active / Inactive / Suspended / Expired), mobile, OTT, icons
 ├─ ⚙ ─► card selected; bottom bar shows the user name + Recharge / Invoice (⚙ again = unselect)
 │   ├─ Recharge ─► "Package Renew": 6 broadband plans (₹, speed, days, OTT app tiles) ─► Subscribe Now
 │   │               ─► confirm ─► simulated payment ─► plan + validity updated, status Active
 │   └─ Invoice ──► pop-up invoice for the current plan (amount, GST 18%, total; Download PDF is a demo)
 ├─ ⓘ ─► "Customer Details": name, user name, online, status, Activation Date, Balance, Internet Plan
 │        (speed, valid till), OTT Plan, Contact Details (Call / Email / Address toasts)
 └─ + button ─► "Create Customer": Title, Name*, Mobile*, User Name*, Email, Telephone, CAF Number,
                GST Number, Aadhaar Card Number ─► Save ─► new customer (New - Active) highlighted in the list
Menu (☰) ─► Management: Top Up, Report Details (demo), Available Plan
            Customer: Active / Inactive / Expired / Online Customers, Upcoming Renewal, Outstanding Collection (demo)
            Settings: Profile, Change Password (demo), Transaction History (= wallet history), Subscriber Report (demo)
```

The dashboard counts are demo totals; the lists show a sample ("Showing 12 of 200 in this demo"). New customers and cases are kept only until the page is reloaded.

## LCO Dashboard (Cable TV LCO login)

The layout follows the LCO app screenshot, in VIBE colours. All people, VC/SMS/STB numbers and mobile numbers are **made up for the demo**.

- **Top:** Dashboard, **Search**, Refresh (reloads with a toast) and **Logout**. Below that, the **Watch OTT** and **Switch Partner** (demo) pills.
  - **Search** opens a **Search Subscriber** pop-up: Search By (All / Active / Deactive), Vc No / Mobile No / Sms Id + search box, subscriber cards (tap → Subscriber), and **Close**.
  - **Watch OTT** (also on Profile) opens the live TV guide (Home) with a **Go Back to LCO** button next to the TV button, which returns to the LCO screen you came from.
- **Partner:** TECHNICAL/ HEADEND KOLKATA- Site 1, with the logged-in LCO ID and service, and the **Wallet balance** (₹ 3708.83).
- **STB tiles:** **STB In Stock 107**, **Active STB 145**, **DA STB 19**. All three can be tapped.
- **Cards:** Subscribers Due For Recharge (Manual / Auto, Till Today / Till Tomorrow), Last Kitty Recharge, and Complaints (Total / Pending / Closed). Then DPO Pack Penetration, + Register Guest Customer, Cable / OTT Subscribers, CATV / OTT Wallet Top Up, and OTT Commission.
- **Bottom bar:** Dashboard, Subscribers and **Profile**. The Subscribers (people) icon opens a pop-up with two options: **Cable Subscribers** (→ Cable Customer) and **OTT Subscribers** (→ Customer).
- **Profile** (bottom bar → profile icon): partner name, User ID (the LCO ID), Mobile, Email (made up), **Change Password** (demo) and **Logout**. The Dashboard icon goes back to the dashboard.

**Screens you can open:**

```
Dashboard
 ├─ STB In Stock ─► list of STB numbers (search by STB No)
 ├─ Active STB ───► subscriber cards (VC No, Box Type, SMS ID, Due Date, Status: Active)
 │                   search by Vc No / Mobile No / Sms Id ─► tap a card ─► Subscriber
 ├─ DA STB ───────► same cards with Status: Deactive ─► tap a card ─► Subscriber
 ├─ Cable Subscribers ─► "Cable Customer": all Active + DA cards (OTT tag if the customer has OTT),
 │                        All / Active / Deactive filter, search by Vc No / Mobile No / Sms Id ─► Subscriber
 ├─ + Register Guest Customer ─► "OTT Activation": Customer Name, Mobile Number, Select OTT Package ─► Submit
 │                                 (simulated: new Active customer added to the top of the OTT list) / Cancel
 ├─ OTT Subscribers ───► "Customer": tabs All / Active / Inactive / Suspended, search by User Name;
 │   │                    each card: user name, status, mobile, and ⚙ / message (demo) / ⓘ icons
 │   ├─ ⚙ icon (or tap the card) ─► selected; a bottom bar shows the user name + Recharge / Invoice (tap again to unselect)
 │   │   ├─ Recharge ─► "Package Renew CMS": 6 plans (₹, name, number of OTTs, OTT app tiles) ─► Subscribe Now
 │   │   │               ─► confirm ─► simulated payment ─► plan updated, status Active
 │   │   └─ Invoice ──► pop-up invoice for the current plan (amount, GST 18%, total; Download PDF is a demo)
 │   └─ ⓘ ─► "Customer Details": name, status, Activation Date, Balance, OTT Plan, Video Plan,
 │            Contact Details (Call / Email / Address toasts)
 ├─ CATV / OTT Wallet Top Up ─► wallet balance; Enter Email + Mobile Number (prefilled) + Enter Amount ─► Pay Now
 │                               (simulated: balance goes up, payment added to the history); All / Success / Fail history filter
 └─ OTT Commission ─► From / To date (default: last 30 days) ─► search ─► cards: commission ₹ (green, or red when 0),
                      date-time, Type, Total transaction amount, Opening wallet, Closing wallet
Subscriber: Account Balance, VC No, SMS ID, Status, STB No, Due Date
 ├─ Subscriber Detail ─► Address, City, State, Language Zone, Mobile No, Mobile No Verified, Partner,
 │                        Distributor, TOC, Child Connection, Acquisition Expiry Date, Activated On, Last Ra_Da Date
 ├─ Instant Recharge / Repairing Request / Reconfirmation Package (demo toasts)
 └─ Upgrade Package (Active subscribers only) ─► current package + CATV wallet balance + higher packages
      ─► Upgrade ─► confirm (price difference) ─► simulated: debited from the CATV wallet, package updated
```

OTT packages: INDI_OTT_Starter ₹50 (1 OTT), INDI_OTT_Pro ₹90 (10), INDI_OTT_Max ₹110 (7), INDI_OTT_Elite ₹150 (12), INDI_OTT_Ultra ₹199 (15), High Value Test Pack Slot ₹10 (3). The OTT app names on the plan cards are made up; no real brand logos are used. Subscribe Now does not take money from the OTT wallet.

The lists show a sample of each count ("Showing 12 of 145 in this demo"). Buttons that aren't wired to a screen yet show a "(demo)" toast.

## Home (live TV guide)

The layout matches the production app screenshot:

- **Header:** logo with "& OTT Partners" on the left, and a **hamburger menu** button (☰) in the top-right corner.
- **Menu:** tapping ☰ slides a menu in from the left with **OTT**, **Search** and **Profile**, then **LTS**, **Genre (8)** and **Language (15)**.
  - Tapping an option closes the menu and does exactly what that button did before.
  - The menu closes with ✕, by tapping outside it, or with Back/Esc.
  - A small pink dot on ☰ shows that a genre, language or search filter is active.
- **Genre rows:** Sports, Entertainment, Movies, News, Kids, Music, Devotional and Infotainment. Each card shows a LIVE badge, programme progress, channel name, time slot and language.
- **What each control does:**
  - **OTT** and **LTS** open option sheets.
  - **Genre** and **Language** filter the guide. Active filters appear as chips you can tap to clear.
  - **Search** filters channels and shows as you type.
  - **See All** opens the full genre grid.
  - Tapping any card, or the yellow TV button, opens a simulated player. It has pause/play and channel switching.
  - **Profile** shows the user's mobile, VSC/LCO details and, for LCO partners, the chosen service (Broadband or Cable TV), plus **Change user type** and **Logout**.
- Time slots are generated from the current time, so the guide always looks live.

## Demo inputs

| Field | Rule |
|---|---|
| Mobile number | 10 digits, starting with 6–9. For example: `9876543210` |
| VSC number (Cable TV) | 8–16 digits. For example: `1234567890` |
| User ID (Broadband) | 4–20 letters, numbers or `. _ -`. For example: `roy.bb_01` |
| OTP (Broadband) | Always `123456` (also shown on screen) |
| Demo Broadband mobile | `9000000000`. It's pre-registered, so it logs in with OTP `123456` |
| LCO ID | 3 letters + 3–5 digits. For example: `LCO1234` (OTP `123456`) |

Invalid input shakes the field and shows an error message and a toast.

## Structure

```
playtor-demo/
├── index.html          # Shell: device frame, toast, sheet and loader containers
├── css/style.css       # All styling (palette sampled from the video)
├── js/app.js           # Router, screens, validation, toasts, dashboard
├── assets/
│   ├── logo/vibe-logo.png    # full logo with "ALL-IN-ONE HUB" (transparent)
│   ├── logo/vibe-mark.png    # "VIBE" word only, used in the home header
│   ├── video/vibe-intro.mp4  # opening animation (10 s)
│   ├── icons/favicon.png
│   └── images/         # (optional) drop real posters here
└── README.md
```

## Customising

- **Brand/logo:** replace `assets/logo/vibe-logo.png` and `vibe-mark.png`. They're set by the `LOGO` and `MARK` constants in `js/app.js`.
- **Opening animation:** replace `assets/video/vibe-intro.mp4`.
- **Colours:** edit the CSS variables at the top of `css/style.css` (`--accent`, `--card`, `--card-border`, …).
- **Channels:** the `GENRES` array in `js/app.js` sets each genre's name, displayed count and channels (channel, programme, language, colours). Thumbnails are CSS gradients with the programme title, so no image files are needed.
- **Languages / OTT partners:** the `LANGUAGES` and `OTT` arrays.
- **VSC rule:** `EXTRA.vsc` in `js/app.js`. Change `valid` if your VSC format differs.
