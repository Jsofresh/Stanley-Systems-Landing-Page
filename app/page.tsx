import styles from "./coming-soon.module.css"

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.photo} aria-hidden="true" />
      <div className={styles.wash} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.rail} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.brand} aria-label="Stanley Systems">
          <span className={styles.mark} aria-hidden="true" />
          <span>Stanley Systems</span>
        </div>

        <section className={styles.hero} aria-labelledby="coming-soon-title">
          <h1 id="coming-soon-title">
            A connected AI office is <span>coming.</span>
          </h1>
          <p className={styles.intro}>
            Stanley Systems is building a simpler way for service businesses to move office work faster across the tools and team they already use.
          </p>
          <p className={styles.promise}>More jobs processed. Cleaner records. Faster follow-up. Same office team.</p>
          <a
            className={styles.contact}
            href="mailto:Jaden@Stanley-Systems.com"
            aria-label="Email Jaden at Jaden@Stanley-Systems.com"
          >
            <span>Jaden@Stanley-Systems.com</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </section>

        <footer className={styles.footer}>
          <span><strong>Stanley Systems</strong> · AI office workflows for service businesses</span>
          <span>Site update in progress</span>
        </footer>
      </div>
    </main>
  )
}
