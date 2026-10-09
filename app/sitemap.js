import {services,siteUrl} from '@/lib/services';
export const dynamic='force-static';
export default function sitemap(){return ['','services','about','our-approach','contact',...services.map(s=>`services/${s.slug}`)].map(path=>({url:`${siteUrl}/${path}${path?'/':''}`,lastModified:'2026-10-09',changeFrequency:'monthly',priority:path===''?1:path.startsWith('services/')?0.9:0.7}))}
