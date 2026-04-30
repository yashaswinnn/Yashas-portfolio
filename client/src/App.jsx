import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ScrollProvider } from './context/ScrollContext';
import Cursor from './components/Cursor';

const Home = lazy(() => import('./pages/Home'));
const Diabetic = lazy(() => import('./pages/Diabetic'));
const AIResume = lazy(() => import('./pages/AIResume'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));

const PageLoader = () => (
  <div style={{
    position:'fixed', inset:0,
    background:'#030308',
    display:'flex', alignItems:'center', justifyContent:'center',
    flexDirection:'column', gap:16
  }}>
    <div style={{
      width:40, height:40, borderRadius:'50%',
      border:'3px solid rgba(168,85,247,0.2)',
      borderTop:'3px solid #a855f7',
      animation:'spin 0.8s linear infinite'
    }}/>
    <div style={{
      fontFamily:'monospace', fontSize:'0.75rem',
      color:'#64748b', letterSpacing:'0.1em'
    }}>LOADING...</div>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

function AppContent() {
  const location = useLocation();
  const showCursor = location.pathname === '/';

  return (
    <>
      {showCursor && <Cursor />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diabetic" element={<Diabetic />} />
          <Route path="/airesume" element={<AIResume />} />
          <Route path="/yas2026" element={
            <AuthProvider><AdminDashboard /></AuthProvider>
          } />
          <Route path="/admin" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}
