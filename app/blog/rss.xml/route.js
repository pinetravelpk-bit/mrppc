import {getPosts} from '@/lib/blog';
import {siteUrl} from '@/lib/services';
export const dynamic='force-static';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export function GET(){const items=getPosts().map(p=>`<item><title>${esc(p.title)}</title><link>${siteUrl}/blog/${p.slug}/</link><guid>${siteUrl}/blog/${p.slug}/</guid><pubDate>${new Date(p.date+'T09:00:00Z').toUTCString()}</pubDate><category>${esc(p.category)}</category><description>${esc(p.description)}</description></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>MrPPC.pk Blog</title><link>${siteUrl}/blog/</link><description>PPC guides from Syed Mudassir Shah</description><language>en-pk</language>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}})}
