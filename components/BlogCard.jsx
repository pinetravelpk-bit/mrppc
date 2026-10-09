import Link from 'next/link';
import {platforms} from '@/lib/platforms';

const DEFAULT={mark:'✳',label:'PPC',accent:'#c5f943',secondary:'#b899ff'};
export const postPlatform=p=>platforms[p.service]||DEFAULT;
const fmt=d=>new Date(d+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});

// Cover art is pure CSS in the platform's colours, so posts need no image files.
export function PostCover({post,large}){const p=postPlatform(post);return <div className={`post-cover${large?' large':''}`} style={{'--a':p.accent,'--b':p.secondary}} aria-hidden="true"><span className="pc-orb one"/><span className="pc-orb two"/><span className="pc-grid"/><b className="pc-mark">{p.mark}</b><span className="pc-label">{p.label}</span></div>}

export default function BlogCard({post,large}){return <article className={`blog-card${large?' featured':''}`}><Link href={`/blog/${post.slug}/`} className="blog-card-link"><PostCover post={post} large={large}/><div className="blog-card-body"><div className="blog-meta"><span className="blog-cat">{post.category}</span><span>{post.readMinutes} min read</span></div><h3>{post.title}</h3><p>{post.excerpt||post.description}</p><div className="blog-meta foot"><span>{fmt(post.date)}</span><span className="blog-more">Read article <i>→</i></span></div></div></Link></article>}
