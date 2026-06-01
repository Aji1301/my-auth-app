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
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-margin-mobile py-8 md:py-10">
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
          <section className="lg:col-span-7 rounded-[28px] bg-tertiary-fixed border border-hairline overflow-hidden min-h-[560px] flex flex-col justify-between p-8 md:p-12 lg:p-14">
            <div className="max-w-[430px]">
              <span className="font-mono-label text-coral uppercase tracking-[0.34em] block mb-6">Member Login</span>
              <h1 className="font-product-display text-[56px] md:text-[72px] lg:text-[86px] leading-[0.95] tracking-[-0.04em] text-primary max-w-[340px]">
                Enter the archive.
              </h1>
              <p className="mt-6 font-body-large text-body-muted max-w-[220px] md:max-w-[260px] leading-[1.45]">
                Sign in to continue into your personal collection, saved titles, and curated reading workspace.
              </p>
            </div>

          </section>

          <section className="lg:col-span-5 rounded-[28px] bg-primary text-on-primary border border-primary overflow-hidden min-h-[560px] flex flex-col">
            <div className="p-8 md:p-10 lg:p-12 border-b border-white/10">
              <span className="font-mono-label text-[11px] uppercase tracking-[0.34em] text-inverse-on-surface/70 block mb-5">Access Notes</span>
              <h2 className="font-product-display text-[38px] md:text-[46px] leading-[0.98] tracking-[-0.04em] max-w-[240px]">
                Minimal, structured, and ready for enterprise reading.
              </h2>
            </div>

            <div className="flex-1 p-6 md:p-8 lg:p-10 space-y-4">
              {message && (
                <div className={`rounded-2xl border px-4 py-3 text-sm font-body ${message.includes('berhasil') ? 'bg-pale-green border-secondary-container text-on-secondary-container' : 'bg-error-container border-error-container text-on-error-container'}`}>
                  {message}
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block font-mono-label text-[11px] uppercase tracking-[0.28em] mb-2 text-inverse-on-surface/70" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="w-full rounded-xl border border-white/10 bg-white text-ink px-4 py-3 font-body placeholder:text-body-muted outline-none transition-colors focus:border-form-focus focus:ring-2 focus:ring-form-focus/20"
                      id="email"
                      placeholder="name@domain.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <label className="block font-mono-label text-[11px] uppercase tracking-[0.28em] text-inverse-on-surface/70" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white text-ink px-4 py-3 font-body placeholder:text-body-muted outline-none transition-colors focus:border-form-focus focus:ring-2 focus:ring-form-focus/20 pr-12"
                        id="password"
                        placeholder="••••••••"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-body-muted hover:text-ink transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                            <path d="M3.98 8.223A10.5 10.5 0 0 1 12 4.5c4.03 0 7.57 2.27 9.52 5.723a1 1 0 0 1 0 1.004A10.5 10.5 0 0 1 12 16.5c-4.03 0-7.57-2.27-9.52-5.723a1 1 0 0 1 0-1.004Z" />
                            <path d="m4 4 16 16" />
                            <circle cx="12" cy="11.5" r="2.5" />
                          </svg>
                        ) : (
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                            <path d="M2.5 12s3.5-7.5 9.5-7.5 9.5 7.5 9.5 7.5-3.5 7.5-9.5 7.5S2.5 12 2.5 12Z" />
                            <circle cx="12" cy="12" r="2.5" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    className="w-full py-3.5 rounded-full bg-canvas text-primary font-button hover:opacity-90 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 flex justify-center items-center uppercase tracking-widest text-[12px]"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Authenticating...' : 'Log In'}
                  </button>
                </form>
              </div>

              <p className="pt-2 text-center font-body text-sm text-inverse-on-surface/70">
                New to Lumina?{' '}
                <button onClick={() => { setIsLoginMode(false); setMessage(''); }} className="text-on-primary font-semibold hover:underline decoration-hairline">
                  Create an account
                </button>
              </p>
            </div>
          </section>
        </main>
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
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                          <path d="M3.98 8.223A10.5 10.5 0 0 1 12 4.5c4.03 0 7.57 2.27 9.52 5.723a1 1 0 0 1 0 1.004A10.5 10.5 0 0 1 12 16.5c-4.03 0-7.57-2.27-9.52-5.723a1 1 0 0 1 0-1.004Z" />
                          <path d="m4 4 16 16" />
                          <circle cx="12" cy="11.5" r="2.5" />
                        </svg>
                      ) : (
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                          <path d="M2.5 12s3.5-7.5 9.5-7.5 9.5 7.5 9.5 7.5-3.5 7.5-9.5 7.5S2.5 12 2.5 12Z" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      )}
                    </button>
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