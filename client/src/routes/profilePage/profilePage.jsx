import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import Analytics from "../../components/analytics/Analytics";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const PaginatedList = ({ posts }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? posts : posts.slice(0, 2);

  return (
    <>
      <List posts={displayedPosts} />
      {posts.length > 2 && !showAll && (
        <div style={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
          <button
            className="gold-btn-outline"
            onClick={() => setShowAll(true)}
            style={{ padding: "10px 25px" }}
          >
            View More Listings
          </button>
        </div>
      )}
    </>
  );
};

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [visitRequests, setVisitRequests] = useState([]);
  const [myVisits, setMyVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const requestsRes = await apiRequest.get("/visits/requests");
        setVisitRequests(requestsRes.data);
        const myVisitsRes = await apiRequest.get("/visits");
        setMyVisits(myVisitsRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser) fetchVisits();
  }, [currentUser]);

  const handleVisitAction = async (id, status) => {
    try {
      await apiRequest.put(`/visits/${id}`, { status });
      setVisitRequests((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status } : v))
      );
    } catch (err) {
      console.log(err);
      alert("Failed to update visit status");
    }
  };

  return (
    <motion.div
      className="profilePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="dashboard-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome, {currentUser.username}
        </motion.h1>
        <p>Manage your estate portfolio and messages.</p>
      </div>

      <div className="dashboard-grid">

        {/* --- CENTER: LISTINGS (TABS) --- */}
        <motion.div
          className="center-panel"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* ANALYTICS CHART */}
          <Analytics />

          {/* --- VISIT REQUESTS (Priority: Action Required) --- */}
          <div className="listings-section visit-section">
            <div className="section-header">
              <h2>Visit Requests</h2>
            </div>
            <div className="list-wrapper">
              {visitRequests.length === 0 && <p className="loading-text">No visit requests yet.</p>}
              {visitRequests.map((visit) => (
                <div key={visit.id} className="visit-card glass-panel">
                  <div className="visit-info">
                    <img src={visit.user.avatar || "/noavatar.jpg"} alt="" />
                    <div className="text">
                      <span className="username">{visit.user.username}</span>
                      <span className="post-title">Property: {visit.post.title}</span>
                      <span className="date">Requested for: {new Date(visit.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="actions">
                    {visit.status === "pending" ? (
                      <>
                        <button onClick={() => handleVisitAction(visit.id, "approved")} className="approve-btn">Approve</button>
                        <button onClick={() => handleVisitAction(visit.id, "rejected")} className="reject-btn">Reject</button>
                      </>
                    ) : (
                      <span className={`status-badge ${visit.status}`}>{visit.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- MY BOOKED VISITS (Priority: User Schedule) --- */}
          <div className="listings-section visit-section">
            <div className="section-header">
              <h2>My Booked Visits</h2>
            </div>
            <div className="list-wrapper">
              {myVisits.length === 0 && <p className="loading-text">You haven't booked any visits.</p>}
              {myVisits.map((visit) => (
                <div key={visit.id} className="visit-card glass-panel">
                  <div className="visit-info">
                    {/* Should show post image ideally, simplified for now */}
                    <div className="text" style={{ marginLeft: 0 }}>
                      <span className="post-title" style={{ fontSize: '16px' }}>{visit.post.title || "Unknown Property"}</span>
                      <span className="date">Date: {new Date(visit.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="actions">
                    <span className={`status-badge ${visit.status}`}>{visit.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MY LISTINGS */}
          <div className="listings-section">
            <div className="section-header">
              <h2>My Listings</h2>
              <Link to="/add">
                <button className="gold-btn">Create New Post</button>
              </Link>
            </div>
            <div className="list-wrapper">
              <Suspense fallback={<p className="loading-text">Loading properties...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p className="error-text">Error loading posts!</p>}
                >
                  {(postResponse) => <PaginatedList posts={postResponse.data.userPosts} />}
                </Await>
              </Suspense>
            </div>
          </div>

          {/* SAVED LISTINGS */}
          <div className="listings-section saved-section">
            <div className="section-header">
              <h2>Saved Properties</h2>
            </div>
            <div className="list-wrapper">
              <Suspense fallback={<p className="loading-text">Loading saved items...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p className="error-text">Error loading posts!</p>}
                >
                  {(postResponse) => <PaginatedList posts={postResponse.data.savedPosts} />}
                </Await>
              </Suspense>
            </div>
          </div>

        </motion.div>

        {/* --- RIGHT: CHAT --- */}
        <motion.div
          className="glass-card chat-panel"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h2>Messages</h2>
          </div>
          <div className="chat-wrapper">
            <Suspense fallback={<p className="loading-text">Loading chats...</p>}>
              <Await
                resolve={data.chatResponse}
                errorElement={<p className="error-text">Error loading chats!</p>}
              >
                {(chatResponse) => <Chat chats={chatResponse.data} openChatId={location.state?.openChatId} />}
              </Await>
            </Suspense>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

export default ProfilePage;
