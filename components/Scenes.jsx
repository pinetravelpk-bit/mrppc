// Platform-specific animated scenes used inside SEO content figures (styles in app/scenes.css).
// Animations run once the parent figure gets .visible. Every number is illustrative.

/* ---------- Google ---------- */
function Serp({query='dentist in islamabad'}){return <div className="sc sc-serp">
  <div className="serp-bar"><b className="serp-g"><i/><i/><i/><i/></b><span className="serp-q">{query}</span><span className="serp-caret"/></div>
  <ul className="serp-list">
    <li className="serp-ad one"><small>Sponsored</small><strong>Your Clinic | Book a Same Day Appointment</strong><span>yourclinic.pk/book</span><p>Experienced team in Islamabad. Call now or book online in 2 minutes.</p><em className="serp-win">+1 lead</em></li>
    <li className="serp-ad two"><small>Sponsored</small><strong>Another Clinic | Get a Quote</strong><span>anotherclinic.pk</span></li>
    <li className="serp-org"><i/><i/><i/></li>
    <li className="serp-org"><i/><i/></li>
  </ul>
  <span className="serp-cursor"/>
</div>}

function Quality(){const rows=[['Expected CTR','Above average',86],['Ad relevance','Above average',82],['Landing page experience','Average',58]];return <div className="sc sc-qs">
  <div className="qs-gauge"><svg viewBox="0 0 220 124"><path d="M20 112 A90 90 0 0 1 200 112" className="qs-track"/><path d="M20 112 A90 90 0 0 1 200 112" className="qs-fill" pathLength="1"/></svg><div className="qs-score"><b>8</b><span>/10</span><small>Quality Score</small></div></div>
  <ul className="qs-rows">{rows.map(([l,s,v],i)=><li key={l} style={{'--v':`${v}%`,'--d':`${.6+i*.25}s`}}><div><span>{l}</span><small>{s}</small></div><i><em/></i></li>)}</ul>
</div>}

/* ---------- Meta ---------- */
function FeedPost({sp}){return <div className={`fp${sp?' sp':''}`}><div className="fp-head"><i/><span><b/>{sp&&<small>Sponsored</small>}</span></div><div className="fp-media">{sp&&<span className="fp-offer">Free consultation this week</span>}</div>{sp?<div className="fp-cta"><span>yourbusiness.pk</span><b>WhatsApp us</b></div>:<div className="fp-lines"><i/><i/></div>}</div>}
function Feed(){const set=[false,true,false];return <div className="sc sc-feed">
  <div className="phone"><div className="feed-track">{[...set,...set].map((sp,i)=><FeedPost key={i} sp={sp}/>)}</div></div>
  <div className="feed-hearts">{[0,1,2,3,4,5].map(i=><i key={i} style={{'--d':`${i*.6}s`,'--x':`${(i%3)*16-16}px`}}>♥</i>)}</div>
  <div className="feed-chips"><span>Feed</span><span>Stories</span><span>Reels</span><span>WhatsApp</span></div>
</div>}

function Lookalike(){const rings=[['Your customers',34],['1% lookalike',62],['3% lookalike',90],['5% lookalike',118]];const dots=[];for(let r=1;r<4;r++)for(let k=0;k<8+r*4;k++){const a=k/(8+r*4)*Math.PI*2+r;const rad=rings[r][1]-14+((k*7)%10);dots.push([150+Math.cos(a)*rad,150+Math.sin(a)*rad,r])}
  return <div className="sc sc-look"><svg viewBox="0 0 300 300">{rings.slice().reverse().map(([l,r],i)=><circle key={l} cx="150" cy="150" r={r} className={`lk-ring r${3-i}`}/>)}{dots.map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r="3.2" className="lk-dot" style={{'--d':`${.8+r*.35+(i%6)*.05}s`}}/>)}<circle cx="150" cy="150" r="20" className="lk-core"/></svg>
  <ul className="lk-legend">{rings.map(([l],i)=><li key={l} className={`r${i}`}><i/>{l}</li>)}</ul></div>}

/* ---------- TikTok ---------- */
function Hook(){return <div className="sc sc-hook">
  <div className="phone tt"><div className="tt-video"><span className="tt-cap c1">Stop scrolling if</span><span className="tt-cap c2">you sell online</span></div>
    <div className="tt-side"><i>♥<small>12K</small></i><i>✉<small>340</small></i><i>➦<small>1.2K</small></i></div>
    <div className="tt-bar"><span className="tt-zone"/><em/></div></div>
  <div className="tt-chart"><p>Viewers still watching</p><svg viewBox="0 0 200 130"><rect x="0" y="0" width="34" height="120" className="tt-hz"/><text x="4" y="126">0 to 2s</text><path className="tt-weak" pathLength="1" d="M0 12 C18 70 40 96 200 108"/><path className="tt-strong" pathLength="1" d="M0 12 C30 22 70 40 200 66"/></svg><div className="tt-legend"><span className="s">Strong hook</span><span className="w">Weak hook</span></div></div>
</div>}

function Spark(){const stats=[['♥','Likes',24800],['✉','Comments',1260],['➦','Shares',3140]];return <div className="sc sc-spark">
  <div className="sp-card"><div className="sp-head"><i className="sp-av"/><div><b>@creator.name</b><small>Original post · 2 days ago</small></div><span className="sp-badge">Spark Ad</span></div>
  <div className="sp-video"><span className="sp-play">▶</span><span className="sp-caption">I tried this for a week. Here is what happened.</span></div>
  <ul className="sp-stats">{stats.map(([ic,l,n],i)=><li key={l} style={{'--n':n,'--d':`${.5+i*.2}s`}}><i>{ic}</i><b className="sp-count"/><small>{l} kept on the ad</small></li>)}</ul></div>
  <div className="sp-flow"><span>Organic post</span><i/><span>Spark Ad</span><i/><span>Sales</span></div>
</div>}

/* ---------- Amazon ---------- */
function Shelf(){const tiles=[1,1,'you',0,0,0];return <div className="sc sc-shelf">
  <div className="az-bar"><span>wireless earbuds</span><b>⌕</b></div>
  <div className="az-main"><div className="az-grid">{tiles.map((t,i)=><div key={i} className={`az-tile${t==='you'?' you':''}`} style={{'--d':`${i*.12}s`}}><div className="az-img"/>{(t===1||t==='you')&&<small>Sponsored</small>}{t==='you'&&<span className="az-you">Your product</span>}<i className="az-stars">★★★★☆</i><b>${[29,34,27,22,39,31][i]}.99</b></div>)}</div>
  <div className="az-rank"><span>Organic rank</span><div className="az-num"><div><b>#24</b><b>#17</b><b>#11</b><b>#6</b></div></div><i>↑</i><small>Ad sales lift organic position over time</small></div></div>
</div>}

function Acos(){return <div className="sc sc-acos">
  <ul className="ac-eq">{[['Price','$30'],['Amazon fees','$10'],['Product cost','$11'],['Profit before ads','$9']].map(([l,v],i)=><li key={l} style={{'--d':`${i*.2}s`}}><small>{l}</small><b>{v}</b></li>)}</ul>
  <p className="ac-be">Break even ACoS <b>30%</b><small>$9 profit divided by $30 price</small></p>
  <div className="ac-scale"><span className="ac-safe"/><span className="ac-line"><small>Break even</small></span><span className="ac-mark"><b className="ac-val"/></span><div className="ac-ticks"><i>0%</i><i>15%</i><i>30%</i><i>45%</i><i>60%</i></div></div>
  <p className="ac-note">Bringing ACoS from 45% down below 30% turns ad sales from loss into profit.</p>
</div>}

/* ---------- eBay ---------- */
function AdRate(){return <div className="sc sc-rate">
  <div className="er-item"><div className="er-photo"/><div><b>Vintage leather messenger bag</b><span>$50.00 · Free postage</span><small className="er-promo">Sponsored</small></div></div>
  <div className="er-slider"><div className="er-head"><span>Ad rate</span><b className="er-val"/></div><div className="er-track"><span className="er-sweet"><small>Sweet spot</small></span><i className="er-thumb"/></div><div className="er-ticks"><i>2%</i><i>6%</i><i>10%</i><i>14%</i></div></div>
  <div className="er-bars"><div><span>Visibility</span><i><em className="vis"/></i></div><div><span>Margin left</span><i><em className="mar"/></i></div></div>
</div>}

function ListingCheck(){const parts=['Keyword rich title','Sharp main photo','Item specifics filled','Price with postage','Clear returns policy'];return <div className="sc sc-listing">
  <div className="el-mock"><div className="el-photo"/><div className="el-lines"><i/><i/><i className="s"/><b>$50.00</b><span className="el-btn">Buy it now</span></div></div>
  <ul className="el-checks">{parts.map((p,i)=><li key={p} style={{'--d':`${.3+i*.3}s`}}><i>✓</i>{p}</li>)}</ul>
  <span className="el-stamp">Ready to promote</span>
</div>}

/* ---------- Etsy ---------- */
function ShopGrid(){const items=[['🕯️','Soy candle'],['💍','Silver ring'],['🧶','Knit throw'],['🖼️','Art print'],['🪴','Planter'],['☕','Mug set']];return <div className="sc sc-shop">
  <div className="et-bar"><span>handmade gifts for her</span></div>
  <div className="et-grid">{items.map(([e,l],i)=><div key={l} className={`et-card${i===1||i===3?' ad':''}`} style={{'--d':`${i*.25}s`}}><div className="et-img"><span>{e}</span><i className="et-heart">♥</i></div><b>{l}</b>{(i===1||i===3)&&<small>Ad by YourShop</small>}</div>)}</div>
</div>}

function Seasons(){const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];const peaks=[[1.3,"Valentine's"],[4.2,"Mother's Day"],[10.3,'Holidays']];const x=i=>14+i*24;return <div className="sc sc-seasons">
  <svg viewBox="0 0 300 150"><path className="ss-wave" pathLength="1" d="M14 110 C30 100 34 52 46 50 S62 104 80 104 S100 96 112 54 S130 104 150 106 S200 104 220 100 S250 60 262 40 S280 96 290 104"/>
    {peaks.map(([p,l],i)=><g key={l} className="ss-flag" style={{'--d':`${1+i*.35}s`}}><line x1={x(p-1)} x2={x(p-1)} y1="118" y2="70"/><path d={`M${x(p-1)} 70 l18 6 l-18 6z`}/><text x={x(p)} y={i===2?32:42} textAnchor="middle">{l}</text></g>)}
    {m.map((t,i)=><text key={t} x={x(i)} y="140" textAnchor="middle" className="ss-m">{t}</text>)}</svg>
  <div className="ss-legend"><span className="w">Buyer demand</span><span className="f">Start ads 3 to 4 weeks earlier</span></div>
</div>}

/* ---------- Microsoft ---------- */
function Desktop(){return <div className="sc sc-desk">
  <div className="ms-monitor"><div className="ms-screen"><div className="ms-top"><b className="ms-logo"><i/><i/><i/><i/></b><span className="ms-q">crm software for small business</span></div><div className="ms-res"><div className="ms-ad"><small>Ad</small><strong>Your CRM | Free 14 Day Trial</strong><span>yourcrm.com</span></div><i/><i/><i/></div></div><div className="ms-stand"/></div>
  <ul className="ms-chips">{['Bing','Yahoo','AOL','Microsoft Edge','Partner sites'].map((c,i)=><li key={c} style={{'--d':`${.8+i*.2}s`}}>{c}</li>)}</ul>
  <p className="ms-note">Office hours, Windows devices, decision makers at work</p>
</div>}

function ImportFlow(){const items=[['Campaigns','ok'],['Keywords','ok'],['Ads','ok'],['Bids','rev'],['Budgets','rev'],['Tracking','rev']];return <div className="sc sc-import">
  <div className="im-col g"><b>Google Ads</b>{items.map(([l])=><span key={l}>{l}</span>)}</div>
  <div className="im-lane">{items.map(([l,s],i)=><span key={l} className={`im-fly ${s}`} style={{'--d':`${i*.35}s`,'--y':`${i*16.6}%`}}>{l}</span>)}</div>
  <div className="im-col m"><b>Microsoft Ads</b>{items.map(([l,s],i)=><span key={l} className={s} style={{'--d':`${1.2+i*.35}s`}}>{l}<i>{s==='ok'?'✓':'Review'}</i></span>)}</div>
</div>}

/* ---------- LinkedIn ---------- */
function Targeting(){const chips=['Job function: Finance','Seniority: Director and above','Industry: Software','Company size: 200 to 1,000'];const dots=Array.from({length:84},(_,i)=>{const h=(i*37)%84;return h<6?4:h<14?3:h<30?2:h<52?1:0});return <div className="sc sc-target">
  <ul className="lt-chips">{chips.map((c,i)=><li key={c} style={{'--d':`${.4+i*.6}s`}}>{c}</li>)}</ul>
  <div className="lt-crowd">{dots.map((l,i)=><i key={i} className={`l${l}`}/>)}</div>
  <div className="lt-count"><span>All LinkedIn members</span><b>→</b><span className="hit">Your buyers</span></div>
</div>}

function Pipeline(){const cols=[['Impressions',100],['Engaged',62],['Leads',34],['Qualified',18],['Deals',8]];return <div className="sc sc-pipe">
  <div className="lp-cols">{cols.map(([l,h],i)=><div key={l} className="lp-col" style={{'--h':`${h}%`,'--d':`${i*.2}s`}}><div className="lp-stack"><em/></div><span>{l}</span></div>)}</div>
  <span className="lp-card"><i/>Finance Director, SaaS company</span>
  <p className="lp-note">Judged on qualified pipeline, not cost per click</p>
</div>}

/* ---------- YouTube ---------- */
function Skip(){return <div className="sc sc-skip">
  <div className="yt-player"><div className="yt-video"><span className="yt-brand">Your brand</span><span className="yt-hookline">The problem you solve, said in 5 seconds</span></div>
    <span className="yt-adlabel">Ad · 0:30</span>
    <span className="yt-skip"><span className="yt-count"><b>5</b><b>4</b><b>3</b><b>2</b><b>1</b><b>Skip ad ▷|</b></span></span>
    <div className="yt-bar"><em/></div></div>
  <div className="yt-timeline"><span className="z">First 5 seconds: brand and hook must land</span><span>The rest: story, proof and call to action</span></div>
</div>}

function Formats(){const f=[['Bumper','6s, cannot skip',12],['Non-skippable','About 15s',30],['Skippable in-stream','Skip after 5s',100],['In-feed video','Clicked to watch',70],['Shorts','Vertical, fast',22]];return <div className="sc sc-formats">
  {f.map(([n,d,w],i)=><div key={n} className={`yf-row${n==='Shorts'?' shorts':''}`} style={{'--w':`${w}%`,'--d':`${i*.18}s`}}><div><b>{n}</b><small>{d}</small></div><i><em/>{n==='Skippable in-stream'&&<span className="yf-skipmark">Skip</span>}</i></div>)}
</div>}

/* ---------- Display ---------- */
function FollowUp(){const steps=[['yourstore.pk','Views a product','p'],['Leaves the site','Gets distracted','x'],['news site','Sees your banner','b'],['yourstore.pk/cart','Comes back and buys','c']];return <div className="sc sc-follow">
  <svg className="fu-path" viewBox="0 0 300 200" preserveAspectRatio="none"><path pathLength="1" d="M75 50 H225 M225 50 C260 50 260 150 225 150 H75"/></svg>
  <div className="fu-grid">{steps.map(([u,t,k],i)=><div key={u} className={`fu-win ${k}`} style={{'--d':`${i*.4}s`}}><div className="fu-chrome"><i/><i/><i/><span>{u}</span></div><div className="fu-body">{k==='p'&&<span className="fu-prod"/>}{k==='x'&&<span className="fu-x">×</span>}{k==='b'&&<><i className="fu-l"/><i className="fu-l s"/><span className="fu-banner"><span className="fu-prod sm"/>Still thinking it over?</span></>}{k==='c'&&<span className="fu-ok">✓ Order placed</span>}</div><small>{t}</small></div>)}</div>
</div>}

function Layers(){const l=[['Cart abandoners','1 to 14 days','Reminder plus delivery details',58],['Product viewers','7 to 30 days','Show the item and reviews',74],['Blog readers','30 to 90 days','Helpful next step',90],['Recent buyers','Excluded','Cross sell only, never the same ad',100]];return <div className="sc sc-layers">
  {l.map(([n,w,m,wd],i)=><div key={n} className={`dl-tier${i===3?' ex':''}`} style={{'--w':`${wd}%`,'--d':`${i*.25}s`}}><b>{n}</b><span>{w}</span><small>{m}</small></div>)}
</div>}

const SCENES={serp:Serp,quality:Quality,feed:Feed,lookalike:Lookalike,hook:Hook,spark:Spark,shelf:Shelf,acos:Acos,adrate:AdRate,listing:ListingCheck,shop:ShopGrid,seasons:Seasons,desktop:Desktop,import:ImportFlow,targeting:Targeting,pipeline:Pipeline,skip:Skip,formats:Formats,followup:FollowUp,layers:Layers};
export function Scene({name,...rest}){const S=SCENES[name];return S?<div aria-hidden="true"><S {...rest}/></div>:null}
