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
            <li>
              <Link
                href="/blog"
                title="Khung trang render trên server; danh sách bài viết render ở phía trình duyệt; đồng bộ tham số ?page trên URL để phân trang."
              >
                Hybrid CSR
              </Link>
            </li>
            <li>
              <Link
                href="/blog_client"
                title="Trang chỉ render ở phía trình duyệt; dữ liệu và phân trang được tải sau khi trang tải; không đồng bộ tham số ?page trên URL."
              >
                Only CSR
              </Link>
            </li>
            <li>
              <Link
                href="/blog_param"
                title="Trang render trên server (tạo tĩnh theo chu kỳ); phân trang bằng tham số truy vấn ?page."
              >
                ISR (?page)
              </Link>
            </li>
            <li>
              <Link
                href="/blog_page"
                title="Trang render trên server (tạo tĩnh theo chu kỳ); phân trang bằng phân đoạn đường dẫn /page/N."
              >
                ISR (/page/N)
              </Link>
            </li>
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

