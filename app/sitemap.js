import {services,siteUrl} from '@/lib/services';
export const dynamic='force-static';
export default function sitemap(){return ['','services','about','our-approach','contact',...services.map(s=>`services/${s.slug}`)].map(path=>({url:`${siteUrl}/${path}${path?'/':''}`}))}
