import './globals.css';
import './seo.css';
import './scenes.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import {siteUrl} from '@/lib/services';
import {JsonLd,businessSchema} from '@/lib/schema';
export const metadata={metadataBase:new URL(siteUrl),title:{default:'MrPPC.pk | PPC Expert in Islamabad',template:'%s | MrPPC.pk'},description:'PPC expert Syed Mudassir Shah manages Google Ads, Meta, TikTok, Amazon, eBay, Etsy, Microsoft, LinkedIn and YouTube ads. Based in Scheme 3, Rawalpindi. Call 0343 5853835.',icons:{icon:'/favicon.svg'},openGraph:{siteName:'MrPPC.pk',type:'website',locale:'en_PK'},twitter:{card:'summary'}};
export default function RootLayout({children}){return <html lang="en-PK"><body><JsonLd data={businessSchema()}/><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/><Reveal/></body></html>}
