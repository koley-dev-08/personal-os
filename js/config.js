


/* ================================================================
   EDIT ME #2 — ALL YOUR CONTENT LIVES HERE.
   Change this one object and the whole OS updates itself.
   ================================================================ */
const CONFIG = {
  name: "Alex Rivera",
  initials: "AR",
  handle: "@alex.codes",
  tagline: "Full-stack developer who turns 2am ideas into working prototypes.",
  location: "Based in — set your city",
  bio: [
    "I'm a software developer who likes building things that feel a little alive — interfaces with personality, tools that save people time, and the occasional pointless-but-fun side project.",
    "This whole OS is one of them. Poke around, open the terminal, and don't be afraid to click things twice."
  ],
  skills: ["JavaScript","React","Node.js","Python","UI/UX Design","SQL","Figma","Coffee-fueled debugging"],
  funFacts: [
    "Built my first website at 14 — it had a MIDI file that auto-played. No regrets.",
    "Currently learning: [ your current thing ]",
    "Can solve a Rubik's cube in under 2 minutes.",
    "Will talk about [ your hobby ] for way too long if you let me."
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
  "ALEX_ARCHIVE v1.0.0 opening...",
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
  printTerm(`<span class="prompt">alex@os</span><span class="muted">:~$</span> ${trimmed}`);
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
