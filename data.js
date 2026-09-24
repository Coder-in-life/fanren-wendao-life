window.CULTIVATION_DATA = {
  surnames: ["沈", "顾", "陆", "宁", "白", "谢", "孟", "林", "江", "苏", "纪", "程"],
  givenNames: ["长安", "砚秋", "云舟", "照野", "清和", "怀真", "知微", "暮川", "青崖", "闻溪", "守拙", "行止"],
  origins: ["越国镜州山村", "溪州药农之家", "岚州没落书香门第", "青牛集铁匠铺", "胥京商贾旁支", "嘉元城外猎户之家"],
  personalities: ["谨慎 · 坚韧", "寡言 · 重诺", "机敏 · 好奇", "淡泊 · 守拙", "果决 · 多疑", "温厚 · 执拗"],
  insights: ["愚钝", "平常", "通透", "敏锐", "天悟"],
  omens: [
    "土木相生，早岁多艰。若能守心藏锋，微末之中亦有登云之机。",
    "命火藏于静水，机缘常在险处。切记：见利时慢一步，逢危时快一步。",
    "金气虽薄，心性可补。此世贵人难求，却有一桩旧因果暗随左右。",
    "五行驳杂，仙途未必断绝。凡人一念若能坚持，也可叫山河换颜色。"
  ],
  roots: [
    { name: "金", color: "#b9a46e" }, { name: "木", color: "#5f825f" },
    { name: "水", color: "#567a86" }, { name: "火", color: "#9d5142" },
    { name: "土", color: "#92774d" }
  ],
  creation: {
    backgrounds: [
      { id: "herbalist", name: "山村药农", note: "识草木，家资微薄", origin: "越国镜州药农之家", effects: { stones: 3, luck: 2, mind: 1 }, flags: { herbalKnowledge: true } },
      { id: "martial", name: "江湖世家", note: "根骨坚实，仇家暗伏", origin: "岚州江湖世家", effects: { cultivation: 6, mind: 2, luck: -1 }, flags: { martialBlood: true } },
      { id: "merchant", name: "商贾旁支", note: "家资丰厚，精于取舍", origin: "胥京商贾旁支", effects: { stones: 18, luck: 1 }, flags: { merchantKin: true } },
      { id: "orphan", name: "宗门遗孤", note: "身世成谜，神识早醒", origin: "落云山下无名孤院", effects: { cultivation: 4, spirit: 3, stones: 5 }, flags: { sectOrphan: true } }
    ],
    talents: [
      { id: "quickStudy", name: "过目不忘", note: "悟法更快", effects: { mind: 2, spirit: 1 }, flags: { quickStudy: true } },
      { id: "bornSpirit", name: "天生神识", note: "识海先天强盛", effects: { spirit: 5 }, flags: { bornSpirit: true } },
      { id: "alchemyNose", name: "丹道嗅觉", note: "易得丹药机缘", effects: { luck: 2 }, flags: { alchemyGift: true } },
      { id: "unyielding", name: "百折道心", note: "心魔更难动摇", effects: { mind: 5 }, flags: { unyieldingHeart: true } },
      { id: "dangerSense", name: "趋吉避凶", note: "险境中常留一线", effects: { luck: 5 }, flags: { dangerSense: true } },
      { id: "hiddenEdge", name: "藏锋守拙", note: "寿元绵长，不显锋芒", effects: { lifespan: 10, mind: 2 }, flags: { hiddenEdge: true } }
    ],
    aspirations: [
      { id: "longevity", name: "但求长生", note: "寿元与心境更稳", effects: { lifespan: 14, mind: 2 }, flags: { seeksLongevity: true } },
      { id: "freedom", name: "逍遥天地", note: "气运与神识略增", effects: { luck: 3, spirit: 2 }, flags: { seeksFreedom: true } },
      { id: "guardian", name: "护我所珍", note: "道心坚韧，善因更重", effects: { mind: 4, luck: 1 }, flags: { seeksGuardianship: true } },
      { id: "power", name: "问鼎至强", note: "修为领先，伤势暗生", effects: { cultivation: 10, injury: 1 }, flags: { seeksPower: true } }
    ]
  },
  events: [
    {
      stage: 0, kicker: "缘起 · 问灵", title: "山门之前",
      text: "十六岁这年，七玄山脚来了几位测灵根的修士。铜盘亮起微光，你第一次知道，凡人的头顶还有另一重天地。\n\n执事只给你一炷香：入小宗门做外门弟子，去坊市自寻门路，或把这场异象埋在心底。",
      choices: [
        { label: "拜入落云宗外门", hint: "安稳起步，但规矩森严", effects: { cultivation: 9, luck: 1, stones: 4, age: 4 }, set: { sect: "落云宗", sectDisciple: true }, result: "你在山门前叩首三次，从药圃杂役做起。日子清苦，至少有人教你如何引气入体。" },
        { label: "前往太南谷坊市", hint: "散修之路，吉凶自担", effects: { cultivation: 6, luck: 3, stones: 9, age: 3 }, set: { sect: "散修", marketRoad: true }, result: "你替人抄录符文、辨认药草，终于换来一本残缺吐纳诀。坊市教你的第一课，是任何善意都有价码。" },
        { label: "回乡侍奉双亲三年", hint: "折损时间，换一份心境", effects: { cultivation: 3, luck: 4, lifespan: 3, age: 6 }, set: { sect: "散修", filialHeart: true }, result: "你把仙缘暂藏心底，替家中还清旧债。再上路时，双亲只送你一句：活着回来。" }
      ]
    },
    {
      stage: 1, kicker: "初修 · 夜雨", title: "旧庙里的无名册",
      text: "避雨时，你在一尊残破泥像下发现半册无名口诀。纸页受潮，末尾却留有一幅经脉图。庙外脚步渐近，似乎另有人循迹而来。",
      easter: "残页上有一行极淡的批注：‘功法无高下，活到最后的人，才有资格改写它。’字迹来自一位无人知晓的青衣客。",
      choices: [
        { label: "背熟口诀，烧掉残册", hint: "谨慎行事，不留痕迹", effects: { cultivation: 12, luck: 1, age: 4 }, set: { cautiousPath: true, namelessManual: true }, result: "火舌卷过残页，来人只看见一地湿灰。你装作凡人蜷在墙角，直到脚步远去。" },
        { label: "带走残册，日后参悟", hint: "收益更高，也会留下因果", effects: { cultivation: 16, luck: -1, age: 3 }, set: { boldPath: true, namelessManual: true, tracked: true }, result: "你把残册贴身藏好。三日后，客栈窗外多了一只从不啼叫的黑鸦。" },
        { label: "交给宗门执事", hint: "宗门弟子可换取信任", requires: { sectDisciple: true }, effects: { cultivation: 8, stones: 12, luck: 2, age: 3 }, set: { loyalDisciple: true }, result: "执事收下残册，只说你很懂规矩。次月，你的月俸中多了十二枚灵石。" }
      ]
    },
    {
      stage: 2, kicker: "炼气 · 药香", title: "一炉将成未成的丹",
      text: "你得到一次看守丹炉的差事。夜半炉火忽弱，药香却越来越盛。丹师迟迟未归，炉中灵气正从缝隙逸散。",
      choices: [
        { label: "依照火候，冒险开炉", hint: "考验悟性与胆量", effects: { cultivation: 17, luck: 1, injury: 1, age: 5 }, conditional: { flag: "alchemyGift", effects: { cultivation: 7, luck: 2, injury: -1 } }, set: { alchemySpark: true }, result: "丹成三颗，另有一颗炸裂。你被火气灼伤手臂，却从丹纹里看懂了几分药理。" },
        { label: "封住炉门，等丹师归来", hint: "稳妥守责", effects: { cultivation: 9, stones: 10, luck: 2, age: 5 }, set: { steadyHeart: true }, result: "丹师回来时，炉火只剩一线。他没夸你，只把一瓶养气散放在桌角。" },
        { label: "取一缕药气温养经脉", hint: "不动丹药，只借药气", effects: { cultivation: 13, lifespan: 2, luck: -1, age: 4 }, set: { secretMedicine: true }, result: "你没有碰那炉丹，只引走一缕将散的药气。经脉舒展之时，炉盖上也留下了一枚极淡的指痕。" }
      ]
    },
    {
      stage: 3, kicker: "行旅 · 迷雾", title: "血色禁地的边缘",
      text: "一张残图把你引到终年不散的雾谷。谷口倒着三具尸身，其中一人尚有气息，腰间储物袋却被血浸透。更深处，似有灵药光华一闪。",
      easter: "雾谷深处掠过一道人影，面貌平平，遁速却快得惊人。他没有看你，只把所有追兵都甩在了身后。",
      choices: [
        { label: "先救伤者，再问前路", hint: "善因会在未来回响", effects: { cultivation: 9, luck: 6, stones: -4, age: 6 }, conditionals: [{ flag: "herbalKnowledge", effects: { stones: 3, luck: 2 } }, { flag: "seeksGuardianship", effects: { mind: 2, luck: 2 } }], set: { savedStranger: true }, result: "你耗去大半丹药救下陌生修士。他醒后不肯报姓名，只把一枚裂开的星形铜片塞进你手中。" },
        { label: "取储物袋，立即离谷", hint: "见好便收", effects: { cultivation: 7, stones: 22, luck: -3, age: 4 }, set: { tookBag: true }, result: "你没有走入雾谷。储物袋里财物不少，最底下却压着一封写给家人的信。" },
        { label: "循灵光深入谷中", hint: "高风险，高回报", effects: { cultivation: 22, stones: 8, injury: 2, luck: -1, lifespan: -3, age: 7 }, conditional: { flag: "dangerSense", effects: { injury: -2, luck: 3 } }, set: { valleyHerb: true, boldPath: true }, result: "你采到一株百年灵草，也惊醒了守在根旁的妖兽。逃出谷时，背后衣衫已被鲜血浸透。" }
      ]
    },
    {
      stage: 4, kicker: "尘网 · 旧债", title: "黑鸦再临", requires: { tracked: true },
      text: "多年前的黑鸦终于落在窗前。三名蒙面修士封住退路，要你交出无名口诀。领头之人认得你每一次改换的姓名。",
      choices: [
        { label: "布下假洞府，金蝉脱壳", hint: "此前谨慎会提高收益", effects: { cultivation: 10, stones: -7, luck: 3, age: 5 }, conditional: { flag: "cautiousPath", effects: { luck: 3, injury: -1 } }, set: { escapedHunters: true }, result: "你把最后一张替身符留在洞府。火光升起时，你已沿暗河遁出三十里。" },
        { label: "邀同门设伏反击", hint: "需要相信身边的人", effects: { cultivation: 17, injury: 2, luck: 1, age: 5 }, conditional: { flag: "loyalDisciple", effects: { injury: -1, stones: 10 } }, set: { defeatedHunters: true }, result: "这一战从子夜打到天明。你终于明白，孤身修行能藏住行迹，却未必挡得住所有刀剑。" }
      ]
    },
    {
      stage: 4, kicker: "尘网 · 故人", title: "星纹铜片的回音", requires: { savedStranger: true },
      text: "你经过一座海边坊市时，星形铜片忽然发热。昔日被你救下的修士已成商盟执事，他认出铜片，要还你一份迟到多年的恩情。",
      easter: "商船将驶往传闻中的乱星海。船主说，那里岛屿如星，妖兽与修士一样多，真正值钱的是一张可靠的海图。",
      choices: [
        { label: "求一枚筑基丹辅药", hint: "为最终突破积累底蕴", effects: { cultivation: 15, luck: 3, age: 4 }, set: { foundationHerb: true, repaidKindness: true }, result: "他没有筑基丹，却给了你一味最难寻的辅药。善因跨过多年，终于落回掌心。" },
        { label: "换取海图与灵石", hint: "财富能解许多眼前难题", effects: { stones: 28, luck: 2, age: 3 }, set: { seaMap: true, repaidKindness: true }, result: "你收下灵石与海图。潮声里，那人举杯道：修仙界记仇容易，记恩太难。" }
      ]
    },
    {
      stage: 4, kicker: "尘网 · 浮沉", title: "坊市暗拍",
      text: "地下暗拍摆出三件东西：一瓶破境散、一套残缺阵旗，以及一枚无人出价的古旧玉简。你只能押上一份身家。",
      choices: [
        { label: "买下破境散", hint: "用灵石换修为", effects: { stones: -12, cultivation: 18, injury: 1, age: 4 }, set: { breakthroughPowder: true }, result: "药力比想象中霸道。你闭关七日冲开两处窍穴，也在经脉里留下一缕躁动火气。" },
        { label: "买下残缺阵旗", hint: "为将来的劫数留后手", effects: { stones: -10, cultivation: 7, luck: 4, age: 5 }, set: { formationFlags: true }, result: "阵旗只剩六面，恰好能布一座藏形小阵。你花了一年，终于把它们修补到可用。" },
        { label: "赌那枚无名玉简", hint: "没人知道里面是什么", effects: { stones: -6, cultivation: 11, luck: 2, age: 4 }, set: { jadeSlip: true }, result: "玉简中没有功法，只有一位古修记下的数十次失败。你从失败里学到的，竟比口诀更多。" }
      ]
    },
    {
      stage: 5, kicker: "瓶颈 · 心魔", title: "月下问心",
      text: "炼气后期，修为再难寸进。你在月下入定，看见年少的自己站在旧屋门前，问：求仙至今，你究竟舍下了什么？",
      choices: [
        { label: "承认畏惧，仍选择前行", hint: "直面本心", effects: { cultivation: 14, luck: 3, lifespan: 3, age: 7 }, conditional: { flag: "unyieldingHeart", effects: { cultivation: 5, mind: 4 } }, set: { clearHeart: true }, result: "你没有斩去恐惧，只学会与它同行。天亮时，瓶颈出现了一丝裂缝。" },
        { label: "斩去凡念，一心大道", hint: "进境迅速，因果渐薄", effects: { cultivation: 20, luck: -4, age: 6 }, set: { severedMortalTies: true }, result: "旧屋与故人尽数化灰。你的法力一夜精进，心里也从此少了一处可以回去的地方。" },
        { label: "翻看一路所得，另寻旁门", hint: "有积累的人走得更稳", effects: { cultivation: 11, stones: -5, luck: 2, age: 8 }, conditional: { flag: "alchemySpark", effects: { cultivation: 8, lifespan: 2 } }, set: { patientPath: true }, result: "你不再强冲关隘，而是用丹药、阵法与水磨工夫一点点拓宽经脉。" }
      ]
    },
    {
      stage: 6, kicker: "劫前 · 灵矿", title: "地脉震动",
      text: "宗门辖地的灵矿忽然崩塌，地底泄出精纯灵气，也惊醒一头沉睡妖兽。数十名矿工困在下层，而灵脉核心足以让你冲击炼气圆满。",
      choices: [
        { label: "先救矿工，再取灵气", hint: "可能错失最好的时机", effects: { cultivation: 12, luck: 7, injury: 1, age: 5 }, set: { savedMiners: true }, result: "你撑住将塌的石梁，让最后一名矿工爬出地道。灵气已散去大半，但众人的名字你都记得。" },
        { label: "借阵旗封妖，独取灵脉", hint: "持有阵旗时伤势更轻", effects: { cultivation: 24, luck: -3, injury: 3, age: 4 }, conditional: { flag: "formationFlags", effects: { injury: -2, cultivation: 4 } }, set: { tookVein: true }, result: "你封住妖兽，坐在灵脉中央运功。矿洞在身后坍塌，轰鸣声许久不绝。" },
        { label: "引妖兽离矿，交由众人逃生", hint: "九死一生的担当", effects: { cultivation: 18, luck: 5, injury: 3, lifespan: -4, age: 5 }, set: { luredBeast: true }, result: "你带着妖兽冲进荒山。三日后回来时，衣袍尽碎，矿口却多了上百盏为你点亮的灯。" }
      ]
    },
    {
      stage: 7, kicker: "终卷 · 筑基", title: "道台之上",
      text: "多年积累终于化作一线契机。你在洞府中摆好灵石与丹药，丹田如潮，旧伤与心魔同时翻涌。筑基一关，成则寿增百载，败则此生止步。",
      easter: "闭关前，有人送来一枚没有署名的寻常药丸。瓶底刻着两个小字：守拙。你想起那位从雾谷深处一闪而过的青衣客。",
      choices: [
        { label: "服药破关，孤注一掷", hint: "修为越深，成功机会越高", effects: { cultivation: 14, injury: 2, age: 3 }, set: { attemptedFoundation: true, forceFoundation: true }, result: "药力化作烈火，你守住灵台最后一线清明。丹田破而后立，周身灵气开始凝成液滴。" },
        { label: "以草木辅药温养道基", hint: "持有筑基辅药时最稳妥", effects: { cultivation: 10, lifespan: 8, luck: 2, age: 4 }, conditional: { flag: "foundationHerb", effects: { cultivation: 15, injury: -2, luck: 3 } }, set: { attemptedFoundation: true, gentleFoundation: true }, result: "药香一缕缕沉入经脉，暴烈灵气被慢慢驯服。你听见体内传来潮水漫过石阶的声音。" },
        { label: "暂缓筑基，先补全根基", hint: "保存性命，也许止步炼气", effects: { cultivation: 6, lifespan: 12, injury: -2, luck: 1, age: 10 }, set: { refusedGamble: true }, result: "你熄灭丹炉，没有向天命下注。此后十年，你把每一处旧伤都养好，也把每一步路重新走稳。" }
      ]
    },
    {
      stage: 8, kicker: "筑基 · 远行", title: "潮生星海",
      text: "筑基之后，天南已容不下你的眼界。你随一艘商船驶向外海，海雾中灵压沉重，远处却有古修洞府的禁制随潮明灭。船主提醒你：海图只能标出岛屿，标不出人心。",
      easter: "一座孤岛上立着残碑，碑文只剩‘虚天’二字。同行老者看了一眼便催船离开，仿佛这个名字会招来某种注视。",
      choices: [
        { label: "循海图探查古修洞府", hint: "持有海图会触发额外收获", effects: { cultivation: 24, spirit: 3, injury: 1, age: 12 }, conditional: { flag: "seaMap", effects: { cultivation: 8, luck: 3, injury: -1 } }, set: { ancientCave: true }, result: "你在潮退时穿过禁制，带走一卷锻神残篇。洞府深处那扇石门，你始终没有推开。" },
        { label: "护送商船穿过妖潮", hint: "稳扎稳打，积攒声望", effects: { cultivation: 18, spirit: 2, mind: 3, stones: 24, age: 10 }, set: { guardedFleet: true }, result: "你守在船头三昼夜，剑光照亮翻涌海面。抵岸时，商盟把你的名字写进了供奉名册。" },
        { label: "闭关稳固筑基道台", hint: "不争眼前机缘，先固根本", effects: { cultivation: 16, mind: 5, lifespan: 10, injury: -2, age: 18 }, conditional: { flag: "hiddenEdge", effects: { lifespan: 8, mind: 3 } }, set: { firmFoundation: true }, result: "你谢绝所有邀请，在无名岛上枯坐十余年。再出关时，法力不显锋芒，却已浑然一体。" }
      ]
    },
    {
      stage: 9, kicker: "筑基 · 丹材", title: "三味结丹引",
      text: "结丹之前，你还缺一味定魂之物。拍卖会有定魂香，深海妖巢藏着玄水珠，而宗门密库愿以一场危险任务交换结丹心得。",
      choices: [
        { label: "倾尽灵石购下定魂香", hint: "减少心魔干扰", effects: { stones: -24, cultivation: 20, mind: 5, age: 9 }, set: { coreIncense: true }, result: "香气如线，牵住几乎散乱的念头。你第一次清楚看见，自己最深的执念并不是长生，而是不愿任人摆布。" },
        { label: "潜入妖巢夺玄水珠", hint: "神识越强，代价越小", effects: { cultivation: 30, spirit: 5, injury: 3, lifespan: -5, age: 7 }, conditional: { flag: "ancientCave", effects: { injury: -2, spirit: 2 } }, set: { blackWaterPearl: true }, result: "你在群妖回巢前夺珠而走。海底无声的追逐持续千里，神识也在一次次濒临枯竭中变得凝练。" },
        { label: "替宗门镇守边城十年", hint: "以岁月换完整心得", effects: { cultivation: 22, mind: 4, spirit: 3, luck: 2, age: 16 }, set: { coreNotes: true }, result: "十年间，你见过兽潮、叛乱与凡人城池的兴衰。归宗那日，密库长老给你的不只是一册心得。" }
      ]
    },
    {
      stage: 10, kicker: "结丹 · 三关", title: "金丹火候",
      text: "洞府封闭，灵脉归一。气海中的法力开始向一点坍缩，心魔、丹火与旧伤同时发作。今日若成，金丹照海；若败，道基亦可能受损。",
      choices: [
        { label: "以定魂香守心，徐徐结丹", hint: "心境路线最为稳妥", effects: { cultivation: 28, mind: 5, spirit: 2, injury: 1, age: 6 }, conditional: { flag: "coreIncense", effects: { cultivation: 10, injury: -1, mind: 2 } }, set: { attemptedCore: true, calmCore: true }, result: "一炷香燃尽时，气海中央亮起米粒般的金光。它并不耀眼，却沉得仿佛能压住整片海。" },
        { label: "炼化玄水珠，水火并济", hint: "丹成上限更高，过程凶险", effects: { cultivation: 36, spirit: 4, injury: 3, age: 5 }, conditional: { flag: "blackWaterPearl", effects: { cultivation: 10, injury: -2 } }, set: { attemptedCore: true, waterCore: true }, result: "丹火与玄水在经脉里相撞，几乎将肉身撕裂。剧痛尽头，一轮金色从丹田深处升起。" },
        { label: "依照前人心得重筑丹基", hint: "宗门传承可弥补根骨", effects: { cultivation: 30, mind: 4, spirit: 3, age: 8 }, conditional: { flag: "coreNotes", effects: { cultivation: 9, luck: 2 } }, set: { attemptedCore: true, inheritedCore: true }, result: "你没有照搬任何一位前辈，而是从数十种失败里找出自己的火候。金丹成形时，洞府外落了一场无声细雨。" }
      ]
    },
    {
      stage: 11, kicker: "金丹 · 风雷", title: "碎岛雷夜",
      text: "结丹不久，外海群岛遭遇百年雷暴。雷云深处有一株淬神木开花，岛上低阶修士却来不及撤离。金丹能护住你自己，未必护得住所有人。",
      easter: "雷云外，一名白衣修士踏剑而过，只远远留下一句：天雷既是杀劫，也是天地替修士炼去杂念的炉火。",
      choices: [
        { label: "以金丹引雷，护住全岛", hint: "大幅磨炼神识与心境", effects: { cultivation: 22, spirit: 7, mind: 6, injury: 3, lifespan: -8, age: 11 }, set: { shieldedIsland: true, thunderTempered: true }, result: "雷光一夜未停。你站在岛巅，金丹每转一周便多一道裂纹，又在下一道雷里重新弥合。" },
        { label: "只取淬神花，远离雷眼", hint: "保存实力，专注元婴准备", effects: { cultivation: 30, spirit: 8, luck: -3, age: 7 }, set: { spiritFlower: true }, result: "你在雷眼合拢前摘走灵花。身后护岛阵法寸寸碎裂，那声巨响在许多年后仍会出现在梦里。" },
        { label: "布阵分流雷霆", hint: "早年的阵旗因果再次回响", effects: { cultivation: 24, spirit: 5, mind: 4, stones: -12, age: 9 }, conditional: { flag: "formationFlags", effects: { injury: -2, luck: 4, spirit: 2 } }, set: { dividedThunder: true }, result: "残缺阵旗在雷火中一面面化灰，却把灭岛之劫拆成了无数细小电光。你也借此看清了雷霆运行的脉络。" }
      ]
    },
    {
      stage: 12, kicker: "元婴 · 神识", title: "识海中的第二个自己",
      text: "金丹圆满后，你开始尝试让神识化形。识海深处，一个与你相同的人睁开双眼。他知晓你所有恐惧，也能说出每一桩被刻意遗忘的旧事。",
      choices: [
        { label: "与心魔对坐百日", hint: "接纳所有选择留下的自己", effects: { cultivation: 24, mind: 8, spirit: 6, age: 15 }, conditionals: [{ flag: "quickStudy", effects: { spirit: 3, cultivation: 4 } }, { flag: "bornSpirit", effects: { spirit: 4, injury: -1 } }], set: { embracedShadow: true, soulReady: true }, result: "你没有杀死它。百日后，那个影子走来与你重合，识海从此澄澈如夜空。" },
        { label: "借雷意斩碎心魔", hint: "持有雷霆淬炼时威力更强", effects: { cultivation: 32, mind: 3, spirit: 8, injury: 2, age: 8 }, conditional: { flag: "thunderTempered", effects: { injury: -2, mind: 4 } }, set: { severedShadow: true, soulReady: true }, result: "一道雷意劈开识海，心魔碎成万千念头。它们没有消失，而是化成了你元神的养料。" },
        { label: "服下淬神花闭死关", hint: "神识成长最快，风险也最高", effects: { cultivation: 38, spirit: 10, injury: 3, lifespan: -10, age: 6 }, conditional: { flag: "spiritFlower", effects: { injury: -2, mind: 3 } }, set: { refinedSpiritFlower: true, soulReady: true }, result: "识海先是一片死寂，随后骤然扩张。醒来时，你能听见百里外雪落在松针上的声音。" }
      ]
    },
    {
      stage: 13, kicker: "元婴 · 天劫", title: "碎丹成婴",
      text: "这一日，金丹表面浮现第一道裂纹。天地灵气倒卷，劫云覆盖整座岛屿。你必须亲手碎去苦修百年的金丹，在毁灭中孕出元婴。",
      easter: "劫云最深处，一只墨绿小瓶般的虚影一闪而逝。它没有替你挡下雷霆，只让即将消散的一缕生机停留了片刻。",
      choices: [
        { label: "守住本心，九雷化婴", hint: "心境与神识缺一不可", effects: { cultivation: 32, mind: 5, spirit: 5, injury: 3, age: 4 }, set: { attemptedSoul: true, balancedSoul: true }, result: "第九道雷落下时，金丹彻底碎裂。废墟般的丹田中央，一个寸许高的小人缓缓睁开双眼。" },
        { label: "以神识裹丹，强行碎婴", hint: "神识路线，成功后根基锋锐", effects: { cultivation: 40, spirit: 7, injury: 5, lifespan: -15, age: 3 }, set: { attemptedSoul: true, forceSoul: true }, result: "神识化作万千细线，同时扯碎金丹。剧痛让天地失色，你却在昏暗中听见了第二次心跳。" },
        { label: "散去劫云，再等百年", hint: "不冒必死之险，保留结丹修为", effects: { cultivation: 8, mind: 5, lifespan: 30, injury: -2, age: 24 }, set: { refusedSoul: true }, result: "你在最后一刻收束法力，任劫云散去。世人说你错过天机，你却知道，活着本身也是一种选择。" }
      ]
    }
  ]
};
