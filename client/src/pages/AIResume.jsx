import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AIResume() {
  useScrollReveal();
  const [lightbox, setLightbox] = useState(null);

  const stats = [
    { n:'4', l:'System Layers' }, { n:'ATS', l:'Keyword Optimized' },
    { n:'100', l:'Point Scoring System' }, { n:'PDF', l:'Downloadable Format' },
  ];
  const steps = [
    { n:'1', t:'User Input', d:'User fills in their role, personal info, education, work experience, projects, certificates, and links through the Streamlit form interface.' },
    { n:'2', t:'AI Content Generation', d:'OpenAI API analyzes the input and generates a professional summary, polished job descriptions, and optimized skill explanations tailored to the target role.' },
    { n:'3', t:'ATS Keyword Matching', d:'NLP extracts key terms from the job description and matches them with the user profile to maximize ATS compatibility and recruiter visibility.' },
    { n:'4', t:'Feedback and Scoring', d:'The system evaluates the resume on relevance, clarity, technical skills, formatting, and completeness — providing a score out of 100 with actionable suggestions.' },
    { n:'5', t:'PDF Export', d:'The resume is converted from Markdown to HTML and rendered into a clean professional PDF using PDFKit and wkhtmltopdf — ready to download instantly.' },
  ];
  const scoreBars = [
    { l:'Relevance to Role', v:60 }, { l:'Technical Skills Coverage', v:55 },
    { l:'Clarity and Formatting', v:80 }, { l:'Completeness', v:70 }, { l:'ATS Compatibility', v:65 },
  ];
  const arch = [
    { icon:'🖥️', t:'Presentation Layer', d:'Streamlit UI for user input, resume preview, feedback display, and PDF download.' },
    { icon:'⚙️', t:'Application Layer', d:'Python processing logic handling form validation, data transformation, and workflow orchestration.' },
    { icon:'🧠', t:'AI Processing Layer', d:'OpenAI API for content generation, NLP for keyword extraction, and ML models for scoring.' },
    { icon:'🗄️', t:'Data Layer', d:'Secure storage of user inputs and generated resumes with data protection measures.' },
  ];
  const tech = [
    { icon:'🧠', t:'OpenAI API', d:'Powers content generation, professional summary writing, and AI-based resume feedback.' },
    { icon:'🐍', t:'Python', d:'Core backend logic — data processing, NLP pipeline, and system orchestration.' },
    { icon:'🌐', t:'Streamlit', d:'Frontend framework for building the interactive resume form and live preview.' },
    { icon:'📝', t:'NLP / spaCy', d:'Keyword extraction from job descriptions and ATS compatibility analysis.' },
    { icon:'📄', t:'PDFKit + wkhtmltopdf', d:'Converts HTML resume output to a clean downloadable PDF document.' },
    { icon:'🔒', t:'Security Layer', d:'Secure API key handling, user data protection, and encrypted resume storage.' },
  ];
  const features = [
    'AI-generated professional summaries, job descriptions, and skill explanations tailored to the target role',
    'ATS keyword matching — extracts job description keywords and aligns resume content for maximum visibility',
    'Resume scoring out of 100 across relevance, clarity, technical skills, formatting, and completeness',
    'Real-time grammar checking and content refinement powered by OpenAI API',
    'Identifies missing components like SQL, Python, ETL, and data modeling skills for specific roles',
    'Clean PDF export using PDFKit and wkhtmltopdf — professional format ready for job applications',
    'Streamlit-based user-friendly interface with fields for all resume sections',
    'Supports personal info, education, work experience, projects, certificates, and additional links',
  ];

  const cardStyle = { background:'var(--card-bg)',border:'1px solid var(--card-border)',borderRadius:'14px',padding:'24px 20px',textAlign:'center',transition:'all 0.3s' };
  const divider = <div style={{ width:'100%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)',margin:'60px 0' }} />;

  return (
    <div style={{ background:'var(--bg)', color:'var(--white)', fontFamily:'var(--font-body)', minHeight:'100vh' }}>
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'18px 60px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(3,3,8,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <Link to="/" style={{ fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:800,background:'linear-gradient(135deg,#fff 40%,var(--purple-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',textDecoration:'none' }}>Y A S H A S</Link>
        <Link to="/" style={{ display:'inline-flex',alignItems:'center',gap:'8px',padding:'9px 20px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(124,58,237,0.25)',borderRadius:'8px',color:'var(--white)',textDecoration:'none',fontSize:'0.875rem',fontWeight:500 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to Portfolio
        </Link>
      </nav>

      <section style={{ padding:'130px 60px 80px',background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(124,58,237,0.12),transparent)' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'8px',fontSize:'0.8rem',color:'var(--muted)',marginBottom:'24px' }}>
            <Link to="/" style={{ color:'var(--purple-bright)',textDecoration:'none' }}>Portfolio</Link>
            <span style={{ opacity:0.4 }}>›</span><span>AI Resume Builder</span>
          </div>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'8px',padding:'5px 14px',background:'rgba(124,58,237,0.12)',border:'1px solid rgba(124,58,237,0.3)',borderRadius:'100px',fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'20px' }}>
            <span style={{ width:'6px',height:'6px',background:'var(--purple-bright)',borderRadius:'50%',animation:'pulse 2s infinite',display:'block' }} />
            AI · NLP · Python
          </div>
          <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:800,lineHeight:1.08,letterSpacing:'-0.03em',marginBottom:'24px' }}>
            AI-Based<br />
            <span style={{ background:'linear-gradient(135deg,#fff 30%,var(--purple-bright) 70%,var(--cyan))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Resume Builder</span>
          </h1>
          <p style={{ fontSize:'1.0625rem',color:'var(--muted)',lineHeight:1.8,maxWidth:'720px',marginBottom:'36px',fontWeight:300 }}>An intelligent web application that uses AI, ML, and NLP to help job seekers create professional, ATS-optimized resumes — with automated content generation, resume scoring out of 100, and real-time improvement feedback.</p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'12px',marginBottom:'40px' }}>
            {['OpenAI API','NLP','Python','Streamlit','PDFKit','ATS Optimization','wkhtmltopdf'].map(t => (
              <span key={t} style={{ padding:'6px 14px',background:t==='OpenAI API'||t==='NLP'?'rgba(124,58,237,0.12)':'rgba(255,255,255,0.04)',border:`1px solid ${t==='OpenAI API'||t==='NLP'?'rgba(124,58,237,0.3)':'rgba(255,255,255,0.08)'}`,borderRadius:'100px',fontSize:'0.78rem',fontWeight:500,color:t==='OpenAI API'||t==='NLP'?'var(--purple-bright)':'var(--muted)' }}>{t}</span>
            ))}
          </div>
          <div style={{ display:'flex',gap:'14px',flexWrap:'wrap' }}>
            <a href="#overview" style={{ display:'inline-flex',alignItems:'center',gap:'8px',padding:'13px 28px',background:'linear-gradient(135deg,var(--purple),#5b21b6)',borderRadius:'10px',color:'#fff',textDecoration:'none',fontSize:'0.9rem',fontWeight:500,boxShadow:'0 0 25px rgba(124,58,237,0.35)' }}>
              Explore Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <div style={{ padding:'0 60px 80px',maxWidth:'1220px',margin:'0 auto' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px' }}>
          {[{src:'/project4.png',label:'Resume Generator Interface'},{src:'/project5.png',label:'Generated Resume Output'}].map(img => (
            <div key={img.src} style={{ borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(124,58,237,0.2)',boxShadow:'0 20px 60px rgba(0,0,0,0.5)',cursor:'zoom-in' }} onClick={() => setLightbox(img.src)}>
              <img src={img.src} alt={img.label} style={{ width:'100%',display:'block',objectFit:'cover',objectPosition:'top',maxHeight:'480px' }} />
              <div style={{ padding:'14px 20px',background:'rgba(255,255,255,0.03)',borderTop:'1px solid rgba(124,58,237,0.1)',fontSize:'0.8rem',color:'var(--muted)',display:'flex',alignItems:'center',gap:'8px' }}>
                <b style={{ color:'var(--purple-bright)' }}>⚡</b> {img.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.92)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(10px)' }}>
          <div onClick={() => setLightbox(null)} style={{ position:'absolute',top:'24px',right:'24px',width:'44px',height:'44px',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'white',fontSize:'1.2rem' }}>✕</div>
          <img src={lightbox} alt="" style={{ maxWidth:'90vw',maxHeight:'90vh',objectFit:'contain',borderRadius:'12px',border:'1px solid rgba(124,58,237,0.3)' }} />
        </div>
      )}

      <div id="overview" style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 60px 100px' }}>
        {/* Stats */}
        <div className="reveal" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px',marginBottom:'80px' }}>
          {stats.map(s => (
            <div key={s.n} style={cardStyle}>
              <div style={{ fontFamily:'var(--font-display)',fontSize:'2.25rem',fontWeight:800,background:'linear-gradient(135deg,var(--purple-bright),var(--cyan))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px' }}>{s.n}</div>
              <div style={{ fontSize:'0.8rem',color:'var(--muted)' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Overview text */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Overview</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>What does this system do?</h2>
          <p style={{ fontSize:'1rem',color:'var(--muted)',lineHeight:1.85,fontWeight:300,marginBottom:'16px' }}>The AI-Based Resume Builder is an intelligent web application that solves a real problem — most job seekers struggle to create resumes that properly highlight their skills and pass ATS filters.</p>
          <p style={{ fontSize:'1rem',color:'var(--muted)',lineHeight:1.85,fontWeight:300 }}>Users enter their details through a <strong style={{ color:'var(--white)' }}>Streamlit-based interface</strong>. The AI engine generates professional content, scores the resume out of 100, identifies missing components, and exports a clean downloadable PDF.</p>
        </div>

        {divider}

        {/* Workflow */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Workflow</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>How it works — Step by Step</h2>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute',left:'28px',top:0,bottom:0,width:'1px',background:'linear-gradient(to bottom,var(--purple-bright),transparent)' }} />
            {steps.map(s => (
              <div key={s.n} style={{ display:'flex',alignItems:'flex-start',gap:'24px',padding:'24px 0' }}>
                <div style={{ width:'56px',height:'56px',flexShrink:0,background:'linear-gradient(135deg,var(--purple),#5b21b6)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:800,zIndex:1,boxShadow:'0 0 20px rgba(124,58,237,0.3)',color:'white' }}>{s.n}</div>
                <div style={{ paddingTop:'12px' }}>
                  <h4 style={{ fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:700,marginBottom:'6px' }}>{s.t}</h4>
                  <p style={{ fontSize:'0.875rem',color:'var(--muted)',lineHeight:1.6 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {divider}

        {/* Scoring */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Scoring System</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>Resume Feedback and Score</h2>
          <div style={{ background:'var(--card-bg)',border:'1px solid var(--card-border)',borderRadius:'20px',padding:'40px',marginTop:'32px' }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'32px',flexWrap:'wrap',gap:'16px' }}>
              <div style={{ fontFamily:'var(--font-display)',fontSize:'1.125rem',fontWeight:700 }}>Resume Analysis — Data Engineer Role</div>
              <div style={{ padding:'8px 20px',background:'rgba(124,58,237,0.15)',border:'1px solid rgba(124,58,237,0.3)',borderRadius:'100px',fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:700,color:'var(--purple-bright)' }}>65 / 100</div>
            </div>
            {scoreBars.map(b => (
              <div key={b.l} style={{ marginBottom:'16px' }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'6px' }}>
                  <span style={{ fontSize:'0.85rem',fontWeight:500 }}>{b.l}</span>
                  <span style={{ fontSize:'0.85rem',color:'var(--purple-bright)',fontWeight:600 }}>{b.v}%</span>
                </div>
                <div style={{ height:'8px',background:'rgba(255,255,255,0.06)',borderRadius:'100px',overflow:'hidden' }}>
                  <div style={{ height:'100%',borderRadius:'100px',width:`${b.v}%`,background:'linear-gradient(90deg,var(--purple),var(--purple-bright))',animation:'fill 1.4s cubic-bezier(0.4,0,0.2,1) both' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {divider}

        {/* Architecture */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Architecture</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>System Architecture</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginTop:'32px' }}>
            {arch.map(a => (
              <div key={a.t} style={cardStyle}>
                <div style={{ fontSize:'2rem',marginBottom:'14px' }}>{a.icon}</div>
                <h4 style={{ fontFamily:'var(--font-display)',fontSize:'0.9rem',fontWeight:700,marginBottom:'8px' }}>{a.t}</h4>
                <p style={{ fontSize:'0.78rem',color:'var(--muted)',lineHeight:1.6 }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>

        {divider}

        {/* Tech */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Technology</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>Tech Stack</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginTop:'32px' }}>
            {tech.map(t => (
              <div key={t.t} style={{ background:'var(--card-bg)',border:'1px solid var(--card-border)',borderRadius:'14px',padding:'24px 20px',display:'flex',alignItems:'flex-start',gap:'16px' }}>
                <div style={{ width:'44px',height:'44px',flexShrink:0,background:'radial-gradient(circle,rgba(168,85,247,0.2),rgba(124,58,237,0.08))',border:'1px solid rgba(168,85,247,0.2)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem' }}>{t.icon}</div>
                <div><h4 style={{ fontFamily:'var(--font-display)',fontSize:'0.9rem',fontWeight:700,marginBottom:'4px' }}>{t.t}</h4><p style={{ fontSize:'0.78rem',color:'var(--muted)',lineHeight:1.5 }}>{t.d}</p></div>
              </div>
            ))}
          </div>
        </div>

        {divider}

        {/* Features */}
        <div className="reveal">
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Features</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>Key Features</h2>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginTop:'28px' }}>
            {features.map((f,i) => (
              <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:'12px',background:'var(--card-bg)',border:'1px solid var(--card-border)',borderRadius:'12px',padding:'16px 18px' }}>
                <div style={{ width:'22px',height:'22px',flexShrink:0,background:'rgba(124,58,237,0.2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',color:'var(--purple-bright)',marginTop:'1px' }}>✓</div>
                <p style={{ fontSize:'0.875rem',color:'var(--muted)',lineHeight:1.6 }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ padding:'40px 60px',borderTop:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'center',gap:'40px',flexWrap:'wrap',textAlign:'center' }}>
        <p style={{ color:'var(--muted)',fontSize:'0.8rem' }}>© 2026 Yashas. All rights reserved</p>
      </footer>

      <style>{`:root{--bg:#030308;--purple:#7c3aed;--purple-bright:#a855f7;--cyan:#06b6d4;--white:#f8f8ff;--muted:#8b8ba7;--card-bg:rgba(255,255,255,0.03);--card-border:rgba(124,58,237,0.18);--font-display:'Syne',sans-serif;--font-body:'DM Sans',sans-serif;} @keyframes fill{from{width:0!important}} @keyframes pulse{0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)}} .reveal{opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)} .reveal.visible{opacity:1;transform:translateY(0)}`}</style>
    </div>
  );
}
