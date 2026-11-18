/* =========================================================
   VIBE (All-in-one hub) mobile prototype – front-end only demo
   No backend, no real authentication. Everything is simulated.
   ========================================================= */
(function () {
  "use strict";

  // Demo values (no SMS is ever sent)
  const DEMO_OTP = "123456";          // OTP for Broadband login and registration
  const DEMO_MOBILE = "9000000000";   // registered mobile linked to every Broadband User ID; works out of the box

  const LOGO = "assets/logo/vibe-logo.png";   // full logo with "ALL-IN-ONE HUB"
  const MARK = "assets/logo/vibe-mark.png";   // compact "VIBE" word for the home header

  /* ---------- Icons (inline SVG, stroke style) ---------- */
  const s = (p, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
  const I = {
    back: s('<path d="M15 18l-6-6 6-6"/>'),
    user: s('<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>'),
    userFill: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7.5" r="4"/><path d="M4 20.5c.6-4.2 3.9-6.5 8-6.5s7.4 2.3 8 6.5z"/></svg>',
    store: s('<path d="M4 9.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5"/><path d="M3 9.5l1.6-4.6A1.4 1.4 0 0 1 5.9 4h12.2a1.4 1.4 0 0 1 1.3.9L21 9.5"/><path d="M3 9.5h18"/><path d="M9 20v-5h6v5"/><path d="M9 12.5h6"/>'),
    wifi: s('<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.3a9.5 9.5 0 0 1 13 0"/><path d="M8.6 15.5a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>'),
    tv: s('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 3l4 4 4-4"/><path d="M10.5 11v5l4-2.5z" fill="currentColor"/>'),
    guest: s('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.2c1.2-2 3.2-3.2 5.5-3.2s4.3 1.2 5.5 3.2"/>'),
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    checkBig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    key: s('<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M17 6l3 3"/><path d="M15 8l2 2"/>'),
    card: s('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 15h4"/>'),
    search: s('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
    monitor: s('<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'),
    router: s('<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 16.5h.01M10.5 16.5h.01"/><path d="M15 13l2-6"/><path d="M13.5 6.5a4.5 4.5 0 0 1 6 0"/><path d="M11.5 4a7.5 7.5 0 0 1 10 0"/>'),
    masks: s('<path d="M3 4.5c3 1 6 1 9 0v6a4.5 4.5 0 0 1-9 0z"/><path d="M12 9.5c3 1 6 1 9 0v6a4.5 4.5 0 0 1-9 0"/><path d="M5.5 8.5h.01M9.5 8.5h.01M6 12.5c1 .8 2.5.8 3.5 0"/><path d="M14.5 13.5h.01M18.5 13.5h.01M15 17.3c1-.8 2.5-.8 3.5 0"/>'),
    lang: s('<rect x="2.5" y="3.5" width="11" height="11" rx="2"/><rect x="10.5" y="9.5" width="11" height="11" rx="2"/><path d="M5.5 11.5L8 6.5l2.5 5M6.3 10h3.4"/><path d="M13.5 13.5h5M16 12.5v1M14.5 18c1.8-.6 3-2 3.5-4.5M15 15.5c.8 1.3 2 2.2 3.5 2.6"/>'),
    trophy: s('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5"/><path d="M12 14v3M8.5 20.5h7M9.5 17h5v3.5h-5z"/>'),
    clap: s('<rect x="3" y="9" width="18" height="11" rx="1.5"/><path d="M3 9l1.5-4.5L20 4l1 5"/><path d="M8 4.3l2.3 4.4M13.5 4.2l2.3 4.6"/>'),
    news: s('<rect x="3" y="4" width="15" height="16" rx="2"/><path d="M18 8h3v10a2 2 0 0 1-2 2"/><path d="M7 8h7M7 12h7M7 16h4"/>'),
    kids: s('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4 4 0 0 0 7 0"/><circle cx="9" cy="10" r=".8" fill="currentColor"/><circle cx="15" cy="10" r=".8" fill="currentColor"/>'),
    music: s('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
    lamp: s('<path d="M12 3c-1.5 2-2.5 3.3-2.5 4.8a2.5 2.5 0 0 0 5 0C14.5 6.3 13.5 5 12 3z"/><path d="M5 14h14l-2 4H7z"/><path d="M12 10.5V14M9 21h6"/>'),
    globe: s('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    chev: s('<path d="M9 6l6 6-6 6"/>'),
    close: s('<path d="M6 6l12 12M18 6L6 18"/>'),
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
    full: s('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    vol: s('<path d="M4 9.5h4l5-4v13l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>'),
    heart: s('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    gear: s('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
    swap: s('<path d="M7 4L3 8l4 4"/><path d="M3 8h14"/><path d="M17 20l4-4-4-4"/><path d="M21 16H7"/>'),
    menu: s('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    refresh: s('<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>'),
    wallet: s('<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v4"/><rect x="3.5" y="8" width="17" height="11" rx="2"/><path d="M15.5 13.5h2"/>'),
    users: s('<circle cx="9" cy="8.5" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="9.5" r="2.5"/><path d="M16.5 14.2c2.4.2 4 1.8 4.5 4.3"/>'),
    plus: s('<path d="M12 5v14M5 12h14"/>'),
    home: s('<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.8V19h4.5v-5h3v5H18V9.8"/>'),
    calendar: s('<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2"/>'),
    lock: s('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.2" fill="currentColor"/>'),
    filter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 4.5h17l-6.5 8v6l-4 2v-8z"/></svg>',
    phone: s('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
    mail: s('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>'),
    info: s('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.2"/>'),
    bell: s('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    ticket: s('<path d="M3.5 8V6.5a1.5 1.5 0 0 1 1.5-1.5h14a1.5 1.5 0 0 1 1.5 1.5V8a2.5 2.5 0 0 0 0 5v4.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5V13a2.5 2.5 0 0 0 0-5z"/><path d="M9 9h6M9 12.5h6M9 16h3"/>'),
    grid: s('<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'),
    chart: s('<path d="M4 20h16"/><path d="M7 16v-5M11.5 16V7M16 16v-8"/>'),
    eye: s('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>'),
    copy: s('<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>'),
    rupee: s('<path d="M7 5h10M7 9h10M7 5h3a4 4 0 0 1 0 8H7l7 6"/>'),
    alert: s('<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.2v.2"/>'),
    logout: s('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5"/><path d="M5 12h11"/>'),
  };

  /* ---------- User types ---------- */
  const USER_TYPES = {
    customer: { title: "Customer", desc: "Continue as a Customer", icon: I.user },
    lco: { title: "LCO", desc: "Continue as a Partner/LCO", icon: I.store },
    broadband: { title: "Broadband", desc: "Continue with your broadband connection", icon: I.wifi },
    cable: { title: "Cable TV", desc: "Continue with your Cable TV service provider", icon: I.tv },
    guest: { title: "Guest", desc: "Explore available content without a subscription", icon: I.guest },
  };

  // Extra (non-mobile) fields used by some login types
  const EXTRA = {
    vsc: {
      label: "VSC number", icon: I.card, placeholder: "Enter VSC Number", maxlength: 16, inputmode: "numeric",
      clean: (v) => v.replace(/\D/g, "").slice(0, 16),
      valid: (v) => /^\d{8,16}$/.test(v),
      hint: "8–16 digit number printed on your set-top box / viewing card",
      err: "Enter a valid VSC number (8–16 digits)",
      short: "VSC No",
    },
    bbid: {
      label: "User ID", icon: I.wifi, placeholder: "Enter Broadband User ID", maxlength: 20, inputmode: "text",
      clean: (v) => v.replace(/[^A-Za-z0-9._-]/g, "").slice(0, 20),
      valid: (v) => /^[A-Za-z0-9._-]{4,20}$/.test(v),
      hint: "4–20 characters (letters, numbers, . _ -) from your broadband account",
      err: "Enter a valid User ID (4–20 characters)",
      short: "User ID",
    },
    lco: {
      label: "LCO code", icon: I.key, placeholder: "Enter LCO Code (e.g. LCO1234)", maxlength: 8, inputmode: "text",
      clean: (v) => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8),
      valid: (v) => /^[A-Z]{3}\d{3,5}$/.test(v),
      hint: "3 letters followed by 3–5 digits",
      err: "Enter a valid LCO code, e.g. LCO1234",
      short: "LCO Code",
    },
    // LCO ID for the LCO → Broadband / Cable TV → LCO ID + OTP flow (same format as the LCO code)
    lcoid: {
      label: "LCO ID", icon: I.key, placeholder: "Enter LCO ID (e.g. LCO1234)", maxlength: 8, inputmode: "text",
      clean: (v) => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8),
      valid: (v) => /^[A-Z]{3}\d{3,5}$/.test(v),
      hint: "3 letters followed by 3–5 digits",
      err: "Enter a valid LCO ID, e.g. LCO1234",
      short: "LCO ID",
    },
  };

  // Login screen configuration per user type
  const LOGIN = {
    cable: {
      // Cable users register ONCE with VSC + mobile; after that they log in with mobile only
      sub: "Registered cable user? Login with your mobile number",
      subReg: "New cable customer? Register once with your VSC & mobile number",
      label: "Join as Cable User",
      btn: "Login",
      btnReg: "Register",
      extra: "vsc",
      extraOnlyOnRegister: true,
      done: "Login successful",
      doneMsg: "Welcome back! You are logged in with your registered mobile number.",
      doneReg: "Registration successful",
      doneRegMsg: "Your Cable TV connection is registered. Next time, just log in with your mobile number.",
    },
    broadband: {
      // Broadband users log in with mobile only (same as before).
      // Registering opens a separate screen: User ID → OTP (sent to the mobile linked to that ID) → registered.
      sub: "Registered broadband user? Login with your mobile number",
      subReg: "New broadband customer? Register once with your User ID & mobile number",
      label: "Join as Broadband User",
      btn: "Login",
      btnReg: "Register",
      extra: "bbid",
      extraOnlyOnRegister: true,
      otpRegister: true,
      otpLogin: true,   // registered number → OTP step (DEMO_OTP) before logging in
      otpSubLogin: "Enter the 6-digit OTP sent to your mobile number",
      otpSub: "New broadband customer? Enter your User ID – we'll send an OTP to your registered mobile",
      otpSubCode: "Enter the 6-digit OTP sent to your registered mobile",
      done: "Login successful",
      doneMsg: "Welcome back! You are logged in with your registered mobile number.",
      doneReg: "Registration successful",
      doneRegMsg: "Your broadband connection is registered. Next time, just log in with your mobile number.",
    },
    lco: {
      // LCO partners register ONCE with LCO code + mobile; after that they log in with mobile only
      sub: "Registered partner? Login with your mobile number",
      subReg: "New LCO partner? Register once with your LCO code & mobile number",
      label: "Partner / LCO Login",
      btn: "Login",
      btnReg: "Register",
      extra: "lco",
      extraOnlyOnRegister: true,
      done: "Welcome back, Partner",
      doneMsg: "You are logged in with your registered mobile number.",
      doneReg: "Partner registration successful",
      doneRegMsg: "Your LCO account is registered. Next time, just log in with your mobile number.",
    },
    guest: {
      // Guests register and log in with the mobile number only (no VSC / User ID)
      sub: "Explore content without a subscription – just your mobile number",
      label: "Join as Guest",
      btn: "Continue",
      track: true,
      done: "Welcome back!",
      doneMsg: "You are logged in as a guest.",
      doneReg: "Guest registration successful",
      doneRegMsg: "You can now explore available content. Next time, just log in with your mobile number.",
    },
  };

  // LCO flow: LCO → Broadband / Cable TV → LCO ID → OTP (to the registered mobile) → LCO dashboard.
  // No sign-up option: the first verified LCO ID is registered, after that it simply logs in.
  const LCO_OTP = {
    screen: "lco-auth",
    label: "Partner / LCO Login",
    extra: "lcoid",
    regBucket: "lcoId",     // Registry bucket keyed by LCO ID
    noLoginLink: true,
    dashboard: true,
    otpSub: "Enter your LCO ID – we'll send an OTP to your registered mobile number",
    otpSubCode: "Enter the 6-digit OTP sent to your registered mobile",
    done: "Welcome back, Partner",
    doneMsg: "You are logged in with your LCO ID.",
    doneReg: "Partner registration successful",
    doneRegMsg: "Your LCO ID is verified and registered.",
  };

  /* ---------- Date formats used by the LCO screens ---------- */
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const p2 = (n) => String(n).padStart(2, "0");
  const dmy = (d) => `${p2(d.getDate())}-${p2(d.getMonth() + 1)}-${d.getFullYear()}`;            // 18-11-2026
  const isoDay = (d) => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;          // 2026-11-18 (date inputs)
  const stamp = (d) => {                                                                           // 16 Nov 2026 07:34:57:PM
    const h = d.getHours() % 12 || 12;
    return `${p2(d.getDate())} ${MON[d.getMonth()]} ${d.getFullYear()} ${p2(h)}:${p2(d.getMinutes())}:${p2(d.getSeconds())}:${d.getHours() < 12 ? "AM" : "PM"}`;
  };
  const money = (n) => (+n).toFixed(2);

  /* ---------- OTT packages (LCO: OTT Activation + Package Renew CMS). App names are fictional — no real brand logos ---------- */
  const OTT_STATUS = { active: "Active", inactive: "Inactive", suspended: "Suspended" };
  const OTT_APPS = [
    ["Vibe Play", ["#ff3fd0", "#9b5cff"]], ["Cine Max", ["#ff7a59", "#c2185b"]], ["Stream Box", ["#2fd8ff", "#3a6bff"]],
    ["Desi Flix", ["#ffb300", "#ff6f00"]], ["Kids Zone", ["#43e97b", "#0f9b8e"]], ["Bangla Tales", ["#f857a6", "#ff5858"]],
    ["Music Wave", ["#7f7fd5", "#5b2bd8"]], ["Sports Hub", ["#00c6ff", "#0072ff"]], ["News Now", ["#fc4a1a", "#f7b733"]],
    ["Drama Plus", ["#c471f5", "#fa71cd"]], ["Toon Town", ["#56ccf2", "#2f80ed"]], ["Classic TV", ["#bdc3c7", "#5c6b7a"]],
    ["Doc World", ["#11998e", "#38ef7d"]], ["Regional One", ["#e65c00", "#f9d423"]], ["Anime Go", ["#ee0979", "#ff6a00"]],
  ];
  const OTT_PLANS = [
    { name: "INDI_OTT_Starter", price: 50, apps: 1, icon: "🎬", colors: ["#2fd8ff", "#3a6bff"] },
    { name: "INDI_OTT_Pro", price: 90, apps: 10, icon: "⭐", colors: ["#9b5cff", "#ff3fd0"] },
    { name: "INDI_OTT_Max", price: 110, apps: 7, icon: "🚀", colors: ["#ff7a59", "#ff3fd0"] },
    { name: "INDI_OTT_Elite", price: 150, apps: 12, icon: "💎", colors: ["#43e97b", "#2fd8ff"] },
    { name: "INDI_OTT_Ultra", price: 199, apps: 15, icon: "👑", colors: ["#ffb300", "#ff3fd0"] },
    { name: "High Value Test Pack Slot", price: 10, apps: 3, icon: "🧪", colors: ["#7f7fd5", "#5c6b7a"] },
  ];
  const planApps = (p) => OTT_APPS.slice(0, p.apps);

  /* ---------- Cable TV packages (LCO → Active STB → subscriber → Upgrade Package). Fictional names/prices ---------- */
  const CABLE_PACKS = [
    { name: "VIBE Basic SD", price: 199, ch: 180, hd: 0 },
    { name: "VIBE Bangla Value", price: 299, ch: 230, hd: 15 },
    { name: "VIBE Family HD", price: 399, ch: 280, hd: 40 },
    { name: "VIBE Sports Plus HD", price: 499, ch: 310, hd: 60 },
    { name: "VIBE Premium HD", price: 649, ch: 360, hd: 90 },
    { name: "VIBE Ultimate 4K", price: 799, ch: 400, hd: 120 },
  ];

  /* ---------- LCO dashboard demo data (fictional people & numbers; generated once, stable per load) ---------- */
  const LCO_DATA = (() => {
    let seed = 20261118;
    const r = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const digits = (n) => Array.from({ length: n }, () => Math.floor(r() * 10)).join("");
    const pad = (n) => String(n).padStart(2, "0");
    const date = (y) => `${pad(1 + Math.floor(r() * 28))}-${pad(1 + Math.floor(r() * 12))}-${y}`;
    const PLACES = [["SALTLAKE, KOLKATA, Kolkata", "Kolkata"], ["SODEPUR, NORTH 24 PGS, Kolkata", "Kolkata"],
      ["SHIBPUR, HOWRAH, Howrah", "Howrah"], ["BEHALA, KOLKATA, Kolkata", "Kolkata"], ["DUM DUM, KOLKATA, Kolkata", "Kolkata"]];
    const sub = (name, active, i) => {
      const office = /\*\((Office Use|Tech-Testing|Employee)\)/.test(name);
      const [address, city] = PLACES[i % PLACES.length];
      return {
        i, name, active,
        kind: active ? "active" : "da",
        ott: r() < 0.5,          // has an OTT pack (shown as an "OTT" tag on Cable Customer cards)
        vc: "0171" + digits(7),
        sms: "SN" + digits(7),
        box: r() < 0.6 ? "HD" : "SD",
        due: active ? date(2027 + Math.floor(r() * 5)) : date(2026),
        stb: "N80663" + digits(4) + "C" + digits(8),
        balance: active ? (r() * 400).toFixed(2) : "0.00",
        mobile: "91" + "90000" + digits(5),
        verified: r() < 0.7,
        toc: office ? "TESTING" : "REGULAR",
        activated: date(2025),
        address, city,
        pack: i % 3,             // index into CABLE_PACKS (current package; Upgrade Package raises it)
      };
    };
    const ACTIVE = ["Rahul Das (DGM Technical)*(Employee)", "Kolkata Customer Care*(Office Use)", "Sodepur Hub STB*(Office Use)",
      "Customer Care Testing STB*(Tech-Testing)", "Ananya Ghosh*(Employee)", "Salt Lake Office Lobby*(Office Use)",
      "Sourav Mitra", "Priya Banerjee", "Amit Kumar Saha", "Rina Paul", "Debashis Roy", "Moumita Sarkar"];
    const DA = ["Customer Care1*(Office Use)", "CENTRAL HEADEND", "MONITORING ROOM", "NOC", "Training Room STB*(Office Use)",
      "Arindam Bose", "Sneha Dutta", "Howrah Hub Demo*(Office Use)"];
    return {
      partner: {
        name: "TECHNICAL/ HEADEND KOLKATA- Site 1", code: "SN35852", distributor: "ICNCL",
        email: "partner.kolkata@example.com",   // fictional (Profile screen)
        wallet: "3708.83", ottWallet: "0.00",
        counts: { stock: 107, active: 145, da: 19 },
        due: [["Till Today", "2 / ₹ 700", "1 / ₹ 350"], ["Till Tomorrow", "4 / ₹ 1,400", "2 / ₹ 700"]],
        kitty: { amount: "4.11", at: "04-Nov-2026 09:31:48 AM" },
        complaints: { total: 0, pending: 0, closed: 0 },
      },
      stock: Array.from({ length: 24 }, () => "N80663" + digits(4) + "C" + digits(8)),
      active: ACTIVE.map((n, i) => sub(n, true, i)),
      da: DA.map((n, i) => sub(n, false, i)),
      // OTT Subscribers ("Customer" screen): user name = mobile + "_Cable"; fictional numbers
      // Each also carries Customer Details data (ⓘ icon) — plans, dates, contact. All fictional.
      ott: ["active", "active", "active", "inactive", "active", "suspended", "active", "inactive", "active", "suspended"]
        .map((status, i) => {
          const m = "90000" + digits(5);
          const NAMES = ["HE MONITORING", "Sourav Mitra", "Priya Banerjee", "Kolkata Customer Care", "Amit Kumar Saha",
            "Rina Paul", "NOC TEST", "Debashis Roy", "Moumita Sarkar", "Arindam Bose"];
          const activated = new Date(Date.now() - (60 + Math.floor(r() * 300)) * 864e5);
          const plan = OTT_PLANS[[4, 1, 0, 2, 3, 1, 4, 0, 2, 3][i]];
          return {
            id: i + 1, i, user: `${m}_Cable`, mobile: m, status,
            name: NAMES[i], activated, balance: "0.0",
            plan: plan.name + "_V", planAt: new Date(Date.now() - Math.floor(r() * 25) * 864e5 - 3e7),
            video: "Welcome Plan", videoAt: new Date(activated.getTime() + 36e5),
            email: `customer${i + 1}@example.com`, address: PLACES[i % PLACES.length][0],
          };
        }),
      // Wallet top-up history (All / Success / Fail). New "Pay Now" payments are added to the top.
      txns: {
        catv: [
          { id: "TXN" + digits(10), amount: 1000, status: "success", at: new Date(Date.now() - 3 * 864e5 - 5e6) },
          { id: "TXN" + digits(10), amount: 500, status: "fail", at: new Date(Date.now() - 9 * 864e5 - 2e7) },
        ],
        ott: [
          { id: "TXN" + digits(10), amount: 200, status: "fail", at: new Date(Date.now() - 6 * 864e5 - 9e6) },
        ],
      },
      // OTT Commission entries over the last ~45 days (newest first), with a running wallet
      commission: (() => {
        const TYPES = ["Renewal", "Renewal", "Renewal", "New Activation", "Add-on Pack"];
        const list = [];
        let wallet = 0;
        let t = Date.now() - 45 * 864e5;
        for (let k = 0; k < 16; k++) {
          t += (1 + r() * 3) * 864e5 * 0.9;
          if (t > Date.now()) break;
          const total = r() < 0.45 ? 0 : Math.round(150 + r() * 450);
          const amount = +(total * 0.05).toFixed(2);
          list.push({ at: new Date(t), type: TYPES[Math.floor(r() * TYPES.length)], total, amount, opening: wallet, closing: +(wallet + amount).toFixed(2) });
          wallet = +(wallet + amount).toFixed(2);
        }
        return list.reverse();
      })(),
    };
  })();

  /* ---------- Broadband LCO demo data (Home / Case / Customer). All people, numbers and IDs are fictional ---------- */
  const BB_PLANS = [
    { name: "VIBE_FIBER_50", speed: "50 Mbps", price: 499, days: 30, ott: 3 },
    { name: "VIBE_FIBER_100", speed: "100 Mbps", price: 699, days: 30, ott: 7 },
    { name: "VIBE_FIBER_200", speed: "200 Mbps", price: 899, days: 30, ott: 10 },
    { name: "VIBE_FIBER_300", speed: "300 Mbps", price: 1099, days: 30, ott: 12 },
    { name: "VIBE_FIBER_1G", speed: "1 Gbps", price: 2499, days: 30, ott: 15 },
    { name: "VIBE_FIBER_100_6M", speed: "100 Mbps", price: 3799, days: 180, ott: 7 },
  ];
  const BB_STATUS = { new: "New - Active", active: "Active", inactive: "Inactive", suspended: "Suspended", expired: "Expired" };
  const CASE_STATUS = { open: "Open", wip: "Work In Progress", done: "Completed" };
  const BB_DATA = (() => {
    let seed = 7731;
    const r = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const digits = (n) => Array.from({ length: n }, () => Math.floor(r() * 10)).join("");
    const pick = (a) => a[Math.floor(r() * a.length)];
    const PEOPLE = ["Ankit Sen", "Bittu Karmakar", "Chandan Pal", "Dipika Roy", "Ershad Ali", "Farhan Khan", "Gargi Basu",
      "Hiran Das", "Ishita Ghosh", "Joy Mukherjee", "Kaushik Dey", "Lopa Saha", "Manas Paul", "NOC Office", "Payel Nandi",
      "Rupam Sarkar", "Sayan Bose", "Tanmoy Kar"];
    const ST = ["active", "new", "active", "inactive", "active", "expired", "active", "suspended", "new", "active",
      "active", "expired", "active", "active", "suspended", "active", "expired", "active"];
    const EXP = [0, 2, 5, 9, 14, 21, 26, 40, 55, 70];   // days until expiry (used for "Expiring soon")
    const customers = PEOPLE.map((name, i) => {
      const status = ST[i];
      const days = status === "expired" ? -(1 + Math.floor(r() * 20)) : status === "active" || status === "new" ? EXP[i % EXP.length] : 60;
      const first = name.split(" ")[0].toLowerCase();
      return {
        id: i + 1, name, title: i % 3 === 1 ? "Mrs" : "Mr",
        user: name === "NOC Office" ? "noc_office_test" : `${first}_${pick(["ftth", "fiber", "bb", "home"])}${i}`,
        mobile: "90001" + digits(5), status,
        online: (status === "active" || status === "new") && r() < 0.75,
        ott: r() < 0.6,
        plan: BB_PLANS[i % 5].name,
        expiry: new Date(Date.now() + days * 864e5 + 5e7),
        email: `${first}${i}@example.com`,
        // Customer Details (ⓘ) — fictional
        activated: new Date(Date.now() - (90 + Math.floor(r() * 500)) * 864e5),
        balance: (r() < 0.5 ? 0 : r() * 300).toFixed(2),
        address: pick(["SALTLAKE, KOLKATA", "SODEPUR, NORTH 24 PGS", "SHIBPUR, HOWRAH", "BEHALA, KOLKATA", "DUM DUM, KOLKATA"]),
      };
    });
    const CATS = ["Change Request", "Corporate Leased Line", "No Internet", "Slow Speed", "Router Issue", "Shifting Request"];
    const STAFF = [["Tushar Mondal", "9000011122"], ["Naba Kumar Saha", "9000033344"]];
    const cases = Array.from({ length: 9 }, (_, k) => {
      const c = customers[(k * 5 + 1) % customers.length];
      const assigned = k % 4 !== 3;
      const status = !assigned ? "open" : k % 3 === 2 ? "done" : k % 3 === 1 ? "wip" : "open";
      const [an, am] = STAFF[k % 2];
      return {
        id: "TKT45" + digits(5), cust: c.name, user: c.user, cat: CATS[k % CATS.length], status,
        assigned, mine: assigned && k % 2 === 0, to: assigned ? `${an}-${am}` : "",
        at: new Date(Date.now() - (k * 3 + r() * 2) * 864e5 - 4e7),
      };
    });
    return {
      partner: {
        name: "VIBE BROADBAND - KOLKATA SITE 1", email: "partner.kolkata@example.com",
        wallet: "3568.97",
        counts: { active: 200, inactive: 1, online: 196, expired: 150, customers: 352 },
      },
      customers, cases,
      txns: [
        { id: "TXN" + digits(10), amount: 2000, status: "success", at: new Date(Date.now() - 2 * 864e5 - 3e6) },
        { id: "TXN" + digits(10), amount: 1500, status: "fail", at: new Date(Date.now() - 8 * 864e5 - 9e6) },
      ],
    };
  })();

  /* ---------- Channel guide demo data ---------- */
  // [channel, programme, language, gradient colours]
  const GENRES = [
    { key: "sports", name: "Sports", icon: I.trophy, count: 29, items: [
      ["Star Sports 1", "T20 Highlights", "Hindi", ["#c8a96a", "#1f6b3a"]],
      ["Star Sports 2", "Champions Trophy Highlights", "English", ["#2b1055", "#d76d1f"]],
      ["Star Sports 3", "Pro Kabaddi Live", "Tamil", ["#0f2027", "#2c5364"]],
      ["Sony Ten 1", "Football Matchday", "English", ["#134e5e", "#71b280"]],
      ["Sports18", "Tennis Open Final", "Hindi", ["#1d2b64", "#6f86d6"]],
      ["DD Sports", "Hockey League", "Hindi", ["#3a1c71", "#d76d77"]],
    ] },
    { key: "entertainment", name: "Entertainment", icon: I.monitor, count: 97, items: [
      ["Star Plus", "Sayoni", "Hindi", ["#f6d6a8", "#b31217"]],
      ["Zee TV", "Ganga Mai Ki Betiyan", "Hindi", ["#1e3c72", "#7b4397"]],
      ["Colors", "Dhruv Tara", "Hindi", ["#00b4db", "#e1245e"]],
      ["Sony TV", "Family Hour", "Hindi", ["#ff512f", "#3a1c71"]],
      ["Sun TV", "Evening Serial", "Tamil", ["#f7971e", "#7a1f1f"]],
      ["Star Maa", "Prime Drama", "Telugu", ["#8e2de2", "#f7797d"]],
    ] },
    { key: "movies", name: "Movies", icon: I.clap, count: 49, items: [
      ["Star Gold", "Ravan Vadh", "Hindi", ["#e53935", "#7b1010"]],
      ["Zee Cinema", "2.0", "Hindi", ["#0f2027", "#3a7bd5"]],
      ["Sony Max", "Weekend Blockbuster", "Hindi", ["#355c7d", "#c06c84"]],
      ["&pictures", "Action Special", "Hindi", ["#232526", "#c0392b"]],
      ["Colors Cineplex", "Superhit Sunday", "Hindi", ["#41295a", "#2f0743"]],
      ["Star Movies", "Hollywood Night", "English", ["#000428", "#004e92"]],
    ] },
    { key: "news", name: "News", icon: I.news, count: 125, items: [
      ["R. Bharat", "Live & Breaking", "Hindi", ["#d31027", "#1c3faa"]],
      ["Aaj Tak", "Aaj Ka Agenda", "Hindi", ["#ff416c", "#8e0e00"]],
      ["NDTV India", "Prime Time", "Hindi", ["#cb2d3e", "#2c3e50"]],
      ["Times Now", "The Newshour", "English", ["#1a2980", "#c33764"]],
      ["Puthiya Thalaimurai", "Seithigal", "Tamil", ["#e65c00", "#b31217"]],
      ["TV9 Kannada", "Top Stories", "Kannada", ["#ee0979", "#141e30"]],
    ] },
    { key: "kids", name: "Kids", icon: I.kids, count: 18, items: [
      ["Pogo", "Cartoon Marathon", "Hindi", ["#11998e", "#38ef7d"]],
      ["Cartoon Network", "Morning Toons", "English", ["#f7971e", "#ffd200"]],
      ["Nick", "Fun Time", "Hindi", ["#f12711", "#f5af19"]],
      ["Disney Junior", "Little Stories", "English", ["#00c6ff", "#0072ff"]],
    ] },
    { key: "music", name: "Music", icon: I.music, count: 22, items: [
      ["9XM", "Bollywood Top 20", "Hindi", ["#8e2de2", "#4a00e0"]],
      ["MTV Beats", "Chill Hits", "Hindi", ["#fc466b", "#3f5efb"]],
      ["Zing", "Retro Rewind", "Hindi", ["#f953c6", "#b91d73"]],
      ["Sun Music", "Melody Time", "Tamil", ["#ff9966", "#ff5e62"]],
    ] },
    { key: "devotional", name: "Devotional", icon: I.lamp, count: 16, items: [
      ["Aastha", "Morning Aarti", "Hindi", ["#f7971e", "#c0392b"]],
      ["Sanskar", "Bhajan Sandhya", "Hindi", ["#ff8008", "#ffc837"]],
      ["SVBC", "Suprabhatam", "Telugu", ["#b24592", "#f15f79"]],
    ] },
    { key: "infotainment", name: "Infotainment", icon: I.globe, count: 14, items: [
      ["Discovery", "Planet Wild", "English", ["#134e5e", "#71b280"]],
      ["Nat Geo", "Mega Structures", "English", ["#f2c94c", "#232526"]],
      ["History TV18", "Ancient Secrets", "Hindi", ["#3e5151", "#decba4"]],
    ] },
  ];
  const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi",
    "Gujarati", "Punjabi", "Odia", "Assamese", "Urdu", "Bhojpuri", "Nepali"];
  const OTT = [["Play+ Originals", ["#ff3fd0", "#9b5cff"]], ["CineBox", ["#e53935", "#7b1010"]], ["KidsFlix", ["#11998e", "#38ef7d"]],
    ["Bhakti Plus", ["#ff8008", "#ffc837"]], ["NewsNow", ["#1a2980", "#26d0ce"]], ["MusicMax", ["#8e2de2", "#4a00e0"]]];

  // Programme time slots generated around the current time so the guide always looks "live"
  const fmt = (d) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  function slot(i) {
    const now = new Date();
    const start = new Date(now);
    start.setSeconds(0, 0);
    start.setMinutes(Math.floor(now.getMinutes() / 15) * 15 - (i % 3) * 15);
    const end = new Date(start.getTime() + [30, 60, 45, 90][i % 4] * 60000);
    const pct = Math.min(95, Math.max(5, Math.round(((now - start) / (end - start)) * 100)));
    return { time: `${fmt(start)} - ${fmt(end)}`, pct };
  }
  // Flat channel list with ids
  const CHANNELS = [];
  GENRES.forEach((g) => g.items.forEach(([name, show, lang, colors]) => {
    const id = CHANNELS.length;
    CHANNELS.push({ id, name, show, lang, colors, genre: g.key });
  }));

  const grad = (g, deg = 135) => `linear-gradient(${deg}deg, ${g.join(", ")})`;

  /* ---------- Registered users (Cable TV & Broadband) ----------
     Front-end only: kept in this browser's localStorage so a mobile number
     registered once (with VSC / User ID) can log in again with mobile only,
     also after reload. Stored per user type. Falls back to memory if storage is blocked. */
  const Registry = (() => {
    const KEY = "vibe.registeredUsers";
    let mem = {};
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return mem; } };
    const save = (o) => { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* memory only */ } };
    // Pre-registered demo user: Broadband 9000000000 can log in (with OTP) without registering first
    const SEED = { broadband: { [DEMO_MOBILE]: { id: "VIBEDEMO01", at: 0 } } };
    const bucket = (type) => ({ ...(SEED[type] || {}), ...(load()[type] || {}) });
    return {
      get: (type, mobile) => bucket(type)[mobile] || null,
      // Find a registration by its ID (e.g. Broadband User ID), ignoring case
      findById: (type, id) => {
        const hit = Object.entries(bucket(type)).find(([, v]) => String(v.id).toLowerCase() === String(id).toLowerCase());
        return hit ? { mobile: hit[0], ...hit[1] } : null;
      },
      add: (type, mobile, id) => { const o = load(); (o[type] = o[type] || {})[mobile] = { id, at: Date.now() }; save(o); },
      clear: () => save({}),
      count: () => Object.values(load()).reduce((n, t) => n + Object.keys(t).length, 0),
    };
  })();

  /* ---------- App state ---------- */
  const state = {
    role: "customer",       // customer | lco | guest   (first page)
    service: "cable",       // broadband | cable   (customer step 2)
    session: null,          // { type, mobile, vsc | bbid | lco }
    filter: { genre: null, lang: null, q: "" },
    bbSel: null,            // Broadband LCO → Customer: id selected with ⚙ (shows Recharge / Invoice bar)
    bbNew: null,           // Broadband LCO: id of a just-created customer (highlighted once in the list)
    ottSel: null,          // LCO → OTT Customer: id of the selected card (shows Recharge / Invoice bar)
  };

  /* ---------- DOM helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const host = $("#screens");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Toasts ---------- */
  function toast(msg, type = "info", ms = 2400) {
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.innerHTML = `<i></i><span></span>`;
    t.lastChild.textContent = msg;
    $("#toastWrap").appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 300); }, ms);
  }

  /* ---------- Loader ---------- */
  function showLoader(text = "Loading…") { $("#loaderText").textContent = text; $("#loader").hidden = false; }
  function hideLoader() { $("#loader").hidden = true; }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- Bottom sheet ---------- */
  function openSheet(html, onMount) {
    const bd = $("#sheetBackdrop"), sh = $("#sheet");
    sh.innerHTML = `<div class="grab"></div>${html}`;
    bd.hidden = false;
    bd.onclick = (e) => { if (e.target === bd) closeSheet(); };
    onMount && onMount(sh);
  }
  function closeSheet() { $("#sheetBackdrop").hidden = true; }

  /* ---------- Home left menu (hamburger drawer) ---------- */
  const openDrawerEl = () => $(".drawer.open");
  function openDrawer(root) {
    const d = $("#drawer", root);
    d.classList.add("open");
    d.setAttribute("aria-hidden", "false");
    $('[data-act="menu"]', root).setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    const d = openDrawerEl();
    if (!d) return;
    d.classList.remove("open");
    d.setAttribute("aria-hidden", "true");
    const btn = $('[data-act="menu"]', d.closest(".screen"));
    if (btn) btn.setAttribute("aria-expanded", "false");
  }
  // Small dot on the hamburger while a genre / language / search filter is active
  function syncMenuDot(root) {
    const f = state.filter;
    $('[data-act="menu"]', root).classList.toggle("dot", !!(f.genre || f.lang || f.q));
  }

  /* =========================================================
     Router – keeps an in-memory stack and mirrors it into
     browser history so the Android back button works.
     ========================================================= */
  const stack = [];
  let animating = false;

  function canUseHistory() {
    try { history.replaceState(history.state, ""); return true; } catch (e) { return false; }
  }
  const HISTORY = canUseHistory();

  function render(route, dir) {
    const old = host.lastElementChild;
    const el = SCREENS[route.name](route.params || {});
    el.classList.add("screen");
    host.appendChild(el);
    if (!old || dir === "none") {
      if (old) old.remove();
      el.classList.add("enter-fade");
      return;
    }
    animating = true;
    el.classList.add(dir === "back" ? "enter-back" : "enter-fwd");
    old.classList.add(dir === "back" ? "exit-back" : "exit-fwd");
    if (dir === "back") old.style.zIndex = 2; // keep outgoing screen on top when going back
    setTimeout(() => { old.remove(); animating = false; }, 380);
  }

  function go(name, params = {}) {
    if (animating) return;
    closeSheet();
    stack.push({ name, params });
    if (HISTORY) { try { history.pushState({ depth: stack.length }, ""); } catch (e) { /* file:// edge cases */ } }
    render(stack[stack.length - 1], "fwd");
  }
  function back() {
    if (animating) return;
    if (!$("#sheetBackdrop").hidden) { closeSheet(); return; }
    if (openDrawerEl()) { closeDrawer(); return; }
    if (stack.length <= 1) { toast("You are on the first screen"); return; }
    if (HISTORY) history.back(); else popRoute();
  }
  function popRoute() {
    if (stack.length <= 1) return;
    stack.pop();
    render(stack[stack.length - 1], "back");
  }
  // Replace only the top screen (bottom-bar tab switch: Case ↔ Customer) — Back still returns to the screen below
  function swapRoute(name, params = {}) {
    if (animating) return;
    closeSheet();
    stack[stack.length - 1] = { name, params };
    render(stack[stack.length - 1], "fwd");
  }
  // Replace the whole stack (e.g. after login or logout)
  function reset(name, params = {}, dir = "back") {
    closeSheet();
    stack.length = 0;
    stack.push({ name, params });
    if (HISTORY) history.replaceState({ depth: 1 }, "");
    render(stack[0], dir);
  }
  window.addEventListener("popstate", () => {
    if (!$("#sheetBackdrop").hidden) { closeSheet(); if (HISTORY) history.pushState({ depth: stack.length }, ""); return; }
    if (openDrawerEl()) { closeDrawer(); if (HISTORY) history.pushState({ depth: stack.length }, ""); return; }
    if (stack.length > 1) popRoute();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#splash")) back(); });

  /* =========================================================
     Shared building blocks
     ========================================================= */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* Auto-scrolling entertainment banner behind the logo.
     Rows of poster tiles scroll endlessly, alternating direction. */
  const BANNER_TITLES = [
    ["Neon Skies", "MOVIE"], ["Champions Cup", "LIVE"], ["Paper Hearts", "ROMANCE"], ["Quantum Kid", "SCI-FI"],
    ["Kids Zone", "KIDS"], ["Rhythm Nation", "MUSIC"], ["Iron Monsoon", "ACTION"], ["News 24x7", "LIVE"],
    ["Desert Run", "ADVENTURE"], ["Laugh Riot", "COMEDY"], ["Deep Blue", "THRILLER"], ["Wild Trails", "FAMILY"],
    ["Cine Gold", "MOVIES"], ["Silent Valley", "DRAMA"], ["Midnight Express", "NEW"], ["Planet Wild", "DOCU"],
  ];
  const BANNER_COLORS = [
    ["#ff6a00", "#ee0979"], ["#0d3b66", "#26c6da"], ["#f857a6", "#ff5858"], ["#00c6ff", "#0072ff"],
    ["#11998e", "#38ef7d"], ["#8e2de2", "#4a00e0"], ["#232526", "#5b6a7a"], ["#8e0e00", "#1f1c18"],
    ["#c79081", "#dfa579"], ["#f7971e", "#ffd200"], ["#141e30", "#3a6186"], ["#56ab2f", "#a8e063"],
    ["#b8860b", "#3e2723"], ["#1b3a1f", "#c0ca33"], ["#3b1f6e", "#c2185b"], ["#134e5e", "#71b280"],
  ];
  function bannerHTML() {
    const rows = [];
    for (let r = 0; r < 4; r++) {
      let tiles = "";
      for (let i = 0; i < 8; i++) {
        const k = (i * 3 + r * 5) % BANNER_TITLES.length;
        const [t, tag] = BANNER_TITLES[k];
        tiles += `<span class="bt" style="background:linear-gradient(160deg, ${BANNER_COLORS[k].join(", ")})"><i>${tag}</i><b>${t}</b></span>`;
      }
      // Track contains the tiles twice so translateX(-50%) loops seamlessly
      rows.push(`<div class="track${r % 2 ? " rev" : ""}" style="animation-duration:${26 + r * 6}s">${tiles}${tiles}</div>`);
    }
    return `<div class="banner" aria-hidden="true">${rows.join("")}</div>`;
  }

  /* Ambient layer for the welcome/login screens: drifting neon glows + twinkling sparkles */
  function ambientHTML() {
    let seed = 11;
    const r = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    let stars = "";
    for (let i = 0; i < 16; i++) {
      const size = 6 + Math.round(r() * 8);
      stars += `<b style="left:${(r() * 94).toFixed(1)}%;top:${(18 + r() * 78).toFixed(1)}%;width:${size}px;height:${size}px;animation-delay:${(r() * 4).toFixed(2)}s;animation-duration:${(2.6 + r() * 2.4).toFixed(2)}s"></b>`;
    }
    return `<div class="ambient" aria-hidden="true"><i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i>${stars}</div>`;
  }

  /* Neon heartbeat + wave line, echoing the line through the VIBE logo */
  const PULSE = `
    <svg class="pulse-line" viewBox="0 0 320 28" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#ff3fd0"/><stop offset=".5" stop-color="#9b5cff"/><stop offset="1" stop-color="#2fd8ff"/></linearGradient></defs>
      <path class="pl-base" d="M0 14 H70 l6 -9 l6 18 l6 -22 l6 22 l5 -9 H128 C150 14 160 4 182 4 S214 24 236 24 S270 6 292 10 S310 14 320 14"/>
      <path class="pl-run" d="M0 14 H70 l6 -9 l6 18 l6 -22 l6 22 l5 -9 H128 C150 14 160 4 182 4 S214 24 236 24 S270 6 292 10 S310 14 320 14"/>
    </svg>`;
  const ARROW = `<span class="arr" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;

  function heroHTML(withBack) {
    return `
      ${ambientHTML()}
      <div class="hero">
        ${bannerHTML()}
        ${withBack ? `<button class="back-btn" data-act="back" aria-label="Back">${I.back}</button>` : ""}
        <img class="logo" src="${LOGO}" alt="VIBE – All-in-one hub" />
      </div>
      <h1 class="headline">Entertainment,<em>your way.</em></h1>
      ${PULSE}`;
  }

  function choiceHTML(key, selected) {
    const u = USER_TYPES[key];
    return `
      <button class="choice${selected ? " selected" : ""}" data-key="${key}" role="radio" aria-checked="${selected}">
        <span class="c-icon">${u.icon}</span>
        <span class="c-text"><b>${u.title}</b><small>${u.desc}</small></span>
        <span class="radio">${I.check}</span>
      </button>`;
  }

  // Single-select behaviour for a group of .choice cards
  function bindChoices(root, onChange) {
    $$(".choice", root).forEach((c) =>
      c.addEventListener("click", () => {
        $$(".choice", root).forEach((o) => { o.classList.remove("selected"); o.setAttribute("aria-checked", "false"); });
        c.classList.add("selected");
        c.setAttribute("aria-checked", "true");
        onChange(c.dataset.key);
      })
    );
  }

  function bindCommon(root) {
    $$('[data-act="back"]', root).forEach((b) => b.addEventListener("click", back));
  }

  function setLoading(btn, on) {
    btn.classList.toggle("loading", on);
    const sp = $(".spin", btn);
    if (on && !sp) btn.insertAdjacentHTML("afterbegin", '<span class="spin"></span>');
    if (!on && sp) sp.remove();
  }

  function shake(node) { node.classList.remove("invalid"); void node.offsetWidth; node.classList.add("invalid"); }

  /* =========================================================
     Screens
     ========================================================= */
  const SCREENS = {
    /* ---- Login / registration (per user type) ---- */
    login({ type = "cable", signup = false, service = null }) {
      const cfg = LOGIN[type];
      // Broadband registration (Sign up? / "New user? Register…") uses its own User ID + OTP screen
      if (cfg.otpRegister && signup) return otpRegisterScreen(type, cfg);
      const toOtpRegister = () => go("login", { type, signup: true });
      const ex = cfg.extra ? EXTRA[cfg.extra] : null;
      const once = !!cfg.extraOnlyOnRegister;      // Cable TV / Broadband: VSC / User ID only for first-time registration
      let reg = once ? signup : false;              // current mode for "once" types
      const needEx = () => !!ex && (!once || reg);
      const root = el(`
        <section class="screen-auth" data-screen="login-${type}">
          <div class="auth">
            ${heroHTML(true)}
            <p class="sub" id="subTxt"></p>
            <div class="row-between">
              <span class="role-label">${cfg.label}${service ? `<small class="svc-tag">${USER_TYPES[service].title}</small>` : ""}</span>
              <button class="link" data-act="change">Change Selection</button>
            </div>
            ${ex ? `
            <div class="ex-wrap" id="exWrap">
              <label class="field" id="exField">
                ${ex.icon}
                <input id="extra" type="text" inputmode="${ex.inputmode}" maxlength="${ex.maxlength}" autocomplete="off" placeholder="${ex.placeholder}" aria-label="${ex.label}" />
              </label>
              <p class="hint" id="exHint">${ex.hint}</p>
            </div>` : ""}
            <label class="field" id="mobField">
              ${I.userFill}
              <input id="mobile" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national" placeholder="Enter Mobile No" aria-label="Mobile number" />
            </label>
            <p class="hint" id="hint">10-digit mobile number</p>
            ${cfg.otpLogin ? `
            <div class="ex-wrap" id="lOtpWrap" hidden>
              <label class="field" id="lOtpField">
                ${I.key}
                <input id="lOtp" class="otp-in" type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="Enter 6-digit OTP" aria-label="OTP" />
              </label>
              <p class="hint" id="lOtpHint"></p>
              <div class="otp-links">
                <button class="link" id="lOtpEdit">Change number</button>
                <button class="link" id="lOtpResend" disabled></button>
              </div>
            </div>` : ""}
            <button class="btn dim" id="submit"><span class="lbl"></span>${ARROW}</button>
            ${once ? `<button class="link mode-switch" id="modeSwitch"></button>` : ""}
          </div>
        </section>`);

      bindCommon(root);
      // "Change Selection": step back if we came from a selection screen, else open it
      $('[data-act="change"]', root).addEventListener("click", () => {
        const prev = stack[stack.length - 2];
        if (prev && (prev.name === "role" || prev.name === "service")) back();
        else go("role");
      });

      const mob = $("#mobile", root), hint = $("#hint", root), btn = $("#submit", root), field = $("#mobField", root);
      const xin = $("#extra", root), xHint = $("#exHint", root), xField = $("#exField", root), xWrap = $("#exWrap", root);
      const sw = $("#modeSwitch", root);
      const mobOk = () => /^[6-9]\d{9}$/.test(mob.value);
      const valid = () => mobOk() && (!needEx() || ex.valid(xin.value));

      // Switch between "login with mobile" and "first-time registration with VSC / User ID"
      function setMode(r, animate) {
        if (once) reg = r;
        const isReg = once ? reg : signup;
        $("#subTxt", root).textContent = once && isReg ? cfg.subReg : cfg.sub;
        $(".lbl", btn).textContent = isReg ? (cfg.btnReg || "Register") : cfg.btn;
        if (xWrap) {
          xWrap.hidden = !needEx();
          if (animate && !xWrap.hidden) { xWrap.classList.remove("reveal"); void xWrap.offsetWidth; xWrap.classList.add("reveal"); }
        }
        if (sw) sw.textContent = reg ? "Already registered? Login with mobile number" : `New user? Register with ${ex.label}`;
        btn.classList.toggle("dim", !valid());
        updateMobHint();
      }

      function updateMobHint() {
        const n = mob.value.length;
        if (n === 0) { hint.textContent = "10-digit mobile number"; hint.className = "hint"; }
        else if (n < 10) { hint.textContent = `${n}/10 digits`; hint.className = "hint"; }
        else if (!/^[6-9]/.test(mob.value)) { hint.textContent = "Mobile number must start with 6, 7, 8 or 9"; hint.className = "hint err"; }
        else if (once && Registry.get(type, mob.value)) { hint.textContent = `✓ Registered ${USER_TYPES[type].title} user – no ${ex.label} needed`; hint.className = "hint ok"; }
        else if (cfg.track) {
          // Guest: mobile only – first time registers, after that logs in
          const known = Registry.get(type, mob.value);
          hint.textContent = known ? "✓ Registered guest – login with your mobile number" : "✓ New number – you'll be registered as a guest";
          hint.className = "hint ok";
          $(".lbl", btn).textContent = known ? "Login" : "Register";
          return;
        }
        else if (once && !reg) { hint.textContent = "✓ Valid mobile number"; hint.className = "hint ok"; }
        else { hint.textContent = "✓ Valid mobile number"; hint.className = "hint ok"; }
      }

      if (ex) xin.addEventListener("input", () => {
        xin.value = ex.clean(xin.value);
        xField.classList.remove("invalid");
        if (!xin.value) { xHint.textContent = ex.hint; xHint.className = "hint"; }
        else if (ex.valid(xin.value)) { xHint.textContent = `✓ Valid ${ex.label}`; xHint.className = "hint ok"; }
        else { xHint.textContent = cfg.extra === "vsc" ? `${xin.value.length} digits entered` : ex.hint; xHint.className = "hint"; }
        btn.classList.toggle("dim", !valid());
      });
      if (ex) xin.addEventListener("keydown", (e) => { if (e.key === "Enter") mob.focus(); });

      mob.addEventListener("input", () => {
        mob.value = mob.value.replace(/\D/g, "").slice(0, 10);
        field.classList.remove("invalid");
        updateMobHint();
        btn.classList.toggle("dim", !valid());
      });
      mob.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
      if (sw) sw.addEventListener("click", () => {
        if (cfg.otpRegister) return toOtpRegister();
        setMode(!reg, true); (reg ? xin : mob).focus();
      });

      /* Broadband login OTP step: registered number → OTP (DEMO_OTP) → logged in */
      let otpStep = false, otpOk = false, otpTimer = null;
      const lOtpWrap = $("#lOtpWrap", root), lOtp = $("#lOtp", root), lOtpField = $("#lOtpField", root);
      const lOtpHint = $("#lOtpHint", root), lResend = $("#lOtpResend", root);
      function sendLoginOtp() {
        lOtp.value = "";
        lOtpField.classList.remove("invalid");
        lOtpHint.textContent = `OTP sent to ${maskMobile(mob.value)} · Demo OTP: ${DEMO_OTP}`;
        lOtpHint.className = "hint ok";
        toast(`Demo OTP: ${DEMO_OTP} (no SMS sent)`, "info", 5000);
        clearInterval(otpTimer);
        let left = RESEND_SECS;
        lResend.disabled = true;
        lResend.textContent = `Resend OTP in ${left}s`;
        otpTimer = setInterval(() => {
          if (!root.isConnected) return clearInterval(otpTimer);
          left -= 1;
          if (left > 0) { lResend.textContent = `Resend OTP in ${left}s`; return; }
          clearInterval(otpTimer);
          lResend.disabled = false;
          lResend.textContent = "Resend OTP";
        }, 1000);
      }
      function startLoginOtp() {
        otpStep = true;
        mob.readOnly = true;
        $("#subTxt", root).textContent = cfg.otpSubLogin;
        lOtpWrap.hidden = false;
        lOtpWrap.classList.remove("reveal"); void lOtpWrap.offsetWidth; lOtpWrap.classList.add("reveal");
        $(".lbl", btn).textContent = "Verify & Login";
        btn.classList.add("dim");
        sendLoginOtp();
        lOtp.focus();
      }
      function endLoginOtp() {
        otpStep = false;
        clearInterval(otpTimer);
        lOtpWrap.hidden = true;
        mob.readOnly = false;
        setMode(reg, false);
        mob.focus();
      }
      if (lOtp) {
        lOtp.addEventListener("input", () => {
          lOtp.value = lOtp.value.replace(/\D/g, "").slice(0, 6);
          lOtpField.classList.remove("invalid");
          btn.classList.toggle("dim", lOtp.value.length !== 6);
          if (lOtp.value.length === 6) btn.click();   // auto-verify once all 6 digits are in
        });
        lOtp.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
        $("#lOtpEdit", root).addEventListener("click", endLoginOtp);
        lResend.addEventListener("click", () => { if (!lResend.disabled) { sendLoginOtp(); lOtp.focus(); } });
      }

      btn.addEventListener("click", async () => {
        if (btn.classList.contains("loading")) return;
        if (otpStep) {
          if (lOtp.value !== DEMO_OTP) {
            shake(lOtpField);
            lOtpHint.textContent = lOtp.value.length < 6 ? "Enter the 6-digit OTP" : "Incorrect OTP – please try again";
            lOtpHint.className = "hint err";
            if (lOtp.value.length === 6) toast("Incorrect OTP", "error");
            return lOtp.focus();
          }
          otpOk = true;
        }
        if (needEx() && !ex.valid(xin.value)) {
          shake(xField);
          xHint.textContent = ex.err; xHint.className = "hint err";
          toast(ex.err, "error");
          return xin.focus();
        }
        if (!mobOk()) {
          shake(field);
          hint.textContent = mob.value.length < 10 ? "Please enter a valid 10-digit mobile number" : "Mobile number must start with 6, 7, 8 or 9";
          hint.className = "hint err";
          toast("Please enter a valid mobile number", "error");
          return mob.focus();
        }
        mob.blur();
        setLoading(btn, true);
        await wait(1300);
        setLoading(btn, false);

        let registered = signup;   // which success message to show
        let extraVal = ex && needEx() ? xin.value : undefined;

        if (once) {
          const known = Registry.get(type, mob.value);
          if (!reg && !known && cfg.otpRegister) {
            // Broadband: unregistered number → open the User ID + OTP register screen
            toast("New number – register with your User ID (first time only)", "error", 3200);
            return toOtpRegister();
          }
          if (!reg && !known) {
            // Not registered yet → ask for VSC / User ID once
            setMode(true, true);
            toast(`New number – enter your ${ex.label} to register (first time only)`, "error", 3200);
            return xin.focus();
          }
          if (reg && known) {
            // Already registered → just log in, keep the original VSC / User ID
            toast("This number is already registered – logged in with mobile", "info", 3000);
            registered = false;
            extraVal = known.id;
          } else if (reg) {
            Registry.add(type, mob.value, xin.value);
            registered = true;
          } else {
            registered = false;
            extraVal = known.id;
          }
        }

        // Broadband: registered number → ask for the OTP before logging in
        if (cfg.otpLogin && !registered && !otpOk) { startLoginOtp(); return; }
        clearInterval(otpTimer);

        if (cfg.track) {
          // Guest: no extra ID – the mobile number alone registers the first time
          registered = !Registry.get(type, mob.value);
          if (registered) Registry.add(type, mob.value, "");
        }

        state.session = { type, mobile: mob.value };
        if (service) state.session.service = service;   // LCO: Broadband or Cable TV
        if (cfg.extra && extraVal) state.session[cfg.extra] = extraVal;

        const tracked = once || !!cfg.track;
        const extraLine = extraVal ? `${ex.short}: ${esc(extraVal)}<br/>` : "";
        const title = tracked ? (registered ? cfg.doneReg : cfg.done) : (signup ? "Registration successful" : cfg.done);
        const msg = tracked ? (registered ? cfg.doneRegMsg : cfg.doneMsg) : (signup ? "Your account has been registered for this demo." : cfg.doneMsg);
        openSheet(`
          <div class="ok-badge">${I.checkBig}</div>
          <h3>${title}</h3>
          <p>${msg}<br/>${extraLine}Mobile: +91 ${mob.value.replace(/(\d{5})(\d{5})/, "$1 $2")}</p>
          <span class="demo-tag">Demo • No real OTP sent</span>
          <button class="btn" id="toHome">Continue to Home</button>`, (sh) => {
          $("#toHome", sh).addEventListener("click", () => enterHome(type));
        });
        toast(registered ? "Registered successfully (demo)" : "Logged in successfully (demo)", "success");
      });

      setMode(reg, false);
      return root;
    },

    /* ---- First page: Customer / LCO ---- */
    role({ first = false }) {
      const root = el(`
        <section data-screen="role">
          <div class="auth">
            ${heroHTML(!first)}
            <p class="sub">Choose an option to continue</p>
            <div class="choices" role="radiogroup" aria-label="User type">
              ${choiceHTML("customer", state.role === "customer")}
              ${choiceHTML("lco", state.role === "lco")}
              ${choiceHTML("guest", state.role === "guest")}
            </div>
            <button class="btn" id="cont"><span class="lbl">Continue</span>${ARROW}</button>
            <div class="features">
              <div class="feat-row">
                <span class="feat">${I.tv}<b>Live TV</b></span>
                <span class="feat">${I.monitor}<b>OTT Apps</b></span>
                <span class="feat">${I.wifi}<b>Broadband</b></span>
              </div>
              <p class="feat-cap">Everything you watch — all in one hub</p>
              <p class="terms">By continuing you agree to VIBE's <button class="tlink" data-toast="Terms of Service (demo)">Terms</button> &amp; <button class="tlink" data-toast="Privacy Policy (demo)">Privacy Policy</button></p>
            </div>
          </div>
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      bindCommon(root);
      bindChoices(root, (k) => (state.role = k));
      $("#cont", root).addEventListener("click", () => {
        // LCO and Customer both pick Broadband / Cable TV next; Guest goes straight to login
        if (state.role === "guest") go("login", { type: "guest" });
        else go("service");
      });
      return root;
    },

    /* ---- Broadband / Cable TV / Guest ---- */
    service() {
      const root = el(`
        <section data-screen="service">
          <div class="auth">
            ${heroHTML(true)}
            <p class="sub">Log in / Register</p>
            <button class="link right" data-act="change">Change user type</button>
            <div class="choices" role="radiogroup" aria-label="Connection type">
              ${choiceHTML("broadband", state.service === "broadband")}
              ${choiceHTML("cable", state.service === "cable")}
            </div>
            <button class="btn" id="cont"><span class="lbl">Login</span>${ARROW}</button>
            ${state.role === "lco" ? "" : `<button class="link signup" id="signup">Sign up?</button>`}
          </div>
        </section>`);
      bindCommon(root);
      $('[data-act="change"]', root).addEventListener("click", back);
      bindChoices(root, (k) => (state.service = k));
      // LCO partners: after choosing Broadband / Cable TV → LCO ID + OTP screen (no Sign up? option).
      // Customers go to the Broadband / Cable TV login as before.
      const isLco = state.role === "lco";
      $("#cont", root).addEventListener("click", async () => {
        if (isLco) go("lcoAuth", { service: state.service });
        else go("login", { type: state.service });
      });
      if (!isLco) $("#signup", root).addEventListener("click", () => {
        go("login", { type: state.service, signup: true });
      });
      return root;
    },

    /* ---- LCO: LCO ID → OTP (after choosing Broadband / Cable TV) ---- */
    lcoAuth({ service = "cable" }) {
      return otpRegisterScreen("lco", LCO_OTP, service);
    },

    /* ---- LCO dashboard (layout from the LCO app screenshot, in VIBE colours) ---- */
    lcoDash() {
      const sess = state.session || {};
      const svc = sess.service ? USER_TYPES[sess.service].title : "";
      const P = LCO_DATA.partner;
      const due = P.due.map(([label, man, auto]) => `<tr><th>${label}</th><td>${man}</td><td>${auto}</td></tr>`).join("");
      const root = el(`
        <section class="screen-fixed tv lco" data-screen="lco-dashboard">
          <div class="tv-scroll">
            <header class="lco-top">
              <h2>Dashboard</h2>
              <button class="lco-ic" data-act="sub-search" aria-label="Search Subscriber">${I.search}</button>
              <button class="lco-ic" data-act="refresh" aria-label="Refresh">${I.refresh}</button>
              <button class="lco-logout" data-act="logout">Logout ${I.logout}</button>
            </header>
            <div class="lco-pills">
              <button class="lco-pill" data-act="watch-ott">Watch OTT</button>
              <button class="lco-pill" data-toast="Switch Partner (demo)">Switch Partner</button>
            </div>
            <div class="lco-partner">
              <div class="lco-pname">
                <b>${P.name}</b>
                <small>(${esc(sess.lcoid || P.code)})${svc ? ` · ${svc}` : ""}</small>
              </div>
              <div class="lco-wallet">
                <small>Wallet balance</small>
                <b>₹ ${P.wallet}</b>
                ${I.wallet}
              </div>
            </div>
            <div class="lco-stats">
              <button class="lco-stat" data-go="stock"><span>STB In Stock</span><b>${P.counts.stock}</b></button>
              <button class="lco-stat" data-go="active"><span>Active STB</span><b>${P.counts.active}</b></button>
              <button class="lco-stat" data-go="da"><span>DA STB</span><b>${P.counts.da}</b></button>
            </div>
            <div class="lco-card">
              <h4>Subscribers Due For Recharge</h4>
              <table class="lco-due"><thead><tr><th></th><th>Manual</th><th>Auto</th></tr></thead><tbody>${due}</tbody></table>
            </div>
            <div class="lco-card lco-line">Last Kitty Recharge : ₹ ${P.kitty.amount} on ${P.kitty.at}</div>
            <div class="lco-card">
              <h4>Complaints</h4>
              <div class="lco-3">
                <span>Total<b>${P.complaints.total}</b></span>
                <span>Pending<b>${P.complaints.pending}</b></span>
                <span>Closed<b>${P.complaints.closed}</b></span>
              </div>
            </div>
            <button class="lco-card lco-line" data-toast="DPO Pack Penetration (demo)">DPO Pack Penetration :</button>
            <button class="lco-card lco-line" data-go="ott-activate">${I.plus} Register Guest Customer</button>
            <div class="lco-grid2">
              <button class="lco-tile" data-go="cable">${I.users}<span>Cable<br/>Subscribers</span></button>
              <button class="lco-tile" data-go="ott">${I.users}<span>OTT<br/>Subscribers</span></button>
              <button class="lco-tile" data-go="topup-catv"><b>₹ ${P.wallet}</b>${I.wallet}<span>CATV<br/>Wallet Top Up</span></button>
              <button class="lco-tile" data-go="topup-ott"><b>₹ ${P.ottWallet}</b>${I.wallet}<span>OTT<br/>Wallet Top Up</span></button>
            </div>
            <button class="lco-card lco-line" data-go="commission">${I.card} OTT Commission</button>
          </div>
          ${lcoNavHTML("home")}
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $$("[data-go]", root).forEach((b) => b.addEventListener("click", () => {
        const g = b.dataset.go;
        if (g === "stock") go("lcoStock");
        else if (g === "ott") go("lcoOtt");
        else if (g === "topup-catv") go("lcoTopUp", { wallet: "catv" });
        else if (g === "topup-ott") go("lcoTopUp", { wallet: "ott" });
        else if (g === "commission") go("lcoCommission");
        else if (g === "ott-activate") go("lcoOttActivate");
        else go("lcoStbs", { kind: g });   // active | da | cable
      }));
      bindLcoNav(root, "home");
      $('[data-act="sub-search"]', root).addEventListener("click", openSubSearch);
      $('[data-act="watch-ott"]', root).addEventListener("click", watchOtt);
      $('[data-act="refresh"]', root).addEventListener("click", async () => {
        showLoader("Refreshing…");
        await wait(700);
        hideLoader();
        toast("Dashboard updated", "success");
      });
      $('[data-act="logout"]', root).addEventListener("click", lcoLogout);
      return root;
    },

    /* ---- LCO: CATV / OTT Wallet Top Up (Pay Now is simulated; balance + history update in this session) ---- */
    lcoTopUp({ wallet = "catv" }) {
      // wallet: "catv" | "ott" (Cable LCO) | "bb" (Broadband LCO wallet, from its Home / menu)
      const P = wallet === "bb" ? BB_DATA.partner : LCO_DATA.partner;
      const sess = state.session || {};
      const key = wallet === "ott" ? "ottWallet" : "wallet";
      const title = { catv: "CATV Wallet Top Up", ott: "OTT Wallet Top Up", bb: "Wallet Top Up" }[wallet];
      const txns = wallet === "bb" ? BB_DATA.txns : LCO_DATA.txns[wallet];
      let show = "all";
      const root = el(`
        <section class="tv lco" data-screen="lco-topup-${wallet}">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>${title}</h2>
          </header>
          <div class="lco-bal">${I.wallet}<b id="bal">₹ ${P[key]}</b></div>
          <div class="lco-card lco-form">
            <label class="lco-fl"><small>Enter Email</small><input id="email" type="email" value="${P.email}" autocomplete="email" /></label>
            <label class="lco-fl"><small>Mobile Number</small><input id="mob" type="tel" inputmode="numeric" maxlength="10" value="${sess.mobile || DEMO_MOBILE}" /></label>
            <label class="lco-fl"><small>Enter Amount</small><input id="amt" type="text" inputmode="decimal" placeholder="Enter Amount" /></label>
            <p class="hint" id="err"></p>
            <button class="btn" id="pay"><span class="lbl">Pay Now</span></button>
          </div>
          <div class="lco-radios" role="radiogroup" aria-label="Show">
            ${[["all", "All"], ["success", "Success"], ["fail", "Fail"]].map(([k, l]) =>
              `<button role="radio" data-show="${k}" class="${k === "all" ? "on" : ""}" aria-checked="${k === "all"}"><i></i>${l}</button>`).join("")}
          </div>
          <div class="lco-list" id="list"></div>
        </section>`);
      bindCommon(root);
      const email = $("#email", root), mob = $("#mob", root), amt = $("#amt", root), err = $("#err", root), btn = $("#pay", root);
      const fail = (input, msg) => { shake(input.closest(".lco-fl")); err.textContent = msg; err.className = "hint err"; toast(msg, "error"); input.focus(); };
      const draw = () => {
        const list = txns.filter((t) => show === "all" || t.status === show);
        $("#list", root).innerHTML = list.length
          ? list.map((t) => `
            <div class="lco-txn">
              <span><b>₹ ${money(t.amount)}</b><small>${stamp(t.at)}</small><small>${t.id}</small></span>
              <em class="lco-badge ${t.status === "success" ? "active" : "suspended"}">${t.status === "success" ? "Success" : "Fail"}</em>
            </div>`).join("")
          : `<p class="more-note">No ${show === "all" ? "" : show === "success" ? "successful " : "failed "}transactions</p>`;
      };
      mob.addEventListener("input", () => { mob.value = mob.value.replace(/\D/g, "").slice(0, 10); });
      amt.addEventListener("input", () => { amt.value = amt.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1").replace(/(\.\d{2}).+/, "$1"); err.textContent = ""; });
      amt.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
      btn.addEventListener("click", async () => {
        if (btn.classList.contains("loading")) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return fail(email, "Enter a valid email");
        if (!/^[6-9]\d{9}$/.test(mob.value)) return fail(mob, "Enter a valid 10-digit mobile number");
        const n = parseFloat(amt.value);
        if (!(n >= 1 && n <= 100000)) return fail(amt, "Enter an amount between ₹1 and ₹1,00,000");
        err.textContent = "";
        amt.blur();
        setLoading(btn, true);
        await wait(1300);
        setLoading(btn, false);
        P[key] = money(parseFloat(P[key]) + n);
        const txn = { id: "TXN" + String(Date.now()).slice(-10), amount: n, status: "success", at: new Date() };
        txns.unshift(txn);
        $("#bal", root).textContent = `₹ ${P[key]}`;
        amt.value = "";
        draw();
        openSheet(`
          <div class="ok-badge">${I.checkBig}</div>
          <h3>Payment successful</h3>
          <p>₹ ${money(n)} added to your ${{ catv: "CATV ", ott: "OTT ", bb: "" }[wallet]}wallet.<br/>New balance: ₹ ${P[key]}<br/>Txn ID: ${txn.id}</p>
          <span class="demo-tag">Demo • No real payment made</span>
          <button class="btn" id="okPay">Done</button>`, (sh) => { $("#okPay", sh).addEventListener("click", closeSheet); });
        toast("Payment successful (demo)", "success");
      });
      $$("[data-show]", root).forEach((b) => b.addEventListener("click", () => {
        show = b.dataset.show;
        $$("[data-show]", root).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); });
        draw();
      }));
      draw();
      return root;
    },

    /* ---- LCO: OTT Commission (date range → search → commission cards) ---- */
    lcoCommission() {
      const today = new Date();
      const from0 = new Date(today.getTime() - 30 * 864e5);
      const root = el(`
        <section class="tv lco" data-screen="lco-commission">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>OTT Commission</h2>
          </header>
          <div class="lco-dates">
            <label class="lco-date">${I.calendar}<span id="fromTxt">${dmy(from0)}</span><input id="from" type="date" value="${isoDay(from0)}" max="${isoDay(today)}" aria-label="From date" /></label>
            <label class="lco-date">${I.calendar}<span id="toTxt">${dmy(today)}</span><input id="to" type="date" value="${isoDay(today)}" max="${isoDay(today)}" aria-label="To date" /></label>
            <button class="lco-go" id="go" aria-label="Search">${I.search}</button>
          </div>
          <div class="lco-list" id="list"></div>
          <p class="more-note" id="note"></p>
        </section>`);
      bindCommon(root);
      const from = $("#from", root), to = $("#to", root);
      const parse = (v) => { const [y, m, d] = v.split("-").map(Number); return new Date(y, m - 1, d); };
      [[from, "#fromTxt"], [to, "#toTxt"]].forEach(([inp, txt]) => {
        inp.addEventListener("change", () => { if (inp.value) $(txt, root).textContent = dmy(parse(inp.value)); });
        // Tap anywhere on the date box → open the native date picker
        inp.addEventListener("click", () => { try { inp.showPicker(); } catch (e) { /* older browsers: default behaviour */ } });
      });
      const draw = () => {
        const a = parse(from.value), b = new Date(parse(to.value).getTime() + 864e5 - 1);
        if (a > b) { toast("From date must be before To date", "error"); return; }
        const list = LCO_DATA.commission.filter((c) => c.at >= a && c.at <= b);
        $("#list", root).innerHTML = list.length
          ? list.map((c) => `
            <div class="lco-card lco-comm">
              <div class="lco-comm-h"><b class="${c.amount > 0 ? "ok" : "off"}">₹ ${c.amount.toFixed(1)}</b><span>${stamp(c.at)}</span></div>
              <p><span>Type</span><b>: ${c.type}</b></p>
              <p><span>Total transaction amount</span><b>: ₹ ${c.total.toFixed(1)}</b></p>
              <p><span>Opening wallet</span><b>: ₹ ${c.opening.toFixed(1)}</b></p>
              <p><span>Closing wallet</span><b>: ₹ ${c.closing.toFixed(1)}</b></p>
            </div>`).join("")
          : `<div class="empty">${I.calendar}<b>No commission found</b><p>Try a different date range.</p></div>`;
        $("#note", root).textContent = list.length ? `${list.length} entr${list.length === 1 ? "y" : "ies"} from ${dmy(a)} to ${dmy(parse(to.value))}` : "";
      };
      $("#go", root).addEventListener("click", draw);
      draw();
      return root;
    },

    /* ---- LCO: Profile (bottom bar → profile icon) ---- */
    lcoProfile() {
      const sess = state.session || {};
      const P = LCO_DATA.partner;
      const root = el(`
        <section class="screen-fixed tv lco" data-screen="lco-profile">
          <div class="tv-scroll">
            <header class="lco-top">
              <h2>Profile</h2>
              <button class="lco-logout" data-act="logout">Logout ${I.logout}</button>
            </header>
            <div class="lco-pills">
              <button class="lco-pill" data-act="watch-ott">Watch OTT</button>
              <button class="lco-pill" data-toast="Switch Partner (demo)">Switch Partner</button>
            </div>
            <div class="lco-card lco-pcard">
              <div class="lco-pav">${P.name[0]}</div>
              <h3>${P.name}</h3>
              <p>User ID: ${esc(sess.lcoid || P.code)}</p>
              <p>Mobile: ${sess.mobile || DEMO_MOBILE}</p>
              <p>Email: ${P.email}</p>
            </div>
            <div class="menu lco-menu">
              <button data-toast="Change Password (demo)">${I.lock}Change Password<span class="chev">${I.chev}</span></button>
              <button class="danger" data-act="logout">${I.logout}Logout<span class="chev">${I.chev}</span></button>
            </div>
          </div>
          ${lcoNavHTML("profile")}
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $$('[data-act="logout"]', root).forEach((b) => b.addEventListener("click", lcoLogout));
      $('[data-act="watch-ott"]', root).addEventListener("click", watchOtt);
      bindLcoNav(root, "profile");
      return root;
    },

    /* ---- LCO: OTT Subscribers → "Customer" (tabs All / Active / Inactive / Suspended, search by user name) ---- */
    lcoOtt() {
      const all = LCO_DATA.ott;
      const TABS = [["all", "All"], ["active", "Active"], ["inactive", "Inactive"], ["suspended", "Suspended"]];
      let tab = "all";
      const root = el(`
        <section class="tv lco" data-screen="lco-ott-customers">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Customer</h2>
            <button class="lco-ic lco-funnel" data-toast="Filter (demo)" aria-label="Filter">${I.filter}</button>
          </header>
          <div class="lco-tabs" role="tablist">
            ${TABS.map(([k, l]) => `<button role="tab" data-tab="${k}" class="${k === "all" ? "on" : ""}">${l}</button>`).join("")}
          </div>
          <label class="lco-search">${I.search}<input id="q" type="search" placeholder="Search by User Name" aria-label="Search by User Name" /></label>
          <div class="lco-list" id="list"></div>
          <!-- Shown when a customer card is selected: user name + Recharge / Invoice -->
          <div class="lco-selbar" id="selbar" hidden>
            <b id="selName"></b>
            <div class="lco-selbtns">
              <button class="lco-pill big" data-act="recharge">${I.card}Recharge</button>
              <button class="lco-pill big" data-act="invoice">${I.news}Invoice</button>
            </div>
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      const q = $("#q", root);
      const label = OTT_STATUS;
      const selected = () => LCO_DATA.ott.find((c) => c.id === state.ottSel);
      const syncBar = () => {
        const c = selected();
        $("#selbar", root).hidden = !c;
        if (c) $("#selName", root).textContent = c.user;
      };
      const draw = () => {
        const t = q.value.trim().toLowerCase();
        const list = all.filter((c) => (tab === "all" || c.status === tab) && c.user.toLowerCase().includes(t));
        $("#list", root).innerHTML = list.length
          ? list.map((c) => `
            <div class="lco-ott-card${c.id === state.ottSel ? " sel" : ""}" data-id="${c.id}" role="button" tabindex="0" aria-pressed="${c.id === state.ottSel}">
              <div class="lco-ott-top">
                <i class="lco-dot"></i>
                <b>${c.user}</b>
                <span class="lco-badge ${c.status}">${label[c.status]}</span>
              </div>
              <div class="lco-ott-bot">
                <button class="lco-call" data-toast="Calling ${c.mobile} (demo)">${I.phone}${c.mobile}</button>
                <span class="lco-ott-acts">
                  <button data-pick="${c.id}" aria-label="Recharge / Invoice for ${c.user}" aria-pressed="${c.id === state.ottSel}">${I.gear}</button>
                  <button data-toast="Message ${c.mobile} (demo)" aria-label="Message">${I.mail}</button>
                  <button data-info="${c.id}" aria-label="Customer details">${I.info}</button>
                </span>
              </div>
            </div>`).join("")
          : `<div class="empty">${I.search}<b>No customer found</b><p>Try another tab or user name.</p></div>`;
        const listEl = $("#list", root);
        $$("[data-toast]", listEl).forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); toast(b.dataset.toast); }));
        $$("[data-info]", listEl).forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); go("lcoOttDetail", { id: +b.dataset.info }); }));
        // ⚙ icon (as in the LCO app) — or tapping the card — selects the customer (again = unselect)
        // → bottom bar with the user name + Recharge / Invoice
        $$("[data-pick]", listEl).forEach((b) => b.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = +b.dataset.pick;
          state.ottSel = state.ottSel === id ? null : id;
          draw();
        }));
        $$("[data-id]", listEl).forEach((card) => {
          const pick = () => { const id = +card.dataset.id; state.ottSel = state.ottSel === id ? null : id; draw(); };
          card.addEventListener("click", pick);
          card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
        });
        syncBar();
      };
      $('[data-act="recharge"]', root).addEventListener("click", () => { const c = selected(); if (c) go("lcoRenew", { id: c.id }); });
      $('[data-act="invoice"]', root).addEventListener("click", () => { const c = selected(); if (c) openOttInvoice(c); });
      $$("[data-tab]", root).forEach((b) => b.addEventListener("click", () => {
        tab = b.dataset.tab;
        $$("[data-tab]", root).forEach((x) => x.classList.toggle("on", x === b));
        draw();
      }));
      q.addEventListener("input", draw);
      draw();
      return root;
    },

    /* =====================================================================
       Broadband LCO (LCO → Broadband → LCO ID → OTP). Layout from the
       broadband LCO app screenshot, in VIBE colours. Bottom bar: Home / Case / Customer / ☰ menu
       ===================================================================== */
    bbDash() {
      const sess = state.session || {};
      const P = BB_DATA.partner, C = P.counts;
      const openCases = BB_DATA.cases.filter((c) => c.status !== "done").length;
      const unassigned = BB_DATA.cases.filter((c) => !c.assigned).length;
      const RANGES = { day: 1, week: 7, month: 30 };
      let range = "month";
      const root = el(`
        <section class="screen-fixed tv lco bb" data-screen="bb-dashboard">
          <div class="tv-scroll">
            <header class="bb-head">
              <span class="lco-av">${P.name[0]}</span>
              <span class="bb-brand"><b>${P.name}</b><small>${esc(sess.lcoid || "")} · Broadband</small></span>
              <button class="lco-ic" data-toast="No new notifications (demo)" aria-label="Notifications">${I.bell}</button>
              <button class="lco-ic" data-act="logout" aria-label="Logout">${I.logout}</button>
            </header>
            <div class="lco-pills">
              <button class="lco-pill" data-go="topup">${I.wallet}₹ ${P.wallet}</button>
              <button class="lco-pill" data-act="watch-ott">Watch OTT</button>
            </div>
            <button class="lco-search bb-search" data-go="search">${I.search}<span>Search 'Username'</span></button>
            <div class="bb-stats">
              ${[["active", "Active", C.active], ["inactive", "Inactive", C.inactive], ["online", "Online", C.online], ["expired", "Expired", C.expired]]
                .map(([k, l, n]) => `<button class="lco-stat" data-view="${k}"><b>${n}</b><span>${l}</span></button>`).join("")}
            </div>
            <div class="bb-mid">
              <div class="bb-quick">
                <button data-go="customers">${I.users}<span>Customer</span><b>${C.customers}</b></button>
                <button data-go="cases">${I.ticket}<span>Complaints</span><b>${openCases}</b></button>
                <button data-go="unassigned">${I.alert}<span>Unassigned</span><b>${unassigned}</b></button>
              </div>
              <div class="bb-exp">
                <small>Expiring soon</small>
                <button class="bb-ring" data-go="renewal" aria-label="Customers expiring soon"><b id="expN"></b></button>
                <div class="bb-seg" role="radiogroup" aria-label="Expiring within">
                  ${Object.keys(RANGES).map((k) => `<button role="radio" data-range="${k}" class="${k === range ? "on" : ""}" aria-checked="${k === range}">${k[0].toUpperCase() + k.slice(1)}</button>`).join("")}
                </div>
              </div>
            </div>
            <div class="lco-card bb-grid">
              <button data-go="topup">${I.wallet}<span>Top Up</span></button>
              <button data-toast="Collect Payment (demo)">${I.rupee}<span>Payment</span></button>
              <button data-go="commission">${I.card}<span>OTT Commission</span></button>
              <button data-toast="Report (demo)">${I.chart}<span>Report</span></button>
              <button data-go="plans">${I.news}<span>Available Plan</span></button>
              <button data-go="profile">${I.user}<span>Profile</span></button>
            </div>
          </div>
          ${bbNavHTML("home")}
        </section>`);
      const expiring = () => bbExpiring(RANGES[range]).length;
      const drawExp = () => { $("#expN", root).textContent = expiring(); };
      $$("[data-range]", root).forEach((b) => b.addEventListener("click", () => {
        range = b.dataset.range;
        $$("[data-range]", root).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); });
        drawExp();
      }));
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $$("[data-view]", root).forEach((b) => b.addEventListener("click", () => go("bbCustomers", { view: b.dataset.view })));
      $$("[data-go]", root).forEach((b) => b.addEventListener("click", () => {
        const g = b.dataset.go;
        if (g === "topup") go("lcoTopUp", { wallet: "bb" });
        else if (g === "search") go("bbCustomers", { focus: true });
        else if (g === "customers") go("bbCustomers");
        else if (g === "cases") go("bbCases", { tab: "all" });
        else if (g === "unassigned") go("bbCases", { tab: "unassigned" });
        else if (g === "renewal") go("bbCustomers", { view: "renewal", days: RANGES[range] });
        else if (g === "commission") go("lcoCommission");
        else if (g === "plans") go("bbPlans");
        else if (g === "profile") go("bbProfile");
      }));
      $('[data-act="logout"]', root).addEventListener("click", lcoLogout);
      $('[data-act="watch-ott"]', root).addEventListener("click", watchOtt);
      bindBbNav(root, "home");
      drawExp();
      return root;
    },

    /* ---- Broadband LCO: Case Management (Assigned / Unassigned / Completed / All) ---- */
    bbCases({ tab = "assigned" } = {}) {
      let mine = false;
      const TABS = [["assigned", "Assigned"], ["unassigned", "Unassigned"], ["completed", "Completed"], ["all", "All"]];
      const root = el(`
        <section class="screen-fixed tv lco bb" data-screen="bb-cases">
          <div class="tv-scroll">
            <header class="sub-head"><h2>Case Management</h2></header>
            <div class="lco-tabs" role="tablist">
              ${TABS.map(([k, l]) => `<button role="tab" data-tab="${k}" class="${k === tab ? "on" : ""}" aria-selected="${k === tab}">${l}</button>`).join("")}
            </div>
            <div class="bb-casebar">
              <label class="bb-check"><input type="checkbox" id="mine" /><span>My Case</span></label>
              <button class="lco-ic" data-toast="Filter cases (demo)" aria-label="Filter">${I.filter}</button>
            </div>
            <div class="lco-list" id="list"></div>
          </div>
          <div class="bb-dial" id="dial" hidden>
            <button data-dial="customer">${I.users}<span>Customer</span>${I.chev}</button>
            <button data-dial="case">${I.ticket}<span>New Case</span>${I.chev}</button>
          </div>
          <button class="bb-fab" id="fab" aria-label="More actions" aria-expanded="false">${I.plus}</button>
          ${bbNavHTML("case")}
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      const inTab = (c) => tab === "all" || (tab === "assigned" ? c.assigned && c.status !== "done" : tab === "unassigned" ? !c.assigned : c.status === "done");
      const draw = () => {
        const list = BB_DATA.cases.filter((c) => inTab(c) && (!mine || c.mine));
        $("#list", root).innerHTML = list.length
          ? list.map((c) => `
            <div class="bb-case">
              <div class="bb-case-h"><b>${c.id}</b><button class="lco-ic" data-case="${c.id}" aria-label="View case ${c.id}">${I.eye}</button></div>
              <div class="bb-case-g">
                <span>${I.user}C: ${esc(c.cust)}</span>
                <span>${I.calendar}${stamp(c.at)}</span>
                <span>${I.userFill}${esc(c.user)}<button class="bb-copy" data-copy="${esc(c.user)}" aria-label="Copy user name">${I.copy}</button></span>
                <span>${I.users}${c.assigned ? `A: ${esc(c.to)}` : "Not assigned"}</span>
                <span>${I.alert}${c.cat}</span>
                <span class="bb-cs ${c.status}">${CASE_STATUS[c.status]}</span>
              </div>
            </div>`).join("")
          : `<div class="empty">${I.ticket}<b>No case found</b><p>Try another tab${mine ? " or untick My Case" : ""}.</p></div>`;
        $$("[data-case]", root).forEach((b) => b.addEventListener("click", () => openCaseSheet(BB_DATA.cases.find((c) => c.id === b.dataset.case), draw)));
        $$("[data-copy]", root).forEach((b) => b.addEventListener("click", () => {
          try { navigator.clipboard.writeText(b.dataset.copy); } catch (e) { /* clipboard blocked: still show the toast */ }
          toast(`Copied ${b.dataset.copy}`);
        }));
      };
      const setTab = (k) => {
        tab = k;
        $$("[data-tab]", root).forEach((x) => { const on = x.dataset.tab === k; x.classList.toggle("on", on); x.setAttribute("aria-selected", on); });
        draw();
      };
      $$("[data-tab]", root).forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
      $("#mine", root).addEventListener("change", (e) => { mine = e.target.checked; draw(); });
      // FAB → speed dial (Customer / New Case)
      const fab = $("#fab", root), dial = $("#dial", root);
      const toggleDial = (open) => { dial.hidden = !open; fab.classList.toggle("open", open); fab.setAttribute("aria-expanded", open); };
      fab.addEventListener("click", () => toggleDial(dial.hidden));
      $('[data-dial="customer"]', root).addEventListener("click", () => { toggleDial(false); swapRoute("bbCustomers"); });
      $('[data-dial="case"]', root).addEventListener("click", () => { toggleDial(false); openNewCase(() => setTab("unassigned")); });
      bindBbNav(root, "case");
      draw();
      return root;
    },

    /* ---- Broadband LCO: Customer list (tabs All / Active / Inactive / Suspended, A–Z index, + → Create Customer) ---- */
    bbCustomers({ view = "", days = 30, focus = false } = {}) {
      const P = BB_DATA.partner;
      const VIEWS = {   // opened from a dashboard tile / menu → fixed list with a title instead of tabs
        online: ["Online Customers", (c) => c.online, P.counts.online],
        expired: ["Expired Customers", (c) => c.status === "expired", P.counts.expired],
        renewal: [`Upcoming Renewal (${days === 1 ? "today" : `${days} days`})`, null, 0],
      };
      let tab = view === "active" || view === "inactive" ? view : "all";
      const fixed = VIEWS[view];
      const TABS = [["all", "All"], ["active", "Active"], ["inactive", "Inactive"], ["suspended", "Suspended"]];
      const root = el(`
        <section class="screen-fixed tv lco bb" data-screen="bb-customers">
          <div class="tv-scroll" id="sc">
            <header class="sub-head">
              ${fixed ? `<button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>` : ""}
              <h2>${fixed ? fixed[0] : "Customer"}</h2>
              <button class="lco-ic lco-funnel" data-toast="Filter customers (demo)" aria-label="Filter">${I.filter}</button>
            </header>
            ${fixed ? "" : `<div class="lco-tabs" role="tablist">
              ${TABS.map(([k, l]) => `<button role="tab" data-tab="${k}" class="${k === tab ? "on" : ""}" aria-selected="${k === tab}">${l}</button>`).join("")}
            </div>`}
            <label class="lco-search">${I.search}<input id="q" type="search" placeholder="Search by User Name" aria-label="Search by User Name" /></label>
            <div class="lco-list" id="list"></div>
            <p class="more-note" id="note"></p>
          </div>
          <nav class="bb-az" id="az" aria-label="Jump to letter"></nav>
          <button class="bb-fab" data-act="new-cust" aria-label="Create Customer">${I.plus}</button>
          <!-- ⚙ on a card selects it: user name + Recharge / Invoice (same as the Cable OTT Customer list) -->
          <div class="lco-selbar bb-selbar" id="selbar" hidden>
            <b id="selName"></b>
            <div class="lco-selbtns">
              <button class="lco-pill big" data-act="recharge">${I.card}Recharge</button>
              <button class="lco-pill big" data-act="invoice">${I.news}Invoice</button>
            </div>
          </div>
          ${bbNavHTML("customer")}
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      const q = $("#q", root);
      const selected = () => BB_DATA.customers.find((c) => c.id === state.bbSel);
      const syncBar = () => {
        const c = selected();
        $("#selbar", root).hidden = !c;
        root.classList.toggle("has-sel", !!c);   // lifts the + button above the bar
        if (c) $("#selName", root).textContent = c.user;
      };
      $('[data-act="recharge"]', root).addEventListener("click", () => { const c = selected(); if (c) go("bbRenew", { id: c.id }); });
      $('[data-act="invoice"]', root).addEventListener("click", () => { const c = selected(); if (c) openBbInvoice(c); });
      const match = (c) => {
        if (view === "renewal") return bbExpiring(days).includes(c);
        if (fixed) return fixed[1](c);
        if (tab === "all") return true;
        return tab === "active" ? c.status === "active" || c.status === "new" : c.status === tab;
      };
      const draw = () => {
        const t = q.value.trim().toLowerCase();
        const list = BB_DATA.customers.filter((c) => match(c) && (c.user.toLowerCase().includes(t) || c.name.toLowerCase().includes(t)))
          .sort((a, b) => a.user.localeCompare(b.user));
        let last = "";
        $("#list", root).innerHTML = list.length
          ? list.map((c) => {
            const L = c.user[0].toUpperCase();
            const head = L !== last ? `<h5 class="bb-letter" id="bbL-${L}">${L}</h5>` : "";
            last = L;
            return `${head}
            <div class="lco-ott-card bb-cust${c.id === state.bbSel ? " sel" : ""}" data-cid="${c.id}">
              <div class="lco-ott-top">
                <i class="lco-dot${c.online ? " live" : ""}" title="${c.online ? "Online" : "Offline"}"></i>
                <b>${esc(c.user)}</b>
                <span class="lco-badge ${c.status}">${BB_STATUS[c.status]}</span>
              </div>
              <div class="lco-ott-bot">
                <button class="lco-call" data-toast="Calling ${c.mobile} (demo)">${I.phone}${c.mobile}</button>
                <span class="lco-ott-acts">
                  ${c.ott ? `<em class="bb-ott">OTT</em>` : ""}
                  <button data-pick="${c.id}" aria-label="Recharge / Invoice for ${esc(c.user)}" aria-pressed="${c.id === state.bbSel}">${I.gear}</button>
                  <button data-toast="Message ${c.mobile} (demo)" aria-label="Message">${I.mail}</button>
                  <button data-info="${c.id}" aria-label="Customer details">${I.info}</button>
                </span>
              </div>
            </div>`;
          }).join("")
          : `<div class="empty">${I.search}<b>No customer found</b><p>Try another tab or user name.</p></div>`;
        const listEl = $("#list", root);
        $$("[data-toast]", listEl).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
        $$("[data-info]", listEl).forEach((b) => b.addEventListener("click", () => go("bbCustDetail", { id: +b.dataset.info })));
        $$("[data-pick]", listEl).forEach((b) => b.addEventListener("click", () => {
          const id = +b.dataset.pick;
          state.bbSel = state.bbSel === id ? null : id;
          draw();
        }));
        syncBar();
        // A–Z index (letters that have customers)
        const letters = [...new Set(list.map((c) => c.user[0].toUpperCase()))];
        $("#az", root).innerHTML = letters.map((L) => `<button data-az="${L}">${L}</button>`).join("");
        $$("[data-az]", root).forEach((b) => b.addEventListener("click", () => { const h = $(`#bbL-${b.dataset.az}`, root); if (h) h.scrollIntoView({ block: "start", behavior: "smooth" }); }));
        const total = fixed ? fixed[2] : tab === "all" ? P.counts.customers : tab === "active" ? P.counts.active : tab === "inactive" ? P.counts.inactive : 0;
        $("#note", root).textContent = list.length && total > list.length ? `Showing ${list.length} of ${total} in this demo` : "";
      };
      $$("[data-tab]", root).forEach((b) => b.addEventListener("click", () => {
        tab = b.dataset.tab;
        $$("[data-tab]", root).forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-selected", on); });
        draw();
      }));
      q.addEventListener("input", draw);
      $('[data-act="new-cust"]', root).addEventListener("click", () => go("bbCreateCustomer"));
      bindBbNav(root, "customer");
      draw();
      // Newly created customer: scroll to it and highlight it once
      if (state.bbNew) {
        const card = $(`[data-cid="${state.bbNew}"]`, root);
        state.bbNew = null;
        if (card) { card.classList.add("sel"); setTimeout(() => card.scrollIntoView({ block: "center" }), 420); }
      }
      if (focus) setTimeout(() => q.focus(), 420);
      return root;
    },

    /* ---- Broadband LCO: Create Customer (General Information form) ---- */
    bbCreateCustomer() {
      const F = [   // [id, label, type, required, extra attributes]
        ["bName", "Name", "text", true, 'maxlength="40" autocomplete="off"'],
        ["bMob", "Mobile", "tel", true, 'inputmode="numeric" maxlength="10" autocomplete="off"'],
        ["bUser", "User Name", "text", true, 'maxlength="30" autocomplete="off" autocapitalize="none"'],
        ["bEmail", "Email", "email", false, 'autocomplete="off"'],
        ["bTel", "Telephone", "tel", false, 'inputmode="numeric" maxlength="12"'],
        ["bCaf", "CAF Number", "text", false, 'maxlength="20"'],
        ["bGst", "GST Number", "text", false, 'maxlength="15" autocapitalize="characters"'],
        ["bAadhaar", "Aadhaar Card Number", "text", false, 'inputmode="numeric" maxlength="14"'],
      ];
      const root = el(`
        <section class="tv lco bb" data-screen="bb-create-customer">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Create Customer</h2>
          </header>
          <div class="lco-card lco-form bb-form">
            <h4 class="bb-step">${I.check}General Information</h4>
            <label class="lco-fl"><small>Title</small>
              <select id="bTitle">${["Mr", "Mrs", "Ms", "Dr"].map((t) => `<option>${t}</option>`).join("")}</select>
            </label>
            ${F.map(([id, l, type, req, attrs]) => `
              <label class="lco-fl${id === "bMob" ? " bb-withic" : ""}"><small>${l}${req ? " *" : ""}</small>
                <input id="${id}" type="${type}" ${attrs} placeholder="${l}" />
                ${id === "bMob" ? `<button type="button" class="bb-inic" data-toast="Pick from contacts (demo)" aria-label="Pick from contacts">${I.phone}</button>` : ""}
              </label>`).join("")}
            <p class="hint" id="cerr"></p>
            <button class="btn" id="bSave"><span class="lbl">Save</span></button>
          </div>
          <p class="more-note">Demo • Customer is saved only in this browser session</p>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); toast(b.dataset.toast); }));
      const v = (id) => $("#" + id, root);
      const err = $("#cerr", root), btn = $("#bSave", root);
      const fail = (id, msg) => { const i = v(id); shake(i.closest(".lco-fl")); err.textContent = msg; err.className = "hint err"; toast(msg, "error"); i.focus(); };
      v("bMob").addEventListener("input", (e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10); });
      v("bTel").addEventListener("input", (e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 12); });
      v("bAadhaar").addEventListener("input", (e) => { const d = e.target.value.replace(/\D/g, "").slice(0, 12); e.target.value = d.replace(/(\d{4})(?=\d)/g, "$1 "); });
      v("bGst").addEventListener("input", (e) => { e.target.value = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 15); });
      v("bUser").addEventListener("input", (e) => { e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""); });
      btn.addEventListener("click", async () => {
        if (btn.classList.contains("loading")) return;
        const name = v("bName").value.trim(), mob = v("bMob").value, user = v("bUser").value.trim();
        const email = v("bEmail").value.trim(), gst = v("bGst").value, aad = v("bAadhaar").value.replace(/\s/g, "");
        if (name.length < 2) return fail("bName", "Enter the customer name");
        if (!/^[6-9]\d{9}$/.test(mob)) return fail("bMob", "Enter a valid 10-digit mobile number");
        if (!/^[a-z0-9._-]{4,30}$/.test(user)) return fail("bUser", "User Name: 4–30 letters, numbers, . _ -");
        if (BB_DATA.customers.some((c) => c.user === user)) return fail("bUser", "This User Name is already taken");
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("bEmail", "Enter a valid email");
        if (gst && gst.length !== 15) return fail("bGst", "GST Number must be 15 characters");
        if (aad && aad.length !== 12) return fail("bAadhaar", "Aadhaar Card Number must be 12 digits");
        err.textContent = "";
        setLoading(btn, true);
        await wait(1200);
        setLoading(btn, false);
        const c = {
          id: Math.max(0, ...BB_DATA.customers.map((x) => x.id)) + 1,
          name, title: v("bTitle").value, user, mobile: mob, status: "new", online: false, ott: false,
          plan: "—", expiry: new Date(Date.now() + 30 * 864e5), email: email || "—",
          activated: new Date(), balance: "0.00", address: "—",
        };
        BB_DATA.customers.push(c);
        BB_DATA.partner.counts.customers += 1;
        state.bbNew = c.id;
        openSheet(`
          <div class="ok-badge">${I.checkBig}</div>
          <h3>Customer created</h3>
          <p>${esc(c.title)} ${esc(name)}<br/>User Name: <b>${esc(user)}</b><br/>Mobile: ${mob}</p>
          <span class="demo-tag">Demo • Not saved to any server</span>
          <button class="btn" id="cDone">Done</button>`, (sh) => {
          $("#cDone", sh).addEventListener("click", () => { closeSheet(); back(); });
        });
        toast("Customer created (demo)", "success");
      });
      return root;
    },

    /* ---- Broadband LCO: Customer → ⚙ → Recharge → Package Renew (broadband plans → Subscribe Now) ---- */
    bbRenew({ id }) {
      const c = BB_DATA.customers.find((x) => x.id === id) || BB_DATA.customers[0];
      const COLORS = [["#2fd8ff", "#3a6bff"], ["#9b5cff", "#ff3fd0"], ["#ff7a59", "#ff3fd0"], ["#43e97b", "#2fd8ff"], ["#ffb300", "#ff3fd0"], ["#7f7fd5", "#5c6b7a"]];
      const root = el(`
        <section class="tv lco bb" data-screen="bb-renew">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <div class="lco-renew-t"><h2>Package Renew</h2><small>Choose a plan for ${esc(c.user)}</small></div>
          </header>
          <div class="lco-list">
            ${BB_PLANS.map((p, k) => `
              <div class="lco-plan" style="--pc1:${COLORS[k][0]};--pc2:${COLORS[k][1]}">
                <div class="lco-plan-top">
                  <span class="lco-plan-ic">${I.wifi}</span>
                  <span class="lco-plan-name"><b>₹ ${p.price}</b><small>${p.name}</small></span>
                  <span class="lco-plan-n">${p.speed}</span>
                </div>
                <small class="lco-plan-lbl">Unlimited data · ${p.days} days${p.name === c.plan ? " · <b>Current plan</b>" : ""}</small>
                <small class="lco-plan-lbl">${p.ott} OTT Apps included</small>
                <div class="lco-apps">${planApps({ apps: p.ott }).map(([n, g]) => `<i title="${n}" style="background:${grad(g)}">${n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</i>`).join("")}</div>
                <button class="lco-sub-btn" data-plan="${k}">Subscribe Now ${ARROW}</button>
              </div>`).join("")}
          </div>
          <p class="more-note">Demo • No real payment is made</p>
        </section>`);
      bindCommon(root);
      $$("[data-plan]", root).forEach((b) => b.addEventListener("click", () => {
        const p = BB_PLANS[+b.dataset.plan];
        openSheet(`
          <h3>Confirm recharge</h3>
          <p>${esc(c.user)}<br/>Plan: <b>${p.name}</b> · ${p.speed} · ${p.days} days<br/>Amount: <b>₹ ${p.price}</b></p>
          <button class="btn" id="payPlan">Pay ₹ ${p.price}</button>
          <button class="btn ghost" id="noPlan">Cancel</button>`, (sh) => {
          $("#noPlan", sh).addEventListener("click", closeSheet);
          $("#payPlan", sh).addEventListener("click", async () => {
            closeSheet();
            showLoader("Processing recharge…");
            await wait(1100);
            hideLoader();
            // Renews from today (or from the current expiry if the plan is still running)
            const from = Math.max(Date.now(), c.expiry.getTime());
            Object.assign(c, { plan: p.name, planAt: new Date(), expiry: new Date(from + p.days * 864e5), lastPrice: p.price,
              status: c.status === "new" ? "new" : "active" });
            openSheet(`
              <div class="ok-badge">${I.checkBig}</div>
              <h3>Recharge successful</h3>
              <p>${esc(c.user)} is now on <b>${p.name}</b> (₹ ${p.price}).<br/>Valid till ${dmy(c.expiry)} · Status: ${BB_STATUS[c.status]}</p>
              <span class="demo-tag">Demo • No real payment made</span>
              <button class="btn" id="donePlan">Done</button>`, (s2) => {
              $("#donePlan", s2).addEventListener("click", () => { closeSheet(); back(); });
            });
            toast("Recharge successful (demo)", "success");
          });
        });
      }));
      return root;
    },

    /* ---- Broadband LCO: Customer → ⓘ → Customer Details ---- */
    bbCustDetail({ id }) {
      const c = BB_DATA.customers.find((x) => x.id === id) || BB_DATA.customers[0];
      const p = BB_PLANS.find((x) => x.name === c.plan);
      const root = el(`
        <section class="tv lco bb" data-screen="bb-cust-detail">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Customer Details</h2>
          </header>
          <div class="lco-cd-head">
            <div class="lco-pav">${esc(c.name[0])}</div>
            <b>${esc(c.title)} ${esc(c.name)}</b>
            <small class="bb-cd-user">${esc(c.user)} · ${c.online ? "🟢 Online" : "Offline"}</small>
            <span class="lco-badge ${c.status}">${BB_STATUS[c.status]}</span>
          </div>
          <div class="lco-card lco-cd-stats">
            <span><small>Activation Date</small><b>${dmy(c.activated)}</b></span>
            <span><small>Balance</small><b>₹ ${c.balance}</b></span>
          </div>
          <h4 class="lco-cd-sec">Internet Plan</h4>
          <div class="lco-card lco-cd-plan">
            <b>${esc(c.plan)}</b>
            <small>${p ? `${p.speed} · Unlimited · ₹ ${p.price}` : "No plan yet — use Recharge"}</small>
            <small>${I.calendar}${c.status === "expired" ? "Expired on" : "Valid till"} ${dmy(c.expiry)}</small>
          </div>
          <h4 class="lco-cd-sec">OTT Plan</h4>
          <div class="lco-card lco-cd-plan"><b>${c.ott && p ? `${p.ott} OTT Apps (with ${esc(c.plan)})` : "Not subscribed"}</b></div>
          <h4 class="lco-cd-sec">Contact Details</h4>
          <div class="lco-cd-contact">
            <button data-toast="Calling ${c.mobile} (demo)">${I.phone}<span>Call</span></button>
            <button data-toast="Email: ${esc(c.email)} (demo)">${I.mail}<span>Email</span></button>
            <button data-toast="Address: ${esc(c.address)}">${I.globe}<span>Address</span></button>
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      return root;
    },

    /* ---- Broadband LCO: Available Plan ---- */
    bbPlans() {
      const root = el(`
        <section class="tv lco bb" data-screen="bb-plans">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Available Plan</h2>
          </header>
          <div class="lco-list">
            ${BB_PLANS.map((p) => `
              <div class="lco-card bb-plan">
                <div><b>${p.name}</b><small>${p.speed} · Unlimited data · ${p.days} days</small><small>${I.play}${p.ott} OTT apps included</small></div>
                <span class="bb-price">₹ ${p.price}</span>
              </div>`).join("")}
          </div>
          <p class="more-note">Demo plans and prices</p>
        </section>`);
      bindCommon(root);
      return root;
    },

    /* ---- Broadband LCO: Profile ---- */
    bbProfile() {
      const sess = state.session || {};
      const P = BB_DATA.partner;
      const root = el(`
        <section class="tv lco bb" data-screen="bb-profile">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Profile</h2>
          </header>
          <div class="lco-card lco-pcard">
            <div class="lco-pav">${P.name[0]}</div>
            <h3>${P.name}</h3>
            <p>User ID: ${esc(sess.lcoid || "")}</p>
            <p>Service: Broadband</p>
            <p>Mobile: ${sess.mobile || DEMO_MOBILE}</p>
            <p>Email: ${P.email}</p>
          </div>
          <div class="menu lco-menu">
            <button data-toast="Change Password (demo)">${I.lock}Change Password<span class="chev">${I.chev}</span></button>
            <button data-act="txns">${I.card}Transaction History<span class="chev">${I.chev}</span></button>
            <button class="danger" data-act="logout">${I.logout}Logout<span class="chev">${I.chev}</span></button>
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $('[data-act="txns"]', root).addEventListener("click", () => go("lcoTopUp", { wallet: "bb" }));
      $('[data-act="logout"]', root).addEventListener("click", lcoLogout);
      return root;
    },

    /* ---- LCO: OTT customer → Customer Details (ⓘ icon) ---- */
    lcoOttDetail({ id }) {
      const c = LCO_DATA.ott.find((x) => x.id === id) || LCO_DATA.ott[0];
      const root = el(`
        <section class="tv lco" data-screen="lco-ott-detail">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Customer Details</h2>
          </header>
          <div class="lco-cd-head">
            <div class="lco-pav">${esc(c.name[0])}</div>
            <b>${esc(c.name)}</b>
            <span class="lco-badge ${c.status}">${OTT_STATUS[c.status]}</span>
          </div>
          <div class="lco-card lco-cd-stats">
            <span><small>Activation Date</small><b>${dmy(c.activated)}</b></span>
            <span><small>Balance</small><b>₹ ${c.balance}</b></span>
          </div>
          <h4 class="lco-cd-sec">OTT Plan</h4>
          <div class="lco-card lco-cd-plan"><b>${esc(c.plan)}</b><small>${I.calendar}${stamp(c.planAt)}</small></div>
          <h4 class="lco-cd-sec">Video Plan</h4>
          <div class="lco-card lco-cd-plan"><b>${esc(c.video)}</b><small>${I.calendar}${stamp(c.videoAt)}</small></div>
          <h4 class="lco-cd-sec">Contact Details</h4>
          <div class="lco-cd-contact">
            <button data-toast="Calling ${c.mobile} (demo)">${I.phone}<span>Call</span></button>
            <button data-toast="Email: ${c.email} (demo)">${I.mail}<span>Email</span></button>
            <button data-toast="Address: ${c.address}">${I.globe}<span>Address</span></button>
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      return root;
    },

    /* ---- LCO: Recharge → Package Renew CMS (choose a plan → Subscribe Now) ---- */
    lcoRenew({ id }) {
      const c = LCO_DATA.ott.find((x) => x.id === id) || LCO_DATA.ott[0];
      const root = el(`
        <section class="tv lco" data-screen="lco-renew">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <div class="lco-renew-t"><h2>Package Renew CMS</h2><small>Choose your plan and start watching · ${c.user}</small></div>
          </header>
          <div class="lco-list">
            ${OTT_PLANS.map((p, k) => `
              <div class="lco-plan" style="--pc1:${p.colors[0]};--pc2:${p.colors[1]}">
                <div class="lco-plan-top">
                  <span class="lco-plan-ic">${p.icon}</span>
                  <span class="lco-plan-name"><b>₹ ${p.price}</b><small>${p.name}</small></span>
                  <span class="lco-plan-n">${I.play}${p.apps} OTT${p.apps > 1 ? "s" : ""}</span>
                </div>
                <small class="lco-plan-lbl">OTT App${p.apps > 1 ? "s" : ""}</small>
                <div class="lco-apps">${planApps(p).map(([n, g]) => `<i title="${n}" style="background:${grad(g)}">${n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</i>`).join("")}</div>
                <button class="lco-sub-btn" data-plan="${k}">Subscribe Now ${ARROW}</button>
              </div>`).join("")}
          </div>
          <p class="more-note">Demo • No real payment is made</p>
        </section>`);
      bindCommon(root);
      $$("[data-plan]", root).forEach((b) => b.addEventListener("click", () => {
        const p = OTT_PLANS[+b.dataset.plan];
        openSheet(`
          <h3>Confirm recharge</h3>
          <p>${c.user}<br/>Plan: <b>${p.name}</b> · ${p.apps} OTT${p.apps > 1 ? "s" : ""}<br/>Amount: <b>₹ ${p.price}</b></p>
          <button class="btn" id="payPlan">Pay ₹ ${p.price}</button>
          <button class="btn ghost" id="noPlan">Cancel</button>`, (sh) => {
          $("#noPlan", sh).addEventListener("click", closeSheet);
          $("#payPlan", sh).addEventListener("click", async () => {
            closeSheet();
            showLoader("Processing recharge…");
            await wait(1100);
            hideLoader();
            Object.assign(c, { plan: p.name, planAt: new Date(), status: "active", lastPrice: p.price });
            openSheet(`
              <div class="ok-badge">${I.checkBig}</div>
              <h3>Subscription successful</h3>
              <p>${c.user} is now on <b>${p.name}</b> (₹ ${p.price}).<br/>Status: Active</p>
              <span class="demo-tag">Demo • No real payment made</span>
              <button class="btn" id="donePlan">Done</button>`, (s2) => {
              $("#donePlan", s2).addEventListener("click", () => { closeSheet(); back(); });
            });
            toast("Recharge successful (demo)", "success");
          });
        });
      }));
      return root;
    },

    /* ---- LCO: Register Guest Customer → OTT Activation ---- */
    lcoOttActivate() {
      const root = el(`
        <section class="tv lco" data-screen="lco-ott-activate">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>OTT Activation</h2>
          </header>
          <div class="lco-card lco-form">
            <label class="lco-fl"><small>Customer Name</small><input id="cname" type="text" maxlength="40" placeholder="Enter Customer name" autocomplete="off" /></label>
            <label class="lco-fl"><small>Mobile Number</small><input id="cmob" type="tel" inputmode="numeric" maxlength="10" placeholder="Enter Mobile Number" autocomplete="off" /></label>
            <label class="lco-fl"><small>Select OTT Package</small>
              <select id="cpkg"><option value="">Select OTT Package</option>${OTT_PLANS.map((p, k) => `<option value="${k}">${p.name}</option>`).join("")}</select>
            </label>
            <p class="hint" id="aerr"></p>
            <div class="lco-btn2">
              <button class="btn" id="asub"><span class="lbl">Submit</span></button>
              <button class="btn ghost" id="acancel">Cancel</button>
            </div>
          </div>
        </section>`);
      bindCommon(root);
      const nm = $("#cname", root), mob = $("#cmob", root), pkg = $("#cpkg", root), err = $("#aerr", root), btn = $("#asub", root);
      const fail = (input, msg) => { shake(input.closest(".lco-fl")); err.textContent = msg; err.className = "hint err"; toast(msg, "error"); input.focus(); };
      mob.addEventListener("input", () => { mob.value = mob.value.replace(/\D/g, "").slice(0, 10); });
      $("#acancel", root).addEventListener("click", back);
      btn.addEventListener("click", async () => {
        if (btn.classList.contains("loading")) return;
        if (nm.value.trim().length < 2) return fail(nm, "Enter the customer name");
        if (!/^[6-9]\d{9}$/.test(mob.value)) return fail(mob, "Enter a valid 10-digit mobile number");
        if (LCO_DATA.ott.some((c) => c.mobile === mob.value)) return fail(mob, "This mobile number already has OTT");
        if (pkg.value === "") return fail(pkg, "Select an OTT package");
        err.textContent = "";
        setLoading(btn, true);
        await wait(1200);
        setLoading(btn, false);
        const p = OTT_PLANS[+pkg.value];
        const c = newOttCustomer(nm.value.trim(), mob.value, p);
        LCO_DATA.ott.unshift(c);
        openSheet(`
          <div class="ok-badge">${I.checkBig}</div>
          <h3>OTT activated</h3>
          <p>${esc(c.name)}<br/>User: ${c.user}<br/>Package: <b>${p.name}</b></p>
          <span class="demo-tag">Demo • No real activation</span>
          <button class="btn" id="aDone">Done</button>`, (sh) => {
          $("#aDone", sh).addEventListener("click", () => { closeSheet(); back(); });
        });
        toast("OTT activated (demo)", "success");
      });
      return root;
    },

    /* ---- LCO: STB In Stock (searchable list) ---- */
    lcoStock() {
      const all = LCO_DATA.stock;
      const root = el(`
        <section class="tv lco" data-screen="lco-stb-stock">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>STB In Stock</h2>
          </header>
          <label class="lco-search">${I.search}<input id="q" type="search" placeholder="Search STB No" aria-label="Search STB No" /></label>
          <div class="lco-list" id="list"></div>
          <p class="more-note" id="note"></p>
        </section>`);
      bindCommon(root);
      const draw = () => {
        const q = $("#q", root).value.trim().toLowerCase();
        const list = all.filter((n) => n.toLowerCase().includes(q));
        $("#list", root).innerHTML = list.length
          ? list.map((n) => `<div class="lco-stb"><span class="lco-stb-ic">${I.userFill}</span><span><small>STB In Stock</small><b>${n}</b></span></div>`).join("")
          : `<div class="empty">${I.search}<b>No STB found</b><p>Try another STB number.</p></div>`;
        $("#note", root).textContent = `Showing ${list.length} of ${LCO_DATA.partner.counts.stock} STBs in this demo`;
      };
      $("#q", root).addEventListener("input", draw);
      draw();
      return root;
    },

    /* ---- LCO: Active STB / DA STB (subscriber cards, search by VC No / SMS ID / Name) ---- */
    // kind: "active" | "da" | "cable" (Cable Customer = Active + DA, with an All / Active / Deactive filter)
    lcoStbs({ kind = "active" }) {
      const isCable = kind === "cable";
      const all = isCable ? [...LCO_DATA.active, ...LCO_DATA.da] : LCO_DATA[kind];
      const total = isCable ? LCO_DATA.partner.counts.active + LCO_DATA.partner.counts.da : LCO_DATA.partner.counts[kind];
      const title = { active: "Active STB", da: "DA STB", cable: "Cable Customer" }[kind];
      // Search-by options (in this order): Vc No, Mobile No, Sms Id
      const FIELDS = SUB_FIELDS;
      const root = el(`
        <section class="tv lco" data-screen="lco-stb-${kind}">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>${title}</h2>
            ${isCable ? `<select id="st" class="lco-st" aria-label="Status"><option value="all">All</option><option value="active">Active</option><option value="da">Deactive</option></select>` : ""}
          </header>
          <div class="lco-filter">
            <select id="by" aria-label="Search by">${Object.entries(FIELDS).map(([k, [l]]) => `<option value="${k}">${l}</option>`).join("")}</select>
            <label class="lco-search">${I.search}<input id="q" type="search" placeholder="Search Vc No" aria-label="Search" /></label>
          </div>
          <div class="lco-list" id="list"></div>
          <p class="more-note" id="note"></p>
        </section>`);
      bindCommon(root);
      const by = $("#by", root), q = $("#q", root), st = $("#st", root);
      const draw = () => {
        const [label, get] = FIELDS[by.value];
        q.placeholder = `Search ${label}`;
        const t = q.value.trim().toLowerCase();
        const status = st ? st.value : "all";
        const list = all.filter((s) => get(s).toLowerCase().includes(t) &&
          (status === "all" || (status === "active") === s.active));
        $("#list", root).innerHTML = list.length
          ? list.map((s) => subCardHTML(s, isCable)).join("")
          : `<div class="empty">${I.search}<b>No subscriber found</b><p>Try another ${label}.</p></div>`;
        $$("[data-i]", root).forEach((b) => b.addEventListener("click", () => go("lcoSub", { kind: b.dataset.k, i: +b.dataset.i })));
        $("#note", root).textContent = `Showing ${list.length} of ${total} in this demo`;
      };
      by.addEventListener("change", draw);
      q.addEventListener("input", draw);
      if (st) st.addEventListener("change", draw);
      draw();
      return root;
    },

    /* ---- LCO: one subscriber (from Active / DA STB) ---- */
    lcoSub({ kind = "active", i = 0 }) {
      const s = LCO_DATA[kind][i];
      const rows = [["Account Balance", s.balance], ["VC No", s.vc], ["SMS ID", s.sms],
        ["Status", s.active ? "Active" : "Deactive"], ["STB No", s.stb], ["Due Date", s.due]];
      const root = el(`
        <section class="tv lco" data-screen="lco-subscriber">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2 class="lco-ellipsis">${esc(s.name)}</h2>
          </header>
          <div class="lco-card lco-info">
            <h3>${I.userFill}<span>${esc(s.name)}</span></h3>
            ${rows.map(([k, v]) => `<p><b>${k} :</b> <span class="${k === "Status" ? (s.active ? "ok" : "off") : ""}">${v}</span></p>`).join("")}
          </div>
          <div class="lco-actions">
            <button class="lco-pill big" data-act="detail">Subscriber Detail</button>
            <button class="lco-pill big" data-toast="Instant Recharge (demo)">Instant Recharge</button>
            <button class="lco-pill big" data-toast="Repairing Request (demo)">Repairing Request</button>
            <button class="lco-pill big" data-toast="Reconfirmation Package (demo)">Reconfirmation Package</button>
            ${s.active ? `<button class="lco-pill big" data-act="upgrade">Upgrade Package</button>` : ""}
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $('[data-act="detail"]', root).addEventListener("click", () => go("lcoSubDetail", { kind, i }));
      const up = $('[data-act="upgrade"]', root);
      if (up) up.addEventListener("click", () => go("lcoUpgrade", { kind, i }));
      return root;
    },

    /* ---- LCO: Active subscriber → Upgrade Package (higher packs only; cost debited from the CATV wallet) ---- */
    lcoUpgrade({ kind = "active", i = 0 }) {
      const s = LCO_DATA[kind][i];
      const P = LCO_DATA.partner;
      const cur = CABLE_PACKS[s.pack];
      const higher = CABLE_PACKS.map((p, k) => ({ ...p, k })).filter((p) => p.k > s.pack);
      const root = el(`
        <section class="tv lco" data-screen="lco-upgrade">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Upgrade Package</h2>
          </header>
          <div class="lco-card lco-up-cur">
            <small>${esc(s.name)} · VC ${s.vc}</small>
            <span>Current package</span>
            <b>${cur.name}</b>
            <small>${cur.ch} channels · ${cur.hd} HD · ₹ ${cur.price}/month</small>
          </div>
          <div class="lco-bal">${I.wallet}<span>CATV wallet</span><b>₹ ${P.wallet}</b></div>
          <div class="lco-list">
            ${higher.length ? higher.map((p) => `
              <div class="lco-card lco-up">
                <div><b>${p.name}</b><small>${p.ch} channels · ${p.hd} HD</small><small>+${p.ch - cur.ch} channels vs current</small></div>
                <div class="lco-up-r"><span>₹ ${p.price}<small>/month</small></span><button class="lco-pill" data-up="${p.k}">Upgrade</button></div>
              </div>`).join("")
              : `<div class="empty">${I.checkBig}<b>Already on the top package</b><p>${cur.name} is the highest package.</p></div>`}
          </div>
          <p class="more-note">Demo packages and prices • No real change is made</p>
        </section>`);
      bindCommon(root);
      $$("[data-up]", root).forEach((b) => b.addEventListener("click", () => {
        const k = +b.dataset.up;
        const p = CABLE_PACKS[k];
        const diff = p.price - cur.price;
        openSheet(`
          <h3>Confirm upgrade</h3>
          <p>${esc(s.name)}<br/>${cur.name} → <b>${p.name}</b><br/>Amount: <b>₹ ${money(diff)}</b> (price difference for this month)<br/>Debited from your CATV wallet (₹ ${P.wallet})</p>
          <button class="btn" id="upOk">Upgrade for ₹ ${money(diff)}</button>
          <button class="btn ghost" id="upNo">Cancel</button>`, (sh) => {
          $("#upNo", sh).addEventListener("click", closeSheet);
          $("#upOk", sh).addEventListener("click", async () => {
            if (parseFloat(P.wallet) < diff) { closeSheet(); toast("Not enough CATV wallet balance — top up first", "error"); return; }
            closeSheet();
            showLoader("Upgrading package…");
            await wait(1100);
            hideLoader();
            P.wallet = money(parseFloat(P.wallet) - diff);
            s.pack = k;
            openSheet(`
              <div class="ok-badge">${I.checkBig}</div>
              <h3>Package upgraded</h3>
              <p>${esc(s.name)} is now on <b>${p.name}</b>.<br/>₹ ${money(diff)} debited · CATV wallet: ₹ ${P.wallet}</p>
              <span class="demo-tag">Demo • No real change made</span>
              <button class="btn" id="upDone">Done</button>`, (s2) => {
              $("#upDone", s2).addEventListener("click", () => { closeSheet(); back(); });
            });
            toast("Package upgraded (demo)", "success");
          });
        });
      }));
      return root;
    },

    /* ---- LCO: Subscriber Detail ---- */
    lcoSubDetail({ kind = "active", i = 0 }) {
      const s = LCO_DATA[kind][i];
      const P = LCO_DATA.partner;
      const rows = [["Address", s.address], ["City", s.city], ["State", "West Bengal"], ["Language Zone", "N/A"],
        ["Mobile No", s.mobile], ["Mobile No Verified", s.verified ? "Verified" : "Not Verified"],
        ["Partner", P.name], ["Distributor", P.distributor], ["TOC", s.toc], ["Child Connection", "0"],
        ["Acquisition Expiry Date", "N/A"], ["Activated On", s.activated], ["Last Ra_Da Date", s.active ? "N/A" : s.due]];
      const root = el(`
        <section class="tv lco" data-screen="lco-subscriber-detail">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Subscriber Detail</h2>
          </header>
          <div class="lco-card lco-info">
            <h3>${I.userFill}<span>${esc(s.name)}</span></h3>
            ${rows.map(([k, v]) => `<p><b>${k} :</b> <span class="${k === "Mobile No Verified" ? (s.verified ? "ok" : "off") : ""}">${esc(v)}</span></p>`).join("")}
          </div>
        </section>`);
      bindCommon(root);
      return root;
    },

    /* ---- Home: live TV guide (after login) ---- */
    // fromLco: opened via LCO "Watch OTT" → shows a "Go Back to LCO" button (normal Home is unchanged)
    home({ fromLco = false } = {}) {
      const f = state.filter;
      const root = el(`
        <section class="screen-fixed tv" data-screen="home">
          <div class="tv-scroll" id="tvScroll">
            <header class="tv-head">
              <div class="brand">
                <img src="${MARK}" alt="VIBE" />
                <small>&amp; OTT Partners</small>
              </div>
              <button class="menu-btn" data-act="menu" aria-label="Open menu" aria-expanded="false">${I.menu}</button>
            </header>
            <div class="searchbar" id="searchbar" ${f.q ? "" : "hidden"}>
              ${I.search}
              <input id="q" type="search" placeholder="Search channels or shows" value="${esc(f.q)}" aria-label="Search channels" />
              <button data-act="clear-q" aria-label="Clear search">${I.close}</button>
            </div>
            <div class="filters" id="filters"></div>
            <div id="sections"></div>
          </div>
          <button class="fab" data-act="fab" aria-label="Watch live TV">${I.tv}</button>
          ${fromLco ? `<button class="lco-back-pill" data-act="to-lco">${I.back}Go Back to LCO</button>` : ""}
          <!-- Left slide-in menu (hamburger). Same buttons/data-act as before, so every option works the same. -->
          <div class="drawer" id="drawer" aria-hidden="true">
            <div class="drawer-backdrop" data-close-menu></div>
            <nav class="drawer-panel" aria-label="Menu">
              <div class="drawer-head">
                <div class="brand">
                  <img src="${MARK}" alt="VIBE" />
                  <small>&amp; OTT Partners</small>
                </div>
                <button class="drawer-x" data-close-menu aria-label="Close menu">${I.close}</button>
              </div>
              <button class="gp dr-item" data-act="ott">${I.monitor}<span>OTT</span></button>
              <button class="gp dr-item${f.q ? " on" : ""}" data-act="search">${I.search}<span>Search</span></button>
              <button class="gp dr-item" data-act="profile">${I.userFill}<span>Profile</span></button>
              <i class="dr-sep"></i>
              <button class="gp dr-item" data-act="lts">${I.router}<span>LTS</span></button>
              <button class="gp dr-item${f.genre ? " on" : ""}" data-act="genre">${I.masks}<span>${f.genre ? GENRES.find((g) => g.key === f.genre).name : `Genre (${GENRES.length})`}</span></button>
              <button class="gp dr-item${f.lang ? " on" : ""}" data-act="lang">${I.lang}<span>${f.lang || `Language (${LANGUAGES.length})`}</span></button>
            </nav>
          </div>
        </section>`);

      const sections = $("#sections", root);
      const draw = () => {
        sections.innerHTML = guideHTML();
        $("#filters", root).innerHTML = filterChips();
        bindGuide(root);
        syncMenuDot(root);
      };

      if (fromLco) $('[data-act="to-lco"]', root).addEventListener("click", () => {
        const prev = stack[stack.length - 2];
        if (prev && (prev.name.startsWith("lco") || prev.name.startsWith("bb"))) back();
        else reset(lcoHomeName(), {}, "back");
      });

      // Hamburger: open/close the left menu. Tapping any option closes the menu first, then runs the option as before.
      $('[data-act="menu"]', root).addEventListener("click", () => openDrawer(root));
      $$("[data-close-menu]", root).forEach((b) => b.addEventListener("click", closeDrawer));
      $$(".dr-item", root).forEach((b) => b.addEventListener("click", closeDrawer));

      $('[data-act="ott"]', root).addEventListener("click", () => openSheet(`
        <h3>OTT Partners</h3>
        <p>Stream apps included with your VIBE pack.</p>
        <div class="ott-grid">${OTT.map(([n, c]) => `<button class="ott" style="background:${grad(c)}" data-ott="${n}">${n}</button>`).join("")}</div>`, (sh) => {
        $$("[data-ott]", sh).forEach((b) => b.addEventListener("click", () => { closeSheet(); toast(`Opening ${b.dataset.ott} (demo)`); }));
      }));
      $('[data-act="lts"]', root).addEventListener("click", () => openSheet(`
        <h3>LTS</h3>
        <p>Live TV services linked to your connection.</p>
        <div class="opt-list">
          ${[["My Packs", "View active channel packs"], ["Recharge", "Renew your Cable TV subscription"], ["Set-top Box", "VSC & device details"], ["Support", "Raise a service request"]]
            .map(([t, d]) => `<button class="opt" data-lts="${t}"><span><b>${t}</b><small>${d}</small></span>${I.chev}</button>`).join("")}
        </div>`, (sh) => {
        $$("[data-lts]", sh).forEach((b) => b.addEventListener("click", () => { closeSheet(); toast(`${b.dataset.lts}: available in the full app`); }));
      }));
      $('[data-act="genre"]', root).addEventListener("click", () => pickSheet("Genre", ["All", ...GENRES.map((g) => g.name)],
        f.genre ? GENRES.find((g) => g.key === f.genre).name : "All", (v) => {
          f.genre = v === "All" ? null : GENRES.find((g) => g.name === v).key;
          refreshHome(root, draw);
        }));
      $('[data-act="lang"]', root).addEventListener("click", () => pickSheet("Language", ["All", ...LANGUAGES], f.lang || "All", (v) => {
        f.lang = v === "All" ? null : v;
        refreshHome(root, draw);
      }));
      $('[data-act="search"]', root).addEventListener("click", () => {
        const bar = $("#searchbar", root);
        bar.hidden = !bar.hidden;
        if (!bar.hidden) $("#q", root).focus();
      });
      $("#q", root).addEventListener("input", (e) => { f.q = e.target.value.trim(); $('[data-act="search"]', root).classList.toggle("on", !!f.q); draw(); });
      $('[data-act="clear-q"]', root).addEventListener("click", () => {
        f.q = ""; $("#q", root).value = ""; $("#searchbar", root).hidden = true;
        $('[data-act="search"]', root).classList.remove("on"); draw();
      });
      $('[data-act="profile"]', root).addEventListener("click", () => go("profile"));
      $('[data-act="fab"]', root).addEventListener("click", () => playChannel(CHANNELS[0].id));
      draw();
      return root;
    },

    /* ---- See All for one genre ---- */
    genre({ key }) {
      const g = GENRES.find((x) => x.key === key);
      const list = filtered(g);
      const root = el(`
        <section class="tv" data-screen="genre-${key}">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2><span class="sec-ic">${g.icon}</span>${g.name} (${g.count})</h2>
          </header>
          <div class="ch-grid">${list.map((c) => cardHTML(c, true)).join("")}</div>
          <p class="more-note">Showing ${list.length} of ${g.count} channels in this demo</p>
        </section>`);
      bindCommon(root);
      bindCards(root);
      return root;
    },

    /* ---- Simulated player ---- */
    player({ id }) {
      const c = CHANNELS[id];
      const sl = slot(id);
      const g = GENRES.find((x) => x.key === c.genre);
      const next = CHANNELS.filter((x) => x.genre === c.genre && x.id !== id);
      const root = el(`
        <section class="tv" data-screen="player">
          <div class="video" style="background:${grad(c.colors)}">
            <button class="back-btn" data-act="back" aria-label="Back">${I.back}</button>
            <span class="live-badge"><i></i>LIVE</span>
            <div class="video-title">${esc(c.show)}</div>
            <div class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="vctrl">
              <button data-act="pp" aria-label="Pause">${I.pause}</button>
              <div class="vbar"><i style="width:${sl.pct}%"></i></div>
              <button data-toast="Volume (demo)" aria-label="Volume">${I.vol}</button>
              <button data-toast="Full screen is not available in this demo" aria-label="Full screen">${I.full}</button>
            </div>
          </div>
          <div class="p-info">
            <h2>${esc(c.name)}</h2>
            <p>${esc(c.show)}</p>
            <div class="ch-meta"><span class="t">${I.clock}${sl.time}</span><span class="lang">${c.lang}</span></div>
            <div class="p-actions">
              <button class="gp" data-toast="Added to favourites">${I.heart}<span>Favourite</span></button>
              <button class="gp" data-toast="Reminder set for the next show">${I.clock}<span>Remind</span></button>
            </div>
          </div>
          <div class="sec-head"><h4><span class="sec-ic">${g.icon}</span>More in ${g.name}</h4></div>
          <div class="rail">${next.map((x) => cardHTML(x)).join("")}</div>
        </section>`);
      bindCommon(root);
      bindCards(root, true);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      const pp = $('[data-act="pp"]', root), video = $(".video", root);
      pp.addEventListener("click", () => {
        const paused = video.classList.toggle("paused");
        pp.innerHTML = paused ? I.play : I.pause;
        toast(paused ? "Paused" : "Playing");
      });
      return root;
    },

    /* ---- Profile ---- */
    profile() {
      const sess = state.session || {};
      const type = sess.type || "guest";
      const label = { guest: "Guest User", cable: "Cable TV User", broadband: "Broadband User", lco: "LCO Partner" }[type];
      const root = el(`
        <section class="tv" data-screen="profile">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Profile</h2>
          </header>
          <div class="profile-card">
            <div class="avatar">${label[0]}</div>
            <div><b>${label}</b>
              <small>${sess.mobile ? "+91 " + sess.mobile : "Not signed in"}</small>
              ${sess.vsc ? `<small>VSC No: ${sess.vsc}</small>` : ""}
              ${sess.bbid ? `<small>User ID: ${esc(sess.bbid)}</small>` : ""}
              ${sess.lco ? `<small>LCO Code: ${sess.lco}</small>` : ""}
              ${sess.service ? `<small>Service: ${USER_TYPES[sess.service].title}</small>` : ""}
            </div>
          </div>
          <div class="menu">
            <button data-toast="Your watchlist is empty">${I.heart}My Watchlist<span class="chev">${I.chev}</span></button>
            <button data-toast="Settings are not available in this demo">${I.gear}Settings<span class="chev">${I.chev}</span></button>
            <button data-act="switch">${I.swap}Change user type<span class="chev">${I.chev}</span></button>
            <button data-act="reset-reg">${I.card}Reset demo registrations<span class="chev">${Registry.count()} saved</span></button>
            <button class="danger" data-act="logout">${I.logout}${type === "guest" ? "Exit guest mode" : "Logout"}</button>
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $('[data-act="switch"]', root).addEventListener("click", () => reset("role", { first: true }));
      $('[data-act="reset-reg"]', root).addEventListener("click", (e) => {
        Registry.clear();
        $(".chev", e.currentTarget).textContent = "0 saved";
        toast("Demo registrations cleared – Cable, Broadband, LCO & Guest users must register again", "success", 3000);
      });
      $('[data-act="logout"]', root).addEventListener("click", async () => {
        showLoader("Signing out…");
        await wait(700);
        hideLoader();
        state.session = null;
        Object.assign(state.filter, { genre: null, lang: null, q: "" });
        reset("role", { first: true });
        toast("Signed out", "success");
      });
      return root;
    },
  };

  /* =========================================================
     Broadband registration: User ID → OTP → registered.
     No mobile field. The OTP goes to the mobile linked to the User ID; that mobile
     is saved in the Registry so the normal Broadband login (mobile only) works afterwards.
     The OTP is simulated and shown on screen (no SMS is sent).
     ========================================================= */
  // Demo only: every Broadband User ID is linked to the demo mobile number
  const linkedMobile = () => DEMO_MOBILE;
  const maskMobile = (m) => `+91 ••••• •${m.slice(-4)}`;
  const fullMobile = (m) => `+91 ${m.replace(/(\d{5})(\d{5})/, "$1 $2")}`;
  const RESEND_SECS = 30;

  /* ID + OTP screen. Used for:
     - Broadband registration (cfg = LOGIN.broadband): User ID → OTP → Home
     - LCO login (cfg = LCO_OTP, service = broadband | cable): LCO ID → OTP → LCO dashboard (no sign-up) */
  function otpRegisterScreen(type, cfg, service = null) {
    const ex = EXTRA[cfg.extra];
    const root = el(`
      <section class="screen-auth" data-screen="${cfg.screen || `register-${type}`}">
        <div class="auth">
          ${heroHTML(true)}
          <p class="sub" id="subTxt">${cfg.otpSub}</p>
          <div class="row-between">
            <span class="role-label">${cfg.label}${service ? `<small class="svc-tag">${USER_TYPES[service].title}</small>` : ""}</span>
            <button class="link" data-act="change">Change Selection</button>
          </div>
          <label class="field" id="exField">
            ${ex.icon}
            <input id="extra" type="text" inputmode="${ex.inputmode}" maxlength="${ex.maxlength}" autocomplete="off" placeholder="${ex.placeholder}" aria-label="${ex.label}" />
          </label>
          <p class="hint" id="exHint">${ex.hint}</p>
          <div class="ex-wrap" id="otpWrap" hidden>
            <label class="field" id="otpField">
              ${I.key}
              <input id="otp" class="otp-in" type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="Enter 6-digit OTP" aria-label="OTP" />
            </label>
            <p class="hint" id="otpHint"></p>
            <div class="otp-links">
              <button class="link" id="editId">Change ${ex.label}</button>
              <button class="link" id="resend" disabled></button>
            </div>
          </div>
          <button class="btn dim" id="submit"><span class="lbl">Get OTP</span>${ARROW}</button>
          ${cfg.noLoginLink ? "" : `<button class="link mode-switch" id="toLogin">Already registered? Login with mobile number</button>`}
        </div>
      </section>`);

    bindCommon(root);
    // Back to the normal (mobile-only) login screen
    if (!cfg.noLoginLink) $("#toLogin", root).addEventListener("click", () => {
      const prev = stack[stack.length - 2];
      if (prev && prev.name === "login" && prev.params.type === type && !prev.params.signup) back();
      else go("login", { type });
    });
    $('[data-act="change"]', root).addEventListener("click", () => {
      const prev = stack[stack.length - 2];
      if (prev && (prev.name === "role" || prev.name === "service")) back();
      else go("role");
    });

    const xin = $("#extra", root), xField = $("#exField", root), xHint = $("#exHint", root);
    const otpWrap = $("#otpWrap", root), otp = $("#otp", root), oField = $("#otpField", root), oHint = $("#otpHint", root);
    const btn = $("#submit", root), resend = $("#resend", root), sub = $("#subTxt", root);
    let step = "id", code = "", mobile = "", timer = null;

    // Registered = this User ID is already in the Broadband registry
    // (LCO keeps its own bucket keyed by LCO ID, so many LCO IDs can share the demo mobile)
    const known = () => (cfg.regBucket ? Registry.get(cfg.regBucket, xin.value) : Registry.findById(type, xin.value));
    const setBtn = (t) => { $(".lbl", btn).textContent = t; };
    const refreshDim = () => btn.classList.toggle("dim", step === "id" ? !ex.valid(xin.value) : otp.value.length !== 6);

    function idHint() {
      if (!xin.value) { xHint.textContent = ex.hint; xHint.className = "hint"; }
      else if (!ex.valid(xin.value)) { xHint.textContent = ex.hint; xHint.className = "hint"; }
      else if (known()) { xHint.textContent = "✓ This User ID is already registered – verify OTP to log in"; xHint.className = "hint ok"; }
      else { xHint.textContent = "✓ New User ID – you'll be registered after OTP verification"; xHint.className = "hint ok"; }
    }

    function startResendTimer() {
      clearInterval(timer);
      let left = RESEND_SECS;
      resend.disabled = true;
      resend.textContent = `Resend OTP in ${left}s`;
      timer = setInterval(() => {
        if (!root.isConnected) return clearInterval(timer);
        left -= 1;
        if (left > 0) { resend.textContent = `Resend OTP in ${left}s`; return; }
        clearInterval(timer);
        resend.disabled = false;
        resend.textContent = "Resend OTP";
      }, 1000);
    }

    function issueOtp() {
      code = DEMO_OTP;
      mobile = linkedMobile(xin.value);
      otp.value = "";
      oField.classList.remove("invalid");
      oHint.textContent = `OTP sent to ${maskMobile(mobile)} · Demo OTP: ${code}`;
      oHint.className = "hint ok";
      toast(`Demo OTP: ${code} (no SMS sent)`, "info", 5000);
      startResendTimer();
    }

    function toIdStep() {
      step = "id";
      clearInterval(timer);
      otpWrap.hidden = true;
      xin.readOnly = false;
      sub.textContent = cfg.otpSub;
      setBtn("Get OTP");
      refreshDim();
      xin.focus();
    }

    async function sendOtp() {
      if (!ex.valid(xin.value)) {
        shake(xField);
        xHint.textContent = ex.err; xHint.className = "hint err";
        toast(ex.err, "error");
        return xin.focus();
      }
      xin.blur();
      setLoading(btn, true);
      await wait(1100);
      setLoading(btn, false);
      step = "otp";
      xin.readOnly = true;
      sub.textContent = cfg.otpSubCode;
      otpWrap.hidden = false;
      otpWrap.classList.remove("reveal"); void otpWrap.offsetWidth; otpWrap.classList.add("reveal");
      setBtn(known() ? "Verify & Login" : "Verify & Register");
      issueOtp();
      refreshDim();
      otp.focus();
    }

    let busy = false;
    async function verify() {
      if (busy) return;
      if (otp.value.length !== 6) {
        shake(oField);
        oHint.textContent = "Enter the 6-digit OTP"; oHint.className = "hint err";
        return otp.focus();
      }
      if (otp.value !== code) {
        shake(oField);
        oHint.textContent = "Incorrect OTP – please try again"; oHint.className = "hint err";
        toast("Incorrect OTP", "error");
        otp.select();
        return;
      }
      busy = true;
      otp.blur();
      setLoading(btn, true);
      await wait(900);
      setLoading(btn, false);
      busy = false;
      clearInterval(timer);

      const prior = known();
      const registered = !prior;
      // Broadband: save under the linked mobile, so the normal Broadband login (mobile + OTP) works next time.
      // LCO: save under the LCO ID.
      if (registered) {
        if (cfg.regBucket) Registry.add(cfg.regBucket, xin.value, xin.value);
        else Registry.add(type, mobile, xin.value);
      }
      const userId = prior ? prior.id : xin.value;
      state.session = { type, [cfg.extra]: userId, mobile };
      if (service) state.session.service = service;

      openSheet(`
        <div class="ok-badge">${I.checkBig}</div>
        <h3>${registered ? cfg.doneReg : cfg.done}</h3>
        <p>${registered ? cfg.doneRegMsg : cfg.doneMsg}<br/>${ex.short}: ${esc(userId)}<br/>Registered mobile: ${cfg.dashboard ? maskMobile(mobile) : fullMobile(mobile)}</p>
        <span class="demo-tag">Demo • No real OTP sent</span>
        <button class="btn" id="toHome">${cfg.dashboard ? "Continue to Dashboard" : "Continue to Home"}</button>`, (sh) => {
        $("#toHome", sh).addEventListener("click", () => (cfg.dashboard ? enterLcoDashboard() : enterHome(type)));
      });
      toast(registered ? "Registered successfully (demo)" : "Logged in successfully (demo)", "success");
    }

    xin.addEventListener("input", () => {
      xin.value = ex.clean(xin.value);
      xField.classList.remove("invalid");
      idHint();
      refreshDim();
    });
    xin.addEventListener("keydown", (e) => { if (e.key === "Enter" && step === "id") sendOtp(); });
    otp.addEventListener("input", () => {
      otp.value = otp.value.replace(/\D/g, "").slice(0, 6);
      oField.classList.remove("invalid");
      refreshDim();
      if (otp.value.length === 6) verify();   // auto-verify once all 6 digits are in
    });
    otp.addEventListener("keydown", (e) => { if (e.key === "Enter") verify(); });
    $("#editId", root).addEventListener("click", toIdStep);
    resend.addEventListener("click", () => { if (!resend.disabled) { issueOtp(); otp.focus(); } });
    btn.addEventListener("click", () => (step === "id" ? sendOtp() : verify()));

    return root;
  }

  /* ---------- LCO bottom bar (Dashboard / Subscribers / Profile) ---------- */
  function lcoNavHTML(tab) {
    return `
      <nav class="lco-nav">
        <button class="${tab === "home" ? "on" : ""}" data-nav="home" aria-label="Dashboard">${I.home}</button>
        <button data-nav="subs" aria-label="Subscribers">${I.users}</button>
        <button class="${tab === "profile" ? "on" : ""}" data-nav="profile" aria-label="Profile">${I.userFill}</button>
      </nav>`;
  }
  function bindLcoNav(root, tab) {
    $$("[data-nav]", root).forEach((b) => b.addEventListener("click", () => {
      const t = b.dataset.nav;
      if (t === "subs") return openSubsChooser();   // people icon → choose Cable / OTT Subscribers
      if (t === tab) { const sc = $(".tv-scroll", root); if (sc) sc.scrollTo({ top: 0, behavior: "smooth" }); return; }
      if (t === "profile") return go("lcoProfile");
      // Dashboard tab from Profile: go back to it (Profile was opened from the dashboard)
      const prev = stack[stack.length - 2];
      if (prev && prev.name === "lcoDash") back();
      else reset("lcoDash", {}, "back");
    }));
  }
  /* ---------- LCO subscriber card (Active STB / DA STB / Cable Customer / Search Subscriber) ---------- */
  const SUB_FIELDS = { vc: ["Vc No", (s) => s.vc], mobile: ["Mobile No", (s) => s.mobile], sms: ["Sms Id", (s) => s.sms] };
  function subCardHTML(s, showOtt = false) {
    return `
      <button class="lco-sub" data-k="${s.kind}" data-i="${s.i}">
        <span class="lco-sub-h"><span class="lco-av">${s.name[0]}</span><b>${esc(s.name)}</b>${showOtt && s.ott ? `<em class="lco-ott">OTT</em>` : ""}</span>
        <span class="lco-kv">
          <span><small>VC No</small>${s.vc}</span><span><small>Box Type</small>${s.box}</span>
          <span><small>SMS ID</small>${s.sms}</span><span><small>Due Date</small>${s.due}</span>
        </span>
        <span class="lco-status ${s.active ? "ok" : "off"}">Status: ${s.active ? "Active" : "Deactive"}</span>
      </button>`;
  }

  // Dashboard search icon → "Search Subscriber" pop-up (as in the old LCO app)
  function openSubSearch() {
    const all = [...LCO_DATA.active, ...LCO_DATA.da];
    openSheet(`
      <div class="lco-ss">
        <h3>Search Subscriber</h3>
        <div class="lco-ss-row">
          <span class="lco-ss-lbl">Search By</span>
          <select id="ssSt" aria-label="Status"><option value="all">All</option><option value="active">Active</option><option value="da">Deactive</option></select>
        </div>
        <div class="lco-filter lco-ss-f">
          <select id="ssBy" aria-label="Search by">${Object.entries(SUB_FIELDS).map(([k, [l]]) => `<option value="${k}">${l}</option>`).join("")}</select>
          <label class="lco-search">${I.search}<input id="ssQ" type="search" placeholder="Search Vc No" aria-label="Search" /></label>
        </div>
        <div class="lco-list lco-ss-list" id="ssList"></div>
        <button class="btn" id="ssClose">Close</button>
      </div>`, (sh) => {
      const st = $("#ssSt", sh), by = $("#ssBy", sh), q = $("#ssQ", sh);
      const draw = () => {
        const [label, get] = SUB_FIELDS[by.value];
        q.placeholder = `Search ${label}`;
        const t = q.value.trim().toLowerCase();
        const list = all.filter((s) => get(s).toLowerCase().includes(t) && (st.value === "all" || (st.value === "active") === s.active));
        $("#ssList", sh).innerHTML = list.length
          ? list.map((s) => subCardHTML(s)).join("")
          : `<div class="empty">${I.search}<b>No subscriber found</b><p>Try another ${label}.</p></div>`;
        $$("[data-i]", sh).forEach((b) => b.addEventListener("click", () => go("lcoSub", { kind: b.dataset.k, i: +b.dataset.i })));
      };
      st.addEventListener("change", draw);
      by.addEventListener("change", draw);
      q.addEventListener("input", draw);
      $("#ssClose", sh).addEventListener("click", closeSheet);
      draw();
    });
  }

  // Watch OTT (dashboard / profile) → live TV guide with a "Go Back to LCO" button
  const watchOtt = () => go("home", { fromLco: true });

  // Bottom-bar people icon: bottom sheet with the two subscriber options (as in the LCO app)
  function openSubsChooser() {
    openSheet(`
      <h3>Subscribers</h3>
      <div class="lco-grid2 lco-choose">
        <button class="lco-tile" data-pick="cable">${I.users}<span>Cable<br/>Subscribers</span></button>
        <button class="lco-tile" data-pick="ott">${I.users}<span>OTT<br/>Subscribers</span></button>
      </div>`, (sh) => {
      $('[data-pick="cable"]', sh).addEventListener("click", () => go("lcoStbs", { kind: "cable" }));
      $('[data-pick="ott"]', sh).addEventListener("click", () => go("lcoOtt"));
    });
  }
  /* LCO → OTT Activation: build a new (fictional) OTT customer record */
  function newOttCustomer(name, mobile, plan) {
    const now = new Date();
    return {
      id: Math.max(0, ...LCO_DATA.ott.map((c) => c.id)) + 1,
      user: `${mobile}_Cable`, mobile, status: "active", name: name.toUpperCase(),
      activated: now, balance: "0.0", plan: plan.name, planAt: now,
      video: "Welcome Plan", videoAt: now,
      email: "—", address: LCO_DATA.partner.name,
    };
  }

  /* LCO → OTT Customer → Invoice: a simple demo invoice for the latest plan */
  function openOttInvoice(c) {
    const p = OTT_PLANS.find((x) => c.plan.startsWith(x.name)) || OTT_PLANS[0];
    const amt = c.lastPrice || p.price;
    const gst = +(amt * 0.18 / 1.18).toFixed(2);
    openSheet(`
      <h3>Invoice</h3>
      <div class="lco-inv">
        <span><small>Invoice No</small><b>INV${String(c.mobile).slice(-6)}${p2(c.planAt.getDate())}</b></span>
        <span><small>Date</small><b>${stamp(c.planAt)}</b></span>
        <span><small>Customer</small><b>${esc(c.name)}</b></span>
        <span><small>User Name</small><b>${c.user}</b></span>
        <span><small>Plan</small><b>${esc(c.plan)}</b></span>
        <span><small>Amount (excl. GST)</small><b>₹ ${money(amt - gst)}</b></span>
        <span><small>GST 18%</small><b>₹ ${money(gst)}</b></span>
        <span class="tot"><small>Total</small><b>₹ ${money(amt)}</b></span>
      </div>
      <span class="demo-tag">Demo invoice • Not a tax document</span>
      <button class="btn" id="invDl">Download PDF</button>
      <button class="btn ghost" id="invClose">Close</button>`, (sh) => {
      $("#invDl", sh).addEventListener("click", () => toast("Invoice download (demo)"));
      $("#invClose", sh).addEventListener("click", closeSheet);
    });
  }

  /* ---------- Broadband LCO helpers ---------- */
  // Active / new customers whose plan expires within `days` (dashboard "Expiring soon" + Upcoming Renewal)
  function bbExpiring(days) {
    const now = Date.now();
    return BB_DATA.customers.filter((c) => (c.status === "active" || c.status === "new") &&
      c.expiry.getTime() >= now && c.expiry.getTime() < now + days * 864e5);
  }

  function bbNavHTML(tab) {
    const B = [["home", I.home, "Home"], ["case", I.ticket, "Case"], ["customer", I.users, "Customer"], ["menu", I.menu, "Menu"]];
    return `
      <nav class="lco-nav bb-nav">
        ${B.map(([k, ic, l]) => `<button class="${k === tab ? "on" : ""}" data-nav="${k}" aria-label="${l}">${ic}<span>${l}</span></button>`).join("")}
      </nav>`;
  }
  function bindBbNav(root, tab) {
    $$("[data-nav]", root).forEach((b) => b.addEventListener("click", () => {
      const t = b.dataset.nav;
      if (t === "menu") return openBbMenu();
      if (t === tab) { const sc = $(".tv-scroll", root); if (sc) sc.scrollTo({ top: 0, behavior: "smooth" }); return; }
      if (t === "home") {
        const prev = stack[stack.length - 2];
        if (prev && prev.name === "bbDash" && stack.length === 2) back();
        else reset("bbDash", {}, "back");
        return;
      }
      const name = t === "case" ? "bbCases" : "bbCustomers";
      if (tab === "home") go(name); else swapRoute(name);   // Case ↔ Customer: swap, so Back returns to Home
    }));
  }

  // ☰ menu (bottom sheet): Management / Customer / Settings
  function openBbMenu() {
    const C = BB_DATA.partner.counts;
    const badge = (n) => (n ? `<i class="bb-badge">${n > 99 ? "99+" : n}</i>` : "");
    const item = (k, ic, l, n) => `<button class="bb-mi" data-m="${k}">${badge(n)}<span class="bb-mic">${ic}</span><span>${l}</span></button>`;
    openSheet(`
      <div class="bb-menu">
        <h4>Management</h4>
        <div class="bb-mgrid">
          ${item("topup", I.wallet, "Top Up")}${item("report", I.chart, "Report Details")}${item("plans", I.news, "Available Plan")}
        </div>
        <h4>Customer</h4>
        <div class="bb-mgrid">
          ${item("active", I.users, "Active Customers", C.active)}${item("inactive", I.users, "Inactive Customers", C.inactive)}
          ${item("expired", I.users, "Expired Customers", C.expired)}${item("online", I.wifi, "Online Customers")}
          ${item("renewal", I.calendar, "Upcoming Renewal", bbExpiring(30).length)}${item("outstanding", I.rupee, "Outstanding Collection")}
        </div>
        <h4>Settings</h4>
        <div class="bb-mgrid">
          ${item("profile", I.user, "Profile")}${item("password", I.lock, "Change Password")}
          ${item("txns", I.card, "Transaction History")}${item("subreport", I.chart, "Subscriber Report")}
        </div>
      </div>`, (sh) => {
      $$("[data-m]", sh).forEach((b) => b.addEventListener("click", () => {
        const m = b.dataset.m;
        if (m === "topup" || m === "txns") go("lcoTopUp", { wallet: "bb" });
        else if (m === "plans") go("bbPlans");
        else if (m === "profile") go("bbProfile");
        else if (["active", "inactive", "expired", "online", "renewal"].includes(m)) go("bbCustomers", { view: m });
        else { closeSheet(); toast(`${b.textContent.trim()} (demo)`); }
      }));
    });
  }

  // Case → eye icon: details + Assign to me / Work In Progress / Completed
  function openCaseSheet(c, redraw) {
    if (!c) return;
    const acts = !c.assigned ? `<button class="btn" id="csA">Assign to me</button>`
      : c.status === "open" ? `<button class="btn" id="csW">Start work (Work In Progress)</button>`
      : c.status === "wip" ? `<button class="btn" id="csD">Mark Completed</button>` : "";
    openSheet(`
      <h3>${c.id}</h3>
      <div class="lco-inv">
        <span><small>Customer</small><b>${esc(c.cust)}</b></span>
        <span><small>User Name</small><b>${esc(c.user)}</b></span>
        <span><small>Category</small><b>${c.cat}</b></span>
        <span><small>Created</small><b>${stamp(c.at)}</b></span>
        <span><small>Assigned to</small><b>${c.assigned ? esc(c.to) : "Not assigned"}</b></span>
        <span class="tot"><small>Status</small><b>${CASE_STATUS[c.status]}</b></span>
      </div>
      ${acts}
      <button class="btn ghost" id="csClose">Close</button>`, (sh) => {
      const done = (msg) => { closeSheet(); redraw(); toast(msg, "success"); };
      $("#csClose", sh).addEventListener("click", closeSheet);
      const a = $("#csA", sh), w = $("#csW", sh), d = $("#csD", sh);
      if (a) a.addEventListener("click", () => { Object.assign(c, { assigned: true, mine: true, to: `You (${(state.session && state.session.lcoid) || "LCO"})` }); done("Case assigned to you (demo)"); });
      if (w) w.addEventListener("click", () => { c.status = "wip"; done("Case is Work In Progress (demo)"); });
      if (d) d.addEventListener("click", () => { c.status = "done"; done("Case completed (demo)"); });
    });
  }

  // Case FAB → New Case
  function openNewCase(after) {
    const CATS = ["No Internet", "Slow Speed", "Router Issue", "Change Request", "Shifting Request", "Corporate Leased Line"];
    const users = [...BB_DATA.customers].sort((a, b) => a.user.localeCompare(b.user));
    openSheet(`
      <h3>New Case</h3>
      <label class="lco-fl"><small>Customer (User Name)</small>
        <select id="ncU"><option value="">Select customer</option>${users.map((c) => `<option value="${c.id}">${esc(c.user)}</option>`).join("")}</select></label>
      <label class="lco-fl"><small>Category</small>
        <select id="ncC">${CATS.map((c) => `<option>${c}</option>`).join("")}</select></label>
      <p class="hint" id="ncE"></p>
      <button class="btn" id="ncS">Create Case</button>
      <button class="btn ghost" id="ncX">Cancel</button>`, (sh) => {
      $("#ncX", sh).addEventListener("click", closeSheet);
      $("#ncS", sh).addEventListener("click", () => {
        const u = BB_DATA.customers.find((c) => c.id === +$("#ncU", sh).value);
        if (!u) { shake($("#ncU", sh).closest(".lco-fl")); $("#ncE", sh).textContent = "Select a customer"; $("#ncE", sh).className = "hint err"; return; }
        const id = "TKT45" + String(Date.now()).slice(-5);
        BB_DATA.cases.unshift({ id, cust: u.name, user: u.user, cat: $("#ncC", sh).value, status: "open", assigned: false, mine: false, to: "", at: new Date() });
        closeSheet();
        after();
        toast(`Case ${id} created (demo)`, "success");
      });
    });
  }

  // Customer → ⚙ → Invoice: demo invoice for the customer's current broadband plan
  function openBbInvoice(c) {
    const p = BB_PLANS.find((x) => x.name === c.plan);
    if (!p) { toast("No invoice yet — Recharge a plan first", "error"); return; }
    const amt = c.lastPrice || p.price;
    const gst = +(amt * 0.18 / 1.18).toFixed(2);
    const at = c.planAt || new Date(c.expiry.getTime() - p.days * 864e5);
    openSheet(`
      <h3>Invoice</h3>
      <div class="lco-inv">
        <span><small>Invoice No</small><b>BBINV${String(c.mobile).slice(-6)}${p2(at.getDate())}</b></span>
        <span><small>Date</small><b>${stamp(at)}</b></span>
        <span><small>Customer</small><b>${esc(c.title)} ${esc(c.name)}</b></span>
        <span><small>User Name</small><b>${esc(c.user)}</b></span>
        <span><small>Plan</small><b>${p.name} (${p.speed}, ${p.days} days)</b></span>
        <span><small>Amount (excl. GST)</small><b>₹ ${money(amt - gst)}</b></span>
        <span><small>GST 18%</small><b>₹ ${money(gst)}</b></span>
        <span class="tot"><small>Total</small><b>₹ ${money(amt)}</b></span>
      </div>
      <span class="demo-tag">Demo invoice • Not a tax document</span>
      <button class="btn" id="invDl">Download PDF</button>
      <button class="btn ghost" id="invClose">Close</button>`, (sh) => {
      $("#invDl", sh).addEventListener("click", () => toast("Invoice download (demo)"));
      $("#invClose", sh).addEventListener("click", closeSheet);
    });
  }

  async function lcoLogout() {
    showLoader("Signing out…");
    await wait(700);
    hideLoader();
    state.session = null;
    reset("role", { first: true });
    toast("Signed out", "success");
  }

  // After LCO login the dashboard becomes the root, so Back does not return to the login form
  function enterLcoDashboard() {
    closeSheet();
    reset(lcoHomeName(), {}, "fwd");
  }
  // Broadband LCO has its own dashboard (Home / Case / Customer); Cable TV LCO keeps the original one
  function lcoHomeName() {
    return state.session && state.session.service === "broadband" ? "bbDash" : "lcoDash";
  }

  // After login the home screen becomes the root, so Back does not return to the login form
  function enterHome() {
    closeSheet();
    reset("home", {}, "fwd");
  }

  /* =========================================================
     Live TV guide helpers
     ========================================================= */
  function filtered(g) {
    const { lang, q } = state.filter;
    const ql = q.toLowerCase();
    return CHANNELS.filter((c) => c.genre === g.key && (!lang || c.lang === lang) &&
      (!ql || c.name.toLowerCase().includes(ql) || c.show.toLowerCase().includes(ql)));
  }

  function cardHTML(c, grid = false) {
    const sl = slot(c.id);
    return `
      <button class="ch-card${grid ? " in-grid" : ""}" data-ch="${c.id}">
        <div class="thumb" style="background:${grad(c.colors)}">
          <span class="live-badge"><i></i>LIVE</span>
          <b class="prog">${esc(c.show)}</b>
          <span class="prog-bar"><i style="width:${sl.pct}%"></i></span>
        </div>
        <div class="ch-name">${esc(c.name)}</div>
        <div class="ch-meta"><span class="t">${I.clock}${sl.time}</span><span class="lang">${c.lang}</span></div>
      </button>`;
  }

  function guideHTML() {
    const html = GENRES.filter((g) => !state.filter.genre || g.key === state.filter.genre).map((g) => {
      const list = filtered(g);
      if (!list.length) return "";
      return `
        <div class="sec">
          <div class="sec-head">
            <h4><span class="sec-ic">${g.icon}</span>${g.name} (${g.count})</h4>
            <button class="see-all" data-genre="${g.key}">See All ${I.chev}</button>
          </div>
          <div class="rail">${list.map((c) => cardHTML(c)).join("")}</div>
        </div>`;
    }).join("");
    return html || `<div class="empty">${I.search}<b>No channels found</b><p>Try another genre, language or search term.</p><button class="pill" data-act="reset-filters">Clear filters</button></div>`;
  }

  function filterChips() {
    const f = state.filter, chips = [];
    if (f.genre) chips.push(["genre", GENRES.find((g) => g.key === f.genre).name]);
    if (f.lang) chips.push(["lang", f.lang]);
    if (f.q) chips.push(["q", `“${esc(f.q)}”`]);
    return chips.map(([k, v]) => `<button class="fchip" data-clear="${k}">${v}${I.close}</button>`).join("");
  }

  function refreshHome(root, draw) {
    const f = state.filter;
    $('[data-act="genre"] span', root).textContent = f.genre ? GENRES.find((g) => g.key === f.genre).name : `Genre (${GENRES.length})`;
    $('[data-act="genre"]', root).classList.toggle("on", !!f.genre);
    $('[data-act="lang"] span', root).textContent = f.lang || `Language (${LANGUAGES.length})`;
    $('[data-act="lang"]', root).classList.toggle("on", !!f.lang);
    draw();
    syncMenuDot(root);
  }

  function bindGuide(root) {
    bindCards(root);
    $$("[data-genre]", root).forEach((b) => b.addEventListener("click", () => go("genre", { key: b.dataset.genre })));
    const draw = () => { $("#sections", root).innerHTML = guideHTML(); $("#filters", root).innerHTML = filterChips(); bindGuide(root); };
    $$("[data-clear]", root).forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.clear;
      if (k === "q") { state.filter.q = ""; $("#q", root).value = ""; $("#searchbar", root).hidden = true; $('[data-act="search"]', root).classList.remove("on"); }
      else state.filter[k] = null;
      refreshHome(root, draw);
    }));
    const rf = $('[data-act="reset-filters"]', root);
    if (rf) rf.addEventListener("click", () => {
      Object.assign(state.filter, { genre: null, lang: null, q: "" });
      $("#q", root).value = ""; $("#searchbar", root).hidden = true; $('[data-act="search"]', root).classList.remove("on");
      refreshHome(root, draw);
    });
  }

  function bindCards(root, replace = false) {
    $$("[data-ch]", root).forEach((b) => b.addEventListener("click", () => playChannel(+b.dataset.ch, replace)));
  }

  function playChannel(id, replace = false) {
    if ((state.session || {}).type === "guest") {
      openSheet(`
        <h3>Subscribe to watch</h3>
        <p>Live channels need an active Cable TV or Broadband connection.</p>
        <button class="btn" id="subCable">Register Cable TV (VSC + Mobile)</button>
        <button class="btn ghost" id="subBb">Register Broadband (User ID + OTP)</button>
        <button class="btn ghost" id="subPrev">Watch 2-minute preview</button>`, (sh) => {
        $("#subCable", sh).addEventListener("click", () => { state.service = "cable"; go("login", { type: "cable", signup: true }); });
        $("#subBb", sh).addEventListener("click", () => { state.service = "broadband"; go("login", { type: "broadband", signup: true }); });
        $("#subPrev", sh).addEventListener("click", () => { closeSheet(); openPlayer(id, replace); toast("Preview mode (demo)"); });
      });
      return;
    }
    openPlayer(id, replace);
  }
  function openPlayer(id, replace) {
    if (replace && stack[stack.length - 1].name === "player") {
      // Switch channel inside the player without stacking players
      stack[stack.length - 1] = { name: "player", params: { id } };
      render(stack[stack.length - 1], "none");
      return;
    }
    go("player", { id });
  }

  // Generic single-choice bottom sheet
  function pickSheet(title, options, current, onPick) {
    openSheet(`
      <h3>${title}</h3>
      <div class="pick-list">
        ${options.map((o) => `<button class="pick${o === current ? " on" : ""}" data-v="${esc(o)}"><span>${esc(o)}</span><span class="radio">${I.check}</span></button>`).join("")}
      </div>`, (sh) => {
      $$("[data-v]", sh).forEach((b) => b.addEventListener("click", () => {
        $$(".pick", sh).forEach((p) => p.classList.remove("on"));
        b.classList.add("on");
        setTimeout(() => { closeSheet(); onPick(b.dataset.v); }, 160);
      }));
    });
  }

  /* ---------- Status-bar clock (desktop frame) ---------- */
  function tick() {
    const d = new Date();
    $("#sbTime").textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  tick(); setInterval(tick, 30000);

  /* ---------- Opening animation (VIBE intro video) ----------
     Plays once when the app opens, then fades into the first page.
     If the video cannot autoplay, an animated logo is shown instead. */
  function runSplash() {
    const sp = $("#splash");
    if (!sp) return;
    const v = $("#splashVideo"), bgv = $("#splashBg"), bar = $("#splashBar");
    const skip = $("#splashSkip"), snd = $("#splashSound");
    let finished = false, usedFallback = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      try { v.pause(); bgv.pause(); } catch (e) { /* ignore */ }
      sp.classList.add("done");
      document.removeEventListener("keydown", onKey);
      setTimeout(() => sp.remove(), 650);
    };
    const fallback = () => {
      if (usedFallback || finished) return;
      usedFallback = true;
      v.hidden = bgv.hidden = snd.hidden = true;
      $("#splashFallback").hidden = false;
      bar.style.transition = "width 2.8s linear";
      requestAnimationFrame(() => (bar.style.width = "100%"));
      setTimeout(finish, 3000);
    };
    const onKey = (e) => { if (["Escape", "Enter", " "].includes(e.key)) { e.preventDefault(); finish(); } };

    skip.addEventListener("click", finish);
    document.addEventListener("keydown", onKey);
    snd.addEventListener("click", () => {
      v.muted = !v.muted;
      snd.classList.toggle("on", !v.muted);
      snd.setAttribute("aria-label", v.muted ? "Turn sound on" : "Turn sound off");
      if (v.paused) v.play().catch(() => {});
    });
    v.addEventListener("timeupdate", () => {
      if (v.duration) bar.style.width = `${(v.currentTime / v.duration) * 100}%`;
      if (Math.abs(bgv.currentTime - v.currentTime) > 0.3) bgv.currentTime = v.currentTime; // keep the blurred copy in sync
    });
    v.addEventListener("ended", finish);
    v.addEventListener("error", fallback);

    const p = v.play();
    bgv.play().catch(() => {});
    if (p && p.catch) p.catch(fallback);
    // Safety nets: video never starts → logo animation; something stalls → open the app anyway
    setTimeout(() => { if (!finished && v.currentTime === 0) fallback(); }, 2500);
    setTimeout(finish, 15000);
  }

  /* ---------- Boot: first page = Customer / LCO selection ---------- */
  stack.push({ name: "role", params: { first: true } });
  if (HISTORY) history.replaceState({ depth: 1 }, "");
  render(stack[0], "none");
  runSplash();
})();
