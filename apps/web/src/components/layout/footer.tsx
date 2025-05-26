import Link from "next/link";

import "@/styles/layout/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="copyright">
        &copy; {new Date().getFullYear()}{" "}
        <Link className="footer-link" href="https://www.hoatepdev.com">
          hoatepdev
        </Link>
      </div>
      <div className="footer-links">
        <Link
          className="footer-link"
          href="https://github.com/hoatepdev/portfolio"
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
          href="https://docs.hoatepdev.com"
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
