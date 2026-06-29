"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, User, Calendar } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";

export default function ReviewSection({ propertyId }) {
  const { data: session } = authClient.useSession();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [propertyId]);

  const loadReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${propertyId}`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to write a review"
      });
      return;
    }

    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please select a rating"
      });
      return;
    }

    if (!comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Comment Required",
        text: "Please write a comment"
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          propertyId,
          rating,
          comment,
        })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          timer: 1500,
          showConfirmButton: false
        });
        setRating(0);
        setComment("");
        loadReviews();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to submit review"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit review"
      });
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Star className="text-amber-400 fill-amber-400" size={24} />
          Reviews & Ratings
        </h2>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">{averageRating}</p>
          <p className="text-sm text-slate-400">{reviews.length} reviews</p>
        </div>
      </div>

      {/* Review Form */}
      {session?.user && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Write a Review</h3>
          
          {/* Star Rating */}
          <div className="mb-4">
            <p className="text-sm text-slate-400 mb-2">Your Rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this property..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white placeholder:text-slate-500 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="text-slate-600 mx-auto mb-4" size={48} />
            <p className="text-slate-400">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review, idx) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-slate-800/30 rounded-2xl border border-white/5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {review.reviewerName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.reviewerName}</p>
                    <p className="text-xs text-slate-400">{review.reviewerEmail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">{review.comment}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}