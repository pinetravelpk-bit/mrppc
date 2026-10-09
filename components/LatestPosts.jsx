import Link from 'next/link';
import {getPosts} from '@/lib/blog';
import BlogCard from './BlogCard';

// "From the blog" strip. Pass a service slug to show posts about that platform first; hides itself if there are no posts.
export default function LatestPosts({service,title='From the blog.',eyebrow='PPC GUIDES',limit=3}){
  let posts=getPosts();if(service){const own=posts.filter(p=>p.service===service);if(!own.length)return null;posts=[...own,...posts.filter(p=>p.service!==service)]}
  posts=posts.slice(0,limit);if(!posts.length)return null;
  return <section className="section light latest-posts"><div className="wrap"><div className="section-heading reveal"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><Link className="text-link" href="/blog/">All articles</Link></div><div className="blog-grid">{posts.map(p=><BlogCard key={p.slug} post={p}/>)}</div></div></section>}
