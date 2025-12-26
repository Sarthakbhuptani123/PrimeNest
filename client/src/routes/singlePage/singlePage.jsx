import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, Suspense } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBath, FaBed, FaRulerCombined, FaBus, FaUtensils, FaSchool, FaPaw, FaTools, FaDonate, FaCommentDots, FaBookmark, FaCalendarAlt } from "react-icons/fa";
import VisitModal from "../../components/visitModal/VisitModal";
import VirtualTour from "../../components/three/VirtualTour";
import EMICalculator from "../../components/emiCalculator/EMICalculator";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser) return navigate("/login");
    if (currentUser.id === post.user.id) {
      alert("You cannot send a message to your own listing!");
      return;
    }
    try {
      const res = await apiRequest.post("/chats", { receiverId: post.user.id });
      navigate("/profile", { state: { openChatId: res.data.id } });
    } catch (err) {
      console.log(err);
      alert("Failed to start chat. Please try again.");
    }
  };

  return (
    <motion.div
      className="singlePage ultra-modern"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-bg">
          <Slider images={post.images} />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-left"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="luxury-badge">
              <span className="status">
                {post.type === "buy" ? "FOR SALE" : "FOR RENT"}
              </span>
              <span className="divider">|</span>
              <span className="type">{post.property.toUpperCase()}</span>
            </div>
            <h1>{post.title}</h1>
            <div className="hero-meta">
              <div className="location-box">
                <FaMapMarkerAlt className="pin" />
                <div className="t">
                  <span className="addr">{post.address}</span>
                  <span className="city">{post.city}</span>
                </div>
              </div>
              <div className="hero-specs-pill">
                <div className="pill-item"><FaBed /> {post.bedroom} BD</div>
                <div className="pill-item"><FaBath /> {post.bathroom} BA</div>
                <div className="pill-item"><FaRulerCombined /> {post.postDetail.size} SQFT</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="architect-card">
              <div className="card-header">
                <div className="verified-badge">
                  <div className="dot"></div>
                  VERIFIED ASSET
                </div>
                <h3>Investment Value</h3>
              </div>

              <div className="price-display">
                <div className="main-price">
                  <span className="unit">₹</span>
                  <span className="num">{post.price.toLocaleString()}</span>
                </div>
                {post.type === "rent" && <span className="recurring">Per Fiscal Month</span>}
              </div>

              <div className="cta-group">
                <button onClick={() => {
                  if (!currentUser) return navigate("/login");
                  setVisitModalOpen(true);
                }} className="visit-trigger">
                  <FaCalendarAlt />
                  <div className="btn-text">
                    <span>Schedule Visit</span>
                    <p>Book private walkthrough</p>
                  </div>
                </button>

                <div className="action-row">
                  <button onClick={handleSendMessage} className="alt-btn">
                    <FaCommentDots /> Inquiry
                  </button>
                  <button onClick={handleSave} className={`alt-btn save ${saved ? 'active' : ''}`}>
                    <FaBookmark /> {saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content-layout">
        <div className="left-side">
          {/* Virtual Tour Section */}
          {post.images && post.images.length > 0 && (
            <motion.section
              className="tour-section section-box"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-title">
                <div className="line"></div>
                <h2>Immersive 3D Experience</h2>
              </div>
              <div className="tour-wrapper">
                <Suspense fallback={<div className="loader">Loading 3D Scene...</div>}>
                  <VirtualTour imageUrl={post.images[0]} />
                </Suspense>
              </div>
            </motion.section>
          )}

          {/* Description Section */}
          <motion.section
            className="description-section section-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="section-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="line"></div>
              <h2>About this Property</h2>
            </motion.div>

            <motion.div
              className="desc-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></motion.div>
          </motion.section>

          {/* Location Map */}
          <motion.section
            className="map-section section-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3>Location</h3>
            <div className="map-holder">
              <Map items={[post]} />
            </div>
          </motion.section>
        </div>

        <div className="right-side">
          {/* Owner Card (Listing Agent) */}
          <motion.div
            className="owner-card section-box"
            initial={{ opacity: 0, y: -30 }} // Slight slide down from top
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="o-info">
              <img src={post.user.avatar || "/noavatar.jpg"} alt="" />
              <div className="o-text">
                <span className="o-name">{post.user.username}</span>
                <p>Listing Agent</p>
              </div>
            </div>
            {currentUser && currentUser.id === post.user.id && (
              <button onClick={() => navigate(`/edit/${post.id}`)} className="edit-listing">
                Edit Listing
              </button>
            )}
          </motion.div>

          {/* Mortgage Calculator */}
          <EMICalculator price={post.price} />

          {/* Detailed Features */}
          <motion.section
            className="features-section section-box"
            initial={{ opacity: 0, x: 50 }} // Slide in from right
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Property Features</h3>
            <div className="features-grid">
              {[
                { icon: <FaTools />, label: "Utilities", val: post.postDetail.utilities === "owner" ? "Owner Pay" : "Tenant Pay" },
                { icon: <FaPaw />, label: "Pets", val: post.postDetail.pet === "allowed" ? "Allowed" : "Restricted" },
                { icon: <FaDonate />, label: "Income", val: post.postDetail.income }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="f-item"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {item.icon}
                  <div className="t">
                    <span>{item.label}</span>
                    <p>{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Proximity Section */}
          <motion.section
            className="proximity-section section-box"
            initial={{ opacity: 0, x: 50 }} // Slide in from right
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h3>Nearby Places</h3>
            <div className="prox-grid">
              {[
                { icon: <FaSchool />, label: "School", val: `${post.postDetail.school}m` },
                { icon: <FaBus />, label: "Transport", val: `${post.postDetail.bus}m` },
                { icon: <FaUtensils />, label: "Dining", val: `${post.postDetail.restaurant}m` }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <p>{item.val}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {currentUser && (
        <VisitModal
          isOpen={visitModalOpen}
          onClose={() => setVisitModalOpen(false)}
          postId={post.id}
        />
      )}
    </motion.div>
  );
}

export default SinglePage;
