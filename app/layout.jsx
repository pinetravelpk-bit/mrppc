import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import {siteUrl} from '@/lib/services';
export const metadata={metadataBase:new URL(siteUrl),title:{default:'MrPPC.pk | PPC Expert in Islamabad',template:'%s | MrPPC.pk'},description:'PPC services in Islamabad led by Syed Mudassir Shah with 15 years of experience. Search, social and marketplace advertising.',icons:{icon:'/favicon.svg'},openGraph:{siteName:'MrPPC.pk',type:'website',locale:'en_PK'},twitter:{card:'summary'}};
export default function RootLayout({children}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/><Reveal/></body></html>}
