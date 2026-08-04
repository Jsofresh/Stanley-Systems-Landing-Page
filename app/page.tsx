import Image from "next/image"
import type { CSSProperties } from "react"
import styles from "./coming-soon.module.css"

const heroImages = [
  { src: "/images/uploaded/homepage/hero-slideshow/hero-tech-van-outside.jpg", position: "72% center", mobilePosition: "73% center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-payment-confirmation-office.jpg", position: "71% center", mobilePosition: "70% center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-owner-monitoring-cashflow.jpg", position: "68% center", mobilePosition: "66% center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-office-dashboard-review.jpg", position: "70% center", mobilePosition: "68% center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-desktop-cashflow-view.jpg", position: "70% center", mobilePosition: "69% center" },
]

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.photoStack} aria-hidden="true">
        {heroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={styles.photo}
            style={{
              animationDelay: `${index * 5 - 1}s`,
              "--photo-position": image.position,
              "--photo-position-mobile": image.mobilePosition,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className={styles.wash} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.rail} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.brand} aria-label="Stanley Systems">
          <Image
            src="/images/stanley-systems-brand-mark.png"
            alt=""
            width={52}
            height={52}
            priority
            className={styles.brandIcon}
          />
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
