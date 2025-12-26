import { useState } from "react";
import "./visitModal.scss";
import apiRequest from "../../lib/apiRequest";
import { motion, AnimatePresence } from "framer-motion";

function VisitModal({ isOpen, onClose, postId }) {
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await apiRequest.post("/visits", {
                postId,
                date,
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setDate("");
            }, 2000);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Failed to book visit. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="visitModalOverlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="visitModalContainer"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {success ? (
                        <div className="success">
                            <img src="/success.png" alt="Success" style={{ display: 'none' }} /> {/* Placeholder or Icon */}
                            <h3>Visit Requested!</h3>
                            <p>The owner will review your request shortly.</p>
                        </div>
                    ) : (
                        <>
                            <h2>Book a Visit</h2>
                            <form onSubmit={handleSubmit}>
                                <label>Select Date</label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split("T")[0]}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />

                                {error && <span className="error">{error}</span>}

                                <div className="buttons">
                                    <button type="button" className="cancel" onClick={onClose}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="submit" disabled={loading}>
                                        {loading ? "Sending..." : "Request Visit"}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default VisitModal;
