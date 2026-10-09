import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getPosts,getPost,formatDate} from '@/lib/blog';
import {services,siteUrl} from '@/lib/services';
import {platforms} from '@/lib/platforms';
import {business,telHref} from '@/lib/site';
import {Graphic} from '@/components/Graphics';
import SeoContent from '@/components/SeoContent';
import BlogCard,{PostCover} from '@/components/BlogCard';
import {JsonLd,breadcrumbSchema,faqSchema,orgId,personId} from '@/lib/schema';

export function generateStaticParams(){return getPosts().map(p=>({slug:p.slug}))}
export async function generateMetadata({params}){const {slug}=await params;const p=getPosts().find(p=>p.slug===slug);if(!p)return {};
  return {title:p.title,description:p.description,alternates:{canonical:`/blog/${p.slug}/`},openGraph:{type:'article',title:p.title,description:p.description,url:`/blog/${p.slug}/`,publishedTime:p.date,modifiedTime:p.updated,authors:[`${siteUrl}/about/`],section:p.category}}}

export default async function Post({params}){const {slug}=await params;const p=getPost(slug);if(!p)notFound();
  const svc=services.find(s=>s.slug===p.service);const plat=platforms[p.service];
  const related=getPosts().filter(x=>x.slug!==p.slug).sort((a,b)=>Number(b.service===p.service)-Number(a.service===p.service)).slice(0,3);
  const url=`${siteUrl}/blog/${p.slug}/`;
  return <main id="main" className={`post-page${plat?` platform-page platform-${p.service}`:''}`} style={plat?{'--platform-accent':plat.accent,'--platform-secondary':plat.secondary}:undefined}>
    <JsonLd data={{'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description,datePublished:p.date,dateModified:p.updated,author:{'@id':personId},publisher:{'@id':orgId},mainEntityOfPage:url,url,image:`${siteUrl}/assets/arrow-rise.webp`,wordCount:p.words,articleSection:p.category,inLanguage:'en-PK',...(svc?{about:{'@type':'Service',name:`${svc.name} management`,url:`${siteUrl}/services/${svc.slug}/`}}:{})}}/>
    <JsonLd data={breadcrumbSchema([['Home','/'],['Blog','/blog/'],[p.title,`/blog/${p.slug}/`]])}/>
    {p.faqs.length>0&&<JsonLd data={faqSchema(p.faqs)}/>}
    <section className="post-hero"><div className="wrap post-hero-grid"><div><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/blog/">Blog</Link><span>/</span>{p.category}</div><p className="eyebrow">{p.category.toUpperCase()}</p><h1>{p.title}</h1><p className="inner-intro">{p.excerpt||p.description}</p>
      <div className="post-byline"><span className="monogram">SM</span><div><strong><Link href="/about/">Syed Mudassir Shah</Link></strong><span>PPC expert · {p.readMinutes} min read</span><span>Published {formatDate(p.date)}{p.updated!==p.date?` · Updated ${formatDate(p.updated)}`:''}</span></div></div></div>
      <PostCover post={p} large/></div></section>
    <section className="section light post-body-section"><div className="wrap post-layout">
      <article className="post-article">{p.parts.map((part,i)=>part.graphic?<div className="post-graphic" key={i}><Graphic g={part.graphic}/></div>:<div key={i} className="post-prose" dangerouslySetInnerHTML={{__html:part.html}}/>)}</article>
      <aside className="post-aside">{p.toc.length>2&&<nav className="post-toc" aria-label="On this page"><p>On this page</p><ol>{p.toc.map(t=><li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}</ol></nav>}
        <div className="post-help"><p className="eyebrow">NEED A HAND?</p><strong>{svc?`Talk to a ${svc.name} expert`:'Talk to a PPC expert'}</strong><p>Free account review from Syed. No obligation.</p><a className="button" href={telHref}>Call {business.phone}</a><a className="button outline" href={business.whatsapp} rel="noopener">WhatsApp</a>{svc&&<Link className="text-link" href={`/services/${svc.slug}/`}>{svc.name} service</Link>}</div></aside>
    </div></section>
    <SeoContent platform={svc?.name} blocks={[{type:'cta',eyebrow:'PUT THIS INTO PRACTICE',title:svc?`Want help with your ${svc.name}?`:'Want help with your ads?',text:`Call or WhatsApp ${business.phone}. I will look at your account or plans and tell you honestly what I would change first.`},{type:'author',text:'Syed Mudassir Shah is the founder of MrPPC.pk and a PPC expert with 15 years of experience across Google, Meta, TikTok, Amazon, eBay, Etsy, Microsoft, LinkedIn and YouTube advertising. He works from Scheme 3, Rawalpindi, with clients in Islamabad, across Pakistan and abroad. [More about Syed](/about/).'}]}/>
    {related.length>0&&<section className="section light post-related"><div className="wrap"><p className="eyebrow">KEEP READING</p><h2>More PPC guides.</h2><div className="blog-grid">{related.map(r=><BlogCard key={r.slug} post={r}/>)}</div></div></section>}
  </main>}
