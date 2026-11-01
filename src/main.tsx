
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Menu, X, Heart, MapPin, Music2, Pause, Play, Sparkles, CalendarDays, Users, Camera, Gift, Clock, CheckCircle2 } from 'lucide-react'
import './styles.css'

type EventItem = {name:string; date:string; time?:string; venue?:string; description:string; icon:string; outfit:string; bride:string}
const CONFIG = {
  couple: { groom:'Sanjeev Kumar', bride:'Lovely Kumari' },
  weddingISO: '2026-11-22T18:00:00+05:30',
  weddingDateText: '22 November 2026',
  venue: '[KHAGARIA]',
  address: '[khagaria, mathurapur, ward no.- 06], Bihar, India',
  mapQuery: 'GF54+M98, Khagaria, Bihar 851204',
  rsvpContact: '[8102027722]',
  musicUrl: '/audio/wedding-song-from-15s.mp3',
  story: [
    ['How We Met ❤️','Two families came together, introductions were made, and a beautiful new chapter began. Replace this text with your real story.'],
    ['Our First Conversation 💬','Our first conversation was the beginning of getting to know each other with the blessings of our families.'],
    ['The Beginning 🌸','With every conversation, understanding grew and two families came closer.'],
    ['The Proposal 💍','A heartfelt promise was made to walk together through every season of life.'],
    ['And Now... Our Wedding 💒','With the blessings of our parents and loved ones, we are ready for our wedding day.']
  ],
  events: [
    {name:'Mehendi',date:'19 November 2026',description:'A traditional family celebration marking the beginning of the wedding festivities and blessings from loved ones.',icon:'🌺',outfit:'Cream Indo-western',bride:'Pastel lehenga'},
    {name:'Matkor',date:'20 November 2026',description:'Traditional Matkor ceremony with family songs, flowers, मिट्टी की रस्म and blessings.',icon:'🌿',outfit:'Green / cream kurta',bride:'Mehendi green lehenga'},
    {name:'Haldi',date:'21 November 2026',description:'A bright yellow celebration of laughter, haldi and joyful family moments.',icon:'💛',outfit:'Yellow / cream kurta',bride:'Yellow lehenga'},
    {name:'Wedding',date:'22 November 2026',description:'The main wedding ceremony — two hearts, one forever.',icon:'💍',outfit:'Royal sherwani + safa',bride:'Maroon bridal lehenga'},
    {name:'Reception',date:'23 November 2026',description:'Dinner, photographs, music and a warm celebration with everyone we love.',icon:'✨',outfit:'Formal ethnic',bride:'Reception lehenga'}
  ] as EventItem[]
}

const navItems = [['Home','home'],['Our Story','story'],['Events','events'],['Gallery','gallery'],['RSVP','rsvp'],['Location','location']]
const gallery = ['/sanjeev-kumar.jpeg','/lavely-kumari.jpeg','/sanjeev-kumar.jpeg','/lavely-kumari.jpeg']

function App(){
  const [menu,setMenu]=useState(false), [scrolled,setScrolled]=useState(false)
  const [selected,setSelected]=useState(3), [lightbox,setLightbox]=useState<string|null>(null)
  const [rsvp,setRsvp]=useState({name:'',email:'',phone:'',guests:'1',attend:'yes',message:''})
  const [rsvpDone,setRsvpDone]=useState(false), [error,setError]=useState('')
  const [time,setTime]=useState({d:0,h:0,m:0,s:0,done:false})
  const [music,setMusic]=useState(false), audioRef=useRef<HTMLAudioElement|null>(null)

  useEffect(()=>{ const on=()=>setScrolled(scrollY>30); addEventListener('scroll',on); return()=>removeEventListener('scroll',on)},[])
  useEffect(()=>{ const tick=()=>{const diff=Math.max(0,new Date(CONFIG.weddingISO).getTime()-Date.now()); setTime({d:Math.floor(diff/86400000),h:Math.floor(diff/3600000)%24,m:Math.floor(diff/60000)%60,s:Math.floor(diff/1000)%60,done:diff<=0})}; tick(); const id=setInterval(tick,1000); return()=>clearInterval(id)},[])
  useEffect(()=>{
    if(!CONFIG.musicUrl) return
    const a=new Audio(CONFIG.musicUrl)
    a.loop=true
    a.preload='auto'
    audioRef.current=a
    const start=()=>{ a.play().then(()=>setMusic(true)).catch(()=>{}) }
    // Try autoplay. Modern browsers may block sound until the visitor interacts.
    start()
    const events=['pointerdown','touchstart','keydown','click'] as const
    events.forEach(ev=>window.addEventListener(ev,start,{once:true,passive:true}))
    return()=>{ a.pause(); events.forEach(ev=>window.removeEventListener(ev,start)) }
  },[])
  const toggleMusic=()=>{ const a=audioRef.current; if(!a)return; if(music){a.pause();setMusic(false)}else{a.play().then(()=>setMusic(true)).catch(()=>{})} }
  const submit=(e:React.FormEvent)=>{e.preventDefault();setError(''); if(!rsvp.name.trim()||!rsvp.email.includes('@')||!rsvp.phone.trim()){setError('Please enter your name, valid email and phone number.');return} localStorage.setItem('sanjeev-lavely-rsvp',JSON.stringify({...rsvp,submittedAt:new Date().toISOString()}));setRsvpDone(true)}
  return <div className="app">
    <nav className={'nav '+(scrolled?'scrolled':'')}><div className="container nav-inner">
      <a className="brand" href="#home">Sanjeev <span className="gold">♥</span> Lovely</a>
      <div className="nav-links">{navItems.map(([t,id])=><a key={id} href={'#'+id}>{t}</a>)}</div>
      <button className="menu" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button>
    </div><div className={'mobile-menu '+(menu?'open':'')}>{navItems.map(([t,id])=><a onClick={()=>setMenu(false)} key={id} href={'#'+id}>{t}</a>)}</div></nav>

    <section id="home" className="hero hero-photo">
      <div className="heart" style={{left:'8%',top:'25%'}}>♥</div><div className="heart" style={{right:'9%',top:'20%',animationDelay:'-2s'}}>♡</div>
      <div className="spark" style={{left:'18%',top:'18%'}}/><div className="spark" style={{right:'22%',top:'30%',animationDelay:'-1s'}}/>
      <div className="hero-photo-overlay" aria-hidden="true"/>
      <div className="container hero-grid hero-content">
        
        <div className="hero-copy reveal">
          <span className="pill">💌 A DIGITAL WEDDING INVITATION</span>
          <div className="kicker" style={{marginTop:18}}>Together with their families</div>
          <h1>{CONFIG.couple.groom} <span>♥</span> {CONFIG.couple.bride}</h1>
          <p>Two families, one beautiful introduction, and a lifetime waiting to begin.</p>
          <p><b>Invite you to celebrate their wedding</b><br/><span className="gold">22 November 2026</span></p>
          <div className="hero-actions"><a className="btn btn-primary" href="#story">💌 Open Invitation</a><a className="btn btn-soft" href="#events"><CalendarDays size={17}/> Wedding Events</a></div>
          <div className="ornament"/>
          <div className="kicker">Save the date · 22.11.2026</div>
        </div>
        
      </div>
    </section>

    <section id="story" className="section story"><div className="container">
      <div className="kicker" style={{textAlign:'center'}}>Our story</div><h2 className="section-title">From a moment to forever</h2><p className="section-sub">A few little chapters from a love story that is still being written.</p>
      <div className="timeline">{CONFIG.story.map(([title,text],i)=><div className="timeline-item" key={title}><div className="story-card"><span className="kicker">Chapter {i+1}</span><h3 style={{fontFamily:'var(--head)',fontSize:'1.8rem',margin:'7px 0'}}>{title}</h3><p style={{lineHeight:1.7,color:'#735e65'}}>{text}</p></div><span className="story-dot"/></div>)}</div>
    </div></section>

    <section id="events" className="section events"><div className="container">
      <div className="kicker" style={{textAlign:'center'}}>Celebration calendar</div><h2 className="section-title">Our Wedding Moments</h2><p className="section-sub">Tap an event to change the couple's wedding look. Dates below are arranged around the 22 November wedding and can be edited in one place.</p>
      <div className="tabs">{CONFIG.events.map((e,i)=><button key={e.name} className={'tab '+(selected===i?'active':'')} onClick={()=>setSelected(i)}>{e.icon} {e.name}</button>)}</div>
      <div className="couple-stage">
        <div className="character"><img className="mini-photo" src="/sanjeev-kumar.jpeg" alt="Sanjeev"/><div className="character-emoji">{selected===0?'🤵🏻':selected===1?'👳🏻':selected===2?'🧑🏻‍🎤':'👑'}</div><div className="kicker">Sanjeev</div><div className="outfit">{CONFIG.events[selected].outfit}</div><p>{CONFIG.events[selected].description}</p></div>
        <div className="character"><img className="mini-photo" src="/lavely-kumari.jpeg" alt="Lavely"/><div className="character-emoji">{selected===0?'👰🏻‍♀️':selected===1?'🌼':selected===2?'💚':'👸🏻'}</div><div className="kicker">Lavely</div><div className="outfit">{CONFIG.events[selected].bride}</div><p>{CONFIG.events[selected].description}</p></div>
      </div>
      <div className="event-grid">{CONFIG.events.map(e=><article className="event-card" key={e.name}><div className="event-icon">{e.icon}</div><h3>{e.name}</h3><p><b>{e.date}</b><br/>{e.time || 'Time to be announced'}<br/>{e.venue || CONFIG.venue}</p><p>{e.description}</p></article>)}</div>
    </div></section>

    <section className="section date-reveal"><div className="container">
      <div className="kicker" style={{textAlign:'center',color:'#f5d48c'}}>A special surprise</div><h2 className="section-title">✨ Scratch to reveal ✨</h2><p className="section-sub" style={{color:'#efd9df'}}>Scratch the card to reveal our wedding date!</p>
      <ScratchCard/>
      <div className="reveal-badge">Use your finger on mobile or your mouse on desktop · <b>Scratch Me ❤️</b></div>
    </div></section>

    <section className="section"><div className="container"><div className="kicker" style={{textAlign:'center'}}>The countdown</div><h2 className="section-title">Counting Down to Our Big Day ❤️</h2>
      {time.done?<p style={{textAlign:'center',fontFamily:'var(--head)',fontSize:'3rem',color:'var(--accent)'}}>Today is the Day! ❤️</p>:<div className="countdown">{[['d','Days'],['h','Hours'],['m','Minutes'],['s','Seconds']].map(([k,l])=><div className="timebox" key={k}><strong>{String((time as any)[k]).padStart(2,'0')}</strong><span>{l}</span></div>)}</div>}
    </div></section>

    <section id="gallery" className="section story"><div className="container"><div className="kicker" style={{textAlign:'center'}}>Memories</div><h2 className="section-title">A little photo corner</h2><p className="section-sub">Your uploaded couple portraits are already placed here. Replace or add more images in <b>public/</b>.</p><div className="gallery">{gallery.map((src,i)=><img key={i} src={src} alt="Wedding memory" onClick={()=>setLightbox(src)}/>)}</div></div></section>

    <section id="rsvp" className="section"><div className="container"><div className="kicker" style={{textAlign:'center'}}>Be our guest</div><h2 className="section-title">Will You Join Us? ❤️</h2><p className="section-sub">Your presence is the most precious gift. Please let us know.</p>
      <div className="rsvp-wrap"><div className="rsvp-note"><Heart size={34} className="gold"/><h3 style={{fontFamily:'var(--head)',fontSize:'2.4rem',color:'#4a202a'}}>We'd love to celebrate with you</h3><p style={{lineHeight:1.8,color:'#725b63'}}>RSVP details are saved in this browser for the demo. For a real production RSVP database, connect this form to Supabase, Firebase, MongoDB or your preferred backend.</p><p><b>RSVP contact:</b><br/>{CONFIG.rsvpContact}</p></div>
      <form className="form" onSubmit={submit}><div className="form-grid">
        <div className="field"><label>Full Name *</label><input value={rsvp.name} onChange={e=>setRsvp({...rsvp,name:e.target.value})} placeholder="Your name"/></div>
        <div className="field"><label>Email *</label><input type="email" value={rsvp.email} onChange={e=>setRsvp({...rsvp,email:e.target.value})} placeholder="you@example.com"/></div>
        <div className="field"><label>Phone *</label><input value={rsvp.phone} onChange={e=>setRsvp({...rsvp,phone:e.target.value})} placeholder="+91"/></div>
        <div className="field"><label>Number of Guests</label><select value={rsvp.guests} onChange={e=>setRsvp({...rsvp,guests:e.target.value})}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></div>
        <div className="field full"><label>Will you attend?</label><div className="radio-row"><label className="radio"><input type="radio" checked={rsvp.attend==='yes'} onChange={()=>setRsvp({...rsvp,attend:'yes'})}/> Yes, I'll be there ❤️</label><label className="radio"><input type="radio" checked={rsvp.attend==='no'} onChange={()=>setRsvp({...rsvp,attend:'no'})}/> Sorry, I can't attend</label></div></div>
        <div className="field full"><label>Optional message</label><textarea rows={4} value={rsvp.message} onChange={e=>setRsvp({...rsvp,message:e.target.value})} placeholder="A little note for the couple..."/></div>
      </div>{error&&<div className="error" style={{marginTop:12}}>{error}</div>}{rsvpDone&&<div className="success"><CheckCircle2 size={17} style={{verticalAlign:'middle'}}/> Thank you! We can't wait to celebrate with you. ❤️</div>}<button className="btn btn-primary" style={{marginTop:18}}>Confirm RSVP</button></form></div>
    </div></section>

    <section id="location" className="section events"><div className="container"><div className="kicker" style={{textAlign:'center'}}>Find us</div><h2 className="section-title">📍 Where the celebration happens</h2><div className="location-grid"><div className="rsvp-note"><MapPin size={34} className="gold"/><h3 style={{fontFamily:'var(--head)',fontSize:'2.5rem',margin:'10px 0'}}>Wedding Venue</h3><p style={{lineHeight:1.9,color:'#725b63'}}><b>{CONFIG.venue}</b><br/>{CONFIG.address}<br/><br/><b>22 November 2026</b><br/>[ADD TIME]</p><a className="btn btn-primary" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(CONFIG.mapQuery)} target="_blank" rel="noopener noreferrer">📍 Get Directions</a></div><div className="map-wrap"><iframe title="Wedding location map" src={'https://www.openstreetmap.org/export/embed.html?search='+encodeURIComponent(CONFIG.mapQuery)} loading="lazy"/></div></div></div></section>

    <footer className="footer"><div className="container"><div className="kicker" style={{color:'#f0cf87'}}>Forever starts here</div><h2>With Love, Sanjeev Kumar & Lovely Kumari ❤️</h2><p>Thank you for being a part of our special journey.</p><div style={{marginTop:18}}>🌸 ✨ 💍 ✨ 🌸</div></div></footer>
    <div className="music"><button onClick={toggleMusic} aria-label="Wedding music">{music?<Pause/>:<Music2/>}</button><div className="music-note">{music?'Wedding music playing':'Tap to play wedding music'}</div></div>
    {lightbox&&<div className="lightbox" onClick={()=>setLightbox(null)}><button className="close" onClick={()=>setLightbox(null)}><X/></button><img src={lightbox} alt="Wedding memory enlarged"/></div>}
  </div>
}

function ScratchCard(){
  const ref=useRef<HTMLCanvasElement|null>(null), [revealed,setRevealed]=useState(false), [started,setStarted]=useState(false)
  useEffect(()=>{const c=ref.current;if(!c)return; const dpr=Math.min(2,devicePixelRatio||1); const rect=c.getBoundingClientRect(); c.width=rect.width*dpr;c.height=rect.height*dpr; const ctx=c.getContext('2d')!;ctx.scale(dpr,dpr);const g=ctx.createLinearGradient(0,0,rect.width,rect.height);g.addColorStop(0,'#c99a4a');g.addColorStop(.5,'#f1d38d');g.addColorStop(1,'#b98232');ctx.fillStyle=g;ctx.fillRect(0,0,rect.width,rect.height);ctx.fillStyle='#fff2c7';ctx.font='700 24px Poppins';ctx.textAlign='center';ctx.fillText('SCRATCH ME ❤️',rect.width/2,rect.height/2+8);ctx.globalCompositeOperation='destination-out'
  const scratch=(x:number,y:number)=>{ctx.beginPath();ctx.arc(x,y,28,0,Math.PI*2);ctx.fill();setStarted(true)}
  const point=(e:PointerEvent)=>{const r=c.getBoundingClientRect();scratch(e.clientX-r.left,e.clientY-r.top);const data=ctx.getImageData(0,0,c.width,c.height).data;let clear=0;for(let i=3;i<data.length;i+=4)if(data[i]===0)clear++;if(clear/(data.length/4)>.48){setRevealed(true);c.style.pointerEvents='none';confetti()}}
  c.onpointermove=(e)=>{if(e.buttons)point(e)}; c.onpointerdown=(e)=>point(e)
  const resize=()=>location.reload(); addEventListener('resize',resize); return()=>removeEventListener('resize',resize)
  },[])
  return <div className="scratch-wrap"><div className="scratch-card"><div className="scratch-under"><div><div style={{fontSize:'2.3rem'}}>💍</div><h3>Our Wedding Day</h3><strong>22 November 2026</strong><div style={{marginTop:10}}>Save the Date ❤️</div></div></div><canvas ref={ref} className="scratch-canvas" aria-label="Scratch card"/></div>{revealed&&<div className="reveal-badge">✨ Date revealed! Let the celebrations begin. ✨</div>}{!started&&<div className="reveal-badge">Scratch the golden layer with your finger or mouse.</div>}</div>
}
function confetti(){for(let i=0;i<45;i++){const s=document.createElement('span');s.className='confetti';s.textContent=['♥','✦','•','🌸'][i%4];s.style.left='50%';s.style.top='42%';s.style.setProperty('--x',`${(Math.random()-.5)*620}px`);s.style.setProperty('--y',`${(Math.random()-.8)*560}px`);document.body.appendChild(s);setTimeout(()=>s.remove(),1700)}}

const THEME_HERO = 'A royal beginning to a forever story'
createRoot(document.getElementById('root')!).render(<App/>)
