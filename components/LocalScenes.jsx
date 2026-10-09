// Animated scenes for the Islamabad local guides on the blog (styles in app/local-scenes.css).
// Maps are stylised, not to scale. Every number is an example.

/* PPC expert: twin cities coverage map */
function TwinCities(){const isb=[['E-11',60,62],['F-7',128,48],['Blue Area',172,76],['G-11',74,104],['I-8',176,122],['DHA',250,112],['Bahria Town',96,160]];const rwp=[['Satellite Town',150,196],['Saddar',196,222]];
  return <div className="sc sc-twin"><svg viewBox="0 0 320 260">
    <ellipse cx="160" cy="92" rx="140" ry="70" className="tw-city isb"/><ellipse cx="190" cy="205" rx="105" ry="44" className="tw-city rwp"/>
    <text x="30" y="30" className="tw-name">ISLAMABAD</text><text x="96" y="252" className="tw-name">RAWALPINDI</text>
    <path d="M172 76 C200 110 225 140 262 196" className="tw-road" pathLength="1"/><text x="214" y="130" className="tw-road-l">Expressway</text>
    {[...isb,...rwp].map(([l,x,y],i)=><g key={l} className="tw-pt" style={{'--d':`${.5+i*.15}s`}}><circle cx={x} cy={y} r="5"/><text x={x+8} y={y+4}>{l}</text></g>)}
    <g className="tw-hq"><circle cx="262" cy="196" r="16" className="tw-pulse"/><circle cx="262" cy="196" r="16" className="tw-pulse p2"/><circle cx="262" cy="196" r="8" className="tw-core"/><text x="226" y="178">Scheme 3</text></g>
  </svg><div className="tw-legend"><span className="hq">MrPPC.pk, Scheme 3</span><span className="pt">Areas we target daily</span></div></div>}

/* Google: location radius plus call ad */
function Radius(){return <div className="sc sc-radius">
  <div className="rd-map"><svg viewBox="0 0 220 220">{[90,62,34].map((r,i)=><circle key={r} cx="110" cy="110" r={r} className={`rd-ring r${i}`}/>)}<path d="M110 92 c-10 0-17 7-17 16 0 13 17 28 17 28s17-15 17-28c0-9-7-16-17-16z" className="rd-pin"/><circle cx="110" cy="107" r="6" fill="#fff"/></svg>
    <span className="rd-l l0">Islamabad and Rawalpindi</span><span className="rd-l l1">10 km</span><span className="rd-l l2">3 km</span></div>
  <div className="rd-ad"><small>Sponsored</small><strong>Dental Clinic in F-8 | Same Day Visits</strong><span>Open today until 9pm · F-8 Markaz</span><b className="rd-call">☎ Call</b><i className="rd-tap"/></div>
</div>}

/* Meta: WhatsApp chat lead */
function Chat(){const m=[['in','Hi, I saw your ad on Instagram. Do you have weekend slots?'],['out','Wa alaikum assalam! Yes, Saturday and Sunday. Which branch suits you, F-7 or Bahria Town?'],['in','F-7 please. Saturday afternoon'],['out','Done. Booked for Saturday 4pm at F-7. See you then!']];
  return <div className="sc sc-chat"><div className="ch-phone"><div className="ch-top"><i/>Your Business<small>online</small></div><div className="ch-body">{m.map(([w,t],i)=><p key={i} className={`ch-msg ${w}`} style={{'--d':`${.4+i*.9}s`}}>{t}</p>)}<span className="ch-typing" style={{'--d':'3.9s'}}><i/><i/><i/></span></div></div><span className="ch-badge">Lead tracked as a conversion</span></div>}

/* TikTok: creative test board */
function TestBoard(){const h=['POV: first visit','3 mistakes to avoid','Price reveal','Day in the life','Before and after','Customer reacts','Myth vs fact','Ask the founder','Unboxing'];const win=[1,4];
  return <div className="sc sc-board"><div className="tb-grid">{h.map((t,i)=><div key={t} className={`tb-cell${win.includes(i)?' win':''}`} style={{'--d':`${i*.12}s`}}><span className="tb-play">▶</span><b>{t}</b>{win.includes(i)&&<em>Scale</em>}</div>)}</div><div className="tb-legend"><span className="w">Winning hooks get budget</span><span className="l">Weak hooks are paused</span></div></div>}

/* Amazon: Pakistan to marketplace route */
function Route(){const s=[['Source','Sialkot, Lahore or Islamabad'],['Ship','To Amazon warehouse'],['List','Listing and Brand Registry'],['Launch','Sponsored Products'],['Grow','Reviews and organic rank']];
  return <div className="sc sc-route"><svg viewBox="0 0 300 70" className="rt-svg"><path d="M20 50 C80 0 220 0 280 50" className="rt-arc" pathLength="1"/><text x="150" y="16" textAnchor="middle" className="rt-plane">✈</text></svg>
  <ol className="rt-steps">{s.map(([t,d],i)=><li key={t} style={{'--d':`${.3+i*.3}s`}}><span>{String(i+1).padStart(2,'0')}</span><b>{t}</b><small>{d}</small></li>)}</ol></div>}

/* eBay: profit waterfall */
function Waterfall(){const rows=[['Sale price',50,0,'s'],['Final value fee',7,43,'f'],['Promoted Listings fee',3,40,'f'],['Postage',8,32,'f'],['Item cost',20,12,'f'],['Profit',12,0,'p']];
  return <div className="sc sc-water">{rows.map(([l,v,off,k],i)=><div key={l} className={`wf-row ${k}`} style={{'--off':`${off*2}%`,'--w':`${v*2}%`,'--d':`${i*.25}s`}}><span>{l}</span><i><em/></i><b>{k==='f'?'minus ':''}${v}</b></div>)}<p className="wf-note">Example numbers. Fees vary by category and account.</p></div>}

/* Etsy: photo A/B test */
function AbTest(){return <div className="sc sc-ab">{[['A','Plain white background','plain',38],['B','Styled lifestyle photo','life',72]].map(([k,l,c,v])=><div key={k} className={`ab-card ${c}`}><div className="ab-img"><span>💍</span>{c==='life'&&<i className="ab-leaf">🌿</i>}<b>{k}</b></div><small>{l}</small><div className="ab-bar"><em style={{'--v':`${v}%`}}/></div><span className="ab-v">Click rate</span>{c==='life'&&<span className="ab-win">Winner</span>}</div>)}</div>}

/* Microsoft: office hours heatmap */
function Heatmap(){const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];const hrs=[8,10,12,14,16,18,20];const v=(d,h)=>{const work=d<5;const peak=h>=10&&h<=16;return work?(peak?.9-(h===12?.15:0):h<10?.45:.35):(h>=12&&h<=18?.3:.15)};
  return <div className="sc sc-heat"><div className="hm-grid"><span/>{hrs.map(h=><span key={h} className="hm-h">{h}:00</span>)}{days.flatMap((d,di)=>[<span key={d} className="hm-d">{d}</span>,...hrs.map((h,hi)=><i key={d+h} style={{'--v':v(di,h),'--d':`${(di+hi)*.06}s`}}/>)])}</div><div className="hm-legend"><span>Quiet</span><i/><span>Busy</span></div><p className="hm-note">Illustrative search activity in the target market's local time.</p></div>}

/* LinkedIn: B2B export map */
function Export(){const t=[['USA',40,70],['UK',120,40],['Europe',160,58],['Saudi Arabia',158,140],['UAE',212,146]];const o=[262,98];
  return <div className="sc sc-export"><svg viewBox="0 0 300 180">{t.map(([l,x,y],i)=><g key={l} style={{'--d':`${.4+i*.3}s`}} className="ex-route"><path d={`M${o[0]} ${o[1]} Q ${(o[0]+x)/2} ${Math.min(o[1],y)-50} ${x} ${y}`} pathLength="1"/><circle cx={x} cy={y} r="5"/><text x={x} y={y+18} textAnchor="middle">{l}</text></g>)}<circle cx={o[0]} cy={o[1]} r="12" className="ex-pulse"/><circle cx={o[0]} cy={o[1]} r="7" className="ex-home"/><text x={o[0]} y={o[1]+26} textAnchor="middle" className="ex-home-l">Islamabad</text></svg></div>}

/* YouTube: one idea, three cuts */
function Cuts(){return <div className="sc sc-cuts"><div className="ct-stage"><div className="ct-frame"><span className="ct-tag">Your brand</span><b>One idea</b></div></div><ul className="ct-labels"><li className="a">16:9 In-stream</li><li className="b">9:16 Shorts</li><li className="c">1:1 In-feed</li></ul></div>}

/* Display: frequency cap */
function Frequency(){const d=['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7'];const shown=[1,1,0,1,0,0,0];
  return <div className="sc sc-freq"><div className="fq-user"><span className="fq-avatar"/><div><b>One visitor from G-11</b><small>Viewed a property page, did not enquire</small></div></div>
  <ol className="fq-days">{d.map((x,i)=><li key={x} className={shown[i]?'on':i>3?'cap':''} style={{'--d':`${.3+i*.3}s`}}><span>{x}</span><i>{shown[i]?'Ad':i>3?'Off':''}</i></li>)}</ol>
  <div className="fq-cap"><span className="fq-lock">🔒</span>Cap reached: 3 views a week. No more ads until next week.</div></div>}

export const LOCAL_SCENES={twincities:TwinCities,radius:Radius,chat:Chat,testboard:TestBoard,route:Route,waterfall:Waterfall,abtest:AbTest,heatmap:Heatmap,export:Export,cuts:Cuts,frequency:Frequency};
