"use client";

import { useMemo, useState } from "react";

type View = "glow" | "meet" | "self";
type FeedMode = "同频" | "微光" | "远方";
type Lang = "zh" | "en";

const ui = {
  zh: { nav: ["微光", "遇见", "此刻的我"], demo: "演示模式", profile: "今天想安静一点", motto: "同处尘世，各有微光。", hello: "林间的杭", headline: <>今天也有人，<br />放下了一点生活。</>, put: "放下一点", modes: ["同频", "微光", "远方"], notes: ["更贴近你此刻的心情", "相似的感受，不同的生活", "看看与你不同但友善的生活"], wishLabel: "希望被怎样接住", why: "为什么来到你这里", seen: "我看见了", caught: "已经接住了", meetEyebrow: "求同，也存异", meetTitle: <>有些人和你相似，<br />也带着不同的生活。</>, same: "你们的相同", different: "你们的不同", sameText: "都喜欢记录城市里不被注意的小地方，也都偏好没有压力的交流。", differentText: "你习惯用照片记录，Ta 更习惯收集路上听到的句子。", shareMine: "分享一份我的生活", seeTheir: "看看 Ta 放下的生活", noScore: "我们不会展示相似度，也不会催促你建立关系。", selfEyebrow: "只属于你的理解空间", selfTitle: "此刻的我", aiView: "同尘对你此刻的理解", insight: "你不是拒绝连接，只是更喜欢安静、自然、不需要持续回应的关系。", recent: "最近的我", changing: "这些理解会随你一起变化，而不是定义你。", add: "＋ 补充一点", using: "正在使用", paused: "已暂停", boundary: "我的边界", treatment: "这里应该如何对待我", safeDemo: "查看安全保护演示", safeSub: "了解同尘如何阻止越界接近" },
  en: { nav: ["Glow", "Meet", "Now, me"], demo: "Demo tour", profile: "Quiet company today", motto: "Different lives, shared moments.", hello: "Lin", headline: <>Someone left a little piece<br />of life here today.</>, put: "Leave a moment", modes: ["In tune", "A glow", "Far away"], notes: ["Closer to how you feel right now", "A familiar feeling from a different life", "A different life, shared with care"], wishLabel: "How they hope to be received", why: "Why this came to you", seen: "I see you", caught: "Gently received", meetEyebrow: "Common ground, room for difference", meetTitle: <>Some people feel familiar,<br />yet carry a different life.</>, same: "What you share", different: "Where you differ", sameText: "You both notice overlooked corners of the city and prefer connection without pressure.", differentText: "You remember with photographs; they collect sentences overheard on the road.", shareMine: "Share a moment of mine", seeTheir: "See what they left here", noScore: "No compatibility scores. No pressure to form a relationship.", selfEyebrow: "A private space for understanding", selfTitle: "Now, me", aiView: "How Tongchen understands you right now", insight: "You are not avoiding connection. You simply prefer it quiet, natural, and free from the pressure to keep replying.", recent: "Recently", changing: "These understandings change with you. They do not define you.", add: "+ Add context", using: "In use", paused: "Paused", boundary: "My boundaries", treatment: "How this space should treat me", safeDemo: "View the safety demo", safeSub: "See how Tongchen stops boundary-crossing behaviour" },
};

const posts = [
  {
    id: 1,
    author: "住在海边的盐",
    time: "傍晚 6:42",
    mark: "盐",
    tone: "sand",
    text: "今天第一次把番茄炖牛肉做成功。一个人吃，但还是认真摆了盘。",
    image: "dinner",
    wish: "欢迎分享你今天吃了什么",
    reason: "你们都喜欢认真对待普通的一餐",
    response: "分享我的一餐",
  },
  {
    id: 2,
    author: "慢慢经过",
    time: "下午 4:18",
    mark: "慢",
    tone: "blue",
    text: "下班路上的云很低，风把树吹得有一点响。站了两分钟，今天好像也没有那么糟。",
    image: "sky",
    wish: "静静放在这里",
    reason: "你最近也在留意城市里很小的变化",
    response: "我也看见了",
  },
];

const initialTraits = [
  { title: "喜欢记录日常细节", note: "来自你最近的三次分享", active: true },
  { title: "偏好轻量而真诚的连接", note: "长期理解", active: true },
  { title: "最近社交能量较低", note: "14 天后自动淡出", active: true },
  { title: "愿意分享，但不想承受回复压力", note: "由你确认", active: true },
];

const englishTraits = [
  { title: "Notices everyday details", note: "From your three most recent shares" },
  { title: "Prefers light but genuine connection", note: "A longer-term understanding" },
  { title: "Lower social energy lately", note: "Fades automatically in 14 days" },
  { title: "Open to sharing without reply pressure", note: "Confirmed by you" },
];

const englishPosts = [
  { author: "Salt by the sea", time: "6:42 PM", mark: "S", text: "I finally got my tomato beef stew right today. I ate alone, but still took time to plate it nicely.", response: "Share my dinner" },
  { author: "Passing slowly", time: "4:18 PM", mark: "P", text: "The clouds hung low on my walk home, and the wind made the trees rustle. I stopped for two minutes. Maybe today was not so bad after all.", response: "I noticed it too" },
];

const wishes = ["静静放在这里", "想遇到相似心情", "欢迎一句回应", "想听别人的故事", "只分享，不需要回复"];
const englishWishes = ["Let it rest here quietly", "Find a similar feeling", "Welcome a small response", "Hear someone else’s story", "Share only — no reply needed"];

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [view, setView] = useState<View>("glow");
  const [mode, setMode] = useState<FeedMode>("微光");
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [wish, setWish] = useState("欢迎一句回应");
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ summary: string; traits: string[]; model: string; configured: boolean } | null>(null);
  const [published, setPublished] = useState(false);
  const [caught, setCaught] = useState<number[]>([]);
  const [traits, setTraits] = useState(initialTraits);
  const [safety, setSafety] = useState(false);
  const [demoStep, setDemoStep] = useState(-1);
  const [demoText, setDemoText] = useState("最近工作有点忙，下班后不太想说话，但我还是喜欢散步时拍天空。想分享一点小事，不一定要一直聊天。");
  const t = ui[lang];

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 11) return "早上好";
    if (hour < 18) return "下午好";
    return "晚上好";
  }, []);

  function openComposer() {
    setComposerOpen(true);
    setAnalyzed(false);
    setPublished(false);
  }

  function closeComposer() {
    setComposerOpen(false);
    setDraft("");
    setAnalyzed(false);
    setAiResult(null);
    setPublished(false);
  }

  async function understandDraft() {
    setAnalyzing(true);
    try {
      const response = await fetch("/api/understand", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: draft, language: lang }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Understanding failed");
      setAiResult(result);
      setAnalyzed(true);
    } catch {
      setAiResult({ configured: false, model: "demo-fallback", summary: lang === "zh" ? "你在普通日常里感到一点满足，想被看见，但不需要热闹。" : "You find small satisfaction in ordinary life and want to be seen without needing a crowd.", traits: lang === "zh" ? ["日常微光", "轻量分享", "不需要回复压力"] : ["Everyday glow", "Light sharing", "No reply pressure"] });
      setAnalyzed(true);
    } finally { setAnalyzing(false); }
  }

  function toggleCaught(id: number) {
    setCaught((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setView("glow")} aria-label={lang === "zh" ? "回到同尘首页" : "Back to Tongchen home"}>
          <BrandMark />
          <span>同尘</span>
        </button>

        <nav className="main-nav" aria-label={lang === "zh" ? "主要导航" : "Main navigation"}>
          <button className={view === "glow" ? "active" : ""} onClick={() => setView("glow")}>
            <span className="nav-icon">◌</span>{t.nav[0]}
          </button>
          <button className={view === "meet" ? "active" : ""} onClick={() => setView("meet")}>
            <span className="nav-icon">⌁</span>{t.nav[1]}
          </button>
          <button className={view === "self" ? "active" : ""} onClick={() => setView("self")}>
            <span className="nav-icon">○</span>{t.nav[2]}
          </button>
        </nav>

        <button className="demo-launch" onClick={() => { setDemoText(lang === "zh" ? "最近工作有点忙，下班后不太想说话，但我还是喜欢散步时拍天空。想分享一点小事，不一定要一直聊天。" : "Work has been busy lately. I do not feel like talking much after work, but I still photograph the sky on my walks. I want to share small moments without having to keep a conversation going."); setDemoStep(0); }}><span>▷</span>{t.demo}</button>

        <div className="sidebar-bottom">
          <button className="profile-mini" onClick={() => setView("self")}>
            <span className="avatar sage">{lang === "zh" ? "杭" : "L"}</span>
            <span><b>{lang === "zh" ? "林间的杭" : "Lin"}</b><small>{t.profile}</small></span>
          </button>
          <div className="language-switch"><button className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>中</button><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button></div>
          <p>{t.motto}</p>
        </div>
      </aside>

      <section className="main-stage">
        <header className="mobile-header">
          <button className="brand" onClick={() => setView("glow")}><BrandMark /><span>同尘</span></button>
          <div className="mobile-tools"><button className="lang-mobile" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>{lang === "zh" ? "EN" : "中"}</button><button className="avatar sage" onClick={() => setView("self")}>{lang === "zh" ? "杭" : "L"}</button></div>
        </header>

        {view === "glow" && (
          <div className="page feed-page">
            <div className="page-heading">
              <div>
                <p className="eyebrow">{lang === "zh" ? `${greeting}，${t.hello}` : `Hello, ${t.hello}`}</p>
                <h1>{t.headline}</h1>
              </div>
              <button className="quiet-action" onClick={openComposer}><span>＋</span>{t.put}</button>
            </div>

            <div className="mode-switch" role="tablist" aria-label={lang === "zh" ? "内容模式" : "Feed mode"}>
              {(["同频", "微光", "远方"] as FeedMode[]).map((item) => (
                <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item)}>{t.modes[["同频", "微光", "远方"].indexOf(item)]}</button>
              ))}
            </div>
            <p className="mode-note">
              {t.notes[["同频", "微光", "远方"].indexOf(mode)]}
            </p>

            <div className="feed-list">
              {posts.map((post) => (
                <article className="post-card" key={post.id}>
                  <div className="post-head">
                    <span className={`avatar ${post.tone}`}>{lang === "zh" ? post.mark : englishPosts[post.id - 1].mark}</span>
                    <div><b>{lang === "zh" ? post.author : englishPosts[post.id - 1].author}</b><small>{lang === "zh" ? post.time : englishPosts[post.id - 1].time}</small></div>
                    <button className="more" aria-label={lang === "zh" ? "更多选项" : "More options"}>•••</button>
                  </div>
                  <p className="post-copy">{lang === "zh" ? post.text : englishPosts[post.id - 1].text}</p>
                  <div className={`photo ${post.image}`} role="img" aria-label={lang === "zh" ? (post.image === "dinner" ? "暖光下的一盘番茄炖牛肉" : "傍晚城市上空的云") : (post.image === "dinner" ? "Tomato beef stew in warm light" : "Evening clouds above the city")}>
                    {post.image === "dinner" ? <><span className="plate"><i /><i /><i /></span><span className="cloth" /></> : <><span className="cloud c1" /><span className="cloud c2" /><span className="skyline" /></>}
                  </div>
                  <div className="wish"><span>{t.wishLabel}</span><b>{lang === "zh" ? post.wish : post.id === 1 ? "Share what you ate today" : "Let it rest here quietly"}</b></div>
                  <div className="reason"><span className="spark">✦</span><span><small>{t.why}</small>{lang === "zh" ? post.reason : post.id === 1 ? "You both treat an ordinary meal with care" : "You have been noticing small changes in the city too"}</span></div>
                  <div className="post-actions">
                    <button className={caught.includes(post.id) ? "caught" : ""} onClick={() => toggleCaught(post.id)}>
                      {caught.includes(post.id) ? t.caught : t.seen}
                    </button>
                    <button onClick={openComposer}>{lang === "zh" ? post.response : englishPosts[post.id - 1].response} <span>↗</span></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {view === "meet" && (
          <div className="page meet-page">
            <p className="eyebrow">{t.meetEyebrow}</p>
            <h1>{t.meetTitle}</h1>
            <div className="meet-card">
              <div className="meet-portrait"><span>{lang === "zh" ? "渡" : "W"}</span><i className="orbit one" /><i className="orbit two" /></div>
              <div className="meet-person"><b>{lang === "zh" ? "渡口等风" : "Waiting for the wind"}</b><small>{lang === "zh" ? "在广州生活 · 最近常去旧城区散步" : "Lives in Guangzhou · Recently walking through the old town"}</small></div>
              <div className="common-grid">
                <div><span>{t.same}</span><p>{t.sameText}</p></div>
                <div><span>{t.different}</span><p>{t.differentText}</p></div>
              </div>
              <blockquote>{lang === "zh" ? "“最近有什么普通的小事，让你记了很久？”" : "“What ordinary moment has stayed with you lately?”"}</blockquote>
              <div className="meet-actions"><button onClick={openComposer}>{t.shareMine}</button><button>{t.seeTheir}</button></div>
            </div>
            <p className="privacy-note">{t.noScore}</p>
          </div>
        )}

        {view === "self" && (
          <div className="page self-page">
            <p className="eyebrow">{t.selfEyebrow}</p>
            <h1>{t.selfTitle}</h1>
            <section className="insight-hero">
              <div className="self-avatar">{lang === "zh" ? "杭" : "L"}<span /></div>
              <div><small>{t.aiView}</small><p>{t.insight}</p></div>
            </section>
            <div className="section-title"><div><h2>{t.recent}</h2><p>{t.changing}</p></div><button>{t.add}</button></div>
            <div className="trait-list">
              {traits.map((trait, index) => (
                <div className={`trait ${trait.active ? "" : "muted"}`} key={trait.title}>
                  <span className="trait-dot" />
                  <div><b>{lang === "zh" ? trait.title : englishTraits[index].title}</b><small>{lang === "zh" ? trait.note : englishTraits[index].note}</small></div>
                  <button onClick={() => setTraits((items) => items.map((item, i) => i === index ? {...item, active: !item.active} : item))}>
                    {trait.active ? t.using : t.paused}
                  </button>
                </div>
              ))}
            </div>
            <section className="boundary-card">
              <div><span>{t.boundary}</span><h2>{t.treatment}</h2></div>
              <div className="boundary-tags"><button>{lang === "zh" ? "不接收陌生私信" : "No messages from strangers"}</button><button>{lang === "zh" ? "少一些争议内容" : "Less contentious content"}</button><button>{lang === "zh" ? "没有回复也不提醒" : "No no-reply reminders"}</button></div>
              <p><span>✓</span>{lang === "zh" ? "你的理解卡片只对你可见，随时可以修改或清除。" : "Your understanding cards are private and can be edited or cleared at any time."}</p>
            </section>
            <button className="safety-demo" onClick={() => setSafety(!safety)}>
              <span>⌁</span><span><b>{t.safeDemo}</b><small>{t.safeSub}</small></span><i>›</i>
            </button>
            {safety && <div className="safety-alert"><b>{lang === "zh" ? "已暂停一次越界互动" : "A boundary-crossing interaction was paused"}</b><p>{lang === "zh" ? "一个新账号在短时间内重复索取位置与联系方式。对方已无法继续联系你，你的位置和个人理解没有被分享。" : "A new account repeatedly asked for your location and contact details. They can no longer contact you, and neither your location nor your private understanding was shared."}</p><button onClick={() => setSafety(false)}>{lang === "zh" ? "我知道了" : "Got it"}</button></div>}
          </div>
        )}
      </section>

      <nav className="mobile-nav" aria-label={lang === "zh" ? "移动端导航" : "Mobile navigation"}>
        <button className={view === "glow" ? "active" : ""} onClick={() => setView("glow")}><span>◌</span>{t.nav[0]}</button>
        <button className={view === "meet" ? "active" : ""} onClick={() => setView("meet")}><span>⌁</span>{t.nav[1]}</button>
        <button className="mobile-add" onClick={openComposer}>＋</button>
        <button className={view === "self" ? "active" : ""} onClick={() => setView("self")}><span>○</span>{t.nav[2]}</button>
      </nav>

      {demoStep >= 0 && (
        <div className="modal-backdrop demo-backdrop" role="presentation">
          <section className="onboarding" role="dialog" aria-modal="true" aria-label={lang === "zh" ? "同尘演示流程" : "Tongchen demo tour"}>
            <button className="onboarding-close" onClick={() => setDemoStep(-1)}>×</button>
            <div className="demo-progress"><span className={demoStep >= 0 ? "active" : ""} /><span className={demoStep >= 1 ? "active" : ""} /><span className={demoStep >= 2 ? "active" : ""} /></div>
            {demoStep === 0 && <div className="demo-panel"><p className="eyebrow">{lang === "zh" ? "先让同尘认识此刻的你" : "Let Tongchen meet the person you are today"}</p><h2>{lang === "zh" ? "最近的你，是什么样的？" : "What has life felt like lately?"}</h2><p>{lang === "zh" ? "不用完整介绍自己。说说最近在意的事情，或希望被怎样对待。" : "No polished profile. Share what matters lately and how you hope to be treated."}</p><textarea value={demoText} onChange={(e) => setDemoText(e.target.value)} /><button className="demo-next" onClick={() => setDemoStep(1)}>{lang === "zh" ? "让同尘理解一下" : "Let Tongchen understand"}<span>→</span></button></div>}
            {demoStep === 1 && <div className="demo-panel"><p className="eyebrow">{lang === "zh" ? "理解由你确认" : "You stay in control"}</p><h2>{lang === "zh" ? "我听见的，不只是兴趣。" : "More than a list of interests."}</h2><blockquote>{t.insight}</blockquote><div className="demo-traits"><button>✓ {lang === "zh" ? "喜欢记录日常细节" : "Notices everyday details"}</button><button>✓ {lang === "zh" ? "最近社交能量较低" : "Lower social energy lately"}</button><button>✓ {lang === "zh" ? "偏好轻量连接" : "Prefers low-pressure connection"}</button><button>✓ {lang === "zh" ? "愿意看到适量差异" : "Open to gentle difference"}</button></div><p className="demo-privacy">{lang === "zh" ? "所有理解都可修改、暂停，并会随时间淡出。" : "Every understanding can be edited, paused, or allowed to fade."}</p><button className="demo-next" onClick={() => setDemoStep(2)}>{lang === "zh" ? "这很像我" : "This feels like me"}<span>→</span></button></div>}
            {demoStep === 2 && <div className="demo-panel demo-final"><div className="demo-brand"><BrandMark /></div><p className="eyebrow">{lang === "zh" ? "理解 · 投递 · 接住" : "Understand · Deliver · Receive"}</p><h2>{lang === "zh" ? "分享一点生活，\n不必面对整个世界。" : "Share a little of life,\nwithout facing the whole world."}</h2><p>{lang === "zh" ? "同尘会依据你的状态、表达方式和边界，将生活碎片送给少量合适的人。" : "Tongchen uses your state, expression style, and boundaries to deliver a moment to a small number of compatible people."}</p><button className="demo-next" onClick={() => { setDemoStep(-1); setView("glow"); }}>{lang === "zh" ? "进入同尘" : "Enter Tongchen"}<span>→</span></button></div>}
          </section>
        </div>
      )}

      {composerOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeComposer()}>
          <section className="composer" role="dialog" aria-modal="true" aria-labelledby="composer-title">
            {published ? (
              <div className="published-state">
                <div className="published-mark"><BrandMark /></div>
                <p className="eyebrow">{lang === "zh" ? "已经放在这里了" : "Your moment is here"}</p>
                <h2>{lang === "zh" ? <>它会被合适的人，<br />轻轻看见。</> : <>It will be gently seen<br />by the right people.</>}</h2>
                <p>{lang === "zh" ? "没有需要你立刻回应的事情。" : "Nothing needs an immediate response."}</p>
                <button onClick={closeComposer}>{lang === "zh" ? "回到微光" : "Back to Glow"}</button>
              </div>
            ) : (
              <>
                <div className="composer-head"><div><p className="eyebrow">{lang === "zh" ? "放下一点生活" : "Leave a little of life"}</p><h2 id="composer-title">{lang === "zh" ? "此刻想说些什么？" : "What would you like to leave here?"}</h2></div><button onClick={closeComposer} aria-label={lang === "zh" ? "关闭" : "Close"}>×</button></div>
                <textarea value={draft} onChange={(e) => { setDraft(e.target.value); setAnalyzed(false); }} placeholder={lang === "zh" ? "一句话、一点心情，或者今天发生的小事……" : "A sentence, a feeling, or a small moment from today…"} autoFocus />
                <div className="media-row"><button>⌁ &nbsp;{lang === "zh" ? "一张照片" : "A photo"}</button><button>◉ &nbsp;{lang === "zh" ? "一段声音" : "A voice note"}</button><span>{draft.length}/300</span></div>
                <div className="wish-select"><p>{lang === "zh" ? "希望它被怎样接住？" : "How would you like it to be received?"}</p><div>{wishes.map((item, index) => <button key={item} className={wish === item ? "active" : ""} onClick={() => setWish(item)}>{lang === "zh" ? item : englishWishes[index]}</button>)}</div></div>
                {analyzed && aiResult && <div className="ai-understanding"><span>✦</span><div><small>{aiResult.configured ? `${aiResult.model} · ${lang === "zh" ? "由你确认" : "Confirmed by you"}` : (lang === "zh" ? "演示理解 · 配置密钥后使用 GPT-5.6" : "Demo understanding · Configure a key for GPT-5.6")}</small><p>{aiResult.summary}</p><div>{aiResult.traits.map((trait) => <button key={trait}>{trait}</button>)}<button>{lang === "zh" ? wish : englishWishes[wishes.indexOf(wish)]}</button></div></div><button className="edit-ai">{lang === "zh" ? "调整" : "Adjust"}</button></div>}
                <div className="composer-footer"><p>{lang === "zh" ? "仅投递给与你边界相合的人" : "Delivered only to people compatible with your boundaries"}</p><button disabled={!draft.trim() || analyzing} onClick={() => analyzed ? setPublished(true) : understandDraft()}>{lang === "zh" ? (analyzing ? "正在理解…" : analyzed ? "确认并放下" : "让同尘理解一下") : (analyzing ? "Understanding…" : analyzed ? "Confirm and leave it here" : "Let Tongchen understand")}</button></div>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
