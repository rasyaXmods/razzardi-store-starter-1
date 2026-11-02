export default function Home() {
  return (
    <main>
      <div className="shell">
        <nav className="nav">
          <a className="brand" href="/">RAZZARDI <span>STORE</span></a>
          <a className="nav-pill" href="#status">Status layanan ↗</a>
        </nav>
        <section className="hero">
          <div>
            <span className="eyebrow">✦ DIGITAL GAME STORE</span>
            <h1>Level up your game.<br/><span className="gradient">Top up tanpa ribet.</span></h1>
            <p>Tempat top-up game dengan pengalaman sederhana, tampilan modern, dan proses transaksi yang dirancang transparan.</p>
          </div>
          <aside className="hero-card">
            <div className="orb" aria-hidden="true">✧</div>
            <h3>RAZZARDI STORE</h3>
            <p>Gaming essentials, all in one place.</p>
          </aside>
        </section>
        <section className="section" id="status">
          <div className="section-head">
            <div><h2>Katalog game</h2><p>Produk hanya ditampilkan setelah sinkronisasi supplier terverifikasi.</p></div>
          </div>
          <div className="status">
            <strong>✦ Katalog sedang disiapkan</strong>
            <p>Integrasi API resmi VIP Reseller belum diverifikasi. Karena itu, kami belum menampilkan SKU atau harga yang belum terkonfirmasi. Pembayaran dan pemrosesan pesanan langsung tetap dinonaktifkan sampai pengujian integrasi selesai.</p>
          </div>
        </section>
        <footer className="footer"><span>© 2026 RAZZARDI STORE</span><span>Secure digital commerce foundation</span></footer>
      </div>
    </main>
  );
}
