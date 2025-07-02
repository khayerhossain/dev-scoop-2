import React, { useState } from "react";
import { Link } from "react-router";

const RecentBlogCards = ({ blog, addToWishlist }) => {
  const [showFull, setShowFull] = useState(false);

  const handleWishlistClick = () => {
    addToWishlist(blog);
  };

  const buttonBaseClass =
    "flex-1 h-10 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm focus:outline-none";

  return (
    <div className="bg-gradient-to-br from-white/90 to-gray-100 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <img
        className="w-full h-52 object-cover"
        src={blog.imageURL}
        alt="Blog Banner"
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
            {blog.category}
          </span>
          <span>{blog.date}</span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
          {blog.title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {showFull ? blog.longDescription : blog.shortDescription}
        </p>

        {/* BUTTONS STAY AT BOTTOM */}
        <div className="mt-auto flex justify-between gap-3 text-sm">
          <button
            onClick={() => setShowFull(!showFull)}
            className={`${buttonBaseClass} ${
              showFull
                ? "bg-blue-500 text-white border border-blue-500 hover:bg-blue-600"
                : "text-blue-600 bg-white/70 border border-blue-500 hover:bg-blue-500 hover:text-white"
            } focus:ring-2 focus:ring-blue-400`}
          >
            {showFull ? "Hide" : "Read"}
          </button>

          <Link
            to={`blogdetails/${blog._id}`}
            className={`${buttonBaseClass} border border-emerald-500 text-emerald-600 bg-white/70 hover:bg-emerald-500 hover:text-white focus:ring-2 focus:ring-emerald-400 text-center pt-2`}
          >
            Details
          </Link>

          <button
            onClick={handleWishlistClick}
            className={`${buttonBaseClass} border border-rose-500 text-rose-500 bg-white/70 hover:bg-rose-500 hover:text-white focus:ring-2 focus:ring-rose-400`}
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogCards;
