


/* ================================================================
   EDIT ME #2 — ALL YOUR CONTENT LIVES HERE.
   Change this one object and the whole OS updates itself.
   ================================================================ */
const CONFIG = {
  name: "Reshav Koley",
  initials: "RK",
  handle: "@reshav.codes",
  tagline: "Full-stack developer who turns ideas into working prototypes.",
  location: "Based in — India",
  bio: [
    "I'm a software developer who likes building things that feel a little alive — interfaces with personality, tools that save people time, and the occasional pointless-but-fun side project.",
    "This whole OS is one of them. Poke around, open the terminal, and don't be afraid to click things twice."
  ],
  skills: ["JavaScript","React","Node.js","Python","UI/UX Design","SQL","Figma","Coffee-fueled debugging"],
  funFacts: [
    "Built my first website at 14 — it had a MIDI file that auto-played. No regrets.",
    "Currently learning: ML",
    "Will talk about esports and cricket for way too long if you let me."
  ],
  resumeUrl: "#",
  projects: [
    { title:"Nimbus — Weather, but pretty", tag:"Web App", year:"2025",
      desc:"A weather dashboard with animated sky scenes that change with real conditions. Built to prove that boring data can look alive.",
      stack:["React","D3.js","OpenWeather API"], link:"#" },
    { title:"Pocket Habit", tag:"Mobile App", year:"2024",
      desc:"A minimalist habit tracker with streaks, gentle nudges, and zero guilt-tripping notifications.",
      stack:["React Native","Firebase"], link:"#" },
    { title:"Deskmate CLI", tag:"Dev Tool", year:"2024",
      desc:"A command-line assistant that scaffolds project folders, git repos, and README files in one command.",
      stack:["Node.js","Commander.js"], link:"#" },
    { title:"Palette Forge", tag:"Design Tool", year:"2023",
      desc:"Generates accessible color palettes from a single hex code, with live contrast-ratio checking.",
      stack:["JavaScript","Canvas API"], link:"#" },
    { title:"This Personal OS", tag:"Experiment", year:"2026",
      desc:"The very site you're using right now — a web-based desktop that introduces me better than a boring resume PDF ever could.",
      stack:["HTML","CSS","JS"], link:"#" }
  ],
  links: [
    { label:"Email", sub:"you@example.com", icon:"✉️", href:"mailto:you@example.com" },
    { label:"GitHub", sub:"github.com/yourname", icon:"🐙", href:"#" },
    { label:"LinkedIn", sub:"linkedin.com/in/yourname", icon:"💼", href:"#" },
    { label:"X / Twitter", sub:"@yourhandle", icon:"🐦", href:"#" }
  ],
  // Weather app: set your home city + coordinates (used for the default view).
  // Find coordinates fast at latlong.net if you don't know them offhand.
  weather: { city:"San Francisco, CA", lat:37.7749, lon:-122.4194 },
  // Life Map app: one entry per place that mattered. lat/lon required for the pin.
  lifeMap: [
    { year:"2001", label:"Where it started", city:"Austin, TX", lat:30.2672, lon:-97.7431, emoji:"👶", desc:"Born and raised — first home." },
    { year:"2015", label:"First line of code", city:"Austin, TX", lat:30.2672, lon:-97.7431, emoji:"💻", desc:"Taught myself to code from library books." },
    { year:"2019", label:"Moved for college", city:"Boston, MA", lat:42.3601, lon:-71.0589, emoji:"🎓", desc:"Studied Computer Science." },
    { year:"2022", label:"First real job", city:"New York, NY", lat:40.7128, lon:-74.0060, emoji:"💼", desc:"Joined my first team as a developer." },
    { year:"2024", label:"Went remote", city:"Lisbon, Portugal", lat:38.7223, lon:-9.1393, emoji:"🌍", desc:"Worked from a new continent for 6 months." },
    { year:"2026", label:"Home base today", city:"San Francisco, CA", lat:37.7749, lon:-122.4194, emoji:"📍", desc:"Currently here — building this OS." }
  ]
};

/* ================================================================
   RENDER CONTENT FROM CONFIG
   ================================================================ */
function renderAbout(){
  const el = document.getElementById('about-body');
  el.innerHTML = `
    <div class="about-grid">
      <div class="avatar">${CONFIG.initials}</div>
      <div class="about-bio">
        <div class="h-eyebrow">// whoami</div>
        <div class="h-title" style="margin-bottom:2px;">${CONFIG.name}</div>
        <div class="pill" style="margin-bottom:14px;">${CONFIG.location}</div>
        ${CONFIG.bio.map(p=>`<p>${p}</p>`).join('')}
        <div class="skills-row">${CONFIG.skills.map(s=>`<span class="pill">${s}</span>`).join('')}</div>
        <ul class="fact-list">${CONFIG.funFacts.map(f=>`<li>${f}</li>`).join('')}</ul>
        <a href="${CONFIG.resumeUrl}" target="_blank"><button class="resume-btn">📄 View résumé</button></a>
      </div>
    </div>`;
}

function renderProjects(){
  const el = document.getElementById('proj-grid');
  el.innerHTML = CONFIG.projects.map(p=>`
    <div class="proj-card" data-tag="${p.tag}">
      <div class="proj-top"><h3>${p.title}</h3><span class="year-tag">${p.year}</span></div>
      <span class="pill">${p.tag}</span>
      <p>${p.desc}</p>
      <div class="proj-stack">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div>
      <a class="proj-link" href="${p.link}" target="_blank">View project →</a>
    </div>`).join('');

  const tags = ["All", ...new Set(CONFIG.projects.map(p=>p.tag))];
  const tabsEl = document.getElementById('proj-tabs');
  tabsEl.innerHTML = tags.map((t,i)=>`<button class="proj-tab${i===0?' active':''}" data-tag="${t}">${t}</button>`).join('');
  tabsEl.querySelectorAll('.proj-tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tabsEl.querySelectorAll('.proj-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag;
      document.querySelectorAll('.proj-card').forEach(card=>{
        card.classList.toggle('hide', tag !== 'All' && card.dataset.tag !== tag);
      });
      beep(500,0.03,'square',0.02);
    });
  });
}

function renderLinks(){
  const el = document.getElementById('link-grid');
  el.innerHTML = CONFIG.links.map(l=>`
    <a class="link-card" href="${l.href}" target="_blank">
      <div class="lg">${l.icon}</div>
      <div><div class="lt">${l.label}</div><div class="ls">${l.sub}</div></div>
    </a>`).join('');
}

document.getElementById('copy-email-btn').addEventListener('click', async (e)=>{
  const mailLink = CONFIG.links.find(l=>l.label==='Email');
  const email = mailLink ? mailLink.href.replace('mailto:','') : '';
  try{
    await navigator.clipboard.writeText(email);
    e.target.textContent = '✓ copied';
    showToast(`Copied ${email} to clipboard`);
  }catch(err){
    e.target.textContent = email;
  }
  setTimeout(()=> e.target.textContent = '⧉ copy email', 1800);
});

renderAbout(); renderProjects(); renderLinks();

/* ================================================================
   SOUND (Web Audio synth beeps — no external files needed)
   ================================================================ */
let audioCtx = null;
let soundOn = false;
function beep(freq=440, dur=0.08, type='sine', vol=0.05){
  if(!soundOn) return;
  try{
    if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.stop(audioCtx.currentTime + dur);
  }catch(e){}
}
document.getElementById('sound-toggle').addEventListener('click', (e)=>{
  soundOn = !soundOn;
  e.currentTarget.textContent = soundOn ? '🔊 SOUND: ON' : '🔈 SOUND: OFF';
  if(soundOn) beep(660,0.09,'triangle',0.06);
});

/* ================================================================
   BOOT SEQUENCE
   ================================================================ */
const bootLines = [
  "RESHAV_ARCHIVE v1.0.0 opening...",
  "Loading personality.dll ...... OK",
  "Mounting /projects .......... OK",
  "Mounting /skills ............ OK",
  "Establishing vibe ........... OK",
  "Starting window manager ..... OK",
  "Welcome."
];
const bootLog = document.getElementById('boot-log');
const bootBar = document.getElementById('boot-bar');
let bootLineIndex = 0;
function typeBootLine(){
  if(bootLineIndex >= bootLines.length){
    setTimeout(()=>{
      document.getElementById('boot').classList.add('hidden');
      beep(880,0.12,'sine',0.07);
      setTimeout(()=>beep(1174,0.14,'sine',0.06),110);
    }, 400);
    return;
  }
  const line = document.createElement('div');
  line.innerHTML = `<span class="dim">[${String(bootLineIndex+1).padStart(2,'0')}]</span> ${bootLines[bootLineIndex]}`;
  bootLog.appendChild(line);
  bootBar.style.width = Math.round(((bootLineIndex+1)/bootLines.length)*100) + '%';
  bootLineIndex++;
  setTimeout(typeBootLine, 260);
}
setTimeout(typeBootLine, 400);

/* ================================================================
   CLOCK
   ================================================================ */
function tickClock(){
  const d = new Date();
  document.getElementById('clock').textContent = d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
tickClock(); setInterval(tickClock, 1000);

/* ================================================================
   WINDOW MANAGER
   ================================================================ */
let zTop = 10;
const windows = {};
document.querySelectorAll('.window').forEach(w=>{ windows[w.dataset.win] = w; });

function haptic(pattern=8){
  if(!('vibrate' in navigator) || !window.matchMedia('(pointer: coarse)').matches) return;
  try{ navigator.vibrate(pattern); }catch(e){}
}
function saveWindowBounds(win){
  if(win.dataset.windowMode) return;
  win.dataset.prevW=win.style.width; win.dataset.prevH=win.style.height; win.dataset.prevT=win.style.top; win.dataset.prevL=win.style.left;
}
function restoreWindow(win){
  if(!win.dataset.windowMode) return false;
  win.style.width=win.dataset.prevW||'600px'; win.style.height=win.dataset.prevH||'460px'; win.style.top=win.dataset.prevT||'60px'; win.style.left=win.dataset.prevL||'60px';
  win.dataset.windowMode=''; win.classList.remove('maximized','snapped'); return true;
}
function windowMaximize(win){
  saveWindowBounds(win); win.style.top='52px'; win.style.left='16px'; win.style.width='calc(100vw - 32px)'; win.style.height='calc(100vh - 142px)';
  win.dataset.windowMode='max'; win.classList.add('maximized'); win.classList.remove('snapped'); if(win.dataset.win==='map') setTimeout(()=>lifeMapInstance&&lifeMapInstance.invalidateSize(),220);
}
function toggleMaximize(win){ if(!restoreWindow(win)) windowMaximize(win); haptic([8,20,8]); }
function snapWindow(win,side){
  saveWindowBounds(win); win.style.top='52px'; win.style.height='calc(100vh - 142px)'; win.style.width='calc(50vw - 24px)'; win.style.left=side==='left'?'16px':'calc(50vw + 8px)';
  win.dataset.windowMode=side; win.classList.add('snapped'); win.classList.remove('maximized'); if(win.dataset.win==='map') setTimeout(()=>lifeMapInstance&&lifeMapInstance.invalidateSize(),220); haptic([8,16,8]);
}
function setSnapGuide(mode=''){ document.body.classList.remove('snap-left','snap-right','snap-max'); if(mode) document.body.classList.add(`snap-${mode}`); }
function focusWindow(win){
  zTop++;
  win.style.zIndex = zTop;
  document.querySelectorAll('.window.focused').forEach(other=>other.classList.remove('focused'));
  win.classList.add('focused');
}
function openApp(name){
  const win = windows[name];
  if(!win) return;
  win.classList.remove('minimized');
  win.classList.add('open');
  focusWindow(win);
  updateDockState();
  beep(520,0.05,'square',0.03);
  haptic(8);
  if(name === 'map'){ setTimeout(initLifeMap, 60); }
  if(name === 'weather' && !weatherLoadedOnce){ weatherLoadedOnce = true; loadWeather(); }
}
function closeApp(win){
  win.classList.remove('open');
  win.classList.remove('focused');
  updateDockState();
  haptic(14);
}
function minApp(win){
  win.classList.add('minimized');
  win.classList.remove('focused');
  updateDockState();
  haptic(10);
}
function updateDockState(){
  document.querySelectorAll('.dock-btn').forEach(btn=>{
    const win = windows[btn.dataset.app];
    btn.classList.toggle('active', win && win.classList.contains('open') && !win.classList.contains('minimized'));
  });
}

document.querySelectorAll('[data-app]').forEach(el=>{
  el.addEventListener('click', ()=> openApp(el.dataset.app));
});

document.querySelectorAll('.window').forEach(win=>{
  win.querySelector('[data-action="close"]').addEventListener('click', ()=>{ beep(300,0.06,'sine',0.03); closeApp(win); });
  win.querySelector('[data-action="min"]').addEventListener('click', ()=>{ beep(380,0.05,'sine',0.03); minApp(win); });
  win.querySelector('[data-action="max"]').addEventListener('click', ()=>toggleMaximize(win));
  win.addEventListener('mousedown', ()=>focusWindow(win));

  // dragging
  const bar = win.querySelector('.win-titlebar');
  let dragging=false, offX=0, offY=0;
  bar.addEventListener('mousedown', (e)=>{
    if(e.target.closest('.traffic')) return;
    restoreWindow(win);
    dragging = true; focusWindow(win);
    offX = e.clientX - win.offsetLeft; offY = e.clientY - win.offsetTop;
  });
  window.addEventListener('mousemove', (e)=>{
    if(!dragging) return;
    win.style.left = Math.max(0, e.clientX - offX) + 'px';
    win.style.top = Math.max(44, e.clientY - offY) + 'px';
    setSnapGuide(e.clientY<76?'max':(e.clientX<40?'left':(e.clientX>window.innerWidth-40?'right':'')));
  });
  window.addEventListener('mouseup', (e)=>{
    if(!dragging) return; const mode=e.clientY<76?'max':(e.clientX<40?'left':(e.clientX>window.innerWidth-40?'right':'')); dragging=false; setSnapGuide(); if(mode==='max') windowMaximize(win); else if(mode) snapWindow(win,mode);
  });
  bar.addEventListener('dblclick', e=>{ if(!e.target.closest('.traffic')) toggleMaximize(win); });

  // touch dragging
  bar.addEventListener('touchstart', (e)=>{
    if(e.target.closest('.traffic')) return;
    restoreWindow(win);
    const t = e.touches[0]; dragging = true; focusWindow(win);
    offX = t.clientX - win.offsetLeft; offY = t.clientY - win.offsetTop;
  }, {passive:true});
  window.addEventListener('touchmove', (e)=>{
    if(!dragging) return; const t = e.touches[0];
    win.style.left = Math.max(0, t.clientX - offX) + 'px';
    win.style.top = Math.max(44, t.clientY - offY) + 'px';
  }, {passive:true});
  window.addEventListener('touchend', ()=>{ if(dragging){dragging=false; haptic(6);} });

  // resizing
  const handle = win.querySelector('.resize-handle');
  if(handle){
    let resizing=false, startW=0, startH=0, startX=0, startY=0;
    handle.addEventListener('mousedown', (e)=>{
      resizing = true; e.stopPropagation();
      startW = win.offsetWidth; startH = win.offsetHeight; startX = e.clientX; startY = e.clientY;
    });
    window.addEventListener('mousemove', (e)=>{
      if(!resizing) return;
      win.style.width = Math.max(320, startW + (e.clientX-startX)) + 'px';
      win.style.height = Math.max(220, startH + (e.clientY-startY)) + 'px';
      if(win.dataset.win === 'map' && lifeMapInstance) lifeMapInstance.invalidateSize();
    });
    window.addEventListener('mouseup', ()=> resizing=false);
  }
});

/* Shortcuts mirror familiar desktop habits without reserving system keys. */
window.addEventListener('keydown', e=>{
  if(!e.altKey || !['ArrowLeft','ArrowRight','ArrowUp'].includes(e.key)) return;
  const active=document.querySelector('.window.focused.open'); if(!active) return;
  e.preventDefault();
  if(e.key==='ArrowUp') toggleMaximize(active); else snapWindow(active,e.key==='ArrowLeft'?'left':'right');
});
document.addEventListener('pointerdown', e=>{
  if(e.target.closest('.dock-btn,.desk-icon,.top-action,.home-search,.wallpaper-swatch,.station-btn,.player-controls button,.proj-tab,.link-card,.map-entry')) haptic(5);
});

/* ================================================================
   TERMINAL
   ================================================================ */
const termLog = document.getElementById('term-log');
const termInput = document.getElementById('term-input');
const termScroll = document.getElementById('term-scroll');
let termHistory = [];
let termHistIdx = -1;

function printTerm(html){
  const line = document.createElement('div');
  line.innerHTML = html;
  termLog.appendChild(line);
  termScroll.scrollTop = termScroll.scrollHeight;
}

const commands = {
  help: ()=> `<span class="accent">Available commands:</span>
  help        show this list
  about       who is ${CONFIG.name}?
  projects    list projects
  contact     show contact links
  weather     open weather.app
  map         open life_map.app
  skills      list skills
  whoami      guess who
  resume      open résumé
  matrix      ...you'll see
  joke        tell a dev joke
  coffee      ☕
  clear       clear the screen
  sudo [x]    try it`,
  about: ()=> `${CONFIG.name} — ${CONFIG.tagline}\n${CONFIG.bio.join(' ')}`,
  projects: ()=> CONFIG.projects.map(p=>`• ${p.title} (${p.year}) — ${p.tag}`).join('\n'),
  contact: ()=> CONFIG.links.map(l=>`${l.label}: ${l.sub}`).join('\n'),
  skills: ()=> CONFIG.skills.join(', '),
  whoami: ()=> `visitor_${Math.floor(Math.random()*9000+1000)} <span class="muted">(probably someone cool)</span>`,
  resume: ()=> { window.open(CONFIG.resumeUrl,'_blank'); return 'Opening résumé...'; },
  coffee: ()=> `<span class="warn">☕ brewing...</span>\n[████████████████████] 100%\nhere you go.`,
  joke: ()=> {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "There are 10 types of people: those who understand binary and those who don't.",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
      "I would tell you a UDP joke, but you might not get it."
    ];
    return jokes[Math.floor(Math.random()*jokes.length)];
  },
  clear: ()=> { termLog.innerHTML=''; return null; },
  matrix: ()=> { startMatrix(); return '<span class="accent">Wake up...</span>'; },
  weather: ()=> { openApp('weather'); return 'Opening weather.app...'; },
  map: ()=> { openApp('map'); return 'Opening life_map.app...'; },
  exit: ()=> { closeApp(windows.terminal); return null; }
};

function runCommand(raw){
  const trimmed = raw.trim();
  if(trimmed === ''){ return; }
  printTerm(`<span class="prompt">reshav@os</span><span class="muted">:~$</span> ${trimmed}`);
  termHistory.push(trimmed); termHistIdx = termHistory.length;

  const [cmd, ...rest] = trimmed.split(' ');
  const lc = cmd.toLowerCase();

  if(lc === 'sudo'){
    printTerm(`<span class="warn">Nice try. Permission denied — this isn't your OS. 😄</span>`);
    beep(200,0.1,'sawtooth',0.03);
    return;
  }
  if(commands[lc]){
    const out = commands[lc](rest.join(' '));
    if(out) printTerm(out.replace(/\n/g,'<br>'));
    beep(700,0.03,'square',0.02);
    return;
  }
  printTerm(`<span class="warn">command not found:</span> ${lc} <span class="muted">— try "help"</span>`);
  beep(180,0.08,'sawtooth',0.03);
}

termInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    runCommand(termInput.value);
    termInput.value = '';
  } else if(e.key === 'ArrowUp'){
    if(termHistIdx > 0){ termHistIdx--; termInput.value = termHistory[termHistIdx] || ''; }
    e.preventDefault();
  } else if(e.key === 'ArrowDown'){
    if(termHistIdx < termHistory.length){ termHistIdx++; termInput.value = termHistory[termHistIdx] || ''; }
    e.preventDefault();
  }
});
document.getElementById('term-scroll').addEventListener('click', ()=> termInput.focus());
printTerm(`<span class="accent">Welcome to ${CONFIG.name}'s terminal.</span> <span class="muted">Type "help" to get started.</span>`);

/* ================================================================
   GUESTBOOK (in-memory only — see note at bottom of chat reply)
   ================================================================ */
let guestEntries = [
  { name:"Jordan", msg:"Whoa, this is such a cool way to show a portfolio! Loved exploring the terminal.", when:"a while ago" },
  { name:"Sam", msg:"The boot animation is such a nice touch. Stealing this idea (with credit, promise).", when:"a while ago" }
];
function renderGuestbook(){
  document.getElementById('gb-list').innerHTML = guestEntries.map(g=>`
    <div class="gb-entry">
      <div class="gb-head"><span>${g.name}</span><span>${g.when}</span></div>
      <p>${g.msg}</p>
    </div>`).join('') + `<div class="gb-note">Note: entries reset on page reload — this demo stores them in memory only. Hook up a backend (or Firebase) to make it permanent.</div>`;
}
renderGuestbook();
document.getElementById('gb-form').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('gb-name').value.trim();
  const msg = document.getElementById('gb-msg').value.trim();
  if(!name || !msg) return;
  guestEntries.unshift({ name, msg, when:"just now" });
  renderGuestbook();
  e.target.reset();
  showToast("Signed! Thanks for stopping by 🖊️");
  beep(880,0.08,'triangle',0.05);
});

/* ================================================================
   CONTACT FORM (demo only — opens a mailto draft)
   ================================================================ */
document.getElementById('msg-form').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('msg-name').value;
  const email = document.getElementById('msg-email').value;
  const text = document.getElementById('msg-text').value;
  const mailLink = CONFIG.links.find(l=>l.label==='Email');
  const to = mailLink ? mailLink.href.replace('mailto:','') : 'you@example.com';
  window.location.href = `mailto:${to}?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(text + '\n\nFrom: ' + email)}`;
  showToast("Opening your email client...");
});

/* ================================================================
   TOAST
   ================================================================ */
let toastTimer;
function showToast(text){
  const t = document.getElementById('toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2400);
}

/* ================================================================
   WEATHER APP — Open-Meteo (free, no API key required)
   Docs: https://open-meteo.com
   ================================================================ */
let weatherLoadedOnce = false;

// WMO weather codes -> emoji + label
const WX_CODES = {
  0:["☀️","Clear sky"], 1:["🌤️","Mostly clear"], 2:["⛅","Partly cloudy"], 3:["☁️","Overcast"],
  45:["🌫️","Fog"], 48:["🌫️","Icy fog"],
  51:["🌦️","Light drizzle"], 53:["🌦️","Drizzle"], 55:["🌧️","Heavy drizzle"],
  61:["🌦️","Light rain"], 63:["🌧️","Rain"], 65:["🌧️","Heavy rain"],
  71:["🌨️","Light snow"], 73:["🌨️","Snow"], 75:["❄️","Heavy snow"],
  80:["🌦️","Rain showers"], 81:["🌧️","Rain showers"], 82:["⛈️","Violent showers"],
  95:["⛈️","Thunderstorm"], 96:["⛈️","Storm + hail"], 99:["⛈️","Severe storm"]
};
function wxLookup(code){ return WX_CODES[code] || ["🌡️","Unknown"]; }
function wxBackground(code){
  if(code === 0 || code === 1) return ["#ffe9b8","#fff6e0"];
  if(code === 2 || code === 3) return ["#dbe4f0","#f2f5fa"];
  if([45,48].includes(code)) return ["#dcdfe4","#eef0f3"];
  if([51,53,55,61,63,65,80,81,82].includes(code)) return ["#c9dbf5","#e9f1ff"];
  if([71,73,75].includes(code)) return ["#e4edf7","#f7fbff"];
  if([95,96,99].includes(code)) return ["#cfd0e6","#e9e9f7"];
  return ["#cfe0ff","#eef4ff"];
}

async function loadWeather(lat, lon, label){
  const useLat = lat ?? CONFIG.weather.lat;
  const useLon = lon ?? CONFIG.weather.lon;
  const useLabel = label ?? CONFIG.weather.city;
  document.getElementById('wx-status').textContent = "Fetching live conditions...";
  document.getElementById('wx-cond').textContent = "Loading...";
  try{
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${useLat}&longitude=${useLon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=5`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('bad response');
    const data = await res.json();
    const [emoji, condLabel] = wxLookup(data.current.weather_code);
    const [bgA, bgB] = wxBackground(data.current.weather_code);

    document.getElementById('wx-emoji').textContent = emoji;
    document.getElementById('wx-temp').textContent = Math.round(data.current.temperature_2m) + '°';
    document.getElementById('wx-cond').textContent = condLabel;
    document.getElementById('wx-loc').textContent = useLabel;
    document.getElementById('wx-feels').textContent = `feels like ${Math.round(data.current.apparent_temperature)}°`;
    document.getElementById('wx-wind').textContent = `wind ${Math.round(data.current.wind_speed_10m)} km/h`;
    document.getElementById('wx-humidity').textContent = `humidity ${data.current.relative_humidity_2m}%`;
    document.getElementById('wx-hero').style.setProperty('--wx-a', bgA);
    document.getElementById('wx-hero').style.setProperty('--wx-b', bgB);
    document.getElementById('wx-status').textContent = `Last updated ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} · Open-Meteo`;

    const days = data.daily.time.slice(1,5);
    const forecastEl = document.getElementById('wx-forecast');
    forecastEl.innerHTML = days.map((d,i)=>{
      const idx = i+1;
      const [dEmoji] = wxLookup(data.daily.weather_code[idx]);
      const dayName = new Date(d + 'T00:00:00').toLocaleDateString([], {weekday:'short'});
      return `<div class="wx-day">
        <div class="wd-name">${dayName}</div>
        <div class="wd-emoji">${dEmoji}</div>
        <div class="wd-range">${Math.round(data.daily.temperature_2m_max[idx])}° <span>${Math.round(data.daily.temperature_2m_min[idx])}°</span></div>
      </div>`;
    }).join('');
  }catch(err){
    document.getElementById('wx-emoji').textContent = "⚠️";
    document.getElementById('wx-cond').textContent = "Couldn't load live weather";
    document.getElementById('wx-status').textContent = "This page needs internet access to reach the Open-Meteo API — try again once it's online, or check your network settings.";
  }
}
document.getElementById('wx-refresh').addEventListener('click', ()=>{ beep(500,0.04,'square',0.03); loadWeather(); });
document.getElementById('wx-mylocation').addEventListener('click', ()=>{
  document.getElementById('wx-status').textContent = "Requesting your location...";
  if(!navigator.geolocation){ showToast("Geolocation isn't supported in this browser"); return; }
  navigator.geolocation.getCurrentPosition(
    (pos)=> loadWeather(pos.coords.latitude, pos.coords.longitude, "Your location"),
    ()=>{ showToast("Location permission denied"); document.getElementById('wx-status').textContent = "Showing weather for the location set in CONFIG.weather"; }
  );
});

/* ================================================================
   LIFE MAP APP — Leaflet + OpenStreetMap (free, no API key required)
   ================================================================ */
let lifeMapInstance = null;
function initLifeMap(){
  if(lifeMapInstance){ lifeMapInstance.invalidateSize(); return; }
  lifeMapInstance = L.map('life-map', { scrollWheelZoom:true, zoomControl:true }).setView([CONFIG.lifeMap[0].lat, CONFIG.lifeMap[0].lon], 3);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution:'&copy; OpenStreetMap &copy; CARTO', maxZoom:18
  }).addTo(lifeMapInstance);

  const markers = [];
  CONFIG.lifeMap.forEach((stop, i)=>{
    const icon = L.divIcon({ className:'', html:'<div class="map-pin"></div>', iconSize:[16,16], iconAnchor:[8,14] });
    const marker = L.marker([stop.lat, stop.lon], { icon }).addTo(lifeMapInstance);
    marker.bindPopup(`<b>${stop.emoji} ${stop.label}</b><br>${stop.city} — ${stop.year}<br>${stop.desc}`);
    markers.push(marker);
  });

  const bounds = L.latLngBounds(CONFIG.lifeMap.map(s=>[s.lat, s.lon]));
  lifeMapInstance.fitBounds(bounds, { padding:[36,36] });

  const sidebar = document.getElementById('map-sidebar');
  sidebar.innerHTML = CONFIG.lifeMap.map((s,i)=>`
    <div class="map-entry" data-i="${i}">
      <div class="me-year">${s.emoji} ${s.year}</div>
      <div class="me-label">${s.label}</div>
      <div class="me-city">${s.city}</div>
    </div>`).join('');
  sidebar.querySelectorAll('.map-entry').forEach(entry=>{
    entry.addEventListener('click', ()=>{
      sidebar.querySelectorAll('.map-entry').forEach(e=>e.classList.remove('active'));
      entry.classList.add('active');
      const i = parseInt(entry.dataset.i, 10);
      const stop = CONFIG.lifeMap[i];
      lifeMapInstance.flyTo([stop.lat, stop.lon], 9, { duration:0.9 });
      markers[i].openPopup();
      beep(500,0.03,'square',0.02);
    });
  });
}

/* ================================================================
   EASTER EGG: KONAMI CODE -> MATRIX RAIN
   ================================================================ */
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiPos = 0;
window.addEventListener('keydown', (e)=>{
  const key = e.key;
  if(key === konami[konamiPos]){ konamiPos++; } else { konamiPos = (key===konami[0])?1:0; }
  if(konamiPos === konami.length){ konamiPos = 0; startMatrix(); showToast("🕶️ Konami code accepted."); }
});

const matrixCanvas = document.getElementById('matrix-canvas');
const mctx = matrixCanvas.getContext('2d');
let matrixInterval = null;
function startMatrix(){
  matrixCanvas.style.display = 'block';
  matrixCanvas.width = window.innerWidth; matrixCanvas.height = window.innerHeight;
  const cols = Math.floor(matrixCanvas.width/16);
  const drops = new Array(cols).fill(1);
  const chars = "アイウエオカキクケコサシスセソ01";
  clearInterval(matrixInterval);
  matrixInterval = setInterval(()=>{
    mctx.fillStyle = 'rgba(0,0,0,0.08)';
    mctx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);
    mctx.fillStyle = '#3dffa0';
    mctx.font = '15px monospace';
    drops.forEach((y,i)=>{
      const ch = chars[Math.floor(Math.random()*chars.length)];
      mctx.fillText(ch, i*16, y*16);
      if(y*16 > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 45);
  setTimeout(stopMatrix, 6000);
}
function stopMatrix(){
  clearInterval(matrixInterval);
  matrixCanvas.style.display = 'none';
  mctx.clearRect(0,0,matrixCanvas.width,matrixCanvas.height);
}
matrixCanvas.addEventListener('click', stopMatrix);

/* ================================================================
   DOCK MAGNIFICATION — macOS-style scale falloff around the cursor
   ================================================================ */
const dockEl = document.getElementById('dock');
const dockBtns = Array.from(document.querySelectorAll('.dock-btn'));
dockEl.addEventListener('mousemove', (e)=>{
  dockBtns.forEach(btn=>{
    const r = btn.getBoundingClientRect();
    const center = r.left + r.width/2;
    const dist = Math.abs(e.clientX - center);
    const maxDist = 110;
    const scale = dist < maxDist ? 1 + (1 - dist/maxDist) * 0.55 : 1;
    const lift = dist < maxDist ? (1 - dist/maxDist) * 10 : 0;
    btn.style.transform = `scale(${scale}) translateY(${-lift}px)`;
  });
});
dockEl.addEventListener('mouseleave', ()=>{
  dockBtns.forEach(btn=> btn.style.transform = 'scale(1)');
});

/* ================================================================
   WALLPAPER PARALLAX — subtle spatial depth on mouse move
   ================================================================ */
const blobs = document.querySelectorAll('.blob');
window.addEventListener('mousemove', (e)=>{
  const nx = (e.clientX / window.innerWidth) - 0.5;
  const ny = (e.clientY / window.innerHeight) - 0.5;
  blobs.forEach((b,i)=>{
    const depth = (i+1) * 14;
    b.style.transform = `translate(${-nx*depth}px, ${-ny*depth}px)`;
  });
});

/* ================================================================
   LUMEN COMMAND LAYER — keyboard-first navigation, system pulse,
   and a small desktop context surface. It delegates to the existing
   window manager instead of creating a second navigation model.
   ================================================================ */
const searchLayer = document.getElementById('search-layer');
const commandInput = document.getElementById('command-input');
const commandResults = document.getElementById('command-results');
const notifyPanel = document.getElementById('notify-panel');
const contextMenu = document.getElementById('context-menu');
const commandItems = [
  {app:'about', icon:'◈', title:'About me', note:'Profile, skills and resume'},
  {app:'projects', icon:'▧', title:'Projects', note:'Selected work and experiments'},
  {app:'contact', icon:'↗', title:'Contact', note:'Links and a direct message'},
  {app:'map', icon:'⌖', title:'Life map', note:'A story told through places'},
  {app:'weather', icon:'◌', title:'Weather', note:'Current conditions and forecast'},
  {app:'terminal', icon:'›_', title:'Terminal', note:'Try help, projects or coffee'},
  {app:'guestbook', icon:'✎', title:'Guestbook', note:'Leave a note behind'}
];
let selectedCommand = 0;
function renderCommandResults(query=''){
  const q = query.trim().toLowerCase();
  const matches = commandItems.filter(item => !q || `${item.title} ${item.note}`.toLowerCase().includes(q));
  selectedCommand = Math.min(selectedCommand, Math.max(0, matches.length - 1));
  commandResults.innerHTML = matches.length ? matches.map((item, i) => `<button class="command-result${i===selectedCommand?' focused':''}" data-app="${item.app}"><span class="command-icon">${item.icon}</span><span><b>${item.title}</b><small>${item.note}</small></span></button>`).join('') : '<div style="padding:18px;color:#9eacce;font:11px var(--font-mono)">NO APPLICATION FOUND</div>';
  commandResults.querySelectorAll('.command-result').forEach(button => button.addEventListener('click', () => { openApp(button.dataset.app); closeSearch(); }));
  return matches;
}
function openSearch(){
  searchLayer.classList.add('open'); searchLayer.setAttribute('aria-hidden','false'); commandInput.value=''; selectedCommand=0; renderCommandResults();
  setTimeout(() => commandInput.focus(), 80);
}
function closeSearch(){ searchLayer.classList.remove('open'); searchLayer.setAttribute('aria-hidden','true'); }
document.getElementById('search-toggle').addEventListener('click', openSearch);
commandInput.addEventListener('input', () => { selectedCommand=0; renderCommandResults(commandInput.value); });
commandInput.addEventListener('keydown', e => {
  const matches = commandItems.filter(item => !commandInput.value.trim() || `${item.title} ${item.note}`.toLowerCase().includes(commandInput.value.trim().toLowerCase()));
  if(e.key === 'ArrowDown'){ e.preventDefault(); selectedCommand = Math.min(selectedCommand + 1, matches.length - 1); renderCommandResults(commandInput.value); }
  if(e.key === 'ArrowUp'){ e.preventDefault(); selectedCommand = Math.max(selectedCommand - 1, 0); renderCommandResults(commandInput.value); }
  if(e.key === 'Enter' && matches[selectedCommand]){ openApp(matches[selectedCommand].app); closeSearch(); }
});
searchLayer.addEventListener('mousedown', e => { if(e.target === searchLayer) closeSearch(); });

document.getElementById('notify-toggle').addEventListener('click', () => notifyPanel.classList.toggle('open'));
document.getElementById('clear-notices').addEventListener('click', () => { document.getElementById('notice-list').innerHTML='<div style="padding:18px 8px;color:#9eacce;font:10px var(--font-mono)">NO NEW SYSTEM EVENTS</div>'; });
function addNotice(title, detail){
  const list = document.getElementById('notice-list');
  if(list.children.length && list.textContent.includes('NO NEW SYSTEM EVENTS')) list.innerHTML='';
  const notice = document.createElement('div'); notice.className='notice'; notice.innerHTML=`<span class="notice-mark">✦</span><div><b>${title}</b><p>${detail}</p></div>`;
  list.prepend(notice);
}
const originalOpenApp = openApp;
openApp = function(name){ originalOpenApp(name); const item = commandItems.find(i => i.app === name); if(item) addNotice(`${item.title} opened`, item.note); };

window.addEventListener('keydown', e => {
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); searchLayer.classList.contains('open') ? closeSearch() : openSearch(); }
  if(e.key === 'Escape'){ closeSearch(); notifyPanel.classList.remove('open'); contextMenu.classList.remove('open'); }
});
document.addEventListener('click', e => { if(!notifyPanel.contains(e.target) && e.target.id !== 'notify-toggle') notifyPanel.classList.remove('open'); if(!contextMenu.contains(e.target)) contextMenu.classList.remove('open'); });
document.getElementById('desktop').addEventListener('contextmenu', e => { if(e.target.closest('.window')) return; e.preventDefault(); contextMenu.style.left=`${Math.min(e.clientX, window.innerWidth-190)}px`; contextMenu.style.top=`${Math.min(e.clientY, window.innerHeight-190)}px`; contextMenu.classList.add('open'); });
contextMenu.addEventListener('click', e => { const action=e.target.dataset.context; if(!action) return; if(action==='search') openSearch(); else if(action==='close') Object.values(windows).forEach(closeApp); else openApp(action); contextMenu.classList.remove('open'); });

/* ================================================================
   HOME DESKTOP — battery, paper selection and an original lo-fi
   generator. Audio is synthesized in-browser; no remote track or
   autoplay is required.
   ================================================================ */
document.getElementById('home-search').addEventListener('click', openSearch);
const batteryPct = document.getElementById('battery-pct');
const batteryFill = document.querySelector('.battery-icon i');
function paintBattery(level, charging=false){
  const pct = Math.round(level * 100); batteryPct.textContent = `${pct}%${charging?' +':''}`;
  batteryFill.style.width = `${Math.max(5,pct)}%`;
  batteryFill.style.background = pct < 20 ? '#aa4535' : (charging ? '#6f9b58' : '#84905b');
}
if(navigator.getBattery){ navigator.getBattery().then(battery => { const refresh=()=>paintBattery(battery.level,battery.charging); refresh(); battery.addEventListener('levelchange',refresh); battery.addEventListener('chargingchange',refresh); }).catch(()=>paintBattery(.86)); } else paintBattery(.86);

const paperButtons = [...document.querySelectorAll('.wallpaper-swatch')];
function setPaper(paper){
  document.body.classList.remove('paper-indigo','paper-moss');
  if(paper !== 'parchment') document.body.classList.add(`paper-${paper}`);
  paperButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.paper===paper));
  try{localStorage.setItem('archive-paper',paper);}catch(e){}
}
paperButtons.forEach(btn=>btn.addEventListener('click',()=>setPaper(btn.dataset.paper)));
try{setPaper(localStorage.getItem('archive-paper') || 'parchment');}catch(e){setPaper('parchment');}

const lofiTracks = [
  {title:'Study Lofi', file:'audio/alex-morgan-study-lofi-music-548638.mp3', notes:[130.81,164.81,196,246.94], bpm:82},
  {title:'Calm Peaceful Chill Hop', file:'audio/fassounds-lofi-study-calm-peaceful-chill-hop-112191.mp3', notes:[146.83,174.61,220,261.63], bpm:72},
  {title:'Sentimental Jazzy Love', file:'audio/sonican-lo-fi-music-loop-sentimental-jazzy-love-473154.mp3', notes:[110,138.59,164.81,220], bpm:76},
  {title:'Mountain Lofi Beats', file:'audio/the_mountain-lofi-beats-567433.mp3', notes:[123.47,146.83,185,220], bpm:68}
];
let lofiCtx=null, lofiMaster=null, lofiNoise=null, lofiTimer=null, lofiStep=0, lofiTrack=0, lofiRunning=false, lofiProgress=8, lofiElapsed=0;
const lofiToggle=document.getElementById('lofi-toggle'), recordDisc=document.getElementById('record-disc'), lofiProgressEl=document.getElementById('lofi-progress'), lofiTime=document.getElementById('lofi-time'), lofiTitle=document.getElementById('lofi-title'), lofiStatus=document.getElementById('lofi-status'), lofiStations=document.getElementById('player-stations');
function renderStations(){
  lofiStations.innerHTML=lofiTracks.map((track,index)=>`<button class="station-btn${index===lofiTrack?' active':''}" data-track="${index}">${String(index+1).padStart(2,'0')}</button>`).join('');
  lofiStations.querySelectorAll('.station-btn').forEach(button=>button.addEventListener('click',()=>chooseLofiTrack(Number(button.dataset.track))));
}
function setupLofiAudio(){
  if(lofiCtx) return true;
  const AudioCtor=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtor){ lofiStatus.textContent='Audio is unavailable in this browser'; return false; }
  try{
    lofiCtx=new AudioCtor(); lofiMaster=lofiCtx.createGain(); lofiMaster.gain.value=.42;
    const warmer=lofiCtx.createBiquadFilter(); warmer.type='lowpass'; warmer.frequency.value=1650;
    const compressor=lofiCtx.createDynamicsCompressor(); compressor.threshold.value=-28; compressor.ratio.value=5;
    lofiMaster.connect(warmer); warmer.connect(compressor); compressor.connect(lofiCtx.destination);
    const buffer=lofiCtx.createBuffer(1,lofiCtx.sampleRate*.18,lofiCtx.sampleRate), data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*(1-i/data.length);
    lofiNoise=buffer; return true;
  }catch(error){ lofiStatus.textContent='Audio could not start - check device sound'; return false; }
}
function lofiTone(freq, when, length, volume, shape='triangle'){
  const osc=lofiCtx.createOscillator(), filter=lofiCtx.createBiquadFilter(), amp=lofiCtx.createGain();
  osc.type=shape; osc.frequency.setValueAtTime(freq,when); filter.type='lowpass'; filter.frequency.value=950;
  amp.gain.setValueAtTime(.0001,when); amp.gain.exponentialRampToValueAtTime(volume,when+.025); amp.gain.exponentialRampToValueAtTime(.0001,when+length);
  osc.connect(filter); filter.connect(amp); amp.connect(lofiMaster); osc.start(when); osc.stop(when+length+.03);
}
function lofiKick(when){
  const osc=lofiCtx.createOscillator(), amp=lofiCtx.createGain(); osc.frequency.setValueAtTime(115,when); osc.frequency.exponentialRampToValueAtTime(48,when+.15);
  amp.gain.setValueAtTime(.14,when); amp.gain.exponentialRampToValueAtTime(.0001,when+.19); osc.connect(amp); amp.connect(lofiMaster); osc.start(when); osc.stop(when+.2);
}
function lofiHat(when){
  const source=lofiCtx.createBufferSource(), filter=lofiCtx.createBiquadFilter(), amp=lofiCtx.createGain(); source.buffer=lofiNoise; filter.type='highpass'; filter.frequency.value=5500;
  amp.gain.setValueAtTime(.018,when); amp.gain.exponentialRampToValueAtTime(.0001,when+.07); source.connect(filter); filter.connect(amp); amp.connect(lofiMaster); source.start(when); source.stop(when+.08);
}
function playLofiStep(){
  if(!lofiRunning || !lofiCtx || lofiCtx.state!=='running') return;
  const track=lofiTracks[lofiTrack], now=lofiCtx.currentTime, beatSeconds=60/track.bpm, root=track.notes[Math.floor(lofiStep/4)%track.notes.length];
  if(lofiStep%4===0){ lofiTone(root,now,beatSeconds*3.6,.08); lofiTone(root*1.25,now,beatSeconds*3.3,.028,'sine'); lofiTone(root*1.5,now,beatSeconds*3,.022,'sine'); lofiKick(now); }
  if(lofiStep%2===0) lofiKick(now); lofiHat(now); if(lofiStep%4===2) lofiHat(now+.055);
  lofiStep++; lofiElapsed+=beatSeconds; lofiProgress=(lofiProgress+2.5)%100; lofiProgressEl.style.width=`${Math.max(8,lofiProgress)}%`;
  const mins=Math.floor(lofiElapsed/60), secs=Math.floor(lofiElapsed%60); lofiTime.textContent=`${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')} / ∞`;
}
function beginLofi(){
  if(!setupLofiAudio()) return;
  lofiCtx.resume().then(()=>{
    lofiRunning=true; lofiToggle.textContent='Ⅱ'; lofiToggle.setAttribute('aria-label','Pause lo-fi music'); recordDisc.classList.add('spinning'); lofiStatus.textContent=`Now playing · Station ${String(lofiTrack+1).padStart(2,'0')} / 04`;
    clearInterval(lofiTimer); playLofiStep(); lofiTimer=setInterval(playLofiStep,(60/lofiTracks[lofiTrack].bpm)*1000);
  }).catch(()=>{lofiStatus.textContent='Playback was blocked - tap Play again';});
}
function pauseLofi(){
  if(!lofiCtx) return; lofiRunning=false; clearInterval(lofiTimer); lofiTimer=null; lofiCtx.suspend(); lofiToggle.textContent='▶'; lofiToggle.setAttribute('aria-label','Play lo-fi music'); recordDisc.classList.remove('spinning'); lofiStatus.textContent=`Paused · Station ${String(lofiTrack+1).padStart(2,'0')} / 04`;
}
function toggleLofi(){ if(lofiRunning) pauseLofi(); else beginLofi(); }
function chooseLofiTrack(index){
  lofiTrack=index; lofiStep=0; lofiElapsed=0; lofiProgress=8; lofiTitle.textContent=lofiTracks[index].title; recordDisc.textContent=String.fromCharCode(65+index); lofiProgressEl.style.width='8%'; lofiTime.textContent='00:00 / ∞'; renderStations();
  if(lofiRunning){ clearInterval(lofiTimer); playLofiStep(); lofiTimer=setInterval(playLofiStep,(60/lofiTracks[lofiTrack].bpm)*1000); lofiStatus.textContent=`Now playing · Station ${String(index+1).padStart(2,'0')} / 04`; }
  else lofiStatus.textContent=`Ready to play · Station ${String(index+1).padStart(2,'0')} / 04`;
}
/* Local MP3 player — each supplied file stays beside this HTML file. */
const lofiAudio=document.getElementById('lofi-audio');
function nativeTime(seconds){
  if(!Number.isFinite(seconds)) return '00:00';
  return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
}
function renderNativeStations(){
  lofiStations.innerHTML=lofiTracks.map((track,index)=>`<button class="station-btn${index===lofiTrack?' active':''}" data-track="${index}" title="${track.title}">${String(index+1).padStart(2,'0')}</button>`).join('');
  lofiStations.querySelectorAll('.station-btn').forEach(button=>button.addEventListener('click',()=>loadLocalTrack(Number(button.dataset.track),true)));
}
function setNativePlaying(playing){
  lofiRunning=playing; lofiToggle.textContent=playing?'Ⅱ':'▶'; lofiToggle.setAttribute('aria-label',playing?'Pause lo-fi music':'Play lo-fi music');
  recordDisc.classList.toggle('spinning',playing); lofiStatus.textContent=playing?`Now playing · Track ${String(lofiTrack+1).padStart(2,'0')} / 04`:`Paused · Track ${String(lofiTrack+1).padStart(2,'0')} / 04`;
}
function loadLocalTrack(index,shouldPlay=false){
  const wasPlaying=shouldPlay||!lofiAudio.paused; lofiTrack=index; const track=lofiTracks[index];
  lofiAudio.src=track.file; lofiAudio.load(); lofiTitle.textContent=track.title; recordDisc.textContent=String.fromCharCode(65+index); lofiProgressEl.style.width='0%'; lofiTime.textContent='00:00 / --:--'; renderNativeStations();
  lofiStatus.textContent=`Loading · Track ${String(index+1).padStart(2,'0')} / 04`;
  if(wasPlaying){ lofiAudio.play().then(()=>setNativePlaying(true)).catch(()=>{lofiStatus.textContent='Could not play this file'; setNativePlaying(false);}); }
  else setNativePlaying(false);
}
function toggleLocalTrack(){
  if(!lofiAudio.src){ loadLocalTrack(lofiTrack,false); }
  if(lofiAudio.paused){ lofiAudio.play().then(()=>setNativePlaying(true)).catch(()=>{lofiStatus.textContent='Playback was blocked - tap Play again';}); }
  else { lofiAudio.pause(); setNativePlaying(false); }
}
lofiAudio.addEventListener('loadedmetadata',()=>{ lofiTime.textContent=`${nativeTime(lofiAudio.currentTime)} / ${nativeTime(lofiAudio.duration)}`; });
lofiAudio.addEventListener('timeupdate',()=>{ const ratio=lofiAudio.duration?lofiAudio.currentTime/lofiAudio.duration:0; lofiProgressEl.style.width=`${Math.max(0,ratio*100)}%`; lofiTime.textContent=`${nativeTime(lofiAudio.currentTime)} / ${nativeTime(lofiAudio.duration)}`; });
lofiAudio.addEventListener('ended',()=>loadLocalTrack((lofiTrack+1)%lofiTracks.length,true));
lofiAudio.addEventListener('error',()=>{ lofiStatus.textContent='Track file missing — keep the audio folder beside this page'; setNativePlaying(false); });
renderNativeStations(); loadLocalTrack(0,false); lofiToggle.addEventListener('click',toggleLocalTrack); document.getElementById('lofi-next').addEventListener('click',()=>loadLocalTrack((lofiTrack+1)%lofiTracks.length,lofiRunning));

/* Open About by default so the OS doesn't look empty on load */
setTimeout(()=>{ openApp('about'); }, 1400);
