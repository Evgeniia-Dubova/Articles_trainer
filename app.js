// Дані: кожне правило → підказка + приклади (сцена + речення). [x] — прийменник.
const RULES = {
  in: {
    title: "IN",
    sub: "всередині чогось: простору, міста, води, території",
    rules: [
      { name: "Простори / кімнати", hint: "Є стіни навколо — ти всередині.", ex: [
        { scene: `<div class="room"><span class="e1">👩‍🍳</span><span class="e2">🍳</span></div><span class="lbl">kitchen</span>`,
          s: "Mom is [in] the kitchen.", ua: "Мама на кухні." },
        { scene: `<div class="room"><span class="e1">🛋️</span><span class="e2">🐱</span></div><span class="lbl">room</span>`,
          s: "The cat is [in] the room.", ua: "Кіт у кімнаті." } ]},
      { name: "Міста / країни", hint: "Ти всередині кордонів.", ex: [
        { scene: `<div class="country"><span class="e1">🗼</span></div><span class="lbl">Paris</span>`,
          s: "I live [in] Paris.", ua: "Я живу в Парижі." },
        { scene: `<div class="country"><span class="e1">🍕</span><span class="e2">🇮🇹</span></div><span class="lbl">Italy</span>`,
          s: "We are [in] Italy.", ua: "Ми в Італії." } ]},
      { name: "Вода", hint: "Тіло занурене у воду.", ex: [
        { scene: `<div class="water"></div><span class="swimmer">🏊</span>`,
          s: "He is swimming [in] the sea.", ua: "Він плаває в морі." },
        { scene: `<div class="water"></div><span class="swimmer">🐟</span>`,
          s: "Fish live [in] the river.", ua: "Риби живуть у річці." } ]},
      { name: "Напрямки / райони", hint: "Частина території — область всередині.", ex: [
        { scene: `<div class="map"><div class="hl">🏔️</div><div></div><div></div></div><span class="compass">N ↑</span><span class="lbl">the north</span>`,
          s: "It snows [in] the north.", ua: "На півночі йде сніг." },
        { scene: `<div class="map center"><div></div><div></div><div></div><div></div><div class="hl">🏙️</div><div></div><div></div><div></div><div></div></div><span class="lbl">city center</span>`,
          s: "The hotel is [in] the city center.", ua: "Готель у центрі міста." } ]},
      { name: "Малий транспорт", hint: "Можна лише сидіти — не встанеш і не пройдешся.", ex: [
        { scene: `<span class="e1" style="font-size:3.4rem">🚕</span><span class="e2">🧑‍💼</span>`,
          s: "She is [in] a taxi.", ua: "Вона в таксі." },
        { scene: `<span class="e1" style="font-size:3.4rem">🚁</span>`,
          s: "They flew [in] a helicopter.", ua: "Вони летіли гелікоптером." } ]},
    ],
    exceptions: [["☁️✈️","in the sky"],["🌍","in the world"],["🖼️","in the picture"]],
  },
  on: {
    title: "ON",
    sub: "на поверхні або «на борту»",
    rules: [
      { name: "Поверхні", hint: "Предмет торкається поверхні зверху або збоку.", ex: [
        { scene: `<div class="surface"><span class="e1">🍎</span><div class="bar"></div><div class="legs"><i></i><i></i></div></div><span class="lbl">table</span>`,
          s: "The apple is [on] the table.", ua: "Яблуко на столі." },
        { scene: `<div class="wall"><span class="e1">🖼️</span></div><span class="lbl">wall</span>`,
          s: "The picture is [on] the wall.", ua: "Картина на стіні." } ]},
      { name: "Великий транспорт", hint: "Всередині можна встати й пройтися.", ex: [
        { scene: `<span class="e1" style="font-size:3.6rem">🚌</span><span class="e2">🚶</span>`,
          s: "I am [on] the bus.", ua: "Я в автобусі." },
        { scene: `<span class="e1" style="font-size:3.4rem">✈️</span><span class="e2">🚶‍♀️</span>`,
          s: "She is [on] a plane.", ua: "Вона в літаку." } ]},
      { name: "Техніка / медіа", hint: "Те, що на екрані чи в мережі.", ex: [
        { scene: `<div class="screen"><span class="e1">⚽</span></div><span class="lbl">TV</span>`,
          s: "The match is [on] TV.", ua: "Матч по телевізору." },
        { scene: `<span class="e1">📱</span><span class="e2">💬</span>`,
          s: "He is [on] the phone.", ua: "Він говорить по телефону." } ]},
      { name: "Поїздки на одного", hint: "Сидиш «верхи» на чомусь.", ex: [
        { scene: `<span class="e1">🚴</span><span class="e1">🏇</span><span class="e1">🛴</span>`,
          s: "She goes to work [on] a bike.", ua: "Вона їздить на роботу велосипедом." } ]},
      { name: "Вулиці / поверхи", hint: "Назва вулиці без номера, номер поверху.", ex: [
        { scene: `<div class="street"></div><span class="sign">Green St.</span><span class="e1" style="position:relative;top:-20px">🏪</span>`,
          s: "The shop is [on] Green Street.", ua: "Магазин на Грін-стріт." },
        { scene: `<div class="building"><div>3</div><div>2</div><div class="hl">1 <span>🧍</span></div><div>G</div></div>`,
          s: "My flat is [on] the first floor.", ua: "Моя квартира на першому поверсі." } ]},
    ],
    exceptions: [["🚶","on foot"],["📻","on the radio"],["🏖️","on holiday"]],
  },
  at: {
    title: "AT",
    sub: "точка на карті: поруч, на заході, за адресою",
    rules: [
      { name: "Точне місце", hint: "Ти біля — ні всередині, ні зверху.", ex: [
        { scene: `<span class="e1">🧍</span><span class="e1" style="font-size:3.4rem">🚪</span>`,
          s: "Someone is [at] the door.", ua: "Хтось біля дверей." },
        { scene: `<span class="e1">🧍‍♀️</span><span class="e1" style="font-size:3.2rem">🚏</span>`,
          s: "Wait for me [at] the bus stop.", ua: "Чекай мене на зупинці." } ]},
      { name: "Події", hint: "Ти присутній на заході.", ex: [
        { scene: `<span class="e1">🎉</span><span class="e1">🥳</span><span class="e1">🎂</span>`,
          s: "We met [at] a party.", ua: "Ми познайомились на вечірці." },
        { scene: `<span class="e1">🎸</span><span class="e1">🎤</span><span class="e1">🙌</span>`,
          s: "They are [at] a concert.", ua: "Вони на концерті." } ]},
      { name: "Адреса з номером", hint: "Є номер будинку → AT. Без номера → ON.", ex: [
        { scene: `<div class="street"></div><span class="e1" style="font-size:3.2rem;position:relative;top:-22px">🏠</span><span class="plate" style="top:22px;left:calc(50% + 26px)">25</span><span class="sign">Green St.</span>`,
          s: "She lives [at] 25 Green Street.", ua: "Вона живе на Грін-стріт, 25." } ]},
      { name: "Верх / низ чогось", hint: "Конкретна точка: at the top / at the bottom.", ex: [
        { scene: `<div class="paper"><i class="hl"></i><i></i><i></i><i></i><i></i><i></i><span class="arrow" style="top:0">⬅️</span></div>`,
          s: "Write your name [at] the top of the page.", ua: "Напиши ім'я вгорі сторінки." } ]},
      { name: "Послуги / фахівці", hint: "У когось на прийомі: at the doctor's.", ex: [
        { scene: `<span class="e1">🧑‍⚕️</span><span class="e1">🩺</span>`,
          s: "I'm [at] the doctor's.", ua: "Я в лікаря." },
        { scene: `<span class="e1">🦷</span><span class="e1">🪥</span>`,
          s: "He is [at] the dentist's.", ua: "Він у стоматолога." } ]},
      { name: "Чийсь дім", hint: "at + ім'я + 's.", ex: [
        { scene: `<span class="e1" style="font-size:3.2rem">🏡</span><span class="plate" style="top:16px;left:calc(50% + 20px);background:var(--at)">John's</span><span class="e2">🍕🎮</span>`,
          s: "We're [at] John's tonight.", ua: "Ми сьогодні в Джона." } ]},
    ],
    exceptions: [["🏠","at home"],["💼","at work"],["🛒","at the supermarket"]],
  },
};

const VS = [
  { title: "prison", in: { scene: `<span class="e1">🧑‍🦲</span><span class="e1">⛓️</span>`, s: "She is [in] prison.", ua: "Вона ув'язнена." },
                     at: { scene: `<span class="e1">🧹</span><span class="e1">🏢</span>`, s: "She is [at] prison.", ua: "Вона там працює чи відвідує." } },
  { title: "hospital", in: { scene: `<span class="e1">🤒</span><span class="e1">🛏️</span>`, s: "He is [in] the hospital.", ua: "Він пацієнт." },
                       at: { scene: `<span class="e1">💐</span><span class="e1">🏥</span>`, s: "He is [at] hospital.", ua: "Він відвідує чи працює." } },
  { title: "supermarket", in: { scene: `<span class="e1">🛒</span><span class="e1">👥</span>`, s: "Lots of people [in] the supermarket.", ua: "Саме всередині будівлі." },
                          at: { scene: `<span class="e1">🙋</span><span class="e1">🏪</span>`, s: "I met a friend [at] the supermarket.", ua: "Десь там — неважливо, де саме." } },
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
      <div class="ex-row">${b.exceptions.map(([e, s]) => `<div class="chip"><span class="e">${e}</span><span class="s">${s}</span></div>`).join("")}</div>
    </article>`;
  rulesEl.insertAdjacentHTML("beforeend", `
    <section id="${key}" class="block">
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
