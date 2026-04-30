import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Diabetic() {
  useScrollReveal();

  const stats = [
    { n:'57.05%', l:'Severe DR Confidence (Demo)' },
    { n:'5', l:'Classification Classes' },
    { n:'2', l:'Hybrid CNN Models' },
    { n:'3', l:'Supported Formats' },
  ];
  const stages = [
    { icon:'🟢', name:'No DR', desc:'No signs of diabetic retinopathy detected in the fundus image.' },
    { icon:'🟡', name:'Mild', desc:'Microaneurysms only. Early-stage with minimal retinal changes.' },
    { icon:'🟠', name:'Moderate', desc:'More than microaneurysms but less than severe stage features.' },
    { icon:'🔴', name:'Severe', desc:'Extensive hemorrhages, venous beading, IRMA present.', active: true },
    { icon:'⚠️', name:'Proliferative', desc:'Most advanced stage. New vessel growth and high blindness risk.' },
  ];
  const probs = [
    { label:'No DR', pct:8.32 }, { label:'Mild', pct:11.45 }, { label:'Moderate', pct:14.78 },
    { label:'⚡ Severe DR — Predicted Diagnosis', pct:57.05, severe:true },
    { label:'Proliferative DR', pct:8.40 },
  ];
  const tech = [
    { icon:'🧠', t:'DenseNet201 + ResNet50', d:'Hybrid CNN combining dense connections and residual learning for superior feature extraction.' },
    { icon:'🐍', t:'Python & TensorFlow', d:'Core ML pipeline built with TensorFlow/Keras for model training and inference.' },
    { icon:'👁️', t:'OpenCV', d:'Retinal image preprocessing — resizing, normalization, and augmentation.' },
    { icon:'🌐', t:'Flask', d:'Lightweight backend serving the model via REST API with image upload endpoints.' },
    { icon:'📊', t:'NumPy & Pandas', d:'Data handling, preprocessing pipelines, and model evaluation metrics.' },
    { icon:'🎨', t:'HTML / CSS / JS', d:'Clean dark-themed dashboard for uploading images and visualizing predictions.' },
  ];
  const features = [
    'Drag-and-drop or file-browse upload supporting JPG, JPEG, and PNG formats',
    'Hybrid DenseNet201 + ResNet50 for high-accuracy multi-class classification',
    'Real-time confidence score with the final predicted DR stage highlighted',
    'Detailed class probability progress bars for all 5 DR categories',
    'Clean dark dashboard optimized for clinical screening demonstrations',
    'Transparent decision support with full probability breakdown for medical review',
  ];

  return (
    <div style={{ background:'var(--bg)', color:'var(--white)', fontFamily:'var(--font-body)', minHeight:'100vh' }}>
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'18px 60px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(3,3,8,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <Link to="/" style={{ fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:800,background:'linear-gradient(135deg,#fff 40%,var(--purple-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',textDecoration:'none' }}>Y A S H A S</Link>
        <Link to="/" style={{ display:'inline-flex',alignItems:'center',gap:'8px',padding:'9px 20px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(124,58,237,0.25)',borderRadius:'8px',color:'var(--white)',textDecoration:'none',fontSize:'0.875rem',fontWeight:500 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to Portfolio
        </Link>
      </nav>

      <section style={{ padding:'130px 60px 80px', background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(124,58,237,0.12),transparent)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'8px',fontSize:'0.8rem',color:'var(--muted)',marginBottom:'24px' }}>
            <Link to="/" style={{ color:'var(--purple-bright)',textDecoration:'none' }}>Portfolio</Link>
            <span style={{ opacity:0.4 }}>›</span>
            <span>Diabetic Retinopathy Detection</span>
          </div>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'8px',padding:'5px 14px',background:'rgba(124,58,237,0.12)',border:'1px solid rgba(124,58,237,0.3)',borderRadius:'100px',fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'20px' }}>
            <span style={{ width:'6px',height:'6px',background:'var(--purple-bright)',borderRadius:'50%',animation:'pulse 2s infinite',display:'block' }} />
            Machine Learning · Medical AI
          </div>
          <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:800,lineHeight:1.08,letterSpacing:'-0.03em',marginBottom:'24px' }}>
            Diabetic Retinopathy<br />
            <span style={{ background:'linear-gradient(135deg,#fff 30%,var(--purple-bright) 70%,var(--cyan))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Detection System</span>
          </h1>
          <p style={{ fontSize:'1.0625rem',color:'var(--muted)',lineHeight:1.8,maxWidth:'720px',marginBottom:'36px',fontWeight:300 }}>A hybrid DenseNet201 + ResNet50 deep-learning model that analyzes retinal fundus images to detect and classify the stage of Diabetic Retinopathy — built for screening and clinical decision support with transparent probability reporting.</p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'12px',marginBottom:'40px' }}>
            {['DenseNet201','ResNet50','Python','TensorFlow','OpenCV','Flask','Medical AI'].map(t => (
              <span key={t} style={{ padding:'6px 14px',background:t==='DenseNet201'||t==='ResNet50'?'rgba(124,58,237,0.12)':'rgba(255,255,255,0.04)',border:`1px solid ${t==='DenseNet201'||t==='ResNet50'?'rgba(124,58,237,0.3)':'rgba(255,255,255,0.08)'}`,borderRadius:'100px',fontSize:'0.78rem',fontWeight:500,color:t==='DenseNet201'||t==='ResNet50'?'var(--purple-bright)':'var(--muted)' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div style={{ padding:'0 60px 80px', maxWidth:'1220px', margin:'0 auto' }}>
        <div style={{ borderRadius:'20px',overflow:'hidden',border:'1px solid rgba(124,58,237,0.2)',boxShadow:'0 40px 100px rgba(0,0,0,0.6)',maxWidth:'700px',margin:'0 auto' }}>
          <img src="/diabetic-dashboard.png" alt="Dashboard" style={{ width:'100%',display:'block',objectFit:'contain',maxHeight:'500px' }} />
        </div>
      </div>

      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 60px 100px' }}>
        {/* Stats */}
        <div className="reveal" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px',marginBottom:'80px' }}>
          {stats.map(s => (
            <div key={s.n} style={{ background:'var(--card-bg)',border:'1px solid var(--card-border)',borderRadius:'16px',padding:'28px 24px',textAlign:'center',transition:'all 0.3s' }}>
              <div style={{ fontFamily:'var(--font-display)',fontSize:'2.25rem',fontWeight:800,background:'linear-gradient(135deg,var(--purple-bright),var(--cyan))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px' }}>{s.n}</div>
              <div style={{ fontSize:'0.8rem',color:'var(--muted)' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Overview</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,letterSpacing:'-0.025em',marginBottom:'20px' }}>What does this system do?</h2>
          <p style={{ fontSize:'1rem',color:'var(--muted)',lineHeight:1.85,fontWeight:300,marginBottom:'16px' }}>This system uses a hybrid deep-learning architecture combining <strong style={{ color:'var(--white)' }}>DenseNet201</strong> and <strong style={{ color:'var(--white)' }}>ResNet50</strong> to classify retinal fundus images into five stages of Diabetic Retinopathy.</p>
          <p style={{ fontSize:'1rem',color:'var(--muted)',lineHeight:1.85,fontWeight:300 }}>The dashboard displays the uploaded fundus image, the predicted DR stage, a confidence score, and detailed class probability bars for all five categories — making it ideal for clinical screening demonstrations and medical AI research.</p>
        </div>

        <div style={{ width:'100%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)',margin:'60px 0' }} />

        {/* Stages */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Classification</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>5 Stages of Diabetic Retinopathy</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'16px',marginTop:'32px' }}>
            {stages.map(s => (
              <div key={s.name} style={{ background:s.active?'rgba(124,58,237,0.1)':'var(--card-bg)',border:`1px solid ${s.active?'rgba(168,85,247,0.5)':'var(--card-border)'}`,borderRadius:'14px',padding:'20px 16px',textAlign:'center',transition:'all 0.3s',boxShadow:s.active?'0 0 20px rgba(124,58,237,0.2)':'none' }}>
                <div style={{ fontSize:'1.75rem',marginBottom:'10px' }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)',fontSize:'0.8rem',fontWeight:700,marginBottom:'6px' }}>{s.name}</div>
                <div style={{ fontSize:'0.7rem',color:'var(--muted)',lineHeight:1.5 }}>{s.desc}</div>
                {s.active && <span style={{ display:'inline-block',marginTop:'10px',padding:'2px 10px',borderRadius:'100px',fontSize:'0.65rem',fontWeight:600,background:'rgba(168,85,247,0.2)',color:'var(--purple-bright)' }}>Demo Result</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ width:'100%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)',margin:'60px 0' }} />

        {/* Probabilities */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Model Output</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>Class Probability Breakdown</h2>
          {probs.map(p => (
            <div key={p.label} style={{ marginBottom:'20px' }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
                <span style={{ fontSize:'0.875rem',fontWeight:500,color:p.severe?'#f87171':'var(--white)' }}>{p.label}</span>
                <span style={{ fontFamily:'var(--font-display)',fontSize:'0.875rem',fontWeight:700,color:p.severe?'#f87171':'var(--purple-bright)' }}>{p.pct}%</span>
              </div>
              <div style={{ height:'8px',background:'rgba(255,255,255,0.06)',borderRadius:'100px',overflow:'hidden' }}>
                <div style={{ height:'100%',borderRadius:'100px',width:`${p.pct}%`,background:p.severe?'linear-gradient(90deg,#dc2626,#f87171)':'linear-gradient(90deg,var(--purple),var(--purple-bright))',boxShadow:p.severe?'0 0 10px rgba(220,38,38,0.4)':'none',animation:'fill 1.4s cubic-bezier(0.4,0,0.2,1) both' }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ width:'100%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)',margin:'60px 0' }} />

        {/* Tech */}
        <div className="reveal" style={{ marginBottom:'80px' }}>
          <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--purple-bright)',marginBottom:'16px',display:'block' }}>Technology</span>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:700,marginBottom:'20px' }}>Tech Stack</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginTop:'32px' }}>
            {tech.map(t => (
              <div key={t.t} style={{ background:'var(--card-bg)',border:'1px solid var(--card-border)',borderRadius:'14px',padding:'24px 20px',display:'flex',alignItems:'flex-start',gap:'16px',transition:'all 0.3s' }}>
                <div style={{ width:'44px',height:'44px',flexShrink:0,background:'radial-gradient(circle,rgba(168,85,247,0.2),rgba(124,58,237,0.08))',border:'1px solid rgba(168,85,247,0.2)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem' }}>{t.icon}</div>
                <div><h4 style={{ fontFamily:'var(--font-display)',fontSize:'0.9rem',fontWeight:700,marginBottom:'4px' }}>{t.t}</h4><p style={{ fontSize:'0.78rem',color:'var(--muted)',lineHeight:1.5 }}>{t.d}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width:'100%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)',margin:'60px 0' }} />

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

      <style>{`@keyframes fill { from{width:0!important} } @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} } :root { --bg:#030308;--bg2:#06060f;--purple:#7c3aed;--purple-bright:#a855f7;--cyan:#06b6d4;--white:#f8f8ff;--muted:#8b8ba7;--card-bg:rgba(255,255,255,0.03);--card-border:rgba(124,58,237,0.18);--font-display:'Syne',sans-serif;--font-body:'DM Sans',sans-serif; } .reveal{opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)} .reveal.visible{opacity:1;transform:translateY(0)} @media(max-width:600px){nav,.hero{padding-left:24px;padding-right:24px}} `}</style>
    </div>
  );
}
