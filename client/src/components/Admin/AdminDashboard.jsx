import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { contactApi, projectsApi, aboutApi, resumeApi } from '../../services/api';
import { useProjects } from '../../hooks/useProjects';

// ── STYLES ────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg0: #02020a;
  --bg1: #07070f;
  --bg2: #0c0c18;
  --bg3: #111124;
  --border: rgba(139,92,246,0.1);
  --border2: rgba(139,92,246,0.25);
  --border3: rgba(139,92,246,0.5);
  --v: #8b5cf6;
  --v2: #a78bfa;
  --v3: #c4b5fd;
  --cyan: #22d3ee;
  --pink: #f472b6;
  --green: #10b981;
  --red: #f43f5e;
  --amber: #f59e0b;
  --white: #f8fafc;
  --muted: #64748b;
  --muted2: #94a3b8;
  --sw: 240px;
  --mono: 'Space Mono', monospace;
  --body: 'Space Grotesk', sans-serif;
}

.Y * { box-sizing:border-box; margin:0; padding:0; }
.Y { font-family:var(--body); background:var(--bg0); color:var(--white); min-height:100vh; display:flex; position:relative; overflow-x:hidden; }
.Y button, .Y a, .Y [role=button] { cursor:pointer; }
.Y input, .Y textarea { cursor:text; }

/* GRID BG */
.Y-grid-bg {
  position:fixed; inset:0; pointer-events:none; z-index:0;
  background-image:
    linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px);
  background-size:48px 48px;
}
.Y-orb {
  position:fixed; border-radius:50%; filter:blur(120px); pointer-events:none; z-index:0;
}
.Y-orb-1 { width:600px; height:600px; background:rgba(139,92,246,0.06); top:-200px; left:-100px; }
.Y-orb-2 { width:400px; height:400px; background:rgba(34,211,238,0.04); bottom:0; right:-100px; }

/* SIDEBAR */
.Y-sidebar {
  width:var(--sw); background:rgba(7,7,15,0.95);
  border-right:1px solid var(--border);
  display:flex; flex-direction:column;
  position:fixed; top:0; left:0; bottom:0; z-index:100;
  backdrop-filter:blur(20px);
}
.Y-logo {
  padding:28px 20px 24px;
  border-bottom:1px solid var(--border);
  position:relative;
}
.Y-logo::after {
  content:''; position:absolute; bottom:-1px; left:20px; right:20px; height:1px;
  background:linear-gradient(90deg, var(--v), transparent);
}
.Y-logo-mark {
  display:flex; align-items:center; gap:10px; margin-bottom:6px;
}
.Y-logo-hex {
  width:32px; height:32px; background:linear-gradient(135deg,var(--v),var(--cyan));
  clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  display:flex; align-items:center; justify-content:center;
  font-family:var(--mono); font-size:.65rem; font-weight:700; color:white; flex-shrink:0;
}
.Y-logo-name { font-family:var(--mono); font-size:.875rem; font-weight:700; color:var(--v2); letter-spacing:.1em; }
.Y-logo-ver { font-family:var(--mono); font-size:.6rem; color:var(--muted); letter-spacing:.08em; }

.Y-nav { flex:1; padding:20px 12px; overflow-y:auto; }
.Y-nav-section { margin-bottom:28px; }
.Y-nav-label {
  font-family:var(--mono); font-size:.55rem; font-weight:700; letter-spacing:.18em;
  text-transform:uppercase; color:var(--muted); padding:0 10px; margin-bottom:10px;
  display:flex; align-items:center; gap:8px;
}
.Y-nav-label::after { content:''; flex:1; height:1px; background:var(--border); }

.Y-nav-item {
  display:flex; align-items:center; gap:10px;
  padding:9px 10px; border-radius:8px;
  transition:all .2s; color:var(--muted2); font-size:.8rem; font-weight:500;
  position:relative; border:1px solid transparent; margin-bottom:2px;
  text-decoration:none;
}
.Y-nav-item:hover { background:rgba(139,92,246,.06); color:var(--white); border-color:var(--border); }
.Y-nav-item.active {
  background:rgba(139,92,246,.1); color:var(--v2); border-color:var(--border2);
}
.Y-nav-item.active::before {
  content:''; position:absolute; left:-1px; top:50%; transform:translateY(-50%);
  width:2px; height:60%; background:var(--v); border-radius:0 2px 2px 0;
}
.Y-nav-icon { width:16px; height:16px; flex-shrink:0; opacity:.7; }
.Y-nav-item.active .Y-nav-icon { opacity:1; }
.Y-badge {
  margin-left:auto; padding:2px 7px;
  background:rgba(139,92,246,.15); border:1px solid var(--border2);
  border-radius:20px; font-size:.6rem; font-weight:700; color:var(--v2); font-family:var(--mono);
  animation:Y-badge-pulse 3s ease infinite;
}
@keyframes Y-badge-pulse { 0%,100%{opacity:1} 50%{opacity:.6} }

.Y-sidebar-foot { padding:16px; border-top:1px solid var(--border); }
.Y-profile { display:flex; align-items:center; gap:10px; padding:10px; border-radius:8px; background:rgba(139,92,246,.05); border:1px solid var(--border); }
.Y-avatar {
  width:34px; height:34px; border-radius:8px;
  background:linear-gradient(135deg,var(--v),var(--cyan));
  display:flex; align-items:center; justify-content:center;
  font-family:var(--mono); font-size:.75rem; font-weight:700; color:white; flex-shrink:0;
}
.Y-pname { font-size:.8rem; font-weight:600; color:var(--white); line-height:1.2; }
.Y-prole { font-size:.65rem; color:var(--muted); font-family:var(--mono); }

/* MAIN */
.Y-main { margin-left:var(--sw); flex:1; display:flex; flex-direction:column; min-height:100vh; position:relative; z-index:1; }

/* TOPBAR */
.Y-topbar {
  padding:14px 28px;
  border-bottom:1px solid var(--border);
  display:flex; align-items:center; justify-content:space-between;
  background:rgba(2,2,10,.8); backdrop-filter:blur(24px);
  position:sticky; top:0; z-index:50;
}
.Y-topbar-left { display:flex; align-items:center; gap:16px; }
.Y-breadcrumb { font-family:var(--mono); font-size:.6rem; color:var(--muted); letter-spacing:.08em; }
.Y-topbar-title { font-size:1rem; font-weight:600; color:var(--white); }
.Y-topbar-right { display:flex; align-items:center; gap:10px; }

.Y-btn {
  display:inline-flex; align-items:center; gap:7px;
  padding:7px 14px; border-radius:7px;
  font-family:var(--body); font-size:.78rem; font-weight:600;
  cursor:pointer; transition:all .2s; border:none; text-decoration:none;
}
.Y-btn-primary {
  background:var(--v); color:white;
  box-shadow:0 0 24px rgba(139,92,246,.3);
}
.Y-btn-primary:hover { background:#7c3aed; transform:translateY(-1px); box-shadow:0 0 32px rgba(139,92,246,.5); }
.Y-btn-ghost { background:rgba(255,255,255,.04); border:1px solid var(--border2); color:var(--muted2); }
.Y-btn-ghost:hover { background:rgba(255,255,255,.07); color:var(--white); border-color:var(--border3); }
.Y-btn-danger { background:rgba(244,63,94,.08); border:1px solid rgba(244,63,94,.25); color:var(--red); }
.Y-btn-danger:hover { background:rgba(244,63,94,.15); }
.Y-btn-sm { padding:5px 10px; font-size:.72rem; }
.Y-btn-xs { padding:4px 8px; font-size:.68rem; }

.Y-status {
  display:flex; align-items:center; gap:6px;
  font-family:var(--mono); font-size:.65rem; color:var(--muted);
  padding:5px 12px; background:rgba(255,255,255,.03); border:1px solid var(--border); border-radius:20px;
}
.Y-dot { width:6px; height:6px; border-radius:50%; }
.Y-dot-green { background:var(--green); box-shadow:0 0 6px var(--green); animation:Y-pulse 2s infinite; }
.Y-dot-red { background:var(--red); box-shadow:0 0 6px var(--red); }
@keyframes Y-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }

/* CONTENT */
.Y-content { padding:28px; flex:1; }

/* STAT CARDS */
.Y-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:28px; }
.Y-stat {
  background:var(--bg1); border:1px solid var(--border); border-radius:12px;
  padding:18px 20px; position:relative; overflow:hidden; transition:all .3s;
  cursor:default;
}
.Y-stat::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg, var(--accent,var(--v)), transparent);
}
.Y-stat::after {
  content:''; position:absolute; bottom:0; right:0;
  width:60px; height:60px;
  background:radial-gradient(circle, var(--accent,var(--v)) 0%, transparent 70%);
  opacity:.06; border-radius:50%;
}
.Y-stat:hover { border-color:var(--border2); transform:translateY(-2px); }
.Y-stat-label { font-family:var(--mono); font-size:.6rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:14px; }
.Y-stat-val { font-family:var(--mono); font-size:2rem; font-weight:700; color:var(--white); line-height:1; margin-bottom:8px; }
.Y-stat-sub { font-family:var(--mono); font-size:.65rem; color:var(--muted); }
.Y-stat-sub.up { color:var(--green); }
.Y-stat-sub.down { color:var(--red); }

/* SECTION HDR */
.Y-sec-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
.Y-sec-title { font-size:.9375rem; font-weight:600; color:var(--white); display:flex; align-items:center; gap:8px; }
.Y-sec-count { font-family:var(--mono); font-size:.65rem; color:var(--muted); padding:2px 8px; background:var(--bg3); border:1px solid var(--border); border-radius:20px; }

/* MESSAGES */
.Y-msg {
  background:var(--bg1); border:1px solid var(--border); border-radius:10px;
  padding:16px 20px; margin-bottom:10px; transition:all .25s; cursor:pointer;
  position:relative; overflow:hidden;
}
.Y-msg::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:transparent; transition:background .2s; }
.Y-msg.unread::before { background:var(--v); }
.Y-msg:hover { border-color:var(--border2); background:rgba(139,92,246,.04); }
.Y-msg-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
.Y-msg-name { font-weight:600; font-size:.875rem; display:flex; align-items:center; gap:8px; }
.Y-msg-time { font-family:var(--mono); font-size:.65rem; color:var(--muted); }
.Y-msg-email { font-family:var(--mono); font-size:.72rem; color:var(--v2); margin-bottom:8px; }
.Y-msg-text { font-size:.8125rem; color:var(--muted2); line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.Y-pill { display:inline-flex; align-items:center; padding:2px 8px; border-radius:20px; font-size:.6rem; font-weight:700; font-family:var(--mono); }
.Y-pill-v { background:rgba(139,92,246,.12); border:1px solid rgba(139,92,246,.25); color:var(--v2); }
.Y-pill-g { background:rgba(16,185,129,.1); border:1px solid rgba(16,185,129,.25); color:var(--green); }

/* PROJECTS */
.Y-proj-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.Y-proj {
  background:var(--bg1); border:1px solid var(--border); border-radius:12px;
  overflow:hidden; transition:all .3s; cursor:pointer;
}
.Y-proj:hover { border-color:var(--border2); transform:translateY(-3px); box-shadow:0 16px 48px rgba(0,0,0,.5); }
.Y-proj-img { width:100%; height:130px; object-fit:cover; display:block; }
.Y-proj-placeholder {
  width:100%; height:130px;
  background:linear-gradient(135deg,rgba(139,92,246,.08),rgba(34,211,238,.04));
  display:flex; align-items:center; justify-content:center;
  font-size:1.75rem;
}
.Y-proj-body { padding:14px; }
.Y-proj-name { font-size:.8125rem; font-weight:700; color:var(--white); margin-bottom:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.Y-proj-tags { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:12px; }
.Y-proj-tag { padding:2px 7px; background:rgba(139,92,246,.08); border:1px solid rgba(139,92,246,.18); border-radius:4px; font-size:.6rem; color:var(--v2); font-family:var(--mono); }
.Y-proj-actions { display:flex; gap:7px; padding-top:10px; border-top:1px solid var(--border); }

/* FORM */
.Y-field { margin-bottom:16px; }
.Y-label { display:block; font-family:var(--mono); font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted2); margin-bottom:7px; }
.Y-input, .Y-textarea {
  width:100%; background:var(--bg0); border:1px solid var(--border);
  border-radius:8px; padding:10px 13px; color:var(--white);
  font-family:var(--body); font-size:.8125rem; outline:none;
  transition:border-color .2s, box-shadow .2s;
}
.Y-input:focus, .Y-textarea:focus { border-color:var(--v); box-shadow:0 0 0 3px rgba(139,92,246,.1); }
.Y-textarea { resize:vertical; min-height:90px; }

/* TAGS INPUT */
.Y-tags-wrap {
  display:flex; flex-wrap:wrap; gap:6px; padding:7px;
  background:var(--bg0); border:1px solid var(--border);
  border-radius:8px; min-height:42px; align-items:center; cursor:text;
  transition:border-color .2s;
}
.Y-tags-wrap:focus-within { border-color:var(--v); }
.Y-tag { display:inline-flex; align-items:center; gap:5px; padding:2px 9px; background:rgba(139,92,246,.12); border:1px solid rgba(139,92,246,.28); border-radius:20px; font-family:var(--mono); font-size:.68rem; color:var(--v2); }
.Y-tag-x { opacity:.5; font-size:.9rem; line-height:1; cursor:pointer; }
.Y-tag-x:hover { opacity:1; color:var(--red); }
.Y-tags-in { border:none; background:transparent; outline:none; color:var(--white); font-family:var(--body); font-size:.8125rem; flex:1; min-width:80px; }

/* MODAL */
.Y-overlay {
  position:fixed; inset:0; background:rgba(0,0,0,.75); backdrop-filter:blur(12px);
  z-index:1000; display:flex; align-items:center; justify-content:center;
  opacity:0; visibility:hidden; transition:all .25s;
}
.Y-overlay.open { opacity:1; visibility:visible; }
.Y-modal {
  background:var(--bg1); border:1px solid var(--border2);
  border-radius:16px; padding:28px; width:540px; max-width:90vw; max-height:88vh;
  overflow-y:auto; transform:scale(.96) translateY(16px); transition:transform .25s;
  position:relative;
}
.Y-overlay.open .Y-modal { transform:scale(1) translateY(0); }
.Y-modal-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
.Y-modal-title { font-size:1rem; font-weight:700; }
.Y-modal-x {
  width:30px; height:30px; border-radius:7px; background:rgba(255,255,255,.05);
  border:1px solid var(--border); color:var(--muted2); cursor:pointer;
  display:flex; align-items:center; justify-content:center; font-size:1.1rem;
  transition:all .2s;
}
.Y-modal-x:hover { background:rgba(244,63,94,.1); color:var(--red); border-color:rgba(244,63,94,.3); }

/* THUMB UPLOAD */
.Y-thumb-zone {
  border:2px dashed var(--border2); border-radius:10px; padding:24px 16px;
  text-align:center; cursor:pointer; transition:all .2s;
  background:rgba(139,92,246,.02); min-height:120px;
  display:flex; align-items:center; justify-content:center; flex-direction:column; gap:7px;
}
.Y-thumb-zone:hover, .Y-thumb-zone.drag { border-color:var(--v); background:rgba(139,92,246,.06); }

/* ABOUT GRID */
.Y-about-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.Y-panel { background:var(--bg1); border:1px solid var(--border); border-radius:12px; overflow:hidden; }
.Y-panel-hdr { padding:12px 18px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:7px; font-family:var(--mono); font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
.Y-mac { width:7px; height:7px; border-radius:50%; }
.Y-panel-body { padding:18px; }

/* RESUME DROP */
.Y-resume-drop { border:2px dashed var(--border2); border-radius:10px; padding:36px 20px; text-align:center; cursor:pointer; transition:all .25s; background:var(--bg1); }
.Y-resume-drop:hover, .Y-resume-drop.drag { border-color:var(--v); background:rgba(139,92,246,.05); }

/* DIVIDER */
.Y-divider { height:1px; background:var(--border); margin:22px 0; }
.Y-or { display:flex; align-items:center; gap:10px; margin:12px 0; }
.Y-or span { font-family:var(--mono); font-size:.6rem; color:var(--muted); }
.Y-or::before, .Y-or::after { content:''; flex:1; height:1px; background:rgba(139,92,246,.12); }

/* TOAST */
.Y-toast {
  position:fixed; bottom:22px; right:22px; padding:12px 18px;
  border-radius:10px; font-size:.8125rem; font-weight:500; z-index:9999;
  transform:translateY(80px) scale(.95); opacity:0;
  transition:all .3s cubic-bezier(.34,1.56,.64,1);
  display:flex; align-items:center; gap:9px; max-width:300px;
  backdrop-filter:blur(20px); pointer-events:none;
}
.Y-toast.show { transform:translateY(0) scale(1); opacity:1; }
.Y-toast.success { background:rgba(16,185,129,.12); border:1px solid rgba(16,185,129,.35); color:#6ee7b7; }
.Y-toast.error { background:rgba(244,63,94,.12); border:1px solid rgba(244,63,94,.35); color:#fca5a5; }

/* EMPTY */
.Y-empty { text-align:center; padding:56px 20px; color:var(--muted); }
.Y-empty-icon { font-size:2.5rem; margin-bottom:14px; opacity:.4; }

/* CARD WRAP */
.Y-card { background:var(--bg1); border:1px solid var(--border); border-radius:12px; padding:22px; }

/* LOGIN */
.Y-login-bg {
  position:fixed; inset:0; background:var(--bg0);
  display:flex; align-items:center; justify-content:center; z-index:9999;
}
.Y-login-card {
  background:var(--bg1); border:1px solid var(--border2);
  border-radius:20px; padding:44px; width:380px; text-align:center;
  position:relative; overflow:hidden;
}
.Y-login-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,var(--v),transparent);
}
.Y-login-glow {
  position:absolute; top:-60px; left:50%; transform:translateX(-50%);
  width:200px; height:200px; background:rgba(139,92,246,.12);
  border-radius:50%; filter:blur(60px); pointer-events:none;
}
.Y-login-err { background:rgba(244,63,94,.08); border:1px solid rgba(244,63,94,.25); color:var(--red); border-radius:8px; padding:10px 14px; font-size:.78rem; margin-bottom:14px; }

/* FORM ACTIONS */
.Y-form-actions { display:flex; gap:10px; justify-content:flex-end; margin-top:22px; padding-top:18px; border-top:1px solid var(--border); }

/* QUICK ACTIONS */
.Y-qa-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
.Y-qa {
  background:var(--bg1); border:1px solid var(--border); border-radius:10px;
  padding:14px 16px; cursor:pointer; transition:all .25s;
  display:flex; align-items:center; gap:12px;
}
.Y-qa:hover { border-color:var(--border2); background:rgba(139,92,246,.05); transform:translateY(-1px); }
.Y-qa-icon { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.Y-qa-label { font-size:.8125rem; font-weight:600; color:var(--white); }
.Y-qa-sub { font-size:.72rem; color:var(--muted); margin-top:2px; }

/* SCROLLBAR */
.Y ::-webkit-scrollbar { width:5px; }
.Y ::-webkit-scrollbar-track { background:transparent; }
.Y ::-webkit-scrollbar-thumb { background:rgba(139,92,246,.25); border-radius:3px; }

/* RESPONSIVE */
@media (max-width:1100px) { .Y-proj-grid { grid-template-columns:repeat(2,1fr); } .Y-stats { grid-template-columns:repeat(2,1fr); } .Y-about-grid { grid-template-columns:1fr; } }
@media (max-width:768px) {
  .Y-sidebar { transform:translateX(-100%); transition:transform .3s; }
  .Y-sidebar.open { transform:translateX(0); }
  .Y-main { margin-left:0; }
  .Y-hamburger { display:flex !important; }
  .Y-overlay-bg { display:block !important; }
  .Y-hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:6px; border-radius:6px; background:rgba(139,92,246,.1); border:1px solid var(--border); }
.Y-hamburger span { display:block; width:18px; height:2px; background:var(--v2); border-radius:2px; transition:all .3s; }
.Y-overlay-bg { display:none; position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:99; backdrop-filter:blur(4px); }
  .Y-proj-grid { grid-template-columns:1fr; }
  .Y-qa-grid { grid-template-columns:1fr; }
  .Y-stats { grid-template-columns:repeat(2,1fr); gap:10px; }
  .Y-content { padding:16px; }
  .Y-topbar { padding:10px 16px; flex-wrap:wrap; gap:8px; }
  .Y-topbar-left { flex:1; }
  .Y-topbar-right { gap:6px; }
  .Y-topbar-right .Y-btn { padding:5px 8px; font-size:.7rem; }
  .Y-breadcrumb { display:none; }
  .Y-about-grid { grid-template-columns:1fr; }
}

@media (max-width:480px) {
  .Y-stats { grid-template-columns:1fr 1fr; gap:8px; }
  .Y-stat { padding:14px; }
  .Y-stat-val { font-size:1.5rem; }
  .Y-topbar-title { font-size:.875rem; }
  .Y-sec-title { font-size:.8125rem; }
  .Y-modal { padding:20px; width:95vw; }
}
@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
`;

// ── HELPERS ───────────────────────────────────────────────────
const fmt = iso => {
  const d = new Date(iso), now = new Date(), diff = now - d;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
};

// ── ICONS ────────────────────────────────────────────────────
const I = {
  dash: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  proj: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  msg:  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  user: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  doc:  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  gear: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  out:  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  plus: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  save: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  eye:  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  up:   <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
};

// ── TAGS INPUT ────────────────────────────────────────────────
function TagsInput({ tags, onChange }) {
  const [val, setVal] = useState('');
  const add = v => { const t = v.trim(); if (t && !tags.includes(t)) onChange([...tags, t]); setVal(''); };
  const onKey = e => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(val); }
    if (e.key === 'Backspace' && !val && tags.length) onChange(tags.slice(0,-1));
  };
  return (
    <div className="Y-tags-wrap" onClick={() => document.getElementById('Y-tag-in').focus()}>
      {tags.map(t => (
        <span key={t} className="Y-tag">
          {t} <span className="Y-tag-x" onClick={() => onChange(tags.filter(x => x !== t))}>×</span>
        </span>
      ))}
      <input id="Y-tag-in" className="Y-tags-in" value={val}
        onChange={e => setVal(e.target.value)} onKeyDown={onKey}
        onBlur={() => val && add(val)} placeholder={tags.length ? '' : 'Add tags…'}/>
    </div>
  );
}

// ── TOAST ─────────────────────────────────────────────────────
function Toast({ msg, type, show }) {
  return (
    <div className={`Y-toast ${type} ${show ? 'show' : ''}`}>
      {type === 'success' ? '✓' : '✗'} {msg}
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────
function Login() {
  const { login, loading, error } = useAuth();
  const [pw, setPw] = useState('');
  return (
    <div className="Y-login-bg">
      <div className="Y-grid-bg" />
      <div className="Y-login-card">
        <div className="Y-login-glow" />
        <div style={{ marginBottom:28 }}>
          <div style={{ width:52,height:52,borderRadius:12,background:'linear-gradient(135deg,#8b5cf6,#22d3ee)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'1.4rem' }}>🔐</div>
          <div style={{ fontFamily:'var(--mono)',fontSize:'1rem',fontWeight:700,color:'var(--v2)',letterSpacing:'.1em',marginBottom:6 }}>YASHAS.ADMIN</div>
          <div style={{ fontSize:'.8rem',color:'var(--muted)' }}>Portfolio Control Center</div>
        </div>
        {error && <div className="Y-login-err">{error}</div>}
        <div className="Y-field" style={{ textAlign:'left' }}>
          <label className="Y-label">Password</label>
          <input className="Y-input" type="password" placeholder="Enter admin password"
  value={pw} onChange={e => setPw(e.target.value)}
  onKeyDown={e => e.key === 'Enter' && login(pw)}
  autoComplete="new-password"
  autoFocus={false}/>
        </div>
        <button className="Y-btn Y-btn-primary" style={{ width:'100%',justifyContent:'center',marginTop:8 }}
          onClick={() => login(pw)} disabled={loading}>
          {loading ? 'Authenticating…' : 'Access Dashboard'}
        </button>
      </div>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────
function DashboardPage({ messages, projects, onNav, backendOnline }) {
  const unread = messages.filter(m => !m.read).length;
  const stats = [
    { label:'Total Projects', val:projects.length, sub:'↑ active portfolio', cls:'up', accent:'#8b5cf6' },
    { label:'Messages', val:messages.length, sub:`${unread} unread`, cls:unread>0?'up':'', accent:'#22d3ee' },
    { label:'Page Views', val:'—', sub:'connect analytics', cls:'', accent:'#f472b6' },
    { label:'Backend', val:backendOnline?'✓':'✗', sub:backendOnline?'online':'offline', cls:backendOnline?'up':'down', accent:backendOnline?'#10b981':'#f43f5e' },
  ];
  return (
    <div>
      <div className="Y-stats">
        {stats.map(s => (
          <div key={s.label} className="Y-stat" style={{'--accent':s.accent}}>
            <div className="Y-stat-label">{s.label}</div>
            <div className="Y-stat-val">{s.val}</div>
            <div className={`Y-stat-sub ${s.cls}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        <div>
          <div className="Y-sec-hdr">
            <div className="Y-sec-title">Recent Messages <span className="Y-sec-count">{Math.min(messages.length,3)}</span></div>
            <button className="Y-btn Y-btn-ghost Y-btn-sm" onClick={() => onNav('messages')}>View All</button>
          </div>
          {messages.slice(0,3).map(m => (
            <div key={m._id} className={`Y-msg ${m.read?'':'unread'}`}>
              <div className="Y-msg-row">
                <div className="Y-msg-name">{m.name}{!m.read&&<span className="Y-pill Y-pill-v">NEW</span>}</div>
                <div className="Y-msg-time">{fmt(m.createdAt)}</div>
              </div>
              <div className="Y-msg-email">{m.email}</div>
              <div className="Y-msg-text">{m.message}</div>
            </div>
          ))}
          {!messages.length && <div className="Y-empty"><div className="Y-empty-icon">📭</div><p>No messages yet</p></div>}
        </div>

        <div>
          <div className="Y-sec-hdr"><div className="Y-sec-title">Quick Actions</div></div>
          <div className="Y-qa-grid">
            {[
              { icon:'🗂️', label:'Add Project', sub:'Create new work', color:'rgba(139,92,246,.12)', action:'projects' },
              { icon:'✉️', label:'Messages', sub:`${unread} unread`, color:'rgba(34,211,238,.1)', action:'messages' },
              { icon:'👤', label:'Edit About', sub:'Update bio', color:'rgba(244,114,182,.1)', action:'about' },
              { icon:'📄', label:'Resume', sub:'Upload PDF', color:'rgba(16,185,129,.1)', action:'resume' },
            ].map(q => (
              <div key={q.label} className="Y-qa" onClick={() => onNav(q.action)}>
                <div className="Y-qa-icon" style={{ background:q.color }}>{q.icon}</div>
                <div>
                  <div className="Y-qa-label">{q.label}</div>
                  <div className="Y-qa-sub">{q.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MESSAGES ──────────────────────────────────────────────────
function MessagesPage({ messages, setMessages, showToast }) {
  const [sel, setSel] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const m = messages.find(x => x._id === sel);
  const BASE = process.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const markRead = async id => {
    try {
      await contactApi.markRead(id);
      setMessages(prev => prev.map(x => x._id === id ? {...x, read:true} : x));
    } catch { showToast('Failed', 'error'); }
  };

  const deleteMsg = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this message?')) return;
    try {
      await fetch(`${BASE}/api/messages/${id}`, { method:'DELETE' });
      setMessages(prev => prev.filter(x => x._id !== id));
      if (sel === id) setSel(null);
      showToast('Deleted', 'success');
    } catch { showToast('Delete failed', 'error'); }
  };

  const clearAll = async () => {
    if (!window.confirm('Delete ALL messages? Cannot be undone.')) return;
    try {
      await fetch(`${BASE}/api/messages`, { method:'DELETE' });
      setMessages([]);
      setSel(null);
      showToast('All messages cleared', 'success');
    } catch { showToast('Failed to clear', 'error'); }
  };

  const refresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`${BASE}/api/messages`);
      const data = await res.json();
      if (data.success) { setMessages(data.data); showToast('Refreshed!', 'success'); }
    } catch { showToast('Refresh failed', 'error'); }
    setRefreshing(false);
  };

  return (
    <div>
      <div className="Y-sec-hdr">
        <div className="Y-sec-title">Messages <span className="Y-sec-count">{messages.length}</span></div>
        <div style={{display:'flex',gap:8}}>
          <button className="Y-btn Y-btn-ghost Y-btn-sm" onClick={refresh} disabled={refreshing}>
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{animation:refreshing?'spin 1s linear infinite':'none'}}>
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.18-3.36"/>
            </svg>
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
          {messages.length > 0 && (
            <button className="Y-btn Y-btn-danger Y-btn-sm" onClick={clearAll}>
              🗑 Clear All
            </button>
          )}
        </div>
      </div>

      {!messages.length && <div className="Y-empty"><div className="Y-empty-icon">📭</div><p>No messages yet</p></div>}
      {messages.map(msg => (
        <div key={msg._id} className={`Y-msg ${msg.read?'':'unread'}`}
          onClick={() => { setSel(msg._id); if (!msg.read) markRead(msg._id); }}>
          <div className="Y-msg-row">
            <div className="Y-msg-name">{msg.name}{!msg.read&&<span className="Y-pill Y-pill-v">NEW</span>}</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div className="Y-msg-time">{fmt(msg.createdAt)}</div>
              <a href={`mailto:${msg.email}?subject=Re: Your message`}
                className="Y-btn Y-btn-ghost Y-btn-xs"
                onClick={e => e.stopPropagation()}
                style={{fontSize:'.65rem',padding:'3px 10px'}}>
                ✉ Reply
              </a>
              <button className="Y-btn Y-btn-danger Y-btn-xs"
                onClick={e => deleteMsg(msg._id, e)}
                style={{fontSize:'.65rem',padding:'3px 10px'}}>
                🗑
              </button>
            </div>
          </div>
          <div className="Y-msg-email">{msg.email}</div>
          <div className="Y-msg-text">{msg.message}</div>
        </div>
      ))}

      <div className={`Y-overlay ${sel?'open':''}`} onClick={e => e.target===e.currentTarget&&setSel(null)}>
        <div className="Y-modal">
          {m && <>
            <div className="Y-modal-hdr">
              <div className="Y-modal-title">Message from {m.name}</div>
              <button className="Y-modal-x" onClick={() => setSel(null)}>×</button>
            </div>
            <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:18,padding:14,background:'var(--bg3)',borderRadius:10}}>
              <div style={{width:44,height:44,borderRadius:10,background:'linear-gradient(135deg,#8b5cf6,#22d3ee)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'1.1rem',color:'white',flexShrink:0}}>{m.name[0].toUpperCase()}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{m.name}</div>
                <div style={{fontSize:'.78rem',color:'var(--v2)',fontFamily:'var(--mono)'}}>{m.email}</div>
              </div>
              <div style={{fontSize:'.65rem',color:'var(--muted)',fontFamily:'var(--mono)'}}>{fmt(m.createdAt)}</div>
            </div>
            <div style={{background:'var(--bg0)',border:'1px solid var(--border)',borderRadius:10,padding:18,fontSize:'.875rem',lineHeight:1.7,color:'var(--muted2)'}}>{m.message}</div>
            <div className="Y-form-actions">
              <a href={`mailto:${m.email}?subject=Re: Your message`} className="Y-btn Y-btn-primary">{I.eye} Reply</a>
              <button className="Y-btn Y-btn-ghost" onClick={() => setSel(null)}>Close</button>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}
// ── PROJECTS ──────────────────────────────────────────────────
function ProjectsPage({ showToast }) {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title:'', description:'', image:'', tags:[], link:'', featured:false });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fname, setFname] = useState('');
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();

  const clearThumb = () => { setPreview(null); setFname(''); setForm(f => ({...f,image:''})); if(fileRef.current) fileRef.current.value=''; };

  const handleFile = file => {
    if (!file) return;
    if (file.size > 3*1024*1024) { showToast('Max 3MB', 'error'); return; }
    const r = new FileReader();
    r.onload = e => { setPreview(e.target.result); setFname(file.name); setForm(f => ({...f,image:e.target.result})); };
    r.readAsDataURL(file);
  };

  const openAdd = () => { setForm({title:'',description:'',image:'',tags:[],link:'',featured:false}); setEditing(null); clearThumb(); setModal(true); };
  const openEdit = p => { setForm({title:p.title,description:p.description,image:p.image||'',tags:p.tags||[],link:p.link||'',featured:p.featured||false}); setEditing(p._id); setPreview(p.image||null); setFname(''); setModal(true); };

  const save = async () => {
    if (!form.title) { showToast('Title required', 'error'); return; }
    setSaving(true);
    try {
      if (editing) { await updateProject(editing, form); showToast('Project updated!', 'success'); }
      else { await addProject(form); showToast('Project added!', 'success'); }
      setModal(false);
    } catch (e) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const del = async id => {
    if (!window.confirm('Delete this project?')) return;
    try { await deleteProject(id); showToast('Deleted', 'success'); }
    catch (e) { showToast(e.message, 'error'); }
  };

  if (loading) return <div className="Y-empty"><div className="Y-empty-icon">📁</div><p>Loading…</p></div>;

  return (
    <div>
      <div className="Y-sec-hdr">
        <div className="Y-sec-title">Projects <span className="Y-sec-count">{projects.length}</span></div>
        <button className="Y-btn Y-btn-primary" onClick={openAdd}>{I.plus} Add Project</button>
      </div>
      {!projects.length && <div className="Y-empty"><div className="Y-empty-icon">📁</div><p>No projects yet.</p></div>}
      <div className="Y-proj-grid">
        {projects.map(p => (
          <div key={p._id} className="Y-proj">
            {p.image
              ? <img src={p.image.startsWith('./')?p.image.replace('./','/'): p.image} alt={p.title} className="Y-proj-img" onError={e=>e.target.style.display='none'}/>
              : <div className="Y-proj-placeholder">🗂️</div>}
            <div className="Y-proj-body">
              <div className="Y-proj-name">{p.title}</div>
              <div className="Y-proj-tags">{(p.tags||[]).map(t=><span key={t} className="Y-proj-tag">{t}</span>)}</div>
              <div className="Y-proj-actions">
                <button className="Y-btn Y-btn-ghost Y-btn-xs" onClick={() => openEdit(p)}>Edit</button>
                <button className="Y-btn Y-btn-danger Y-btn-xs" onClick={() => del(p._id)}>Delete</button>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="Y-btn Y-btn-ghost Y-btn-xs">{I.eye}</a>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`Y-overlay ${modal?'open':''}`} onClick={e=>e.target===e.currentTarget&&setModal(false)}>
        <div className="Y-modal">
          <div className="Y-modal-hdr">
            <div className="Y-modal-title">{editing?'Edit Project':'New Project'}</div>
            <button className="Y-modal-x" onClick={()=>setModal(false)}>×</button>
          </div>

          <div className="Y-field">
            <label className="Y-label">Title *</label>
            <input className="Y-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Project title"/>
          </div>
          <div className="Y-field">
            <label className="Y-label">Description</label>
            <textarea className="Y-textarea" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="What does this project do?"/>
          </div>

          <div className="Y-field">
            <label className="Y-label">Thumbnail</label>
            <div className={`Y-thumb-zone ${drag?'drag':''}`}
              onClick={()=>!preview&&fileRef.current.click()}
              onDragOver={e=>{e.preventDefault();setDrag(true)}}
              onDragLeave={()=>setDrag(false)}
              onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}}>
              <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])}/>
              {preview
                ? <img src={preview} alt="preview" style={{maxHeight:110,maxWidth:'100%',borderRadius:8,objectFit:'cover'}}/>
                : <><div style={{fontSize:'1.75rem',opacity:.5}}>🖼️</div><div style={{fontSize:'.78rem',color:'var(--v2)',fontWeight:600}}>Drop or click to upload</div><div style={{fontSize:'.65rem',color:'var(--muted)',fontFamily:'var(--mono)'}}>PNG, JPG, WEBP — max 3MB</div></>
              }
            </div>
            <div className="Y-or"><span>OR URL</span></div>
            <input className="Y-input" placeholder="https://... or /project.png"
              value={preview&&preview.startsWith('data:') ? '' : form.image}
              onChange={e=>{setForm({...form,image:e.target.value});setPreview(e.target.value||null);setFname('');}}/>
            {(preview||fname) && <button type="button" className="Y-btn Y-btn-ghost Y-btn-xs" style={{marginTop:7}} onClick={clearThumb}>✕ Clear image</button>}
          </div>

          <div className="Y-field">
            <label className="Y-label">Live Link</label>
            <input className="Y-input" value={form.link} onChange={e=>setForm({...form,link:e.target.value})} placeholder="https://..."/>
          </div>
          <div className="Y-field">
            <label className="Y-label">Tags</label>
            <TagsInput tags={form.tags} onChange={tags=>setForm({...form,tags})}/>
          </div>
          <div className="Y-field" style={{display:'flex',alignItems:'center',gap:9}}>
            <input type="checkbox" id="Y-feat" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} style={{width:15,height:15,accentColor:'var(--v)'}}/>
            <label htmlFor="Y-feat" className="Y-label" style={{margin:0}}>Featured Project</label>
          </div>

          <div className="Y-form-actions">
            <button className="Y-btn Y-btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
            <button className="Y-btn Y-btn-primary" onClick={save} disabled={saving}>{I.save} {saving?'Saving…':editing?'Update':'Add Project'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────
function AboutPage({ showToast }) {
  const [form, setForm] = useState({ name:'YASHASWIN', badge:'FULL STACK DEVELOPER | AI ENTHUSIAST', title1:'Building Websites.', title2:'Redefining the Future.', subtitle:'I design and develop scalable web applications...', bio:"I'm YASHASWIN, a Full Stack Developer..." });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    aboutApi.get().then(r => { if (r.data) setForm(f => ({...f,...r.data})); }).catch(()=>{});
  }, []);

  const save = async () => {
    setSaving(true);
    try { await aboutApi.save(form); showToast('About saved!', 'success'); }
    catch { showToast('Failed', 'error'); }
    setSaving(false);
  };

  const F = ({ k, label, area }) => (
    <div className="Y-field">
      <label className="Y-label">{label}</label>
      {area
        ? <textarea className="Y-textarea" value={form[k]||''} onChange={e=>setForm({...form,[k]:e.target.value})}/>
        : <input className="Y-input" value={form[k]||''} onChange={e=>setForm({...form,[k]:e.target.value})}/>
      }
    </div>
  );

  return (
    <div>
      <div className="Y-sec-hdr">
        <div className="Y-sec-title">About & Bio</div>
        <button className="Y-btn Y-btn-primary" onClick={save} disabled={saving}>{I.save} {saving?'Saving…':'Save Changes'}</button>
      </div>
      <div className="Y-about-grid">
        <div className="Y-panel">
          <div className="Y-panel-hdr">
            <div className="Y-mac" style={{background:'#f43f5e'}}/>
            <div className="Y-mac" style={{background:'#f59e0b'}}/>
            <div className="Y-mac" style={{background:'#10b981',boxShadow:'0 0 5px #10b981'}}/>
            editor
          </div>
          <div className="Y-panel-body">
            <F k="name" label="Name"/>
            <F k="badge" label="Badge Text"/>
            <F k="title1" label="Hero Line 1"/>
            <F k="title2" label="Hero Line 2"/>
            <F k="subtitle" label="Subtitle" area/>
            <F k="bio" label="About Paragraph" area/>
          </div>
        </div>
        <div className="Y-panel">
          <div className="Y-panel-hdr">
            <div className="Y-mac" style={{background:'#10b981',boxShadow:'0 0 5px #10b981'}}/>
            live preview
          </div>
          <div className="Y-panel-body">
            <div style={{textAlign:'center',padding:'16px 0'}}>
              <div style={{display:'inline-block',padding:'3px 12px',background:'rgba(139,92,246,.1)',border:'1px solid rgba(139,92,246,.25)',borderRadius:20,fontSize:'.65rem',color:'var(--v2)',marginBottom:14}}>{form.badge}</div>
              <div style={{fontSize:'1.35rem',fontWeight:700,lineHeight:1.2,marginBottom:12}}>{form.title1}<br/><span style={{color:'var(--v2)'}}>{form.title2}</span></div>
              <div style={{fontSize:'.75rem',color:'var(--muted)',lineHeight:1.6,marginBottom:14}}>{form.subtitle}</div>
              <div style={{borderTop:'1px solid var(--border)',paddingTop:14,textAlign:'left'}}>
                <div style={{fontFamily:'var(--mono)',fontSize:'.6rem',color:'var(--muted)',marginBottom:7}}>ABOUT ME</div>
                <div style={{fontSize:'.75rem',color:'var(--muted2)',lineHeight:1.6}}>{form.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Y-divider"/>
      <div style={{background:'rgba(245,158,11,.06)',border:'1px solid rgba(245,158,11,.2)',borderRadius:9,padding:'14px 18px',fontSize:'.78rem',color:'var(--amber)'}}>
        ⚠ Changes update the database. Make sure your portfolio reads from the About API to reflect changes live.
      </div>
    </div>
  );
}

// ── RESUME ────────────────────────────────────────────────────
function ResumePage({ showToast }) {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [url, setUrl] = useState('');
  const [urlIn, setUrlIn] = useState('');
  const ref = useRef();

  useEffect(() => {
  resumeApi.get().then(r => { 
    if (r.data?.url) { 
      setUrl(r.data.url); 
      // Don't show base64 in the URL input field
      setUrlIn(r.data.url.startsWith('data:') ? '' : r.data.url); 
    } 
  }).catch(()=>{});
}, []);;

  const handleFile = f => {
    if (!f) return;
    if (f.type !== 'application/pdf') { showToast('PDF only', 'error'); return; }
    if (f.size > 5*1024*1024) { showToast('Max 5MB', 'error'); return; }
    setFile(f);
  };

  const saveUrl = async () => {
    if (!urlIn) { showToast('Enter a URL', 'error'); return; }
    setSaving(true);
    try { await resumeApi.save(urlIn); setUrl(urlIn); showToast('Resume URL saved!', 'success'); }
    catch { showToast('Failed', 'error'); }
    setSaving(false);
  };

  const upload = async () => {
  if (!file) return;
  setSaving(true);
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      const BASE = process.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${BASE}/api/resume/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, filename: file.name })
      });
      const data = await res.json();
      if (data.success) {
        setUrl(data.data.url);
        setUrlIn('PDF uploaded ✓');
        setFile(null);
        showToast('Resume uploaded!', 'success');
      } else {
        showToast(data.error || 'Upload failed', 'error');
      }
      setSaving(false);
    };
    reader.readAsDataURL(file);
  } catch {
    showToast('Upload failed', 'error');
    setSaving(false);
  }
};

  return (
    <div>
      <div className="Y-sec-hdr"><div className="Y-sec-title">Resume Manager</div></div>
      <div className="Y-card" style={{marginBottom:18}}>
        <div style={{fontWeight:700,marginBottom:14}}>🔗 Resume URL</div>
        <p style={{fontSize:'.8rem',color:'var(--muted)',marginBottom:14,lineHeight:1.6}}>Upload to Google Drive, set "Anyone with link", paste direct download URL.</p>
        <div className="Y-field">
          <label className="Y-label">Direct Download URL</label>
          <input className="Y-input" 
  value={url && url.startsWith('data:') ? '' : urlIn} 
  onChange={e=>setUrlIn(e.target.value)} 
  placeholder="https://drive.google.com/uc?export=download&id=..."
  onKeyDown={e=>e.key==='Enter'&&saveUrl()}/>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <button className="Y-btn Y-btn-primary" onClick={saveUrl} disabled={saving}>{I.save} {saving?'Saving…':'Save URL'}</button>
          {url && <a href={url} target="_blank" rel="noreferrer" className="Y-btn Y-btn-ghost Y-btn-sm">{I.eye} Preview</a>}
        </div>
        {url && <div style={{marginTop:14,padding:'9px 12px',background:'rgba(16,185,129,.07)',border:'1px solid rgba(16,185,129,.2)',borderRadius:8,fontSize:'.75rem',color:'var(--green)'}}>
  ✓ {url.startsWith('data:') ? 'PDF uploaded and live!' : `Live: ${url}`}
</div>}
      </div>
      <div className="Y-card">
        <div style={{fontWeight:700,marginBottom:14}}>📤 Upload PDF</div>
        <div className={`Y-resume-drop ${drag?'drag':''}`}
          onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}}
          onClick={()=>!file&&ref.current.click()} style={{cursor:file?'default':'pointer'}}>
          <input ref={ref} type="file" accept=".pdf" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])}/>
          <div style={{color:'var(--v)',marginBottom:10}}>{I.up}</div>
          {file
            ? <><div style={{color:'var(--green)',fontWeight:600,marginBottom:4}}>✓ {file.name}</div><div style={{fontSize:'.75rem',color:'var(--muted)'}}>{(file.size/1024).toFixed(1)} KB</div></>
            : <><div style={{fontWeight:600,marginBottom:6}}>Drop resume PDF here</div><div style={{fontSize:'.8rem',color:'var(--muted)'}}>or click to browse — max 5MB</div></>
          }
        </div>
        {file && <div style={{display:'flex',gap:10,marginTop:14}}>
          <button className="Y-btn Y-btn-primary" onClick={upload} disabled={saving}>{I.up} {saving?'Uploading…':'Upload'}</button>
          <button className="Y-btn Y-btn-ghost Y-btn-sm" onClick={()=>setFile(null)}>✕ Remove</button>
        </div>}
      </div>
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────────────
function SettingsPage({ showToast }) {
  const [cur, setCur] = useState('');
  const [nw, setNw] = useState('');
  const [conf, setConf] = useState('');
  const [saving, setSaving] = useState(false);

  const change = async () => {
    if (nw !== conf) { showToast('Passwords do not match', 'error'); return; }
    if (nw.length < 4) { showToast('Too short (min 4)', 'error'); return; }
    setSaving(true);
    try {
      const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${BASE}/api/admin/change-password`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ currentPassword:cur, newPassword:nw })
      });
      const d = await res.json();
      if (d.success) { showToast('Password updated!', 'success'); setCur(''); setNw(''); setConf(''); }
      else showToast(d.error||'Failed', 'error');
    } catch { showToast('Backend offline', 'error'); }
    setSaving(false);
  };

  return (
    <div>
      <div className="Y-sec-hdr"><div className="Y-sec-title">Settings</div></div>
      <div style={{maxWidth:480}}>
        <div className="Y-card">
          <div style={{fontWeight:700,marginBottom:20}}>🔐 Change Password</div>
          {[['Current Password',cur,setCur],['New Password',nw,setNw],['Confirm New',conf,setConf]].map(([l,v,s]) => (
            <div className="Y-field" key={l}>
              <label className="Y-label">{l}</label>
              <input type="password" className="Y-input" value={v} onChange={e=>s(e.target.value)} placeholder={`Enter ${l.toLowerCase()}`}/>
            </div>
          ))}
          <button className="Y-btn Y-btn-primary" onClick={change} disabled={saving}>{saving?'Updating…':'Update Password'}</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [toast, setToast] = useState({ msg:'', type:'success', show:false });
  const [backendOnline, setBackendOnline] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = useCallback((msg, type='success') => {
    setToast({ msg, type, show:true });
    setTimeout(() => setToast(t => ({...t,show:false})), 3000);
  }, []);

  useEffect(() => {
    const check = async () => {
      try {
        const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const r = await fetch(`${BASE}/api/health`, { signal:AbortSignal.timeout(3000) });
        setBackendOnline(r.ok);
      } catch { setBackendOnline(false); }
    };
    check();
    const iv = setInterval(check, 15000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    contactApi.getAll().then(r => setMessages(r.data||[])).catch(()=>{});
    projectsApi.getAll().then(r => setProjects(r.data||[])).catch(()=>{});
  }, [isAuthenticated]);

  const titles = { dashboard:'Dashboard', projects:'Projects', messages:'Messages', about:'About & Bio', resume:'Resume', settings:'Settings' };
  const unread = messages.filter(m => !m.read).length;

  const nav = [
    { section:'Overview', items:[{ id:'dashboard', label:'Dashboard', icon:I.dash }] },
    { section:'Content',  items:[{ id:'projects', label:'Projects', icon:I.proj, badge:projects.length }, { id:'about', label:'About & Bio', icon:I.user }, { id:'resume', label:'Resume', icon:I.doc }] },
    { section:'Inbox',    items:[{ id:'messages', label:'Messages', icon:I.msg, badge:unread||undefined }] },
    { section:'System',   items:[{ id:'settings', label:'Settings', icon:I.gear }] },
  ];

  if (!isAuthenticated) return <><style>{CSS}</style><Login /></>;

  return (
    <>
      <style>{CSS}</style>
      <div className="Y">
        <div className="Y-grid-bg"/>
        <div className="Y-orb Y-orb-1"/>
        <div className="Y-orb Y-orb-2"/>

        {/* SIDEBAR */}
        {sidebarOpen && <div className="Y-overlay-bg" onClick={() => setSidebarOpen(false)}/>}
<aside className={`Y-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="Y-logo">
            <div className="Y-logo-mark">
              <div className="Y-logo-hex">Y</div>
              <div>
                <div className="Y-logo-name">YASHAS</div>
                <div className="Y-logo-ver">.ADMIN v2</div>
              </div>
            </div>
          </div>
          <nav className="Y-nav">
            {nav.map(({section,items}) => (
              <div className="Y-nav-section" key={section}>
                <div className="Y-nav-label">{section}</div>
                {items.map(({id,label,icon,badge}) => (
                  <div key={id} className={`Y-nav-item ${page===id?'active':''}`} onClick={() => { setPage(id); setSidebarOpen(false); }}>
                    <span className="Y-nav-icon">{icon}</span>
                    {label}
                    {badge > 0 && <span className="Y-badge">{badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          <div className="Y-sidebar-foot">
            <div className="Y-profile">
              <div className="Y-avatar">Y</div>
              <div>
                <div className="Y-pname">Yashaswin</div>
                <div className="Y-prole">administrator</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="Y-main">
          <div className="Y-topbar">
            <div className="Y-topbar-left">
  <div className="Y-hamburger" onClick={() => setSidebarOpen(o => !o)}>
    <span/><span/><span/>
  </div>
  <div className="Y-breadcrumb">ADMIN / {titles[page].toUpperCase()}</div>
  <div className="Y-topbar-title">{titles[page]}</div>
</div>
            <div className="Y-topbar-right">
              <div className="Y-status">
                <div className={`Y-dot ${backendOnline?'Y-dot-green':'Y-dot-red'}`}/>
                {backendOnline ? 'online' : 'offline'}
              </div>
              <a href="/" target="_blank" className="Y-btn Y-btn-ghost" style={{fontSize:'.75rem'}}>{I.eye} Portfolio</a>
              <button className="Y-btn Y-btn-danger" onClick={logout}>{I.out} Logout</button>
            </div>
          </div>

          <div className="Y-content">
            {page==='dashboard' && <DashboardPage messages={messages} projects={projects} onNav={setPage} backendOnline={backendOnline}/>}
            {page==='messages'  && <MessagesPage messages={messages} setMessages={setMessages} showToast={showToast}/>}
            {page==='projects'  && <ProjectsPage showToast={showToast}/>}
            {page==='about'     && <AboutPage showToast={showToast}/>}
            {page==='resume'    && <ResumePage showToast={showToast}/>}
            {page==='settings'  && <SettingsPage showToast={showToast}/>}
          </div>
        </main>

        <Toast msg={toast.msg} type={toast.type} show={toast.show}/>
      </div>
    </>
  );
}