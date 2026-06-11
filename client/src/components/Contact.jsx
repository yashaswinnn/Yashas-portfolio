import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, BACKEND_URL } from '../utils/emailjs';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: form.name, from_email: form.email, message: form.message, reply_to: form.email,
      }, EMAILJS_CONFIG.publicKey);
      try {
        await fetch(`${BACKEND_URL}/api/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      } catch {}
      setStatus({ type: 'success', msg: '✓ Thank you! Your message has been received. I will get back to you soon.' });
      setForm({ name:'', email:'', message:'' });
    } catch {
      setStatus({ type: 'error', msg: '✗ Something went wrong. Please try again.' });
    }
    setSending(false);
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-header">
          <span className="section-label reveal">Get In Touch</span>
          <h2 className="section-title reveal reveal-delay-1">Start a <span className="grad-text">conversation</span></h2>
          <p className="section-body reveal reveal-delay-2" style={{ marginBottom: 0 }}>contack me 6360167744</p>
        </div>
        <form onSubmit={handleSubmit} className="reveal reveal-delay-2">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Smith" required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@company.com" required />
          </div>
          <div className="form-group">
            <label>Your Message</label>
            <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="contack me 6360167744" required />
          </div>
          <button type="submit" className="form-submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {status && <div className={`status-msg ${status.type}`}>{status.msg}</div>}
        </form>

        <div className="social-links reveal reveal-delay-1">
          <a href="https://github.com/yashaswinnn" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          </a>
          <a href="http://linkedin.com/in/yashaswin-m-49a80633b" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="mailto:yashaskamble02@gmail.com" className="social-icon" title="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
