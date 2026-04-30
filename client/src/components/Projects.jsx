import { useEffect, useState, useRef } from 'react';
import { BACKEND_URL } from '../utils/emailjs';
import { Link, useNavigate } from 'react-router-dom';

const FALLBACK = [
  { title: 'AI-Based Resume Builder', tags: ['Streamlit','Python','Parsing'], image: '/project2.png', link: '/airesume' },
  { title: 'Diabetic Retinopathy Detection System', tags: ['Streamlit','TensorFlow','CNN'], image: '/project1.png', link: '/diabetic' },
  { title: 'KnightForge - Real-Time Chess Platform', tags: ['React','Node.js','Socket.io'], image: '/knightforge.png', link: 'https://knight-forge.vercel.app/' },
  { title: 'TypFlux – Modern Typing Speed Test Platform', tags: ['Tailwind','JavaScript','React'], image: '/project3.png', link: 'https://typflux.vercel.app/' },
];

const COLORS = ['#f472b6','#a78bfa','#38bdf8','#34d399','#fb923c','#e879f9'];

function normalizeTitle(title = '') {
  return title.toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
}

function normalizeImage(project) {
  return {
    ...project,
    image: !project.image ? '' :
           project.image.startsWith('http') ? project.image :
           project.image.startsWith('data:') ? project.image :
           project.image.startsWith('./') ? project.image.replace('./', '/') :
           project.image.startsWith('/') ? project.image :
           '/' + project.image
  };
}

function mergeProjects(primary, secondary) {
  const byTitle = new Map();
  primary.forEach(project => byTitle.set(normalizeTitle(project.title), project));
  secondary.forEach(project => {
    const key = normalizeTitle(project.title);
    byTitle.set(key, { ...byTitle.get(key), ...project });
  });
  return Array.from(byTitle.values());
}

function getCFG(project, index) {
  const rc = COLORS[index % COLORS.length];
  const num = String(index + 1).padStart(3, '0');
  const tag = project.featured ? 'FEATURED' : project.link?.startsWith('http') ? 'LIVE PROJECT' : 'PROJECT';
  const cat = (project.tags || []).join(' · ') || 'Full Stack · Web · Application';
  const type = (project.tags?.[0] || 'WEB').toUpperCase().slice(0, 6);
  return { rc, tag, cat, idx:`${num} / ${type}` };
}

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(FALLBACK);
  const rowRefs = useRef([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/projects`)
      .then(r => r.json())
      .then(data => {
        if (data.data && data.data.length) {
          const mapped = data.data.map(normalizeImage);
          if (mapped.length) setProjects(mergeProjects(FALLBACK, mapped));
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    rowRefs.current.forEach((row) => {
      if (!row) return;
      row.classList.add('visible');
      const thumb = row.querySelector('.p-thumb');
      if (!thumb) return;
      row.addEventListener('mousemove', e => {
        const r = thumb.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width/2)) / (r.width/2);
        const dy = (e.clientY - (r.top + r.height/2)) / (r.height/2);
        thumb.style.transform = `translateY(0) scale(1) rotateX(${dy*-7}deg) rotateY(${dx*7}deg)`;
      });
      row.addEventListener('mouseleave', () => {
        thumb.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
      });
    });
  }, [projects]);

  const isExternal = link => link && (link.startsWith('http') || link.startsWith('https'));

  return (
    <section id="gallery" style={{ padding:'100px 24px 140px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(124,58,237,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.025) 1px,transparent 1px)',backgroundSize:'80px 80px',pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:'-200px',right:'-100px',width:'500px',height:'500px',background:'rgba(123,94,167,0.07)',borderRadius:'50%',filter:'blur(120px)',pointerEvents:'none' }} />

      <div style={{ maxWidth:'1100px', margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'80px',flexWrap:'wrap',gap:'20px' }}>
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
              <span style={{ display:'block',width:'24px',height:'1px',background:'#a855f7' }} />
              <span style={{ fontFamily:'monospace',fontSize:'0.65rem',letterSpacing:'0.25em',color:'#a855f7',textTransform:'uppercase' }}>Selected Work</span>
            </div>
            <h2 className="section-title reveal visible" style={{ marginBottom:0,lineHeight:0.95 }}>PROJECTS<br /><span className="grad-text">THAT HIT</span></h2>
          </div>
        </div>

        <div id="gallery-grid">
          <div style={{ height:'1px', background:'rgba(255,255,255,0.04)' }} />
          {projects.map((p, i) => {
            const c = getCFG(p, i);
            const isExt = isExternal(p.link);
            return (
              <article
                key={p._id || i}
                className="p-row reveal visible"
                style={{'--rc': c.rc, cursor:'pointer'}}
                ref={el => rowRefs.current[i] = el}
                onClick={() => {
                  if (!p.link) return;
                  if (isExt) window.open(p.link, '_blank');
                  else navigate(p.link);
                }}
              >
                <div className="p-row-bg" />
                <div className="p-row-bar" style={{ background:`linear-gradient(90deg,${c.rc},var(--cyan))` }} />
                <div className="p-row-inner" style={!p.image ? {gridTemplateColumns:'100px 1fr'} : {}}>
                  <div className="p-idx" style={{ color: c.rc }}>{c.idx}</div>
                  <div>
                    <div className="p-cat">{c.cat}</div>
                    <h3 className="p-title">{p.title}</h3>
                    <div className="p-stack">
                      {(p.tags||[]).map(t => <span key={t} className="p-chip">{t}</span>)}
                    </div>
                    {isExt ? (
                      <a className="p-cta" href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: c.rc }}>
                        <span className="p-cta-circle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                        VIEW PROJECT
                      </a>
                    ) : (
                      <Link className="p-cta" to={p.link || '#'} style={{ color: c.rc }}>
                        <span className="p-cta-circle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                        VIEW PROJECT
                      </Link>
                    )}
                  </div>
                  <div className="p-thumb" style={!p.image ? {display:'none'} : {}}>
                    {p.image && (
                      <img
                        src={
                          p.image.startsWith('data:') ? p.image :
                          p.image.startsWith('http') ? p.image :
                          p.image.startsWith('./') ? p.image.replace('./', '/') :
                          p.image
                        }
                        alt={p.title}
                        loading="lazy"
                        onError={e => { e.target.parentElement.style.display='none'; }}
                      />
                    )}
                    <div className="p-thumb-sweep" />
                    <div className="p-thumb-tag">{c.tag}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'60px',paddingTop:'32px',borderTop:'1px solid rgba(255,255,255,0.04)',flexWrap:'wrap',gap:'16px' }}>
          <span style={{ fontFamily:'monospace',fontSize:'0.6rem',color:'#55556a',letterSpacing:'0.1em' }}>All projects built by <span style={{ color:'#a855f7' }}>Yashas</span> · 2024–2026</span>
          <a href="https://github.com/yashaswinnn" target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',fontFamily:'monospace',fontSize:'0.65rem',letterSpacing:'0.12em',color:'var(--white)',textTransform:'uppercase',padding:'10px 20px',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'4px',transition:'all 0.3s',cursor:'none' }}>
            View GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
