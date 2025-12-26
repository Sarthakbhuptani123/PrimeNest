import { useState, useEffect } from "react";
import "./editPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

function EditPostPage() {
    const { id } = useParams();
    const post = useLoaderData(); // Pre-fetched data via loader

    const [value, setValue] = useState(post.postDetail.desc);
    const [images, setImages] = useState(post.images);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        try {
            await apiRequest.put(`/posts/${id}`, {
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
            navigate("/" + id);
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        }
    };

    const handleDeleteImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <motion.div
            className="editPostPage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="editPostContainer">
                <div className="formSection">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Update Listing
                    </motion.h1>

                    <div className="wrapper">
                        <form onSubmit={handleSubmit}>

                            {/* --- Basic Info Section --- */}
                            <div className="section-title">Property Details</div>
                            <div className="input-grid">
                                <div className="item full-width">
                                    <label htmlFor="title">Title</label>
                                    <input id="title" name="title" type="text" defaultValue={post.title} />
                                </div>
                                <div className="item">
                                    <label htmlFor="price">Price ($)</label>
                                    <input id="price" name="price" type="number" defaultValue={post.price} />
                                </div>
                                <div className="item">
                                    <label htmlFor="property">Property</label>
                                    <select name="property" defaultValue={post.property}>
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="condo">Condo</option>
                                        <option value="land">Land</option>
                                    </select>
                                </div>
                                <div className="item">
                                    <label htmlFor="type">Type</label>
                                    <select name="type" defaultValue={post.type}>
                                        <option value="rent">Rent</option>
                                        <option value="buy">Buy</option>
                                    </select>
                                </div>
                            </div>

                            {/* --- Location Section --- */}
                            <div className="section-title">Location</div>
                            <div className="input-grid">
                                <div className="item full-width">
                                    <label htmlFor="address">Address</label>
                                    <input id="address" name="address" type="text" defaultValue={post.address} />
                                </div>
                                <div className="item">
                                    <label htmlFor="city">City</label>
                                    <input id="city" name="city" type="text" defaultValue={post.city} />
                                </div>
                                <div className="item">
                                    <label htmlFor="latitude">Latitude</label>
                                    <input id="latitude" name="latitude" type="text" defaultValue={post.latitude} />
                                </div>
                                <div className="item">
                                    <label htmlFor="longitude">Longitude</label>
                                    <input id="longitude" name="longitude" type="text" defaultValue={post.longitude} />
                                </div>
                            </div>

                            {/* --- Specs Section --- */}
                            <div className="section-title">Specifications</div>
                            <div className="input-grid">
                                <div className="item">
                                    <label htmlFor="bedroom">Bedrooms</label>
                                    <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={post.bedroom} />
                                </div>
                                <div className="item">
                                    <label htmlFor="bathroom">Bathrooms</label>
                                    <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={post.bathroom} />
                                </div>
                                <div className="item">
                                    <label htmlFor="size">Size (sqft)</label>
                                    <input min={0} id="size" name="size" type="number" defaultValue={post.postDetail.size} />
                                </div>
                            </div>

                            {/* --- Policies & Nearby --- */}
                            <div className="section-title">Policies & Nearby</div>
                            <div className="input-grid three-col">
                                <div className="item">
                                    <label htmlFor="utilities">Utilities</label>
                                    <select name="utilities" defaultValue={post.postDetail.utilities}>
                                        <option value="owner">Owner</option>
                                        <option value="tenant">Tenant</option>
                                        <option value="shared">Shared</option>
                                    </select>
                                </div>
                                <div className="item">
                                    <label htmlFor="pet">Pet Policy</label>
                                    <select name="pet" defaultValue={post.postDetail.pet}>
                                        <option value="allowed">Allowed</option>
                                        <option value="not-allowed">Not Allowed</option>
                                    </select>
                                </div>
                                <div className="item">
                                    <label htmlFor="income">Income Policy</label>
                                    <input id="income" name="income" type="text" defaultValue={post.postDetail.income} />
                                </div>
                                <div className="item">
                                    <label htmlFor="school">School (m)</label>
                                    <input min={0} id="school" name="school" type="number" defaultValue={post.postDetail.school} />
                                </div>
                                <div className="item">
                                    <label htmlFor="bus">Bus (m)</label>
                                    <input min={0} id="bus" name="bus" type="number" defaultValue={post.postDetail.bus} />
                                </div>
                                <div className="item">
                                    <label htmlFor="restaurant">Restaurant (m)</label>
                                    <input min={0} id="restaurant" name="restaurant" type="number" defaultValue={post.postDetail.restaurant} />
                                </div>
                            </div>

                            {/* --- Description --- */}
                            <div className="item description">
                                <label htmlFor="desc">Description</label>
                                <ReactQuill theme="snow" onChange={setValue} value={value} className="editor" />
                            </div>

                            <motion.button
                                className="updateButton"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Update Listing
                            </motion.button>
                            {error && <span className="error">{error}</span>}
                        </form>
                    </div>
                </div>

                <div className="sideContainer">
                    <div className="upload-section">
                        <h2>Property Images</h2>
                        <p>Update your property visuals.</p>
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

export default EditPostPage;
