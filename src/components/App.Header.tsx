import Image from "next/image";
import Link from "next/link";
import "../styles/component/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Home">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={26}
            priority
          />
        </Link>
        <nav className="nav" aria-label="Primary Navigation">
          <ul>
            <li>
              <Link href="/blog" title="Client-side pagination (fetch in browser)">Blog (CSR)</Link>
            </li>
            <li>
              <Link href="/blog_param" title="Query param pagination using ?page">Blog (?page)</Link>
            </li>
            <li>
              <Link href="/blog_page" title="Route segment pagination: /page/N">Blog (/page/N)</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
