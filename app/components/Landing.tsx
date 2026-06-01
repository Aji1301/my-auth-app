'use client';

type Props = {
    onLogout: () => void;
    displayName?: string;
    };

    const capabilityCards = [
    {
        title: 'Archive Search',
        description: 'Precision search across the collection with instant filtering by title, ISBN, or author.',
        accent: 'bg-pale-blue',
    },
    {
        title: 'Research Table',
        description: 'Compare readings side by side with clear editorial spacing and minimal cognitive noise.',
        accent: 'bg-pale-green',
    },
    {
        title: 'Request Access',
        description: 'Route members through a streamlined access workflow built for focused reading teams.',
        accent: 'bg-surface-container-high',
    },
    ];

    const featured = [
    { title: 'Neural Structures', author: 'Dr. Helena Vance', img: 'https://images.unsplash.com/photo-1629196914210-6c9ab0bbf0d8?auto=format&fit=crop&q=80&w=600' },
    { title: 'Modern Minimal', author: 'Soren K. Larsen', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600' },
    { title: 'Brutalism Today', author: 'Marcus Thorne', img: 'https://images.unsplash.com/photo-1621360841013-c76831f12282?auto=format&fit=crop&q=80&w=600' },
    ];

    const catalog = [
    { isbn: '978-3-16-148410-0', title: 'The Architecture of Flux', author: 'Elara M. Vance', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=700' },
    { isbn: '978-0-12-345678-9', title: 'Algorithmic Ethics', author: 'Julian Rivers', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=700' },
    { isbn: '978-1-23-456789-0', title: 'Spatial Intelligence', author: 'Nia Patel', img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=700' },
    { isbn: '978-5-67-890123-4', title: 'Cognitive Interfaces', author: 'Thomas Chen', img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=700' },
    { isbn: '978-4-56-789012-3', title: 'Systems of Power', author: 'Sarah Jenkins', img: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=700' },
    { isbn: '978-2-34-567890-1', title: 'Liquid Logic', author: 'David Aris', img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=700' },
    ];

    export default function Landing({ onLogout, displayName }: Props) {
    return (
        <div className="min-h-screen bg-background text-on-background">
        <div className="bg-cohere-black text-on-dark h-9 flex items-center justify-center px-margin-mobile md:px-margin-desktop text-micro tracking-wide">
            <span className="opacity-90">Lumina Library member interface</span>
        </div>

        <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur border-b border-hairline">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-margin-mobile md:px-margin-desktop py-4">
            <div className="flex items-center gap-8">
                <span className="font-product-display text-feature-heading md:text-card-heading tracking-tight text-primary">Lumina Library</span>
                <div className="hidden md:flex items-center gap-6 text-body">
                <a className="text-primary border-b-2 border-primary pb-1" href="#hero">Browse</a>
                <a className="text-muted hover:text-primary transition-colors" href="#catalog">Catalog</a>
                <a className="text-muted hover:text-primary transition-colors" href="#access">Access</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center rounded-xs border border-hairline bg-soft-stone px-3 py-2 focus-within:border-form-focus transition-colors">
                <span className="material-symbols-outlined mr-2 text-base text-muted">search</span>
                <input className="w-52 bg-transparent outline-none text-micro font-mono-label placeholder:text-muted" placeholder="Search archive..." type="text" />
                </div>

                <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-2 rounded-full border border-hairline px-3 py-2 hover:border-primary hover:text-primary transition-colors"
                title="Logout"
                >
                <span className="hidden md:block text-sm text-body-muted">Welcome, {displayName}</span>
                <span className="material-symbols-outlined text-2xl">account_circle</span>
                </button>
            </div>
            </nav>
        </header>

        <main>
            <section id="hero" className="px-margin-mobile md:px-margin-desktop py-section bg-canvas overflow-hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                <span className="mb-4 block font-mono-label text-coral uppercase tracking-[0.28em]">System Interface v2.4</span>
                <h1 className="font-hero-display text-hero-display-mobile md:text-hero-display leading-none text-primary max-w-xl">
                    Your Collective Knowledge
                </h1>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1 max-w-md rounded-xs border border-hairline bg-canvas focus-within:border-form-focus transition-colors">
                    <input
                        className="w-full bg-transparent px-4 py-4 font-mono-label text-micro outline-none"
                        placeholder="QUERY_TITLE_OR_ISBN"
                        type="text"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-label text-[10px] text-muted">SEARCH_PARAM</span>
                    </div>
                    <button className="rounded-pill bg-primary px-8 py-4 font-button text-on-primary transition-opacity hover:opacity-90">
                    Execute Search
                    </button>
                </div>
                </div>

                <div className="relative hidden lg:block">
                <div className="overflow-hidden rounded-lg bg-surface-container-highest shadow-sm" style={{ height: '540px' }}>
                    <img
                    alt="Modern library interior"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzlRxYO2nDnNQNgF41Yn28dTwoeCHjEsyUskh4w2SNJbO7kUrDT7VrrhGoWlw7NMDdtIVgXIAW6h7zAL9XpGEvQWrFNnt0ice0ZUm_02M7Ew833o_KkYljij_s1-dOU2ZtC2JTTvKvAI0s_0RIAr8vDj51HkoVBrNXfuYh5SsJMxPZ_UIYPMXIrDuayj3NNzNg_ujXwwIe-TjpknKumBgx0T_Lc5pJxVIPAeZ9a_ipJdB6u-hl9CXOF1fZ3smUOnB4lb5NO2qxisUXw"
                    />
                </div>
                </div>
            </div>
            </section>

            <section className="border-y border-hairline bg-canvas">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
                {['ENTERPRISE ARCHIVE', 'EDITORIAL SYSTEM', 'MEMBER ACCESS', 'RESEARCH TABLE'].map((item) => (
                <div key={item} className="flex items-center justify-center px-4 py-5 text-center text-caption text-muted">
                    {item}
                </div>
                ))}
            </div>
            </section>

            <section className="bg-deep-green py-section text-on-dark">
            <div className="mx-auto max-w-7xl px-margin-mobile md:px-margin-desktop">
                <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="font-section-heading text-on-dark">Featured Selection</h2>
                    <p className="mt-3 max-w-xl text-body text-on-dark/80">
                    Curated acquisitions from the Lumina archive, selected for their contribution to the evolving digital collective.
                    </p>
                </div>
                <a className="font-mono-label text-micro underline decoration-hairline hover:opacity-80" href="#catalog">
                    EXPLORE_FULL_ARCHIVE
                </a>
                </div>

                <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
                {featured.map((book) => (
                    <article key={book.title} className="rounded-lg bg-canvas p-6 text-ink shadow-sm">
                    <img alt={book.title} className="aspect-2/3 w-full rounded-sm object-cover" src={book.img} />
                    <div className="mt-6">
                        <h3 className="font-card-heading text-[26px] leading-tight">{book.title}</h3>
                        <p className="mt-2 text-body text-body-muted">{book.author}</p>
                        <button className="mt-5 rounded-pill bg-primary px-6 py-3 font-button text-on-primary hover:opacity-90">
                        View Details
                        </button>
                    </div>
                    </article>
                ))}
                </div>
            </div>
            </section>

            <section id="access" className="bg-canvas px-margin-mobile md:px-margin-desktop py-section">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 grid gap-6 md:grid-cols-3">
                {capabilityCards.map((card) => (
                    <article key={card.title} className={`rounded-xs border border-hairline p-6 ${card.accent}`}>
                    <span className="mb-3 block font-mono-label text-micro text-coral uppercase tracking-[0.24em]">Capability</span>
                    <h3 className="font-feature-heading text-feature-heading text-primary">{card.title}</h3>
                    <p className="mt-3 text-body text-body-muted">{card.description}</p>
                    </article>
                ))}
                </div>

                <div className="mb-12 flex items-end justify-between gap-4">
                <h2 id="catalog" className="font-section-heading text-primary">Library Catalog</h2>
                <div className="flex items-center gap-3">
                    <span className="font-mono-label text-micro text-muted">SORT_BY:</span>
                    <select className="bg-transparent font-mono-label text-micro text-primary outline-none cursor-pointer">
                    <option>ALPHABETICAL</option>
                    <option>DATE_ADDED</option>
                    <option>RELEVANCE</option>
                    </select>
                </div>
                </div>

                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {catalog.map((item) => (
                    <article key={item.isbn} className="group border-b border-hairline pb-8 transition-transform duration-300 hover:-translate-y-1">
                    <img alt={item.title} className="mb-6 aspect-4/3 w-full rounded-sm object-cover" src={item.img} />
                    <span className="mb-2 block font-mono-label text-micro text-coral">ISBN: {item.isbn}</span>
                    <h3 className="font-card-heading text-primary">{item.title}</h3>
                    <p className="mt-2 mb-6 text-body text-body-muted">{item.author}</p>
                    <button className="rounded-pill bg-primary px-8 py-3 font-button text-on-primary hover:opacity-90">
                        View Details
                    </button>
                    </article>
                ))}
                </div>

                <div className="mt-section flex justify-center">
                <button className="rounded-xs border border-hairline px-12 py-4 font-button uppercase tracking-[0.2em] text-primary hover:bg-soft-stone transition-colors">
                    Load More Entries
                </button>
                </div>
            </div>
            </section>
        </main>

        <footer className="border-t border-hairline bg-soft-stone">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-margin-mobile md:flex-row md:items-center md:px-margin-desktop py-section">
            <div>
                <p className="font-mono-label text-micro uppercase tracking-[0.28em] text-ink">LUMINA SYSTEMS</p>
                <p className="mt-2 text-caption text-body-muted">© 2026 Lumina Systems. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-8 text-caption text-body-muted">
                <a className="hover:underline" href="#">Terms</a>
                <a className="hover:underline" href="#">Privacy</a>
                <a className="hover:underline" href="#">Catalog</a>
                <a className="hover:underline" href="#">Support</a>
            </div>
            </div>
        </footer>
        </div>
    );
}
