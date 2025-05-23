import Link from "next/link";

import "@/styles/layout/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="copyright">
        &copy; {new Date().getFullYear()}{" "}
        <Link className="footer-link" href="https://www.1chooo.com">
          1chooo
        </Link>
      </div>
      <div className="footer-links">
        <Link
          className="footer-link"
          href="https://github.com/1chooo/1chooo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code
        </Link>
        <Link className="footer-link" href="/terms">
          Terms
        </Link>
        <Link
          className="footer-link"
          href="https://docs.1chooo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
