import "./footer.scss";
import { Link } from "react-router-dom";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/* TOP */}
                <div className="footer-top">
                    {/* BRAND / PROFILE */}
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <span>PrimeNest</span>
                        </Link>

                        <p>
                            Crafted by <strong>Sarthak</strong> — a full-stack developer
                            building modern, scalable real-estate platforms with
                            performance, design, and user experience at the core.
                        </p>

                        <div className="socials">
                            <a
                                href="https://github.com/Sarthakbhuptani123"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/sarthak-bhuptani/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                            <a href="mailto:mrsarthak825@gmail.com">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="footer-links">
                        <div className="link-col">
                            <h4>Explore</h4>
                            <Link to="/list">Buy Properties</Link>
                            <Link to="/list">Rent Properties</Link>
                            <Link to="/list">New Listings</Link>
                            <Link to="/list">Featured Homes</Link>
                        </div>

                        <div className="link-col">
                            <h4>Project</h4>
                            <Link to="/">About PrimeNest</Link>
                            <Link to="/">Tech Stack</Link>
                            <Link to="/">Roadmap</Link>
                            <Link to="/">Contact</Link>
                        </div>

                        <div className="link-col">
                            <h4>Contact</h4>
                            <span>
                                <FaPhoneAlt /> +91 74360 59291
                            </span>
                            <span>
                                <FaEnvelope /> mrsarthak825@gmail.com
                            </span>
                            <span>
                                <FaMapMarkerAlt /> Gandhinagar, Gujarat, India
                            </span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="footer-bottom">
                    <span>
                        © {new Date().getFullYear()} PrimeNest — Built & Designed by Sarthak
                    </span>

                    <div className="legal">
                        <Link to="/">Privacy Policy</Link>
                        <Link to="/">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
