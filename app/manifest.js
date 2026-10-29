export const dynamic='force-static';
export default function manifest(){return {
  id:'/',
  name:'MrPPC.pk | PPC Expert Syed Mudassir Shah',
  short_name:'MrPPC',
  description:'PPC expert Syed Mudassir Shah. Google, Meta, TikTok, Amazon and more. Call or WhatsApp 0343 5853835 for a free audit.',
  start_url:'/?source=app',
  scope:'/',
  display:'standalone',
  display_override:['standalone','minimal-ui'],
  orientation:'portrait',
  background_color:'#061321',
  theme_color:'#061321',
  lang:'en-PK',
  dir:'ltr',
  categories:['business','productivity'],
  icons:[
    {src:'/icons/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},
    {src:'/icons/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'},
    {src:'/icons/maskable-192.png',sizes:'192x192',type:'image/png',purpose:'maskable'},
    {src:'/icons/maskable-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'}
  ],
  shortcuts:[
    {name:'Free PPC audit',short_name:'Free audit',url:'/contact/?source=app',icons:[{src:'/icons/icon-192.png',sizes:'192x192'}]},
    {name:'PPC services',short_name:'Services',url:'/services/?source=app',icons:[{src:'/icons/icon-192.png',sizes:'192x192'}]},
    {name:'PPC guides',short_name:'Blog',url:'/blog/?source=app',icons:[{src:'/icons/icon-192.png',sizes:'192x192'}]}
  ]
}}
