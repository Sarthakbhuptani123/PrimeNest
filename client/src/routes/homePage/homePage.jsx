import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [features, setFeatures] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await apiRequest.get("/posts");
        // Sort by price descending and take top 3
        const sorted = res.data.sort((a, b) => b.price - a.price).slice(0, 3);
        setFeatures(sorted);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeatures();
  }, []);

  useEffect(() => {
    // Handle hash scrolling
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const stagger = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="homePage-v14">
      {/* --- HERO SECTION --- */}
      <section className="hero-clean">
        <div className="container">
          <div className="hero-grid">
            {/* LEFT CONTENT */}
            <motion.div
              className="content-side"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="prestige-badge"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <span className="dot"></span>
                THE ZENITH EXPERIENCE
              </motion.div>

              <div className="kicker">Modern Real Estate</div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Find a space that <br />
                <span className="gold-text">speaks to you.</span>
              </motion.h1>

              <div className="hero-quote-box">
                <blockquote>
                  "Home is where your story begins, framed by the art of architecture."
                </blockquote>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                We collaborate with visionary architects and designers to bring you
                a curated selection of homes that are as unique as your story.
              </motion.p>

              <motion.div
                className="search-box-wrap"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
              >
                <SearchBar />
              </motion.div>

              <div className="hero-stats">
                {[
                  { val: "16+", lab: "Years Exp" },
                  { val: "200+", lab: "Awards Won" },
                  { val: "1200+", lab: "Elite Assets" }
                ].map((s, i) => (
                  <motion.div
                    className="stat"
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + (i * 0.2), duration: 0.8 }}
                  >
                    <span className="val">{s.val}</span>
                    <span className="lab">{s.lab}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* --- TAILORED EXPERIENCE (DETAILED) --- */}
      <section className="services detailed" id="about">
        <div className="container">
          <div className="section-head">
            <motion.h2 {...fadeInUp}>Tailored Experience</motion.h2>
            <motion.p {...fadeInUp}>A bespoke journey designed for the architectural enthusiast.</motion.p>
          </div>

          <motion.div className="services-grid-v2" variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {[
              {
                num: "01",
                title: "Curated Selection",
                desc: "Every listing is hand-picked for its architectural integrity, historical value, and prime location.",
                details: ["Architectural Audits", "Location Scarcity", "Heritage Protection"]
              },
              {
                num: "02",
                title: "Global Insight",
                desc: "Deep market analysis and global trends monitoring to ensure your investment is sound and future-proof.",
                details: ["ROI Projection", "Trend Forecasting", "Portfolio Diversification"]
              },
              {
                num: "03",
                title: "Virtual Concierge",
                desc: "Experience seamless property management and immersive 4K virtual viewings from anywhere in the world.",
                details: ["Personal Advisor", "24/7 Priority Support", "Digital Documentation"]
              },
              {
                num: "04",
                title: "Legacy Planning",
                desc: "We look beyond the sale to help you plan the future of your assets and their long-term impact.",
                details: ["Asset Management", "Tax Optimization", "Future Projections"]
              }
            ].map((service, idx) => (
              <motion.div
                className="service-card-v2"
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="card-top">
                  <span className="s-num">{service.num}</span>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.desc}</p>
                <ul className="detail-list">
                  {service.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- FEATURED MODERN LUXURY --- */}
      <section className="featured-properties">
        <div className="container">
          <div className="section-head">
            <motion.h2 {...fadeInUp}>Modern Luxury Highlights</motion.h2>
            <motion.p {...fadeInUp}>Curated residences defined by elegance and innovation.</motion.p>
          </div>

          <motion.div
            className="featured-grid"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {features.map((item) => (
              <motion.div
                className="feat-card"
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="img-holder">
                  <img src={item.images[0]} alt={item.title} />
                  <div className="price-tag">₹ {item.price}</div>
                </div>
                <div className="text-content">
                  <h3>{item.title}</h3>
                  <p>{item.city}</p>
                  <Link to={`/${item.id}`} className="view-btn">View Details</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- ELITE AGENTS --- */}
      <section className="agents-v14" id="agents">
        <div className="container">
          <div className="section-head">
            <motion.h2 {...fadeInUp}>Elite Representatives</motion.h2>
            <motion.p {...fadeInUp}>Meet the visionaries behind the portfolio.</motion.p>
          </div>

          <motion.div className="agents-grid" variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {[
              { name: "Alara Vane", role: "Senior Architect", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { name: "Dorian Sterling", role: "Head of Sales", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { name: "Elara Gold", role: "Design Director", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { name: "Julian Thorne", role: "Global Advisor", img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ].map((agent, i) => (
              <motion.div className="agent-card" key={i} variants={fadeInUp}>
                <div className="img-box">
                  <img src={agent.img} alt={agent.name} />
                  <div className="overlay">
                    <button>Contact Agent</button>
                  </div>
                </div>
                <div className="info">
                  <h3>{agent.name}</h3>
                  <span>{agent.role}</span>
                  <div className="line"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="cta-minimal">
        <div className="container">
          <motion.div className="cta-box" {...fadeInUp}>
            <h2>Ready to find your legacy?</h2>
            <p>Join over 10,000+ elite members finding their perfect space today.</p>
            <div className="cta-btns">
              <Link to="/list" className="btn-dark">Get Started</Link>
              <Link to="/list" className="btn-text">View Listings &rarr;</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div >
  );
}

export default HomePage;
