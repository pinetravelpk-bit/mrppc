import {siteUrl} from '@/lib/services';
export const dynamic='force-static';
export default function robots(){return {rules:[{userAgent:'*',allow:'/'},...['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User','PerplexityBot','Google-Extended','Applebot-Extended','Bingbot'].map(userAgent=>({userAgent,allow:'/'}))],sitemap:`${siteUrl}/sitemap.xml`,host:siteUrl}}
