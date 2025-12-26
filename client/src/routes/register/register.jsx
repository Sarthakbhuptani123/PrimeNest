import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { motion } from "framer-motion";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      {/* Background */}
      <div className="bg-image"></div>

      <div className="formContainer">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-card"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Create Account
          </motion.h1>

          <motion.div className="inputs"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
          >
            <motion.input variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} name="username" type="text" placeholder="Username" />
            <motion.input variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} name="email" type="text" placeholder="Email" />
            <motion.input variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} name="password" type="password" placeholder="Password" />
            <motion.button
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </motion.div>

          {error && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error">{error}</motion.span>}
          <Link to="/login">Do you have an account? <b>Login</b></Link>
        </motion.form>
      </div>

      <div className="imgContainer">
        <div className="text-overlay">
          <h2>Join the<br />Elite.</h2>
        </div>
      </div>
    </div>
  );
}

export default Register;
