import Link from 'next/link';
import {getPosts} from '@/lib/blog';
import {siteUrl} from '@/lib/services';
import BlogCard from '@/components/BlogCard';
import BlogGrid from '@/components/BlogGrid';
import {CTA} from '@/components/PageParts';
import {JsonLd,breadcrumbSchema,orgId,personId} from '@/lib/schema';

const title='PPC Blog | Google Ads, Meta Ads & Amazon PPC Guides';
const description='Practical PPC guides from Syed Mudassir Shah: Google Ads costs in Pakistan, Facebook vs Google Ads, Amazon PPC and more. Plain answers, no jargon.';
export const metadata={title:{absolute:`${title} | MrPPC.pk`},description,alternates:{canonical:'/blog/',types:{'application/rss+xml':'/blog/rss.xml'}},openGraph:{title,description,url:'/blog/',type:'website'}};

export default function Blog(){const posts=getPosts();const featured=posts.find(p=>p.featured)||posts[0];const rest=posts.filter(p=>p!==featured);const cats=[...new Set(rest.map(p=>p.category))];
  return <main id="main" className="blog-index">
    <JsonLd data={{'@context':'https://schema.org','@type':'Blog',name:'MrPPC.pk Blog',url:`${siteUrl}/blog/`,description,publisher:{'@id':orgId},author:{'@id':personId},blogPost:posts.map(p=>({'@type':'BlogPosting',headline:p.title,url:`${siteUrl}/blog/${p.slug}/`,datePublished:p.date,dateModified:p.updated}))}}/>
    <JsonLd data={breadcrumbSchema([['Home','/'],['Blog','/blog/']])}/>
    <section className="blog-hero"><div className="wrap"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span>Blog</div><p className="eyebrow">THE MRPPC.PK BLOG</p><h1>PPC advice you can<br/><span>actually use.</span></h1><p className="inner-intro">Straight answers about Google Ads, Meta, TikTok, Amazon and every other platform I work on. Written from 15 years of running real ad accounts, for business owners in Pakistan and beyond.</p></div></section>
    {featured&&<section className="section light blog-featured-section"><div className="wrap"><p className="eyebrow">LATEST ARTICLE</p><BlogCard post={featured} large/></div></section>}
    {rest.length>0&&<section className="section light blog-list-section"><div className="wrap"><div className="blog-list-head"><div><p className="eyebrow">ALL ARTICLES</p><h2>Browse by topic.</h2></div><a className="blog-rss" href="/blog/rss.xml">RSS feed</a></div><BlogGrid categories={cats}>{rest.map(p=><div key={p.slug} data-cat={p.category}><BlogCard post={p}/></div>)}</BlogGrid></div></section>}
    <CTA title="Have a question I have not answered yet?"/>
  </main>}
