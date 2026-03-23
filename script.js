// ═══════════════════════════════════════════════════════
// THE REBUILDER — script.js
// ═══════════════════════════════════════════════════════

// ── CONFIG ──
const HARDCODED_URL = "https://bwuapxgdsfcfwhdxffur.supabase.co";
const HARDCODED_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWFweGdkc2ZjZndoZHhmZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTM1NzQsImV4cCI6MjA4Nzk4OTU3NH0.xRIbqrNAG8-XTUg5cwkb7LuKL6EG4Sw_RHoHLoaUEwc";
const KEITH_PASSWORD = 'jesusismyrock';

// ── CONSTANTS ──
const CAMPAIGN_START = new Date('2026-03-23');
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
  { icon:"🃏", name:"Match Attax Pack",       price:"₹99",   tier:"weekly", color:"#38bdf8",
    desc:"Buy one Match Attax pack — you earned a small treat for locking in this week." },
  { icon:"☕", name:"Good Coffee",             price:"₹150",  tier:"weekly", color:"#fb923c",
    desc:"Go get a proper coffee or chai from a café you like. One quality sit-down session." },
  { icon:"🍕", name:"Cheat Meal",             price:"₹300",  tier:"weekly", color:"#ff4757",
    desc:"You hit your macros all week. One guilt-free meal — order whatever you want." },
  { icon:"🖊️", name:"Quality Pen",           price:"₹200",  tier:"weekly", color:"#a78bfa",
    desc:"Pick up a Uni-ball or Parker pen. You'll feel every word you write." },
  { icon:"📓", name:"New Notebook",           price:"₹150",  tier:"weekly", color:"#2dd4bf",
    desc:"A fresh notebook — for ideas, plans, or German vocabulary. A reward you'll actually use." },
  { icon:"🎮", name:"2hr Gaming Session",     price:"free",  tier:"weekly", color:"#fbbf24",
    desc:"Two guilt-free hours of gaming. Zero shame. You grinded the week, you earned the break." },
  { icon:"📦", name:"3 Attax Packs",         price:"₹297",  tier:"weekly", color:"#38bdf8",
    desc:"Three Match Attax packs for a big week. Tear them all open at once." },
  { icon:"🍜", name:"Restaurant Lunch",       price:"₹400",  tier:"weekly", color:"#f59e0b",
    desc:"Sit down somewhere nice for lunch. Biryani, pasta, whatever you're feeling. Solo meal." },
  { icon:"🧴", name:"Grooming Upgrade",       price:"₹350",  tier:"weekly", color:"#818cf8",
    desc:"New body wash, deodorant, or skincare. Small upgrade, big feel." },
  { icon:"🖱️", name:"Desk Micro-Upgrade",   price:"₹500",  tier:"weekly", color:"#22c55e",
    desc:"Mousepad, cable clip, small organiser. One thing that makes your setup feel tighter." },
  { icon:"🎧", name:"Playlist Session",       price:"free",  tier:"weekly", color:"#c026d3",
    desc:"Build a new playlist for training. 1 hour dedicated to finding bangers. Guilt-free." },
  { icon:"⚽", name:"Football Training",      price:"free",  tier:"weekly", color:"#00e5ff",
    desc:"Head out for football with anyone — or solo juggling and drills. No pressure, just play." },
  { icon:"🃏", name:"5 Attax Packs",         price:"₹495",  tier:"weekly", color:"#38bdf8",
    desc:"Five packs for a truly locked-in week. Best reward in the weekly tier." },
];

const BIWEEKLY_REWARDS = [
  { icon:"👕", name:"Gym Kit",               price:"₹800–1200", tier:"biweekly", color:"#ff4757",
    desc:"New gym t-shirt or training shorts. Decathlon. You level up, your gym kit levels up too." },
  { icon:"📗", name:"German Book",           price:"₹600–900",  tier:"biweekly", color:"#fbbf24",
    desc:"Schritte Plus, Langenscheidt, or any German reader you're eyeing. Invest in the language." },
  { icon:"📘", name:"Tech/ML Book",          price:"₹800–1500", tier:"biweekly", color:"#818cf8",
    desc:"Hands-On ML, Python Cookbook, Clean Code — one book you'll actually read." },
  { icon:"✂️", name:"Fresh Haircut",        price:"₹300–600",  tier:"biweekly", color:"#00e5ff",
    desc:"Go get a proper cut. You're levelling up — look the part." },
  { icon:"🍽️", name:"Nice Dinner Out",       price:"₹800–1200", tier:"biweekly", color:"#fb923c",
    desc:"Sit-down dinner at a restaurant you wouldn't normally go to. Celebrate the level." },
  { icon:"🍵", name:"Thermos / Bottle",      price:"₹500–800",  tier:"biweekly", color:"#2dd4bf",
    desc:"A quality insulated bottle or thermos. Hydration is part of the campaign." },
  { icon:"⚽", name:"New Football",          price:"₹600–1000", tier:"biweekly", color:"#22c55e",
    desc:"A fresh Nivia or Cosco ball. For drills, juggling, or just having it around." },
  { icon:"🖥️", name:"Desk Upgrade",         price:"₹800–1500", tier:"biweekly", color:"#38bdf8",
    desc:"Lamp, stand, cable organizer, or anything that makes your workspace more locked in." },
  { icon:"💡", name:"Study Lamp",           price:"₹600–1200", tier:"biweekly", color:"#f59e0b",
    desc:"A proper desk lamp for deep work nights. Eye strain is the enemy of the grind." },
  { icon:"🛁", name:"Spa Day / Self-care",   price:"₹500–1000", tier:"biweekly", color:"#c026d3",
    desc:"Massage, grooming, or a full self-care day. Recover like a professional." },
];

const MONTHLY_REWARDS = [
  { icon:"👟", name:"Running Shoes",           price:"₹3000–6000",  tier:"monthly", color:"#00e5ff",  month:1,
    desc:"New pair of running or training shoes. Nike, Puma, Asics — whatever fits your training. Month 1 delivered." },
  { icon:"🎧", name:"Headphone Upgrade",       price:"₹2000–5000",  tier:"monthly", color:"#818cf8",  month:2,
    desc:"Upgrade your listening experience. JBL, Boat, or Sony. For deep work, gym, and German podcasts." },
  { icon:"⌨️", name:"Dev Setup Upgrade",      price:"₹3000–8000",  tier:"monthly", color:"#38bdf8",  month:3,
    desc:"Keyboard, mouse, monitor stand, or anything that levels up your coding environment." },
  { icon:"🗺️", name:"One-Day Trip",            price:"free",         tier:"monthly", color:"#fbbf24",  month:4,
    desc:"Go somewhere you've never been for a full day. Nearby city, nature spot, anywhere. Earned it." },
  { icon:"🧥", name:"Quality Jacket / Hoodie", price:"₹2500–5000",  tier:"monthly", color:"#fb923c",  month:5,
    desc:"A proper quality jacket or hoodie. Something you'll wear for years. Month 5 is no joke." },
  { icon:"🏋️", name:"Weighted Vest",           price:"₹2500–5000",  tier:"monthly", color:"#ff4757",  month:6,
    desc:"You finished 6 months. A weighted vest for the next campaign. You built the base — now load it." },
];

const PERFORMANCE_REWARDS = [
  { icon:"🎽", name:"Retro Barca Jersey",   price:"₹2500–5000",  goal:"pullup15",   color:"#a50044",
    desc:"A retro Barcelona jersey — the kind you frame or wear on match days. Unlocked when you hit 15 pull-ups." },
  { icon:"👟", name:"Training Shoes",        price:"₹4000–8000",  goal:"sub23_5k",   color:"#00e5ff",
    desc:"Top-tier running shoes when you break 23 minutes on a 5K. You run like that, you deserve the kicks." },
  { icon:"📸", name:"Pro Progress Photos",  price:"₹500–1500",   goal:"weight62",   color:"#fbbf24",
    desc:"Book a proper photoshoot or print your transformation photos. Reach 62kg and make it official." },
  { icon:"🚀", name:"Developer Merch",       price:"₹1500–3000",  goal:"ml_shipped", color:"#818cf8",
    desc:"Ship your first real ML project. Reward: a hoodie or shirt from your favourite dev brand." },
  { icon:"🇩🇪", name:"German Experience",   price:"₹1000–3000",  goal:"b1_done",    color:"#ffd700",
    desc:"B1 grammar done. Reward: a German film night, German café, or authentic German meal out." },
  { icon:"🏆", name:"Framed Stats Print",   price:"₹500–1500",   goal:"streak30",   color:"#ff4757",
    desc:"30-day streak. Print your stats, frame them. Hang them where you train." },
  { icon:"🪑", name:"Chair / Desk Upgrade", price:"₹5000–12000", goal:"4wk_perfect", color:"#22c55e",
    desc:"4 perfect weeks straight — consistency at that level earns you a proper ergonomic chair or desk." },
  { icon:"🌍", name:"Weekend Trip",          price:"₹3000–8000",  goal:"streak30",   color:"#fb923c",
    desc:"Hit a 30-day log streak: take a weekend trip somewhere you've been wanting to go. You earned it." },
];

const IDENTITY_REWARDS = [
  { icon:"🏷️", name:"Rename Your Rank",      color:"#fbbf24",
    desc:"Pick a custom title for your current level. Show it on your dashboard. You named it, you own it." },
  { icon:"🎖️", name:"Custom Badge",           color:"#00e5ff",
    desc:"Design or pick a badge for your dashboard header. Symbols of the grind." },
  { icon:"📌", name:"Pin Your Stats",          color:"#818cf8",
    desc:"Print your progress chart — XP, streaks, lifts, German hours. Pin it above your desk." },
  { icon:"📱", name:"New Wallpaper",           color:"#22c55e",
    desc:"Change your phone and laptop wallpaper to something that represents who you're becoming." },
  { icon:"📝", name:"Monthly Reflection",      color:"#fb923c",
    desc:"Write a proper reflection: what worked, what broke, what you'll do differently. Keep it. Read it later." },
  { icon:"🎥", name:"Progress Video",          color:"#ff4757",
    desc:"Record a 1-min video talking about your progress. Your future self will watch it one day." },
  { icon:"📷", name:"Before / After Photo",    color:"#38bdf8",
    desc:"Take a progress photo. Same pose, same light. The difference compounds faster than you think." },
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

  // ── AI ENGINEER PATH ──
  {id:'sm4',  emoji:'🧠', title:'DEEP WORK STREAK',   desc:'Log ML deep work 5 consecutive active days — no gaps, no excuses', xp:50,  type:'streak',  secret:true,  category:'ml'},
  {id:'sm8',  emoji:'⚡', title:'WEEK LOCKED IN',     desc:'Log deep work AND implementation in the same week (3+ days)',       xp:40,  type:'weekly',  secret:true,  category:'ml'},
  {id:'sm30', emoji:'🔬', title:'MONTH 1 DONE',       desc:'Complete all 4 weeks of Month 1 — Production Python + APIs',        xp:55,  type:'one-off', secret:false, category:'ml'},
  {id:'sm31', emoji:'🚢', title:'FIRST PROJECT',      desc:'Ship your first real AI project to production',                     xp:80,  type:'one-off', secret:false, category:'ml'},
  {id:'sm32', emoji:'🤖', title:'RAG BUILDER',        desc:'Complete and ship the AI Document Assistant (Month 3 project)',     xp:70,  type:'one-off', secret:false, category:'ml'},
  {id:'sm33', emoji:'🔥', title:'COMMIT MACHINE',     desc:'Hit 5+ GitHub commits in a single week — code every day',          xp:30,  type:'weekly',  secret:true,  category:'ml'},

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

// ── Schema detection (set once on first fetch) ──────────
let _schemaIsFlat = null; // null=unknown, false=data-col, true=flat

function _buildRow(type, data) {
  if (_schemaIsFlat === true) {
    // Flat schema: spread data fields directly into the row
    return { type, logged_at: todayKey(), ...data };
  }
  // Default / data-col schema
  return { type, data, logged_at: todayKey() };
}

function _buildPatch(data) {
  if (_schemaIsFlat === true) return { ...data };
  return { data };
}

async function dbInsertRow(type, data) {
  return await supaFetch('POST', 'rebuilder_logs', _buildRow(type, data));
}

async function dbUpsertDay(type, data) {
  // Single round trip upsert on (type, logged_at) unique constraint
  const today = todayKey();
  try {
    const headers = {
      'apikey': HARDCODED_KEY,
      'Authorization': 'Bearer ' + HARDCODED_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal',
    };
    await fetch(HARDCODED_URL + '/rest/v1/rebuilder_logs', {
      method: 'POST',
      headers,
      body: JSON.stringify(_buildRow(type, data)),
    });
  } catch(e) {
    // Fallback: try PATCH if upsert fails (no unique constraint set up)
    await supaFetch('PATCH', `rebuilder_logs?type=eq.${type}&logged_at=eq.${today}`, _buildPatch(data));
  }
}

async function dbFetchRows(type, limit = 150) {
  const r = await supaFetch('GET', `rebuilder_logs?type=eq.${type}&order=logged_at.desc&limit=${limit}`);
  if (!r || !r.length) return [];

  // Auto-detect schema shape from the first row (do this once)
  const first = r[0];
  const hasDataCol = first.hasOwnProperty('data') && first.data !== null && typeof first.data === 'object';
  if (_schemaIsFlat === null) {
    _schemaIsFlat = !hasDataCol;
    console.log('[Rebuilder] Schema detected:', _schemaIsFlat ? 'FLAT columns' : 'data JSONB column');
    console.log('[Rebuilder] Sample row keys:', Object.keys(first).join(', '));
  }

  return r.map(row => {
    if (!_schemaIsFlat) {
      // Schema: { id, type, data JSONB, logged_at }
      return { ...(row.data || {}), _id: row.id, _logged_at: row.logged_at };
    } else {
      // Flat schema: every column is directly on the row
      const { id, type: _t, created_at, ...rest } = row;
      return { ...rest, _id: id, _logged_at: row.logged_at };
    }
  });
}

async function dbUpsertState(key, value) {
  // Single round trip using Supabase upsert (POST with Prefer: resolution=merge-duplicates)
  try {
    const headers = {
      'apikey': HARDCODED_KEY,
      'Authorization': 'Bearer ' + HARDCODED_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal',
    };
    await fetch(HARDCODED_URL + '/rest/v1/rebuilder_state', {
      method: 'POST',
      headers,
      body: JSON.stringify({ key, value }),
    });
  } catch(e) { console.error('upsertState error:', e); }
}

async function dbGetState(key) {
  const r = await supaFetch('GET', `rebuilder_state?key=eq.${encodeURIComponent(key)}&limit=1`);
  if (r && r.length > 0) return r[0].value;
  return null;
}

// ── UTILS ──
function todayKey() {
  // Use IST (UTC+5:30) so date rolls over at midnight Indian time, not UTC
  const now = new Date();
  const istMs = now.getTime() + now.getTimezoneOffset() * 60000 + (5.5 * 3600000);
  return new Date(istMs).toISOString().split('T')[0];
}
function getWeekStart(offset = 0) {
  // Use IST date for week calculations
  const now = new Date();
  const istMs = now.getTime() + now.getTimezoneOffset() * 60000 + (5.5 * 3600000);
  const d = new Date(istMs);
  d.setDate(d.getDate() - offset * 7);
  const day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const m = new Date(d);
  m.setDate(diff);
  return m.toISOString().split('T')[0];
}
function getWeekLabel(offset = 0) { return getWeekStart(offset); }
function fmtDate(s) {
  if (!s) return '—';
  // Handle both 'YYYY-MM-DD' and full ISO timestamps
  const dateStr = s.length > 10 ? s.slice(0, 10) : s;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

// ── STATE ──
let state = {
  totalXP: 0, currentLevel: 1,
  streaks: {
    train:  { current: 0, longest: 0, last: null, shielded: false },
    ml:     { current: 0, longest: 0, last: null, shielded: false },
    german: { current: 0, longest: 0, last: null, shielded: false },
  },
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
  showLoadingState();
  await loadAllData();
  hideLoadingState();
  setInterval(updateHeader, 60000);
  window.addEventListener('resize', handleResize);
}

function showLoadingState() {
  const el = document.getElementById('appLoadingBar');
  if (el) { el.style.width = '0%'; el.style.display = 'block'; el.style.transition = 'none'; }
  requestAnimationFrame(() => {
    if (el) { el.style.transition = 'width 1.8s ease'; el.style.width = '85%'; }
  });
}

function hideLoadingState() {
  const el = document.getElementById('appLoadingBar');
  if (el) {
    el.style.transition = 'width .2s ease';
    el.style.width = '100%';
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => { el.style.display = 'none'; el.style.opacity = '1'; el.style.width = '0%'; }, 300); }, 200);
  }
}

async function loadAllData() {
  // Fire ALL network requests simultaneously — zero sequential waiting
  const [
    saved, xp, body, str, eng, ml, ger, hab,
    curriculum, skills, germanMilestones, noteState
  ] = await Promise.all([
    dbGetState('main_state'),
    dbFetchRows('xp_logs', 200),
    dbFetchRows('body_logs', 100),
    dbFetchRows('strength_logs', 100),
    dbFetchRows('engine_logs', 100),
    dbFetchRows('ml_logs', 100),
    dbFetchRows('german_logs', 200),
    dbFetchRows('habit_logs', 200),
    dbGetState('curriculum'),
    dbGetState('skills'),
    dbGetState('germanMilestones'),
    dbGetState('tomorrow_note'),
  ]);

  // Apply state
  if (saved) state = { ...state, ...saved };

  // Apply history arrays
  xpHistory = xp; bodyHistory = body; strengthHistory = str;
  engineHistory = eng; mlHistory = ml; germanHistory = ger; habitHistory = hab;

  // Apply state sub-objects
  if (curriculum)       { state.curriculum = curriculum; applyCurriculum(); }
  if (skills)           { state.skills = skills; }
  if (germanMilestones) { state.germanMilestones = germanMilestones; applyGermanMilestones(); }
  if (noteState) {
    state.tomorrowNote = noteState;
    const noteInput = document.getElementById('tomorrowNoteInput');
    if (noteInput && noteState.text) noteInput.value = noteState.text;
    updateNotePreview(noteState.text);
  }

  restoreTodayNutrition();
  restoreTodayXP();
  refreshAll();
  buildAllCharts();
  checkMissions();
  checkMorningFlash();
}

async function saveState() { await dbUpsertState('main_state', state); }

// ── DB DIAGNOSTICS — call from console: runDiagnostics() ──
async function runDiagnostics() {
  const panel = document.getElementById('diagOutput');
  const show = (msg, color='var(--text)') => {
    if (panel) panel.innerHTML += `<div style="color:${color};font-family:var(--font-mono);font-size:.65rem;margin:2px 0;">${msg}</div>`;
    console.log('[DIAG]', msg);
  };
  if (panel) panel.innerHTML = '';
  show('🔍 Running diagnostics...', 'var(--gold)');

  const types = ['german_logs','body_logs','xp_logs','strength_logs','engine_logs','ml_logs'];
  for (const t of types) {
    const r = await supaFetch('GET', `rebuilder_logs?type=eq.${t}&order=logged_at.desc&limit=2`);
    if (!r) { show(`❌ ${t}: fetch failed`, 'var(--red)'); continue; }
    if (!r.length) { show(`⚠️ ${t}: 0 rows`, 'var(--muted)'); continue; }
    const first = r[0];
    const keys = Object.keys(first).join(', ');
    const hasData = first.data != null;
    show(`✓ ${t}: ${r.length} rows | keys: ${keys}`, hasData ? 'var(--green)' : 'var(--accent)');
    if (hasData) show(`  └ data keys: ${Object.keys(first.data||{}).join(', ')}`, 'var(--muted)');
    else show(`  └ flat: logged_at=${first.logged_at}, sample: ${JSON.stringify(first).slice(0,120)}`, 'var(--muted)');
  }

  // State check
  const st = await supaFetch('GET', `rebuilder_state?limit=5`);
  show(`📦 rebuilder_state: ${st ? st.length : 'ERROR'} rows`, st ? 'var(--green)' : 'var(--red)');
  if (st && st.length) show(`  keys: ${st.map(r=>r.key).join(', ')}`, 'var(--muted)');

  show('✅ Done. Schema: ' + (_schemaIsFlat === null ? 'unknown' : _schemaIsFlat ? 'FLAT' : 'data-JSONB'), 'var(--gold)');

  // Also show what the processed arrays look like
  show('', 'var(--muted)');
  show('📋 Processed arrays in memory:', 'var(--gold)');
  show(`  germanHistory: ${germanHistory.length} entries | first: ${JSON.stringify(germanHistory[0]||{}).slice(0,120)}`, germanHistory.length ? 'var(--green)' : 'var(--accent2)');
  show(`  bodyHistory: ${bodyHistory.length} entries | first: ${JSON.stringify(bodyHistory[0]||{}).slice(0,120)}`, bodyHistory.length ? 'var(--green)' : 'var(--accent2)');
  show(`  xpHistory: ${xpHistory.length} entries`, xpHistory.length ? 'var(--green)' : 'var(--muted)');
}

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

  // Sidebar mini campaign bar
  const sbDay  = document.getElementById('sb-day-num');
  const sbPct  = document.getElementById('sb-camp-pct');
  const sbFill = document.getElementById('sbCampFill');
  if (sbDay)  sbDay.textContent  = 'DAY ' + clampedDay;
  if (sbPct)  sbPct.textContent  = pct + '%';
  if (sbFill) sbFill.style.width = pct + '%';
}

// ── NAVIGATION ──
function switchTab(id, el) {
  if (id === 'training') {
    const _istNow = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60000 + 5.5*3600000);
    const dow = _istNow.getDay();
    const dayMap = { 1:1, 2:2, 3:3, 4:4, 5:5, 0:null, 6:null };
    const todayDay = dayMap[dow];
    if (todayDay && !_activeTrainingDay) selectTrainingDay(todayDay);
    setTimeout(renderTodayWorkout, 50);
  }
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sb-item, .nav-item, .bn-item').forEach(t => t.classList.remove('active'));
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
  if (id === 'body')      setTimeout(() => { buildBodyChart(); buildNutritionChart(); }, 50);
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
  const entry = bodyHistory.find(e => (e.date || (e._logged_at||'').slice(0,10)) === today);
  if (!entry) return;

  // Populate input fields from saved meal data
  if (entry.meals) {
    const mealMap = { b: entry.meals.breakfast, l: entry.meals.lunch, d: entry.meals.dinner, s: entry.meals.snacks };
    Object.entries(mealMap).forEach(([key, meal]) => {
      if (!meal) return;
      const setVal = (field, val) => { const el = document.getElementById(`meal-${key}-${field}`); if (el && val) el.value = val; };
      setVal('desc', meal.desc);
      setVal('cal',  meal.cal);
      setVal('prot', meal.prot);
      setVal('carb', meal.carb);
      setVal('fat',  meal.fat);
    });
  }

  // Always show saved totals in the macro header display — even if inputs are blank
  const setMacro = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v || '—'; };
  setMacro('cal-today',  entry.cals || null);
  setMacro('prot-today', entry.prot || null);
  setMacro('carb-today', entry.carb || null);
  setMacro('fat-today',  entry.fat  || null);
  const pb = document.getElementById('protBar');
  if (pb) pb.style.width = Math.min(100, ((entry.prot || 0) / 80) * 100) + '%';

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

// Toggle a dxp-row checkbox and update visual state
function toggleDXP(cbId, rowEl) {
  const cb = document.getElementById(cbId);
  if (!cb) return;
  cb.checked = !cb.checked;
  if (rowEl) rowEl.classList.toggle('dxp-checked', cb.checked);
  updateXP();
}

// Sync all dxp-row visual states from actual checkbox values
function syncDXPRows() {
  const IDS = ['xp-gym','xp-run','xp-mobility','xp-deepwork','xp-impl','xp-german-daily','xp-protein','xp-water','xp-calories'];
  IDS.forEach(id => {
    const cb = document.getElementById(id);
    // Find the row by looking for the div with onclick containing this id
    const row = document.querySelector(`.dxp-row[onclick*="${id}"]`);
    if (cb && row) row.classList.toggle('dxp-checked', cb.checked);
  });
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
  // Preserve any missionXP that was already earned today — don't clobber it
  const existingMissionXP = (idx >= 0) ? (xpHistory[idx].missionXP || 0) : 0;
  entry.xp += existingMissionXP;
  if (existingMissionXP) entry.missionXP = existingMissionXP;
  if (idx >= 0) { state.totalXP -= xpHistory[idx].xp; xpHistory[idx] = { ...xpHistory[idx], ...entry }; }
  else xpHistory.push(entry);
  state.totalXP += entry.xp;
  if (!state.dayTypeHistory) state.dayTypeHistory = {};
  state.dayTypeHistory[today] = currentDayType;
  const ws = getWeekStart();
  if (!state.weeklyXPHistory) state.weeklyXPHistory = {};
  state.weeklyXPHistory[ws] = getWeeklyXP();
  updateStreaks();
  checkLevelUp();
  checkMissionProgress(entry);
  // Update UI immediately, save to DB in background
  notify('⚡ +' + entry.xp + ' XP logged', 'var(--accent)');
  refreshSections('xp', 'dashboard');
  // Fire DB writes without awaiting — non-blocking
  Promise.all([dbUpsertDay('xp_logs', entry), saveState()]).catch(console.error);
}

function updateStreaks() {
  // ── Daily streak logic ──
  // Each streak tracks: { current, longest, last (YYYY-MM-DD), shielded }
  // Rules:
  //   last == today     → do nothing (already counted)
  //   last == yesterday → increment current
  //   last <  yesterday → reset to 1  (missed a day)
  //   shielded == true  → streak is paused at 0 until next activity
  // After each update, longest is kept if current beats it.

  const today = todayKey();

  // yesterday in IST
  const istMs = Date.now() + new Date().getTimezoneOffset() * 60000 + 5.5 * 3600000;
  const yest  = new Date(istMs - 86400000).toISOString().slice(0, 10);

  // Ensure streak objects exist with correct shape
  if (!state.streaks) state.streaks = {};
  ['train', 'ml', 'german'].forEach(k => {
    if (!state.streaks[k] || typeof state.streaks[k] !== 'object') {
      state.streaks[k] = { current: 0, longest: 0, last: null, shielded: false };
    }
  });

  // Check functions: did this xpHistory entry count for this streak type?
  const checks = {
    train:  e => !!(e && (e.gym  || e.run)),
    ml:     e => !!(e && (e.deepwork || e.impl)),
    german: e => !!(e && e.germanStudy),
  };

  ['train', 'ml', 'german'].forEach(key => {
    const s    = state.streaks[key];
    const done = checks[key](xpHistory.find(e => e.date === today));

    if (!done) return; // nothing logged today for this key — no change

    const last = s.last;

    if (last === today) {
      // Already counted today — do nothing
      return;
    }

    if (s.shielded) {
      // Shield was active — resume: start fresh streak from today
      s.current  = 1;
      s.shielded = false;
      s.last     = today;
    } else if (last === yest) {
      // Consecutive day — extend streak
      s.current += 1;
      s.last     = today;
    } else {
      // Missed one or more days — reset
      s.current = 1;
      s.last    = today;
    }

    // Keep longest
    if (s.current > s.longest) s.longest = s.current;
  });

  // weekProgress is still used for dot coloring (how many days this week)
  const CAMPAIGN_START = '2026-03-23';
  const istNow   = new Date(istMs);
  const dow      = istNow.getDay();
  const toMon    = dow === 0 ? -6 : 1 - dow;
  const monDate  = new Date(istNow); monDate.setDate(istNow.getDate() + toMon);
  const weekStart = monDate.toISOString().slice(0, 10);
  const weekEnd   = new Date(monDate); weekEnd.setDate(monDate.getDate() + 6);
  const weekEndStr = weekEnd.toISOString().slice(0, 10);

  state.weekProgress = {
    train:  xpHistory.filter(e => e.date >= weekStart && e.date <= weekEndStr && checks.train(e)).length,
    ml:     xpHistory.filter(e => e.date >= weekStart && e.date <= weekEndStr && checks.ml(e)).length,
    german: xpHistory.filter(e => e.date >= weekStart && e.date <= weekEndStr && checks.german(e)).length,
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
  } else if (nl < state.currentLevel) {
    // XP was deleted — level down silently
    state.currentLevel = nl;
  }
}

async function useStreakShield() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  if ((state.streakShieldsAvailable || 0) <= 0) { notify('No shield available this month', 'var(--red)'); return; }
  if (!confirm('Use your Streak Shield? This protects today — streaks pause at 0 until your next log. (1 per month)')) return;
  state.streakShieldsAvailable--;
  state.streakShieldsUsed = (state.streakShieldsUsed || 0) + 1;
  // Pause all streaks: set shielded flag, current drops to 0 (protected, not lost)
  if (!state.streaks) state.streaks = {};
  ['train', 'ml', 'german'].forEach(k => {
    if (!state.streaks[k] || typeof state.streaks[k] !== 'object') {
      state.streaks[k] = { current: 0, longest: 0, last: null, shielded: false };
    }
    state.streaks[k].shielded = true;
    state.streaks[k].current  = 0;
    // last stays as-is so when they next log, it won't be treated as a miss
  });
  await saveState();
  notify('🛡 Streak Shield used! Log again tomorrow to resume your streak.', 'var(--gold)');
  refreshSections('dashboard');
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
    // Strip internal fields before patching
    const patchData = Object.assign({}, existing);
    delete patchData._id; delete patchData._logged_at;
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`, _buildPatch(patchData));
  } else {
    const entry = { date: today, weight };
    bodyHistory.push(entry);
    await dbUpsertDay('body_logs', entry);
  }
  notify('⚖️ Weight logged: ' + weight + ' kg', 'var(--accent)');
  document.getElementById('inp-weight').value = '';
  refreshSections('body');
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
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`, _buildPatch(existing));
  } else {
    const entry = { date: today, waist, shoulders, pullupmax };
    bodyHistory.push(entry);
    await dbUpsertDay('body_logs', entry);
  }
  notify('📏 Measurements saved!', 'var(--gold)');
  if (document.getElementById('inp-waist'))     document.getElementById('inp-waist').value     = '';
  if (document.getElementById('inp-shoulders')) document.getElementById('inp-shoulders').value = '';
  if (document.getElementById('inp-pullup'))    document.getElementById('inp-pullup').value    = '';
  refreshSections('body');
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

  // Mode: ADD (default) or REPLACE (toggle in UI)
  const replaceMode = document.getElementById('nutr-mode-replace')?.checked;
  function mergeMeal(key, filled, newData, prev) {
    if (!filled) return prev || null; // slot not touched this save — keep existing
    if (!prev || replaceMode) return newData; // no existing OR replace mode — overwrite
    // ADD mode: add new macros on top of existing
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
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${today}`, _buildPatch(existing));
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
  // Auto-tick XP nutrition checkboxes based on today's totals
  const protCheck = document.getElementById('xp-protein');
  const calCheck  = document.getElementById('xp-calories');
  if (protCheck && totProt >= 80 && !protCheck.checked) {
    protCheck.checked = true;
  }
  if (calCheck && totCal >= 2800 && totCal <= 3500 && !calCheck.checked) {
    calCheck.checked = true;
  }
  updateXP();   // covers both, also calls syncDXPRows
  notify('🥗 Meals added! Total: ' + totCal + ' kcal / ' + totProt + 'g protein', 'var(--green)');
  updateMealTotals();
  refreshSections('body');
  buildNutritionChart();
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
  refreshSections('strength', 'missions');
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
  refreshSections('engine', 'missions');
  buildEngineChart();
  ['inp-2k','inp-5k','inp-10k','inp-15k','inp-20k','inp-sprint','inp-rhr','inp-cardio-notes'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
}

// ── ML ──
async function saveML() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const projects = parseInt(document.getElementById('inp-projects')?.value) || state.mlCurrent.projects || 0;
  const commits  = parseInt(document.getElementById('inp-commits')?.value)  || state.mlCurrent.commits  || 0;
  const week     = parseInt(document.getElementById('inp-current-week')?.value) || state.mlCurrent.week || 1;
  state.mlCurrent = {
    ...state.mlCurrent,
    projects,
    commits,
    week: Math.min(24, Math.max(1, week)),
  };
  const entry = { date: todayKey(), ...state.mlCurrent };
  mlHistory.push(entry);
  await dbUpsertDay('ml_logs', entry);
  await saveState();
  notify('🧠 Progress updated! Week ' + state.mlCurrent.week + ' · ' + projects + ' projects', 'var(--purple)');
  refreshSections('ml', 'missions');
}

async function saveCurriculum() {
  if (!state.curriculum) state.curriculum = {};
  const curr = state.curriculum;
  // Scan any legacy .curr-item checkboxes
  document.querySelectorAll('.curr-item input[type=checkbox]').forEach(cb => {
    curr[cb.id] = cb.checked;
    const l = cb.nextElementSibling;
    if (l && l.tagName === 'LABEL') l.classList.toggle('done', cb.checked);
  });
  // Sync portfolio checkboxes (hidden inputs that DO exist)
  ['port-1','port-2','port-3','port-4','port-5'].forEach(id => {
    const el = document.getElementById(id);
    if (el) curr[id] = el.checked;
  });
  // state.curriculum already has week values written by toggleWeekCheck directly
  state.curriculum = curr;
  await dbUpsertState('curriculum', curr);
  updateCurriculumBars();
}

function applyCurriculum() {
  const curr = state.curriculum || {};
  // Apply to any legacy .curr-item checkboxes that exist in DOM
  Object.entries(curr).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.checked = !!v;
    const l = el.nextElementSibling;
    if (l && l.tagName === 'LABEL') l.classList.toggle('done', !!v);
  });
  updateCurriculumBars();
  syncAllAIEStates();
}

function updateCurriculumBars() {
  // Month tracks — 4 weeks each
  const MONTH_TRACKS = {
    'track-m1': ['m1w1','m1w2','m1w3','m1w4'],
    'track-m2': ['m2w1','m2w2','m2w3','m2w4'],
    'track-m3': ['m3w1','m3w2','m3w3','m3w4'],
    'track-m4': ['m4w1','m4w2','m4w3','m4w4'],
    'track-m5': ['m5w1','m5w2','m5w3','m5w4'],
    'track-m6': ['m6w1','m6w2','m6w3','m6w4'],
  };
  // Portfolio projects
  const PORT_IDS = ['port-1','port-2','port-3','port-4','port-5'];

  let totalDone = 0, totalItems = 0;

  // Determine current month from mlCurrent.week
  const currentWeek = state.mlCurrent?.week || 1;
  const currentMonth = Math.ceil(currentWeek / 4);

  Object.entries(MONTH_TRACKS).forEach(([id, items], idx) => {
    const done = items.filter(x => document.getElementById(x)?.checked).length;
    totalDone  += done;
    totalItems += items.length;
    const pct  = Math.round((done / items.length) * 100);
    const bar  = document.getElementById('bar-' + id);
    const count = document.getElementById('count-' + id);
    if (bar)   bar.style.width   = pct + '%';
    if (count) count.textContent = done + '/' + items.length;
  });

  // Portfolio bar
  const portDone = PORT_IDS.filter(x => document.getElementById(x)?.checked).length;
  const portBar  = document.getElementById('portfolioBar');
  const portLbl  = document.getElementById('portfolioDoneLabel');
  if (portBar) portBar.style.width   = Math.round((portDone / 5) * 100) + '%';
  if (portLbl) portLbl.textContent   = portDone + ' / 5';

  // Overall progress
  const overallPct = totalItems ? Math.round((totalDone / totalItems) * 100) : 0;
  const overallBar = document.getElementById('overallCurrBar');
  const overallEl  = document.getElementById('ml-overall-pct');
  const weeksDoneEl = document.getElementById('ml-weeks-done');
  if (overallBar) overallBar.style.width = overallPct + '%';
  if (overallEl)  overallEl.textContent  = overallPct + '%';
  if (weeksDoneEl) weeksDoneEl.textContent = totalDone;

  // Month progress
  const monthTrackId = 'track-m' + currentMonth;
  const monthItems   = MONTH_TRACKS[monthTrackId] || [];
  const monthDone    = monthItems.filter(x => document.getElementById(x)?.checked).length;
  const monthPct     = monthItems.length ? Math.round((monthDone / monthItems.length) * 100) : 0;
  const monthBar     = document.getElementById('monthCurrBar');
  const monthPctEl   = document.getElementById('ml-month-pct');
  const monthLbl     = document.getElementById('ml-month-label');
  if (monthBar)   monthBar.style.width   = monthPct + '%';
  if (monthPctEl) monthPctEl.textContent = monthPct + '%';
  if (monthLbl)   monthLbl.textContent   = 'Month ' + currentMonth + ' · Week ' + currentWeek;

  // Dashboard tile
  const dp = document.getElementById('dashCurrPct');
  if (dp) dp.textContent = overallPct + '%';

  // ── Sync aie-* month card bars + percentages ──
  const M_COLORS = ['var(--accent)','var(--blue)','var(--purple)','var(--gold)','var(--green)','var(--accent2)'];
  Object.entries(MONTH_TRACKS).forEach(([id, items], idx) => {
    const mNum = idx + 1;
    const done = items.filter(x => document.getElementById(x)?.checked).length;
    const pct  = Math.round((done / items.length) * 100);
    const bar  = document.getElementById('aie-m' + mNum + '-bar');
    const pctEl = document.getElementById('aie-m' + mNum + '-pct');
    if (bar)   bar.style.width   = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  });

  // aie hero stats
  const aieWkDone  = document.getElementById('aie-weeks-done');
  const aieOvPct   = document.getElementById('aie-overall-pct');
  const aieProjDone = document.getElementById('aie-projects-done');
  const aieCommits  = document.getElementById('aie-commits');
  const aieMasterFill = document.getElementById('aie-master-fill');
  const aieMasterGlow = document.getElementById('aie-master-glow');
  if (aieWkDone)   aieWkDone.textContent   = totalDone;
  if (aieOvPct)    aieOvPct.textContent    = overallPct + '%';
  if (aieProjDone) {
    const proj = state.mlCurrent?.projects || 0;
    aieProjDone.innerHTML = proj + '<span style="font-size:1rem;opacity:.5;">/5</span>';
  }
  if (aieCommits)  aieCommits.textContent  = state.mlCurrent?.commits || 0;
  if (aieMasterFill) aieMasterFill.style.width = overallPct + '%';
  if (aieMasterGlow) aieMasterGlow.style.left  = overallPct + '%';

  syncAllAIEStates();
}

// ── ML TAB INTERACTIVITY ──

function toggleWeekCheck(weekId) {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  // Toggle directly in state.curriculum (hidden DOM checkboxes may not exist)
  if (!state.curriculum) state.curriculum = {};
  const newVal = !state.curriculum[weekId];
  state.curriculum[weekId] = newVal;
  // Also update DOM checkbox if it exists
  const cb = document.getElementById(weekId);
  if (cb) cb.checked = newVal;
  // Update visual + persist
  syncAIEWeekRow(weekId, newVal);
  updateCurriculumBars();
  dbUpsertState('curriculum', state.curriculum).catch(console.error);
}

function syncAIEWeekRow(weekId, checked) {
  const chk = document.getElementById('aie-chk-' + weekId);
  const row = document.getElementById('aie-' + weekId + '-row');
  if (chk) {
    chk.classList.toggle('aie-wk-checked', checked);
    chk.textContent = checked ? '✓' : '';
  }
  if (row) row.classList.toggle('aie-week-done', checked);
}

function togglePortfolio(portId, elRow) {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  const cb  = document.getElementById(portId);
  if (!cb) return;
  cb.checked = !cb.checked;
  saveCurriculum();
  const num = portId.replace('port-', '');
  const chk = document.getElementById('aie-portchk-' + num);
  if (chk) chk.textContent = cb.checked ? '✓' : '○';
  if (elRow) elRow.classList.toggle('aie-port-done', cb.checked);
}

function syncAllAIEStates() {
  const curr = state.curriculum || {};
  // Sync all week check visuals from state (DOM checkboxes may not exist)
  const ALL = ['m1w1','m1w2','m1w3','m1w4','m2w1','m2w2','m2w3','m2w4',
    'm3w1','m3w2','m3w3','m3w4','m4w1','m4w2','m4w3','m4w4',
    'm5w1','m5w2','m5w3','m5w4','m6w1','m6w2','m6w3','m6w4'];
  ALL.forEach(wid => syncAIEWeekRow(wid, !!curr[wid]));
  // Portfolio
  [1,2,3,4,5].forEach(n => {
    const id  = 'port-' + n;
    const checked = !!curr[id];
    const chk = document.getElementById('aie-portchk-' + n);
    const row = document.getElementById('aie-port-' + n);
    // Also sync hidden checkbox if present
    const cb  = document.getElementById(id);
    if (cb) cb.checked = checked;
    if (chk) chk.textContent = checked ? '✓' : '○';
    if (row) row.classList.toggle('aie-port-done', checked);
  });
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
  refreshSections('german');
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
  refreshSections('xp', 'dashboard');
}

// ── MISSIONS ──
// ── MISSION PROGRESS HELPERS ──
function _strengthPB(lift) { return strengthHistory.length ? Math.max(0, ...strengthHistory.map(h => h[lift] || 0)) : 0; }
function _weekSprints(ws)  { return engineHistory.filter(e => e.date >= ws && e.type === 'sprint').length; }
function _weekCommits(ws)  { return mlHistory.filter(e => e.date >= ws).reduce((s,e) => s + (e.commits||0), 0); }
function _totalSpeak()     { return germanHistory.reduce((s,e) => s + (e.min||0), 0); }
function _weekPodcasts(ws) { return germanHistory.filter(e => e.date >= ws && e.method === 'podcast').length; }

function _cs229Done()  { return _weeksDone(); } // legacy compat — now counts total weeks done
function _cs231nDone() { return (state.mlCurrent?.projects || 0); } // legacy compat — maps to projects
function _weeksDone()  {
  const ALL_WEEKS = ['m1w1','m1w2','m1w3','m1w4','m2w1','m2w2','m2w3','m2w4',
    'm3w1','m3w2','m3w3','m3w4','m4w1','m4w2','m4w3','m4w4',
    'm5w1','m5w2','m5w3','m5w4','m6w1','m6w2','m6w3','m6w4'];
  if (!state.curriculum) return 0;
  return ALL_WEEKS.filter(k => state.curriculum[k]).length;
}
function _weekStrSessions(ws) { return strengthHistory.filter(e => e.date >= ws).length; }
function _consecutiveStrWeeks() {
  let streak = 0;
  for (let i = 0; i < 26; i++) {
    const ws = getWeekStart(i); // already IST-aware
    const weDate = new Date(ws + 'T00:00:00');
    weDate.setDate(weDate.getDate() + 7);
    const weStr = weDate.toISOString().split('T')[0];
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
    sm9:  () => { const _sm9ist = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60000 + 5.5*3600000); const h = _sm9ist.getHours(); return h >= 23 && te; },
    sm10: () => { const s = state.streaks?.train; return ((s && typeof s === 'object') ? (s.current||0) : (s||0)) >= 14; },
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
    sm4:  () => { const s = state.streaks?.ml; return ((s && typeof s === 'object') ? (s.current||0) : (s||0)) >= 5; },
    sm8:  () => { const wE = xpHistory.filter(e=>e.date>=ws); return wE.filter(e=>e.deepwork).length >= 1 && wE.filter(e=>e.impl).length >= 1 && (wE.filter(e=>e.deepwork||e.impl).length >= 3); },
    sm30: () => { const ALL=['m1w1','m1w2','m1w3','m1w4']; return ALL.every(k => state.curriculum && state.curriculum[k]); },
    sm31: () => (state.mlCurrent?.projects || 0) >= 1,
    sm32: () => (state.claimedMissions||[]).includes('sm31') && (state.mlCurrent?.week||1) >= 12,
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

  // Also add mission XP to today's xpHistory entry so it appears in weekly XP total
  const today = todayKey();
  const ws    = getWeekStart();
  let todayEntry = xpHistory.find(e => e.date === today);
  if (todayEntry) {
    // Add on top of existing day entry
    todayEntry.xp = (todayEntry.xp || 0) + m.xp;
    todayEntry.missionXP = (todayEntry.missionXP || 0) + m.xp;
    dbUpsertDay('xp_logs', todayEntry).catch(console.error);
  } else {
    // No log today yet — create a minimal entry to carry the mission XP
    todayEntry = { date: today, xp: m.xp, missionXP: m.xp, dayType: 'prime' };
    xpHistory.push(todayEntry);
    dbUpsertDay('xp_logs', todayEntry).catch(console.error);
  }
  // Refresh weekly XP history cache
  if (!state.weeklyXPHistory) state.weeklyXPHistory = {};
  state.weeklyXPHistory[ws] = getWeeklyXP();

  await saveState();
  notify('🏆 CLAIMED: ' + m.title + ' +' + m.xp + ' XP!', 'var(--gold)');
  refreshSections('xp', 'missions', 'dashboard');
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
        const wks = ['m1w1','m1w2','m1w3','m1w4'].filter(k=>state.curriculum&&state.curriculum[k]).length;
        const pct = Math.round((wks / 4) * 100);
        progressBar = `
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%;background:var(--blue)"></div></div>
            <div class="mc-prog-label">${wks} / 4 Month 1 weeks done · ${pct}%</div>
          </div>`;
      }
      if (m.id === 'sm31' && !isCompleted) {
        const proj = state.mlCurrent?.projects || 0;
        const pct  = proj >= 1 ? 100 : 0;
        progressBar = `
          <div class="mc-prog-wrap">
            <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%;background:var(--blue)"></div></div>
            <div class="mc-prog-label">${proj >= 1 ? '1' : '0'} / 1 project shipped · ${pct}%</div>
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
  // Mission XP bar
  const maxMissionXP = SECRET_MISSIONS.reduce((s,m) => s + m.xp, 0);
  const mxpPct = maxMissionXP ? Math.round((totalXPFromMissions / maxMissionXP) * 100) : 0;
  const mxpBar = document.getElementById('msb-xp-bar');
  const mxpLbl = document.getElementById('msb-xp-pct');
  if (mxpBar) mxpBar.style.width = mxpPct + '%';
  if (mxpLbl) mxpLbl.textContent = totalXPFromMissions + ' / ' + maxMissionXP + ' XP · ' + mxpPct + '% of all mission XP claimed';
}

// ── REWARDS ──
function renderRewards() {
  const weeks500      = Object.values(state.weeklyXPHistory||{}).filter(xp => xp >= 500).length;
  const levelsGained  = Math.max(0, (state.currentLevel||1) - 1);
  const now           = new Date();
  const monthsElapsed = (now.getFullYear()-2026)*12 + now.getMonth() - 2;
  const claimed       = state.claimedRewards || [];

  // ── Total progress bar ──
  const totalRewards  = WEEKLY_REWARDS.length + BIWEEKLY_REWARDS.length + MONTHLY_REWARDS.length
                        + PERFORMANCE_REWARDS.length + IDENTITY_REWARDS.length;
  const totalClaimed  = claimed.length;
  const pct           = totalRewards ? Math.round((totalClaimed / totalRewards) * 100) : 0;
  const vaultBar  = document.getElementById('rewardVaultBar');
  const vaultPct  = document.getElementById('rewardVaultPct');
  const vaultCnt  = document.getElementById('rewardVaultClaimed');
  if (vaultBar) vaultBar.style.width = pct + '%';
  if (vaultPct) vaultPct.textContent = pct + '%';
  if (vaultCnt) vaultCnt.textContent = totalClaimed + ' / ' + totalRewards + ' claimed';

  // ── Card builder ──
  function card(r, key, unlocked, isClaimed, num) {
    const tierLabel = { weekly:'WEEKLY', biweekly:'LEVEL UP', monthly:'MONTHLY', performance:'MILESTONE', identity:'IDENTITY' };
    const tierColor = { weekly:'var(--accent)', biweekly:'var(--blue)', monthly:'var(--gold)',
                        performance:'var(--accent2)', identity:'var(--purple)' };
    const tc = r.color || tierColor[r.tier] || 'var(--muted)';
    const tl = tierLabel[r.tier] || 'REWARD';

    const stateClass = isClaimed ? 'rv-claimed' : unlocked ? 'rv-unlocked' : 'rv-locked';

    return `<div class="rv-card ${stateClass}" style="--rc:${tc};">
      <div class="rv-shine"></div>
      <div class="rv-top">
        <span class="rv-tier-badge" style="color:${tc};border-color:${tc}30;background:${tc}10;">${tl}</span>
        ${r.price ? `<span class="rv-price">${r.price}</span>` : ''}
        ${isClaimed ? `<span class="rv-claimed-badge">✓ DONE</span>` : ''}
      </div>
      <div class="rv-icon">${unlocked && !isClaimed ? r.icon : isClaimed ? '✅' : '🔒'}</div>
      <div class="rv-name" style="color:${unlocked || isClaimed ? 'var(--text)' : 'var(--muted)'};">${r.name}</div>
      <div class="rv-desc">${unlocked || isClaimed ? r.desc : 'Keep grinding — this reward is waiting.'}</div>
      ${unlocked && !isClaimed
        ? `<button class="rv-claim-btn" style="border-color:${tc};color:${tc};" onclick="claimReward('${key}','${r.name}')">
             CLAIM ⚡
           </button>`
        : isClaimed
          ? `<div class="rv-claimed-txt">Reward collected</div>`
          : `<div class="rv-locked-hint">
               ${r.tier === 'weekly'  ? `${Math.max(0, num - weeks500 + 1)} week${Math.max(0, num - weeks500 + 1) !== 1 ? 's' : ''} away` :
                 r.tier === 'biweekly' ? `${Math.max(0, num - levelsGained + 1)} level${Math.max(0, num - levelsGained + 1) !== 1 ? 's' : ''} away` :
                 r.tier === 'monthly'  ? 'Complete the month' :
                 'Hit the milestone'}
             </div>`
      }
    </div>`;
  }

  // ── Render sections ──
  const wg = document.getElementById('rewardGridWeekly');
  if (wg) wg.innerHTML = WEEKLY_REWARDS.map((r,i) =>
    card(r, 'w'+i, weeks500 > i, claimed.includes('w'+i), i)).join('');

  const bwg = document.getElementById('rewardGridBiweekly');
  if (bwg) bwg.innerHTML = BIWEEKLY_REWARDS.map((r,i) =>
    card(r, 'bw'+i, levelsGained > i, claimed.includes('bw'+i), i)).join('');

  const mg = document.getElementById('rewardGridMonthly');
  if (mg) mg.innerHTML = MONTHLY_REWARDS.map((r,i) =>
    card(r, 'm'+i, monthsElapsed > i, claimed.includes('m'+i), i)).join('');

  const pg = document.getElementById('rewardGridPerformance');
  if (pg) pg.innerHTML = PERFORMANCE_REWARDS.map((r,i) => {
    const isCl   = claimed.includes('p'+i);
    const unlock = (state.performanceRewards||[]).includes(r.goal);
    return card(r, 'p'+i, unlock, isCl, i);
  }).join('');

  const ig = document.getElementById('rewardGridIdentity');
  if (ig) ig.innerHTML = IDENTITY_REWARDS.map((r,i) =>
    card(r, 'id'+i, true, claimed.includes('id'+i), i)).join('');
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
  'sk-restapi','sk-asyncapi','sk-llmpipe'];

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
  const CAMPAIGN_START = new Date('2026-03-23');
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

  const savedAt = new Date().toISOString();
  await dbUpsertState('tomorrow_note', { text, savedAt });
  state.tomorrowNote = { text, savedAt };
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

function checkMorningFlash() {
  if (!state.tomorrowNote?.text?.trim()) return;

  // Get current IST date + time
  const now   = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist   = new Date(utcMs + 5.5 * 3600000);
  const istMinutes = ist.getHours() * 60 + ist.getMinutes();
  const todayIST   = ist.toISOString().slice(0, 10);

  // Only flash after 5:30am IST
  if (istMinutes < 330) return;

  // Only flash the day AFTER the note was saved
  // savedAt is an ISO string — extract the date part in IST
  const savedAt = state.tomorrowNote.savedAt;
  if (!savedAt) return;
  const savedUtcMs = new Date(savedAt).getTime() + new Date(savedAt).getTimezoneOffset() * 60000;
  const savedIST   = new Date(savedUtcMs + 5.5 * 3600000);
  const savedDateIST = savedIST.toISOString().slice(0, 10);

  // Must be a different (later) day
  if (todayIST <= savedDateIST) return;

  // Don't flash again if already dismissed today
  if (state.noteFlashDismissed === todayIST) return;

  // Show after a short delay so the app finishes loading first
  setTimeout(() => showMorningNoteModal(state.tomorrowNote.text, todayIST), 800);
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
    name: 'UPPER POWER',
    sub: 'Frame Builder',
    goal: 'Build back width + upper chest + shoulders',
    color: 'var(--green)',
    muscles: ['Lats','Chest','Shoulders','Arms','Core'],
    type: 'strength',
    sections: [
      {
        title: 'MAIN WORKOUT',
        exercises: [
          { name: 'Weighted Pull-ups',      sets: 4, reps: '6–8',  rest: '3min', note: 'Add weight each session if reps clean', type: 'weight' },
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8',    rest: '2min', note: 'Upper chest emphasis', type: 'weight' },
          { name: 'Barbell Rows',           sets: 3, reps: '8',    rest: '2min', note: 'Drive elbows back, squeeze', type: 'weight' },
          { name: 'Overhead Press',         sets: 3, reps: '8',    rest: '2min', note: 'Strict form — no leg drive', type: 'weight' },
          { name: 'Dumbbell Lateral Raises',sets: 4, reps: '15',   rest: '90s',  note: 'Slow eccentric — feel the delt', type: 'weight' },
          { name: 'Hanging Leg Raises',     sets: 4, reps: '15',   rest: '60s',  note: 'Core finisher — slow and controlled', type: 'reps' },
        ]
      },
      {
        title: 'OPTIONAL FINISHER',
        optional: true,
        exercises: [
          { name: 'Incline Walk',           sets: 1, reps: '10 min', rest: '—', note: 'Easy pace, just moving', type: 'time' },
        ]
      }
    ]
  },
  1: {
    name: 'SPEED & CONDITIONING',
    sub: 'VO₂ Max + Fat Burn',
    goal: 'Improve VO₂ max and fat burning',
    color: 'var(--blue)',
    muscles: ['Full Body','Core','Calves','Lungs'],
    type: 'cardio',
    sections: [
      {
        title: 'RUNNING',
        exercises: [
          { name: '1 km Warm-up Jog',       sets: 1, reps: '1 km',    rest: '—',    note: 'Easy pace — get loose', type: 'time' },
          { name: '400m Sprints × 6',        sets: 6, reps: '400m',    rest: '90s',  note: '90% effort — quality over quantity', type: 'time' },
          { name: '1 km Cool-down Jog',      sets: 1, reps: '1 km',    rest: '—',    note: 'Easy — let heart rate drop', type: 'time' },
        ]
      },
      {
        title: 'CORE',
        exercises: [
          { name: 'Plank',                   sets: 3, reps: '1 min',   rest: '45s',  note: 'Anterior tilt corrected — squeeze glutes', type: 'time' },
          { name: 'Hollow Body Hold',        sets: 3, reps: '45 sec',  rest: '45s',  note: 'Lower back pressed to floor', type: 'time' },
        ]
      }
    ]
  },
  2: {
    name: 'LOWER BODY STRENGTH',
    sub: 'Athletic Legs',
    goal: 'Strong athletic legs',
    color: 'var(--gold)',
    muscles: ['Quads','Hamstrings','Glutes','Calves'],
    type: 'strength',
    sections: [
      {
        title: 'MAIN WORKOUT',
        exercises: [
          { name: 'Back Squat / Trap Bar DL',  sets: 4, reps: '5–8',  rest: '3min', note: 'Alternate each week — never both same day', type: 'weight' },
          { name: 'Bulgarian Split Squat',     sets: 3, reps: '10',   rest: '2min', note: '10 each leg — deep stretch', type: 'weight' },
          { name: 'Romanian Deadlift',         sets: 3, reps: '8',    rest: '2min', note: 'Hinge — feel the hamstrings load', type: 'weight' },
          { name: 'Leg Press / Hack Squat',    sets: 3, reps: '12',   rest: '2min', note: 'Full ROM — pause at bottom', type: 'weight' },
          { name: 'Box Jumps',                 sets: 3, reps: '5',    rest: '2min', note: 'Max height — land soft and absorb', type: 'reps' },
          { name: 'Standing Calf Raises',      sets: 5, reps: '15',   rest: '60s',  note: 'Full ROM — pause at top and bottom', type: 'weight' },
        ]
      }
    ]
  },
  3: {
    name: 'REST & RECOVERY',
    sub: 'Active Rest Day',
    goal: 'Recovery so muscles actually grow',
    color: 'var(--muted)',
    muscles: ['Full Body Recovery'],
    type: 'rest',
    sections: [
      {
        title: 'DO THIS',
        exercises: [
          { name: 'Light Walking',             sets: 1, reps: '20–30 min', rest: '—', note: 'Easy pace — just keep moving', type: 'time' },
          { name: 'Mobility Stretching',       sets: 1, reps: '15 min',    rest: '—', note: 'Hip flexors, hamstrings, shoulders', type: 'time' },
          { name: 'Football Juggling',         sets: 1, reps: 'optional',  rest: '—', note: 'Easy — skill practice, not fitness', type: 'reps' },
        ]
      }
    ]
  },
  4: {
    name: 'UPPER HYPERTROPHY',
    sub: 'Anime Shoulders',
    goal: 'Capped shoulders + arms',
    color: 'var(--purple)',
    muscles: ['Shoulders','Back','Triceps','Biceps','Forearms'],
    type: 'strength',
    sections: [
      {
        title: 'MAIN WORKOUT',
        exercises: [
          { name: 'Lat Pulldowns',             sets: 4, reps: '10–12', rest: '2min', note: 'Full stretch at top, squeeze at bottom', type: 'weight' },
          { name: 'Dumbbell Lateral Raises',   sets: 5, reps: '15–20', rest: '60s',  note: 'Slight lean — target mid delt', type: 'weight' },
          { name: 'Rear Delt Fly',             sets: 3, reps: '15',    rest: '60s',  note: 'Cable or DB — squeeze at top', type: 'weight' },
          { name: 'Dips / Flat DB Press',      sets: 3, reps: '10',    rest: '2min', note: 'Chest or tricep focus — your choice', type: 'weight' },
        ]
      },
      {
        title: 'SUPERSET',
        superset: true,
        exercises: [
          { name: 'Hammer Curls',              sets: 4, reps: '12',    rest: '—',    note: 'Neutral grip — brachialis', type: 'weight' },
          { name: 'Rope Pushdowns',            sets: 4, reps: '12',    rest: '60s',  note: 'Superset with curls — no rest between', type: 'weight' },
        ]
      },
      {
        title: 'FINISHER',
        exercises: [
          { name: 'Farmer Carries',            sets: 3, reps: '40m',   rest: '90s',  note: 'Heavy — grip and trap density', type: 'weight' },
        ]
      }
    ]
  },
  5: {
    name: 'ENDURANCE & ATHLETICISM',
    sub: 'Aerobic Base',
    goal: 'Build aerobic base and agility',
    color: 'var(--accent2)',
    muscles: ['Full Body','Cardio','Agility'],
    type: 'cardio',
    sections: [
      {
        title: 'RUN',
        exercises: [
          { name: '5K Tempo Run',              sets: 1, reps: '5 km',   rest: '—',   note: 'Uncomfortable but sustainable pace — log time in Engine tab', type: 'time' },
        ]
      },
      {
        title: 'AGILITY',
        exercises: [
          { name: 'Football Agility Drills',   sets: 1, reps: '15 min', rest: '—',   note: 'Cone drills, shuttle runs, quick feet', type: 'time' },
        ]
      }
    ]
  }
};

let _activeTrainingDay = null;
// _workoutLog[dayIdx][sectionIdx][exIdx][setIdx] = { done, weight, reps, time }
let _workoutLog = {};
let _workoutDate = null;

function _getSet(d, sec, e, s) {
  if (!_workoutLog[d])         _workoutLog[d] = {};
  if (!_workoutLog[d][sec])    _workoutLog[d][sec] = {};
  if (!_workoutLog[d][sec][e]) _workoutLog[d][sec][e] = {};
  if (!_workoutLog[d][sec][e][s]) _workoutLog[d][sec][e][s] = { done: false, weight: '', reps: '', time: '' };
  return _workoutLog[d][sec][e][s];
}

function selectTrainingDay(dayIdx) {
  // If a different workout is already active and has sets logged, ask first
  if (_activeTrainingDay !== null && _activeTrainingDay !== dayIdx) {
    const done = getTotalSetsDone(_activeTrainingDay);
    if (done > 0) {
      const current = TRAINING_DAYS[_activeTrainingDay].name;
      const next    = TRAINING_DAYS[dayIdx].name;
      if (!confirm(`You have ${done} set(s) logged for "${current}".\nSwitch to "${next}"? Your progress won't be lost — you can come back.`)) {
        return; // stay on current
      }
    }
  }
  _activeTrainingDay = dayIdx;
  if (!_workoutDate) _workoutDate = todayKey();
  document.querySelectorAll('.wk-card').forEach((c, i) => {
    c.classList.toggle('wk-active', i === dayIdx);
  });
  renderActiveWorkout();
  const panel = document.getElementById('activeWorkoutPanel');
  if (panel) setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function toggleSetDone(d, sec, e, s) {
  const set = _getSet(d, sec, e, s);
  // Capture inputs before toggling
  const wEl = document.getElementById(`inp-w-${d}-${sec}-${e}-${s}`);
  const rEl = document.getElementById(`inp-r-${d}-${sec}-${e}-${s}`);
  const tEl = document.getElementById(`inp-t-${d}-${sec}-${e}-${s}`);
  if (wEl) set.weight = wEl.value;
  if (rEl) set.reps   = rEl.value;
  if (tEl) set.time   = tEl.value;
  set.done = !set.done;
  renderActiveWorkout();
  updateTrStats();
}

function saveSetVal(d, sec, e, s) {
  const set = _getSet(d, sec, e, s);
  const wEl = document.getElementById(`inp-w-${d}-${sec}-${e}-${s}`);
  const rEl = document.getElementById(`inp-r-${d}-${sec}-${e}-${s}`);
  const tEl = document.getElementById(`inp-t-${d}-${sec}-${e}-${s}`);
  if (wEl) set.weight = wEl.value;
  if (rEl) set.reps   = rEl.value;
  if (tEl) set.time   = tEl.value;
}

function getTotalSetsDone(dayIdx) {
  const day = TRAINING_DAYS[dayIdx];
  if (!day) return 0;
  let c = 0;
  day.sections.forEach((sec, si) => {
    sec.exercises.forEach((ex, ei) => {
      const exSets = typeof ex.sets === 'number' ? ex.sets : 1;
      for (let s = 0; s < exSets; s++) {
        if (_workoutLog[dayIdx]?.[si]?.[ei]?.[s]?.done) c++;
      }
    });
  });
  return c;
}

function getTotalSets(dayIdx) {
  const day = TRAINING_DAYS[dayIdx];
  if (!day) return 0;
  let t = 0;
  day.sections.forEach(sec => sec.exercises.forEach(ex => t += typeof ex.sets === 'number' ? ex.sets : 1));
  return t;
}

async function saveWorkout() {
  if (!isKeith()) { notify('👁 Guest view', 'var(--muted)'); return; }
  if (_activeTrainingDay === null) { notify('Select a workout first', 'var(--red)'); return; }

  const d = _activeTrainingDay;
  const day = TRAINING_DAYS[d];
  const date = _workoutDate || todayKey();

  const sections = day.sections.map((sec, si) => ({
    title: sec.title,
    exercises: sec.exercises.map((ex, ei) => {
      const exSets = typeof ex.sets === 'number' ? ex.sets : 1;
      const sets = Array.from({length: exSets}, (_, s) => {
        const set = _getSet(d, si, ei, s);
        const wEl = document.getElementById(`inp-w-${d}-${si}-${ei}-${s}`);
        const rEl = document.getElementById(`inp-r-${d}-${si}-${ei}-${s}`);
        const tEl = document.getElementById(`inp-t-${d}-${si}-${ei}-${s}`);
        return { done: set.done, weight: wEl?.value||set.weight, reps: rEl?.value||set.reps, time: tEl?.value||set.time };
      });
      return { name: ex.name, sets };
    })
  }));

  const entry = {
    date, dayIdx: d, dayName: day.name,
    sections,
    totalSets: getTotalSets(d),
    doneSets: getTotalSetsDone(d),
  };

  const existing = await supaFetch('GET', `rebuilder_logs?type=eq.workout_logs&logged_at=eq.${date}&limit=1`);
  if (existing && existing.length > 0) {
    await supaFetch('PATCH', `rebuilder_logs?type=eq.workout_logs&logged_at=eq.${date}`, _buildPatch(entry));
  } else {
    await supaFetch('POST', 'rebuilder_logs', _buildRow('workout_logs', entry));
  }

  // Cardio link: if 5K run time logged, pre-fill engine tab
  if (d === 5) {
    const runSec = sections[0];
    const timeVal = runSec?.exercises?.[0]?.sets?.[0]?.time;
    if (timeVal) {
      const fiveKEl = document.getElementById('inp-5k');
      if (fiveKEl && !fiveKEl.value) fiveKEl.value = timeVal;
      notify('⏱ Run time copied to Engine tab', 'var(--blue)');
    }
  }

  notify('✓ Saved — ' + getTotalSetsDone(d) + '/' + getTotalSets(d) + ' sets', 'var(--green)');
  renderActiveWorkout();
}

function resetWorkout(dayIdx) {
  if (!confirm('Clear all logged sets?')) return;
  _workoutLog[dayIdx] = {};
  renderActiveWorkout();
  updateTrStats();
}

function renderActiveWorkout() {
  const el = document.getElementById('activeWorkoutPanel');
  if (!el) return;

  if (_activeTrainingDay === null) {
    el.innerHTML = `<div style="padding:40px 16px;text-align:center;">
      <div style="font-size:2rem;margin-bottom:12px;">👆</div>
      <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--muted);letter-spacing:2px;">SELECT A WORKOUT ABOVE</div>
    </div>`;
    return;
  }

  const d   = _activeTrainingDay;
  const day = TRAINING_DAYS[d];
  const totalSets = getTotalSets(d);
  const doneSets  = getTotalSetsDone(d);
  const pct       = totalSets ? Math.round(doneSets / totalSets * 100) : 0;
  const complete  = doneSets === totalSets && totalSets > 0;
  const isRest    = day.type === 'rest';

  // ── Sections ─────────────────────────────────────────
  const sectionsHTML = day.sections.map((sec, si) => {
    const badge = sec.optional
      ? `<span style="font-family:var(--font-mono);font-size:.5rem;color:var(--muted);background:rgba(255,255,255,.05);padding:2px 6px;margin-left:8px;">OPTIONAL</span>`
      : sec.superset
      ? `<span style="font-family:var(--font-mono);font-size:.5rem;color:var(--purple);background:rgba(167,139,250,.1);padding:2px 6px;margin-left:8px;">SUPERSET</span>`
      : '';

    const exHTML = sec.exercises.map((ex, ei) => {
      const exSets     = typeof ex.sets === 'number' ? ex.sets : 1;
      const exDone     = Array.from({length: exSets}, (_,s) => _workoutLog[d]?.[si]?.[ei]?.[s]?.done||false).filter(Boolean).length;
      const exComplete = exDone === exSets && !isRest;

      // Set rows
      const setsHTML = isRest ? '' : Array.from({length: exSets}, (_, s) => {
        const set  = _getSet(d, si, ei, s);
        const done = set.done;
        const idp  = `${d}-${si}-${ei}-${s}`;
        const col  = done ? day.color : 'var(--border2)';

        let inputs = '';
        if (ex.type === 'time') {
          inputs = `<input id="inp-t-${idp}" type="text" value="${set.time}" placeholder="mm:ss"
            oninput="saveSetVal(${d},${si},${ei},${s})"
            style="width:72px;">`;
        } else if (ex.type === 'reps') {
          inputs = `<input id="inp-r-${idp}" type="number" value="${set.reps}" placeholder="reps"
            oninput="saveSetVal(${d},${si},${ei},${s})"
            style="width:68px;">`;
        } else {
          inputs = `<input id="inp-w-${idp}" type="number" value="${set.weight}" placeholder="kg"
              oninput="saveSetVal(${d},${si},${ei},${s})" style="width:60px;">
            <span style="color:var(--border2);font-family:var(--font-mono);font-size:.75rem;flex-shrink:0;">×</span>
            <input id="inp-r-${idp}" type="number" value="${set.reps}" placeholder="reps"
              oninput="saveSetVal(${d},${si},${ei},${s})" style="width:60px;">`;
        }

        return `<div class="set-row">
          <div class="set-bubble" onclick="toggleSetDone(${d},${si},${ei},${s})"
            style="border:2px solid ${col};background:${done ? day.color : 'transparent'};
            color:${done ? '#000' : 'var(--muted)'};
            box-shadow:${done ? '0 0 10px ' + day.color + '55' : 'none'};">
            ${done ? '✓' : (s + 1)}
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">${inputs}</div>
          <div style="margin-left:auto;font-family:var(--font-mono);font-size:.58rem;color:${done ? day.color : 'var(--border2)'};flex-shrink:0;">
            ${ex.reps !== '—' ? 'target ' + ex.reps : ''}
          </div>
        </div>`;
      }).join('');

      return `<div class="ex-card${exComplete ? ' ex-done' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:${isRest ? 0 : 12}px;">
          <div style="flex:1;padding-right:12px;">
            <div style="font-family:var(--font-display);font-size:.95rem;
              color:${exComplete ? 'var(--muted)' : day.color};letter-spacing:.5px;
              text-decoration:${exComplete ? 'line-through' : 'none'};">${ex.name}</div>
            <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--muted);margin-top:4px;">
              ${ex.sets} sets · ${ex.reps} reps · rest ${ex.rest}
            </div>
            ${ex.note ? `<div style="font-family:var(--font-mono);font-size:.6rem;color:var(--muted);margin-top:5px;font-style:italic;opacity:.8;">💡 ${ex.note}</div>` : ''}
          </div>
          ${isRest ? '' : `<div style="font-family:var(--font-display);font-size:.9rem;
            color:${exComplete ? 'var(--green)' : day.color};flex-shrink:0;">
            ${exDone}/${exSets}
          </div>`}
        </div>
        ${setsHTML}
      </div>`;
    }).join('');

    return `<div style="margin-bottom:24px;">
      <div style="display:flex;align-items:center;gap:0;margin-bottom:12px;">
        <div style="width:3px;height:14px;background:${day.color};opacity:.5;margin-right:10px;flex-shrink:0;"></div>
        <span style="font-family:var(--font-mono);font-size:.6rem;color:var(--muted);letter-spacing:3px;">${sec.title}</span>
        ${badge}
      </div>
      ${exHTML}
    </div>`;
  }).join('');

  // ── Full panel ────────────────────────────────────────
  el.innerHTML = `
    <div style="background:var(--panel);border:1px solid var(--border);border-top:3px solid ${day.color};overflow:hidden;">

      <!-- Header -->
      <div style="padding:24px 22px 20px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-family:var(--font-display);font-size:1.4rem;color:${day.color};letter-spacing:2px;line-height:1;">${day.name}</div>
            <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--muted);margin-top:6px;">${day.goal}</div>
            <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">
              ${day.muscles.map(m => `<span style="font-family:var(--font-mono);font-size:.55rem;padding:3px 8px;border:1px solid ${day.color}33;color:${day.color};opacity:.8;">${m}</span>`).join('')}
            </div>
          </div>
          ${isRest ? '' : `<div style="text-align:right;flex-shrink:0;padding-left:16px;">
            <div style="font-family:var(--font-display);font-size:2.6rem;line-height:1;color:${complete ? 'var(--green)' : day.color};">${pct}%</div>
            <div style="font-family:var(--font-mono);font-size:.58rem;color:var(--muted);margin-top:4px;">${doneSets} / ${totalSets} sets</div>
          </div>`}
        </div>

        ${isRest ? '' : `<div style="margin-top:18px;">
          <div style="height:4px;background:var(--border2);">
            <div style="width:${pct}%;height:100%;background:${day.color};transition:width .4s;box-shadow:0 0 8px ${day.color}55;"></div>
          </div>
        </div>`}
      </div>

      ${complete ? `<div style="margin:0 22px 16px;padding:10px 14px;background:rgba(45,212,191,.06);border:1px solid rgba(45,212,191,.25);font-family:var(--font-display);font-size:.8rem;color:var(--green);text-align:center;letter-spacing:3px;">✓ WORKOUT COMPLETE 🔥</div>` : ''}

      <!-- Exercises -->
      <div style="padding:4px 22px 8px;">${sectionsHTML}</div>

      <!-- Footer -->
      <div style="padding:16px 22px 22px;border-top:1px solid var(--border);">
        ${isRest
          ? `<div style="font-family:var(--font-mono);font-size:.65rem;color:var(--muted);text-align:center;padding:6px 0;letter-spacing:1px;">Recovery is where the gains actually happen. Rest well.</div>`
          : `<div style="display:flex;gap:10px;">
              <button onclick="saveWorkout()" style="flex:1;background:${day.color};color:#000;border:none;padding:14px;font-family:var(--font-display);font-size:.9rem;letter-spacing:2px;cursor:pointer;transition:opacity .15s;">SAVE WORKOUT</button>
              <button onclick="resetWorkout(${d})" style="background:none;border:1px solid var(--border2);color:var(--muted);font-family:var(--font-mono);font-size:.62rem;padding:14px 18px;cursor:pointer;transition:border-color .15s;" onmouseover="this.style.borderColor='var(--accent2)'" onmouseout="this.style.borderColor='var(--border2)'">RESET</button>
            </div>`
        }
      </div>

    </div>`;
}

function updateTrStats() {
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const ws = getWeekStart();

  // Sessions this campaign (total workout saves)
  const totalSessions = (state.workoutSessions || 0);
  set('trStatSessions', totalSessions);

  // Training days hit this week (from xpHistory)
  const wEntries = xpHistory.filter(e => e.date >= ws);
  const weekDays = wEntries.filter(e => e.gym || e.run).length;
  set('trStatWeekDays', weekDays + ' / 4');

  // Current training streak
  { const s = state.streaks?.train; set('trStatStreak', (s && typeof s === 'object') ? (s.current||0) : (s||0)); }

  // Sets completed today in active workout
  const today = todayKey();
  let setsToday = 0;
  if (_activeTrainingDay !== null && _workoutLog[_activeTrainingDay]) {
    Object.values(_workoutLog[_activeTrainingDay]).forEach(sec => {
      if (typeof sec === 'object') {
        Object.values(sec).forEach(ex => {
          if (typeof ex === 'object') {
            Object.values(ex).forEach(s => { if (s && s.done) setsToday++; });
          }
        });
      }
    });
  }
  set('trStatSetsToday', setsToday);
  // Tab hero stat chips
  const thSets = document.getElementById('trStatSetsToday');
  if (thSets) thSets.textContent = setsToday + ' sets today';
  const thStreak = document.getElementById('th-streak');
  if (thStreak) { const s = state.streaks?.train; thStreak.textContent = '🔥 ' + ((s && typeof s === 'object') ? (s.current||0) : 0) + ' day streak'; }
  const thWk = document.getElementById('th-weekdays');
  if (thWk) thWk.textContent = '📅 ' + weekDays + ' / 4 this week';
}

function renderTodayWorkout() { updateTrStats(); }


function refreshAll() {
  const safe = (fn, name) => { try { fn(); } catch(e) { console.error('[refreshAll crash] ' + name + ':', e); } };
  safe(updateHeader,           'updateHeader');
  safe(renderDashboard,        'renderDashboard');
  safe(updateXP,               'updateXP');
  safe(renderTodayWorkout,     'renderTodayWorkout');
  safe(checkShowWrappedButton, 'checkShowWrappedButton');
  safe(renderBodyStats,        'renderBodyStats');
  safe(renderStrengthPBs,      'renderStrengthPBs');
  safe(renderEnginePBs,        'renderEnginePBs');
  safe(renderMLStats,          'renderMLStats');
  safe(renderGermanStats,      'renderGermanStats');
  safe(renderAnalytics,        'renderAnalytics');
  safe(renderHabits,           'renderHabits');
  safe(renderRewards,          'renderRewards');
  safe(renderMissions,         'renderMissions');
  safe(renderLevelTimeline,    'renderLevelTimeline');
  safe(updateCurriculumBars,   'updateCurriculumBars');
  safe(updateMVSBar,           'updateMVSBar');
  safe(renderHistoryFeeds,     'renderHistoryFeeds');
  const sc = document.getElementById('shieldCount');
  if (sc) sc.textContent = state.streakShieldsAvailable || 0;
}

// Targeted refresh — only re-renders what actually changed
// sections: array of 'xp'|'body'|'german'|'strength'|'engine'|'ml'|'missions'|'dashboard'
function refreshSections(...sections) {
  const safe = (fn) => { try { fn(); } catch(e) { console.error(e); } };
  const has = s => sections.includes(s);

  // Always update header + dashboard tiles (fast, no DOM-heavy work)
  safe(updateHeader);
  safe(updateMVSBar);

  if (has('xp') || has('dashboard')) {
    safe(renderDashboard);
    safe(updateXP);
    safe(renderLevelTimeline);
    safe(renderAnalytics);
    safe(renderRewards);
  }
  if (has('xp') || has('missions')) {
    safe(renderMissions);
  }
  if (has('body')) {
    safe(renderBodyStats);
    safe(renderBodyHistoryFeed);
  }
  if (has('strength')) {
    safe(renderStrengthPBs);
    safe(renderStrengthHistoryFeed);
  }
  if (has('engine')) {
    safe(renderEnginePBs);
    safe(renderEngineHistoryFeed);
  }
  if (has('ml')) {
    safe(renderMLStats);
    safe(renderMLHistoryFeed);
    safe(updateCurriculumBars);
  }
  if (has('german')) {
    safe(renderGermanStats);
    safe(renderGermanHistoryFeed);
  }
  if (has('xp')) {
    safe(renderRecentActivity);
    safe(checkShowWrappedButton);
  }
  if (has('training')) {
    safe(renderTodayWorkout);
  }
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

  const _sc = k => { const s = state.streaks?.[k]; return (s && typeof s === 'object') ? (s.current || 0) : (s || 0); };
  const totalStreak = _sc('train') + _sc('ml') + _sc('german');
  const bonusXP = Math.floor(totalStreak / 10) * 10;
  set('streakBonusDisplay', bonusXP > 0 ? '+' + bonusXP + ' XP' : '—');

  const THRESH = { train: 4, ml: 4, german: 5 };
  const weekProgress = state.weekProgress || { train: 0, ml: 0, german: 0 };

  ['train','ml','german'].forEach(t => {
    const sd = state.streaks?.[t];
    const cur = (sd && typeof sd === 'object') ? (sd.current || 0) : (sd || 0);
    const lng = (sd && typeof sd === 'object') ? (sd.longest || 0) : 0;
    const shielded = sd?.shielded || false;
    set(t + 'Streak', shielded ? '🛡' : cur);
    // Update longest streak sub-label if element exists
    const lngEl = document.getElementById(t + 'StreakLongest');
    if (lngEl) lngEl.textContent = 'BEST: ' + lng;
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

      const campaignStart = '2026-03-23';
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
  renderDashboardNutrition();

  const grade = calcWeeklyGrade();
  const wg = document.getElementById('weekGrade');
  if (wg) { wg.className = 'week-grade grade-' + grade; wg.textContent = grade; }
}

// ── DASHBOARD NUTRITION PANEL ──
function renderDashboardNutrition() {
  const today = todayKey();
  const entry = bodyHistory.find(e => (e.date || (e._logged_at||'').slice(0,10)) === today);

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v != null ? v : '—'; };
  const setW = (id, pct) => { const el = document.getElementById(id); if (el) el.style.width = Math.min(100, pct) + '%'; };

  if (!entry || (!entry.cals && !entry.prot && !entry.carb && !entry.fat)) {
    set('dash-cal-today',  '—');
    set('dash-prot-today', '—');
    set('dash-carb-today', '—');
    set('dash-fat-today',  '—');
    setW('dash-prot-bar', 0);
    const mb = document.getElementById('dash-meal-breakdown');
    if (mb) mb.style.display = 'none';
    return;
  }

  set('dash-cal-today',  entry.cals || '—');
  set('dash-prot-today', entry.prot || '—');
  set('dash-carb-today', entry.carb || '—');
  set('dash-fat-today',  entry.fat  || '—');
  setW('dash-prot-bar', ((entry.prot || 0) / 80) * 100);

  // Color the calorie number based on target hit
  const calEl = document.getElementById('dash-cal-today');
  if (calEl && entry.cals) {
    calEl.style.color = entry.cals >= 2800 && entry.cals <= 3000
      ? 'var(--green)' : entry.cals >= 2500
      ? 'var(--gold)'  : 'var(--accent2)';
  }

  // Per-meal mini breakdown
  const mb = document.getElementById('dash-meal-breakdown');
  if (!mb) return;
  if (!entry.meals) { mb.style.display = 'none'; return; }

  const MEAL_ICONS  = { breakfast:'🌅', lunch:'☀️', dinner:'🌙', snacks:'🍎' };
  const MEAL_COLORS = { breakfast:'var(--accent)', lunch:'var(--gold)', dinner:'var(--purple)', snacks:'var(--muted)' };

  const rows = ['breakfast','lunch','dinner','snacks']
    .filter(k => entry.meals[k] && (entry.meals[k].cal || entry.meals[k].prot || entry.meals[k].desc))
    .map(k => {
      const m = entry.meals[k];
      const parts = [];
      if (m.cal)  parts.push(`<span style="color:var(--accent2);">${m.cal} kcal</span>`);
      if (m.prot) parts.push(`<span style="color:var(--green);">${m.prot}g P</span>`);
      if (m.carb) parts.push(`<span style="color:var(--purple);">${m.carb}g C</span>`);
      if (m.fat)  parts.push(`<span style="color:var(--gold);">${m.fat}g F</span>`);
      return `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.03);">
        <span style="font-family:var(--font-display);font-size:.7rem;color:${MEAL_COLORS[k]};min-width:80px;flex-shrink:0;">${MEAL_ICONS[k]} ${k.toUpperCase()}</span>
        <span style="font-family:var(--font-mono);font-size:.65rem;display:flex;gap:8px;flex-wrap:wrap;">${parts.join('<span style="color:var(--border2);">·</span>')}</span>
        ${m.desc ? `<span style="font-family:var(--font-mono);font-size:.6rem;color:var(--muted);margin-left:auto;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m.desc}</span>` : ''}
      </div>`;
    });

  if (rows.length) {
    mb.style.display = 'block';
    mb.innerHTML = rows.join('');
  } else {
    mb.style.display = 'none';
  }
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
  renderStrengthHistoryFeed();
}

function renderStrengthHistoryFeed() {
  const feed = document.getElementById('strengthHistoryFeed');
  if (!feed) return;
  const recent = [...strengthHistory].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 15);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No strength sessions logged yet</div>'; return; }
  const UNITS = { squat:'kg', deadlift:'kg', wpullup:'+kg', pushup:'reps', bench:'kg', row:'kg' };
  const ICONS = { squat:'🦵', deadlift:'⚡', wpullup:'🔺', pushup:'💥', bench:'🏋️', row:'🔄' };
  feed.innerHTML = recent.map(e => {
    const lifts = ['squat','deadlift','wpullup','pushup','bench','row']
      .filter(k => e[k] != null && e[k] > 0)
      .map(k => `<span class="feed-pill fp-orange">${ICONS[k]} ${e[k]}${UNITS[k]}</span>`);
    const notePill = e.notes ? `<span class="feed-pill fp-muted" style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.notes}</span>` : '';
    return `<div class="feed-item">
      <div class="feed-date">${fmtDate(e.date)}</div>
      <div class="feed-content"><div class="feed-pills">${lifts.join('') + notePill || '<span class="feed-pill fp-muted">No lifts logged</span>'}</div></div>
      ${isKeith() ? `<div class="feed-actions"><button class="feed-edit-btn" onclick="editStrengthEntry('${e._id || e.date}','${e.date}')">EDIT</button><button class="feed-del-btn" onclick="deleteStrengthEntry('${e._id || e.date}','${e.date}')">DEL</button></div>` : ''}
    </div>`;
  }).join('');
}

function editStrengthEntry(rowId, date) {
  if (!isKeith()) return;
  const entry = strengthHistory.find(e => (e._id == rowId) || e.date === date);
  if (!entry) return;
  openEditModal('EDIT STRENGTH SESSION', date, [
    { key:'squat',    label:'Squat (kg)',       type:'number', value:entry.squat    ||'', placeholder:'80',  step:'2.5' },
    { key:'deadlift', label:'Deadlift (kg)',     type:'number', value:entry.deadlift ||'', placeholder:'100', step:'2.5' },
    { key:'wpullup',  label:'W. Pull-up (+kg)', type:'number', value:entry.wpullup  ||'', placeholder:'15',  step:'2.5' },
    { key:'pushup',   label:'Push-ups (max)',    type:'number', value:entry.pushup   ||'', placeholder:'35',  step:'1' },
    { key:'bench',    label:'Bench (kg)',         type:'number', value:entry.bench   ||'', placeholder:'60',  step:'2.5' },
    { key:'row',      label:'Row (kg)',           type:'number', value:entry.row     ||'', placeholder:'70',  step:'2.5' },
    { key:'notes',    label:'Notes', full:true,  type:'text',   value:entry.notes   ||'', placeholder:'Session notes…' },
  ], async () => {
    if (emVal('squat'))    entry.squat    = emFloat('squat');
    if (emVal('deadlift')) entry.deadlift = emFloat('deadlift');
    if (emVal('wpullup'))  entry.wpullup  = emFloat('wpullup');
    if (emVal('pushup'))   entry.pushup   = emInt('pushup');
    if (emVal('bench'))    entry.bench    = emFloat('bench');
    if (emVal('row'))      entry.row      = emFloat('row');
    entry.notes = emVal('notes');
    // Use _id for precise row targeting if available, fallback to date
    const filter = entry._id
      ? `rebuilder_logs?id=eq.${entry._id}`
      : `rebuilder_logs?type=eq.strength_logs&logged_at=eq.${date}`;
    await supaFetch('PATCH', filter, _buildPatch(entry));
    notify('✏ Strength session updated', 'var(--accent2)');
    closeEditModal();
    refreshSections('strength');
    buildStrengthChart(_strengthChartFilter);
  });
}

async function deleteStrengthEntry(rowId, date) {
  if (!isKeith()) return;
  if (!confirm('Delete this strength session for ' + date + '?')) return;
  const idx = strengthHistory.findIndex(e => (e._id == rowId) || e.date === date);
  if (idx < 0) return;
  const entry = strengthHistory[idx];
  const filter = entry._id
    ? `rebuilder_logs?id=eq.${entry._id}`
    : `rebuilder_logs?type=eq.strength_logs&logged_at=eq.${date}`;
  strengthHistory.splice(idx, 1);
  await supaFetch('DELETE', filter);
  notify('🗑 Strength session deleted', 'var(--red)');
  refreshSections('strength');
  buildStrengthChart(_strengthChartFilter);
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

  set('ml-proj-show', ml.projects || 0);
  set('ml-com-show',  ml.commits  || 0);
  set('dashProjects', ml.projects || 0);

  // Restore inputs
  const inpProj = document.getElementById('inp-projects');
  const inpCom  = document.getElementById('inp-commits');
  const inpWk   = document.getElementById('inp-current-week');
  if (inpProj) inpProj.value = ml.projects || 0;
  if (inpCom)  inpCom.value  = ml.commits  || 0;
  if (inpWk)   inpWk.value   = ml.week     || 1;

  // Trigger bar updates
  updateCurriculumBars();
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
  // Tab hero chips
  const ghTh = document.getElementById('german-total-hours-th');
  const gwTh = document.getElementById('german-weekly-show-th');
  if (ghTh) ghTh.textContent = tg.toFixed(1);
  if (gwTh) gwTh.textContent = wg.toFixed(1);
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
  const recent = [...xpHistory].sort((a,b) => (b.date||'').localeCompare(a.date||'')).slice(0,7);
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
      (isKeith() ? '<div class="feed-actions"><button class="feed-edit-btn" onclick="editXPEntry(\'' + e.date + '\')">EDIT</button><button class="feed-del-btn" onclick="deleteXPEntry(\'' + e.date + '\')">DEL</button></div>' : '') +
    '</div>';
  }).join('');
}

function renderBodyHistoryFeed() {
  const feed = document.getElementById('bodyHistoryFeed');
  if (!feed) return;
  const recent = [...bodyHistory]
    .filter(e => e.meals || (e.cals != null && e.cals >= 0) || (e.prot != null && e.prot > 0))
    .sort((a,b) => {
      const da = a.date || (a._logged_at||'').slice(0,10);
      const db = b.date || (b._logged_at||'').slice(0,10);
      return db.localeCompare(da);
    })
    .slice(0, 15);
  if (!recent.length) { feed.innerHTML = '<div class="feed-empty">No nutrition logged yet</div>'; return; }

  const MEAL_ICONS  = { breakfast:'🌅', lunch:'☀️', dinner:'🌙', snacks:'🍎' };
  const MEAL_COLORS = { breakfast:'var(--accent)', lunch:'var(--gold)', dinner:'var(--purple)', snacks:'var(--muted)' };
  const MEAL_KEYS   = ['breakfast','lunch','dinner','snacks'];

  feed.innerHTML = recent.map(e => {
    const eDate = e.date || (e._logged_at||'').slice(0,10);
    // Summary row: kcal · protein · carbs · fat
    const summaryParts = [];
    if (e.cals) summaryParts.push(`<span style="color:var(--accent2);font-weight:700;">${e.cals} kcal</span>`);
    if (e.prot) summaryParts.push(`<span style="color:var(--green);">${e.prot}g prot</span>`);
    if (e.carb) summaryParts.push(`<span style="color:var(--purple);">${e.carb}g carbs</span>`);
    if (e.fat)  summaryParts.push(`<span style="color:var(--gold);">${e.fat}g fat</span>`);

    // Per-meal rows with individual EDIT buttons
    let mealRows = '';
    if (e.meals) {
      mealRows = MEAL_KEYS
        .filter(key => e.meals[key] && (e.meals[key].cal || e.meals[key].prot || e.meals[key].desc))
        .map(key => {
          const m = e.meals[key];
          const macros = [];
          if (m.cal)  macros.push(`<span style="color:var(--accent2);font-weight:600;">${m.cal}</span><span style="color:var(--muted);font-size:.65rem;"> kcal</span>`);
          if (m.prot) macros.push(`<span style="color:var(--green);">${m.prot}g</span><span style="color:var(--muted);font-size:.65rem;"> prot</span>`);
          if (m.carb) macros.push(`<span style="color:var(--purple);">${m.carb}g</span><span style="color:var(--muted);font-size:.65rem;"> carbs</span>`);
          if (m.fat)  macros.push(`<span style="color:var(--gold);">${m.fat}g</span><span style="color:var(--muted);font-size:.65rem;"> fat</span>`);
          return `<div class="nutr-meal-row">
            <span style="color:${MEAL_COLORS[key]};font-family:var(--font-display);font-size:.75rem;min-width:88px;flex-shrink:0;">${MEAL_ICONS[key]} ${key.toUpperCase()}</span>
            <span style="flex:1;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              ${m.desc ? `<span style="color:var(--muted);font-size:.7rem;font-family:var(--font-mono);margin-right:4px;">${m.desc}</span>` : ''}
              ${macros.join(' ')}
            </span>
            ${isKeith() ? `<button class="feed-edit-btn" style="flex-shrink:0;" onclick="editMealEntry('${eDate}','${key}')">EDIT</button>` : ''}
          </div>`;
        }).join('');
    }

    return `<div class="feed-item" style="flex-direction:column;align-items:stretch;border-bottom:1px solid rgba(26,40,56,.5);padding:12px 0;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${mealRows ? '8px' : '0'};">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="feed-date" style="margin:0;">${fmtDate(eDate)}</span>
          <span style="font-family:var(--font-mono);font-size:.65rem;display:flex;gap:8px;">${summaryParts.join('<span style="color:var(--border2);margin:0 2px;">·</span>')}</span>
        </div>
        ${isKeith() ? `<button class="feed-del-btn" onclick="deleteBodyEntry('${eDate}')">DEL</button>` : ''}
      </div>
      ${mealRows ? `<div class="nutr-meal-breakdown" style="padding-left:4px;">${mealRows}</div>` : ''}
    </div>`;
  }).join('');
}

// Edit a single meal within a body entry
function editMealEntry(date, mealKey) {
  if (!isKeith()) return;
  const entry = bodyHistory.find(e => (e.date || (e._logged_at||'').slice(0,10)) === date);
  if (!entry) return;
  const meal = (entry.meals && entry.meals[mealKey]) || {};
  const MEAL_LABELS = { breakfast:'🌅 BREAKFAST', lunch:'☀️ LUNCH', dinner:'🌙 DINNER', snacks:'🍎 SNACKS' };
  openEditModal('EDIT ' + (MEAL_LABELS[mealKey]||mealKey.toUpperCase()), date, [
    { key:'desc', label:'Description', type:'text',   value:meal.desc||'', placeholder:'e.g. Rice, chicken, veg', full:true },
    { key:'cal',  label:'Calories',    type:'number', value:meal.cal||'',  placeholder:'800', step:'1' },
    { key:'prot', label:'Protein (g)', type:'number', value:meal.prot||'', placeholder:'40',  step:'1' },
    { key:'carb', label:'Carbs (g)',   type:'number', value:meal.carb||'', placeholder:'100', step:'1' },
    { key:'fat',  label:'Fat (g)',     type:'number', value:meal.fat||'',  placeholder:'25',  step:'1' },
  ], async () => {
    if (!entry.meals) entry.meals = {};
    entry.meals[mealKey] = {
      desc: emVal('desc') || meal.desc || '',
      cal:  emInt('cal')  || 0,
      prot: emInt('prot') || 0,
      carb: emInt('carb') || 0,
      fat:  emInt('fat')  || 0,
    };
    // Recalculate totals from all meals
    let totCal = 0, totProt = 0, totCarb = 0, totFat = 0;
    Object.values(entry.meals).forEach(m => {
      if (!m) return;
      totCal  += m.cal  || 0;
      totProt += m.prot || 0;
      totCarb += m.carb || 0;
      totFat  += m.fat  || 0;
    });
    entry.cals = totCal; entry.prot = totProt; entry.carb = totCarb; entry.fat = totFat;
    const patchData = { ...entry };
    delete patchData._id; delete patchData._logged_at;
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${date}`, _buildPatch(patchData));
    notify('✏ ' + (mealKey.charAt(0).toUpperCase()+mealKey.slice(1)) + ' updated', 'var(--accent)');
    closeEditModal();
    refreshSections('body');
  });
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
  const recent = [...germanHistory]
    .sort((a,b) => {
      const da = a.date || (a._logged_at||'').slice(0,10);
      const db = b.date || (b._logged_at||'').slice(0,10);
      return db.localeCompare(da);
    })
    .slice(0,20);
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
      <div class="feed-date">${fmtDate(e.date || e._logged_at)}</div>
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
    await supaFetch('PATCH', `rebuilder_logs?type=eq.body_logs&logged_at=eq.${date}`, _buildPatch(entry));
    notify('✏ Body entry updated', 'var(--accent)');
    closeEditModal();
    refreshSections('body');
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
  refreshSections('body');
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
    await supaFetch('PATCH', `rebuilder_logs?type=eq.engine_logs&logged_at=eq.${date}`, _buildPatch(entry));
    await saveState();
    notify('✏ Cardio updated', 'var(--purple)');
    closeEditModal();
    refreshSections('engine');
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
  refreshSections('engine');
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
    await supaFetch('PATCH', `rebuilder_logs?type=eq.german_logs&logged_at=eq.${date}`, _buildPatch(entry));
    await saveState();
    notify('✏ German session updated', 'var(--gold)');
    closeEditModal();
    refreshSections('german');
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
  refreshSections('german');
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
  refreshSections('ml');
}

// ── XP DELETE ──
function editXPEntry(date) {
  if (!isKeith()) return;
  const entry = xpHistory.find(e => e.date === date);
  if (!entry) return;
  const DAY_TYPES = ['prime','core','social','recovery'];
  openEditModal('EDIT XP LOG', date, [
    { key:'dayType', label:'Day Type', type:'select', value: entry.dayType||'prime', options: DAY_TYPES },
    { key:'xp',      label:'XP Override', type:'number', value: entry.xp||0, step:'1' },
    { key:'germanHrs', label:'German Hours', type:'number', value: entry.germanHrs||0, step:'0.5' },
  ], async () => {
    const dt  = emVal('dayType');
    const xp  = parseInt(emVal('xp')) || 0;
    const gHrs = parseFloat(emVal('germanHrs')) || 0;
    const idx = xpHistory.findIndex(e => e.date === date);
    if (idx < 0) return;
    state.totalXP = (state.totalXP || 0) - (xpHistory[idx].xp || 0) + xp;
    xpHistory[idx] = { ...xpHistory[idx], dayType: dt, xp, germanHrs: gHrs };
    await supaFetch('PATCH', `rebuilder_logs?type=eq.xp_logs&logged_at=eq.${date}`, _buildPatch(xpHistory[idx]));
    await saveState();
    closeEditModal();
    notify('✓ XP log updated', 'var(--green)');
    refreshSections('xp', 'dashboard');
  });
}

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
  refreshSections('xp', 'dashboard');
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
  buildNutritionChart();
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

// Nutrition Calorie & Macro Trend Chart (Body tab)
let _nutrChartFilter = 'cals';

function filterNutrChart(mode, el) {
  _nutrChartFilter = mode;
  document.querySelectorAll('#tab-body .cf-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  buildNutritionChart();
}

function buildNutritionChart() {
  destroyChart('nutrition');
  const ctx = document.getElementById('chartNutrition');
  if (!ctx) return;

  // Get last 21 days that have nutrition data
  const data = [...bodyHistory]
    .filter(e => e.cals || e.prot || e.carb || e.fat)
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    .slice(-21);

  if (!data.length) return;

  const labels = data.map(e => fmtDate(e.date || e._logged_at));
  const f = _nutrChartFilter;

  // Today's macro summary pills
  const todayKey_ = todayKey();
  const todayEntry = bodyHistory.find(e => (e.date || (e._logged_at||'').slice(0,10)) === todayKey_);
  const summaryEl = document.getElementById('nutrChartTodaySummary');
  if (summaryEl && todayEntry) {
    const items = [
      { label: 'Calories', val: todayEntry.cals, unit: 'kcal', target: '2800–3000', color: 'var(--accent2)',
        ok: todayEntry.cals >= 2800 && todayEntry.cals <= 3000 },
      { label: 'Protein',  val: todayEntry.prot, unit: 'g',    target: '80g+',      color: 'var(--green)',
        ok: todayEntry.prot >= 80 },
      { label: 'Carbs',    val: todayEntry.carb, unit: 'g',    target: '300–350g',  color: 'var(--purple)',
        ok: todayEntry.carb >= 300 && todayEntry.carb <= 350 },
      { label: 'Fat',      val: todayEntry.fat,  unit: 'g',    target: '70–90g',    color: 'var(--gold)',
        ok: todayEntry.fat >= 70 && todayEntry.fat <= 90 },
    ];
    summaryEl.innerHTML = items.map(it => `
      <div style="flex:1;min-width:80px;text-align:center;padding:8px 6px;
        background:${it.ok ? `rgba(45,212,191,.07)` : `rgba(255,255,255,.03)`};
        border:1px solid ${it.ok ? `rgba(45,212,191,.2)` : `rgba(255,255,255,.06)`};">
        <div style="font-family:var(--font-display);font-size:1.1rem;color:${it.ok ? 'var(--green)' : it.color};">
          ${it.val != null ? it.val : '—'}
        </div>
        <div style="font-family:var(--font-mono);font-size:.55rem;color:var(--muted);">${it.label.toUpperCase()}</div>
        <div style="font-family:var(--font-mono);font-size:.5rem;color:var(--border2);">${it.target}</div>
        ${it.val != null ? `<div style="font-size:.65rem;margin-top:2px;">${it.ok ? '✓' : '▷'}</div>` : ''}
      </div>`).join('');
  } else if (summaryEl) {
    summaryEl.innerHTML = '<div style="font-family:var(--font-mono);font-size:.65rem;color:var(--muted);">No nutrition logged today yet</div>';
  }

  let datasets = [];

  if (f === 'cals' || f === 'all') {
    datasets.push({
      label: 'Calories (kcal)',
      data: data.map(e => e.cals || null),
      borderColor: '#ff4757',
      backgroundColor: f === 'cals' ? 'rgba(255,71,87,.1)' : 'rgba(255,71,87,.05)',
      tension: .35, pointRadius: 4, pointBackgroundColor: '#ff4757', fill: f === 'cals',
      yAxisID: f === 'all' ? 'y1' : 'y',
    });
  }
  if (f === 'prot' || f === 'all') {
    datasets.push({
      label: 'Protein (g)',
      data: data.map(e => e.prot || null),
      borderColor: '#2dd4bf',
      backgroundColor: f === 'prot' ? 'rgba(45,212,191,.1)' : 'rgba(45,212,191,.05)',
      tension: .35, pointRadius: 4, pointBackgroundColor: '#2dd4bf', fill: f === 'prot',
      yAxisID: 'y',
    });
  }
  if (f === 'carb' || f === 'all') {
    datasets.push({
      label: 'Carbs (g)',
      data: data.map(e => e.carb || null),
      borderColor: '#a78bfa',
      backgroundColor: f === 'carb' ? 'rgba(167,139,250,.1)' : 'rgba(167,139,250,.05)',
      tension: .35, pointRadius: 4, pointBackgroundColor: '#a78bfa', fill: f === 'carb',
      yAxisID: 'y',
    });
  }
  if (f === 'fat' || f === 'all') {
    datasets.push({
      label: 'Fat (g)',
      data: data.map(e => e.fat || null),
      borderColor: '#fbbf24',
      backgroundColor: f === 'fat' ? 'rgba(251,191,36,.1)' : 'rgba(251,191,36,.05)',
      tension: .35, pointRadius: 4, pointBackgroundColor: '#fbbf24', fill: f === 'fat',
      yAxisID: 'y',
    });
  }

  // Target reference lines (only in single-metric views)
  const targets = {
    cals: { val: 2900, color: 'rgba(255,71,87,.35)',   label: 'Target 2900' },
    prot: { val: 80,   color: 'rgba(45,212,191,.35)',  label: 'Target 80g' },
    carb: { val: 325,  color: 'rgba(167,139,250,.35)', label: 'Target 325g' },
    fat:  { val: 80,   color: 'rgba(251,191,36,.35)',  label: 'Target 80g' },
  };
  if (f !== 'all' && targets[f]) {
    datasets.push({
      label: targets[f].label,
      data: data.map(() => targets[f].val),
      borderColor: targets[f].color,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false,
      tension: 0,
      yAxisID: 'y',
    });
  }

  // Dual y-axis for "all" view (calories on right, macros on left)
  const scalesConfig = f === 'all' ? {
    x:  { ...CHART_OPTS.scales.x },
    y:  { ...CHART_OPTS.scales.y, position: 'left',  title: { display: true, text: 'g', color: '#4a4e62', font: { size: 9 } } },
    y1: { ...CHART_OPTS.scales.y, position: 'right', grid: { drawOnChartArea: false },
          title: { display: true, text: 'kcal', color: '#4a4e62', font: { size: 9 } } },
  } : { ...CHART_OPTS.scales };

  charts['nutrition'] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      ...CHART_OPTS,
      scales: scalesConfig,
      plugins: {
        ...CHART_OPTS.plugins,
        tooltip: {
          ...CHART_OPTS.plugins.tooltip,
          callbacks: {
            label: ctx => {
              const v = ctx.parsed.y;
              if (v == null) return null;
              const u = ctx.dataset.label?.includes('kcal') || ctx.dataset.label?.includes('alorie') ? ' kcal' : 'g';
              return ` ${ctx.dataset.label}: ${v}${u}`;
            }
          }
        }
      }
    }
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

  const MONTHS = {
    'M1 Python': ['m1w1','m1w2','m1w3','m1w4'],
    'M2 LLMs':   ['m2w1','m2w2','m2w3','m2w4'],
    'M3 RAG':    ['m3w1','m3w2','m3w3','m3w4'],
    'M4 Apps':   ['m4w1','m4w2','m4w3','m4w4'],
    'M5 Prod':   ['m5w1','m5w2','m5w3','m5w4'],
    'M6 Port':   ['m6w1','m6w2','m6w3','m6w4'],
  };
  const labels   = Object.keys(MONTHS);
  const doneData = labels.map(l => MONTHS[l].filter(id => state.curriculum && state.curriculum[id]).length);
  const remData  = labels.map((_, i) => 4 - doneData[i]);

  const COLORS_DONE = [
    'rgba(0,229,255,.85)','rgba(56,189,248,.85)','rgba(167,139,250,.85)',
    'rgba(251,191,36,.8)','rgba(45,212,191,.8)','rgba(255,71,87,.8)',
  ];
  const COLORS_REM = COLORS_DONE.map(c => c.replace(/[\d.]+\)$/, '.1)'));

  charts['ml'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [...labels.map(l => l + ' ✓'), ...labels.map(l => l + ' …')],
      datasets: [{
        data: [...doneData, ...remData],
        backgroundColor: [...COLORS_DONE, ...COLORS_REM],
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
