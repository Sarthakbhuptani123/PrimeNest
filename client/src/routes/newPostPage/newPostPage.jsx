import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaMagic, FaSync } from "react-icons/fa";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();

  const handleGenerateAI = async () => {
    const title = document.getElementById("title").value;
    const type = document.getElementsByName("type")[0].value;
    const property = document.getElementsByName("property")[0].value;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;
    const bedroom = document.getElementById("bedroom").value || "0";
    const bathroom = document.getElementById("bathroom").value || "0";
    const size = document.getElementById("size").value || "0";

    if (!title || !city) {
      alert("Please fill in at least the Title and City to generate a description.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await apiRequest.post("/ai/generate-description", {
        title, type, property, city, address, bedroom, bathroom, size
      });
      // Direct set to allow HTML parsing instead of typing animation which breaks tags
      setValue(res.data.description);
    } catch (err) {
      console.log(err);
      alert("AI generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError("Failed to create post");
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      className="newPostPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="newPostContainer">
        <div className="formSection">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create New Listing
          </motion.h1>

          <div className="wrapper">
            <form onSubmit={handleSubmit}>

              {/* --- Basic Info Section --- */}
              <div className="section-title">Property Details</div>
              <div className="input-grid">
                <div className="item full-width">
                  <label htmlFor="title">Title</label>
                  <input id="title" name="title" type="text" placeholder="Luxurious Apartment in..." />
                </div>
                <div className="item">
                  <label htmlFor="price">Price ($)</label>
                  <input id="price" name="price" type="number" placeholder="Price" />
                </div>
                <div className="item">
                  <label htmlFor="property">Property</label>
                  <select name="property">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="type">Type</label>
                  <select name="type">
                    <option value="rent" defaultChecked>Rent</option>
                    <option value="buy">Buy</option>
                  </select>
                </div>
              </div>

              {/* --- Location Section --- */}
              <div className="section-title">Location</div>
              <div className="input-grid">
                <div className="item full-width">
                  <label htmlFor="address">Address</label>
                  <input id="address" name="address" type="text" placeholder="123 Main St" />
                </div>
                <div className="item">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" type="text" placeholder="City" />
                </div>
                <div className="item">
                  <label htmlFor="latitude">Latitude</label>
                  <input id="latitude" name="latitude" type="text" placeholder="lat" />
                </div>
                <div className="item">
                  <label htmlFor="longitude">Longitude</label>
                  <input id="longitude" name="longitude" type="text" placeholder="lng" />
                </div>
              </div>

              {/* --- Specs Section --- */}
              <div className="section-title">Specifications</div>
              <div className="input-grid">
                <div className="item">
                  <label htmlFor="bedroom">Bedrooms</label>
                  <input min={1} id="bedroom" name="bedroom" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="bathroom">Bathrooms</label>
                  <input min={1} id="bathroom" name="bathroom" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="size">Size (sqft)</label>
                  <input min={0} id="size" name="size" type="number" />
                </div>
              </div>

              {/* --- Policies & Nearby --- */}
              <div className="section-title">Policies & Nearby</div>
              <div className="input-grid three-col">
                <div className="item">
                  <label htmlFor="utilities">Utilities</label>
                  <select name="utilities">
                    <option value="owner">Owner</option>
                    <option value="tenant">Tenant</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="pet">Pet Policy</label>
                  <select name="pet">
                    <option value="allowed">Allowed</option>
                    <option value="not-allowed">Not Allowed</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="income">Income Policy</label>
                  <input id="income" name="income" type="text" placeholder="e.g. 3x Rent" />
                </div>
                <div className="item">
                  <label htmlFor="school">School (m)</label>
                  <input min={0} id="school" name="school" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="bus">Bus (m)</label>
                  <input min={0} id="bus" name="bus" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="restaurant">Restaurant (m)</label>
                  <input min={0} id="restaurant" name="restaurant" type="number" />
                </div>
              </div>

              {/* --- Description --- */}
              <div className="item description">
                <div className="label-row">
                  <label htmlFor="desc">Description</label>
                  <button
                    type="button"
                    className={`ai-generate-btn ${isGenerating ? 'loading' : ''}`}
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                  >
                    {isGenerating ? <FaSync className="spin" /> : <FaMagic />}
                    {isGenerating ? "AI is Crafting..." : "Generate with AI"}
                  </button>
                </div>
                <ReactQuill theme="snow" onChange={setValue} value={value} className="editor" />
              </div>

              <motion.button
                className="sendButton"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Listing
              </motion.button>
              {error && <span className="error">{error}</span>}
            </form>
          </div>
        </div>

        <div className="sideContainer">
          <div className="upload-section">
            <h2>Property Images</h2>
            <p>Upload high-quality images to showcase your property.</p>
            <div className="images-preview">
              {images.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={image}
                    alt=""
                  />
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            <UploadWidget
              uwConfig={{
                multiple: true,
                cloudName: "lamadev",
                uploadPreset: "estate",
                folder: "posts",
              }}
              setState={setImages}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NewPostPage;
