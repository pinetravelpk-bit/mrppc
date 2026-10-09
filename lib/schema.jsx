import {siteUrl} from './services';
import {business} from './site';
export const orgId=`${siteUrl}/#business`;
export const personId=`${siteUrl}/#syed-mudassir-shah`;
const served=[{'@type':'City',name:'Islamabad'},{'@type':'City',name:'Rawalpindi'},{'@type':'Country',name:'Pakistan'}];
const clean=t=>t.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/\*\*/g,'');
export function businessSchema(){return {'@context':'https://schema.org','@graph':[
  {'@type':['ProfessionalService','LocalBusiness'],'@id':orgId,name:business.name,url:`${siteUrl}/`,telephone:business.phoneIntl,image:`${siteUrl}/assets/arrow-rise.webp`,logo:`${siteUrl}/favicon.svg`,description:'PPC management and paid advertising services led by Syed Mudassir Shah, a PPC expert with 15 years of experience across Google Ads, Meta Ads, TikTok Ads, Amazon Ads, eBay, Etsy, Microsoft Advertising, LinkedIn Ads, YouTube Ads and display remarketing.',address:{'@type':'PostalAddress',streetAddress:business.street,addressLocality:business.city,addressRegion:business.region,addressCountry:business.country},areaServed:served,founder:{'@id':personId},contactPoint:{'@type':'ContactPoint',telephone:business.phoneIntl,contactType:'sales',areaServed:'PK',availableLanguage:['English','Urdu']},knowsAbout:['Pay per click advertising','PPC management','Google Ads','Meta Ads','Facebook Ads','Instagram Ads','TikTok Ads','Amazon PPC','eBay Promoted Listings','Etsy Ads','Microsoft Advertising','LinkedIn Ads','YouTube Ads','Display advertising','Remarketing','Conversion tracking','Performance marketing','Search engine marketing']},
  {'@type':'Person','@id':personId,name:business.founder,jobTitle:'PPC Expert and Founder of MrPPC.pk',worksFor:{'@id':orgId},url:`${siteUrl}/about/`,telephone:business.phoneIntl,address:{'@type':'PostalAddress',addressLocality:business.city,addressRegion:business.region,addressCountry:business.country},knowsAbout:['PPC management','Google Ads','Meta Ads','Amazon PPC','Performance marketing','Search engine marketing']},
  {'@type':'WebSite','@id':`${siteUrl}/#website`,url:`${siteUrl}/`,name:business.name,publisher:{'@id':orgId},inLanguage:'en-PK'}
]}}
export function faqSchema(items){return {'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:clean(a)}}))}}
export function breadcrumbSchema(trail){return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:trail.map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:`${siteUrl}${path}`}))}}
export function serviceSchema({name,description,path,serviceType}){return {'@context':'https://schema.org','@type':'Service',name,serviceType:serviceType||name,description,url:`${siteUrl}${path}`,provider:{'@id':orgId},areaServed:served,dateModified:business.updatedIso}}
export function JsonLd({data}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>}
