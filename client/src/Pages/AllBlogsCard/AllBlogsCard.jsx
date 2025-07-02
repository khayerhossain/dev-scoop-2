import React, { useState } from "react";
import { Link } from "react-router";

const AllBlogsCard = ({ allBlogs: blog, addToWishlist }) => {
  const [showFull, setShowFull] = useState(false);

  const handleWishlistClick = () => {
    addToWishlist(blog);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <img
        className="w-full h-48 object-cover"
        src={blog.imageURL}
        alt={blog.title}
      />

      <div className="p-4 flex flex-col flex-1">
        {/* Category & Date */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span className="px-2 py-0.5 bg-violet-100 text-violet-600 rounded-full font-medium">
            {blog.category}
          </span>
          <span>{blog.date}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {blog.title}
        </h2>

        {/* Short Description with line-clamp */}
        <p className={`text-gray-600 text-sm leading-relaxed ${showFull ? "" : "line-clamp-3"}`}>
          {showFull ? blog.longDescription : blog.shortDescription}
        </p>

        {/* Buttons */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <button
            onClick={() => setShowFull(!showFull)}
            className="flex-1 h-9 rounded-lg text-sm border border-violet-600 text-violet-600 hover:bg-violet-100 transition"
          >
            {showFull ? "Hide" : "Read"}
          </button>

          <button
            onClick={handleWishlistClick}
            className="flex-1 h-9 rounded-lg text-sm border border-rose-500 text-rose-500 hover:bg-rose-100 transition"
          >
            Wishlist
          </button>

          <Link
            to={`/blogdetails/${blog._id}`}
            className="flex-1 h-9 flex items-center justify-center rounded-lg text-sm border border-emerald-500 text-emerald-500 hover:bg-emerald-100 transition"
          >
            Details
          </Link>

          <Link
            to={`/updateblog/${blog._id}`}
            className="flex-1 h-9 flex items-center justify-center rounded-lg text-sm border border-yellow-500 text-yellow-500 hover:bg-yellow-100 transition"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllBlogsCard;
