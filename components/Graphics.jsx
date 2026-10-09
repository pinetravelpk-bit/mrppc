// Animated SVG infographics. Animations start when the parent .reveal gets .visible (see Reveal.jsx).
import {Scene} from './Scenes';
// Every chart is labelled as illustrative: no client results are implied.

function Figure({title,caption,className='',children}){return <figure className={`seo-figure reveal ${className}`}>{title&&<p className="seo-figure-title">{title}</p>}{children}{caption&&<figcaption>{caption}</figcaption>}</figure>}

export function GrowthChart({title,caption='Illustrative example of a typical optimisation pattern. Not a client result.',labels=['M1','M2','M3','M4','M5','M6'],bars=[30,38,47,58,70,84],line=[70,62,55,48,42,36],barLabel='Conversions',lineLabel='Cost per result'}){
  const W=600,H=320,L=48,B=270,T=30,step=(W-L-30)/labels.length,bw=step*.48;
  const y=v=>B-(v/100)*(B-T);
  const pts=line.map((v,i)=>`${L+step*i+step/2},${y(v)}`);
  const d='M'+pts.join(' L');
  return <Figure title={title} caption={caption} className="growth-figure"><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title||'Growth chart'}: ${barLabel} rising while ${lineLabel} falls over ${labels.length} periods`}>
    {[0,25,50,75,100].map(v=><line key={v} x1={L} x2={W-20} y1={y(v)} y2={y(v)} className="g-grid"/>)}
    {bars.map((v,i)=><rect key={i} className="g-bar" x={L+step*i+(step-bw)/2} y={y(v)} width={bw} height={B-y(v)} rx="6" style={{'--d':`${i*.12}s`}}/>)}
    <path d={d} className="g-line" pathLength="1"/>
    {pts.map((p,i)=>{const [cx,cy]=p.split(',');return <circle key={i} cx={cx} cy={cy} r="5" className="g-dot" style={{'--d':`${.9+i*.12}s`}}/>})}
    {labels.map((t,i)=><text key={t} x={L+step*i+step/2} y={B+24} className="g-label" textAnchor="middle">{t}</text>)}
  </svg><div className="g-legend"><span><i className="lg-bar"/>{barLabel}</span><span><i className="lg-line"/>{lineLabel}</span></div></Figure>}

export function Funnel({title,caption,stages}){
  const n=stages.length;
  return <Figure title={title} caption={caption} className="funnel-figure"><ol className="funnel" aria-label={title}>{stages.map(([label,text],i)=><li key={label} style={{'--w':`${100-i*(46/Math.max(n-1,1))}%`,'--d':`${i*.15}s`}}><strong>{label}</strong><span>{text}</span></li>)}</ol></Figure>}

export function Cycle({title,caption,center,items}){
  const R=118,C=160;
  return <Figure title={title} caption={caption} className="cycle-figure"><div className="cycle-wrap"><svg viewBox="0 0 320 320" aria-hidden="true"><circle cx={C} cy={C} r={R} className="c-ring"/><circle cx={C} cy={C} r={R} className="c-progress" pathLength="1"/><g className="c-orbit"><circle cx={C} cy={C-R} r="7" className="c-dot"/></g></svg><div className="cycle-center">{center}</div>{items.map((t,i)=>{const a=(i/items.length)*2*Math.PI-Math.PI/2;return <span key={t} className="cycle-node" style={{left:`${50+Math.cos(a)*37}%`,top:`${50+Math.sin(a)*37}%`,'--d':`${i*.18}s`}}><b>{String(i+1).padStart(2,'0')}</b>{t}</span>})}</div><ul className="sr-only">{items.map(t=><li key={t}>{t}</li>)}</ul></Figure>}

export function Meters({title,caption,items}){return <Figure title={title} caption={caption} className="meter-figure"><ul className="meters">{items.map(([label,value,note],i)=><li key={label} style={{'--v':`${value}%`,'--d':`${i*.14}s`}}><div><strong>{label}</strong>{note&&<span>{note}</span>}</div><i aria-hidden="true"><em/></i></li>)}</ul></Figure>}

function SceneFigure({title,caption,alt,...rest}){return <Figure title={title} caption={caption} className={`scene-figure scene-${rest.name}`}>{alt&&<p className="sr-only">{alt}</p>}<Scene {...rest}/></Figure>}
export function Graphic({g}){if(!g)return null;if(g.type==='scene'){const {type,...rest}=g;return <SceneFigure {...rest}/>}const P={growth:GrowthChart,funnel:Funnel,cycle:Cycle,meters:Meters}[g.type];return P?<P {...g}/>:null}
