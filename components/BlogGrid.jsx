'use client';
import {useState} from 'react';

// Category filter for the blog index. Cards are rendered on the server and passed in as children with data-cat.
export default function BlogGrid({categories,children}){const [cat,setCat]=useState('All');
  return <><div className="blog-filter" role="group" aria-label="Filter articles by topic">{['All',...categories].map(c=><button key={c} type="button" aria-pressed={cat===c} onClick={()=>setCat(c)}>{c}</button>)}</div>
  <div className="blog-grid" data-filter={cat}>{children}</div>
  <style>{cat==='All'?'':`.blog-grid[data-filter] > [data-cat]:not([data-cat="${cat.replace(/"/g,'')}"]){display:none}`}</style></>}
