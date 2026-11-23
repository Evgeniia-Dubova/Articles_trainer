// Ілюстрації-сценки (inline SVG) в єдиному пастельному стилі.
// Візуальна мова: IN — підсвічений простір (.as/.al), ON — підсвічена поверхня (.sf), AT — пін-мітка (Pin).
const L = "#4a3d63";
const C = {
  sky: "#e3eeff", blue: "#a8cdff", blueD: "#58A6FF", pink: "#ffbcbc", pinkD: "#FF6B6B",
  pap: "#FFEDD5", peach: "#ffcfae", lav: "#ddd0f7", lavD: "#b79be6", skin: "#ffdcc6",
  hair: "#5a4a78", hair2: "#c9774f", wood: "#ecc39b", woodD: "#c99268", white: "#fffaf6",
  green: "#c4e8cd", greenD: "#8fcfa0", grey: "#e4dfee", greyD: "#b9b1cc", yellow: "#ffe08a",
};

const svg = (body, vb = "0 0 240 130") =>
  `<svg class="ill" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" stroke="${L}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" fill="none" aria-hidden="true">${body}</svg>`;

// Голова з обличчям
function Head(x, y, o = {}) {
  const hair = o.hair || C.hair;
  return `<g transform="translate(${x} ${y})">
    <circle r="9.5" fill="${C.skin}"/>
    <path d="M-9.5 -1 a9.5 9.5 0 0 1 19 0 q-4 -5 -9.5 -4.5 q-5.5 .5 -9.5 4.5z" fill="${hair}"/>
    ${o.hat === "chef" ? `<path d="M-8 -6 q-7 -9 1 -12 q4 -7 11 -1 q8 0 3 13z" fill="#fff"/>` : ""}
    ${o.hat === "party" ? `<path d="M-5 -8 L1 -24 L6 -8z" fill="${C.yellow}"/><circle cx="1" cy="-25" r="2" fill="${C.pinkD}" stroke="none"/>` : ""}
    ${o.cap ? `<path d="M-9.5 -2 a9.5 9.5 0 0 1 19 0z" fill="${o.cap}"/><path d="M9 -2 h6"/>` : ""}
    <circle cx="-3.2" cy="1" r="1.1" fill="${L}" stroke="none"/><circle cx="3.2" cy="1" r="1.1" fill="${L}" stroke="none"/>
    <path d="M-2.6 4.4 q2.6 2.2 5.2 0" stroke-width="1.2"/>
    <circle cx="-5.5" cy="4" r="1.6" fill="${C.pink}" stroke="none" opacity=".8"/><circle cx="5.5" cy="4" r="1.6" fill="${C.pink}" stroke="none" opacity=".8"/>
  </g>`;
}

// Людина: ноги стоять на y
function P(x, y, shirt, o = {}) {
  const arm = {
    down: "M-8 -33 q-5 7 -5 14 M8 -33 q5 7 5 14",
    wave: "M-8 -33 q-5 7 -5 14 M8 -33 q7 -6 8 -16",
    up: "M-8 -33 q-7 -6 -9 -16 M8 -33 q7 -6 9 -16",
    hold: "M-8 -33 q-5 7 -5 14 M8 -33 q8 2 11 -4",
    phone: "M-8 -33 q-5 7 -5 14 M8 -33 q6 -2 4 -13",
  }[o.arms || "down"];
  return `<g transform="translate(${x} ${y}) scale(${o.s || 1})">
    ${o.noLegs ? "" : `<path d="M-4 -17 L-5 0 M4 -17 L5 0" stroke-width="3.6"/>`}
    <path d="${arm}" stroke-width="3.2"/>
    <rect x="-9" y="-38" width="18" height="24" rx="8" fill="${shirt}"/>
    ${o.stripes ? `<path d="M-9 -30 h18 M-9 -24 h18 M-9 -18 h18" stroke-width="1.2"/>` : ""}
    ${o.coat ? `<path d="M0 -38 v24"/><path d="M-5 -36 q0 9 5 10 q5 -1 5 -10" stroke="${C.blueD}" stroke-width="1.4"/>` : ""}
    ${o.extra || ""}
    ${Head(0, -48, o)}
  </g>`;
}

// Пін-мітка «у точці» (AT)
const Pin = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="none">
  <ellipse rx="11" ry="3.4" class="as"/>
  <path d="M0 -3 C-6 -12 -10 -17 -10 -23 a10 10 0 0 1 20 0 c0 6 -4 11 -10 20z" class="a"/>
  <circle cy="-23" r="3.8" fill="#fff"/></g>`;

const ground = (y = 116, fill = C.pap) => `<path d="M0 ${y} H240 V130 H0z" fill="${fill}" stroke="none" opacity=".7"/><path d="M0 ${y} H240" opacity=".35"/>`;
const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 v-14" stroke-width="2.4"/><circle cy="-22" r="11" fill="${C.green}"/></g>`;
const cloud = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 h30 a7 7 0 0 0 -4 -13 a10 10 0 0 0 -18 -2 a7 7 0 0 0 -8 15z" fill="#fff" stroke-opacity=".35"/>`;
const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="${C.yellow}" stroke-opacity=".4"/>`;
const txt = (x, y, t, size = 10, fill = L, anchor = "middle") =>
  `<text x="${x}" y="${y}" font-family="Nunito, system-ui, sans-serif" font-weight="900" font-size="${size}" fill="${fill}" stroke="none" text-anchor="${anchor}">${t}</text>`;
const wheel = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${L}"/><circle cx="${x}" cy="${y}" r="${r * .4}" fill="${C.grey}" stroke="none"/>`;

const S = {
  /* ========== IN ========== */
  kitchen: () => svg(`
    <rect x="34" y="12" width="172" height="106" rx="14" class="as al" stroke-width="2.6"/>
    <rect x="50" y="26" width="36" height="28" rx="4" fill="${C.sky}"/><path d="M68 26 v28 M50 40 h36" opacity=".5"/>
    <rect x="128" y="76" width="64" height="42" rx="4" fill="${C.white}"/><path d="M160 80 v34 M150 96 h4 M166 96 h4" opacity=".5"/>
    <rect x="124" y="70" width="72" height="8" rx="3" fill="${C.grey}"/>
    <path d="M138 70 v-13 h30 v13z" fill="${C.peach}"/><path d="M134 57 h38 M150 57 v-4 h6 v4"/>
    <path d="M146 48 q-4 -6 0 -12 M160 48 q-4 -6 0 -12" opacity=".45"/>
    ${P(100, 117, C.white, { arms: "hold", hat: "chef" })}
    <path d="M113 84 l16 -8" stroke-width="2.2"/><ellipse cx="132" cy="75" rx="7" ry="2.4" fill="${C.greyD}"/>`),

  room: () => svg(`
    <rect x="34" y="12" width="172" height="106" rx="14" class="as al" stroke-width="2.6"/>
    <rect x="132" y="26" width="30" height="22" rx="3" fill="${C.sky}"/><path d="M134 46 l9 -10 l7 6 l5 -5 l5 9" opacity=".6"/>
    <path d="M58 98 v-26 q0 -7 7 -7 h56 q7 0 7 7 v26z" fill="${C.lav}"/>
    <rect x="50" y="84" width="86" height="20" rx="8" fill="${C.lavD}"/><path d="M58 104 v8 M128 104 v8" stroke-width="2.4"/>
    <path d="M182 116 v-50 M174 66 h16 l-4 -14 h-8z" fill="${C.yellow}"/>
    <g transform="translate(160 116)"><path d="M-12 0 q-4 -16 8 -18 q14 -1 14 12 q0 6 -4 6z" fill="${C.peach}"/>
      <path d="M-2 -18 l-2 -8 l6 5 l5 -5 l0 8" fill="${C.peach}"/><circle cx="1" cy="-12" r=".9" fill="${L}" stroke="none"/><circle cx="6" cy="-12" r=".9" fill="${L}" stroke="none"/>
      <path d="M10 -3 q12 0 10 -14"/></g>`),

  paris: () => svg(`
    <path d="M40 66 C36 30 88 10 128 16 C176 22 210 40 202 76 C196 108 150 120 112 116 C68 112 44 96 40 66z" class="as ad" stroke-width="2.4"/>
    ${cloud(168, 34, .8)}
    <path d="M120 22 L106 104 M120 22 L134 104 M111 66 h18 M108 84 h24 M120 22 v-8" stroke-width="2.2"/>
    <path d="M106 104 q14 -20 28 0" stroke-width="2.2"/><path d="M114 44 h12" opacity=".6"/>
    ${P(162, 106, C.blue, { arms: "wave", s: .8 })}
    ${txt(70, 70, "Paris", 13, L)}`),

  italy: () => svg(`
    <path d="M44 70 C40 34 84 16 124 18 C168 20 204 38 198 74 C192 106 148 118 110 116 C70 114 48 100 44 70z" class="as ad" stroke-width="2.4"/>
    <path d="M86 100 V62 q34 -16 68 0 V100z" fill="${C.peach}"/>
    <path d="M94 100 v-10 a5 5 0 0 1 10 0 v10 M110 100 v-10 a5 5 0 0 1 10 0 v10 M126 100 v-10 a5 5 0 0 1 10 0 v10 M142 100 v-10 a5 5 0 0 1 10 0 v10" opacity=".7"/>
    <path d="M94 78 v-6 a5 5 0 0 1 10 0 v6 M110 76 v-6 a5 5 0 0 1 10 0 v6 M126 76 v-6 a5 5 0 0 1 10 0 v6 M142 78 v-6 a5 5 0 0 1 10 0 v6" opacity=".55"/>
    <path d="M70 100 V40"/><rect x="70" y="40" width="8" height="14" fill="${C.greenD}" stroke="none"/><rect x="78" y="40" width="8" height="14" fill="#fff" stroke="none"/><rect x="86" y="40" width="8" height="14" fill="${C.pinkD}" stroke="none"/><rect x="70" y="40" width="24" height="14"/>
    ${txt(172, 62, "Italy", 13, L)}`),

  sea: () => svg(`
    ${sun(36, 26)}${cloud(150, 30, .9)}
    <path d="M0 62 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V130 H0z" fill="${C.blue}" stroke="none"/>
    <path d="M0 62 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" class="al" stroke-width="2.6"/>
    <path d="M30 92 q10 -5 20 0 M170 100 q10 -5 20 0 M90 112 q10 -5 20 0" stroke="#fff" opacity=".8"/>
    ${Head(118, 66, { hair: C.hair2 })}
    <path d="M104 72 q-12 -16 -2 -26" stroke-width="3.2"/><path d="M130 74 q10 2 16 -2" stroke-width="3.2"/>
    <circle cx="100" cy="42" r="2" fill="#fff"/><circle cx="148" cy="66" r="2" fill="#fff"/>`),

  river: () => svg(`
    ${ground(0, C.green)}
    <path d="M0 40 C60 30 90 70 150 64 C190 60 210 44 240 46 V96 C200 94 190 112 150 112 C90 112 60 82 0 90z" fill="${C.blue}"/>
    <path d="M0 40 C60 30 90 70 150 64 C190 60 210 44 240 46 M240 96 C200 94 190 112 150 112 C90 112 60 82 0 90" class="al" stroke-width="2.6"/>
    <g transform="translate(112 82)"><path d="M-18 0 q14 -14 30 0 q-16 14 -30 0z" fill="${C.peach}"/><path d="M12 0 l10 -8 v16z" fill="${C.peach}"/><circle cx="-10" cy="-2" r="1.3" fill="${L}" stroke="none"/></g>
    <g transform="translate(170 92) scale(.7)"><path d="M-18 0 q14 -14 30 0 q-16 14 -30 0z" fill="${C.pink}"/><path d="M12 0 l10 -8 v16z" fill="${C.pink}"/></g>
    <path d="M40 30 v-14 M46 32 v-18 M200 120 v-14 M206 122 v-18" stroke="${C.greenD}" stroke-width="2.4"/>`),

  north: () => svg(`
    <rect x="50" y="10" width="140" height="110" rx="12" fill="${C.white}"/>
    <path d="M50 46 h140" opacity=".3"/><path d="M50 22 a12 12 0 0 1 12 -12 h116 a12 12 0 0 1 12 12 v24 h-140z" class="as" stroke="none"/>
    <path d="M50 46 h140" class="al" stroke-width="2.4"/>
    <path d="M70 42 l14 -20 l14 20z M94 42 l18 -26 l18 26z" fill="${C.lav}"/><path d="M80 28 l4 -6 l4 6 M106 24 l6 -8 l6 8" fill="#fff"/>
    <circle cx="150" cy="24" r="1.6" fill="${C.blueD}" stroke="none"/><circle cx="162" cy="34" r="1.6" fill="${C.blueD}" stroke="none"/><circle cx="172" cy="20" r="1.6" fill="${C.blueD}" stroke="none"/>
    ${tree(80, 98, .8)}${tree(100, 108, .7)}${tree(150, 100, .8)}
    <path d="M206 40 l8 -22 l8 22 l-8 -6z" fill="${C.pinkD}" stroke="none"/>${txt(214, 54, "N", 11)}`),

  center: () => svg(`
    <ellipse cx="120" cy="68" rx="96" ry="52" fill="${C.green}"/>
    <ellipse cx="120" cy="68" rx="46" ry="28" class="as al" stroke-width="2.4"/>
    <path d="M104 80 v-28 h12 v28 M118 80 v-38 h12 v38 M132 80 v-20 h10 v20" fill="${C.lav}"/>
    <path d="M108 58 h4 M108 66 h4 M122 50 h4 M122 60 h4 M122 70 h4" opacity=".5"/>
    <g fill="${C.peach}"><path d="M42 72 v-8 l6 -5 l6 5 v8z"/><path d="M186 66 v-8 l6 -5 l6 5 v8z"/><path d="M60 98 v-8 l6 -5 l6 5 v8z"/><path d="M168 96 v-8 l6 -5 l6 5 v8z"/></g>`),

  taxi: () => svg(`
    ${ground(112)}
    <path d="M46 98 v-18 q0 -8 8 -10 l18 -4 l16 -20 q4 -4 10 -4 h44 q6 0 10 4 l18 20 l20 4 q8 2 8 10 v18z" fill="${C.yellow}"/>
    <path d="M92 64 l12 -16 h22 v16z M132 64 v-16 h12 q4 0 7 3 l11 13z" class="as al" stroke-width="2"/>
    ${Head(116, 54)}${Head(148, 54, { hair: C.hair2 })}
    <rect x="108" y="34" width="24" height="8" rx="3" fill="#fff"/>${txt(120, 41, "TAXI", 6.5)}
    <path d="M52 80 h10 M186 80 h8" stroke-width="2.4"/>
    ${wheel(78, 100, 11)}${wheel(170, 100, 11)}`),

  heli: () => svg(`
    ${cloud(30, 40, .8)}${cloud(190, 100, .7)}
    <path d="M70 24 h120 M130 24 v12" stroke-width="3"/>
    <path d="M92 66 q0 -30 38 -30 q32 0 36 30 q0 18 -36 18 q-38 0 -38 -18z" fill="${C.blue}"/>
    <path d="M100 64 q2 -20 26 -22 v24 q-26 4 -26 -2z" class="as al" stroke-width="2"/>${Head(114, 58, { cap: C.pinkD })}
    <path d="M166 62 h44 l8 -12" stroke-width="3"/><path d="M212 44 v14" stroke-width="3"/>
    <path d="M104 96 h60 M114 84 v12 M152 84 v12" stroke-width="2.4"/>`),

  /* ========== ON ========== */
  table: () => svg(`
    ${ground(118)}
    <path d="M56 118 l6 -44 M184 118 l-6 -44 M80 118 l3 -44 M160 118 l-3 -44" stroke="${C.woodD}" stroke-width="5"/>
    <rect x="42" y="66" width="156" height="10" rx="5" fill="${C.wood}"/>
    <path d="M44 66 h152" class="sfl" stroke-width="3.2"/>
    <path d="M112 66 c-14 0 -16 -22 -6 -26 c4 -2 8 0 10 1 c2 -1 6 -3 10 -1 c10 4 8 26 -6 26z" fill="${C.pinkD}"/>
    <path d="M116 40 q0 -6 4 -9" stroke-width="2"/><path d="M118 34 q8 -4 12 2 q-8 4 -12 -2z" fill="${C.greenD}"/>
    <rect x="148" y="56" width="30" height="10" rx="2" fill="${C.lav}"/><rect x="150" y="48" width="26" height="8" rx="2" fill="${C.blue}"/>`),

  wall: () => svg(`
    <rect x="20" y="8" width="200" height="104" rx="10" class="sf"/>
    <path d="M60 8 v104 M100 8 v104 M140 8 v104 M180 8 v104" stroke-opacity=".12"/>
    <rect x="20" y="8" width="200" height="104" rx="10" class="sfl" stroke-width="2.4"/>
    ${ground(112)}
    <path d="M120 22 l-20 14 M120 22 l20 14" opacity=".6"/><circle cx="120" cy="22" r="2" fill="${L}"/>
    <rect x="88" y="36" width="64" height="48" rx="3" fill="${C.wood}"/><rect x="95" y="43" width="50" height="34" fill="${C.sky}"/>
    <path d="M95 77 l14 -18 l10 10 l8 -8 l18 16z" fill="${C.green}"/><circle cx="135" cy="52" r="5" fill="${C.yellow}"/>
    <path d="M190 112 v-18 h16 v18z" fill="${C.peach}"/><path d="M198 94 q-10 -10 -4 -20 M198 94 q8 -14 14 -12" stroke="${C.greenD}" stroke-width="2.6"/>`),

  bus: () => svg(`
    ${ground(116)}
    <rect x="22" y="30" width="196" height="72" rx="14" fill="${C.blue}"/>
    <rect x="34" y="40" width="40" height="30" rx="4" fill="${C.sky}"/><rect x="176" y="40" width="30" height="50" rx="4" fill="${C.sky}"/>
    <rect x="82" y="38" width="86" height="56" rx="5" fill="${C.white}"/>
    <path d="M86 46 h78" stroke-width="2"/><path d="M104 46 v6 M146 46 v6" stroke-width="1.4"/>
    ${P(110, 92, C.pink, { arms: "wave", s: .78 })}${P(146, 92, C.lav, { s: .78 })}
    <path d="M84 92 h82" class="sfl" stroke-width="3.6"/>
    ${wheel(58, 104, 11)}${wheel(184, 104, 11)}`),

  plane: () => svg(`
    ${cloud(16, 30, .8)}${cloud(196, 24, .7)}
    <path d="M20 70 q0 -26 40 -26 h140 l24 -22 h8 l-6 30 q-4 22 -30 22 h-136 q-40 0 -40 -4z" fill="#fff"/>
    <path d="M110 92 l30 30 h14 l-14 -30z" fill="${C.blue}"/>
    <rect x="58" y="48" width="96" height="40" rx="8" fill="${C.sky}"/>
    ${P(84, 86, C.pink, { s: .66 })}${P(126, 86, C.yellow, { arms: "wave", s: .66 })}
    <path d="M60 86 h92" class="sfl" stroke-width="3.2"/>
    <circle cx="168" cy="58" r="3.5" fill="${C.sky}"/><circle cx="182" cy="58" r="3.5" fill="${C.sky}"/><circle cx="40" cy="62" r="3" fill="${C.sky}"/>`),

  tv: () => svg(`
    ${ground(118)}
    <path d="M104 18 l16 12 l16 -12" stroke-width="2"/>
    <rect x="56" y="30" width="128" height="76" rx="12" fill="${C.lavD}"/>
    <rect x="66" y="38" width="108" height="60" rx="6" fill="${C.greenD}"/>
    <rect x="66" y="38" width="108" height="60" rx="6" class="sfl" stroke-width="2.6"/>
    <path d="M120 38 v60" stroke="#fff" opacity=".8"/><circle cx="120" cy="68" r="11" stroke="#fff" opacity=".8"/>
    <circle cx="146" cy="76" r="6" fill="#fff"/><path d="M143 73 l3 3 l3 -3 M146 76 v4" stroke-width="1"/>
    ${P(96, 94, C.pinkD, { s: .5 })}
    <path d="M100 106 l-8 12 M140 106 l8 12" stroke-width="2.6"/>`),

  phone: () => svg(`
    ${ground(118)}
    ${P(92, 118, C.blue, { arms: "phone", s: 1.25 })}
    <rect x="102" y="40" width="9" height="16" rx="2" class="a" stroke-width="1.2"/>
    <path d="M130 22 h80 q8 0 8 8 v22 q0 8 -8 8 h-60 l-12 10 l2 -10 h-10 q-8 0 -8 -8 v-22 q0 -8 8 -8z" fill="#fff"/>
    ${txt(170, 46, "Hello! 👋", 13)}`),

  bike: () => svg(`
    ${ground(114)}
    <circle cx="80" cy="94" r="18" fill="${C.white}" stroke-width="2.4"/><circle cx="160" cy="94" r="18" fill="${C.white}" stroke-width="2.4"/>
    <path d="M80 94 l24 -30 h40 l16 30 M104 64 l18 30 l22 -30 M144 64 l-4 -12 h10" stroke-width="2.4"/>
    <path d="M96 62 h18" class="sfl" stroke-width="4"/>
    <path d="M110 58 l8 22 l-6 14 M110 58 l4 22" stroke-width="3.6"/>
    ${P(106, 66, C.pinkD, { noLegs: true, extra: `<path d="M8 -33 q14 2 32 8" stroke-width="3.2"/>` })}`),

  street: () => svg(`
    <rect x="24" y="30" width="56" height="62" rx="4" fill="${C.peach}"/><path d="M24 44 h56" /><path d="M24 30 h56 l-6 14 h-44z" fill="${C.pink}"/>
    <rect x="40" y="62" width="22" height="30" fill="${C.sky}"/>
    <rect x="96" y="40" width="52" height="52" rx="4" fill="${C.lav}"/><rect x="106" y="50" width="12" height="12" fill="${C.sky}"/><rect x="126" y="50" width="12" height="12" fill="${C.sky}"/><rect x="114" y="70" width="16" height="22" fill="${C.wood}"/>
    <rect x="160" y="26" width="58" height="66" rx="4" fill="${C.blue}"/><path d="M170 38 h12 M196 38 h12 M170 54 h12 M196 54 h12 M170 70 h12 M196 70 h12" stroke-width="5" stroke="${C.sky}"/>
    <path d="M0 92 H240 V124 H0z" class="sf" stroke="none"/><path d="M0 92 H240 M0 124 H240" class="sfl" stroke-width="2.4"/>
    <path d="M10 108 h18 M44 108 h18 M78 108 h18 M112 108 h18 M146 108 h18 M180 108 h18 M214 108 h18" stroke="#fff" stroke-width="2.6"/>
    <path d="M90 92 v-58" stroke-width="2.2"/><rect x="66" y="16" width="52" height="16" rx="3" fill="#3d8b5a" stroke="#fff" stroke-width="1.6"/>${txt(92, 28, "Green St.", 9.5, "#fff")}`),

  floors: () => svg(`
    ${ground(118)}
    <path d="M60 22 l60 -14 l60 14z" fill="${C.pink}"/>
    <rect x="66" y="22" width="108" height="96" fill="${C.white}"/>
    <path d="M66 46 h108 M66 70 h108 M66 94 h108" opacity=".4"/>
    <rect x="66" y="70" width="108" height="24" class="sf" stroke="none"/><path d="M66 94 h108" class="sfl" stroke-width="3"/>
    ${txt(56, 38, "3", 10)}${txt(56, 62, "2", 10)}${txt(56, 86, "1", 11, L)}${txt(56, 110, "G", 10)}
    <rect x="80" y="28" width="14" height="12" fill="${C.sky}"/><rect x="146" y="28" width="14" height="12" fill="${C.sky}"/><rect x="80" y="52" width="14" height="12" fill="${C.sky}"/><rect x="146" y="52" width="14" height="12" fill="${C.sky}"/>
    <rect x="112" y="100" width="16" height="18" fill="${C.wood}"/>
    ${P(124, 93, C.yellow, { arms: "wave", s: .44 })}<rect x="146" y="76" width="14" height="12" fill="${C.sky}"/>`),

  /* ========== AT ========== */
  door: () => svg(`
    ${ground(116)}
    <rect x="96" y="8" width="132" height="108" fill="${C.peach}"/><path d="M96 8 h132" opacity=".4"/>
    <rect x="140" y="38" width="40" height="78" rx="20" fill="${C.wood}"/><path d="M140 58 h40" opacity=".0"/><circle cx="172" cy="80" r="2.4" fill="${L}"/>
    <rect x="134" y="112" width="52" height="6" rx="2" fill="${C.grey}"/>
    <rect x="196" y="40" width="22" height="24" fill="${C.sky}"/>
    ${P(100, 114, C.blue, { arms: "hold" })}${Pin(126, 120, .9)}`),

  busstop: () => svg(`
    ${ground(116)}
    <path d="M140 116 V24" stroke-width="2.6"/><circle cx="140" cy="24" r="14" class="a" stroke="#fff" stroke-width="2"/>${txt(140, 28, "BUS", 9, "#fff")}
    <path d="M160 116 v-56 h66 v56" stroke-opacity=".5"/><path d="M154 60 h78" stroke-width="3"/>
    <rect x="166" y="94" width="54" height="6" rx="2" fill="${C.wood}"/><path d="M172 100 v14 M214 100 v14"/>
    ${P(92, 114, C.pink, { arms: "down" })}${Pin(120, 120, .9)}`),

  party: () => svg(`
    <path d="M10 14 q110 30 220 0" stroke-opacity=".5"/>
    <path d="M30 20 l6 14 l6 -12z" fill="${C.pink}"/><path d="M62 26 l6 14 l6 -12z" fill="${C.yellow}"/><path d="M96 30 l6 14 l6 -12z" fill="${C.blue}"/><path d="M134 30 l6 14 l6 -12z" fill="${C.lav}"/><path d="M168 26 l6 14 l6 -12z" fill="${C.pink}"/><path d="M200 20 l6 14 l6 -12z" fill="${C.yellow}"/>
    <ellipse cx="26" cy="62" rx="10" ry="12" fill="${C.pinkD}"/><path d="M26 74 q4 18 -2 42"/><ellipse cx="214" cy="56" rx="10" ry="12" fill="${C.blueD}"/><path d="M214 68 q-4 20 2 48"/>
    ${ground(116)}
    <rect x="98" y="96" width="44" height="20" fill="${C.white}"/><rect x="104" y="76" width="32" height="20" rx="3" fill="${C.pink}"/><path d="M104 84 q8 5 16 0 q8 5 16 0" stroke="#fff" stroke-width="2"/><path d="M120 76 v-8" stroke-width="2"/><path d="M120 68 q-3 -4 0 -7 q3 3 0 7z" fill="${C.yellow}"/>
    ${P(72, 116, C.lav, { arms: "up", hat: "party" })}${P(168, 116, C.yellow, { arms: "wave", hat: "party", hair: C.hair2 })}`),

  concert: () => svg(`
    <path d="M40 0 L80 84 H0z" class="as" stroke="none" opacity=".8"/><path d="M200 0 L240 84 H160z" class="as" stroke="none" opacity=".8"/>
    <rect x="30" y="84" width="180" height="12" fill="${C.lavD}"/>
    ${P(120, 84, C.pinkD, { arms: "hold", s: 1 })}
    <path d="M128 60 l26 -8 M136 62 q-8 -4 -4 -10 q8 -2 10 6z" fill="${C.wood}" stroke-width="2"/>
    <path d="M70 44 v40 M64 44 h12" stroke-width="2"/><circle cx="70" cy="40" r="4" fill="${L}"/>
    <path d="M168 36 q4 -6 8 0 M176 28 l0 -10 l8 -2 l0 10" stroke-width="1.6"/>
    <g>${Head(40, 116, { hair: C.hair2 })}${Head(80, 120)}${Head(160, 120, { hair: C.hair2 })}${Head(200, 116)}
    <path d="M52 112 l8 -18 M188 112 l-8 -18 M92 116 l6 -16" stroke-width="3"/></g>`),

  address: () => svg(`
    <path d="M0 100 H240 V122 H0z" fill="${C.grey}" stroke="none"/><path d="M0 100 H240 M0 122 H240" opacity=".4"/>
    <path d="M10 111 h16 M46 111 h16 M82 111 h16 M118 111 h16 M154 111 h16 M190 111 h16 M226 111 h16" stroke="#fff" stroke-width="2.4"/>
    <path d="M86 50 l34 -28 l34 28 v50 h-68z" fill="${C.peach}"/><path d="M80 52 l40 -34 l40 34" stroke-width="2.4"/>
    <rect x="112" y="70" width="18" height="30" fill="${C.wood}"/><rect x="94" y="58" width="14" height="12" fill="${C.sky}"/>
    <rect x="136" y="56" width="22" height="16" rx="4" class="a" stroke="#fff" stroke-width="1.6"/>${txt(147, 68, "25", 11, "#fff")}
    ${Pin(170, 98, .9)}
    <path d="M34 100 v-58" stroke-width="2.2"/><rect x="10" y="26" width="52" height="16" rx="3" fill="#3d8b5a" stroke="#fff" stroke-width="1.6"/>${txt(36, 38, "Green St.", 9.5, "#fff")}`),

  page: () => svg(`
    <rect x="70" y="8" width="100" height="118" rx="6" fill="#fff"/>
    <rect x="80" y="18" width="80" height="16" rx="4" class="as" stroke="none"/>
    <path d="M84 30 q4 -10 8 0 q3 -6 6 0 q4 -8 7 0 q3 -5 6 0" class="al" stroke-width="2.2"/>
    <path d="M82 48 h76 M82 60 h76 M82 72 h76 M82 84 h60 M82 96 h76 M82 108 h50" stroke="${C.grey}" stroke-width="4"/>
    <g transform="translate(150 26) rotate(-35)"><rect x="0" y="-4" width="48" height="8" rx="2" fill="${C.yellow}"/><path d="M0 -4 l-8 4 l8 4z" fill="${C.wood}"/><rect x="44" y="-4" width="6" height="8" fill="${C.pink}"/></g>
    ${Pin(60, 30, .8)}${txt(46, 52, "top", 10, L, "middle")}`),

  doctor: () => svg(`
    ${ground(116)}
    <rect x="132" y="14" width="88" height="102" rx="6" fill="${C.white}"/>
    <rect x="164" y="22" width="24" height="24" rx="5" fill="${C.pink}"/><path d="M176 27 v14 M169 34 h14" stroke="#fff" stroke-width="4"/>
    <rect x="160" y="64" width="32" height="52" rx="3" fill="${C.sky}"/>
    ${P(76, 116, "#fff", { coat: true, arms: "wave" })}
    ${P(106, 116, C.yellow, { s: .72, hair: C.hair2 })}${Pin(176, 122, .8)}`),

  dentist: () => svg(`
    ${ground(116)}
    <path d="M60 116 v-20 h50 l20 -40 l8 4 l-16 40 v16z" fill="${C.lav}"/><path d="M118 116 v-16"/>
    ${P(82, 98, C.pink, { noLegs: true, s: .85 })}
    <g transform="translate(176 62)"><path d="M-22 -18 q-6 -16 10 -18 q8 0 12 4 q4 -4 12 -4 q16 2 10 18 q-4 14 -6 30 q-2 10 -8 0 q-4 -12 -8 -12 q-4 0 -8 12 q-6 10 -8 0 q-2 -16 -6 -30z" fill="#fff" stroke-width="2"/>
    <circle cx="-6" cy="-16" r="1.6" fill="${L}" stroke="none"/><circle cx="6" cy="-16" r="1.6" fill="${L}" stroke="none"/><path d="M-5 -10 q5 4 10 0"/></g>
    ${Pin(140, 120, .8)}`),

  johns: () => svg(`
    ${ground(116)}
    <path d="M60 58 l50 -40 l50 40 v58 h-100z" fill="${C.blue}"/><path d="M52 60 l58 -46 l58 46" stroke-width="2.4"/>
    <rect x="80" y="36" width="60" height="16" rx="4" fill="#fff"/>${txt(110, 48, "John’s", 10)}
    <rect x="72" y="66" width="28" height="22" fill="${C.sky}"/>${Head(86, 78, { hair: C.hair2 })}
    <rect x="120" y="66" width="28" height="22" fill="${C.sky}"/>${Head(134, 78)}
    <rect x="98" y="90" width="24" height="26" fill="${C.wood}"/>
    <path d="M172 116 v-12 h34 v12z" fill="${C.peach}"/><path d="M178 104 l12 -10 l16 10" fill="${C.yellow}"/>
    ${Pin(110, 122, .8)}`),

  /* ========== AT vs IN ========== */
  prisonIn: () => svg(`
    ${ground(116)}
    <rect x="70" y="14" width="100" height="102" rx="6" class="as al" stroke-width="2.6"/>
    ${P(120, 116, C.yellow, { stripes: true })}
    <path d="M86 14 v102 M102 14 v102 M118 14 v102 M134 14 v102 M150 14 v102" stroke-width="3.4" stroke="${C.greyD}"/>`),

  prisonAt: () => svg(`
    ${ground(116)}
    <rect x="110" y="20" width="110" height="96" fill="${C.grey}"/><path d="M110 20 h110" stroke-width="2"/>
    <rect x="126" y="36" width="24" height="24" fill="${C.sky}"/><path d="M132 36 v24 M138 36 v24 M144 36 v24" stroke-width="2"/>
    <rect x="180" y="36" width="24" height="24" fill="${C.sky}"/><path d="M186 36 v24 M192 36 v24 M198 36 v24" stroke-width="2"/>
    <rect x="152" y="76" width="26" height="40" fill="${C.woodD}"/>
    ${P(76, 116, C.blue, { arms: "hold", cap: C.blueD })}<path d="M95 84 l-8 32 M80 116 h14" stroke-width="2.6" stroke="${C.woodD}"/>${Pin(165, 122, .8)}`),

  hospIn: () => svg(`
    <rect x="30" y="10" width="180" height="108" rx="10" class="as al" stroke-width="2.6"/>
    <path d="M50 110 v-36 M190 110 v-26" stroke-width="3"/><rect x="50" y="78" width="140" height="14" rx="4" fill="#fff"/>
    <rect x="60" y="66" width="30" height="14" rx="7" fill="${C.white}"/>${Head(76, 62, { hair: C.hair2 })}
    <path d="M86 78 q40 -16 100 0 v4 h-100z" fill="${C.blue}"/>
    <path d="M206 22 v80 M198 30 h16" stroke-width="2"/><rect x="200" y="30" width="12" height="18" rx="3" fill="${C.sky}"/>`),

  hospAt: () => svg(`
    ${ground(116)}
    <rect x="110" y="16" width="112" height="100" fill="${C.white}"/>
    <rect x="154" y="24" width="24" height="24" rx="5" fill="${C.pink}"/><path d="M166 29 v14 M159 36 h14" stroke="#fff" stroke-width="4"/>
    <rect x="152" y="80" width="28" height="36" fill="${C.sky}"/><rect x="122" y="58" width="18" height="14" fill="${C.sky}"/><rect x="192" y="58" width="18" height="14" fill="${C.sky}"/>
    ${P(74, 116, C.lav, { arms: "hold" })}
    <path d="M90 82 l6 -16 M90 82 l12 -12 M90 82 l2 -18" stroke="${C.greenD}" stroke-width="1.6"/><circle cx="96" cy="64" r="4" fill="${C.pinkD}"/><circle cx="103" cy="68" r="4" fill="${C.yellow}"/><circle cx="91" cy="62" r="4" fill="${C.pink}"/>
    ${Pin(166, 122, .8)}`),

  marketIn: () => svg(`
    <rect x="16" y="8" width="208" height="110" rx="10" class="as al" stroke-width="2.6"/>
    <rect x="28" y="22" width="60" height="70" fill="#fff"/><path d="M28 44 h60 M28 66 h60" />
    <g stroke="none"><rect x="32" y="32" width="10" height="12" fill="${C.pinkD}"/><rect x="46" y="34" width="10" height="10" fill="${C.yellow}"/><rect x="60" y="30" width="10" height="14" fill="${C.blue}"/><rect x="74" y="34" width="10" height="10" fill="${C.greenD}"/>
    <rect x="34" y="54" width="12" height="12" fill="${C.peach}"/><rect x="50" y="56" width="10" height="10" fill="${C.lavD}"/><rect x="64" y="52" width="14" height="14" fill="${C.pink}"/></g>
    ${P(110, 116, C.pink, { s: .8 })}${P(140, 116, C.yellow, { s: .8, arms: "wave", hair: C.hair2 })}${P(170, 116, C.blue, { s: .8 })}${P(198, 116, C.lav, { s: .8, hair: C.hair2 })}`),

  marketAt: () => svg(`
    ${ground(116)}
    <rect x="100" y="34" width="124" height="82" fill="${C.white}"/>
    <path d="M96 34 h132 l-6 16 h-120z" fill="${C.pink}"/><path d="M118 34 l-2 16 M140 34 v16 M162 34 v16 M184 34 v16 M206 34 l2 16" stroke="#fff" stroke-width="3"/>
    <rect x="124" y="14" width="76" height="16" rx="4" fill="#fff"/>${txt(162, 26, "MARKET", 9.5)}
    <rect x="112" y="62" width="40" height="54" fill="${C.sky}"/><rect x="164" y="62" width="48" height="30" fill="${C.sky}"/>
    ${P(64, 116, C.yellow, { arms: "wave" })}${P(188, 116, C.blue, { arms: "wave", s: .8, hair: C.hair2 })}${Pin(132, 122, .8)}`),
};
