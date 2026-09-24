(() => {
  "use strict";
  const D = window.CULTIVATION_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const random = (items) => items[Math.floor(Math.random() * items.length)];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const labels = { cultivation: "修为", luck: "气运", stones: "灵石", lifespan: "寿元", injury: "伤势", age: "年岁", mind: "心境", spirit: "神识" };
  const state = { profile: null, step: 0, history: [], flags: {}, event: null, realm: "凡人", creation: null };

  function makeProfile(config) {
    const values = D.roots.map(() => 8 + Math.floor(Math.random() * 73));
    if (config.root !== "random") {
      const rootIndex = D.roots.findIndex((root) => root.name === config.root);
      values[rootIndex] = Math.max(65, Math.min(95, values[rootIndex] + 22));
    }
    const dominant = Math.max(...values);
    const active = values.filter((value) => value >= 35).length;
    const rootGrade = dominant >= 90 && active === 1 ? "天灵根" : dominant >= 70 && active <= 2 ? "双灵根" : active <= 3 ? "三灵根" : "伪灵根";
    const profile = {
      name: config.name || random(D.surnames) + random(D.givenNames), origin: config.background.origin, personality: random(D.personalities),
      insight: random(D.insights), roots: values, rootGrade, age: 12, lifespan: 66 + Math.floor(Math.random() * 28),
      cultivation: 0, stones: Math.floor(Math.random() * 9), luck: 2 + Math.floor(Math.random() * 8), injury: 0,
      mind: 3 + Math.floor(Math.random() * 5), spirit: 2 + Math.floor(Math.random() * 4),
      sect: "未入门", omen: random(D.omens), creation: config
    };
    [config.background, ...config.talents, config.aspiration].forEach((item) => applyEffects(profile, item.effects));
    if (config.talents.some((talent) => talent.id === "quickStudy")) {
      const index = Math.min(D.insights.length - 1, D.insights.indexOf(profile.insight) + 1);
      profile.insight = D.insights[index];
    }
    profile.injury = clamp(profile.injury, 0, 6);
    return profile;
  }

  function openCreation() {
    state.creation = { name: "", backgroundId: null, root: null, talentIds: [], aspirationId: null };
    $("#custom-name").value = ""; $("#creation-warning").textContent = ""; renderCreation(); showScreen("creation-screen");
  }

  function renderCreation() {
    const c = state.creation;
    $("#background-options").innerHTML = D.creation.backgrounds.map((item) => creationButton(item, c.backgroundId === item.id, "background")).join("");
    const rootItems = [...D.roots.map((root) => ({ id: root.name, name: `${root.name}灵根`, note: `提高${root.name}属性` })), { id: "random", name: "听天由命", note: "五行完全随机" }];
    $("#root-options").innerHTML = rootItems.map((item) => creationButton(item, c.root === item.id, "root")).join("");
    $("#talent-options").innerHTML = D.creation.talents.map((item) => creationButton(item, c.talentIds.includes(item.id), "talent")).join("");
    $("#aspiration-options").innerHTML = D.creation.aspirations.map((item) => creationButton(item, c.aspirationId === item.id, "aspiration")).join("");
    $("#talent-count").textContent = `${c.talentIds.length} / 2`;
    $$("[data-creation-group]").forEach((button) => button.addEventListener("click", () => selectCreation(button.dataset.creationGroup, button.dataset.id)));
  }

  function creationButton(item, selected, group) {
    const role = group === "talent" ? "checkbox" : "radio";
    return `<button type="button" class="creation-option ${selected ? "selected" : ""}" role="${role}" aria-checked="${selected}" data-creation-group="${group}" data-id="${item.id}"><strong>${item.name}</strong><small>${item.note}</small></button>`;
  }

  function selectCreation(group, id) {
    const c = state.creation; $("#creation-warning").textContent = "";
    if (group === "background") c.backgroundId = id;
    if (group === "root") c.root = id;
    if (group === "aspiration") c.aspirationId = id;
    if (group === "talent") {
      if (c.talentIds.includes(id)) c.talentIds = c.talentIds.filter((item) => item !== id);
      else if (c.talentIds.length < 2) c.talentIds.push(id);
      else { $("#creation-warning").textContent = "初始天赋最多选择两项。"; return; }
    }
    renderCreation();
  }

  function resolveCreation(randomize = false) {
    const c = state.creation;
    if (randomize) {
      c.backgroundId = random(D.creation.backgrounds).id; c.root = random([...D.roots.map((root) => root.name), "random"]);
      c.talentIds = shuffle(D.creation.talents).slice(0, 2).map((item) => item.id); c.aspirationId = random(D.creation.aspirations).id;
    } else c.name = $("#custom-name").value.trim();
    if (!c.backgroundId || !c.root || c.talentIds.length !== 2 || !c.aspirationId) {
      $("#creation-warning").textContent = "请完成出身、灵根倾向、两项天赋与修仙志向。"; return null;
    }
    return {
      name: c.name, root: c.root,
      background: D.creation.backgrounds.find((item) => item.id === c.backgroundId),
      talents: c.talentIds.map((id) => D.creation.talents.find((item) => item.id === id)),
      aspiration: D.creation.aspirations.find((item) => item.id === c.aspirationId)
    };
  }

  function startLife(randomize = false) {
    const config = resolveCreation(randomize); if (!config) return;
    state.profile = makeProfile(config); state.step = 0; state.history = []; state.flags = collectCreationFlags(config); state.event = null; state.realm = "凡人";
    renderProfile(); showScreen("profile-screen");
  }

  function renderProfile() {
    const p = state.profile;
    $("#profile-name").textContent = p.name; $("#profile-origin").textContent = p.origin;
    $("#profile-root").textContent = p.rootGrade; $("#profile-insight").textContent = p.insight;
    $("#profile-luck").textContent = luckName(p.luck); $("#profile-personality").textContent = p.personality;
    $("#profile-lifespan").textContent = `${p.lifespan} 年`; $("#profile-stones").textContent = `${p.stones} 枚`;
    $("#omen-text").textContent = p.omen;
    $("#chosen-fate").textContent = `${p.creation.background.name} · ${p.creation.talents.map((item) => item.name).join(" / ")} · ${p.creation.aspiration.name}`;
    $("#spirit-roots").innerHTML = D.roots.map((root, i) => `<div class="root-bar"><div class="root-meter"><i style="--value:${p.roots[i]}%;--root-color:${root.color}"></i></div><b>${root.name}</b><small>${p.roots[i]}</small></div>`).join("");
  }

  function applyEffects(target, effects = {}) { Object.entries(effects).forEach(([key, value]) => { if (typeof target[key] === "number") target[key] += value; }); }
  function collectCreationFlags(config) { return [config.background, ...config.talents, config.aspiration].reduce((flags, item) => Object.assign(flags, item.flags || {}), {}); }
  function shuffle(items) { return [...items].sort(() => Math.random() - .5); }

  function enterWorld() { showScreen("game-screen"); buildJourneyDots(); loadEvent(); }
  function meets(requires = {}) { return Object.entries(requires).every(([key, value]) => state.flags[key] === value); }

  function loadEvent() {
    if (state.step >= 14) { finishLife(); return; }
    if (state.step === 8 && !["筑基", "结丹", "元婴"].includes(state.realm)) { finishLife(); return; }
    if (state.step === 11 && !["结丹", "元婴"].includes(state.realm)) { finishLife(); return; }
    const candidates = D.events.filter((event) => event.stage === state.step && meets(event.requires));
    const specific = candidates.filter((event) => event.requires);
    state.event = random(specific.length ? specific : candidates);
    if (!state.event) throw new Error(`第 ${state.step + 1} 阶段没有可用事件`);
    renderEvent();
  }

  function renderEvent() {
    const event = state.event; const p = state.profile;
    const card = $("#event-card"); card.classList.remove("transitioning"); void card.offsetWidth; card.classList.add("transitioning");
    $("#event-year").textContent = `${p.age}岁 · ${random(["仲春", "长夏", "白露", "霜降", "岁暮"])}`;
    $("#event-step").textContent = `第${["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四"][state.step]}劫 / 共十四劫`;
    $("#event-kicker").textContent = event.kicker; $("#event-title").textContent = event.title; $("#event-copy").textContent = event.text;
    $("#easter-egg").classList.toggle("hidden", !event.easter); $("#easter-copy").textContent = event.easter || "";
    $("#outcome").classList.add("hidden");
    const available = event.choices.filter((choice) => meets(choice.requires));
    $("#choices").classList.remove("hidden");
    $("#choices").innerHTML = available.map((choice, index) => `<button class="choice-button" type="button" data-choice="${index}"><strong>${choice.label}</strong><small>${choice.hint}</small></button>`).join("");
    $$(".choice-button").forEach((button, index) => button.addEventListener("click", () => choose(available[index])));
    updateStatus(); updateDots();
  }

  function choose(choice) {
    $$(".choice-button").forEach((button) => { button.disabled = true; });
    const effects = { ...choice.effects };
    const conditionals = [...(choice.conditionals || []), ...(choice.conditional ? [choice.conditional] : [])];
    let echoed = false;
    conditionals.forEach((conditional) => {
      if (!state.flags[conditional.flag]) return;
      Object.entries(conditional.effects).forEach(([key, value]) => { effects[key] = (effects[key] || 0) + value; }); echoed = true;
    });
    if (echoed) toast("往日因果有所回应");
    Object.entries(effects).forEach(([key, value]) => { if (typeof state.profile[key] === "number") state.profile[key] += value; });
    state.profile.stones = Math.max(0, state.profile.stones); state.profile.injury = clamp(state.profile.injury, 0, 6);
    Object.assign(state.flags, choice.set || {}); if (choice.set?.sect) state.profile.sect = choice.set.sect;
    updateRealm();
    state.history.push({ title: state.event.title, choice: choice.label, result: choice.result, effects: { ...effects }, age: state.profile.age });
    $("#choices").classList.add("hidden"); $("#outcome").classList.remove("hidden"); $("#outcome-copy").textContent = choice.result;
    $("#changes").innerHTML = Object.entries(effects).filter(([, value]) => value !== 0).map(([key, value]) => `<span class="change-pill ${isPositive(key, value) ? "good" : "bad"}">${labels[key] || key} ${value > 0 ? "+" : ""}${value}</span>`).join("");
    updateStatus(); updateDots();
    if (state.realm === "炼气" && !state.flags.enteredQi) { state.flags.enteredQi = true; toast("灵气入体 · 踏入炼气"); }
    if (state.realm === "筑基" && !state.flags.foundationToast) { state.flags.foundationToast = true; toast("道基已成 · 寿增一甲子"); }
  }

  function continueJourney() { state.step += 1; loadEvent(); }

  function updateRealm() {
    const p = state.profile;
    const previous = state.realm;
    const foundationSupport = state.flags.foundationHerb || state.flags.forceFoundation || (state.flags.clearHeart && p.luck >= 8);
    const coreSupport = state.flags.coreIncense || state.flags.blackWaterPearl || state.flags.coreNotes;
    const soulSupport = state.flags.soulReady && (state.flags.balancedSoul || state.flags.forceSoul);
    if (state.flags.attemptedSoul && p.cultivation >= 250 && p.mind >= 16 && p.spirit >= 15 && p.injury <= 6 && soulSupport) {
      if (!state.flags.soulSucceeded) p.lifespan += 260;
      state.realm = "元婴"; state.flags.soulSucceeded = true;
    } else if (state.flags.attemptedCore && p.cultivation >= 170 && p.mind >= 8 && p.spirit >= 6 && p.injury <= 5 && coreSupport) {
      if (!state.flags.coreSucceeded) p.lifespan += 120;
      state.realm = "结丹"; state.flags.coreSucceeded = true;
    } else if (state.flags.attemptedFoundation && p.cultivation >= 88 && p.injury <= 5 && foundationSupport) {
      if (!state.flags.foundationSucceeded) p.lifespan += 55;
      state.realm = "筑基"; state.flags.foundationSucceeded = true;
    } else if (state.flags.foundationSucceeded) state.realm = "筑基";
    else if (p.cultivation >= 10) state.realm = "炼气"; else state.realm = "凡人";
    document.body.dataset.realm = state.realm;
    if (previous !== state.realm && ["筑基", "结丹", "元婴"].includes(state.realm)) triggerBreakthrough(state.realm);
  }

  function updateStatus() {
    const p = state.profile;
    $("#status-name").textContent = p.name; $("#status-origin").textContent = p.origin; $("#avatar-seal").textContent = p.name.slice(0, 1);
    $("#status-realm").textContent = state.realm; $("#status-age").textContent = p.age; $("#status-lifespan").textContent = p.lifespan;
    $("#status-stones").textContent = p.stones; $("#status-luck").textContent = p.luck; $("#status-mind").textContent = p.mind; $("#status-spirit").textContent = p.spirit; $("#status-injury").textContent = injuryName(p.injury); $("#status-sect").textContent = p.sect;
    const ranges = { "凡人": [0, 10], "炼气": [10, 90], "筑基": [90, 170], "结丹": [170, 250], "元婴": [250, 340] };
    const [base, target] = ranges[state.realm];
    $("#cultivation-progress").style.width = `${clamp(((p.cultivation - base) / (target - base)) * 100, 0, 100)}%`;
    $("#cultivation-label").textContent = state.realm === "元婴" ? `元神初成 · 修为 ${p.cultivation}` : `修为 ${p.cultivation} / ${target}`;
  }

  function buildJourneyDots() { $("#journey-dots").innerHTML = Array.from({ length: 14 }, () => "<i></i>").join(""); }
  function updateDots() { $$("#journey-dots i").forEach((dot, index) => dot.classList.toggle("done", index <= state.step)); }

  async function finishLife() {
    updateRealm();
    const p = state.profile; const ending = getEnding(); const lived = Math.max(p.age, p.lifespan - p.injury * 3 + Math.floor(Math.random() * 12));
    $("#ending-rank").textContent = ending.rank; $("#ending-age").textContent = `${lived} 岁`; $("#ending-realm").textContent = state.realm;
    $("#ending-name").textContent = ending.name; $("#ending-verdict").textContent = ending.verdict;
    $("#key-deeds").innerHTML = selectDeeds().map((deed) => `<li>${deed}</li>`).join("");
    $("#biography-copy").innerHTML = "<p>命书正在梳理这一世的因果……</p>"; $("#biography-badge").textContent = "正在推演…"; $("#biography-badge").classList.remove("ready");
    showScreen("ending-screen");
    await new Promise((resolve) => setTimeout(resolve, document.body.classList.contains("quiet-motion") ? 20 : 850));
    const paragraphs = await generateBiography(ending, lived);
    $("#biography-copy").innerHTML = paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
    $("#biography-badge").textContent = "传记已成"; $("#biography-badge").classList.add("ready");
  }

  function getEnding() {
    const p = state.profile;
    if (state.realm === "元婴") return { rank: "天签 · 元婴归一", name: p.luck >= 15 ? "星海元君" : "天南真君", verdict: "金丹碎而元神生。你跨过寿元、心魔与天雷三重天堑，终于能以元婴之身俯看山河。此后世间仍有强敌，却再没有凡俗岁月能困住你。" };
    if (state.realm === "结丹") return { rank: "上签 · 金丹照海", name: state.flags.refusedSoul ? "守丹真人" : "金丹真人", verdict: "你把百年修为凝作一颗金丹，曾直面元婴天门，也懂得何时收手。大道未尽，这份完整归来的清醒同样珍贵。" };
    if (state.realm === "筑基") return { rank: "中上签 · 道基初成", name: p.luck >= 12 ? "天南隐修" : "筑基修士", verdict: "你从微末中走来，终于让体内灵气凝液成海。结丹机缘未至，道基却已足以让你守住一方山水。" };
    if (p.cultivation >= 72) return { rank: "中签 · 半步道基", name: state.flags.refusedGamble ? "守拙散人" : "炼气宿老", verdict: "你曾站在筑基门前，却没有把性命轻易交给一场豪赌。大道未成，这份知进退的清醒却让许多人记住了你。" };
    if (p.luck >= 12) return { rank: "中签 · 善缘长存", name: state.flags.savedMiners ? "百灯客" : "有缘人", verdict: "你未能跨过所有天堑，却在漫长岁月里留下许多善因。后来者提及你时，谈的不是境界，而是你曾伸出的手。" };
    return { rank: "平签 · 尘中求道", name: "寻道客", verdict: "仙途没有许诺你长生。你以寻常根骨走过不寻常的路，得失都由自己承担，这已胜过世间许多未曾启程之人。" };
  }

  function selectDeeds() {
    const important = state.history.filter((item) => ["血色禁地的边缘", "道台之上", "金丹火候", "碎岛雷夜", "碎丹成婴"].includes(item.title));
    const rest = state.history.filter((item) => !important.includes(item));
    return [...important, ...rest].slice(0, 5).map((item) => `${item.age}岁，${item.choice}。`);
  }

  async function generateBiography(ending, lived) {
    const p = state.profile; const h = state.history;
    const opening = `${p.name}，${p.origin}人，生来${p.rootGrade}，悟性${p.insight}。少年时性情${p.personality.replace(" · ", "而")}，本应在尘世度过平常一生，却在十六岁那年望见了仙门。`;
    const middleA = `初入道途，${h[0].result}${h[1] ? `后来${h[1].result}` : ""}这些不起眼的选择，渐渐把命运推向了无人能预料的方向。`;
    const middleB = `${h.slice(2, 8).map((item) => item.result).join("")}筑基之后，${p.name}才明白，修为越高，选择的代价也越重。世人只看见境界进退，唯有自己知道，每一次活下来，都有旧日因果在暗处回响。`;
    const coreChapter = h.length > 10 ? `${h.slice(8, 11).map((item) => item.result).join("")}金丹照海之时，凡尘往事并未远去，反而化成识海中最清晰的倒影。` : `此生机缘终于止于${state.realm}。未走完的海路与未凝成的金丹，成为命书末页的一点余白。`;
    const close = state.realm === "元婴"
      ? `最终，第九道雷劫落下，${p.name}碎丹成婴，寿至${lived}岁。后人称其为“${ending.name}”。回望来路，真正托起元婴的并非某一件异宝，而是凡人岁月里每一次不肯退后的选择。`
      : `此后，${p.name}以${state.realm}修为行走世间，享年${lived}岁，身后得名“${ending.name}”。未至元婴并非命书空白；每一页都写着一个凡人如何向天命多走了一步。`;
    return [opening, middleA, middleB, coreChapter, close];
  }

  function showScreen(id) { $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === id)); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function luckName(value) { return value >= 9 ? "鸿运" : value >= 6 ? "尚佳" : value >= 3 ? "平常" : "低迷"; }
  function injuryName(value) { return value <= 0 ? "无恙" : value <= 2 ? "轻伤" : value <= 4 ? "沉疴" : "重创"; }
  function isPositive(key, value) { return key === "injury" ? value < 0 : value > 0; }
  function toast(message) { const node = document.createElement("div"); node.className = "toast"; node.textContent = message; $("#toast-layer").appendChild(node); setTimeout(() => node.remove(), 2800); }
  function createAura() { const field = $("#aura-field"); for (let i = 0; i < 20; i += 1) { const node = document.createElement("i"); node.className = "aura"; node.style.left = `${Math.random() * 100}vw`; node.style.setProperty("--duration", `${10 + Math.random() * 16}s`); node.style.setProperty("--delay", `${-Math.random() * 20}s`); field.appendChild(node); } }
  function toggleMotion() { const quiet = document.body.classList.toggle("quiet-motion"); $("#motion-toggle").setAttribute("aria-pressed", String(quiet)); $("#motion-toggle").textContent = quiet ? "恢复动效" : "静息动效"; }
  function triggerBreakthrough(realm) { document.body.classList.remove("breakthrough"); void document.body.offsetWidth; document.body.classList.add("breakthrough"); toast(`${realm}境 · 突破功成`); setTimeout(() => document.body.classList.remove("breakthrough"), 1300); }

  function registerWebMCP() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const register = (tool) => Promise.resolve(context.registerTool(tool)).catch(() => {});
    register({
      name: "start_new_cultivation_life", title: "开启新一世修仙",
      description: "随机生成一名新角色，并把可见页面切换到此世根骨。",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute() { openCreation(); startLife(true); return { name: state.profile.name, origin: state.profile.origin, rootGrade: state.profile.rootGrade }; }
    });
    register({
      name: "choose_current_event_option", title: "选择当前事件",
      description: "按从 1 开始的序号选择当前修仙事件中的一个可见选项，并结算属性与因果。",
      inputSchema: { type: "object", properties: { option: { type: "integer", minimum: 1, maximum: 4 } }, required: ["option"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!state.event || $("#choices").classList.contains("hidden")) throw new Error("当前没有等待选择的事件");
        const available = state.event.choices.filter((choice) => meets(choice.requires));
        const index = Number(input?.option) - 1;
        if (!Number.isInteger(index) || !available[index]) throw new Error("选项序号无效");
        choose(available[index]);
        return { event: state.event.title, choice: available[index].label, realm: state.realm, cultivation: state.profile.cultivation };
      }
    });
  }

  $("#start-button").addEventListener("click", openCreation); $("#enter-world-button").addEventListener("click", enterWorld);
  $("#confirm-creation-button").addEventListener("click", () => startLife(false)); $("#random-life-button").addEventListener("click", () => startLife(true));
  $("#continue-button").addEventListener("click", continueJourney); $("#restart-button").addEventListener("click", openCreation);
  $("#motion-toggle").addEventListener("click", toggleMotion); $(".brand").addEventListener("click", (event) => { event.preventDefault(); showScreen("start-screen"); });
  createAura(); registerWebMCP();
})();
