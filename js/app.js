/* =========================================================
   SITI PLAYTOP MAGIC (All-in-one hub) mobile prototype – front-end only demo
   No backend, no real authentication. Everything is simulated.
   ========================================================= */
(function () {
  "use strict";

  // Demo values (no SMS is ever sent)
  const DEMO_OTP = "1111";            // demo OTP everywhere (customers, other users, LCO)
  const OTP_LEN = 4;                  // every OTP is 4 digits
  const APP_VERSION = "1.0.0";        // shown small at the top of every ☰ menu
  const DEMO_MOBILE = "9000000000";   // registered mobile linked to every Broadband User ID; works out of the box

  const LOGO = "assets/logo/siti-playtop-magic.svg";   // official SITI PLAYTOP MAGIC logo (dark-theme copy: MAGIC in yellow)
  const MARK = "assets/logo/siti-playtop-magic.svg";   // compact "SITI PLAYTOP MAGIC" mark for the home header

  /* ---------- Icons (inline SVG, stroke style) ---------- */
  const s = (p, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
  const I = {
    back: s('<path d="M15 18l-6-6 6-6"/>'),
    camera: s('<path d="M4 8.5h3l1.6-2.2h6.8L17 8.5h3v10.5H4z"/><circle cx="12" cy="13.5" r="3.4"/>'),
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
    fire: s('<path d="M12 2c-1.5 3-4 5.5-4 9.5a6 6 0 0 0 12 0c0-3.5-2.5-6.5-4-9.5z"/><path d="M12 12c-.8 1.5-2 2.5-2 4a3 3 0 0 0 6 0c0-1.5-1.2-2.5-2-4z"/>'),
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
    headset: s('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3.5" y="13.5" width="4" height="6" rx="1.5"/><rect x="16.5" y="13.5" width="4" height="6" rx="1.5"/>'),
    crown: s('<path d="M3.5 8l4.5 4 4-6 4 6 4.5-4-1.8 10H5.3z"/><path d="M5.5 20.5h13"/>'),
    device: s('<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>'),
    expand: s('<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>'),
    pip: s('<rect x="3" y="5" width="18" height="14" rx="2"/><rect x="12" y="11.5" width="6.5" height="5" rx="1"/>'),
    pie: s('<path d="M12 3v9h9"/><circle cx="12" cy="12" r="9"/>'),
    help: s('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17v.2"/>'),
    pin: s('<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
    up: s('<path d="M12 19V5M6 11l6-6 6 6"/>'),
    down: s('<path d="M12 5v14M6 13l6 6 6-6"/>'),
    swapv: s('<path d="M8 20V5M4 9l4-4 4 4M16 4v15M12 15l4 4 4-4"/>'),
    history: s('<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5M12 8v4.5l3 2"/>'),
    bolt: s('<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>'),
    pencil: s('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
    hash: s('<path d="M9 4L7 20M17 4l-2 16M4.5 9h16M3.5 15h16"/>'),
    idcard: s('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5.5 16c.6-1.6 1.9-2.4 3.5-2.4s2.9.8 3.5 2.4M14.5 10h4M14.5 13.5h3"/>'),
    scan: s('<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><circle cx="12" cy="10.5" r="2.5"/><path d="M8 16.5c.8-1.7 2.2-2.6 4-2.6s3.2.9 4 2.6"/>'),
    finger: s('<path d="M8 20c1.2-2 1.8-4.3 1.8-7a2.2 2.2 0 0 1 4.4 0c0 2.4-.3 4.6-1 6.6"/><path d="M5.3 17.5C6.2 15.9 6.6 14.4 6.6 13a5.4 5.4 0 0 1 10.8 0c0 1.6-.1 3.1-.4 4.6"/><path d="M4 10.5a8.5 8.5 0 0 1 16 0"/><path d="M12 13c0 3-.7 5.6-2.2 8"/>'),
    logout: s('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5"/><path d="M5 12h11"/>'),
  };

  /* ---------- User types ---------- */
  const USER_TYPES = {
    customer: { title: "Customer", desc: "Continue as a Customer", icon: I.user },
    lco: { title: "LCO", desc: "Continue as a Partner/LCO", icon: I.store },
    broadband: { title: "Broadband", desc: "Continue with your broadband connection", icon: I.wifi },
    cable: { title: "Cable TV", desc: "Continue with your Cable TV service provider", icon: I.tv },
    guest: { title: "Other Users", desc: "I want to be a PLAYTOP user", icon: I.guest },
  };

  // Extra (non-mobile) fields used by some login types
  const EXTRA = {
    vsc: {
      label: "VSC number", icon: I.card, placeholder: "Enter VSC Number", maxlength: 11, inputmode: "numeric",
      clean: (v) => v.replace(/\D/g, "").slice(0, 11),
      valid: (v) => /^\d{11}$/.test(v),
      hint: "11 digit number printed on your set-top box / viewing card",
      err: "Enter a valid VSC number (11 digits)",
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
      // Any 7 characters, letters and/or digits (e.g. LCO1234, 1234567, AB12CD3)
      label: "LCO ID", icon: I.key, placeholder: "Enter 7-character LCO ID", maxlength: 7, inputmode: "text",
      clean: (v) => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7),
      valid: (v) => /^[A-Z0-9]{7}$/.test(v),
      hint: "7 characters: letters and/or numbers",
      err: "LCO ID must be exactly 7 letters/numbers",
      short: "LCO ID",
    },
  };

  // Login screen configuration per user type
  const LOGIN = {
    cable: {
      // Cable users register ONCE with VSC + mobile; after that they log in with mobile only
      sub: "Registered cable user? Login with your mobile number",
      subReg: "New cable customer? Verify your mobile number, then add your VSC number",
      label: "Join as Cable User",
      btn: "Login",
      btnReg: "Get OTP",
      extra: "vsc", extraAfterOtp: true,   // sign up: mobile → OTP → VSC screen (cableVsc)
      otpLogin: true, otpAlways: true,   // OTP (DEMO_OTP) on every sign-in, registration included
      otpSubLogin: "Enter the 4-digit OTP sent to your mobile number",
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
      otpLogin: true, otpAlways: true,   // OTP (DEMO_OTP) on every mobile sign-in
      otpSubLogin: "Enter the 4-digit OTP sent to your mobile number",
      otpSub: "New broadband customer? Enter your User ID – we'll send an OTP to your registered mobile",
      otpSubCode: "Enter the 4-digit OTP sent to your registered mobile",
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
      sub: "Explore content without a subscription – sign in with your mobile number & OTP",
      subReg: "New here? Sign up with your mobile number & OTP",
      label: "Join as Other User",
      btn: "Continue",
      btnReg: "Sign up",
      track: true,
      otpLogin: true, otpAlways: true,   // OTP (DEMO_OTP) on every sign-in, first time included
      otpSubLogin: "Enter the 4-digit OTP sent to your mobile number",
      done: "Welcome back!",
      doneMsg: "You are logged in as an other user.",
      doneReg: "Registration successful",
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
    otpSubCode: "Enter the 4-digit OTP sent to your registered mobile",
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
    ["Magic Play", ["#ff3fd0", "#9b5cff"]], ["Cine Max", ["#ff7a59", "#c2185b"]], ["Stream Box", ["#2fd8ff", "#3a6bff"]],
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
    { name: "SITI Basic SD", price: 199, ch: 180, hd: 0, ott: 0 },        // ott = number of OTT_APPS included (customer packages)
    { name: "SITI Bangla Value", price: 299, ch: 230, hd: 15, ott: 2 },
    { name: "SITI Family HD", price: 399, ch: 280, hd: 40, ott: 4 },
    { name: "SITI Sports Plus HD", price: 499, ch: 310, hd: 60, ott: 6 },
    { name: "SITI Premium HD", price: 649, ch: 360, hd: 90, ott: 9 },
    { name: "SITI Ultimate 4K", price: 799, ch: 400, hd: 120, ott: 11 },
  ];

  /* ---------- LCO dashboard demo data (fictional people & numbers; generated once, stable per load) ---------- */
  // Cable LCO subscriber page: action icons drawn to match the old LCO portal's ACTIONS icons
  const ACT_IC = (() => {
    const sv = (body) => `<svg class="act-ic" viewBox="0 0 40 40" aria-hidden="true">${body}</svg>`;
    const disc = (c) => `<circle cx="20" cy="20" r="19" fill="${c}"/>`;
    const tile = `<rect x="1" y="1" width="38" height="38" rx="10" fill="#eceef2"/>`;
    const rupee = (c) => `<path d="M14 12h12M14 17h12M16.5 12c5 0 5 7 0 7h-2.5l8 9" fill="none" stroke="${c}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;
    return {
      // All Package deactivation: person with a red "no" slash
      userSlash: sv(`<circle cx="20" cy="20" r="19" fill="#fdecec"/><circle cx="20" cy="15.5" r="4.6" fill="#8d6e63"/><path d="M11.5 29c.8-5.2 4.3-8 8.5-8s7.7 2.8 8.5 8z" fill="#8d6e63"/><circle cx="20" cy="20" r="14.5" fill="none" stroke="#d32f2f" stroke-width="3"/><path d="M10 10l20 20" stroke="#d32f2f" stroke-width="3" stroke-linecap="round"/>`),
      // Package deactivation: red "no entry"
      minus: sv(`<circle cx="20" cy="20" r="19" fill="#fdf2f2"/><circle cx="20" cy="20" r="14.5" fill="none" stroke="#d32f2f" stroke-width="3"/><rect x="12" y="18" width="16" height="4" rx="1" fill="#d32f2f"/>`),
      rupee: sv(disc("#f5a011") + rupee("#1b1b1b")),
      sync: sv(disc("#3d8bf2") + `<path d="M12.5 18a8 8 0 0 1 14-4.2M27.5 22a8 8 0 0 1-14 4.2" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M28.5 9.5v6h-6zM11.5 30.5v-6h6z" fill="#fff"/>`),
      // Upgrade / Downgrade: orange ₹ with a black lightning badge
      rupeeBolt: sv(`<circle cx="18" cy="18" r="17" fill="#f7941d"/><g transform="translate(-2 -2)">${rupee("#fff")}</g><circle cx="30.5" cy="30.5" r="8" fill="#1b1b1b"/><path d="M31.6 24.6l-4.4 6.6h3.2l-1 5.2 4.6-7h-3.3z" fill="#ffd60a"/>`),
      // STB replacement: green up + red down arrows
      upDown: sv(tile + `<path d="M14 31V12M8.5 17.5L14 11l5.5 6.5" fill="none" stroke="#2e9e44" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 9v19M20.5 22.5L26 29l5.5-6.5" fill="none" stroke="#e53935" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`),
      // VC replacement: orange swap arrows
      swap: sv(tile + `<path d="M9 15h21M25 10l5 5-5 5M31 25H10M15 20l-5 5 5 5" fill="none" stroke="#f08a24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`),
      history: sv(disc("#3d8bf2") + `<path d="M12.8 15.5A8.6 8.6 0 1 1 11.4 21" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/><path d="M9.5 11.5v6h6z" fill="#fff"/><path d="M20 15.5V20l3.2 2.6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`),
      info: sv(disc("#3d8bf2") + `<circle cx="20" cy="12.5" r="2.6" fill="#fff"/><path d="M16.5 17.5h5v10h2.5v2.5h-8v-2.5h2.5v-7.5h-2z" fill="#fff"/>`),
      person: sv(disc("#6f42c1") + `<circle cx="20" cy="15.5" r="4.8" fill="#fff"/><path d="M11.5 28.5c.6-5 4.1-7.8 8.5-7.8s7.9 2.8 8.5 7.8z" fill="#fff"/>`),
      // Complaint management: pink support agent with headset
      headset: sv(disc("#e8408f") + `<circle cx="20" cy="20" r="5.2" fill="#fff"/><path d="M12.5 21v-2a7.5 7.5 0 0 1 15 0v2" fill="none" stroke="#fff" stroke-width="2.4"/><rect x="10.5" y="18.5" width="4" height="6" rx="1.6" fill="#fff"/><rect x="25.5" y="18.5" width="4" height="6" rx="1.6" fill="#fff"/><path d="M27.5 24.5c0 3-2.5 4.5-5.5 4.5" fill="none" stroke="#fff" stroke-width="2"/><path d="M17.8 20.4a3 3 0 0 0 4.4 0" fill="none" stroke="#e8408f" stroke-width="1.6" stroke-linecap="round"/>`),
      // Repairing Request: green chain links on a light tile
      chain: sv(tile + `<g transform="rotate(-45 20 20)" fill="none" stroke-width="3.4"><rect x="18.2" y="15.4" width="14.6" height="9.2" rx="4.6" stroke="#2e9e44"/><path d="M21.8 20a4.6 4.6 0 0 1-4.6 4.6" stroke="#eceef2" stroke-width="6.4"/><rect x="7.2" y="15.4" width="14.6" height="9.2" rx="4.6" stroke="#2e9e44"/></g>`),   // two interlocked links
      // VC replacement: purple document with lines, on a light tile
      doc: sv(tile + `<path d="M12.5 8.5h10.5l5.5 5.5v17.5h-16z" fill="#7b4fd6"/><path d="M23 8.5V14h5.5z" fill="#b89cf0"/><path d="M15.5 19.5h10M15.5 23.5h10M15.5 27.5h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`),
    };
  })();
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

  /* ---------- LCO Watch OTT → customer self-care (Recharge, Support, Profile, Plan, Usage…). All data fictional ---------- */
  const CTV = (() => {
    const ago = (days, h = 10) => { const d = new Date(Date.now() - days * 864e5); d.setHours(h, 30, 51, 0); return d; };
    const plan = (price, speed, extra = "") => ({ price, speed, data: "Unlimited", days: 30, extra,
      name: `SITI_${speed.replace(/\s/g, "").toUpperCase()}${extra ? "_" + extra.split(" ")[0].toUpperCase() : ""}` });
    return {
      plans: {
        unlimited: [plan(699, "100 Mbps"), plan(580, "80 Mbps"), plan(409, "30 Mbps"), plan(1406, "200 Mbps")],
        ott: [plan(799, "100 Mbps", "7 OTT apps"), plan(999, "150 Mbps", "10 OTT apps"), plan(1299, "200 Mbps", "15 OTT apps")],
        bundle: [plan(899, "100 Mbps", "Digital TV 300 channels"), plan(1199, "200 Mbps", "Digital TV 400 channels")],
      },
      current: { name: "SITI_DEMO_OPERATOR_02", activated: ago(600), expiry: new Date(Date.now() + 130 * 864e5), validity: 365, used: "1388.19 GB", unused: "1349.65 GB" },
      history: [
        { name: "SITI_DEMO_OPERATOR_02", activated: ago(600), expiry: ago(235), validity: 365, used: "0 GB", unused: "UL GB" },
        { name: "SITI_80MBPS", activated: ago(700), expiry: ago(600), validity: 30, used: "212.40 GB", unused: "UL GB" },
      ],
      tickets: [
        { id: "TKT4311978", title: "Ping issue", reason: "Network Issue", at: ago(70), status: "Closed", remarks: [] },
        { id: "TKT4269956", title: "CPE Not Working - Wi-Fi Router", reason: "Technical_Problem_Category", at: ago(230, 11), status: "Closed", remarks: [] },
        { id: "TKT4180843", title: "KYC update for Customer", reason: "Technical_Problem_Category", at: ago(560, 12), status: "Closed", remarks: [] },
      ],
      payments: [
        { ref: "PAY" + "8820157", what: "Online payment (UPI)", amount: 699, at: ago(28), ok: true },
        { ref: "PAY" + "8714402", what: "Online payment (Card)", amount: 699, at: ago(58), ok: true },
        { ref: "PAY" + "8611239", what: "Online payment (UPI)", amount: 699, at: ago(88), ok: false },
      ],
      purchases: [
        { ref: "PUR" + "5520011", what: "SITI_100MBPS · 30 days", amount: 699, at: ago(28), ok: true },
        { ref: "PUR" + "5410087", what: "Static IP (VAS) · 30 days", amount: 150, at: ago(45), ok: true },
      ],
      charges: [
        { ref: "CHG" + "3310046", what: "Router rental", amount: 50, at: ago(30), ok: true },
      ],
      vas: {
        30: [["Static IP", 150], ["Extra 100 GB data", 199], ["OTT add-on (3 apps)", 99]],
        90: [["Static IP", 420], ["OTT add-on (7 apps)", 279]],
        180: [],
        360: [["Static IP", 1500]],
      },
      docs: [{ type: "ID Proof" }, { type: "Address Proof" }, { type: "Customer Passport-size Photo" }],
      week: [[3.2, .4], [4.8, .6], [2.1, .3], [5.0, .7], [3.9, .5], [4.4, .6], [1.7, .2]],   // GB [download, upload] per day
      notes: [
        { at: ago(70, 10), kind: "closed", id: "TKT4311978", cat: "Network Issue" },
        { at: ago(71, 16), kind: "created", id: "TKT4311978", cat: "Network Issue" },
      ],
      profile: { email: "demo.customer@example.com", gstin: "GSTIN Not Associated", 
        address: "12, Demo Street, Salt Lake Sector V, Kolkata 700091, West Bengal, India", ekyc: "Not Verified" },
    };
  })();

  // Broadband self-care (Dashboard → My Device / Udm, Usage → Session): devices and data sessions, all fictional
  // Udm device: [host, wifi band ("2G" | "5G") or "LAN", active]; IP / MAC / traffic are generated (fictional)
  const mkDev = (o, hosts) => {
    o.clients = hosts.map(([host, band, on], j) => ({
      host, lan: band === "LAN", ssid: band === "LAN" ? "—" : `${o.ssid} ${band}`, on, blocked: false,
      ip: on ? `192.168.1.${2 + j}` : "—", mac: `0E:5A:C4:${p2(10 + j * 7)}:${p2(21 + j * 3)}:${p2(40 + j)}`,
      sent: on ? 180 + ((j * 397) % 1100) : 0, recv: on ? 60 + ((j * 211) % 250) : 0,
    }));
    o.wifi = [{ name: "SSID1", ssid: `${o.ssid} 2G`, on: true }, { name: "SSID5", ssid: `${o.ssid} 5G`, on: true }, { name: "SSID2", ssid: `${o.ssid} Guest`, on: false }];
    return o;
  };
  const CTV_DEV = [
    mkDev({ name: "VBF-5515", serial: "VBFT2451A06C", ip: "100.64.126.178", mac: "02:5A:C4:00:00:43", model: "VBF-5515", brand: "SITI Fiber",
      ssid: "SITI Home", tx: "2.20 dBm", rx: "-19.40 dBm", on: Date.now() - 111 * 6e4, synced: Date.now() },
      [["Living-Room-TV", "5G", true], ["Android-Phone", "5G", true], ["Work-Laptop", "2G", false], ["Tablet-5G", "5G", false], ["Smart-Speaker", "2G", false], ["Set-top-Box", "LAN", true]]),
    mkDev({ name: "VBF-3300", serial: "VBFT2318B11D", ip: "100.64.98.24", mac: "02:5A:C4:00:01:9E", model: "VBF-3300", brand: "SITI Fiber",
      ssid: "SITI Office", tx: "1.85 dBm", rx: "-21.10 dBm", on: Date.now() - 3 * 864e5 - 290 * 6e4, synced: Date.now() },
      [["Office-PC", "LAN", true], ["Printer", "2G", true]]),
  ];
  const ctvDev = () => CTV_DEV[state.ctvDev || 0];
  // Data sessions of one month, newest day first: [{ day, list: [{ start, end, mins, up, dn, nas }] }] (sizes in MB, fixed per date)
  function ctvSessions(y, m) {
    const now = new Date();
    const last = y === now.getFullYear() && m === now.getMonth() ? now.getDate() : new Date(y, m + 1, 0).getDate();
    const out = [];
    for (let d = last; d >= 1; d--) {
      const seed = d * 7 + m * 13 + y;
      const list = [];
      for (let j = 0; j < (seed % 3 === 0 ? 2 : 1); j++) {
        const s = seed + j * 11, zero = s % 5 === 0;
        const mins = zero ? 0 : (s * 53) % 1380 + 12;
        const start = new Date(y, m, d, (s * 7) % 20, (s * 13) % 60, (s * 17) % 60);
        const dn = zero ? 0 : ((s * 379) % 2400) + 18.5 + (s % 100) / 100;
        list.push({ start, end: new Date(start.getTime() + mins * 6e4), mins, dn, up: dn * (0.08 + (s % 7) / 50), nas: `eth 0/1/0/${1000 + (s * 31) % 900}:${100 + (s % 50)}` });
      }
      out.push({ day: new Date(y, m, d), list });
    }
    return out;
  }
  const ctvMonthTotals = (y, m) => ctvSessions(y, m).reduce((a, g) => { g.list.forEach((x) => { a.up += x.up; a.dn += x.dn; }); return a; }, { up: 0, dn: 0 });
  const mbFmt = (mb) => (mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(2)} MB`);
  const durFmt = (mins) => `${Math.floor(mins / 1440)}d ${Math.floor((mins % 1440) / 60)}h :${p2(mins % 60)}m`;
  const dFmt = (d) => `${p2(d.getDate())} ${MON[d.getMonth()]} ${d.getFullYear()}`;                       // 06 Nov 2026
  const hmFmt = (d) => `${p2(d.getHours() % 12 || 12)}:${p2(d.getMinutes())} ${d.getHours() < 12 ? "AM" : "PM"}`;
  // Self-care My Plan (Dashboard card + Quick Renew). Quick Purchase adds 30 days each time (CTV.renewDays)
  function bbPlanInfo() {
    const from = new Date(Date.now() - 130 * 864e5), extra = CTV.renewDays || 0, total = 1828 + extra;
    const to = new Date(from.getTime() + total * 864e5);
    const now = new Date(), u = ctvMonthTotals(now.getFullYear(), now.getMonth()), usedGB = (u.up + u.dn) / 1024, fup = 200;   // 200 GB data per month (demo)
    return { name: "SITI_DEMO_OPEN_100", speed: "100 Mbps", data: `${fup} GB / month`, fup, usedGB, used: `${usedGB.toFixed(2)} GB`, up: u.up, dn: u.dn,
      price: 699, renew: 30, from, to, total, left: Math.round((to - Date.now()) / 864e5) };
  }
  const tFmt = (d) => `${dFmt(d)} ${d.getHours() % 12 || 12}:${p2(d.getMinutes())}:${p2(d.getSeconds())} ${d.getHours() < 12 ? "AM" : "PM"}`;

  // Broadband LCO ☰ → Profile ("Customer details"): editable contact details, filled on first open
  const BB_ACCOUNT = {};

  // Home ☰ → Partner Apps (names from the user's reference; plain text wordmarks, no logos)
  const PARTNER_APPS = [["VZY", "Vzy", "#ffc107"], ["Zee5", "Z5", "#e8e8ee"], ["Klikk", "KLiKK", "#ff2a2a"]];

  // Customer / guest Live TV: OTT home titles, purchases, devices (all fictional)
  const OTT_TITLES = [
    ["The Last Ferry", "Bengali", "Drama", ["#ff7a59", "#7b1010"]], ["Monsoon Letters", "Bengali", "Romance", ["#2fd8ff", "#3a6bff"]],
    ["Detective Ira", "Bengali", "Thriller", ["#434343", "#9b5cff"]], ["Old Town Tales", "Bengali", "Classic", ["#bdc3c7", "#5c6b7a"]],
    ["Night Shift", "Hindi", "Crime", ["#141e30", "#ff3fd0"]], ["Kitchen Kings", "Hindi", "Comedy", ["#ffb300", "#ff6f00"]],
    ["Star Runner", "English", "Sci-Fi", ["#0f2027", "#2fd8ff"]], ["Wild Delta", "English", "Documentary", ["#11998e", "#38ef7d"]],
    ["Hills Calling", "Odia", "Family", ["#56ccf2", "#2f80ed"]], ["Tiny Heroes", "Hindi", "Kids", ["#43e97b", "#0f9b8e"]],
  ];
  const CUST = {
    ottPlan: null,          // { plan, at, expiry } after "Subscribe Now"
    purchases: [{ at: new Date(Date.now() - 8 * 864e5), id: "#1764" + "402398156", what: "Welcome Plan", amount: 0, mode: "Cash", status: "Completed" }],
    others: [{ name: "SITI_TV_Box", at: new Date(Date.now() - 7 * 864e5 - 3e6) }],
    login: new Date(),
  };

  /* ---------- Broadband LCO demo data (Home / Case / Customer). All people, numbers and IDs are fictional ---------- */
  const BB_PLANS = [
    { name: "SITI_FIBER_50", speed: "50 Mbps", price: 499, days: 30, ott: 3 },
    { name: "SITI_FIBER_100", speed: "100 Mbps", price: 699, days: 30, ott: 7 },
    { name: "SITI_FIBER_200", speed: "200 Mbps", price: 899, days: 30, ott: 10 },
    { name: "SITI_FIBER_300", speed: "300 Mbps", price: 1099, days: 30, ott: 12 },
    { name: "SITI_FIBER_1G", speed: "1 Gbps", price: 2499, days: 30, ott: 15 },
    { name: "SITI_FIBER_100_6M", speed: "100 Mbps", price: 3799, days: 180, ott: 7 },
  ];
  const BB_STATUS = { new: "New - Active", active: "Active", inactive: "Inactive", suspended: "Suspended", expired: "Expired" };
  const CASE_STATUS = { open: "Open", wip: "Work In Progress", done: "Completed" };
  // Create Case: Type → Reason / Category → Sub Category ([] = no sub category)
  const CASE_REASONS = {
    Complaint: {
      Technical_Problem_Category: ["Browsing Related", "Slow Browsing", "Static IP Related", "Wi-Fi Range – ONU Issue", "Wi-Fi Range – Wi-Fi Router",
        "Auto Login / Waiting Login Page", "Automatic ONU Reset", "Cable Damaged – Drop Wire", "Cable Damaged – Patch Cord", "Call Drop (VOIP)",
        "CPE Not Working – ONU Issue", "CPE Not Working – GPON / ONU", "CPE Not Working – Wi-Fi Router", "Fibre Cut – LCO End"],
      "Corporate Leased Line": ["Link Down", "Packet Loss", "High Latency", "Bandwidth Issue"],
      "Billing Problem": ["Wrong Bill Amount", "Payment Not Updated", "Invoice Not Received", "Refund Request"],
      "Non Technical Issue": [],
      "Operator Support": ["Technician Not Visited", "Delay in Service", "Staff Behaviour"],
      "Network Issue": ["Area Outage", "Frequent Disconnection", "High Ping"],
      "Grievance Category": [],
    },
    Request: {
      "Change Request": ["Plan Change", "Name Change", "Mobile Number Change", "Email ID Change", "Address Change"],
      "Shifting Request": ["Within Same Area", "To Another Area"],
      "Corporate Leased Line": ["New Link", "Bandwidth Upgrade"],
      "Static IP Request": [],
      "Disconnection Request": ["Temporary", "Permanent"],
    },
    Feedback: {
      "Service Feedback": ["Appreciation", "Suggestion", "Dissatisfied"],
      "Installation Feedback": [],
      "Operator Support": [],
      "App Feedback": [],
    },
  };
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
        name: "SITI BROADBAND - KOLKATA SITE 1", email: "partner.kolkata@example.com",
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
  // Channel line-up. Items: [channel, programme on now, language, gradient?]. Gradient is optional (falls back to CH_PAL).
  // DD channels are kept LAST in every genre, so they always show at the end of a rail.
  const GENRES = [
    { key: "sports", name: "Sports", icon: I.trophy, count: 29, items: [
      ["Star Sports 1", "T20 Highlights", "English", ["#c8a96a", "#1f6b3a"]],
      ["Star Sports 1 Hindi", "Cricket Live", "Hindi", ["#1f6b3a", "#0b3d2e"]],
      ["Star Sports 2", "Champions Trophy Highlights", "English", ["#2b1055", "#d76d1f"]],
      ["Star Sports 3", "Pro Kabaddi Live", "Hindi", ["#0f2027", "#2c5364"]],
      ["Star Sports Select 1", "Premier Football", "English", ["#141e30", "#243b55"]],
      ["Star Sports Select 2", "Tennis Masters", "English", ["#3a6073", "#16222a"]],
      ["Star Sports 1 Tamil", "Cricket Live", "Tamil"],
      ["Sony Ten 1", "Football Matchday", "English", ["#134e5e", "#71b280"]],
      ["Sony Ten 2", "WWE Raw", "English"],
      ["Sony Ten 3", "Cricket Live", "Hindi"],
      ["Sony Ten 5", "Football Classics", "English"],
      ["Sony Sports Bangla", "Football Live", "Bengali"],
      ["Sports18", "Tennis Open Final", "Hindi", ["#1d2b64", "#6f86d6"]],
      ["Sports18 Khel", "Kho Kho League", "Hindi"],
      ["Eurosport", "Cycling Tour", "English"],
      ["DD Sports", "Hockey League", "Hindi", ["#3a1c71", "#d76d77"]],
    ] },
    { key: "entertainment", name: "Entertainment", icon: I.monitor, count: 97, items: [
      ["Star Plus", "Sayoni", "Hindi", ["#f6d6a8", "#b31217"]],
      ["Star Bharat", "Family Saga", "Hindi"],
      ["Star Jalsha", "Anurager Chhowa", "Bengali"],
      ["Star Pravah", "Evening Drama", "Marathi"],
      ["Star Vijay", "Super Singer", "Tamil"],
      ["Star Maa", "Prime Drama", "Telugu", ["#8e2de2", "#f7797d"]],
      ["Zee TV", "Ganga Mai Ki Betiyan", "Hindi", ["#1e3c72", "#7b4397"]],
      ["&TV", "Comedy Nights", "Hindi"],
      ["Zee Bangla", "Jagaddhatri", "Bengali"],
      ["Zee Marathi", "Prime Serial", "Marathi"],
      ["Zee Anmol", "Classic Serials", "Hindi"],
      ["Colors", "Dhruv Tara", "Hindi", ["#00b4db", "#e1245e"]],
      ["Colors Bangla", "Evening Story", "Bengali"],
      ["Sony TV", "Family Hour", "Hindi", ["#ff512f", "#3a1c71"]],
      ["Sony SAB", "Comedy Special", "Hindi"],
      ["Sony Pal", "Daily Drama", "Hindi"],
      ["Sony Aath", "Bengali Cartoon Hour", "Bengali"],
      ["Sun TV", "Evening Serial", "Tamil", ["#f7971e", "#7a1f1f"]],
      ["DD National", "Rangoli", "Hindi", ["#1f4037", "#99f2c8"]],
      ["DD Bangla", "Sandhya Bela", "Bengali", ["#614385", "#516395"]],
    ] },
    { key: "movies", name: "Movies", icon: I.clap, count: 49, items: [
      ["Star Gold", "Ravan Vadh", "Hindi", ["#e53935", "#7b1010"]],
      ["Star Gold 2", "Action Double Bill", "Hindi"],
      ["Star Gold Select", "Classic Cinema", "Hindi"],
      ["Star Movies", "Hollywood Night", "English", ["#000428", "#004e92"]],
      ["Star Movies Select", "Award Winners", "English"],
      ["Zee Cinema", "2.0", "Hindi", ["#0f2027", "#3a7bd5"]],
      ["Zee Bollywood", "Retro Hits", "Hindi"],
      ["Zee Action", "Dubbed Blockbuster", "Hindi"],
      ["Zee Bangla Cinema", "Bengali Superhit", "Bengali"],
      ["&pictures", "Action Special", "Hindi", ["#232526", "#c0392b"]],
      ["&flix", "Hollywood Prime", "English"],
      ["Sony Max", "Weekend Blockbuster", "Hindi", ["#355c7d", "#c06c84"]],
      ["Sony Max 2", "Evergreen Movies", "Hindi"],
      ["Sony Wah", "Family Movie", "Hindi"],
      ["Sony Pix", "Sci-Fi Night", "English"],
      ["Colors Cineplex", "Superhit Sunday", "Hindi", ["#41295a", "#2f0743"]],
      ["Jalsha Movies", "Bengali Classic", "Bengali"],
      ["Movies Now", "Blockbuster Night", "English"],
    ] },
    { key: "news", name: "News", icon: I.news, count: 125, items: [
      ["R. Bharat", "Live & Breaking", "Hindi", ["#d31027", "#1c3faa"]],
      ["Aaj Tak", "Aaj Ka Agenda", "Hindi", ["#ff416c", "#8e0e00"]],
      ["NDTV India", "Prime Time", "Hindi", ["#cb2d3e", "#2c3e50"]],
      ["Zee News", "DNA", "Hindi"],
      ["ABP News", "Master Stroke", "Hindi"],
      ["ABP Ananda", "Ghanta Khanek Sange", "Bengali"],
      ["Zee 24 Ghanta", "Khabar Live", "Bengali"],
      ["India Today", "News Today", "English"],
      ["Times Now", "The Newshour", "English", ["#1a2980", "#c33764"]],
      ["CNBC Awaaz", "Market Live", "Hindi"],
      ["Puthiya Thalaimurai", "Seithigal", "Tamil", ["#e65c00", "#b31217"]],
      ["TV9 Kannada", "Top Stories", "Kannada", ["#ee0979", "#141e30"]],
      ["DD News", "Desh Videsh", "Hindi", ["#0f3443", "#34e89e"]],
    ] },
    { key: "kids", name: "Kids", icon: I.kids, count: 18, items: [
      ["Pogo", "Cartoon Marathon", "Hindi", ["#11998e", "#38ef7d"]],
      ["Cartoon Network", "Morning Toons", "English", ["#f7971e", "#ffd200"]],
      ["Nick", "Fun Time", "Hindi", ["#f12711", "#f5af19"]],
      ["Sony Yay", "Toon Party", "Hindi"],
      ["Disney Junior", "Little Stories", "English", ["#00c6ff", "#0072ff"]],
      ["Discovery Kids", "Little Explorers", "Hindi"],
      ["Hungama", "Cartoon Hour", "Hindi"],
    ] },
    { key: "music", name: "Music", icon: I.music, count: 22, items: [
      ["9XM", "Bollywood Top 20", "Hindi", ["#8e2de2", "#4a00e0"]],
      ["MTV Beats", "Chill Hits", "Hindi", ["#fc466b", "#3f5efb"]],
      ["Zing", "Retro Rewind", "Hindi", ["#f953c6", "#b91d73"]],
      ["Zee ETC Bollywood", "Party Mix", "Hindi"],
      ["B4U Music", "Romantic Hits", "Hindi"],
      ["Sangeet Bangla", "Adhunik Gaan", "Bengali"],
      ["Sun Music", "Melody Time", "Tamil", ["#ff9966", "#ff5e62"]],
    ] },
    { key: "devotional", name: "Devotional", icon: I.lamp, count: 16, items: [
      ["Aastha", "Morning Aarti", "Hindi", ["#f7971e", "#c0392b"]],
      ["Sanskar", "Bhajan Sandhya", "Hindi", ["#ff8008", "#ffc837"]],
      ["SVBC", "Suprabhatam", "Telugu", ["#b24592", "#f15f79"]],
      ["Zee Jagran", "Satsang", "Hindi"],
    ] },
    { key: "infotainment", name: "Infotainment", icon: I.globe, count: 14, items: [
      ["Discovery", "Planet Wild", "English", ["#134e5e", "#71b280"]],
      ["Nat Geo", "Mega Structures", "English", ["#f2c94c", "#232526"]],
      ["Animal Planet", "Wild Rescue", "English"],
      ["Sony BBC Earth", "Ocean Life", "English"],
      ["History TV18", "Ancient Secrets", "Hindi", ["#3e5151", "#decba4"]],
      ["TLC", "Food Trails", "English"],
      ["DD Kisan", "Krishi Darshan", "Hindi", ["#56ab2f", "#a8e063"]],
    ] },
  ];
  const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi",
    "Gujarati", "Punjabi", "Odia", "Assamese", "Urdu", "Bhojpuri", "Nepali"];
  const OTT = [["Play+ Originals", ["#ff3fd0", "#9b5cff"]], ["CineBox", ["#e53935", "#7b1010"]], ["KidsFlix", ["#11998e", "#38ef7d"]],
    ["Bhakti Plus", ["#ff8008", "#ffc837"]], ["NewsNow", ["#1a2980", "#26d0ce"]], ["MusicMax", ["#8e2de2", "#4a00e0"]]];

  // Programme time slots generated around the current time so the guide always looks "live"
  const fmt = (d) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  // Start/end of the programme on air now on channel i (shared by the Home cards and the TV Guide)
  function slotTimes(i) {
    const now = new Date();
    const start = new Date(now);
    start.setSeconds(0, 0);
    start.setMinutes(Math.floor(now.getMinutes() / 15) * 15 - (i % 3) * 15);
    const end = new Date(start.getTime() + [30, 60, 45, 90][i % 4] * 60000);
    return { start, end };
  }
  function slot(i) {
    const now = new Date();
    const { start, end } = slotTimes(i);
    const pct = Math.min(95, Math.max(5, Math.round(((now - start) / (end - start)) * 100)));
    return { time: `${fmt(start)} - ${fmt(end)}`, pct };
  }
  // Flat channel list with ids
  const CH_PAL = [["#2b5876", "#4e4376"], ["#ff512f", "#dd2476"], ["#1d976c", "#2c3e50"], ["#c94b4b", "#4b134f"], ["#0f0c29", "#302b63"],
    ["#ee9ca7", "#7b4397"], ["#f46b45", "#7a1f1f"], ["#134e5e", "#2f80ed"], ["#3c1053", "#ad5389"], ["#16a085", "#1a2980"]];
  // TVE (TV Everywhere) channels: stream in the app for every Cable TV subscriber, on top of the free-to-all (FTA) ones
  const TVE = new Set(["Star Sports 1", "Star Sports 1 Hindi", "Star Sports 2", "Star Sports 3", "Star Sports Select 1", "Sony Ten 1", "Sony Ten 2",
    "Sony Ten 3", "Sony Sports Bangla", "Sports18", "Star Plus", "Star Bharat", "Star Jalsha", "Star Maa", "Zee TV", "&TV", "Zee Bangla",
    "Colors", "Colors Bangla", "Sony TV", "Sony SAB", "Sun TV", "Star Gold", "Star Movies", "Zee Cinema", "Zee Bangla Cinema", "&pictures",
    "Sony Max", "Sony Pix", "Colors Cineplex", "Jalsha Movies", "R. Bharat", "Aaj Tak", "NDTV India", "Zee News", "ABP Ananda", "India Today",
    "Times Now", "Pogo", "Cartoon Network", "Sony Yay", "Discovery Kids", "9XM", "MTV Beats", "Sangeet Bangla", "Discovery", "Nat Geo", "Sony BBC Earth"]);
  // HD feeds (linear Cable TV only, not TVE): added right after their SD channel, so DD channels stay last
  const HD_OF = new Set(["Star Sports 1", "Star Sports 2", "Star Sports Select 1", "Sony Ten 1", "Sony Ten 2", "Sony Ten 3", "Sports18",
    "Star Plus", "Star Jalsha", "Star Maa", "Zee TV", "Zee Bangla", "Colors", "Sony TV", "Sony SAB", "Star Gold", "Star Movies",
    "Zee Cinema", "&pictures", "Sony Max", "Sony Pix", "Colors Cineplex", "Movies Now", "Discovery", "Nat Geo", "Animal Planet", "Sony BBC Earth"]);
  GENRES.forEach((g) => { g.items = g.items.flatMap((it) => (HD_OF.has(it[0]) ? [it, [it[0] + " HD", it[1], it[2], it[3]]] : [it])); });
  const CHANNELS = [];
  GENRES.forEach((g) => g.items.forEach(([name, show, lang, colors]) => {
    const id = CHANNELS.length;
    CHANNELS.push({ id, name, show, lang, colors: colors || CH_PAL[id % CH_PAL.length], genre: g.key, tve: TVE.has(name), hd: / HD$/.test(name) });
  }));
  const isDD = (c) => c.name.startsWith("DD ");
  const chByName = (names) => names.map((n) => CHANNELS.find((c) => c.name === n)).filter(Boolean);

  /* ---------- Channel plans for customers & guests ----------
     Guest: Welcome Free Plan only (DD + a few free-to-air). Cable / Broadband customer: starts with a package.
     Everyone can upgrade (payment gateway) → more genres. Only channels in the plan are shown. LCO Watch OTT sees all. */
  const FREE_CH = new Set(CHANNELS.filter((c) => c.name.startsWith("DD ") || ["Aastha", "Sanskar", "SVBC"].includes(c.name)).map((c) => c.id));
  const PACK_GENRES = [   // index-matched to CABLE_PACKS (same names / prices as the LCO side)
    ["entertainment", "news"],
    ["entertainment", "news", "music", "devotional"],
    ["entertainment", "news", "music", "devotional", "movies", "kids"],
    ["entertainment", "news", "music", "devotional", "movies", "kids", "sports"],
    ["entertainment", "news", "music", "devotional", "movies", "kids", "sports", "infotainment"],
    ["entertainment", "news", "music", "devotional", "movies", "kids", "sports", "infotainment"],
  ];
  const DEFAULT_PACK = { cable: 3, broadband: 1 };   // Cable TV: SITI Sports Plus HD (SD + HD, sports); Broadband: SITI Bangla Value   // the package a customer already has
  const PLAN_KEY = "spm.channelPlans";              // { "type:mobile": {pack, at} } — survives reloads
  const Plans = {
    all() { try { return JSON.parse(localStorage.getItem(PLAN_KEY) || "{}"); } catch (e) { return Plans.mem || (Plans.mem = {}); } },
    save(o) { try { localStorage.setItem(PLAN_KEY, JSON.stringify(o)); } catch (e) { Plans.mem = o; } },
    key() { const s = state.session || {}; return `${s.type}:${s.mobile}`; },
    // Current plan of the signed-in customer / guest: { pack: index | null, at }
    get() {
      const s = state.session || {};
      const p = Plans.all()[Plans.key()];
      if (p) return p;
      return { pack: s.type in DEFAULT_PACK ? DEFAULT_PACK[s.type] : null, at: null };
    },
    set(pack) { const o = Plans.all(); o[Plans.key()] = { pack, at: Date.now() }; Plans.save(o); },
  };
  // SITI Packages purchases (separate from the package a customer already has): nothing until the viewer buys a
  // package from ☰ → SITI Packages. { "type:mobile": {pack, at} }
  const SITI_KEY = "spm.sitiPlans";
  const Siti = {
    all() { try { return JSON.parse(localStorage.getItem(SITI_KEY) || "{}"); } catch (e) { return Siti.mem || (Siti.mem = {}); } },
    get() { const p = Siti.all()[Plans.key()]; return p ? p.pack : null; },   // null = no SITI package yet
    set(pack) { const o = Siti.all(); o[Plans.key()] = { pack, at: Date.now() }; try { localStorage.setItem(SITI_KEY, JSON.stringify(o)); } catch (e) { Siti.mem = o; } },
  };
  // null = no restriction (LCO Watch OTT / not signed in as customer or guest)
  // linear = the Cable TV package only (LTS). Otherwise Cable TV customers can also play every TVE channel in the app.
  function allowedCh(linear = false) {
    const t = (state.session || {}).type;
    if (t !== "guest" && t !== "cable" && t !== "broadband") return null;
    const p = Plans.get(), g = p.pack === null ? [] : PACK_GENRES[p.pack];
    const tve = t === "cable" && !linear;
    const sdOnly = p.pack !== null && !CABLE_PACKS[p.pack].hd;   // e.g. SITI Basic SD: no HD feeds
    return new Set(CHANNELS.filter((c) => FREE_CH.has(c.id) || (g.includes(c.genre) && !(sdOnly && c.hd)) || (tve && c.tve)).map((c) => c.id));
  }
  const canWatch = (c) => { const a = allowedCh(); return !a || a.has(c.id); };
  const myChannels = () => CHANNELS.filter(canWatch);
  // Cable TV viewers (customer with Cable TV, or LCO with Cable TV → Watch OTT) get LTS and the VC number / address card
  const hasCableTv = () => { const s = state.session || {}; return s.type === "cable" || (s.type === "lco" && s.service !== "broadband"); };
  // LTS: the linear channels of the Cable TV package (Cable LCO: all channels)
  const linearChannels = () => { const a = allowedCh(true); return CHANNELS.filter((c) => !a || a.has(c.id)); };
  // Live TV Home: Cable TV users see free-to-all (FTA) + TVE channels; everyone else sees what their plan allows
  // Broadband / Other Users: their package channels (unlocked) + every TVE channel (shown locked → upgrade)
  // Rail order. Other Users (guest): free channels (DD included) before the locked ones.
  // Everyone else: DD always last, then unlocked before locked.
  const chSort = (a, b) => ((state.session || {}).type === "guest"
    ? canWatch(b) - canWatch(a) || isDD(a) - isDD(b)
    : isDD(a) - isDD(b) || canWatch(b) - canWatch(a));
  const homeCh = (c) => (hasCableTv() ? FREE_CH.has(c.id) || c.tve : canWatch(c) || c.tve);

  const grad = (g, deg = 135) => `linear-gradient(${deg}deg, ${g.join(", ")})`;

  /* ---------- Registered users (Cable TV & Broadband) ----------
     Front-end only: kept in this browser's localStorage so a mobile number
     registered once (with VSC / User ID) can log in again with mobile only,
     also after reload. Stored per user type. Falls back to memory if storage is blocked. */
  const Registry = (() => {
    const KEY = "spm.registeredUsers";
    let mem = {};
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return mem; } };
    const save = (o) => { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* memory only */ } };
    // Pre-registered demo number 9000000000 in every customer section (Cable TV, Broadband, Other Users)
    const SEED = {
      broadband: { [DEMO_MOBILE]: { id: "SITIDEMO01", at: 0 } },
      cable: { [DEMO_MOBILE]: { id: "12345678", at: 0 } },
      guest: { [DEMO_MOBILE]: { id: "", at: 0 } },
    };
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
    // genres / langs: multi-select chip filters, used only by the LCO "Watch OTT" TV (null = all)
    filter: { genre: null, lang: null, q: "", genres: null, langs: null },
    bbSel: null,            // Broadband LCO → Customer: id selected with ⚙ (shows Recharge / Invoice bar)
    bbNew: null,           // Broadband LCO: id of a just-created customer (highlighted once in the list)
    ottSel: null,          // LCO → OTT Customer: id of the selected card (shows Recharge / Invoice bar)
    recent: null,          // ids of recently watched channels
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
    $('[data-act="menu"]', root).classList.toggle("dot", !!(f.genre || f.lang || f.q || f.genres || f.langs));
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
    syncMini();
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

  /* Neon heartbeat + wave line, echoing the line through the SITI logo */
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
        <img class="logo" src="${LOGO}" alt="SITI PLAYTOP MAGIC – All-in-one hub" />
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
      const canSign = once || !!cfg.track;          // customer types: login (registered numbers only) / sign up
      let reg = canSign ? signup : false;           // current mode: false = login, true = sign up
      const later = !!cfg.extraAfterOtp;              // Cable TV: VSC is asked on its own screen after the OTP
      const needEx = () => !!ex && !later && (!once || reg);
      const root = el(`
        <section class="screen-auth" data-screen="login-${type}">
          <div class="auth">
            ${heroHTML(true)}
            <p class="sub" id="subTxt"></p>
            <div class="row-between">
              <span class="role-label">${cfg.label}${service ? `<small class="svc-tag">${USER_TYPES[service].title}</small>` : ""}</span>
              <button class="link" data-act="change">Change Selection</button>
            </div>
            ${ex && !later ? `
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
                <input id="lOtp" class="otp-in" type="text" inputmode="numeric" maxlength="4" autocomplete="one-time-code" placeholder="Enter 4-digit OTP" aria-label="OTP" />
              </label>
              <p class="hint" id="lOtpHint"></p>
              <div class="otp-links">
                <button class="link" id="lOtpEdit">Change number</button>
                <button class="link" id="lOtpResend" disabled></button>
              </div>
            </div>` : ""}
            <button class="btn dim" id="submit"><span class="lbl"></span>${ARROW}</button>
            ${canSign ? `<button class="link mode-switch" id="modeSwitch"></button>` : ""}
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
        if (canSign) reg = r;
        const isReg = canSign ? reg : signup;
        $("#subTxt", root).textContent = canSign && isReg ? cfg.subReg : cfg.sub;
        $(".lbl", btn).textContent = isReg ? (cfg.btnReg || "Register") : cfg.btn;
        if (xWrap) {
          xWrap.hidden = !needEx();
          if (animate && !xWrap.hidden) { xWrap.classList.remove("reveal"); void xWrap.offsetWidth; xWrap.classList.add("reveal"); }
        }
        if (sw) { sw.textContent = reg ? "Already registered? Login with mobile number" : "New user? Sign up"; sw.classList.remove("glow"); }
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
          hint.textContent = known ? "✓ Registered user – login with your mobile number" : reg ? "✓ New number – you'll be registered as an other user" : "✓ Valid mobile number";
          hint.className = "hint ok";
          $(".lbl", btn).textContent = known ? "Login" : reg ? cfg.btnReg : cfg.btn;
          return;
        }
        else if (once && !reg) { hint.textContent = "✓ Valid mobile number"; hint.className = "hint ok"; }
        else { hint.textContent = "✓ Valid mobile number"; hint.className = "hint ok"; }
      }

      if (xin) xin.addEventListener("input", () => {
        xin.value = ex.clean(xin.value);
        xField.classList.remove("invalid");
        if (!xin.value) { xHint.textContent = ex.hint; xHint.className = "hint"; }
        else if (ex.valid(xin.value)) { xHint.textContent = `✓ Valid ${ex.label}`; xHint.className = "hint ok"; }
        else { xHint.textContent = cfg.extra === "vsc" ? `${xin.value.length} digits entered` : ex.hint; xHint.className = "hint"; }
        btn.classList.toggle("dim", !valid());
      });
      if (xin) xin.addEventListener("keydown", (e) => { if (e.key === "Enter") mob.focus(); });

      mob.addEventListener("input", () => {
        mob.value = mob.value.replace(/\D/g, "").slice(0, 10);
        field.classList.remove("invalid");
        if (sw) sw.classList.remove("glow");
        updateMobHint();
        btn.classList.toggle("dim", !valid());
      });
      mob.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
      if (sw) sw.addEventListener("click", () => {
        if (cfg.otpRegister && !reg) return toOtpRegister();   // Broadband sign up = User ID + OTP screen
        setMode(!reg, true); (reg && xin ? xin : mob).focus();
      });
      // Login with a number that is not registered: stay here, say so and make "Sign up" glow
      function notRegistered() {
        shake(field);
        hint.textContent = "Not a registered customer. Sign up first.";
        hint.className = "hint err";
        toast("Not a registered customer. Sign up first.", "error", 3200);
        if (sw) { sw.classList.remove("glow"); void sw.offsetWidth; sw.classList.add("glow"); }
        mob.focus();
      }

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
      function startLoginOtp(isNew = false) {
        otpStep = true;
        mob.readOnly = true;
        if (xin) xin.readOnly = true;
        if (sw) sw.hidden = true;
        $("#subTxt", root).textContent = cfg.otpSubLogin;
        lOtpWrap.hidden = false;
        lOtpWrap.classList.remove("reveal"); void lOtpWrap.offsetWidth; lOtpWrap.classList.add("reveal");
        $(".lbl", btn).textContent = isNew ? (later ? "Verify & Continue" : "Verify & Register") : "Verify & Login";
        btn.classList.add("dim");
        sendLoginOtp();
        lOtp.focus();
      }
      function endLoginOtp() {
        otpStep = false;
        clearInterval(otpTimer);
        lOtpWrap.hidden = true;
        mob.readOnly = false;
        if (xin) xin.readOnly = false;
        if (sw) sw.hidden = false;
        setMode(reg, false);
        mob.focus();
      }
      if (lOtp) {
        lOtp.addEventListener("input", () => {
          lOtp.value = lOtp.value.replace(/\D/g, "").slice(0, OTP_LEN);
          lOtpField.classList.remove("invalid");
          btn.classList.toggle("dim", lOtp.value.length !== OTP_LEN);
          if (lOtp.value.length === OTP_LEN) btn.click();   // auto-verify once all digits are in
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
            lOtpHint.textContent = lOtp.value.length < OTP_LEN ? "Enter the 4-digit OTP" : "Incorrect OTP – please try again";
            lOtpHint.className = "hint err";
            if (lOtp.value.length === OTP_LEN) toast("Incorrect OTP", "error");
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
        let pendingReg = null;     // Cable first-time registration: VSC to save once the OTP is verified

        if (cfg.track && !reg && !Registry.get(type, mob.value)) return notRegistered();
        if (once) {
          const known = Registry.get(type, mob.value);
          if (!reg && !known) return notRegistered();   // login is for registered numbers only
          if (reg && known) {
            // Already registered → just log in, keep the original VSC / User ID
            toast("This number is already registered – logged in with mobile", "info", 3000);
            registered = false;
            extraVal = known.id;
          } else if (reg) {
            if (!later) pendingReg = xin.value;   // saved only after the OTP is verified
            registered = true;
          } else {
            registered = false;
            extraVal = known.id;
          }
        }

        // OTP before signing in: every time for Cable / Broadband / Guest (otpAlways); otherwise only for logins
        if (cfg.otpLogin && (cfg.otpAlways || !registered) && !otpOk) {
          const isNew = registered || (cfg.track && !Registry.get(type, mob.value));
          startLoginOtp(isNew);
          return;
        }
        clearInterval(otpTimer);
        // Cable TV sign up: mobile verified → next screen asks for the VSC number
        if (later && registered) { toast("Mobile number verified (demo)", "success"); return go("cableVsc", { mobile: mob.value }); }
        if (pendingReg !== null) Registry.add(type, mob.value, pendingReg);

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

    /* ---- Cable TV sign up, step 2: VSC number (after mobile + OTP) ---- */
    cableVsc({ mobile }) {
      const ex = EXTRA.vsc, cfg = LOGIN.cable;
      const root = el(`
        <section class="screen-auth" data-screen="register-cable-vsc">
          <div class="auth">
            ${heroHTML(true)}
            <p class="sub">Almost done! Add the VSC (Virtual Card) number of your set-top box</p>
            <div class="cv-ok">${I.check}<span>Mobile verified · +91 ${esc(mobile.replace(/(\d{5})(\d{5})/, "$1 $2"))}</span></div>
            <div class="row-between">
              <span class="role-label">${cfg.label}</span>
              <button class="link vch-link" data-act="vc-help">What is VSC number?</button>
            </div>
            <label class="field" id="exField">
              ${ex.icon}
              <input id="extra" type="text" inputmode="numeric" maxlength="${ex.maxlength}" autocomplete="off" placeholder="${ex.placeholder}" aria-label="${ex.label}" />
            </label>
            <p class="hint" id="exHint">${ex.hint}</p>
            <button class="btn dim" id="submit"><span class="lbl">Register</span>${ARROW}</button>
          </div>
        </section>`);
      bindCommon(root);
      $('[data-act="vc-help"]', root).addEventListener("click", openVcHelp);
      const xin = $("#extra", root), xHint = $("#exHint", root), xField = $("#exField", root), btn = $("#submit", root);
      xin.addEventListener("input", () => {
        xin.value = ex.clean(xin.value);
        xField.classList.remove("invalid");
        if (!xin.value) { xHint.textContent = ex.hint; xHint.className = "hint"; }
        else if (ex.valid(xin.value)) { xHint.textContent = `✓ Valid ${ex.label}`; xHint.className = "hint ok"; }
        else { xHint.textContent = `${xin.value.length} digits entered`; xHint.className = "hint"; }
        btn.classList.toggle("dim", !ex.valid(xin.value));
      });
      xin.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
      btn.addEventListener("click", async () => {
        if (btn.classList.contains("loading")) return;
        if (!ex.valid(xin.value)) {
          shake(xField);
          xHint.textContent = ex.err; xHint.className = "hint err";
          toast(ex.err, "error");
          return xin.focus();
        }
        xin.blur();
        setLoading(btn, true);
        await wait(1300);
        setLoading(btn, false);
        Registry.add("cable", mobile, xin.value);
        state.session = { type: "cable", mobile, vsc: xin.value };
        openSheet(`
          <div class="ok-badge">${I.checkBig}</div>
          <h3>${cfg.doneReg}</h3>
          <p>${cfg.doneRegMsg}<br/>${ex.short}: ${esc(xin.value)}<br/>Mobile: +91 ${esc(mobile.replace(/(\d{5})(\d{5})/, "$1 $2"))}</p>
          <span class="demo-tag">Demo • No real OTP sent</span>
          <button class="btn" id="toHome">Continue to Home</button>`, (sh) => {
          $("#toHome", sh).addEventListener("click", () => enterHome("cable"));
        });
        toast("Registered successfully (demo)", "success");
      });
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
            </div>
            <button class="btn" id="cont"><span class="lbl">Continue</span>${ARROW}</button>
            <div class="features">
              <div class="feat-row">
                <span class="feat">${I.tv}<b>Live TV</b></span>
                <span class="feat">${I.monitor}<b>OTT Apps</b></span>
                <span class="feat">${I.wifi}<b>Broadband</b></span>
              </div>
              <p class="feat-cap">Everything you watch — all in one hub</p>
              <p class="terms">By continuing you agree to SITI PLAYTOP MAGIC's <button class="tlink" data-toast="Terms of Service (demo)">Terms</button> &amp; <button class="tlink" data-toast="Privacy Policy (demo)">Privacy Policy</button></p>
            </div>
          </div>
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      bindCommon(root);
      bindChoices(root, (k) => (state.role = k));
      $("#cont", root).addEventListener("click", () => {
        // Customer → Broadband / Cable TV / Other Users; LCO → Broadband / Cable TV
        go("service");
      });
      return root;
    },

    /* ---- Broadband / Cable TV / Guest ---- */
    service() {
      if (state.role === "lco" && state.service === "guest") state.service = "cable";   // Other Users is a customer option only
      const root = el(`
        <section data-screen="service">
          <div class="auth">
            ${heroHTML(true)}
            <p class="sub">Log in / Register</p>
            <button class="link right" data-act="change">Change user type</button>
            <div class="choices" role="radiogroup" aria-label="Connection type">
              ${choiceHTML("broadband", state.service === "broadband")}
              ${choiceHTML("cable", state.service === "cable")}
              ${state.role === "lco" ? "" : choiceHTML("guest", state.service === "guest")}
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

    /* ---- LCO dashboard (layout from the LCO app screenshot, in SITI colours) ---- */
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
              <button class="lco-pill" data-act="switch-partner">Switch Partner</button>
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
              <button class="lco-pill" data-act="switch-partner">Switch Partner</button>
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
       broadband LCO app screenshot, in SITI colours. Bottom bar: Home / Case / Customer / ☰ menu
       ===================================================================== */
    bbDash() {
      const sess = state.session || {};
      const P = BB_DATA.partner, C = P.counts;
      // Complaints ring: Open / Work in progress / Completed (tap a status to show its count, tap the ring to open that list)
      const CMP = [["open", "Open"], ["wip", "WIP"], ["done", "Completed"]];
      const cmpCount = (k) => BB_DATA.cases.filter((c) => c.status === k).length;
      let cst = "open";
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
              <button class="lco-pill" data-act="switch-partner">Switch Partner</button>
            </div>
            <button class="lco-search bb-search" data-go="search">${I.search}<span>Search 'Username'</span></button>
            <div class="bb-stats">
              ${[["active", "Active", C.active], ["inactive", "Inactive", C.inactive], ["online", "Online", C.online], ["expired", "Expired", C.expired]]
                .map(([k, l, n]) => `<button class="lco-stat" data-view="${k}"><b>${n}</b><span>${l}</span></button>`).join("")}
            </div>
            <div class="bb-mid">
              <div class="bb-exp bb-cmp">
                <small>Complaints</small>
                <button class="bb-ring" data-go="cmp" aria-label="Open the selected complaints"><b id="cmpN"></b><i id="cmpL"></i></button>
                <div class="bb-cseg" role="radiogroup" aria-label="Complaint status">
                  ${CMP.map(([k, l]) => `<button role="radio" data-cst="${k}" class="${k === cst ? "on" : ""}" aria-checked="${k === cst}">${l}</button>`).join("")}
                </div>
              </div>
              <div class="bb-exp">
                <small>Expiring soon</small>
                <button class="bb-ring" data-go="renewal" aria-label="Customers expiring soon"><b id="expN"></b></button>
                <div class="bb-seg" role="radiogroup" aria-label="Expiring within">
                  ${Object.keys(RANGES).map((k) => `<button role="radio" data-range="${k}" class="${k === range ? "on" : ""}" aria-checked="${k === range}">${k[0].toUpperCase() + k.slice(1)}</button>`).join("")}
                </div>
              </div>
            </div>
            <div class="bb-tiles">
              <button class="bb-tile t1" data-go="topup"><span class="bb-tic">${I.wallet}</span><b>Top Up</b><small>Wallet ₹ ${P.wallet}</small></button>
              <button class="bb-tile t2" data-toast="Collect Payment (demo)"><span class="bb-tic">${I.rupee}</span><b>Payment</b><small>Collect from customers</small></button>
              <button class="bb-tile t3" data-go="commission"><span class="bb-tic">${I.card}</span><b>OTT Commission</b><small>Your earnings</small></button>
              <button class="bb-tile t4" data-toast="Report (demo)"><span class="bb-tic">${I.chart}</span><b>Report</b><small>Business summary</small></button>
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
      const drawCmp = () => { $("#cmpN", root).textContent = cmpCount(cst); $("#cmpL", root).textContent = { open: "Open", wip: "In Progress", done: "Completed" }[cst]; };
      $$("[data-cst]", root).forEach((b) => b.addEventListener("click", () => {
        cst = b.dataset.cst;
        $$("[data-cst]", root).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); });
        drawCmp();
      }));
      drawCmp();
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $$("[data-view]", root).forEach((b) => b.addEventListener("click", () => go("bbCustomers", { view: b.dataset.view })));
      $$("[data-go]", root).forEach((b) => b.addEventListener("click", () => {
        const g = b.dataset.go;
        if (g === "topup") go("lcoTopUp", { wallet: "bb" });
        else if (g === "search") go("bbCustomers", { focus: true });
        else if (g === "cmp") go("bbCases", { tab: cst === "wip" ? "wip" : cst === "done" ? "completed" : "all", status: cst === "open" ? "open" : "" });
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
    bbCases({ tab = "wip", status = "" } = {}) {
      let mine = false;
      if (tab === "assigned") tab = "wip";
      const TABS = [["wip", "Work in Progress"], ["unassigned", "Unassigned"], ["completed", "Completed"], ["all", "All"]];
      const root = el(`
        <section class="screen-fixed tv lco bb" data-screen="bb-cases">
          <div class="tv-scroll">
            <header class="sub-head"><h2>Case Management</h2></header>
            <div class="lco-tabs" role="tablist">
              ${TABS.map(([k, l]) => `<button role="tab" data-tab="${k}" class="${k === tab ? "on" : ""}" aria-selected="${k === tab}">${l}</button>`).join("")}
            </div>
            <div class="bb-casebar">
              <label class="bb-check"><input type="checkbox" id="mine" /><span>My Case</span></label>
              <button class="fchip bb-stchip" id="stChip" ${status ? "" : "hidden"} aria-label="Remove status filter">Status: ${CASE_STATUS[status] || ""} ✕</button>
              <button class="lco-ic" data-toast="Filter cases (demo)" aria-label="Filter">${I.filter}</button>
            </div>
            <div class="lco-list" id="list"></div>
          </div>
          <div class="bb-dial" id="dial" hidden>
            <button data-dial="case">${I.ticket}<span>New Case</span>${I.chev}</button>
          </div>
          <button class="bb-fab" id="fab" aria-label="More actions" aria-expanded="false">${I.plus}</button>
          ${bbNavHTML("")}
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      const inTab = (c) => (!status || c.status === status) &&
        (tab === "all" || (tab === "wip" ? c.status === "wip" : tab === "unassigned" ? !c.assigned : c.status === "done"));
      $("#stChip", root).addEventListener("click", (e) => { status = ""; e.currentTarget.hidden = true; draw(); });
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
      // FAB → speed dial (New Case)
      const fab = $("#fab", root), dial = $("#dial", root);
      const toggleDial = (open) => { dial.hidden = !open; fab.classList.toggle("open", open); fab.setAttribute("aria-expanded", open); };
      fab.addEventListener("click", () => toggleDial(dial.hidden));
      $('[data-dial="case"]', root).addEventListener("click", () => { toggleDial(false); go("bbNewCase"); });
      bindBbNav(root, "");
      draw();
      return root;
    },

    /* ---- Broadband LCO: Case Creation (bottom bar / Case FAB) → Create Case form ----
       User Name (broadband user id) fills Mobile + Email; Type → Case Reason → Sub Category (when the reason has one) → Remarks → Create */
    bbNewCase() {
      const users = [...BB_DATA.customers].sort((a, b) => a.user.localeCompare(b.user));
      const opt = (a) => a.map((x) => `<option>${esc(x)}</option>`).join("");
      const root = el(`
        <section class="screen-fixed lco bb bbnc" data-screen="bb-new-case">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Create Case</h2>
          </header>
          <div class="tv-scroll">
            <div class="lco-card bbnc-sec">
              <h5>Case Form</h5>
              <label class="lco-fl" id="fUser"><small>User Name *</small>
                <input id="cUser" list="cUsers" maxlength="30" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Broadband user id, e.g. ${esc(users[0].user)}" /></label>
              <datalist id="cUsers">${users.map((c) => `<option value="${esc(c.user)}">${esc(c.name)}</option>`).join("")}</datalist>
              <p class="bbnc-who" id="cWho" hidden></p>
              <label class="lco-fl" id="fMob"><small>Mobile Number</small><input id="cMob" type="tel" inputmode="numeric" maxlength="10" placeholder="Filled from the user name" /></label>
              <label class="lco-fl" id="fMail"><small>Email ID</small><input id="cMail" type="email" maxlength="60" placeholder="Filled from the user name" /></label>
            </div>
            <div class="lco-card bbnc-sec">
              <h5>Select Type</h5>
              <label class="lco-fl" id="fType"><small>Type *</small>
                <select id="cType"><option value="">Select Type</option>${opt(Object.keys(CASE_REASONS))}</select></label>
            </div>
            <div class="lco-card bbnc-sec" id="sRsn" hidden>
              <h5>Select Case Reason</h5>
              <label class="lco-fl" id="fRsn"><small>Reason / Category *</small><select id="cRsn"></select></label>
              <label class="lco-fl" id="fSub" hidden><small>Sub Category (optional)</small><select id="cSub"></select></label>
            </div>
            <div class="lco-card bbnc-sec" id="sRem" hidden>
              <h5>Remarks</h5>
              <label class="lco-fl" id="fRem"><small>Description *</small>
                <textarea id="cRem" rows="4" maxlength="300" placeholder="Describe the issue or request"></textarea></label>
            </div>
            <p class="hint err bbnc-err" id="cErr"></p>
            <button class="btn bbnc-go" id="cGo">Create</button>
          </div>
        </section>`);
      bindCommon(root);
      const V = (id) => $(id, root);
      const findUser = () => { const u = V("#cUser").value.trim().toLowerCase(); return u ? BB_DATA.customers.find((x) => x.user.toLowerCase() === u) : null; };
      V("#cUser").addEventListener("input", () => {   // typed / picked user id → fill their contact details
        const c = findUser(), who = V("#cWho");
        V("#cMob").value = c ? c.mobile : "";
        V("#cMail").value = c ? c.email : "";
        who.hidden = !c;
        if (c) who.innerHTML = `${I.check}${esc(c.title)} ${esc(c.name)} · ${esc(c.plan)}`;
      });
      V("#cType").addEventListener("change", () => {
        const t = V("#cType").value;
        V("#sRsn").hidden = !t;
        V("#cRsn").innerHTML = `<option value="">Select Reason</option>${t ? opt(Object.keys(CASE_REASONS[t])) : ""}`;
        V("#fSub").hidden = true; V("#cSub").innerHTML = "";
        V("#sRem").hidden = true;
      });
      V("#cRsn").addEventListener("change", () => {
        const subs = (CASE_REASONS[V("#cType").value] || {})[V("#cRsn").value] || [];
        V("#fSub").hidden = !subs.length;
        V("#cSub").innerHTML = subs.length ? `<option value="">Select Sub Category</option>${opt(subs)}` : "";
        V("#sRem").hidden = !V("#cRsn").value;   // reason picked → Sub Category (if any) + Remarks
      });
      V("#cMob").addEventListener("input", (e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10); });
      V("#cGo").addEventListener("click", async () => {
        const err = V("#cErr");
        const fail = (box, msg) => { shake(V(box)); err.textContent = msg; toast(msg, "error"); };
        const c = findUser(), mob = V("#cMob").value, mail = V("#cMail").value.trim();
        const type = V("#cType").value, rsn = V("#cRsn").value, sub = V("#cSub").value, rem = V("#cRem").value.trim();
        if (!V("#cUser").value.trim()) return fail("#fUser", "Enter the customer's user name");
        if (!c) return fail("#fUser", "No broadband customer with this user name");
        if (mob && !/^[6-9]\d{9}$/.test(mob)) return fail("#fMob", "Mobile must be 10 digits starting with 6–9");
        if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return fail("#fMail", "Enter a valid email ID");
        if (!type) return fail("#fType", "Select a type");
        if (!rsn) return fail("#fRsn", "Select a case reason / category");
        if (rem.length < 5) return fail("#fRem", "Write a short description (at least 5 characters)");
        err.textContent = "";
        showLoader("Creating case…");
        await wait(700);
        hideLoader();
        const id = "TKT45" + String(Date.now()).slice(-5);
        BB_DATA.cases.unshift({ id, cust: c.name, user: c.user, cat: sub ? `${rsn} · ${sub}` : rsn, status: "open", assigned: false, mine: false, to: "",
          at: new Date(), type, reason: rsn, sub, remarks: rem, mobile: mob, email: mail });
        if (stack.length > 1 && stack[stack.length - 2].name === "bbCases") stack[stack.length - 2].params = { tab: "unassigned" };   // show it on return
        toast(`Case ${id} created (demo)`, "success");
        back();
      });
      return root;
    },

    /* ---- Broadband LCO: ☰ menu → Settings → Profile → "Customer details" (account actions) ---- */
    bbAccount() {
      const u = tvUser();
      const A = BB_ACCOUNT;
      if (!A.mobile) Object.assign(A, { mobile: DEMO_MOBILE, email: BB_DATA.partner.email });
      const G = [
        ["Password", [["selfcare", I.key, "Reset Selfcare"], ["access", I.key, "Reset Access"], ["number", I.phone, "Change Number"], ["email", I.mail, "Change EmailId"], ["location", I.pin, "Update Location"]]],
        ["Payment/Purchase", [["purchase", I.card, "Purchase"], ["payment", I.rupee, "Add Payment"], ["vas", I.bolt, "Add VasPlan"]]],
        ["Others", [["mac", I.router, "Mac Reset"], ["docs", I.news, "Document"], ["item", I.plus, "Add Item"], ["device", I.device, "Device Details"]]],
      ];
      const root = el(`
        <section class="screen-fixed lco bb bbacc" data-screen="bb-account">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Customer details</h2>
          </header>
          <div class="tv-scroll">
            <div class="bbacc-top">
              <span class="tvpf-av">${esc(u.name[0])}</span>
              <b>${esc(u.name)}</b>
              <small class="ctv-online"><i></i>Online</small>
              <span class="bbacc-id">${esc(u.id)}</span>
              <small class="bbacc-c" id="accC">${A.mobile} · ${esc(A.email)}</small>
            </div>
            ${G.map(([h, items]) => `
              <div class="lco-card bbacc-sec">
                <h5>${h}</h5>
                <div class="bbacc-grid">${items.map(([k, ic, l]) => `<button class="bb-mi" data-a="${k}"><span class="bb-mic">${ic}</span><span>${l}</span></button>`).join("")}</div>
              </div>`).join("")}
            <span class="demo-tag bbacc-tag">Demo • actions are simulated</span>
          </div>
        </section>`);
      bindCommon(root);
      const sync = () => { $("#accC", root).textContent = `${A.mobile} · ${A.email}`; };
      const busy = async (msg, done) => { showLoader(msg); await wait(800); hideLoader(); toast(done, "success"); };
      const confirm = (title, rows, okLabel, run) => openSheet(`
        <h3>${title}</h3>
        <div class="lco-inv">${rows.map(([k, v]) => `<span><small>${k}</small><b>${esc(v)}</b></span>`).join("")}</div>
        <div class="lco-btn2"><button class="btn ghost" id="acX">Cancel</button><button class="btn" id="acOk">${okLabel}</button></div>
        <span class="demo-tag">Demo</span>`, (sh) => {
        $("#acX", sh).addEventListener("click", closeSheet);
        $("#acOk", sh).addEventListener("click", () => { closeSheet(); run(); });
      });
      const ACT = {
        selfcare: () => confirm("Reset Selfcare", [["User", u.id], ["Send new password to", maskMobile(A.mobile)]], "Reset", () => busy("Resetting…", "Selfcare password reset and sent by SMS (demo)")),
        access: () => confirm("Reset Access", [["User", u.id], ["Send new password to", maskMobile(A.mobile)]], "Reset", () => busy("Resetting…", "Access (PPPoE) password reset (demo)")),
        number: () => editSheet("Change Number", A.mobile, { type: "tel", max: 10, check: (v) => /^[6-9]\d{9}$/.test(v), err: "Enter a 10-digit mobile number starting with 6–9" },
          (v) => { A.mobile = v; sync(); toast("Mobile number updated (demo)", "success"); }),
        email: () => editSheet("Change EmailId", A.email, { type: "email", max: 60, check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), err: "Enter a valid email ID" },
          (v) => { A.email = v; sync(); toast("Email ID updated (demo)", "success"); }),
        location: () => editSheet("Update Location", A.location || "", { max: 80, check: (v) => v.length >= 5, err: "Enter at least 5 characters" },
          (v) => { A.location = v; toast("Location updated (demo)", "success"); }),
        purchase: () => pickSheet("Purchase Plan", BB_PLANS.map((p) => `${p.name} — ₹ ${p.price}`), "", (v) => {
          const p = BB_PLANS.find((x) => v.startsWith(x.name + " "));
          confirm("Confirm Purchase", [["Plan", p.name], ["Speed / Validity", `${p.speed} · ${p.days} days`], ["Amount", `₹ ${p.price}`]], `Pay ₹ ${p.price}`,
            () => busy("Processing payment…", `${p.name} purchased (demo)`));
        }),
        payment: () => editSheet("Add Payment (₹)", "", { type: "number", max: 6, check: (v) => +v >= 1 && +v <= 50000, err: "Enter an amount between ₹1 and ₹50,000" },
          (v) => busy("Recording payment…", `Payment of ₹ ${money(v)} added (demo)`)),
        vas: () => pickSheet("Add VasPlan", CTV.vas[30].map(([n, pr]) => `${n} — ₹ ${pr}`), "", (v) => busy("Adding VAS…", `${v.split(" —")[0]} added for 30 days (demo)`)),
        mac: () => confirm("Mac Reset", [["User", u.id], ["Current MAC", "Not bound"]], "Reset MAC", () => busy("Resetting MAC…", "MAC reset. Reconnect the router (demo)")),
        docs: () => openSheet(`
          <h3>Documents</h3>
          <div class="lco-inv">${CTV.docs.map((d) => `<span><small>${esc(d.type)}</small><b>${d.at ? "Uploaded " + dmy(d.at) : "Verified"}</b></span>`).join("")}</div>
          <span class="demo-tag">Demo documents</span>
          <button class="btn ghost" id="dcX">Close</button>`, (sh) => $("#dcX", sh).addEventListener("click", closeSheet)),
        item: () => pickSheet("Add Item", ["Wi-Fi Router (dual band)", "ONT device", "LAN cable (10 m)", "Power adapter"], "", (v) => busy("Adding item…", `${v} added to the account (demo)`)),
        device: () => openSheet(`
          <h3>Device Details</h3>
          <div class="lco-inv">
            <span><small>Device</small><b>ONT · SITI-ONT-200 (demo)</b></span>
            <span><small>Serial No</small><b>VBONT${String(A.mobile).slice(-6)}</b></span>
            <span><small>MAC</small><b>Not bound</b></span>
            <span><small>Status</small><b>Online</b></span>
          </div>
          <span class="demo-tag">Demo device</span>
          <button class="btn ghost" id="dvX">Close</button>`, (sh) => $("#dvX", sh).addEventListener("click", closeSheet)),
      };
      $$("[data-a]", root).forEach((b) => b.addEventListener("click", () => ACT[b.dataset.a]()));
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
          ${bbNavHTML("")}
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
      bindBbNav(root, "");
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
      // [handler, icon, label]; package actions only for active subscribers
      // Icons as mapped by the user (screenshot 69)
      const acts = [
        ["detail", "person", "Subscriber Detail"], ["instant", "rupeeBolt", "Instant Recharge"],
        ["repair", "chain", "Repairing Request"], ["reconfirm", "sync", "Reconfirmation Package"],
        ...(s.active ? [["add", "rupee", "Recharge - add package"], ["change", "upDown", "Upgrade/Downgrade"],
          ["pkgoff", "userSlash", "Package deactivation"], ["alloff", "minus", "All Package deactivation"]] : []),
        ["stb", "swap", "STB replacement"], ["vc", "doc", "VC replacement"],
        ["complaint", "headset", "Complaint management"],
      ];
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
          <div class="lco-acts2">
            ${acts.map(([k, ic, l]) => `<button class="lco-act" data-sa="${k}">${ACT_IC[ic]}<span>${l.replace("/", "/<wbr>")}</span></button>`).join("")}
          </div>
        </section>`);
      bindCommon(root);
      const redraw = () => swapRoute("lcoSub", { kind, i });
      const done = async (msg, apply) => { closeSheet(); showLoader("Processing…"); await wait(900); hideLoader(); if (apply) apply(); toast(msg, "success"); if (apply) redraw(); };
      const confirm = (title, text, btn, msg, apply) => openSheet(`
        <h3>${title}</h3><p>${text}</p>
        <button class="btn" id="saOk">${btn}</button><button class="btn ghost" id="saNo">Cancel</button>
        <span class="demo-tag">Demo • No real change is made</span>`, (sh) => {
        $("#saNo", sh).addEventListener("click", closeSheet);
        $("#saOk", sh).addEventListener("click", () => done(msg, apply));
      });
      const replace = (what, cur, re, hint, key) => openSheet(`
        <h3>${what} Replacement</h3>
        <div class="lco-inv"><span><small>Current ${what} No</small><b>${esc(cur)}</b></span></div>
        <div class="lco-form"><label class="lco-fl" id="rpW"><small>New ${what} No *</small><input id="rpIn" maxlength="20" autocomplete="off" placeholder="${hint}" /></label>
          <label class="lco-fl"><small>Reason</small><select id="rpWhy"><option>Faulty</option><option>Damaged</option><option>Lost</option><option>Upgrade</option></select></label>
          <p class="hint err" id="rpErr"></p></div>
        <button class="btn" id="rpOk">Replace ${what}</button><button class="btn ghost" id="rpNo">Cancel</button>
        <span class="demo-tag">Demo • No real change is made</span>`, (sh) => {
        $("#rpNo", sh).addEventListener("click", closeSheet);
        $("#rpOk", sh).addEventListener("click", () => {
          const v = $("#rpIn", sh).value.trim().toUpperCase();
          if (!re.test(v)) { $("#rpErr", sh).textContent = `Enter a valid ${what} No (${hint})`; shake($("#rpW", sh)); return; }
          if (v === cur) { $("#rpErr", sh).textContent = `That is the current ${what} No`; shake($("#rpW", sh)); return; }
          done(`${what} replaced (demo)`, () => { s[key] = v; });
        });
      });
      const H = {
        detail: () => go("lcoSubDetail", { kind, i }),
        instant: () => go("lcoInstant", { kind, i }),
        repair: () => toast("Repairing Request (demo)"),
        reconfirm: () => toast("Reconfirmation Package (demo)"),
        add: () => go("lcoUpgrade", { kind, i }),
        change: () => go("lcoUpgrade", { kind, i, mode: "change" }),
        pkgoff: () => confirm("Package deactivation", `Deactivate <b>${esc(CABLE_PACKS[s.pack].name)}</b> for ${esc(s.name)}?`, "Deactivate package", "Package deactivated (demo)"),
        alloff: () => confirm("All Package deactivation", `Deactivate <b>all packages</b> for ${esc(s.name)} (VC ${s.vc})? The STB will show as Deactive.`, "Deactivate all", "All packages deactivated (demo)", () => { s.active = false; }),
        stb: () => replace("STB", s.stb, /^[A-Z0-9]{10,20}$/, "10–20 letters / digits", "stb"),
        vc: () => replace("VC", s.vc, /^\d{11}$/, "11 digits", "vc"),
        complaint: () => openSheet(`
          <h3>Complaint management</h3>
          <div class="lco-form">
            <label class="lco-fl"><small>Complaint Type *</small><select id="cpT"><option>No Signal</option><option>Channel Missing</option><option>STB Not Working</option><option>Remote Issue</option><option>Billing</option><option>Other</option></select></label>
            <label class="lco-fl" id="cpW"><small>Remarks *</small><input id="cpR" maxlength="200" placeholder="Describe the problem" /></label>
            <p class="hint err" id="cpErr"></p></div>
          <button class="btn" id="cpOk">Register Complaint</button><button class="btn ghost" id="cpNo">Cancel</button>
          <span class="demo-tag">Demo • No real complaint is raised</span>`, (sh) => {
          $("#cpNo", sh).addEventListener("click", closeSheet);
          $("#cpOk", sh).addEventListener("click", () => {
            if ($("#cpR", sh).value.trim().length < 3) { $("#cpErr", sh).textContent = "Write a short remark"; shake($("#cpW", sh)); return; }
            done(`Complaint CMP${String(Date.now()).slice(-6)} registered (demo)`);
          });
        }),
      };
      $$("[data-sa]", root).forEach((b) => b.addEventListener("click", () => H[b.dataset.sa]()));
      return root;
    },

    /* ---- LCO: Active subscriber → Upgrade Package (higher packs only; cost debited from the CATV wallet) ---- */
    lcoUpgrade({ kind = "active", i = 0, mode = "add" }) {
      const s = LCO_DATA[kind][i];
      const P = LCO_DATA.partner;
      const cur = CABLE_PACKS[s.pack];
      const chg = mode === "change";
      const higher = CABLE_PACKS.map((p, k) => ({ ...p, k })).filter((p) => (chg ? p.k !== s.pack : p.k > s.pack));
      const root = el(`
        <section class="tv lco" data-screen="lco-upgrade">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>${chg ? "Upgrade / Downgrade" : "Recharge - Add Package"}</h2>
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
                <div><b>${p.name}</b><small>${p.ch} channels · ${p.hd} HD</small><small>${p.ch >= cur.ch ? "+" : ""}${p.ch - cur.ch} channels vs current</small></div>
                <div class="lco-up-r"><span>₹ ${p.price}<small>/month</small></span><button class="lco-pill" data-up="${p.k}">${!chg ? "Add" : p.k > s.pack ? "Upgrade" : "Downgrade"}</button></div>
              </div>`).join("")
              : `<div class="empty">${I.checkBig}<b>Already on the top package</b><p>${cur.name} is the highest package.</p></div>`}
          </div>
          <p class="more-note">Demo packages and prices • No real change is made</p>
        </section>`);
      bindCommon(root);
      $$("[data-up]", root).forEach((b) => b.addEventListener("click", () => {
        const k = +b.dataset.up;
        const p = CABLE_PACKS[k];
        const down = k < s.pack, diff = down ? 0 : p.price - cur.price;
        openSheet(`
          <h3>Confirm ${down ? "downgrade" : "upgrade"}</h3>
          <p>${esc(s.name)}<br/>${cur.name} → <b>${p.name}</b><br/>${down ? "No charge · the lower package starts now" : `Amount: <b>₹ ${money(diff)}</b> (price difference for this month)<br/>Debited from your CATV wallet (₹ ${P.wallet})`}</p>
          <button class="btn" id="upOk">${down ? "Downgrade" : `${chg ? "Upgrade" : "Add package"} for ₹ ${money(diff)}`}</button>
          <button class="btn ghost" id="upNo">Cancel</button>`, (sh) => {
          $("#upNo", sh).addEventListener("click", closeSheet);
          $("#upOk", sh).addEventListener("click", async () => {
            if (parseFloat(P.wallet) < diff) { closeSheet(); toast("Not enough CATV wallet balance — top up first", "error"); return; }
            closeSheet();
            showLoader(down ? "Changing package…" : "Upgrading package…");
            await wait(1100);
            hideLoader();
            P.wallet = money(parseFloat(P.wallet) - diff);
            s.pack = k;
            openSheet(`
              <div class="ok-badge">${I.checkBig}</div>
              <h3>Package ${down ? "downgraded" : "upgraded"}</h3>
              <p>${esc(s.name)} is now on <b>${p.name}</b>.<br/>${down ? "No charge" : `₹ ${money(diff)} debited`} · CATV wallet: ₹ ${P.wallet}</p>
              <span class="demo-tag">Demo • No real change made</span>
              <button class="btn" id="upDone">Done</button>`, (s2) => {
              $("#upDone", s2).addEventListener("click", () => { closeSheet(); back(); });
            });
            toast(`Package ${down ? "downgraded" : "upgraded"} (demo)`, "success");
          });
        });
      }));
      return root;
    },

    /* ---- LCO: subscriber → Instant Recharge (renew the CURRENT package; cost debited from the CATV wallet) ---- */
    lcoInstant({ kind = "active", i = 0 }) {
      const s = LCO_DATA[kind][i];
      const P = LCO_DATA.partner;
      const cur = CABLE_PACKS[s.pack];
      const MONTHS = [1, 3, 6, 12];
      let months = 1;
      const toDate = (d) => { const [dd, mm, yy] = d.split("-").map(Number); return new Date(yy, mm - 1, dd); };
      const dmyStr = (d) => `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const dueD = toDate(s.due);
      const expired = !s.active || dueD < today;
      const newDue = () => { const d = new Date(Math.max(dueD.getTime(), today.getTime())); d.setMonth(d.getMonth() + months); return d; };
      const amount = () => cur.price * months;
      const root = el(`
        <section class="tv lco" data-screen="lco-instant-recharge">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Instant Recharge</h2>
          </header>
          <div class="lco-card ir-sub">
            <h3>${I.userFill}<span>${esc(s.name)}</span></h3>
            <p><span>VC No</span><b>${s.vc}</b></p>
            <p><span>STB No</span><b>${s.stb}</b></p>
            <p><span>Status</span><b class="${s.active ? "ok" : "off"}">${s.active ? "Active" : "Deactive"}</b></p>
          </div>
          <div class="lco-card ir-pack">
            <span class="ir-cap">Current package</span>
            <b class="ir-name">${cur.name}</b>
            <div class="ir-stats">
              <span><b>${cur.ch}</b><small>Channels</small></span>
              <span><b>${cur.hd}</b><small>HD</small></span>
              <span><b>${cur.ott}</b><small>OTT apps</small></span>
              <span><b>₹ ${cur.price}</b><small>per month</small></span>
            </div>
            <p class="ir-due ${expired ? "off" : ""}">${I.clock}${expired ? `Expired · was valid till ${s.due}` : `Valid till ${s.due}`}</p>
          </div>
          <h4 class="ir-h">Recharge the same package for</h4>
          <div class="ir-months" role="radiogroup" aria-label="Recharge period">
            ${MONTHS.map((m) => `<button class="ir-m${m === months ? " on" : ""}" role="radio" aria-checked="${m === months}" data-m="${m}"><b>${m}</b><small>${m === 1 ? "month" : "months"}</small><i>₹ ${cur.price * m}</i></button>`).join("")}
          </div>
          <div class="lco-card ir-sum">
            <p><span>Package</span><b>${cur.name}</b></p>
            <p><span>Period</span><b id="irPer"></b></p>
            <p><span>New due date</span><b id="irDue"></b></p>
            <p class="ir-tot"><span>Amount</span><b id="irAmt"></b></p>
          </div>
          <div class="lco-bal">${I.wallet}<span>CATV wallet</span><b id="irWal">₹ ${P.wallet}</b></div>
          <button class="btn" id="irPay"><span class="lbl"></span></button>
          <p class="more-note">Demo prices • No real recharge is made</p>
        </section>`);
      bindCommon(root);
      const draw = () => {
        $("#irPer", root).textContent = `${months} ${months === 1 ? "month" : "months"}`;
        $("#irDue", root).textContent = dmyStr(newDue());
        $("#irAmt", root).textContent = `₹ ${money(amount())}`;
        $(".lbl", $("#irPay", root)).textContent = `Recharge ₹ ${money(amount())}`;
        $$(".ir-m", root).forEach((b) => { const on = +b.dataset.m === months; b.classList.toggle("on", on); b.setAttribute("aria-checked", on); });
      };
      $$(".ir-m", root).forEach((b) => b.addEventListener("click", () => { months = +b.dataset.m; draw(); }));
      $("#irPay", root).addEventListener("click", () => {
        const amt = amount(), nd = dmyStr(newDue());
        openSheet(`
          <h3>Confirm recharge</h3>
          <p>${esc(s.name)} · VC ${s.vc}<br/><b>${cur.name}</b> for ${months} ${months === 1 ? "month" : "months"}<br/>New due date: <b>${nd}</b><br/>Amount: <b>₹ ${money(amt)}</b> · debited from your CATV wallet (₹ ${P.wallet})</p>
          <button class="btn" id="irOk">Recharge ₹ ${money(amt)}</button>
          <button class="btn ghost" id="irNo">Cancel</button>`, (sh) => {
          $("#irNo", sh).addEventListener("click", closeSheet);
          $("#irOk", sh).addEventListener("click", async () => {
            if (parseFloat(P.wallet) < amt) { closeSheet(); toast("Not enough CATV wallet balance — top up first", "error"); return; }
            closeSheet();
            showLoader("Recharging…");
            await wait(1100);
            hideLoader();
            P.wallet = money(parseFloat(P.wallet) - amt);
            s.due = nd;
            s.active = true;            // recharging a deactive / expired box turns it back on
            const txn = "RCH" + String(Date.now()).slice(-8);
            openSheet(`
              <div class="ok-badge">${I.checkBig}</div>
              <h3>Recharge successful</h3>
              <div class="lco-inv">
                <span><small>Subscriber</small><b>${esc(s.name)}</b></span>
                <span><small>VC No</small><b>${s.vc}</b></span>
                <span><small>Package</small><b>${cur.name}</b></span>
                <span><small>Period</small><b>${months} ${months === 1 ? "month" : "months"}</b></span>
                <span><small>Valid till</small><b>${nd}</b></span>
                <span><small>Amount</small><b>₹ ${money(amt)}</b></span>
                <span><small>Transaction ID</small><b>${txn}</b></span>
                <span><small>CATV wallet</small><b>₹ ${P.wallet}</b></span>
              </div>
              <span class="demo-tag">Demo • No real recharge made</span>
              <button class="btn" id="irDone">Done</button>`, (s2) => {
              $("#irDone", s2).addEventListener("click", () => { closeSheet(); back(); });
            });
            toast("Recharge successful (demo)", "success");
          });
        });
      });
      draw();
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
      const cable = hasCableTv();   // LTS + no bottom bar: Cable TV customer / Cable TV LCO
      // Bottom bar (Dashboard · BB Recharge · Live TV · Support · Profile): Broadband LCO and Broadband customer only
      const bar = !cable && (fromLco || (state.session || {}).type === "broadband");
      const root = el(`
        <section class="screen-fixed tv${fromLco ? " from-lco" : " tvx"}${bar ? " has-bar" : ""}" data-screen="home">
          <div class="tv-scroll" id="tvScroll">
            <header class="tv-head">
              <!-- ☰ sits at the top-left, before the logo (the drawer slides in from the left) -->
              <button class="menu-btn" data-act="menu" aria-label="Open menu" aria-expanded="false">${I.menu}</button>
              <div class="brand">
                <img src="${MARK}" alt="SITI PLAYTOP MAGIC" />
              </div>
              ${fromLco ? "" : `<button class="menu-btn head-search${f.q ? " on" : ""}" data-act="search" aria-label="Search channels">${I.search}</button>`}
            </header>
            <div class="searchbar" id="searchbar" ${f.q ? "" : "hidden"}>
              ${I.search}
              <input id="q" type="search" placeholder="Search channels or shows" value="${esc(f.q)}" aria-label="Search channels" />
              <button data-act="clear-q" aria-label="Clear search">${I.close}</button>
            </div>
            <div class="filters" id="filters"></div>
            <div id="sections"></div>
          </div>
          ${fromLco ? `<button class="lco-back-pill" data-act="to-lco">${I.back}Go Back to LCO</button>` : ""}${bar ? ctvNavHTML("live") : ""}
          <!-- Left slide-in menu (hamburger). Same buttons/data-act as before, so every option works the same. -->
          <div class="drawer" id="drawer" aria-hidden="true">
            <div class="drawer-backdrop" data-close-menu></div>
            <nav class="drawer-panel" aria-label="Menu">
              <div class="drawer-head">
                <div class="brand">
                  <img src="${MARK}" alt="SITI PLAYTOP MAGIC" />
                </div>
                <button class="drawer-x" data-close-menu aria-label="Close menu">${I.close}</button>
              </div>
              ${fromLco ? "" : `<button class="gp dr-item" data-act="siti">${I.crown}<span>SITI Packages</span></button>`}
              <button class="gp dr-item" data-act="ott">${I.monitor}<span>OTT</span></button>
              ${fromLco ? `<button class="gp dr-item${f.q ? " on" : ""}" data-act="search">${I.search}<span>Search</span></button>` : ""}
              <button class="gp dr-item" data-act="profile">${I.userFill}<span>Profile</span></button>
              <i class="dr-sep"></i>
              ${cable ? `<button class="gp dr-item" data-act="lts">${I.router}<span>ALTD</span></button>` : ""}
              <button class="gp dr-item${f.genre || f.genres ? " on" : ""}" data-act="genre">${I.masks}<span>${genreLabel()}</span></button>
              <button class="gp dr-item${f.lang || f.langs ? " on" : ""}" data-act="lang">${I.lang}<span>${langLabel()}</span></button>
              ${drawerExtrasHTML()}
              <p class="dr-ver">Version ${APP_VERSION}</p>
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

      if (!fromLco) $('[data-act="siti"]', root).addEventListener("click", () => go("chPlans", { siti: true }));
      // ☰ → FAQ + Partner apps tiles (bottom of the menu)
      bindDrawerExtras(root);
      // ☰ → OTT: the OTT page — customers, Other Users and LCO Watch OTT alike
      $('[data-act="ott"]', root).addEventListener("click", () => go("ottHome"));
      // ☰ → LTS (Cable TV only): every channel in the Cable TV package as square logo tiles
      if (cable) $('[data-act="lts"]', root).addEventListener("click", () => go("ltsHome"));
      // The old app's "Choose your Genre / Language" chip sheets (multi-select) — same for LCO, customer and guest
      $('[data-act="genre"]', root).addEventListener("click", () => openChipSheet("genre", () => refreshHome(root, draw)));
      $('[data-act="lang"]', root).addEventListener("click", () => openChipSheet("lang", () => refreshHome(root, draw)));
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
      $('[data-act="profile"]', root).addEventListener("click", () => go(fromLco ? "tvProfile" : "custProfile"));
      if (bar) bindCtvNav(root, "live");
      draw();
      return root;
    },

    /* =====================================================================
       LCO (Cable TV) → Watch OTT: the old app's TV section, rebuilt in SITI colours.
       Home (from-lco) ─ FAB ─► TV Guide ─ programme ─► pop-up ─ Watch Now ─► channel page
       Bottom bar: Dashboard · BB Recharge · Live TV · Support · Profile
       ===================================================================== */
    tvGuide() {
      const PX = 3.2, CHW = 92;                       // 1 minute = 3.2 px (30 min = 96 px); channel column width
      const now = new Date();
      const win = new Date(now); win.setSeconds(0, 0);
      win.setMinutes(Math.floor(now.getMinutes() / 30) * 30 - 30);
      const SPAN = 240;                               // 4 hours of guide
      const xOf = (d) => Math.round(((d - win) / 60000) * PX);
      const root = el(`
        <section class="screen-fixed tv tvg" data-screen="tv-guide">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>TV Guide</h2>
            <button class="tvg-live" data-act="now" aria-label="Jump to now">LIVE</button>
          </header>
          <div class="tvg-pills">
            <button class="gp" data-act="genre">${I.masks}<span></span></button>
            <button class="gp" data-act="lang">${I.lang}<span></span></button>
          </div>
          <div class="epg" id="epg"></div>
        </section>`);
      bindCommon(root);
      const epg = $("#epg", root);
      const draw = () => {
        const f = state.filter;
        $('[data-act="genre"] span', root).textContent = genreLabel();
        $('[data-act="lang"] span', root).textContent = langLabel();
        $('[data-act="genre"]', root).classList.toggle("on", !!(f.genre || f.genres));
        $('[data-act="lang"]', root).classList.toggle("on", !!(f.lang || f.langs));
        const chans = GENRES.filter(genreOn).flatMap((g) => filtered(g));
        const times = Array.from({ length: SPAN / 30 }, (_, k) => new Date(win.getTime() + k * 30 * 60000));
        const rows = chans.map((c) => {
          const blocks = epgFor(c).filter((p) => p.end > win && p.start < new Date(win.getTime() + SPAN * 60000)).map((p) => {
            const l = Math.max(0, xOf(p.start)), r = Math.min(SPAN * PX, xOf(p.end));
            const state_ = p.end <= now ? " past" : p.start <= now ? " live" : "";
            return `<button class="epg-p${state_}" style="left:${l}px;width:${r - l - 6}px" data-pc="${c.id}" data-ps="${p.start.getTime()}">
                <b>${esc(p.title)}</b><small>${fmt(p.start)} - ${fmt(p.end)}</small></button>`;
          }).join("");
          return `<div class="epg-row">
              <button class="epg-ch" data-chan="${c.id}" aria-label="${esc(c.name)}"><span class="epg-logo" style="background:${grad(c.colors)}">${chInitials(c)}</span><small>${esc(c.name)}</small></button>
              <div class="epg-track">${blocks}</div>
            </div>`;
        }).join("");
        epg.innerHTML = chans.length ? `
          <div class="epg-in" style="width:${CHW + SPAN * PX}px">
            <div class="epg-times"><span class="epg-corner">Time</span>${times.map((t) => `<span style="left:${CHW + xOf(t)}px">${fmt(t)}</span>`).join("")}</div>
            ${rows}
            <i class="epg-now" style="left:${CHW + xOf(now)}px"><b>● LIVE</b></i>
          </div>`
          : `<div class="empty">${I.tv}<b>No channels</b><p>Change the Genre or Language selection.</p></div>`;
        $$("[data-pc]", epg).forEach((b) => b.addEventListener("click", () => {
          const c = CHANNELS[+b.dataset.pc];
          openProgPopup(c, epgFor(c).find((p) => p.start.getTime() === +b.dataset.ps));
        }));
        $$("[data-chan]", epg).forEach((b) => b.addEventListener("click", () => watchTv(+b.dataset.chan)));
      };
      $('[data-act="genre"]', root).addEventListener("click", () => openChipSheet("genre", draw));
      $('[data-act="lang"]', root).addEventListener("click", () => openChipSheet("lang", draw));
      $('[data-act="now"]', root).addEventListener("click", () => epg.scrollTo({ left: Math.max(0, xOf(now) - 40), behavior: "smooth" }));
      draw();
      return root;
    },

    /* ---- LCO Watch OTT: channel page (player + now playing + Upcoming Shows) ---- */
    tvChannel({ id = 0 }) {
      const c = CHANNELS[id] || CHANNELS[0];
      const g = GENRES.find((x) => x.key === c.genre);
      const list = epgFor(c);
      const live = list.find((p) => p.live);
      const upcoming = list.filter((p) => p.start >= live.end).slice(0, 5);
      recordRecent(c.id);
      const root = el(`
        <section class="tv tvc" data-screen="tv-channel">
          <header class="tvc-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <span class="tvc-t"><b>${esc(c.name)}</b><small>${chNo(c)} | ${g.name} | ${c.lang}</small></span>
            <button class="lco-ic" data-toast="Full screen (demo)" aria-label="Full screen">${I.expand}</button>
            <button class="lco-ic" data-act="minimise" aria-label="Minimise – keep watching in a mini player">${I.pip}</button>
          </header>
          <div class="tvc-player${hasLiveVideo(c) ? " has-vid" : ""}" style="background:${grad(c.colors)}">
            ${hasLiveVideo(c) ? liveVideoHTML("tvc-vid") : ""}
            <span class="tvc-live"><i></i>LIVE</span>
            <button class="tvc-arr" data-step="-1" aria-label="Previous channel">${I.back}</button>
            ${hasLiveVideo(c)
              ? `<button class="tvc-snd" data-act="sound" aria-label="Turn sound on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h4l5-4v13l-5-4H4z"/><path class="s-on" d="M16.5 8.5a5 5 0 0 1 0 7"/><path class="s-off" d="M16 9.5l5 5M21 9.5l-5 5"/></svg></button>`
              : `<div class="tvc-now"><b>${esc(c.show)}</b><span class="tvc-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div>`}
            <button class="tvc-arr r" data-step="1" aria-label="Next channel">${I.back}</button>
            <img class="tvc-wm" src="${MARK}" alt="" />
          </div>
          <div class="tvc-info">
            <h3>${esc(live.title)}</h3>
            <small>${fmt(live.start)} - ${fmt(live.end)} • ${c.lang}</small>
            <small>${g.name} | ${esc(c.name)} | Live</small>
            <p>${GENRE_DESC[c.genre]}</p>
          </div>
          <h3 class="tvc-up">Upcoming Shows</h3>
          <div class="tvc-list">
            ${upcoming.map((p) => `
              <button class="tvc-item" data-remind="${esc(p.title)} at ${fmt(p.start)}">
                <span class="tvc-thumb" style="background:${grad(c.colors)}"><b>${esc(p.title)}</b></span>
                <span><b>${esc(p.title)}</b><small>${fmt(p.start)} - ${fmt(p.end)} | ${c.lang}</small></span>
              </button>`).join("")}
          </div>
          <p class="more-note">Demo • Simulated live stream</p>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $$("[data-remind]", root).forEach((b) => b.addEventListener("click", () => toast(`Reminder set: ${b.dataset.remind} (demo)`, "success")));
      // Minimise: back to the previous screen, the channel keeps playing in the mini player
      $('[data-act="minimise"]', root).addEventListener("click", () => { PIP.pending = c.id; back(); });
      const vid = $(".tvc-vid", root);
      if (vid) {
        syncLive(vid);
        const snd = $('[data-act="sound"]', root);
        snd.addEventListener("click", () => {
          vid.muted = !vid.muted;
          snd.classList.toggle("on", !vid.muted);
          snd.setAttribute("aria-label", vid.muted ? "Turn sound on" : "Turn sound off");
          if (vid.paused) vid.play().catch(() => {});
        });
      }
      // ‹ › switch channel in place (no extra Back steps)
      $$("[data-step]", root).forEach((b) => b.addEventListener("click", () => {
        const mine = myChannels(), at = mine.findIndex((x) => x.id === c.id);   // only channels in the plan
        const n = mine[(Math.max(at, 0) + +b.dataset.step + mine.length) % mine.length].id;
        swapRoute("tvChannel", { id: n });
      }));
      return root;
    },

    /* ---- LCO Watch OTT: Profile (old app layout) ---- */
    tvProfile() {
      const u = tvUser();
      const f = state.filter;
      const prefText = (arr, all) => (arr && arr.length ? arr.slice(0, 3).join(", ") + (arr.length > 3 ? ", …" : "") : all);
      const root = el(`
        <section class="tv tvpf" data-screen="tv-profile">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Profile</h2>
          </header>
          <div class="tvpf-user"><span class="tvpf-av">${esc(u.id[0])}</span><span><small>${esc(u.id)}</small><b>${esc(u.id)}</b></span></div>
          ${vcCardHTML()}
          <h4 class="tvpf-h">Profiles</h4>
          <div class="tvpf-profiles">
            <button class="tvpf-prof on" data-toast="${esc(u.id)} is active">${`<span class="tvpf-av sm">${esc(u.id[0])}</span>`}<small>${esc(u.id)}</small></button>
            <button class="tvpf-prof add" data-toast="Add Profile (demo)"><span class="tvpf-plus">${I.plus}</span><small>Add Profile</small></button>
          </div>
          <div class="tvpf-upg">
            <div><b>${I.crown}Upgrade to OTT Package</b><small>Unlock more channels &amp; exclusive benefits</small>
              <button class="lco-pill" data-act="upgrade">Upgrade Now</button></div>
            <span class="tvpf-crown">${I.crown}</span>
          </div>
          <h4 class="tvpf-h">Other Services</h4>
          <div class="tvpf-svcs">
            ${[["bb", u.id, "Broadband"], ["cable", `${u.mobile}_Cable`, "Cable Customer"]].map(([k, n, t], j) => `
              <button class="tvpf-svc${j === 0 ? " on" : ""}" data-svc="${k}" aria-pressed="${j === 0}">
                <span class="tvpf-svc-ic">${I.userFill}</span><span><b>${esc(n)}</b><small>${t}</small></span><i class="tvpf-radio">${I.check}</i>
              </button>`).join("")}
          </div>
          <div class="tvpf-row"><h4 class="tvpf-h">Live Channels</h4><button class="lco-pill" data-toast="Modify Channels (demo)">Modify Channels</button></div>
          <div class="tvpf-plan"><b>Welcome Plan</b><small>(300) Channels Available</small></div>
          <h4 class="tvpf-h">Settings</h4>
          <div class="tvpf-set">
            <button data-act="devices"><span class="tvpf-si">${I.device}</span><span><b>Manage Device</b><small>View devices connected to your account</small></span>${I.chev}</button>
            <button data-act="lang-pref"><span class="tvpf-si">${I.lang}</span><span><b>Language Preference</b><small id="lp">${prefText(f.langs, "All languages")}</small></span>${I.chev}</button>
            <button data-act="genre-pref"><span class="tvpf-si">${I.masks}</span><span><b>Genre Preference</b><small id="gp">${prefText(f.genres && f.genres.map((k) => GENRES.find((g) => g.key === k).name), "All genres")}</small></span>${I.chev}</button>
          </div>
          <button class="btn tvpf-out" data-act="logout">${I.logout} Log Out</button>
          <button class="btn ghost tvpf-del" data-act="delete">Delete Account</button>
          <p class="more-note">v1.0 demo</p>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $$("[data-svc]", root).forEach((b) => b.addEventListener("click", () => {
        $$("[data-svc]", root).forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
        toast(`Switched to ${b.querySelector("small").textContent} (demo)`);
      }));
      $('[data-act="upgrade"]', root).addEventListener("click", () => pickSheet("Upgrade to OTT Package", OTT_PLANS.map((p) => `${p.name} — ₹ ${p.price}`), "", (v) => toast(`${v.split(" —")[0]}: upgrade request sent (demo)`, "success")));
      $('[data-act="devices"]', root).addEventListener("click", () => openSheet(`
        <h3>Manage Device</h3>
        <div class="lco-inv">
          <span><small>This phone</small><b>Active now</b></span>
          <span><small>Living-room TV (STB)</small><b>Last seen today</b></span>
        </div>
        <span class="demo-tag">Demo devices</span>
        <button class="btn ghost" id="devX">Close</button>`, (sh) => $("#devX", sh).addEventListener("click", closeSheet)));
      $('[data-act="lang-pref"]', root).addEventListener("click", () => openChipSheet("lang", () => { $("#lp", root).textContent = prefText(state.filter.langs, "All languages"); }));
      $('[data-act="genre-pref"]', root).addEventListener("click", () => openChipSheet("genre", () => {
        const gs = state.filter.genres;
        $("#gp", root).textContent = prefText(gs && gs.map((k) => GENRES.find((g) => g.key === k).name), "All genres");
      }));
      $('[data-act="logout"]', root).addEventListener("click", lcoLogout);
      $('[data-act="delete"]', root).addEventListener("click", () => toast("Delete Account is disabled in the demo"));
      return root;
    },

    /* ---- LCO Watch OTT: bottom bar → Dashboard (customer account overview + left menu) ---- */
    ctvDash() {
      const u = tvUser();
      const h = new Date().getHours();
      const hi = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
      const pl = bbPlanInfo(), { from, to, left } = pl;
      const now = new Date(), dv = ctvDev();
      const pct = Math.min(1, pl.usedGB / pl.fup);
      const st = CTV.status || "Active";   // Active / Suspended / Inactive
      const openN = CTV.tickets.filter((t) => t.status !== "Closed").length;
      const root = el(`
        <section class="screen-fixed tv ctv" data-screen="ctv-dashboard">
          <div class="tv-scroll">
            <header class="ctv-head">
              <button class="lco-ic" data-act="menu" aria-label="Open menu" aria-expanded="false">${I.menu}</button>
              <h2>Dashboard</h2>
              <button class="lco-ic" data-act="logout" aria-label="Logout">${I.logout}</button>
            </header>
            <div class="ctv-hi2"><p class="ctv-hi">${hi}, <b>${esc(u.name)}</b></p><span class="ctv-acst ${st.toLowerCase()}"><i></i>${st}</span></div>
            <button class="ctv-otk" data-act="tickets">${I.ticket}<span>Open ticket</span><b>${openN}</b>${I.chev}</button>
            <button class="lco-card ctv-card ctv-use" data-act="more" aria-label="Usage details">
              <span class="ctv-use-h"><b>${I.pie}Current Usage</b><small>${MON[now.getMonth()]} ${now.getFullYear()}</small></span>
              <span class="ctv-use-b">
                <svg viewBox="0 0 120 120" class="ctv-use-ring" aria-hidden="true">
                  <defs><linearGradient id="useG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2fd8ff" /><stop offset=".55" stop-color="#9b5cff" /><stop offset="1" stop-color="#ff3fd0" /></linearGradient></defs>
                  <circle cx="60" cy="60" r="50" class="bg" />
                  <circle cx="60" cy="60" r="50" class="fg" stroke="url(#useG)" stroke-dasharray="${(pct * 314.16).toFixed(1)} 314.16" transform="rotate(-90 60 60)" />
                  <text x="60" y="56" class="v">${pl.usedGB.toFixed(1)}</text><text x="60" y="73" class="l">GB used</text>
                </svg>
                <span class="ctv-use-l">
                  <span><i class="dn"></i><small>Download</small><b>${mbFmt(pl.dn)}</b></span>
                  <span><i class="up"></i><small>Upload</small><b>${mbFmt(pl.up)}</b></span>
                  <span><i class="lf"></i><small>Left of ${pl.fup} GB</small><b>${Math.max(0, pl.fup - pl.usedGB).toFixed(2)} GB</b></span>
                </span>
              </span>
              <span class="ctv-use-f">${Math.round(pct * 100)}% of this month's data used<em>More Details ${ARROW}</em></span>
            </button>
            <div class="lco-card ctv-card">
              <b class="ctv-t">My Plan</b>
              <div class="ctv-plan">
                <span>${I.wifi}<small>Plan</small><b>${pl.name}</b></span>
                <span>${I.clock}<small>Remaining Days</small><b>${left} Days/${pl.total} Days</b></span>
                <span>${I.pie}<small>Used / Allocated</small><b>${pl.used} / ${pl.fup} GB</b></span>
                <span>${I.calendar}<small>Validity</small><b>${dmy(from)} – ${dmy(to)}</b></span>
              </div>
              <div class="ctv-plan-a"><button class="ctv-more" data-act="renew">Quick Renew ${ARROW}</button>
                <button class="ctv-more ghost" data-act="more-packs">More Packages ${ARROW}</button></div>
            </div>
            <div class="lco-card ctv-card ctv-devc">
              <div class="ctv-devh">${I.wifi}<b>My Device</b><select class="ctv-sel" id="devSel" aria-label="Device">${CTV_DEV.map((x, j) => `<option value="${j}"${x === dv ? " selected" : ""}>${x.name}</option>`).join("")}</select></div>
              <div class="ctv-kv"><span>Serial Number</span><b id="devSn">${dv.serial}</b></div>
              <div class="ctv-kv"><span>Connected Devices :</span><b id="devCn">${dv.clients.length}</b></div>
              <div class="ctv-devf"><button class="ctv-ref" data-act="dev-ref" aria-label="Refresh device">${I.refresh}</button><button class="link" data-act="dev-more">More Details</button></div>
            </div>
          </div>
          ${ctvDrawerHTML()}
          ${ctvNavHTML("dash")}
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      bindCtvMenu(root);
      $('[data-act="more"]', root).addEventListener("click", () => go("ctvSession"));
      $('[data-act="tickets"]', root).addEventListener("click", () => go("ctvSupport", { sub: true }));
      $('[data-act="renew"]', root).addEventListener("click", () => go("ctvQuickRenew"));
      $('[data-act="more-packs"]', root).addEventListener("click", () => ctvGo("Broadband"));
      $("#devSel", root).addEventListener("change", (e) => {
        state.ctvDev = +e.target.value;
        const d = ctvDev();
        $("#devSn", root).textContent = d.serial; $("#devCn", root).textContent = d.clients.length;
      });
      $('[data-act="dev-ref"]', root).addEventListener("click", async (e) => {
        const b = e.currentTarget; b.classList.add("spin"); await wait(900); b.classList.remove("spin");
        ctvDev().synced = Date.now(); toast("Device details refreshed (demo)", "success");
      });
      $('[data-act="dev-more"]', root).addEventListener("click", () => go("ctvUdm"));
      bindCtvNav(root, "dash");
      return root;
    },

    /* ---- Self-care: Dashboard My Plan → Quick Renew (current plan + Quick Purchase → SITI Pay) ---- */
    ctvQuickRenew() {
      const root = ctvShell("ctv-quick-renew", "Quick Renew", { sub: true });
      const box = $("#cx", root);
      const draw = () => {
        const pl = bbPlanInfo(), nextTo = new Date(pl.to.getTime() + pl.renew * 864e5);
        box.innerHTML = `
          <div class="lco-card ctv-card ctv-qr">
            <b class="ctv-t">My Plan</b>
            <div class="ctv-plan">
              <span>${I.wifi}<small>Plan</small><b>${pl.name}</b></span>
              <span>${I.bolt}<small>Speed</small><b>${pl.speed}</b></span>
              <span>${I.pie}<small>Used / Allocated</small><b>${pl.used} / ${pl.data}</b></span>
              <span>${I.clock}<small>Remaining Days</small><b>${pl.left} Days/${pl.total} Days</b></span>
              <span class="w">${I.calendar}<small>Validity</small><b>${dmy(pl.from)} – ${dmy(pl.to)}</b></span>
            </div>
          </div>
          <div class="lco-card ctv-card ctv-qr">
            <b class="ctv-t">Renew this plan</b>
            <div class="ctv-kv"><span>Plan</span><b>${pl.name}</b></div>
            <div class="ctv-kv"><span>Adds</span><b>${pl.renew} Days</b></div>
            <div class="ctv-kv"><span>New validity till</span><b>${dmy(nextTo)}</b></div>
            <div class="ctv-kv ctv-qr-tot"><span>Amount (Incl. Tax)</span><b>₹ ${pl.price}</b></div>
            <button class="btn ctv-qr-go" data-act="qp">${I.card} Quick Purchase · ₹ ${pl.price}</button>
          </div>
          <span class="demo-tag">Demo • no real payment</span>`;
        $('[data-act="qp"]', box).addEventListener("click", () => startPayment({ amount: pl.price, purpose: `Quick Renew · ${pl.name}` }, (pay) => {
          CTV.renewDays = (CTV.renewDays || 0) + pl.renew;
          const now = new Date();
          CTV.payments.unshift({ ref: "PAY" + pay.txn.slice(-7), what: `Online payment (${pay.method})`, amount: pl.price, at: now, ok: true });
          CTV.purchases.unshift({ ref: "PUR" + pay.txn.slice(-7), what: `${pl.name} · renew ${pl.renew} days`, amount: pl.price, at: now, ok: true });
          draw();
          openSheet(`
            <div class="ok-badge">${I.checkBig}</div>
            <h3>Plan renewed</h3>
            <p class="ctv-sheetp">${pl.name} is valid till <b>${dmy(nextTo)}</b>.</p>
            <span class="demo-tag">Demo • no real payment</span>
            <button class="btn" id="qrDone">Done</button>`, (sh) => $("#qrDone", sh).addEventListener("click", () => { closeSheet(); back(); }));
        }));
      };
      draw();
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Watch OTT self-care: BB Recharge (bottom bar) / Broadband (menu, pushed) ---- */
    ctvRecharge({ sub } = {}) {
      const TABS = [["unlimited", "Unlimited"], ["ott", "Unlimited + OTT"], ["bundle", "Unlimited + Digital TV"]];
      const root = ctvShell("ctv-recharge", "Recharge", { sub, tabs: TABS, tab: "unlimited", nav: "recharge" });
      const box = $("#cx", root);
      let cur = "unlimited";
      const draw = (k) => {
        cur = k;
        const label = TABS.find((t) => t[0] === k)[1];
        box.innerHTML = `
          <div class="ctv-sec"><button class="ctv-sec-h" id="secT" aria-expanded="true"><b>${label}</b>${I.chev}</button>
            <div class="ctv-plans">${CTV.plans[k].map((p, j) => `
              <div class="ctv-pc">
                <div class="ctv-pc-g">
                  <span><small>Price</small><b class="pr">₹ ${p.price}<br />(Incl. Tax)</b></span>
                  <span><small>Speed</small><b>${p.speed}</b></span>
                  <span><small>Data</small><b>${p.data}</b></span>
                  <span><small>Validity</small><b>${p.days} Days</b></span>
                </div>
                <div class="ctv-pc-a"><button class="ctv-ben" data-ben="${j}">Benefits</button><button class="ctv-buy" data-buy="${j}">${I.card} Buy Now</button></div>
              </div>`).join("")}</div>
          </div>`;
        $("#secT", box).addEventListener("click", (e) => {
          const s = e.currentTarget.closest(".ctv-sec");
          const shut = s.classList.toggle("shut");
          e.currentTarget.setAttribute("aria-expanded", !shut);
        });
        $$("[data-ben]", box).forEach((b) => b.addEventListener("click", () => {
          const p = CTV.plans[cur][+b.dataset.ben];
          openSheet(`
            <h3>${esc(p.name)}</h3>
            <div class="lco-inv">
              <span><small>Speed</small><b>${p.speed}</b></span>
              <span><small>Data</small><b>${p.data} (FUP-free)</b></span>
              ${p.extra ? `<span><small>Includes</small><b>${esc(p.extra)}</b></span>` : ""}
              <span><small>Validity</small><b>${p.days} Days</b></span>
              <span class="tot"><small>Price (incl. tax)</small><b>₹ ${p.price}</b></span>
            </div>
            <span class="demo-tag">Demo plan</span>
            <button class="btn ghost" id="bnX">Close</button>`, (sh) => $("#bnX", sh).addEventListener("click", closeSheet));
        }));
        $$("[data-buy]", box).forEach((b) => b.addEventListener("click", () => {
          const p = CTV.plans[cur][+b.dataset.buy];
          openSheet(`
            <h3>Confirm Recharge</h3>
            <div class="lco-inv">
              <span><small>Plan</small><b>${esc(p.name)}</b></span>
              <span><small>Speed / Validity</small><b>${p.speed} · ${p.days} Days</b></span>
              <span class="tot"><small>Amount payable</small><b>₹ ${p.price}</b></span>
            </div>
            <div class="lco-btn2"><button class="btn ghost" id="byX">Cancel</button><button class="btn" id="byOk">Pay ₹ ${p.price}</button></div>
            <span class="demo-tag">Demo • no real payment</span>`, (sh) => {
            $("#byX", sh).addEventListener("click", closeSheet);
            $("#byOk", sh).addEventListener("click", async () => {
              closeSheet();
              showLoader("Processing payment…");
              await wait(900);
              hideLoader();
              const now = new Date(), n = String(Math.floor(Math.random() * 9e6) + 1e6);
              CTV.history.unshift({ ...CTV.current, expiry: now });
              CTV.current = { name: p.name, activated: now, expiry: new Date(now.getTime() + p.days * 864e5), validity: p.days, used: "0 GB", unused: "UL GB" };
              CTV.payments.unshift({ ref: "PAY" + n, what: "Online payment (demo)", amount: p.price, at: now, ok: true });
              CTV.purchases.unshift({ ref: "PUR" + n, what: `${p.name} · ${p.days} days`, amount: p.price, at: now, ok: true });
              openSheet(`
                <div class="ok-badge">${I.checkBig}</div>
                <h3>Recharge successful</h3>
                <p class="ctv-sheetp"><b>${esc(p.name)}</b> is active till ${dmy(CTV.current.expiry)}.</p>
                <span class="demo-tag">Demo • no real payment</span>
                <button class="btn" id="byDone">Done</button>`, (s2) => $("#byDone", s2).addEventListener("click", closeSheet));
            });
          });
        }));
      };
      bindCtvTabs(root, draw);
      draw(cur);
      ctvBind(root, "recharge", sub);
      return root;
    },

    /* ---- Watch OTT self-care: Support (bottom bar, or pushed from the menu) ---- */
    ctvSupport({ sub, raise } = {}) {
      const root = ctvShell("ctv-support", "Support", { sub, nav: "support" });
      const box = $("#cx", root);
      // "Raise a Ticket" → New Ticket: Type (Feedback / Question / Problem) → Problem: Case Reason / Category → Sub Category → Remarks (0–200) → Create
      const TYPES = ["Feedback", "Question", "Problem"];
      const CATS = CASE_REASONS.Complaint;
      const PRESET = { "Slow Browsing": ["Technical_Problem_Category", "Slow Browsing"], "Router not working": ["Technical_Problem_Category", "CPE Not Working – Wi-Fi Router"] };
      const u = tvUser();
      const blank = () => ({ type: "", cat: "", sub: "", desc: "" });
      // null = ticket list; raise (Self Help → Create Ticket) opens the form directly as a Problem, with the reason preset when known
      let form = raise === undefined ? null : Object.assign(blank(), { type: "Problem" }, PRESET[raise] ? { cat: PRESET[raise][0], sub: PRESET[raise][1] } : {});
      const opts = (list, cur) => list.map((x) => `<option${x === cur ? " selected" : ""}>${esc(x)}</option>`).join("");
      const formHTML = () => {
        const f = form, prob = f.type === "Problem", subs = prob && f.cat ? CATS[f.cat] || [] : [];
        return `
          <div class="lco-card ctv-nt ctv-nt2">
            <div class="ctv-nt-h"><b>New Ticket</b><button class="lco-ic" data-act="nt-x" aria-label="Close form">${I.close}</button></div>
            <p class="ctv-nt-who">${I.userFill}<span>${esc(u.id)} · ${esc(CTV.profile.mobile || u.mobile)}</span></p>
            <label class="lco-fl" id="ntTypeW"><small>Type *</small>
              <select id="ntType"><option value="">Select</option>${opts(TYPES, f.type)}</select></label>
            ${prob ? `
              <label class="lco-fl" id="ntCatW"><small>Case Reason / Category *</small>
                <select id="ntCat"><option value="">Select Reason</option>${opts(Object.keys(CATS), f.cat)}</select></label>
              ${subs.length ? `<label class="lco-fl" id="ntSubW"><small>Sub Category (optional)</small>
                <select id="ntSub"><option value="">Select Sub Category</option>${opts(subs, f.sub)}</select></label>` : ""}` : ""}
            ${f.type && (!prob || f.cat) ? `
              <label class="lco-fl ctv-nt-rem" id="ntRemW"><small>Remarks${prob ? " (optional)" : " *"}</small>
                <textarea id="ntDesc" rows="4" maxlength="200" placeholder="${prob ? "Add details about the problem" : `Write your ${f.type.toLowerCase()}`}">${esc(f.desc)}</textarea>
                <i class="ctv-nt-cnt" id="ntCnt">${f.desc.length}/200</i></label>` : ""}
            <p class="hint err" id="ntErr"></p>
            <button class="btn ctv-nt-go" data-act="nt-create">Create</button>
          </div>
          <span class="demo-tag">Demo • no real ticket is raised</span>`;
      };
      const listHTML = () => `
        <button class="ctv-raise" data-act="raise">${I.plus}Raise a Ticket</button>
        ${CTV.tickets.map((t, j) => `
          <div class="lco-card ctv-tk">
            <div class="ctv-tk-h"><b>${esc(t.id)}</b><span class="ctv-st ${t.status === "Closed" ? "closed" : "open"}">${esc(t.status)}</span></div>
            <dl>
              <dt>Ticket Title</dt><dd>${esc(t.title)}</dd>
              <dt>Ticket Reason</dt><dd>${esc(t.reason)}</dd>
              <dt>Last Modified Date</dt><dd>${stamp(t.at)}</dd>
            </dl>
            <div class="ctv-tk-a"><button class="ctv-remark" data-rem="${j}">Add Remark</button>
              ${t.status !== "Closed" ? `<button class="ctv-remark" data-done="${j}">Complete</button>` : ""}
              <button class="lco-ic" data-view="${j}" aria-label="View ${esc(t.id)}">${I.eye}</button></div>
          </div>`).join("")}`;
      const draw = () => {
        box.innerHTML = `
          <div class="lco-card ctv-contact">
            <b>Contact Us</b>
            <div>${I.mail}<span>support@siti-demo.example</span></div>
            <div>${I.phone}<span>1800 000 0000 (demo)</span></div>
          </div>
          ${form ? formHTML() : listHTML()}`;
        if (form) return bindForm();
        $('[data-act="raise"]', box).addEventListener("click", () => { form = blank(); draw(); });
        $$("[data-view]", box).forEach((b) => b.addEventListener("click", () => openTicket(CTV.tickets[+b.dataset.view])));
        $$("[data-done]", box).forEach((b) => b.addEventListener("click", () => {
          const t = CTV.tickets[+b.dataset.done];
          t.status = "Closed"; t.at = new Date();
          CTV.notes.unshift({ at: t.at, kind: "closed", id: t.id, cat: t.reason });
          toast(`${t.id} marked complete (demo)`, "success");
          draw();
        }));
        $$("[data-rem]", box).forEach((b) => b.addEventListener("click", () => {
          const t = CTV.tickets[+b.dataset.rem];
          editSheet(`Add Remark · ${t.id}`, "", { max: 120, check: (v) => v.length >= 3, err: "Remark must be at least 3 characters" }, (v) => {
            t.remarks.push(v);
            t.at = new Date();
            toast("Remark added (demo)", "success");
            draw();
          });
        }));
      };
      const keepDesc = () => { const d = $("#ntDesc", box); if (d) form.desc = d.value; };
      const bindForm = () => {
        $('[data-act="nt-x"]', box).addEventListener("click", () => { form = null; draw(); });
        $("#ntType", box).addEventListener("change", (e) => { keepDesc(); Object.assign(form, { type: e.target.value, cat: "", sub: "" }); draw(); });
        const cat = $("#ntCat", box), sb = $("#ntSub", box), d = $("#ntDesc", box);
        if (cat) cat.addEventListener("change", () => { keepDesc(); Object.assign(form, { cat: cat.value, sub: "" }); draw(); });
        if (sb) sb.addEventListener("change", () => { form.sub = sb.value; if (sb.value) { $("#ntErr", box).textContent = ""; $("#ntSubW", box).classList.remove("invalid"); } });
        if (d) d.addEventListener("input", () => { form.desc = d.value; $("#ntCnt", box).textContent = `${d.value.length}/200`; });
        $('[data-act="nt-create"]', box).addEventListener("click", async () => {
          keepDesc();
          const f = form, prob = f.type === "Problem", txt = f.desc.trim();
          const fail = (w, msg) => { $("#ntErr", box).textContent = msg; const x = $(w, box); if (x) shake(x); toast(msg, "error"); };
          if (!f.type) return fail("#ntTypeW", "Please select a type");
          if (prob && !f.cat) return fail("#ntCatW", "Please select a case reason / category");
          if (!prob && txt.length < 3) return fail("#ntRemW", `Please write your ${f.type.toLowerCase()} in Remarks`);
          showLoader("Creating ticket…"); await wait(1000); hideLoader();
          const id = "TKT" + (4400000 + Math.floor(Math.random() * 99999)), now = new Date();
          const title = prob ? f.sub || f.cat : txt.length > 40 ? txt.slice(0, 40) + "…" : txt;
          CTV.tickets.unshift({ id, title, reason: prob ? f.cat : f.type, at: now, status: "Open", remarks: txt ? [txt] : [] });
          CTV.notes.unshift({ at: now, kind: "created", id, cat: prob ? f.sub || f.cat : f.type });
          form = null; draw();
          toast(`Ticket ${id} created (demo)`, "success");
        });
      };
      draw();
      ctvBind(root, "support", sub);
      return root;
    },

    /* ---- Watch OTT self-care: Profile (bottom bar) — Profile / Documents / Change Password ---- */
    ctvProfile() {
      const u = tvUser();
      const P = CTV.profile;
      if (!P.mobile) P.mobile = u.mobile;
      const root = ctvShell("ctv-profile", "Profile", { tabs: [["info", "Profile"], ["docs", "Documents"], ["pwd", "Change Password"]], tab: "info", nav: "profile" });
      const box = $("#cx", root);
      const row = (ic, label, val, edit) => `
        <div class="ctv-pr">${ic}<span><small>${label}</small><b>${esc(val)}</b></span>${edit ? `<button class="lco-ic sm" data-edit="${edit}" aria-label="Edit ${label}">${I.pencil}</button>` : ""}</div>`;
      const EDIT = {
        email: ["Email", "email", { type: "email", max: 60, check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), err: "Enter a valid email address" }],
        mobile: ["Mobile", "mobile", { type: "tel", max: 10, check: (v) => /^[6-9]\d{9}$/.test(v), err: "Enter a 10-digit mobile number starting with 6–9" }],
        gstin: ["GSTIN", "gstin", { max: 15, check: (v) => /^[0-9A-Z]{15}$/i.test(v), err: "GSTIN must be 15 letters/numbers" }],
      };
      const views = {
        info: () => `
          <div class="lco-card ctv-ci">
            <b class="ctv-ci-t">Customer Information</b>
            <div class="ctv-ci-box">
              <span class="ctv-ci-av"><i>${I.userFill.replace("<svg ", '<svg width="40" height="40" ')}</i>
                <button class="ctv-ci-cam" data-act="ci-cam" aria-label="Change profile photo">${I.camera.replace("<svg ", '<svg width="15" height="15" ')}</button></span>
              <span><b>${esc(u.name)}</b><small class="ctv-online"><i></i>Online</small></span>
            </div>
          </div>
          <div class="lco-card ctv-prl">
            ${row(I.user, "Name", u.name)}
            ${row(I.mail, "Email", P.email, "email")}
            ${row(I.phone, "Mobile", P.mobile, "mobile")}
            ${row(I.hash, "GSTIN", P.gstin, "gstin")}
            ${row(I.router, "MAC Address", ctvDev().mac)}
            ${row(I.home, "Address", P.address)}
            ${row(I.scan, "eKYC Status", P.ekyc)}
            <div class="ctv-pr">${I.finger}<span><b>Biometric Authorization</b></span>
              <button class="ctv-sw${P.bio ? " on" : ""}" id="bio" role="switch" aria-checked="${!!P.bio}" aria-label="Biometric Authorization"><i></i></button></div>
          </div>`,
        docs: () => `
          <div class="lco-card ctv-docf">
            <label class="lco-fl"><small>Document Type</small>
              <select id="dType">${["ID Proof", "Address Proof", "Customer Passport-size Photo", "GST Certificate", "Other"].map((d) => `<option>${d}</option>`).join("")}</select></label>
            <button class="btn" id="dAdd">${I.plus} Add Document</button>
          </div>
          <p class="ctv-cap">Uploaded Documents</p>
          ${CTV.docs.length ? CTV.docs.map((d, j) => `
            <div class="lco-card ctv-doc">${I.news}<span><b>${esc(d.type)}</b><small>${d.at ? "Uploaded " + dmy(d.at) : "Verified"}</small></span>
              <button class="lco-ic" data-doc="${j}" aria-label="View ${esc(d.type)}">${I.eye}</button></div>`).join("") : ctvEmpty("No documents uploaded")}`,
        pwd: () => `
          <div class="lco-card lco-form ctv-pwd">
            <b class="ctv-pwd-t">Change Selfcare Password</b>
            <label class="lco-fl" id="pw1W"><small>New Password</small><input id="pw1" type="password" maxlength="20" placeholder="At least 8 characters" autocomplete="new-password" /></label>
            <label class="lco-fl" id="pw2W"><small>Confirm Password</small><input id="pw2" type="password" maxlength="20" placeholder="Re-enter password" autocomplete="new-password" /></label>
            <p class="hint" id="pwH">Use 8+ characters with letters and numbers</p>
            <button class="btn" id="pwOk">Submit</button>
          </div>`,
      };
      const draw = (k) => {
        box.innerHTML = views[k]();
        box.scrollTop = 0;
        if (k === "info") {
          $$("[data-edit]", box).forEach((b) => b.addEventListener("click", () => {
            const [title, key, rule] = EDIT[b.dataset.edit];
            editSheet(title, key === "gstin" && !/^[0-9A-Z]{15}$/i.test(P.gstin) ? "" : P[key], rule, (v) => {
              P[key] = key === "gstin" ? v.toUpperCase() : v;
              toast(`${title} updated (demo)`, "success");
              draw("info");
            });
          }));
          // Profile icon instead of a photo (user's choice); the camera badge is shown like the old app
          $('[data-act="ci-cam"]', box).addEventListener("click", () => toast("Profile photo upload is not available in the demo"));
          $("#bio", box).addEventListener("click", (e) => {
            P.bio = !P.bio;
            e.currentTarget.classList.toggle("on", P.bio);
            e.currentTarget.setAttribute("aria-checked", P.bio);
            toast(`Biometric authorization ${P.bio ? "enabled" : "disabled"} (demo)`);
          });
        } else if (k === "docs") {
          $("#dAdd", box).addEventListener("click", async () => {
            showLoader("Uploading…");
            await wait(700);
            hideLoader();
            CTV.docs.unshift({ type: $("#dType", box).value, at: new Date() });
            toast("Document uploaded (demo)", "success");
            draw("docs");
          });
          $$("[data-doc]", box).forEach((b) => b.addEventListener("click", () => toast(`${CTV.docs[+b.dataset.doc].type}: preview (demo)`)));
        } else {
          $("#pwOk", box).addEventListener("click", () => {
            const a = $("#pw1", box).value, c = $("#pw2", box).value, h = $("#pwH", box);
            h.classList.add("err");
            if (!(a.length >= 8 && /[A-Za-z]/.test(a) && /\d/.test(a))) { h.textContent = "Password must be 8+ characters with letters and numbers"; shake($("#pw1W", box)); return; }
            if (a !== c) { h.textContent = "Passwords do not match"; shake($("#pw2W", box)); return; }
            h.classList.remove("err");
            h.textContent = "Use 8+ characters with letters and numbers";
            $("#pw1", box).value = $("#pw2", box).value = "";
            toast("Password changed (demo)", "success");
          });
        }
      };
      bindCtvTabs(root, draw);
      draw("info");
      ctvBind(root, "profile");
      return root;
    },

    /* ---- Watch OTT self-care: Notification ---- */
    ctvNotify() {
      const root = ctvShell("ctv-notify", "Notification", { sub: true, body: CTV.notes.map((n) => `
        <div class="lco-card ctv-note">
          <span class="ctv-note-ic">${I.mail}</span>
          <div>
            <p>Dear User,</p>
            <p>A trouble ticket has been ${n.kind} in the system with the following details:</p>
            <p>Ticket Number: ${esc(n.id)}<br />Ticket Priority: Medium<br />Problem Category: ${esc(n.cat)}${n.kind === "closed" ? "<br />Solution: Issue resolved, checked and confirmed" : ""}</p>
            <p>Thank You,<br />SITI Broadband (demo)</p>
            <small>${stamp(n.at)}</small>
          </div>
        </div>`).join("") || ctvEmpty("No notifications") });
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Watch OTT self-care: FAQ ---- */
    // app: true → the general SITI FAQ opened from the Home / OTT ☰ menu (customer, guest, LCO Watch OTT)
    ctvFaq({ app = false } = {}) {
      const QS = app ? [
        ["How do I watch a channel?", "Tap any channel card or tile on Home. Channels outside your plan show a lock; tap it to see channel packages."],
        ["How do I upgrade my channel plan?", "Open ☰ → Profile → Live Channels → Upgrade Plan, pick a package and pay (demo payment)."],
        ["How do I subscribe to OTT apps?", "Open ☰ → OTT, tap a locked app or Upgrade Now in Profile, choose an OTT pack and pay."],
        ["How do I filter by genre or language?", "Open ☰ → Genre or Language, pick one or more and tap Apply. Tap a filter chip to remove it."],
        ["Is this the real app?", "No. This is a demo: no real OTP, payment or streaming happens."],
      ] : [
        ["How do I recharge my broadband?", "Open BB Recharge from the bottom bar, pick a plan and tap Buy Now."],
        ["How do I raise a complaint?", "Go to Support and tap the + button to create a ticket. You can follow it under Support and Notification."],
        ["Where can I see my data usage?", "Open My Usage from the menu or Quick Action. It shows last week's usage, totals and a table view."],
        ["How do I change my password?", "Open Profile → Change Password, enter the new password twice and tap Submit."],
        ["What is VAS?", "Value-added services such as a static IP or extra data, bought for 30–360 days."],
      ];
      const root = ctvShell(app ? "app-faq" : "ctv-faq", "Faq", { sub: true, body: `
        <p class="ctv-cap">FAQ</p>
        <button class="lco-card ctv-ask" id="ask" aria-expanded="${app}">Have any questions?</button>
        <div class="ctv-faqs" id="faqs" ${app ? "" : "hidden"}>
          ${QS.map(([q, a]) => `<details class="lco-card ctv-q"><summary>${q}${I.chev}</summary><p>${a}</p></details>`).join("")}
        </div>` });
      $("#ask", root).addEventListener("click", (e) => {
        const f = $("#faqs", root);
        f.hidden = !f.hidden;
        e.currentTarget.setAttribute("aria-expanded", !f.hidden);
      });
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Watch OTT self-care: Self Help (troubleshoot tiles) ---- */
    ctvSelfHelp() {
      const T = { ticket: [I.headset, "Create Ticket"], renew: [I.history, "Renew Now"], cpe: [I.lock, "Change CPE Password"],
        disc: [I.help, "Session Disconnect"], mac: [I.help, "Reset Mac"], usage: [I.pie, "Check Usage"] };
      const ISSUES = [
        ["Facing Issue in Connecting To Internet ?", "UserId does not exist or account is not active", ["ticket", "renew", "cpe", "disc", "mac"]],
        ["Slow browsing speed ?", "Data usage limit or too many connected devices", ["usage", "disc", "ticket"]],
        ["Wi-Fi router not working ?", "Router powered off or MAC changed", ["mac", "cpe", "ticket"]],
      ];
      const root = ctvShell("ctv-selfhelp", "Self Help", { sub: true, body: ISSUES.map(([q, why, tiles]) => `
        <div class="ctv-sh">
          <b>${q}</b>
          <small>Possible Reason : ${why}</small>
          <p class="ctv-cap">Troubleshoot Using</p>
          <div class="ctv-tiles">${tiles.map((k) => `<button data-fix="${k}" data-cat="${esc(q)}">${T[k][0]}<span>${T[k][1]}</span></button>`).join("")}</div>
        </div>`).join("") });
      $$("[data-fix]", root).forEach((b) => b.addEventListener("click", async () => {
        const k = b.dataset.fix;
        // Create Ticket → Support with the New Ticket / Service Request form open (reason pre-selected where one fits)
        if (k === "ticket") go("ctvSupport", { sub: true, raise: b.dataset.cat.startsWith("Slow") ? "Slow Browsing" : b.dataset.cat.startsWith("Wi-Fi") ? "Router not working" : "" });
        else if (k === "renew") go("ctvRecharge", { sub: true });
        else if (k === "usage") go("ctvSession");
        else if (k === "cpe") editSheet("New CPE Password", "", { type: "password", max: 20, check: (v) => v.length >= 8, err: "Password must be at least 8 characters" }, () => toast("CPE password changed (demo)", "success"));
        else {
          showLoader(k === "mac" ? "Resetting MAC…" : "Disconnecting session…");
          await wait(800);
          hideLoader();
          toast(`${k === "mac" ? "MAC reset" : "Session disconnected"}. Please reconnect your router (demo)`, "success");
        }
      }));
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Watch OTT self-care: My Plan → Plan Details ---- */
    ctvPlan() {
      const root = ctvShell("ctv-plan", "Plan Details", { sub: true, tabs: [["cur", "Current Plan"], ["hist", "Plan History"]], tab: "cur" });
      const box = $("#cx", root);
      const card = (p, now) => `
        <div class="lco-card ctv-pl">
          <div class="ctv-pl-h"><b>${esc(p.name)}</b>${now ? `<span class="ctv-st open">Active</span>` : `<span class="ctv-st closed">Expired</span>`}</div>
          <dl>
            <dt>Activation Date</dt><dd>${dmy(p.activated)}</dd>
            <dt>Expiry Date</dt><dd>${dmy(p.expiry)}</dd>
            <dt>Validity</dt><dd>${p.validity} Days</dd>
            <dt>Data Used</dt><dd>${p.used}</dd>
            <dt>Data Unused</dt><dd>${p.unused}</dd>
          </dl>
        </div>`;
      const draw = (k) => { box.innerHTML = k === "cur" ? card(CTV.current, true) : CTV.history.map((p) => card(p)).join("") || ctvEmpty("No plan history"); };
      bindCtvTabs(root, draw);
      draw("cur");
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Watch OTT self-care: Transaction → Payment / Purchase / Charge ---- */
    ctvTxn() {
      const root = ctvShell("ctv-txn", "Purchase", { sub: true, tabs: [["payments", "Payment"], ["purchases", "Purchase"], ["charges", "Charge"]], tab: "payments" });
      const box = $("#cx", root);
      const draw = (k) => {
        const L = CTV[k];
        box.innerHTML = L.length ? L.map((t) => `
          <div class="lco-card ctv-tx">
            <div class="ctv-pl-h"><b>${esc(t.ref)}</b><span class="ctv-st ${t.ok ? "open" : "fail"}">${t.ok ? "Success" : "Failed"}</span></div>
            <div class="ctv-tx-r"><span>${esc(t.what)}<small>${stamp(t.at)}</small></span><b>₹ ${money(t.amount)}</b></div>
          </div>`).join("") : ctvEmpty("No records found");
      };
      bindCtvTabs(root, draw);
      draw("payments");
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Watch OTT self-care: Vas Plans ---- */
    ctvVas() {
      const root = ctvShell("ctv-vas", "Vas Plans", { sub: true, tabs: [["30", "30 Days"], ["90", "90 Days"], ["180", "180 Days"], ["360", "360 Days"]], tab: "30" });
      const box = $("#cx", root);
      const draw = (k) => {
        const L = CTV.vas[k];
        box.innerHTML = L.length ? L.map(([n, pr], j) => `
          <div class="lco-card ctv-vp">${I.bolt}<span><b>${esc(n)}</b><small>${k} Days</small></span>
            <button class="ctv-buy" data-vas="${j}">₹ ${pr}</button></div>`).join("") : ctvEmpty("No Vas plans available for this validity");
        $$("[data-vas]", box).forEach((b) => b.addEventListener("click", () => {
          const [n, pr] = L[+b.dataset.vas];
          openSheet(`
            <h3>Buy ${esc(n)}</h3>
            <div class="lco-inv"><span><small>Validity</small><b>${k} Days</b></span><span class="tot"><small>Amount</small><b>₹ ${pr}</b></span></div>
            <div class="lco-btn2"><button class="btn ghost" id="vX">Cancel</button><button class="btn" id="vOk">Pay ₹ ${pr}</button></div>
            <span class="demo-tag">Demo • no real payment</span>`, (sh) => {
            $("#vX", sh).addEventListener("click", closeSheet);
            $("#vOk", sh).addEventListener("click", async () => {
              closeSheet();
              showLoader("Processing payment…");
              await wait(800);
              hideLoader();
              CTV.purchases.unshift({ ref: "PUR" + (Math.floor(Math.random() * 9e6) + 1e6), what: `${n} (VAS) · ${k} days`, amount: pr, at: new Date(), ok: true });
              toast(`${n} activated for ${k} days (demo)`, "success");
            });
          });
        }));
      };
      bindCtvTabs(root, draw);
      draw("30");
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Self-care: Dashboard Usage "More Details" / My Usage → Session (Last Week chart, month donut, month session table) ---- */
    ctvSession() {
      const root = ctvShell("ctv-session", "Session", { sub: true, tabs: [["week", "Last Week Usage"], ["total", "Total Data Usage"], ["table", "Table View"]], tab: "week" });
      const box = $("#cx", root);
      const now = new Date();
      let y = now.getFullYear(), m = now.getMonth(), cur = "week";
      const days = CTV.week.map((v, j) => ({ d: new Date(Date.now() - (6 - j) * 864e5), dn: v[0], up: v[1] }));
      const sum = (k) => days.reduce((a, x) => a + x[k], 0);
      const gb = (n) => `${n.toFixed(2)} GB`;
      const totals = (up, dn) => `
        <div class="ctv-tot"><span><b>${mbFmt(up)}</b><small>Total Upload</small></span><span><b>${mbFmt(dn)}</b><small>Total Download</small></span>
          <span class="w"><b>${mbFmt(up + dn)}</b><small>Total Data Usage</small></span></div>`;
      const chart = () => {
        const W = 320, H = 190, L = 30, B = 24, max = 6, cw = (W - L - 6) / days.length;
        const yy = (v) => H - B - (v / max) * (H - B - 8);
        return `
          <figure class="lco-card ctv-chart">
            <figcaption>${MON[days[6].d.getMonth()]} '${days[6].d.getFullYear()}</figcaption>
            <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Daily download and upload for the last 7 days, in GB">
              ${[0, 2, 4, 6].map((v) => `<line x1="${L}" x2="${W - 4}" y1="${yy(v)}" y2="${yy(v)}" class="gl"/><text x="${L - 6}" y="${yy(v) + 3}" class="ax" text-anchor="end">${v}</text>`).join("")}
              ${days.map((x, j) => {
                const cx = L + j * cw + cw / 2;
                return `<rect x="${cx - 11}" y="${yy(x.dn)}" width="10" height="${yy(0) - yy(x.dn)}" rx="2" class="dn"><title>${dmy(x.d)} download ${gb(x.dn)}</title></rect>
                  <rect x="${cx + 1}" y="${yy(x.up)}" width="10" height="${yy(0) - yy(x.up)}" rx="2" class="up"><title>${dmy(x.d)} upload ${gb(x.up)}</title></rect>
                  <text x="${cx}" y="${H - 8}" class="ax" text-anchor="middle">${p2(x.d.getDate())}</text>`;
              }).join("")}
            </svg>
            <div class="ctv-leg"><span><i class="dn"></i>Download</span><span><i class="up"></i>Upload</span><span class="u">Data in GB · Date</span></div>
          </figure>`;
      };
      // Month picker (Nov - 2026): a transparent native month input over the button
      const picker = () => `
        <div class="ctv-month-row"><label class="ctv-month">${I.calendar}<span>${MON[m]} - ${y}</span>
          <input type="month" id="sesM" value="${y}-${p2(m + 1)}" max="${now.getFullYear()}-${p2(now.getMonth() + 1)}" aria-label="Choose month" /></label></div>`;
      const donut = (up, dn) => {
        const C = 2 * Math.PI * 70, f = up + dn ? up / (up + dn) : 0;
        return `
          <figure class="lco-card ctv-donut">
            <svg viewBox="0 0 200 200" role="img" aria-label="Upload ${mbFmt(up)}, download ${mbFmt(dn)}">
              <circle cx="100" cy="100" r="70" class="dn" /><circle cx="100" cy="100" r="70" class="up" stroke-dasharray="${(f * C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 100 100)" />
              <text x="100" y="96" text-anchor="middle" class="dv">${mbFmt(up + dn)}</text><text x="100" y="114" text-anchor="middle" class="dl">${MON[m]} ${y}</text>
            </svg>
            <div class="ctv-leg"><span><i class="up"></i>Total Upload Data</span><span><i class="dn"></i>Total Download Data</span></div>
          </figure>`;
      };
      const table = () => {
        const groups = ctvSessions(y, m);
        let first = true;
        return groups.map((g) => `<p class="ses-day">${dFmt(g.day)}</p>` + g.list.map((x) => {
          const open = first; first = false;
          return `
            <div class="lco-card ses${open ? " open" : ""}">
              <button class="ses-h" aria-expanded="${open}">${I.swapv}<span><b>${mbFmt(x.up + x.dn)}</b><small>${durFmt(x.mins)}</small></span>${I.chev}</button>
              <div class="ses-b">
                <span><small>Session Start</small>${tFmt(x.start)}</span><span><small>Session end</small>${x.mins ? tFmt(x.end) : "—"}</span>
                <span class="io">${I.up}${mbFmt(x.up)}</span><span class="io">${I.down}${mbFmt(x.dn)}</span>
                <span class="w"><small>Nas Port Id</small>${x.nas}</span>
              </div>
            </div>`;
        }).join("")).join("") || ctvEmpty("No sessions in this month");
      };
      const views = {
        week: () => chart() + totals(sum("up") * 1024, sum("dn") * 1024),
        total: () => { const t = ctvMonthTotals(y, m); return picker() + (t.up + t.dn ? donut(t.up, t.dn) : ctvEmpty("No data used in this month")) + totals(t.up, t.dn); },
        table: () => picker() + table(),
      };
      const draw = (k) => {
        cur = k;
        box.innerHTML = views[k]();
        const mi = $("#sesM", box);
        if (mi) {
          mi.addEventListener("click", () => { try { mi.showPicker(); } catch (e) { /* older browsers open it themselves */ } });
          mi.addEventListener("change", () => { const [a, b] = mi.value.split("-").map(Number); if (a && b) { y = a; m = b - 1; draw(cur); } });
        }
        $$(".ses-h", box).forEach((b) => b.addEventListener("click", () => {
          const c = b.closest(".ses"), open = c.classList.toggle("open");
          b.setAttribute("aria-expanded", open);
        }));
      };
      bindCtvTabs(root, draw);
      draw("week");
      ctvBind(root, "", true);
      return root;
    },

    /* ---- Self-care: Dashboard My Device "More Details" → Udm (device detail + Overview / clients / Wi-Fi / LAN / WAN / diagnostics) ---- */
    ctvUdm() {
      const root = ctvShell("ctv-udm", "Udm", { sub: true });
      const box = $("#cx", root);
      const T = [["overview", "Overview"], ["clients", "Connected Devices"], ["wifi", "Wi-Fi"], ["lan", "LAN"], ["wan", "WAN"], ["ping", "Ping Diagnostic"], ["trace", "Trace Route Diagnostic"], ["aw", "Available Wi-Fi"]];
      let tab = "overview";
      const kv = (pairs) => `<div class="udm-kv">${pairs.map(([k, v]) => `<span><small>${k}</small><b>${esc(String(v))}</b></span>`).join("")}</div>`;
      const upFmt = (ms) => { const n = Math.floor(ms / 6e4); return `${Math.floor(n / 1440)} Days, ${Math.floor((n % 1440) / 60)} Hours, ${n % 60} Minute`; };
      const day = (t) => `${new Date(t).toLocaleDateString("en-GB", { weekday: "long" })}, ${dFmt(new Date(t))}`;
      // Sub-tabs, filters and pages inside a tab (kept while switching devices)
      const sub = { cl: "wifi", clf: "all", clp: 0, wf: "on", aw: "table" };
      let ping = null, trace = null, scan = null;   // diagnostic results (null = not run yet)
      const subTabs = (key, list) => `<div class="udm-sub" role="tablist">${list.map(([k, l]) => `<button role="tab" data-sub="${key}:${k}" class="${sub[key] === k ? "on" : ""}">${l}</button>`).join("")}</div>`;
      const pager = (key, page, n, per) => `<div class="udm-pg"><span>${n ? `${page * per + 1}–${Math.min(n, (page + 1) * per)} of ${n}` : "0 of 0"}</span>
        <button data-pg="${key}:-1" aria-label="Previous page"${page ? "" : " disabled"}>${I.back}</button><button data-pg="${key}:1" aria-label="Next page"${(page + 1) * per < n ? "" : " disabled"}>${I.chev}</button></div>`;
      const runHead = (title) => `<div class="udm-rh"><b>${title}</b><button class="btn" data-act="u-run">Run Diagnostic</button></div>`;
      const views = {
        overview: (d) => `
          <div class="lco-card udm-c"><p class="udm-up">Updated: Today - ${dFmt(new Date(d.synced))} ${hmFmt(new Date(d.synced))}</p>
            ${kv([["Up Time", upFmt(Date.now() - d.on)], ["Last Switched On Time", day(d.on)], ["Tx Power", d.tx], ["Rx Power", d.rx]])}</div>
          <div class="udm-acts">
            <div class="lco-card"><b>Refresh Device</b><small>Click Refresh to synchronize the device</small><button class="btn" data-act="u-ref">Refresh</button></div>
            <div class="lco-card"><b>Reboot Device</b><small>Click Reboot to restart the device</small><button class="btn" data-act="u-reb">Reboot</button></div>
          </div>`,
        // Connected Devices: All / Active / Inactive, Wi-Fi / LAN, 5 per page, Block / Unblock
        clients: (d) => {
          const all = d.clients.filter((c) => c.lan === (sub.cl === "lan") && (sub.clf === "all" || (sub.clf === "on") === c.on));
          const page = Math.min(sub.clp, Math.max(0, Math.ceil(all.length / 5) - 1));
          return `
            <div class="lco-card udm-c">
              <div class="udm-rh"><b>Connected Devices :</b><select class="ctv-sel" id="clF" aria-label="Filter devices">${[["all", "All"], ["on", "Active"], ["off", "Inactive"]].map(([k, l]) => `<option value="${k}"${sub.clf === k ? " selected" : ""}>${l}</option>`).join("")}</select></div>
              ${subTabs("cl", [["wifi", "Wi-Fi"], ["lan", "LAN"]])}
              ${all.slice(page * 5, page * 5 + 5).map((c) => `
                <div class="udm-row${c.blocked ? " blk" : ""}">
                  <div class="udm-rt"><i class="udm-dot${c.on && !c.blocked ? " on" : ""}"></i><b>${esc(c.host)}</b>
                    <button class="udm-blk" data-blk="${d.clients.indexOf(c)}">${c.blocked ? "Unblock" : "Block"}</button></div>
                  <div class="udm-rk"><span><small>IP Address</small>${c.ip}</span><span><small>Mac Address</small>${c.mac}</span>
                    ${c.lan ? "" : `<span><small>SSID</small>${esc(c.ssid)}</span>`}<span><small>Sent / Received</small>${mbFmt(c.sent)} / ${mbFmt(c.recv)}</span></div>
                </div>`).join("") || ctvEmpty("No devices for this filter")}
              ${pager("clp", page, all.length, 5)}
            </div>`;
        },
        // Wi-Fi: Active / InActive SSIDs with Change Password
        wifi: (d) => {
          const list = d.wifi.filter((w) => w.on === (sub.wf === "on"));
          return `
            <div class="lco-card udm-c">${subTabs("wf", [["on", "Active"], ["off", "InActive"]])}
              ${list.map((w) => `
                <div class="udm-row udm-wf"><span><small>${w.name}</small><b>${esc(w.ssid)}</b></span>
                  ${w.on ? `<button class="udm-cp" data-wf="${d.wifi.indexOf(w)}">${I.wifi}Change Password</button>` : `<button class="udm-blk" data-wfon="${d.wifi.indexOf(w)}">Enable</button>`}</div>`).join("") || ctvEmpty("No SSIDs here")}
              ${pager("wfp", 0, list.length, 5)}
            </div>`;
        },
        lan: () => `
          <div class="lco-card udm-c"><b class="udm-t">LAN</b>
            ${["LAN - 0", "LAN - 1"].map((n, j) => `<div class="udm-row">${kv([["Name", n], ["MAC Address", `0E:40:A9:00:0${j}:43`], ["Maximum Bit Rate", "Auto"], ["Duplex Mode", "Auto"]])}</div>`).join("")}
            ${pager("lanp", 0, 2, 5)}</div>`,
        wan: (d) => `
          <div class="lco-card udm-c"><b class="udm-t">WAN</b>
            <div class="udm-row">${kv([["Name", "1_TR069_INTERNET_R_VID_100"], ["Type", "IPOE"], ["Conn Type", "IP_Routed"], ["Address Type", "Static"],
              ["External Address", d.ip], ["Sent / Received", `${mbFmt(73.65)} / ${mbFmt(111.25)}`]])}
              <div class="udm-st"><span><i class="udm-dot on"></i>Status: Up</span><span><i class="udm-dot on"></i>Enabled</span></div></div>
            ${pager("wanp", 0, 1, 5)}</div>`,
        ping: () => `
          <div class="lco-card udm-c">${runHead("Ping Diagnostic")}
            ${kv([["Host IP Address", ping ? ping.host : "—"], ["Failure Count", ping ? 0 : 0], ["Packet Size (bytes)", 56], ["Success Count", ping ? 4 : 0],
              ["Number of Repetitions", 4], ["Minimum Response Time", ping ? ping.min + " ms" : 0], ["Diagnostics State", ping ? "Complete" : "None"],
              ["Average Response Time", ping ? ping.avg + " ms" : 0], ["DSCP", 0], ["Maximum Response Time", ping ? ping.max + " ms" : 0], ["Wan Interface", ping ? "1_TR069_INTERNET_R_VID_100" : "—"]])}</div>`,
        trace: () => `
          <div class="lco-card udm-c">${runHead("Trace Route Diagnostic")}
            ${kv([["Host IP Address", trace ? trace.host : "0.0.0.0"], ["IP Address Used", trace ? "100.64.126.178" : "—"], ["Packet Size (bytes)", 38],
              ["Diagnostics State", trace ? "Complete" : "None"], ["Number of Tries", trace ? 3 : 0], ["Response Time", trace ? "14 ms" : 0],
              ["Timeout (ms)", 4999], ["Route Hops", trace ? trace.hops.length : 0], ["Max TTL", 29], ["Wan Interface", trace ? "1_TR069_INTERNET_R_VID_100" : "—"]])}
            ${trace ? `<div class="udm-hops">${trace.hops.map((h, j) => `<span><b>${j + 1}</b>${h[0]}<em>${h[1]} ms</em></span>`).join("")}</div>` : ""}</div>`,
        // Available Wi-Fi: neighbouring networks by band
        aw: () => {
          const BANDS = [["table", "Table View"], ["24", "2.4 GHZ"], ["5l", "5 GHZ CH 34-64"], ["5h", "5 GHZ CH 100-165"]];
          const list = (scan || []).filter((n) => sub.aw === "table" || n.band === sub.aw);
          return `
            <div class="lco-card udm-c">${runHead("Neighboring WiFi Diagnostic")}
              ${subTabs("aw", BANDS)}
              ${scan ? list.map((n) => `
                <div class="udm-row udm-aw"><b>${esc(n.ssid)}</b>
                  <div class="udm-rk"><span><small>Channel</small>${n.ch}</span><span><small>Frequency</small>${n.band === "24" ? "2.4 GHz" : "5 GHz"}</span>
                    <span><small>Signal Strength</small>${n.sig} dBm</span><span><small>Width</small>${n.w} MHz</span></div></div>`).join("") || ctvEmpty("No networks on this band")
              : ctvEmpty("Tap Run Diagnostic to scan nearby Wi-Fi networks")}
            </div>`;
        },
      };
      const bindBody = (d) => {
        const body = $("#udBody", root);
        const on = (a, fn) => { const b = $(`[data-act="${a}"]`, body); if (b) b.addEventListener("click", fn); };
        on("u-ref", async () => { showLoader("Synchronizing device…"); await wait(1200); hideLoader(); d.synced = Date.now(); drawBody(); toast("Device details refreshed (demo)", "success"); });
        on("u-reb", () => openSheet(`
          <h3>Reboot ${esc(d.name)}?</h3><p>The internet connection will drop for about 2 minutes.</p>
          <div class="lco-btn2"><button class="btn ghost" id="rbX">Cancel</button><button class="btn" id="rbOk">Reboot</button></div>`, (sh) => {
          $("#rbX", sh).addEventListener("click", closeSheet);
          $("#rbOk", sh).addEventListener("click", async () => { closeSheet(); showLoader("Sending reboot command…"); await wait(1400); hideLoader(); d.on = Date.now(); d.synced = Date.now(); drawBody(); toast("Reboot command sent (demo)", "success"); });
        }));
        on("u-run", async () => {
          showLoader("Running diagnostic…"); await wait(1300); hideLoader();
          if (tab === "ping") ping = { host: "100.64.0.10", min: 11, avg: 12.5, max: 15 };
          else if (tab === "trace") trace = { host: "100.64.0.10", hops: [["192.168.1.1", 1.2], ["100.64.0.1", 4.8], ["10.10.4.1", 8.1], ["10.20.0.17", 11.6], ["100.64.0.10", 14.0]] };
          else scan = [["SITI_Neighbour_A", "24", 1, -48, 20], ["HomeNet-2G", "24", 6, -61, 20], ["Cafe_Free", "24", 11, -74, 40],
            ["SITI_Neighbour_A 5G", "5l", 36, -55, 80], ["Flat-3B_5G", "5l", 48, -68, 80], ["Office-Mesh", "5h", 149, -71, 80]].map(([ssid, band, ch, sig, w]) => ({ ssid, band, ch, sig, w }));
          drawBody(); toast("Diagnostic complete (demo)", "success");
        });
        $$("[data-sub]", body).forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.sub.split(":"); sub[k] = v; if (k === "cl") sub.clp = 0; drawBody(); }));
        $$("[data-pg]", body).forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.pg.split(":"); if (k in sub) { sub[k] += +v; drawBody(); } }));
        const f = $("#clF", body);
        if (f) f.addEventListener("change", () => { sub.clf = f.value; sub.clp = 0; drawBody(); });
        $$("[data-blk]", body).forEach((b) => b.addEventListener("click", () => {
          const c = d.clients[+b.dataset.blk];
          const go = () => { c.blocked = !c.blocked; drawBody(); toast(`${c.host} ${c.blocked ? "blocked" : "unblocked"} (demo)`, "success"); };
          if (c.blocked) return go();
          openSheet(`<h3>Block ${esc(c.host)}?</h3><p>This device will lose internet access until you unblock it.</p>
            <div class="lco-btn2"><button class="btn ghost" id="bkX">Cancel</button><button class="btn" id="bkOk">Block</button></div>`, (sh) => {
            $("#bkX", sh).addEventListener("click", closeSheet);
            $("#bkOk", sh).addEventListener("click", () => { closeSheet(); go(); });
          });
        }));
        $$("[data-wfon]", body).forEach((b) => b.addEventListener("click", () => { d.wifi[+b.dataset.wfon].on = true; sub.wf = "on"; drawBody(); toast("SSID enabled (demo)", "success"); }));
        $$("[data-wf]", body).forEach((b) => b.addEventListener("click", () => {
          const w = d.wifi[+b.dataset.wf];
          openSheet(`
            <h3>Change Password</h3><p>${esc(w.ssid)}</p>
            <label class="lco-fl"><small>New password (min 8 characters)</small><input id="wfP" type="password" maxlength="63" /></label>
            <label class="lco-fl"><small>Confirm password</small><input id="wfC" type="password" maxlength="63" /></label>
            <p class="hint err" id="wfE"></p>
            <div class="lco-btn2"><button class="btn ghost" id="wfX">Cancel</button><button class="btn" id="wfOk">Save</button></div>`, (sh) => {
            $("#wfX", sh).addEventListener("click", closeSheet);
            $("#wfOk", sh).addEventListener("click", async () => {
              const p = $("#wfP", sh).value, c = $("#wfC", sh).value;
              const err = p.length < 8 ? "Password must be at least 8 characters" : p !== c ? "Passwords don't match" : "";
              if (err) { $("#wfE", sh).textContent = err; return; }
              closeSheet(); showLoader("Updating Wi-Fi…"); await wait(1200); hideLoader();
              toast(`Password changed for ${w.ssid} (demo)`, "success");
            });
          });
        }));
      };
      const drawBody = () => { const d = ctvDev(); $("#udBody", root).innerHTML = views[tab](d); bindBody(d); };
      const draw = () => {
        const d = ctvDev();
        box.innerHTML = `
          <div class="udm-top"><b>My Device</b><label>device :<select class="ctv-sel" id="udSel" aria-label="Device">${CTV_DEV.map((x, j) => `<option value="${j}"${x === d ? " selected" : ""}>${x.name}</option>`).join("")}</select></label></div>
          <div class="lco-card udm-c"><b class="udm-t">Device Detail</b>
            ${kv([["Hostname/IP", d.ip], ["MAC Address", d.mac], ["Operational Status", "ONLINE"], ["Model", d.model], ["Brand", d.brand], ["Serial Number", d.serial]])}</div>
          <div class="ctv-tabs udm-tabs" role="tablist">${T.map(([k, l]) => `<button role="tab" data-ut="${k}" class="${k === tab ? "on" : ""}" aria-selected="${k === tab}">${l}</button>`).join("")}</div>
          <div id="udBody"></div>`;
        $("#udSel", box).addEventListener("change", (e) => { state.ctvDev = +e.target.value; draw(); });
        $$("[data-ut]", box).forEach((b) => b.addEventListener("click", () => {
          tab = b.dataset.ut;
          $$("[data-ut]", box).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
          b.scrollIntoView({ block: "nearest", inline: "nearest" });
          drawBody();
        }));
        drawBody();
      };
      draw();
      ctvBind(root, "", true);
      return root;
    },

    /* ---- See All for one genre ---- */
    genre({ key, lts = false }) {
      const g = GENRES.find((x) => x.key === key);
      const list = lts ? linearChannels().filter((c) => c.genre === key).sort(chSort) : filtered(g);
      const root = el(`
        <section class="tv${lts ? " lts" : ""}" data-screen="genre-${key}">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2><span class="sec-ic">${g.icon}</span>${g.name} (${allowedCh() || hasCableTv() ? list.length : g.count})</h2>
          </header>
          <div class="ch-grid">${list.map((c) => cardHTML(c, true)).join("")}</div>
          ${lts ? "" : `<p class="more-note">Showing ${list.length} of ${g.count} channels in this demo</p>`}
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
      const next = CHANNELS.filter((x) => x.genre === c.genre && x.id !== id && canWatch(x));
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
      const label = { guest: "Other User", cable: "Cable TV User", broadband: "Broadband User", lco: "LCO Partner" }[type];
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
            <button class="danger" data-act="logout">${I.logout}${type === "guest" ? "Exit guest mode" : "Logout"}</button>
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $('[data-act="logout"]', root).addEventListener("click", async () => {
        showLoader("Signing out…");
        await wait(700);
        hideLoader();
        state.session = null;
        Object.assign(state.filter, { genre: null, lang: null, q: "", genres: null, langs: null });
        reset("role", { first: true });
        toast("Signed out", "success");
      });
      return root;
    },

    /* =====================================================================
       Customer / guest Live TV (same TV as LCO Watch OTT, without the LCO bottom bar)
       Home ☰ → OTT ─► ottHome      Home ☰ → Profile ─► custProfile ─► ottSubscribe / manageDevice
       ===================================================================== */
    ottHome() {
      const f = state.filter;
      const lco = (state.session || {}).type === "lco";        // opened from LCO Watch OTT
      // Same fixed bottom bar rule as the Live TV Home: Broadband customer and Broadband LCO (not Cable TV)
      const bar = !hasCableTv() && (lco || (state.session || {}).type === "broadband");
      const slides = OTT_TITLES.slice(0, 6);
      // Genre / Language (same preferences as the TV): titles map Kids → kids, Documentary → infotainment, others → movies / entertainment
      const tGenres = (t) => (t[2] === "Kids" ? ["kids"] : t[2] === "Documentary" ? ["infotainment"] : ["movies", "entertainment"]);
      const titleOn = (t) => (!f.langs || f.langs.includes(t[1])) && (!f.genres || tGenres(t).some((g) => f.genres.includes(g)));
      // OTT content only (no live TV channels). Rails alternate square / landscape / portrait like the TV Home.
      const poster = (t, j) => `<button class="otth-po" data-title="${j}" style="background:${grad(t[3], 160)}"><b>${esc(t[0])}</b><small>${t[1]} · ${t[2]}</small></button>`;
      const wide = (t, j) => `<button class="otth-wide" data-title="${j}" style="background:${grad(t[3], 120)}"><b>${esc(t[0])}</b><small>${t[1]} · ${t[2]}</small></button>`;
      const inPlan = (j) => !!CUST.ottPlan && j < CUST.ottPlan.plan.apps;
      const appTile = ([n, c], j) => `
        <button class="pop-ch" data-app="${j}" aria-label="${esc(n)}">
          <span class="pop-tile" style="background:${grad(c)}"><span class="ott-logo"><b>${esc(n.split(" ").map((w) => w[0]).join(""))}</b><small>${esc(n)}</small></span>
            ${inPlan(j) ? "" : `<span class="pop-lock" title="Subscribe to watch">${I.lock}</span>`}</span>
          <span class="pop-name">${esc(n)}</span>
        </button>`;
      const rail = (title, body, cls = "") => `
        <div class="sec"><div class="sec-head"><h4>${title}</h4></div>
          <div class="rail${cls}">${body}</div></div>`;
      const bodyHTML = () => {
        const popCh = getPopularChannels();   // same Popular Channels rail as the Live TV Home (follows Genre / Language)
        const recent = (state.recentOtt || []).filter((j) => titleOn(OTT_TITLES[j])).map((j) => [OTT_TITLES[j], j]);
        const titles = OTT_TITLES.map((t, j) => [t, j]).filter(([t]) => titleOn(t));
        const bengali = titles.filter(([t]) => t[1] === "Bengali");
        const others = titles.filter(([t]) => t[1] !== "Bengali");
        const html = [
          rail(`<span class="sec-ic">${I.fire}</span>Popular OTT`, OTT_APPS.map(appTile).join(""), " pop-rail"),
          popCh.length ? `<div class="sec sec-pop"><div class="sec-head"><h4><span class="sec-ic">${I.tv}</span>Popular Channels</h4>
            <button class="see-all" data-act="pop-all">See All ${I.chev}</button></div>
            <div class="rail pop-rail">${popCh.map((c) => popCardHTML(c)).join("")}</div></div>` : "",
          recent.length ? rail("Continue Watching", recent.map(([t, j]) => wide(t, j)).join("")) : "",
          bengali.length ? rail("Bengali Hits", bengali.map(([t, j]) => poster(t, j)).join(""), " rail-tall") : "",
          others.length ? rail("New Releases", others.map(([t, j]) => wide(t, j)).join("")) : "",
          titles.length ? rail("Trending Now", titles.map(([t, j]) => poster(t, j)).reverse().join(""), " rail-tall") : "",
        ].join("");
        const chips = [f.genres && ["genres", f.genres.length === 1 ? GENRES.find((g) => g.key === f.genres[0]).name : `${f.genres.length} genres`],
          f.langs && ["langs", f.langs.length === 1 ? f.langs[0] : `${f.langs.length} languages`]].filter(Boolean);
        return (chips.length ? `<div class="filters">${chips.map(([k, v]) => `<button class="fchip" data-clear="${k}">${v}${I.close}</button>`).join("")}</div>` : "") +
          (titles.length ? html : html + `<div class="empty">${I.search}<b>Nothing for this selection</b><p>Try another genre or language.</p></div>`);
      };
      const root = el(`
        <section class="screen-fixed tv otth${bar ? " has-bar" : ""}" data-screen="ott-home">
          <div class="tv-scroll">
            <header class="tv-head otth-head">
              <button class="menu-btn" data-act="menu" aria-label="Open menu" aria-expanded="false">${I.menu}</button>
              <div class="brand"><img src="${MARK}" alt="SITI PLAYTOP MAGIC" /></div>
              <button class="menu-btn head-search" data-act="osearch" aria-label="Search movies, shows or apps">${I.search}</button>
            </header>
            <div class="searchbar" id="osb" hidden>${I.search}<input id="oq" type="search" placeholder="Search movies, shows or apps" aria-label="Search OTT" /></div>
            <div id="ores"></div>
            <div class="otth-ban" id="ban">
              ${slides.map((t, j) => `<button class="otth-slide${j ? "" : " on"}" data-title="${j}" style="background:${grad(t[3], 120)}"><small>${esc(OTT_APPS[j][0])} Original</small><b>${esc(t[0])}</b><span>${t[1]} · ${t[2]}</span></button>`).join("")}
              <div class="otth-dots">${slides.map((_, j) => `<i class="${j ? "" : "on"}"></i>`).join("")}</div>
            </div>
            <div id="obody"></div>
          </div>
          ${bar ? ctvNavHTML("ott") : ""}
          <!-- Left slide-in menu (Search stays in the header, like the TV Home) -->
          <div class="drawer" id="drawer" aria-hidden="true">
            <div class="drawer-backdrop" data-close-menu></div>
            <nav class="drawer-panel" aria-label="Menu">
              <div class="drawer-head">
                <div class="brand"><img src="${MARK}" alt="SITI PLAYTOP MAGIC" /></div>
                <button class="drawer-x" data-close-menu aria-label="Close menu">${I.close}</button>
              </div>
              ${lco ? "" : `<button class="gp dr-item" data-act="ositi">${I.crown}<span>SITI Packages</span></button>`}
              <button class="gp dr-item" data-act="live">${I.tv}<span>Live TV</span></button>
              <button class="gp dr-item" data-act="oprofile">${I.userFill}<span>Profile</span></button>
              <i class="dr-sep"></i>
              ${hasCableTv() ? `<button class="gp dr-item" data-act="olts">${I.router}<span>ALTD</span></button>` : ""}
              <button class="gp dr-item" data-act="genre">${I.masks}<span></span></button>
              <button class="gp dr-item" data-act="lang">${I.lang}<span></span></button>
              ${drawerExtrasHTML()}
              <p class="dr-ver">Version ${APP_VERSION}</p>
            </nav>
          </div>
        </section>`);
      const openTitle = (j) => {
        const t = OTT_TITLES[j], app = OTT_APPS[j % OTT_APPS.length][0];
        openSheet(`
          <div class="otth-hero" style="background:${grad(t[3], 140)}"><b>${esc(t[0])}</b></div>
          <div class="lco-inv"><span><small>Language · Genre</small><b>${t[1]} · ${t[2]}</b></span><span><small>Streaming on</small><b>${esc(app)}</b></span>
            <span><small>Your OTT pack</small><b>${CUST.ottPlan ? esc(CUST.ottPlan.plan.name) : "Not subscribed"}</b></span></div>
          <button class="btn" id="tPlay">${I.play} ${CUST.ottPlan ? "Play" : "Subscribe to watch"}</button>
          <button class="btn ghost" id="tX">Close</button>`, (sh) => {
          $("#tX", sh).addEventListener("click", closeSheet);
          $("#tPlay", sh).addEventListener("click", () => {
            if (!CUST.ottPlan) { go("ottSubscribe"); return; }
            closeSheet(); toast(`Playing ${t[0]} (demo)`);
            state.recentOtt = [j, ...(state.recentOtt || []).filter((x) => x !== j)].slice(0, 8);   // → Continue Watching
            draw();
          });
        });
      };
      // Popular OTT tile: opens the app when it's in the OTT pack, else offers the OTT subscription
      const openApp = (j) => {
        const n = OTT_APPS[j][0];
        if (inPlan(j)) { toast(`Opening ${n} (demo)`); return; }
        openSheet(`
          <h3>${esc(n)}</h3>
          <p>${CUST.ottPlan ? `${esc(n)} isn't in your ${esc(CUST.ottPlan.plan.name)} pack.` : "Subscribe to an OTT pack to watch this app."}</p>
          <button class="btn" id="oaSub">See OTT packs</button>
          <button class="btn ghost" id="oaX">Close</button>`, (sh) => {
          $("#oaX", sh).addEventListener("click", closeSheet);
          $("#oaSub", sh).addEventListener("click", () => go("ottSubscribe"));
        });
      };
      const bindTitles = (box) => $$("[data-title]", box).forEach((b) => b.addEventListener("click", () => openTitle(+b.dataset.title)));
      const draw = () => {
        const box = $("#obody", root);
        box.innerHTML = bodyHTML();
        bindTitles(box);
        $$("[data-app]", box).forEach((b) => b.addEventListener("click", () => openApp(+b.dataset.app)));
        bindCards(box);   // Popular Channels → channel page (locked → "Not in your plan")
        $$('[data-act="pop-all"]', box).forEach((b) => b.addEventListener("click", () => go("popularAll")));
        $$("[data-clear]", box).forEach((b) => b.addEventListener("click", () => { f[b.dataset.clear] = null; draw(); }));
        $('[data-act="genre"] span', root).textContent = genreLabel();
        $('[data-act="genre"]', root).classList.toggle("on", !!f.genres);
        $('[data-act="lang"] span', root).textContent = langLabel();
        $('[data-act="lang"]', root).classList.toggle("on", !!f.langs);
        syncMenuDot(root);
      };
      bindTitles($("#ban", root));
      draw();
      // Banner: auto-advance every 3.5 s while this screen is on screen
      let k = 0;
      const tick = setInterval(() => {
        if (!root.isConnected) { clearInterval(tick); return; }
        k = (k + 1) % slides.length;
        $$(".otth-slide", root).forEach((s, j) => s.classList.toggle("on", j === k));
        $$(".otth-dots i", root).forEach((s, j) => s.classList.toggle("on", j === k));
      }, 3500);
      // ☰ menu: every option closes the menu first
      $('[data-act="menu"]', root).addEventListener("click", () => openDrawer(root));
      $$("[data-close-menu]", root).forEach((b) => b.addEventListener("click", closeDrawer));
      $$(".dr-item", root).forEach((b) => b.addEventListener("click", closeDrawer));
      $('[data-act="live"]', root).addEventListener("click", () => setTimeout(back, 200));
      if (hasCableTv()) $('[data-act="olts"]', root).addEventListener("click", () => go("ltsHome"));   // Cable TV: LTS like the Live TV menu
      $('[data-act="oprofile"]', root).addEventListener("click", () => go(lco ? "tvProfile" : "custProfile"));   // LCO: same Profile as its Live TV menu
      if (!lco) $('[data-act="ositi"]', root).addEventListener("click", () => go("chPlans", { siti: true }));
      if (bar) bindCtvNav(root, "ott");
      bindDrawerExtras(root);
      $('[data-act="genre"]', root).addEventListener("click", () => openChipSheet("genre", draw));
      $('[data-act="lang"]', root).addEventListener("click", () => openChipSheet("lang", draw));
      $('[data-act="osearch"]', root).addEventListener("click", (e) => {
        const bar = $("#osb", root);
        bar.hidden = !bar.hidden;
        e.currentTarget.classList.toggle("on", !bar.hidden);
        if (!bar.hidden) $("#oq", root).focus();
        else { $("#oq", root).value = ""; $("#ores", root).innerHTML = ""; $("#obody", root).hidden = false; $("#ban", root).hidden = false; }
      });
      $("#oq", root).addEventListener("input", (e) => {
        const q = e.target.value.trim().toLowerCase(), res = $("#ores", root);
        $("#obody", root).hidden = !!q;
        $("#ban", root).hidden = !!q;
        if (!q) { res.innerHTML = ""; return; }
        const ts = OTT_TITLES.map((t, j) => [t, j]).filter(([t]) => (t[0] + " " + t[1] + " " + t[2]).toLowerCase().includes(q));
        const as = OTT_APPS.map((a, j) => [a, j]).filter(([a]) => a[0].toLowerCase().includes(q));
        res.innerHTML = ts.length || as.length
          ? (as.length ? rail("OTT Apps", as.map(([a, j]) => appTile(a, j)).join(""), " pop-rail") : "") + (ts.length ? rail("Movies &amp; Shows", ts.map(([t, j]) => poster(t, j)).join(""), " rail-tall") : "")
          : `<div class="empty">${I.search}<b>Nothing found</b><p>Try another movie, show or app.</p></div>`;
        bindTitles(res);
        $$("[data-app]", res).forEach((b) => b.addEventListener("click", () => openApp(+b.dataset.app)));
      });
      return root;
    },

    // ☰ → LTS (Cable TV customer / Cable TV LCO): the linear channels of the Cable TV package (SD + HD), laid out like Home:
    // Popular Channels (square tiles), then genre rails alternating portrait / landscape. The top bar stays fixed.
    ltsHome() {
      const p = Plans.get();
      const pack = allowedCh() && p.pack !== null ? CABLE_PACKS[p.pack].name : "All channels";
      let q = "";
      const match = (c) => !q || (c.name + " " + c.show).toLowerCase().includes(q);
      const bodyHTML = () => {
        const mine = linearChannels().filter(match);
        const ids = new Set(mine.map((c) => c.id));
        const pop = chByName(POPULAR_CH.flatMap((n) => [n, n + " HD"])).filter((c) => ids.has(c.id)).sort(chSort);
        let n = 0;
        const rails = GENRES.map((g) => {
          const list = mine.filter((c) => c.genre === g.key).sort(chSort);
          if (!list.length) return "";
          const tall = n++ % 2 === 0;
          const hd = list.filter((c) => c.hd).length;
          return `
            <div class="sec">
              <div class="sec-head">
                <h4><span class="sec-ic">${g.icon}</span>${g.name} (${list.length})${hd ? `<small class="lts-hd">${hd} HD</small>` : ""}</h4>
                <button class="see-all" data-genre="${g.key}">See All ${I.chev}</button>
              </div>
              <div class="rail${tall ? " rail-tall" : ""}">${list.map((c) => cardHTML(c, false, tall)).join("")}</div>
            </div>`;
        }).join("");
        const popHTML = pop.length ? `
          <div class="sec sec-pop">
            <div class="sec-head"><h4><span class="sec-ic">${I.fire}</span>Popular Channels</h4></div>
            <div class="rail pop-rail">${pop.map(popCardHTML).join("")}</div>
          </div>` : "";
        return popHTML + rails || `<div class="empty">${I.search}<b>No channels found</b><p>Try another channel name.</p></div>`;
      };
      const all = linearChannels();
      const root = el(`
        <section class="screen-fixed tv lts" data-screen="lts-home">
          <div class="tv-scroll">
            <div class="lts-top">
              <header class="sub-head lts-head">
                <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
                <div class="lts-t"><h2>ALTD</h2><small>${esc(pack)} · ${all.length} channels · ${all.filter((c) => c.hd).length} HD</small></div>
                <button class="menu-btn head-search" data-act="lsearch" aria-label="Search channels">${I.search}</button>
              </header>
              <div class="searchbar" id="lsb" hidden>${I.search}<input id="lq" type="search" placeholder="Search channels in your pack" aria-label="Search channels" /></div>
            </div>
            <div id="lbody"></div>
          </div>
        </section>`);
      const draw = () => {
        const box = $("#lbody", root);
        box.innerHTML = bodyHTML();
        bindCards(box);
        $$("[data-genre]", box).forEach((b) => b.addEventListener("click", () => go("genre", { key: b.dataset.genre, lts: true })));
      };
      bindCommon(root);
      $('[data-act="lsearch"]', root).addEventListener("click", (e) => {
        const bar = $("#lsb", root);
        bar.hidden = !bar.hidden;
        e.currentTarget.classList.toggle("on", !bar.hidden);
        if (!bar.hidden) $("#lq", root).focus(); else { $("#lq", root).value = ""; q = ""; draw(); }
      });
      $("#lq", root).addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
      draw();
      return root;
    },

    // Home → Popular Channels → See All: every channel as square logo tiles (channels outside the plan show a lock → upgrade)
    popularAll() {
      let q = "";
      const bodyHTML = () => {
        const all = CHANNELS.filter((c) => !q || (c.name + " " + c.show).toLowerCase().includes(q));
        const html = GENRES.map((g) => {
          const list = all.filter((c) => c.genre === g.key).sort((a, b) => chSort(a, b));
          return list.length ? `
            <div class="sec"><div class="sec-head"><h4><span class="sec-ic">${g.icon}</span>${g.name} (${list.length})</h4></div>
              <div class="lts-grid">${list.map(popCardHTML).join("")}</div></div>` : "";
        }).join("");
        return html || `<div class="empty">${I.search}<b>No channels found</b><p>Try another channel name.</p></div>`;
      };
      const mine = myChannels().length;
      const root = el(`
        <section class="screen-fixed tv lts" data-screen="popular-all">
          <div class="tv-scroll">
            <header class="sub-head lts-head">
              <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
              <div class="lts-t"><h2>Popular Channels</h2><small>${CHANNELS.length} channels${mine < CHANNELS.length ? ` · ${mine} in your plan` : ""}</small></div>
              <button class="menu-btn head-search" data-act="psearch" aria-label="Search channels">${I.search}</button>
            </header>
            <div class="searchbar" id="psb" hidden>${I.search}<input id="pq" type="search" placeholder="Search all channels" aria-label="Search channels" /></div>
            <div id="pbody"></div>
          </div>
        </section>`);
      const draw = () => { const box = $("#pbody", root); box.innerHTML = bodyHTML(); bindCards(box); };
      bindCommon(root);
      $('[data-act="psearch"]', root).addEventListener("click", (e) => {
        const bar = $("#psb", root);
        bar.hidden = !bar.hidden;
        e.currentTarget.classList.toggle("on", !bar.hidden);
        if (!bar.hidden) $("#pq", root).focus(); else { $("#pq", root).value = ""; q = ""; draw(); }
      });
      $("#pq", root).addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
      draw();
      return root;
    },

    custProfile() {
      const sess = state.session || {};
      const guest = (sess.type || "guest") === "guest";
      const label = { guest: "Other User", cable: "Cable TV Customer", broadband: "Broadband Customer" }[sess.type] || "Customer";
      const mob = sess.mobile || DEMO_MOBILE;
      const f = state.filter;
      const prefText = (arr, all) => (arr && arr.length ? arr.slice(0, 3).join(", ") + (arr.length > 3 ? ", …" : "") : all);
      const genreNames = () => f.genres && f.genres.map((k) => GENRES.find((g) => g.key === k).name);
      const P = CUST.ottPlan;
      const CP = Plans.get(), mine = myChannels();   // channel plan (null pack = Welcome Free Plan only)
      const last = CUST.purchases[0];
      const root = el(`
        <section class="tv tvpf cpf" data-screen="cust-profile">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Profile</h2>
          </header>
          <div class="tvpf-user"><span class="tvpf-av">${label[0]}</span><span><small>${label}</small><b>${mob}</b></span></div>
          ${vcCardHTML()}
          <h4 class="tvpf-h">Profiles</h4>
          <div class="tvpf-profiles">
            <button class="tvpf-prof on" data-toast="This profile is active"><span class="tvpf-av sm">${label[0]}</span><small>Me</small></button>
            <button class="tvpf-prof add" data-toast="Add Profile (demo)"><span class="tvpf-plus">${I.plus}</span><small>Add Profile</small></button>
          </div>
          <div class="tvpf-upg">
            <div><b>${I.crown}Upgrade to OTT Package</b><small>Unlock more channels &amp; exclusive benefits</small>
              <button class="lco-pill" data-act="upgrade">Upgrade Now</button></div>
            <span class="tvpf-crown">${I.crown}</span>
          </div>
          <div class="tvpf-row"><h4 class="tvpf-h">Other Services</h4><button class="cpf-link" data-act="add-acc">Add Cable / Broadband Account ${I.plus}</button></div>
          <div class="tvpf-svcs one" id="svcs">${accountsHTML()}
          </div>
          <div class="tvpf-row"><h4 class="tvpf-h">Live Channels</h4><button class="lco-pill" data-act="ch-upgrade">${CP.pack === null ? "Upgrade Plan" : "Upgrade Package"}</button></div>
          <div class="cpf-cplan${CP.pack === null ? " free" : ""}">
            ${CP.pack === null
              ? `<span class="cpf-noplan">No active plan</span>
                 <div class="cpf-cplan-h"><b>Welcome Free Plan</b><small>(${mine.length}) Channels Available</small></div>
                 <small class="cpf-cplan-s">Free-to-air channels. Upgrade to watch more.</small>`
              : `<span class="cpf-active">Active</span>
                 <div class="cpf-cplan-h"><b>${esc(CABLE_PACKS[CP.pack].name)}</b><small>(${mine.length}) Channels Available</small></div>
                 <small class="cpf-cplan-s">₹ ${CABLE_PACKS[CP.pack].price}/month · ${CP.at ? "since " + dmy(new Date(CP.at)) : "your current package"} · includes the Welcome Free Plan</small>`}
            <div class="cpf-chs">${mine.slice(0, 8).map((c) => `<button data-ch="${c.id}" style="background:${grad(c.colors)}"><b>${esc(c.name)}</b></button>`).join("")}
              ${mine.length > 8 ? `<button class="more" data-act="all-ch">+${mine.length - 8} more</button>` : ""}</div>
          </div>
          ${P ? `
            <div class="cpf-pack">
              <div class="cpf-pack-h"><b>${esc(P.plan.name)} (${P.plan.apps})</b><small>${dmy(P.expiry)}</small></div>
              <div class="cpf-apps">${planApps(P.plan).map(([n, g]) => `<span><i style="background:${grad(g)}">${I.tv}</i><small>${esc(n)} Available</small></span>`).join("")}</div>
            </div>` : ""}
          <div class="tvpf-row"><h4 class="tvpf-h">Recent Purchase</h4><button class="cpf-link" data-act="purchases">More Detail</button></div>
          <div class="cpf-buy">
            <div><b>${dmy(last.at)}</b><small>${esc(last.id)}</small></div>
            <div class="r"><b>₹ ${last.amount}</b><small>${last.mode} · ${last.status}</small></div>
            <button class="lco-pill" data-act="dl">Download</button>
          </div>
          <h4 class="tvpf-h">Settings</h4>
          <div class="tvpf-set">
            <button data-act="devices"><span class="tvpf-si">${I.device}</span><span><b>Manage Device</b><small>View devices connected to your account</small></span>${I.chev}</button>
            <button data-act="lang-pref"><span class="tvpf-si">${I.lang}</span><span><b>Language Preference</b><small id="lp">${prefText(f.langs, "All languages")}</small></span>${I.chev}</button>
            <button data-act="genre-pref"><span class="tvpf-si">${I.masks}</span><span><b>Genre Preference</b><small id="gp">${prefText(genreNames(), "All genres")}</small></span>${I.chev}</button>
          </div>
          <button class="btn tvpf-out" data-act="logout">${I.logout} ${guest ? "Exit guest mode" : "Log Out"}</button>
          <button class="btn ghost tvpf-del" data-act="delete">Delete Account</button>
          <p class="more-note">v1.0 demo</p>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $('[data-act="upgrade"]', root).addEventListener("click", () => go("ottSubscribe"));
      $('[data-act="ch-upgrade"]', root).addEventListener("click", () => go("chPlans"));
      // Tapping the package card (not its channel tiles) opens the package details
      $(".cpf-cplan", root).addEventListener("click", (e) => { if (!e.target.closest("button")) go("packDetail", { k: CP.pack === null ? "free" : CP.pack }); });
      $$(".cpf-chs [data-ch]", root).forEach((b) => b.addEventListener("click", () => watchTv(+b.dataset.ch)));
      const allCh = $('[data-act="all-ch"]', root);
      if (allCh) allCh.addEventListener("click", () => openSheet(`
        <h3>Your channels (${mine.length})</h3>
        <div class="cpf-chlist">${mine.map((c) => `<button data-c="${c.id}"><i style="background:${grad(c.colors)}"></i><span><b>${esc(c.name)}</b><small>${GENRES.find((g) => g.key === c.genre).name} · ${c.lang}</small></span>${I.chev}</button>`).join("")}</div>
        <button class="btn ghost" id="acX">Close</button>`, (sh) => {
        $("#acX", sh).addEventListener("click", closeSheet);
        $$("[data-c]", sh).forEach((b) => b.addEventListener("click", () => watchTv(+b.dataset.c)));
      }));
      $('[data-act="devices"]', root).addEventListener("click", () => go("manageDevice"));
      // Other Services: linked Cable / Broadband accounts. Tap one to switch to it; "Add" opens the bottom sheet.
      const drawSvcs = () => { $("#svcs", root).innerHTML = accountsHTML(); bindAccounts($("#svcs", root)); };
      bindAccounts($("#svcs", root));
      $('[data-act="add-acc"]', root).addEventListener("click", () => openAddAccount(drawSvcs));
      $('[data-act="purchases"]', root).addEventListener("click", () => openSheet(`
        <h3>Purchases</h3>
        <div class="lco-inv">${CUST.purchases.map((p) => `<span><small>${dmy(p.at)} · ${esc(p.id)} · ${esc(p.what)}</small><b>₹ ${p.amount} · ${p.status}</b></span>`).join("")}</div>
        <span class="demo-tag">Demo purchases</span>
        <button class="btn ghost" id="puX">Close</button>`, (sh) => $("#puX", sh).addEventListener("click", closeSheet)));
      $('[data-act="dl"]', root).addEventListener("click", () => toast("Receipt download (demo)"));
      $('[data-act="lang-pref"]', root).addEventListener("click", () => openChipSheet("lang", () => { $("#lp", root).textContent = prefText(state.filter.langs, "All languages"); }));
      $('[data-act="genre-pref"]', root).addEventListener("click", () => openChipSheet("genre", () => { $("#gp", root).textContent = prefText(genreNames(), "All genres"); }));
      $('[data-act="logout"]', root).addEventListener("click", lcoLogout);   // same sign-out: clears session + TV filters
      $('[data-act="delete"]', root).addEventListener("click", () => toast("Delete Account is disabled in the demo"));
      return root;
    },

    ottSubscribe() {
      const cur = CUST.ottPlan && CUST.ottPlan.plan.name;
      const root = el(`
        <section class="tv osub" data-screen="ott-subscribe">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>OTT Subscription<small>Choose your plan and start watching</small></h2>
          </header>
          ${OTT_PLANS.map((p, j) => `
            <div class="osub-card" style="--c1:${p.colors[0]};--c2:${p.colors[1]}">
              <div class="osub-top">
                <span class="osub-ic">${I.monitor}</span>
                <span class="osub-p"><b>₹ ${p.price}</b><small>${esc(p.name)}</small></span>
                <span class="osub-n">${I.play}${p.apps} OTT${p.apps > 1 ? "s" : ""}</span>
              </div>
              <small class="osub-l">OTT App${p.apps > 1 ? "s" : ""}</small>
              <div class="lco-apps">${planApps(p).map(([n, g]) => `<i title="${n}" style="background:${grad(g)}">${n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</i>`).join("")}</div>
              <button class="osub-go" data-sub="${j}">${p.name === cur ? "Current plan · Renew" : "Subscribe Now"}<span>${ARROW}</span></button>
            </div>`).join("")}
          <p class="more-note">Demo • no real payment</p>
        </section>`);
      bindCommon(root);
      $$("[data-sub]", root).forEach((b) => b.addEventListener("click", () => {
        const p = OTT_PLANS[+b.dataset.sub];
        openSheet(`
          <h3>Subscribe ${esc(p.name)}</h3>
          <div class="lco-inv"><span><small>OTT apps</small><b>${planApps(p).map((a) => a[0]).join(", ")}</b></span><span><small>Validity</small><b>30 days</b></span>
            <span class="tot"><small>Amount</small><b>₹ ${p.price}</b></span></div>
          <div class="lco-btn2"><button class="btn ghost" id="osX">Cancel</button><button class="btn" id="osOk">Pay ₹ ${p.price}</button></div>
          <span class="demo-tag">Demo • no real payment</span>`, (sh) => {
          $("#osX", sh).addEventListener("click", closeSheet);
          // Pay → payment gateway screen; on success it returns here and the plan is activated
          $("#osOk", sh).addEventListener("click", () => startPayment({ amount: p.price, purpose: `OTT Subscription · ${p.name}` }, (pay) => {
            const now = new Date();
            CUST.ottPlan = { plan: p, at: now, expiry: new Date(now.getTime() + 30 * 864e5) };
            CUST.purchases.unshift({ at: now, id: "#" + pay.txn, what: p.name, amount: p.price, mode: `Online · ${pay.method}`, status: "Completed" });
            openSheet(`
              <div class="ok-badge">${I.checkBig}</div>
              <h3>Subscribed</h3>
              <p class="ctv-sheetp"><b>${esc(p.name)}</b> is active till ${dmy(CUST.ottPlan.expiry)}.</p>
              <span class="demo-tag">Demo • no real payment</span>
              <button class="btn" id="osDone">Done</button>`, (s2) => $("#osDone", s2).addEventListener("click", () => { closeSheet(); back(); }));
          }));
        });
      }));
      return root;
    },

    /* ---- Customer / guest: Channel Packages (upgrade the live-TV plan → payment gateway) ---- */
    // Channel packages list. Opened from Profile → Upgrade Package, and from ☰ → SITI Packages ({siti:true}).
    // Top: the viewer's own package card; every card opens the package detail page (purchase is only offered there).
    chPlans({ siti = false } = {}) {
      const cur = siti ? Siti.get() : Plans.get().pack;   // SITI Packages: only a package bought there; Upgrade: null = Welcome Free Plan (guest)
      const gname = (k) => GENRES.find((g) => g.key === k).name;
      const C1 = ["#2fd8ff", "#9b5cff", "#ff7a59", "#43e97b", "#ffb300", "#ff3fd0"];
      const root = el(`
        <section class="tv osub chp" data-screen="${siti ? "siti-packages" : "ch-plans"}">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>${siti ? "SITI Packages" : "Channel Packages"}<small>${siti ? "Your package and all channel packages" : "Upgrade your plan to watch more channels"}</small></h2>
          </header>
          ${siti && cur === null ? "" : `<p class="chp-cap">Your package</p>
          <button class="chp-now chp-mine" data-pd="${cur === null ? "free" : cur}">
            <span class="chp-mine-ic">${I.tv}</span>
            <span class="chp-mine-t">${cur === null
              ? `<b>Welcome Free Plan</b><small>No active plan · ${packChannels(null).length} free channels</small>`
              : `<b>${esc(CABLE_PACKS[cur].name)}</b><small>Active · ₹ ${CABLE_PACKS[cur].price}/month · ${packChannels(cur).length} channels${CABLE_PACKS[cur].hd ? ` · ${packChannels(cur).filter((c) => c.hd).length} HD` : ""}</small>`}</span>
            <span class="chp-mine-go">Details ${I.chev}</span>
          </button>`}
          <p class="chp-cap">All packages</p>
          ${CABLE_PACKS.map((p, k) => {
            const st = packState(k, siti);
            const list = packChannels(k);
            return `
            <div class="osub-card chp-card ${st}" data-pd="${k}" role="button" tabindex="0" style="--c1:${C1[k]};--c2:#3a6bff">
              <div class="osub-top">
                <span class="osub-ic">${I.tv}</span>
                <span class="osub-p"><b>₹ ${p.price}<small class="chp-mo">/month</small></b><small>${esc(p.name)}</small></span>
                <span class="osub-n">${I.tv}${list.length} channels</span>
              </div>
              <div class="chp-g">${["Free channels", ...PACK_GENRES[k].map(gname)].map((n) => `<span>${n}</span>`).join("")}${p.hd ? `<span class="hd">${list.filter((c) => c.hd).length} HD</span>` : ""}${p.ott ? `<span class="hd">${p.ott} OTT apps</span>` : ""}</div>
              <button class="osub-go" data-pd="${k}">${st === "cur" ? "Current plan · View details" : st === "low" ? "Included in your plan · View details" : "View details"}<span>${ARROW}</span></button>
            </div>`;
          }).join("")}
          <p class="more-note">Demo • prices are monthly and fictional</p>
        </section>`);
      bindCommon(root);
      $$("[data-pd]", root).forEach((b) => b.addEventListener("click", (e) => {
        e.stopPropagation();
        const k = b.dataset.pd;
        go("packDetail", { k: k === "free" ? "free" : +k, siti });
      }));
      return root;
    },

    // One package, explorable (ideas from the SITI Android TV app, laid out for a phone):
    // summary → sticky "Browse by category" tabs (with counts, incl. OTT Apps) + language filter + search → channel grid
    // → fixed bottom bar "Package · N channels · M OTT apps · ₹X/month" + Proceed to Pay (SITI Pay gateway).
    // Same view for the viewer's own package (SITI Packages card, Profile package card) and for upgrade packages.
    packDetail({ k = "free", siti = false } = {}) {
      const free = k === "free";
      const p = free ? { name: "Welcome Free Plan", price: 0, hd: 0, ott: 0 } : CABLE_PACKS[k];
      const list = packChannels(free ? null : k);
      const apps = OTT_APPS.slice(0, p.ott || 0);
      const st = free ? (Plans.get().pack === null ? "cur" : "low") : packState(k, siti);
      const hd = list.filter((c) => c.hd).length;
      const genres = GENRES.filter((g) => list.some((c) => c.genre === g.key));
      const langs = [...new Set(list.map((c) => c.lang))].sort((a, b) => list.filter((c) => c.lang === b).length - list.filter((c) => c.lang === a).length);
      let cat = "all", lang = "all", q = "";
      const match = (c) => (lang === "all" || c.lang === lang) && (!q || (c.name + " " + c.show).toLowerCase().includes(q));
      const count = (key) => list.filter((c) => c.genre === key && match(c)).length;
      const grid = (arr) => `<div class="lts-grid">${arr.map(popCardHTML).join("")}</div>`;
      const appGrid = () => `<div class="lts-grid">${apps.filter(([n]) => !q || n.toLowerCase().includes(q)).map(([n, c]) => `
        <button class="pop-ch" data-papp="${esc(n)}" aria-label="${esc(n)}">
          <span class="pop-tile" style="background:${grad(c)}"><span class="ott-logo"><b>${esc(n.split(" ").map((w) => w[0]).join(""))}</b><small>${esc(n)}</small></span></span>
          <span class="pop-name">${esc(n)}</span>
        </button>`).join("")}</div>`;
      const tabsHTML = () => [["all", "All", list.filter(match).length], ...(hd ? [["hd", "HD", list.filter((c) => c.hd && match(c)).length]] : []), ...genres.map((g) => [g.key, g.name, count(g.key)]), ...(apps.length ? [["ott", "OTT Apps", apps.length]] : [])]
        .map(([key, name, n]) => `<button class="pkd-tab${cat === key ? " on" : ""}" data-cat="${key}">${name} <i>${n}</i></button>`).join("");
      const bodyHTML = () => {
        if (cat === "ott") {
          if (!apps.length) return `<div class="empty">${I.monitor}<b>No OTT apps in this package</b><p>Packages with OTT apps show them here.</p></div>`;
          return `<div class="sec"><div class="sec-head"><h4><span class="sec-ic">${I.monitor}</span>OTT apps you get (${apps.length})</h4></div>${appGrid()}</div>`.replace(/<div class="lts-grid"><\/div>/, `<div class="empty">${I.search}<b>No apps found</b></div>`);
        }
        if (cat === "hd" && !hd) return `<div class="empty">${I.tv}<b>No HD channels in this package</b><p>This is an SD-only package.</p></div>`;
        const secs = (cat === "all" || cat === "hd" ? genres : genres.filter((g) => g.key === cat)).map((g) => {
          const gl = list.filter((c) => c.genre === g.key && match(c) && (cat !== "hd" || c.hd)).sort((a, b) => isDD(a) - isDD(b));
          return gl.length ? `<div class="sec"><div class="sec-head"><h4><span class="sec-ic">${g.icon}</span>${g.name} (${gl.length})</h4></div>${grid(gl)}</div>` : "";
        }).join("");
        const ott = cat === "all" && apps.length && !q && lang === "all" ? `<div class="sec"><div class="sec-head"><h4><span class="sec-ic">${I.monitor}</span>OTT Apps (${apps.length})</h4></div>${appGrid()}</div>` : "";
        return secs + ott || `<div class="empty">${I.search}<b>No channels found</b><p>Try another language or name.</p></div>`;
      };
      const root = el(`
        <section class="screen-fixed tv lts pkd" data-screen="pack-detail">
          <div class="tv-scroll">
            <div class="lts-top">
              <header class="sub-head lts-head">
                <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
                <div class="lts-t"><h2>${esc(p.name)}</h2><small>${list.length} TV channels${apps.length ? ` · ${apps.length} OTT apps` : ""}</small></div>
                <button class="menu-btn head-search" data-act="psearch" aria-label="Search this package">${I.search}</button>
              </header>
            </div>
            <div class="pkd-hero">
              <span class="pkd-st ${st}">${st === "cur" ? "Your current package" : st === "low" ? "Included in your plan" : "Available"}</span>
              <b class="pkd-price">${free ? "Free" : `₹ ${p.price}`}${free ? "" : `<small>/month</small>`}</b>
              <div class="pkd-stats">
                <button class="pkd-stat" data-stat="all"><b>${list.length}</b><small>Channels</small></button>
                <button class="pkd-stat" data-stat="hd" aria-label="See HD channels"><b>${hd}</b><small>HD ›</small></button>
                <button class="pkd-stat" data-stat="ott" aria-label="See OTT apps"><b>${apps.length}</b><small>OTT apps ›</small></button>
                <span><b>30</b><small>Days</small></span>
              </div>
            </div>
            <div class="pkd-filters">
              <div class="searchbar" id="pkSb" hidden>${I.search}<input id="pkQ" type="search" placeholder="Search channels in this package" aria-label="Search channels" /></div>
              <p class="pkd-lbl">Browse by category</p>
              <div class="pkd-tabs" id="pkTabs" role="tablist"></div>
              <div class="pkd-langs" role="radiogroup" aria-label="Filter by language">
                <span>Language</span>${["all", ...langs].map((l) => `<button class="pkd-lang${l === "all" ? " on" : ""}" data-lang="${l}">${l === "all" ? "All" : l}</button>`).join("")}
              </div>
            </div>
            <div id="pkBody"></div>
          </div>
          <div class="pkd-bar">
            <div class="pkd-sum"><b>${esc(p.name)}</b><small>${list.length} TV channels${apps.length ? ` · ${apps.length} OTT apps` : ""} · ${free ? "Free" : `₹ ${p.price}/month`}</small></div>
            ${st === "up"
              ? `<button class="btn" id="pkdBuy">Proceed to Pay</button>`
              : `<button class="btn" disabled>${st === "cur" ? "Current" : "Included"}</button>`}
          </div>
        </section>`);
      const draw = () => {
        $("#pkTabs", root).innerHTML = tabsHTML();
        $$("[data-stat]", root).forEach((b) => b.classList.toggle("on", b.dataset.stat === cat && cat !== "all"));
        $$("[data-cat]", root).forEach((b) => b.addEventListener("click", () => { cat = b.dataset.cat; draw(); }));
        const box = $("#pkBody", root);
        box.innerHTML = bodyHTML();
        bindCards(box);
        $$("[data-papp]", box).forEach((b) => b.addEventListener("click", () => toast(`${b.dataset.papp} is included in ${p.name} (demo)`)));
      };
      // Channels / HD / OTT apps boxes: jump to that section of the package (HD channels, OTT apps it includes)
      $$("[data-stat]", root).forEach((b) => b.addEventListener("click", () => {
        cat = b.dataset.stat;
        if (cat !== "all") { lang = "all"; $$("[data-lang]", root).forEach((x) => x.classList.toggle("on", x.dataset.lang === "all")); }
        draw();
        const sc = $(".tv-scroll", root), hero = $(".pkd-hero", root);
        sc.scrollTo({ top: sc.scrollTop + hero.getBoundingClientRect().bottom - sc.getBoundingClientRect().top - $(".lts-top", root).offsetHeight, behavior: "smooth" });
        const t = $(`.pkd-tab[data-cat="${cat}"]`, root);
        if (t) t.scrollIntoView({ block: "nearest", inline: "center" });
      }));
      $$("[data-lang]", root).forEach((b) => b.addEventListener("click", () => {
        lang = b.dataset.lang;
        $$("[data-lang]", root).forEach((x) => x.classList.toggle("on", x === b));
        if (cat === "ott") cat = "all";
        draw();
      }));
      $('[data-act="psearch"]', root).addEventListener("click", (e) => {
        const bar = $("#pkSb", root);
        bar.hidden = !bar.hidden;
        e.currentTarget.classList.toggle("on", !bar.hidden);
        if (!bar.hidden) $("#pkQ", root).focus(); else { $("#pkQ", root).value = ""; q = ""; draw(); }
      });
      $("#pkQ", root).addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
      bindCommon(root);
      const buy = $("#pkdBuy", root);
      if (buy) buy.addEventListener("click", () => buyPack(k, siti));
      // The filters stick right under the fixed top bar
      requestAnimationFrame(() => { const t = $(".lts-top", root); if (t && t.offsetHeight) root.style.setProperty("--pkd-top", t.offsetHeight + "px"); });
      draw();
      return root;
    },

    /* ---- Simulated payment gateway ("SITI Pay", demo). Nothing is charged and nothing leaves the browser ---- */
    payGateway({ amount = 0, purpose = "", order = "" } = {}) {
      const BANKS = ["Demo Bank A", "Demo Bank B", "Demo Co-op Bank", "Demo Rural Bank"];
      const WALLETS = ["SITI Wallet", "Demo Wallet"];
      const M = [["upi", I.bolt, "UPI", "Pay with any UPI app"], ["card", I.card, "Credit / Debit Card", "Demo test card"],
        ["nb", I.home, "Net Banking", "All major banks"], ["wallet", I.wallet, "Wallets", "Pay with a wallet"]];
      const root = el(`
        <section class="screen-fixed pg" data-screen="pay-gateway">
          <header class="pg-top">
            <button class="lco-ic" data-act="pg-cancel" aria-label="Cancel payment">${I.close}</button>
            <span><b>SITI Pay</b><small>${I.lock} Secure checkout · demo</small></span>
          </header>
          <div class="pg-scroll">
            <div class="pg-merch">
              <span class="pg-logo"><img src="${MARK}" alt="SITI PLAYTOP MAGIC" /></span>
              <span><b>SITI PLAYTOP MAGIC</b><small>${esc(purpose)}</small><small>Order ${esc(order)}</small></span>
              <b class="pg-amt">₹ ${money(amount)}</b>
            </div>
            <p class="pg-cap">Choose a payment method</p>
            <div class="pg-methods">
              ${M.map(([k, ic, l, d], j) => `
                <div class="pg-m${j ? "" : " on"}" data-m="${k}">
                  <button class="pg-mh" data-pick="${k}" aria-expanded="${!j}"><span class="pg-mi">${ic}</span><span><b>${l}</b><small>${d}</small></span><i class="pg-radio"></i></button>
                  <div class="pg-mb">${{
                    upi: `<label class="lco-fl" id="wUpi"><small>UPI ID</small><input id="pgUpi" placeholder="yourname@upi" autocomplete="off" /></label>
                          <div class="pg-apps">${["SITI UPI", "Demo Pay", "Any UPI"].map((a) => `<button class="pg-chip" data-upi="${a}">${a}</button>`).join("")}</div>`,
                    card: `<div class="pg-card"><small>Demo test card — no real card is needed</small><b>4111 1111 1111 1111</b><span><span>SITI DEMO USER</span><span>12/30</span></span></div>
                          <label class="lco-fl" id="wCvv"><small>CVV (enter any 3 digits)</small><input id="pgCvv" type="password" inputmode="numeric" maxlength="3" placeholder="•••" /></label>`,
                    nb: `<div class="pg-banks">${BANKS.map((b) => `<button class="pg-chip" data-bank="${b}">${b}</button>`).join("")}</div>`,
                    wallet: `<div class="pg-banks">${WALLETS.map((b) => `<button class="pg-chip" data-wal="${b}">${b}</button>`).join("")}</div>`,
                  }[k]}</div>
                </div>`).join("")}
            </div>
            <p class="hint err pg-err" id="pgErr"></p>
            <p class="pg-note">${I.lock} This is a simulated gateway for the demo. No money is charged and no details are sent anywhere.</p>
          </div>
          <div class="pg-foot"><button class="btn" id="pgPay">Pay ₹ ${money(amount)}</button></div>
          <div class="pg-res" id="pgRes" hidden></div>
        </section>`);
      let method = "upi", pick = { bank: "", wal: "" };
      const err = $("#pgErr", root);
      const setM = (k) => {
        method = k; err.textContent = "";
        $$(".pg-m", root).forEach((m) => { const on = m.dataset.m === k; m.classList.toggle("on", on); $(".pg-mh", m).setAttribute("aria-expanded", on); });
      };
      $$("[data-pick]", root).forEach((b) => b.addEventListener("click", () => setM(b.dataset.pick)));
      $$("[data-upi]", root).forEach((b) => b.addEventListener("click", () => { $("#pgUpi", root).value = "demo@" + b.dataset.upi.toLowerCase().replace(/\s/g, ""); }));
      const chips = (attr, key) => $$(`[data-${attr}]`, root).forEach((b) => b.addEventListener("click", () => {
        $$(`[data-${attr}]`, root).forEach((x) => x.classList.toggle("on", x === b));
        pick[key] = b.dataset[attr];
      }));
      chips("bank", "bank"); chips("wal", "wal");
      $("#pgCvv", root).addEventListener("input", (e) => { e.target.value = e.target.value.replace(/\D/g, ""); });
      const cancel = () => openSheet(`
        <h3>Cancel payment?</h3>
        <p class="ctv-sheetp">Your plan will not be activated.</p>
        <div class="lco-btn2"><button class="btn ghost" id="pcNo">Continue paying</button><button class="btn" id="pcYes">Cancel payment</button></div>`, (sh) => {
        $("#pcNo", sh).addEventListener("click", closeSheet);
        $("#pcYes", sh).addEventListener("click", () => { closeSheet(); PAY.cb = null; back(); toast("Payment cancelled", "error"); });
      });
      $('[data-act="pg-cancel"]', root).addEventListener("click", cancel);
      $("#pgPay", root).addEventListener("click", async () => {
        const fail = (msg, box) => { err.textContent = msg; if (box) shake($(box, root)); };
        let label;
        if (method === "upi") {
          const v = $("#pgUpi", root).value.trim();
          if (!/^[\w.-]{2,}@[a-z]{2,}$/i.test(v)) return fail("Enter a valid UPI ID, e.g. name@upi", "#wUpi");
          label = "UPI";
        } else if (method === "card") {
          if (!/^\d{3}$/.test($("#pgCvv", root).value)) return fail("Enter the 3-digit CVV", "#wCvv");
          label = "Card";
        } else if (method === "nb") {
          if (!pick.bank) return fail("Select a bank");
          label = "Net Banking";
        } else {
          if (!pick.wal) return fail("Select a wallet");
          label = "Wallet";
        }
        err.textContent = "";
        const res = $("#pgRes", root);
        res.hidden = false;
        res.innerHTML = `<div class="loader-ring"></div><b>Processing ₹ ${money(amount)}…</b><small>Please don't press back (demo)</small>`;
        await wait(1500);
        const txn = String(Date.now()).slice(-12);
        res.innerHTML = `<div class="ok-badge">${I.checkBig}</div><b>Payment successful</b><small>₹ ${money(amount)} · ${label}</small><small>Transaction ID ${txn}</small><small class="pg-redir">Redirecting to SITI PLAYTOP MAGIC…</small>`;
        await wait(1400);
        const cb = PAY.cb;
        PAY.cb = null;
        back();
        await wait(450);
        if (cb) cb({ txn, method: label, amount });
      });
      return root;
    },

    manageDevice() {
      const mob = (state.session && state.session.mobile) || DEMO_MOBILE;
      const t = (d) => `${dmy(d)}, ${fmt(d)}`;
      const root = el(`
        <section class="tv mdev" data-screen="manage-device">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Manage Device</h2>
            <button class="lco-ic mdev-qr" data-act="qr" aria-label="Scan QR code">${I.grid}</button>
          </header>
          <div class="mdev-code">
            <label class="field" id="mdW">${I.hash}<input id="mdC" maxlength="8" placeholder="Enter Unique Code" autocomplete="off" /></label>
            <button class="lco-pill" data-act="validate">Validate</button>
          </div>
          <p class="hint" id="mdH">Enter the 6–8 character code shown on your TV</p>
          <span class="mdev-tag">This Device</span>
          <div class="mdev-card this">${I.device}<span><b>${mob}</b><small>This phone (browser)</small><small>${t(CUST.login)}</small></span></div>
          <p class="mdev-h">Other Devices Where You Have Logged In.</p>
          <div id="mdL"></div>
        </section>`);
      bindCommon(root);
      const draw = () => {
        $("#mdL", root).innerHTML = CUST.others.length
          ? CUST.others.map((d, j) => `<div class="mdev-card">${I.tv}<span><b>${mob}</b><small>${esc(d.name)}</small><small>${t(d.at)}</small></span><button class="mdev-out" data-out="${j}">Logout</button></div>`).join("")
          : `<p class="otth-none">No other devices.</p>`;
        $$("[data-out]", root).forEach((b) => b.addEventListener("click", () => {
          const d = CUST.others[+b.dataset.out];
          CUST.others.splice(+b.dataset.out, 1);
          draw();
          toast(`Logged out from ${d.name} (demo)`, "success");
        }));
      };
      draw();
      const inp = $("#mdC", root), h = $("#mdH", root);
      inp.addEventListener("input", () => { inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); });
      $('[data-act="qr"]', root).addEventListener("click", () => toast("Scan the QR code on your TV (demo)"));
      $('[data-act="validate"]', root).addEventListener("click", async () => {
        if (!/^[A-Z0-9]{6,8}$/.test(inp.value)) { h.textContent = "Code must be 6–8 letters/numbers"; h.className = "hint err"; shake($("#mdW", root)); return; }
        showLoader("Validating code…");
        await wait(800);
        hideLoader();
        CUST.others.unshift({ name: `Smart TV (${inp.value})`, at: new Date() });
        inp.value = "";
        h.textContent = "Enter the 6–8 character code shown on your TV"; h.className = "hint";
        draw();
        toast("TV linked to your account (demo)", "success");
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
              <input id="otp" class="otp-in" type="text" inputmode="numeric" maxlength="4" autocomplete="one-time-code" placeholder="Enter 4-digit OTP" aria-label="OTP" />
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
    const refreshDim = () => btn.classList.toggle("dim", step === "id" ? !ex.valid(xin.value) : otp.value.length !== OTP_LEN);

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
      if (otp.value.length !== OTP_LEN) {
        shake(oField);
        oHint.textContent = "Enter the 4-digit OTP"; oHint.className = "hint err";
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
      otp.value = otp.value.replace(/\D/g, "").slice(0, OTP_LEN);
      oField.classList.remove("invalid");
      refreshDim();
      if (otp.value.length === OTP_LEN) verify();   // auto-verify once all digits are in
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
    const B = [["home", I.home, "Home"], ["case", I.ticket, "Case Creation"], ["customer", I.users, "New Customer"], ["menu", I.menu, "Menu"]];
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
      go(t === "case" ? "bbNewCase" : "bbCreateCustomer");   // Case Creation / New Customer open their forms directly
    }));
  }

  // ☰ menu (bottom sheet): Available Plan, Profile, Change Password, Transaction History, Subscriber Report
  function openBbMenu() {
    const P = BB_DATA.partner;
    const M = [
      ["plans", I.news, "Available Plan", "Broadband plans you can sell"],
      ["profile", I.user, "Profile", "Partner account details"],
      ["password", I.lock, "Change Password", "Update your login password"],
      ["txns", I.card, "Transaction History", "Wallet top ups and payments"],
      ["subreport", I.chart, "Subscriber Report", "Active, expired and online customers"],
    ];
    openSheet(`
      <div class="bb-menu bb-menu2">
        <div class="bb-mhead"><span class="lco-av">${P.name[0]}</span><span><b>${esc(P.name)}</b><small>${esc((state.session && state.session.lcoid) || "")} · Broadband</small></span></div>
        <div class="bb-mlist">
          ${M.map(([k, ic, l, d], i) => `<button class="bb-mrow" data-m="${k}"><span class="bb-mic c${i}">${ic}</span><span class="bb-mt"><b>${l}</b><small>${d}</small></span>${I.chev}</button>`).join("")}
        </div>
      </div>`, (sh) => {
      $$("[data-m]", sh).forEach((b) => b.addEventListener("click", () => {
        const m = b.dataset.m;
        if (m === "txns") go("lcoTopUp", { wallet: "bb" });
        else if (m === "plans") go("bbPlans");
        else if (m === "profile") go("bbAccount");
        else if (m === "password") openBbPassword();
        else { closeSheet(); toast("Subscriber Report (demo)"); }
      }));
    });
  }
  // ☰ → Change Password (simulated)
  function openBbPassword() {
    openSheet(`
      <h3>Change Password</h3>
      <div class="lco-form">
        <label class="lco-fl" id="pwO"><small>Current Password *</small><input id="pwOld" type="password" maxlength="30" autocomplete="off" /></label>
        <label class="lco-fl" id="pwN"><small>New Password *</small><input id="pwNew" type="password" maxlength="30" autocomplete="off" /></label>
        <label class="lco-fl" id="pwC"><small>Confirm New Password *</small><input id="pwCon" type="password" maxlength="30" autocomplete="off" /></label>
        <p class="hint">8+ characters with letters and numbers · Demo, nothing is saved</p>
        <p class="hint err" id="pwErr"></p>
      </div>
      <button class="btn" id="pwGo">Update Password</button>
      <button class="btn ghost" id="pwX">Cancel</button>`, (sh) => {
      $("#pwX", sh).addEventListener("click", closeSheet);
      $("#pwGo", sh).addEventListener("click", async () => {
        const o = $("#pwOld", sh).value, n = $("#pwNew", sh).value, c = $("#pwCon", sh).value;
        const fail = (box, msg) => { shake($(box, sh)); $("#pwErr", sh).textContent = msg; };
        if (!o) return fail("#pwO", "Enter your current password");
        if (n.length < 8 || !/[A-Za-z]/.test(n) || !/\d/.test(n)) return fail("#pwN", "Use 8+ characters with letters and numbers");
        if (n === o) return fail("#pwN", "New password must be different");
        if (n !== c) return fail("#pwC", "Passwords do not match");
        closeSheet(); showLoader("Updating password…"); await wait(700); hideLoader();
        toast("Password changed (demo)", "success");
      });
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
        ${c.type ? `<span><small>Type</small><b>${esc(c.type)}</b></span>` : ""}
        <span><small>Category</small><b>${esc(c.cat)}</b></span>
        ${c.remarks ? `<span><small>Remarks</small><b>${esc(c.remarks)}</b></span>` : ""}
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
    closeMini();
    state.session = null;
    state.accounts = null;
    Object.assign(state.filter, { genre: null, lang: null, q: "", genres: null, langs: null });   // Watch OTT TV filters
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
  // Every LCO (Cable TV and Broadband): "Switch Partner" → pick the other dashboard; the same LCO ID stays signed in
  function switchPartner() {
    const cur = (state.session && state.session.service) === "broadband" ? "broadband" : "cable";
    openSheet(`
      <h3>Switch Partner</h3>
      <p>Choose which dashboard to open with LCO ID ${esc((state.session && state.session.lcoid) || "")}.</p>
      <div class="opt-list">
        ${[["cable", I.tv, "Cable TV", "Cable TV LCO dashboard"], ["broadband", I.wifi, "Broadband", "Broadband LCO dashboard"]].map(([k, ic, t, d]) => `
          <button class="opt${k === cur ? " on" : ""}" data-sp="${k}"><span><b>${t}${k === cur ? " · current" : ""}</b><small>${d}</small></span>${k === cur ? I.check : I.chev}</button>`).join("")}
      </div>`, (sh) => {
      $$("[data-sp]", sh).forEach((b) => b.addEventListener("click", () => {
        closeSheet();
        if (b.dataset.sp === cur) return;
        state.session.service = b.dataset.sp;
        reset(lcoHomeName(), {}, "fwd");
        toast(`Switched to ${b.dataset.sp === "broadband" ? "Broadband" : "Cable TV"} partner (demo)`, "success");
      }));
    });
  }
  document.addEventListener("click", (e) => { if (e.target.closest && e.target.closest('[data-act="switch-partner"]')) switchPartner(); });

  // After login the home screen becomes the root, so Back does not return to the login form
  function enterHome() {
    closeSheet();
    reset("home", {}, "fwd");
    // Customers (Cable TV, Broadband, Other Users): the landing channel starts in the mini player for 15 s
    const t = state.session && state.session.type;
    if (["cable", "broadband", "guest"].includes(t)) setTimeout(() => openMini(landingId(), true), 700);   // after Home has slid in
  }

  /* ---------- Mini player (picture-in-picture inside the app) ----------
     1) Landing channel: after a customer signs in, ABP Ananda plays in the mini player with a 15 s countdown.
     2) Any channel page → Minimise: the channel keeps playing in the mini player while the user browses.
     ✕ (top left) closes it; tapping it (or ⤢) opens the normal channel page. */
  const LANDING = "ABP Ananda";
  const LANDING_SRC = "assets/landing-channel.mp4";
  const LANDING_SECS = 15;
  const LIVE_T0 = Date.now();
  const landingId = () => { const c = CHANNELS.find((x) => x.name === LANDING); return c ? c.id : 0; };
  const hasLiveVideo = (c) => !!c && c.name === LANDING;
  const liveVideoHTML = (cls) => `<video class="${cls}" src="${LANDING_SRC}" muted autoplay loop playsinline preload="auto"></video>`;
  // A live channel: every player shows the same moment (mini player ↔ full page continue seamlessly)
  function syncLive(v) {
    const set = () => {
      try { if (v.duration) v.currentTime = ((Date.now() - LIVE_T0) / 1000) % v.duration; } catch (e) { /* ignore */ }
      const p = v.play(); if (p && p.catch) p.catch(() => {});
    };
    if (v.readyState >= 1) set(); else v.addEventListener("loadedmetadata", set, { once: true });
  }
  const PIP = { id: null, landing: false, tick: null, pending: null };
  function closeMini() {
    clearInterval(PIP.tick);
    PIP.tick = null; PIP.id = null; PIP.landing = false;
    const m = $("#mini");
    if (m) { const v = $("video", m); if (v) v.pause(); m.remove(); }
  }
  function openMini(id, landing = false) {
    closeMini();
    const c = CHANNELS[id];
    if (!c || !state.session) return;
    const g = GENRES.find((x) => x.key === c.genre);
    PIP.id = id; PIP.landing = landing;
    const m = el(`
      <div class="mini${landing ? " landing" : ""}" id="mini" role="dialog" aria-label="${esc(c.name)} mini player">
        <div class="mini-head" aria-hidden="true">
          <span class="mini-t"><b>${esc(c.name)}</b><small>LCN ${chNo(c)} | ${g.name} | ${c.lang}</small></span>
        </div>
        <button class="mini-x" data-mini="close" aria-label="Close mini player">${I.close}</button>
        ${landing ? `<span class="mini-timer" role="timer" aria-label="Closes in ${LANDING_SECS} seconds">
          <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17"/><circle class="mini-ring" cx="20" cy="20" r="17" style="animation-duration:${LANDING_SECS}s"/></svg>
          <b id="miniSec">${LANDING_SECS}</b></span>` : ""}
        <div class="mini-body" data-mini="tap" role="button" tabindex="0" aria-label="Show controls for ${esc(c.name)}" style="background:${hasLiveVideo(c) ? "#000" : grad(c.colors)}">
          ${hasLiveVideo(c) ? liveVideoHTML("mini-vid") : `<span class="mini-show"><b>${esc(c.show)}</b><span class="tvc-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></span>`}
          <span class="mini-live"><i></i>LIVE</span>
          <button class="mini-full" data-mini="open" aria-label="Open full player" tabindex="-1">${I.expand}</button>
        </div>
      </div>`);
    $("#device").appendChild(m);
    const v = $(".mini-vid", m);
    if (v) syncLive(v);
    // Tap the video → the full-screen button appears in the middle (hides again after 3 s); tap it → full channel page
    let ctlTimer = null;
    const showCtl = (on) => {
      clearTimeout(ctlTimer);
      m.classList.toggle("ctl", on);
      $(".mini-head", m).setAttribute("aria-hidden", String(!on));
      $(".mini-full", m).tabIndex = on ? 0 : -1;
      if (on) ctlTimer = setTimeout(() => showCtl(false), 3000);
    };
    m.addEventListener("click", (e) => {
      const b = e.target.closest("[data-mini]");
      if (!b) return;
      if (b.dataset.mini === "close") return closeMini();
      if (b.dataset.mini === "tap") return showCtl(!m.classList.contains("ctl"));
      clearTimeout(ctlTimer);
      const wasLanding = PIP.landing;
      closeMini();
      if (wasLanding) go("tvChannel", { id }); else watchTv(id);   // the landing channel is free to open
    });
    $(".mini-body", m).addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showCtl(true); $(".mini-full", m).focus(); } });
    // Slide in only once the picture is ready (video playing, or at most 1.5 s), so it never pops in empty
    let shown = false;
    const reveal = () => {
      if (shown || !m.isConnected) return;
      shown = true;
      void m.offsetWidth;            // commit the start position so the slide-in transition runs
      m.classList.add("show");
      if (landing) startCountdown();
    };
    if (v) { v.addEventListener("playing", reveal, { once: true }); setTimeout(reveal, 1500); }
    else reveal();
    function startCountdown() {
      let left = LANDING_SECS;
      PIP.tick = setInterval(() => {
        left -= 1;
        const sec = $("#miniSec", m);
        if (sec) sec.textContent = Math.max(left, 0);
        if (left > 0) return;
        clearInterval(PIP.tick);
        m.classList.add("bye");
        setTimeout(() => { if (PIP.id === id && PIP.landing) closeMini(); }, 380);
      }, 1000);
    }
    syncMini();
  }
  // Called on every screen change: show it on signed-in screens, hide it while a full player / payment is open
  function syncMini() {
    const top = stack[stack.length - 1];
    if (PIP.pending !== null && top && top.name !== "tvChannel") {   // just minimised a channel page
      const id = PIP.pending;
      PIP.pending = null;
      openMini(id);
      return;
    }
    const m = $("#mini");
    if (!m) return;
    if (!state.session || !top) { closeMini(); return; }
    if (top.name === "tvChannel") { closeMini(); return; }          // a full channel page takes over
    m.hidden = ["payGateway", "player"].includes(top.name);
    const scr = host.lastElementChild;
    m.classList.toggle("up", !!(scr && scr.querySelector(".ctv-nav, .lco-nav, .bb-nav")));
  }

  /* =========================================================
     Live TV guide helpers
     ========================================================= */
  function filtered(g) {
    const { lang, q, langs } = state.filter;
    const ql = q.toLowerCase();
    return CHANNELS.filter((c) => c.genre === g.key && homeCh(c) && (!lang || c.lang === lang) && (!langs || langs.includes(c.lang)) &&
      (!ql || c.name.toLowerCase().includes(ql) || c.show.toLowerCase().includes(ql)))
      .sort((a, b) => chSort(a, b));   // see chSort
  }
  // Genres to show (single Genre pick on the customer Home, multi-select chips on the LCO TV)
  const genreOn = (g) => (!state.filter.genre || g.key === state.filter.genre) && (!state.filter.genres || state.filter.genres.includes(g.key));
  const genreLabel = () => { const f = state.filter; return f.genre ? GENRES.find((g) => g.key === f.genre).name : f.genres ? `Genre (${f.genres.length} selected)` : `Genre (${GENRES.length})`; };
  const langLabel = () => { const f = state.filter; return f.lang || (f.langs ? `Language (${f.langs.length} selected)` : `Language (${LANGUAGES.length})`); };

  function recordRecent(id) {
    state.recent = [id, ...(state.recent || []).filter((x) => x !== id)].slice(0, 10);
    try { localStorage.setItem("spm.recentChannels.v2", JSON.stringify(state.recent)); } catch (e) {}
  }

  function getRecentChannels() {
    if (!state.recent) {
      try {
        const stored = JSON.parse(localStorage.getItem("spm.recentChannels.v2") || "null");
        if (Array.isArray(stored) && stored.length) state.recent = stored;
      } catch (e) {}
    }
    if (!state.recent || !state.recent.length) {
      // Demo seed: big channels first; guests (free plan only) fall back to the free-to-all ones
      state.recent = chByName(["Star Plus", "Star Sports 1", "Aaj Tak", "Sony Max", "Zee Bangla", "Aastha", "Sanskar", "DD National", "DD Sports"])
        .filter((c) => homeCh(c) && canWatch(c)).slice(0, 4).map((c) => c.id);   // only channels the viewer can play
    }
    // DD channels always sit at the end of a rail
    return state.recent.map((id) => CHANNELS[id]).filter(Boolean).sort((a, b) => isDD(a) - isDD(b));
  }

  const POPULAR_CH = ["Star Plus", "Star Sports 1", "Sony Ten 1", "Zee TV", "Colors", "Aaj Tak", "Sony Max", "Star Gold", "Star Jalsha",
    "Zee Bangla", "Sony SAB", "Star Sports 3", "Zee Cinema", "Sony Ten 3", "Cartoon Network", "Discovery", "9XM", "Aastha", "DD National", "DD Sports"];

  function channelLogoHTML(c) {
    if (c.hd) return channelLogoHTML({ ...c, name: c.name.replace(/ HD$/, ""), hd: false }) + `<span class="hd-tag">HD</span>`;
    const n = c.name;
    if (n.startsWith("DD ")) {
      const sub = n.slice(3).toUpperCase();
      return `
        <div class="logo-dd">
          <svg viewBox="0 0 44 44" class="ch-logo-dd">
            <circle cx="22" cy="22" r="4.5" fill="#ffffff" />
            <path d="M8 22c0-6.5 6-12.5 14-12.5 5.5 0 9.5 2.8 11.8 7-2.8-1.7-6-2.3-9.2-1.1-4.6 1.6-7.8 6-7.8 11 0 2 .5 4.1 1.6 5.7C13 30 8 26.2 8 22z" fill="#ff7a18" />
            <path d="M36 22c0 6.5-6 12.5-14 12.5-5.5 0-9.5-2.8-11.8-7 2.8 1.7 6 2.3 9.2 1.1 4.6-1.6 7.8-6 7.8-11 0-2-.5-4.1-1.6-5.7C31 14 36 17.8 36 22z" fill="#2fd8ff" />
          </svg>
          <span class="dd-lbl"><small>DD</small><b>${esc(sub)}</b></span>
        </div>`;
    }
    if (n.startsWith("Star Sports")) {
      const num = n.replace("Star Sports", "").trim() || "1";
      return `
        <div class="logo-star-sports">
          <svg viewBox="0 0 24 24" class="star-ic"><path d="M12 2l2.6 7 7.4.3-5.8 4.7 2 7-6.2-4.3L5.8 21l2-7L2 9.3l7.4-.3z" fill="#ffd700"/></svg>
          <div class="l-txt"><b>STAR</b><small>SPORTS ${esc(num)}</small></div>
        </div>`;
    }
    if (n === "Star Plus") {
      return `
        <div class="logo-star">
          <svg viewBox="0 0 24 24" class="star-ic"><path d="M12 2l2.6 7 7.4.3-5.8 4.7 2 7-6.2-4.3L5.8 21l2-7L2 9.3l7.4-.3z" fill="#ff2a6d"/></svg>
          <div class="l-txt"><b>STAR</b><small>PLUS</small></div>
        </div>`;
    }
    if (n === "Star Gold" || n === "Star Movies" || n === "Star Maa") {
      const sub = n.replace("Star", "").trim().toUpperCase();
      return `
        <div class="logo-star">
          <svg viewBox="0 0 24 24" class="star-ic"><path d="M12 2l2.6 7 7.4.3-5.8 4.7 2 7-6.2-4.3L5.8 21l2-7L2 9.3l7.4-.3z" fill="#ffd700"/></svg>
          <div class="l-txt"><b>STAR</b><small>${esc(sub)}</small></div>
        </div>`;
    }
    if (n.startsWith("Zee")) {
      const sub = n.replace("Zee", "").trim().toUpperCase() || "TV";
      return `
        <div class="logo-zee">
          <span class="zee-circle">Z</span>
          <small>ZEE ${esc(sub)}</small>
        </div>`;
    }
    if (n.startsWith("Colors")) {
      const sub = n.replace("Colors", "").trim() || "";
      return `
        <div class="logo-colors">
          <div class="colors-petals">
            <i style="background:#e1245e"></i>
            <i style="background:#f7971e"></i>
            <i style="background:#00b4db"></i>
            <i style="background:#3ccf8e"></i>
          </div>
          <b class="colors-txt">colors</b>
          ${sub ? `<small class="colors-sub">${esc(sub)}</small>` : ""}
        </div>`;
    }
    if (n === "Aaj Tak") {
      return `
        <div class="logo-aajtak">
          <b>आज</b>
          <i>तक</i>
        </div>`;
    }
    if (n.startsWith("Sony")) {
      const sub = n.replace("Sony", "").trim().toUpperCase() || "TV";
      return `
        <div class="logo-sony">
          <b>SONY</b>
          <small>${esc(sub)}</small>
        </div>`;
    }
    if (n === "NDTV India") {
      return `
        <div class="logo-ndtv">
          <b>NDTV</b>
          <small>INDIA</small>
        </div>`;
    }
    if (n === "Cartoon Network") {
      return `
        <div class="logo-cn">
          <div class="cn-blocks"><span>C</span><span>N</span></div>
          <small>CARTOON</small>
        </div>`;
    }
    if (n === "MTV Beats") {
      return `
        <div class="logo-mtv">
          <div class="mtv-m">M<small>tv</small></div>
          <span class="mtv-beats">BEATS</span>
        </div>`;
    }
    if (n === "Discovery") {
      return `
        <div class="logo-discovery">
          <svg viewBox="0 0 24 24" class="disc-ic"><circle cx="12" cy="12" r="9" fill="none" stroke="#2fd8ff" stroke-width="1.8"/><ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="#2fd8ff" stroke-width="1.3"/><path d="M3 12h18" stroke="#2fd8ff" stroke-width="1.3"/></svg>
          <small>Discovery</small>
        </div>`;
    }
    if (n === "Nat Geo") {
      return `
        <div class="logo-natgeo">
          <span class="ng-border"></span>
          <small>NAT GEO</small>
        </div>`;
    }
    if (n === "Pogo") {
      return `
        <div class="logo-pogo">
          <span class="pogo-txt">POGO</span>
        </div>`;
    }
    if (n === "9XM") {
      return `
        <div class="logo-9xm">
          <b>9X</b><i>M</i>
        </div>`;
    }
    if (n === "Aastha" || n === "Sanskar" || n === "SVBC") {
      return `
        <div class="logo-devo">
          <svg viewBox="0 0 24 24" class="devo-ic"><path d="M12 3c-1.5 2-2.5 3.3-2.5 4.8a2.5 2.5 0 0 0 5 0C14.5 6.3 13.5 5 12 3z"/><path d="M5 14h14l-2 4H7z"/><path d="M12 10.5V14M9 21h6"/></svg>
          <small>${esc(n)}</small>
        </div>`;
    }
    return `
      <div class="logo-generic">
        <b>${chInitials(c)}</b>
        <small>${esc(c.name.split(" ")[0])}</small>
      </div>`;
  }

  function popCardHTML(c) {
    const allowed = canWatch(c);
    return `
      <button class="pop-ch" data-ch="${c.id}" aria-label="${esc(c.name)}">
        <div class="pop-tile" style="background:${grad(c.colors)}">
          <div class="pop-tile-inner">
            ${channelLogoHTML(c)}
          </div>
          ${allowed ? `<span class="pop-live-dot" title="Live"></span>` : `<span class="pop-lock" title="Plan required">${I.lock}</span>`}
        </div>
        <span class="pop-name">${esc(c.name)}</span>
      </button>`;
  }

  function getPopularChannels() {
    const f = state.filter;
    const ql = (f.q || "").toLowerCase();
    // Cable TV users: only what plays on their Home (FTA + TVE); others also see locked channels to upgrade to
    let list = chByName(POPULAR_CH).filter((c) => !hasCableTv() || homeCh(c));

    if (f.genre) list = list.filter((c) => c.genre === f.genre);
    if (f.genres) list = list.filter((c) => f.genres.includes(c.genre));
    if (f.lang) list = list.filter((c) => c.lang === f.lang);
    if (f.langs) list = list.filter((c) => f.langs.includes(c.lang));
    if (ql) list = list.filter((c) => c.name.toLowerCase().includes(ql) || c.show.toLowerCase().includes(ql));

    // Watchable first, then locked ones; DD channels always last
    list.sort((a, b) => chSort(a, b));
    return list;
  }

  // tall = portrait ("vertical") card, used by every other genre rail on Home
  function cardHTML(c, grid = false, tall = false) {
    const sl = slot(c.id), locked = !canWatch(c);   // locked = TVE channel outside the plan → tap opens "Not in your plan"
    return `
      <button class="ch-card${grid ? " in-grid" : ""}${tall ? " tall" : ""}${locked ? " locked" : ""}" data-ch="${c.id}">
        <div class="thumb" style="background:${grad(c.colors)}">
          ${locked ? `<span class="ch-lock" title="Upgrade to watch">${I.lock}</span>` : `<span class="live-badge"><i></i>LIVE</span>`}${c.hd ? `<span class="hd-chip">HD</span>` : ""}
          <b class="prog">${esc(c.show)}</b>
          <span class="prog-bar"><i style="width:${sl.pct}%"></i></span>
        </div>
        <div class="ch-name">${esc(c.name)}</div>
        <div class="ch-meta"><span class="t">${I.clock}${sl.time}</span><span class="lang">${c.lang}</span></div>
      </button>`;
  }

  function guideHTML() {
    const recentList = getRecentChannels().filter((c) => {
      const ql = (state.filter.q || "").toLowerCase();
      if (state.filter.genre && c.genre !== state.filter.genre) return false;
      if (state.filter.genres && !state.filter.genres.includes(c.genre)) return false;
      if (state.filter.lang && c.lang !== state.filter.lang) return false;
      if (state.filter.langs && !state.filter.langs.includes(c.lang)) return false;
      if (ql && !c.name.toLowerCase().includes(ql) && !c.show.toLowerCase().includes(ql)) return false;
      return true;
    });

    const popList = getPopularChannels();

    const recentHTML = recentList.length ? `
      <div class="sec sec-recent">
        <div class="sec-head">
          <h4><span class="sec-ic">${I.history}</span>Recently Watched</h4>
        </div>
        <div class="rail">${recentList.map((c) => cardHTML(c)).join("")}</div>
      </div>` : "";

    const popHTML = popList.length ? `
      <div class="sec sec-pop">
        <div class="sec-head">
          <h4><span class="sec-ic">${I.fire}</span>Popular Channels</h4>
          <button class="see-all" data-act="pop-all">See All ${I.chev}</button>
        </div>
        <div class="rail pop-rail">${popList.map((c) => popCardHTML(c)).join("")}</div>
      </div>` : "";

    // Genre rails alternate: portrait (vertical) cards, then landscape (horizontal), and so on
    let n = 0;
    const genreHTML = GENRES.filter(genreOn).map((g) => {
      const list = filtered(g);
      if (!list.length) return "";
      const tall = n++ % 2 === 0;
      return `
        <div class="sec">
          <div class="sec-head">
            <h4><span class="sec-ic">${g.icon}</span>${g.name} (${allowedCh() || hasCableTv() ? list.length : g.count})</h4>
            <button class="see-all" data-genre="${g.key}">See All ${I.chev}</button>
          </div>
          <div class="rail${tall ? " rail-tall" : ""}">${list.map((c) => cardHTML(c, false, tall)).join("")}</div>
        </div>`;
    }).join("");

    const out = recentHTML + popHTML + genreHTML;
    return out || `<div class="empty">${I.search}<b>No channels found</b><p>Try another genre, language or search term.</p><button class="pill" data-act="reset-filters">Clear filters</button></div>`;
  }

  function filterChips() {
    const f = state.filter, chips = [];
    if (f.genre) chips.push(["genre", GENRES.find((g) => g.key === f.genre).name]);
    if (f.lang) chips.push(["lang", f.lang]);
    if (f.genres) chips.push(["genres", f.genres.length === 1 ? GENRES.find((g) => g.key === f.genres[0]).name : `${f.genres.length} genres`]);
    if (f.langs) chips.push(["langs", f.langs.length === 1 ? f.langs[0] : `${f.langs.length} languages`]);
    if (f.q) chips.push(["q", `“${esc(f.q)}”`]);
    return chips.map(([k, v]) => `<button class="fchip" data-clear="${k}">${v}${I.close}</button>`).join("");
  }

  function refreshHome(root, draw) {
    const f = state.filter;
    $('[data-act="genre"] span', root).textContent = genreLabel();
    $('[data-act="genre"]', root).classList.toggle("on", !!(f.genre || f.genres));
    $('[data-act="lang"] span', root).textContent = langLabel();
    $('[data-act="lang"]', root).classList.toggle("on", !!(f.lang || f.langs));
    draw();
    syncMenuDot(root);
  }

  function bindGuide(root) {
    bindCards(root);
    $$("[data-genre]", root).forEach((b) => b.addEventListener("click", () => go("genre", { key: b.dataset.genre })));
    $$('[data-act="pop-all"]', root).forEach((b) => b.addEventListener("click", () => go("popularAll")));
    const draw = () => { $("#sections", root).innerHTML = guideHTML(); $("#filters", root).innerHTML = filterChips(); bindGuide(root); };
    $$("[data-clear]", root).forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.clear;
      if (k === "q") { state.filter.q = ""; $("#q", root).value = ""; $("#searchbar", root).hidden = true; $('[data-act="search"]', root).classList.remove("on"); }
      else state.filter[k] = null;
      refreshHome(root, draw);
    }));
    const rf = $('[data-act="reset-filters"]', root);
    if (rf) rf.addEventListener("click", () => {
      Object.assign(state.filter, { genre: null, lang: null, q: "", genres: null, langs: null });
      $("#q", root).value = ""; $("#searchbar", root).hidden = true; $('[data-act="search"]', root).classList.remove("on");
      refreshHome(root, draw);
    });
  }

  function bindCards(root, replace = false) {
    // Live TV Home (LCO Watch OTT, customer and guest) and the OTT home open the old app's channel page; elsewhere the normal player
    $$("[data-ch]", root).forEach((b) => b.addEventListener("click", () => {
      if (b.closest(".from-lco, .tvx, .otth, .lts")) watchTv(+b.dataset.ch);
      else playChannel(+b.dataset.ch, replace);
    }));
  }

  // ☰ menu (Home and OTT): FAQ item + "Partner apps" tiles at the bottom (2 on top, 1 centred). Tap → "Opening VZY (demo)"
  function drawerExtrasHTML() {
    return `
      <button class="gp dr-item" data-act="faq">${I.help}<span>FAQ</span></button>
      <div class="dr-pa">
        <b class="dr-pa-h">Partner apps</b>
        <div class="dr-pa-grid">${PARTNER_APPS.map(([n, word, color]) => `
          <button class="pa-app" data-pa="${n}" aria-label="${n}"><span class="pa-tile"><b style="color:${color}">${word}</b></span><small>${n}</small></button>`).join("")}</div>
      </div>`;
  }
  function bindDrawerExtras(root) {
    $('[data-act="faq"]', root).addEventListener("click", () => go("ctvFaq", { app: true }));
    $$(".dr-pa [data-pa]", root).forEach((b) => b.addEventListener("click", () => { closeDrawer(); toast(`Opening ${b.dataset.pa} (demo)`); }));
  }

  // A channel outside the viewer's plan (normally hidden) → offer the upgrade instead of playing it
  function planGate(c) {
    if (canWatch(c)) return false;
    openSheet(`
      <h3>Not in your plan</h3>
      <p>${esc(c.name)} is not included in your current plan. Upgrade to watch it.</p>
      <button class="btn" id="pgUp">See channel packages</button>
      <button class="btn ghost" id="pgNo">Close</button>`, (sh) => {
      $("#pgUp", sh).addEventListener("click", () => go("chPlans"));
      $("#pgNo", sh).addEventListener("click", closeSheet);
    });
    return true;
  }

  // Pay buttons → simulated payment gateway screen. onSuccess({txn, method, amount}) runs after it returns.
  const PAY = { cb: null };
  function startPayment({ amount, purpose }, onSuccess) {
    closeSheet();
    PAY.cb = onSuccess;
    go("payGateway", { amount, purpose, order: "VBO" + String(Date.now()).slice(-8) });
  }
  // Live TV channel page (same for LCO, customer and guest; only channels in the viewer's plan play)
  function watchTv(id) {
    if (planGate(CHANNELS[id])) return;
    recordRecent(id);
    go("tvChannel", { id });
  }

  function playChannel(id, replace = false) {
    if (planGate(CHANNELS[id])) return;
    recordRecent(id);
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

  /* ---------- LCO "Watch OTT" TV helpers (TV Guide, channel page, bottom bar, chip sheets) ---------- */
  const GENRE_DESC = {
    sports: "A sports show covering top events, match previews, expert analysis and highlights from cricket, football and more.",
    entertainment: "Popular family drama with fresh episodes, twists and fan-favourite characters.",
    movies: "Blockbuster movie block with hit films back to back.",
    news: "Live news, headlines and in-depth coverage of the day's top stories.",
    kids: "Cartoons and fun learning shows for kids.",
    music: "Non-stop chart toppers, retro hits and new releases.",
    devotional: "Bhajans, aarti and spiritual discourses.",
    infotainment: "Documentaries about nature, science, travel and history.",
  };
  const chNo = (c) => 700 + c.id;   // demo channel number
  const chInitials = (c) => esc(c.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase());

  // Programme list for one channel: the show on air now (same times as the Home card) plus shows before/after
  function epgFor(c) {
    const { start, end } = slotTimes(c.id);
    const pool = CHANNELS.filter((x) => x.genre === c.genre).map((x) => x.show);
    const pick = (k) => pool[(c.id + k) % pool.length];
    const D = [60, 30, 90, 30, 60, 45];
    const list = [{ title: pick(1), start: new Date(start.getTime() - 60 * 60000), end: start }, { title: c.show, start, end, live: true }];
    let t = end;
    for (let k = 0; k < 8; k++) {
      const e = new Date(t.getTime() + D[(c.id + k) % D.length] * 60000);
      list.push({ title: pick(k + 2), start: t, end: e });
      t = e;
    }
    return list;
  }

  // TV Guide → tap a programme: details + Watch Now (live) / Remind me (later)
  function openProgPopup(c, p) {
    if (!p) return;
    const now = new Date(), g = GENRES.find((x) => x.key === c.genre);
    const live = p.start <= now && p.end > now, past = p.end <= now;
    openSheet(`
      <div class="tvp">
        <h3>${esc(c.name)}</h3>
        <div class="tvp-poster" style="background:${grad(c.colors)}"><b>${esc(p.title)}</b>${live ? `<span class="tvc-live"><i></i>LIVE</span>` : ""}</div>
        <h4>${esc(p.title)}</h4>
        <small>${fmt(p.start)} - ${fmt(p.end)} • ${c.lang}</small>
        <small>${g.name} | ${esc(c.name)} | ${live ? "Live" : past ? "Ended" : "Upcoming"}</small>
        <p>${GENRE_DESC[c.genre]}</p>
        ${live ? `<button class="btn" id="tvpGo">${I.play} Watch Now</button>`
          : past ? `<button class="btn ghost" id="tvpX">Catch-up not available (demo)</button>`
          : `<button class="btn" id="tvpRemind">${I.bell} Remind me</button>`}
      </div>`, (sh) => {
      const go_ = $("#tvpGo", sh), rem = $("#tvpRemind", sh), x = $("#tvpX", sh);
      if (go_) go_.addEventListener("click", () => watchTv(c.id));
      if (rem) rem.addEventListener("click", () => { closeSheet(); toast(`Reminder set for ${p.title} at ${fmt(p.start)} (demo)`, "success"); });
      if (x) x.addEventListener("click", closeSheet);
    });
  }

  // "Choose your Genre / Language" (multi-select chips + Remove All / Select All + Apply)
  function openChipSheet(kind, after) {
    const f = state.filter, isG = kind === "genre";
    const all = isG ? GENRES.map((g) => [g.key, g.name]) : LANGUAGES.map((l) => [l, l]);
    // Genre starts with everything selected; Language starts with none (= all languages)
    const cur = new Set(isG ? (f.genres || (f.genre ? [f.genre] : all.map((a) => a[0]))) : (f.langs || (f.lang ? [f.lang] : [])));
    openSheet(`
      <div class="chip-sheet">
        <h3>${isG ? I.masks : I.lang}Choose your ${isG ? "Genre" : "Language"}</h3>
        <p>We will recommend channels and shows based on your selection.</p>
        <div class="chip-top"><small id="csN"></small><button id="csAll"></button></div>
        <div class="chips">${all.map(([k, l]) => `<button class="chip-o" data-k="${esc(k)}">${esc(l)}</button>`).join("")}</div>
        <button class="btn" id="csApply">Apply</button>
      </div>`, (sh) => {
      const sync = () => {
        $$("[data-k]", sh).forEach((b) => { const on = cur.has(b.dataset.k); b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
        $("#csN", sh).textContent = `${cur.size} selected`;
        $("#csAll", sh).textContent = cur.size ? "Remove All" : "Select All";
      };
      $$("[data-k]", sh).forEach((b) => b.addEventListener("click", () => { cur.has(b.dataset.k) ? cur.delete(b.dataset.k) : cur.add(b.dataset.k); sync(); }));
      $("#csAll", sh).addEventListener("click", () => { if (cur.size) cur.clear(); else all.forEach(([k]) => cur.add(k)); sync(); });
      $("#csApply", sh).addEventListener("click", () => {
        if (isG && !cur.size) { toast("Select at least one genre", "error"); return; }
        const pickd = all.map(([k]) => k).filter((k) => cur.has(k));
        const none = !pickd.length || pickd.length === all.length;   // nothing / everything = no filter
        if (isG) { f.genre = null; f.genres = none ? null : pickd; } else { f.lang = null; f.langs = none ? null : pickd; }
        closeSheet();
        if (after) after();
        toast(`${isG ? "Genre" : "Language"} preference saved (demo)`, "success");
      });
      sync();
    });
  }

  // Demo account shown on the old app's Profile / Dashboard (the logged-in LCO watching TV)
  /* ---------- Channel packages: channel list, state and purchase (Channel Packages, SITI Packages, package detail) ---------- */
  // Channels in package k (null = Welcome Free Plan). SD-only packs (hd: 0) leave out the HD feeds.
  function packChannels(k) {
    if (k === null) return CHANNELS.filter((c) => FREE_CH.has(c.id));
    const sdOnly = !CABLE_PACKS[k].hd;
    return CHANNELS.filter((c) => FREE_CH.has(c.id) || (PACK_GENRES[k].includes(c.genre) && !(sdOnly && c.hd)));
  }
  // "cur" = the viewer's package, "low" = lower (already included), "up" = can be bought
  // siti = SITI Packages: compared with the package bought there (none at first → every package can be bought)
  function packState(k, siti = false) {
    const cur = siti ? Siti.get() : Plans.get().pack;
    return cur === k ? "cur" : cur !== null && k < cur ? "low" : "up";
  }
  // Confirm sheet → SITI Pay (demo) → package active → Done goes back to the packages list
  function buyPack(k, siti = false) {
    const cur = siti ? Siti.get() : Plans.get().pack, p = CABLE_PACKS[k], n = packChannels(k).length;
    const gname = (g) => GENRES.find((x) => x.key === g).name;
    openSheet(`
      <h3>${cur === null ? "Subscribe" : "Upgrade to"} ${esc(p.name)}</h3>
      <div class="lco-inv">
        <span><small>Channels</small><b>${n} channels (${PACK_GENRES[k].map(gname).join(", ")} + free)</b></span>
        ${cur !== null ? `<span><small>Current package</small><b>${esc(CABLE_PACKS[cur].name)}</b></span>` : ""}
        <span><small>Validity</small><b>30 days</b></span>
        <span class="tot"><small>Amount</small><b>₹ ${p.price}</b></span>
      </div>
      <div class="lco-btn2"><button class="btn ghost" id="cpX">Cancel</button><button class="btn" id="cpOk">Pay ₹ ${p.price}</button></div>
      <span class="demo-tag">Demo • no real payment</span>`, (sh) => {
      $("#cpX", sh).addEventListener("click", closeSheet);
      $("#cpOk", sh).addEventListener("click", () => startPayment({ amount: p.price, purpose: `Channel Package · ${p.name}` }, (pay) => {
        if (siti) {
          Siti.set(k);
          const have = Plans.get().pack;
          if (have === null || k > have) Plans.set(k);   // unlock the channels; never downgrade the package they already have
        } else Plans.set(k);
        CUST.purchases.unshift({ at: new Date(), id: "#" + pay.txn, what: p.name, amount: p.price, mode: `Online · ${pay.method}`, status: "Completed" });
        openSheet(`
          <div class="ok-badge">${I.checkBig}</div>
          <h3>${esc(p.name)} is active</h3>
          <p class="ctv-sheetp">You can now watch <b>${n} channels</b>.</p>
          <span class="demo-tag">Demo • no real payment</span>
          <button class="btn" id="cpDone">Done</button>`, (s2) => $("#cpDone", s2).addEventListener("click", () => { closeSheet(); back(); }));
      }));
    });
  }

  /* ---------- Customer Profile → Other Services: linked Cable TV / Broadband accounts (front-end only) ----------
     The signed-in account comes first. Cable TV accounts are added by an 11-digit VC number; Broadband shows a demo
     account (User ID SITIDEMO01) that can be added. Tapping an account switches the app to it. */
  const ACC_LABEL = { cable: "Cable TV Customer", broadband: "Broadband Customer", guest: "Other User" };
  function linkedAccounts() {
    if (!state.accounts) {
      const s = state.session || {};
      const reg = (s.type === "cable" || s.type === "broadband") && Registry.get(s.type, s.mobile);
      const id = s.type === "cable" ? s.vsc || (reg && reg.id) || "" : s.type === "broadband" ? s.bbid || (reg && reg.id) || "" : "";
      state.accounts = [{ type: s.type || "guest", id, mobile: s.mobile || DEMO_MOBILE }];
      state.activeAcc = 0;
    }
    return state.accounts;
  }
  const isActiveAcc = (a) => linkedAccounts()[state.activeAcc] === a;
  function accountsHTML() {
    return linkedAccounts().map((a, i) => {
      const on = isActiveAcc(a);
      const ic = a.type === "cable" ? I.tv : a.type === "broadband" ? I.wifi : I.userFill;
      const idTxt = a.type === "cable" ? `VC No ${a.id || "—"}` : a.type === "broadband" ? `User ID ${a.id || "—"}` : a.mobile;
      return `<button class="tvpf-svc${on ? " on" : ""}" data-acc="${i}"><span class="tvpf-svc-ic">${ic}</span><span><b>${esc(idTxt)}</b><small>${ACC_LABEL[a.type]} · ${esc(a.mobile)}</small></span><i class="tvpf-radio">${I.check}</i></button>`;
    }).join("");
  }
  function bindAccounts(box) {
    $$("[data-acc]", box).forEach((b) => b.addEventListener("click", () => {
      const i = +b.dataset.acc, a = linkedAccounts()[i];
      if (isActiveAcc(a)) { toast(`${ACC_LABEL[a.type]} is active`); return; }
      openSheet(`
        <h3>Switch account?</h3>
        <p>Switch to ${ACC_LABEL[a.type]} ${a.type === "cable" ? "VC No" : a.type === "broadband" ? "User ID" : ""} <b>${esc(a.id || a.mobile)}</b>. Home will show this account's channels.</p>
        <button class="btn" id="swOk">Switch</button>
        <button class="btn ghost" id="swX">Cancel</button>`, (sh) => {
        $("#swX", sh).addEventListener("click", closeSheet);
        $("#swOk", sh).addEventListener("click", async () => {
          closeSheet(); showLoader("Switching account…"); await wait(800); hideLoader();
          state.session = { type: a.type, mobile: a.mobile };
          if (a.type === "cable") state.session.vsc = a.id;
          if (a.type === "broadband") state.session.bbid = a.id;
          state.activeAcc = i;
          state.recent = null;
          reset("home", {}, "fwd");
          toast(`Switched to ${ACC_LABEL[a.type]} (demo)`, "success");
        });
      });
    }));
  }
  // "What is VSC number?" — the TV error message + STB Information page (press info 4 times), VC number marked in yellow
  function vcHelpHTML() {
    const qr = Array.from({ length: 49 }, (_, k) => ((k * 37 + (k >> 2)) % 5 < 2 || [0, 1, 7, 8, 5, 6, 12, 13, 35, 36, 42, 43].includes(k) ? `<rect x="${(k % 7) * 3}" y="${Math.floor(k / 7) * 3}" width="3" height="3"/>` : "")).join("");
    const now = new Date();
    return `
      <div class="vch">
        <div class="vch-tv">
          <div class="vch-tt">Information</div>
          <p class="vch-err">120: This channel is not subscribed - Contact Your Cable Operator!</p>
          <div class="vch-row">
            <dl><dt>Virtual Card</dt><dd><mark>xxx xxxx xxxx - x</mark></dd><dt>Chip ID</dt><dd>xxx xxxx xxxx</dd>
              <dt>STB Number</dt><dd>xxxxxxxxxxxxxxxxxx</dd><dt>LCN</dt><dd>xx</dd></dl>
            <span class="vch-qr"><svg viewBox="0 0 21 21" aria-hidden="true">${qr}</svg></span>
          </div>
          <div class="vch-foot"><span><i></i>Check Package Status</span><span>${dmy(now)} ${hmFmt(now)}</span></div>
        </div>
        <p class="vch-cap">Error message on your TV</p>
        <div class="vch-tv vch-stb">
          <div class="vch-tt left">STB Information</div>
          <dl><dt>Company</dt><dd>SITI Networks Limited</dd><dt>Loader Version</dt><dd>00.00.01.00</dd><dt>H/W Version</dt><dd>82.09.58.05</dd>
            <dt>S/W Version</dt><dd>00.00.E0.0D</dd><dt>STB Model</dt><dd>xxxxxxx</dd><dt>STB Number</dt><dd>xxxxxxxxxxxxxxxxxx</dd>
            <dt>Chip ID</dt><dd>xxx xxxx xxxx</dd><dt>Virtual Card Number</dt><dd><mark>xxx xxxx xxxx - x</mark></dd></dl>
        </div>
        <p class="vch-cap">Press <b class="vch-info">info</b> button 4 times on your remote to open this page</p>
        <p class="vch-note">${I.card}<span>Your <b>VSC / Virtual Card number</b> is the number underlined in yellow. Enter it without spaces or the dash.</span></p>
      </div>`;
  }
  function openVcHelp() {
    openSheet(`<h3>What is VSC number?</h3>${vcHelpHTML()}<button class="btn" id="vchOk">Got it</button>`,
      (sh) => $("#vchOk", sh).addEventListener("click", closeSheet));
  }
  function openAddAccount(after) {
    let kind = "cable";
    const body = () => {
      const list = linkedAccounts();
      if (kind === "cable") {
        const cab = list.filter((a) => a.type === "cable");
        return `
          ${cab.length ? `<p class="aa-cap">Your Cable TV account${cab.length > 1 ? "s" : ""}</p>${cab.map((a) => `<div class="aa-acc">${I.tv}<span><b>VC No ${esc(a.id)}</b><small>${isActiveAcc(a) ? "Active" : "Linked"} · ${esc(a.mobile)}</small></span></div>`).join("")}` : ""}
          <div class="aa-caprow"><p class="aa-cap">Add another Cable TV account</p><button class="link vch-link" id="aaHelpBtn" aria-expanded="false">What is VSC number?</button></div>
          <div id="aaHelp" hidden>${vcHelpHTML()}</div>
          <label class="aa-in">${I.card}<input id="aaVc" inputmode="numeric" maxlength="11" placeholder="Virtual Card Number (11 Digit)" aria-label="Virtual Card Number" /></label>
          <small class="aa-err" id="aaErr"></small>
          <button class="btn" id="aaSub">Submit</button>`;
      }
      const has = list.some((a) => a.type === "broadband" && a.id === "SITIDEMO01");
      return `
        <p class="aa-cap">Broadband account found for +91 ${DEMO_MOBILE.slice(0, 5)} ${DEMO_MOBILE.slice(5)} (demo)</p>
        <div class="aa-acc">${I.wifi}<span><b>User ID SITIDEMO01</b><small>SITI Broadband · ${has ? "Already in your account" : "Not linked yet"}</small></span></div>
        <button class="btn" id="aaBb" ${has ? "disabled" : ""}>${has ? "Added to account" : "Add to account"}</button>`;
    };
    openSheet(`
      <h3>Add Cable / Broadband Account</h3>
      <div class="aa-radios" role="radiogroup" aria-label="Account type">
        <button class="aa-r" role="radio" data-k="broadband"><i></i>Broadband</button>
        <button class="aa-r" role="radio" data-k="cable"><i></i>Cable TV</button>
      </div>
      <div id="aaBody"></div>`, (sh) => {
      const draw = () => {
        $$(".aa-r", sh).forEach((r) => { r.classList.toggle("on", r.dataset.k === kind); r.setAttribute("aria-checked", r.dataset.k === kind); });
        $("#aaBody", sh).innerHTML = body();
        const vc = $("#aaVc", sh);
        if (vc) {
          $("#aaHelpBtn", sh).addEventListener("click", (e) => {   // What is VSC number? → unfold the help inside this sheet
            const h = $("#aaHelp", sh); h.hidden = !h.hidden;
            e.currentTarget.setAttribute("aria-expanded", !h.hidden);
            e.currentTarget.textContent = h.hidden ? "What is VSC number?" : "Hide help";
          });
          vc.addEventListener("input", () => { vc.value = vc.value.replace(/\D/g, "").slice(0, 11); $("#aaErr", sh).textContent = ""; });
          $("#aaSub", sh).addEventListener("click", async () => {
            const v = vc.value;
            const err = !/^\d{11}$/.test(v) ? "Enter the 11-digit Virtual Card Number"
              : linkedAccounts().some((a) => a.type === "cable" && a.id === v) ? "This VC number is already in your account" : "";
            if (err) { $("#aaErr", sh).textContent = err; shake(vc.parentNode); return; }
            showLoader("Linking account…"); await wait(800); hideLoader();
            linkedAccounts().push({ type: "cable", id: v, mobile: (state.session && state.session.mobile) || DEMO_MOBILE });
            closeSheet(); toast(`Cable TV account ${v} added (demo)`, "success"); after();
          });
        }
        const bb = $("#aaBb", sh);
        if (bb && !bb.disabled) bb.addEventListener("click", async () => {
          showLoader("Linking account…"); await wait(800); hideLoader();
          linkedAccounts().push({ type: "broadband", id: "SITIDEMO01", mobile: DEMO_MOBILE });
          closeSheet(); toast("Broadband account SITIDEMO01 added (demo)", "success"); after();
        });
      };
      $$(".aa-r", sh).forEach((r) => r.addEventListener("click", () => { kind = r.dataset.k; draw(); }));
      draw();
    });
  }

  // Cable TV customer / Cable TV LCO only: subscriber name, VC number and installation address (all fictional)
  function vcCardHTML() {
    if (!hasCableTv()) return "";
    const s = state.session || {};
    const reg = s.type === "cable" && Registry.get("cable", s.mobile);
    const vc = s.vsc || (reg && reg.id) || "00045217788";
    return `
      <div class="vc-card">
        <b class="vc-name">MR A. DAS HOME</b>
        <div class="vc-row"><span>VC No</span><b>${esc(vc)}</b></div>
        <div class="vc-row"><span>Address</span><b>Flat 2B, 14 Lake View Road, Ballygunge, Kolkata 700029 (demo)</b></div>
      </div>`;
  }
  function tvUser() {
    const s = state.session || {};
    if (s.type === "broadband") {   // Broadband customer (bottom bar → Dashboard / Recharge / Support / Profile)
      const m = s.mobile || DEMO_MOBILE;
      return { id: `${m}_bb`, name: "Broadband Customer", mobile: m, acc: `SITIBB${String(m).slice(-6)}` };
    }
    const id =((state.session && state.session.lcoid) || "LCODEMO").toLowerCase();
    return { id: `${id}_demo`, name: `Partner ${id.toUpperCase()}`, mobile: DEMO_MOBILE, acc: `SITI${id.toUpperCase()}${String(DEMO_MOBILE).slice(-4)}` };
  }

  function ctvNavHTML(tab) {
    const B = [["dash", I.grid, "Dashboard"], ["device", I.wifi, "My Device"], ["live", I.tv, "Live TV"], ["support", I.headset, "Support"], ["profile", I.userFill, "Profile"]];
    return `
      <nav class="ctv-nav">
        ${B.map(([k, ic, l]) => k === "live"
          ? `<button class="ctv-tv${tab === k ? " on" : ""}" data-cnav="${k}" aria-label="${l}">${ic}</button>`
          : `<button class="${tab === k ? "on" : ""}" data-cnav="${k}" aria-label="${l}">${ic}<span>${l}</span></button>`).join("")}
      </nav>`;
  }
  function bindCtvNav(root, tab) {
    $$("[data-cnav]", root).forEach((b) => b.addEventListener("click", () => {
      const t = b.dataset.cnav;
      if (t === tab) { const sc = $(".tv-scroll", root); if (sc) sc.scrollTo({ top: 0, behavior: "smooth" }); return; }
      if (t === "live") { if (tab === "ott") back(); else swapRoute("home", { fromLco: (state.session || {}).type === "lco" }); }   // tab switch: Back still returns to the LCO dashboard
      else if (t === "dash") swapRoute("ctvDash");
      else if (t === "profile") swapRoute("ctvProfile");
      else if (t === "device") go("ctvUdm");   // My Device (Udm) opens with its own Back
      else if (t === "support") swapRoute("ctvSupport");
    }));
  }

  /* ---- Watch OTT self-care: shared left menu, header and tabs ---- */
  const CTV_MENU = [["Transaction", I.card], ["My Plan", I.history], ["Broadband", I.bolt], ["Vas", I.bolt], ["My Usage", I.pie], ["Support", I.headset], ["Self Help", I.news], ["FAQ", I.help], ["Notification", I.bell]];
  function ctvDrawerHTML() {
    const u = tvUser();
    return `
      <div class="drawer" id="drawer" aria-hidden="true">
        <div class="drawer-backdrop" data-close-menu></div>
        <nav class="drawer-panel ctv-drawer" aria-label="Menu">
              <div class="drawer-head"><div class="brand"><img src="${MARK}" alt="SITI PLAYTOP MAGIC" /></div>
            <button class="drawer-x" data-close-menu aria-label="Close menu">${I.close}</button></div>
          <div class="ctv-ucard">
            <button class="ctv-uname" data-act="dr-profile">${esc(u.id)} ${I.chev}</button>
            <small>Mobile: ${u.mobile}</small>
            <small>Account Number: ${u.acc}</small>
          </div>
          <div class="ctv-mgrid">${CTV_MENU.map(([l, ic]) => `<button data-qa="${l}">${ic}<span>${l}</span></button>`).join("")}</div>
          <p class="dr-ver">Version ${APP_VERSION}</p>
        </nav>
      </div>`;
  }
  // Menu item / quick action → screen (pushed, so the phone's Back returns here)
  function ctvGo(label) {
    const R = { "FAQ": ["ctvFaq"], "Broadband": ["ctvRecharge", { sub: true }], "My Usage": ["ctvSession"], "Vas": ["ctvVas"],
      "Support": ["ctvSupport", { sub: true }], "My Plan": ["ctvPlan"], "Transaction": ["ctvTxn"], "Self Help": ["ctvSelfHelp"], "Notification": ["ctvNotify"] };
    const r = R[label];
    if (r) go(r[0], r[1] || {}); else toast(`${label} (demo)`);
  }
  // Binds ☰ / drawer / logout / [data-qa] on any Watch OTT self-care screen
  function bindCtvMenu(root) {
    $$("[data-qa]", root).forEach((b) => b.addEventListener("click", () => {
      const open = openDrawerEl();
      closeDrawer();
      if (open) setTimeout(() => ctvGo(b.dataset.qa), 200); else ctvGo(b.dataset.qa);
    }));
    const m = $('[data-act="menu"]', root);
    if (m) m.addEventListener("click", () => openDrawer(root));
    $$("[data-close-menu]", root).forEach((b) => b.addEventListener("click", closeDrawer));
    const p = $('[data-act="dr-profile"]', root);
    if (p) p.addEventListener("click", () => { closeDrawer(); go("tvProfile"); });
    const lo = $('[data-act="logout"]', root);
    if (lo) lo.addEventListener("click", lcoLogout);
  }
  // Header: bottom-bar tabs get ☰ + title + logout; pushed screens get ← + title
  function ctvHeadHTML(title, sub) {
    return sub
      ? `<header class="ctv-head"><button class="lco-ic" data-act="back" aria-label="Back">${I.back}</button><h2>${title}</h2></header>`
      : `<header class="ctv-head"><button class="lco-ic" data-act="menu" aria-label="Open menu" aria-expanded="false">${I.menu}</button><h2>${title}</h2>
           <button class="lco-ic" data-act="logout" aria-label="Logout">${I.logout}</button></header>`;
  }
  const ctvTabsHTML = (tabs, on) => `<div class="ctv-tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" data-tab="${k}" class="${k === on ? "on" : ""}" aria-selected="${k === on}">${l}</button>`).join("")}</div>`;
  // Tab strip that redraws one body in place
  function bindCtvTabs(root, draw) {
    $$("[data-tab]", root).forEach((b) => b.addEventListener("click", () => {
      $$("[data-tab]", root).forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-selected", on); });
      b.scrollIntoView({ block: "nearest", inline: "nearest" });
      draw(b.dataset.tab);
    }));
  }
  // Shell for a self-care screen: header (+ tabs) + scroller + drawer/bottom bar on tab screens
  function ctvShell(screen, title, { sub, tabs, tab, nav, body = "", extra = "" }) {
    return el(`
      <section class="screen-fixed tv ctv ctvx${sub ? " sub" : ""}" data-screen="${screen}">
        ${ctvHeadHTML(title, sub)}
        ${tabs ? ctvTabsHTML(tabs, tab) : ""}
        <div class="tv-scroll" id="cx">${body}</div>
        ${extra}
        ${sub ? "" : ctvDrawerHTML() + ctvNavHTML(nav)}
      </section>`);
  }
  function ctvBind(root, nav, sub) {
    bindCommon(root);
    bindCtvMenu(root);
    if (!sub) bindCtvNav(root, nav);
  }
  const ctvEmpty = (msg) => `<div class="ctv-empty">${I.info}<p>${msg}</p></div>`;

  function openTicket(t) {
    openSheet(`
      <h3>${esc(t.id)}</h3>
      <div class="lco-inv">
        <span><small>Ticket Title</small><b>${esc(t.title)}</b></span>
        <span><small>Ticket Reason</small><b>${esc(t.reason)}</b></span>
        <span><small>Status</small><b>${esc(t.status)}</b></span>
        <span><small>Last Modified</small><b>${stamp(t.at)}</b></span>
        ${t.remarks.map((r) => `<span><small>Remark</small><b>${esc(r)}</b></span>`).join("")}
      </div>
      <span class="demo-tag">Demo ticket</span>
      <button class="btn ghost" id="tkX">Close</button>`, (sh) => $("#tkX", sh).addEventListener("click", closeSheet));
  }
  // Generic one-field edit sheet (Profile: Email / Mobile / GSTIN, CPE password)
  function editSheet(title, value, { type = "text", max = 60, check, err }, onSave) {
    openSheet(`
      <h3>${title}</h3>
      <div class="lco-form ctv-sheetform">
        <label class="lco-fl" id="edWrap"><small>${title}</small><input id="edIn" type="${type}" maxlength="${max}" value="${esc(value)}" /></label>
        <p class="hint err" id="edHint"></p>
      </div>
      <div class="lco-btn2"><button class="btn ghost" id="edX">Cancel</button><button class="btn" id="edOk">Save</button></div>`, (sh) => {
      const inp = $("#edIn", sh);
      $("#edX", sh).addEventListener("click", closeSheet);
      $("#edOk", sh).addEventListener("click", () => {
        const v = inp.value.trim();
        if (!check(v)) { $("#edHint", sh).textContent = err; shake($("#edWrap", sh)); return; }
        closeSheet();
        onSave(v);
      });
    });
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

  /* ---------- Opening animation (intro logo animation) ----------
     Plays once when the app opens, then fades into the first page.
     If the video cannot autoplay, an animated logo is shown instead. */
  function runSplash() {
    const sp = $("#splash");
    if (!sp) return;
    const v = $("#splashVideo"), bar = $("#splashBar");
    const skip = $("#splashSkip"), snd = $("#splashSound");
    let finished = false, usedFallback = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      try { v.pause(); } catch (e) { /* ignore */ }
      sp.classList.add("done");
      document.removeEventListener("keydown", onKey);
      setTimeout(() => sp.remove(), 650);
    };
    const fallback = () => {
      if (usedFallback || finished) return;
      usedFallback = true;
      v.hidden = snd.hidden = true;
      sp.style.backgroundColor = "";
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
      // Screen colour = the video's edge colour (measured): black, then fades to the logo's grey #262828 between 8 and 9.75 s
      const k = Math.max(0, Math.min(1, (v.currentTime - 8) / 1.75));
      sp.style.backgroundColor = `rgb(${Math.round(38 * k)},${Math.round(40 * k)},${Math.round(40 * k)})`;
    });
    v.addEventListener("ended", finish);
    v.addEventListener("error", fallback);

    const p = v.play();
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
