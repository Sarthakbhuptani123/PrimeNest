import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { motion } from "framer-motion";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0]
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <motion.div
      className="profileUpdatePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="update-container">
        <motion.div
          className="form-wrapper glass-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="header">
            <h1>Edit Profile</h1>
            <p>Update your personal details and avatar.</p>
          </div>

          <div className="content-split">
            <form onSubmit={handleSubmit}>
              <div className="item">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={currentUser.username}
                />
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentUser.email}
                />
              </div>
              <div className="item">
                <label htmlFor="password">New Password</label>
                <input id="password" name="password" type="password" placeholder="(Leave blank to keep current)" />
              </div>

              {error && <span className="error">{error}</span>}

              <motion.button
                className="update-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </form>

            <div className="avatar-section">
              <div className="avatar-preview">
                <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" />
              </div>
              <div className="upload-wrapper">
                <UploadWidget
                  uwConfig={{
                    cloudName: "lamadev",
                    uploadPreset: "estate",
                    multiple: false,
                    maxImageFileSize: 2000000,
                    folder: "avatars",
                  }}
                  setState={setAvatar}
                />
                <span className="upload-hint">Click to change picture</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProfileUpdatePage;
