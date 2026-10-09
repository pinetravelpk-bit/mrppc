import Link from 'next/link';
import {Graphic} from './Graphics';
import {business,telHref} from '@/lib/site';

// Inline markup: [label](/path) becomes a link, **text** becomes bold.
export function Rich({text}){const parts=[];const re=/\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;let last=0,m,k=0;while((m=re.exec(text))){if(m.index>last)parts.push(text.slice(last,m.index));parts.push(m[1]?(m[2].startsWith('/')?<Link key={k++} href={m[2]}>{m[1]}</Link>:<a key={k++} href={m[2]}>{m[1]}</a>):<strong key={k++}>{m[3]}</strong>);last=re.lastIndex}if(last<text.length)parts.push(text.slice(last));return <>{parts}</>}

function Heading({b}){return <>{b.eyebrow&&<p className="eyebrow">{b.eyebrow}</p>}{b.h2&&<h2>{b.h2}</h2>}</>}
function Paras({items}){return items?.map((p,i)=><p key={i}><Rich text={p}/></p>)}
function List({items}){return items?.length?<ul className="seo-list">{items.map((t,i)=><li key={i}><Rich text={t}/></li>)}</ul>:null}

export function CallActions({platform,dark}){return <div className="seo-actions"><a className={`button${dark?' dark':''}`} href={telHref}>Call {business.phone}</a><a className="button outline" href={business.whatsapp} rel="noopener">WhatsApp</a><Link className="text-link" href={platform?`/contact/?platform=${encodeURIComponent(platform)}`:'/contact/'}>Or prepare a campaign brief</Link></div>}

function Block({b,platform}){
  const tone=b.tone==='dark'?'':'light';
  switch(b.type){
    case 'answer':return <section className="section light seo-answer-section"><div className="wrap"><div className="seo-answer reveal"><span className="seo-answer-label">Quick answer</span><h2>{b.q}</h2><p className="seo-answer-text"><Rich text={b.a}/></p>{b.points&&<ul>{b.points.map(t=><li key={t}><Rich text={t}/></li>)}</ul>}</div></div></section>;
    case 'prose':return <section className={`section seo-prose ${tone}`}><div className={`wrap ${b.graphic?'seo-split':''} ${b.flip?'flip':''}`}><div className="seo-copy reveal"><Heading b={b}/><Paras items={b.paras}/><List items={b.list}/><Paras items={b.after}/></div>{b.graphic&&<Graphic g={b.graphic}/>}</div></section>;
    case 'cards':return <section className={`section seo-cards-section ${tone}`}><div className="wrap"><div className="seo-copy narrow reveal"><Heading b={b}/><Paras items={b.paras}/></div><div className={`seo-cards cols-${b.cols||3}`}>{b.items.map(([t,d],i)=><article className="reveal" key={t}><span className="detail-number">{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p><Rich text={d}/></p></article>)}</div>{b.after&&<div className="seo-after"><Paras items={b.after}/></div>}</div></section>;
    case 'table':return <section className={`section ${tone}`}><div className="wrap"><div className="seo-copy narrow reveal"><Heading b={b}/><Paras items={b.paras}/></div><div className="seo-table-wrap reveal"><table className="seo-table"><thead><tr>{b.head.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{b.rows.map(r=><tr key={r[0]}>{r.map((c,i)=>i===0?<th key={i} scope="row">{c}</th>:<td key={i}><Rich text={c}/></td>)}</tr>)}</tbody></table></div><div className="seo-copy narrow"><Paras items={b.after}/></div></div></section>;
    case 'steps':return <section className={`section ${tone}`}><div className={`wrap ${b.graphic?'seo-split':''}`}><div><div className="seo-copy reveal"><Heading b={b}/><Paras items={b.paras}/></div><ol className="seo-steps">{b.items.map(([t,d],i)=><li className="reveal" key={t}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{t}</h3><p><Rich text={d}/></p></div></li>)}</ol></div>{b.graphic&&<Graphic g={b.graphic}/>}</div></section>;
    case 'checklist':return <section className={`section ${tone}`}><div className="wrap seo-split"><div className="seo-copy reveal"><Heading b={b}/><Paras items={b.paras}/></div><ul className="seo-checklist reveal">{b.items.map(t=><li key={t}><Rich text={t}/></li>)}</ul></div></section>;
    case 'stats':return <section className="seo-stats"><div className="wrap">{b.items.map(([n,l])=><div className="reveal" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>;
    case 'cta':return <section className="seo-cta"><div className="wrap"><div className="reveal"><p className="eyebrow">{b.eyebrow||'TALK TO SYED DIRECTLY'}</p><h2>{b.title}</h2>{b.text&&<p>{b.text}</p>}</div><CallActions platform={platform} dark/></div></section>;
    case 'author':return <section className="section light seo-author-section"><div className="wrap"><div className="seo-author reveal"><span className="monogram">SM</span><div><p className="eyebrow">ABOUT THE AUTHOR</p><h2>{b.title||'Written by Syed Mudassir Shah'}</h2><p><Rich text={b.text}/></p><p className="seo-meta">Last updated {business.updated} · {business.addressLine} · <a href={telHref}>{business.phone}</a></p></div></div></div></section>;
    default:return null;
  }
}
export default function SeoContent({blocks,platform}){return <>{blocks.map((b,i)=><Block key={i} b={b} platform={platform}/>)}</>}
