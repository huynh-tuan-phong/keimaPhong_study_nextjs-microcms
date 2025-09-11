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
    </header>
  );
};

export default Header;
