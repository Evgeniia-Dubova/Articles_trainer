// Іконка в єдиному лінійному стилі (колір береться з розділу через currentColor)
const ic = (name, size = 48, cls = "") =>
  `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
const lbl = (t) => `<span class="lbl">${t}</span>`;

// Дані: кожне правило → підказка + приклади (сцена + речення). [x] — прийменник.
const RULES = {
  in: {
    title: "IN",
    sub: "всередині чогось: простору, міста, води, території",
    rules: [
      { name: "Простори / кімнати", hint: "Є стіни навколо — ти всередині.", ex: [
        { scene: `<div class="room">${ic("chef-hat", 40)}${ic("cooking-pot", 34)}</div>${lbl("kitchen")}`,
          s: "Mom is [in] the kitchen.", ua: "Мама на кухні." },
        { scene: `<div class="room">${ic("sofa", 40)}${ic("cat", 30)}</div>${lbl("room")}`,
          s: "The cat is [in] the room.", ua: "Кіт у кімнаті." } ]},
      { name: "Міста / країни", hint: "Ти всередині кордонів.", ex: [
        { scene: `<div class="country">${ic("landmark", 44)}</div>${lbl("Paris")}`,
          s: "I live [in] Paris.", ua: "Я живу в Парижі." },
        { scene: `<div class="country c2">${ic("pizza", 44)}</div>${lbl("Italy")}`,
          s: "We are [in] Italy.", ua: "Ми в Італії." } ]},
      { name: "Вода", hint: "Тіло занурене у воду.", ex: [
        { scene: `<div class="water"></div><span class="in-water">${ic("person-standing", 46)}</span>`,
          s: "He is swimming [in] the sea.", ua: "Він плаває в морі." },
        { scene: `<div class="water"></div><span class="in-water deep">${ic("fish", 40)}</span>`,
          s: "Fish live [in] the river.", ua: "Риби живуть у річці." } ]},
      { name: "Напрямки / райони", hint: "Частина території — область всередині.", ex: [
        { scene: `<div class="map"><div class="hl">${ic("mountain-snow", 24)}</div><div></div><div></div></div><span class="compass">N ↑</span>${lbl("the north")}`,
          s: "It snows [in] the north.", ua: "На півночі йде сніг." },
        { scene: `<div class="map center"><div></div><div></div><div></div><div></div><div class="hl">${ic("building-2", 22)}</div><div></div><div></div><div></div><div></div></div>${lbl("city center")}`,
          s: "The hotel is [in] the city center.", ua: "Готель у центрі міста." } ]},
      { name: "Малий транспорт", hint: "Можна лише сидіти — не встанеш і не пройдешся.", ex: [
        { scene: `${ic("car-taxi-front", 64)}<span class="note">лише сидиш</span>`,
          s: "She is [in] a taxi.", ua: "Вона в таксі." },
        { scene: `${ic("helicopter", 64)}`,
          s: "They flew [in] a helicopter.", ua: "Вони летіли гелікоптером." } ]},
    ],
    exceptions: [["cloud", "in the sky"], ["globe", "in the world"], ["image", "in the picture"]],
  },
  on: {
    title: "ON",
    sub: "на поверхні або «на борту»",
    rules: [
      { name: "Поверхні", hint: "Предмет торкається поверхні зверху або збоку.", ex: [
        { scene: `<div class="surface">${ic("apple", 38)}<div class="bar"></div><div class="legs"><i></i><i></i></div></div>${lbl("table")}`,
          s: "The apple is [on] the table.", ua: "Яблуко на столі." },
        { scene: `<div class="wall">${ic("frame", 44)}</div>${lbl("wall")}`,
          s: "The picture is [on] the wall.", ua: "Картина на стіні." } ]},
      { name: "Великий транспорт", hint: "Всередині можна встати й пройтися.", ex: [
        { scene: `${ic("bus", 64)}${ic("person-standing", 34, "soft")}<span class="note">можна ходити</span>`,
          s: "I am [on] the bus.", ua: "Я в автобусі." },
        { scene: `${ic("plane", 60)}${ic("person-standing", 34, "soft")}`,
          s: "She is [on] a plane.", ua: "Вона в літаку." } ]},
      { name: "Техніка / медіа", hint: "Те, що на екрані чи в мережі.", ex: [
        { scene: `${ic("tv", 64)}${lbl("TV")}`,
          s: "The match is [on] TV.", ua: "Матч по телевізору." },
        { scene: `${ic("smartphone", 56)}`,
          s: "He is [on] the phone.", ua: "Він говорить по телефону." } ]},
      { name: "Поїздки на одного", hint: "Сидиш «верхи» на чомусь.", ex: [
        { scene: `${ic("bike", 50)}${ic("scooter", 44)}${ic("motorbike", 50)}`,
          s: "She goes to work [on] a bike.", ua: "Вона їздить на роботу велосипедом." } ]},
      { name: "Вулиці / поверхи", hint: "Назва вулиці без номера, номер поверху.", ex: [
        { scene: `<div class="street"></div><span class="sign">Green St.</span><span class="on-street">${ic("store", 44)}</span>`,
          s: "The shop is [on] Green Street.", ua: "Магазин на Грін-стріт." },
        { scene: `<div class="building"><div>3</div><div>2</div><div class="hl">1 ${ic("person-standing", 18)}</div><div>G</div></div>`,
          s: "My flat is [on] the first floor.", ua: "Моя квартира на першому поверсі." } ]},
    ],
    exceptions: [["footprints", "on foot"], ["radio", "on the radio"], ["tree-palm", "on holiday"]],
  },
  at: {
    title: "AT",
    sub: "точка на карті: поруч, на заході, за адресою",
    rules: [
      { name: "Точне місце", hint: "Ти біля — ні всередині, ні зверху.", ex: [
        { scene: `${ic("person-standing", 44, "soft")}${ic("door-open", 60)}<span class="pin"></span>`,
          s: "Someone is [at] the door.", ua: "Хтось біля дверей." },
        { scene: `${ic("person-standing", 44, "soft")}${ic("signpost", 58)}${lbl("bus stop")}`,
          s: "Wait for me [at] the bus stop.", ua: "Чекай мене на зупинці." } ]},
      { name: "Події", hint: "Ти присутній на заході.", ex: [
        { scene: `${ic("party-popper", 50)}${ic("cake", 44)}`,
          s: "We met [at] a party.", ua: "Ми познайомились на вечірці." },
        { scene: `${ic("guitar", 50)}${ic("mic-vocal", 44)}`,
          s: "They are [at] a concert.", ua: "Вони на концерті." } ]},
      { name: "Адреса з номером", hint: "Є номер будинку → AT. Без номера → ON.", ex: [
        { scene: `<div class="street"></div><span class="sign">Green St.</span><span class="on-street">${ic("house", 46)}<span class="plate">25</span></span>`,
          s: "She lives [at] 25 Green Street.", ua: "Вона живе на Грін-стріт, 25." } ]},
      { name: "Верх / низ чогось", hint: "Конкретна точка: at the top / at the bottom.", ex: [
        { scene: `<div class="paper"><i class="hl"></i><i></i><i></i><i></i><i></i><i></i><span class="arrow">← top</span></div>`,
          s: "Write your name [at] the top of the page.", ua: "Напиши ім'я вгорі сторінки." } ]},
      { name: "Послуги / фахівці", hint: "У когось на прийомі: at the doctor's.", ex: [
        { scene: `${ic("stethoscope", 56)}${lbl("doctor's")}`,
          s: "I'm [at] the doctor's.", ua: "Я в лікаря." },
        { scene: `${ic("toothbrush", 56)}${lbl("dentist's")}`,
          s: "He is [at] the dentist's.", ua: "Він у стоматолога." } ]},
      { name: "Чийсь дім", hint: "at + ім'я + 's.", ex: [
        { scene: `<span class="on-street">${ic("house", 58)}<span class="plate">John's</span></span>${ic("gamepad-2", 36, "soft")}`,
          s: "We're [at] John's tonight.", ua: "Ми сьогодні в Джона." } ]},
    ],
    exceptions: [["house", "at home"], ["briefcase", "at work"], ["shopping-cart", "at the supermarket"]],
  },
};

const VS = [
  { title: "prison",
    in: { scene: `${ic("lock", 48)}${ic("user", 40, "soft")}`, s: "She is [in] prison.", ua: "Вона ув'язнена." },
    at: { scene: `${ic("broom", 44)}${ic("building-2", 44, "soft")}`, s: "She is [at] prison.", ua: "Вона там працює чи відвідує." } },
  { title: "hospital",
    in: { scene: `${ic("bed", 50)}`, s: "He is [in] the hospital.", ua: "Він пацієнт." },
    at: { scene: `${ic("flower", 40)}${ic("hospital", 46, "soft")}`, s: "He is [at] hospital.", ua: "Він відвідує чи працює." } },
  { title: "supermarket",
    in: { scene: `${ic("users", 46)}${ic("shopping-cart", 40, "soft")}`, s: "Lots of people [in] the supermarket.", ua: "Саме всередині будівлі." },
    at: { scene: `${ic("user", 40)}${ic("store", 46, "soft")}`, s: "I met a friend [at] the supermarket.", ua: "Десь там — неважливо, де саме." } },
];

const sentence = (s) => s.replace(/\[(.+?)\]/g, '<span class="prep" tabindex="0">$1</span>');
const exHTML = (e) => `<div class="ex"><div class="scene">${e.scene}</div>
  <p class="sentence">${sentence(e.s)}</p><p class="ua">${e.ua}</p></div>`;

const rulesEl = document.getElementById("rules");
for (const [key, b] of Object.entries(RULES)) {
  const cards = b.rules.map(r => `
    <article class="card glass ${key}">
      <h3><span class="tag">${b.title}</span>${r.name}</h3>
      <p class="hint">${r.hint}</p>
      <div class="examples">${r.ex.map(exHTML).join("")}</div>
    </article>`).join("");
  const exc = `
    <article class="card glass exceptions ${key}">
      <h3><span class="tag">!</span>Винятки — просто запам'ятай</h3>
      <div class="ex-row">${b.exceptions.map(([i, s]) => `<div class="chip">${ic(i, 36)}<span class="s">${s}</span></div>`).join("")}</div>
    </article>`;
  rulesEl.insertAdjacentHTML("beforeend", `
    <section id="${key}" class="block ${key}">
      <div class="block-head"><span class="badge badge-${key}">${b.title}</span><p>${b.sub}</p></div>
      <div class="grid">${cards}${exc}</div>
    </section>`);
}

document.getElementById("vsGrid").innerHTML = VS.map(v => `
  <article class="vs-card glass">
    <h3>${v.title}</h3>
    <div class="vs-pair">
      <div class="vs-in"><span class="side-tag">IN</span>${exHTML(v.in)}</div>
      <div class="vs-at"><span class="side-tag">AT</span>${exHTML(v.at)}</div>
    </div>
  </article>`).join("");

// Режим «Перевір себе»
const toggle = document.getElementById("quizMode");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("quiz", toggle.checked);
  document.querySelectorAll(".prep.shown").forEach(p => p.classList.remove("shown"));
});
const reveal = (t) => { if (document.body.classList.contains("quiz") && t.classList.contains("prep")) t.classList.add("shown"); };
document.addEventListener("click", (e) => reveal(e.target));
document.addEventListener("keydown", (e) => { if (e.key === "Enter") reveal(e.target); });
