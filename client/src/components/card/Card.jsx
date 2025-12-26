import { Link } from "react-router-dom";
import "./card.scss";
import { FaMapMarkerAlt, FaBed, FaBath, FaBookmark, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";

function Card({ item, index }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index ? index * 0.1 : 0
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0] || "/noavatar.jpg"} alt="" />
        {item.isHot && <div className="badge hot">HOT DEAL</div>}
        {item.discount > 0 && <div className="badge discount">-{item.discount}%</div>}
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <FaMapMarkerAlt className="icon" />
          <span>{item.address}</span>
        </p>
        <div className="price-row">
          <p className="price">₹ {item.price.toLocaleString()}</p>
          {item.oldPrice && <span className="old-price">₹ {item.oldPrice.toLocaleString()}</span>}
        </div>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <FaBed className="icon" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <FaBath className="icon" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <FaBookmark />
            </div>
            <div className="icon">
              <FaCommentDots />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
