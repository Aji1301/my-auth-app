'use client';
import { useEffect } from 'react';

type Props = {
  onLogout: () => void;
  displayName?: string;
};

export default function Landing({ onLogout, displayName }: Props) {
  useEffect(() => {
    // hover lift
    const cards = Array.from(document.querySelectorAll('.group')) as HTMLElement[];
    cards.forEach(card => {
      const enter = () => {
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)';
      };
      const leave = () => { card.style.transform = 'translateY(0px)'; };
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
    });

    const searchInput = document.querySelector('input[placeholder="QUERY_TITLE_OR_ISBN"]') as HTMLElement | null;
    if (searchInput && searchInput.parentElement) {
      const focus = () => searchInput.parentElement!.classList.add('border-form-focus');
      const blur = () => searchInput.parentElement!.classList.remove('border-form-focus');
      searchInput.addEventListener('focus', focus);
      searchInput.addEventListener('blur', blur);
    }

    return () => {
      cards.forEach(card => {
        card.replaceWith(card.cloneNode(true));
      });
      if (searchInput && searchInput.parentElement) {
        searchInput.parentElement.classList.remove('border-form-focus');
      }
    };
  }, []);

  return (
    <div className="bg-canvas text-ink font-body min-h-screen">
      <header className="bg-canvas border-b border-hairline sticky top-0 z-50 w-full">
        <nav className="flex justify-between items-center px-margin-desktop py-4 w-full max-w-full mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-product-display text-3xl tracking-tighter text-primary">Lumina Library</span>
            <div className="hidden md:flex gap-6 items-center">
              <a className="text-primary border-b-2 border-primary pb-1 font-body text-body" href="#">Browse</a>
              <a className="text-muted hover:text-primary transition-colors font-body text-body" href="#">My Books</a>
              <a className="text-muted hover:text-primary transition-colors font-body text-body" href="#">Wishlist</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-soft-stone rounded-xs px-3 py-1 border border-hairline">
              <span className="material-symbols-outlined text-sm mr-2">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-micro font-mono-label w-48 outline-none" placeholder="QUERY_TITLE_OR_ISBN" type="text" />
            </div>
            <div className="flex items-center gap-2 group relative cursor-pointer" onClick={onLogout} title="Logout">
              <span className="hidden md:block font-body text-sm text-body-muted group-hover:text-coral transition-colors">
                Welcome, {displayName}
              </span>
              <button className="material-symbols-outlined text-primary text-2xl group-hover:text-coral transition-colors">
                account_circle
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="px-margin-desktop py-section bg-canvas overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono-label text-mono-label text-coral uppercase tracking-widest mb-4 block">System Interface v2.4</span>
              <h1 className="font-product-display text-product-display leading-tight mb-8">Your Collective Knowledge</h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow max-w-md">
                  <input className="w-full px-4 py-4 font-mono-label text-micro border border-hairline focus:border-form-focus focus:ring-0 rounded-none bg-canvas" placeholder="QUERY_TITLE_OR_ISBN" type="text" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-label text-[10px] text-muted">SEARCH_PARAM</span>
                </div>
                <button className="bg-primary text-on-primary font-button px-8 py-4 rounded-full hover:opacity-80 transition-all duration-200">Execute Search</button>
              </div>
            </div>
            <div className="relative hidden lg:block h-[500px] overflow-hidden rounded-lg">
              <img alt="Modern Library" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1000" />
            </div>
          </div>
        </section>

        <section className="bg-secondary py-section">
          <div className="px-margin-desktop max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-section-heading text-on-primary mb-2">Featured Selection</h2>
                <p className="text-on-primary opacity-80 font-body max-w-md">Curated acquisitions from the Lumina archive, selected for their contribution to the evolving digital collective.</p>
              </div>
              <a className="font-mono-label text-mono-label text-on-primary underline decoration-hairline hover:opacity-70 transition-opacity" href="#">EXPLORE_FULL_ARCHIVE</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* three sample cards */}
              {[
                { title: 'Neural Structures', author: 'Dr. Helena Vance', img: 'https://images.unsplash.com/photo-1629196914210-6c9ab0bbf0d8?auto=format&fit=crop&q=80&w=400' },
                { title: 'Modern Minimal', author: 'Soren K. Larsen', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400' },
                { title: 'Brutalism Today', author: 'Marcus Thorne', img: 'https://images.unsplash.com/photo-1621360841013-c76831f12282?auto=format&fit=crop&q=80&w=400' }
              ].map((book, i) => (
                <div key={i} className="bg-canvas p-6 rounded-lg border border-hairline flex flex-col gap-6 group">
                  <img alt={book.title} className="aspect-[2/3] w-full object-cover rounded-[8px]" src={book.img} />
                  <div>
                    <h3 className="font-card-heading text-card-heading mb-1">{book.title}</h3>
                    <p className="font-body text-body text-body-muted mb-4">{book.author}</p>
                    <button className="bg-primary text-on-primary font-button px-6 py-3 rounded-full w-fit hover:opacity-80 transition-all">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-margin-desktop py-section bg-canvas">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-section-heading text-primary">Library Catalog</h2>
              <div className="flex gap-4 items-center">
                <span className="font-mono-label text-micro text-muted">SORT_BY:</span>
                <select className="bg-transparent border-none font-mono-label text-micro focus:ring-0 text-primary cursor-pointer">
                  <option>ALPHABETICAL</option>
                  <option>DATE_ADDED</option>
                  <option>RELEVANCE</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="group border-b border-hairline pb-8 transition-opacity hover:opacity-90 cursor-pointer">
                  <img alt="Book" className="w-full aspect-[4/3] object-cover rounded-[8px] mb-6" src={`https://picsum.photos/seed/${i}/600/400`} />
                  <span className="font-mono-label text-micro text-coral mb-2 block">ISBN: 978-3-16-148410-0</span>
                  <h4 className="font-card-heading text-primary mb-2">Sample Title {i}</h4>
                  <p className="font-body text-body-muted mb-6">Author Name</p>
                  <button className="bg-primary text-on-primary font-button px-8 py-3 rounded-full hover:bg-opacity-80">View Details</button>
                </div>
              ))}
            </div>

            <div className="mt-section flex justify-center">
              <button className="font-button text-ink border border-hairline rounded-xs px-12 py-4 hover:bg-soft-stone transition-colors uppercase tracking-widest">Load More Entries</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-soft-stone border-t border-hairline w-full">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-section w-full max-w-full mx-auto">
          <div className="flex flex-col gap-2 mb-8 md:mb-0">
            <span className="font-mono-label text-mono-label uppercase tracking-widest text-ink">LUMINA SYSTEMS</span>
            <span className="font-micro text-micro text-body-muted">© 2026 Lumina Systems. All rights reserved.</span>
          </div>
          <div className="flex gap-8">
            <a className="font-micro text-micro text-body-muted hover:underline decoration-hairline" href="#">Terms</a>
            <a className="font-micro text-micro text-body-muted hover:underline decoration-hairline" href="#">Privacy</a>
            <a className="font-micro text-micro text-body-muted hover:underline decoration-hairline" href="#">Catalog</a>
            <a className="font-micro text-micro text-body-muted hover:underline decoration-hairline" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
