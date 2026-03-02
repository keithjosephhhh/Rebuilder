// ═══════════════════════════════════════════════════════
// CONFIG — PASTE YOUR CREDENTIALS HERE (one-time setup)
// ═══════════════════════════════════════════════════════
const HARDCODED_URL = "https://bwuapxgdsfcfwhdxffur.supabase.co";
const HARDCODED_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWFweGdkc2ZjZndoZHhmZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTM1NzQsImV4cCI6MjA4Nzk4OTU3NH0.xRIbqrNAG8-XTUg5cwkb7LuKL6EG4Sw_RHoHLoaUEwc";


const KEITH_PASSWORD = 'hello'; // Change this

// ═══════════════════════════════════════════════════════
// AUTH — with persistent session + cinematic transition
// ═══════════════════════════════════════════════════════
let currentUser = 'guest';

function showPWPrompt() {
  document.getElementById('pwWrap').classList.toggle('show');
  setTimeout(() => document.getElementById('pwInput').focus(), 50);
}

function checkPW() {
  const pw = document.getElementById('pwInput').value;
  if (pw === KEITH_PASSWORD) {
    localStorage.setItem('rebuilder_session', 'keith');
    performLogin('keith');
  } else {
    const err = document.getElementById('pwError');
    err.style.display = 'block';
    document.getElementById('pwInput').value = '';
    document.getElementById('pwInput').classList.add('shake');
    setTimeout(() => document.getElementById('pwInput').classList.remove('shake'), 500);
  }
}

function loginGuest() {
  localStorage.setItem('rebuilder_session', 'guest');
  performLogin('guest');
}

function logOut() {
  localStorage.removeItem('rebuilder_session');
  location.reload();
}

function performLogin(role) {
  currentUser = role;
  const screen = document.getElementById('authScreen');
  const badge  = document.getElementById('userBadge');

  screen.classList.add('logging-in');

  setTimeout(() => {
    screen.classList.add('sweep');
  }, 300);

  setTimeout(() => {
    screen.style.display = 'none';
    screen.classList.remove('logging-in','sweep');
    badge.textContent = role === 'keith' ? '⚡ KEITH' : '👁 GUEST';
    badge.className   = role === 'keith' ? 'user-badge' : 'user-badge guest-badge';
    const lo = document.createElement('button');
    lo.className = 'logout-btn';
    lo.innerHTML = '<span class="logout-icon">⏻</span><span class="logout-text">LOG OUT</span>';
    lo.onclick = logOut;
    document.querySelector('.header-right').appendChild(lo);
    init();
  }, 700);
}

function isKeith() { return currentUser === 'keith'; }

// FIX: unified function name — HTML calls checkPersistedSession()
function checkPersistedSession() {
  const saved = localStorage.getItem('rebuilder_session');
  if (saved === 'keith' || saved === 'guest') {
    currentUser = saved;
    const screen = document.getElementById('authScreen');
    screen.style.display = 'none';
    const badge = document.getElementById('userBadge');
    badge.textContent = saved === 'keith' ? '⚡ KEITH' : '👁 GUEST';
    badge.className   = saved === 'keith' ? 'user-badge' : 'user-badge guest-badge';
    const lo = document.createElement('button');
    lo.className = 'logout-btn';
    lo.innerHTML = '<span class="logout-icon">⏻</span><span class="logout-text">LOG OUT</span>';
    lo.onclick = logOut;
    document.querySelector('.header-right').appendChild(lo);
    init();
    return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
// SUPABASE
// ═══════════════════════════════════════════════════════
const SUPA_URL = HARDCODED_URL;
const SUPA_KEY = HARDCODED_KEY;

async function supaFetch(method, path, body=null) {
  try {
    const headers = {
      'apikey': SUPA_KEY,
      'Authorization': 'Bearer ' + SUPA_KEY,
      'Content-Type': 'application/json',
    };
    if (method === 'POST') headers['Prefer'] = 'return=representation';
    if (method === 'PATCH') headers['Prefer'] = 'return=representation';
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(SUPA_URL + '/rest/v1/' + path, opts);
    if (!res.ok) { console.error('Supabase', method, path, await res.text()); return null; }
    const t = await res.text();
    return t ? JSON.parse(t) : [];
  } catch(e) {
    console.error('Supabase error:', e);
    return null;
  }
}

// FIX: dbInsertRow always posts to rebuilder_logs table (not the type name as table)
async function dbInsertRow(type, data) {
  return await supaFetch('POST', 'rebuilder_logs', { type, data, logged_at: todayKey() });
}

async function dbUpsertDay(type, data) {
  const today = todayKey();
  const existing = await supaFetch('GET', `rebuilder_logs?type=eq.${type}&logged_at=eq.${today}&limit=1`);
  if (existing && existing.length > 0) {
    await supaFetch('PATCH', `rebuilder_logs?type=eq.${type}&logged_at=eq.${today}`, { data });
  } else {
    await supaFetch('POST', 'rebuilder_logs', { type, data, logged_at: today });
  }
}

async function dbFetchRows(type, limit=100) {
  const r = await supaFetch('GET', `rebuilder_logs?type=eq.${type}&order=logged_at.desc&limit=${limit}`);
  return (r || []).map(row => row.data);
}

async function dbUpsertState(key, value) {
  const existing = await supaFetch('GET', `rebuilder_state?key=eq.${encodeURIComponent(key)}&limit=1`);
  if (existing && existing.length > 0) {
    await supaFetch('PATCH', `rebuilder_state?key=eq.${encodeURIComponent(key)}`, { value });
  } else {
    await supaFetch('POST', 'rebuilder_state', { key, value });
  }
}

async function dbGetState(key) {
  const r = await supaFetch('GET', `rebuilder_state?key=eq.${encodeURIComponent(key)}&limit=1`);
  if (r && r.length > 0) return r[0].value;
  return null;
}

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
const CAMPAIGN_START = new Date('2026-03-09');
const CAMPAIGN_END   = new Date('2026-09-01');
const CAMPAIGN_DAYS  = 176;

const LEVELS=[
  {num:1,name:"The Rebuilder",weeks:"1–2"},{num:2,name:"The Grinder",weeks:"3–4"},
  {num:3,name:"The Consistent",weeks:"5–6"},{num:4,name:"The Machine",weeks:"7–8"},
  {num:5,name:"The Athlete",weeks:"9–10"},{num:6,name:"The Scholar",weeks:"11–12"},
  {num:7,name:"The Hybrid",weeks:"13–14"},{num:8,name:"The Optimizer",weeks:"15–16"},
  {num:9,name:"The Performer",weeks:"17–18"},{num:10,name:"The Specialist",weeks:"19–20"},
  {num:11,name:"The Elite",weeks:"21–22"},{num:12,name:"The Champion",weeks:"23–24"},
  {num:13,name:"The Pinnacle",weeks:"25–26"}
];

const WEEKLY_REWARDS=[
  {week:1,icon:"🍕",name:"Cheat Meal — whatever you want",req:"500+ XP Week 1"},
  {week:2,icon:"📚",name:"Buy any book you want",req:"500+ XP Week 2"},
  {week:3,icon:"🎮",name:"3-hour gaming session, guilt-free",req:"500+ XP Week 3"},
  {week:4,icon:"🍿",name:"Movie night + popcorn",req:"500+ XP Week 4"},
  {week:5,icon:"👕",name:"New gym t-shirt",req:"500+ XP Week 5"},
  {week:6,icon:"☕",name:"Favourite café outing",req:"500+ XP Week 6"},
  {week:7,icon:"🎧",name:"New music / podcast subscription",req:"500+ XP Week 7"},
  {week:8,icon:"🍔",name:"Best burger in the city",req:"500+ XP Week 8"},
];
const MONTHLY_REWARDS=[
  {month:1,icon:"👟",name:"New Running Shoes",req:"Level up + train 20+ days this month"},
  {month:2,icon:"💻",name:"Paid ML Course / Textbook",req:"Level up + 5+ ML projects"},
  {month:3,icon:"⌚",name:"Smart Watch / Fitness Band",req:"Level up + 60+ German hrs"},
  {month:4,icon:"🏋️",name:"New Gym Gear",req:"Level up + Squat 100kg hit"},
  {month:5,icon:"🏖",name:"Weekend Day Trip",req:"Level up + German B1 milestone"},
  {month:6,icon:"🎒",name:"Quality Backpack / Tech Accessory",req:"Level up + all streaks 30+ days"},
];
const FINAL_REWARDS=[
  {icon:"✈️",name:"International Trip",req:"Complete campaign + B2 achieved + ML projects live"},
  {icon:"💻",name:"New Laptop / Upgrade",req:"10+ GitHub projects deployed"},
  {icon:"🏋️",name:"Gym Equipment of Choice",req:"Squat 100kg + Deadlift 130kg + 20 pull-ups"},
  {icon:"📖",name:"20-Book Library",req:"Read 12+ books across campaign"},
  {icon:"🎓",name:"Enrol in MSc / Advanced Course",req:"CS229 + CS231N complete + NLP project live"},
];

const GERMAN_SKILLS=['Präsens','Perfekt','Präteritum','Modal Verbs','Nebensätze','Akkusativ & Dativ','Wechselpräpositionen','Reflexive Verbs','Konjunktiv II','Passiv','Relativsätze','Temporal Connectors','Complex Sentences','Konjunktiv I','Nominalisierung','Speaking: Opinion','Writing: Essays','Listening Comprehension'];

let state = {
  totalXP:0, currentLevel:1, streaks:{train:0,ml:0,german:0},
  streakShieldsUsed:0, streakShieldsAvailable:1,
  mlCurrent:{modules:0,lectures:0,lecturesPlanned:21,projects:0,commits:0,dlnlp:0},
  germanTotalHours:0, germanMethodHours:{textbook:0,anki:0,youtube:0,podcast:0,speaking:0,writing:0},
  germanTotalWords:0, germanTotalSpeakingMin:0, germanTotalWritingWords:0,
  germanWeekly:{}, curriculum:{}, germanMilestones:{}, skillMatrix:{},
  dayTypeHistory:{}, habitCounts:{junk:0,scroll:0,sleep:0,game:0,skipger:0,skiptrain:0},
  claimedRewards:[], weeklyXPHistory:{}
};
let xpHistory=[],bodyHistory=[],strengthHistory=[],engineHistory=[],mlHistory=[],germanHistory=[],habitHistory=[];
let selectedST='textbook';
let currentDayType='prime';
let currentCardioType='run5k';
let focusMode=false;
let charts={};
let booksData=[];

const DAILY_VERSES=[
  '"I can do all things through Christ who strengthens me." — Phil 4:13',
  '"Be strong and courageous. Do not be afraid." — Josh 1:9',
  '"Trust in the Lord with all your heart." — Prov 3:5',
  '"Commit your work to the Lord, and your plans will be established." — Prov 16:3',
  '"The Lord is my strength and my shield." — Psalm 28:7',
  '"Let us not grow weary of doing good." — Gal 6:9',
  '"Whatever you do, work heartily, as for the Lord." — Col 3:23',
  '"With God all things are possible." — Matt 19:26',
  '"He gives power to the faint, and to him who has no might He increases strength." — Isa 40:29',
  '"As iron sharpens iron, so one person sharpens another." — Prov 27:17',
  '"For God gave us a spirit not of fear but of power and love and self-control." — 2 Tim 1:7',
  '"Your word is a lamp to my feet and a light to my path." — Psalm 119:105',
  '"The righteous shall live by faith." — Rom 1:17',
  '"Be transformed by the renewal of your mind." — Rom 12:2',
  '"Seek first the kingdom of God and His righteousness." — Matt 6:33',
];

function setDailyVerse(){
  const d=new Date();const idx=(d.getDate()+d.getMonth())%DAILY_VERSES.length;
  const v=document.getElementById('dailyVerse');if(v)v.textContent=DAILY_VERSES[idx];
}

function selectCardioType(el,t){
  document.querySelectorAll('.sess-btn').forEach(b=>b.classList.remove('selected'));
  el.classList.add('selected');currentCardioType=t;
  const allFields=['ef-5k','ef-10k','ef-sprint','ef-sprint-time','ef-duration','ef-distance','ef-calories'];
  allFields.forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none';});
  const show={'run5k':['ef-5k','ef-duration','ef-calories'],'run10k':['ef-10k','ef-duration','ef-calories'],'sprint':['ef-sprint','ef-sprint-time'],'cycling':['ef-duration','ef-distance','ef-calories'],'stairs':['ef-duration','ef-calories'],'jump':['ef-duration','ef-calories'],'walk':['ef-duration','ef-distance'],'swim':['ef-duration','ef-distance','ef-calories']}[t]||[];
  show.forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='';});
}

// ── MEAL TOTALS ──
function updateMealTotals(){
  const get=(id)=>parseFloat(document.getElementById(id)?.value)||0;
  const totCal=get('meal-b-cal')+get('meal-l-cal')+get('meal-d-cal')+get('meal-s-cal');
  const totProt=get('meal-b-prot')+get('meal-l-prot')+get('meal-d-prot')+get('meal-s-prot');
  const totCarb=get('meal-b-carb')+get('meal-l-carb')+get('meal-d-carb')+get('meal-s-carb');
  const totFat=get('meal-b-fat')+get('meal-l-fat')+get('meal-d-fat')+get('meal-s-fat');
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v||'—';};
  set('cal-today',totCal||null);set('prot-today',totProt||null);
  set('carb-today',totCarb||null);set('fat-today',totFat||null);
  set('prot-progress-val',totProt);
  const pb=document.getElementById('protBar');if(pb)pb.style.width=Math.min(100,(totProt/80)*100)+'%';
}

// ── BOOKS ──
let activeSessionBookIdx = -1;

async function addBook() {
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const title = document.getElementById('book-inp-title').value.trim();
  if(!title){notify('Enter a book title','var(--rose)');return;}
  const existing = booksData.findIndex(b=>b.title.toLowerCase()===title.toLowerCase());
  if(existing>=0){notify('Book already in library','var(--amber)');return;}
  const book = {
    id: Date.now().toString(36),
    title,
    author: document.getElementById('book-inp-author').value.trim(),
    cat: document.getElementById('book-inp-cat').value,
    status: document.getElementById('book-inp-status').value,
    page: parseInt(document.getElementById('book-inp-page').value)||0,
    total: parseInt(document.getElementById('book-inp-total').value)||0,
    added: todayKey(),
    sessions: [],
  };
  booksData.push(book);
  await dbUpsertState('booksData', booksData);
  notify('📚 '+title+' added to library!','var(--amber)');
  ['book-inp-title','book-inp-author'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  document.getElementById('book-inp-page').value='';
  document.getElementById('book-inp-total').value='';
  renderBooks();
}

function openBookSession(idx) {
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const book = booksData[idx];
  if(!book) return;
  activeSessionBookIdx = idx;
  document.getElementById('sessionBookTitle').textContent = book.title;
  document.getElementById('sessionCurrentPage').textContent = book.page || 0;
  document.getElementById('sessionTotalPages').textContent = book.total || '?';
  document.getElementById('session-pages').value = '';
  document.getElementById('session-new-page').value = '';
  document.getElementById('session-notes').value = '';
  document.getElementById('session-xp-preview').textContent = '+0 XP';
  const modal = document.getElementById('bookSessionModal');
  modal.style.display = 'flex';
  requestAnimationFrame(()=>modal.classList.add('open'));
  document.getElementById('session-pages').focus();
}

function closeBookSession() {
  const modal = document.getElementById('bookSessionModal');
  modal.classList.remove('open');
  setTimeout(()=>{modal.style.display='none';}, 300);
  activeSessionBookIdx = -1;
}

function updateSessionPreview() {
  if(activeSessionBookIdx < 0) return;
  const book = booksData[activeSessionBookIdx];
  const pages = parseInt(document.getElementById('session-pages').value)||0;
  const newPage = (book.page||0) + pages;
  document.getElementById('session-new-page').value = newPage;
  const xp = Math.floor(pages/20)*5;
  document.getElementById('session-xp-preview').textContent = xp>0 ? '+'+xp+' XP' : pages>0 ? '<20 pages — keep going!' : '+0 XP';
  document.getElementById('session-xp-preview').style.color = xp>0 ? 'var(--emerald)' : 'var(--muted)';
}

async function logBookSession() {
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  if(activeSessionBookIdx < 0) return;
  const pages = parseInt(document.getElementById('session-pages').value)||0;
  if(pages <= 0){notify('Enter pages read','var(--rose)');return;}
  const note  = document.getElementById('session-notes').value.trim();
  const book  = booksData[activeSessionBookIdx];
  const newPage = Math.min((book.page||0) + pages, book.total||99999);
  const session = { date:todayKey(), pagesRead:pages, note, pageAfter:newPage };
  book.page = newPage;
  if(newPage >= (book.total||0) && book.total > 0) book.status = 'done';
  if(!book.sessions) book.sessions = [];
  book.sessions.push(session);
  const xp = Math.floor(pages/20)*5;
  const logEntry = {date:todayKey(), title:book.title, pagesRead:pages, pageAfter:newPage, note, xp};
  await dbInsertRow('book_logs', logEntry);
  await dbUpsertState('booksData', booksData);
  if(xp>0){ notify('📖 +'+xp+' XP · '+pages+' pages read!','var(--amber)'); }
  else { notify('📖 '+pages+' pages logged · '+newPage+'/'+book.total,'var(--amber)'); }
  closeBookSession();
  renderBooks();
}

function renderBooks() {
  const CAT_ICONS = {'self-dev':'💪',bible:'✝️',ml:'🧠',language:'🇩🇪',biography:'👤',fiction:'📗',other:'📘'};
  const total   = booksData.length;
  const done    = booksData.filter(b=>b.status==='done').length;
  const reading = booksData.filter(b=>b.status==='reading').length;
  const set = (id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('books-total',total); set('books-done',done); set('books-reading',reading);

  const ws = getWeekStart();
  let weekPages = 0;
  booksData.forEach(b=>(b.sessions||[]).forEach(s=>{if(s.date>=ws)weekPages+=s.pagesRead||0;}));
  set('pages-this-week', weekPages);
  const wpb = document.getElementById('weekPagesBar');
  if(wpb) wpb.style.width = Math.min(100,(weekPages/200)*100)+'%';

  const catEl = document.getElementById('bookCatBreakdown');
  if(catEl){
    const cats={};booksData.forEach(b=>{cats[b.cat]=(cats[b.cat]||0)+1;});
    catEl.innerHTML = Object.entries(cats).map(([k,v])=>`<div>${CAT_ICONS[k]||'📘'} ${k}: <strong style="color:var(--amber);">${v}</strong></div>`).join('')||'<div>—</div>';
  }

  const listEl = document.getElementById('booksActiveList');
  if(listEl){
    const statusOrder = {reading:0, queued:1, paused:2, done:3};
    const sorted = [...booksData].sort((a,b)=>(statusOrder[a.status]||0)-(statusOrder[b.status]||0));
    if(!sorted.length){
      listEl.innerHTML='<div style="color:var(--muted);font-family:var(--font-mono);font-size:.76rem;padding:20px 0;text-align:center;">No books yet. Add your first book above.</div>';
    } else {
      listEl.innerHTML = sorted.map((b)=>{
        const realIdx = booksData.indexOf(b);
        const pct   = b.total ? Math.round(((b.page||0)/b.total)*100) : 0;
        const scls  = {reading:'book-reading',done:'book-done',queued:'book-paused',paused:'book-paused'}[b.status]||'';
        const lastSession = (b.sessions||[]).slice(-1)[0];
        const totalPages  = (b.sessions||[]).reduce((s,x)=>s+(x.pagesRead||0),0);
        const canLog = b.status==='reading' || b.status==='queued';
        return `<div class="book-shelf-card" data-idx="${realIdx}">
          <div class="bsc-left">
            <div class="bsc-cat">${CAT_ICONS[b.cat]||'📘'}</div>
          </div>
          <div class="bsc-body">
            <div class="bsc-title">${b.title}</div>
            <div class="bsc-meta">${b.author||'Unknown'} · <span class="book-status ${scls}">${(b.status||'').toUpperCase()}</span></div>
            <div class="bsc-bar-row">
              <div class="bar sm" style="flex:1;"><div class="bar-fill" style="width:${pct}%;background:var(--amber);"></div></div>
              <span class="bsc-pct">${b.page||0} / ${b.total||'?'} pages (${pct}%)</span>
            </div>
            ${lastSession&&lastSession.note?`<div class="bsc-note">💡 ${lastSession.note}</div>`:''}
            ${totalPages>0?`<div class="bsc-sessions">${(b.sessions||[]).length} sessions · ${totalPages} total pages read</div>`:''}
          </div>
          <div class="bsc-actions">
            ${canLog?`<button class="btn btn-gold btn-sm" onclick="openBookSession(${realIdx})">LOG SESSION</button>`:''}
            <button class="btn btn-sm" style="border-color:var(--muted);color:var(--muted);font-size:.6rem;" onclick="toggleBookStatus(${realIdx})">${b.status==='done'?'RE-READ':'MARK DONE'}</button>
          </div>
        </div>`;
      }).join('');
    }
  }

  const tbody = document.getElementById('booksHistoryBody');
  if(tbody){
    const sorted2=[...booksData].sort((a,b)=>{const o={reading:0,queued:1,paused:2,done:3};return (o[a.status]||0)-(o[b.status]||0);});
    tbody.innerHTML = sorted2.length ? sorted2.map(b=>{
      const pct = b.total?Math.round(((b.page||0)/b.total)*100):0;
      const scls = {reading:'book-reading',done:'book-done',queued:'book-paused',paused:'book-paused'}[b.status]||'';
      const lastNote = (b.sessions||[]).filter(s=>s.note).slice(-1)[0]?.note||'—';
      return `<tr>
        <td style="font-weight:600;">${b.title}</td>
        <td style="color:var(--muted);">${b.author||'—'}</td>
        <td>${CAT_ICONS[b.cat]||'📘'}</td>
        <td><div style="display:flex;align-items:center;gap:6px;">
          <div class="bar sm" style="width:70px;flex-shrink:0;"><div class="bar-fill" style="width:${pct}%;background:var(--amber);"></div></div>
          <span style="font-family:var(--font-mono);font-size:.66rem;color:var(--muted);">${pct}%</span>
        </div></td>
        <td><span class="book-status ${scls}">${(b.status||'').toUpperCase()}</span></td>
        <td style="color:var(--muted);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${lastNote}</td>
      </tr>`;
    }).join('') : `<tr><td colspan="6" style="color:var(--muted);text-align:center;padding:16px;">No books yet.</td></tr>`;
  }
}

async function toggleBookStatus(idx) {
  if(!isKeith()) return;
  const b = booksData[idx];
  if(!b) return;
  b.status = b.status==='done' ? 'reading' : 'done';
  await dbUpsertState('booksData', booksData);
  notify(b.status==='done'?'✅ Marked complete!':'📖 Back to reading!','var(--amber)');
  renderBooks();
}

// ── UTILS ──
function todayKey(){return new Date().toISOString().split('T')[0];}
function getWeekStart(){const d=new Date(),day=d.getDay(),diff=d.getDate()-day+(day===0?-6:1),m=new Date(d);m.setDate(diff);return m.toISOString().split('T')[0];}
function getWeekLabel(offset=0){const d=new Date();d.setDate(d.getDate()-offset*7);const day=d.getDay(),diff=d.getDate()-day+(day===0?-6:1);const m=new Date(d);m.setDate(diff);return m.toISOString().split('T')[0];}

// ═══════════════════════════════════════════════════════
// LOAD ALL DATA
// ═══════════════════════════════════════════════════════
async function loadAllData() {
  const saved=await dbGetState('main_state');
  if(saved) state={...state,...saved};
  const [xp,body,str,eng,ml,ger,hab]=await Promise.all([
    dbFetchRows('xp_logs',120),dbFetchRows('body_logs',60),dbFetchRows('strength_logs',60),
    dbFetchRows('engine_logs',60),dbFetchRows('ml_logs',60),dbFetchRows('german_logs',100),dbFetchRows('habit_logs',100)
  ]);
  xpHistory=xp;bodyHistory=body;strengthHistory=str;
  engineHistory=eng;mlHistory=ml;germanHistory=ger;habitHistory=hab;
  const c=await dbGetState('curriculum');if(c){state.curriculum=c;applyCurriculum();}
  const gm=await dbGetState('germanMilestones');if(gm){state.germanMilestones=gm;applyGermanMilestones();}
  const sm=await dbGetState('skillMatrix');if(sm){state.skillMatrix=sm;}
  const bd=await dbGetState('booksData');if(bd&&Array.isArray(bd))booksData=bd;
  buildSkillMatrix();
  setDailyVerse();
  checkTwoDayRule();
  restoreTodayState();
  refreshAll();
  buildCharts();
}

async function saveState() {
  await dbUpsertState('main_state',state);
}

// ═══════════════════════════════════════════════════════
// NOTIFY
// ═══════════════════════════════════════════════════════
function notify(msg,color='var(--accent)'){
  const el=document.createElement('div');el.className='notification';el.style.borderColor=color;el.style.color=color;el.innerHTML=msg;
  document.body.appendChild(el);setTimeout(()=>el.remove(),3400);
}

// ═══════════════════════════════════════════════════════
// FOCUS MODE
// ═══════════════════════════════════════════════════════
function toggleFocusMode(){
  focusMode=!focusMode;
  document.body.classList.toggle('focus-mode',focusMode);
  document.getElementById('focusToggle').classList.toggle('active',focusMode);
  notify(focusMode?'🎯 Focus Mode ON — distractions hidden':'Focus Mode OFF','var(--accent2)');
}

// ═══════════════════════════════════════════════════════
// DAY TYPE
// ═══════════════════════════════════════════════════════
function selectDayType(type, el) {
  currentDayType = type;
  ['prime','core','social','recovery'].forEach(t => {
    const btn=document.getElementById('dt-'+t);
    if(btn){btn.className='dt-btn';}
  });
  if(el){el.className='dt-btn active-'+type;}
  document.getElementById('dayTypeDisplay').textContent=type.toUpperCase();
}

// ═══════════════════════════════════════════════════════
// HEALTH CHECKLIST
// ═══════════════════════════════════════════════════════
let hcState={sleep:false,water:false,protein:false,sunlight:false,noalc:false,nojunk:false,journal:false};
function updateHC(key, cb) {
  hcState[key]=cb.checked;
  const item=document.getElementById('hc-'+key);
  if(item)item.classList.toggle('done-hc',cb.checked);
  const score=Object.values(hcState).filter(Boolean).length;
  document.getElementById('hcScore').innerHTML=score+'<span style="font-size:1rem;color:var(--muted);">/7</span>';
  const msgs=['Complete your checklist','Getting started','Building momentum!','Half way there 💪','Looking strong!','Almost perfect!','Almost perfect!','🏆 PERFECT HEALTH DAY!'];
  document.getElementById('hcMsg').textContent=msgs[score]||msgs[7];
}

// ═══════════════════════════════════════════════════════
// TWO DAY RULE
// ═══════════════════════════════════════════════════════
function checkTwoDayRule() {
  if(!xpHistory.length) return;
  const sorted=[...xpHistory].sort((a,b)=>b.date.localeCompare(a.date));
  let trainMiss=0,mlMiss=0,germanMiss=0;
  for(let i=1;i<=3;i++){
    const d=new Date();d.setDate(d.getDate()-i);
    const dow=d.getDay();
    const key=d.toISOString().split('T')[0];
    const e=sorted.find(x=>x.date===key);
    if(dow!==0&&dow!==6){if(!e||(!e.gym&&!e.run)){trainMiss++;}else trainMiss=0;}
    if(dow!==0){if(!e||(!e.deepwork&&!e.impl)){mlMiss++;}else mlMiss=0;}
    if(dow!==0){if(!e||!e.germanStudy){germanMiss++;}else germanMiss=0;}
  }
  const alert=document.getElementById('tdrAlert');
  if(trainMiss>=2||mlMiss>=2||germanMiss>=2){
    alert.style.display='block';
    let msg='⚠ TWO-DAY RULE VIOLATION — ';
    if(trainMiss>=2)msg+='TRAINING ';if(mlMiss>=2)msg+='ML ';if(germanMiss>=2)msg+='GERMAN ';
    msg+='missed 2+ days. Get back on track TODAY.';
    alert.textContent=msg;
  } else {
    alert.style.display='none';
  }
  updateMVSBar();
}

function updateMVSBar() {
  const bar=document.getElementById('mvsBar');
  const today=todayKey();
  const entry=xpHistory.find(e=>e.date===today);
  bar.style.display='flex';
  const items=[
    {id:'mvs-train',done:entry&&(entry.gym||entry.run)},
    {id:'mvs-ml',done:entry&&(entry.deepwork||entry.impl)},
    {id:'mvs-german',done:entry&&entry.germanStudy},
    {id:'mvs-protein',done:entry&&entry.protein},
  ];
  items.forEach(({id,done})=>{const el=document.getElementById(id);if(el){el.className='mvs-item '+(done?'mvs-ok':'mvs-miss');}});
}

// ═══════════════════════════════════════════════════════
// XP
// ═══════════════════════════════════════════════════════
const XP_MAP={'xp-gym':30,'xp-run':30,'xp-mobility':5,'xp-deepwork':30,'xp-impl':10,'xp-german':50,'xp-protein':10,'xp-water':5,'xp-calories':5};
function calcXP(){return Object.keys(XP_MAP).reduce((s,id)=>s+(document.getElementById(id)?.checked?XP_MAP[id]:0),0);}
function updateXP(){
  const xp=calcXP();
  document.getElementById('todayXP').textContent=xp;
  document.getElementById('todayBar').style.width=Math.min(100,xp)+'%';
  document.getElementById('xpStatusMsg').textContent=xp>=100?'🔥 PERFECT DAY!':xp>=70?'⚡ GREAT WORK!':xp>=40?'📈 Keep going!':'Log your activities above';
}
function getWeeklyXP(){const ws=getWeekStart();return xpHistory.filter(e=>e.date>=ws).reduce((s,e)=>s+(e.xp||0),0);}

async function saveDay(){
  if(!isKeith()){notify('👁 Guest view — cannot log data','var(--muted)');return;}
  const today=todayKey(),xp=calcXP(),gHrs=parseFloat(document.getElementById('germanHoursToday').value)||0;
  const hcScore=Object.values(hcState).filter(Boolean).length;
  const entry={date:today,xp,dayType:currentDayType,germanHrs:gHrs,hcScore,
    gym:document.getElementById('xp-gym').checked,run:document.getElementById('xp-run').checked,
    mobility:document.getElementById('xp-mobility').checked,deepwork:document.getElementById('xp-deepwork').checked,
    impl:document.getElementById('xp-impl').checked,germanStudy:document.getElementById('xp-german').checked,
    protein:document.getElementById('xp-protein').checked,water:document.getElementById('xp-water').checked,
    calories:document.getElementById('xp-calories').checked};
  const idx=xpHistory.findIndex(e=>e.date===today);
  if(idx>=0){state.totalXP-=xpHistory[idx].xp;xpHistory[idx]=entry;}else xpHistory.push(entry);
  state.totalXP+=xp;
  if(!state.dayTypeHistory)state.dayTypeHistory={};
  state.dayTypeHistory[today]=currentDayType;
  const ws=getWeekStart();
  if(!state.weeklyXPHistory)state.weeklyXPHistory={};
  state.weeklyXPHistory[ws]=getWeeklyXP();
  updateStreaks();checkLevelUp();
  await dbUpsertDay('xp_logs',entry);await saveState();
  notify('⚡ +'+xp+' XP logged → ☁');
  checkTwoDayRule();refreshAll();updateCharts();
}

function updateStreaks(){
  const sorted=[...xpHistory].sort((a,b)=>b.date.localeCompare(a.date));
  let ts=0,ms=0,gs=0,tBroken=false,mBroken=false,gBroken=false;
  for(let i=0;i<90;i++){
    const d=new Date();d.setDate(d.getDate()-i);
    const dow=d.getDay();
    const key=d.toISOString().split('T')[0];
    const e=sorted.find(x=>x.date===key);
    const isTrainRest=(dow===0||dow===6);
    const isMLRest=(dow===0);
    if(!tBroken){
      if(isTrainRest){}
      else if(e&&(e.gym||e.run))ts++;
      else if(i>0)tBroken=true;
    }
    if(!mBroken){
      if(isMLRest){}
      else if(e&&(e.deepwork||e.impl))ms++;
      else if(i>0)mBroken=true;
    }
    if(!gBroken){
      if(isMLRest){}
      else if(e&&e.germanStudy)gs++;
      else if(i>0)gBroken=true;
    }
    if(tBroken&&mBroken&&gBroken)break;
  }
  state.streaks={train:ts,ml:ms,german:gs};
}

function checkLevelUp(){
  const nl=Math.min(13,Math.max(1,Math.floor(state.totalXP/500)+1));
  if(nl>state.currentLevel){
    state.currentLevel=nl;
    const f=document.createElement('div');f.className='lup-flash';document.body.appendChild(f);setTimeout(()=>f.remove(),1000);
    notify('🏆 LEVEL UP! '+LEVELS[nl-1].name.toUpperCase(),'var(--gold)');
    const now=new Date();const month=now.getFullYear()+'-'+now.getMonth();
    if(state.lastShieldMonth!==month){state.streakShieldsAvailable=1;state.lastShieldMonth=month;}
  }
}

// ═══════════════════════════════════════════════════════
// STREAK SHIELD
// ═══════════════════════════════════════════════════════
function useStreakShield(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  if(state.streakShieldsAvailable<=0){notify('⚠ No shield available this month','var(--red)');return;}
  if(!confirm('Use your Streak Shield? This protects one missed day. (1 per month)'))return;
  state.streakShieldsAvailable--;state.streakShieldsUsed=(state.streakShieldsUsed||0)+1;
  saveState();notify('🛡 Streak Shield used! Streak protected.','var(--gold)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// BODY / NUTRITION
// ═══════════════════════════════════════════════════════
async function saveBodyMetrics(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const e={date:todayKey(),weight:parseFloat(document.getElementById('inp-weight').value)||null,waist:parseFloat(document.getElementById('inp-waist').value)||null,shoulders:parseFloat(document.getElementById('inp-shoulders').value)||null,pullupmax:parseInt(document.getElementById('inp-pullupmax').value)||null};
  bodyHistory.push(e);await dbUpsertDay('body_logs',e);await saveState();notify('💪 Body logged!');refreshAll();updateCharts();
  ['inp-weight','inp-waist','inp-shoulders','inp-pullupmax'].forEach(id=>document.getElementById(id).value='');
}

async function saveNutrition(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const get=(id)=>parseFloat(document.getElementById(id)?.value)||0;
  const meals={
    breakfast:{desc:document.getElementById('meal-b-desc')?.value||'',cal:get('meal-b-cal'),prot:get('meal-b-prot'),carb:get('meal-b-carb'),fat:get('meal-b-fat')},
    lunch:{desc:document.getElementById('meal-l-desc')?.value||'',cal:get('meal-l-cal'),prot:get('meal-l-prot'),carb:get('meal-l-carb'),fat:get('meal-l-fat')},
    dinner:{desc:document.getElementById('meal-d-desc')?.value||'',cal:get('meal-d-cal'),prot:get('meal-d-prot'),carb:get('meal-d-carb'),fat:get('meal-d-fat')},
    snacks:{desc:document.getElementById('meal-s-desc')?.value||'',cal:get('meal-s-cal'),prot:get('meal-s-prot'),carb:get('meal-s-carb'),fat:get('meal-s-fat')},
  };
  const cals=meals.breakfast.cal+meals.lunch.cal+meals.dinner.cal+meals.snacks.cal;
  const prot=meals.breakfast.prot+meals.lunch.prot+meals.dinner.prot+meals.snacks.prot;
  const carb=meals.breakfast.carb+meals.lunch.carb+meals.dinner.carb+meals.snacks.carb;
  const fat=meals.breakfast.fat+meals.lunch.fat+meals.dinner.fat+meals.snacks.fat;
  const today=todayKey();
  let idx=bodyHistory.findIndex(e=>e.date===today);
  if(idx>=0){bodyHistory[idx]={...bodyHistory[idx],cals,prot,carb,fat,meals};}
  else bodyHistory.push({date:today,cals,prot,carb,fat,meals});
  await dbUpsertDay('body_logs',{date:today,cals,prot,carb,fat,meals});await saveState();
  notify('🥗 All meals logged! '+prot+'g protein today','var(--green)');
  updateMealTotals();refreshAll();
}

async function saveStrength(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const e={date:todayKey(),squat:parseFloat(document.getElementById('inp-squat').value)||null,deadlift:parseFloat(document.getElementById('inp-deadlift').value)||null,wpullup:parseFloat(document.getElementById('inp-wpullup').value)||null,pushup:parseInt(document.getElementById('inp-pushup').value)||null,bench:parseFloat(document.getElementById('inp-bench').value)||null,row:parseFloat(document.getElementById('inp-row').value)||null};
  strengthHistory.push(e);await dbUpsertDay('strength_logs',e);await saveState();notify('🏋️ Strength logged!','var(--accent2)');refreshAll();updateCharts();
  ['inp-squat','inp-deadlift','inp-wpullup','inp-pushup','inp-bench','inp-row'].forEach(id=>document.getElementById(id).value='');
}

async function saveEngine(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const e={date:todayKey(),type:currentCardioType,
    fiveK:document.getElementById('inp-5k')?.value||null,
    tenK:document.getElementById('inp-10k')?.value||null,
    sprint:parseFloat(document.getElementById('inp-sprint')?.value)||null,
    sprintDist:document.getElementById('inp-sprint-dist')?.value||null,
    duration:parseInt(document.getElementById('inp-duration')?.value)||null,
    distance:parseFloat(document.getElementById('inp-distance')?.value)||null,
    cardioCal:parseInt(document.getElementById('inp-cardio-cal')?.value)||null,
    rhr:parseInt(document.getElementById('inp-rhr')?.value)||null,
    avghr:parseInt(document.getElementById('inp-avghr')?.value)||null,
    rpe:parseInt(document.getElementById('inp-rpe')?.value)||null,
    notes:document.getElementById('inp-cardio-notes')?.value||null,
  };
  engineHistory.push(e);await dbInsertRow('engine_logs',e);await saveState();notify('🏃 Engine logged!','var(--purple)');refreshAll();
  ['inp-5k','inp-10k','inp-duration','inp-distance','inp-cardio-cal','inp-rhr','inp-avghr','inp-rpe','inp-cardio-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}

// ═══════════════════════════════════════════════════════
// ML
// ═══════════════════════════════════════════════════════
async function saveML(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  state.mlCurrent={
    modules:parseInt(document.getElementById('inp-modules').value)||state.mlCurrent.modules,
    lectures:parseInt(document.getElementById('inp-lectures').value)||state.mlCurrent.lectures,
    lecturesPlanned:parseInt(document.getElementById('inp-lectures-planned').value)||21,
    lectures231n:parseInt(document.getElementById('inp-231n').value)||state.mlCurrent.lectures231n||0,
    lectures231nPlanned:parseInt(document.getElementById('inp-231n-planned').value)||18,
    projects:parseInt(document.getElementById('inp-projects').value)||state.mlCurrent.projects,
    commits:parseInt(document.getElementById('inp-commits').value)||state.mlCurrent.commits,
    dlnlp:parseInt(document.getElementById('inp-dlnlp').value)||state.mlCurrent.dlnlp,
  };
  const e={date:todayKey(),...state.mlCurrent};mlHistory.push(e);await dbUpsertDay('ml_logs',e);await saveState();notify('🧠 ML updated!','var(--purple)');refreshAll();updateCharts();
}

async function saveCurriculum(){
  const items=document.querySelectorAll('.curr-item input[type=checkbox]'),curr={};
  items.forEach(cb=>{curr[cb.id]=cb.checked;const l=cb.nextElementSibling;if(l)l.classList.toggle('done',cb.checked);});
  state.curriculum=curr;await dbUpsertState('curriculum',curr);updateCurriculumBars();
}

function applyCurriculum(){Object.entries(state.curriculum).forEach(([id,v])=>{const el=document.getElementById(id);if(el){el.checked=v;const l=el.nextElementSibling;if(l)l.classList.toggle('done',v);}});updateCurriculumBars();}

function updateCurriculumBars(){
  const tracks={
    'track-cs229':['cs-1','cs-2','cs-3','cs-4','cs-5','cs-6','cs-7','cs-8','cs-9','cs-10','cs-11','cs-12','cs-13','cs-14','cs-15','cs-16','cs-17','cs-18','cs-19','cs-20','cs-21'],
    'track-cs231n':['n231-1','n231-2','n231-3','n231-4','n231-5','n231-6','n231-7','n231-8','n231-9','n231-10','n231-11','n231-12','n231-13','n231-14','n231-15','n231-16','n231-17','n231-18'],
    'track-dl':['dl-1','dl-2','dl-3','dl-4','dl-5','dl-6','dl-7','dl-8','dl-9','dl-10'],
    'track-nlp':['nlp-1','nlp-2','nlp-3','nlp-4','nlp-5','nlp-6','nlp-7','nlp-8','nlp-9','nlp-10']
  };
  let td=0,ta=0;
  Object.entries(tracks).forEach(([id,items])=>{
    const done=items.filter(x=>document.getElementById(x)?.checked).length;
    td+=done;ta+=items.length;
    const pct=(done/items.length)*100;
    const bar=document.getElementById('bar-'+id),count=document.getElementById('count-'+id);
    if(bar)bar.style.width=pct+'%';if(count)count.textContent=done+'/'+items.length;
  });
  const op=ta?Math.round((td/ta)*100):0;
  const cb=document.getElementById('currBar'),dp=document.getElementById('dashCurrPct');
  if(cb)cb.style.width=op+'%';if(dp)dp.textContent=op+'%';
}

function toggleTrack(id){const body=document.getElementById(id),tog=document.getElementById('tog-'+id),open=body.classList.toggle('open');if(tog)tog.textContent=open?'▲':'▼';}

// ═══════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════
function selectST(el,t){document.querySelectorAll('.sess-btn').forEach(b=>b.classList.remove('selected'));el.classList.add('selected');selectedST=t;}

async function addGermanSession(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const hrs=parseFloat(document.getElementById('germanAddHours').value)||0;
  if(hrs<=0){notify('Enter hours > 0','var(--red)');return;}
  const topic=document.getElementById('germanTopic').value.trim();
  const words=parseInt(document.getElementById('germanNewWords').value)||0;
  const min=parseInt(document.getElementById('germanMinutes').value)||0;
  const wWords=parseInt(document.getElementById('germanWritingWords').value)||0;
  const ws=getWeekStart();
  state.germanTotalHours+=hrs;
  if(!state.germanMethodHours)state.germanMethodHours={};
  state.germanMethodHours[selectedST]=(state.germanMethodHours[selectedST]||0)+hrs;
  state.germanTotalWords=(state.germanTotalWords||0)+words;
  state.germanTotalSpeakingMin=(state.germanTotalSpeakingMin||0)+min;
  state.germanTotalWritingWords=(state.germanTotalWritingWords||0)+wWords;
  if(!state.germanWeekly)state.germanWeekly={};
  state.germanWeekly[ws]=(state.germanWeekly[ws]||0)+hrs;
  const entry={date:todayKey(),method:selectedST,hours:hrs,topic,words,min,wWords,weekTotal:state.germanWeekly[ws],campaignTotal:state.germanTotalHours};
  germanHistory.push(entry);await dbInsertRow('german_logs',entry);await saveState();
  notify('🇩🇪 +'+hrs+'hr ('+selectedST+')','var(--gold)');
  ['germanAddHours','germanTopic','germanNewWords','germanMinutes','germanWritingWords'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=el.type==='number'?'0':'';});
  refreshAll();updateCharts();
}

async function saveGermanMilestones(){
  const checks=document.querySelectorAll('.ms-check'),miles={};
  checks.forEach(cb=>{miles[cb.id]=cb.checked;const l=document.querySelector('label[for="'+cb.id+'"]');if(l)l.classList.toggle('done',cb.checked);});
  state.germanMilestones=miles;await dbUpsertState('germanMilestones',miles);
}

function applyGermanMilestones(){Object.entries(state.germanMilestones).forEach(([id,v])=>{const el=document.getElementById(id);if(el){el.checked=v;const l=document.querySelector('label[for="'+id+'"]');if(l)l.classList.toggle('done',v);}});}

function buildSkillMatrix(){
  const tbody=document.getElementById('skillMatrixBody');if(!tbody)return;
  tbody.innerHTML=GERMAN_SKILLS.map(skill=>{
    const key='skill_'+skill.replace(/[^a-zA-Z0-9]/g,'_');
    const sm=state.skillMatrix||{};
    const a2=sm[key+'_a2']||false,b1=sm[key+'_b1']||false,b2=sm[key+'_b2']||false,conf=sm[key+'_conf']||1;
    return `<tr><td class="skill-name">${skill}</td><td style="text-align:center;"><input type="checkbox" class="mastered-check" id="${key}_a2" ${a2?'checked':''}></td><td style="text-align:center;"><input type="checkbox" class="mastered-check" id="${key}_b1" ${b1?'checked':''}></td><td style="text-align:center;"><input type="checkbox" class="mastered-check" id="${key}_b2" ${b2?'checked':''}></td><td><select class="conf-select" id="${key}_conf">${[1,2,3,4,5].map(n=>`<option value="${n}" ${conf==n?'selected':''}>${n} ${'★'.repeat(n)}</option>`).join('')}</select></td></tr>`;
  }).join('');
}

async function saveSkillMatrix(){
  const matrix={};
  GERMAN_SKILLS.forEach(skill=>{
    const key='skill_'+skill.replace(/[^a-zA-Z0-9]/g,'_');
    ['a2','b1','b2'].forEach(l=>{const el=document.getElementById(key+'_'+l);if(el)matrix[key+'_'+l]=el.checked;});
    const ce=document.getElementById(key+'_conf');if(ce)matrix[key+'_conf']=parseInt(ce.value);
  });
  state.skillMatrix=matrix;await dbUpsertState('skillMatrix',matrix);notify('📊 Skill matrix saved!','var(--gold)');
}

// ═══════════════════════════════════════════════════════
// BAD HABITS
// ═══════════════════════════════════════════════════════
async function logHabit(key, name, xpCost){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  if(!confirm('Log '+name+'? This costs '+Math.abs(xpCost)+' XP.'))return;
  if(!state.habitCounts)state.habitCounts={};
  state.habitCounts[key]=(state.habitCounts[key]||0)+1;
  state.totalXP=Math.max(0,state.totalXP+xpCost);
  const entry={date:todayKey(),key,name,xpCost};
  habitHistory.push(entry);await dbInsertRow('habit_logs',entry);await saveState();
  notify('⚠ '+name+' logged: '+xpCost+' XP','var(--red)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// WEEKLY SUMMARY + GRADING
// ═══════════════════════════════════════════════════════
function calcWeeklyGrade(){
  const wXP=getWeeklyXP();
  const ws=getWeekStart();
  const wGermanHrs=(state.germanWeekly||{})[ws]||0;
  const wEntries=xpHistory.filter(e=>e.date>=ws);
  const trainDays=wEntries.filter(e=>e.gym||e.run).length;
  const mlDays=wEntries.filter(e=>e.deepwork||e.impl).length;
  let score=0;
  if(wXP>=500)score+=30;else if(wXP>=350)score+=20;else if(wXP>=200)score+=10;
  if(trainDays>=5)score+=20;else if(trainDays>=3)score+=12;else if(trainDays>=2)score+=6;
  if(mlDays>=5)score+=20;else if(mlDays>=3)score+=12;else if(mlDays>=2)score+=6;
  if(wGermanHrs>=20)score+=30;else if(wGermanHrs>=15)score+=20;else if(wGermanHrs>=10)score+=10;
  if(score>=85)return'A';if(score>=70)return'B';if(score>=50)return'C';if(score>=30)return'D';return'F';
}

function renderWeeklySummary(){
  const grade=calcWeeklyGrade();
  const wXP=getWeeklyXP();
  const ws=getWeekStart();
  const wGermanHrs=(state.germanWeekly||{})[ws]||0;
  const wEntries=xpHistory.filter(e=>e.date>=ws);
  const trainDays=wEntries.filter(e=>e.gym||e.run).length;
  const mlDays=wEntries.filter(e=>e.deepwork||e.impl).length;
  const sg=document.getElementById('summaryGrade');
  const wg=document.getElementById('weekGrade');
  if(sg){sg.className='grade-badge grade-'+grade;sg.textContent=grade;}
  if(wg){wg.className='grade-badge grade-'+grade;wg.textContent=grade;wg.style.fontSize='2rem';wg.style.padding='0';}
  const rows=document.getElementById('summaryRows');
  if(rows){
    rows.innerHTML=[
      {label:'Weekly XP',val:wXP+' / 500',ok:wXP>=500},
      {label:'Training Days',val:trainDays+' / 7',ok:trainDays>=5},
      {label:'ML Days',val:mlDays+' / 7',ok:mlDays>=5},
      {label:'German Hours',val:wGermanHrs.toFixed(1)+' / 20',ok:wGermanHrs>=20},
      {label:'Level',val:'LVL '+state.currentLevel+' — '+LEVELS[(state.currentLevel||1)-1].name,ok:state.currentLevel>=2},
    ].map(r=>`<div class="summary-row"><span>${r.label}</span><span style="color:${r.ok?'var(--green)':'var(--accent2)'}">${r.val} ${r.ok?'✓':'⚠'}</span></div>`).join('');
  }
}

// ═══════════════════════════════════════════════════════
// REWARDS
// ═══════════════════════════════════════════════════════
function renderRewards(){
  const wXP=getWeeklyXP();
  const wg=document.getElementById('rewardGridWeekly');
  if(wg){
    wg.innerHTML=WEEKLY_REWARDS.map((r,i)=>{
      const weeks=Object.values(state.weeklyXPHistory||{}).filter(xp=>xp>=500).length;
      const unlocked=weeks>i;
      const claimed=(state.claimedRewards||[]).includes('w'+i);
      return `<div class="reward-badge ${claimed?'claimed':unlocked?'unlocked':''}">
        <div class="r-icon">${r.icon}</div><div class="r-tier">WEEK ${r.week}</div>
        <div class="r-name">${r.name}</div><div class="r-req" style="font-size:.55rem;">${r.req}</div>
        <div class="r-status" style="color:${claimed?'var(--green)':unlocked?'var(--gold)':'var(--border2)'}">${claimed?'✓ CLAIMED':unlocked?'UNLOCKED':'🔒'}</div>
        ${unlocked&&!claimed?`<button class="claim-btn" onclick="claimReward('w${i}','${r.name}')">CLAIM</button>`:''}
      </div>`;
    }).join('');
  }
  const mg=document.getElementById('rewardGridMonthly');
  if(mg){
    mg.innerHTML=MONTHLY_REWARDS.map((r,i)=>{
      const unlocked=state.currentLevel>=(i+2);
      const claimed=(state.claimedRewards||[]).includes('m'+i);
      return `<div class="reward-badge ${claimed?'claimed':unlocked?'unlocked':''}">
        <div class="r-icon">${r.icon}</div><div class="r-tier">MONTH ${r.month}</div>
        <div class="r-name">${r.name}</div><div class="r-req" style="font-size:.55rem;">${r.req}</div>
        <div class="r-status" style="color:${claimed?'var(--green)':unlocked?'var(--gold)':'var(--border2)'}">${claimed?'✓ CLAIMED':unlocked?'UNLOCKED':'🔒'}</div>
        ${unlocked&&!claimed?`<button class="claim-btn" onclick="claimReward('m${i}','${r.name}')">CLAIM</button>`:''}
      </div>`;
    }).join('');
  }
  const fg=document.getElementById('rewardGridFinal');
  if(fg){
    fg.innerHTML=FINAL_REWARDS.map((r,i)=>{
      const claimed=(state.claimedRewards||[]).includes('f'+i);
      return `<div class="reward-badge ${claimed?'claimed':''}">
        <div class="r-icon">${r.icon}</div><div class="r-tier">SEPTEMBER FINAL</div>
        <div class="r-name">${r.name}</div><div class="r-req" style="font-size:.55rem;">${r.req}</div>
        <div class="r-status" style="color:${claimed?'var(--green)':'var(--border2)'}">${claimed?'✓ CLAIMED':'🔒 SEP 2026'}</div>
      </div>`;
    }).join('');
  }
  const habCounts=state.habitCounts||{};
  ['junk','scroll','sleep','game','skipger','skiptrain'].forEach(k=>{const e=document.getElementById('hab-'+k);if(e)e.textContent=habCounts[k]||0;});
  const totalHabXP=habitHistory.reduce((s,e)=>s+(e.xpCost||0),0);
  const hxp=document.getElementById('habitXPLost');if(hxp)hxp.textContent=totalHabXP;
  const hbody=document.getElementById('habitHistoryBody');
  if(hbody){
    const recent=[...habitHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10);
    hbody.innerHTML=recent.length?recent.map(e=>`<tr><td>${e.date}</td><td>${e.name}</td><td style="color:var(--red);">${e.xpCost} XP</td></tr>`).join(''):`<tr><td colspan="3" style="color:var(--muted);text-align:center;padding:14px;">No habits logged</td></tr>`;
  }
}

async function claimReward(key, name){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  if(!confirm('Claim reward: '+name+'?'))return;
  if(!state.claimedRewards)state.claimedRewards=[];
  state.claimedRewards.push(key);await saveState();
  notify('🏆 Claimed: '+name,'var(--gold)');renderRewards();
}

// ═══════════════════════════════════════════════════════
// CHARTS
// ═══════════════════════════════════════════════════════
const CHART_DEFAULTS={responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#4a6278',font:{family:'JetBrains Mono',size:10}}}}};

function destroyChart(key){if(charts[key]){charts[key].destroy();charts[key]=null;}}

function buildCharts(){
  buildWeightChart();buildXPChart();buildGermanChart();buildMLChart();buildStrengthChart();buildDayTypeChart();
}
function updateCharts(){buildCharts();}

function buildWeightChart(){
  destroyChart('weight');
  const ctx=document.getElementById('chartWeight');if(!ctx)return;
  const data=[...bodyHistory].filter(e=>e.weight).sort((a,b)=>a.date.localeCompare(b.date)).slice(-20);
  charts['weight']=new Chart(ctx,{type:'line',data:{labels:data.map(e=>e.date.slice(5)),datasets:[{label:'Weight (kg)',data:data.map(e=>e.weight),borderColor:'#00d4ff',backgroundColor:'rgba(0,212,255,.08)',tension:.3,pointRadius:3,pointBackgroundColor:'#00d4ff'},{label:'Goal (67kg)',data:data.map(()=>67),borderColor:'rgba(57,255,20,.4)',borderDash:[5,5],pointRadius:0,tension:0}]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'},min:55,max:75}}}});
}

function buildXPChart(){
  destroyChart('xp');
  const ctx=document.getElementById('chartXP');if(!ctx)return;
  const weeks=[];const wXPs=[];
  for(let i=9;i>=0;i--){
    const ws=getWeekLabel(i);const we=new Date(ws);we.setDate(we.getDate()+7);const weStr=we.toISOString().split('T')[0];
    const wXP=xpHistory.filter(e=>e.date>=ws&&e.date<weStr).reduce((s,e)=>s+(e.xp||0),0);
    weeks.push('W-'+i);wXPs.push(wXP);
  }
  charts['xp']=new Chart(ctx,{type:'bar',data:{labels:weeks,datasets:[{label:'Weekly XP',data:wXPs,backgroundColor:wXPs.map(x=>x>=500?'rgba(57,255,20,.7)':x>=300?'rgba(0,212,255,.7)':'rgba(255,107,53,.7)'),borderWidth:0},{label:'Target (500)',data:weeks.map(()=>500),type:'line',borderColor:'rgba(255,215,0,.5)',borderDash:[5,5],pointRadius:0,backgroundColor:'transparent'}]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'},min:0,max:600}}}});
}

function buildGermanChart(){
  destroyChart('german');
  const ctx=document.getElementById('chartGerman');if(!ctx)return;
  const weeks=[];const hrs=[];
  for(let i=9;i>=0;i--){
    const ws=getWeekLabel(i);weeks.push('W-'+i);hrs.push(((state.germanWeekly||{})[ws]||0));
  }
  charts['german']=new Chart(ctx,{type:'bar',data:{labels:weeks,datasets:[{label:'German Hours',data:hrs,backgroundColor:hrs.map(h=>h>=20?'rgba(57,255,20,.7)':h>=15?'rgba(255,215,0,.7)':'rgba(168,85,247,.5)'),borderWidth:0},{label:'Target (20hr)',data:weeks.map(()=>20),type:'line',borderColor:'rgba(255,215,0,.5)',borderDash:[5,5],pointRadius:0,backgroundColor:'transparent'}]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'},min:0,max:25}}}});
}

function buildMLChart(){
  destroyChart('ml');
  const ctx=document.getElementById('chartML');if(!ctx)return;
  const tracks={'track-cs229':['cs-1','cs-2','cs-3','cs-4','cs-5','cs-6','cs-7','cs-8','cs-9','cs-10','cs-11','cs-12'],'track-dl':['dl-1','dl-2','dl-3','dl-4','dl-5','dl-6','dl-7','dl-8','dl-9','dl-10'],'track-nlp':['nlp-1','nlp-2','nlp-3','nlp-4','nlp-5','nlp-6','nlp-7','nlp-8','nlp-9','nlp-10']};
  const cs229Done=tracks['track-cs229'].filter(id=>state.curriculum&&state.curriculum[id]).length;
  const dlDone=tracks['track-dl'].filter(id=>state.curriculum&&state.curriculum[id]).length;
  const nlpDone=tracks['track-nlp'].filter(id=>state.curriculum&&state.curriculum[id]).length;
  const cs229Rem=12-cs229Done,dlRem=10-dlDone,nlpRem=10-nlpDone;
  charts['ml']=new Chart(ctx,{type:'doughnut',data:{labels:['CS229 ✓','DL ✓','NLP ✓','CS229 rem','DL rem','NLP rem'],datasets:[{data:[cs229Done,dlDone,nlpDone,cs229Rem,dlRem,nlpRem],backgroundColor:['rgba(0,212,255,.8)','rgba(168,85,247,.8)','rgba(255,107,53,.8)','rgba(0,212,255,.15)','rgba(168,85,247,.15)','rgba(255,107,53,.15)'],borderWidth:1,borderColor:'#0c1117'}]},options:{...CHART_DEFAULTS,cutout:'60%',plugins:{legend:{display:true,position:'bottom',labels:{color:'#4a6080',font:{size:9},boxWidth:10}}}}});
}

function buildStrengthChart(){
  destroyChart('strength');
  const ctx=document.getElementById('chartStrength');if(!ctx)return;
  const data=[...strengthHistory].sort((a,b)=>a.date.localeCompare(b.date)).slice(-15);
  const ds=[];
  if(data.some(e=>e.squat)){ds.push({label:'Squat',data:data.map(e=>e.squat||null),borderColor:'#ff6b35',tension:.3,pointRadius:2,spanGaps:true});}
  if(data.some(e=>e.deadlift)){ds.push({label:'Deadlift',data:data.map(e=>e.deadlift||null),borderColor:'#ffd700',tension:.3,pointRadius:2,spanGaps:true});}
  if(data.some(e=>e.bench)){ds.push({label:'Bench',data:data.map(e=>e.bench||null),borderColor:'#00d4ff',tension:.3,pointRadius:2,spanGaps:true});}
  charts['strength']=new Chart(ctx,{type:'line',data:{labels:data.map(e=>e.date.slice(5)),datasets:ds.length?ds:[{label:'No data yet',data:[],borderColor:'#1a2838'}]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}}}}});
}

function buildDayTypeChart(){
  destroyChart('dayType');
  const ctx=document.getElementById('chartDayType');if(!ctx)return;
  const counts={prime:0,core:0,social:0,recovery:0};
  Object.values(state.dayTypeHistory||{}).forEach(t=>{if(counts[t]!==undefined)counts[t]++;});
  charts['dayType']=new Chart(ctx,{type:'doughnut',data:{labels:['🔥 Prime','⚡ Core','🤝 Social','🛌 Recovery'],datasets:[{data:[counts.prime,counts.core,counts.social,counts.recovery],backgroundColor:['rgba(0,212,255,.8)','rgba(57,255,20,.8)','rgba(255,215,0,.8)','rgba(168,85,247,.8)'],borderWidth:2,borderColor:'#0c1117'}]},options:{...CHART_DEFAULTS,cutout:'55%',plugins:{legend:{display:true,position:'bottom',labels:{color:'#4a6080',font:{size:10},boxWidth:12}}}}});
}

// ═══════════════════════════════════════════════════════
// REFRESH
// ═══════════════════════════════════════════════════════
function switchTab(id,el){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');if(el)el.classList.add('active');
  if(id==='charts')setTimeout(buildCharts,50);
  refreshAll();
}

function restoreTodayState() {
  const today = todayKey();
  const entry = xpHistory.find(e => e.date === today);
  if (!entry) return;
  // Restore XP checkboxes
  const map = {
    'xp-gym': entry.gym, 'xp-run': entry.run, 'xp-mobility': entry.mobility,
    'xp-deepwork': entry.deepwork, 'xp-impl': entry.impl,
    'xp-german': entry.germanStudy, 'xp-protein': entry.protein,
    'xp-water': entry.water, 'xp-calories': entry.calories
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.checked = !!val;
  });
  // Restore german hours
  const ghEl = document.getElementById('germanHoursToday');
  if (ghEl && entry.germanHrs) ghEl.value = entry.germanHrs;
  // Restore day type
  if (entry.dayType) selectDayType(entry.dayType, document.getElementById('dt-' + entry.dayType));
  updateXP();
}

function refreshAll(){
  updateHeader();renderDashboard();renderXPHistory();renderBodyHistory();renderStrengthHistory();renderEngineHistory();renderMLHistory();renderGermanHistory();renderRewards();renderLevelTimeline();updateCurriculumBars();renderGermanStats();renderWeeklySummary();updateMVSBar();
  const sc=document.getElementById('shieldCount');if(sc)sc.textContent=state.streakShieldsAvailable||0;
}

function updateHeader(){
  const now=new Date();
  document.getElementById('currentDate').textContent=now.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  const day=Math.max(1,Math.floor((now-CAMPAIGN_START)/86400000)+1);
  document.getElementById('campaignDay').textContent='DAY '+Math.min(day,CAMPAIGN_DAYS)+' OF '+CAMPAIGN_DAYS;
  const pct=Math.round((Math.min(day,CAMPAIGN_DAYS)/CAMPAIGN_DAYS)*100);
  const cp=document.getElementById('campaignProgress');if(cp)cp.innerHTML=`<span style="font-family:var(--font-mono);font-size:.6rem;color:var(--muted);">${pct}% COMPLETE</span>`;
  const dtl=document.getElementById('todayDateLabel');if(dtl)dtl.textContent=now.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}

function renderDashboard(){
  const lvl=state.currentLevel||1,ld=LEVELS[lvl-1];
  document.getElementById('dashLevel').textContent=lvl;
  document.getElementById('dashLevelName').textContent=ld.name.toUpperCase();
  document.getElementById('dashLevelPeriod').textContent='WEEK '+ld.weeks;
  const wXP=getWeeklyXP();
  document.getElementById('weeklyXPdash').textContent=wXP;
  document.getElementById('weeklyBar').style.width=Math.min(100,(wXP/500)*100)+'%';
  document.getElementById('totalXPdash').textContent=state.totalXP||0;
  const maxXP=13*500;
  const cb=document.getElementById('campaignBar');if(cb)cb.style.width=Math.min(100,((state.totalXP||0)/maxXP)*100)+'%';
  const wl=document.getElementById('weeklyXPlabel');if(wl)wl.textContent=wXP+' XP';
  const st=state.streaks||{};
  ['train','ml','german'].forEach(t=>{
    const ne=document.getElementById(t+'Streak');if(ne)ne.textContent=st[t]||0;
    const dc=document.getElementById(t+'Dots');if(!dc)return;dc.innerHTML='';
    for(let i=6;i>=0;i--){
      const d=new Date();d.setDate(d.getDate()-i);const key=d.toISOString().split('T')[0];
      const e=xpHistory.find(x=>x.date===key),dot=document.createElement('div');dot.className='day-dot';
      let f=false;
      if(t==='train'&&e&&(e.gym||e.run))f=true;
      if(t==='ml'&&e&&(e.deepwork||e.impl))f=true;
      if(t==='german'&&e&&e.germanStudy)f=true;
      if(f)dot.classList.add('filled');dc.appendChild(dot);
    }
  });
  const lb=bodyHistory.slice(-1)[0];
  if(lb){
    document.getElementById('dashWeight').textContent=(lb.weight||'—')+' kg';
    document.getElementById('dashPullup').textContent=(lb.pullupmax||'—')+' reps';
    const pct=lb.weight?Math.min(100,Math.max(0,((lb.weight-60)/(67-60))*100)):0;
    ['bodyBarDash','bwBar'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.width=pct+'%';});
    const bwc=document.getElementById('bw-current');if(bwc)bwc.textContent=lb.weight+' kg';
    const dwp=document.getElementById('dashWeightPct');if(dwp)dwp.textContent=Math.round(pct)+'% to goal';
    const today=todayKey();
    const todayBody=bodyHistory.find(e=>e.date===today&&e.cals);
    ['cal-today','prot-today','carb-today','fat-today'].forEach(id=>{ const e=document.getElementById(id);if(e)e.textContent='—'; });
    if(todayBody){
      const ct=document.getElementById('cal-today');if(ct)ct.textContent=todayBody.cals||'—';
      const pt=document.getElementById('prot-today');if(pt)pt.textContent=todayBody.prot||'—';
      const crt=document.getElementById('carb-today');if(crt)crt.textContent=todayBody.carb||'—';
      const ft=document.getElementById('fat-today');if(ft)ft.textContent=todayBody.fat||'—';
    }
  }
  if(strengthHistory.length){
    const g=(f)=>{const vals=strengthHistory.map(e=>e[f]).filter(v=>v);return vals.length?Math.max(...vals):null;};
    const s={squat:g('squat'),deadlift:g('deadlift'),wpullup:g('wpullup'),pushup:g('pushup'),bench:g('bench'),row:g('row')};
    const ge=id=>document.getElementById(id);
    const fmt=(v,unit)=>v?(v+' '+unit):'—';
    if(ge('dashSquat'))ge('dashSquat').textContent=fmt(s.squat,'kg');
    if(ge('dashDeadlift'))ge('dashDeadlift').textContent=fmt(s.deadlift,'kg');
    if(ge('dashWPullup'))ge('dashWPullup').textContent=s.wpullup?'+'+s.wpullup+' kg':'—';
    if(ge('dashPushup'))ge('dashPushup').textContent=fmt(s.pushup,'reps');
    if(ge('pb-squat'))ge('pb-squat').textContent=fmt(s.squat,'kg');
    if(ge('pb-deadlift'))ge('pb-deadlift').textContent=fmt(s.deadlift,'kg');
    if(ge('pb-wpullup'))ge('pb-wpullup').textContent=s.wpullup?'+'+s.wpullup+' kg':'—';
    if(ge('pb-pushup'))ge('pb-pushup').textContent=fmt(s.pushup,'reps');
    if(ge('pb-bench'))ge('pb-bench').textContent=fmt(s.bench,'kg');
    if(ge('pb-row'))ge('pb-row').textContent=fmt(s.row,'kg');
  }
  if(engineHistory.length){
    const lrhr=engineHistory.filter(e=>e.rhr).slice(-1)[0];
    const crhr=document.getElementById('cur-rhr');if(crhr&&lrhr)crhr.textContent=lrhr.rhr+' bpm';
    const sp=engineHistory.filter(e=>e.sprint);const pbs=document.getElementById('pb-sprint');if(sp.length&&pbs)pbs.textContent=Math.min(...sp.map(e=>e.sprint))+'s';
    const fk=engineHistory.filter(e=>e.fiveK);const pb5=document.getElementById('pb-5k');if(fk.length&&pb5)pb5.textContent=fk.slice(-1)[0].fiveK;
  }
  const ml=state.mlCurrent||{};
  const lp=((ml.lectures||0)/(ml.lecturesPlanned||21))*100;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  const setW=(id,w)=>{const e=document.getElementById(id);if(e)e.style.width=w;};
  set('dashCS229',Math.round(lp)+'%');set('dashProjects',ml.projects||0);set('dashCommits',ml.commits||0);
  set('ml-lec-done',ml.lectures||0);set('ml-lec-plan',ml.lecturesPlanned||21);
  set('ml-mod-show',ml.modules||0);set('ml-dlnlp-show',ml.dlnlp||0);
  set('ml-proj-show',ml.projects||0);set('ml-com-show',ml.commits||0);
  setW('lecturesBar',lp+'%');setW('modulesBar',Math.min(100,(ml.modules||0)/20*100)+'%');
  setW('dlnlpBar',Math.min(100,(ml.dlnlp||0)/20*100)+'%');
  const tg=state.germanTotalHours||0,ws=getWeekStart(),wg=(state.germanWeekly||{})[ws]||0;
  ['german-total-hours','dashGermanHours'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=tg.toFixed(1);});
  const dgw=document.getElementById('dashGermanWeek');if(dgw)dgw.textContent=wg.toFixed(1);
  const gws=document.getElementById('german-weekly-show');if(gws)gws.textContent=wg.toFixed(1);
  const gPct=Math.min(100,(wg/20)*100);
  ['germanBarDash','germanWeeklyBar'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.width=gPct+'%';});
  const dgp=document.getElementById('dashGermanPct');if(dgp)dgp.textContent=Math.round(gPct)+'%';
}

function renderGermanStats(){
  const mh=state.germanMethodHours||{};
  ['textbook','anki','youtube','podcast','speaking','writing'].forEach(m=>{const e=document.getElementById('hrs-'+m);if(e)e.textContent=(mh[m]||0).toFixed(1);});
  const tw=document.getElementById('total-words');if(tw)tw.textContent=state.germanTotalWords||0;
  const ts=document.getElementById('total-speaking-min');if(ts)ts.textContent=state.germanTotalSpeakingMin||0;
  const gvt=document.getElementById('german-vocab-total');if(gvt)gvt.textContent=state.germanTotalWords||0;
  const gst=document.getElementById('german-speak-total');if(gst)gst.textContent=state.germanTotalSpeakingMin||0;
  const gwt=document.getElementById('german-writing-total');if(gwt)gwt.textContent=state.germanTotalWritingWords||0;
}

function renderTable(tbodyId,rows,cols){
  const tbody=document.getElementById(tbodyId);if(!tbody)return;
  if(!rows.length){tbody.innerHTML=`<tr><td colspan="${cols}" style="color:var(--muted);text-align:center;padding:16px;">No entries yet.</td></tr>`;return;}
  tbody.innerHTML=rows.map(r=>`<tr>${r.map(c=>`<td class="${c.cls||''}">${c.val}</td>`).join('')}</tr>`).join('');
}

function renderXPHistory(){
  const DT_COLORS={prime:'var(--accent)',core:'var(--green)',social:'var(--gold)',recovery:'var(--purple)'};
  const rows=[...xpHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,14).map(e=>[
    {val:e.date},
    {val:`<span style="color:${DT_COLORS[e.dayType]||'var(--muted)'};">${(e.dayType||'—').toUpperCase()}</span>`},
    {val:e.xp+' XP',cls:e.xp>=80?'val-good':e.xp>=50?'':'val-warn'},
    {val:[e.gym?'Gym':'',e.run?'Run':'',e.mobility?'Mob':''].filter(Boolean).join(', ')||'—'},
    {val:[e.deepwork?'90min':'',e.impl?'Impl':''].filter(Boolean).join(', ')||'—'},
    {val:e.germanHrs?e.germanHrs+'hr':'—'},
    {val:e.hcScore!==undefined?e.hcScore+'/7':'—'},
  ]);
  renderTable('xpHistoryBody',rows,7);
}

function renderBodyHistory(){
  const rows=[...bodyHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10).map(e=>[{val:e.date},{val:e.weight?e.weight+' kg':'—'},{val:e.waist?e.waist+' cm':'—'},{val:e.shoulders?e.shoulders+' cm':'—'},{val:e.pullupmax||'—'},{val:e.cals||'—'},{val:e.prot?e.prot+'g':'—'}]);
  renderTable('bodyHistoryBody',rows,7);
}

function renderStrengthHistory(){
  const rows=[...strengthHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10).map(e=>[{val:e.date},{val:e.squat?e.squat+'kg':'—'},{val:e.deadlift?e.deadlift+'kg':'—'},{val:e.wpullup?'+'+e.wpullup+'kg':'—'},{val:e.pushup?e.pushup+' reps':'—'},{val:e.bench?e.bench+'kg':'—'},{val:e.row?e.row+'kg':'—'}]);
  renderTable('strengthHistoryBody',rows,7);
}

function renderEngineHistory(){
  const TYPE_LABELS={run5k:'5K Run',run10k:'10K Run',sprint:'Sprints',cycling:'Cycling',stairs:'Stairs',jump:'Jump Rope',walk:'Walk',swim:'Swim'};
  const rows=[...engineHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,12).map(e=>[
    {val:e.date},
    {val:TYPE_LABELS[e.type]||e.type||'—'},
    {val:e.fiveK||e.tenK||(e.sprint?e.sprint+'s '+e.sprintDist:'—')||(e.distance?e.distance+'km':'—')},
    {val:e.duration?e.duration+'min':'—'},
    {val:e.avghr?e.avghr+' bpm':'—'},
    {val:e.rpe?e.rpe+'/10':'—'},
    {val:e.rhr?e.rhr+' bpm':'—'},
    {val:e.notes||'—'}
  ]);
  renderTable('engineHistoryBody',rows,8);
  const allFiveK=engineHistory.filter(e=>e.fiveK).map(e=>e.fiveK).sort();
  const allTenK=engineHistory.filter(e=>e.tenK).map(e=>e.tenK).sort();
  const allSprint=engineHistory.filter(e=>e.sprint).map(e=>e.sprint).sort((a,b)=>a-b);
  const allRHR=engineHistory.filter(e=>e.rhr).map(e=>e.rhr).sort((a,b)=>a-b);
  const allDur=engineHistory.filter(e=>e.duration).map(e=>e.duration).sort((a,b)=>b-a);
  const lastAvgHR=[...engineHistory].sort((a,b)=>b.date.localeCompare(a.date)).find(e=>e.avghr);
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('pb-5k',allFiveK[0]||'—:—');
  set('pb-10k',allTenK[0]||'—:—');
  set('pb-sprint',allSprint[0]?allSprint[0]+'s':'—');
  set('cur-rhr',allRHR[0]?allRHR[0]+' bpm':'— bpm');
  set('pb-duration',allDur[0]?allDur[0]+' min':'— min');
  set('last-avghr',lastAvgHR?lastAvgHR.avghr+' bpm':'— bpm');
}

function renderMLHistory(){
  const rows=[...mlHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10).map(e=>[{val:e.date},{val:e.modules||0,cls:'val-purple'},{val:(e.lectures||0)+'/'+(e.lecturesPlanned||21),cls:'val-purple'},{val:(e.lectures231n||0)+'/'+(e.lectures231nPlanned||18),cls:'val-purple'},{val:e.dlnlp||0,cls:'val-purple'},{val:e.projects||0},{val:e.commits||0}]);
  renderTable('mlHistoryBody',rows,7);
  const ml=state.mlCurrent||{};
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  const setBar=(id,pct)=>{const e=document.getElementById(id);if(e)e.style.width=Math.min(100,pct)+'%';};
  set('ml-lec-done',ml.lectures||0);set('ml-lec-plan',ml.lecturesPlanned||21);
  set('ml-231n-done',ml.lectures231n||0);set('ml-231n-plan',ml.lectures231nPlanned||18);
  set('ml-mod-show',ml.modules||0);set('ml-dlnlp-show',ml.dlnlp||0);
  set('ml-proj-show',ml.projects||0);set('ml-com-show',ml.commits||0);
  setBar('lecturesBar',((ml.lectures||0)/(ml.lecturesPlanned||21))*100);
  setBar('lectures231nBar',((ml.lectures231n||0)/(ml.lectures231nPlanned||18))*100);
  setBar('modulesBar',Math.min(100,(ml.modules||0)/20*100));
  setBar('dlnlpBar',Math.min(100,(ml.dlnlp||0)/20*100));
  if(document.getElementById('inp-lectures'))document.getElementById('inp-lectures').value=ml.lectures||0;
  if(document.getElementById('inp-231n'))document.getElementById('inp-231n').value=ml.lectures231n||0;
}

function renderGermanHistory(){
  const ICONS={textbook:'📖',anki:'🃏',youtube:'▶️',podcast:'🎧',speaking:'🗣️',writing:'✍️'};
  const rows=[...germanHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,20).map(e=>[
    {val:e.date},{val:(ICONS[e.method]||'')+' '+(e.method||'—')},{val:'+'+e.hours+'hr',cls:'val-gold'},
    {val:e.topic||'—'},{val:e.words?e.words+' words':'—'},{val:e.min?e.min+' min':'—'},{val:e.weekTotal?e.weekTotal.toFixed(1)+'hr':'—'}
  ]);
  renderTable('germanHistoryBody',rows,7);
}

function renderLevelTimeline(){
  const tl=document.getElementById('levelTimeline');if(!tl)return;
  tl.innerHTML=LEVELS.map(l=>`<div class="lnode"><div class="ldot ${l.num<state.currentLevel?'done':l.num===state.currentLevel?'current':''}">${l.num<state.currentLevel?'✓':l.num}</div><div class="lname">${l.name}</div></div>`).join('');
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
async function init(){
  updateHeader();
  setDailyVerse();
  ['ef-10k','ef-sprint','ef-sprint-time','ef-distance','ef-calories'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none';});
  await loadAllData();
  setInterval(updateHeader,60000);
}
