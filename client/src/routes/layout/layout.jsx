import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/footer/Footer";

function Layout() {
  const location = useLocation();
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
      {location.pathname === "/" && (
        <div className="footer">
          <Footer />
        </div>
      )}
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
        {location.pathname === "/" && (
          <div className="footer">
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export { Layout, RequireAuth };
