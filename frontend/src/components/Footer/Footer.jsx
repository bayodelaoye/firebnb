import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer id="footer-container">
      <p>Bayode Olaoye © 2024</p>
      <div className="github-linkedin-footer">
        <a
          href="https://github.com/bayodelaoye"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="footer-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/bayode-olaoye/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="footer-icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
