// ═══════════════════════════════════════════════════════
// THE REBUILDER — script.js
// ═══════════════════════════════════════════════════════

// ── CONFIG ──
const HARDCODED_URL = "https://bwuapxgdsfcfwhdxffur.supabase.co";
const HARDCODED_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWFweGdkc2ZjZndoZHhmZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTM1NzQsImV4cCI6MjA4Nzk4OTU3NH0.xRIbqrNAG8-XTUg5cwkb7LuKL6EG4Sw_RHoHLoaUEwc";
const KEITH_PASSWORD = 'jesusismyrock';

// ── CONSTANTS ──
const CAMPAIGN_START = new Date('2026-03-10');
const CAMPAIGN_END   = new Date('2026-09-01');
const CAMPAIGN_DAYS  = 176;

const LEVELS = [
  {num:1,  name:"Awakened",             rank:"—",   weeks:"1–2",   color:"#6b7280",  desc:"You've just started the journey"},
  {num:2,  name:"E-Rank Hunter",        rank:"E",   weeks:"3–4",   color:"#9ca3af"},
  {num:3,  name:"D-Rank Hunter",        rank:"D",   weeks:"5–6",   color:"#22c55e"},
  {num:4,  name:"C-Rank Hunter",        rank:"C",   weeks:"7–8",   color:"#38bdf8"},
  {num:5,  name:"B-Rank Hunter",        rank:"B",   weeks:"9–10",  color:"#818cf8"},
  {num:6,  name:"A-Rank Hunter",        rank:"A",   weeks:"11–12", color:"#f59e0b"},
  {num:7,  name:"Elite Hunter",         rank:"A+",  weeks:"13–14", color:"#fb923c"},
  {num:8,  name:"S-Rank Hunter",        rank:"S",   weeks:"15–16", color:"#ff4757"},
  {num:9,  name:"National Level Hunter",rank:"S+",  weeks:"17–18", color:"#c026d3"},
  {num:10, name:"Monarch's Vessel",     rank:"SS",  weeks:"19–20", color:"#a78bfa"},
  {num:11, name:"Monarch Awakening",    rank:"SS+", weeks:"21–22", color:"#00e5ff"},
  {num:12, name:"Full Monarch",         rank:"∞",   weeks:"23–24", color:"#fbbf24"},
  {num:13, name:"Shadow King",          rank:"∞∞",  weeks:"25–26", color:"#fbbf24"},
];

const WEEKLY_REWARDS = [
  {icon:"📓", name:"New Notebook",          req:"Hit weekly target", desc:"Buy a notebook for ideas or planning"},
  {icon:"💻", name:"UI Side Project Hour",  req:"Hit weekly target", desc:"1 hour improving your web app UI for fun"},
  {icon:"🚶", name:"Evening Walk",          req:"Hit weekly target", desc:"Take a long evening walk somewhere nice"},
  {icon:"🖊️", name:"Quality Pen",           req:"Hit weekly target", desc:"Buy a high-quality pen"},
  {icon:"📊", name:"Print Progress Stats",  req:"Hit weekly target", desc:"Print your stats and review them properly"},
  {icon:"🧹", name:"Workspace Reset",       req:"Hit weekly target", desc:"Rearrange or deep-clean your workspace"},
  {icon:"⚽", name:"New Football Drill",    req:"Hit weekly target", desc:"Try a new football drill or training style"},
  {icon:"🧠", name:"ML Reading Hour",       req:"Hit weekly target", desc:"1 hour reading about AI/ML outside curriculum"},
  {icon:"🏟️", name:"Casual Football",      req:"Hit weekly target", desc:"Train football casually with friends"},
  {icon:"🖱️", name:"Small Desk Upgrade",   req:"Hit weekly target", desc:"Mousepad, cable organizer, or stand"},
];

const BIWEEKLY_REWARDS = [
  {icon:"👕", name:"Gym T-Shirt or Shorts", req:"Level up (every 2 weeks)", desc:"Buy a new gym t-shirt or training shorts"},
  {icon:"🇩🇪", name:"German Learning Book", req:"Level up",                  desc:"German reader or grammar book"},
  {icon:"📘", name:"ML / Programming Book", req:"Level up",                  desc:"Technical book of your choice"},
  {icon:"🖥️", name:"Desk Setup Upgrade",   req:"Level up",                  desc:"Upgrade something on your desk"},
  {icon:"🍽️", name:"Good Restaurant Meal", req:"Level up",                  desc:"Go eat a proper meal somewhere good"},
  {icon:"✂️", name:"Haircut",              req:"Level up",                  desc:"Get a fresh cut"},
  {icon:"🍵", name:"Water Bottle / Thermos",req:"Level up",                 desc:"Buy a nice bottle or thermos"},
  {icon:"⚽", name:"New Football",          req:"Level up",                  desc:"Buy a new football"},
  {icon:"📋", name:"Whiteboard",           req:"Level up",                  desc:"A whiteboard for planning and ideas"},
  {icon:"💡", name:"Study Lamp Upgrade",   req:"Level up",                  desc:"Better desk lighting"},
];

const MONTHLY_REWARDS = [
  {icon:"👟", name:"Training Shoes",        req:"Month 1 — hit most targets",  desc:"Buy a new pair of running or training shoes"},
  {icon:"🎧", name:"Headphone Upgrade",     req:"Month 2 — hit most targets",  desc:"Upgrade your headphones"},
  {icon:"⌨️", name:"Coding Setup Upgrade", req:"Month 3 — hit most targets",  desc:"Something in your coding environment"},
  {icon:"🗺️", name:"One-Day Trip",          req:"Month 4 — hit most targets",  desc:"Take a one-day trip somewhere interesting"},
  {icon:"🧥", name:"Quality Jacket/Hoodie", req:"Month 5 — hit most targets", desc:"A high-quality jacket or hoodie"},
  {icon:"🏋️", name:"Weighted Vest / Gear",  req:"Month 6 — hit most targets", desc:"Weighted vest or new training equipment"},
];

const PERFORMANCE_REWARDS = [
  {icon:"🦺", name:"Weighted Vest",         req:"15 pull-ups achieved",          goal:"pullup15"},
  {icon:"👟", name:"Running Shoes",          req:"5K under 23 minutes",           goal:"sub23_5k"},
  {icon:"📸", name:"Transformation Photos",  req:"Reach 62 kg bodyweight",        goal:"weight62"},
  {icon:"🚀", name:"Publish ML Project",     req:"First ML project shipped",      goal:"ml_shipped"},
  {icon:"🍽️", name:"Restaurant Celebration", req:"B1 German grammar complete",   goal:"b1_done"},
  {icon:"🏷️", name:"Rename Level Title",    req:"30-day log streak",             goal:"streak30"},
  {icon:"🛠️", name:"Workspace Upgrade",     req:"4 weeks perfect consistency",   goal:"4wk_perfect"},
];

const IDENTITY_REWARDS = [
  {icon:"🏷️", name:"Rename Character Level", desc:"Customise your level title in the tracker"},
  {icon:"🎖️", name:"Custom Dashboard Badge", desc:"Add a custom badge to your dashboard"},
  {icon:"📌", name:"Print Progress Chart",    desc:"Print a chart and pin it on your wall"},
  {icon:"📱", name:"Phone Wallpaper Update",  desc:"Change your wallpaper to your future self"},
  {icon:"📝", name:"Monthly Reflection",      desc:"Write a short reflection on what improved"},
  {icon:"🎥", name:"Progress Video",          desc:"Record a short video talking about progress"},
  {icon:"📷", name:"Before vs Now Snapshot",  desc:"Create a comparison snapshot"},
];

// SECRET MISSIONS
const SECRET_MISSIONS = [
  // ── GENERAL CAMPAIGN ──
  {id:'sm1',  emoji:'🌅', title:'EARLY BIRD',         desc:'Log an XP entry before 7am',                                    xp:25,  type:'daily',   secret:true,  category:'campaign'},
  {id:'sm2',  emoji:'🔥', title:'PERFECT WEEK',       desc:'Log every day Mon–Sun (PRIME or CORE day type)',                 xp:100, type:'weekly',  secret:false, category:'campaign'},
  {id:'sm3',  emoji:'💪', title:'DOUBLE TRAIN',       desc:'Log both Gym AND Run on the same day',                          xp:20,  type:'daily',   secret:true,  category:'campaign'},
  {id:'sm6',  emoji:'🥗', title:'CLEAN WEEK',         desc:'Hit protein target (80g+) every day this week',                 xp:40,  type:'weekly',  secret:false, category:'nutrition'},
  {id:'sm9',  emoji:'🛌', title:'NIGHT OWL',          desc:'Log an XP entry after 11pm — the grind never sleeps',           xp:10,  type:'daily',   secret:true,  category:'campaign'},
  {id:'sm10', emoji:'⚖️', title:'CONSISTENCY KING',   desc:'Log training entries 14 consecutive active days',               xp:80,  type:'streak',  secret:false, category:'campaign'},
  {id:'sm14', emoji:'🎯', title:'TRIPLE THREAT',      desc:'Hit Training + ML study + German all in one day',               xp:30,  type:'daily',   secret:false, category:'campaign'},
  {id:'sm15', emoji:'🌟', title:'WEEK DOMINATOR',     desc:'Score 600+ XP in a single week',                               xp:60,  type:'weekly',  secret:true,  category:'campaign'},

  // ── STRENGTH MILESTONES ──
  {id:'sm13', emoji:'🏋️', title:'CENTURY SQUAT',      desc:'Squat 100 kg for the first time — the ultimate milestone',      xp:75,  type:'one-off', secret:false, category:'strength', lift:'squat',    target:100},
  {id:'sm20', emoji:'☠️', title:'DEATH LIFT 130',     desc:'Pull 130 kg deadlift off the floor — beast mode unlocked',      xp:75,  type:'one-off', secret:false, category:'strength', lift:'deadlift', target:130},
  {id:'sm21', emoji:'🦅', title:'IRON CROSS',         desc:'Weighted pull-up with +25 kg added — elite level',              xp:60,  type:'one-off', secret:true,  category:'strength', lift:'wpullup',  target:25},
  {id:'sm22', emoji:'💥', title:'40-REP WALL',        desc:'Knock out 40 consecutive push-ups in a single set',             xp:35,  type:'one-off', secret:false, category:'strength', lift:'pushup',   target:40},
  {id:'sm23', emoji:'🏗️', title:'BIG BENCH',          desc:'Bench press your bodyweight (aim: 65 kg)',                      xp:50,  type:'one-off', secret:false, category:'strength', lift:'bench',    target:65},
  {id:'sm24', emoji:'🔄', title:'ROW WARRIOR',        desc:'Barbell row 80 kg — back of steel',                             xp:40,  type:'one-off', secret:true,  category:'strength', lift:'row',      target:80},
  {id:'sm25', emoji:'📈', title:'5 LIFT STREAK',      desc:'Log a strength session 5 weeks in a row',                       xp:50,  type:'streak',  secret:true,  category:'strength'},
  {id:'sm11', emoji:'🔺', title:'NEW PB',             desc:'Set a new Personal Best in any lift during a session',          xp:20,  type:'event',   secret:true,  category:'strength'},

  // ── CARDIO / ENGINE ──
  {id:'sm7',  emoji:'🏃', title:'FIRST 5K',           desc:'Log your first 5K run — the journey begins',                    xp:30,  type:'one-off', secret:false, category:'cardio'},
  {id:'sm26', emoji:'⚡', title:'SUB-22 5K',          desc:'Run 5K under 22 minutes — elite pace',                          xp:65,  type:'one-off', secret:false, category:'cardio'},
  {id:'sm27', emoji:'🌊', title:'10K UNLOCK',         desc:'Log your first 10K run — double the distance, double the glory',xp:45,  type:'one-off', secret:false, category:'cardio'},
  {id:'sm28', emoji:'🚀', title:'SPRINT MACHINE',     desc:'Log sprint intervals 3 sessions in a single week',             xp:35,  type:'weekly',  secret:true,  category:'cardio'},
  {id:'sm29', emoji:'❤️', title:'RESTING BEAST',      desc:'Log a resting heart rate below 55 bpm',                        xp:40,  type:'one-off', secret:true,  category:'cardio'},

  // ── ML / LEARNING ──
  {id:'sm4',  emoji:'🧠', title:'ML MARATHON',        desc:'Log ML deep work 5 consecutive active days',                    xp:50,  type:'streak',  secret:true,  category:'ml'},
  {id:'sm8',  emoji:'📚', title:'LECTURE SPRINT',     desc:'Complete 3 CS229 lectures in a single week',                   xp:40,  type:'weekly',  secret:true,  category:'ml'},
  {id:'sm30', emoji:'🔬', title:'CS229 HALFWAY',      desc:'Complete 10+ CS229 lectures — halfway through the gauntlet',   xp:55,  type:'one-off', secret:false, category:'ml'},
  {id:'sm31', emoji:'👁️', title:'CS231N COMPLETE',    desc:'Finish all 18 CS231N lectures — vision conquered',             xp:80,  type:'one-off', secret:false, category:'ml'},
  {id:'sm32', emoji:'🚢', title:'SHIP IT',            desc:'Complete and deploy your first ML project to production',       xp:70,  type:'one-off', secret:false, category:'ml'},
  {id:'sm33', emoji:'🔥', title:'COMMIT STREAK',      desc:'Hit 5+ GitHub commits in a single week',                       xp:30,  type:'weekly',  secret:true,  category:'ml'},

  // ── GERMAN ──
  {id:'sm5',  emoji:'🇩🇪', title:'GERMAN BINGE',      desc:'Log 4+ German hours in a single day — immersion mode',          xp:30,  type:'daily',   secret:true,  category:'german'},
  {id:'sm12', emoji:'📝', title:'GERMAN ESSAY',       desc:'Write 150+ German words in one session',                        xp:35,  type:'one-off', secret:false, category:'german'},
  {id:'sm34', emoji:'🗣️', title:'SPEAK UP',           desc:'Log a speaking session of 30+ minutes in German',               xp:30,  type:'one-off', secret:true,  category:'german'},
  {id:'sm35', emoji:'🎧', title:'PODCAST ADDICT',     desc:'Log 3 German podcast sessions in a week',                       xp:25,  type:'weekly',  secret:true,  category:'german'},
  {id:'sm36', emoji:'🏅', title:'B1 ACHIEVED',        desc:'Check off all B1 grammar milestones — language is power',       xp:100, type:'one-off', secret:false, category:'german'},
  {id:'sm37', emoji:'🥇', title:'100 HOURS',          desc:'Accumulate 100 total German study hours — fluency incoming',    xp:100, type:'one-off', secret:false, category:'german'},
];

const DAILY_VERSES = [
  '"I can do all things through Christ who strengthens me." — Phil 4:13',
  '"Be strong and courageous. Do not be afraid." — Josh 1:9',
  '"Trust in the Lord with all your heart." — Prov 3:5',
  '"Commit your work to the Lord, and your plans will be established." — Prov 16:3',
  '"The Lord is my strength and my shield." — Psalm 28:7',
  '"Let us not grow weary of doing good." — Gal 6:9',
  '"Whatever you do, work heartily, as for the Lord." — Col 3:23',
  '"With God all things are possible." — Matt 19:26',
  '"He gives power to the faint, and strength to those who have none." — Isa 40:29',
  '"As iron sharpens iron, so one person sharpens another." — Prov 27:17',
  '"For God gave us a spirit not of fear but of power and love and self-control." — 2 Tim 1:7',
  '"Your word is a lamp to my feet and a light to my path." — Psalm 119:105',
  '"Be transformed by the renewal of your mind." — Rom 12:2',
  '"Seek first the kingdom of God and His righteousness." — Matt 6:33',
  '"The righteous shall live by faith." — Rom 1:17',
];

// ── AUTH ──
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
  screen.style.opacity = '0';
  screen.style.transition = 'opacity .5s';
  setTimeout(() => {
    screen.style.display = 'none';
    applyUserRole(role);
    init();
  }, 500);
}

function applyUserRole(role) {
  const badge = document.getElementById('userBadge');
  const sidebarUser = document.getElementById('sidebarUser');
  const mobileUser = document.getElementById('mobileUser');
  const logoutBtn = document.getElementById('logoutBtn');
  const isK = role === 'keith';
  if (badge) { badge.textContent = isK ? '⚡ KEITH' : '👁 GUEST'; badge.style.borderColor = isK ? 'var(--accent)' : 'var(--muted)'; badge.style.color = isK ? 'var(--accent)' : 'var(--muted)'; }
  if (sidebarUser) sidebarUser.textContent = isK ? '⚡ KEITH' : '👁 GUEST';
  if (mobileUser) mobileUser.textContent = isK ? '⚡' : '👁';
  if (logoutBtn) logoutBtn.style.display = 'block';
}

function isKeith() { return currentUser === 'keith'; }

function checkPersistedSession() {
  const saved = localStorage.getItem('rebuilder_session');
  if (saved === 'keith' || saved === 'guest') {
    currentUser = saved;
    const screen = document.getElementById('authScreen');
    screen.style.display = 'none';
    applyUserRole(saved);
    init();
    return true;
  }
  return false;
}

// ── SIDEBAR ──
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// ── SUPABASE ──
async function supaFetch(method, path, body = null) {
  try {
    const headers = {
      'apikey': HARDCODED_KEY,
      'Authorization': 'Bearer ' + HARDCODED_KEY,
      'Content-Type': 'application/json',
    };
    if (method === 'POST')  headers['Prefer'] = 'return=representation';
    if (method === 'PATCH') headers['Prefer'] = 'return=representation';
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(HARDCODED_URL + '/rest/v1/' + path, opts);
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

async function dbFetchRows(type, limit = 150) {
  const r = await supaFetch('GET', `rebuilder_logs?type=eq.${type}&order=logged_at.desc&limit=${limit}`);
  return (r || []).map(row => ({ ...row.data, _id: row.id, _logged_at: row.logged_at }));
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

// ── UTILS ──
function todayKey() { return new Date().toISOString().split('T')[0]; }
function getWeekStart(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() - offset * 7);
  const day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const m = new Date(d);
  m.setDate(diff);
  return m.toISOString().split('T')[0];
}
function getWeekLabel(offset = 0) { return getWeekStart(offset); }
function fmtDate(s) {
  if (!s) return '—';
  const d = new Date(s + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

// ── STATE ──
let state = {
  totalXP: 0, currentLevel: 1,
  streaks: { train: 0, ml: 0, german: 0 },
  streakShieldsUsed: 0, streakShieldsAvailable: 1, lastShieldMonth: '',
  mlCurrent: { modules: 0, lectures: 0, lecturesPlanned: 21, lectures231n: 0, lectures231nPlanned: 18, projects: 0, commits: 0, dlnlp: 0 },
  germanTotalHours: 0,
  germanMethodHours: { textbook: 0, anki: 0, youtube: 0, podcast: 0, speaking: 0, writing: 0 },
  germanTotalWords: 0, germanTotalSpeakingMin: 0, germanTotalWritingWords: 0,
  germanWeekly: {}, curriculum: {}, germanMilestones: {},
  dayTypeHistory: {}, habitCounts: { junk: 0, scroll: 0, sleep: 0, game: 0, skipger: 0, skiptrain: 0 },
  claimedRewards: [], weeklyXPHistory: {}, completedMissions: [], claimedMissions: [],
};

let xpHistory = [], bodyHistory = [], strengthHistory = [], engineHistory = [],
    mlHistory = [], germanHistory = [], habitHistory = [];

let selectedST = 'textbook';
let currentDayType = 'prime';
let currentCardioType = 'run2k';
let charts = {};
let _strengthChartFilter = 'all';

// ── INIT ──
async function init() {
  updateHeader();
  setDailyVerse();
  await loadAllData();
  setInterval(updateHeader, 60000);
  window.addEventListener('resize', handleResize);
}

async function loadAllData() {
  const saved = await dbGetState('main_state');
  if (saved) state = { ...state, ...saved };

  const [xp, body, str, eng, ml, ger, hab] = await Promise.all([
    dbFetchRows('xp_logs', 200),
    dbFetchRows('body_logs', 100),
    dbFetchRows('strength_logs', 100),
    dbFetchRows('engine_logs', 100),
    dbFetchRows('ml_logs', 100),
    dbFetchRows('german_logs', 200),
    dbFetchRows('habit_logs', 200),
  ]);

  xpHistory = xp; bodyHistory = body; strengthHistory = str;
  engineHistory = eng; mlHistory = ml; germanHistory = ger; habitHistory = hab;

  const c = await dbGetState('curriculum');
  if (c) { state.curriculum = c; applyCurriculum(); }
  const sk = await dbGetState('skills');
  if (sk) { state.skills = sk; }

  const gm = await dbGetState('germanMilestones');
  if (gm) { state.germanMilestones = gm; applyGermanMilestones(); }

  restoreTodayNutrition();
  restoreTodayXP();
  refreshAll();
  buildAllCharts();
  checkMissions();
  await loadTomorrowNote();
  checkMorningFlash();
}

async function saveState() { await dbUpsertState('main_state', state); }

// ── NOTIFY ──
function notify(msg, color = 'var(--accent)') {
  const el = document.createElement('div');
  el.className = 'notification';
  el.style.borderColor = color;
  el.style.color = color;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

// ── VERSES ──
function setDailyVerse() {
  const d = new Date();
  const idx = (d.getDate() + d.getMonth()) % DAILY_VERSES.length;
  const v = document.getElementById('dailyVerseStrip');
  if (v) v.textContent = DAILY_VERSES[idx];
}

// ── HEADER ──
function updateHeader() {
  const now = new Date();
  const dateEl = document.getElementById('currentDate');
  if (dateEl) dateEl.textContent = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const dayNum = Math.max(1, Math.floor((now - CAMPAIGN_START) / 86400000) + 1);
  const clampedDay = Math.min(dayNum, CAMPAIGN_DAYS);
  const dayEl = document.getElementById('campaignDay');
  if (dayEl) dayEl.textContent = `DAY ${clampedDay} OF ${CAMPAIGN_DAYS}`;
  const pct = Math.round((clampedDay / CAMPAIGN_DAYS) * 100);
  const fillEl = document.getElementById('csFill');
  if (fillEl) fillEl.style.width = pct + '%';
  const pctEl = document.getElementById('csPct');
  if (pctEl) pctEl.textContent = pct + '%';
  const todayLabel = document.getElementById('todayDateLabel');
  if (todayLabel) todayLabel.textContent = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── NAVIGATION ──
function switchTab(id, el) {
  if (id === 'training') {
    const dow = new Date().getDay();
    const dayMap = { 1:1, 2:2, 3:3, 4:4, 5:5, 0:null, 6:null };
    const todayDay = dayMap[dow];
    if (todayDay && !_activeTrainingDay) selectTrainingDay(todayDay);
    setTimeout(renderTodayWorkout, 50);
  }
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');
  if (el) el.classList.add('active');
  else {
    const navEl = document.querySelector(`[data-tab="${id}"]`);
    if (navEl) navEl.classList.add('active');
  }
  closeSidebar();
  if (id === 'analytics') setTimeout(buildAllCharts, 50);
  // training tab needs no special chart init
  if (id === 'strength')  setTimeout(() => buildStrengthChart(_strengthChartFilter), 50);
  if (id === 'body')      setTimeout(buildBodyChart, 50);
  if (id === 'engine')    setTimeout(buildEngineChart, 50);
  if (id === 'german')    setTimeout(buildGermanChart, 50);
  refreshAll();
}

function handleResize() {
  Object.values(charts).forEach(c => { if (c) { try { c.resize(); } catch(e) {} } });
}

// ── DAY TYPE ──
function selectDayType(type, el) {
  currentDayType = type;
  ['prime', 'core', 'social', 'recovery'].forEach(t => {
    const btn = document.getElementById('dt-' + t);
    if (btn) btn.className = 'dt-btn';
  });
  if (el) el.className = 'dt-btn active-' + type;
  const dtd = document.getElementById('dayTypeDisplay');
  if (dtd) dtd.textContent = type.toUpperCase();
}

// ── CARDIO TYPE ──
function selectCardioType(el, t) {
  document.querySelectorAll('#tab-engine .sess-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  currentCardioType = t;
  ['ef-2k', 'ef-5k', 'ef-10k', 'ef-15k', 'ef-20k', 'ef-sprint', 'ef-sprint-time'].forEach(id => {
    const e = document.getElementById(id);
    if (e) e.style.display = 'none';
  });
  const show = {
    run2k: ['ef-2k'], run5k: ['ef-5k'], run10k: ['ef-10k'],
    run15k: ['ef-15k'], run20k: ['ef-20k'], sprint: ['ef-sprint', 'ef-sprint-time']
  }[t] || ['ef-2k'];
  show.forEach(id => { const e = document.getElementById(id); if (e) e.style.display = ''; });
}

// ── GERMAN SESSION TYPE ──
function selectST(el, t) {
  document.querySelectorAll('#tab-german .sess-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedST = t;
}

// ── MEAL TOTALS ──
function updateMealTotals() {
  const g = id => parseFloat(document.getElementById(id)?.value) || 0;
  const bFilled = g('meal-b-cal') || g('meal-b-prot');
  const lFilled = g('meal-l-cal') || g('meal-l-prot');
  const dFilled = g('meal-d-cal') || g('meal-d-prot');
  const sFilled = g('meal-s-cal') || g('meal-s-prot');

  const totCal  = (bFilled ? g('meal-b-cal') : 0) + (lFilled ? g('meal-l-cal') : 0) + (dFilled ? g('meal-d-cal') : 0) + (sFilled ? g('meal-s-cal') : 0);
  const totProt = (bFilled ? g('meal-b-prot') : 0) + (lFilled ? g('meal-l-prot') : 0) + (dFilled ? g('meal-d-prot') : 0) + (sFilled ? g('meal-s-prot') : 0);
  const totCarb = (bFilled ? g('meal-b-carb') : 0) + (lFilled ? g('meal-l-carb') : 0) + (dFilled ? g('meal-d-carb') : 0) + (sFilled ? g('meal-s-carb') : 0);
  const totFat  = (bFilled ? g('meal-b-fat') : 0)  + (lFilled ? g('meal-l-fat') : 0)  + (dFilled ? g('meal-d-fat') : 0)  + (sFilled ? g('meal-s-fat') : 0);

  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v || '—'; };
  set('cal-today',  totCal  || null);
  set('prot-today', totProt || null);
  set('carb-today', totCarb || null);
  set('fat-today',  totFat  || null);
  const pb = document.getElementById('protBar');
  if (pb) pb.style.width = Math.min(100, (totProt / 80) * 100) + '%';
}

// ── RESTORE TODAY ──
function restoreTodayXP() {
  const today = todayKey();
  const entry = xpHistory.find(e => e.date === today);
  if (!entry) return;
  const map = {
    'xp-gym': entry.gym, 'xp-run': entry.run, 'xp-mobility': entry.mobility,
    'xp-deepwork': entry.deepwork, 'xp-impl': entry.impl,
    'xp-german-daily': entry.germanStudy,
    'xp-protein': entry.protein, 'xp-water': entry.water, 'xp-calories': entry.calories,
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.checked = !!val;
  });
  const ghEl = document.getElementById('germanHoursToday');
  if (ghEl && entry.germanHrs) ghEl.value = entry.germanHrs;
  if (entry.dayType) selectDayType(entry.dayType, document.getElementById('dt-' + entry.dayType));
  updateXP();
}

function restoreTodayNutrition() {
  const today = todayKey();
  const entry = bodyHistory.find(e => e.date === today && e.meals);
  if (!entry || !entry.meals) return;
  const meals = entry.meals;
  const mealMap = { b: meals.breakfast, l: meals.lunch, d: meals.dinner, s: meals.snacks };
  Object.entries(mealMap).forEach(([key, meal]) => {
    if (!meal) return;
    const setVal = (field, val) => {
      const el = document.getElementById(`meal-${key}-${field}`);
      if (el && val) el.value = val;
    };
    setVal('desc', meal.desc);
    setVal('cal',  meal.cal);
    setVal('prot', meal.prot);
    setVal('carb', meal.carb);
    setVal('fat',  meal.fat);
  });
  updateMealTotals();
}

// ── XP ──
const XP_MAP = {
  'xp-gym': 20, 'xp-run': 20, 'xp-mobility': 5,
  'xp-deepwork': 25, 'xp-impl': 10,
  'xp-german-daily': 20,
  'xp-protein': 10, 'xp-water': 5, 'xp-calories': 5,
};

function calcXP() {
  return Object.keys(XP_MAP).reduce((s, id) => s + (document.getElementById(id)?.checked ? XP_MAP[id] : 0), 0);
}

function updateXP() {
  const xp = calcXP();
  const el = document.getElementById('todayXP');
  if (el) el.textContent = xp;
  const bar = document.getElementById('todayBar');
  if (bar) bar.style.width = Math.min(100, xp) + '%';
  const msg = document.getElementById('xpStatusMsg');
  if (msg) msg.textContent = xp >= 100 ? '🔥 PERFECT DAY!' : xp >= 70 ? '⚡ GREAT OUTPUT!' : xp >= 40 ? '📈 Keep pushing!' : 'Select day type and log activities';
}

function getWeeklyXP(weekStart) {
  const ws = weekStart || getWeekStart();
  return xpHistory.filter(e => e.date >= ws).reduce((s, e) => s + (e.xp || 0), 0);
}

async function saveDay() {
  if (!isKeith()) { notify('👁 Guest view — cannot log data', 'var(--muted)'); return; }
  const today = todayKey();
  const xp = calcXP();
  const gHrs = parseFloat(document.getElementById('germanHoursToday').value) || 0;
  const entry = {
    date: today, xp, dayType: currentDayType, germanHrs: gHrs,
    gym: document.getElementById('xp-gym').checked,
    run: document.getElementById('xp-run').checked,
    mobility: document.getElementById('xp-mobility').checked,
    deepwork: document.getElementById('xp-deepwork').checked,
    impl: document.getElementById('xp-impl').checked,
    germanStudy: document.getElementById('xp-german-daily').checked,
    protein: document.getElementById('xp-protein').checked,
    water: document.getElementById('xp-water').checked,
    calories: document.getElementById('xp-calories').checked,
  };
  const idx = xpHistory.findIndex(e => e.date === today);
  if (idx >= 0) { state.totalXP -= xpHistory[idx].xp; xpHistory[idx] = { ...xpHistory[idx], ...entry }; }
  else xpHistory.push(entry);
  state.totalXP += xp;
  if (!state.dayTypeHistory) state.dayTypeHistory = {};
  state.dayTypeHistory[today] = currentDayType;
  const ws = getWeekStart();
  if (!state.weeklyXPHistory) state.weeklyXPHistory = {};
  state.weeklyXPHistory[ws] = getWeeklyXP();
  updateStreaks();
  checkLevelUp();
  checkMissionProgress(entry);
  await dbUpsertDay('xp_logs', entry);
  await saveState();
  notify('⚡ +' + xp + ' XP logged', 'var(--accent)');
  refreshAll();
  updateCharts();
}

function updateStreaks() {
  // Week = Mon–Sun. Thresholds: Train 4/wk, ML 4/wk, German 5/wk
  const THRESHOLDS = { train: 4, ml: 4, german: 5 };

  function weekBounds(offsetWeeks) {
    const d = new Date();
    const dow = d.getDay(); // 0=Sun
    const toMon = dow === 0 ? -6 : 1 - dow;
    const mon = new Date(d); mon.setDate(d.getDate() + toMon - offsetWeeks * 7);
    const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
    return [mon.toISOString().slice(0,10), sun.toISOString().slice(0,10)];
  }

  function daysInWeek(offset, check) {
    const [ws, we] = weekBounds(offset);
    return xpHistory.filter(e => e.date >= ws && e.date <= we && check(e)).length;
  }

  const checks = {
    train:  e => !!(e.gym || e.run),
    ml:     e => !!(e.deepwork || e.impl),
    german: e => !!e.germanStudy,
  };

  // Streak = consecutive past weeks all meeting threshold (current week not counted)
  // Campaign started Mar 10 2026 — don't count weeks that started before then
  const CAMPAIGN_START = '2026-03-10';
  let ts = 0, ms = 0, gs = 0;
  for (let w = 1; w <= 30; w++) {
    const [ws] = weekBounds(w);
    if (ws < CAMPAIGN_START) break; // don't count pre-campaign weeks
    if (daysInWeek(w, checks.train)  >= THRESHOLDS.train)  ts++; else break;
  }
  for (let w = 1; w <= 30; w++) {
    const [ws] = weekBounds(w);
    if (ws < CAMPAIGN_START) break;
    if (daysInWeek(w, checks.ml)     >= THRESHOLDS.ml)     ms++; else break;
  }
  for (let w = 1; w <= 30; w++) {
    const [ws] = weekBounds(w);
    if (ws < CAMPAIGN_START) break;
    if (daysInWeek(w, checks.german) >= THRESHOLDS.german) gs++; else break;
  }

  state.streaks = { train: ts, ml: ms, german: gs };

  // Current-week day counts for dot coloring
  state.weekProgress = {
    train:  daysInWeek(0, checks.train),
    ml:     daysInWeek(0, checks.ml),
    german: daysInWeek(0, checks.german),
  };
}

function checkLevelUp() {
  const nl = Math.min(13, Math.max(1, Math.floor(state.totalXP / 500) + 1));
  if (nl > state.currentLevel) {
    state.currentLevel = nl;
    const f = document.createElement('div');
    f.className = 'lup-flash';
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1000);
    notify('🏆 LEVEL UP! ' + LEVELS[nl - 1].name.toUpperCase(), 'var(--gold)');
    const now = new Date();
    const month = now.getFullYear() + '-' + now.getMonth();
    if (state.lastShieldMonth !== month) { state.streakShieldsAvailable = 1; state.lastShieldMonth = month; }
  }
}

async function useStreakShield() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  if ((state.streakShieldsAvailable || 0) <= 0) { notify('No shield available this month', 'var(--red)'); return; }
  if (!confirm('Use your Streak Shield? (1 per month)')) return;
  state.streakShieldsAvailable--;
  state.streakShieldsUsed = (state.streakShieldsUsed || 0) + 1;
  await saveState();
  notify('🛡 Streak Shield used!', 'var(--gold)');
  refreshAll();
}

// ── BODY / NUTRITION ──
async function saveBodyWeight() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const weight = parseFloat(document.getElementById('inp-weight').value);
  if (!weight) { notify('Enter a bodyweight value', 'var(--red)'); return; }
  const today = todayKey();
  const existing = bodyHistory.find(e => e.date === today);
  if (existing) {
    existing.weight = weight;
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`, { data: existing });
  } else {
    const entry = { date: today, weight };
    bodyHistory.push(entry);
    await dbUpsertDay('body_logs', entry);
  }
  await saveState();
  notify('⚖️ Weight logged: ' + weight + ' kg', 'var(--accent)');
  document.getElementById('inp-weight').value = '';
  refreshAll();
  buildBodyChart();
}

async function saveWeeklyMeasurements() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const waist     = parseFloat(document.getElementById('inp-waist')?.value)    || null;
  const shoulders = parseFloat(document.getElementById('inp-shoulders')?.value) || null;
  const pullupmax = parseInt(document.getElementById('inp-pullup')?.value)      || null;
  if (!waist && !shoulders && !pullupmax) { notify('Enter at least one measurement', 'var(--red)'); return; }
  const today = todayKey();
  const existing = bodyHistory.find(e => e.date === today);
  if (existing) {
    if (waist)     existing.waist     = waist;
    if (shoulders) existing.shoulders = shoulders;
    if (pullupmax) existing.pullupmax = pullupmax;
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`, { data: existing });
  } else {
    const entry = { date: today, waist, shoulders, pullupmax };
    bodyHistory.push(entry);
    await dbUpsertDay('body_logs', entry);
  }
  await saveState();
  notify('📏 Measurements saved!', 'var(--gold)');
  if (document.getElementById('inp-waist'))     document.getElementById('inp-waist').value     = '';
  if (document.getElementById('inp-shoulders')) document.getElementById('inp-shoulders').value = '';
  if (document.getElementById('inp-pullup'))    document.getElementById('inp-pullup').value    = '';
  refreshAll();
}

async function saveNutrition() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const g = id => parseFloat(document.getElementById(id)?.value) || 0;
  const s = id => document.getElementById(id)?.value || '';

  const bFilled = g('meal-b-cal') || g('meal-b-prot') || s('meal-b-desc');
  const lFilled = g('meal-l-cal') || g('meal-l-prot') || s('meal-l-desc');
  const dFilled = g('meal-d-cal') || g('meal-d-prot') || s('meal-d-desc');
  const sFilled = g('meal-s-cal') || g('meal-s-prot') || s('meal-s-desc');

  if (!bFilled && !lFilled && !dFilled && !sFilled) {
    notify('Fill in at least one meal', 'var(--red)'); return;
  }

  const today = todayKey();
  let existing = bodyHistory.find(e => e.date === today);
  const prevMeals = existing?.meals || {};

  // ADDITIVE: new entries ADD to existing meal slots (not overwrite)
  // To overwrite a meal, delete the day entry first from history
  function mergeMeal(key, filled, newData, prev) {
    if (!filled) return prev || null;
    if (!prev) return newData;
    // ADD calories/macros on top of existing meal slot
    return {
      desc: newData.desc || prev.desc,
      cal:  (prev.cal  || 0) + (newData.cal  || 0),
      prot: (prev.prot || 0) + (newData.prot || 0),
      carb: (prev.carb || 0) + (newData.carb || 0),
      fat:  (prev.fat  || 0) + (newData.fat  || 0),
    };
  }

  const meals = {
    breakfast: mergeMeal('b', bFilled, { desc: s('meal-b-desc'), cal: g('meal-b-cal'), prot: g('meal-b-prot'), carb: g('meal-b-carb'), fat: g('meal-b-fat') }, prevMeals.breakfast),
    lunch:     mergeMeal('l', lFilled, { desc: s('meal-l-desc'), cal: g('meal-l-cal'), prot: g('meal-l-prot'), carb: g('meal-l-carb'), fat: g('meal-l-fat') }, prevMeals.lunch),
    dinner:    mergeMeal('d', dFilled, { desc: s('meal-d-desc'), cal: g('meal-d-cal'), prot: g('meal-d-prot'), carb: g('meal-d-carb'), fat: g('meal-d-fat') }, prevMeals.dinner),
    snacks:    mergeMeal('s', sFilled, { desc: s('meal-s-desc'), cal: g('meal-s-cal'), prot: g('meal-s-prot'), carb: g('meal-s-carb'), fat: g('meal-s-fat') }, prevMeals.snacks),
  };

  let totCal = 0, totProt = 0, totCarb = 0, totFat = 0;
  Object.values(meals).forEach(m => {
    if (!m) return;
    totCal  += m.cal  || 0;
    totProt += m.prot || 0;
    totCarb += m.carb || 0;
    totFat  += m.fat  || 0;
  });

  const entry = { date: today, cals: totCal, prot: totProt, carb: totCarb, fat: totFat, meals };

  if (existing) {
    Object.assign(existing, entry);
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`, { data: existing });
  } else {
    bodyHistory.push(entry);
    await dbUpsertDay('body_logs', entry);
  }
  await saveState();
  // Clear input fields after save
  ['b','l','d','s'].forEach(m => {
    ['cal','prot','carb','fat'].forEach(f => { const el = document.getElementById('meal-'+m+'-'+f); if(el) el.value=''; });
    const desc = document.getElementById('meal-'+m+'-desc'); if(desc) desc.value='';
  });
  notify('🥗 Meals added! Total: ' + totCal + ' kcal / ' + totProt + 'g protein', 'var(--green)');
  updateMealTotals();
  refreshAll();
}

// ── STRENGTH ──
async function saveStrength() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const e = {
    date:     todayKey(),
    squat:    parseFloat(document.getElementById('inp-squat').value)    || null,
    deadlift: parseFloat(document.getElementById('inp-deadlift').value) || null,
    wpullup:  parseFloat(document.getElementById('inp-wpullup').value)  || null,
    pushup:   parseInt(document.getElementById('inp-pushup').value)     || null,
    bench:    parseFloat(document.getElementById('inp-bench').value)    || null,
    row:      parseFloat(document.getElementById('inp-row').value)      || null,
    notes:    document.getElementById('inp-strength-notes')?.value      || null,
  };
  if (!e.squat && !e.deadlift && !e.wpullup && !e.pushup && !e.bench && !e.row) {
    notify('Enter at least one lift value', 'var(--red)'); return;
  }
  const liftKeys = ['squat','deadlift','wpullup','pushup','bench','row'];
  liftKeys.forEach(k => {
    if (!e[k]) return;
    const pb = Math.max(0, ...strengthHistory.map(h => h[k] || 0));
    if (e[k] > pb) {
      notify('🔺 NEW PB: ' + k.toUpperCase() + ' ' + e[k] + '!', 'var(--gold)');
      checkMissionUnlock('sm11');
    }
  });
  strengthHistory.push(e);
  await dbInsertRow('strength_logs', e);
  await saveState();
  notify('🏋️ Strength logged!', 'var(--accent2)');
  refreshAll();
  buildStrengthChart(_strengthChartFilter);
  ['inp-squat','inp-deadlift','inp-wpullup','inp-pushup','inp-bench','inp-row','inp-strength-notes'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
}

// ── ENGINE ──
async function saveEngine() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const e = {
    date: todayKey(), type: currentCardioType,
    twoK:     document.getElementById('inp-2k')?.value    || null,
    fiveK:    document.getElementById('inp-5k')?.value    || null,
    tenK:     document.getElementById('inp-10k')?.value   || null,
    fifteenK: document.getElementById('inp-15k')?.value   || null,
    twentyK:  document.getElementById('inp-20k')?.value   || null,
    sprint:   parseFloat(document.getElementById('inp-sprint')?.value) || null,
    sprintDist: document.getElementById('inp-sprint-dist')?.value      || null,
    rhr:      parseInt(document.getElementById('inp-rhr')?.value)      || null,
    notes:    document.getElementById('inp-cardio-notes')?.value       || null,
  };
  engineHistory.push(e);
  await dbInsertRow('engine_logs', e);
  await saveState();
  if (e.fiveK) checkMissionUnlock('sm7');
  notify('🏃 Cardio logged!', 'var(--purple)');
  refreshAll();
  buildEngineChart();
  ['inp-2k','inp-5k','inp-10k','inp-15k','inp-20k','inp-sprint','inp-rhr','inp-cardio-notes'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
}

// ── ML ──
async function saveML() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  state.mlCurrent = {
    modules:             parseInt(document.getElementById('inp-modules').value)           || state.mlCurrent.modules,
    lectures:            parseInt(document.getElementById('inp-lectures').value)          || state.mlCurrent.lectures,
    lecturesPlanned:     parseInt(document.getElementById('inp-lectures-planned').value)  || 21,
    lectures231n:        parseInt(document.getElementById('inp-231n').value)              || state.mlCurrent.lectures231n || 0,
    lectures231nPlanned: parseInt(document.getElementById('inp-231n-planned').value)      || 18,
    projects:            parseInt(document.getElementById('inp-projects').value)          || state.mlCurrent.projects,
    commits:             parseInt(document.getElementById('inp-commits').value)           || state.mlCurrent.commits,
    dlnlp:               parseInt(document.getElementById('inp-dlnlp').value)             || state.mlCurrent.dlnlp,
  };
  const entry = { date: todayKey(), ...state.mlCurrent };
  mlHistory.push(entry);
  await dbUpsertDay('ml_logs', entry);
  await saveState();
  notify('🧠 ML progress updated!', 'var(--purple)');
  refreshAll();
  updateCharts();
}

async function saveCurriculum() {
  const items = document.querySelectorAll('.curr-item input[type=checkbox]');
  const curr = {};
  items.forEach(cb => {
    curr[cb.id] = cb.checked;
    const l = cb.nextElementSibling;
    if (l) l.classList.toggle('done', cb.checked);
  });
  state.curriculum = curr;
  await dbUpsertState('curriculum', curr);
  updateCurriculumBars();
}

function applyCurriculum() {
  Object.entries(state.curriculum).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el) { el.checked = v; const l = el.nextElementSibling; if (l) l.classList.toggle('done', v); }
  });
  updateCurriculumBars();
}

function updateCurriculumBars() {
  const tracks = {
    'track-cs229':  ['cs-1','cs-2','cs-3','cs-4','cs-5','cs-6','cs-7','cs-8','cs-9','cs-10','cs-11','cs-12','cs-13','cs-14','cs-15','cs-16','cs-17','cs-18','cs-19','cs-20','cs-21'],
    'track-cs231n': ['n231-1','n231-2','n231-3','n231-4','n231-5','n231-6','n231-7','n231-8','n231-9','n231-10','n231-11','n231-12','n231-13','n231-14','n231-15','n231-16','n231-17','n231-18'],
    'track-dl':     ['dl-1','dl-2','dl-3','dl-4','dl-5','dl-6','dl-7','dl-8','dl-9','dl-10'],
    'track-nlp':    ['nlp-1','nlp-2','nlp-3','nlp-4','nlp-5','nlp-6','nlp-7','nlp-8','nlp-9','nlp-10'],
  };
  let td = 0, ta = 0;
  Object.entries(tracks).forEach(([id, items]) => {
    const done = items.filter(x => document.getElementById(x)?.checked).length;
    td += done; ta += items.length;
    const pct = (done / items.length) * 100;
    const bar = document.getElementById('bar-' + id);
    const count = document.getElementById('count-' + id);
    if (bar)   bar.style.width  = pct + '%';
    if (count) count.textContent = done + '/' + items.length;
  });
  const op = ta ? Math.round((td / ta) * 100) : 0;
  const dp = document.getElementById('dashCurrPct');
  if (dp) dp.textContent = op + '%';
}

function toggleTrack(id) {
  const body = document.getElementById(id);
  const tog  = document.getElementById('tog-' + id);
  const open = body.classList.toggle('open');
  if (tog) tog.textContent = open ? '▲' : '▼';
}

// ── GERMAN ──
async function addGermanSession() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const hrs    = parseFloat(document.getElementById('germanAddHours').value)      || 0;
  if (hrs <= 0) { notify('Enter hours > 0', 'var(--red)'); return; }
  const topic  = document.getElementById('germanTopic').value.trim();
  const words  = parseInt(document.getElementById('germanNewWords').value)  || 0;
  const min    = parseInt(document.getElementById('germanMinutes').value)   || 0;
  const wWords = parseInt(document.getElementById('germanWritingWords').value) || 0;
  const ws = getWeekStart();

  state.germanTotalHours += hrs;
  if (!state.germanMethodHours) state.germanMethodHours = {};
  state.germanMethodHours[selectedST] = (state.germanMethodHours[selectedST] || 0) + hrs;
  state.germanTotalWords          = (state.germanTotalWords          || 0) + words;
  state.germanTotalSpeakingMin    = (state.germanTotalSpeakingMin    || 0) + min;
  state.germanTotalWritingWords   = (state.germanTotalWritingWords   || 0) + wWords;
  if (!state.germanWeekly) state.germanWeekly = {};
  state.germanWeekly[ws] = (state.germanWeekly[ws] || 0) + hrs;

  const entry = {
    date: todayKey(), method: selectedST, hours: hrs,
    topic, words, min, wWords,
    weekTotal: state.germanWeekly[ws],
    campaignTotal: state.germanTotalHours,
  };
  germanHistory.push(entry);
  await dbInsertRow('german_logs', entry);
  await saveState();

  const todayGermanHrs = germanHistory.filter(e => e.date === todayKey()).reduce((s, e) => s + (e.hours || 0), 0);
  if (todayGermanHrs >= 4) checkMissionUnlock('sm5');
  if (wWords >= 150)       checkMissionUnlock('sm12');

  notify('🇩🇪 +' + hrs + 'hr (' + selectedST + ')', 'var(--gold)');
  ['germanAddHours','germanTopic','germanNewWords','germanMinutes','germanWritingWords'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = el.type === 'number' ? '0' : '';
  });
  refreshAll();
  buildGermanChart();
}

async function saveGermanMilestones() {
  const checks = document.querySelectorAll('.ms-check');
  const miles = {};
  checks.forEach(cb => {
    miles[cb.id] = cb.checked;
    const l = document.querySelector('label[for="' + cb.id + '"]');
    if (l) l.classList.toggle('done', cb.checked);
  });
  state.germanMilestones = miles;
  await dbUpsertState('germanMilestones', miles);
}

function applyGermanMilestones() {
  Object.entries(state.germanMilestones).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el) { el.checked = v; const l = document.querySelector(`label[for="${id}"]`); if (l) l.classList.toggle('done', v); }
  });
}

// ── BAD HABITS ──
async function logHabit(key, name, xpCost) {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  if (!confirm('Log ' + name + '? Costs ' + Math.abs(xpCost) + ' XP.')) return;
  if (!state.habitCounts) state.habitCounts = {};
  state.habitCounts[key] = (state.habitCounts[key] || 0) + 1;
  state.totalXP = Math.max(0, state.totalXP + xpCost);
  const entry = { date: todayKey(), key, name, xpCost };
  habitHistory.push(entry);
  await dbInsertRow('habit_logs', entry);
  await saveState();
  notify('⚠ ' + name + ': ' + xpCost + ' XP', 'var(--red)');
  refreshAll();
}

// ── MISSIONS ──
// ── MISSION PROGRESS HELPERS ──
function _strengthPB(lift) { return strengthHistory.length ? Math.max(0, ...strengthHistory.map(h => h[lift] || 0)) : 0; }
function _weekSprints(ws)  { return engineHistory.filter(e => e.date >= ws && e.type === 'sprint').length; }
function _weekCommits(ws)  { return mlHistory.filter(e => e.date >= ws).reduce((s,e) => s + (e.commits||0), 0); }
function _totalSpeak()     { return germanHistory.reduce((s,e) => s + (e.min||0), 0); }
function _weekPodcasts(ws) { return germanHistory.filter(e => e.date >= ws && e.method === 'podcast').length; }
function _cs229Done()      { if (!state.curriculum) return 0; return ['cs-1','cs-2','cs-3','cs-4','cs-5','cs-6','cs-7','cs-8','cs-9','cs-10','cs-11','cs-12','cs-13','cs-14','cs-15','cs-16','cs-17','cs-18','cs-19','cs-20','cs-21'].filter(k => state.curriculum[k]).length; }
function _cs231nDone()     { if (!state.curriculum) return 0; return ['n231-1','n231-2','n231-3','n231-4','n231-5','n231-6','n231-7','n231-8','n231-9','n231-10','n231-11','n231-12','n231-13','n231-14','n231-15','n231-16','n231-17','n231-18'].filter(k => state.curriculum[k]).length; }
function _weekStrSessions(ws) { return strengthHistory.filter(e => e.date >= ws).length; }
function _consecutiveStrWeeks() {
  let streak = 0;
  for (let i = 0; i < 26; i++) {
    const ws = getWeekStart(i);
    const we = new Date(ws); we.setDate(we.getDate() + 7);
    const weStr = we.toISOString().split('T')[0];
    if (strengthHistory.some(e => e.date >= ws && e.date < weStr)) streak++;
    else break;
  }
  return streak;
}
function _lowestRHR() { const rhrs = engineHistory.map(e => e.rhr).filter(Boolean); return rhrs.length ? Math.min(...rhrs) : 999; }
function _sub22fiveK() {
  const times = engineHistory.filter(e => e.fiveK).map(e => {
    const p = e.fiveK.split(':');
    return p.length === 2 ? parseInt(p[0]) * 60 + parseInt(p[1]) : 9999;
  });
  return times.length ? Math.min(...times) : 9999;
}
function _b1Milestones() {
  if (!state.germanMilestones) return 0;
  const b1Keys = ['b1-present-perfect','b1-past','b1-future','b1-dative','b1-adjective-endings','b1-modal-past','b1-relative-clauses','b1-konjunktiv2'];
  return b1Keys.filter(k => state.germanMilestones[k]).length;
}

function checkMissions() {
  if (!state.completedMissions) state.completedMissions = [];
  const completed = state.completedMissions;
  const today = todayKey();
  const ws    = getWeekStart();
  const te    = xpHistory.find(e => e.date === today);

  const checks = {
    // ── Campaign ──
    sm2:  () => new Set(xpHistory.filter(e => e.date >= ws).map(e => e.date)).size >= 6,
    sm3:  () => te && te.gym && te.run,
    sm6:  () => { const we = xpHistory.filter(e => e.date >= ws); return we.length >= 5 && we.every(e => e.protein); },
    sm9:  () => { const h = new Date().getHours(); return h >= 23 && te; },
    sm10: () => (state.streaks?.train || 0) >= 14,
    sm14: () => te && (te.gym || te.run) && (te.deepwork || te.impl) && te.germanStudy,
    sm15: () => getWeeklyXP() >= 600,
    // ── Strength ──
    sm11: () => false, // event-based, triggered in saveStrength()
    sm13: () => _strengthPB('squat')    >= 100,
    sm20: () => _strengthPB('deadlift') >= 130,
    sm21: () => _strengthPB('wpullup')  >= 25,
    sm22: () => _strengthPB('pushup')   >= 40,
    sm23: () => _strengthPB('bench')    >= 65,
    sm24: () => _strengthPB('row')      >= 80,
    sm25: () => _consecutiveStrWeeks()  >= 5,
    // ── Cardio ──
    sm7:  () => engineHistory.some(e => e.fiveK),
    sm26: () => _sub22fiveK() <= 22 * 60,
    sm27: () => engineHistory.some(e => e.tenK),
    sm28: () => _weekSprints(ws) >= 3,
    sm29: () => _lowestRHR() < 55,
    // ── ML ──
    sm4:  () => (state.streaks?.ml || 0) >= 5,
    sm8:  () => xpHistory.filter(e => e.date >= ws && (e.deepwork || e.impl)).length >= 3,
    sm30: () => _cs229Done() >= 10,
    sm31: () => _cs231nDone() >= 18,
    sm32: () => (state.mlCurrent?.projects || 0) >= 1,
    sm33: () => _weekCommits(ws) >= 5,
    // ── German ──
    sm5:  () => germanHistory.filter(e => e.date === today).reduce((s,e) => s + (e.hours||0), 0) >= 4,
    sm12: () => germanHistory.some(e => (e.wWords || 0) >= 150),
    sm34: () => _totalSpeak() >= 30,
    sm35: () => _weekPodcasts(ws) >= 3,
    sm36: () => _b1Milestones() >= 6,
    sm37: () => (state.germanTotalHours || 0) >= 100,
  };

  let anyNew = false;
  Object.entries(checks).forEach(([id, fn]) => {
    if (completed.includes(id)) return;
    try {
      if (fn()) {
        completed.push(id);
        anyNew = true;
        const m = SECRET_MISSIONS.find(x => x.id === id);
        if (m) notify(m.emoji + ' MISSION UNLOCKED: ' + m.title, 'var(--gold)');
      }
    } catch(e) {}
  });

  if (anyNew) saveState();
  renderMissions();
}

function checkMissionProgress(xpEntry) { checkMissions(); }

function checkMissionUnlock(id) {
  if (!state.completedMissions) state.completedMissions = [];
  if (!state.completedMissions.includes(id)) {
    state.completedMissions.push(id);
    const m = SECRET_MISSIONS.find(x => x.id === id);
    if (m) notify(m.emoji + ' MISSION UNLOCKED: ' + m.title, 'var(--gold)');
    saveState();
    renderMissions();
  }
}

async function claimMission(id) {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const m = SECRET_MISSIONS.find(x => x.id === id);
  if (!m) return;
  if (!state.claimedMissions) state.claimedMissions = [];
  if (state.claimedMissions.includes(id)) { notify('Already claimed', 'var(--muted)'); return; }
  state.claimedMissions.push(id);
  state.totalXP += m.xp;
  await saveState();
  notify('🏆 CLAIMED: ' + m.title + ' +' + m.xp + ' XP!', 'var(--gold)');
  refreshAll();
}

// ── CATEGORY FILTER STATE ──
let _missionFilter = 'all';

function filterMissions(cat, el) {
  _missionFilter = cat;
  document.querySelectorAll('.mf-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderMissions();
}

function renderMissions() {
  const grid = document.getElementById('missionsGrid');
  if (!grid) return;
  const completed = state.completedMissions || [];
  const claimed   = state.claimedMissions   || [];

  const CAT_LABELS = { campaign:'⚔ Campaign', strength:'🏋️ Strength', cardio:'🏃 Cardio', ml:'🧠 ML', german:'🇩🇪 German', nutrition:'🥗 Nutrition' };
  const CAT_COLORS = { campaign:'var(--accent)', strength:'var(--accent2)', cardio:'var(--purple)', ml:'var(--blue)', german:'var(--gold)', nutrition:'var(--green)' };

  const filtered = _missionFilter === 'all'
    ? SECRET_MISSIONS
    : SECRET_MISSIONS.filter(m => m.category === _missionFilter);

  // Group by category
  const groups = {};
  filtered.forEach(m => {
    const cat = m.category || 'campaign';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(m);
  });

  grid.innerHTML = Object.entries(groups).map(([cat, missions]) => {
    const cards = missions.map(m => {
      const isCompleted = completed.includes(m.id);
      const isClaimed   = claimed.includes(m.id);
      const isHidden    = m.secret && !isCompleted;

      const statusClass = isClaimed ? 'mc-claimed' : isCompleted ? 'mc-ready' : isHidden ? 'mc-hidden' : 'mc-locked';
      const catColor    = CAT_COLORS[cat] || 'var(--muted)';

      // Progress bar for missions with a numeric target
      let progressBar = '';
      if (m.lift && m.target && !isCompleted) {
        const pb  = _strengthPB(m.lift);
        const pct = Math.min(100, Math.round((pb / m.target) * 100));
        const UNITS = { squat:'kg', deadlift:'kg', wpullup:'kg', bench:'kg', row:'kg', pushup:'reps' };
        progressBar = `
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%;background:${catColor}"></div></div>
            <div class="mc-prog-label">${pb}${UNITS[m.lift]||''} / ${m.target}${UNITS[m.lift]||''} · ${pct}%</div>
          </div>`;
      }
      if (m.id === 'sm37' && !isCompleted) {
        const hrs = state.germanTotalHours || 0;
        const pct = Math.min(100, Math.round((hrs / 100) * 100));
        progressBar = `
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%;background:var(--gold)"></div></div>
            <div class="mc-prog-label">${hrs.toFixed(1)}hr / 100hr · ${pct}%</div>
          </div>`;
      }
      if (m.id === 'sm30' && !isCompleted) {
        const done = _cs229Done();
        const pct  = Math.min(100, Math.round((done / 10) * 100));
        progressBar = `
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%;background:var(--blue)"></div></div>
            <div class="mc-prog-label">${done} / 10 lectures · ${pct}%</div>
          </div>`;
      }
      if (m.id === 'sm31' && !isCompleted) {
        const done = _cs231nDone();
        const pct  = Math.min(100, Math.round((done / 18) * 100));
        progressBar = `
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%;background:var(--blue)"></div></div>
            <div class="mc-prog-label">${done} / 18 lectures · ${pct}%</div>
          </div>`;
      }
      if (m.id === 'sm10' && !isCompleted) {
        const s   = state.streaks?.train || 0;
        const pct = Math.min(100, Math.round((s / 14) * 100));
        progressBar = `
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%;background:var(--accent)"></div></div>
            <div class="mc-prog-label">${s} / 14 day streak · ${pct}%</div>
          </div>`;
      }

      return `
        <div class="mission-card ${statusClass}" style="--mc-color:${catColor}">
          <div class="mc-top-row">
            <span class="mc-badge" style="color:${catColor};border-color:${catColor}20;background:${catColor}10">${CAT_LABELS[cat] || cat}</span>
            <span class="mc-xp-badge" style="color:${catColor}">+${m.xp} XP</span>
          </div>
          <div class="mc-emoji">${isHidden ? '🔒' : m.emoji}</div>
          <div class="mc-title">${isHidden ? '???' : m.title}</div>
          <div class="mc-desc">${isHidden ? 'Complete the hidden objective to reveal.' : m.desc}</div>
          ${progressBar}
          <div class="mc-status-row">
            ${isClaimed
              ? '<div class="mc-status mc-done">✓ CLAIMED</div>'
              : isCompleted
                ? `<div class="mc-status mc-complete">✅ COMPLETE</div><button class="mission-claim-btn" onclick="claimMission('${m.id}')">CLAIM +${m.xp} XP ▶</button>`
                : `<div class="mc-status mc-incomplete">${isHidden ? '◈ HIDDEN' : '🔒 IN PROGRESS'}</div>`
            }
          </div>
        </div>`;
    }).join('');

    if (_missionFilter === 'all') {
      const catDone    = missions.filter(m => completed.includes(m.id)).length;
      const catClaimed = missions.filter(m => claimed.includes(m.id)).length;
      return `
        <div class="mission-group">
          <div class="mission-group-header" style="border-color:${CAT_COLORS[cat] || 'var(--border)'}40">
            <span style="color:${CAT_COLORS[cat] || 'var(--muted)'}">${CAT_LABELS[cat] || cat.toUpperCase()}</span>
            <span style="font-family:var(--font-mono);font-size:.65rem;color:var(--muted)">${catClaimed}/${missions.length} CLAIMED · ${catDone - catClaimed} READY</span>
          </div>
          <div class="mission-group-grid">${cards}</div>
        </div>`;
    }
    return `<div class="mission-group-grid">${cards}</div>`;
  }).join('');

  const activeMissions = completed.filter(id => !claimed.includes(id)).length;
  const dm = document.getElementById('dashMissions');
  if (dm) dm.textContent = activeMissions > 0 ? activeMissions + ' claimable' : '0 active';
  const ds = document.getElementById('dashMissionSub');
  if (ds) ds.textContent = activeMissions > 0 ? 'Go claim your XP!' : 'Keep grinding';

  // Stats bar
  const totalXPFromMissions = (state.claimedMissions || []).reduce((s, id) => {
    const m = SECRET_MISSIONS.find(x => x.id === id); return s + (m ? m.xp : 0);
  }, 0);
  const setMSB = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  setMSB('msb-total',   SECRET_MISSIONS.length);
  setMSB('msb-claimed', claimed.length);
  setMSB('msb-ready',   activeMissions);
  setMSB('msb-xp',      totalXPFromMissions);
}

// ── REWARDS ──
function renderRewards() {
  function badge(r, key, unlocked, claimed) {
    return `<div class="reward-badge ${claimed?'claimed':unlocked?'unlocked':''}">
      <div class="r-icon">${r.icon}</div>
      <div class="r-name">${r.name}</div>
      <div class="r-req">${r.desc||r.req||''}</div>
      <div class="r-status" style="color:${claimed?'var(--green)':unlocked?'var(--gold)':'var(--border2)'}">
        ${claimed?'✓ CLAIMED':unlocked?'UNLOCKED':'🔒 LOCKED'}
      </div>
      ${unlocked&&!claimed?`<button class="claim-btn" onclick="claimReward('${key}','${r.name}')">CLAIM ⚡</button>`:''}
    </div>`;
  }

  const weeks500 = Object.values(state.weeklyXPHistory||{}).filter(xp=>xp>=500).length;
  const wg = document.getElementById('rewardGridWeekly');
  if (wg) wg.innerHTML = WEEKLY_REWARDS.map((r,i) => badge(r,'w'+i, weeks500>i, (state.claimedRewards||[]).includes('w'+i))).join('');

  const bwg = document.getElementById('rewardGridBiweekly');
  if (bwg) {
    const levelsGained = Math.max(0, (state.currentLevel||1) - 1);
    bwg.innerHTML = BIWEEKLY_REWARDS.map((r,i) => badge(r,'bw'+i, levelsGained>i, (state.claimedRewards||[]).includes('bw'+i))).join('');
  }

  const mg = document.getElementById('rewardGridMonthly');
  if (mg) {
    const now = new Date();
    const monthsElapsed = (now.getFullYear()-2026)*12 + now.getMonth() - 2; // March 2026 = month 0
    mg.innerHTML = MONTHLY_REWARDS.map((r,i) => badge(r,'m'+i, monthsElapsed>i, (state.claimedRewards||[]).includes('m'+i))).join('');
  }

  const pg = document.getElementById('rewardGridPerformance');
  if (pg) {
    pg.innerHTML = PERFORMANCE_REWARDS.map((r,i) => {
      const claimed = (state.claimedRewards||[]).includes('p'+i);
      const unlocked = (state.performanceRewards||[]).includes(r.goal);
      return badge(r,'p'+i, unlocked, claimed);
    }).join('');
  }

  const ig = document.getElementById('rewardGridIdentity');
  if (ig) {
    ig.innerHTML = IDENTITY_REWARDS.map((r,i) => {
      const claimed = (state.claimedRewards||[]).includes('id'+i);
      return badge(r,'id'+i, true, claimed); // always unlocked — earn by doing
    }).join('');
  }
}

async function claimReward(key, name) {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  if (!confirm('Claim reward: ' + name + '?')) return;
  if (!state.claimedRewards) state.claimedRewards = [];
  state.claimedRewards.push(key);
  await saveState();
  notify('🏆 Claimed: ' + name, 'var(--gold)');
  renderRewards();
}

// ── REFRESH ALL ──
// ══════════════════════════════════════════════════════════
// MONTHLY WRAPPED
// ══════════════════════════════════════════════════════════
function checkShowWrappedButton() {
  const now = new Date();
  // Show button on 1st of month for first 7 days
  if (now.getDate() > 7) return;
  const monthKey = now.getFullYear() + '-' + String(now.getMonth()).padStart(2,'0');
  const viewed   = (state.wrappedViewed || []).includes(monthKey);
  const btn = document.getElementById('wrappedBtn');
  if (btn) btn.style.display = (!viewed && state.currentLevel > 1) ? 'flex' : 'none';
}

function openMonthlyWrapped() {
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const pYear  = prevMonth.getFullYear();
  const pMonth = prevMonth.getMonth();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthName = monthNames[pMonth];

  // Gather stats for last month
  const startStr = pYear + '-' + String(pMonth+1).padStart(2,'0') + '-01';
  const endStr   = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-01';

  const monthXP  = xpHistory.filter(e => e.date >= startStr && e.date < endStr);
  const totalXP  = monthXP.reduce((s,e) => s+(e.xp||0), 0);
  const gymDays  = monthXP.filter(e => e.gym).length;
  const runDays  = monthXP.filter(e => e.run).length;
  const mlDays   = monthXP.filter(e => e.deepwork||e.impl).length;
  const gDays    = monthXP.filter(e => e.germanStudy).length;
  const logDays  = monthXP.length;

  // Strength PBs this month
  const strMonth = strengthHistory.filter(e => e.date >= startStr && e.date < endStr);
  const lifts = ['squat','deadlift','bench','wpullup','row'];
  const pbsHit = lifts.filter(lift => {
    const mMax = Math.max(...strMonth.map(e=>e[lift]||0));
    const allMax = Math.max(...strengthHistory.filter(e=>e.date<startStr).map(e=>e[lift]||0),0);
    return mMax > allMax && mMax > 0;
  });

  // German hours
  const gHrs = Object.entries(state.germanWeekly||{})
    .filter(([ws]) => ws >= startStr && ws < endStr)
    .reduce((s,[,h]) => s+h, 0);

  // Best week XP
  const weekXPs = Object.entries(state.weeklyXPHistory||{})
    .filter(([ws]) => ws >= startStr && ws < endStr)
    .map(([,xp]) => xp);
  const bestWeek = weekXPs.length ? Math.max(...weekXPs) : 0;

  // Grade
  const pct = logDays / 28;
  const grade = pct >= .85 ? 'S' : pct >= .7 ? 'A' : pct >= .5 ? 'B' : pct >= .3 ? 'C' : 'D';
  const gradeColors = { S:'#fbbf24', A:'#22c55e', B:'#00e5ff', C:'#f59e0b', D:'#ff4757' };

  // Headline
  const headlines = {
    S: 'ABSOLUTELY ELITE 🔥 Shadow Monarch energy.',
    A: 'STRONG MONTH ⚡ You showed up and delivered.',
    B: 'SOLID EFFORT 💪 Building momentum.',
    C: 'ROOM TO GROW 📈 Next month goes harder.',
    D: 'RESET TIME 🛠️ Rebuild from scratch.',
  };

  const modal = document.getElementById('wrappedModal');
  const body  = document.getElementById('wrappedBody');
  if (!modal||!body) return;

  body.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-family:var(--font-display);font-size:.75rem;color:var(--muted);letter-spacing:3px;margin-bottom:4px;">${pYear}</div>
      <div style="font-family:var(--font-display);font-size:2.4rem;background:var(--grad-title);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${monthName.toUpperCase()} WRAPPED</div>
      <div style="font-size:.8rem;color:var(--muted);margin-top:4px;">"${headlines[grade]}"</div>
    </div>

    <!-- Grade hero -->
    <div style="text-align:center;margin:20px 0;">
      <div style="font-family:var(--font-display);font-size:5rem;color:${gradeColors[grade]};text-shadow:0 0 40px ${gradeColors[grade]}88;line-height:1;">${grade}</div>
      <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--muted);margin-top:4px;">MONTHLY GRADE</div>
    </div>

    <!-- Stat grid -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
      ${[
        {label:'TOTAL XP',    val: totalXP,         color:'var(--accent)'},
        {label:'DAYS LOGGED', val: logDays + ' days', color:'var(--accent)'},
        {label:'BEST WEEK',   val: bestWeek + ' XP', color:'var(--gold)'},
        {label:'GYM DAYS',    val: gymDays,           color:'var(--accent2)'},
        {label:'RUN DAYS',    val: runDays,           color:'var(--orange)'},
        {label:'ML DAYS',     val: mlDays,            color:'var(--purple)'},
        {label:'GERMAN DAYS', val: gDays,             color:'var(--blue)'},
        {label:'GERMAN HRS',  val: Math.round(gHrs*10)/10 + 'h', color:'var(--blue)'},
        {label:'NEW PBs',     val: pbsHit.length,    color:'var(--green)'},
      ].map(s => `<div style="background:rgba(255,255,255,.03);border:1px solid var(--border);padding:10px 8px;text-align:center;">
        <div style="font-family:var(--font-display);font-size:1.4rem;color:${s.color};">${s.val}</div>
        <div style="font-family:var(--font-mono);font-size:.55rem;color:var(--muted);">${s.label}</div>
      </div>`).join('')}
    </div>

    <!-- PBs if any -->
    ${pbsHit.length ? `<div style="background:rgba(251,191,36,.05);border:1px solid rgba(251,191,36,.15);padding:10px 14px;margin-bottom:12px;font-family:var(--font-mono);font-size:.7rem;">
      🏆 <span style="color:var(--gold);">NEW PERSONAL BESTS:</span> ${pbsHit.map(l=>l.toUpperCase()).join(' · ')}
    </div>` : ''}

    <!-- Top weights this month -->
    ${(() => {
      const LABELS = { squat:'Squat', deadlift:'Deadlift', bench:'Bench', wpullup:'+Weight Pull-up', row:'Row' };
      const rows = lifts.map(lift => {
        const best = Math.max(0, ...strMonth.map(e=>e[lift]||0));
        if (!best) return null;
        const isPB = pbsHit.includes(lift);
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04);">
          <span style="color:var(--muted);">${LABELS[lift]}</span>
          <span style="font-family:var(--font-display);color:${isPB?'var(--gold)':'var(--text)'};">${best} kg ${isPB?'<span style="font-size:.6rem;color:var(--gold);">★ PB</span>':''}</span>
        </div>`;
      }).filter(Boolean);
      return rows.length ? `<div style="background:rgba(255,71,87,.04);border:1px solid rgba(255,71,87,.12);padding:10px 14px;margin-bottom:12px;">
        <div style="font-family:var(--font-mono);font-size:.6rem;color:var(--accent2);margin-bottom:8px;">🏋️ TOP WEIGHTS THIS MONTH</div>
        ${rows.join('')}
      </div>` : '';
    })()}

    <!-- Workout sessions this month -->
    ${(() => {
      const workoutMonthTotal = monthXP.filter(e=>e.gym||e.run).length;
      const gymCount = monthXP.filter(e=>e.gym).length;
      const runCount = monthXP.filter(e=>e.run).length;
      return workoutMonthTotal ? `<div style="background:rgba(45,212,191,.04);border:1px solid rgba(45,212,191,.1);padding:10px 14px;margin-bottom:12px;display:flex;gap:16px;font-family:var(--font-mono);font-size:.7rem;">
        <span style="color:var(--green);">💪 ${gymCount} gym</span>
        <span style="color:var(--orange);">🏃 ${runCount} runs</span>
        <span style="color:var(--muted);">= ${workoutMonthTotal} training days</span>
      </div>` : '';
    })()}

    <!-- Level -->
    <div style="background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.1);padding:10px 14px;text-align:center;font-family:var(--font-mono);font-size:.7rem;color:var(--muted);">
      Current Rank: <span style="color:var(--accent);font-size:.85rem;font-family:var(--font-display);">
        ${LEVELS[(state.currentLevel||1)-1]?.rank||'E'} — ${LEVELS[(state.currentLevel||1)-1]?.name||'E-Rank Hunter'}
      </span>
    </div>
  `;

  modal.style.display = 'flex';

  // Mark as viewed
  if (!state.wrappedViewed) state.wrappedViewed = [];
  const monthKey = now.getFullYear() + '-' + String(now.getMonth()).padStart(2,'0');
  if (!state.wrappedViewed.includes(monthKey)) state.wrappedViewed.push(monthKey);
  saveState();
  checkShowWrappedButton();
}

function closeWrapped() {
  const modal = document.getElementById('wrappedModal');
  if (modal) modal.style.display = 'none';
}

// ══════════════════════════════════════════════════════════
// BODY STATS TOGGLE (collapsible like strength tab)
// ══════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════
// SKILLS VAULT
// ══════════════════════════════════════════════════════════
const SKILL_IDS = ['sk-docker','sk-git','sk-fastapi','sk-deploy','sk-cloud',
  'sk-sklearn','sk-feateng','sk-hyperparam','sk-eval','sk-mlflow',
  'sk-hf','sk-tok','sk-finetune','sk-rag',
  'sk-sql','sk-etl','sk-vecdb','sk-embed',
  'sk-modver','sk-cicd','sk-dvc',
  'sk-restapi','sk-asyncapi','sk-llmpipe',
  'sk-llmpipe'];

// ══════════════════════════════════════════════════════════
// 24-WEEK STUDY TIMELINE
// ══════════════════════════════════════════════════════════
function toggleStudyTimeline() {
  const body  = document.getElementById('studyTimelineBody');
  const arrow = document.getElementById('studyTimelineArrow');
  if (!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▼' : '▲';
  if (!open) renderStudyTimeline();
}

function renderStudyTimeline() {
  const CAMPAIGN_START = new Date('2026-03-10');
  const today = new Date();
  const daysSinceStart = Math.max(0, Math.floor((today - CAMPAIGN_START) / 86400000));
  const currentWeek = Math.min(24, Math.floor(daysSinceStart / 7) + 1);

  // Phase ranges: [startWeek, endWeek, blockId]
  const phases = [
    { id: 1, start: 1,  end: 4  },
    { id: 2, start: 5,  end: 8  },
    { id: 3, start: 9,  end: 12 },
    { id: 4, start: 13, end: 16 },
    { id: 5, start: 17, end: 20 },
    { id: 6, start: 21, end: 24 },
  ];

  phases.forEach(p => {
    const block = document.getElementById('stl-' + p.id);
    const bar   = document.getElementById('stl-bar-' + p.id);
    if (!block || !bar) return;

    const isActive = currentWeek >= p.start && currentWeek <= p.end;
    const isDone   = currentWeek > p.end;
    const isFuture = currentWeek < p.start;

    block.classList.remove('stl-active', 'stl-done', 'stl-future');
    if (isActive)      block.classList.add('stl-active');
    else if (isDone)   block.classList.add('stl-done');
    else               block.classList.add('stl-future');

    // Progress bar within the phase
    let pct = 0;
    if (isDone) pct = 100;
    else if (isActive) {
      const weeksIn = currentWeek - p.start;
      const phaseLen = p.end - p.start + 1;
      pct = Math.round((weeksIn / phaseLen) * 100);
    }
    bar.style.width = pct + '%';
  });

  // Week indicator label
  const wkEl = document.getElementById('studyCurrentWeek');
  if (wkEl) wkEl.textContent = 'Week ' + currentWeek + ' of 24';
}

function toggleSkillsVault() {
  const body  = document.getElementById('skillsVaultBody');
  const arrow = document.getElementById('skillsVaultArrow');
  if (!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▼' : '▲';
  if (!open) applySkills();
}

function applySkills() {
  const skills = state.skills || {};
  SKILL_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = !!skills[id];
  });
  updateSkillsProgress();
}

async function saveSkills() {
  const skills = {};
  SKILL_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) skills[id] = el.checked;
  });
  state.skills = skills;
  await dbUpsertState('skills', skills);
  updateSkillsProgress();
}

function updateSkillsProgress() {
  const skills = state.skills || {};
  const total = SKILL_IDS.length;
  const done  = SKILL_IDS.filter(id => skills[id]).length;
  const pct   = Math.round(done / total * 100);
  const lbl = document.getElementById('skillsProgressLabel');
  const bar = document.getElementById('skillsProgressBar');
  if (lbl) lbl.textContent = done + ' / ' + total;
  if (bar) bar.style.width = pct + '%';
}

// ══════════════════════════════════════════════════════════
// TOMORROW'S NOTE — save + morning flash
// ══════════════════════════════════════════════════════════
function toggleNotePanel() {
  const body  = document.getElementById('notePanelBody');
  const arrow = document.getElementById('notePanelArrow');
  if (!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▼' : '▲';
}

function updateNotePreview(text) {
  const el = document.getElementById('notePreview');
  if (!el) return;
  el.textContent = text?.trim() ? text.trim().slice(0, 60) + (text.trim().length > 60 ? '…' : '') : 'tap to write a note for tomorrow';
  el.style.color = text?.trim() ? 'var(--text)' : 'var(--muted)';
}

async function saveTomorrowNote() {
  if (!isKeith()) return;
  const input = document.getElementById('tomorrowNoteInput');
  if (!input) return;
  const text = input.value.trim();
  const savedEl = document.getElementById('tomorrowNoteSaved');

  await dbUpsertState('tomorrow_note', { text, savedAt: new Date().toISOString() });
  state.tomorrowNote = { text, savedAt: new Date().toISOString() };
  updateNotePreview(text);

  if (savedEl) {
    savedEl.textContent = '✓ saved';
    savedEl.style.color = 'var(--green)';
    setTimeout(() => { if (savedEl) savedEl.textContent = ''; }, 2000);
  }
  // Collapse after saving
  const body = document.getElementById('notePanelBody');
  const arrow = document.getElementById('notePanelArrow');
  if (body) body.style.display = 'none';
  if (arrow) arrow.textContent = '▼';
}

async function loadTomorrowNote() {
  const data = await dbGetState('tomorrow_note');
  if (!data) return;
  state.tomorrowNote = data;
  const input = document.getElementById('tomorrowNoteInput');
  if (input && data.text) input.value = data.text;
  updateNotePreview(data.text);
}

function checkMorningFlash() {
  if (!state.tomorrowNote?.text?.trim()) return;

  // Get current time in IST (UTC+5:30)
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const istMs = utcMs + (5.5 * 3600000);
  const ist = new Date(istMs);
  const hours   = ist.getHours();
  const minutes = ist.getMinutes();
  const istMinutes = hours * 60 + minutes;

  // Flash between 5:30am (330 min) and 11:59pm (1439 min)
  if (istMinutes < 330) return;

  // Don't flash again if already dismissed today
  const todayKey = ist.toISOString().slice(0, 10);
  if (state.noteFlashDismissed === todayKey) return;

  // Show after a short delay so the app finishes loading first
  setTimeout(() => showMorningNoteModal(state.tomorrowNote.text, todayKey), 800);
}

function showMorningNoteModal(text, todayKey) {
  // Build modal
  const overlay = document.createElement('div');
  overlay.id = 'morningNoteOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.85);
    display:flex;align-items:center;justify-content:center;
    padding:20px;backdrop-filter:blur(6px);
    animation:fadeIn .4s ease;
  `;

  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utcMs + 5.5 * 3600000);
  const timeStr = ist.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });

  overlay.innerHTML = `
    <div style="
      background:var(--panel);
      border:1px solid rgba(251,191,36,.35);
      max-width:420px;width:100%;
      padding:28px 24px;
      position:relative;
      box-shadow:0 0 60px rgba(251,191,36,.12), 0 0 120px rgba(0,0,0,.8);
      animation:slideUp .4s ease;
    ">
      <!-- Top label -->
      <div style="font-family:var(--font-mono);font-size:.6rem;color:var(--gold);letter-spacing:3px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
        <span>📝 NOTE FROM YESTERDAY YOU</span>
        <span style="color:var(--muted);">${timeStr} IST</span>
      </div>

      <!-- The note -->
      <div style="
        font-family:var(--font-mono);
        font-size:.9rem;
        color:var(--text);
        line-height:1.8;
        padding:16px;
        background:rgba(251,191,36,.04);
        border-left:3px solid var(--gold);
        white-space:pre-wrap;
        word-break:break-word;
        min-height:60px;
      ">${escapeHtml(text)}</div>

      <!-- Motivational sub-line -->
      <div style="font-family:var(--font-display);font-size:.75rem;color:var(--muted);margin-top:12px;text-align:center;letter-spacing:1px;">
        YOU WROTE THIS LAST NIGHT — NOW GO EXECUTE.
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:10px;margin-top:20px;">
        <button onclick="dismissMorningNote('${todayKey}')" style="
          flex:1;background:var(--gold);color:#000;border:none;
          padding:12px;font-family:var(--font-display);font-size:.85rem;
          letter-spacing:2px;cursor:pointer;
        ">LET'S GO ⚡</button>
        <button onclick="dismissMorningNote('${todayKey}', true)" style="
          background:none;border:1px solid var(--border2);color:var(--muted);
          font-family:var(--font-mono);font-size:.65rem;padding:12px 16px;cursor:pointer;
        ">CLEAR NOTE</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

async function dismissMorningNote(todayKey, clearNote = false) {
  const overlay = document.getElementById('morningNoteOverlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut .25s ease forwards';
    setTimeout(() => overlay.remove(), 250);
  }
  // Remember dismissed today
  state.noteFlashDismissed = todayKey;
  await saveState();

  if (clearNote) {
    state.tomorrowNote = { text: '', savedAt: '' };
    await dbUpsertState('tomorrow_note', state.tomorrowNote);
    const input = document.getElementById('tomorrowNoteInput');
    if (input) input.value = '';
  }
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function toggleBodyStats() {
  const sec = document.getElementById('bodyStatsSection');
  const arrow = document.getElementById('bodyStatsToggleArrow');
  if (!sec) return;
  const open = sec.style.display !== 'none';
  sec.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▼ EXPAND' : '▲ COLLAPSE';
  if (!open) renderBodyStatsHistory();
}

function renderBodyStatsHistory() {
  const feed = document.getElementById('bodyStatsHistoryFeed');
  if (!feed) return;
  const recent = [...bodyHistory]
    .filter(e => e.weight || e.waist || e.shoulders || e.pullupmax)
    .sort((a,b) => b.date.localeCompare(a.date))
    .slice(0, 12);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No body stats logged yet</div>'; return; }
  feed.innerHTML = recent.map(e => {
    const pills = [];
    if (e.weight)    pills.push(`<span class="feed-pill fp-cyan">⚖️ ${e.weight} kg</span>`);
    if (e.pullupmax) pills.push(`<span class="feed-pill fp-purple">Pull-up: ${e.pullupmax}</span>`);
    if (e.waist)     pills.push(`<span class="feed-pill fp-muted">Waist: ${e.waist}cm</span>`);
    if (e.shoulders) pills.push(`<span class="feed-pill fp-muted">Shoulders: ${e.shoulders}cm</span>`);
    return `<div class="feed-item">
      <div class="feed-date">${fmtDate(e.date)}</div>
      <div class="feed-content"><div class="feed-pills">${pills.join('')}</div></div>
      ${isKeith() ? `<div class="feed-actions"><button class="feed-del-btn" onclick="deleteBodyEntry('${e.date}')">DEL</button></div>` : ''}
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════════════
// INTERACTIVE TRAINING PLAN — ARROW STYLE
// ══════════════════════════════════════════════════════════
const TRAINING_DAYS = {
  0: {
    name: 'UPPER STRENGTH', sub: '+ AESTHETIC', color: 'var(--green)', day: 'MON',
    focus: 'Lats · Chest · Shoulders · Arms',
    goal: 'Build the anime upper body frame',
    muscles: ['Lats','Chest','Shoulders','Biceps','Core'],
    exercises: [
      { name: 'Weighted Pull-ups',          sets: 4, reps: '6',     rest: '3min', note: 'Add weight if reps are clean' },
      { name: 'Incline DB Press',           sets: 4, reps: '8',     rest: '2min', note: 'Upper chest emphasis' },
      { name: 'Overhead Press',             sets: 3, reps: '6–8',   rest: '2min', note: 'Strict — no leg drive' },
      { name: 'Lateral Raises',             sets: 4, reps: '12–15', rest: '90s',  note: 'Slow eccentric' },
      { name: 'Barbell Rows',               sets: 3, reps: '8–10',  rest: '2min', note: 'Drive elbows back' },
      { name: 'Bicep Curls',                sets: 3, reps: '10–12', rest: '90s',  note: 'Supinate at top' },
      { name: 'Hanging Leg Raises',         sets: 3, reps: '12',    rest: '60s',  note: 'Core finisher' },
    ]
  },
  1: {
    name: 'SPEED + CORE', sub: 'ATHLETIC', color: 'var(--blue)', day: 'TUE',
    focus: 'Sprint Power · Agility · Core',
    goal: 'Athletic output — not exhausting',
    muscles: ['Core','Calves','Hip Flexors','Glutes'],
    exercises: [
      { name: 'Sprint Intervals',  sets: 7, reps: '60m',    rest: '2min', note: '90% effort' },
      { name: 'Agility Ladder',    sets: 1, reps: '5 min',  rest: '—',    note: 'High knees, in-out' },
      { name: 'Cone Drills',       sets: 4, reps: 'rounds', rest: '90s',  note: 'T-drill or shuttle' },
      { name: 'Planks',            sets: 3, reps: '60s',    rest: '45s',  note: 'Squeeze glutes' },
      { name: 'Side Planks',       sets: 3, reps: '45s',    rest: '45s',  note: 'Each side' },
      { name: 'Ab Rollout',        sets: 3, reps: '10',     rest: '60s',  note: 'Protect lumbar' },
    ]
  },
  2: {
    name: 'LOWER STRENGTH', sub: '+ EXPLOSIVE', color: 'var(--gold)', day: 'WED',
    focus: 'Quads · Hamstrings · Explosive Power',
    goal: 'Strong legs = speed retention',
    muscles: ['Quads','Hamstrings','Glutes','Calves'],
    exercises: [
      { name: 'Squat / Trap Bar DL',   sets: 4, reps: '5',  rest: '3min', note: 'Alternate each week' },
      { name: 'Bulgarian Split Squat', sets: 3, reps: '8',  rest: '2min', note: 'Deep stretch' },
      { name: 'Romanian DL',           sets: 3, reps: '8',  rest: '2min', note: 'Feel hamstrings load' },
      { name: 'Box Jumps',             sets: 3, reps: '5',  rest: '2min', note: 'Max height — land soft' },
      { name: 'Calf Raises',           sets: 4, reps: '15', rest: '60s',  note: 'Full ROM' },
    ]
  },
  3: {
    name: 'UPPER HYPERTROPHY', sub: 'ANIME BUILD', color: 'var(--purple)', day: 'THU',
    focus: 'Shoulders · Arms · Forearms',
    goal: 'Shoulder width + arm thickness',
    muscles: ['Shoulders','Triceps','Biceps','Forearms'],
    exercises: [
      { name: 'Seated Shoulder Press',      sets: 3, reps: '10', rest: '2min', note: 'Controlled' },
      { name: 'Heavy Lateral Raises',       sets: 4, reps: '12', rest: '90s',  note: 'Slight lean' },
      { name: 'Rear Delt Fly',              sets: 3, reps: '15', rest: '60s',  note: 'Squeeze at top' },
      { name: 'Close-Grip Bench',           sets: 3, reps: '8',  rest: '2min', note: 'Elbows tucked' },
      { name: 'Tricep Extensions',          sets: 3, reps: '12', rest: '90s',  note: 'Overhead stretch' },
      { name: 'Hammer Curls',               sets: 3, reps: '10', rest: '90s',  note: 'Brachialis focus' },
      { name: 'Wrist Curls / Farmer Carry', sets: 3, reps: '—',  rest: '60s',  note: 'Grip strength' },
    ]
  },
  4: {
    name: 'CONDITIONING', sub: 'HYBRID ENGINE', color: 'var(--accent2)', day: 'FRI',
    focus: 'Endurance · Alternate each week',
    goal: 'Maintain engine, protect muscle',
    muscles: ['Full Body','Cardio','Lungs'],
    exercises: [
      { name: 'Wk A — 5K Tempo Run',    sets: 1, reps: 'run',     rest: '—',   note: 'Race pace — log in Engine' },
      { name: 'Wk B — Zone 2 (30 min)', sets: 1, reps: 'run',     rest: '—',   note: '60–70% max HR' },
      { name: 'Wk B — Burpees',         sets: 3, reps: '10',      rest: '60s', note: 'After the run' },
      { name: 'Wk C — Football Drills', sets: 1, reps: 'session', rest: '—',   note: 'Sprints, cuts, plyos' },
    ]
  }
};

let _activeTrainingDay = null;
// _workoutLog[dayIdx][exIdx][setIdx] = { done: bool, weight: str, reps: str, time: str }
let _workoutLog = {};
let _workoutDate = null; // date string of current workout session

function _logKey(d, e, s) { return d+'-'+e+'-'+s; }

function _getSet(d, e, s) {
  if (!_workoutLog[d]) _workoutLog[d] = {};
  if (!_workoutLog[d][e]) _workoutLog[d][e] = {};
  if (!_workoutLog[d][e][s]) _workoutLog[d][e][s] = { done: false, weight: '', reps: '', time: '' };
  return _workoutLog[d][e][s];
}

function selectTrainingDay(dayIdx) {
  _activeTrainingDay = dayIdx;
  if (!_workoutDate) _workoutDate = todayKey();
  renderActiveWorkout();
  document.querySelectorAll('.tr-day-card').forEach((c, i) => {
    c.classList.toggle('tr-dc-active', i === dayIdx);
  });
  const panel = document.getElementById('activeWorkoutPanel');
  if (panel) setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function toggleSetDone(dayIdx, exIdx, setIdx) {
  const s = _getSet(dayIdx, exIdx, setIdx);
  s.done = !s.done;
  // Read current inputs if toggling done
  const wEl = document.getElementById('w-'+dayIdx+'-'+exIdx+'-'+setIdx);
  const rEl = document.getElementById('r-'+dayIdx+'-'+exIdx+'-'+setIdx);
  const tEl = document.getElementById('t-'+dayIdx+'-'+exIdx+'-'+setIdx);
  if (wEl) s.weight = wEl.value;
  if (rEl) s.reps   = rEl.value;
  if (tEl) s.time   = tEl.value;
  renderActiveWorkout();
  updateTrStats();
}

function saveSetInput(dayIdx, exIdx, setIdx) {
  const s = _getSet(dayIdx, exIdx, setIdx);
  const wEl = document.getElementById('w-'+dayIdx+'-'+exIdx+'-'+setIdx);
  const rEl = document.getElementById('r-'+dayIdx+'-'+exIdx+'-'+setIdx);
  const tEl = document.getElementById('t-'+dayIdx+'-'+exIdx+'-'+setIdx);
  if (wEl) s.weight = wEl.value;
  if (rEl) s.reps   = rEl.value;
  if (tEl) s.time   = tEl.value;
}

function getTotalSetsDone(dayIdx) {
  if (!_workoutLog[dayIdx]) return 0;
  let c = 0;
  Object.values(_workoutLog[dayIdx]).forEach(ex => Object.values(ex).forEach(set => { if(set.done) c++; }));
  return c;
}

function getTotalSets(dayIdx) {
  const day = TRAINING_DAYS[dayIdx];
  if (!day) return 0;
  return day.exercises.reduce((sum,ex) => sum + (typeof ex.sets==='number'?ex.sets:1), 0);
}

async function saveWorkout() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  if (_activeTrainingDay === null) { notify('Select a workout first', 'var(--red)'); return; }

  const d = _activeTrainingDay;
  const day = TRAINING_DAYS[d];
  const date = _workoutDate || todayKey();

  // Build structured log
  const exercises = day.exercises.map((ex, ei) => {
    const sets = Array.from({length: typeof ex.sets==='number'?ex.sets:1}, (_,si) => {
      const s = _getSet(d, ei, si);
      // Read live DOM values too
      const wEl = document.getElementById('w-'+d+'-'+ei+'-'+si);
      const rEl = document.getElementById('r-'+d+'-'+ei+'-'+si);
      const tEl = document.getElementById('t-'+d+'-'+ei+'-'+si);
      return {
        done:   s.done,
        weight: wEl ? wEl.value : s.weight,
        reps:   rEl ? rEl.value : s.reps,
        time:   tEl ? tEl.value : s.time,
      };
    });
    return { name: ex.name, sets };
  });

  const entry = {
    date,
    dayIdx: d,
    dayName: day.name,
    exercises,
    totalSets: getTotalSets(d),
    doneSets:  getTotalSetsDone(d),
  };

  // Save to Supabase as workout_logs
  const existing = await supaFetch('GET', `rebuilder_logs?type=eq.workout_logs&logged_at=eq.${date}&limit=1`);
  if (existing && existing.length > 0) {
    await supaFetch('PATCH', `rebuilder_logs?type=eq.workout_logs&logged_at=eq.${date}`, { data: entry });
  } else {
    await supaFetch('POST', 'rebuilder_logs', { type: 'workout_logs', data: entry, logged_at: date });
  }

  // If conditioning day with time entries — auto-populate engine tab
  if (d === 4) {
    const runSet = exercises.find(ex => ex.name.toLowerCase().includes('5k') || ex.name.toLowerCase().includes('zone 2'));
    const timeVal = runSet?.sets?.[0]?.time;
    if (timeVal) {
      // Pre-fill engine tab run time
      const fiveKEl = document.getElementById('inp-fivek');
      if (fiveKEl && !fiveKEl.value) fiveKEl.value = timeVal;
      notify('⏱ Run time copied to Engine tab — log it there for XP!', 'var(--blue)');
    }
  }

  notify('💾 Workout saved — ' + getTotalSetsDone(d) + '/' + getTotalSets(d) + ' sets', 'var(--green)');
  renderActiveWorkout();
}

function resetWorkout(dayIdx) {
  if (!confirm('Reset all sets for this workout?')) return;
  _workoutLog[dayIdx] = {};
  renderActiveWorkout();
  updateTrStats();
}

function renderActiveWorkout() {
  const el = document.getElementById('activeWorkoutPanel');
  if (!el) return;

  if (_activeTrainingDay === null) {
    el.innerHTML = '<div style="padding:20px 0;text-align:center;">'
      + '<div style="color:var(--muted);font-family:var(--font-mono);font-size:.7rem;margin-bottom:16px;">← CHOOSE A WORKOUT ABOVE</div>'
      + '</div>';
    return;
  }

  const d = _activeTrainingDay;
  const day = TRAINING_DAYS[d];
  const totalSets = getTotalSets(d);
  const doneSets  = getTotalSetsDone(d);
  const pct = totalSets ? Math.round(doneSets/totalSets*100) : 0;
  const complete = doneSets===totalSets && totalSets>0;

  // Determine input type per exercise
  function exInputType(ex) {
    const n = ex.name.toLowerCase();
    if (n.includes('plank') || n.includes('run') || n.includes('zone') || n.includes('interval') || n.includes('agility') || n.includes('ladder') || n.includes('drill') || n.includes('conditioning')) return 'time';
    if (n.includes('sprint')) return 'time';
    return 'weight'; // default — weight + reps
  }

  const exRows = day.exercises.map((ex, ei) => {
    const exSets = typeof ex.sets==='number' ? ex.sets : 1;
    const exDone = Object.values(_workoutLog[d]?.[ei] || {}).filter(s=>s.done).length;
    const exComplete = exDone===exSets;
    const isTimed = exInputType(ex) === 'time';

    const setRows = Array.from({length:exSets}, (_,si) => {
      const s = _getSet(d, ei, si);
      const done = s.done;
      return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.03);">'
        // Set number bubble
        + '<div onclick="toggleSetDone('+d+','+ei+','+si+')" style="'
        + 'width:28px;height:28px;border-radius:50%;flex-shrink:0;'
        + 'border:2px solid '+(done?day.color:'var(--border2)')+';'
        + 'background:'+(done?day.color:'transparent')+';'
        + 'display:flex;align-items:center;justify-content:center;'
        + 'font-family:var(--font-display);font-size:.65rem;'
        + 'color:'+(done?'#000':'var(--muted)')+';cursor:pointer;'
        + 'transition:all .15s;box-shadow:'+(done?'0 0 6px '+day.color+'55':'none')+';'
        + '">'+(done?'✓':(si+1))+'</div>'
        // Inputs
        + '<div style="display:flex;gap:6px;flex:1;align-items:center;">'
        + (isTimed
          // Time input
          ? '<input id="t-'+d+'-'+ei+'-'+si+'" type="text" value="'+s.time+'" placeholder="mm:ss" onchange="saveSetInput('+d+','+ei+','+si+')" style="width:70px;background:var(--bg);border:1px solid var(--border2);color:var(--text);padding:4px 6px;font-family:var(--font-mono);font-size:.7rem;">'
          // Weight + Reps inputs
          : '<input id="w-'+d+'-'+ei+'-'+si+'" type="number" value="'+s.weight+'" placeholder="kg" onchange="saveSetInput('+d+','+ei+','+si+')" style="width:56px;background:var(--bg);border:1px solid var(--border2);color:var(--text);padding:4px 6px;font-family:var(--font-mono);font-size:.7rem;">'
          + '<span style="color:var(--border2);font-size:.7rem;">×</span>'
          + '<input id="r-'+d+'-'+ei+'-'+si+'" type="number" value="'+s.reps+'" placeholder="reps" onchange="saveSetInput('+d+','+ei+','+si+')" style="width:52px;background:var(--bg);border:1px solid var(--border2);color:var(--text);padding:4px 6px;font-family:var(--font-mono);font-size:.7rem;">'
        )
        + (s.done && (s.weight||s.time) ? '<span style="font-family:var(--font-mono);font-size:.6rem;color:'+(done?day.color:'var(--muted)')+';">✓</span>' : '')
        + '</div>'
        + '</div>';
    }).join('');

    return '<div style="background:var(--panel2);border:1px solid '+(exComplete?day.color+'55':'var(--border)')+';padding:12px 14px;transition:border-color .2s;">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">'
      + '<div>'
      + '<div style="font-family:var(--font-display);font-size:.9rem;color:'+(exComplete?'var(--muted)':day.color)+';letter-spacing:1px;">'
      + ex.name+'</div>'
      + '<div style="font-size:.62rem;color:var(--muted);font-family:var(--font-mono);margin-top:1px;">'
      + 'Target: '+(ex.reps!=='—'?ex.reps+' reps · ':'')+'rest '+ex.rest
      + (isTimed ? ' · ⏱ log time' : ' · log kg × reps')
      + '</div>'
      + '</div>'
      + '<div style="font-family:var(--font-display);font-size:.8rem;color:'+(exComplete?'var(--green)':day.color)+';flex-shrink:0;">'+exDone+'/'+exSets+'</div>'
      + '</div>'
      + '<div>'+setRows+'</div>'
      + (ex.note ? '<div style="font-size:.6rem;color:var(--muted);font-family:var(--font-mono);margin-top:6px;padding-top:4px;border-top:1px solid rgba(255,255,255,.03);">💡 '+ex.note+'</div>' : '')
      + '</div>';
  }).join('');

  el.innerHTML = '<div style="background:var(--panel);border:1px solid var(--border);padding:16px;margin-top:var(--gap);">'
    // Header
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">'
    + '<div>'
    + '<div style="font-family:var(--font-display);font-size:1.4rem;color:'+day.color+';letter-spacing:2px;">'+day.name+'</div>'
    + '<div style="font-size:.7rem;color:var(--muted);margin-top:2px;">'+day.focus+'</div>'
    + '<div style="display:flex;gap:5px;margin-top:6px;flex-wrap:wrap;">'
    + day.muscles.map(m=>'<span style="font-family:var(--font-mono);font-size:.55rem;padding:2px 5px;border:1px solid rgba(255,255,255,.07);color:var(--muted);">'+m+'</span>').join('')
    + '</div></div>'
    + '<div style="text-align:right;flex-shrink:0;">'
    + '<div style="font-family:var(--font-display);font-size:2rem;color:'+(complete?'var(--green)':day.color)+';">'+pct+'%</div>'
    + '<div style="font-family:var(--font-mono);font-size:.58rem;color:var(--muted);">'+doneSets+'/'+totalSets+' sets</div>'
    + '</div></div>'
    // Progress bar
    + '<div class="bar" style="height:4px;margin-bottom:14px;"><div class="bar-fill" style="width:'+pct+'%;background:'+day.color+';box-shadow:0 0 6px '+day.color+'55;transition:width .3s;"></div></div>'
    // Complete banner
    + (complete ? '<div style="padding:8px;background:rgba(45,212,191,.06);border:1px solid rgba(45,212,191,.2);margin-bottom:12px;font-family:var(--font-display);font-size:.85rem;color:var(--green);text-align:center;letter-spacing:2px;">✓ WORKOUT COMPLETE 🔥</div>' : '')
    // Exercises
    + '<div style="display:flex;flex-direction:column;gap:8px;">'+exRows+'</div>'
    // Footer buttons
    + '<div style="display:flex;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid var(--border);">'
    + '<button onclick="saveWorkout()" style="flex:1;background:'+day.color+';color:#000;border:none;padding:10px;font-family:var(--font-display);font-size:.85rem;letter-spacing:2px;cursor:pointer;">💾 SAVE WORKOUT</button>'
    + '<button onclick="resetWorkout('+d+')" style="background:none;border:1px solid var(--border2);color:var(--muted);font-family:var(--font-mono);font-size:.65rem;padding:10px 14px;cursor:pointer;">RESET</button>'
    + '</div>'
    + '<div style="margin-top:8px;font-size:.65rem;color:var(--muted);font-family:var(--font-mono);">🎯 '+day.goal+(d===4?' · Cardio time auto-copies to Engine tab':'')+'</div>'
    + '</div>';
}

function updateTrStats() {
  const sessions = xpHistory.filter(e=>e.gym||e.run).length;
  const el = document.getElementById('trStatSessions'); if(el) el.textContent = sessions||'0';

  const ws = getWeekStart();
  const weekDays = xpHistory.filter(e=>e.date>=ws&&(e.gym||e.run)).length;
  const wdEl = document.getElementById('trStatWeekDays'); if(wdEl) wdEl.textContent = weekDays+'/4';
  const strEl = document.getElementById('trStatStreak'); if(strEl) strEl.textContent = (state.streaks?.train||0)+'wk';
  const sEl = document.getElementById('trStatSetsToday');
  if(sEl) sEl.textContent = _activeTrainingDay!==null ? getTotalSetsDone(_activeTrainingDay) : '0';

  const dotsEl = document.getElementById('trWeekDots');
  if (dotsEl) {
    const today = new Date(); const todayStr = today.toISOString().slice(0,10);
    const dow = today.getDay(); const toMon = dow===0?-6:1-dow;
    dotsEl.innerHTML = Array.from({length:7},(_,i)=>{
      const d2 = new Date(today); d2.setDate(today.getDate()+toMon+i);
      const key = d2.toISOString().slice(0,10);
      const logged = xpHistory.find(e=>e.date===key&&(e.gym||e.run));
      const isToday = key===todayStr;
      return '<div style="width:calc('+100/7+'% - 4px);height:6px;border-radius:3px;background:'+(logged?'var(--green)':isToday?'rgba(45,212,191,.2)':'var(--border2)')+';transition:background .3s;"></div>';
    }).join('');
  }
  const barEl=document.getElementById('trWeekBar'); if(barEl) barEl.style.width=Math.min(100,weekDays/4*100)+'%';
  const lblEl=document.getElementById('trWeekLabel'); if(lblEl) lblEl.textContent=weekDays+' / 4 days';
}

function renderTodayWorkout() { updateTrStats(); }


function refreshAll() {
  updateHeader();
  renderDashboard();
  updateXP();
  renderTodayWorkout();
  checkShowWrappedButton();
  renderBodyStats();
  renderStrengthPBs();
  renderEnginePBs();
  renderMLStats();
  renderGermanStats();
  renderAnalytics();
  renderHabits();
  renderRewards();
  renderMissions();
  renderLevelTimeline();
  updateCurriculumBars();
  updateMVSBar();
  renderHistoryFeeds();
  const sc = document.getElementById('shieldCount');
  if (sc) sc.textContent = state.streakShieldsAvailable || 0;
}

function updateMVSBar() {
  const today = todayKey();
  const entry = xpHistory.find(e => e.date === today);
  const items = [
    { id:'mvs-train',   done: entry && (entry.gym || entry.run) },
    { id:'mvs-ml',      done: entry && (entry.deepwork || entry.impl) },
    { id:'mvs-german',  done: entry && entry.germanStudy },
    { id:'mvs-protein', done: entry && entry.protein },
    { id:'mvs-water',   done: entry && entry.water },
  ];
  items.forEach(({ id, done }) => {
    const el = document.getElementById(id);
    if (el) el.className = 'mvs-item ' + (done === undefined ? 'mvs-pending' : done ? 'mvs-ok' : 'mvs-miss');
  });
}

// ── DASHBOARD ──
function renderDashboard() {
  const lvl = state.currentLevel || 1;
  const ld  = LEVELS[lvl - 1];
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };

  set('dashLevel',      lvl);
  set('dashLevelName',  ld.name.toUpperCase());
  set('dashLevelPeriod','WEEK ' + ld.weeks);

  const wXP = getWeeklyXP();
  set('weeklyXPdash', wXP);
  const wBar = document.getElementById('weeklyBar');
  if (wBar) wBar.style.width = Math.min(100, (wXP / 500) * 100) + '%';
  set('totalXPdash', state.totalXP || 0);
  const maxXP = 13 * 500;
  const cBar = document.getElementById('campaignBar');
  if (cBar) cBar.style.width = Math.min(100, ((state.totalXP || 0) / maxXP) * 100) + '%';

  const totalStreak = (state.streaks?.train || 0) + (state.streaks?.ml || 0) + (state.streaks?.german || 0);
  const bonusXP = Math.floor(totalStreak / 10) * 10;
  set('streakBonusDisplay', bonusXP > 0 ? '+' + bonusXP + ' XP' : '—');

  const THRESH = { train: 4, ml: 4, german: 5 };
  const weekProgress = state.weekProgress || { train: 0, ml: 0, german: 0 };

  ['train','ml','german'].forEach(t => {
    set(t + 'Streak', state.streaks?.[t] || 0);
    const dc = document.getElementById(t + 'Dots');
    if (!dc) return;
    dc.innerHTML = '';

    const checks = {
      train:  e => !!(e && (e.gym || e.run)),
      ml:     e => !!(e && (e.deepwork || e.impl)),
      german: e => !!(e && e.germanStudy),
    };

    // Figure out Mon of current week
    const today = new Date();
    const dow = today.getDay();
    const toMon = dow === 0 ? -6 : 1 - dow;
    const monDate = new Date(today); monDate.setDate(today.getDate() + toMon);
    const weekStart = monDate.toISOString().slice(0,10);
    const weekEnd   = new Date(monDate); weekEnd.setDate(monDate.getDate() + 6);
    const weekEndStr = weekEnd.toISOString().slice(0,10);

    // Threshold hit this week?
    const weekHit = weekProgress[t] >= THRESH[t];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const e = xpHistory.find(x => x.date === key);
      const done = checks[t](e);
      const inCurrentWeek = key >= weekStart && key <= weekEndStr;
      const isFuture = key > today.toISOString().slice(0,10);

      const dot = document.createElement('div');
      dot.className = 'day-dot';
      dot.title = key;

      const campaignStart = '2026-03-10';
      const isPreCampaign = key < campaignStart;

      if (isFuture || isPreCampaign) {
        dot.classList.add('future');
      } else if (done) {
        dot.classList.add('filled');
      } else {
        // missed past campaign day — red
        dot.classList.add('dot-red');
      }

      dc.appendChild(dot);
    }

    // Show weekly progress label next to streak count
    const progEl = document.getElementById(t + 'WeekProg');
    if (progEl) {
      const cnt = weekProgress[t];
      const thr = THRESH[t];
      progEl.textContent = cnt + '/' + thr + ' this week';
      progEl.style.color = cnt >= thr ? 'var(--green)' : cnt > 0 ? 'var(--gold)' : 'var(--muted)';
    }
  });

  renderWeeklySummary();

  const grade = calcWeeklyGrade();
  const wg = document.getElementById('weekGrade');
  if (wg) { wg.className = 'week-grade grade-' + grade; wg.textContent = grade; }
}

function calcWeeklyGrade() {
  const ws      = getWeekStart();
  const wXP     = getWeeklyXP();
  const wGHrs   = (state.germanWeekly || {})[ws] || 0;
  const wEntries = xpHistory.filter(e => e.date >= ws);
  const trainDays = wEntries.filter(e => e.gym || e.run).length;
  const mlDays    = wEntries.filter(e => e.deepwork || e.impl).length;

  let score = 0;
  if (wXP >= 500) score += 30; else if (wXP >= 350) score += 20; else if (wXP >= 200) score += 10;
  if (trainDays >= 4) score += 20; else if (trainDays >= 3) score += 12; else if (trainDays >= 2) score += 6;
  if (mlDays    >= 4) score += 20; else if (mlDays    >= 3) score += 12; else if (mlDays    >= 2) score += 6;
  if (wGHrs     >= 20) score += 30; else if (wGHrs   >= 15) score += 20; else if (wGHrs    >= 10) score += 10;

  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  if (score >= 30) return 'D';
  return 'F';
}

function renderWeeklySummary() {
  const ws      = getWeekStart();
  const wXP     = getWeeklyXP();
  const wGHrs   = (state.germanWeekly || {})[ws] || 0;
  const wEntries = xpHistory.filter(e => e.date >= ws);
  const trainDays  = wEntries.filter(e => e.gym || e.run).length;
  const mlDays     = wEntries.filter(e => e.deepwork || e.impl).length;
  const germanDays = wEntries.filter(e => e.germanStudy).length;

  const rows = document.getElementById('summaryRows');
  if (!rows) return;
  const items = [
    { label:'Weekly XP',   val: wXP + ' / 500',           ok: wXP >= 500 },
    { label:'Training',    val: trainDays + ' / 4 days',   ok: trainDays >= 4 },
    { label:'ML Study',    val: mlDays + ' / 4 days',      ok: mlDays >= 4 },
    { label:'German Days', val: germanDays + ' / 5',       ok: germanDays >= 5 },
    { label:'German Hours',val: wGHrs.toFixed(1) + ' / 20hr', ok: wGHrs >= 20 },
  ];
  rows.innerHTML = items.map(r => `
    <div class="summary-row">
      <span>${r.label}</span>
      <span class="sr-val ${r.ok ? 'sr-ok' : 'sr-warn'}">${r.val}</span>
      <span style="font-size:.65rem;font-family:var(--font-mono);color:${r.ok ? 'var(--green)' : 'var(--muted)'}">${r.ok ? '✓' : '▷'}</span>
    </div>`).join('');
}

// ── BODY STATS ──
function renderBodyStats() {
  const lb = [...bodyHistory].filter(e => e.weight).sort((a,b) => b.date.localeCompare(a.date))[0];
  if (!lb) return;
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const bwEl = document.getElementById('bwCurrent');
  if (bwEl) bwEl.textContent = lb.weight ? lb.weight.toFixed(1) : '—';
  const pct = lb.weight ? Math.min(100, Math.max(0, ((lb.weight - 55) / (65 - 55)) * 100)) : 0;
  const bwBar = document.getElementById('bwBar');
  if (bwBar) bwBar.style.width = pct + '%';
  const bwPct = document.getElementById('bwPct');
  if (bwPct) bwPct.textContent = Math.round(pct) + '% to goal';
  set('dashWeight', lb.weight ? lb.weight.toFixed(1) + ' kg' : '— kg');
  const bodyBarDash = document.getElementById('bodyBarDash');
  if (bodyBarDash) bodyBarDash.style.width = pct + '%';

  const lbPU = [...bodyHistory].filter(e => e.pullupmax).sort((a,b) => b.date.localeCompare(a.date))[0];
  if (lbPU) set('dashPullup', lbPU.pullupmax + ' reps');
  const lbM  = [...bodyHistory].filter(e => e.waist).sort((a,b) => b.date.localeCompare(a.date))[0];
  if (lbM)  { set('dashWaist', lbM.waist + ' cm'); set('dashShoulders', lbM.shoulders ? lbM.shoulders + ' cm' : '—'); }

  const last8 = [...bodyHistory].filter(e => e.weight).sort((a,b) => b.date.localeCompare(a.date)).slice(0,8);
  if (last8.length >= 2) {
    const gain = (last8[0].weight - last8[last8.length - 1].weight) / (last8.length - 1);
    const gainEl = document.getElementById('dashGainWk');
    if (gainEl) gainEl.textContent = (gain >= 0 ? '+' : '') + gain.toFixed(2) + ' kg';
  }

  const todayBody = bodyHistory.find(e => e.date === todayKey());
  if (todayBody) {
    const setN = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v || '—'; };
    setN('cal-today',  todayBody.cals);
    setN('prot-today', todayBody.prot);
    setN('carb-today', todayBody.carb);
    setN('fat-today',  todayBody.fat);
    const pb = document.getElementById('protBar');
    if (pb) pb.style.width = Math.min(100, ((todayBody.prot || 0) / 80) * 100) + '%';
  }
}

// ── STRENGTH PBs ──
function renderStrengthPBs() {
  if (!strengthHistory.length) return;
  const g   = (f) => { const vals = strengthHistory.map(e => e[f]).filter(v => v != null && v > 0); return vals.length ? Math.max(...vals) : null; };
  const pbs = { squat: g('squat'), deadlift: g('deadlift'), wpullup: g('wpullup'), pushup: g('pushup'), bench: g('bench'), row: g('row') };
  const setEl = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };

  setEl('pb-squat',    pbs.squat    ? pbs.squat    + ' kg'    : '— kg');
  setEl('pb-deadlift', pbs.deadlift ? pbs.deadlift + ' kg'    : '— kg');
  setEl('pb-wpullup',  pbs.wpullup  ? '+' + pbs.wpullup + ' kg' : '— kg');
  setEl('pb-pushup',   pbs.pushup   ? pbs.pushup   + ' reps'  : '— reps');
  setEl('pb-bench',    pbs.bench    ? pbs.bench     + ' kg'   : '— kg');
  setEl('pb-row',      pbs.row      ? pbs.row       + ' kg'   : '— kg');
  setEl('dashSquat',   pbs.squat    ? pbs.squat     + ' kg'   : '— kg');
  setEl('dashDeadlift',pbs.deadlift ? pbs.deadlift  + ' kg'   : '—');

  ['squat','deadlift','wpullup','pushup','bench','row'].forEach(k => {
    const vals = strengthHistory.map(e => e[k]).filter(v => v != null && v > 0);
    const tEl  = document.getElementById('pt-' + k);
    if (!tEl || vals.length < 2) return;
    const diff = vals[vals.length - 1] - vals[vals.length - 2];
    tEl.textContent = diff > 0 ? '▲ +' + diff : diff < 0 ? '▼ ' + diff : '— same';
    tEl.style.color = diff > 0 ? 'var(--green)' : diff < 0 ? 'var(--red)' : 'var(--muted)';
  });
}

// ── ENGINE PBs ──
function renderEnginePBs() {
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const all2K      = engineHistory.filter(e => e.twoK).map(e => e.twoK).sort();
  const allFiveK   = engineHistory.filter(e => e.fiveK).map(e => e.fiveK).sort();
  const allTenK    = engineHistory.filter(e => e.tenK).map(e => e.tenK).sort();
  const allFifteenK= engineHistory.filter(e => e.fifteenK).map(e => e.fifteenK).sort();
  const allSprint  = engineHistory.filter(e => e.sprint).map(e => e.sprint).sort((a,b) => a - b);
  const allRHR     = engineHistory.filter(e => e.rhr).map(e => e.rhr).sort((a,b) => a - b);

  set('pb-2k',      all2K[0]        || '—:—');
  set('epb-5k',     allFiveK[0]     || '—:—');
  set('epb-10k',    allTenK[0]      || '—:—');
  set('epb-15k',    allFifteenK[0]  || '—:—');
  set('epb-sprint', allSprint[0]    ? allSprint[0] + 's'   : '— s');
  set('cur-rhr',    allRHR[0]       ? allRHR[0]    + ' bpm' : '— bpm');
  set('dash5KPB',   allFiveK[0]     || '—:—');
  set('dashRHR',    allRHR[0]       ? allRHR[0]    + ' bpm' : '— bpm');
}

// ── ML STATS ──
function renderMLStats() {
  const ml  = state.mlCurrent || {};
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const setW= (id, pct) => { const e = document.getElementById(id); if (e) e.style.width = Math.min(100, pct) + '%'; };

  const lecPct  = Math.round(((ml.lectures      || 0) / (ml.lecturesPlanned      || 21)) * 100);
  const n231Pct = Math.round(((ml.lectures231n  || 0) / (ml.lectures231nPlanned  || 18)) * 100);

  set('ml-lec-pct',   lecPct  + '%');
  set('ml-231n-pct',  n231Pct + '%');
  set('ml-lec-done',  ml.lectures      || 0);
  set('ml-lec-plan',  ml.lecturesPlanned || 21);
  set('ml-231n-done', ml.lectures231n  || 0);
  set('ml-231n-plan', ml.lectures231nPlanned || 18);
  set('ml-proj-show', ml.projects || 0);
  set('ml-com-show',  ml.commits  || 0);
  set('dashProjects', ml.projects || 0);
  set('dashCurrPct',  lecPct + '%');

  setW('lecturesBar',     lecPct);
  setW('lectures231nBar', n231Pct);

  const inpLec = document.getElementById('inp-lectures');
  if (inpLec) inpLec.value = ml.lectures || 0;
  const inp231 = document.getElementById('inp-231n');
  if (inp231)  inp231.value  = ml.lectures231n || 0;
}

// ── GERMAN STATS ──
function renderGermanStats() {
  const mh  = state.germanMethodHours || {};
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const setW= (id, pct) => { const e = document.getElementById(id); if (e) e.style.width = Math.min(100, pct) + '%'; };

  ['textbook','anki','youtube','podcast','speaking','writing'].forEach(m => {
    set('hrs-' + m, (mh[m] || 0).toFixed(1));
  });

  const tg = state.germanTotalHours || 0;
  const ws = getWeekStart();
  const wg = (state.germanWeekly || {})[ws] || 0;

  set('german-total-hours', tg.toFixed(1));
  set('german-weekly-show', wg.toFixed(1));
  set('dashGermanHours',    tg.toFixed(1));
  set('dashGermanWeek',     wg.toFixed(1));
  set('total-words',        state.germanTotalWords       || 0);
  set('total-speaking-min', state.germanTotalSpeakingMin || 0);

  setW('germanWeeklyBar', (wg / 20) * 100);
}

// ── ANALYTICS ──
function renderAnalytics() {
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const now = new Date();
  const daysElapsed = Math.max(1, Math.floor((now - CAMPAIGN_START) / 86400000));
  const pace = ((state.totalXP || 0) / daysElapsed).toFixed(1);
  set('an-pace', pace);
  set('an-pace-sub', 'XP/day avg');

  const weekXPs = Object.entries(state.weeklyXPHistory || {});
  if (weekXPs.length) {
    const best = weekXPs.reduce((m, [k,v]) => v > m[1] ? [k,v] : m, ['',0]);
    set('an-bestweek',     best[1] + ' XP');
    set('an-bestweek-sub', best[0] ? fmtDate(best[0]) : '—');
  }

  const activeDays  = new Set(xpHistory.map(e => e.date)).size;
  const consistency = daysElapsed > 0 ? Math.round((activeDays / daysElapsed) * 100) : 0;
  set('an-consistency', consistency + '%');

  const xpNeededForMax = 13 * 500;
  const remainingXP   = xpNeededForMax - (state.totalXP || 0);
  const daysToFinish  = parseFloat(pace) > 0 ? Math.ceil(remainingXP / parseFloat(pace)) : '?';
  set('an-projected', daysToFinish + ' days');
}

function renderHabits() {
  const habCounts = state.habitCounts || {};
  ['junk','scroll','sleep','game','skipger','skiptrain'].forEach(k => {
    const e = document.getElementById('hab-' + k);
    if (e) e.textContent = habCounts[k] || 0;
  });
  const totalHabXP = habitHistory.reduce((s, e) => s + (e.xpCost || 0), 0);
  const hxp = document.getElementById('habitXPLost');
  if (hxp) hxp.textContent = totalHabXP;
}

function renderLevelTimeline() {
  const tl = document.getElementById('levelTimeline');
  if (!tl) return;
  tl.innerHTML = LEVELS.map(l => {
    const isDone    = l.num < state.currentLevel;
    const isCurrent = l.num === state.currentLevel;
    const cls = isDone ? 'done' : isCurrent ? 'current' : '';
    const rankColors = { 'E':'#6b7280','D':'#22c55e','C':'#38bdf8','B':'#818cf8','A':'#f59e0b','S':'#ff4757','S+':'#c026d3','SS':'#a78bfa','∞':'#fbbf24' };
    const rc = rankColors[l.rank] || 'var(--muted)';
    return `<div class="lnode">
      <div class="ldot ${cls}" style="${isCurrent?`border-color:${rc};color:${rc};box-shadow:0 0 14px ${rc}55`:isDone?`border-color:${rc}88;background:${rc}22;color:${rc}`:''}">
        ${isDone ? '✓' : `<span style="font-size:.55rem;font-weight:700;">${l.rank}</span>`}
      </div>
      <div class="lname" style="${isCurrent?`color:${rc};font-weight:600;`:isDone?'color:var(--muted)':''}">
        ${l.name}
        ${isCurrent?`<span style="display:block;font-size:.55rem;color:${rc};opacity:.8;">CURRENT</span>`:''}
      </div>
    </div>`;
  }).join('');
}

// ── HISTORY FEEDS (dispatch to part 2) ──
function renderHistoryFeeds() {
  renderRecentActivity();
  renderBodyHistoryFeed();
  renderEngineHistoryFeed();
  renderMLHistoryFeed();
  renderGermanHistoryFeed();
}

function renderRecentActivity() {
  const feed = document.getElementById('recentActivityFeed');
  if (!feed) return;
  const recent = [...xpHistory].sort((a,b) => b.date.localeCompare(a.date)).slice(0,7);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No activity logged yet</div>'; return; }
  const DT_COLORS = { prime:'fp-cyan', core:'fp-green', social:'fp-gold', recovery:'fp-purple' };
  feed.innerHTML = recent.map(e => {
    const pills = [];
    if (e.gym)       pills.push('<span class="feed-pill fp-orange">Gym</span>');
    if (e.run)       pills.push('<span class="feed-pill fp-orange">Run</span>');
    if (e.deepwork)  pills.push('<span class="feed-pill fp-purple">ML 90min</span>');
    if (e.impl)      pills.push('<span class="feed-pill fp-purple">ML Impl</span>');
    if (e.germanStudy) pills.push('<span class="feed-pill fp-gold">German' + (e.germanHrs ? ' ' + e.germanHrs + 'hr' : '') + '</span>');
    if (e.protein)   pills.push('<span class="feed-pill fp-green">Protein</span>');
    if (e.mobility)  pills.push('<span class="feed-pill fp-muted">Mobility</span>');
    return '<div class="feed-item">' +
      '<div class="feed-date">' + fmtDate(e.date) + '</div>' +
      '<div class="feed-content">' +
        '<div class="feed-title" style="color:var(--accent)">' + e.xp + ' XP <span class="feed-pill ' + (DT_COLORS[e.dayType]||'fp-muted') + '" style="margin-left:6px;">' + ((e.dayType||'—').toUpperCase()) + '</span></div>' +
        '<div class="feed-pills" style="margin-top:5px;">' + (pills.join('') || '<span class="feed-pill fp-muted">no logs</span>') + '</div>' +
      '</div>' +
      (isKeith() ? '<div class="feed-actions"><button class="feed-del-btn" onclick="deleteXPEntry(\'' + e.date + '\')">DEL</button></div>' : '') +
    '</div>';
  }).join('');
}

function renderBodyHistoryFeed() {
  const feed = document.getElementById('bodyHistoryFeed');
  if (!feed) return;
  // Only show nutrition entries (entries that have meal data or calories)
  const recent = [...bodyHistory]
    .filter(e => e.cals || e.meals)
    .sort((a,b) => b.date.localeCompare(a.date))
    .slice(0, 15);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No nutrition logged yet</div>'; return; }

  const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snacks: '🍎' };
  const MEAL_COLORS = { breakfast: 'var(--accent)', lunch: 'var(--gold)', dinner: 'var(--purple)', snacks: 'var(--muted)' };

  feed.innerHTML = recent.map(e => {
    // Top-level totals
    const totalPills = [];
    if (e.cals) totalPills.push(`<span class="feed-pill fp-orange" style="font-weight:700;">${e.cals} kcal</span>`);
    if (e.prot) totalPills.push(`<span class="feed-pill fp-green">🥩 ${e.prot}g protein</span>`);

    // Per-meal breakdown — only cal + prot
    let mealRows = '';
    if (e.meals) {
      mealRows = Object.entries(e.meals)
        .filter(([,m]) => m && (m.cal || m.prot))
        .map(([key, m]) => {
          const parts = [];
          if (m.cal)  parts.push(`<span style="color:var(--orange);font-weight:600;">${m.cal} kcal</span>`);
          if (m.prot) parts.push(`<span style="color:var(--green);">${m.prot}g prot</span>`);
          if (m.desc) parts.push(`<span style="color:var(--muted);font-size:.7em;">${m.desc}</span>`);
          return `<div class="nutr-meal-row">
            <span style="color:${MEAL_COLORS[key]};font-family:var(--font-display);font-size:.8rem;min-width:80px;">${MEAL_ICONS[key]} ${key.toUpperCase()}</span>
            <span style="display:flex;gap:8px;align-items:center;">${parts.join(' · ')}</span>
          </div>`;
        }).join('');
    }

    return `<div class="feed-item" style="flex-direction:column;align-items:stretch;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <div class="feed-date" style="margin:0;">${fmtDate(e.date)}</div>
        <div style="display:flex;gap:6px;align-items:center;">
          ${totalPills.join('')}
          ${isKeith() ? `<button class="feed-del-btn" onclick="deleteBodyEntry('${e.date}')">DEL</button>` : ''}
        </div>
      </div>
      ${mealRows ? `<div class="nutr-meal-breakdown">${mealRows}</div>` : ''}
    </div>`;
  }).join('');
}

function renderEngineHistoryFeed() {
  const feed = document.getElementById('engineHistoryFeed');
  if (!feed) return;
  const recent = [...engineHistory].sort((a,b) => b.date.localeCompare(a.date)).slice(0,12);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No cardio logged yet</div>'; return; }
  const TYPE_LABELS = { run2k:'2K', run5k:'5K', run10k:'10K', run15k:'15K', run20k:'20K', sprint:'Sprint' };
  feed.innerHTML = recent.map(e => {
    const time = e.twoK || e.fiveK || e.tenK || e.fifteenK || e.twentyK || (e.sprint ? e.sprint + 's ' + (e.sprintDist||'') : null);
    const pills = [];
    pills.push(`<span class="feed-pill fp-purple">${TYPE_LABELS[e.type]||e.type}</span>`);
    if (time) pills.push(`<span class="feed-pill fp-cyan">⏱ ${time}</span>`);
    if (e.rhr) pills.push(`<span class="feed-pill fp-green">HR: ${e.rhr} bpm</span>`);
    if (e.notes) pills.push(`<span class="feed-pill fp-muted">${e.notes.slice(0,30)}</span>`);
    return `<div class="feed-item">
      <div class="feed-date">${fmtDate(e.date)}</div>
      <div class="feed-content">
        <div class="feed-pills">${pills.join('')}</div>
      </div>
      ${isKeith() ? `<div class="feed-actions"><button class="feed-edit-btn" onclick="editEngineEntry('${e.date}')">EDIT</button><button class="feed-del-btn" onclick="deleteEngineEntry('${e.date}')">DEL</button></div>` : ''}
    </div>`;
  }).join('');
}

function renderMLHistoryFeed() {
  const feed = document.getElementById('mlHistoryFeed');
  if (!feed) return;
  const recent = [...mlHistory].sort((a,b) => b.date.localeCompare(a.date)).slice(0,10);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No ML logs yet</div>'; return; }
  feed.innerHTML = recent.map(e => {
    const pills = [];
    if (e.lectures)    pills.push(`<span class="feed-pill fp-cyan">CS229: ${e.lectures}/${e.lecturesPlanned||21}</span>`);
    if (e.lectures231n)pills.push(`<span class="feed-pill fp-purple">CS231N: ${e.lectures231n}/${e.lectures231nPlanned||18}</span>`);
    if (e.projects)    pills.push(`<span class="feed-pill fp-orange">Projects: ${e.projects}</span>`);
    if (e.commits)     pills.push(`<span class="feed-pill fp-green">Commits: ${e.commits}</span>`);
    if (e.dlnlp)       pills.push(`<span class="feed-pill fp-muted">DL/NLP: ${e.dlnlp}</span>`);
    return `<div class="feed-item">
      <div class="feed-date">${fmtDate(e.date)}</div>
      <div class="feed-content">
        <div class="feed-pills">${pills.join('') || '<span class="feed-pill fp-muted">Updated</span>'}</div>
      </div>
      ${isKeith() ? `<div class="feed-actions"><button class="feed-del-btn" onclick="deleteMLEntry('${e.date}')">DEL</button></div>` : ''}
    </div>`;
  }).join('');
}

function renderGermanHistoryFeed() {
  const feed = document.getElementById('germanHistoryFeed');
  if (!feed) return;
  const recent = [...germanHistory].sort((a,b) => b.date.localeCompare(a.date)).slice(0,20);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No German sessions logged yet</div>'; return; }
  const ICONS = { textbook:'📖', anki:'🃏', youtube:'▶️', podcast:'🎧', speaking:'🗣️', writing:'✍️' };
  feed.innerHTML = recent.map(e => {
    const pills = [];
    pills.push(`<span class="feed-pill fp-gold">${ICONS[e.method]||''} ${e.method}</span>`);
    pills.push(`<span class="feed-pill fp-cyan">+${e.hours}hr</span>`);
    if (e.topic) pills.push(`<span class="feed-pill fp-muted">${e.topic.slice(0,30)}</span>`);
    if (e.words) pills.push(`<span class="feed-pill fp-green">${e.words} words</span>`);
    if (e.min)   pills.push(`<span class="feed-pill fp-purple">${e.min} min spoken</span>`);
    return `<div class="feed-item">
      <div class="feed-date">${fmtDate(e.date)}</div>
      <div class="feed-content">
        <div class="feed-pills">${pills.join('')}</div>
        <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--muted);margin-top:3px;">Week total: ${e.weekTotal ? e.weekTotal.toFixed(1) : '0.0'}hr · Campaign: ${e.campaignTotal ? e.campaignTotal.toFixed(1) : '0.0'}hr</div>
      </div>
      ${isKeith() ? `<div class="feed-actions"><button class="feed-edit-btn" onclick="editGermanEntry('${e.date}')">EDIT</button><button class="feed-del-btn" onclick="deleteGermanEntry('${e.date}')">DEL</button></div>` : ''}
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════
// PB HISTORY MODAL (Strength)
// ═══════════════════════════════════════════════════════
let _pbChart = null;

function openPBModal(lift) {
  const LIFT_LABELS = { squat:'SQUAT', deadlift:'DEADLIFT', wpullup:'WEIGHTED PULL-UP', pushup:'PUSH-UPS', bench:'BENCH PRESS', row:'BARBELL ROW' };
  const LIFT_UNITS  = { squat:'kg', deadlift:'kg', wpullup:'kg', pushup:'reps', bench:'kg', row:'kg' };

  const entries = [...strengthHistory]
    .filter(e => e[lift] != null && e[lift] > 0)
    .sort((a,b) => a.date.localeCompare(b.date));

  if (!entries.length) { notify('No ' + LIFT_LABELS[lift] + ' data yet', 'var(--muted)'); return; }

  const modal = document.getElementById('pbModal');
  document.getElementById('pbModalTitle').textContent = LIFT_LABELS[lift] + ' HISTORY';

  // Build history list
  const maxVal = Math.max(...entries.map(e => e[lift]));
  const list = document.getElementById('pbHistoryList');
  let runningPB = 0;
  list.innerHTML = [...entries].reverse().map((e, i) => {
    const isNewPB = e[lift] > runningPB;
    if (i === 0) runningPB = e[lift]; // entries are reversed
    const allVals = entries.map(x => x[lift]);
    // rebuild running PB from original order
    const origIdx = entries.indexOf(e);
    const pbUpToNow = Math.max(...entries.slice(0, origIdx + 1).map(x => x[lift]));
    const isPB = e[lift] >= maxVal;
    return `<div class="pb-history-row">
      <span style="color:var(--muted)">${fmtDate(e.date)}</span>
      <span class="phv">${e[lift]} ${LIFT_UNITS[lift]}${isPB ? '<span class="pb-new-badge">PB</span>' : ''}</span>
      ${e.notes ? `<span style="font-family:var(--font-mono);font-size:.65rem;color:var(--muted);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.notes}</span>` : '<span></span>'}
    </div>`;
  }).join('');

  // Build mini chart
  if (_pbChart) { _pbChart.destroy(); _pbChart = null; }
  const ctx = document.getElementById('pbHistoryChart');
  if (ctx && entries.length) {
    _pbChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: entries.map(e => fmtDate(e.date)),
        datasets: [{
          label: LIFT_LABELS[lift],
          data: entries.map(e => e[lift]),
          borderColor: '#fbbf24',
          backgroundColor: 'rgba(251,191,36,.07)',
          tension: .3,
          pointRadius: 4,
          pointBackgroundColor: entries.map(e => e[lift] >= maxVal ? '#f59e0b' : '#3b82f6'),
          pointBorderColor: entries.map(e => e[lift] >= maxVal ? '#f59e0b' : '#3b82f6'),
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#4a4e62', font: { size: 9 } }, grid: { color: '#111115' } },
          y: { ticks: { color: '#4a4e62', font: { size: 9 } }, grid: { color: '#111115' } },
        }
      }
    });
  }

  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('open'));
}

function closePBModal() {
  const modal = document.getElementById('pbModal');
  modal.classList.remove('open');
  setTimeout(() => { modal.style.display = 'none'; }, 260);
}

// ═══════════════════════════════════════════════════════
// EDIT MODAL ENGINE
// ═══════════════════════════════════════════════════════
let _editSaveFn = null;

function openEditModal(title, date, fields, saveFn) {
  const modal = document.getElementById('editModal');
  document.getElementById('editModalTitle').textContent = title;
  const dateEl = document.getElementById('editModalDate');
  if (dateEl) dateEl.textContent = date;

  const body = document.getElementById('editModalBody');
  body.innerHTML = fields.map(f => `
    <div class="f ${f.full ? 'full' : ''}">
      <label>${f.label}</label>
      ${f.type === 'select'
        ? `<select id="em-${f.key}">${(f.options||[]).map(o => `<option value="${o}" ${f.value == o ? 'selected' : ''}>${o}</option>`).join('')}</select>`
        : `<input type="${f.type||'text'}" id="em-${f.key}" value="${f.value !== null && f.value !== undefined ? f.value : ''}" placeholder="${f.placeholder||''}" step="${f.step||'any'}">`
      }
    </div>`).join('');

  _editSaveFn = saveFn;
  const saveBtn = document.getElementById('editModalSaveBtn');
  if (saveBtn) saveBtn.onclick = () => _editSaveFn();

  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('open'));
}

function closeEditModal() {
  const modal = document.getElementById('editModal');
  modal.classList.remove('open');
  setTimeout(() => { modal.style.display = 'none'; _editSaveFn = null; }, 260);
}

function emVal(key)   { const el = document.getElementById('em-' + key); return el ? el.value : ''; }
function emFloat(key) { return parseFloat(emVal(key)) || null; }
function emInt(key)   { return parseInt(emVal(key))   || null; }

// ── BODY EDIT / DELETE ──
function editBodyEntry(date) {
  if (!isKeith()) return;
  const entry = bodyHistory.find(e => e.date === date);
  if (!entry) return;
  openEditModal('EDIT BODY ENTRY', date, [
    { key:'weight',   label:'Bodyweight (kg)',  type:'number', value:entry.weight||'',   placeholder:'63.5',  step:'0.1' },
    { key:'waist',    label:'Waist (cm)',        type:'number', value:entry.waist||'',    placeholder:'78',    step:'0.5' },
    { key:'shoulders',label:'Shoulders (cm)',   type:'number', value:entry.shoulders||'',placeholder:'112',   step:'0.5' },
    { key:'pullupmax',label:'Pull-up Max',       type:'number', value:entry.pullupmax||'',placeholder:'10',   step:'1' },
    { key:'cals',     label:'Calories',          type:'number', value:entry.cals||'',     placeholder:'2800', step:'1' },
    { key:'prot',     label:'Protein (g)',        type:'number', value:entry.prot||'',     placeholder:'80',   step:'1' },
  ], async () => {
    if (emVal('weight'))    entry.weight    = emFloat('weight');
    if (emVal('waist'))     entry.waist     = emFloat('waist');
    if (emVal('shoulders')) entry.shoulders = emFloat('shoulders');
    if (emVal('pullupmax')) entry.pullupmax = emInt('pullupmax');
    if (emVal('cals'))      entry.cals      = emInt('cals');
    if (emVal('prot'))      entry.prot      = emInt('prot');
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${date}`, { data: entry });
    await saveState();
    notify('✏ Body entry updated', 'var(--accent)');
    closeEditModal();
    refreshAll();
    buildBodyChart();
  });
}

async function deleteBodyEntry(date) {
  if (!isKeith()) return;
  if (!confirm('Delete body entry for ' + date + '?')) return;
  const idx = bodyHistory.findIndex(e => e.date === date);
  if (idx < 0) return;
  bodyHistory.splice(idx, 1);
  await supaFetch('DELETE', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${date}`);
  notify('🗑 Body entry deleted', 'var(--red)');
  refreshAll();
  buildBodyChart();
}

// ── ENGINE EDIT / DELETE ──
function editEngineEntry(date) {
  if (!isKeith()) return;
  const entry = engineHistory.find(e => e.date === date);
  if (!entry) return;
  const timeKey   = entry.twoK ? 'twoK' : entry.fiveK ? 'fiveK' : entry.tenK ? 'tenK' : entry.fifteenK ? 'fifteenK' : entry.twentyK ? 'twentyK' : 'fiveK';
  const timeLabel = { twoK:'2K Time',fiveK:'5K Time',tenK:'10K Time',fifteenK:'15K Time',twentyK:'20K Time' }[timeKey];
  openEditModal('EDIT CARDIO', date, [
    { key:'time',  label:timeLabel + ' (mm:ss)', type:'text',   value:entry[timeKey]||'', placeholder:'mm:ss' },
    { key:'rhr',   label:'Resting HR (bpm)',     type:'number', value:entry.rhr||'',      placeholder:'58', step:'1' },
    { key:'notes', label:'Notes', full:true,     type:'text',   value:entry.notes||'',    placeholder:'Notes…' },
  ], async () => {
    if (emVal('time'))  entry[timeKey] = emVal('time');
    if (emVal('rhr'))   entry.rhr      = emInt('rhr');
    entry.notes = emVal('notes');
    await supaFetch('PATCH', `rebuilder_logs?type=eq.engine_logs&logged_at=eq.${date}`, { data: entry });
    await saveState();
    notify('✏ Cardio updated', 'var(--purple)');
    closeEditModal();
    refreshAll();
    buildEngineChart();
  });
}

async function deleteEngineEntry(date) {
  if (!isKeith()) return;
  if (!confirm('Delete cardio entry for ' + date + '?')) return;
  const idx = engineHistory.findIndex(e => e.date === date);
  if (idx < 0) return;
  engineHistory.splice(idx, 1);
  await supaFetch('DELETE', `rebuilder_logs?type=eq.engine_logs&logged_at=eq.${date}`);
  notify('🗑 Cardio deleted', 'var(--red)');
  refreshAll();
  buildEngineChart();
}

// ── GERMAN EDIT / DELETE ──
function editGermanEntry(date) {
  if (!isKeith()) return;
  const entry = germanHistory.find(e => e.date === date);
  if (!entry) return;
  openEditModal('EDIT GERMAN SESSION', date, [
    { key:'hours',  label:'Hours',             type:'number', value:entry.hours||0,    placeholder:'0',   step:'0.5' },
    { key:'words',  label:'New Words',         type:'number', value:entry.words||0,    placeholder:'0',   step:'1' },
    { key:'min',    label:'Speak/Listen min',  type:'number', value:entry.min||0,      placeholder:'0',   step:'5' },
    { key:'wwords', label:'Writing Words',     type:'number', value:entry.wWords||0,   placeholder:'0',   step:'10' },
    { key:'topic',  label:'Topic Covered', full:true, type:'text', value:entry.topic||'', placeholder:'e.g. Konjunktiv II' },
  ], async () => {
    const oldHrs = entry.hours || 0;
    const newHrs = parseFloat(emVal('hours')) || 0;
    const diff   = newHrs - oldHrs;
    entry.hours  = newHrs;
    if (emVal('words'))  entry.words  = emInt('words');
    if (emVal('min'))    entry.min    = emInt('min');
    if (emVal('wwords')) entry.wWords = emInt('wwords');
    entry.topic  = emVal('topic');
    state.germanTotalHours = Math.max(0, (state.germanTotalHours || 0) + diff);
    if (state.germanMethodHours && entry.method)
      state.germanMethodHours[entry.method] = Math.max(0, (state.germanMethodHours[entry.method] || 0) + diff);
    const ws = getWeekStart();
    if (entry.date >= ws && state.germanWeekly)
      state.germanWeekly[ws] = Math.max(0, (state.germanWeekly[ws] || 0) + diff);
    await supaFetch('PATCH', `rebuilder_logs?type=eq.german_logs&logged_at=eq.${date}`, { data: entry });
    await saveState();
    notify('✏ German session updated', 'var(--gold)');
    closeEditModal();
    refreshAll();
    buildGermanChart();
  });
}

async function deleteGermanEntry(date) {
  if (!isKeith()) return;
  if (!confirm('Delete German session for ' + date + '?')) return;
  const idx = germanHistory.findIndex(e => e.date === date);
  if (idx < 0) return;
  const entry = germanHistory[idx];
  state.germanTotalHours = Math.max(0, (state.germanTotalHours || 0) - (entry.hours || 0));
  if (state.germanMethodHours && entry.method)
    state.germanMethodHours[entry.method] = Math.max(0, (state.germanMethodHours[entry.method] || 0) - (entry.hours || 0));
  const ws = getWeekStart();
  if (state.germanWeekly && state.germanWeekly[ws])
    state.germanWeekly[ws] = Math.max(0, state.germanWeekly[ws] - (entry.hours || 0));
  germanHistory.splice(idx, 1);
  await supaFetch('DELETE', `rebuilder_logs?type=eq.german_logs&logged_at=eq.${date}`);
  await saveState();
  notify('🗑 German session deleted', 'var(--red)');
  refreshAll();
  buildGermanChart();
}

// ── ML DELETE ──
async function deleteMLEntry(date) {
  if (!isKeith()) return;
  if (!confirm('Delete ML entry for ' + date + '?')) return;
  const idx = mlHistory.findIndex(e => e.date === date);
  if (idx < 0) return;
  mlHistory.splice(idx, 1);
  await supaFetch('DELETE', `rebuilder_logs?type=eq.ml_logs&logged_at=eq.${date}`);
  notify('🗑 ML entry deleted', 'var(--red)');
  refreshAll();
}

// ── XP DELETE ──
async function deleteXPEntry(date) {
  if (!isKeith()) return;
  if (!confirm('Delete XP entry for ' + date + '?')) return;
  const idx = xpHistory.findIndex(e => e.date === date);
  if (idx < 0) return;
  state.totalXP = Math.max(0, state.totalXP - (xpHistory[idx].xp || 0));
  xpHistory.splice(idx, 1);
  await supaFetch('DELETE', `rebuilder_logs?type=eq.xp_logs&logged_at=eq.${date}`);
  await saveState();
  notify('🗑 XP entry deleted', 'var(--red)');
  refreshAll();
}

// ═══════════════════════════════════════════════════════
// CHARTS
// ═══════════════════════════════════════════════════════
const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#4a4e62', font: { family: 'Share Tech Mono', size: 10 } } },
    tooltip: { backgroundColor: '#0d0d0f', borderColor: '#1a1a22', borderWidth: 1, titleFont: { family: 'Share Tech Mono' }, bodyFont: { family: 'Share Tech Mono' } },
  },
  scales: {
    x: { ticks: { color: '#4a4e62', font: { size: 9 } }, grid: { color: '#111115' } },
    y: { ticks: { color: '#4a4e62', font: { size: 9 } }, grid: { color: '#111115' } },
  }
};

function destroyChart(key) {
  if (charts[key]) { try { charts[key].destroy(); } catch(e){} charts[key] = null; }
}

function buildAllCharts() {
  buildXPChart();
  buildWeightChart();
  buildGermanAnalyticsChart();
  buildMLChart();
  buildDayTypeChart();
  buildEngineAnalyticsChart();
  buildBodyChart();
  buildStrengthChart(_strengthChartFilter);
  buildEngineChart();
  buildGermanChart();
}

function updateCharts() {
  buildAllCharts();
}

// XP Chart (Analytics)
function buildXPChart() {
  destroyChart('xp');
  const ctx = document.getElementById('chartXP');
  if (!ctx) return;
  const weeks = [], wXPs = [];
  for (let i = 9; i >= 0; i--) {
    const ws  = getWeekLabel(i);
    const we  = new Date(ws); we.setDate(we.getDate() + 7);
    const weStr = we.toISOString().split('T')[0];
    const wXP = xpHistory.filter(e => e.date >= ws && e.date < weStr).reduce((s, e) => s + (e.xp || 0), 0);
    weeks.push('W-' + i);
    wXPs.push(wXP);
  }
  charts['xp'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeks,
      datasets: [
        { label: 'Weekly XP', data: wXPs, backgroundColor: wXPs.map(x => x >= 500 ? 'rgba(45,212,191,.8)' : x >= 300 ? 'rgba(0,229,255,.7)' : 'rgba(244,63,94,.6)'), borderWidth: 0 },
        { label: 'Target 500', data: weeks.map(() => 500), type: 'line', borderColor: 'rgba(251,191,36,.5)', borderDash: [5,5], pointRadius: 0, backgroundColor: 'transparent' },
      ]
    },
    options: { ...CHART_OPTS, scales: { ...CHART_OPTS.scales, y: { ...CHART_OPTS.scales.y, min: 0, max: 650 } } }
  });
}

// Weight Chart (Analytics)
function buildWeightChart() {
  destroyChart('weight');
  const ctx = document.getElementById('chartWeight');
  if (!ctx) return;
  const data = [...bodyHistory].filter(e => e.weight).sort((a,b) => a.date.localeCompare(b.date)).slice(-24);
  if (!data.length) return;
  charts['weight'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(e => fmtDate(e.date)),
      datasets: [
        { label: 'Weight (kg)', data: data.map(e => e.weight), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,.07)', tension: .3, pointRadius: 3 },
        { label: 'Goal 65kg',   data: data.map(() => 65), borderColor: 'rgba(34,197,94,.4)', borderDash: [5,5], pointRadius: 0 },
      ]
    },
    options: { ...CHART_OPTS, scales: { ...CHART_OPTS.scales, y: { ...CHART_OPTS.scales.y, min: 50, max: 72 } } }
  });
}

// Body Weight Chart (Body tab)
function buildBodyChart() {
  destroyChart('weightBody');
  const ctx = document.getElementById('chartWeightBody');
  if (!ctx) return;
  const data = [...bodyHistory].filter(e => e.weight).sort((a,b) => a.date.localeCompare(b.date)).slice(-20);
  if (!data.length) return;
  charts['weightBody'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(e => fmtDate(e.date)),
      datasets: [
        { label: 'Weight (kg)', data: data.map(e => e.weight), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,.08)', tension: .3, pointRadius: 4, pointBackgroundColor: '#3b82f6', fill: true },
        { label: 'Goal 65kg',   data: data.map(() => 65), borderColor: 'rgba(34,197,94,.4)', borderDash: [4,4], pointRadius: 0 },
        { label: 'Min 55kg',    data: data.map(() => 55), borderColor: 'rgba(37,99,235,.3)', borderDash: [4,4], pointRadius: 0 },
      ]
    },
    options: { ...CHART_OPTS, scales: { ...CHART_OPTS.scales, y: { ...CHART_OPTS.scales.y, min: 50, max: 70 } } }
  });
}

// German Chart (Analytics)
function buildGermanAnalyticsChart() {
  destroyChart('germanAnalytics');
  const ctx = document.getElementById('chartGermanAnalytics');
  if (!ctx) return;
  const weeks = [], hrs = [];
  for (let i = 9; i >= 0; i--) {
    const ws = getWeekLabel(i);
    weeks.push('W-' + i);
    hrs.push((state.germanWeekly || {})[ws] || 0);
  }
  charts['germanAnalytics'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeks,
      datasets: [
        { label: 'German Hours', data: hrs, backgroundColor: hrs.map(h => h >= 20 ? 'rgba(34,197,94,.8)' : h >= 15 ? 'rgba(245,158,11,.75)' : 'rgba(129,140,248,.65)'), borderWidth: 0 },
        { label: 'Target 20hr',  data: weeks.map(() => 20), type: 'line', borderColor: 'rgba(251,191,36,.5)', borderDash: [5,5], pointRadius: 0, backgroundColor: 'transparent' },
      ]
    },
    options: { ...CHART_OPTS, scales: { ...CHART_OPTS.scales, y: { ...CHART_OPTS.scales.y, min: 0, max: 25 } } }
  });
}

// German Chart (German tab)
function buildGermanChart() {
  destroyChart('german');
  const ctx = document.getElementById('chartGerman');
  if (!ctx) return;
  const weeks = [], hrs = [];
  for (let i = 11; i >= 0; i--) {
    const ws = getWeekLabel(i);
    weeks.push('W-' + i);
    hrs.push((state.germanWeekly || {})[ws] || 0);
  }
  charts['german'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeks,
      datasets: [
        { label: 'German Hours', data: hrs, backgroundColor: hrs.map(h => h >= 20 ? 'rgba(34,197,94,.8)' : h >= 15 ? 'rgba(245,158,11,.75)' : 'rgba(129,140,248,.65)'), borderWidth: 0 },
        { label: 'Target 20hr',  data: weeks.map(() => 20), type: 'line', borderColor: 'rgba(251,191,36,.5)', borderDash: [5,5], pointRadius: 0, backgroundColor: 'transparent' },
      ]
    },
    options: { ...CHART_OPTS, scales: { ...CHART_OPTS.scales, y: { ...CHART_OPTS.scales.y, min: 0, max: 25 } } }
  });
}

// ML Chart
function buildMLChart() {
  destroyChart('ml');
  const ctx = document.getElementById('chartML');
  if (!ctx) return;
  const trackIds = {
    'CS229':  ['cs-1','cs-2','cs-3','cs-4','cs-5','cs-6','cs-7','cs-8','cs-9','cs-10','cs-11','cs-12','cs-13','cs-14','cs-15','cs-16','cs-17','cs-18','cs-19','cs-20','cs-21'],
    'DL':     ['dl-1','dl-2','dl-3','dl-4','dl-5','dl-6','dl-7','dl-8','dl-9','dl-10'],
    'NLP':    ['nlp-1','nlp-2','nlp-3','nlp-4','nlp-5','nlp-6','nlp-7','nlp-8','nlp-9','nlp-10'],
    'CS231N': ['n231-1','n231-2','n231-3','n231-4','n231-5','n231-6','n231-7','n231-8','n231-9','n231-10','n231-11','n231-12','n231-13','n231-14','n231-15','n231-16','n231-17','n231-18'],
  };
  const doneCounts = {}, totalCounts = {};
  Object.entries(trackIds).forEach(([label, ids]) => {
    doneCounts[label]  = ids.filter(id => state.curriculum && state.curriculum[id]).length;
    totalCounts[label] = ids.length;
  });
  const labels = Object.keys(trackIds);
  const doneData = labels.map(l => doneCounts[l]);
  const remData  = labels.map(l => totalCounts[l] - doneCounts[l]);
  charts['ml'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [...labels.map(l => l + ' done'), ...labels.map(l => l + ' rem')],
      datasets: [{
        data: [...doneData, ...remData],
        backgroundColor: [
          'rgba(0,229,255,.85)', 'rgba(167,139,250,.85)', 'rgba(251,191,36,.8)', 'rgba(244,63,94,.8)',
          'rgba(0,229,255,.1)', 'rgba(167,139,250,.1)', 'rgba(251,191,36,.08)', 'rgba(244,63,94,.08)',
        ],
        borderWidth: 1,
        borderColor: '#080808',
      }]
    },
    options: { ...CHART_OPTS, cutout: '58%', scales: undefined }
  });
}

// Day Type Chart
function buildDayTypeChart() {
  destroyChart('dayType');
  const ctx = document.getElementById('chartDayType');
  if (!ctx) return;
  const counts = { prime: 0, core: 0, social: 0, recovery: 0 };
  Object.values(state.dayTypeHistory || {}).forEach(t => { if (counts[t] !== undefined) counts[t]++; });
  charts['dayType'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['🔥 Prime', '⚡ Core', '🤝 Social', '🛌 Recovery'],
      datasets: [{
        data: [counts.prime, counts.core, counts.social, counts.recovery],
        backgroundColor: ['rgba(0,229,255,.85)','rgba(45,212,191,.8)','rgba(251,191,36,.8)','rgba(167,139,250,.8)'],
        borderWidth: 2, borderColor: '#080808',
      }]
    },
    options: { ...CHART_OPTS, cutout: '55%', scales: undefined }
  });
}

// Strength Chart (Strength tab) — with filter
function filterStrengthChart(filter, el) {
  _strengthChartFilter = filter;
  document.querySelectorAll('.cf-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  buildStrengthChart(filter);
}

function buildStrengthChart(filter = 'all') {
  destroyChart('strength');
  const ctx = document.getElementById('chartStrength');
  if (!ctx) return;
  const data = [...strengthHistory].sort((a,b) => a.date.localeCompare(b.date)).slice(-20);
  if (!data.length) return;

  const allDatasets = [
    { key:'squat',    label:'Squat',     color:'#2563eb' },
    { key:'deadlift', label:'Deadlift',  color:'#fbbf24' },
    { key:'bench',    label:'Bench',     color:'#3b82f6' },
    { key:'wpullup',  label:'W.Pull-up', color:'#818cf8' },
    { key:'row',      label:'Row',       color:'#a78bfa' },
  ];

  const filtered = filter === 'all'
    ? allDatasets
    : allDatasets.filter(d => d.key === filter);

  const datasets = filtered
    .filter(d => data.some(e => e[d.key] != null))
    .map(d => ({
      label: d.label,
      data: data.map(e => e[d.key] || null),
      borderColor: d.color,
      backgroundColor: d.color + '15',
      tension: .3,
      pointRadius: 3,
      spanGaps: true,
      fill: filter !== 'all',
    }));

  charts['strength'] = new Chart(ctx, {
    type: 'line',
    data: { labels: data.map(e => fmtDate(e.date)), datasets },
    options: { ...CHART_OPTS }
  });
}

// Engine Chart (Engine tab)
function buildEngineChart() {
  destroyChart('engine');
  const ctx = document.getElementById('chartEngine');
  if (!ctx) return;
  const fiveKData = [...engineHistory].filter(e => e.fiveK).sort((a,b) => a.date.localeCompare(b.date)).slice(-15);
  const rhrData   = [...engineHistory].filter(e => e.rhr).sort((a,b) => a.date.localeCompare(b.date)).slice(-15);

  if (!fiveKData.length && !rhrData.length) return;

  // Convert mm:ss to seconds for 5K
  const toSec = t => {
    if (!t) return null;
    const parts = t.split(':');
    if (parts.length === 3) return parseInt(parts[0])*3600 + parseInt(parts[1])*60 + parseInt(parts[2]);
    if (parts.length === 2) return parseInt(parts[0])*60 + parseInt(parts[1]);
    return null;
  };

  const allDates = [...new Set([...fiveKData.map(e=>e.date), ...rhrData.map(e=>e.date)])].sort();
  const datasets = [];

  if (fiveKData.length) {
    datasets.push({
      label: '5K (sec)',
      data: allDates.map(d => { const e = fiveKData.find(x => x.date === d); return e ? toSec(e.fiveK) : null; }),
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168,85,247,.07)',
      tension: .3,
      pointRadius: 3,
      spanGaps: true,
      yAxisID: 'y',
    });
  }
  if (rhrData.length) {
    datasets.push({
      label: 'Rest HR',
      data: allDates.map(d => { const e = rhrData.find(x => x.date === d); return e ? e.rhr : null; }),
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34,197,94,.07)',
      tension: .3,
      pointRadius: 3,
      spanGaps: true,
      yAxisID: 'y1',
    });
  }

  charts['engine'] = new Chart(ctx, {
    type: 'line',
    data: { labels: allDates.map(fmtDate), datasets },
    options: {
      ...CHART_OPTS,
      scales: {
        x:  { ticks: { color:'#4a4e62', font:{size:9} }, grid: { color:'#111115' } },
        y:  { type:'linear', display:true, position:'left',  ticks:{color:'#3b82f6',font:{size:9}}, grid:{color:'#111115'} },
        y1: { type:'linear', display:true, position:'right', ticks:{color:'#2dd4bf',font:{size:9}}, grid:{drawOnChartArea:false} },
      }
    }
  });
}

// Engine Analytics Chart (Analytics tab)
function buildEngineAnalyticsChart() {
  destroyChart('engineAnalytics');
  const ctx = document.getElementById('chartEngineAnalytics');
  if (!ctx) return;
  const rhrData = [...engineHistory].filter(e => e.rhr).sort((a,b) => a.date.localeCompare(b.date)).slice(-20);
  if (!rhrData.length) return;
  charts['engineAnalytics'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: rhrData.map(e => fmtDate(e.date)),
      datasets: [{
        label: 'Resting HR (bpm)',
        data: rhrData.map(e => e.rhr),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,.07)',
        tension: .3,
        pointRadius: 3,
        fill: true,
      }]
    },
    options: { ...CHART_OPTS }
  });
}
