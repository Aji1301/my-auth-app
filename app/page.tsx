'use client';
import { useState } from 'react';

export default function App() {
  // --- State Management ---
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle Login/Register
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Status Login
  
  // State Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // --- Fungsi Handle Submit (Login & Register) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = isLoginMode ? '/api/login' : '/api/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLoginMode) {
          // Jika Login berhasil, masuk ke Perpustakaan
          setIsAuthenticated(true);
        } else {
          // Jika Register berhasil, tampilkan pesan dan arahkan ke tab Login
          setMessage(data.message);
          setIsLoginMode(true);
          setPassword('');
        }
      } else {
        // Jika gagal (email salah/password kurang)
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  // --- TAMPILAN PERPUSTAKAAN (Tampil setelah Login) ---
  if (isAuthenticated) {
    const books = [
      { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200&h=300' },
      { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200&h=300' },
      { id: 3, title: 'Filosofi Teras', author: 'Henry Manampiring', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=300' },
      { id: 4, title: 'Hujan', author: 'Tere Liye', cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=200&h=300' },
    ];

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Perpustakaan Digital</h1>
              <p className="text-gray-500 mt-1">Selamat datang, {email}!</p>
            </div>
            <button 
              onClick={() => { setIsAuthenticated(false); setEmail(''); setPassword(''); }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                <img src={book.cover} alt={book.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{book.author}</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Baca Buku
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN LOGIN / REGISTER (Tampil jika belum Login) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoginMode ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {isLoginMode ? 'Akses koleksi perpustakaan lengkap' : 'Daftar sekarang untuk mulai membaca'}
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-4 text-sm text-center ${message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black"
              placeholder="nama@email.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black"
              placeholder={isLoginMode ? "••••••••" : "Minimal 6 karakter"}
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-70"
          >
            {loading ? 'Memproses...' : (isLoginMode ? 'Masuk' : 'Daftar Sekarang')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLoginMode ? 'Belum punya akun? ' : 'Sudah punya akun? '}
          <button 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setMessage('');
            }} 
            className="text-blue-600 font-bold hover:underline"
          >
            {isLoginMode ? 'Daftar di sini' : 'Masuk di sini'}
          </button>
        </div>
      </div>
    </div>
  );
}