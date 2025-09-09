import Link from "next/link";
import Image from "next/image";
import "../styles/component/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" aria-label="Home" className="footer-logo">
            <Image src="/next.svg" alt="Logo" width={96} height={20} />
          </Link>
          <p className="footer-tagline">
            Sharing knowledge on the web, Next.js and MicroCMS.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer Navigation">
          <p className="footer-title">Explore</p>
          <ul>
            <li><Link href="/blog" title="Client-side pagination (fetch in browser)">Blog (CSR)</Link></li>
            <li><Link href="/blog_param" title="Query param pagination using ?page">Blog (?page)</Link></li>
            <li><Link href="/blog_page" title="Route segment pagination: /page/N">Blog (/page/N)</Link></li>
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>(c) {year} Keima Study Next.js - All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

