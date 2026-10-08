'use client';
import {useSearchParams} from 'next/navigation';
import BriefForm from './BriefForm';
import {services} from '@/lib/services';
export default function ContactBrief(){const params=useSearchParams();const requested=params.get('platform');const platform=services.some(s=>s.name===requested)?requested:'Help me choose';return <BriefForm key={platform} platform={platform}/>}
