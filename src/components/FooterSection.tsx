import Link from 'next/link';
import { SITE } from '@/lib/constants';
import styles from './FooterSection.module.css';

const socialLinks = [
    { label: 'Email', href: `mailto:${SITE.email}` },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

export default function FooterSection() {
    return (
        <footer className={styles.footer} id="contact-footer">
            <div className={styles.statement}>
                <span className={styles.label}>From pixels to purpose.</span>
                <h2>Strong brands need structured presence.</h2>
                <p dir="rtl">الوضوح قبل الشكل. الاتساق يبني الثقة.</p>
            </div>

            <div className={styles.grid}>
                <div>
                    <Link href="/" className={styles.name}>{SITE.name}</Link>
                    <p className={styles.position}>{SITE.title}. Visual systems for brands that need to look as valuable as they are.</p>
                </div>

                <nav className={styles.links} aria-label="Footer navigation">
                    <Link href="/work">Work</Link>
                    <Link href="/case-studies">Case Studies</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/book">Start Project</Link>
                </nav>

                <div className={styles.socials}>
                    {socialLinks.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            <div className={styles.bottom}>
                <span>© {new Date().getFullYear()} Hazem Abdelbaset</span>
                <span>Brand-led visual systems</span>
            </div>
        </footer>
    );
}
