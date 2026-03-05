// ═══════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════
const HARDCODED_URL = "https://bwuapxgdsfcfwhdxffur.supabase.co";
const HARDCODED_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWFweGdkc2ZjZndoZHhmZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTM1NzQsImV4cCI6MjA4Nzk4OTU3NH0.xRIbqrNAG8-XTUg5cwkb7LuKL6EG4Sw_RHoHLoaUEwc";
const KEITH_PASSWORD = 'jesusismyrock';

// ═══════════════════════════════════════════════════════
// AUTH
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
  setTimeout(() => { screen.classList.add('sweep'); }, 300);
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
  } catch(e) { console.error('Supabase error:', e); return null; }
}
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
// STATE & CONSTANTS
// ═══════════════════════════════════════════════════════
const CAMPAIGN_START = new Date('2026-03-09');
const CAMPAIGN_END   = new Date('2026-09-01');
const CAMPAIGN_DAYS  = 176;

const LEVELS=[
  {num:1,name:"E-Rank Hunter",weeks:"1-2"},
  {num:2,name:"D-Rank",weeks:"3-4"},
  {num:3,name:"C-Rank",weeks:"5-6"},
  {num:4,name:"B-Rank",weeks:"7-8"},
  {num:5,name:"A-Rank",weeks:"9-10"},
  {num:6,name:"S-Rank",weeks:"11-12"},
  {num:7,name:"Shadow Monarch's Vessel",weeks:"13-14"},
  {num:8,name:"Monarch Awakening",weeks:"15-16"},
  {num:9,name:"Full Monarch",weeks:"17-18"},
  {num:10,name:"Shadow King",weeks:"19-20"},
  {num:11,name:"The Elite",weeks:"21-22"},
  {num:12,name:"The Champion",weeks:"23-24"},
  {num:13,name:"The Pinnacle",weeks:"25-26"}
];
const WEEKLY_REWARDS=[
  {week:1,icon:"🍕",name:"Cheat Meal — whatever you want",req:"500+ XP Week 1"},
  {week:2,icon:"📚",name:"Buy any book you want",req:"500+ XP Week 2"},
  {week:3,icon:"🎮",name:"3-hour gaming session, guilt-free",req:"500+ XP Week 3"},
  {week:4,icon:"🍿",name:"Movie night + popcorn",req:"500+ XP Week 4"},
  {week:5,icon:"👕",name:"New gym t-shirt",req:"500+ XP Week 5"},
  {week:6,icon:"☕",name:"Favourite cafe outing",req:"500+ XP Week 6"},
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
const GERMAN_SKILLS=['Prasens','Perfekt','Prateritum','Modal Verbs','Nebensatze','Akkusativ & Dativ','Wechselprapositionen','Reflexive Verbs','Konjunktiv II','Passiv','Relativsatze','Temporal Connectors','Complex Sentences','Konjunktiv I','Nominalisierung','Speaking: Opinion','Writing: Essays','Listening Comprehension'];

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
let currentCardioType='run2k';
let focusMode=false;
let charts={};
let booksData=[];

const DAILY_VERSES=[
  '"I can do all things through Christ who strengthens me." - Phil 4:13',
  '"Be strong and courageous. Do not be afraid." - Josh 1:9',
  '"Trust in the Lord with all your heart." - Prov 3:5',
  '"Commit your work to the Lord, and your plans will be established." - Prov 16:3',
  '"The Lord is my strength and my shield." - Psalm 28:7',
  '"Let us not grow weary of doing good." - Gal 6:9',
  '"Whatever you do, work heartily, as for the Lord." - Col 3:23',
  '"With God all things are possible." - Matt 19:26',
  '"He gives power to the faint, and strength to those who have none." - Isa 40:29',
  '"As iron sharpens iron, so one person sharpens another." - Prov 27:17',
  '"For God gave us a spirit not of fear but of power and love and self-control." - 2 Tim 1:7',
  '"Your word is a lamp to my feet and a light to my path." - Psalm 119:105',
  '"The righteous shall live by faith." - Rom 1:17',
  '"Be transformed by the renewal of your mind." - Rom 12:2',
  '"Seek first the kingdom of God and His righteousness." - Matt 6:33',
];

function setDailyVerse(){
  const d=new Date();const idx=(d.getDate()+d.getMonth())%DAILY_VERSES.length;
  const v=document.getElementById('dailyVerse');if(v)v.textContent=DAILY_VERSES[idx];
}

// ═══════════════════════════════════════════════════════
// CARDIO TYPE SELECTOR
// ═══════════════════════════════════════════════════════
function selectCardioType(el, t) {
  document.querySelectorAll('.sess-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  currentCardioType = t;
  const allFields = ['ef-2k','ef-5k','ef-10k','ef-15k','ef-20k','ef-sprint','ef-sprint-time'];
  allFields.forEach(id => { const e = document.getElementById(id); if(e) e.style.display = 'none'; });
  const show = {
    'run2k':['ef-2k'],'run5k':['ef-5k'],'run10k':['ef-10k'],
    'run15k':['ef-15k'],'run20k':['ef-20k'],'sprint':['ef-sprint','ef-sprint-time']
  }[t] || [];
  show.forEach(id => { const e = document.getElementById(id); if(e) e.style.display = ''; });
}

// ═══════════════════════════════════════════════════════
// MEAL TOTALS
// ═══════════════════════════════════════════════════════
function updateMealTotals(){
  const get=(id)=>parseFloat(document.getElementById(id)?.value)||0;
  const totCal=get('meal-b-cal')+get('meal-l-cal')+get('meal-d-cal')+get('meal-s-cal');
  const totProt=get('meal-b-prot')+get('meal-l-prot')+get('meal-d-prot')+get('meal-s-prot');
  const totCarb=get('meal-b-carb')+get('meal-l-carb')+get('meal-d-carb')+get('meal-s-carb');
  const totFat=get('meal-b-fat')+get('meal-l-fat')+get('meal-d-fat')+get('meal-s-fat');
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v||'--';};
  set('cal-today',totCal||null);set('prot-today',totProt||null);
  set('carb-today',totCarb||null);set('fat-today',totFat||null);
  set('prot-progress-val',totProt);
  const pb=document.getElementById('protBar');if(pb)pb.style.width=Math.min(100,(totProt/80)*100)+'%';
}

// ═══════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════
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
  restoreTodayState();
  refreshAll();
  buildCharts();
  checkWeeklyMeasurementPrompt();
}
async function saveState() { await dbUpsertState('main_state',state); }

// ═══════════════════════════════════════════════════════
// NOTIFY
// ═══════════════════════════════════════════════════════
function notify(msg,color='var(--accent)'){
  const el=document.createElement('div');el.className='notification';
  el.style.borderColor=color;el.style.color=color;el.innerHTML=msg;
  document.body.appendChild(el);setTimeout(()=>el.remove(),3400);
}

// ═══════════════════════════════════════════════════════
// FOCUS MODE
// ═══════════════════════════════════════════════════════
function toggleFocusMode(){
  focusMode=!focusMode;
  document.body.classList.toggle('focus-mode',focusMode);
  document.getElementById('focusToggle').classList.toggle('active',focusMode);
  notify(focusMode?'🎯 Focus Mode ON':'Focus Mode OFF','var(--accent2)');
}

// ═══════════════════════════════════════════════════════
// DAY TYPE
// ═══════════════════════════════════════════════════════
function selectDayType(type, el) {
  currentDayType = type;
  ['prime','core','social','recovery'].forEach(t => {
    const btn=document.getElementById('dt-'+t);if(btn)btn.className='dt-btn';
  });
  if(el) el.className='dt-btn active-'+type;
  const dtd=document.getElementById('dayTypeDisplay');if(dtd)dtd.textContent=type.toUpperCase();
}

// ═══════════════════════════════════════════════════════
// HEALTH CHECKLIST
// ═══════════════════════════════════════════════════════
let hcState={sleep:false,water:false,protein:false,sunlight:false,noalc:false,nojunk:false,journal:false};
function updateHC(key, cb) {
  hcState[key]=cb.checked;
  const item=document.getElementById('hc-'+key);if(item)item.classList.toggle('done-hc',cb.checked);
  const score=Object.values(hcState).filter(Boolean).length;
  const hcs=document.getElementById('hcScore');
  if(hcs)hcs.innerHTML=score+'<span style="font-size:1rem;color:var(--muted);">/7</span>';
  const msgs=['Complete your checklist','Getting started','Building momentum!','Half way there','Looking strong!','Almost perfect!','Almost perfect!','PERFECT HEALTH DAY!'];
  const hcm=document.getElementById('hcMsg');if(hcm)hcm.textContent=msgs[score]||msgs[7];
}

// ═══════════════════════════════════════════════════════
// MVS BAR (two-day rule replaced)
// ═══════════════════════════════════════════════════════
function checkTwoDayRule() { updateMVSBar(); }
function updateMVSBar() {
  const bar=document.getElementById('mvsBar');if(!bar)return;
  const today=todayKey();
  const entry=xpHistory.find(e=>e.date===today);
  bar.style.display='flex';
  [{id:'mvs-train',done:entry&&(entry.gym||entry.run)},
   {id:'mvs-ml',done:entry&&(entry.deepwork||entry.impl)},
   {id:'mvs-german',done:entry&&entry.germanStudy},
   {id:'mvs-protein',done:entry&&entry.protein}
  ].forEach(({id,done})=>{const el=document.getElementById(id);if(el)el.className='mvs-item '+(done?'mvs-ok':'mvs-miss');});
}

// ═══════════════════════════════════════════════════════
// XP
// ═══════════════════════════════════════════════════════
const XP_MAP={
  'xp-gym':20,'xp-run':20,'xp-mobility':5,
  'xp-deepwork':25,'xp-impl':10,
  'xp-german-daily':20,
  'xp-protein':10,'xp-water':5,'xp-calories':5
};
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
    gym:document.getElementById('xp-gym').checked,
    run:document.getElementById('xp-run').checked,
    mobility:document.getElementById('xp-mobility').checked,
    deepwork:document.getElementById('xp-deepwork').checked,
    impl:document.getElementById('xp-impl').checked,
    germanStudy:document.getElementById('xp-german-daily').checked,
    protein:document.getElementById('xp-protein').checked,
    water:document.getElementById('xp-water').checked,
    calories:document.getElementById('xp-calories').checked
  };
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
  notify('⚡ +'+xp+' XP logged');
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
    if(!tBroken){if(isTrainRest){}else if(e&&(e.gym||e.run))ts++;else if(i>0)tBroken=true;}
    if(!mBroken){if(isMLRest){}else if(e&&(e.deepwork||e.impl))ms++;else if(i>0)mBroken=true;}
    if(!gBroken){if(isMLRest){}else if(e&&e.germanStudy)gs++;else if(i>0)gBroken=true;}
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
  if(state.streakShieldsAvailable<=0){notify('No shield available this month','var(--red)');return;}
  if(!confirm('Use your Streak Shield? This protects one missed day. (1 per month)'))return;
  state.streakShieldsAvailable--;state.streakShieldsUsed=(state.streakShieldsUsed||0)+1;
  saveState();notify('🛡 Streak Shield used!','var(--gold)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// BODY / NUTRITION
// ═══════════════════════════════════════════════════════
async function saveBodyWeight() {
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const weight=parseFloat(document.getElementById('inp-weight').value);
  if(!weight){notify('Enter a bodyweight value','var(--red)');return;}
  const today=todayKey();
  const existing=bodyHistory.find(e=>e.date===today);
  if(existing){
    existing.weight=weight;
    await supaFetch('PATCH',`rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`,{data:existing});
  } else {
    const entry={date:today,weight};
    bodyHistory.push(entry);
    await dbUpsertDay('body_logs',entry);
  }
  await saveState();
  notify('⚖️ Weight logged: '+weight+' kg','var(--accent)');
  document.getElementById('inp-weight').value='';
  refreshAll();updateCharts();
}
async function saveBodyMetrics(weight,waist,shoulders,pullupmax) {
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const today=todayKey();
  const existing=bodyHistory.find(e=>e.date===today);
  const entry=existing
    ?{...existing,weight:weight||existing.weight,waist,shoulders,pullupmax}
    :{date:today,weight,waist,shoulders,pullupmax};
  if(existing){Object.assign(existing,entry);await supaFetch('PATCH',`rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`,{data:entry});}
  else{bodyHistory.push(entry);await dbUpsertDay('body_logs',entry);}
  await saveState();
  notify('📏 Weekly measurements saved!','var(--gold)');
  refreshAll();updateCharts();
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
  notify('🥗 Meals logged! '+prot+'g protein','var(--green)');
  updateMealTotals();refreshAll();
}
async function saveStrength(){
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const e={date:todayKey(),
    squat:parseFloat(document.getElementById('inp-squat').value)||null,
    deadlift:parseFloat(document.getElementById('inp-deadlift').value)||null,
    wpullup:parseFloat(document.getElementById('inp-wpullup').value)||null,
    pushup:parseInt(document.getElementById('inp-pushup').value)||null,
    bench:parseFloat(document.getElementById('inp-bench').value)||null,
    row:parseFloat(document.getElementById('inp-row').value)||null
  };
  strengthHistory.push(e);await dbUpsertDay('strength_logs',e);await saveState();
  notify('🏋️ Strength logged!','var(--accent2)');refreshAll();updateCharts();
  ['inp-squat','inp-deadlift','inp-wpullup','inp-pushup','inp-bench','inp-row'].forEach(id=>document.getElementById(id).value='');
}
async function saveEngine() {
  if(!isKeith()){notify('👁 Guest view','var(--muted)');return;}
  const e={
    date:todayKey(),type:currentCardioType,
    twoK:document.getElementById('inp-2k')?.value||null,
    fiveK:document.getElementById('inp-5k')?.value||null,
    tenK:document.getElementById('inp-10k')?.value||null,
    fifteenK:document.getElementById('inp-15k')?.value||null,
    twentyK:document.getElementById('inp-20k')?.value||null,
    sprint:parseFloat(document.getElementById('inp-sprint')?.value)||null,
    sprintDist:document.getElementById('inp-sprint-dist')?.value||null,
    rhr:parseInt(document.getElementById('inp-rhr')?.value)||null,
    notes:document.getElementById('inp-cardio-notes')?.value||null,
  };
  engineHistory.push(e);
  await dbInsertRow('engine_logs',e);await saveState();
  notify('🏃 Engine logged!','var(--purple)');
  refreshAll();
  ['inp-2k','inp-5k','inp-10k','inp-15k','inp-20k','inp-sprint','inp-rhr','inp-cardio-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
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
  const e={date:todayKey(),...state.mlCurrent};
  mlHistory.push(e);await dbUpsertDay('ml_logs',e);await saveState();
  notify('🧠 ML updated!','var(--purple)');refreshAll();updateCharts();
}
async function saveCurriculum(){
  const items=document.querySelectorAll('.curr-item input[type=checkbox]'),curr={};
  items.forEach(cb=>{curr[cb.id]=cb.checked;const l=cb.nextElementSibling;if(l)l.classList.toggle('done',cb.checked);});
  state.curriculum=curr;await dbUpsertState('curriculum',curr);updateCurriculumBars();
}
function applyCurriculum(){
  Object.entries(state.curriculum).forEach(([id,v])=>{
    const el=document.getElementById(id);
    if(el){el.checked=v;const l=el.nextElementSibling;if(l)l.classList.toggle('done',v);}
  });
  updateCurriculumBars();
}
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
function toggleTrack(id){
  const body=document.getElementById(id),tog=document.getElementById('tog-'+id),open=body.classList.toggle('open');
  if(tog)tog.textContent=open?'▲':'▼';
}

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
  ['germanAddHours','germanTopic','germanNewWords','germanMinutes','germanWritingWords'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.value=el.type==='number'?'0':'';
  });
  refreshAll();updateCharts();
}
async function saveGermanMilestones(){
  const checks=document.querySelectorAll('.ms-check'),miles={};
  checks.forEach(cb=>{miles[cb.id]=cb.checked;const l=document.querySelector('label[for="'+cb.id+'"]');if(l)l.classList.toggle('done',cb.checked);});
  state.germanMilestones=miles;await dbUpsertState('germanMilestones',miles);
}
function applyGermanMilestones(){
  Object.entries(state.germanMilestones).forEach(([id,v])=>{
    const el=document.getElementById(id);
    if(el){el.checked=v;const l=document.querySelector('label[for="'+id+'"]');if(l)l.classList.toggle('done',v);}
  });
}
function buildSkillMatrix(){
  const tbody=document.getElementById('skillMatrixBody');if(!tbody)return;
  tbody.innerHTML=GERMAN_SKILLS.map(skill=>{
    const key='skill_'+skill.replace(/[^a-zA-Z0-9]/g,'_');
    const sm=state.skillMatrix||{};
    const a2=sm[key+'_a2']||false,b1=sm[key+'_b1']||false,b2=sm[key+'_b2']||false,conf=sm[key+'_conf']||1;
    return `<tr><td class="skill-name">${skill}</td>
      <td style="text-align:center;"><input type="checkbox" class="mastered-check" id="${key}_a2" ${a2?'checked':''}></td>
      <td style="text-align:center;"><input type="checkbox" class="mastered-check" id="${key}_b1" ${b1?'checked':''}></td>
      <td style="text-align:center;"><input type="checkbox" class="mastered-check" id="${key}_b2" ${b2?'checked':''}></td>
      <td><select class="conf-select" id="${key}_conf">${[1,2,3,4,5].map(n=>`<option value="${n}" ${conf==n?'selected':''}>${n} ${'★'.repeat(n)}</option>`).join('')}</select></td></tr>`;
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
async function logHabit(key,name,xpCost){
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
  const wXP=getWeeklyXP(),ws=getWeekStart();
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
  const grade=calcWeeklyGrade(),wXP=getWeeklyXP(),ws=getWeekStart();
  const wGermanHrs=(state.germanWeekly||{})[ws]||0;
  const wEntries=xpHistory.filter(e=>e.date>=ws);
  const trainDays=wEntries.filter(e=>e.gym||e.run).length;
  const mlDays=wEntries.filter(e=>e.deepwork||e.impl).length;
  const germanDays=wEntries.filter(e=>e.germanStudy).length;
  ['summaryGrade','weekGrade'].forEach(id=>{
    const el=document.getElementById(id);if(el){el.className='grade-badge grade-'+grade;el.textContent=grade;}
  });
  const gradeMsg={A:'🔥 Dominant week.',B:'⚡ Solid output.',C:'📈 Room to push.',D:'⚠ Needs effort.',F:'🚨 Reset needed.'};
  const gm=document.getElementById('weekGradeMsg');if(gm)gm.textContent=gradeMsg[grade]||'';
  const rows=document.getElementById('summaryRows');
  if(rows){
    const items=[
      {label:'Weekly XP',val:wXP+' / 500',ok:wXP>=500,color:'var(--accent)'},
      {label:'Training Days',val:trainDays+' / 7',ok:trainDays>=5,color:'var(--accent2)'},
      {label:'ML Days',val:mlDays+' / 7',ok:mlDays>=5,color:'var(--purple)'},
      {label:'German Days',val:germanDays+' / 7',ok:germanDays>=5,color:'var(--gold)'},
      {label:'German Hours',val:wGermanHrs.toFixed(1)+' hr',ok:wGermanHrs>=20,color:'var(--gold)'},
      {label:'Level',val:'LVL '+state.currentLevel,ok:state.currentLevel>=2,color:'var(--green)'},
    ];
    rows.innerHTML=items.map(r=>`
      <div class="summary-row">
        <span class="sr-label">${r.label}</span>
        <span class="sr-val" style="color:${r.ok?r.color:'var(--accent2)'};">${r.val}</span>
        <span class="sr-status" style="color:${r.ok?'var(--green)':'var(--muted)'};">${r.ok?'✓ ON TRACK':'⚠ BEHIND'}</span>
      </div>`).join('');
  }
}

// ═══════════════════════════════════════════════════════
// WEEKLY MEASUREMENT MODAL
// ═══════════════════════════════════════════════════════
function checkWeeklyMeasurementPrompt() {
  const day=new Date().getDay();
  if(day!==0)return;
  const ws=getWeekStart();
  const alreadyPrompted=localStorage.getItem('measurement_prompt_'+ws);
  if(alreadyPrompted)return;
  localStorage.setItem('measurement_prompt_'+ws,'1');
  setTimeout(()=>showMeasurementModal(),1200);
}
function showMeasurementModal() {
  const old=document.getElementById('measurementModal');if(old)old.remove();
  const modal=document.createElement('div');
  modal.id='measurementModal';
  modal.innerHTML=`
    <div class="mmodal-backdrop" onclick="closeMeasurementModal()"></div>
    <div class="mmodal-box">
      <div class="mmodal-title">📏 WEEKLY CHECK-IN</div>
      <div class="mmodal-sub">Sunday measurements · Takes 2 minutes</div>
      <div class="mmodal-fields">
        <div class="f"><label>Bodyweight (kg)</label><input type="number" id="mm-weight" step="0.1" placeholder="e.g. 63.5"></div>
        <div class="f"><label>Waist (cm)</label><input type="number" id="mm-waist" step="0.5" placeholder="e.g. 78"></div>
        <div class="f"><label>Shoulders (cm)</label><input type="number" id="mm-shoulders" step="0.5" placeholder="e.g. 112"></div>
        <div class="f"><label>Pull-up Max (reps)</label><input type="number" id="mm-pullup" step="1" placeholder="e.g. 10"></div>
      </div>
      <div class="mmodal-btns">
        <button class="btn" onclick="submitMeasurementModal()">SAVE MEASUREMENTS ⚡</button>
        <button class="btn" style="border-color:var(--muted);color:var(--muted);" onclick="closeMeasurementModal()">SKIP</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  requestAnimationFrame(()=>modal.classList.add('open'));
}
function closeMeasurementModal() {
  const modal=document.getElementById('measurementModal');if(!modal)return;
  modal.classList.remove('open');setTimeout(()=>modal.remove(),300);
}
async function submitMeasurementModal() {
  const weight=parseFloat(document.getElementById('mm-weight')?.value)||null;
  const waist=parseFloat(document.getElementById('mm-waist')?.value)||null;
  const shoulders=parseFloat(document.getElementById('mm-shoulders')?.value)||null;
  const pullupmax=parseInt(document.getElementById('mm-pullup')?.value)||null;
  if(!weight&&!waist&&!shoulders&&!pullupmax){notify('Enter at least one measurement','var(--red)');return;}
  await saveBodyMetrics(weight,waist,shoulders,pullupmax);
  closeMeasurementModal();
}

// ═══════════════════════════════════════════════════════
// REWARDS
// ═══════════════════════════════════════════════════════
function renderRewards(){
  const wg=document.getElementById('rewardGridWeekly');
  if(wg){
    wg.innerHTML=WEEKLY_REWARDS.map((r,i)=>{
      const weeks=Object.values(state.weeklyXPHistory||{}).filter(xp=>xp>=500).length;
      const unlocked=weeks>i,claimed=(state.claimedRewards||[]).includes('w'+i);
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
      const unlocked=state.currentLevel>=(i+2),claimed=(state.claimedRewards||[]).includes('m'+i);
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
async function claimReward(key,name){
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
function buildCharts(){buildWeightChart();buildXPChart();buildGermanChart();buildMLChart();buildStrengthChart();buildDayTypeChart();}
function updateCharts(){buildCharts();}

function buildWeightChart(){
  destroyChart('weight');
  const ctx=document.getElementById('chartWeight');if(!ctx)return;
  const data=[...bodyHistory].filter(e=>e.weight).sort((a,b)=>a.date.localeCompare(b.date)).slice(-20);
  charts['weight']=new Chart(ctx,{type:'line',data:{labels:data.map(e=>e.date.slice(5)),datasets:[
    {label:'Weight (kg)',data:data.map(e=>e.weight),borderColor:'#00d4ff',backgroundColor:'rgba(0,212,255,.08)',tension:.3,pointRadius:3,pointBackgroundColor:'#00d4ff'},
    {label:'Goal (65kg)',data:data.map(()=>65),borderColor:'rgba(57,255,20,.4)',borderDash:[5,5],pointRadius:0,tension:0}
  ]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'},min:50,max:70}}}});
}
function buildXPChart(){
  destroyChart('xp');
  const ctx=document.getElementById('chartXP');if(!ctx)return;
  const weeks=[],wXPs=[];
  for(let i=9;i>=0;i--){
    const ws=getWeekLabel(i);const we=new Date(ws);we.setDate(we.getDate()+7);const weStr=we.toISOString().split('T')[0];
    const wXP=xpHistory.filter(e=>e.date>=ws&&e.date<weStr).reduce((s,e)=>s+(e.xp||0),0);
    weeks.push('W-'+i);wXPs.push(wXP);
  }
  charts['xp']=new Chart(ctx,{type:'bar',data:{labels:weeks,datasets:[
    {label:'Weekly XP',data:wXPs,backgroundColor:wXPs.map(x=>x>=500?'rgba(57,255,20,.7)':x>=300?'rgba(0,212,255,.7)':'rgba(255,107,53,.7)'),borderWidth:0},
    {label:'Target (500)',data:weeks.map(()=>500),type:'line',borderColor:'rgba(255,215,0,.5)',borderDash:[5,5],pointRadius:0,backgroundColor:'transparent'}
  ]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'},min:0,max:600}}}});
}
function buildGermanChart(){
  destroyChart('german');
  const ctx=document.getElementById('chartGerman');if(!ctx)return;
  const weeks=[],hrs=[];
  for(let i=9;i>=0;i--){const ws=getWeekLabel(i);weeks.push('W-'+i);hrs.push(((state.germanWeekly||{})[ws]||0));}
  charts['german']=new Chart(ctx,{type:'bar',data:{labels:weeks,datasets:[
    {label:'German Hours',data:hrs,backgroundColor:hrs.map(h=>h>=20?'rgba(57,255,20,.7)':h>=15?'rgba(255,215,0,.7)':'rgba(168,85,247,.5)'),borderWidth:0},
    {label:'Target (20hr)',data:weeks.map(()=>20),type:'line',borderColor:'rgba(255,215,0,.5)',borderDash:[5,5],pointRadius:0,backgroundColor:'transparent'}
  ]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'},min:0,max:25}}}});
}
function buildMLChart(){
  destroyChart('ml');
  const ctx=document.getElementById('chartML');if(!ctx)return;
  const tracks={
    'track-cs229':['cs-1','cs-2','cs-3','cs-4','cs-5','cs-6','cs-7','cs-8','cs-9','cs-10','cs-11','cs-12'],
    'track-dl':['dl-1','dl-2','dl-3','dl-4','dl-5','dl-6','dl-7','dl-8','dl-9','dl-10'],
    'track-nlp':['nlp-1','nlp-2','nlp-3','nlp-4','nlp-5','nlp-6','nlp-7','nlp-8','nlp-9','nlp-10']
  };
  const cs229Done=tracks['track-cs229'].filter(id=>state.curriculum&&state.curriculum[id]).length;
  const dlDone=tracks['track-dl'].filter(id=>state.curriculum&&state.curriculum[id]).length;
  const nlpDone=tracks['track-nlp'].filter(id=>state.curriculum&&state.curriculum[id]).length;
  charts['ml']=new Chart(ctx,{type:'doughnut',data:{labels:['CS229 done','DL done','NLP done','CS229 rem','DL rem','NLP rem'],datasets:[{
    data:[cs229Done,dlDone,nlpDone,12-cs229Done,10-dlDone,10-nlpDone],
    backgroundColor:['rgba(0,212,255,.8)','rgba(168,85,247,.8)','rgba(255,107,53,.8)','rgba(0,212,255,.15)','rgba(168,85,247,.15)','rgba(255,107,53,.15)'],
    borderWidth:1,borderColor:'#0c1117'
  }]},options:{...CHART_DEFAULTS,cutout:'60%',plugins:{legend:{display:true,position:'bottom',labels:{color:'#4a6080',font:{size:9},boxWidth:10}}}}});
}
function buildStrengthChart(){
  destroyChart('strength');
  const ctx=document.getElementById('chartStrength');if(!ctx)return;
  const data=[...strengthHistory].sort((a,b)=>a.date.localeCompare(b.date)).slice(-15);
  const ds=[];
  if(data.some(e=>e.squat))ds.push({label:'Squat',data:data.map(e=>e.squat||null),borderColor:'#ff6b35',tension:.3,pointRadius:2,spanGaps:true});
  if(data.some(e=>e.deadlift))ds.push({label:'Deadlift',data:data.map(e=>e.deadlift||null),borderColor:'#ffd700',tension:.3,pointRadius:2,spanGaps:true});
  if(data.some(e=>e.bench))ds.push({label:'Bench',data:data.map(e=>e.bench||null),borderColor:'#00d4ff',tension:.3,pointRadius:2,spanGaps:true});
  charts['strength']=new Chart(ctx,{type:'line',data:{labels:data.map(e=>e.date.slice(5)),datasets:ds.length?ds:[{label:'No data yet',data:[],borderColor:'#1a2838'}]},options:{...CHART_DEFAULTS,scales:{x:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}},y:{ticks:{color:'#4a6080',font:{size:9}},grid:{color:'#1a2838'}}}}});
}
function buildDayTypeChart(){
  destroyChart('dayType');
  const ctx=document.getElementById('chartDayType');if(!ctx)return;
  const counts={prime:0,core:0,social:0,recovery:0};
  Object.values(state.dayTypeHistory||{}).forEach(t=>{if(counts[t]!==undefined)counts[t]++;});
  charts['dayType']=new Chart(ctx,{type:'doughnut',data:{labels:['🔥 Prime','⚡ Core','🤝 Social','🛌 Recovery'],datasets:[{
    data:[counts.prime,counts.core,counts.social,counts.recovery],
    backgroundColor:['rgba(0,212,255,.8)','rgba(57,255,20,.8)','rgba(255,215,0,.8)','rgba(168,85,247,.8)'],
    borderWidth:2,borderColor:'#0c1117'
  }]},options:{...CHART_DEFAULTS,cutout:'55%',plugins:{legend:{display:true,position:'bottom',labels:{color:'#4a6080',font:{size:10},boxWidth:12}}}}});
}

// ═══════════════════════════════════════════════════════
// NAVIGATION & RESTORE
// ═══════════════════════════════════════════════════════
function switchTab(id,el){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  if(el)el.classList.add('active');
  if(id==='charts')setTimeout(buildCharts,50);
  refreshAll();
}
function restoreTodayState() {
  const today=todayKey();
  const entry=xpHistory.find(e=>e.date===today);
  if(!entry)return;
  const map={
    'xp-gym':entry.gym,'xp-run':entry.run,'xp-mobility':entry.mobility,
    'xp-deepwork':entry.deepwork,'xp-impl':entry.impl,
    'xp-german-daily':entry.germanStudy,
    'xp-protein':entry.protein,'xp-water':entry.water,'xp-calories':entry.calories
  };
  Object.entries(map).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.checked=!!val;});
  const ghEl=document.getElementById('germanHoursToday');if(ghEl&&entry.germanHrs)ghEl.value=entry.germanHrs;
  if(entry.dayType)selectDayType(entry.dayType,document.getElementById('dt-'+entry.dayType));
  updateXP();
}
function refreshAll(){
  updateHeader();renderDashboard();renderXPHistory();renderBodyHistory();
  renderStrengthHistory();renderEngineHistory();renderMLHistory();renderGermanHistory();
  renderRewards();renderLevelTimeline();updateCurriculumBars();renderGermanStats();
  renderWeeklySummary();updateMVSBar();
  const sc=document.getElementById('shieldCount');if(sc)sc.textContent=state.streakShieldsAvailable||0;
}
function updateHeader(){
  const now=new Date();
  document.getElementById('currentDate').textContent=now.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  const day=Math.max(1,Math.floor((now-CAMPAIGN_START)/86400000)+1);
  document.getElementById('campaignDay').textContent='DAY '+Math.min(day,CAMPAIGN_DAYS)+' OF '+CAMPAIGN_DAYS;
  const pct=Math.round((Math.min(day,CAMPAIGN_DAYS)/CAMPAIGN_DAYS)*100);
  const cp=document.getElementById('campaignProgress');
  if(cp)cp.innerHTML=`<span style="font-family:var(--font-mono);font-size:.6rem;color:var(--muted);">${pct}% COMPLETE</span>`;
  const dtl=document.getElementById('todayDateLabel');
  if(dtl)dtl.textContent=now.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}

// ═══════════════════════════════════════════════════════
// RENDER DASHBOARD
// ═══════════════════════════════════════════════════════
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
    document.getElementById('dashWeight').textContent=(lb.weight||'--')+' kg';
    document.getElementById('dashPullup').textContent=(lb.pullupmax||'--')+' reps';
    const pct=lb.weight?Math.min(100,Math.max(0,((lb.weight-55)/(65-55))*100)):0;
    ['bodyBarDash','bwBar'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.width=pct+'%';});
    const bwc=document.getElementById('bw-current');if(bwc)bwc.textContent=lb.weight+' kg';
    const dwp=document.getElementById('dashWeightPct');if(dwp)dwp.textContent=Math.round(pct)+'% to goal';
    const today=todayKey();
    const todayBody=bodyHistory.find(e=>e.date===today&&e.cals);
    ['cal-today','prot-today','carb-today','fat-today'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent='--';});
    if(todayBody){
      const ct=document.getElementById('cal-today');if(ct)ct.textContent=todayBody.cals||'--';
      const pt=document.getElementById('prot-today');if(pt)pt.textContent=todayBody.prot||'--';
      const crt=document.getElementById('carb-today');if(crt)crt.textContent=todayBody.carb||'--';
      const ft=document.getElementById('fat-today');if(ft)ft.textContent=todayBody.fat||'--';
    }
  }
  if(strengthHistory.length){
    const g=(f)=>{const vals=strengthHistory.map(e=>e[f]).filter(v=>v);return vals.length?Math.max(...vals):null;};
    const s={squat:g('squat'),deadlift:g('deadlift'),wpullup:g('wpullup'),pushup:g('pushup'),bench:g('bench'),row:g('row')};
    const ge=id=>document.getElementById(id);
    const fmt=(v,unit)=>v?(v+' '+unit):'--';
    if(ge('dashSquat'))ge('dashSquat').textContent=fmt(s.squat,'kg');
    if(ge('dashDeadlift'))ge('dashDeadlift').textContent=fmt(s.deadlift,'kg');
    if(ge('dashWPullup'))ge('dashWPullup').textContent=s.wpullup?'+'+s.wpullup+' kg':'--';
    if(ge('dashPushup'))ge('dashPushup').textContent=fmt(s.pushup,'reps');
    if(ge('pb-squat'))ge('pb-squat').textContent=fmt(s.squat,'kg');
    if(ge('pb-deadlift'))ge('pb-deadlift').textContent=fmt(s.deadlift,'kg');
    if(ge('pb-wpullup'))ge('pb-wpullup').textContent=s.wpullup?'+'+s.wpullup+' kg':'--';
    if(ge('pb-pushup'))ge('pb-pushup').textContent=fmt(s.pushup,'reps');
    if(ge('pb-bench'))ge('pb-bench').textContent=fmt(s.bench,'kg');
    if(ge('pb-row'))ge('pb-row').textContent=fmt(s.row,'kg');
  }
  if(engineHistory.length){
    const lrhr=engineHistory.filter(e=>e.rhr).slice(-1)[0];
    const crhr=document.getElementById('cur-rhr');if(crhr&&lrhr)crhr.textContent=lrhr.rhr+' bpm';
    const sp=engineHistory.filter(e=>e.sprint);
    const pbs=document.getElementById('pb-sprint');if(sp.length&&pbs)pbs.textContent=Math.min(...sp.map(e=>e.sprint))+'s';
    const fk=engineHistory.filter(e=>e.fiveK);
    const pb5=document.getElementById('pb-5k');if(fk.length&&pb5)pb5.textContent=fk.slice(-1)[0].fiveK;
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
function renderLevelTimeline(){
  const tl=document.getElementById('levelTimeline');if(!tl)return;
  tl.innerHTML=LEVELS.map(l=>`<div class="lnode"><div class="ldot ${l.num<state.currentLevel?'done':l.num===state.currentLevel?'current':''}">${l.num<state.currentLevel?'✓':l.num}</div><div class="lname">${l.name}</div></div>`).join('');
}

// ═══════════════════════════════════════════════════════
// EDIT MODAL ENGINE
// ═══════════════════════════════════════════════════════
let _editSaveFn=null;
function openEditModal(title,date,fields,accentClass,saveFn) {
  const modal=document.getElementById('editModal');
  const box=modal.querySelector('.edit-box');
  document.getElementById('editModalTitle').textContent=title;
  document.getElementById('editModalDate').textContent=date;
  box.className='edit-box';
  if(accentClass)box.classList.add(accentClass);
  const body=document.getElementById('editModalBody');
  body.innerHTML=fields.map(f=>`
    <div class="f ${f.full?'full':''}">
      <label>${f.label}</label>
      ${f.type==='select'
        ?`<select id="em-${f.key}">${f.options.map(o=>`<option value="${o}" ${f.value==o?'selected':''}>${o}</option>`).join('')}</select>`
        :`<input type="${f.type||'text'}" id="em-${f.key}" value="${f.value||''}" placeholder="${f.placeholder||''}" step="${f.step||'any'}">`
      }
    </div>`).join('');
  const saveBtn=document.getElementById('editModalSaveBtn');
  saveBtn.className='btn btn-sm '+(accentClass?accentClass.replace('accent-','btn-'):'');
  _editSaveFn=saveFn;
  saveBtn.onclick=()=>_editSaveFn();
  modal.style.display='flex';
  requestAnimationFrame(()=>modal.classList.add('open'));
}
function closeEditModal() {
  const modal=document.getElementById('editModal');
  modal.classList.remove('open');
  setTimeout(()=>{modal.style.display='none';_editSaveFn=null;},260);
}
function emVal(key){const el=document.getElementById('em-'+key);return el?el.value:'';}
function emFloat(key){return parseFloat(emVal(key))||null;}
function emInt(key){return parseInt(emVal(key))||null;}

// ── ACTION BUTTONS HELPER ──
function actionBtns(date,editFn,deleteFn) {
  if(!isKeith())return '--';
  return `<button onclick="${editFn}('${date}')" class="tbl-edit-btn">EDIT</button>`
       +`<button onclick="${deleteFn}('${date}')" class="tbl-del-btn">DEL</button>`;
}

// ═══════════════════════════════════════════════════════
// RENDER HISTORIES
// ═══════════════════════════════════════════════════════
function renderXPHistory(){
  const DT_COLORS={prime:'var(--accent)',core:'var(--green)',social:'var(--gold)',recovery:'var(--purple)'};
  const rows=[...xpHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,14).map(e=>[
    {val:e.date},
    {val:`<span style="color:${DT_COLORS[e.dayType]||'var(--muted)'};">${(e.dayType||'--').toUpperCase()}</span>`},
    {val:e.xp+' XP',cls:e.xp>=80?'val-good':e.xp>=50?'':'val-warn'},
    {val:[e.gym?'Gym':'',e.run?'Run':'',e.mobility?'Mob':''].filter(Boolean).join(', ')||'--'},
    {val:[e.deepwork?'90min':'',e.impl?'Impl':''].filter(Boolean).join(', ')||'--'},
    {val:e.germanHrs?e.germanHrs+'hr':'--'},
    {val:actionBtns(e.date,'editXPEntry','deleteXPEntry')},
  ]);
  renderTable('xpHistoryBody',rows,7);
}
function renderBodyHistory(){
  const rows=[...bodyHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10).map(e=>[
    {val:e.date},{val:e.weight?e.weight+' kg':'--'},{val:e.waist?e.waist+' cm':'--'},
    {val:e.shoulders?e.shoulders+' cm':'--'},{val:e.pullupmax||'--'},
    {val:e.cals||'--'},{val:e.prot?e.prot+'g':'--'},
    {val:actionBtns(e.date,'editBodyEntry','deleteBodyEntry')},
  ]);
  renderTable('bodyHistoryBody',rows,8);
}
function renderStrengthHistory(){
  const rows=[...strengthHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10).map(e=>[
    {val:e.date},{val:e.squat?e.squat+'kg':'--'},{val:e.deadlift?e.deadlift+'kg':'--'},
    {val:e.wpullup?'+'+e.wpullup+'kg':'--'},{val:e.pushup?e.pushup+' reps':'--'},
    {val:e.bench?e.bench+'kg':'--'},{val:e.row?e.row+'kg':'--'},
    {val:actionBtns(e.date,'editStrengthEntry','deleteStrengthEntry')},
  ]);
  renderTable('strengthHistoryBody',rows,8);
}
function renderEngineHistory(){
  const TYPE_LABELS={run2k:'2K',run5k:'5K',run10k:'10K',run15k:'15K',run20k:'20K',sprint:'Sprints'};
  const rows=[...engineHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,12).map(e=>[
    {val:e.date},{val:TYPE_LABELS[e.type]||e.type||'--'},
    {val:e.twoK||e.fiveK||e.tenK||e.fifteenK||e.twentyK||(e.sprint?e.sprint+'s '+e.sprintDist:'--')},
    {val:e.rhr?e.rhr+' bpm':'--'},{val:e.notes||'--'},
    {val:actionBtns(e.date,'editEngineEntry','deleteEngineEntry')},
  ]);
  renderTable('engineHistoryBody',rows,6);
  const all2K=engineHistory.filter(e=>e.twoK).map(e=>e.twoK).sort();
  const allFiveK=engineHistory.filter(e=>e.fiveK).map(e=>e.fiveK).sort();
  const allTenK=engineHistory.filter(e=>e.tenK).map(e=>e.tenK).sort();
  const allSprint=engineHistory.filter(e=>e.sprint).map(e=>e.sprint).sort((a,b)=>a-b);
  const allRHR=engineHistory.filter(e=>e.rhr).map(e=>e.rhr).sort((a,b)=>a-b);
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('pb-2k',all2K[0]||'--');set('pb-5k',allFiveK[0]||'--');
  set('pb-10k',allTenK[0]||'--');set('pb-sprint',allSprint[0]?allSprint[0]+'s':'--');
  set('cur-rhr',allRHR[0]?allRHR[0]+' bpm':'-- bpm');
}
function renderMLHistory(){
  const rows=[...mlHistory].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10).map(e=>[
    {val:e.date},{val:e.modules||0,cls:'val-purple'},
    {val:(e.lectures||0)+'/'+(e.lecturesPlanned||21),cls:'val-purple'},
    {val:(e.lectures231n||0)+'/'+(e.lectures231nPlanned||18),cls:'val-purple'},
    {val:e.dlnlp||0,cls:'val-purple'},{val:e.projects||0},{val:e.commits||0},
    {val:actionBtns(e.date,'editMLEntry','deleteMLEntry')},
  ]);
  renderTable('mlHistoryBody',rows,8);
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
    {val:e.date},{val:(ICONS[e.method]||'')+' '+(e.method||'--')},
    {val:'+'+e.hours+'hr',cls:'val-gold'},{val:e.topic||'--'},
    {val:e.words?e.words+' words':'--'},{val:e.min?e.min+' min':'--'},
    {val:e.weekTotal?e.weekTotal.toFixed(1)+'hr':'--'},
    {val:actionBtns(e.date,'editGermanEntry','deleteGermanEntry')},
  ]);
  renderTable('germanHistoryBody',rows,8);
}

// ═══════════════════════════════════════════════════════
// XP EDIT / DELETE
// ═══════════════════════════════════════════════════════
function editXPEntry(date) {
  if(!isKeith())return;
  const entry=xpHistory.find(e=>e.date===date);if(!entry)return;
  openEditModal('EDIT XP ENTRY',date,[
    {key:'xp',label:'XP Earned',type:'number',value:entry.xp,placeholder:'0-175',step:'1'},
    {key:'daytype',label:'Day Type',type:'select',value:entry.dayType,options:['prime','core','social','recovery']},
    {key:'ghrs',label:'German Hrs',type:'number',value:entry.germanHrs||0,placeholder:'0',step:'0.5'},
    {key:'hcscore',label:'HC Score (0-7)',type:'number',value:entry.hcScore||0,placeholder:'0',step:'1'},
  ],'',async()=>{
    const parsed=parseInt(emVal('xp'));
    if(isNaN(parsed)||parsed<0||parsed>175){notify('Invalid XP - must be 0-175','var(--red)');return;}
    state.totalXP=Math.max(0,state.totalXP-entry.xp+parsed);
    entry.xp=parsed;entry.dayType=emVal('daytype');
    entry.germanHrs=parseFloat(emVal('ghrs'))||0;entry.hcScore=parseInt(emVal('hcscore'))||0;
    await supaFetch('PATCH',`rebuilder_logs?type=eq.xp_logs&logged_at=eq.${date}`,{data:entry});
    await saveState();notify('✏ XP entry updated','var(--accent)');
    closeEditModal();refreshAll();
  });
}
async function deleteXPEntry(date) {
  if(!isKeith())return;
  if(!confirm('Delete XP entry for '+date+'?'))return;
  const idx=xpHistory.findIndex(e=>e.date===date);if(idx<0)return;
  state.totalXP=Math.max(0,state.totalXP-(xpHistory[idx].xp||0));
  xpHistory.splice(idx,1);
  await supaFetch('DELETE',`rebuilder_logs?type=eq.xp_logs&logged_at=eq.${date}`);
  await saveState();notify('🗑 XP entry deleted','var(--red)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// BODY EDIT / DELETE
// ═══════════════════════════════════════════════════════
function editBodyEntry(date) {
  if(!isKeith())return;
  const entry=bodyHistory.find(e=>e.date===date);if(!entry)return;
  openEditModal('EDIT BODY ENTRY',date,[
    {key:'weight',label:'Bodyweight (kg)',type:'number',value:entry.weight||'',placeholder:'e.g. 63.5',step:'0.1'},
    {key:'waist',label:'Waist (cm)',type:'number',value:entry.waist||'',placeholder:'e.g. 78',step:'0.5'},
    {key:'shoulders',label:'Shoulders (cm)',type:'number',value:entry.shoulders||'',placeholder:'e.g. 112',step:'0.5'},
    {key:'pullupmax',label:'Pull-up Max (reps)',type:'number',value:entry.pullupmax||'',placeholder:'e.g. 10',step:'1'},
    {key:'cals',label:'Calories',type:'number',value:entry.cals||'',placeholder:'e.g. 2800',step:'1'},
    {key:'prot',label:'Protein (g)',type:'number',value:entry.prot||'',placeholder:'e.g. 80',step:'1'},
  ],'accent-cyan',async()=>{
    entry.weight=emFloat('weight')||entry.weight;entry.waist=emFloat('waist')||entry.waist;
    entry.shoulders=emFloat('shoulders')||entry.shoulders;entry.pullupmax=emInt('pullupmax')||entry.pullupmax;
    entry.cals=emInt('cals')||entry.cals;entry.prot=emInt('prot')||entry.prot;
    await supaFetch('PATCH',`rebuilder_logs?type=eq.body_logs&logged_at=eq.${date}`,{data:entry});
    await saveState();notify('✏ Body entry updated','var(--accent)');
    closeEditModal();refreshAll();updateCharts();
  });
}
async function deleteBodyEntry(date) {
  if(!isKeith())return;
  if(!confirm('Delete body entry for '+date+'?'))return;
  const idx=bodyHistory.findIndex(e=>e.date===date);if(idx<0)return;
  bodyHistory.splice(idx,1);
  await supaFetch('DELETE',`rebuilder_logs?type=eq.body_logs&logged_at=eq.${date}`);
  notify('🗑 Body entry deleted','var(--red)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// STRENGTH EDIT / DELETE
// ═══════════════════════════════════════════════════════
function editStrengthEntry(date) {
  if(!isKeith())return;
  const entry=strengthHistory.find(e=>e.date===date);if(!entry)return;
  openEditModal('EDIT STRENGTH',date,[
    {key:'squat',label:'Squat (kg)',type:'number',value:entry.squat||'',placeholder:'e.g. 80',step:'2.5'},
    {key:'deadlift',label:'Deadlift (kg)',type:'number',value:entry.deadlift||'',placeholder:'e.g. 100',step:'2.5'},
    {key:'wpullup',label:'Weighted Pull-up (+kg)',type:'number',value:entry.wpullup||'',placeholder:'e.g. 15',step:'2.5'},
    {key:'pushup',label:'Push-ups Max',type:'number',value:entry.pushup||'',placeholder:'e.g. 35',step:'1'},
    {key:'bench',label:'Bench Press (kg)',type:'number',value:entry.bench||'',placeholder:'e.g. 60',step:'2.5'},
    {key:'row',label:'Barbell Row (kg)',type:'number',value:entry.row||'',placeholder:'e.g. 70',step:'2.5'},
  ],'accent-orange',async()=>{
    if(emVal('squat'))entry.squat=emFloat('squat');
    if(emVal('deadlift'))entry.deadlift=emFloat('deadlift');
    if(emVal('wpullup'))entry.wpullup=emFloat('wpullup');
    if(emVal('pushup'))entry.pushup=emInt('pushup');
    if(emVal('bench'))entry.bench=emFloat('bench');
    if(emVal('row'))entry.row=emFloat('row');
    await supaFetch('PATCH',`rebuilder_logs?type=eq.strength_logs&logged_at=eq.${date}`,{data:entry});
    await saveState();notify('✏ Strength entry updated','var(--accent2)');
    closeEditModal();refreshAll();updateCharts();
  });
}
async function deleteStrengthEntry(date) {
  if(!isKeith())return;
  if(!confirm('Delete strength entry for '+date+'?'))return;
  const idx=strengthHistory.findIndex(e=>e.date===date);if(idx<0)return;
  strengthHistory.splice(idx,1);
  await supaFetch('DELETE',`rebuilder_logs?type=eq.strength_logs&logged_at=eq.${date}`);
  notify('🗑 Strength entry deleted','var(--red)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// ENGINE EDIT / DELETE
// ═══════════════════════════════════════════════════════
function editEngineEntry(date) {
  if(!isKeith())return;
  const entry=engineHistory.find(e=>e.date===date);if(!entry)return;
  const timeKey=entry.twoK?'twoK':entry.fiveK?'fiveK':entry.tenK?'tenK':entry.fifteenK?'fifteenK':entry.twentyK?'twentyK':'fiveK';
  const timeLabel={twoK:'2K Time (mm:ss)',fiveK:'5K Time (mm:ss)',tenK:'10K Time (mm:ss)',fifteenK:'15K Time (mm:ss)',twentyK:'20K Time (mm:ss)'}[timeKey];
  openEditModal('EDIT CARDIO',date,[
    {key:'time',label:timeLabel,type:'text',value:entry[timeKey]||'',placeholder:'mm:ss'},
    {key:'rhr',label:'Resting HR (bpm)',type:'number',value:entry.rhr||'',placeholder:'e.g. 58',step:'1'},
    {key:'notes',label:'Notes',full:true,type:'text',value:entry.notes||'',placeholder:'e.g. Felt strong...'},
  ],'accent-purple',async()=>{
    if(emVal('time'))entry[timeKey]=emVal('time');
    if(emVal('rhr'))entry.rhr=emInt('rhr');
    entry.notes=emVal('notes');
    await supaFetch('PATCH',`rebuilder_logs?type=eq.engine_logs&logged_at=eq.${date}`,{data:entry});
    await saveState();notify('✏ Cardio entry updated','var(--purple)');
    closeEditModal();refreshAll();
  });
}
async function deleteEngineEntry(date) {
  if(!isKeith())return;
  if(!confirm('Delete cardio entry for '+date+'?'))return;
  const idx=engineHistory.findIndex(e=>e.date===date);if(idx<0)return;
  engineHistory.splice(idx,1);
  await supaFetch('DELETE',`rebuilder_logs?type=eq.engine_logs&logged_at=eq.${date}`);
  notify('🗑 Cardio entry deleted','var(--red)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// ML EDIT / DELETE
// ═══════════════════════════════════════════════════════
function editMLEntry(date) {
  if(!isKeith())return;
  const entry=mlHistory.find(e=>e.date===date);if(!entry)return;
  openEditModal('EDIT ML ENTRY',date,[
    {key:'lectures',label:'CS229 Lectures Done',type:'number',value:entry.lectures||0,placeholder:'0',step:'1'},
    {key:'lectures231n',label:'CS231N Lectures Done',type:'number',value:entry.lectures231n||0,placeholder:'0',step:'1'},
    {key:'modules',label:'Python Modules Done',type:'number',value:entry.modules||0,placeholder:'0',step:'1'},
    {key:'projects',label:'Projects Built',type:'number',value:entry.projects||0,placeholder:'0',step:'1'},
    {key:'commits',label:'GitHub Commits',type:'number',value:entry.commits||0,placeholder:'0',step:'1'},
    {key:'dlnlp',label:'DL/NLP Resources Done',type:'number',value:entry.dlnlp||0,placeholder:'0',step:'1'},
  ],'accent-purple',async()=>{
    entry.lectures=emInt('lectures')??entry.lectures;
    entry.lectures231n=emInt('lectures231n')??entry.lectures231n;
    entry.modules=emInt('modules')??entry.modules;
    entry.projects=emInt('projects')??entry.projects;
    entry.commits=emInt('commits')??entry.commits;
    entry.dlnlp=emInt('dlnlp')??entry.dlnlp;
    const latest=[...mlHistory].sort((a,b)=>b.date.localeCompare(a.date))[0];
    if(latest&&latest.date===date)state.mlCurrent={...state.mlCurrent,...entry};
    await supaFetch('PATCH',`rebuilder_logs?type=eq.ml_logs&logged_at=eq.${date}`,{data:entry});
    await saveState();notify('✏ ML entry updated','var(--purple)');
    closeEditModal();refreshAll();updateCharts();
  });
}
async function deleteMLEntry(date) {
  if(!isKeith())return;
  if(!confirm('Delete ML entry for '+date+'?'))return;
  const idx=mlHistory.findIndex(e=>e.date===date);if(idx<0)return;
  mlHistory.splice(idx,1);
  await supaFetch('DELETE',`rebuilder_logs?type=eq.ml_logs&logged_at=eq.${date}`);
  notify('🗑 ML entry deleted','var(--red)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// GERMAN EDIT / DELETE
// ═══════════════════════════════════════════════════════
function editGermanEntry(date) {
  if(!isKeith())return;
  const entry=germanHistory.find(e=>e.date===date);if(!entry)return;
  openEditModal('EDIT GERMAN SESSION',date,[
    {key:'hours',label:'Hours',type:'number',value:entry.hours||0,placeholder:'0',step:'0.5'},
    {key:'words',label:'New Words',type:'number',value:entry.words||0,placeholder:'0',step:'1'},
    {key:'min',label:'Speak/Listen min',type:'number',value:entry.min||0,placeholder:'0',step:'5'},
    {key:'wwords',label:'Writing Words',type:'number',value:entry.wWords||0,placeholder:'0',step:'10'},
    {key:'topic',label:'Topic Covered',type:'text',value:entry.topic||'',placeholder:'e.g. Konjunktiv II',full:true},
  ],'accent-gold',async()=>{
    const oldHrs=entry.hours||0;
    const newHrs=parseFloat(emVal('hours'))||0;
    const diff=newHrs-oldHrs;
    entry.hours=newHrs;
    entry.words=emInt('words')??entry.words;
    entry.min=emInt('min')??entry.min;
    entry.wWords=emInt('wwords')??entry.wWords;
    entry.topic=emVal('topic');
    state.germanTotalHours=Math.max(0,(state.germanTotalHours||0)+diff);
    if(state.germanMethodHours&&entry.method)
      state.germanMethodHours[entry.method]=Math.max(0,(state.germanMethodHours[entry.method]||0)+diff);
    const ws=getWeekStart();
    if(entry.date>=ws&&state.germanWeekly)
      state.germanWeekly[ws]=Math.max(0,(state.germanWeekly[ws]||0)+diff);
    await supaFetch('PATCH',`rebuilder_logs?type=eq.german_logs&logged_at=eq.${date}`,{data:entry});
    await saveState();notify('✏ German entry updated','var(--gold)');
    closeEditModal();refreshAll();updateCharts();
  });
}
async function deleteGermanEntry(date) {
  if(!isKeith())return;
  if(!confirm('Delete German session for '+date+'?'))return;
  const idx=germanHistory.findIndex(e=>e.date===date);if(idx<0)return;
  const entry=germanHistory[idx];
  state.germanTotalHours=Math.max(0,(state.germanTotalHours||0)-(entry.hours||0));
  if(state.germanMethodHours&&entry.method)
    state.germanMethodHours[entry.method]=Math.max(0,(state.germanMethodHours[entry.method]||0)-(entry.hours||0));
  const ws=getWeekStart();
  if(state.germanWeekly&&state.germanWeekly[ws])
    state.germanWeekly[ws]=Math.max(0,state.germanWeekly[ws]-(entry.hours||0));
  germanHistory.splice(idx,1);
  await supaFetch('DELETE',`rebuilder_logs?type=eq.german_logs&logged_at=eq.${date}`);
  await saveState();notify('🗑 German entry deleted','var(--red)');refreshAll();
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
async function init(){
  updateHeader();
  setDailyVerse();
  ['ef-5k','ef-10k','ef-15k','ef-20k','ef-sprint','ef-sprint-time'].forEach(id=>{
    const e=document.getElementById(id);if(e)e.style.display='none';
  });
  await loadAllData();
  setInterval(updateHeader,60000);
}
