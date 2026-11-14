// Animated scenes for the Google Ads guides on the blog (styles in app/local-scenes.css). All data is illustrative.

/* Expert: search terms report, wasted searches become negatives */
function SearchTerms(){const rows=[['dentist f8 islamabad',38,4,'keep'],['dentist jobs islamabad',21,0,'neg'],['teeth whitening price islamabad',17,2,'keep'],['free dental checkup',29,0,'neg'],['dental course pakistan',12,0,'neg'],['root canal specialist islamabad',14,3,'keep']];
  return <div className="sc sc-terms"><div className="st-head"><span>Search term</span><span>Clicks</span><span>Conv.</span><span>Action</span></div>
  {rows.map(([t,c,v,a],i)=><div key={t} className={`st-row ${a}`} style={{'--d':`${.2+i*.18}s`,'--x':`${1.6+i*.25}s`}}><span className="st-term">{t}</span><span>{c}</span><span>{v}</span><span className="st-act">{a==='keep'?'Keep':'Add negative'}</span></div>)}
  <p className="st-foot"><b>3 negatives added</b> · 62 wasted clicks blocked next month</p></div>}

/* Specialist: keyword match types */
function MatchTypes(){const cols=[['Broad','plumber islamabad',[['plumber islamabad',1],['emergency plumber near me',1],['plumbing course online',0],['water tank cleaning',0]]],['Phrase','"plumber islamabad"',[['plumber islamabad',1],['24 hour plumber islamabad',1],['best plumber islamabad g11',1]]],['Exact','[plumber islamabad]',[['plumber islamabad',1],['islamabad plumber',1]]]];
  return <div className="sc sc-match">{cols.map(([n,k,list],ci)=><div key={n} className={`mt-col c${ci}`}><b>{n}</b><code>{k}</code><ul>{list.map(([q,ok],i)=><li key={q} className={ok?'ok':'bad'} style={{'--d':`${.3+ci*.35+i*.15}s`}}>{q}</li>)}</ul></div>)}<p className="mt-note">Reach narrows from left to right. Control grows the same way.</p></div>}

/* Consultant: account audit scorecard */
function AuditScore(){const cats=[['Conversion tracking',35],['Account structure',55],['Keywords and negatives',40],['Ads and assets',70],['Landing pages',60],['Bidding and budgets',65]];const total=Math.round(cats.reduce((a,[,v])=>a+v,0)/cats.length);
  return <div className="sc sc-audit"><div className="au-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" className="au-track"/><circle cx="60" cy="60" r="50" className="au-fill" style={{'--v':(total/100*2*Math.PI*50).toFixed(1)}}/></svg><div><b>{total}</b><small>Account health</small></div></div>
  <ul className="au-list">{cats.map(([l,v],i)=><li key={l} className={v<50?'low':v<65?'mid':'high'} style={{'--v':`${v}%`,'--d':`${.3+i*.15}s`}}><span>{l}</span><i><em/></i><b>{v}</b></li>)}</ul></div>}

/* Freelance: who owns the account and how access works */
function Access(){const s=[['🏢','Your Google Ads account','In your business name. Your card pays Google directly.'],['✉️','You invite the freelancer','Admin, Standard or Read only access, by email or manager account link.'],['⚙️','They manage inside your account','Every change is logged in the change history you can see.'],['🔒','You stay in control','Remove access any time. Data, history and audiences stay with you.']];
  return <div className="sc sc-access"><ol>{s.map(([ic,t,d],i)=><li key={t} style={{'--d':`${.3+i*.45}s`}}><span className="ac-ic">{ic}</span><div><b>{t}</b><small>{d}</small></div></li>)}</ol></div>}

export const GOOGLE_SCENES={searchterms:SearchTerms,matchtypes:MatchTypes,auditscore:AuditScore,access:Access};
