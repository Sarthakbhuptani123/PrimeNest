import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { FaBars, FaTimes } from "react-icons/fa";
import apiRequest from "../../lib/apiRequest";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar-v14">
      <div className="left">
        <Link to="/" className="logo">
          <span className="dot"></span>
          <span style={{ color: "gold" }}>PrimeNest</span>
        </Link>
      </div>

      <div className="center">
        <Link to="/">Home</Link>
        <Link to="/list">Collection</Link>
        <Link to="/#about">Philosophy</Link>
        <Link to="/#agents">Agents</Link>
      </div>

      <div className="right">

        {currentUser ? (
          <div className="user" style={{ position: 'relative' }}>
            <div
              className="profile"
              onClick={() => setProfileOpen(!profileOpen)}
              style={{ cursor: 'pointer' }}
            >
              {number > 0 && <div className="notification">{number}</div>}
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
              <span>{currentUser.username}</span>
            </div>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  className="profile-dropdown glass-panel"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="info">
                    <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
                    <div className="text">
                      <span className="name">{currentUser.username}</span>
                      <span className="email">{currentUser.email}</span>
                    </div>
                  </div>
                  <div className="links">
                    <Link to="/profile" onClick={() => setProfileOpen(false)}>Dashboard</Link>
                    <Link to="/profile/update" onClick={() => setProfileOpen(false)}>Update Profile</Link>
                    <button onClick={handleLogout}>Sign Out</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="login-btn">Sign In</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </div>
        )}

        <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
          <motion.div
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <FaTimes /> : <FaBars />}
          </motion.div>
        </div>
      </div>

      <div className={open ? "menu active" : "menu"}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/list" onClick={() => setOpen(false)}>Collection</Link>
        <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
        {!currentUser && (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>Sign In</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
