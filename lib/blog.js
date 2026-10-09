// Blog posts live in content/blog/*.md and are read at build time.
//
// Frontmatter (between --- lines), one "key: value" per line:
//   title, description, date (YYYY-MM-DD), updated, category, service (a service slug), excerpt, featured (true/false),
//   keyword (main search phrase), location (city, adds local schema),
//   metaTitle (the Google title; must contain the keyword and stay under 70 characters with " | MrPPC.pk")
// Body: normal Markdown. Extras:
//   ```graphic { ...JSON... } ```   renders an animated figure (same options as service pages)
//   "## Frequently asked questions" followed by "### Question" + answer paragraphs becomes FAQ schema.
import fs from 'node:fs';
import path from 'node:path';
import {Marked} from 'marked';

const DIR=path.join(process.cwd(),'content','blog');
export const slugify=t=>t.toLowerCase().replace(/<[^>]+>/g,'').replace(/&[a-z#0-9]+;/g,'').replace(/[^a-z0-9\s]/g,'').trim().replace(/\s+/g,'-');

function parseFile(raw){const m=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);if(!m)throw new Error('Blog post is missing frontmatter');
  const data={};for(const line of m[1].split(/\r?\n/)){const i=line.indexOf(':');if(i<1)continue;let v=line.slice(i+1).trim();if(/^".*"$/.test(v))v=v.slice(1,-1);data[line.slice(0,i).trim()]=v==='true'?true:v==='false'?false:v}
  return {data,body:m[2]}}

function render(body){
  const toc=[];const marked=new Marked({gfm:true});
  marked.use({renderer:{
    heading({tokens,depth}){const html=this.parser.parseInline(tokens);const id=slugify(html);if(depth===2)toc.push({id,text:html.replace(/<[^>]+>/g,'')});return `<h${depth} id="${id}">${html}</h${depth}>\n`},
    link({href,title,tokens}){const text=this.parser.parseInline(tokens);const ext=/^https?:/.test(href)&&!href.includes('mrppc.pk');return `<a href="${href}"${title?` title="${title}"`:''}${ext?' rel="noopener" target="_blank"':''}>${text}</a>`}
  }});
  const html=md=>marked.parse(md).replace(/<table>/g,'<div class="post-table"><table>').replace(/<\/table>/g,'</table></div>');
  // split out ```graphic blocks so they can render as React figures
  const parts=[];const re=/```graphic\s*\n([\s\S]*?)```/g;let last=0,m;
  while((m=re.exec(body))){if(m.index>last)parts.push({html:html(body.slice(last,m.index))});parts.push({graphic:JSON.parse(m[1])});last=re.lastIndex}
  if(last<body.length)parts.push({html:html(body.slice(last))});
  return {parts,toc}}

function faqsFrom(body){const s=body.split(/^##\s+Frequently asked questions\s*$/mi)[1];if(!s)return [];const section=s.split(/^##\s/m)[0];
  return section.split(/^###\s+/m).slice(1).map(b=>{const [q,...rest]=b.split('\n');return [q.trim(),rest.join(' ').replace(/\s+/g,' ').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*_`]/g,'').trim()]}).filter(([q,a])=>q&&a)}

let cache;
export function getPosts(){if(cache)return cache;
  const files=fs.existsSync(DIR)?fs.readdirSync(DIR).filter(f=>f.endsWith('.md')):[];
  cache=files.map(f=>{const {data,body}=parseFile(fs.readFileSync(path.join(DIR,f),'utf8'));const words=body.replace(/```[\s\S]*?```/g,'').split(/\s+/).filter(Boolean).length;
    return {slug:f.replace(/\.md$/,''),...data,updated:data.updated||data.date,words,readMinutes:Math.max(1,Math.round(words/220)),body}})
    .sort((a,b)=>b.date.localeCompare(a.date));
  return cache}
export function getPost(slug){const p=getPosts().find(p=>p.slug===slug);if(!p)return null;return {...p,...render(p.body),faqs:faqsFrom(p.body)}}
export const formatDate=d=>new Date(d+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
