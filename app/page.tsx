"use client";
import { useState, useEffect } from 'react';
import Landing from './components/Landing';

type User = {
  email?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
};

export default function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State Form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // State Data User
  const [userData, setUserData] = useState<User | null>(null);

  // Efek Parallax untuk Halaman Register & Home
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const images = document.querySelectorAll('.parallax-img');
      images.forEach(img => {
        (img as HTMLElement).style.transform = `translateY(${scrolled * 0.05}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi Proses Autentikasi API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = isLoginMode ? '/api/login' : '/api/register';
    const bodyData = isLoginMode 
      ? { email, password } 
      : { firstName, lastName, email, password };
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLoginMode) {
          setUserData(data.user);
          setIsAuthenticated(true);
        } else {
          setMessage(data.message);
          setIsLoginMode(true); 
          setPassword('');
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setPassword('');
  };

  // ========================================================================
  // 1. TAMPILAN HOME / DASHBOARD PERPUSTAKAAN (Sudah Login)
  // ========================================================================
  if (isAuthenticated) {
    const displayName = userData?.user_metadata?.first_name || userData?.email?.split('@')[0] || email.split('@')[0] || 'User';
    return <Landing onLogout={handleLogout} displayName={displayName} />;
  }

  // ========================================================================
  // 2. TAMPILAN LOGIN (Mode Animasi Shimmer)
  // ========================================================================
  if (isLoginMode) {
    return (
      <div className="bg-canvas text-ink antialiased flex flex-col min-h-screen">
        <header className="bg-canvas flex justify-between items-center px-6 md:px-16 py-4 w-full max-w-full mx-auto border-b border-hairline fixed top-0 z-50">
          <div className="flex items-center gap-8">
            <span className="font-product-display text-primary text-[24px] font-bold tracking-tight">Lumina Library</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center pt-24 px-5 md:px-16 relative">
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="shimmer-bg absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rotate-12"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-md flex flex-col items-center">
            <h1 className="font-product-display text-primary text-[48px] md:text-section-heading mb-3 text-center tracking-tight">Lumina Library</h1>
            <p className="font-body text-muted mb-12 text-center max-w-xs">Enter your credentials to access your personal collection and digital archives.</p>
            
            {message && (
              <div className={`w-full p-3 rounded mb-4 text-sm font-body text-center ${message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            <div className="w-full bg-canvas border border-hairline p-8 md:p-10 rounded-xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-mono-label text-xs uppercase tracking-widest mb-2 text-ink" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full px-4 py-3 border border-hairline rounded font-body focus:ring-1 focus:ring-form-focus focus:border-form-focus outline-none transition-all" 
                    id="email" placeholder="name@domain.com" required type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-mono-label text-xs uppercase tracking-widest text-ink" htmlFor="password">Password</label>
                    <a className="font-caption text-sm text-ink underline decoration-hairline hover:text-primary transition-all" href="#">Forgot Password</a>
                  </div>
                  <div className="relative">
                    <input 
                      className="w-full px-4 py-3 border border-hairline rounded font-body focus:ring-1 focus:ring-form-focus focus:border-form-focus outline-none transition-all" 
                      id="password" placeholder="••••••••" required type={showPassword ? "text" : "password"}
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <span 
                      className="material-symbols-outlined absolute right-3 top-3 text-muted cursor-pointer select-none" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="w-full py-4 bg-primary text-on-primary font-button rounded-full hover:opacity-90 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center uppercase tracking-widest text-[12px]" 
                  type="submit" disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Log In'}
                </button>
              </form>
            </div>
            
            <p className="mt-8 font-body text-body-muted">
              New to Lumina? <button onClick={() => { setIsLoginMode(false); setMessage(''); }} className="text-ink font-bold hover:underline decoration-hairline">Create an account</button>
            </p>
          </div>
        </main>

        <footer className="bg-soft-stone flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-8 w-full border-t border-hairline mt-auto">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <span className="font-mono-label uppercase tracking-widest text-ink text-sm">Lumina Systems</span>
            <p className="font-caption text-sm text-body-muted mt-2">© 2026 Lumina Systems. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8">
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Terms</a>
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Privacy</a>
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Catalog</a>
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Support</a>
          </nav>
        </footer>
      </div>
    );
  }

  // ========================================================================
  // 3. TAMPILAN REGISTER (Gambar Hero Besar)
  // ========================================================================
  return (
    <div className="bg-soft-stone min-h-screen flex flex-col">
      <header className="bg-canvas border-b border-hairline sticky top-0 z-50">
        <div className="flex justify-between items-center px-5 md:px-16 py-4 w-full max-w-full mx-auto">
          <div className="font-product-display text-primary text-[24px] lg:text-[32px] font-bold tracking-tight">
            Lumina Library
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-primary">menu</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center py-20 px-5">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-6 space-y-3">
            <span className="font-mono-label text-sm uppercase tracking-widest text-coral">Member Access</span>
            <h1 className="font-product-display text-5xl md:text-6xl text-primary leading-tight">
              Join the <br/>Future of <br/>Reading.
            </h1>
            <p className="font-body-large text-lg text-body-muted max-w-md">
              Access our curated collection of digital manuscripts and enterprise-grade research archives.
            </p>
            
            <div className="hidden lg:block pt-6">
              <div className="w-full h-[300px] overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-700 bg-surface-container-highest flex items-center justify-center">
                <img 
                  className="parallax-img w-full h-full object-cover opacity-80" 
                  alt="Library Background"
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000" 
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="registration-card bg-canvas p-8 md:p-16 w-full max-w-[520px] shadow-sm border border-hairline">
              <h2 className="font-card-heading text-2xl text-primary mb-2 font-semibold">Create Account</h2>
              <p className="font-body text-body-muted mb-8">Experience the library's full potential.</p>

              {message && (
                <div className={`p-3 rounded mb-4 text-sm font-body ${message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono-label text-xs uppercase tracking-wider text-muted">First Name</label>
                    <input 
                      className="w-full px-3 py-2 border border-hairline rounded focus:ring-1 focus:ring-form-focus focus:border-form-focus outline-none transition-all font-body" 
                      placeholder="John" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono-label text-xs uppercase tracking-wider text-muted">Last Name</label>
                    <input 
                      className="w-full px-3 py-2 border border-hairline rounded focus:ring-1 focus:ring-form-focus focus:border-form-focus outline-none transition-all font-body" 
                      placeholder="Doe" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono-label text-xs uppercase tracking-wider text-muted">Email Address</label>
                  <input 
                    className="w-full px-3 py-2 border border-hairline rounded focus:ring-1 focus:ring-form-focus focus:border-form-focus outline-none transition-all font-body" 
                    placeholder="john@enterprise.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono-label text-xs uppercase tracking-wider text-muted">Password</label>
                  <div className="relative">
                    <input 
                      className="w-full px-3 py-2 border border-hairline rounded focus:ring-1 focus:ring-form-focus focus:border-form-focus outline-none transition-all font-body" 
                      placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                    />
                    <span 
                      className="material-symbols-outlined absolute right-3 top-2 text-muted cursor-pointer select-none" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 py-3">
                  <input className="mt-1 h-4 w-4 rounded border-hairline text-primary focus:ring-form-focus" id="terms" type="checkbox" required />
                  <label className="font-caption text-sm text-body-muted" htmlFor="terms">
                      I agree to the <a className="text-ink underline decoration-hairline" href="#">Terms of Service</a> and <a className="text-ink underline decoration-hairline" href="#">Privacy Policy</a>.
                  </label>
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-primary text-on-primary font-button py-3 rounded-full hover:opacity-90 transition-all duration-200 uppercase tracking-widest mt-2 disabled:opacity-70 flex justify-center items-center text-[12px]"
                >
                    {loading ? 'Processing...' : 'Create Account'}
                </button>

                <div className="flex items-center justify-center pt-3">
                  <p className="font-body text-body-muted">
                    Already have an account?  
                    <button 
                      type="button" onClick={() => { setIsLoginMode(true); setMessage(''); }}
                      className="ml-1 text-ink font-bold hover:underline transition-all"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-soft-stone border-t border-hairline mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-16 py-8 w-full max-w-full mx-auto">
          <div className="font-mono-label text-sm uppercase tracking-widest text-primary mb-3 md:mb-0">Lumina Systems</div>
          <div className="flex flex-wrap justify-center gap-6 mb-3 md:mb-0">
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Terms</a>
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Privacy</a>
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Catalog</a>
            <a className="font-caption text-sm text-body-muted hover:underline decoration-hairline" href="#">Support</a>
          </div>
          <div className="font-caption text-sm text-body-muted">© 2026 Lumina Systems. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}